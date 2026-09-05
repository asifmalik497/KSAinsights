import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import axios from "axios";
import * as cheerio from "cheerio";
import { GoogleGenAI, Type } from "@google/genai";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cron from "node-cron";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";
import { blogPosts as staticPosts } from "./src/data/posts";

dotenv.config();

// --- Firebase Admin Initialization ---
let db: admin.firestore.Firestore;

try {
  const firebaseConfigPath = path.join(process.cwd(), 'firebase-applet-config.json');
  let databaseId: string | undefined = undefined;
  let firebaseConfig: any = {};
  if (fs.existsSync(firebaseConfigPath)) {
    firebaseConfig = JSON.parse(fs.readFileSync(firebaseConfigPath, 'utf8'));
    databaseId = firebaseConfig.firestoreDatabaseId || undefined;
  }

  // Try default initialization first (works in GCP environments like Cloud Run)
  if (admin.apps.length === 0) {
    // If we have a projectId in config, use it, otherwise let it auto-detect
    const options: admin.AppOptions = {};
    if (firebaseConfig.projectId) {
      options.projectId = firebaseConfig.projectId;
    }

    // Support loading custom service account keys for background server operations on traditional VMs
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      try {
        let serviceAccount;
        const keyData = process.env.FIREBASE_SERVICE_ACCOUNT_KEY.trim();
        if (keyData.startsWith('{')) {
          serviceAccount = JSON.parse(keyData);
          options.credential = admin.credential.cert(serviceAccount);
          console.log("[System] Firebase Admin loaded using designated Service Account Key.");
        } else {
          const fullPath = path.isAbsolute(keyData) ? keyData : path.join(process.cwd(), keyData);
          if (fs.existsSync(fullPath)) {
            serviceAccount = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
            options.credential = admin.credential.cert(serviceAccount);
            console.log("[System] Firebase Admin loaded using designated Service Account Key.");
          } else {
            console.warn(`[System] FIREBASE_SERVICE_ACCOUNT_KEY is specified as a path but file was not found: ${fullPath}. Skipping key load.`);
          }
        }
      } catch (keyError: any) {
        console.warn("[System] FIREBASE_SERVICE_ACCOUNT_KEY was set but failed to parse. Skipping.", keyError.message);
      }
    }
    
    admin.initializeApp(options);
    console.log(`[System] Firebase Admin Initialized with Project: ${admin.app().options.projectId || 'Auto-detected'}`);
  }
  
  // CRITICAL: Always use the databaseId from config if provided
  console.log(`[System] Connecting to Firestore Database: ${databaseId || '(default)'}`);
  db = getFirestore(admin.apps[0], databaseId);
} catch (error) {
  console.warn("[System] Firebase Admin Initialization failed. The engine may have limited functionality.", error);
  db = null as any;
}


