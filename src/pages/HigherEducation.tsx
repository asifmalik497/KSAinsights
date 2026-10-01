import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { 
  GraduationCap, Calculator, Award, Calendar, ExternalLink,
  BookOpen, Compass, CheckCircle2, Sparkles, Share2, Copy,
  MapPin, Users, Globe2, ChevronRight, Check, Target, BarChart3,
  SlidersHorizontal, Flag, ArrowUp, ArrowRight, ArrowLeft, ShieldCheck,
  Clock, FileText, ListOrdered, Bookmark, Layers, Eye, ChevronDown
} from 'lucide-react';
import { cn, getLanguage } from '../lib/utils';
import SEO from '../components/SEO';
import { UNIVERSITIES_DATA, UniversityFormula } from '../data/higherEducationData';
import { MultiUniComparison } from '../components/education/MultiUniComparison';
import { ReverseTargetCalculator } from '../components/education/ReverseTargetCalculator';
import { DigitalSatCalculator } from '../components/education/DigitalSatCalculator';
import { AdmissionTimeline2027 } from '../components/education/AdmissionTimeline2027';
import { ExpatScholarshipGuide } from '../components/education/ExpatScholarshipGuide';
import { SecondaryPathwaysGuide } from '../components/education/SecondaryPathwaysGuide';
import { MawzoonahFormulaTable } from '../components/education/MawzoonahFormulaTable';
import { UniversityCalendarTracker } from '../components/education/UniversityCalendarTracker';

export const AI_EXAM_QUESTIONS_LIST = [
  { id: 1, domain: { en: 'Responsible AI (15-20%)', ar: 'الذكاء الاصطناعي المسؤول', ur: 'ذمہ دارانہ مصنوعی ذہانت' }, title: { en: 'Fairness vs. Transparency in Banking Credit Scoring', ar: 'مبدأ الإنصاف والعدالة مقابل الشفافية في التقييم الائتماني', ur: 'بینکنگ قرضوں میں انصاف بمقابلہ شفافیت' } },
  { id: 2, domain: { en: 'Machine Learning (20-25%)', ar: 'التعلم الآلي والبيانات', ur: 'مشین لرننگ الگورتھم' }, title: { en: 'Predicting Continuous Agricultural Crop Yield (Regression)', ar: 'التنبؤ بإنتاجية المحاصيل الزراعية (خوارزمية الانحدار)', ur: 'کھجور کی زرعی پیداوار کا عددی تخمینہ (ریگریشن)' } },
  { id: 3, domain: { en: 'Computer Vision (15-20%)', ar: 'الرؤية الحاسوبية', ur: 'کمپیوٹر وژن' }, title: { en: 'Airport Luggage Detection with Bounding Boxes (X, Y, W, H)', ar: 'اكتشاف الحقائب في المطارات وتحديد مستطيلات الإحاطة', ur: 'ایئرپورٹ سامان کی خودکار شناخت اور باؤنڈنگ باکس' } },
  { id: 4, domain: { en: 'Document Intelligence', ar: 'معالجة المستندات الذكية', ur: 'دستاویزات اور انوائسز' }, title: { en: 'Extracting Tables & Key-Value Pairs from Invoice PDFs', ar: 'استخراج الجداول وأزواج البيانات من الفواتير الرسمية', ur: 'رسیدوں اور انوائسز سے ٹیبلز اور ڈیٹا کا استخراج' } },
  { id: 5, domain: { en: 'NLP & Text Analytics (15-20%)', ar: 'معالجة اللغات الطبيعية', ur: 'قدرتی زبان کی تفہیم' }, title: { en: 'Arabic Customer Reviews Sentiment Analysis (Positive/Negative)', ar: 'تحليل المشاعر الإيجابية والسلبية لتقييمات العملاء بالعربية', ur: 'عربی کسٹمر ریویوز سے منفی و مثبت تاثر معلوم کرنا' } },
  { id: 6, domain: { en: 'Azure AI Speech', ar: 'خدمات الصوت والكلام', ur: 'آواز سے تحریر کی خدمات' }, title: { en: 'Real-Time Spoken Arabic Call Center Transcription', ar: 'تحويل المكالمات الهاتفية المسجلة إلى نص عربي فوري', ur: 'کال سینٹر کی گفتگو کو لائیو عربی تحریر میں بدلنا' } },
  { id: 7, domain: { en: 'Responsible AI: Explainability', ar: 'الشفافية وقابلية التفسير', ur: 'طبی فیصلہ سازی کی شفافیت' }, title: { en: 'Explaining Automated Healthcare Risk Assessment Rationale', ar: 'شرح وتفسير كيفية اتخاذ القرارات في تشخيصات الرعاية الصحية', ur: 'طبی تشخیص میں کمپیوٹر کے خودکار فیصلے کی وضاحت' } },
  { id: 8, domain: { en: 'Generative AI & LLMs (15-20%)', ar: 'الذكاء الاصطناعي التوليدي', ur: 'جنریٹو اے آئی و RAG' }, title: { en: 'Enterprise RAG Grounding to Official Company Bylaw Records', ar: 'تأريض إجابات الروبوت بوثائق ولوائح المنشأة الرسمية لمنع الهلوسة', ur: 'کمپنی قوانین کے مطابق چیٹ بوٹ کے مصدقہ جوابات (RAG)' } },
  { id: 9, domain: { en: 'Machine Learning Classification', ar: 'التصنيف الثنائي', ur: 'بائنری درجہ بندی (ہاں/نہ)' }, title: { en: 'Predicting Industrial Valve Failure (Yes/No Binary Outcome)', ar: 'التنبؤ بأعطال صمامات خطوط الأنابيب الصناعية (نعم/لا)', ur: 'صنعتی پائپ لائن والو کی خرابی کی پیش گوئی' } },
  { id: 10, domain: { en: 'AI Safety & Guardrails', ar: 'سلامة المحتوى والفلترة', ur: 'مواد کی سیکیورٹی فلٹرنگ' }, title: { en: 'Detecting & Filtering Toxic Content with Azure AI Content Safety', ar: 'رصد وحجب المحتوى الضار والمسيء في المدخلات والمخرجات', ur: 'نقصان دہ اور نفرت انگیز مواد کو خودکار بلاک کرنا' } }
];

export interface ChapterItem {
  id: string;
  num: string;
  title: { en: string; ar: string; ur: string };
  desc: { en: string; ar: string; ur: string };
}

export const CHAPTERS_LIST: ChapterItem[] = [
  { 
    id: 'calculator', 
    num: '01', 
    title: { en: 'Admission Calculators & Digital SAT', ar: 'حاسبات القبول والسات الدولي', ur: 'داخلہ کیلکولیٹرز و ڈیجیٹل سیٹ' },
    desc: { en: 'Standard Mawzoonah, Reverse Target, Multi-Uni Comparison & KFUPM/KSU Digital SAT Benchmark', ar: 'حاسبة الموزونة المعيارية، الدرجة العكسية، مقارنة الجامعات، ومسار السات الدولي', ur: 'معیاری موزونہ، ریورس ٹارگٹ، موازنہ اور کے ایف یو پی ایم/کے ایس یو ڈیجیٹل سیٹ' }
  },
  { 
    id: 'formulas', 
    num: '02', 
    title: { en: 'Certified Mawzoonah Weighting Formulas', ar: 'أوزان ومعادلات الموزونة المعتمدة', ur: 'مصدقہ موزونہ ویٹڈ فارمولے' },
    desc: { en: 'Accredited High School, Qudurat, and Tahsili weight percentages for all Saudi universities', ar: 'النسب الرسمية المعتمدة للثانوية والقدرات والتحصيلي لكافة الجامعات الحكومية', ur: 'تمام سرکاری جامعات کے لیے ہائی اسکول، قدرات اور تحصیلی کے باضابطہ اوزان' }
  },
  { 
    id: 'pathways', 
    num: '03', 
    title: { en: 'Secondary Pathways & English Placement', ar: 'المسارات الثانوية ومعادلة اللغة', ur: 'ثانوی مسارات اور انگلش پلیسمنٹ' },
    desc: { en: 'General, CS, Health, Business tracks and STEP/IELTS waiver guidelines', ar: 'المسار العام، الحاسب، الصحة، وإدارة الأعمال وضوابط معادلة ستيب وآيلتس', ur: 'جنرل، کمپیوٹر، ہیلتھ اور بزنس ٹریکس بشمول اسٹیپ و آئی ایل ٹی ایس چھوٹ' }
  },
  { 
    id: 'scholarships', 
    num: '04', 
    title: { en: 'Resident Expats & Scholarships (5% Quota)', ar: 'منح المقيمين والطلاب الدوليين (5%)', ur: 'مقیم طلباء کی داخلی اسکالرشپس' },
    desc: { en: 'Statutory 5% internal scholarship quota, eligibility thresholds, and benefits', ar: 'كوتة الـ 5% للمقيمين في الجامعات الحكومية وشروط التقديم والمزايا', ur: 'سرکاری جامعات میں مقیم طلباء کے لیے 5 فیصد کوٹہ، اہلیت اور سہولیات' }
  },
  { 
    id: 'timeline', 
    num: '05', 
    title: { en: 'Admissions Chronology & Deadlines', ar: 'مواعيد وجدول القبول الموحد', ur: 'داخلہ ٹائم لائن اور ڈیڈ لائنز' },
    desc: { en: 'Unified portal registration, Tahsili test periods, and induction milestones for 2026–2027', ar: 'مواعيد فتح البوابات، فترات التحصيلي، ومحطات التهيئة للعام الأكاديمي', ur: 'پورٹلز کا کھلنا، تحصیلی ٹیسٹ کی تاریخیں اور تعلیمی سال کا شیڈول' }
  },
  { 
    id: 'calendar-tracker', 
    num: '06', 
    title: { en: '2-Semester Tracker & Academic Calendar', ar: 'مرصد نظام الفصلين والتقويم الأكاديمي', ur: '2 سمسٹر ٹریکر و کیلنڈر' },
    desc: { en: 'University transition status (2 vs. 3 semesters) & official 1448H/1447H exam dates', ar: 'حالة الجامعات بين نظام الفصلين والـ 3 فصول وتقويم الاختبارات والإجازات', ur: 'جامعات میں 2 سمسٹر کا نفاذ اور امتحانات و تعطیلات کا سرکاری کیلنڈر' }
  },
  { 
    id: 'directory', 
    num: '07', 
    title: { en: 'Premier Universities Directory & Portals', ar: 'دليل الجامعات الحكومية وبوابات القبول', ur: 'جامعات ڈائریکٹری اور پورٹلز' },
    desc: { en: 'KSU, KFUPM, KAU, PNU, KAUST direct application links, QS rankings, and regional filters', ar: 'روابط بوابات التقديم المباشرة، تصنيفات QS، وفلاتر حسب المناطق', ur: 'تمام بڑی جامعات کے داخلہ پورٹلز کے لنکس، رینکنگ اور علاقائی فلٹرز' }
  },
  { 
    id: 'careers', 
    num: '08', 
    title: { en: 'Vision 2030 Top In-Demand Majors', ar: 'التخصصات الأكثر طلباً برؤية 2030', ur: 'ویژن 2030 کی ٹاپ ڈگریاں' },
    desc: { en: 'AI, Cybersecurity, Renewable Energy, Logistics, Tourism, and FinTech market demands', ar: 'الذكاء الاصطناعي، الأمن السيبراني، الطاقة المتجددة، والتقنية المالية', ur: 'اے آئی، سائبر سیکیورٹی، گرین انرجی اور فن ٹیک جیسے اہم شعبے' }
  },
  { 
    id: 'article-end', 
    num: '09', 
    title: { en: 'Conclusion, Takeaways & Official Portals', ar: 'خاتمة الدليل، التوصيات والمصادر الرسمية', ur: 'خاتمہ، اہم تجاویز و مصادر' },
    desc: { en: 'Actionable takeaways for Saudis, Expats, and SAT candidates + verified MoE gateways', ar: 'توصيات نهائية للطلاب والمقيمين وروابط البوابات الحكومية المعتمدة', ur: 'تمام امیدواروں کے لیے اہم تجاویز اور باضابطہ حکومتی پورٹلز' }
  },
];

