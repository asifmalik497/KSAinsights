import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Newspaper, Search, Filter, Calendar, Sparkles, ExternalLink, ArrowUpRight, TrendingUp, ShieldAlert, Zap, RefreshCw, X, FileText, Clock } from 'lucide-react';
import { cn, getLanguage, formatAlertDateTime } from '../lib/utils';
import SEO from '../components/SEO';
import { collection, query, orderBy, onSnapshot, limit, addDoc, serverTimestamp, getDocs, getDoc, doc, setDoc, increment, where, Timestamp, deleteDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { useFirebase } from '../contexts/FirebaseContext';
import { GoogleGenAI, Type } from "@google/genai";
import { FALLBACK_ALERTS } from '../data/fallbackAlerts';

const defaultTargets = [
  "https://www.spa.gov.sa/home",
  "https://hrsd.gov.sa/news",
  "https://www.misa.gov.sa/en/news/",
  "https://www.sama.gov.sa/en-US/News/Pages/default.aspx",
  "https://www.argaam.com/en",
  "https://www.asharqbusiness.com/",
  "https://www.arabianbusiness.com/gcc/saudi-arabia",
  "https://www.aleqt.com/",
  "https://www.entrepreneur.com/en-ae",
  "https://www.absher.sa/",
  "https://www.sayidaty.net/"
];

interface Alert {
  id: string;
  category: 'regulatory' | 'residency' | 'opportunity' | 'macro' | 'local' | 'intelligence' | 'lifestyle' | 'community' | 'fashion';
  impact: 'High' | 'Medium' | 'Low';
  source: string;
  date: string;
  url?: string;
  title: { en: string; ar: string; ur: string };
  summary: { en: string; ar: string; ur: string };
  aiInsight: { en: string; ar: string; ur: string };
  createdAt?: any;
}

const News: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isAdmin } = useFirebase();
  const currentLang = getLanguage(i18n.language);
  const isRTL = currentLang === 'ar' || currentLang === 'ur';
  const [filter, setFilter] = useState<'all' | 'regulatory' | 'residency' | 'opportunity' | 'macro' | 'local' | 'intelligence' | 'lifestyle' | 'community' | 'fashion'>('all');
  const [newsItems, setNewsItems] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncCount, setSyncCount] = useState(0);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const syncingRef = React.useRef(false);
  const [todayCount, setTodayCount] = useState(0);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  // Helper to resolve content handle both string and object formats from AI
  const resolveContent = (field: any, fallbackKey: string = "", langKey: string = "") => {
    const targetKey = langKey || currentLang;
    const defaultFallback = fallbackKey ? t(fallbackKey) : "";
    
    if (!field) return defaultFallback;
    
    // Handle direct string format
    if (typeof field === 'string' && field.trim() !== "") return field;
    
    // Handle multi-lang object format
    if (typeof field === 'object' && field !== null) {
      // 1. Try specified/current language
      if (field[targetKey] && typeof field[targetKey] === 'string' && field[targetKey].trim() !== "") {
        return field[targetKey];
      }
      // 2. Try English
      if (field['en'] && typeof field['en'] === 'string' && field['en'].trim() !== "") {
        return field['en'];
      }
      // 3. Try any available string value in the object
      const availableStrings = Object.values(field).filter(v => typeof v === 'string' && v.trim() !== "");
      if (availableStrings.length > 0) return availableStrings[0] as string;
    }
    
    return defaultFallback;
  };



  useEffect(() => {
    // 1. Listen for alerts (Strict 96-Hour Freshness Window)
    const fourDaysAgo = new Date();
    fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);
    
    const q = query(
      collection(db, 'strategic_alerts'),
      where('createdAt', '>=', Timestamp.fromDate(fourDaysAgo)),
      orderBy('createdAt', 'desc'),
      limit(20)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const dbAlerts = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          title: data.title || { en: data.title_en, ar: data.title_ar, ur: data.title_ur },
          summary: data.summary || { en: data.summary_en, ar: data.summary_ar, ur: data.summary_ur },
          aiInsight: data.aiInsight || { en: data.aiInsight_en, ar: data.aiInsight_ar, ur: data.aiInsight_ur }
        };
      }) as Alert[];

      // Merge fallback alerts if not already in dbAlerts to guarantee freshness
      const mergedAlerts = [...dbAlerts];
      for (const fallback of FALLBACK_ALERTS) {
        const isDuplicate = mergedAlerts.some(item => 
          (item.title?.en || "").toLowerCase().trim() === (fallback.title?.en || "").toLowerCase().trim()
        );
        if (!isDuplicate) {
          mergedAlerts.push(fallback as Alert);
        }
      }

      // Robust parser helper for safe sorting
      const getAlertTime = (alert: any) => {
        if (alert.createdAt instanceof Timestamp) {
          return alert.createdAt.toMillis();
        }
        if (alert.createdAt?.seconds) {
          return alert.createdAt.seconds * 1000;
        }
        if (alert.createdAt) {
          const t = new Date(alert.createdAt).getTime();
          if (!isNaN(t)) return t;
        }
        if (alert.date) {
          const t = new Date(alert.date).getTime();
          if (!isNaN(t)) return t;
        }
        return Date.now();
      };

      const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
      const now = Date.now();

      const freshAlerts = mergedAlerts.filter((alert: any) => {
        const alertTime = getAlertTime(alert);
        const age = now - alertTime;
        const titleText = (typeof alert.title === 'string' ? alert.title : alert.title?.en || "").toLowerCase();
        const summaryText = (typeof alert.summary === 'string' ? alert.summary : alert.summary?.en || "").toLowerCase();

        // Exclude obsolete grace period alerts or alerts older than 30 days
        if (titleText.includes("grace period") || summaryText.includes("grace period")) return false;
        if (age > THIRTY_DAYS_MS) return false;
        return true;
      });

      setNewsItems(freshAlerts.sort((a, b) => {
        return getAlertTime(b) - getAlertTime(a);
      }));
      setLoading(false);

      // Calculate Today's Count
      const startOfToday = new Date();
      startOfToday.setHours(0,0,0,0);
      const count = dbAlerts.filter(a => {
        const d = a.createdAt instanceof Timestamp ? a.createdAt.toDate() : 
                  a.createdAt?.seconds ? new Date(a.createdAt.seconds * 1000) : null;
        return d && d >= startOfToday;
      }).length;
      setTodayCount(count);

      // Auto-Seed detection
      if (snapshot.empty && !loading && isAdmin) {
        console.log("Database empty, preparing to seed as admin...");
      }
    }, (error) => {
      console.error("Firestore Error:", error);
      setLoading(false);
    });

    // 2. Listen for global stats (Viewing Only - No automatic triggers here)
    const statsUnsubscribe = onSnapshot(doc(db, 'system_stats', 'global'), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setSyncCount(data.sync_clicks || 0);
      }
    });

    // 3. One-Time Freshness Check (Safe - runs only on mount)
    const runFreshnessCheck = async () => {
      // Use local timezone for boundary calculations
      const localNow = new Date();
      const localTodayString = localNow.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      
      if (!isAdmin) return;
      try {
        const statsDoc = await getDoc(doc(db, 'system_stats', 'global'));
        if (statsDoc.exists()) {
          const data = statsDoc.data();
          const lastSync = data.last_sync_at;
          const now = Date.now();
          const twoHours = 2 * 60 * 60 * 1000;
          
          if (!lastSync || (now - lastSync.toMillis()) > twoHours) {
            console.log("Intelligence check: Dashboard aged. Triggering single update...");
            handleSync();
          }
        }
      } catch (err) {
        console.error("Freshness check failed:", err);
      }
    };

    // Check for empty collection and seed baseline data if needed (Admin only)
    const checkAndSeed = async () => {
      if (!isAdmin) return; 
      
      try {
        const snap = await getDocs(query(collection(db, 'strategic_alerts'), limit(1)));
        if (snap.empty) {
          console.log("Collection empty. Seeding baseline intelligence...");
          const SEED_DATA = [
            {
              title: { en: "Vision 2030: Major Regulatory Update for Foreign Investors", ar: "رؤية 2030: تحديث تنظيمي رئيسي للمستثمرين الأجانب", ur: "ویژن 2030: غیر ملکی سرمایہ کاروں کے لیے اہم ریگولیٹری اپ ڈیٹ" },
              summary: { en: "Saudi Arabia announces new streamlined licensing procedures for international businesses, reducing administrative hurdles by 40%.", ar: "المملكة العربية السعودية تعلن عن إجراءات ترخيص مبسطة جديدة للشركات الدولية، مما يقلل من العقبات الإدارية بنسبة 40%.", ur: "سعودی عرب نے بین الاقوامی کاروباروں کے لیے نئے ہموار لائسنسنگ طریقہ کار کا اعلان کیا ہے، جس سے انتظامی رکاوٹوں میں 40 فیصد کمی آئی ہے۔" },
              aiInsight: { en: "This move strengthens the Kingdom's position as a global investment hub. Businesses should review their current compliance status to leverage faster renewals.", ar: "هذه الخطوة تعزز مكانة المملكة كمركز استثمار عالمي. يجب على الشركات مراجعة حالة امتثالها الحالية للاستفادة من التجديدات الأسرع.", ur: "یہ قدم مملکت کی عالمی سرمایہ کاری کے مرکز کے طور بر پوزیشن کو مضبوط کرتا ہے۔ کاروباروں کو چاہیے کہ وہ تیزی سے تجدید کا فائدہ اٹھانے کے لیے اپنی موجودہ تعمیل کی صورتحال کا جائزہ لیں۔" },
              category: "regulatory", impact: "High", source: "Ministry of Investment", date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
            },
            {
              title: { en: "Tadawul Market Shift: Influx of Emerging Tech IPOs Expected", ar: "تحول سوق تداول: توقع تدفق الاكتتابات العامة لشركات التقنية الناشئة", ur: "تداول مارکیٹ میں تبدیلی: ابھرتی ہوئی ٹیک آئی پی اوز کی آمد متوقع ہے" },
              summary: { en: "Financial regulators hint at relaxed listing requirements for high-growth digital companies in Q3 2026.", ar: "تلمح الهيئات التنظيمية المالية إلى تخفيف متطلبات الإدراج للشركات الرقمية عالية النمو في الربع الثالث من عام 2026.", ur: "مالیاتی ریگولیٹرز 2026 کی تیسری سہ ماہی میں اعلی ترقی والی ڈیجیٹل کمپنیوں کے لیے فہرست سازی کی ضروریات میں نرمی کا اشارہ دیتے ہیں۔" },
              aiInsight: { en: "Investors should pivot towards digital-first portfolios. This signals a modernization of the Saudi exchange infrastructure.", ar: "يجب على المستثمرين التوجه نحو المحافظ الرقمية أولاً. وهذا يشير إلى تحديث البنية التحتية للبورصة السعودية.", ur: "سرمایہ کاروں کو ڈیجیٹل فرسٹ پورٹ فولیو کی طرف رخ کرنا چاہیے۔ یہ سعودی ایکسچینج انفراسٹرکچر کی جدید کاری کا اشارہ ہے۔" },
              category: "opportunity", impact: "Medium", source: "Tadawul", date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
            }
          ];
          for (const seed of SEED_DATA) {
            await addDoc(collection(db, 'strategic_alerts'), { ...seed, createdAt: serverTimestamp() });
          }
        }
      } catch (err) {
        console.error("Auto-seed error:", err);
      }
    };
    
    // We delay slightly to ensure auth has settled
    const timer = setTimeout(() => {
      checkAndSeed();
      runFreshnessCheck();
    }, 500);

    return () => {
      unsubscribe();
      statsUnsubscribe();
      clearTimeout(timer);
    };
  }, [isAdmin]);

  const handleSync = async () => {
    if (syncingRef.current) return;
    syncingRef.current = true;
    setSyncing(true);
    setSyncStatus("Waking up Intelligence Engine...");
    
    // Track click
    try {
      const statsRef = doc(db, 'system_stats', 'global');
      await setDoc(statsRef, { sync_clicks: increment(1) }, { merge: true });
    } catch (err) {
      console.error("Failed to track sync click:", err);
    }

    let discovered = 0;

    try {
      const runSync = async () => {
        let count = 0;
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
        const analysisModel = "gemini-3-flash-preview";

        setSyncStatus(`Initiating Strategic Omni-Scour...`);
        
        // Use the user's full local date for the search
        const localNow = new Date();
        const today = localNow.toLocaleDateString('en-US', { 
          month: 'long', 
          day: 'numeric', 
          year: 'numeric',
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone 
        });
        
        const fourDaysAgoStr = new Date(Date.now() - 96 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
          month: 'long', 
          day: 'numeric', 
          year: 'numeric' 
        });

        const prompt = `
          Current Date: ${today}.
          Analyze the latest high-impact strategic business and economic news from Saudi Arabia. 
          STRICT REQUIREMENT: Only identify developments from the LAST 96 HOURS (Since ${fourDaysAgoStr}).
          DO NOT include any historical data, archives, or news from 2024, 2025, or earlier.
          
          Sourcing priority: Umm Al-Qura Newspaper (Legal Gazette), Sayidaty (Culture & Social), Nafath (National Identity), SPA (Saudi Press Agency), MISA (Ministry of Investment), SAMA (Saudi Central Bank), Argaam, Asharq Business, HRSD (Labor/Workforce), Arabian Business (Corporate), Al Eqtisadiah (Economic Daily), Entrepreneur Middle East (SMEs), and Absher (Digital Government).
          
          Identify the 5-7 MOST RECENT and DISTINCT strategic developments.
          Focus heavily on the "Residency & Visas" (Jawazat/MOI) sector for upcoming regulatory changes.
          
          STRICT CONTENT GUIDELINES:
          - Title: Clear, professional, and descriptive.
          - Summary (Strategic Market Briefing): This must be a COMPREHENSIVE executive briefing. It should be 3-4 paragraphs long, covering the background of the news, the specific development, key stakeholders involved, and immediate consequences. It must provide "every aspect" of the news in a structured manner.
          - AI Insight (Strategic Narrative): This must be a DEEP strategic analysis (2-3 paragraphs). Focus on long-term implications for the market, competitive landscape shifts, and actionable guidance for executives.
          
          Return an ARRAY of JSON objects matching this schema:
          {
            "title": { "en": "...", "ar": "...", "ur": "..." },
            "summary": { "en": "...", "ar": "...", "ur": "..." },
            "aiInsight": { "en": "...", "ar": "...", "ur": "..." },
            "category": "regulatory" | "residency" | "opportunity" | "macro" | "local" | "intelligence" | "lifestyle" | "community" | "fashion",
            "impact": "High" | "Medium" | "Low",
            "source": "Official News Source Name",
            "date": "Today's Date (Format: Month Day, Year)",
            "url": "Reference URL or Source Homepage"
          }
        `;

        const result = await ai.models.generateContent({
          model: analysisModel,
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          config: { 
            responseMimeType: "application/json",
            tools: [{ googleSearch: {} }],
          }
        });

        let responseText = result.text;
        if (responseText.includes('```json')) {
          responseText = responseText.split('```json')[1].split('```')[0].trim();
        } else if (responseText.includes('```')) {
          responseText = responseText.split('```')[1].split('```')[0].trim();
        }

        const alerts = JSON.parse(responseText);
        const alertsArray = Array.isArray(alerts) ? alerts : [alerts];
        
        // Re-fetch existing to check for duplicates
        const q = query(collection(db, 'strategic_alerts'), orderBy('createdAt', 'desc'), limit(100));
        const snap = await getDocs(q);
        const existingItems = snap.docs.map(doc => doc.data());

        for (const alert of alertsArray) {
          const isDuplicate = existingItems.some(item => {
            const sameTitle = (item.title && item.title.en === alert.title.en);
            const sameSummary = (item.summary && item.summary.en === alert.summary.en);
            
            // Check if existing item is more than 3 days old from now
            const itemCreatedAt = item.createdAt instanceof Timestamp ? item.createdAt.toDate() : 
                                 item.createdAt?.seconds ? new Date(item.createdAt.seconds * 1000) : null;
            const isStale = itemCreatedAt ? (Date.now() - itemCreatedAt.getTime() > 3 * 24 * 60 * 60 * 1000) : false;
            
            // If it's a duplicate but the existing one is old, we allow a fresh version to be added
            return (sameTitle || sameSummary) && !isStale;
          });
          
          if (!isDuplicate) {
            try {
              // Ensure the displayed date is correct for newly discovered news
              const newsDate = alert.date || today;
              await addDoc(collection(db, 'strategic_alerts'), {
                ...alert,
                date: newsDate,
                createdAt: serverTimestamp()
              });
              count++;
              setSyncStatus(`Discovered: ${alert.title.en.substring(0, 40)}...`);
              await new Promise(r => setTimeout(r, 600)); 
            } catch (writeError: any) {
              console.error("Firestore Write Error:", writeError);
              handleFirestoreError(writeError, OperationType.CREATE, 'strategic_alerts');
            }
          }
        }
        return count;
      };

      discovered = await runSync();

      if (discovered === 0) {
        setSyncStatus("Intelligence Engine: Market is currently stable. No primary shifts detected.");
        setTimeout(() => setSyncStatus(null), 5000);
      } else {
        setSyncStatus(`Transmission Complete: ${discovered} Strategic Items Identified.`);
        
        // Update Last Sync Timestamp
        try {
          const statsRef = doc(db, 'system_stats', 'global');
          await setDoc(statsRef, { last_sync_at: serverTimestamp() }, { merge: true });
        } catch (err) {
          console.error("Failed to update sync timestamp:", err);
        }

        setTimeout(() => setSyncStatus(null), 5000);
      }
    } catch (error: any) {
      console.error("Sync Error:", error);
      setSyncStatus(`Engine Failure: ${error.message}`);
      setTimeout(() => setSyncStatus(null), 5000);
    } finally {
      syncingRef.current = false;
      setSyncing(false);
    }
  };

  const purgeHistory = async () => {
    if (!isAdmin || !window.confirm("Purge all historical intelligence? This will clear the engine's memory.")) return;
    setSyncing(true);
    setSyncStatus("Clearing archives...");
    try {
      const snap = await getDocs(collection(db, 'strategic_alerts'));
      for (const alertDoc of snap.docs) {
        await deleteDoc(doc(db, 'strategic_alerts', alertDoc.id));
      }
      setSyncStatus("Archives Purged. Ready for Fresh Sync.");
    } catch (err) {
      console.error("Purge failed:", err);
    } finally {
      setSyncing(false);
      setTimeout(() => setSyncStatus(null), 3000);
    }
  };

  const [modalScrollProgress, setModalScrollProgress] = useState(0);

  const handleModalScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const progress = (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;
    setModalScrollProgress(progress);
  };

  const categories = [
    { id: 'all', name: t('nav.categories.all') },
    { id: 'regulatory', name: t('nav.categories.regulatory') },
    { id: 'residency', name: t('nav.categories.residency') },
    { id: 'opportunity', name: t('nav.categories.opportunity') },
    { id: 'lifestyle', name: t('nav.categories.lifestyle') },
    { id: 'community', name: t('nav.categories.community') },
    { id: 'fashion', name: t('nav.categories.fashion') },
    { id: 'intelligence', name: 'Intelligence' },
    { id: 'macro', name: t('nav.categories.macro') },
    { id: 'local', name: t('nav.categories.local') },
  ];

  const filteredNews = filter === 'all' ? newsItems : newsItems.filter(item => item.category === filter);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'regulatory': return <ShieldAlert size={18} />;
      case 'opportunity': return <Zap size={18} />;
      case 'macro': return <TrendingUp size={18} />;
      case 'local': return <Calendar size={18} />;
      default: return <Newspaper size={18} />;
    }
  };

  return (
    <div className="bg-paper min-h-screen relative overflow-hidden">
      <SEO 
        title={t('nav.news')} 
        description={currentLang === 'ar' 
          ? 'مركز استخبارات الأعمال السعودي المدعوم بالذكاء الاصطناعي.' 
          : currentLang === 'ur'
          ? 'سعودی بزنس انٹیلیجنس ہب بذریعہ مصنوعی ذہانت۔'
          : 'AI-Powered Saudi Business Intelligence Hub.'}
      />
      
      {/* Decorative BG */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] emerald-gradient opacity-[0.03] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] gold-gradient opacity-[0.03] rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 pt-40 pb-32 relative z-10">
        <div className="mb-20">
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-primary mb-8 leading-[0.85] tracking-tighter">
            Market <br /><span className="text-emerald-gradient">Intelligence</span>
          </h1>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <p className="text-xl text-gray-500 font-light max-w-2xl leading-relaxed">
              {currentLang === 'ar' 
                ? 'نقوم بتصفية الضوضاء من المصادر الرسمية لنمنحك فقط الأخبار التي تؤثر على استراتيجية عملك.' 
                : currentLang === 'ur'
                ? 'ہم سرکاری ذرائع سے غیر ضروری معلومات کو فلٹر کرتے ہیں تاکہ آپ کو صرف وہی خبریں فراہم کی جائیں جو آپ کے کاروباری حکمت عملی کو متاثر کرتی ہیں۔'
                : 'We filter the noise from official sources to give you only the news that impacts your business strategy.'}
            </p>
            
            {/* Scouring Status Badge */}
            <div className="bg-white px-6 py-4 rounded-3xl border border-gray-100 flex items-center gap-4 premium-shadow">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-paper flex items-center justify-center overflow-hidden">
                    <img src={`https://picsum.photos/seed/source${i}/40/40`} className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-secondary flex items-center justify-center text-[10px] font-bold text-primary">
                  +{defaultTargets.length - 4}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  Live Scouring Active
                </div>
                <div className="text-xs font-bold text-primary flex items-center gap-2 overflow-hidden w-48">
                  <motion.div 
                    animate={{ x: [0, -400] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="flex items-center gap-4 whitespace-nowrap"
                  >
                    {[...defaultTargets, ...defaultTargets].map((url, i) => (
                      <span key={`source-tag-${i}`} className="opacity-60 text-[9px] uppercase tracking-tighter">
                        {url.replace('https://', '').replace('www.', '').split('/')[0]}
                      </span>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id as any)}
                className={cn(
                  "px-8 py-4 rounded-2xl font-bold transition-all text-sm uppercase tracking-widest premium-shadow",
                  filter === cat.id 
                    ? "emerald-gradient text-white shadow-lg shadow-emerald-500/20" 
                    : "bg-white text-primary hover:bg-gray-50 border border-gray-100"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-4">
              {isAdmin && (
                <>
                  <button
                    onClick={purgeHistory}
                    className="px-6 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all bg-red-50 text-red-400 hover:bg-red-100"
                    title="Clear Engine Memory"
                  >
                    Purge Archives
                  </button>
                  <button
                    onClick={handleSync}
                    disabled={syncing}
                    className={cn(
                      "flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all premium-shadow",
                      syncing 
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                        : "bg-primary text-white hover:bg-primary/90"
                    )}
                  >
                    <RefreshCw size={20} className={cn(syncing && "animate-spin")} />
                    {syncing ? "Syncing Intelligence..." : "Sync Intelligence"}
                  </button>
                </>
              )}
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Sparkles size={10} className="text-secondary" />
                Global Engine Syncs: {syncCount || '-' }
              </div>
              <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                <TrendingUp size={10} />
                Updates Today: {todayCount}
              </div>
              {syncStatus && isAdmin && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] font-bold text-secondary uppercase tracking-widest mt-1 bg-secondary/5 px-3 py-1 rounded-lg border border-secondary/10"
                >
                  {syncStatus}
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-emerald-500/20 rounded-full" />
              <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin absolute top-0" />
            </div>
            <p className="text-gray-400 font-bold uppercase tracking-[0.25em] text-[10px] animate-pulse">Syncing Intelligence Engine...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredNews.length === 0 && (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-gray-100 p-12 premium-shadow">
            <div className="w-24 h-24 bg-paper rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-gray-100">
              <Newspaper className="text-gray-200" size={40} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-primary mb-3">No Strategic Alerts Found</h3>
            <p className="text-gray-400 font-medium max-w-sm mx-auto">Our engine is scouring official sources. Check back later for fresh insights.</p>
          </div>
        )}

        {/* News Grid */}
        <div className="relative">
          {syncing && !loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute -top-12 inset-x-0 z-20 flex justify-center"
            >
              <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full border border-emerald-100 shadow-sm flex items-center gap-3">
                <RefreshCw size={14} className="animate-spin text-emerald-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Synchronizing Latest Market intelligence...</span>
              </div>
            </motion.div>
          )}

          <div className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700",
            syncing && "opacity-60 blur-[2px] grayscale-[0.5] pointer-events-none scale-[0.98]"
          )}>
            {filteredNews.map((news, idx) => {
              const dateTime = formatAlertDateTime(news.createdAt, news.date);
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={`news-${news.id}-${idx}`}
                  onClick={() => setSelectedAlert(news)}
                  className="group bg-white rounded-[2rem] p-6 border border-gray-100 hover:border-secondary transition-all premium-shadow flex flex-col gap-4 items-start cursor-pointer h-full"
                >
                  <div className="w-full flex items-center justify-between mb-2">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md relative",
                      news.category === 'regulatory' ? 'bg-red-500 shadow-red-500/20' : 
                      news.category === 'opportunity' ? 'bg-emerald-500 shadow-emerald-500/20' : 
                      news.category === 'local' ? 'bg-secondary shadow-secondary/20' : 'bg-primary shadow-primary/20'
                    )}>
                      {getCategoryIcon(news.category)}
                      {(news.createdAt && (Date.now() - (news.createdAt instanceof Timestamp ? news.createdAt.toMillis() : news.createdAt?.seconds ? news.createdAt.seconds * 1000 : Date.now()) < 24 * 60 * 60 * 1000)) && (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 bg-secondary text-primary text-[7px] font-black px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm"
                        >
                          NEW
                        </motion.div>
                      )}
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1">
                        <Calendar size={10} className="text-secondary" />
                        {dateTime.dateStr}
                      </div>
                      {dateTime.timeStr && (
                        <div className="text-[9px] font-mono text-secondary font-bold flex items-center gap-1">
                          <Clock size={9} />
                          {dateTime.timeStr}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-grow w-full">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="bg-paper px-2 py-0.5 rounded-full text-[8px] font-bold text-secondary uppercase tracking-widest border border-gray-100">
                        {news.source}
                      </span>
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest border",
                        news.impact === 'High' ? 'border-red-100 text-red-500 bg-red-50' : 
                        news.impact === 'Medium' ? 'border-amber-100 text-amber-500 bg-amber-50' :
                        'border-emerald-100 text-emerald-500 bg-emerald-50'
                      )}>
                        {news.impact} Impact
                      </span>
                    </div>

                    <div className="mb-3 flex items-center gap-1.5 text-[10px] font-medium text-gray-500 bg-paper px-2.5 py-1 rounded-lg border border-gray-100 w-fit">
                      <Clock size={11} className="text-secondary shrink-0" />
                      <span>Updated: <strong className="text-primary font-bold">{dateTime.fullStr}</strong></span>
                    </div>

                    <h2 className="text-lg md:text-xl font-serif font-bold text-primary mb-3 leading-tight group-hover:text-secondary transition-colors line-clamp-2">
                      {resolveContent(news.title)}
                    </h2>
                    
                    <p className="text-xs text-gray-500 font-light mb-4 leading-relaxed line-clamp-3">
                      {resolveContent(news.summary)}
                    </p>

                    {/* AI Insight Box - Mini */}
                    <div className="bg-paper rounded-2xl p-4 border-l-2 border-secondary border-y border-r border-gray-100 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-2 opacity-[0.05] text-secondary">
                        <Sparkles size={24} />
                      </div>
                      <div className="flex items-center gap-2 text-secondary font-bold text-[8px] uppercase tracking-widest mb-2">
                        <Sparkles size={10} />
                        Intelligence
                      </div>
                      <p className="text-primary font-medium italic leading-relaxed text-[11px] line-clamp-2">
                        {resolveContent(news.aiInsight)}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-auto border-t border-gray-50 w-full flex justify-end">
                    <span className="text-[9px] font-bold text-secondary uppercase tracking-widest group-hover:underline">View Intelligence →</span>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>

      {/* Action Bar */}
        <div className="mt-20 p-12 bg-primary rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative">
          <div className="absolute inset-0 emerald-gradient opacity-80" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 text-center md:text-left">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-[2rem] flex items-center justify-center border border-white/20">
              <Zap size={40} className="text-secondary" />
            </div>
            <div>
              <h3 className="text-3xl font-serif font-bold mb-2">Subscribe to Strategy</h3>
              <p className="text-white/60 font-light max-w-sm">Receive these daily AI insights directly in your email before the markets open.</p>
            </div>
          </div>
          <button className="relative z-10 gold-gradient text-primary px-12 py-5 rounded-2xl font-bold hover:scale-105 transition-all premium-shadow uppercase tracking-widest whitespace-nowrap">
            Join the List
          </button>
        </div>
      </div>

      {/* Intelligence Detail Modal */}
      <AnimatePresence>
        {selectedAlert && (
          <div onScroll={handleModalScroll} className="fixed inset-0 z-[100] overflow-y-auto bg-primary/40 backdrop-blur-md">
            <div className="min-h-screen flex items-center justify-center p-4 md:p-12 relative">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedAlert(null)}
                className="absolute inset-0 cursor-zoom-out"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                className="bg-white w-full max-w-6xl rounded-[3rem] relative z-10 premium-shadow flex flex-col overflow-hidden"
              >
              {/* Progress Bar */}
              <div className="sticky top-0 left-0 w-full h-1 bg-gray-100 z-[130]">
                <motion.div 
                  className="h-full gold-gradient shadow-[0_0_10px_#D4AF37]"
                  style={{ width: `${modalScrollProgress}%` }}
                />
              </div>

              {/* Modal Header */}
              <div className="p-6 md:p-8 border-b border-gray-100 flex items-start justify-between bg-paper shrink-0 sticky top-0 z-[120] rounded-t-[3rem]">
                <div className="flex flex-col gap-3 max-w-[85%]">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className={cn(
                      "px-4 py-1.5 rounded-full text-[9px] font-bold text-white uppercase tracking-widest flex items-center gap-2",
                      selectedAlert.category === 'regulatory' ? 'bg-red-500' : 
                      selectedAlert.category === 'opportunity' ? 'bg-emerald-500' : 
                      selectedAlert.category === 'local' ? 'bg-secondary' : 'bg-primary'
                    )}>
                      {getCategoryIcon(selectedAlert.category)}
                      {t(`nav.categories.${selectedAlert.category}`)}
                    </div>
                    <span className={cn(
                      "px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border bg-white",
                      selectedAlert.impact === 'High' ? 'border-red-100 text-red-500' : 
                      selectedAlert.impact === 'Medium' ? 'border-amber-100 text-amber-500' :
                      'border-emerald-100 text-emerald-500'
                    )}>
                      {selectedAlert.impact === 'High' ? t('news.impact.high') : selectedAlert.impact === 'Medium' ? t('news.impact.medium') : t('news.impact.low')}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-3xl font-serif font-bold text-primary leading-tight">
                    {resolveContent(selectedAlert.title, "news.modal.untitledReport")}
                  </h2>
                </div>
                <button 
                  onClick={() => setSelectedAlert(null)}
                  className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-gray-400 hover:text-primary transition-colors hover:bg-gray-50 border border-gray-100 shrink-0"
                >
                  <X size={20} className="md:w-6 md:h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div 
                className="flex-grow bg-white"
                dir="ltr"
              >
                <div className="p-4 md:p-8 w-full space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
                  <div className="flex items-center gap-6 pb-5 border-b border-gray-100 overflow-x-auto no-scrollbar">
                    <div className="flex flex-col shrink-0">
                      <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{t('news.modal.source') || 'Source'}</span>
                      <span className="font-bold text-primary text-xs whitespace-nowrap">{selectedAlert.source || "Official Channel"}</span>
                    </div>
                    <div className="w-px h-6 bg-gray-100 shrink-0" />
                    <div className="flex flex-col shrink-0">
                      <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{t('news.modal.verification') || 'Verification'}</span>
                      <span className="font-bold text-primary text-xs whitespace-nowrap">{selectedAlert.date || "Just Now"}</span>
                    </div>
                    <div className="w-px h-6 bg-gray-100 shrink-0" />
                    <div className="flex flex-col shrink-0">
                      <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Updated At</span>
                      <span className="font-bold text-secondary text-xs flex items-center gap-1 whitespace-nowrap">
                        <Clock size={11} />
                        {formatAlertDateTime(selectedAlert.createdAt, selectedAlert.date).fullStr}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
                    <section className="space-y-4">
                      <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                        <Newspaper size={16} className="text-secondary" />
                        <h3 className="text-xs font-black text-secondary uppercase tracking-[0.2em]">{t('news.modal.marketBriefing')}</h3>
                      </div>
                      <div className={cn(
                        "text-base text-gray-800 leading-relaxed whitespace-pre-wrap",
                        isRTL ? "font-arabic" : "font-light"
                      )}>
                        {resolveContent(selectedAlert.summary, "news.modal.synthesizing")}
                      </div>
                    </section>

                    <section className="bg-emerald-50/30 rounded-[2.5rem] p-6 md:p-8 border border-emerald-100/50 relative overflow-hidden flex flex-col justify-center min-h-[160px]">
                      <div className="absolute top-0 right-0 p-6 opacity-[0.05] text-emerald-900 rotate-12">
                        <Sparkles size={120} />
                      </div>
                      <div className="flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-[0.15em] mb-4">
                        <Sparkles size={16} />
                        {t('news.modal.aiStrategicNarrative')}
                      </div>
                      <div className={cn(
                        "text-primary font-medium italic leading-relaxed text-base whitespace-pre-wrap relative z-10",
                        isRTL ? "font-arabic" : ""
                      )}>
                        "{resolveContent(selectedAlert.aiInsight, "news.modal.calculating")}"
                      </div>
                    </section>
                  </div>

                  {/* Active Export Note */}
                  <div className="p-6 bg-emerald-50/30 rounded-3xl border border-emerald-100/30">
                    <div className="flex items-center gap-4 text-primary text-xs font-medium">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <ShieldAlert size={14} className="text-emerald-700" />
                      </div>
                      <p>
                        <span className="font-bold text-emerald-800">{t('news.modal.intelligenceVerified')}:</span> {t('news.modal.exportNote')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-8 bg-paper border-t border-gray-100 flex flex-wrap items-center justify-end gap-4 shrink-0">
                <button 
                  onClick={() => setSelectedAlert(null)}
                  className="px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest text-primary hover:bg-gray-100 transition-all"
                >
                  {t('news.modal.close')}
                </button>
                


                <button 
                  onClick={() => {
                    if (selectedAlert.url) {
                      window.open(selectedAlert.url, '_blank');
                    } else {
                      setSelectedAlert(null);
                    }
                  }}
                  className="flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest text-white emerald-gradient hover:scale-105 transition-all premium-shadow shadow-emerald-500/20"
                >
                  <ExternalLink size={18} />
                  {t('news.modal.originalSource')}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
    </div>
  );
};

export default News;
