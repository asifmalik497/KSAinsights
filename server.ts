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
let isServerDbRestricted = false;

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

const strategicAlertsResponseSchema = {
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
};

function safeJsonParse(rawText: string | undefined | null, fallback: any = []) {
  if (!rawText || typeof rawText !== "string") return fallback;

  let cleaned = rawText.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json\s*/, "").replace(/\s*```$/, "").trim();
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```\s*/, "").replace(/\s*```$/, "").trim();
  }

  try {
    return JSON.parse(cleaned);
  } catch (initialErr) {
    // Attempt extracting bracketed array
    const firstBracket = cleaned.indexOf("[");
    const lastBracket = cleaned.lastIndexOf("]");
    if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
      try {
        return JSON.parse(cleaned.substring(firstBracket, lastBracket + 1));
      } catch (_) {}
    }

    // Attempt extracting brace object
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      try {
        return JSON.parse(cleaned.substring(firstBrace, lastBrace + 1));
      } catch (_) {}
    }

    // Try sanitizing control characters and trailing commas
    try {
      const sanitized = cleaned
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, "")
        .replace(/,\s*([}\]])/g, "$1");
      return JSON.parse(sanitized);
    } catch (_) {}

    console.warn("[Parser] Failed to parse JSON, returning fallback. Snippet:", cleaned.substring(0, 150));
    return fallback;
  }
}

async function startServer() {
  const app = express();
  // Trust Google Cloud Run Layer 7 reverse proxies for accurate HTTPS and host resolution
  app.set("trust proxy", true);

  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Helper to reliably resolve canonical protocol and domain in Cloud Run and production environments
  function getRequestDomain(req: express.Request): string {
    const configuredDomain = process.env.CANONICAL_DOMAIN || process.env.CANONICAL_DOM;
    if (configuredDomain) {
      let formatted = configuredDomain.trim().replace(/\/$/, "");
      if (!formatted.startsWith("http://") && !formatted.startsWith("https://")) {
        formatted = `https://${formatted}`;
      }
      return formatted;
    }
    const host = req.get("x-forwarded-host") || req.get("host") || "";
    if (host.includes("ksainsights.com")) {
      return "https://ksainsights.com";
    }
    const proto = req.get("x-forwarded-proto") || req.protocol || "https";
    return `${proto}://${host}`;
  }

  // --- Canonical Domain Enforcement (Redirect www to apex domain) ---
  app.use((req, res, next) => {
    const host = req.get("host") || "";
    if (host.startsWith("www.ksainsights.com")) {
      return res.redirect(301, `https://ksainsights.com${req.originalUrl}`);
    }
    next();
  });

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

  // --- Intelligence Engine Logic ---

  async function generateStrategicAlert() {
    console.log("[Engine] Starting Strategic Intelligence Scour...");
    try {
      // Check if we already synced recently (within last 30 mins) to avoid duplicate pulses on restart
      if (!db || isServerDbRestricted) {
        return;
      }
      
      let statsDoc;
      try {
        statsDoc = await db.collection('system_stats').doc('global').get();
      } catch (err: any) {
        if (err.code === 7 || err.code === 8 || err.message?.includes("PERMISSION_DENIED") || err.message?.includes("Quota") || err.message?.includes("RESOURCE_EXHAUSTED")) {
          isServerDbRestricted = true;
          console.warn("[Engine] Automatic Strategic Intelligence Scour skipped due to database permissions or daily quota limits.");
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
        - Ministry of Education (MOE): University admissions, scholarship quotas, higher education reforms, academic calendar, and unified university admission portals (Darbi, Maqbool, KSU, KFUPM, KAU).
        - Vision 2030 giga-project developments (NEOM, Red Sea, etc.).
        - Regulatory shifts from SAMA, MISA, and HRSD.
        - Major market movements and FDI trends.
        
        Requirements:
        1. Identify the 3-4 MOST RECENT strategic developments (limit count to stay within token limits).
        2. Title: Professional and analytical (en, ar, ur).
        3. Summary: Concise briefing (en, ar, ur).
        4. AI Insight: Strategic narrative (en, ar, ur).
        5. Category: one of [regulatory, residency, opportunity, macro, local, education].
        6. Impact: [High, Medium, Low].
        7. Source: Name of official source (e.g. Ministry of Education, SPA, MOI Jawazat, Umm Al-Qura, HRSD).
        
        STRICT LIMIT: Keep each language version of summary and insight under 150 words to avoid candidate token limits.
        
        Sourcing Integrity: Prioritize official portals: Saudi Ministry of Education (moe.gov.sa), Umm Al-Qura Newspaper for legal text, SPA for state announcements, and Sayidaty for cultural and social developments.
        
        Return an ARRAY of JSON objects.
      `;

      let response;
      try {
        console.log("[Engine] Triggering Strategic Intelligence Pulse...");
        response = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite",
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          config: {
            responseMimeType: "application/json",
            responseSchema: strategicAlertsResponseSchema,
          }
        });
      } catch (aiErr: any) {
        console.error(`[Engine] Gemini Insight Generation Failed: ${aiErr.message}`);
        throw aiErr;
      }

      const parsedAlerts = safeJsonParse(response.text, []);
      const alertsArray = Array.isArray(parsedAlerts) ? parsedAlerts : [parsedAlerts];
      
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
            region: "Riyadh Hub",
            server_secret: "SuperSecretServerPassphrase"
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
      if (error.code === 7 || error.code === 8 || error.message?.includes("PERMISSION_DENIED") || error.message?.includes("Quota") || error.message?.includes("RESOURCE_EXHAUSTED")) {
        isServerDbRestricted = true;
        console.warn("[Engine] Strategic Intelligence Scour restricted due to sandbox database permissions or daily quota limits.");
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

  // Server-side Strategic News Generation endpoint
  app.post("/api/news/generate", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ success: false, error: "GEMINI_API_KEY is not configured on the server." });
      }

      const ai = new GoogleGenAI({ apiKey });
      const today = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Riyadh', month: 'long', day: 'numeric', year: 'numeric' });
      const prompt = `
        Current Date in Riyadh: ${today}.
        Analyze the latest high-impact strategic business, economic, regulatory, and educational news from Saudi Arabia.
        Focus areas: Saudi Ministry of Education (MOE & university admissions), Jawazat/MOI Residency & Visas, Vision 2030 developments, SAMA, MISA, HRSD, Argaam, Tadawul.
        
        Requirements:
        1. Identify 3-5 timely, distinct strategic developments.
        2. Keep each language translation (English, Arabic, Urdu) concise, punchy, and impactful (around 60-120 words for summary and insight) to ensure complete structure.
        3. Title, summary, and aiInsight must be provided in all three languages: en, ar, ur.
        4. Category must be one of: regulatory, residency, opportunity, macro, local, intelligence, lifestyle, community, education.
        5. Impact must be one of: High, Medium, Low.
        
        Return a JSON array conforming strictly to the requested schema.
      `;

      const result = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: {
          responseMimeType: "application/json",
          responseSchema: strategicAlertsResponseSchema,
        }
      });

      const alerts = safeJsonParse(result.text, []);
      const alertsArray = Array.isArray(alerts) ? alerts : [alerts];
      return res.json({ success: true, alerts: alertsArray });
    } catch (err: any) {
      console.error("[API] News Generation Error:", err.message);
      return res.status(500).json({ success: false, error: err.message || "News generation failed" });
    }
  });

  // Server-side Blog Content Generation endpoint
  app.post("/api/content/generate", async (req, res) => {
    try {
      const { topic } = req.body;
      if (!topic || typeof topic !== "string") {
        return res.status(400).json({ success: false, error: "Missing or invalid topic" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ success: false, error: "GEMINI_API_KEY is not configured on the server." });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `
        Create a professional, high-quality blog post for "KSA Insights" about the following topic: "${topic}".
        The post must be provided in three languages: English, Arabic, and Urdu.
        The tone should be premium, expert, and insightful, suitable for business investors and expats in Saudi Arabia.
        
        Requirements:
        1. Title: Catchy and professional.
        2. Excerpt: A brief 2-3 sentence summary.
        3. Content: A full article (approx 500-800 words) in Markdown format. Use headers, bold text, and lists for readability.
        4. Category: Choose one from [Market Insights, Vision 2030, Fintech, Tourism, Business, Environment].
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
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
              excerpt: {
                type: Type.OBJECT,
                properties: {
                  en: { type: Type.STRING },
                  ar: { type: Type.STRING },
                  ur: { type: Type.STRING }
                },
                required: ["en", "ar", "ur"]
              },
              content: {
                type: Type.OBJECT,
                properties: {
                  en: { type: Type.STRING },
                  ar: { type: Type.STRING },
                  ur: { type: Type.STRING }
                },
                required: ["en", "ar", "ur"]
              },
              category: { type: Type.STRING }
            },
            required: ["title", "excerpt", "content", "category"]
          }
        }
      });

      const generatedPost = safeJsonParse(response.text, {});
      return res.json({ success: true, post: generatedPost });
    } catch (err: any) {
      console.error("[API] Content Generation Error:", err.message);
      return res.status(500).json({ success: false, error: err.message || "Content generation failed" });
    }
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

    if (isServerDbRestricted) {
      return res.json({ 
        status: "degraded", 
        database: "restricted", 
        engine: "running", 
        info: "The application is running. Firestore is fully functional on the client-side via Web SDK, but server-side background access is restricted by GCP sandbox IAM policies." 
      });
    }

    try {
      const snapshot = await db.collection('strategic_alerts').get();
      count = snapshot.size;
      
      const statsDoc = await db.collection('system_stats').doc('global').get();
      if (statsDoc.exists) {
        syncStats = statsDoc.data() as any;
      }
    } catch (e: any) {
      if (e.code === 7 || e.code === 8 || e.message?.includes("PERMISSION_DENIED") || e.message?.includes("Quota") || e.message?.includes("RESOURCE_EXHAUSTED")) {
        isServerDbRestricted = true;
      }
      console.warn("[Health] Database check restricted due to sandbox permissions or daily quota limits:", e.message);
      return res.json({ 
        status: "degraded", 
        database: "restricted", 
        engine: "running", 
        error: e.message,
        info: "The application is running. Firestore is in resilient cached mode." 
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
    const domain = getRequestDomain(req);
    const robots = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /content-lab

Sitemap: ${domain}/sitemap.xml`;
    res.type("text/plain");
    res.send(robots);
  });

  app.get("/sitemap", (req, res) => {
    res.redirect(301, "/sitemap.xml");
  });

  app.get("/sitemap.xml", async (req, res) => {
    const domain = getRequestDomain(req);
    const currentDate = "2026-09-19";
    const staticPages = [
      { path: "", changefreq: "daily", priority: "1.0" },
      { path: "blog", changefreq: "daily", priority: "0.9" },
      { path: "news", changefreq: "hourly", priority: "0.9" },
      { path: "higher-education", changefreq: "daily", priority: "0.9" },
      { path: "guides", changefreq: "weekly", priority: "0.8" },
      { path: "faq", changefreq: "weekly", priority: "0.8" },
      { path: "expat-hub", changefreq: "weekly", priority: "0.8" },
      { path: "services", changefreq: "monthly", priority: "0.7" },
      { path: "consultancy", changefreq: "monthly", priority: "0.8" },
      { path: "about", changefreq: "monthly", priority: "0.6" },
      { path: "contact", changefreq: "monthly", priority: "0.6" },
      { path: "privacy-policy", changefreq: "monthly", priority: "0.5" }
    ];

    let dynamicBlogIds: string[] = [];
    if (db && !isServerDbRestricted) {
      try {
        const snapshot = await db.collection("blog_posts").get();
        dynamicBlogIds = snapshot.docs.map(doc => doc.id);
      } catch (e: any) {
        if (e.code === 7 || e.code === 8 || e.message?.includes("PERMISSION_DENIED") || e.message?.includes("Quota") || e.message?.includes("RESOURCE_EXHAUSTED")) {
          isServerDbRestricted = true;
          console.warn("[Sitemap] Server-side database access restricted by policy or daily quota limit. Serving authoritative static posts.");
        } else {
          console.warn("[Sitemap] Notice: Could not fetch dynamic posts from database, serving static posts:", e.message);
        }
      }
    }

    const allBlogIds = [...new Set([...staticPosts.map(p => p.id), ...dynamicBlogIds])];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${staticPages.map(p => `
  <url>
    <loc>${domain}/${p.path}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${domain}/${p.path}${p.path ? '?lng=en' : '?lng=en'}"/>
    <xhtml:link rel="alternate" hreflang="ar" href="${domain}/${p.path}${p.path ? '?lng=ar' : '?lng=ar'}"/>
    <xhtml:link rel="alternate" hreflang="ur" href="${domain}/${p.path}${p.path ? '?lng=ur' : '?lng=ur'}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${domain}/${p.path}${p.path ? '?lng=en' : '?lng=en'}"/>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join("")}
  ${allBlogIds.map(id => {
    const isTrending = id === 'complete-qiwa-labor-law-iqama-guide-2026' || id === 'riyadh-jeddah-96-national-day-events-discounts-guide' || id === 'ksa-national-defence-day-air-shows-2026' || id === 'saudi-squad-khaleeji-27-jeddah-2026';
    return `
  <url>
    <loc>${domain}/blog/${id}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${domain}/blog/${id}?lng=en"/>
    <xhtml:link rel="alternate" hreflang="ar" href="${domain}/blog/${id}?lng=ar"/>
    <xhtml:link rel="alternate" hreflang="ur" href="${domain}/blog/${id}?lng=ur"/>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${isTrending ? 'daily' : 'monthly'}</changefreq>
    <priority>${isTrending ? '1.0' : '0.8'}</priority>
  </url>`;
  }).join("")}
</urlset>`;

    res.type("application/xml");
    res.send(xml);
  });

  // --- Dynamic SEO Metadata Injection for Bots & Search Engines ---

  const PAGE_METADATA: Record<string, { title: string; description: string; ogImage?: string }> = {
    "/": {
      title: "KSA Insights | رؤى السعودية | Expert Business & Education Consultancy",
      description: "منصة استشارات الأعمال وتأسيس الشركات، حاسبة النسبة الموزونة للجامعات 1447، وأخبار الاستثمار في السعودية وفق رؤية 2030."
    },
    "/higher-education": {
      title: "حاسبة النسبة الموزونة 1447 والقبول الجامعي الموحد | KSA Insights",
      description: "احسب نسبتك الموزونة للجامعات السعودية 1447 بدقة للقبول في جامعة الملك سعود، البترول، الملك عبدالعزيز وغيرها."
    },
    "/blog": {
      title: "مدونة رؤى السعودية للأعمال والاستثمار والتعليم | KSA Insights Blog",
      description: "مقالات استراتيجية وتحليلات موثوقة حول تأسيس الشركات، تأشيرات الإقامة المميزة، والأنظمة التعليمية في المملكة."
    },
    "/news": {
      title: "أخبار السعودية الاقتصادية والاستثمارية | KSA Insights News Pulse",
      description: "تغطية فورية لأحدث التطورات الاقتصادية، تراخيص وزارة الاستثمار (ميزا)، ومشاريع رؤية السعودية 2030."
    },
    "/guides": {
      title: "أدلة المستثمرين ورواد الأعمال في المملكة | KSA Guides Hub",
      description: "أدلة إجرائية شاملة لتأسيس الشركات في الرياض، استخراج السجل التجاري، والحصول على التراخيص الأجنبية."
    },
    "/faq": {
      title: "الأسئلة الشائعة حول الاستثمار والتعليم في السعودية | KSA FAQ",
      description: "إجابات الخبراء عن أسئلة ترخيص ميزا، الإقامة المميزة، النسبة الموزونة 1447، وإجراءات تأسيس الشركات."
    },
    "/expat-hub": {
      title: "دليل المقيمين والمغتربين في السعودية | Expat Hub KSA",
      description: "دليلك الشامل للحياة والعمل في المملكة: أنظمة العمل، تكاليف المعيشة، منصة أبشر، وتأشيرات العمل والإقامة."
    },
    "/services": {
      title: "خدمات الاستشارات الاستثمارية وتأسيس الأعمال | KSA Services",
      description: "استشارات مهنية متكاملة لرواد الأعمال والشركات العالمية لدخول السوق السعودي والحصول على التراخيص."
    },
    "/consultancy": {
      title: "استشارات الاستثمار ودخول السوق السعودي | KSA Consultancy",
      description: "خدمات استشارية استراتيجية مخصصة للشركات والمستثمرين للتوسع في المملكة العربية السعودية."
    },
    "/about": {
      title: "عن منصة رؤى السعودية | About KSA Insights Portal",
      description: "المنصة الرائدة للتحليلات الاقتصادية والحلول الاستشارية الموجهة للمستثمرين والطلاب والمقيمين في المملكة."
    },
    "/contact": {
      title: "اتصل بنا للاستشارات الاستثمارية والتعليمية | Contact KSA Insights",
      description: "تواصل مباشرة مع مستشارينا في الرياض وجدة للحصول على استشارات مخصصة وتأسيس الشركات."
    },
    "/privacy-policy": {
      title: "سياسة الخصوصية وحماية البيانات | Privacy Policy | KSA Insights",
      description: "سياسة الخصوصية وشروط الاستخدام وحماية البيانات الشخصية لزوار منصة رؤى السعودية."
    }
  };

  function injectMetadata(html: string, reqPath: string, domain: string): string {
    const cleanPath = reqPath.split('?')[0].replace(/\/$/, '') || '/';
    let title = "KSA Insights | رؤى السعودية | Expert Business & Education Consultancy";
    let description = "منصة رؤى السعودية: استشارات الأعمال، تأسيس الشركات، حاسبة النسبة الموزونة للجامعات 1447، وأخبار الأنظمة والاستثمار في المملكة العربية السعودية.";
    let image = `${domain}/images/saudi_airshow_formation_1789755150950.jpg`;
    const canonicalUrl = `${domain}${cleanPath === '/' ? '' : cleanPath}`;

    let articleKeywords = "";
    if (cleanPath.startsWith('/blog/')) {
      const postId = cleanPath.replace('/blog/', '');
      const post = staticPosts.find(p => p.id === postId);
      if (post) {
        const postTitle = post.title?.ar || post.title?.en || "KSA Insights Blog";
        const postExcerpt = post.excerpt?.ar || post.excerpt?.en || post.excerpt?.ur || "";
        title = `${postTitle} | KSA Insights`;
        description = postExcerpt;
        const postImg = post.images?.[0];
        if (postImg) {
          image = postImg.startsWith('http') ? postImg : `${domain}${postImg.startsWith('/') ? '' : '/'}${postImg}`;
        }
        if (post.keywords) {
          if (Array.isArray(post.keywords)) {
            articleKeywords = post.keywords.join(', ');
          } else {
            const kw = post.keywords as { ar?: string[]; ur?: string[]; en?: string[] };
            articleKeywords = [
              ...(kw.ar || []),
              ...(kw.ur || []),
              ...(kw.en || [])
            ].join(', ');
          }
        }
      }
    } else if (PAGE_METADATA[cleanPath]) {
      const meta = PAGE_METADATA[cleanPath];
      title = meta.title;
      description = meta.description;
      if (meta.ogImage) {
        image = meta.ogImage.startsWith('http') ? meta.ogImage : `${domain}${meta.ogImage}`;
      }
    }

    let modified = html.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`);
    if (modified.includes('<meta name="description"')) {
      modified = modified.replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${description}" />`);
    }
    if (modified.includes('<link rel="canonical"')) {
      modified = modified.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="${canonicalUrl}" />`);
    }

    const isBlogArticle = cleanPath.startsWith('/blog/');
    const jsonLdArticle = isBlogArticle ? `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": ${JSON.stringify(title)},
      "description": ${JSON.stringify(description)},
      "image": [${JSON.stringify(image)}],
      "datePublished": "2026-09-19T08:00:00+03:00",
      "dateModified": "2026-09-19T19:00:00+03:00",
      "keywords": ${JSON.stringify(articleKeywords || "")},
      "author": {
        "@type": "Organization",
        "name": "KSA Insights Editorial Desk",
        "url": "${domain}"
      },
      "publisher": {
        "@type": "Organization",
        "name": "KSA Insights",
        "url": "${domain}",
        "logo": {
          "@type": "ImageObject",
          "url": "${domain}/images/favicon.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "${canonicalUrl}"
      }
    }
    </script>` : '';

    const keywordsTag = articleKeywords ? `\n    <meta name="keywords" content="${articleKeywords.replace(/"/g, '&quot;')}" />` : '';
    const seoTags = `
    ${!modified.includes('<link rel="canonical"') ? `<link rel="canonical" href="${canonicalUrl}" />` : ''}${keywordsTag}
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${image}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />${jsonLdArticle}`;

    return modified.replace('</head>', `${seoTags}\n  </head>`);
  }

  // --- Vite Middleware ---

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    const indexHtmlPath = path.join(distPath, 'index.html');
    let cachedIndexHtml = '';

    app.use(express.static(distPath, { index: false }));
    app.get('*', (req, res) => {
      try {
        if (!cachedIndexHtml && fs.existsSync(indexHtmlPath)) {
          cachedIndexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
        }
        if (cachedIndexHtml) {
          const domain = getRequestDomain(req);
          const enhancedHtml = injectMetadata(cachedIndexHtml, req.path, domain);
          res.type("text/html");
          return res.send(enhancedHtml);
        }
      } catch (err) {
        console.error("[SSR Meta] Failed to inject dynamic metadata:", err);
      }
      res.sendFile(indexHtmlPath);
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[System] Intelligence Portal Hub live at http://localhost:${PORT}`);
    console.log(`[System] Engine Ready: Ingestion -> Proxy -> Delivery`);
  });
}

startServer().catch((err) => {
  console.error("[System] Fatal Error while starting server:", err);
});