const HigherEducation: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = getLanguage(i18n.language);
  const isRTL = currentLang === 'ar' || currentLang === 'ur';

  // Chapter Navigation & View State
  const [activeChapter, setActiveChapter] = useState<string>('calculator');
  const [viewMode, setViewMode] = useState<'all' | 'focus'>('all');

  // Calculator State
  const [calcTab, setCalcTab] = useState<'standard' | 'reverse' | 'compare' | 'sat'>('standard');
  const [selectedUniId, setSelectedUniId] = useState<string>('ksu');
  const [selectedTrackId, setSelectedTrackId] = useState<string>('health');
  const [highSchoolScore, setHighSchoolScore] = useState<number>(95);
  const [quduratScore, setQuduratScore] = useState<number>(90);
  const [tahsiliScore, setTahsiliScore] = useState<number>(88);
  const [satScore, setSatScore] = useState<number>(1400);
  const [copied, setCopied] = useState<boolean>(false);

  // Directory filter
  const [regionFilter, setRegionFilter] = useState<'all' | 'riyadh' | 'eastern' | 'western' | 'southern'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAiQuestionsPreview, setShowAiQuestionsPreview] = useState<boolean>(false);

  const currentUni = useMemo(() => {
    return UNIVERSITIES_DATA.find(u => u.id === selectedUniId) || UNIVERSITIES_DATA[0];
  }, [selectedUniId]);

  const currentTrack = useMemo(() => {
    return currentUni.tracks.find(tr => tr.id === selectedTrackId) || currentUni.tracks[0];
  }, [currentUni, selectedTrackId]);

  // Handle University Change
  const handleUniChange = (newUniId: string) => {
    setSelectedUniId(newUniId);
    const targetUni = UNIVERSITIES_DATA.find(u => u.id === newUniId);
    if (targetUni && targetUni.tracks.length > 0) {
      setSelectedTrackId(targetUni.tracks[0].id);
    }
  };

  // One-click Preset Scenario Applier
  const applyPreset = (preset: 'elite' | 'competitive' | 'standard') => {
    if (preset === 'elite') {
      setHighSchoolScore(98.5);
      setQuduratScore(95);
      setTahsiliScore(93);
      setSatScore(1520);
    } else if (preset === 'competitive') {
      setHighSchoolScore(94.0);
      setQuduratScore(88);
      setTahsiliScore(86);
      setSatScore(1420);
    } else {
      setHighSchoolScore(88.0);
      setQuduratScore(80);
      setTahsiliScore(78);
      setSatScore(1320);
    }
  };

  // Calculate Weighted Percentage
  const calculatedPercentage = useMemo(() => {
    const weights = currentTrack.weights;
    if (weights.sat && weights.sat > 0) {
      // SAT track evaluation
      return (satScore / 1600) * 100;
    }

    const hsPart = (Number(highSchoolScore) || 0) * (weights.highSchool / 100);
    const qudPart = (Number(quduratScore) || 0) * (weights.qudurat / 100);
    const tahPart = (Number(tahsiliScore) || 0) * (weights.tahsili / 100);

    const total = hsPart + qudPart + tahPart;
    return Math.min(100, Math.max(0, total));
  }, [currentTrack, highSchoolScore, quduratScore, tahsiliScore, satScore]);

  // Trilingual Performance Assessment Tier
  const performanceTier = useMemo(() => {
    if (currentTrack.weights.sat && currentTrack.weights.sat > 0) {
      if (satScore >= 1450) {
        return {
          label: {
            en: 'Elite KFUPM SAT Tier (Direct Acceptance)',
            ar: 'فئة النخبة للسات (قبول مباشر بالبترول والمعادن)',
            ur: 'سیٹ ایلیٹ ٹائر (براہ راست داخلہ)'
          },
          color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
        };
      }
      if (satScore >= 1350) {
        return {
          label: {
            en: 'Eligible for Direct Admission (1350+ SAT)',
            ar: 'مؤهل للقبول المباشر (1350+ سات)',
            ur: 'براہ راست داخلے کے لیے اہل (1350+ اسکور)'
          },
          color: 'text-secondary bg-amber-50 border-amber-200'
        };
      }
      return {
        label: {
          en: 'Below Minimum 1350 Threshold',
          ar: 'أقل من الحد الأدنى للسات (1350 نقطة)',
          ur: 'کم از کم 1350 کی حد سے کم اسکور'
        },
        color: 'text-rose-700 bg-rose-50 border-rose-200'
      };
    }

    if (calculatedPercentage >= 93) {
      return {
        label: {
          en: 'Highly Competitive for Medicine & AI (93%+)',
          ar: 'تنافسي للغاية لكليات الطب والذكاء الاصطناعي (93%+)',
          ur: 'میڈیسن اور مصنوعی ذہانت کے لیے انتہائی مسابقتی (93%+)'
        },
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
      };
    } else if (calculatedPercentage >= 85) {
      return {
        label: {
          en: 'Strong for Engineering, Computing & Science (85% - 92%)',
          ar: 'مؤهل بقوة للهندسة والحاسب والعلوم (85% - 92%)',
          ur: 'انجینئرنگ، کمپیوٹر اور سائنس کے لیے مضبوط اسکور (85% - 92%)'
        },
        color: 'text-secondary bg-amber-50 border-amber-200'
      };
    } else if (calculatedPercentage >= 78) {
      return {
        label: {
          en: 'Eligible for Business, Law & Humanities (78% - 84%)',
          ar: 'مؤهل لإدارة الأعمال والحقوق والإنسانيات (78% - 84%)',
          ur: 'بزنس، قانون اور ہیومینٹیز کے لیے اہل (78% - 84%)'
        },
        color: 'text-blue-700 bg-blue-50 border-blue-200'
      };
    } else {
      return {
        label: {
          en: 'Standard / Foundation College Range (<78%)',
          ar: 'ضمن نطاق كليات المجتمع والبرامج التأهيلية (<78%)',
          ur: 'فاؤنڈیشن اور کمیونٹی کالجز کی رینج (<78%)'
        },
        color: 'text-gray-700 bg-gray-50 border-gray-200'
      };
    }
  }, [calculatedPercentage, currentTrack, satScore]);

  // Visual Cutoff Delta Analysis & Probability Gauge
  const cutoffComparison = useMemo(() => {
    if (currentTrack.weights.sat && currentTrack.weights.sat > 0) {
      if (satScore >= 1450) {
        return {
          status: 'above',
          deltaBadge: '+100 pts',
          color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
          gaugePercent: 100,
          text: {
            en: 'Exceeds Benchmark (High Admission Probability for Direct Engineering)',
            ar: 'يتجاوز الحد المعتاد (احتمالية قبول مرتفعة جداً للمسار الهندسي)',
            ur: 'بینچ مارک سے زیادہ ہے (براہ راست انجینئرنگ داخلے کا قوی امکان)'
          }
        };
      } else if (satScore >= 1350) {
        return {
          status: 'in-range',
          deltaBadge: 'Meets Cutoff',
          color: 'text-secondary bg-amber-50 border-amber-200',
          gaugePercent: 85,
          text: {
            en: 'Within Competitive Range (Meets 1350 eligibility threshold)',
            ar: 'ضمن النطاق التنافسي (مستوفٍ لشرط القبول المباشر 1350)',
            ur: 'مسابقتی حد کے اندر (1350 کی بنیادی اہلیت پوری ہے)'
          }
        };
      } else {
        return {
          status: 'below',
          deltaBadge: `-${1350 - satScore} pts`,
          color: 'text-rose-700 bg-rose-50 border-rose-200',
          gaugePercent: Math.max(15, Math.round((satScore / 1350) * 70)),
          text: {
            en: 'Below Minimum Requirement (1350 needed for KFUPM consideration)',
            ar: 'دون الحد الأدنى المطلوب (1350 مطلوبة لدخول المفاضلة بالبترول)',
            ur: 'کم از کم معیار سے کم (1350 اسکور درکار ہے)'
          }
        };
      }
    }

    const minCutoff = currentTrack.cutoffMin || 85;
    const maxCutoff = currentTrack.cutoffMax || 92;

    if (calculatedPercentage >= maxCutoff) {
      const delta = (calculatedPercentage - maxCutoff).toFixed(1);
      return {
        status: 'above',
        deltaBadge: `+${delta}%`,
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        gaugePercent: Math.min(100, Math.round(((calculatedPercentage - 60) / 40) * 100)),
        text: {
          en: `Above Target Historical Cutoff (+${delta}%) — Strong Acceptance Probability`,
          ar: `أعلى من الحد التاريخي (+${delta}%) — فرصة قبول مرتفعة في الفرز الأول`,
          ur: `گزشتہ سال کے کٹ آف سے زائد (+${delta}%) — پہلے راؤنڈ میں قبولیت کا قوی امکان`
        }
      };
    } else if (calculatedPercentage >= minCutoff) {
      return {
        status: 'in-range',
        deltaBadge: 'In Band',
        color: 'text-secondary bg-amber-50 border-amber-200',
        gaugePercent: Math.min(90, Math.round(((calculatedPercentage - 60) / 40) * 100)),
        text: {
          en: `In Competitive Band (~${currentTrack.typicalCutoff}) — Strong Contender for Initial Rounds`,
          ar: `ضمن النطاق التنافسي (~${currentTrack.typicalCutoff}) — مرشح قوي في مراحل الفرز`,
          ur: `مسابقتی حد میں ہے (~${currentTrack.typicalCutoff}) — میرٹ مراحل میں مضبوط پوزیشن`
        }
      };
    } else {
      const delta = (minCutoff - calculatedPercentage).toFixed(1);
      return {
        status: 'below',
        deltaBadge: `-${delta}%`,
        color: 'text-rose-700 bg-rose-50 border-rose-200',
        gaugePercent: Math.max(15, Math.round(((calculatedPercentage - 60) / 40) * 100)),
        text: {
          en: `Below Typical Cutoff (-${delta}%) — Consider Alternative Regional/Community Tracks`,
          ar: `أقل من الحد المعتاد (-${delta}%) — يُنصح بإدراج رغبات بديلة في القبول الموحد`,
          ur: `معمول کے کٹ آف سے کم (-${delta}%) — متبادل کالجز اور کیمپسز کو ترجیح دیں`
        }
      };
    }
  }, [calculatedPercentage, currentTrack, satScore]);

  const handleCopyBreakdown = () => {
    const text = `🎓 KSA Insights University Admission Result:\nUniversity: ${currentUni.name[currentLang] || currentUni.name.en}\nTrack: ${currentTrack.name[currentLang] || currentTrack.name.en}\nCalculated Weighted Percentage: ${calculatedPercentage.toFixed(2)}%\nTarget Benchmark: ${currentTrack.typicalCutoff}\nCalculate yours: https://ksainsights.com/higher-education`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `🎓 KSA Insights Weighted GPA Result: ${currentUni.name[currentLang] || currentUni.name.en} (${currentTrack.name[currentLang] || currentTrack.name.en}) = ${calculatedPercentage.toFixed(2)}% | Check your eligibility: https://ksainsights.com/higher-education`
  )}`;

  const filteredUnis = useMemo(() => {
    return UNIVERSITIES_DATA.filter(uni => {
      const matchesRegion = regionFilter === 'all' || uni.region === regionFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        uni.name.en.toLowerCase().includes(q) || 
        uni.name.ar.includes(q) || 
        uni.name.ur.includes(q) ||
        uni.location.en.toLowerCase().includes(q) ||
        uni.location.ar.includes(q) ||
        Boolean(uni.location.ur && uni.location.ur.includes(q));
      return matchesRegion && matchesSearch;
    });
  }, [regionFilter, searchQuery]);

  // Handle Chapter Click
  const handleChapterClick = (chapterId: string, forceFocus = false) => {
    setActiveChapter(chapterId);
    if (forceFocus) {
      setViewMode('focus');
    }
    setTimeout(() => {
      const el = document.getElementById(chapterId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        el.classList.add('ring-4', 'ring-secondary', 'ring-offset-4', 'rounded-[3rem]');
        setTimeout(() => {
          el.classList.remove('ring-4', 'ring-secondary', 'ring-offset-4', 'rounded-[3rem]');
        }, 2200);
      }
    }, 60);
  };

  const activeChapterIndex = useMemo(() => {
    return CHAPTERS_LIST.findIndex(c => c.id === activeChapter);
  }, [activeChapter]);

  const prevChapter = activeChapterIndex > 0 ? CHAPTERS_LIST[activeChapterIndex - 1] : null;
  const nextChapter = activeChapterIndex < CHAPTERS_LIST.length - 1 ? CHAPTERS_LIST[activeChapterIndex + 1] : null;

  const higherEducationKeywords = currentLang === 'ar'
    ? 'النسبة الموزونة 1447, حاسبة النسبة الموزونة, القبول الموحد للجامعات, جامعة الملك سعود, جامعة الملك فهد للبترول والمعادن, قياس قدرات وتحصيلي, شروط قبول المقيمين في الجامعات السعودية, دراسة الأجانب في السعودية, منح الجامعات السعودية للوافدين, مسار السات KFUPM, التقويم الدراسي للجامعات فصلين'
    : currentLang === 'ur'
    ? 'سعودی یونیورسٹی داخلے 2026, موزونہ کیلکولیٹر, کنگ سعود یونیورسٹی, کنگ فہد یونیورسٹی آف پیٹرولیم اینڈ منرلز, تحصیلی ٹیسٹ, قدرات امتحان, غیر ملکی طلبہ کے لیے اسکالرشپ, ادرس فی السعودیہ پورٹل'
    : 'Saudi university admissions 2026, Mawzoonah calculator, weighted percentage Saudi Arabia, KFUPM SAT cutoff, King Saud University admission, Tahsili Qiyas weighting, expat scholarships Saudi universities, Study in Saudi portal, Council of University Affairs calendar';

  const higherEducationJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'Saudi Higher Education Admissions & Mawzoonah Calculator Suite',
      'applicationCategory': 'EducationalApplication',
      'operatingSystem': 'All',
      'description': 'Interactive Mawzoonah weighted GPA calculator, Reverse Target score predictor, and Digital SAT benchmark tool for Saudi universities.',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'SAR'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What is the Mawzoonah (Weighted Percentage) for Saudi university admissions?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'The Mawzoonah is the composite weighted score combining High School GPA (Thanawiyah), General Aptitude Test (Qudurat), and Educational Attainment Test (Tahsili), certified by the Ministry of Education and individual university senates.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What are the Digital SAT requirements for KFUPM and KSU?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'KFUPM typically requires a minimum composite Digital SAT score of 1350 with at least 650 to 700 in the Math section for international and fast-track applicants.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can resident expatriates (Iqama holders) study at Saudi public universities?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes, resident expats can apply through the statutory 5% Internal Scholarship (المنح الداخلية) quota across Saudi public universities, subject to competitive merit ranking.'
          }
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafaf9] py-8 lg:py-16">
      <SEO 
        title={currentLang === 'ar' 
          ? "التعليم في السعودية | حاسبة النسبة الموزونة ومواعيد القبول الجامعي 1447" 
          : currentLang === 'ur'
          ? "سعودی جامعات میں داخلے اور موزونہ کیلکولیٹر 2026"
          : "Education in KSA | University Admissions & Weighted Percentage Calculator 2026"}
        description={currentLang === 'ar'
          ? "دليل القبول في الجامعات السعودية 1447هـ / 2026م. حاسبة النسبة الموزونة لجامعة الملك سعود، البترول، الملك عبدالعزيز، نورة، نسب القبول وشروط قبول غير السعوديين والمنح الدراسية."
          : currentLang === 'ur'
          ? "سعودی جامعات کنگ سعود، کے ایف یو پی ایم اور نورة میں داخلے کے لیے موزونہ کیلکولیٹر اور غیر ملکی طلبہ کے لیے اسکالرشپ کی گائیڈ۔"
          : "Comprehensive portal for Saudi university admissions 1447H / 2026. Interactive Weighted Percentage Calculator for KSU, KFUPM, KAU, PNU, unified portal deadlines, and resident expat scholarship guides."}
        keywords={higherEducationKeywords}
        jsonLd={higherEducationJsonLd}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero Section */}
        <div className="relative rounded-[3rem] bg-primary text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl mb-12 border border-white/10">
          <div className="absolute inset-0 emerald-gradient opacity-90" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-secondary text-xs font-bold uppercase tracking-[0.25em] mb-6">
              <GraduationCap size={16} />
              <span>
                {currentLang === 'ar' ? 'قطاع التعليم والقبول الجامعي 1447هـ' : currentLang === 'ur' ? 'تعلیم اور یونیورسٹی داخلے 2026' : 'Education & Admissions 2026 / 1447H'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15] mb-6">
              {currentLang === 'ar' ? (
                <>بوابة التعليم في السعودية <span className="text-gold-gradient">وحاسبة النسبة الموزونة</span> لجامعات المملكة</>
              ) : currentLang === 'ur' ? (
                <>سعودی عرب میں تعلیم <span className="text-gold-gradient">اور یونیورسٹی داخلہ کیلکولیٹر</span></>
              ) : (
                <>Education in KSA: <span className="text-gold-gradient">Admissions, Calculators & Portals</span></>
              )}
            </h1>

            <p className="text-white/80 text-base sm:text-lg font-light leading-relaxed mb-8 max-w-3xl">
              {currentLang === 'ar' ? (
                'الدليل الشامل للطلاب السعوديين والمقيمين والدوليين. احسب نسبتك الموزونة بدقة لكافة الجامعات الحكومية، واطلع على شروط المنح الداخلية، ومسارات السات (SAT)، ومواعيد القبول الموحد لعام 2026.'
              ) : currentLang === 'ur' ? (
                'سعودی، مقیم اور بین الاقوامی طلباء کے لیے مکمل گائیڈ۔ تمام سرکاری جامعات کے لیے اپنا ویٹڈ اسکور (النسبة الموزونة) معلوم کریں، داخلی اسکالرشپس اور داخلہ پورٹلز کی تاریخیں دیکھیں۔'
              ) : (
                'The definitive guide for Saudi nationals, resident expatriates, and international students. Calculate your exact weighted GPA percentage across premier Saudi universities, explore scholarship quotas, and track official 2026 application deadlines.'
              )}
            </p>

            {/* Quick Stats Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/15">
              <div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-secondary">30+</div>
                <div className="text-xs text-white/60 uppercase tracking-widest mt-1">
                  {currentLang === 'ar' ? 'جامعة حكومية وخاصة' : currentLang === 'ur' ? 'سرکاری و نجی جامعات' : 'Public & Private Unis'}
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-secondary">#1</div>
                <div className="text-xs text-white/60 uppercase tracking-widest mt-1">
                  {currentLang === 'ar' ? 'تصنيف KFUPM عربياً' : currentLang === 'ur' ? 'عرب دنیا میں نمبر 1' : 'KFUPM Arab QS Rank'}
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-secondary">100%</div>
                <div className="text-xs text-white/60 uppercase tracking-widest mt-1">
                  {currentLang === 'ar' ? 'حاسبة تفاعلية معتمدة' : currentLang === 'ur' ? 'مصدقہ فارمولے' : 'Official Weighting Formulas'}
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-secondary">50k+</div>
                <div className="text-xs text-white/60 uppercase tracking-widest mt-1">
                  {currentLang === 'ar' ? 'مقعد ومنحة سنوية' : currentLang === 'ur' ? 'سالانہ اسکالرشپس' : 'Annual Scholarships'}
                </div>
              </div>
            </div>

            {/* In-Page Quick Pill Bar */}
            <div className="flex flex-wrap gap-2 pt-6">
              <button
                onClick={() => handleChapterClick('article-start')}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-secondary hover:text-primary text-white text-xs font-bold transition-all backdrop-blur-sm border border-white/15 cursor-pointer"
              >
                {currentLang === 'ar' ? 'فهرس الدليل' : currentLang === 'ur' ? 'فہرست ابواب' : 'Table of Contents'}
              </button>
              {CHAPTERS_LIST.map(ch => (
                <button
                  key={`quick-pill-${ch.id}`}
                  onClick={() => handleChapterClick(ch.id)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all backdrop-blur-sm border cursor-pointer",
                    activeChapter === ch.id
                      ? "bg-secondary text-primary border-secondary font-black shadow-sm"
                      : "bg-white/10 hover:bg-secondary hover:text-primary text-white border-white/15"
                  )}
                >
                  <span className="opacity-70 mr-1 rtl:ml-1 rtl:mr-0">#{ch.num}</span>
                  {ch.title[currentLang] || ch.title.en}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ARTICLE ORIGIN & MASTER CHAPTER INDEX (DEFINES WHERE THE ARTICLE STARTS)  */}
        {/* ========================================================================= */}
        <div id="article-start" className="bg-white rounded-[2.5rem] p-6 sm:p-8 border border-gray-150 shadow-md mb-8 scroll-mt-24">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gray-100">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-primary text-secondary text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                  <Flag size={13} className="text-secondary" />
                  <span>{currentLang === 'ar' ? 'نقطة انطلاق الدليل الشامل' : currentLang === 'ur' ? 'جامع گائیڈ کا نقطہ آغاز' : 'Article Origin & Guide Start'}</span>
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {currentLang === 'ar' ? 'العام الأكاديمي 1448هـ / 2026–2027م' : 'Academic Session 2026–2027'}
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-serif font-bold text-primary pt-1">
                {currentLang === 'ar' 
                  ? 'فهرس فصول الدليل الأكاديمي المعتمد للتعليم العالي والقبول في السعودية' 
                  : currentLang === 'ur'
                  ? 'سعودی اعلیٰ تعلیم اور یونیورسٹی داخلوں کے تمام ابواب کا تفصیلی انڈیکس'
                  : 'Master Chapter Index: Saudi Higher Education, Admissions & Policy Guide'}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-light">
                {currentLang === 'ar'
                  ? 'انقر على أي من الفصول الـ 9 أدناه للانتقال الفوري وعرض محتواه وتفاصيله الكاملة مباشرة.'
                  : currentLang === 'ur'
                  ? 'کسی بھی باب پر کلک کریں تاکہ اس کا مواد اور تمام تر تفصیلات فوری طور پر ظاہر ہو سکیں۔'
                  : 'Click on any of the 9 chapters below to jump directly to its content or display it individually.'}
              </p>
            </div>

            {/* View Mode Toggle Controls */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <div className="flex items-center p-1 rounded-2xl bg-paper border border-gray-200">
                <button
                  onClick={() => setViewMode('all')}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                    viewMode === 'all'
                      ? "bg-primary text-secondary shadow-sm"
                      : "text-gray-500 hover:text-primary"
                  )}
                  title="View all 9 chapters continuously"
                >
                  <BookOpen size={13} />
                  <span>{currentLang === 'ar' ? 'عرض كافة الفصول' : currentLang === 'ur' ? 'تمام 9 ابواب' : 'All Chapters'}</span>
                </button>

                <button
                  onClick={() => setViewMode('focus')}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                    viewMode === 'focus'
                      ? "bg-primary text-secondary shadow-sm"
                      : "text-gray-500 hover:text-primary"
                  )}
                  title="Focus on one chapter at a time"
                >
                  <Target size={13} />
                  <span>{currentLang === 'ar' ? 'فصل تلو الآخر' : currentLang === 'ur' ? 'منتخب باب' : 'Focus Mode'}</span>
                </button>
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-500 font-light bg-gray-50 px-3.5 py-2 rounded-2xl border border-gray-200">
                <span className="flex items-center gap-1.5 font-medium text-gray-700">
                  <Clock size={13} className="text-secondary" />
                  <span>{currentLang === 'ar' ? '15 دقيقة' : '15 Min'}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 font-medium text-gray-700">
                  <Layers size={13} className="text-secondary" />
                  <span>9 {currentLang === 'ar' ? 'فصول' : 'Chapters'}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Clickable Grid for all 9 Chapters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-6">
            {CHAPTERS_LIST.map(ch => {
              const isActive = activeChapter === ch.id;
              return (
                <button
                  key={`chapter-card-${ch.id}`}
                  onClick={() => handleChapterClick(ch.id)}
                  className={cn(
                    "flex flex-col justify-between p-4 rounded-2xl text-start transition-all duration-200 group cursor-pointer relative overflow-hidden border",
                    isActive
                      ? "bg-primary text-white border-secondary/50 shadow-lg ring-2 ring-secondary/30"
                      : "bg-paper hover:bg-emerald-50/60 border-gray-150 hover:border-emerald-300 shadow-2xs"
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={cn(
                        "w-8 h-8 rounded-xl font-mono font-bold text-xs flex items-center justify-center transition-colors shadow-2xs",
                        isActive
                          ? "bg-secondary text-primary font-black"
                          : "bg-primary text-secondary group-hover:bg-secondary group-hover:text-primary"
                      )}>
                        {ch.num}
                      </span>

                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1",
                        isActive
                          ? "bg-secondary/20 text-secondary"
                          : "bg-gray-100 text-gray-500 group-hover:bg-emerald-100 group-hover:text-emerald-800"
                      )}>
                        {isActive ? (
                          <>
                            <Eye size={11} />
                            <span>{currentLang === 'ar' ? 'معروض الآن' : currentLang === 'ur' ? 'زیر مطالعہ' : 'Viewing'}</span>
                          </>
                        ) : (
                          <>
                            <span>{currentLang === 'ar' ? 'انقر للعرض' : currentLang === 'ur' ? 'دیکھیں' : 'Open'}</span>
                            <ChevronRight size={11} className={isRTL ? 'rotate-180' : ''} />
                          </>
                        )}
                      </span>
                    </div>

                    <h3 className={cn(
                      "font-serif font-bold text-sm mb-1.5 transition-colors leading-snug line-clamp-1",
                      isActive ? "text-white" : "text-primary group-hover:text-emerald-950"
                    )}>
                      {ch.title[currentLang] || ch.title.en}
                    </h3>

                    <p className={cn(
                      "text-xs leading-relaxed line-clamp-2 font-light",
                      isActive ? "text-gray-300" : "text-gray-500 group-hover:text-gray-600"
                    )}>
                      {ch.desc[currentLang] || ch.desc.en}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Focus Mode Banner (Shows when single chapter mode is active) */}
        {viewMode === 'focus' && (
          <div id="chapter-content-viewport" className="bg-primary text-white rounded-3xl p-5 sm:p-6 mb-8 border border-secondary/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <span className="w-10 h-10 rounded-2xl bg-secondary text-primary font-black flex items-center justify-center text-sm shadow-md shrink-0">
                {CHAPTERS_LIST.find(c => c.id === activeChapter)?.num || '01'}
              </span>
              <div>
                <div className="text-[11px] text-secondary uppercase font-bold tracking-wider flex items-center gap-1.5">
                  <Eye size={12} />
                  <span>{currentLang === 'ar' ? 'أنت تستعرض الآن الفصل المحدد' : currentLang === 'ur' ? 'آپ منتخب شدہ باب دیکھ رہے ہیں' : 'Viewing Isolated Chapter'}</span>
                </div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                  {CHAPTERS_LIST.find(c => c.id === activeChapter)?.title[currentLang] || CHAPTERS_LIST.find(c => c.id === activeChapter)?.title.en}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {prevChapter && (
                <button
                  onClick={() => handleChapterClick(prevChapter.id, true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer"
                  title="Previous Chapter"
                >
                  {isRTL ? <ArrowRight size={13} /> : <ArrowLeft size={13} />}
                  <span>#{prevChapter.num}</span>
                </button>
              )}

              {nextChapter && (
                <button
                  onClick={() => handleChapterClick(nextChapter.id, true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-secondary text-primary hover:bg-yellow-400 text-xs font-bold transition-all cursor-pointer shadow-sm"
                  title="Next Chapter"
                >
                  <span>#{nextChapter.num}</span>
                  {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}
                </button>
              )}

              <button
                onClick={() => setViewMode('all')}
                className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all cursor-pointer ml-1 rtl:mr-1 rtl:ml-0"
              >
                {currentLang === 'ar' ? 'عرض الكل' : 'View All'}
              </button>
            </div>
          </div>
        )}

        {/* Section 1: The Interactive Weighted Percentage Calculator */}
        {(viewMode === 'all' || activeChapter === 'calculator') && (
        <div id="calculator" className="scroll-mt-24 transition-all duration-300 bg-white rounded-[3rem] p-6 sm:p-10 lg:p-12 shadow-xl border border-gray-100 mb-16 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-100 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
                <span>{currentLang === 'ar' ? 'الفصل 01 من 09 • حاسبات القبول والموزونة' : 'Chapter 01 of 09 • Admission Calculators Suite'}</span>
              </div>
              <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-[0.2em] mb-2">
                <Calculator size={16} />
                <span>
                  {currentLang === 'ar' ? 'الأداة التفاعلية الرسمية' : currentLang === 'ur' ? 'آفیشل آن لائن ٹول' : 'Official Interactive Tool'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-primary">
                {currentLang === 'ar' ? 'حاسبة النسبة الموزونة والسات الرقمي للجامعات السعودية' : currentLang === 'ur' ? 'سعودی جامعات کا ویٹڈ و ڈیجیٹل سیٹ کیلکولیٹر' : 'KSA University Weighted & Digital SAT Calculator'}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleCopyBreakdown}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 text-primary hover:bg-gray-50 text-xs font-bold transition-all shadow-sm"
              >
                {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                <span>{copied ? (currentLang === 'ar' ? 'تم النسخ!' : currentLang === 'ur' ? 'کاپی ہوگیا!' : 'Copied!') : (currentLang === 'ar' ? 'نسخ النتيجة' : currentLang === 'ur' ? 'اسکور کاپی کریں' : 'Copy Score')}</span>
              </button>
              <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold transition-all shadow-sm"
              >
                <Share2 size={14} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Calculator Mode Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-paper p-2 rounded-2xl border border-gray-150">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setCalcTab('standard')}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all",
                  calcTab === 'standard' 
                    ? "bg-primary text-white shadow-sm" 
                    : "text-gray-600 hover:text-primary hover:bg-white"
                )}
              >
                <Calculator size={14} />
                <span>{currentLang === 'ar' ? 'حاسبة النسبة الموزونة' : currentLang === 'ur' ? 'معیاری موزونہ کیلکولیٹر' : 'Standard Calculator'}</span>
              </button>

              <button
                onClick={() => setCalcTab('reverse')}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all",
                  calcTab === 'reverse' 
                    ? "bg-primary text-white shadow-sm" 
                    : "text-gray-600 hover:text-primary hover:bg-white"
                )}
              >
                <Target size={14} />
                <span>{currentLang === 'ar' ? 'الحاسبة العكسية (الدرجة المطلوبة)' : currentLang === 'ur' ? 'ریورس ٹارگٹ اسکور' : 'Reverse Target Score'}</span>
              </button>

              <button
                onClick={() => setCalcTab('compare')}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all",
                  calcTab === 'compare' 
                    ? "bg-primary text-white shadow-sm" 
                    : "text-gray-600 hover:text-primary hover:bg-white"
                )}
              >
                <BarChart3 size={14} />
                <span>{currentLang === 'ar' ? 'مقارنة كافة الجامعات' : currentLang === 'ur' ? 'تمام جامعات کا موازنہ' : 'Compare All Universities'}</span>
              </button>

              <button
                onClick={() => setCalcTab('sat')}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                  calcTab === 'sat' 
                    ? "bg-primary text-secondary shadow-sm" 
                    : "text-gray-600 hover:text-primary hover:bg-white"
                )}
              >
                <Sparkles size={14} className="text-secondary" />
                <span>{currentLang === 'ar' ? 'حاسبة السات الدولي (KFUPM & KSU)' : currentLang === 'ur' ? 'ڈیجیٹل سیٹ کیلکولیٹر' : 'Digital SAT Benchmark'}</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-secondary/20 text-secondary">
                  New
                </span>
              </button>
            </div>

            {/* Quick Presets */}
            {calcTab === 'standard' && (
              <div className="flex items-center gap-1.5 text-[11px] font-bold">
                <span className="text-gray-400 hidden sm:inline">
                  {currentLang === 'ar' ? 'سيناريوهات سريعة:' : currentLang === 'ur' ? 'سیمپل اسکورز:' : 'Quick Presets:'}
                </span>
                <button
                  onClick={() => applyPreset('elite')}
                  className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                >
                  {currentLang === 'ar' ? 'نخبة (98.5%)' : currentLang === 'ur' ? 'ایلیٹ (98.5%)' : 'Elite (98.5%)'}
                </button>
                <button
                  onClick={() => applyPreset('competitive')}
                  className="px-2.5 py-1 rounded-lg bg-amber-50 text-secondary hover:bg-amber-100 transition-colors"
                >
                  {currentLang === 'ar' ? 'تنافسي (94%)' : currentLang === 'ur' ? 'مسابقتی (94%)' : 'Competitive (94%)'}
                </button>
                <button
                  onClick={() => applyPreset('standard')}
                  className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  {currentLang === 'ar' ? 'متوسط (88%)' : currentLang === 'ur' ? 'معیاری (88%)' : 'Standard (88%)'}
                </button>
              </div>
            )}
          </div>

          {calcTab === 'reverse' ? (
            <ReverseTargetCalculator 
              currentLang={currentLang}
              universities={UNIVERSITIES_DATA}
              selectedUniId={selectedUniId}
              selectedTrackId={selectedTrackId}
              onSelectUniversity={(uId, tId) => {
                setSelectedUniId(uId);
                setSelectedTrackId(tId);
              }}
            />
          ) : calcTab === 'compare' ? (
            <MultiUniComparison 
              currentLang={currentLang}
              universities={UNIVERSITIES_DATA}
              highSchoolScore={highSchoolScore}
              quduratScore={quduratScore}
              tahsiliScore={tahsiliScore}
              onSelectUniversity={(uId, tId) => {
                setSelectedUniId(uId);
                setSelectedTrackId(tId);
                setCalcTab('standard');
              }}
            />
          ) : calcTab === 'sat' ? (
            <DigitalSatCalculator currentLang={currentLang} />
          ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Input Controls (Left 7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* University Selector */}
              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">
                  {currentLang === 'ar' ? '1. اختر الجامعة' : currentLang === 'ur' ? '1. یونیورسٹی منتخب کریں' : '1. Select University'}
                </label>
                <div className="relative">
                  <select
                    value={selectedUniId}
                    onChange={(e) => handleUniChange(e.target.value)}
                    className="w-full bg-paper border border-gray-200 rounded-2xl px-4 py-3.5 text-sm font-semibold text-primary focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all appearance-none cursor-pointer"
                  >
                    {UNIVERSITIES_DATA.map(uni => (
                      <option key={uni.id} value={uni.id}>
                        {uni.name[currentLang] || uni.name.en} ({uni.location[currentLang] || uni.location.en})
                      </option>
                    ))}
                  </select>
                  <div className="absolute top-1/2 end-4 -translate-y-1/2 pointer-events-none text-gray-400">
                    <ChevronRight size={18} className="rotate-90" />
                  </div>
                </div>
              </div>

              {/* College Track Selector */}
              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">
                  {currentLang === 'ar' ? '2. المسار أو الكلية المستهدفة' : currentLang === 'ur' ? '2. متعلقہ شعبہ یا کالج' : '2. Target Stream / College Track'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentUni.tracks.map((track) => (
                    <button
                      key={`track-select-${currentUni.id}-${track.id}`}
                      type="button"
                      onClick={() => setSelectedTrackId(track.id)}
                      className={cn(
                        "p-3.5 rounded-2xl border text-start transition-all text-xs font-bold flex flex-col justify-between gap-1",
                        selectedTrackId === track.id
                          ? "border-secondary bg-secondary/5 text-primary shadow-sm"
                          : "border-gray-200 hover:border-gray-300 text-gray-600 bg-white"
                      )}
                    >
                      <span className="font-serif font-bold text-sm text-primary">
                        {track.name[currentLang] || track.name.en}
                      </span>
                      <span className="text-[11px] text-gray-400 font-normal line-clamp-1">
                        {track.description[currentLang] || track.description.en}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Formula Formula Chips */}
              <div className="p-4 rounded-2xl bg-paper border border-gray-100 flex flex-wrap items-center gap-4 text-xs font-medium text-gray-600">
                <span className="font-bold text-primary flex items-center gap-1.5">
                  <Compass size={14} className="text-secondary" />
                  {currentLang === 'ar' ? 'معادلة الاحتساب:' : currentLang === 'ur' ? 'ویٹج کا فارمولا:' : 'Formula Breakdown:'}
                </span>
                {currentTrack.weights.sat ? (
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-primary font-bold">
                    SAT (Math + Reading): 100% (Min 1350)
                  </span>
                ) : (
                  <>
                    <span className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-primary font-bold">
                      {currentLang === 'ar' ? 'الثانوية العامة' : currentLang === 'ur' ? 'تھانویہ (انٹرمیڈیٹ)' : 'High School'}: {currentTrack.weights.highSchool}%
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-primary font-bold">
                      {currentLang === 'ar' ? 'القدرات العامة' : currentLang === 'ur' ? 'قدرات (ایپٹیٹیوڈ)' : 'Qudurat'}: {currentTrack.weights.qudurat}%
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-primary font-bold">
                      {currentLang === 'ar' ? 'التحصيلي' : currentLang === 'ur' ? 'تحصیلی (اچیومنٹ)' : 'Tahsili'}: {currentTrack.weights.tahsili}%
                    </span>
                  </>
                )}
              </div>

              {/* Input Sliders */}
              {currentTrack.weights.sat ? (
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-primary mb-2">
                    <span>{currentLang === 'ar' ? 'درجة اختبار SAT (من 1600)' : currentLang === 'ur' ? 'سیٹ (SAT) کا اسکور' : 'SAT Score (out of 1600)'}</span>
                    <span className="text-secondary text-sm font-black">{satScore}</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="1600"
                    step="10"
                    value={satScore}
                    onChange={(e) => setSatScore(Number(e.target.value))}
                    className="w-full accent-secondary cursor-pointer h-2 bg-gray-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>1000</span>
                    <span className="font-bold text-secondary">1350 (KFUPM Min)</span>
                    <span>1600</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-5 pt-2">
                  {/* High School GPA */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold text-primary mb-1.5">
                      <span>{currentLang === 'ar' ? 'نسبة الثانوية العامة (%)' : currentLang === 'ur' ? 'تھانویہ / ہائی اسکول اسکور (%)' : 'High School Cumulative GPA (%)'}</span>
                      <span className="text-secondary font-black text-sm">{highSchoolScore}%</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="60"
                        max="100"
                        step="0.5"
                        value={highSchoolScore}
                        onChange={(e) => setHighSchoolScore(Number(e.target.value))}
                        className="flex-grow accent-secondary cursor-pointer h-2 bg-gray-200 rounded-lg"
                      />
                      <input
                        type="number"
                        min="50"
                        max="100"
                        value={highSchoolScore}
                        onChange={(e) => setHighSchoolScore(Math.min(100, Math.max(0, Number(e.target.value))))}
                        className="w-16 px-2 py-1 text-center font-bold text-sm bg-paper border border-gray-200 rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Qudurat Score */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold text-primary mb-1.5">
                      <span>{currentLang === 'ar' ? 'درجة اختبار القدرات العامة' : currentLang === 'ur' ? 'قدرات جنرل ایپٹیٹیوڈ اسکور' : 'Qudurat (General Aptitude Test)'}</span>
                      <span className="text-secondary font-black text-sm">{quduratScore}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="50"
                        max="100"
                        step="1"
                        value={quduratScore}
                        onChange={(e) => setQuduratScore(Number(e.target.value))}
                        className="flex-grow accent-secondary cursor-pointer h-2 bg-gray-200 rounded-lg"
                      />
                      <input
                        type="number"
                        min="50"
                        max="100"
                        value={quduratScore}
                        onChange={(e) => setQuduratScore(Math.min(100, Math.max(0, Number(e.target.value))))}
                        className="w-16 px-2 py-1 text-center font-bold text-sm bg-paper border border-gray-200 rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Tahsili Score */}
                  {currentTrack.weights.tahsili > 0 && (
                    <div>
                      <div className="flex justify-between items-center text-xs font-bold text-primary mb-1.5">
                        <span>{currentLang === 'ar' ? 'درجة الاختبار التحصيلي' : currentLang === 'ur' ? 'تحصیلی اچیومنٹ ٹیسٹ اسکور' : 'Tahsili (Scholastic Achievement Test)'}</span>
                        <span className="text-secondary font-black text-sm">{tahsiliScore}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="50"
                          max="100"
                          step="1"
                          value={tahsiliScore}
                          onChange={(e) => setTahsiliScore(Number(e.target.value))}
                          className="flex-grow accent-secondary cursor-pointer h-2 bg-gray-200 rounded-lg"
                        />
                        <input
                          type="number"
                          min="50"
                          max="100"
                          value={tahsiliScore}
                          onChange={(e) => setTahsiliScore(Math.min(100, Math.max(0, Number(e.target.value))))}
                          className="w-16 px-2 py-1 text-center font-bold text-sm bg-paper border border-gray-200 rounded-xl"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Results Display Card (Right 5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-primary text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 emerald-gradient opacity-95" />
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-secondary/15 rounded-full blur-2xl" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-secondary">
                    {currentLang === 'ar' ? 'النتيجة الموزونة النهائية' : currentLang === 'ur' ? 'آپ کا حتمی نتیجہ' : 'Calculated Weighted Result'}
                  </span>
                  <Award size={18} className="text-secondary" />
                </div>

                <div className="text-center py-4">
                  <motion.div 
                    key={`calc-result-${calculatedPercentage.toFixed(2)}`}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-5xl sm:text-6xl font-serif font-black text-white tracking-tight"
                  >
                    {calculatedPercentage.toFixed(2)}%
                  </motion.div>
                  <p className="text-white/60 text-xs mt-2 uppercase tracking-widest">
                    {currentUni.name[currentLang] || currentUni.name.en}
                  </p>
                </div>

                {/* Performance Assessment Badge */}
                <div className={cn("p-3.5 rounded-2xl border text-xs font-bold text-center", performanceTier.color)}>
                  {performanceTier.label[currentLang] || performanceTier.label.en}
                </div>

                {/* Historical Benchmark Insight */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-xs space-y-2">
                  <div className="flex justify-between text-white/70">
                    <span>{currentLang === 'ar' ? 'الحد الأدنى التاريخي التقريبي:' : currentLang === 'ur' ? 'گزشتہ سال کی کم از کم کٹ آف:' : 'Historical Benchmark:'}</span>
                    <span className="font-bold text-secondary">{currentTrack.typicalCutoff}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>{currentLang === 'ar' ? 'التصنيف الأكاديمي:' : currentLang === 'ur' ? 'یونیورسٹی رینکنگ:' : 'Academic Tier:'}</span>
                    <span className="font-bold text-white">{currentUni.qsRank || 'Accredited MoE'}</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-6 mt-6 border-t border-white/15">
                <a
                  href={currentUni.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full gold-gradient text-primary font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform text-xs uppercase tracking-widest shadow-lg"
                >
                  <span>{currentLang === 'ar' ? 'زيارة بوابة القبول الرسمية' : currentLang === 'ur' ? 'آفیشل داخلہ پورٹل کھولیں' : 'Open Official Admission Portal'}</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

          </div>
          )}
        </div>
        )}

        {/* Section 2: Master Mawzoonah Weighting Formulas Table (MoE Certified) */}
        {(viewMode === 'all' || activeChapter === 'formulas') && (
        <div id="formulas" className="scroll-mt-24 transition-all duration-300">
          <MawzoonahFormulaTable 
            currentLang={currentLang} 
            onSelectTrack={(uId, tId) => {
              setSelectedUniId(uId);
              setSelectedTrackId(tId);
              setCalcTab('standard');
              handleChapterClick('calculator');
            }}
          />
        </div>
        )}

        {/* Section 3: High School Secondary Pathways Guide & STEP / English Placement */}
        {(viewMode === 'all' || activeChapter === 'pathways') && (
        <div id="pathways" className="scroll-mt-24 transition-all duration-300">
          <SecondaryPathwaysGuide currentLang={currentLang} />
        </div>
        )}

        {/* Section 4: Resident Expats, Non-Saudis & Internal Scholarships Policy Matrix */}
        {(viewMode === 'all' || activeChapter === 'scholarships') && (
        <div id="scholarships" className="scroll-mt-24 transition-all duration-300">
          <ExpatScholarshipGuide currentLang={currentLang} />
        </div>
        )}

        {/* Section 5: Key Admission Dates & 2026-2027 Chronology Roadmap */}
        {(viewMode === 'all' || activeChapter === 'timeline') && (
        <div id="timeline" className="scroll-mt-24 transition-all duration-300">
          <AdmissionTimeline2027 currentLang={currentLang} />
        </div>
        )}

        {/* Section 6: 2-Semester University System Tracker & Official 1448H/1447H Calendar */}
        {(viewMode === 'all' || activeChapter === 'calendar-tracker') && (
        <div id="calendar-tracker" className="scroll-mt-24 transition-all duration-300">
          <UniversityCalendarTracker currentLang={currentLang} />
        </div>
        )}

        {/* Section 7: Comprehensive University Directory */}
        {(viewMode === 'all' || activeChapter === 'directory') && (
        <div id="directory" className="scroll-mt-24 transition-all duration-300 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-[0.2em] mb-1">
                <BookOpen size={16} />
                <span>
                  {currentLang === 'ar' ? 'دليل الجامعات الحكومية' : currentLang === 'ur' ? 'جامعات کی ڈائریکٹری' : 'Institutional Directory'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary">
                {currentLang === 'ar' ? 'أبرز الجامعات السعودية وبوابات التقديم المباشرة' : currentLang === 'ur' ? 'سعودی عرب کی نمایاں جامعات اور بوابات' : 'Premier Saudi Universities & Direct Admissions'}
              </h2>
            </div>

            {/* Region Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: { en: 'All Regions', ar: 'كافة المناطق', ur: 'تمام علاقے' } },
                { id: 'riyadh', label: { en: 'Riyadh', ar: 'الرياض', ur: 'ریاض' } },
                { id: 'eastern', label: { en: 'Eastern', ar: 'الشرقية', ur: 'مشرقی صوبہ' } },
                { id: 'western', label: { en: 'Western', ar: 'الغربية', ur: 'مغربی صوبہ' } },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setRegionFilter(f.id as any)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                    regionFilter === f.id
                      ? "bg-primary text-white shadow-md"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
                  )}
                >
                  {f.label[currentLang] || f.label.en}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredUnis.map((uni) => (
              <div 
                key={`uni-card-${uni.id}`}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md flex flex-col justify-between hover:border-secondary/40 hover:shadow-xl transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="flex items-center gap-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      <MapPin size={12} className="text-secondary" />
                      {uni.location[currentLang] || uni.location.en}
                    </span>
                    {uni.qsRank && (
                      <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-secondary/10 text-secondary">
                        {uni.qsRank}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif font-bold text-lg text-primary group-hover:text-secondary transition-colors mb-3 leading-snug">
                    {uni.name[currentLang] || uni.name.en}
                  </h3>

                  <div className="space-y-1.5 mb-6">
                    <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                      {currentLang === 'ar' ? 'المسارات الأكاديمية:' : currentLang === 'ur' ? 'دستیاب اسٹریمز:' : 'Available Tracks:'}
                    </div>
                    {uni.tracks.map((tr) => (
                      <div key={`uni-track-${uni.id}-${tr.id}`} className="text-xs text-gray-600 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                        <span className="line-clamp-1">{tr.name[currentLang] || tr.name.en}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setSelectedUniId(uni.id);
                      setSelectedTrackId(uni.tracks[0].id);
                      document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-primary hover:text-secondary flex items-center gap-1 transition-colors"
                  >
                    <Calculator size={14} />
                    <span>{currentLang === 'ar' ? 'احسب النسبة' : currentLang === 'ur' ? 'اسکور نکالیں' : 'Calculate'}</span>
                  </button>

                  <a
                    href={uni.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-xl bg-paper hover:bg-secondary hover:text-primary flex items-center justify-center text-gray-500 transition-all shadow-sm"
                    title="Open Portal"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        )}

        {/* Section 8: Vision 2030 In-Demand Academic Majors */}
        {(viewMode === 'all' || activeChapter === 'careers') && (
        <div id="careers" className="scroll-mt-24 transition-all duration-300 bg-white rounded-[3rem] p-8 sm:p-12 border border-gray-100 shadow-xl mb-12">
          <div className="max-w-3xl mb-8">
            <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-[0.2em] mb-2">
              <Sparkles size={16} />
              <span>
                {currentLang === 'ar' ? 'سوق العمل وبرنامج تنمية القدرات البشرية • الفصل 08' : currentLang === 'ur' ? 'ویژن 2030 اور مستقبل کی ملازمتیں • باب 08' : 'Vision 2030 Future Careers • Chapter 08'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-3">
              {currentLang === 'ar' ? 'التخصصات الجامعية الأكثر طلباً في السعودية' : currentLang === 'ur' ? 'سعودی عرب میں مستقبل کے سب سے زیادہ مانگ والے شعبے' : 'Top In-Demand University Majors in Saudi Arabia'}
            </h2>
            <p className="text-gray-500 text-sm">
              {currentLang === 'ar' ? (
                'وفقاً لمستهدفات رؤية 2030 والمشاريع الكبرى (نيوم، البحر الأحمر، القدية)، تشهد هذه التخصصات أعلى معدلات التوظيف وبرامج التدريب التعاوني.'
              ) : currentLang === 'ur' ? (
                'ویژن 2030 اور میگا پروجیکٹس (نیوم، ریڈ سی) کی ضروریات کے مطابق یہ مضامین سب سے زیادہ ملازمتیں پیدا کر رہے ہیں۔'
              ) : (
                'Aligned with the Human Capability Development Program and giga-projects like NEOM, Diriyah, and Red Sea Global, these academic majors offer the highest post-graduation placement rates.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: { en: 'Artificial Intelligence & Data Science', ar: 'الذكاء الاصطناعي وعلوم البيانات', ur: 'مصنوعی ذہانت اور ڈیٹا سائنس' },
                desc: { en: 'Driven by SDAIA and national smart city strategies across Riyadh and NEOM.', ar: 'مدعوم من الهيئة السعودية للبيانات والذكاء الاصطناعي ومشاريع المدن الذكية.', ur: 'سعودی ڈیٹا اینڈ اے آئی اتھارٹی (SDAIA) کے تعاون سے سمارٹ اسٹیز کا محور۔' }
              },
              {
                title: { en: 'Cybersecurity & Information Defense', ar: 'الأمن السيبراني وحماية البيانات', ur: 'سائبر سیکیورٹی اور انفارمیشن ڈیفنس' },
                desc: { en: 'Mandatory for all banking, government, and multinational regional HQs.', ar: 'متطلب أساسي لكافة البنوك، الجهات الحكومية، والمقرات الإقليمية العالمية.', ur: 'بینکنگ، سرکاری اور ملٹی نیشنل ریجنل ہیڈ کوارٹرز کے لیے لازمی۔' }
              },
              {
                title: { en: 'Renewable Energy & Green Hydrogen', ar: 'الطاقة المتجددة والهيدروجين الأخضر', ur: 'قابل تجدید توانائی اور گرین ہائیڈروجن' },
                desc: { en: 'Aligned with the Saudi Green Initiative and massive clean power plants.', ar: 'مرتبط بمبادرة السعودية الخضراء ومصانع إنتاج الوقود النظيف.', ur: 'سعودی گرین انیشیٹو اور دنیا کے سب سے بڑے گرین ہائیڈروجن پلانٹس کے لیے موزوں۔' }
              },
              {
                title: { en: 'Supply Chain & Global Logistics', ar: 'سلاسل الإمداد والخدمات اللوجستية', ur: 'سپلائی چین اور لاجسٹکس سروسز' },
                desc: { en: 'Connecting 3 continents through the National Transport & Logistics Strategy.', ar: 'ربط القارات الثلاث عبر الاستراتيجية الوطنية للنقل والخدمات اللوجستية.', ur: 'تین براعظموں کو جوڑنے والی قومی لاجسٹکس حکمت عملی کا اہم جزو۔' }
              },
              {
                title: { en: 'Hospitality, Tourism & Heritage', ar: 'الضيافة وإدارة السياحة والتراث', ur: 'ہاسپیٹلٹی اور ٹورازم مینجمنٹ' },
                desc: { en: '150 million targeted tourist visits requiring luxury management leadership.', ar: 'مستهدف 150 مليون زيارة سياحية بحاجة لكفاءات قيادية في الضيافة الفاخرة.', ur: '150 ملین سیاحوں کے ہدف کو پورا کرنے کے لیے لگژری مینجمنٹ قیادت۔' }
              },
              {
                title: { en: 'Financial Technology (FinTech)', ar: 'التقنية المالية (فينتك)', ur: 'مالیاتی ٹیکنالوجی (FinTech)' },
                desc: { en: 'SAMA sandbox integration, digital banking suites, and venture capital.', ar: 'دعم البنك المركزي السعودي للبيئة التجريبية والبنوك الرقمية الحديثة.', ur: 'سینٹرل بینک (ساما) کے ڈیجیٹل بینکنگ اور فن ٹیک ماحولیاتی نظام کا فروغ۔' }
              }
            ].map((major, i) => (
              <div key={`major-${i}`} className="p-5 rounded-2xl bg-paper border border-gray-100 hover:border-secondary/30 transition-all">
                <div className="flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-wider mb-2">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  <span>Sector 0{i + 1}</span>
                </div>
                <h4 className="font-serif font-bold text-base text-primary mb-2">
                  {major.title[currentLang] || major.title.en}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {major.desc[currentLang] || major.desc.en}
                </p>
              </div>
            ))}
          </div>

          {/* Strategic Professional Certification Pathway Link */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-primary to-emerald-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-secondary/30 shadow-lg">
            <div className="space-y-1 text-center sm:text-start">
              <div className="inline-flex items-center gap-2 text-secondary text-[11px] font-bold uppercase tracking-wider">
                <Sparkles size={14} />
                <span>{currentLang === 'ar' ? 'مسار الشهادات المهنية المعتمدة' : currentLang === 'ur' ? 'پیشہ ورانہ سرٹیفیکیشن پاتھ وے' : 'Professional Certification Pathway'}</span>
              </div>
              <h4 className="font-serif font-bold text-base text-white">
                {currentLang === 'ar' 
                  ? 'هل تستعد لاختبار Microsoft Azure AI-900 مع استرداد الرسوم 100% من هدف؟' 
                  : currentLang === 'ur'
                  ? 'مائیکروسافٹ Azure AI-900 اور ہدف فنڈ کے تحت 100 فیصد فیس واپسی کی تیاری؟'
                  : 'Preparing for Microsoft Azure AI-900 with 100% HRDF Reimbursement?'}
              </h4>
              <p className="text-xs text-white/70 max-w-xl">
                {currentLang === 'ar'
                  ? 'تدرب عبر مركز التحضير المخصص والمجهز باختبار تجريبي تشخيصي تفاعلي من 10 أسئلة وجداول المصطلحات المعتمدة.'
                  : currentLang === 'ur'
                  ? 'ہماری مخصوص گائیڈ اور 10 سوالات پر مشتمل تشخیصی امتحانی سمیلیٹر سے تیاری کریں۔'
                  : 'Practice on our dedicated preparation portal featuring the 10-question diagnostic exam simulator, bilingual cheat sheets, and Taqat claims guide.'}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setShowAiQuestionsPreview(prev => !prev)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 cursor-pointer"
              >
                <span>{showAiQuestionsPreview ? (currentLang === 'ar' ? 'إخفاء القائمة' : 'Hide List') : (currentLang === 'ar' ? 'معاينة الأسئلة الـ 10' : 'Preview 10 Questions')}</span>
                <ChevronDown size={14} className={cn("transition-transform duration-300", showAiQuestionsPreview ? "rotate-180" : "")} />
              </button>
              <Link
                to="/certifications/ai-900"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gold-gradient text-primary text-xs font-bold uppercase tracking-wider hover:scale-105 transition-transform shadow-md"
              >
                <span>{currentLang === 'ar' ? 'فتح المحاكي التفاعلي' : currentLang === 'ur' ? 'AI-900 سمیلیٹر کھولیں' : 'Launch Full Simulator'}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Expandable 10 Questions Outline in Higher Education */}
          {showAiQuestionsPreview && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 p-6 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-gray-200">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <ListOrdered size={16} className="text-secondary" />
                  <span>
                    {currentLang === 'ar' ? 'قائمة موضوعات الأسئلة الـ 10 لاختبار مايكروسوفت AI-900' : 'Microsoft Azure AI-900 Diagnostic 10-Question Master List'}
                  </span>
                </div>
                <Link
                  to="/certifications/ai-900"
                  className="text-xs font-bold text-primary hover:text-emerald-700 underline flex items-center gap-1"
                >
                  <span>{currentLang === 'ar' ? 'حل الأسئلة تفاعلياً مع الشرح' : 'Practice with Live Answer Explanations'}</span>
                  <ExternalLink size={12} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {AI_EXAM_QUESTIONS_LIST.map((q) => (
                  <div key={`preview-q-${q.id}`} className="p-3.5 rounded-xl bg-white border border-gray-150 flex items-start gap-3 hover:border-secondary/40 transition-colors">
                    <span className="w-6 h-6 rounded-lg bg-primary text-secondary font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {q.id}
                    </span>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md uppercase tracking-wider inline-block">
                        {q.domain[currentLang] || q.domain.en}
                      </span>
                      <h5 className="text-xs font-bold text-gray-900 leading-snug">
                        {q.title[currentLang] || q.title.en}
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
        )}

        {/* ========================================================================= */}
        {/* ARTICLE CONCLUSION & EDITORIAL SIGN-OFF (DEFINES WHERE THE ARTICLE ENDS)  */}
        {/* ========================================================================= */}
        {(viewMode === 'all' || activeChapter === 'article-end') && (
        <div id="article-end" className="scroll-mt-24 transition-all duration-300 bg-white rounded-[3rem] p-6 sm:p-10 lg:p-12 border-2 border-emerald-500/20 shadow-2xl mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

          {/* Terminal Banner */}
          <div className="relative z-10 pb-8 border-b border-gray-150">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900 text-secondary text-xs font-bold uppercase tracking-wider shadow-sm">
                <CheckCircle2 size={14} className="text-secondary" />
                <span>
                  {currentLang === 'ar' 
                    ? 'نهاية الدليل الشامل وخاتمة المقال • اكتمال القراءة' 
                    : currentLang === 'ur'
                    ? 'جامع گائیڈ کا باضابطہ اختتام • مطالعہ مکمل'
                    : 'Article Conclusion & Guide Terminal • Reading Complete'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => document.getElementById('article-start')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-secondary hover:bg-emerald-900 text-xs font-bold transition-all shadow-sm cursor-pointer"
                  title="Return to the beginning of the article"
                >
                  <ArrowUp size={14} className="text-secondary" />
                  <span>
                    {currentLang === 'ar' ? 'العودة لبداية الدليل (الفهرس)' : currentLang === 'ur' ? 'شروع پر واپس جائیں' : 'Back to Article Start'}
                  </span>
                </button>
              </div>
            </div>

            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-primary tracking-tight">
              {currentLang === 'ar' 
                ? 'خلاصة القبول والتوصيات الاستراتيجية للمتقدمين لعام 2026–2027م' 
                : currentLang === 'ur'
                ? 'خلاصہ داخلہ اور سال 2026-2027 کے امیدواروں کے لیے اہم رہنمائی'
                : 'Executive Summary & Strategic Takeaways for 2026–2027 Applicants'}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm font-light mt-2 max-w-3xl leading-relaxed">
              {currentLang === 'ar'
                ? 'يختتم هذا الدليل الاستراتيجي رحلتك عبر منظومة التعليم العالي والقبول في المملكة العربية السعودية. إليك أهم الملاحظات الميدانية حسب مسار تقديمك لضمان أعلى فرصة قبول ممكنة.'
                : currentLang === 'ur'
                ? 'یہ رہنما دستاویز سعودی اعلیٰ تعلیم اور داخلوں کی تفصیلی معلومات کا احاطہ کرتی ہے۔ اپنی نشست یقینی بنانے کے لیے درج ذیل اہم نکات کو مدنظر رکھیں۔'
                : 'This concludes the comprehensive 2026–2027 KSA Higher Education & Admissions Handbook. Below are the key strategic action points categorized by applicant profile to maximize your admission probability.'}
            </p>
          </div>

          {/* 3 Core Profiles Summary Cards */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-b border-gray-150">
            {/* Card 1: Saudi Nationals */}
            <div className="p-6 rounded-2xl bg-paper border border-gray-150 space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <span>{currentLang === 'ar' ? 'للطلاب السعوديين' : currentLang === 'ur' ? 'سعودی شہریوں کے لیے' : 'For Saudi Nationals'}</span>
              </div>
              <h4 className="font-serif font-bold text-base text-primary">
                {currentLang === 'ar' ? 'أولوية التحصيلي والقبول الموحد' : currentLang === 'ur' ? 'تحصیلی و موحد داخلے' : 'Tahsili & Unified Portals'}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                {currentLang === 'ar'
                  ? 'يركز القبول التنافسي في المسارات الصحية والهندسية بنسبة 40% إلى 50% على الاختبار التحصيلي. التقديم عبر بوابات القبول الموحد (الرياض، الشرقية، الغربية) إلزامي ومحدد بالمواعيد الرسمية في شوال وذي القعدة.'
                  : currentLang === 'ur'
                  ? 'میڈیکل اور انجینئرنگ میں 40% سے 50% وزن تحصیلی ٹیسٹ کا ہوتا ہے۔ شوال اور ذی القعدہ میں علاقائی داخلہ پورٹلز پر بروقت رجسٹریشن لازمی ہے۔'
                  : 'Competitive STEM and Health tracks allocate 40%–50% weight to Tahsili scores. Applications must be routed via regional Unified Portals during the official post-Ramadan window.'}
              </p>
            </div>

            {/* Card 2: Resident Expats */}
            <div className="p-6 rounded-2xl bg-paper border border-gray-150 space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>{currentLang === 'ar' ? 'للمقيمين داخل المملكة' : currentLang === 'ur' ? 'مقیم غیر ملکیوں کے لیے' : 'For Resident Expatriates'}</span>
              </div>
              <h4 className="font-serif font-bold text-base text-primary">
                {currentLang === 'ar' ? 'المنح الداخلية والتنافسية العالية' : currentLang === 'ur' ? 'داخلی اسکالرشپس (کوتہ 5%)' : 'Internal Scholarships (5% Quota)'}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                {currentLang === 'ar'
                  ? 'تخضع مقاعد المقيمين في الجامعات الحكومية لكوتة نظامية قدرها 5% تتطلب نسباً موزونة متقدمة (غالباً 92%+). يُنصح بالحصول على درجة 85+ في STEP أو 6.5 في IELTS لتجاوز السنة التحضيرية أو تعزيز ملف القبول.'
                  : currentLang === 'ur'
                  ? 'سرکاری جامعات میں مقیم طلباء کے لیے 5 فیصد کوٹہ ہوتا ہے جس کے لیے 92%+ میرٹ درکار ہے۔ اسٹیپ یا آئی ایل ٹی ایس اسکور کے ذریعے تیاری کا سال پاس کریں۔'
                  : 'Public university seats for Iqama holders operate under a competitive 5% statutory quota (typically requiring Mawzoonah $\\ge 92\\%$). STEP (85+) or IELTS (6.5+) provides strategic waivers.'}
              </p>
            </div>

            {/* Card 3: International & SAT Applicants */}
            <div className="p-6 rounded-2xl bg-paper border border-gray-150 space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                <span>{currentLang === 'ar' ? 'مسار السات والطلاب الدوليين' : currentLang === 'ur' ? 'بین الاقوامی و سیٹ امیدوار' : 'Digital SAT & International'}</span>
              </div>
              <h4 className="font-serif font-bold text-base text-primary">
                {currentLang === 'ar' ? 'مسار السات في KFUPM ومنصة ادرس' : currentLang === 'ur' ? 'کے ایف یو پی ایم اور ادرس فی السعودیہ' : 'KFUPM SAT Track & Study in Saudi'}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                {currentLang === 'ar'
                  ? 'تتيح جامعة الملك فهد (KFUPM) وجامعة الملك سعود مساراً مباشراً بنتيجة السات (1350+ مع 650+ رياضيات). للطلاب الدوليين من خارج المملكة، بوابة "ادرس في السعودية" هي المنفذ الرسمي الموحد للمنح الدراسية الممولة بالكامل.'
                  : currentLang === 'ur'
                  ? 'کنگ فہد یونیورسٹی میں ڈیجیٹل سیٹ کے ذریعے داخلہ ممکن ہے (1350+ اسکور بشمول 650 ریاضی)۔ بین الاقوامی طلباء ادرس فی السعودیہ پورٹل استعمال کریں۔'
                  : 'KFUPM and KSU offer fast-track admission via College Board Digital SAT (1350+ composite, 650+ Math). Non-resident international applicants must register on the unified "Study in Saudi" platform.'}
              </p>
            </div>
          </div>

          {/* Official Verification Gateways & External Portals */}
          <div className="relative z-10 pt-8 pb-8 border-b border-gray-150 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg text-primary flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-700" />
                <span>
                  {currentLang === 'ar' 
                    ? 'البوابات الحكومية الرسمية المعتمدة للتحقق والتسجيل' 
                    : currentLang === 'ur'
                    ? 'تصدیق اور رجسٹریشن کے لیے سرکاری ویب سائٹس'
                    : 'Official Verified Government Portals & Gateways'}
                </span>
              </h3>
              <span className="text-xs text-gray-400 font-light hidden sm:inline">
                {currentLang === 'ar' ? 'روابط خارجية مباشرة' : 'Direct External Gateways'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { name: 'Ministry of Education', ar: 'وزارة التعليم', url: 'https://moe.gov.sa', sub: 'moe.gov.sa' },
                { name: 'ETEC Qiyas Center', ar: 'مركز قياس (تقويم)', url: 'https://etec.gov.sa', sub: 'etec.gov.sa' },
                { name: 'KFUPM Admissions', ar: 'قبول جامعة البترول', url: 'https://apply.kfupm.edu.sa', sub: 'kfupm.edu.sa' },
                { name: 'Unified Riyadh Portal', ar: 'القبول الموحد بالرياض', url: 'https://rgu-admissions.edu.sa', sub: 'rgu-admissions.edu.sa' },
                { name: 'Study in Saudi Portal', ar: 'منصة ادرس في السعودية', url: 'https://studyinsaudi.moe.gov.sa', sub: 'studyinsaudi.moe.gov.sa' },
                { name: 'HRDF Hadaf Fund', ar: 'صندوق تنمية الموارد (هدف)', url: 'https://hrdf.org.sa', sub: 'hrdf.org.sa' }
              ].map((portal, idx) => (
                <a
                  key={`portal-ref-${idx}`}
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-paper hover:bg-emerald-50 border border-gray-150 hover:border-emerald-300 transition-all flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between text-gray-400 group-hover:text-primary mb-2">
                    <ExternalLink size={13} />
                    <span className="text-[10px] font-mono text-gray-400">#0{idx + 1}</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-primary group-hover:text-emerald-950 transition-colors line-clamp-1">
                      {currentLang === 'ar' ? portal.ar : portal.name}
                    </h5>
                    <p className="text-[10px] text-gray-400 truncate mt-0.5">{portal.sub}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Controls & Sign-off Stamp */}
          <div className="relative z-10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary text-secondary flex items-center justify-center font-serif font-black text-sm shrink-0 shadow-sm">
                KSA
              </div>
              <div className="text-xs text-gray-500 font-light">
                <div className="font-bold text-primary">
                  {currentLang === 'ar' ? 'فريق أبحاث التعليم وسياسات القبول • KSA Insights' : 'KSA Insights Education & Higher Admissions Desk'}
                </div>
                <div>
                  {currentLang === 'ar' 
                    ? 'مُعتمد ومُدقق وفق التقويم الدراسي لعام 1448هـ / 1447هـ وقرارات مجلس شؤون الجامعات.'
                    : 'Audited against 1448H/1447H academic calendars & Council of University Affairs regulations.'}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => document.getElementById('article-start')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-secondary hover:bg-emerald-900 text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                <ArrowUp size={14} className="text-secondary" />
                <span>
                  {currentLang === 'ar' ? 'العودة لبداية المقال' : currentLang === 'ur' ? 'مضمون کے آغاز پر جائیں' : 'Back to Article Start'}
                </span>
              </button>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-paper hover:bg-gray-100 text-primary border border-gray-200 text-xs font-bold transition-all cursor-pointer"
              >
                <span>{currentLang === 'ar' ? 'أعلى الصفحة' : currentLang === 'ur' ? 'اوپر جائیں' : 'Top of Page'}</span>
              </button>
            </div>
          </div>
        </div>
        )}

        {/* Focus Navigation Footer (Bottom of Isolated Chapter) */}
        {viewMode === 'focus' && (
          <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-gray-200 shadow-md mb-12">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-secondary text-primary font-bold text-xs flex items-center justify-center">
                {CHAPTERS_LIST.find(c => c.id === activeChapter)?.num}
              </span>
              <span className="text-xs font-bold text-primary">
                {CHAPTERS_LIST.find(c => c.id === activeChapter)?.title[currentLang] || CHAPTERS_LIST.find(c => c.id === activeChapter)?.title.en}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {prevChapter && (
                <button
                  onClick={() => handleChapterClick(prevChapter.id, true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-paper hover:bg-gray-100 text-primary border border-gray-200 text-xs font-bold transition-all cursor-pointer"
                >
                  {isRTL ? <ArrowRight size={13} /> : <ArrowLeft size={13} />}
                  <span>{currentLang === 'ar' ? 'الفصل السابق' : currentLang === 'ur' ? 'پچھلا باب' : 'Previous'} (#{prevChapter.num})</span>
                </button>
              )}
              {nextChapter && (
                <button
                  onClick={() => handleChapterClick(nextChapter.id, true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-secondary hover:bg-emerald-900 text-xs font-bold transition-all cursor-pointer shadow-sm"
                >
                  <span>{currentLang === 'ar' ? 'الفصل التالي' : currentLang === 'ur' ? 'اگلا باب' : 'Next'} (#{nextChapter.num})</span>
                  {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}
                </button>
              )}
              <button
                onClick={() => setViewMode('all')}
                className="px-4 py-2 rounded-xl bg-secondary text-primary hover:bg-yellow-400 text-xs font-bold transition-all cursor-pointer"
              >
                {currentLang === 'ar' ? 'عرض كافة الفصول' : currentLang === 'ur' ? 'تمام ابواب دکھائیں' : 'View All Chapters'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default HigherEducation;