async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

  // --- Intelligence Engine Logic ---

  async function generateStrategicAlert() {
    console.log("[Engine] Starting Strategic Intelligence Scour...");
    try {
      // Check if we already synced recently (within last 30 mins) to avoid duplicate pulses on restart
      if (!db) {
        console.warn("[Engine] Skipping pulse: Firebase Admin not initialized.");
        return;
      }
      
      console.log(`[Engine] Accessing Firestore database: ${db ? 'Initialized' : 'MISSING'}`);
      
      let statsDoc;
      try {
        statsDoc = await db.collection('system_stats').doc('global').get();
      } catch (err: any) {
        if (err.code === 7 || err.message?.includes("PERMISSION_DENIED")) {
          console.warn("[Engine] Automatic Strategic Intelligence Scour skipped due to restricted sandbox database permissions.");
          return;
        }
        console.error(`[Engine] Firestore Access Denied (system_stats): ${err.message}`);
        throw err;
      }
      if (statsDoc.exists) {
        const data = statsDoc.data();
        if (data?.last_sync_at) {
          const lastSync = data.last_sync_at.toDate();
          const diff = (Date.now() - lastSync.getTime()) / (1000 * 60);
          if (diff < 1) {
            console.log("[Engine] Recently synced (last 1m). Skipping automatic pulse.");
            return;
          }
        }
      }

      const today = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Riyadh', month: 'long', day: 'numeric', year: 'numeric' });
      const fourDaysAgoStr = new Date(Date.now() - 96 * 60 * 60 * 1000).toLocaleDateString('en-US', { timeZone: 'Asia/Riyadh', month: 'long', day: 'numeric', year: 'numeric' });
      const prompt = `
        Current Date in Riyadh: ${today}.
        You are the "Core Intelligence Engine" for 'KSA Insights'. 
        Perform a comprehensive scour of the latest high-impact strategic business and economic news from Saudi Arabia.
        STRICT REQUIREMENT: Only identify developments from the LAST 48-72 HOURS, with a HIGH PRIORITY on finding news published ON ${today}.
        
        Focus areas:
        - Jawazat & MOI: Residency, Visas, and Expat regulations (Umm Al-Qura & Nafath sourcing).
        - Vision 2030 giga-project developments (NEOM, Red Sea, etc.).
        - Regulatory shifts from SAMA, MISA, and HRSD.
        - Major market movements and FDI trends.
        
        Requirements:
        1. Identify the 3-4 MOST RECENT strategic developments (limit count to stay within token limits).
        2. Title: Professional and analytical (en, ar, ur).
        3. Summary: Concise briefing (en, ar, ur).
        4. AI Insight: Strategic narrative (en, ar, ur).
        5. Category: one of [regulatory, residency, opportunity, macro, local].
        6. Impact: [High, Medium, Low].
        7. Source: Name of official source.
        
        STRICT LIMIT: Keep each language version of summary and insight under 150 words to avoid candidate token limits.
        
        Sourcing Integrity: Prioritize Umm Al-Qura Newspaper for legal text, SPA for state announcements, and Sayidaty for cultural and social developments.
        
        Return an ARRAY of JSON objects.
      `;

      let response;
      try {
        console.log("[Engine] Triggering Strategic Intelligence Pulse...");
        response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          config: {
            responseMimeType: "application/json",
            tools: [{ googleSearch: {} }],
            responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: {
                  type: Type.OBJECT,
                  properties: {
                    en: { type: Type.STRING },
                    ar: { type: Type.STRING },
                    ur: { type: Type.STRING }
                  },
                  required: ["en", "ar", "ur"]
                },
                summary: {
                  type: Type.OBJECT,
                  properties: {
                    en: { type: Type.STRING },
                    ar: { type: Type.STRING },
                    ur: { type: Type.STRING }
                  },
                  required: ["en", "ar", "ur"]
                },
                aiInsight: {
                  type: Type.OBJECT,
                  properties: {
                    en: { type: Type.STRING },
                    ar: { type: Type.STRING },
                    ur: { type: Type.STRING }
                  },
                  required: ["en", "ar", "ur"]
                },
                category: { type: Type.STRING },
                impact: { type: Type.STRING },
                source: { type: Type.STRING },
                date: { type: Type.STRING }
              },
              required: ["title", "summary", "aiInsight", "category", "impact", "source", "date"]
            }
          }
        }
      });
    } catch (aiErr: any) {
        console.error(`[Engine] Gemini Insight Generation Failed: ${aiErr.message}`);
        throw aiErr;
      }

      const alertsArray = JSON.parse(response.text);
      
      // Deduplication & Cleanup Logic
      const existingSnapshot = await db.collection('strategic_alerts').orderBy('createdAt', 'desc').limit(100).get();
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

      // Purge stale alerts older than 30 days or outdated grace period topics
      for (const docSnapshot of existingSnapshot.docs) {
        const item = docSnapshot.data();
        const createdAtDate = item.createdAt?.toDate ? item.createdAt.toDate() : (item.date ? new Date(item.date) : null);
        const titleLower = (item.title?.en || "").toLowerCase();
        const summaryLower = (item.summary?.en || "").toLowerCase();
        
        if (titleLower.includes("grace period") || summaryLower.includes("grace period") || (createdAtDate && createdAtDate < thirtyDaysAgo)) {
          await docSnapshot.ref.delete().catch(() => {});
        }
      }

      const existingItems = existingSnapshot.docs.map(doc => doc.data());
      const existingTitles = new Set(existingItems.map(item => item.title?.en));

      let addedCount = 0;
      for (const alert of alertsArray) {
        if (!existingTitles.has(alert.title.en)) {
          await db.collection('strategic_alerts').add({
            ...alert,
            date: alert.date || today, // Fallback to current date if Gemini returns none or stale one
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            automated: true,
            region: "Riyadh Hub"
          });
          addedCount++;
        }
      }
      
      // Update system stats
      await db.collection('system_stats').doc('global').set({
        last_pulse: admin.firestore.FieldValue.serverTimestamp(),
        last_sync_at: admin.firestore.FieldValue.serverTimestamp(), // Sync with frontend freshness check
        total_syncs: admin.firestore.FieldValue.increment(1),
        pulse_added_count: addedCount
      }, { merge: true });

      console.log(`[Engine] Pulse complete. Discovered ${addedCount} new strategic items.`);
    } catch (error: any) {
      if (error.code === 7 || error.message?.includes("PERMISSION_DENIED")) {
        console.warn("[Engine] Strategic Intelligence Scour restricted due to sandbox database permissions.");
      } else {
        console.error("[Engine] Strategic Scour Failed:", error);
      }
    }
  }

  // Schedule: Every 6 hours
  cron.schedule('0 */6 * * *', () => {
    generateStrategicAlert();
  });

  // Initialization pulse (starts on boot, throttled by 30-min logic inside function)
  setTimeout(() => {
    generateStrategicAlert();
  }, 5000);

  // Manual trigger for testing/initialization
  app.post("/api/engine/sync", async (req, res) => {
    await generateStrategicAlert();
    res.json({ status: "success", message: "Intelligence Pulse triggered manually" });
  });

  app.get("/api/health", async (req, res) => {
    if (!db) {
      return res.json({ 
        status: "degraded", 
        engine: "running", 
        error: "Firebase Admin not initialized. Check server logs.",
        database: "disconnected" 
      });
    }

    let count = 0;
    let syncStats = { last_pulse: "never", total_syncs: 0 };
    try {
      const snapshot = await db.collection('strategic_alerts').get();
      count = snapshot.size;
      
      const statsDoc = await db.collection('system_stats').doc('global').get();
      if (statsDoc.exists) {
        syncStats = statsDoc.data() as any;
      }
    } catch (e: any) {
      console.warn("[Health] Database check restricted due to sandbox permissions:", e.message);
      return res.json({ 
        status: "degraded", 
        database: "restricted", 
        engine: "running", 
        error: e.message,
        info: "The application is running. Firestore is fully functional on the client-side via Web SDK, but server-side background access is restricted by GCP sandbox IAM policies." 
      });
    }
    res.json({ 
      status: "ok", 
      engine: "running", 
      alertsCount: count, 
      lastPulse: syncStats.last_pulse,
      totalAutomatedSyncs: syncStats.total_syncs 
    });
  });

  // --- Dynamic SEO Routes ---

  app.get("/robots.txt", (req, res) => {
    const domain = `https://${req.get("host")}`;
    const robots = `User-agent: *
Allow: /
Sitemap: ${domain}/sitemap.xml`;
    res.type("text/plain");
    res.send(robots);
  });

  app.get("/sitemap.xml", async (req, res) => {
    const domain = `https://${req.get("host")}`;
    const staticPages = [
      "",
      "faq",
      "blog",
      "news",
      "downloads",
      "services",
      "expat-hub",
      "about",
      "contact",
      "consultancy",
      "privacy-policy",
      "content-lab"
    ];

    let dynamicBlogIds: string[] = [];
    try {
      if (db) {
        const snapshot = await db.collection("blog_posts").get();
        dynamicBlogIds = snapshot.docs.map(doc => doc.id);
      }
    } catch (e) {
      console.error("[Sitemap] Failed to fetch dynamic posts:", e);
    }

    const allBlogIds = [...new Set([...staticPosts.map(p => p.id), ...dynamicBlogIds])];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
  <url>
    <loc>${domain}/${page}</loc>
    <changefreq>${page === "" ? "daily" : "weekly"}</changefreq>
    <priority>${page === "" ? "1.0" : "0.7"}</priority>
  </url>`).join("")}
  ${allBlogIds.map(id => `
  <url>
    <loc>${domain}/blog/${id}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join("")}
</urlset>`;

    res.type("application/xml");
    res.send(xml);
  });

  // --- Vite Middleware ---

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[System] Intelligence Portal Hub live at http://localhost:${PORT}`);
    console.log(`[System] Engine Ready: Ingestion -> Proxy -> Delivery`);
  });
}

startServer();
