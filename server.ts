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

  // In development (AI Studio preview), server must run on port 3000 (nginx listens on 8080).
  // In production (Cloud Run), server listens on PORT provided by Cloud Run (8080).
  const PORT = process.env.NODE_ENV === "production" ? (Number(process.env.PORT) || 8080) : 3000;

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
        - Ministry of Foreign Affairs (MOFA): Global visas, visit visa extensions, consular services, ratification portals (visa.mofa.gov.sa, mofa.gov.sa, services.mofa.gov.sa).
        - Ministry of Communications and Information Technology (MCIT): Tech regulations, AI initiatives, digital transformation, cloud investments, telecom spectrum, CST regulations (mcit.gov.sa, cst.gov.sa, dga.gov.sa, sdaia.gov.sa).
        - Ministry of Tourism (MT) & Saudi Tourism Authority (STA): Tourism investment regulations, tourist e-visas, hospitality licensing, destination developments (mt.gov.sa, visitsaudi.com, sta.gov.sa, tlp.sa).
        - Ministry of Sport (MOS) & Roshn Saudi League (SPL): Sports privatization, club investments, official tournament hosting (FIFA 2034, Asian Cup 2027), Esports World Cup, and major league fixture regulations (mos.gov.sa, spl.com.sa, saff.com.sa, spa.gov.sa/sport).
        - Ministry of Education (MOE): University admissions, scholarship quotas, higher education reforms, academic calendar, and unified university admission portals (Darbi, Maqbool, KSU, KFUPM, KAU).
        - Vision 2030 giga-project developments (NEOM, Red Sea, etc.).
        - Regulatory shifts from SAMA, MISA, and HRSD.
        - Major market movements and FDI trends.
        
        Requirements:
        1. Identify 6-8 of the MOST RECENT strategic developments across diverse ministries and sectors (ensure broad coverage: MOFA, MCIT, Tourism, Sports/SPL, MOE Education, SAMA, HRSD/Qiwa).
        2. Title: Professional and analytical (en, ar, ur).
        3. Summary: Concise briefing (en, ar, ur).
        4. AI Insight: Strategic narrative (en, ar, ur).
        5. Category: one of [regulatory, residency, opportunity, macro, local, education, sports].
        6. Impact: [High, Medium, Low].
        7. Source: Name of official source (e.g. Ministry of Foreign Affairs, Ministry of Tourism, Ministry of Sport, SPL, MCIT, Ministry of Education, SPA, MOI Jawazat, Umm Al-Qura, HRSD).
        
        STRICT LIMIT: Keep each language version of summary and insight under 150 words to avoid candidate token limits.
        
        Sourcing Integrity: Prioritize official portals: Saudi Ministry of Foreign Affairs (mofa.gov.sa, visa.mofa.gov.sa, services.mofa.gov.sa), Ministry of Sport (mos.gov.sa, spl.com.sa, saff.com.sa), Ministry of Communications and Information Technology (mcit.gov.sa, cst.gov.sa, dga.gov.sa), Ministry of Tourism (mt.gov.sa, visitsaudi.com, sta.gov.sa), Saudi Ministry of Education (moe.gov.sa), Umm Al-Qura Newspaper for legal text, SPA for state announcements, and Sayidaty for cultural and social developments.
        
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
        Focus areas: 
        - Ministry of Foreign Affairs (MOFA: visa.mofa.gov.sa, mofa.gov.sa, services.mofa.gov.sa - visa quotas, visit visa rules, consular services)
        - Ministry of Communications and Information Technology (MCIT: mcit.gov.sa, cst.gov.sa, dga.gov.sa, sdaia.gov.sa - AI regulations, cloud infrastructure, tech investments)
        - Ministry of Tourism (MT: mt.gov.sa, visitsaudi.com, sta.gov.sa, tlp.sa - tourism licensing, tourist e-visa expansion, hospitality sector)
        - Ministry of Sport & Roshn Saudi League (MOS: mos.gov.sa, spl.com.sa, saff.com.sa, spa.gov.sa/sport - sports privatization, major tournament bids, football fixtures, e-sports)
        - Saudi Ministry of Education (MOE & university admissions: moe.gov.sa, Noor, Madrasati)
        - Jawazat/MOI Residency & Visas (Absher, Umm Al-Qura)
        - Vision 2030 developments, SAMA, MISA, HRSD, Argaam, Tadawul.
        
        Requirements:
        1. Identify 6-8 timely, distinct strategic developments across diverse ministries and authorities (MOFA, MCIT, MT Tourism, Sports/SPL, MOE Education, SAMA, HRSD/Qiwa, MISA).
        2. Keep each language translation (English, Arabic, Urdu) concise, punchy, and impactful (around 60-120 words for summary and insight) to ensure complete structure.
        3. Title, summary, and aiInsight must be provided in all three languages: en, ar, ur.
        4. Category must be one of: regulatory, residency, opportunity, macro, local, intelligence, lifestyle, community, education, sports.
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

  // --- Private Lightweight View Counter Engine ---
  const ANALYTICS_FILE = path.join(process.cwd(), 'analytics-data.json');
  
  interface VisitRecord {
    id: string;
    page: string;
    title: string;
    referrer: string;
    timestamp: string;
    date: string; // YYYY-MM-DD
    country: string;
    countryCode: string;
    flag: string;
    device: 'Mobile' | 'Desktop';
  }

  interface AnalyticsStore {
    totalViews: number;
    pageViews: Record<string, number>;
    dailyViews: Record<string, number>;
    recentVisits: Array<{
      page: string;
      title?: string;
      referrer?: string;
      timestamp: string;
      device?: string;
      country?: string;
      countryCode?: string;
      flag?: string;
    }>;
    visits: VisitRecord[];
  }

  const COUNTRY_DIRECTORY: Record<string, { name: string; flag: string }> = {
    SA: { name: 'Saudi Arabia', flag: '🇸🇦' },
    AE: { name: 'United Arab Emirates', flag: '🇦🇪' },
    PK: { name: 'Pakistan', flag: '🇵🇰' },
    EG: { name: 'Egypt', flag: '🇪🇬' },
    IN: { name: 'India', flag: '🇮🇳' },
    QA: { name: 'Qatar', flag: '🇶🇦' },
    KW: { name: 'Kuwait', flag: '🇰🇼' },
    BH: { name: 'Bahrain', flag: '🇧🇭' },
    OM: { name: 'Oman', flag: '🇴🇲' },
    JO: { name: 'Jordan', flag: '🇯🇴' },
    LB: { name: 'Lebanon', flag: '🇱🇧' },
    US: { name: 'United States', flag: '🇺🇸' },
    GB: { name: 'United Kingdom', flag: '🇬🇧' },
    CA: { name: 'Canada', flag: '🇨🇦' },
    DE: { name: 'Germany', flag: '🇩🇪' },
    FR: { name: 'France', flag: '🇫🇷' },
    TR: { name: 'Turkey', flag: '🇹🇷' },
    BD: { name: 'Bangladesh', flag: '🇧🇩' },
    PH: { name: 'Philippines', flag: '🇵🇭' },
    MY: { name: 'Malaysia', flag: '🇲🇾' },
    ID: { name: 'Indonesia', flag: '🇮🇩' },
    SD: { name: 'Sudan', flag: '🇸🇩' },
    YE: { name: 'Yemen', flag: '🇾🇪' },
    SY: { name: 'Syria', flag: '🇸🇾' },
    IQ: { name: 'Iraq', flag: '🇮🇶' },
    MA: { name: 'Morocco', flag: '🇲🇦' },
    DZ: { name: 'Algeria', flag: '🇩🇿' },
    TN: { name: 'Tunisia', flag: '🇹🇳' },
    LK: { name: 'Sri Lanka', flag: '🇱🇰' },
    NP: { name: 'Nepal', flag: '🇳🇵' },
    AU: { name: 'Australia', flag: '🇦🇺' },
    ES: { name: 'Spain', flag: '🇪🇸' },
    IT: { name: 'Italy', flag: '🇮🇹' },
    NL: { name: 'Netherlands', flag: '🇳🇱' }
  };

  const TIMEZONE_TO_COUNTRY: Record<string, string> = {
    'Asia/Riyadh': 'SA',
    'Asia/Dubai': 'AE',
    'Asia/Karachi': 'PK',
    'Africa/Cairo': 'EG',
    'Asia/Kolkata': 'IN',
    'Asia/Calcutta': 'IN',
    'Asia/Qatar': 'QA',
    'Asia/Kuwait': 'KW',
    'Asia/Bahrain': 'BH',
    'Asia/Muscat': 'OM',
    'Asia/Amman': 'JO',
    'Asia/Beirut': 'LB',
    'Asia/Dhaka': 'BD',
    'Asia/Manila': 'PH',
    'Europe/London': 'GB',
    'America/New_York': 'US',
    'America/Chicago': 'US',
    'America/Los_Angeles': 'US',
    'America/Denver': 'US',
    'America/Toronto': 'CA',
    'Europe/Berlin': 'DE',
    'Europe/Paris': 'FR',
    'Europe/Istanbul': 'TR',
    'Australia/Sydney': 'AU',
    'Australia/Melbourne': 'AU',
    'Asia/Baghdad': 'IQ',
    'Africa/Khartoum': 'SD',
    'Asia/Aden': 'YE',
    'Asia/Colombo': 'LK',
    'Asia/Kathmandu': 'NP'
  };

  function resolvePageTitle(pagePath: string, rawTitle?: string): string {
    const clean = pagePath.split('?')[0];
    if (clean === '/') return 'KSA Insights: Sovereign Economic & Strategic Intelligence';
    if (clean === '/news') return 'Saudi Strategic & Regulatory News Alerts Feed';
    if (clean === '/blog') return 'KSA Insights Editorial Analysis & Deep Dives';
    if (clean === '/guides') return 'Saudi Vision 2030 Executive Guides & Frameworks';
    if (clean === '/higher-education') return 'Saudi University Admissions & Mawzoonah Calculator';
    if (clean === '/expat-hub') return 'Saudi Expatriate Mobility & Labor Law Hub';
    if (clean === '/faq') return 'Frequently Asked Questions & Policy Help';
    if (clean === '/about') return 'About KSA Insights Editorial Council';
    if (clean === '/contact') return 'Contact & Strategic Inquiries';
    if (clean === '/consultancy') return 'Bespoke Advisory & Business Intelligence';
    if (clean === '/content-lab') return 'Content Lab & Editorial Verification';
    if (clean === '/ai-certifications' || clean === '/certifications/ai-900' || clean === '/ai-900') return 'Microsoft AI-900 & Sovereign Cloud Certifications';
    if (clean === '/admin/seo' || clean === '/seo-dashboard') return 'SEO Performance & Readership Command Center';
    
    // Check if it's a blog post
    if (clean.startsWith('/blog/')) {
      const slug = clean.replace('/blog/', '');
      const match = staticPosts.find(p => p.id === slug || (slug.includes('qiwa') && p.id.includes('qiwa')) || (slug.includes('air-show') && p.id.includes('air-show')));
      if (match) return match.title.en;

      // Convert kebab-case slug to readable title
      const titleFromSlug = slug
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      return titleFromSlug;
    }

    if (rawTitle && rawTitle !== clean && !rawTitle.startsWith('/')) {
      return rawTitle;
    }

    return clean;
  }

  function resolveCountry(req: express.Request, bodyTz?: string, bodyLang?: string): { code: string; name: string; flag: string } {
    const headerCode = (req.headers['cf-ipcountry'] || req.headers['x-appengine-country'] || req.headers['x-country-code']) as string;
    if (headerCode && headerCode.length === 2 && COUNTRY_DIRECTORY[headerCode.toUpperCase()]) {
      const info = COUNTRY_DIRECTORY[headerCode.toUpperCase()];
      return { code: headerCode.toUpperCase(), name: info.name, flag: info.flag };
    }

    if (bodyTz && TIMEZONE_TO_COUNTRY[bodyTz]) {
      const code = TIMEZONE_TO_COUNTRY[bodyTz];
      const info = COUNTRY_DIRECTORY[code];
      return { code, name: info.name, flag: info.flag };
    }

    const lang = (bodyLang || (req.headers['accept-language'] as string) || '').toLowerCase();
    if (lang.includes('-sa') || lang.includes('_sa')) return { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' };
    if (lang.includes('-ae') || lang.includes('_ae')) return { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' };
    if (lang.includes('-pk') || lang.includes('_pk')) return { code: 'PK', name: 'Pakistan', flag: '🇵🇰' };
    if (lang.includes('-eg') || lang.includes('_eg')) return { code: 'EG', name: 'Egypt', flag: '🇪🇬' };
    if (lang.includes('-in') || lang.includes('_in')) return { code: 'IN', name: 'India', flag: '🇮🇳' };
    if (lang.includes('-qa') || lang.includes('_qa')) return { code: 'QA', name: 'Qatar', flag: '🇶🇦' };
    if (lang.includes('-kw') || lang.includes('_kw')) return { code: 'KW', name: 'Kuwait', flag: '🇰🇼' };
    if (lang.includes('-gb') || lang.includes('_gb')) return { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' };
    if (lang.includes('-us') || lang.includes('_us')) return { code: 'US', name: 'United States', flag: '🇺🇸' };

    return { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' };
  }

  let analyticsData: AnalyticsStore = {
    totalViews: 0,
    pageViews: {},
    dailyViews: {},
    recentVisits: [],
    visits: []
  };

  try {
    if (fs.existsSync(ANALYTICS_FILE)) {
      const raw = JSON.parse(fs.readFileSync(ANALYTICS_FILE, 'utf8'));
      analyticsData = {
        totalViews: raw.totalViews || 0,
        pageViews: raw.pageViews || {},
        dailyViews: raw.dailyViews || {},
        recentVisits: raw.recentVisits || [],
        visits: raw.visits || []
      };
    }
  } catch (err) {
    console.warn("[Analytics] Initialized fresh analytics store");
  }

  let saveAnalyticsTimeout: NodeJS.Timeout | null = null;
  const scheduleSaveAnalytics = () => {
    if (saveAnalyticsTimeout) return;
    saveAnalyticsTimeout = setTimeout(() => {
      saveAnalyticsTimeout = null;
      try {
        fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(analyticsData, null, 2), 'utf8');
      } catch (e: any) {
        console.warn("[Analytics] Error saving analytics file:", e.message);
      }
    }, 1500);
  };

  // POST /api/analytics/view - Record a private page view with country and device geo-metrics
  app.post("/api/analytics/view", (req, res) => {
    try {
      const { page, title, referrer, timeZone, language } = req.body || {};
      if (!page || typeof page !== 'string') {
        return res.status(400).json({ success: false, error: "Invalid page" });
      }

      const cleanPath = page.split('?')[0];
      const now = new Date();
      const today = now.toISOString().split('T')[0];
      const userAgent = req.headers['user-agent'] || '';
      const isMobile = /mobile|iphone|android|ipad/i.test(userAgent);
      const geo = resolveCountry(req, timeZone, language);

      const visitRecord: VisitRecord = {
        id: `v_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        page: cleanPath,
        title: title || cleanPath,
        referrer: referrer || 'Direct',
        timestamp: now.toISOString(),
        date: today,
        country: geo.name,
        countryCode: geo.code,
        flag: geo.flag,
        device: isMobile ? 'Mobile' : 'Desktop'
      };

      // Increment counters
      analyticsData.totalViews = (analyticsData.totalViews || 0) + 1;
      analyticsData.pageViews[cleanPath] = (analyticsData.pageViews[cleanPath] || 0) + 1;
      analyticsData.dailyViews[today] = (analyticsData.dailyViews[today] || 0) + 1;

      // Add to rolling visits array (keep up to 10,000 records)
      if (!analyticsData.visits) analyticsData.visits = [];
      analyticsData.visits.unshift(visitRecord);
      if (analyticsData.visits.length > 10000) {
        analyticsData.visits = analyticsData.visits.slice(0, 10000);
      }

      // Add to recent visits feed (max 60)
      if (!analyticsData.recentVisits) analyticsData.recentVisits = [];
      analyticsData.recentVisits.unshift({
        page: cleanPath,
        title: title || cleanPath,
        referrer: referrer || 'Direct',
        timestamp: now.toISOString(),
        device: isMobile ? 'Mobile' : 'Desktop',
        country: geo.name,
        countryCode: geo.code,
        flag: geo.flag
      });
      if (analyticsData.recentVisits.length > 60) {
        analyticsData.recentVisits = analyticsData.recentVisits.slice(0, 60);
      }

      scheduleSaveAnalytics();
      return res.json({ success: true, count: analyticsData.pageViews[cleanPath], country: geo.name });
    } catch (e: any) {
      return res.status(500).json({ success: false, error: e.message });
    }
  });

  // GET /api/analytics/stats - Private Stats with Date Filtering & Per-Article Country Breakdown
  app.get("/api/analytics/stats", (req, res) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const requestedDate = req.query.date as string | undefined; // e.g. "2026-10-09"
      const range = (req.query.range as string) || (requestedDate ? 'single' : 'all');
      
      const visits = analyticsData.visits || [];

      // Filter visits based on date/range
      let filteredVisits = visits;
      if (requestedDate) {
        filteredVisits = visits.filter(v => v.date === requestedDate);
      } else if (range === 'today') {
        filteredVisits = visits.filter(v => v.date === today);
      } else if (range === 'yesterday') {
        const y = new Date();
        y.setDate(y.getDate() - 1);
        const yStr = y.toISOString().split('T')[0];
        filteredVisits = visits.filter(v => v.date === yStr);
      } else if (range === '7d') {
        const past = new Date();
        past.setDate(past.getDate() - 7);
        const pastStr = past.toISOString().split('T')[0];
        filteredVisits = visits.filter(v => v.date >= pastStr);
      } else if (range === '30d') {
        const past = new Date();
        past.setDate(past.getDate() - 30);
        const pastStr = past.toISOString().split('T')[0];
        filteredVisits = visits.filter(v => v.date >= pastStr);
      }

      // Group by article / page with country and device breakdown
      const pageMap: Record<string, {
        page: string;
        title: string;
        views: number;
        countryCounts: Record<string, { name: string; code: string; flag: string; count: number }>;
        devices: { mobile: number; desktop: number };
      }> = {};

      const overallCountryMap: Record<string, { name: string; code: string; flag: string; count: number }> = {};
      let mobileCount = 0;
      let desktopCount = 0;

      filteredVisits.forEach(v => {
        // Overall Device
        if (v.device === 'Mobile') mobileCount++;
        else desktopCount++;

        // Overall Country
        const cCode = v.countryCode || 'SA';
        if (!overallCountryMap[cCode]) {
          overallCountryMap[cCode] = {
            name: v.country || 'Saudi Arabia',
            code: cCode,
            flag: v.flag || '🇸🇦',
            count: 0
          };
        }
        overallCountryMap[cCode].count++;

        // Page specific
        if (!pageMap[v.page]) {
          pageMap[v.page] = {
            page: v.page,
            title: v.title || v.page,
            views: 0,
            countryCounts: {},
            devices: { mobile: 0, desktop: 0 }
          };
        }
        pageMap[v.page].views++;
        if (v.device === 'Mobile') pageMap[v.page].devices.mobile++;
        else pageMap[v.page].devices.desktop++;

        if (!pageMap[v.page].countryCounts[cCode]) {
          pageMap[v.page].countryCounts[cCode] = {
            name: v.country || 'Saudi Arabia',
            code: cCode,
            flag: v.flag || '🇸🇦',
            count: 0
          };
        }
        pageMap[v.page].countryCounts[cCode].count++;
      });

      // Format page breakdown with sorted countries and percentages
      const articleBreakdowns = Object.values(pageMap)
        .map(p => {
          const countries = Object.values(p.countryCounts)
            .map(c => ({
              country: c.name,
              countryCode: c.code,
              flag: c.flag,
              count: c.count,
              percentage: p.views > 0 ? Math.round((c.count / p.views) * 100) : 0
            }))
            .sort((a, b) => b.count - a.count);

          const category = p.page.startsWith('/blog') 
            ? 'Blog Post' 
            : p.page.startsWith('/news') 
            ? 'Strategic News' 
            : p.page.startsWith('/guides') 
            ? 'Vision 2030 Guide'
            : p.page.startsWith('/higher-education')
            ? 'Higher Education'
            : p.page.startsWith('/expat-hub')
            ? 'Expat Hub'
            : 'Platform Hub';

          return {
            page: p.page,
            title: resolvePageTitle(p.page, p.title),
            category,
            views: p.views,
            countries,
            devices: p.devices
          };
        })
        .sort((a, b) => b.views - a.views);

      // Format overall country breakdown
      const totalFilteredViews = filteredVisits.length;
      const sortedOverallCountries = Object.values(overallCountryMap)
        .map(c => ({
          country: c.name,
          countryCode: c.code,
          flag: c.flag,
          count: c.count,
          percentage: totalFilteredViews > 0 ? Math.round((c.count / totalFilteredViews) * 100) : 0
        }))
        .sort((a, b) => b.count - a.count);

      // Collect available calendar dates that have recorded visits
      const availableDates = Array.from(new Set(visits.map(v => v.date))).sort().reverse();
      if (!availableDates.includes(today)) availableDates.unshift(today);

      return res.json({
        totalViews: analyticsData.totalViews,
        todayViews: analyticsData.dailyViews[today] || 0,
        selectedFilter: {
          date: requestedDate || null,
          range: range,
          viewsInRange: totalFilteredViews
        },
        devices: {
          mobile: mobileCount,
          desktop: desktopCount,
          mobilePercentage: totalFilteredViews > 0 ? Math.round((mobileCount / totalFilteredViews) * 100) : 0,
          desktopPercentage: totalFilteredViews > 0 ? Math.round((desktopCount / totalFilteredViews) * 100) : 0
        },
        availableDates,
        overallCountries: sortedOverallCountries,
        articleBreakdowns,
        recentVisits: analyticsData.recentVisits.slice(0, 25),
        dailyViews: analyticsData.dailyViews
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // POST /api/analytics/test-visit - Test-log an organic visit with country from admin panel
  app.post("/api/analytics/test-visit", (req, res) => {
    try {
      const { page, countryCode, device } = req.body || {};
      const cleanPath = (page || '/blog/qiwa-labor-law-iqama-transfer-guide-2026').split('?')[0];
      const code = (countryCode || 'SA').toUpperCase();
      const countryInfo = COUNTRY_DIRECTORY[code] || { name: 'Saudi Arabia', flag: '🇸🇦' };
      const now = new Date();
      const today = now.toISOString().split('T')[0];
      const title = resolvePageTitle(cleanPath);

      const visitRecord: VisitRecord = {
        id: `v_test_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        page: cleanPath,
        title,
        referrer: 'Admin Simulation Test',
        timestamp: now.toISOString(),
        date: today,
        country: countryInfo.name,
        countryCode: code,
        flag: countryInfo.flag,
        device: (device === 'Mobile' ? 'Mobile' : 'Desktop')
      };

      analyticsData.totalViews = (analyticsData.totalViews || 0) + 1;
      analyticsData.pageViews[cleanPath] = (analyticsData.pageViews[cleanPath] || 0) + 1;
      analyticsData.dailyViews[today] = (analyticsData.dailyViews[today] || 0) + 1;

      if (!analyticsData.visits) analyticsData.visits = [];
      analyticsData.visits.unshift(visitRecord);

      if (!analyticsData.recentVisits) analyticsData.recentVisits = [];
      analyticsData.recentVisits.unshift({
        page: cleanPath,
        title,
        referrer: 'Admin Simulation Test',
        timestamp: now.toISOString(),
        device: visitRecord.device,
        country: countryInfo.name,
        countryCode: code,
        flag: countryInfo.flag
      });

      scheduleSaveAnalytics();
      return res.json({ success: true, visit: visitRecord });
    } catch (e: any) {
      return res.status(500).json({ success: false, error: e.message });
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
