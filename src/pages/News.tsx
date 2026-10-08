import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Newspaper, Search, Filter, Calendar, Sparkles, ExternalLink, ArrowUpRight, TrendingUp, ShieldAlert, Zap, RefreshCw, X, FileText, Clock, GraduationCap, Globe, Building2, Landmark, CheckCircle2, Layers, Briefcase, Compass, Cpu, Check, SlidersHorizontal, RotateCcw, AlertCircle, Trophy } from 'lucide-react';
import { cn, getLanguage, formatAlertDateTime } from '../lib/utils';
import SEO from '../components/SEO';
import { collection, query, orderBy, onSnapshot, limit, addDoc, serverTimestamp, getDocs, getDoc, doc, setDoc, increment, where, Timestamp, deleteDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, isQuotaError, isQuotaExceeded, setQuotaExceeded } from '../firebase';
import { useFirebase } from '../contexts/FirebaseContext';
import { FALLBACK_ALERTS } from '../data/fallbackAlerts';

const defaultTargets = [
  // Ministry of Sport (MOS), SPL & Sports Federation Portals
  "https://www.mos.gov.sa/",
  "https://www.spa.gov.sa/sport",
  "https://www.spl.com.sa/",
  "https://www.saff.com.sa/",
  "https://olympic.sa/",
  "https://saudiesports.sa/",

  // Ministry of Foreign Affairs (MOFA) & Sub-Pages
  "https://www.mofa.gov.sa/",
  "https://visa.mofa.gov.sa/",
  "https://services.mofa.gov.sa/",
  "https://enjazit.com.sa/",
  
  // Ministry of Communications & Information Technology (MCIT) & Sub-Pages
  "https://www.mcit.gov.sa/",
  "https://www.cst.gov.sa/",
  "https://www.dga.gov.sa/",
  "https://sdaia.gov.sa/",

  // Ministry of Tourism (MT) & Sub-Pages
  "https://www.mt.gov.sa/",
  "https://www.visitsaudi.com/",
  "https://sta.gov.sa/",
  "https://tlp.sa/",

  // Strategic Portals & Sovereign Authorities
  "https://www.moe.gov.sa/en/news/",
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

export interface ScourPortalRegistry {
  ministry: { en: string; ar: string; ur: string };
  code: string;
  badge: string;
  portalUrl: string;
  subPages: {
    name: { en: string; ar: string; ur: string };
    url: string;
    purpose: { en: string; ar: string; ur: string };
  }[];
}

export const SCOUR_MINISTRIES_REGISTRY: ScourPortalRegistry[] = [
  {
    ministry: {
      en: "Ministry of Foreign Affairs (MOFA)",
      ar: "وزارة الخارجية",
      ur: "وزارتِ خارجہ (MOFA)"
    },
    code: "MOFA",
    badge: "Visas & Consular",
    portalUrl: "https://www.mofa.gov.sa/",
    subPages: [
      {
        name: { en: "Unified KSA Visa Platform (Enjaz)", ar: "المنصة الوطنية الموحدة للتأشيرات", ur: "کے ایس اے ویزا پلیٹ فارم (انجاز)" },
        url: "https://visa.mofa.gov.sa/",
        purpose: { en: "Family visit visas, business visas, work endorsements, transit visas", ar: "تأشيرات الزيارة العائلية، التجارية، العمل، والمرور", ur: "فیملی وزٹ ویزا، بزنس ویزا، ورک تصدیق، ٹرانزٹ ویزا" }
      },
      {
        name: { en: "Electronic Consular & Ratification Services", ar: "منظومة الخدمات والتصاديق القنصلية", ur: "قونصلر و تصدیقی خدمات پورٹل" },
        url: "https://services.mofa.gov.sa/",
        purpose: { en: "Digital apostille, legal documents, commercial contract attestations", ar: "التصديق الرقمي على الوثائق، العقود التجارية، وتفويض التأشيرات", ur: "ڈیجیٹل دستاویزات، تجارتی معاہدوں کی تصدیق اور اختیارات" }
      },
      {
        name: { en: "Diplomatic Inquiries & Tracking", ar: "منصة الاستعلام والمتابعة القنصلية", ur: "قونصلر انکوائری و ٹریکنگ پورٹل" },
        url: "https://enjazit.com.sa/",
        purpose: { en: "Live application tracking, mission delegation processing", ar: "متابعة الطلبات وتفويض ممثليات الخارج", ur: "درخواست کی صورتحال اور سفارتی مشن کی معلومات" }
      }
    ]
  },
  {
    ministry: {
      en: "Ministry of Communications & Information Technology (MCIT)",
      ar: "وزارة الاتصالات وتقنية المعلومات",
      ur: "وزارتِ مواصلات و انفارمیشن ٹیکنالوجی (MCIT)"
    },
    code: "MCIT",
    badge: "AI & Digital Tech",
    portalUrl: "https://www.mcit.gov.sa/",
    subPages: [
      {
        name: { en: "Communications, Space & Technology Commission (CST)", ar: "هيئة الاتصالات والفضاء والتقنية", ur: "کمیونیکیشنز، اسپیس اینڈ ٹیکنالوجی کمیشن (CST)" },
        url: "https://www.cst.gov.sa/",
        purpose: { en: "Cloud computing regulatory sandbox, frequency spectrum, IoT licensing", ar: "تنظيم الحوسبة السحابية، الطيف الترددي، وتراخيص إنترنت الأشياء", ur: "کلاؤڈ کمپیوٹنگ ریگولیٹری سینڈ باکس، فریکوئنسی اور آئی او ٹی لائسنس" }
      },
      {
        name: { en: "Digital Government Authority (DGA)", ar: "هيئة الحكومة الرقمية", ur: "ڈیجیٹل گورنمنٹ اتھارٹی (DGA)" },
        url: "https://www.dga.gov.sa/",
        purpose: { en: "Government digital transformation standards, enterprise interoperability", ar: "معايير التحول الرقمي الحكومي والربط التقني الموحد", ur: "سرکاری ڈیجیٹل ٹرانسفارمیشن معیارات اور انٹرآپریبلٹی" }
      },
      {
        name: { en: "Saudi Data & AI Authority (SDAIA)", ar: "الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا)", ur: "سعودی ڈیٹا اینڈ اے آئی اتھارٹی (سدايا)" },
        url: "https://sdaia.gov.sa/",
        purpose: { en: "Personal Data Protection Law (PDPL), sovereign AI compute, Tawakkalna", ar: "نظام حماية البيانات الشخصية، مبادرات الذكاء الاصطناعي، وتوكلنا", ur: "پرسنل ڈیٹا پروٹیکشن لاء، خود مختار اے آئی فریم ورک اور توکلنا" }
      }
    ]
  },
  {
    ministry: {
      en: "Ministry of Tourism (MT)",
      ar: "وزارة السياحة",
      ur: "وزارتِ سیاحت (MT)"
    },
    code: "TOURISM",
    badge: "Travel & Hospitality",
    portalUrl: "https://www.mt.gov.sa/",
    subPages: [
      {
        name: { en: "Visit Saudi National Gateway", ar: "منصة روح السعودية الرسمية", ur: "روح السعودية / وزٹ سعودی پورٹل" },
        url: "https://visitsaudi.com/",
        purpose: { en: "Instant tourist e-visas, GCC resident visas, seasonal festival passes", ar: "التأشيرات السياحية الإلكترونية الفورية وتصاريح الفعاليات", ur: "فوری سیاحتی ای ویزا، جی سی سی اقامہ ہولڈرز ویزا اور فیسٹیول پاسز" }
      },
      {
        name: { en: "Saudi Tourism Authority (STA)", ar: "الهيئة السعودية للسياحة", ur: "سعودی ٹورازم اتھارٹی (STA)" },
        url: "https://sta.gov.sa/",
        purpose: { en: "Global promotional campaigns, trade partnerships, market intelligence", ar: "الشراكات الدولية، الحملات الترويجية العالمية، واستخبارات السوق", ur: "بین الاقوامی تجارتی شراکتیں، عالمی مہمات اور سیاحتی مارکیٹ تجزیات" }
      },
      {
        name: { en: "Tourism Licensing Platform (TLP)", ar: "منصة التراخيص السياحية الموحدة", ur: "نیشنل ٹورازم لائسنسنگ پلیٹ فارم" },
        url: "https://tlp.sa/",
        purpose: { en: "Hotel classification permits, tourist guide accreditation, resort licenses", ar: "تصنيف الفنادق ومرافق الإيواء، تراخيص الإرشاد السياحي والمنتجعات", ur: "ہوٹل درجہ بندی پرمٹ، ٹورسٹ گائیڈ لائسنس اور ریزورٹ این او سی" }
      }
    ]
  },
  {
    ministry: {
      en: "Ministry of Interior (MOI)",
      ar: "وزارة الداخلية",
      ur: "وزارتِ داخلہ (MOI)"
    },
    code: "MOI",
    badge: "Residency & Security",
    portalUrl: "https://www.moi.gov.sa/",
    subPages: [
      {
        name: { en: "Absher Individuals & Business", ar: "منصة أبشر أفراد وأعمال", ur: "ابشر پلیٹ فارم (افراد و بزنس)" },
        url: "https://www.absher.sa/",
        purpose: { en: "Iqama renewal, exit/re-entry visas, traffic permits, civil registry", ar: "تجديد الإقامات، تأشيرات الخروج والعودة، رخص القيادة والأحوال المدنية", ur: "اقامہ تجدید، خروج و عودہ، ٹریفک و سول افیئرز" }
      },
      {
        name: { en: "Directorate General of Passports (Jawazat)", ar: "المديرية العامة للجوازات", ur: "محکمہ پاسپورٹ و امیگریشن (جوازات)" },
        url: "https://www.gdp.gov.sa/",
        purpose: { en: "Borders, residency directives, deportations, entry guidelines", ar: "المنافذ الحدودية، أنظمة الإقامة والوافدين، وتعليمات الدخول", ur: "بارڈر کنٹرول، امیگریشن قوانین اور غیر ملکی شہریوں کے لیے ہدایات" }
      }
    ]
  },
  {
    ministry: {
      en: "Ministry of Education (MOE)",
      ar: "وزارة التعليم",
      ur: "وزارتِ تعلیم (MOE)"
    },
    code: "MOE",
    badge: "Admissions & Academics",
    portalUrl: "https://www.moe.gov.sa/",
    subPages: [
      {
        name: { en: "Noor Educational System", ar: "نظام نور التعليمي", ur: "نور تعلیمی نظام" },
        url: "https://noor.moe.gov.sa/",
        purpose: { en: "Student grades, high school graduation certifications, transcripts", ar: "الدرجات المدرسية، شهادات الثانوية العامة والنتائج الأكاديمية", ur: "طلباء کے امتحانی نتائج، گریجویشن سرٹیفکیٹس اور مارک شیٹ" }
      },
      {
        name: { en: "Study in Saudi Portal", ar: "منصة ادرس في السعودية", ur: "اسٹڈی ان سعودی پورٹل" },
        url: "https://studyinsaudi.moe.gov.sa/",
        purpose: { en: "International student scholarships and university admission", ar: "المنح الدراسية والقبول الجامعي للطلاب الدوليين", ur: "بین الاقوامی طلباء کے لیے اسکالرشپ اور یونیورسٹی داخلے" }
      }
    ]
  },
  {
    ministry: {
      en: "Ministry of Human Resources (MHRSD)",
      ar: "وزارة الموارد البشرية والتنمية الاجتماعية",
      ur: "وزارتِ انسانی وسائل و سماجی بہبود (MHRSD)"
    },
    code: "MHRSD",
    badge: "Labor & Qiwa",
    portalUrl: "https://hrsd.gov.sa/",
    subPages: [
      {
        name: { en: "Qiwa Integrated Labor Platform", ar: "منصة قوى الرقمية", ur: "قویٰ لیبر پلیٹ فارم" },
        url: "https://qiwa.sa/",
        purpose: { en: "Job mobility, e-contracts, work permit quotas, Saudization", ar: "نقل الخدمات، توثيق العقود، رخص العمل، ونسب التوطين", ur: "کفالہ ٹرانسفر، ڈیجیٹل معاہدات، ورک پرمٹ اور سعودائزیشن" }
      }
    ]
  },
  {
    ministry: {
      en: "Ministry of Sport & Roshn Saudi League (MOS)",
      ar: "وزارة الرياضة ورابطة الدوري السعودي",
      ur: "وزارتِ کھیل و سعودی لیگ (MOS / SPL)"
    },
    code: "MOS",
    badge: "Sports & SPL",
    portalUrl: "https://www.mos.gov.sa/",
    subPages: [
      {
        name: { en: "Saudi Press Agency Sports Wire (SPA)", ar: "وكالة الأنباء السعودية - الرياضة", ur: "سعودی پریس ایجنسی اسپورٹس" },
        url: "https://www.spa.gov.sa/sport",
        purpose: { en: "Official decrees, tournament hosting, national teams, Olympic updates", ar: "البيانات الرسمية، استضافة البطولات العالمية، والمنتخبات الوطنية", ur: "سرکاری اعلانات، عالمی ٹورنامنٹس اور قومی ٹیمیں" }
      },
      {
        name: { en: "Roshn Saudi League (SPL)", ar: "رابطة الدوري السعودي للمحترفين", ur: "روشن سعودی لیگ (SPL)" },
        url: "https://www.spl.com.sa/",
        purpose: { en: "Official match fixtures, club transfers, player registrations, league standings", ar: "جداول المباريات الرسمية، انتقالات الأندية، وترتيب دوري روشن", ur: "میچ شیڈول، کھلاڑیوں کے ٹرانسفر اور پوائنٹس ٹیبل" }
      },
      {
        name: { en: "Saudi Arabian Football Federation (SAFF)", ar: "الاتحاد السعودي لكرة القدم", ur: "سعودی فٹ بال فیڈریشن (SAFF)" },
        url: "https://www.saff.com.sa/",
        purpose: { en: "King Cup, Super Cup, referee directives, World Cup 2034 bidding progress", ar: "كأس خادم الحرمين الشريفين، وملف استضافة كأس العالم 2034", ur: "کنگز کپ، سپر کپ اور ورلڈ کپ 2034 کا ملف" }
      },
      {
        name: { en: "Saudi Esports Federation (SEF)", ar: "الاتحاد السعودي للرياضات الإلكترونية", ur: "سعودی ای اسپورٹس فیڈریشن" },
        url: "https://saudiesports.sa/",
        purpose: { en: "Esports World Cup (EWC), elite gaming circuits, national gaming strategy", ar: "كأس العالم للرياضات الإلكترونية ودوريات النخبة", ur: "ای اسپورٹس ورلڈ کپ اور گیمنگ ایونٹس" }
      }
    ]
  }
];

export type NewsCategory = 'all' | 'ministries' | 'business' | 'vision2030' | 'residency' | 'education' | 'tech' | 'sports';

export interface CategoryDefinition {
  id: NewsCategory;
  labelKey: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accentColor: string;
}

export const NEWS_CATEGORIES: CategoryDefinition[] = [
  { id: 'all', labelKey: 'news.categories.all', icon: Newspaper, accentColor: 'text-primary' },
  { id: 'ministries', labelKey: 'news.categories.ministries', icon: Landmark, accentColor: 'text-emerald-700' },
  { id: 'business', labelKey: 'news.categories.business', icon: Briefcase, accentColor: 'text-blue-700' },
  { id: 'vision2030', labelKey: 'news.categories.vision2030', icon: Compass, accentColor: 'text-amber-700' },
  { id: 'sports', labelKey: 'news.categories.sports', icon: Trophy, accentColor: 'text-amber-600' },
  { id: 'residency', labelKey: 'news.categories.residency', icon: ShieldAlert, accentColor: 'text-rose-700' },
  { id: 'education', labelKey: 'news.categories.education', icon: GraduationCap, accentColor: 'text-purple-700' },
  { id: 'tech', labelKey: 'news.categories.tech', icon: Cpu, accentColor: 'text-cyan-700' },
];

export const MINISTRY_FILTER_OPTIONS = [
  { id: 'all', code: 'ALL', label: { en: 'All Ministries', ar: 'كافة الوزارات', ur: 'تمام وزارتیں' } },
  { id: 'sports', code: 'MOS / SPL', label: { en: 'Sports & SPL (MOS)', ar: 'الرياضة ودوري روشن', ur: 'کھیل و سعودی لیگ' } },
  { id: 'mofa', code: 'MOFA', label: { en: 'Foreign Affairs (MOFA)', ar: 'وزارة الخارجية', ur: 'وزارتِ خارجہ' } },
  { id: 'moi', code: 'MOI / GDP', label: { en: 'Interior & Passports (MOI)', ar: 'الداخلية والجوازات', ur: 'وزارتِ داخلہ و جوازات' } },
  { id: 'mcit', code: 'MCIT / CST', label: { en: 'Telecom & AI (MCIT / CST)', ar: 'الاتصالات والذكاء الاصطناعي', ur: 'مواصلات و اے آئی' } },
  { id: 'tourism', code: 'MT', label: { en: 'Tourism (Visit Saudi)', ar: 'السياحة وروح السعودية', ur: 'وزارتِ سیاحت' } },
  { id: 'moe', code: 'MOE', label: { en: 'Education (MOE)', ar: 'وزارة التعليم', ur: 'وزارتِ تعلیم' } },
  { id: 'hrsd', code: 'MHRSD', label: { en: 'Human Resources (Qiwa)', ar: 'الموارد البشرية وقوى', ur: 'انسانی وسائل و قویٰ' } },
  { id: 'misa', code: 'MISA / MOMRAH', label: { en: 'Investment & Housing', ar: 'الاستثمار والإسكان', ur: 'سرمایہ کاری و بلدیات' } },
  { id: 'sama', code: 'SAMA / ZATCA', label: { en: 'Central Bank & Tax', ar: 'البنك المركزي والزكاة', ur: 'ساما و زکوٰۃ اتھارٹی' } },
];

export const getAlertSearchableText = (alert: Alert): string => {
  const parts: string[] = [
    alert.source || '',
    alert.category || '',
    alert.impact || '',
    typeof alert.title === 'string' ? alert.title : `${alert.title?.en || ''} ${alert.title?.ar || ''} ${alert.title?.ur || ''}`,
    typeof alert.summary === 'string' ? alert.summary : `${alert.summary?.en || ''} ${alert.summary?.ar || ''} ${alert.summary?.ur || ''}`,
    typeof alert.aiInsight === 'string' ? alert.aiInsight : `${alert.aiInsight?.en || ''} ${alert.aiInsight?.ar || ''} ${alert.aiInsight?.ur || ''}`,
  ];
  return parts.join(' ').toLowerCase();
};

export const matchesCategory = (alert: Alert, cat: NewsCategory): boolean => {
  if (cat === 'all') return true;
  const text = getAlertSearchableText(alert);
  const src = (alert.source || '').toLowerCase();
  const rawCat = (alert.category || '').toLowerCase();

  switch (cat) {
    case 'ministries':
      return (
        rawCat === 'regulatory' ||
        src.includes('ministry') ||
        src.includes('وزارة') ||
        src.includes('وزارت') ||
        src.includes('authority') ||
        src.includes('هيئة') ||
        src.includes('اتحاد') ||
        src.includes('mofa') ||
        src.includes('mcit') ||
        src.includes('cst') ||
        src.includes('sdaia') ||
        src.includes('moi') ||
        src.includes('moe') ||
        src.includes('hrsd') ||
        src.includes('misa') ||
        src.includes('sama') ||
        src.includes('rega') ||
        src.includes('zatca') ||
        src.includes('cma') ||
        src.includes('mod') ||
        src.includes('momrah') ||
        src.includes('gaca') ||
        src.includes('jawazat') ||
        src.includes('qiwa') ||
        src.includes('spa') ||
        src.includes('واس')
      );
    case 'business':
      return (
        rawCat === 'opportunity' ||
        rawCat === 'macro' ||
        text.includes('investment') ||
        text.includes('investor') ||
        text.includes('business') ||
        text.includes('commercial') ||
        text.includes('fintech') ||
        text.includes('bank') ||
        text.includes('sama') ||
        text.includes('tadawul') ||
        text.includes('zatca') ||
        text.includes('tax') ||
        text.includes('e-invoicing') ||
        text.includes('فاتورة') ||
        text.includes('cr') ||
        text.includes('سجل تجاري') ||
        text.includes('sez') ||
        text.includes('equity') ||
        text.includes('venture') ||
        text.includes('monsha\'at') ||
        text.includes('cma') ||
        text.includes('سوق') ||
        text.includes('استثمار') ||
        text.includes('تجارة') ||
        text.includes('بنوك') ||
        text.includes('مالية') ||
        text.includes('کاروبار') ||
        text.includes('سرمایہ کاری') ||
        text.includes('بینکنگ')
      );
    case 'vision2030':
      return (
        text.includes('vision 2030') ||
        text.includes('2030') ||
        text.includes('رؤية 2030') ||
        text.includes('ویژن 2030') ||
        text.includes('red sea') ||
        text.includes('amaala') ||
        text.includes('neom') ||
        text.includes('giga') ||
        text.includes('mega') ||
        text.includes('renewable') ||
        text.includes('clean energy') ||
        text.includes('pif') ||
        text.includes('tourist visits') ||
        text.includes('150 million') ||
        text.includes('transformation') ||
        text.includes('البحر الأحمر') ||
        text.includes('أمالا') ||
        text.includes('نيوم') ||
        text.includes('طاقة متجددة') ||
        text.includes('تحول') ||
        text.includes('بحیرہ احمر') ||
        text.includes('امالا') ||
        text.includes('نیوم')
      );
    case 'residency':
      return (
        rawCat === 'residency' ||
        text.includes('visa') ||
        text.includes('iqama') ||
        text.includes('qiwa') ||
        text.includes('jawazat') ||
        text.includes('absher') ||
        text.includes('sponsorship') ||
        text.includes('labor') ||
        text.includes('work permit') ||
        text.includes('huroob') ||
        text.includes('holiday') ||
        text.includes('expatriate') ||
        text.includes('expat') ||
        text.includes('تأشيرة') ||
        text.includes('إقامة') ||
        text.includes('جوازات') ||
        text.includes('قوى') ||
        text.includes('كفالة') ||
        text.includes('عمل') ||
        text.includes('مقيم') ||
        text.includes('وافد') ||
        text.includes('إجازة') ||
        text.includes('ویزا') ||
        text.includes('اقامہ') ||
        text.includes('کفالہ') ||
        text.includes('چھٹی') ||
        text.includes('لیبر')
      );
    case 'education':
      return (
        rawCat === 'education' ||
        text.includes('education') ||
        text.includes('university') ||
        text.includes('admission') ||
        text.includes('mawzoonah') ||
        text.includes('noor') ||
        text.includes('madrasati') ||
        text.includes('exam') ||
        text.includes('coursework') ||
        text.includes('academic') ||
        text.includes('scholarship') ||
        text.includes('school') ||
        text.includes('student') ||
        text.includes('تعليم') ||
        text.includes('جامعة') ||
        text.includes('موزونة') ||
        text.includes('نظام نور') ||
        text.includes('مدرستي') ||
        text.includes('طلاب') ||
        text.includes('اختبار') ||
        text.includes('تعلیم') ||
        text.includes('یونیورسٹی') ||
        text.includes('امتحان') ||
        text.includes('اسکول')
      );
    case 'tech':
      return (
        text.includes('mcit') ||
        text.includes('cst') ||
        text.includes('sdaia') ||
        text.includes('cloud') ||
        text.includes('ai') ||
        text.includes('compute') ||
        text.includes('data center') ||
        text.includes('digital') ||
        text.includes('tech') ||
        text.includes('api') ||
        text.includes('spectrum') ||
        text.includes('sandbox') ||
        text.includes('اتصالات') ||
        text.includes('ذكاء اصطناعي') ||
        text.includes('حوسبة سحابية') ||
        text.includes('بيانات') ||
        text.includes('تقنية') ||
        text.includes('ٹیکنالوجی') ||
        text.includes('ڈیجیٹل') ||
        text.includes('کلاؤڈ')
      );
    case 'sports':
      return (
        rawCat === 'sports' ||
        src.includes('sport') ||
        src.includes('رياضة') ||
        src.includes('spl') ||
        src.includes('saff') ||
        src.includes('olympic') ||
        text.includes('sport') ||
        text.includes('football') ||
        text.includes('soccer') ||
        text.includes('league') ||
        text.includes('stadium') ||
        text.includes('world cup') ||
        text.includes('esports') ||
        text.includes('al hilal') ||
        text.includes('al nassr') ||
        text.includes('al ittihad') ||
        text.includes('al ahli') ||
        text.includes('دوري روشن') ||
        text.includes('الهلال') ||
        text.includes('النصر') ||
        text.includes('الاتحاد') ||
        text.includes('كأس العالم 2034') ||
        text.includes('كرة القدم') ||
        text.includes('کھیل') ||
        text.includes('فٹ بال')
      );
    default:
      return true;
  }
};

export const matchesMinistrySubFilter = (alert: Alert, minCode: string): boolean => {
  if (minCode === 'all' || minCode === 'ALL') return true;
  const text = getAlertSearchableText(alert);
  const src = (alert.source || '').toLowerCase();
  
  switch (minCode) {
    case 'sports':
      return src.includes('sport') || src.includes('mos') || src.includes('spl') || src.includes('saff') || src.includes('olympic') || src.includes('الرياضة') || src.includes('دوري روشن') || src.includes('كھیل') || text.includes('spl.com.sa');
    case 'mofa':
      return src.includes('foreign') || src.includes('mofa') || src.includes('visa.mofa') || src.includes('الخارجية') || src.includes('خارجہ') || text.includes('enjaz');
    case 'moi':
      return src.includes('interior') || src.includes('moi') || src.includes('jawazat') || src.includes('passports') || src.includes('الداخلية') || src.includes('الجوازات') || src.includes('داخلہ') || text.includes('absher');
    case 'mcit':
      return src.includes('communications') || src.includes('mcit') || src.includes('cst') || src.includes('sdaia') || src.includes('الاتصالات') || src.includes('سدايا') || src.includes('مواصلات');
    case 'tourism':
      return src.includes('tourism') || src.includes('mt') || src.includes('visitsaudi') || src.includes('sta') || src.includes('السياحة') || src.includes('روح السعودية') || src.includes('سیاحت');
    case 'moe':
      return src.includes('education') || src.includes('moe') || src.includes('التعليم') || src.includes('تعلیم') || text.includes('noor.moe') || text.includes('study in saudi');
    case 'hrsd':
      return src.includes('human resources') || src.includes('hrsd') || src.includes('qiwa') || src.includes('الموارد البشرية') || src.includes('قوى') || src.includes('انسانی وسائل');
    case 'misa':
      return src.includes('investment') || src.includes('misa') || src.includes('momrah') || src.includes('rega') || src.includes('municipal') || src.includes('الاستثمار') || src.includes('العقار') || src.includes('البلديات') || src.includes('سرمایہ کاری');
    case 'sama':
      return src.includes('sama') || src.includes('central bank') || src.includes('zatca') || src.includes('cma') || src.includes('tax') || src.includes('البنك المركزي') || src.includes('الزكاة') || src.includes('السوق المالية') || src.includes('ٹیکس');
    default:
      return true;
  }
};

export const getAlertPrimaryCategoryInfo = (alert: Alert) => {
  if (matchesCategory(alert, 'sports')) {
    return { id: 'sports', name: { en: 'Sports & SPL', ar: 'الرياضة ودوري روشن', ur: 'کھیل و سعودی لیگ' }, icon: Trophy, badgeClass: 'bg-amber-50 text-amber-700 border-amber-200' };
  }
  if (matchesCategory(alert, 'education')) {
    return { id: 'education', name: { en: 'Education', ar: 'التعليم', ur: 'تعلیم' }, icon: GraduationCap, badgeClass: 'bg-purple-50 text-purple-700 border-purple-200' };
  }
  if (matchesCategory(alert, 'tech')) {
    return { id: 'tech', name: { en: 'Tech & AI', ar: 'التقنية والذكاء الاصطناعي', ur: 'ٹیکنالوجی و اے آئی' }, icon: Cpu, badgeClass: 'bg-cyan-50 text-cyan-700 border-cyan-200' };
  }
  if (matchesCategory(alert, 'vision2030')) {
    return { id: 'vision2030', name: { en: 'Vision 2030', ar: 'رؤية 2030', ur: 'ویژن 2030' }, icon: Compass, badgeClass: 'bg-amber-50 text-amber-800 border-amber-200' };
  }
  if (matchesCategory(alert, 'residency')) {
    return { id: 'residency', name: { en: 'Residency & Labor', ar: 'الإقامة والعمل', ur: 'اقامہ و لیبر' }, icon: ShieldAlert, badgeClass: 'bg-rose-50 text-rose-700 border-rose-200' };
  }
  if (matchesCategory(alert, 'business')) {
    return { id: 'business', name: { en: 'Business & Investment', ar: 'الأعمال والاستثمار', ur: 'کاروبار و سرمایہ کاری' }, icon: Briefcase, badgeClass: 'bg-blue-50 text-blue-700 border-blue-200' };
  }
  if (matchesCategory(alert, 'ministries')) {
    return { id: 'ministries', name: { en: 'Ministries', ar: 'الوزارات الحكومية', ur: 'سرکاری وزارتیں' }, icon: Landmark, badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
  }
  return { id: 'intelligence', name: { en: 'Intelligence', ar: 'استخبارات السوق', ur: 'مارکیٹ الرٹس' }, icon: Newspaper, badgeClass: 'bg-gray-50 text-gray-700 border-gray-200' };
};

interface Alert {
  id: string;
  category: 'regulatory' | 'residency' | 'opportunity' | 'macro' | 'local' | 'intelligence' | 'lifestyle' | 'community' | 'fashion' | 'education' | 'sports';
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

  // Category Filtering State
  const [categoryFilter, setCategoryFilter] = useState<NewsCategory>('all');
  const [ministrySubFilter, setMinistrySubFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [impactFilter, setImpactFilter] = useState<'all' | 'High' | 'Medium' | 'Low'>('all');

  const [newsItems, setNewsItems] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncCount, setSyncCount] = useState(0);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const syncingRef = React.useRef(false);
  const [todayCount, setTodayCount] = useState(0);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [showScourDirectory, setShowScourDirectory] = useState(false);
  const [selectedMinistryFilter, setSelectedMinistryFilter] = useState<string>("all");

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
    if (isQuotaExceeded()) {
      setNewsItems(FALLBACK_ALERTS as Alert[]);
      setLoading(false);
      return;
    }

    // 1. Listen for strategic alerts from Firestore
    const q = query(
      collection(db, 'strategic_alerts'),
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
          item.id === fallback.id ||
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

      // Deduplicate to guarantee absolute unique IDs
      const uniqueAlertsMap = new Map<string, Alert>();
      for (const alert of freshAlerts) {
        if (alert.id && !uniqueAlertsMap.has(alert.id)) {
          uniqueAlertsMap.set(alert.id, alert);
        }
      }
      const uniqueAlerts = Array.from(uniqueAlertsMap.values());

      setNewsItems(uniqueAlerts.sort((a, b) => {
        return getAlertTime(b) - getAlertTime(a);
      }));
      setLoading(false);

      // Calculate Today's Count
      const startOfToday = new Date();
      startOfToday.setHours(0,0,0,0);
      const count = uniqueAlerts.filter(a => {
        const d = a.createdAt instanceof Timestamp ? a.createdAt.toDate() : 
                  a.createdAt?.seconds ? new Date(a.createdAt.seconds * 1000) :
                  (a.createdAt ? new Date(a.createdAt) : (a.date ? new Date(a.date) : null));
        return d && !isNaN(d.getTime()) && d >= startOfToday;
      }).length;
      setTodayCount(count);

      // Auto-Seed detection
      if (snapshot.empty && !loading && isAdmin) {
        console.log("Database empty, preparing to seed as admin...");
      }
    }, (error) => {
      if (isQuotaError(error)) {
        setQuotaExceeded(true);
        console.warn("[News] Daily Firestore read quota reached. Serving offline/fallback intelligence.");
      } else {
        console.warn("Firestore Notice (News):", error?.message || error);
      }
      setNewsItems(FALLBACK_ALERTS as Alert[]);
      const startOfToday = new Date();
      startOfToday.setHours(0,0,0,0);
      const fallbackTodayCount = (FALLBACK_ALERTS as Alert[]).filter(a => {
        const d = a.createdAt ? new Date(a.createdAt) : (a.date ? new Date(a.date) : null);
        return d && !isNaN(d.getTime()) && d >= startOfToday;
      }).length;
      setTodayCount(fallbackTodayCount);
      setLoading(false);
    });

    // 2. Listen for global stats (Viewing Only - No automatic triggers here)
    const statsUnsubscribe = onSnapshot(doc(db, 'system_stats', 'global'), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setSyncCount(data.sync_clicks || 0);
      }
    }, (err) => {
      if (isQuotaError(err)) {
        setQuotaExceeded(true);
      }
    });

    // 3. One-Time Freshness Check (Safe - runs only on mount)
    const runFreshnessCheck = async () => {
      if (!isAdmin || isQuotaExceeded()) return;
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
      } catch (err: any) {
        if (isQuotaError(err)) {
          setQuotaExceeded(true);
        } else {
          console.warn("Freshness check notice:", err?.message || err);
        }
      }
    };

    // Check for empty collection and seed baseline data if needed (Admin only)
    const checkAndSeed = async () => {
      if (!isAdmin || isQuotaExceeded()) return; 
      
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
      } catch (err: any) {
        if (isQuotaError(err)) {
          setQuotaExceeded(true);
        } else {
          console.warn("Auto-seed notice:", err?.message || err);
        }
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
    if (!isAdmin) return;
    if (syncingRef.current) return;
    syncingRef.current = true;
    setSyncing(true);
    setSyncStatus("Connecting to Intelligence Engine...");
    
    // Track click
    try {
      const statsRef = doc(db, 'system_stats', 'global');
      await setDoc(statsRef, { sync_clicks: increment(1) }, { merge: true });
    } catch (err) {
      console.warn("Failed to track sync click:", err);
    }

    let discovered = 0;

    try {
      setSyncStatus("Initiating Strategic Omni-Scour via Core Engine...");

      const response = await fetch('/api/news/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Intelligence Engine returned HTTP ${response.status}`);
      }

      const data = await response.json();
      const alertsArray: Alert[] = data.alerts || [];

      // Re-fetch existing to check for duplicates
      const q = query(collection(db, 'strategic_alerts'), orderBy('createdAt', 'desc'), limit(100));
      const snap = await getDocs(q);
      const existingItems = snap.docs.map(doc => doc.data());
      const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

      for (const alert of alertsArray) {
        if (!alert.title?.en) continue;

        const isDuplicate = existingItems.some(item => {
          const sameTitle = (item.title && item.title.en === alert.title.en);
          const sameSummary = (item.summary && item.summary.en === alert.summary.en);
          const itemCreatedAt = item.createdAt instanceof Timestamp ? item.createdAt.toDate() : 
                               item.createdAt?.seconds ? new Date(item.createdAt.seconds * 1000) : null;
          const isStale = itemCreatedAt ? (Date.now() - itemCreatedAt.getTime() > 3 * 24 * 60 * 60 * 1000) : false;
          return (sameTitle || sameSummary) && !isStale;
        });

        if (!isDuplicate) {
          try {
            const newsDate = alert.date || today;
            await addDoc(collection(db, 'strategic_alerts'), {
              ...alert,
              date: newsDate,
              createdAt: serverTimestamp()
            });
            discovered++;
            setSyncStatus(`Discovered: ${alert.title.en.substring(0, 40)}...`);
            await new Promise(r => setTimeout(r, 400));
          } catch (writeError: any) {
            console.error("Firestore Write Error:", writeError);
            handleFirestoreError(writeError, OperationType.CREATE, 'strategic_alerts');
          }
        }
      }

      if (discovered === 0) {
        setSyncStatus("Intelligence Engine: Market is currently stable. No primary shifts detected.");
        setTimeout(() => setSyncStatus(null), 5000);
      } else {
        setSyncStatus(`Transmission Complete: ${discovered} Strategic Items Identified.`);
        try {
          const statsRef = doc(db, 'system_stats', 'global');
          await setDoc(statsRef, { last_sync_at: serverTimestamp() }, { merge: true });
        } catch (err) {
          console.warn("Failed to update sync timestamp:", err);
        }
        setTimeout(() => setSyncStatus(null), 5000);
      }
    } catch (error: any) {
      console.warn("Sync Notice:", error.message || error);
      setSyncStatus(`Intelligence Engine Status: ${error.message || "Temporary delay"}`);
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

  // Memoized category counts for responsive badge feedback
  const categoryCounts = React.useMemo(() => {
    const counts: Record<NewsCategory, number> = {
      all: newsItems.length,
      ministries: 0,
      business: 0,
      vision2030: 0,
      residency: 0,
      education: 0,
      tech: 0,
      sports: 0
    };
    for (const item of newsItems) {
      if (matchesCategory(item, 'ministries')) counts.ministries++;
      if (matchesCategory(item, 'business')) counts.business++;
      if (matchesCategory(item, 'vision2030')) counts.vision2030++;
      if (matchesCategory(item, 'residency')) counts.residency++;
      if (matchesCategory(item, 'education')) counts.education++;
      if (matchesCategory(item, 'tech')) counts.tech++;
      if (matchesCategory(item, 'sports')) counts.sports++;
    }
    return counts;
  }, [newsItems]);

  // Memoized sub-filter counts for each ministerial body
  const ministryCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    for (const opt of MINISTRY_FILTER_OPTIONS) {
      if (opt.id === 'all') {
        counts[opt.id] = newsItems.filter(item => matchesCategory(item, 'ministries')).length;
      } else {
        counts[opt.id] = newsItems.filter(item => matchesCategory(item, 'ministries') && matchesMinistrySubFilter(item, opt.id)).length;
      }
    }
    return counts;
  }, [newsItems]);

  // Active filtered news list
  const filteredNews = React.useMemo(() => {
    return newsItems.filter(item => {
      // 1. Category Filter
      if (!matchesCategory(item, categoryFilter)) return false;

      // 2. Ministry Sub-filter
      if (ministrySubFilter !== 'all') {
        if (!matchesMinistrySubFilter(item, ministrySubFilter)) return false;
      }

      // 3. Impact Filter
      if (impactFilter !== 'all' && item.impact !== impactFilter) return false;

      // 4. Search Query across languages
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const searchable = getAlertSearchableText(item);
        if (!searchable.includes(q)) return false;
      }

      return true;
    });
  }, [newsItems, categoryFilter, ministrySubFilter, impactFilter, searchQuery]);

  const hasActiveFilters = categoryFilter !== 'all' || ministrySubFilter !== 'all' || impactFilter !== 'all' || searchQuery.trim() !== '';

  const resetAllFilters = () => {
    setCategoryFilter('all');
    setMinistrySubFilter('all');
    setImpactFilter('all');
    setSearchQuery('');
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'regulatory': return <ShieldAlert size={18} />;
      case 'opportunity': return <Zap size={18} />;
      case 'macro': return <TrendingUp size={18} />;
      case 'local': return <Calendar size={18} />;
      case 'education': return <GraduationCap size={18} />;
      default: return <Newspaper size={18} />;
    }
  };

  return (
    <div className="bg-paper min-h-screen relative overflow-hidden">
      <SEO 
        title={currentLang === 'ar'
          ? 'أخبار السعودية والأنظمة الحكومية | مركز استخبارات الأعمال والتعليم'
          : currentLang === 'ur'
          ? 'سعودی عرب کی تازہ ترین خبریں، قوانین اور تعلیمی اپ ڈیٹس'
          : 'Saudi Business News & Government Directives | KSA Intelligence Hub'} 
        description={currentLang === 'ar' 
          ? 'متابعة لحظية ومباشرة لأخبار وقرارات وزارة الخارجية، وزارة الاتصالات وتقنية المعلومات، وزارة السياحة، وزارة الاستثمار، وزارة التعليم، والجوازات، ووكالة واس.' 
          : currentLang === 'ur'
          ? 'سعودی وزارتِ خارجہ، وزارتِ مواصلات، وزارتِ سیاحت، تعلیمی فیصلوں، واس ایجنسی اور ویزا قوانین کی تازہ ترین اور مصدقہ خبریں۔'
          : 'Real-time AI-scoured official updates from Saudi Ministry of Foreign Affairs (MOFA), MCIT, Ministry of Tourism, MISA, MOE, HRSD, SPA, and SAMA.'}
        keywords="أخبار السعودية عاجل, وزارة الخارجية السعودية تأشيرات, منصة التأشيرات إنجاز, وزارة الاتصالات وتقنية المعلومات, وزارة السياحة السعودية, روح السعودية تأشيرة, قرارات مجلس الوزراء السعودي, وكالة الأنباء السعودية واس, وزارة التعليم السعودية أخبار, وزارة الاستثمار ترخيص, الجوازات السعودية الإقامة, وظائف السعودية والتعمين, قرارات وزارة الموارد البشرية, Saudi news SPA, Saudi government decrees, KSA business news, MOFA Saudi visa"
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
            <div 
              onClick={() => setShowScourDirectory(true)}
              className="bg-white px-6 py-4 rounded-3xl border border-gray-100 flex items-center gap-4 premium-shadow cursor-pointer hover:border-emerald-300 hover:shadow-emerald-500/10 transition-all group"
              title="Click to view all monitored ministries, portals, and sub-pages"
            >
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
                  <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 group-hover:bg-emerald-100 transition-colors">
                    {defaultTargets.length} Portals
                  </span>
                </div>
                <div className="text-xs font-bold text-primary flex items-center gap-2 overflow-hidden w-52">
                  <motion.div 
                    animate={{ x: [0, -500] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
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

        {/* Category Navigation Rail */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-secondary" />
              <span className="text-[11px] font-bold text-secondary uppercase tracking-[0.18em]">
                {currentLang === 'ar' ? 'التصنيفات الاستراتيجية' : currentLang === 'ur' ? 'اسٹریٹجک کیٹیگریز' : 'Strategic Categories'}
              </span>
            </div>
            <span className="text-xs text-gray-400 font-medium">
              {currentLang === 'ar' 
                ? `${filteredNews.length} من إجمالي ${newsItems.length} تقريراً`
                : currentLang === 'ur'
                ? `کل ${newsItems.length} میں سے ${filteredNews.length} الرٹس`
                : `${filteredNews.length} of ${newsItems.length} updates`}
            </span>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-2">
            {NEWS_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = categoryFilter === cat.id;
              const count = categoryCounts[cat.id] || 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCategoryFilter(cat.id);
                    if (cat.id !== 'ministries') {
                      setMinistrySubFilter('all');
                    }
                  }}
                  className={cn(
                    "px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2.5 shrink-0 premium-shadow",
                    isActive
                      ? "emerald-gradient text-white shadow-lg shadow-emerald-500/25 scale-[1.02]"
                      : "bg-white text-gray-700 hover:text-primary hover:bg-gray-50 border border-gray-100"
                  )}
                >
                  <Icon size={16} className={isActive ? "text-secondary" : cat.accentColor} />
                  <span>{t(cat.labelKey)}</span>
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-black tracking-tight",
                    isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                  )}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Ministerial Sub-Filter Rail (shown when 'ministries' category is active or a ministry filter is selected) */}
        <AnimatePresence>
          {(categoryFilter === 'ministries' || ministrySubFilter !== 'all') && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -8 }}
              className="mb-6 p-4 rounded-3xl bg-emerald-50/70 border border-emerald-100 overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Landmark size={15} className="text-emerald-700" />
                  <span className="text-xs font-bold text-emerald-900 tracking-wide">
                    {currentLang === 'ar' ? 'تصفية حسب الوزارة / الهيئة الحكومية:' : currentLang === 'ur' ? 'سرکاری محکمے یا وزارت کے لحاظ سے فلٹر کریں:' : 'Filter by Official Ministry / Agency:'}
                  </span>
                </div>
                <button
                  onClick={() => setShowScourDirectory(true)}
                  className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1.5 self-start sm:self-auto hover:underline"
                >
                  <span>{currentLang === 'ar' ? 'عرض دليل البوابات المرصودة' : currentLang === 'ur' ? 'شامل پورٹلز کی فہرست دیکھیں' : 'View Scoured Portals Directory'}</span>
                  <ArrowUpRight size={13} />
                </button>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                {MINISTRY_FILTER_OPTIONS.map((min) => {
                  const isMinActive = ministrySubFilter === min.id;
                  const mCount = ministryCounts[min.id] || 0;
                  return (
                    <button
                      key={min.id}
                      onClick={() => setMinistrySubFilter(min.id)}
                      className={cn(
                        "px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0",
                        isMinActive
                          ? "bg-emerald-700 text-white shadow-sm font-bold"
                          : "bg-white/90 text-emerald-900 hover:bg-white border border-emerald-200/60"
                      )}
                    >
                      <span>{resolveContent(min.label)}</span>
                      <span className={cn(
                        "text-[9px] px-1.5 py-0.2 rounded-full font-bold",
                        isMinActive ? "bg-white/20 text-white" : "bg-emerald-100/70 text-emerald-800"
                      )}>
                        {mCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search, Impact Selector & Actions Toolbar */}
        <div className="bg-white rounded-3xl p-4 md:p-5 border border-gray-100 premium-shadow mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-grow max-w-xl">
            <Search size={18} className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('news.filters.searchPlaceholder') || "Search news, decrees, ministries, or keywords..."}
              className="w-full bg-paper rounded-2xl pl-11 pr-10 rtl:pl-10 rtl:pr-11 py-3 text-xs md:text-sm text-primary placeholder:text-gray-400 border border-gray-200/80 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary p-1"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Impact Level Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest shrink-0 ml-1 rtl:ml-0 rtl:mr-1">
              {currentLang === 'ar' ? 'الأثر:' : currentLang === 'ur' ? 'اثر:' : 'Impact:'}
            </span>
            {(['all', 'High', 'Medium', 'Low'] as const).map((lvl) => {
              const isLvlActive = impactFilter === lvl;
              return (
                <button
                  key={lvl}
                  onClick={() => setImpactFilter(lvl)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0",
                    isLvlActive
                      ? "bg-primary text-white shadow-sm"
                      : "bg-paper text-gray-600 hover:bg-gray-100 border border-gray-100"
                  )}
                >
                  {lvl === 'High' && <span className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                  {lvl === 'Medium' && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                  {lvl === 'Low' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                  <span>
                    {lvl === 'all' 
                      ? (currentLang === 'ar' ? 'الكل' : currentLang === 'ur' ? 'تمام' : 'All')
                      : lvl}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Admin Controls */}
          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3 shrink-0">
            {isAdmin && (
              <div className="flex items-center gap-2">
                <button
                  onClick={purgeHistory}
                  className="px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all bg-red-50 text-red-400 hover:bg-red-100"
                  title="Clear Engine Memory"
                >
                  Purge
                </button>
                <button
                  onClick={handleSync}
                  disabled={syncing}
                  className={cn(
                    "flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all premium-shadow",
                    syncing 
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                      : "bg-primary text-white hover:bg-primary/90"
                  )}
                >
                  <RefreshCw size={14} className={cn(syncing && "animate-spin")} />
                  {syncing ? "Syncing..." : "Sync"}
                </button>
              </div>
            )}
            <div className="flex flex-col items-end text-right">
              <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1.5">
                <TrendingUp size={11} />
                <span>{todayCount} Today</span>
              </div>
              <div className="text-[9px] text-gray-400 font-medium">
                {syncCount} Global Syncs
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters Summary & Reset */}
        {hasActiveFilters && (
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 px-5 py-3 rounded-2xl bg-amber-50/70 border border-amber-200/60">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-amber-950">
                {currentLang === 'ar' ? 'المرشحات النشطة:' : currentLang === 'ur' ? 'فعال فلٹرز:' : 'Active Filters:'}
              </span>
              {categoryFilter !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-white text-emerald-800 border border-emerald-200 shadow-sm">
                  <span>{t(NEWS_CATEGORIES.find(c => c.id === categoryFilter)?.labelKey || '')}</span>
                  <button onClick={() => setCategoryFilter('all')} className="hover:text-red-600 text-gray-400"><X size={12} /></button>
                </span>
              )}
              {ministrySubFilter !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-white text-teal-800 border border-teal-200 shadow-sm">
                  <span>{resolveContent(MINISTRY_FILTER_OPTIONS.find(m => m.id === ministrySubFilter)?.label)}</span>
                  <button onClick={() => setMinistrySubFilter('all')} className="hover:text-red-600 text-gray-400"><X size={12} /></button>
                </span>
              )}
              {impactFilter !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-white text-gray-800 border border-gray-200 shadow-sm">
                  <span>{impactFilter} Impact</span>
                  <button onClick={() => setImpactFilter('all')} className="hover:text-red-600 text-gray-400"><X size={12} /></button>
                </span>
              )}
              {searchQuery.trim() !== '' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-white text-gray-800 border border-gray-200 shadow-sm">
                  <span>"{searchQuery}"</span>
                  <button onClick={() => setSearchQuery('')} className="hover:text-red-600 text-gray-400"><X size={12} /></button>
                </span>
              )}
            </div>

            <button
              onClick={resetAllFilters}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 hover:text-amber-950 underline decoration-amber-400"
            >
              <RotateCcw size={13} />
              <span>{currentLang === 'ar' ? 'إلغاء كافة المرشحات' : currentLang === 'ur' ? 'تمام فلٹرز ری سیٹ کریں' : 'Reset All Filters'}</span>
            </button>
          </div>
        )}

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

        {/* Empty State with Filter Clear */}
        {!loading && filteredNews.length === 0 && (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-gray-100 p-8 md:p-12 premium-shadow mb-12">
            <div className="w-20 h-20 bg-paper rounded-3xl flex items-center justify-center mx-auto mb-6 border border-gray-100 text-gray-300">
              <Newspaper size={36} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-primary mb-3">
              {t('news.filters.noResultsTitle') || "No Matching Updates Found"}
            </h3>
            <p className="text-gray-400 font-medium max-w-md mx-auto mb-6 text-sm">
              {t('news.filters.noResultsDesc') || "Try adjusting your search query, selecting another category, or resetting active filters."}
            </p>
            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider bg-primary text-white hover:bg-primary/90 transition-all shadow-md"
              >
                <RotateCcw size={14} />
                <span>{currentLang === 'ar' ? 'إلغاء التصفية وعرض الكل' : currentLang === 'ur' ? 'فلٹرز ہٹا کر تمام الرٹس دیکھیں' : 'Clear Filters & Show All'}</span>
              </button>
            )}
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
                  key={news.id ? `news-card-${news.id}-${idx}` : `news-card-${idx}`}
                  onClick={() => setSelectedAlert(news)}
                  className="group bg-white rounded-[2rem] p-6 border border-gray-100 hover:border-secondary transition-all premium-shadow flex flex-col gap-4 items-start cursor-pointer h-full"
                >
                  <div className="w-full flex items-center justify-between mb-2">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md relative",
                      news.category === 'regulatory' ? 'bg-red-500 shadow-red-500/20' : 
                      news.category === 'opportunity' ? 'bg-emerald-500 shadow-emerald-500/20' : 
                      news.category === 'education' ? 'bg-blue-600 shadow-blue-600/20' :
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
                      {/* Primary Strategic Category Chip */}
                      {(() => {
                        const catInfo = getAlertPrimaryCategoryInfo(news);
                        const CatIcon = catInfo.icon;
                        return (
                          <span className={cn(
                            "px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5 border shadow-2xs",
                            catInfo.badgeClass
                          )}>
                            <CatIcon size={11} />
                            <span>{resolveContent(catInfo.name)}</span>
                          </span>
                        );
                      })()}

                      <span className="bg-paper px-2.5 py-0.5 rounded-full text-[8px] font-bold text-secondary uppercase tracking-widest border border-gray-100">
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
                    {(() => {
                      const catInfo = getAlertPrimaryCategoryInfo(selectedAlert);
                      const CatIcon = catInfo.icon;
                      return (
                        <div className={cn(
                          "px-4 py-1.5 rounded-full text-[9px] font-bold text-white uppercase tracking-widest flex items-center gap-2",
                          catInfo.id === 'ministries' ? 'bg-emerald-600' :
                          catInfo.id === 'business' ? 'bg-blue-600' :
                          catInfo.id === 'vision2030' ? 'bg-amber-600' :
                          catInfo.id === 'residency' ? 'bg-rose-600' :
                          catInfo.id === 'education' ? 'bg-purple-600' :
                          catInfo.id === 'tech' ? 'bg-cyan-600' : 'bg-primary'
                        )}>
                          <CatIcon size={14} />
                          <span>{resolveContent(catInfo.name)}</span>
                        </div>
                      );
                    })()}
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
                


                {selectedAlert.url ? (
                  <a
                    href={selectedAlert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest text-white emerald-gradient hover:scale-105 transition-all premium-shadow shadow-emerald-500/20"
                  >
                    <ExternalLink size={18} />
                    {t('news.modal.originalSource')}
                  </a>
                ) : (
                  <button 
                    onClick={() => setSelectedAlert(null)}
                    className="flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest text-white emerald-gradient hover:scale-105 transition-all premium-shadow shadow-emerald-500/20"
                  >
                    <ExternalLink size={18} />
                    {t('news.modal.close')}
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
      {/* Scour Directory & Ministerial Sub-Pages Modal */}
      {showScourDirectory && (
        <div className="fixed inset-0 z-[110] overflow-y-auto bg-primary/45 backdrop-blur-md">
          <div className="min-h-screen flex items-center justify-center p-4 md:p-10 relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowScourDirectory(false)}
              className="absolute inset-0 cursor-zoom-out"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 25 }}
              className="bg-white w-full max-w-5xl rounded-[2.5rem] relative z-10 premium-shadow flex flex-col max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 md:p-8 border-b border-gray-100 flex items-start justify-between bg-paper shrink-0">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-600/20">
                    <Landmark size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">
                        {currentLang === 'ar' ? 'رصد استخباري فوري' : currentLang === 'ur' ? 'لائیو اسٹریٹجک مانیٹرنگ' : 'Live Strategic Data Rails'}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary">
                      {currentLang === 'ar' 
                        ? 'البوابات الوزارية والمنصات الفرعية المعتمدة للرصد' 
                        : currentLang === 'ur'
                        ? 'اسٹریٹجک مانیٹرنگ کے لیے شامل سرکاری وزارتیں اور ذیلی پورٹلز'
                        : 'Monitored Ministries & Sub-Portal Rails'}
                    </h2>
                    <p className="text-xs md:text-sm text-gray-500 mt-1 max-w-2xl font-light">
                      {currentLang === 'ar'
                        ? 'الجهات الحكومية والبوابات والمنصات الخدمية التابعة لها التي يقوم محرك الذكاء الاصطناعي برصدها على مدار الساعة.'
                        : currentLang === 'ur'
                        ? 'سعودی وزارتیں اور ان کی ذیلی ویب سائٹس جن سے ہمارا انجن ریگولیٹری تبدیلیاں اور اہم اعلانات حاصل کرتا ہے۔'
                        : 'Official Saudi ministries and verified sub-service portals continuously scoured by the KSA Insights Intelligence Engine.'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowScourDirectory(false)}
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-gray-50 transition-all shrink-0 ml-4"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Ministry Filter Pills */}
              <div className="px-6 md:px-8 py-3 bg-gray-50/70 border-b border-gray-100 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
                <button
                  onClick={() => setSelectedMinistryFilter("all")}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-all",
                    selectedMinistryFilter === "all"
                      ? "bg-primary text-white shadow-sm"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  )}
                >
                  {currentLang === 'ar' ? 'كافة الوزارات' : currentLang === 'ur' ? 'تمام وزارتیں' : 'All Ministries'}
                </button>
                {SCOUR_MINISTRIES_REGISTRY.map((m) => (
                  <button
                    key={m.code}
                    onClick={() => setSelectedMinistryFilter(m.code)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-all flex items-center gap-1.5",
                      selectedMinistryFilter === m.code
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                    )}
                  >
                    <span>{m.code}</span>
                    <span className="opacity-75 text-[10px]">({m.subPages.length})</span>
                  </button>
                ))}
              </div>

              {/* Body: List of Ministries & Sub-Pages */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-6">
                {SCOUR_MINISTRIES_REGISTRY
                  .filter(m => selectedMinistryFilter === "all" || m.code === selectedMinistryFilter)
                  .map((item) => (
                    <div 
                      key={item.code}
                      className="bg-white rounded-3xl border border-gray-200 p-6 md:p-7 shadow-sm hover:border-emerald-200 transition-all"
                    >
                      {/* Ministry Title Row */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-xs border border-emerald-100">
                            {item.code}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-serif font-bold text-lg text-primary">
                                {resolveContent(item.ministry)}
                              </h3>
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                                {item.badge}
                              </span>
                            </div>
                            <span className="text-[11px] text-gray-400 font-mono">
                              {item.portalUrl}
                            </span>
                          </div>
                        </div>

                        <a 
                          href={item.portalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl transition-all self-start md:self-auto"
                        >
                          <span>{currentLang === 'ar' ? 'زيارة البوابة الرئيسية' : currentLang === 'ur' ? 'مرکزی پورٹل کھولیں' : 'Visit Main Portal'}</span>
                          <ExternalLink size={13} />
                        </a>
                      </div>

                      {/* Sub-Pages & Monitored Services */}
                      <div className="mt-5">
                        <div className="flex items-center gap-2 mb-3">
                          <Layers size={13} className="text-secondary" />
                          <h4 className="text-[11px] font-bold text-secondary uppercase tracking-[0.15em]">
                            {currentLang === 'ar' ? 'المنصات والصفحات الفرعية المشمولة بالرصد' : currentLang === 'ur' ? 'شامل ذیلی سروسز اور صفحات' : 'Scoured Sub-Platforms & Services'}
                          </h4>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {item.subPages.map((sub, sIdx) => (
                            <div 
                              key={sIdx}
                              className="bg-gray-50/80 hover:bg-white rounded-2xl p-4 border border-gray-100 hover:border-emerald-300 transition-all flex flex-col justify-between group"
                            >
                              <div>
                                <div className="flex items-center justify-between mb-1.5">
                                  <span className="font-bold text-xs text-primary group-hover:text-emerald-800 transition-colors line-clamp-1">
                                    {resolveContent(sub.name)}
                                  </span>
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                </div>
                                <span className="text-[10px] text-emerald-700 font-mono block mb-2 font-medium">
                                  {sub.url.replace('https://', '').replace(/\/$/, '')}
                                </span>
                                <p className="text-[11px] text-gray-500 leading-relaxed font-light line-clamp-2">
                                  {resolveContent(sub.purpose)}
                                </p>
                              </div>

                              <div className="mt-3 pt-2.5 border-t border-gray-200/50 flex items-center justify-between">
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                                  <CheckCircle2 size={10} className="text-emerald-500" />
                                  Active Sync
                                </span>
                                <a 
                                  href={sub.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[11px] font-bold text-primary group-hover:text-emerald-700 inline-flex items-center gap-1 hover:underline"
                                >
                                  {currentLang === 'ar' ? 'فتح الرابط' : currentLang === 'ur' ? 'وزٹ کریں' : 'Visit'}
                                  <ArrowUpRight size={11} />
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Modal Footer */}
              <div className="p-6 bg-paper border-t border-gray-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Globe size={14} className="text-emerald-600" />
                  <span>
                    {currentLang === 'ar' 
                      ? 'مربوط عبر شبكة بيانات حكومية موثقة ومحدثة' 
                      : currentLang === 'ur' 
                      ? 'مصدقہ سعودی سرکاری ذرائع سے منسلک' 
                      : 'Connected via authenticated official government news and regulatory feeds.'}
                  </span>
                </div>
                <button
                  onClick={() => setShowScourDirectory(false)}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-primary text-white hover:bg-primary/90 transition-all"
                >
                  {currentLang === 'ar' ? 'إغلاق' : currentLang === 'ur' ? 'بند کریں' : 'Close'}
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
