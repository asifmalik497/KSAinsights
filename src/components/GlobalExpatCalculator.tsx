import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Calculator, 
  Globe2, 
  ShieldCheck, 
  Calendar, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  Info, 
  Share2, 
  Copy, 
  Check, 
  Building2, 
  Users, 
  Plane, 
  Briefcase, 
  Award,
  Sparkles,
  FileCheck2,
  Clock,
  ArrowRight,
  HelpCircle,
  HeartPulse,
  Scale,
  Printer,
  ChevronDown,
  Layers,
  Baby,
  UserPlus,
  RefreshCw,
  Send,
  Download
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { ExpatCalculatorExplanatoryGuide } from './ExpatCalculatorExplanatoryGuide';

// =========================================================================
// NATIONALITY PROFILES WITH PRECISE REGULATORY DIRECTIVES & EXCHANGE RATES
// =========================================================================
export interface NationalityProfile {
  id: string;
  name: { en: string; ar: string; ur: string };
  flag: string;
  currencyCode: string;
  currencyName: { en: string; ar: string; ur: string };
  sarRate: number; // 1 SAR to local currency
  isGcc: boolean;
  hasSpecialStatus?: boolean;
  requiresGamca: boolean; // Pre-departure Wafid/GAMCA medical fitness
  requiresPcc: boolean;   // Police Clearance Certificate
  requiresSvp: boolean;   // Skill Verification Program (SVP trade test)
  notes: { en: string; ar: string; ur: string };
  officialEmbassyPortal?: string;
}

export const NATIONALITIES: NationalityProfile[] = [
  {
    id: 'in',
    name: { en: 'India', ar: 'الهند', ur: 'بھارت (انڈیا)' },
    flag: '🇮🇳',
    currencyCode: 'INR',
    currencyName: { en: 'Indian Rupee (₹)', ar: 'روبية هندية', ur: 'ہندوستانی روپیہ' },
    sarRate: 22.8,
    isGcc: false,
    requiresGamca: true,
    requiresPcc: true,
    requiresSvp: true,
    notes: {
      en: 'Requires Wafid medical fitness, PCC for employment stamping, and SVP practical trade test for vocational roles. Engineering positions require Saudi Council of Engineers (SCE) accreditation.',
      ar: 'يتطلب فحص وافد الطبي المعتمد، شهادة خلو سوابق (PCC)، والفحص المهني للحرفيين، واعتماد الهيئة السعودية للمهندسين.',
      ur: 'وافد میڈیکل، پولیس کلیرنس اور تکنیکی پیشوں کے لیے اسکل ویریفکیشن ٹیسٹ اور انجینئرنگ کونسل رجسٹریشن لازمی ہے۔'
    }
  },
  {
    id: 'pk',
    name: { en: 'Pakistan', ar: 'باكستان', ur: 'پاکستان' },
    flag: '🇵🇰',
    currencyCode: 'PKR',
    currencyName: { en: 'Pakistani Rupee (Rs)', ar: 'روبية باكستانية', ur: 'پاکستانی روپیہ' },
    sarRate: 74.5,
    isGcc: false,
    requiresGamca: true,
    requiresPcc: true,
    requiresSvp: true,
    notes: {
      en: 'Protectorate of Emigrants clearance required, Wafid medical, and SVP practical test in accredited centers (Islamabad, Lahore, Karachi) for electrical and mechanical trades.',
      ar: 'يتطلب ختم الحماية من مكتب الهجرة، فحص وافد الطبي، والفحص المهني في المراكز المعتمدة للمهن الفنية.',
      ur: 'پروٹیکٹر کلیئرنس، وافد میڈیکل اور منظور شدہ ٹیسٹنگ سینٹرز سے اسکل ویریفکیشن پروگرام لازمی ہے۔'
    }
  },
  {
    id: 'eg',
    name: { en: 'Egypt', ar: 'مصر', ur: 'مصر (ایجپٹ)' },
    flag: '🇪🇬',
    currencyCode: 'EGP',
    currencyName: { en: 'Egyptian Pound (EGP)', ar: 'جنيه مصري', ur: 'مصری پاؤنڈ' },
    sarRate: 13.2,
    isGcc: false,
    requiresGamca: true,
    requiresPcc: true,
    requiresSvp: true,
    notes: {
      en: 'Largest Arab community (~3M). Academic and medical credentials must be verified via DataFlow and SCFHS (Mumaris+), along with Ministry of Manpower work authorization.',
      ar: 'أكبر جالية عربية في المملكة. توثيق المؤهلات عبر داتافلو وممارس بلس للهيئة الصحية وتصريح القوى العاملة المصرية.',
      ur: 'سعودی عرب میں سب سے بڑی عرب کمیونٹی۔ میڈیکل و تعلیمی اسناد کی ڈیٹا فلو اور ہیلتھ اسپیشلٹیز سے تصدیق لازمی ہے۔'
    }
  },
  {
    id: 'bd',
    name: { en: 'Bangladesh', ar: 'بنغلاديش', ur: 'بنگلہ دیش' },
    flag: '🇧🇩',
    currencyCode: 'BDT',
    currencyName: { en: 'Bangladeshi Taka (৳)', ar: 'تاكا بنغلاديشية', ur: 'بنگلہ دیشی ٹکا' },
    sarRate: 32.5,
    isGcc: false,
    requiresGamca: true,
    requiresPcc: true,
    requiresSvp: true,
    notes: {
      en: 'BMET smart clearance card required, Wafid approved medical fitness, and SVP skill verification phased rollout for construction and technician sectors.',
      ar: 'يتطلب بطاقة BMET الذكية، وفحص وافد المعتمد، وبرنامج الفحص المهني للمهن الحرفية والإنشائية.',
      ur: 'بی ایم ای ٹی اسمارٹ کارڈ، وافد میڈیکل اور تکنیکی شعبوں کے لیے اسکل ویریفکیشن کا نفاذ لازمی ہے۔'
    }
  },
  {
    id: 'ph',
    name: { en: 'Philippines', ar: 'الفلبين', ur: 'فلپائن' },
    flag: '🇵🇭',
    currencyCode: 'PHP',
    currencyName: { en: 'Philippine Peso (₱)', ar: 'بيزو فلبيني', ur: 'فلپائنی پیسو' },
    sarRate: 15.6,
    isGcc: false,
    requiresGamca: true,
    requiresPcc: true,
    requiresSvp: false,
    notes: {
      en: 'Department of Migrant Workers (DMW) authenticated contract, Overseas Employment Certificate (OEC) for exit clearance, and Musaned registration for household service workers.',
      ar: 'عقد موثق من وزارة العمالة المهاجرة DMW، شهادة OEC للعودة، وتوثيق منصة مساند للعمالة المنزلية.',
      ur: 'محکمہ تارکین وطن (DMW) سے تصدیق شدہ معاہدہ، واپسی کے لیے OEC سرٹیفکیٹ اور گھریلو ورکرز کے لیے مساند تصدیق۔'
    }
  },
  {
    id: 'ye',
    name: { en: 'Yemen', ar: 'اليمن', ur: 'یمن' },
    flag: '🇾🇪',
    currencyCode: 'YER',
    currencyName: { en: 'Yemeni Rial (YER)', ar: 'ريال يمني', ur: 'یمنی ریال' },
    sarRate: 67.0,
    isGcc: false,
    hasSpecialStatus: true,
    requiresGamca: true,
    requiresPcc: false,
    requiresSvp: false,
    notes: {
      en: 'Eligible for special royal directives. Visitor visas convertible to standard work residency (Iqama) via Ajeer platform under specific HRSD decrees.',
      ar: 'مستفيدون من التوجيهات الملكية الكريمة لتحويل هوية زائر إلى إقامة عمل نظامية عبر منصة أجير وفق اشتراطات وزارة الموارد البشرية.',
      ur: 'خصوصی شاہی احکامات اور اجیر پورٹل کے تحت زائر ویزا کو باقاعدہ ورک اقامہ میں تبدیل کرنے کی قانونی سہولت۔'
    }
  },
  {
    id: 'sy',
    name: { en: 'Syria', ar: 'سوريا', ur: 'شام (سوریا)' },
    flag: '🇸🇾',
    currencyCode: 'SYP',
    currencyName: { en: 'Syrian Pound (SYP)', ar: 'ليرة سورية', ur: 'شامی پاؤنڈ' },
    sarRate: 3450,
    isGcc: false,
    hasSpecialStatus: true,
    requiresGamca: false,
    requiresPcc: false,
    requiresSvp: false,
    notes: {
      en: 'Special humanitarian considerations apply regarding final exits and status regularization, subject to current Jawazat directives and Ajeer permits.',
      ar: 'تراعى الأوضاع الإنسانية الخاصة فيما يتعلق بتأشيرات الخروج وتسوية الأوضاع بموجب تعليمات الجوازات ومنصة أجير.',
      ur: 'خروج نہائی اور اسٹیٹس ریگولرائزیشن کے حوالے سے خصوصی انسانی ہمدردی کے احکامات لاگو ہوتے ہیں۔'
    }
  },
  {
    id: 'jo_ps',
    name: { en: 'Jordan & Palestine', ar: 'الأردن وفلسطين', ur: 'اردن اور فلسطین' },
    flag: '🇯🇴',
    currencyCode: 'JOD',
    currencyName: { en: 'Jordanian Dinar (JOD)', ar: 'دينار أردني', ur: 'اردنی دینار' },
    sarRate: 0.19,
    isGcc: false,
    hasSpecialStatus: true,
    requiresGamca: false,
    requiresPcc: false,
    requiresSvp: false,
    notes: {
      en: 'Palestinians holding Egyptian travel documents or Jordanian passports without national ID numbers enjoy special fee exemption categories under Saudi royal decrees.',
      ar: 'الفلسطينيون الحاملون لوثائق سفر مصرية أو جوازات أردنية بدون رقم وطني يستفيدون من إعفاءات خاصة من الرسوم بموجب الأوامر الملكية.',
      ur: 'مصری سفری دستاویزات یا بغیر قومی نمبر والے اردنی پاسپورٹ رکھنے والے فلسطینیوں کو خصوصی فیس رعایت حاصل ہے۔'
    }
  },
  {
    id: 'sd',
    name: { en: 'Sudan', ar: 'السودان', ur: 'سوڈان' },
    flag: '🇸🇩',
    currencyCode: 'SDG',
    currencyName: { en: 'Sudanese Pound (SDG)', ar: 'جنيه سوداني', ur: 'سوڈانی پاؤنڈ' },
    sarRate: 160,
    isGcc: false,
    hasSpecialStatus: true,
    requiresGamca: true,
    requiresPcc: false,
    requiresSvp: false,
    notes: {
      en: 'Benefited from royal extensions of visitor and transit visas during the ongoing regional crisis, with options for Qiwa employment regularization.',
      ar: 'استفادوا من التمديدات الملكية الاستثنائية لتأشيرات الزيارة والعبور وإمكانية التسوية ونقل الخدمات عبر منصة قوى.',
      ur: 'حالیہ ملکی حالات کے پیش نظر ویزا میں غیر معمولی شاہی توسیع اور قویٰ پورٹل پر قانونی اندراج کی سہولت۔'
    }
  },
  {
    id: 'western',
    name: { en: 'Western Expats (US, UK, EU, Canada, Aus)', ar: 'الدول الغربية (أمريكا، بريطانيا، أوروبا)', ur: 'مغربی ممالک (امریکہ، برطانیہ، یورپ، کینیڈا)' },
    flag: '🌐',
    currencyCode: 'USD',
    currencyName: { en: 'US Dollar ($)', ar: 'دولار أمريكي', ur: 'امریکی ڈالر' },
    sarRate: 0.27,
    isGcc: false,
    requiresGamca: false,
    requiresPcc: true,
    requiresSvp: false,
    notes: {
      en: 'Executive, engineering, and consulting visas. University degrees require Apostille or Saudi Cultural Mission attestation; Premium Residency option available.',
      ar: 'تأشيرات تنفيذية واستشارية وهندسية. تتطلب تصديق الشهادات عبر أبوستيل والملحقية الثقافية، ومتاح خيار الإقامة المميزة.',
      ur: 'ایگزیکٹو، کنسلٹنگ اور انجینئرنگ ویزاز۔ ڈگریوں کی ایپوسٹل تصدیق اور پریمیم ریذیڈنسی کی سہولت دستیاب ہے۔'
    }
  },
  {
    id: 'gcc',
    name: { en: 'GCC Nationals (UAE, Kuwait, Qatar, Bahrain, Oman)', ar: 'مواطنو دول مجلس التعاون الخليجي', ur: 'جی سی سی شہری (امارات، کویت، قطر، بحرین، عمان)' },
    flag: '🇸🇦',
    currencyCode: 'SAR',
    currencyName: { en: 'Saudi Riyal (SAR)', ar: 'ريال سعودي', ur: 'سعودی ریال' },
    sarRate: 1.0,
    isGcc: true,
    requiresGamca: false,
    requiresPcc: false,
    requiresSvp: false,
    notes: {
      en: '100% EXEMPT from Iqama, dependent levy, and work permit fees under the GCC Common Market treaty. Free entry and employment.',
      ar: 'معفون تماماً من الإقامة ورسوم المرافقين ورخص العمل بموجب اتفاقية السوق الخليجية المشتركة. دخول وتوظيف حر.',
      ur: 'جی سی سی معاہدے کے تحت اقامہ فیس، ڈیپنڈنٹ لیوی اور ورک پرمٹ فیس سے 100 فیصد مکمل مستثنیٰ ہیں۔'
    }
  }
];

export const GlobalExpatCalculator: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language === 'ar' || i18n.language === 'ur') ? i18n.language : 'en';
  const isRTL = currentLang === 'ar' || currentLang === 'ur';

  // Active Main Tab: iqama | exitReentry | gratuity | countryMatrix | faq
  const [activeTab, setActiveTab] = useState<'iqama' | 'exitReentry' | 'gratuity' | 'countryMatrix' | 'faq'>('iqama');

  // Common Selection
  const [selectedCountryId, setSelectedCountryId] = useState<string>('in');
  const selectedCountry = useMemo(() => {
    return NATIONALITIES.find(c => c.id === selectedCountryId) || NATIONALITIES[0];
  }, [selectedCountryId]);

  // ==========================================
  // TAB 1: IQAMA & DEPENDENT LEVY REFINED STATE
  // ==========================================
  const [workerCategory, setWorkerCategory] = useState<
    'commercial' | 'industrial' | 'microBusiness' | 'sonOfSaudiMother' | 'foreignSpouse' | 'domestic' | 'exemptStatus' | 'premiumResidency'
  >('commercial');
  const [nitaqatRatio, setNitaqatRatio] = useState<'moreThan' | 'equalOrLess'>('moreThan'); // 800 vs 700 SAR/mo
  const [iqamaMonths, setIqamaMonths] = useState<number>(12);
  
  // Dependents detailed breakdown
  const [spousesCount, setSpousesCount] = useState<number>(1);
  const [minorChildrenCount, setMinorChildrenCount] = useState<number>(2);
  const [adultDependentsCount, setAdultDependentsCount] = useState<number>(0);
  const [hasNewbornInKsa, setHasNewbornInKsa] = useState<boolean>(false);
  const [newbornMonthsSinceBirth, setNewbornMonthsSinceBirth] = useState<number>(3);
  
  // Health Insurance Class Tier (Council of Health Insurance CCHI Mandatory Rule)
  const [includeInsurance, setIncludeInsurance] = useState<boolean>(true);
  const [insuranceTier, setInsuranceTier] = useState<'basic' | 'classB' | 'classA' | 'vip'>('classB');

  // Expired / Penalty Status (Jawazat Late Renewal Penalties)
  const [isIqamaExpired, setIsIqamaExpired] = useState<boolean>(false);
  const [lateOccurrence, setLateOccurrence] = useState<1 | 2 | 3>(1);

  // Math Calculations for Iqama
  const isGcc = selectedCountry.isGcc;
  const isPremium = workerCategory === 'premiumResidency';

  // 1. Monthly Maktab Amal Expat Worker Levy
  let monthlyExpatLevy = 0;
  if (!isGcc && !isPremium) {
    if (workerCategory === 'commercial') {
      monthlyExpatLevy = nitaqatRatio === 'moreThan' ? 800 : 700;
    } else if (workerCategory === 'industrial') {
      monthlyExpatLevy = 0; // State industrial subsidy covers it
    } else if (workerCategory === 'microBusiness') {
      monthlyExpatLevy = 0; // First 2-4 exempt under Monshaat decree if Saudi owner fulltime in GOSI
    } else if (workerCategory === 'domestic') {
      monthlyExpatLevy = 0; // First 4 domestic workers exempt for Saudis, 2 for expats
    } else {
      // sonOfSaudiMother, foreignSpouse, exemptStatus
      monthlyExpatLevy = 0; // 100% exempt from Maktab Amal commercial levy!
    }
  }
  const totalExpatLevy = monthlyExpatLevy * iqamaMonths;

  // 2. Jawazat Residency Fee (650 SAR/yr for commercial, 600 for domestic, 0 for GCC/Premium)
  let annualJawazatFee = 650;
  if (isGcc || isPremium) {
    annualJawazatFee = 0;
  } else if (workerCategory === 'domestic') {
    annualJawazatFee = 600;
  }
  const proratedJawazat = Math.round((annualJawazatFee / 12) * iqamaMonths);

  // 3. Human Resources Insurance (تأمين رخصة العمل)
  const hrInsurance = (isGcc || isPremium || workerCategory === 'domestic') ? 0 : (iqamaMonths >= 12 ? 150 : 75);

  // 4. Dependent Levy Calculation (400 SAR per month per dependent)
  // Exemptions: GCC, Premium Residency, Children of Saudi Mothers, Special Humanitarian status
  const dependentExempt = isGcc || isPremium || workerCategory === 'sonOfSaudiMother' || workerCategory === 'exemptStatus';
  const totalLivingDependents = dependentExempt ? 0 : (spousesCount + minorChildrenCount + adultDependentsCount);
  const monthlyDependentRate = dependentExempt ? 0 : 400;
  let regularDependentLevy = totalLivingDependents * monthlyDependentRate * iqamaMonths;

  // Newborn addition fee (from date of birth up to iqama renewal date)
  let newbornLevy = 0;
  if (hasNewbornInKsa && !dependentExempt) {
    newbornLevy = newbornMonthsSinceBirth * 400;
  }
  const totalDependentLevy = regularDependentLevy + newbornLevy;

  // 5. CCHI Health Insurance Estimation
  // Basic SME: ~600 SAR/person/yr, Class B: ~1,100 SAR/yr, Class A: ~2,400 SAR/yr, VIP: ~4,500 SAR/yr
  let perPersonAnnualInsurance = 1100;
  if (insuranceTier === 'basic') perPersonAnnualInsurance = 650;
  if (insuranceTier === 'classB') perPersonAnnualInsurance = 1100;
  if (insuranceTier === 'classA') perPersonAnnualInsurance = 2400;
  if (insuranceTier === 'vip') perPersonAnnualInsurance = 4500;

  const totalInsuredPersons = (workerCategory === 'domestic' || isGcc) 
    ? (workerCategory === 'domestic' ? 1 : 0) 
    : (1 + (dependentExempt ? 0 : (spousesCount + minorChildrenCount + adultDependentsCount + (hasNewbornInKsa ? 1 : 0))));
  
  const estimatedInsuranceCost = includeInsurance 
    ? Math.round((perPersonAnnualInsurance / 12) * iqamaMonths * totalInsuredPersons)
    : 0;

  // 6. Late Renewal Penalty (غرامة تأخير تجديد الإقامة)
  // Grace period: 3 days after expiration. 1st delay: 500 SAR, 2nd delay: 1,000 SAR, 3rd delay: 1,000 SAR + deportation
  let latePenaltyFee = 0;
  if (isIqamaExpired && !isGcc) {
    if (lateOccurrence === 1) latePenaltyFee = 500;
    else if (lateOccurrence === 2) latePenaltyFee = 1000;
    else latePenaltyFee = 1000;
  }

  // Grand Totals
  const governmentSADADTotal = totalExpatLevy + proratedJawazat + hrInsurance + totalDependentLevy + latePenaltyFee;
  const grandTotalIqamaWithInsuranceSar = governmentSADADTotal + estimatedInsuranceCost;
  const grandTotalIqamaLocal = Math.round(grandTotalIqamaWithInsuranceSar * selectedCountry.sarRate);

  // ==========================================
  // TAB 2: EXIT & RE-ENTRY CALCULATOR REFINED
  // ==========================================
  const [visaCalculationMode, setVisaCalculationMode] = useState<'durationDays' | 'fixedReturnDate'>('durationDays');
  const [visaType, setVisaType] = useState<'single' | 'multiple'>('single');
  const [departureDate, setDepartureDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [visaDurationDays, setVisaDurationDays] = useState<number>(60);
  const [fixedReturnTargetDate, setFixedReturnTargetDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 90);
    return d.toISOString().split('T')[0];
  });
  const [passportExpiryDate, setPassportExpiryDate] = useState<string>(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 2);
    return d.toISOString().split('T')[0];
  });
  const [iqamaExpiryDate, setIqamaExpiryDate] = useState<string>(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 8);
    return d.toISOString().split('T')[0];
  });

  // Calculate actual duration in days
  const actualDaysDuration = useMemo(() => {
    if (visaCalculationMode === 'durationDays') {
      return visaDurationDays;
    }
    const dep = new Date(departureDate);
    const ret = new Date(fixedReturnTargetDate);
    const diffTime = ret.getTime() - dep.getTime();
    return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  }, [visaCalculationMode, visaDurationDays, departureDate, fixedReturnTargetDate]);

  // Government Visa Fee
  // Single: 200 SAR for up to 2 months (60 days) + 100 SAR for each additional 30 days
  // Multiple: 500 SAR for up to 3 months (90 days) + 200 SAR for each additional 30 days
  const exitVisaFeeSar = useMemo(() => {
    if (visaType === 'single') {
      if (actualDaysDuration <= 60) return 200;
      const extraMonths = Math.ceil((actualDaysDuration - 60) / 30);
      return 200 + (extraMonths * 100);
    } else {
      if (actualDaysDuration <= 90) return 500;
      const extraMonths = Math.ceil((actualDaysDuration - 90) / 30);
      return 500 + (extraMonths * 200);
    }
  }, [visaType, actualDaysDuration]);

  // Calculated absolute return deadline date
  const calculatedReturnDate = useMemo(() => {
    if (visaCalculationMode === 'fixedReturnDate') {
      return new Date(fixedReturnTargetDate);
    }
    const d = new Date(departureDate || new Date());
    d.setDate(d.getDate() + visaDurationDays);
    return d;
  }, [visaCalculationMode, departureDate, visaDurationDays, fixedReturnTargetDate]);

  const formattedReturnDate = calculatedReturnDate.toLocaleDateString(
    currentLang === 'ar' ? 'ar-SA' : currentLang === 'ur' ? 'ur-PK' : 'en-US',
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  );

  // Safe buffer date: 5 days prior to prevent airline delays / cancellations
  const safeBufferDate = useMemo(() => {
    const d = new Date(calculatedReturnDate);
    d.setDate(d.getDate() - 5);
    return d;
  }, [calculatedReturnDate]);

  const formattedSafeDate = safeBufferDate.toLocaleDateString(
    currentLang === 'ar' ? 'ar-SA' : currentLang === 'ur' ? 'ur-PK' : 'en-US',
    { month: 'short', day: 'numeric', year: 'numeric' }
  );

  // Validation: Passport & Iqama validity checks
  const passportValidityWarning = useMemo(() => {
    const passExp = new Date(passportExpiryDate);
    const retDate = calculatedReturnDate;
    const diffMonths = (passExp.getTime() - retDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
    const minRequiredMonths = (selectedCountry.id === 'eg' || selectedCountry.id === 'ye' || selectedCountry.id === 'sy' || selectedCountry.id === 'jo_ps' || selectedCountry.id === 'sd') ? 3 : 6;
    return diffMonths < minRequiredMonths;
  }, [passportExpiryDate, calculatedReturnDate, selectedCountry]);

  const iqamaValidityWarning = useMemo(() => {
    const iqExp = new Date(iqamaExpiryDate);
    const retDate = calculatedReturnDate;
    const diffDays = (iqExp.getTime() - retDate.getTime()) / (1000 * 60 * 60 * 24);
    // Jawazat requires Iqama to be valid for at least the visa period + 90 days buffer
    return diffDays < 90;
  }, [iqamaExpiryDate, calculatedReturnDate]);

  // ==========================================
  // TAB 3: QIWA LABOR LAW GRATUITY (ESB) REFINED
  // ==========================================
  const [basicSalary, setBasicSalary] = useState<number>(6000);
  const [housingAllowance, setHousingAllowance] = useState<number>(1500);
  const [transportAllowance, setTransportAllowance] = useState<number>(500);
  const [otherAllowances, setOtherAllowances] = useState<number>(0);
  const [contractType, setContractType] = useState<'fixed' | 'indefinite'>('fixed');
  const [serviceYears, setServiceYears] = useState<number>(4);
  const [serviceMonths, setServiceMonths] = useState<number>(6);
  const [serviceDays, setServiceDays] = useState<number>(15);
  const [unusedLeaveDays, setUnusedLeaveDays] = useState<number>(15);
  
  const [terminationReason, setTerminationReason] = useState<
    'contractEnd' | 'employerTermination' | 'resignation' | 'article81' | 'femaleMarriageOrChild' | 'forceMajeure'
  >('contractEnd');

  // Total Wage for ESB Calculation (Article 84: Basic + Housing + Fixed Regular Allowances)
  const grossWageForESB = Number(basicSalary || 0) + Number(housingAllowance || 0);
  const dailyWage = grossWageForESB / 30;
  const totalYearsExact = Number(serviceYears || 0) + (Number(serviceMonths || 0) / 12) + (Number(serviceDays || 0) / 365);

  // Article 84 Base Calculation:
  // Half a month's wage for each of the first 5 years
  // A full month's wage for each subsequent year
  const baseGratuity = useMemo(() => {
    if (totalYearsExact <= 5) {
      return totalYearsExact * (grossWageForESB * 0.5);
    } else {
      const firstFiveYears = 5 * (grossWageForESB * 0.5);
      const remainingYears = (totalYearsExact - 5) * grossWageForESB;
      return firstFiveYears + remainingYears;
    }
  }, [totalYearsExact, grossWageForESB]);

  // Multiplier Logic under Articles 84, 85, 87, 81
  const { payoutMultiplier, legalReference, explanation } = useMemo(() => {
    if (terminationReason === 'contractEnd') {
      return {
        payoutMultiplier: 1.0,
        legalReference: 'Article 84 (المادة 84)',
        explanation: currentLang === 'ar'
          ? 'استحقاق كامل 100% لانتهاء مدة العقد المحدد أو عدم رغبة صاحب العمل في التجديد.'
          : currentLang === 'ur'
          ? 'معاہدہ کی مدت مکمل ہونے پر ملازم کو 100 فیصد مکمل گریجویٹی ملتی ہے۔'
          : 'Full 100% award upon natural expiration of fixed-term contract or non-renewal by employer.'
      };
    }
    if (terminationReason === 'employerTermination') {
      return {
        payoutMultiplier: 1.0,
        legalReference: 'Article 84 & 77 (المادتان 84 و 77)',
        explanation: currentLang === 'ar'
          ? 'استحقاق كامل 100% بالإضافة إلى أحقية التعويض عن الإنهاء غير المشروع بموجب المادة 77 وفترة الإنذار.'
          : currentLang === 'ur'
          ? 'کمپنی کی برطرفی پر 100 فیصد گریجویٹی مع آرٹیکل 77 کے تحت ہرجانہ اور نوٹس پیریڈ تنخواہ۔'
          : 'Full 100% award plus entitlement to Article 77 wrongful termination compensation and notice wages.'
      };
    }
    if (terminationReason === 'article81') {
      return {
        payoutMultiplier: 1.0,
        legalReference: 'Article 81 (المادة 81)',
        explanation: currentLang === 'ar'
          ? 'استحقاق كامل 100% مع إعفاء تام من فترة الإنذار وحق نقل الكفالة في قوى فوراً (لتأخر الرواتب 3 أشهر أو إخلال جوهري).'
          : currentLang === 'ur'
          ? 'آرٹیکل 81 کے تحت استعفیٰ پر 100 فیصد مکمل گریجویٹی، نوٹس پیریڈ سے استثنیٰ اور فوری کفالہ ٹرانسفر کا حق۔'
          : 'Full 100% award, zero notice period penalty, and instant Qiwa job mobility rights without sponsor approval.'
      };
    }
    if (terminationReason === 'femaleMarriageOrChild') {
      return {
        payoutMultiplier: 1.0,
        legalReference: 'Article 87 (المادة 87)',
        explanation: currentLang === 'ar'
          ? 'استحقاق كامل 100% للعاملة التي تنهي عقدها خلال 6 أشهر من الزواج أو 3 أشهر من الوضع بغض النظر عن سنوات الخدمة.'
          : currentLang === 'ur'
          ? 'آرٹیکل 87: خاتون ملازمہ شادی کے 6 ماہ یا بچے کی پیدائش کے 3 ماہ کے اندر استعفیٰ دے تو 100 فیصد مکمل گریجویٹی۔'
          : 'Full 100% award for female employees resigning within 6 months of marriage or 3 months of childbirth regardless of tenure.'
      };
    }
    if (terminationReason === 'forceMajeure') {
      return {
        payoutMultiplier: 1.0,
        legalReference: 'Article 87 (المادة 87)',
        explanation: currentLang === 'ar'
          ? 'استحقاق كامل 100% لترك العمل بسبب قوة قاهرة أو عجز كلي أو بلوغ سن التقاعد النظامي.'
          : currentLang === 'ur'
          ? 'ناگہانی حالات، معذوری یا ریٹائرمنٹ کی عمر پر ملازمت چھوڑنے پر 100 فیصد مکمل گریجویٹی۔'
          : 'Full 100% award due to force majeure events, total disability, or official retirement age.'
      };
    }

    // Voluntary Resignation (Article 85)
    if (totalYearsExact < 2) {
      return {
        payoutMultiplier: 0.0,
        legalReference: 'Article 85 (المادة 85)',
        explanation: currentLang === 'ar'
          ? 'لا تستحق أي مكافأة إذا كانت خدمة العامل أقل من سنتين في حالة الاستقالة الاختيارية.'
          : currentLang === 'ur'
          ? 'اپنی مرضی سے استعفیٰ کی صورت میں 2 سال سے کم ملازمت پر کوئی گریجویٹی نہیں بنتی۔'
          : 'Zero award if service is under 2 years upon voluntary resignation.'
      };
    } else if (totalYearsExact <= 5) {
      return {
        payoutMultiplier: 1 / 3,
        legalReference: 'Article 85 (المادة 85)',
        explanation: currentLang === 'ar'
          ? 'تستحق ثلث المكافأة (33.3%) لخدمة بين سنتين و5 سنوات في حال الاستقالة.'
          : currentLang === 'ur'
          ? '2 سے 5 سال کی سروس کے دوران استعفیٰ پر کل گریجویٹی کا ایک تہائی (33.3 فیصد) ادا ہوگا۔'
          : 'One-third entitlement (33.3%) for 2 to 5 years of tenure upon voluntary resignation.'
      };
    } else if (totalYearsExact <= 10) {
      return {
        payoutMultiplier: 2 / 3,
        legalReference: 'Article 85 (المادة 85)',
        explanation: currentLang === 'ar'
          ? 'تستحق ثلثي المكافأة (66.7%) لخدمة بين 5 و10 سنوات في حال الاستقالة.'
          : currentLang === 'ur'
          ? '5 سے 10 سال کی سروس کے دوران استعفیٰ پر کل گریجویٹی کا دو تہائی (66.7 فیصد) ادا ہوگا۔'
          : 'Two-thirds entitlement (66.7%) for 5 to 10 years of tenure upon voluntary resignation.'
      };
    } else {
      return {
        payoutMultiplier: 1.0,
        legalReference: 'Article 85 (المادة 85)',
        explanation: currentLang === 'ar'
          ? 'تستحق المكافأة كاملة بنسبة 100% لتجاوز مدة الخدمة 10 سنوات حتى في حال الاستقالة الاختيارية.'
          : currentLang === 'ur'
          ? '10 سال سے زیادہ ملازمت پر استعفیٰ دینے پر بھی 100 فیصد مکمل گریجویٹی حاصل ہوتی ہے۔'
          : 'Full 100% award for tenure exceeding 10 years even under voluntary resignation.'
      };
    }
  }, [terminationReason, totalYearsExact, currentLang]);

  const finalGratuitySar = Math.round(baseGratuity * payoutMultiplier);
  const unusedLeavePaySar = Math.round(unusedLeaveDays * dailyWage);
  const totalSettlementDueSar = finalGratuitySar + unusedLeavePaySar;
  const totalSettlementDueLocal = Math.round(totalSettlementDueSar * selectedCountry.sarRate);

  // Sharing & Copy link
  const [copiedLink, setCopiedLink] = useState(false);
  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleShareWhatsApp = () => {
    const shareText = currentLang === 'ur'
      ? `سعودی عرب کا مکمل اور تصدیق شدہ اقامہ تجدید، فیملی فیس، خروج و عودہ اور قویٰ لیبر لاء گریجویٹی کیلکولیٹر:\n${window.location.href}`
      : currentLang === 'ar'
      ? `الحاسبة المعتمدة لتجديد الإقامة، رسوم المرافقين، تأشيرة الخروج والعودة، ومكافأة نهاية الخدمة في السعودية:\n${window.location.href}`
      : `Verified Saudi Arabia Expat Iqama Fees, Exit Re-Entry & Qiwa Labor Law Gratuity Calculator Suite:\n${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank', 'noopener,noreferrer');
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  // Structured Data Schema for SEO (WebApplication & FAQPage)
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "KSA Expat Residency, Visa & Labor Law Calculator 2026",
        "url": typeof window !== 'undefined' ? window.location.href : "https://ksainsights.com/expat-calculator",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "description": "Comprehensive Saudi Arabia expat calculator for Iqama renewal, Maktab Amal levy, dependent fees, exit re-entry return deadlines, and Qiwa End of Service Gratuity.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "SAR"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How much is the Saudi expat dependent fee in 2026?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Saudi dependent fee (Murafeqeen) is fixed at 400 SAR per month per dependent (4,800 SAR annually per dependent), payable via bank SADAD system."
            }
          },
          {
            "@type": "Question",
            "name": "What is the penalty for staying outside Saudi Arabia past the exit re-entry date?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "If an expat does not return before the visa deadline or extend it online, they are marked under 'Kharaj wa Lam Ya'ud' and face an automatic 3-year entry ban to Saudi Arabia."
            }
          },
          {
            "@type": "Question",
            "name": "How is End of Service Gratuity calculated under Saudi Labor Law Article 84?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Under Article 84, employees receive half a month's wage for each of the first 5 years and one full month's wage for each year thereafter, calculated on actual gross salary (basic + housing)."
            }
          }
        ]
      }
    ]
  };

  return (
    <div id="global-expat-calculator" className="relative my-12" dir="ltr">
      {/* Dynamic SEO JSON-LD injection */}
      <Helmet>
        <title>
          {currentLang === 'ar' 
            ? 'حاسبة الإقامة ورسوم المرافقين والخروج والعودة ومكافأة نهاية الخدمة 2026' 
            : currentLang === 'ur' 
            ? 'سعودی اقامہ تجدید فیس، خروج و عودہ اور گریجویٹی کیلکولیٹر 2026' 
            : 'Saudi Expat Iqama Renewal, Dependent Fees, Exit Re-Entry & Gratuity Calculator 2026'}
        </title>
        <meta 
          name="description" 
          content={
            currentLang === 'ar'
              ? 'احسب بدقة رسوم تجديد الإقامة، رخصة العمل، رسوم المرافقين 400 ريال، موعد العودة الأخير لتأشيرة الخروج والعودة، ومكافأة نهاية الخدمة وفق المادتين 84 و85 لنظام العمل السعودي.'
              : currentLang === 'ur'
              ? 'سعودی عرب اقامہ تجدید فیس، 400 ریال فیملی لیوی، خروج و عودہ ویزا کی آخری تاریخ واپسی، اور قویٰ لیبر لاء کے مطابق اینڈ آف سروس ایوارڈ کا مکمل حساب۔'
              : 'Calculate exact Saudi Iqama renewal fees, Maktab Amal 800/700 SAR levy, 400 SAR dependent fees, exit re-entry return date deadlines, and Qiwa End of Service Benefits.'
          } 
        />
        <script type="application/ld+json">
          {JSON.stringify(jsonLdData)}
        </script>
      </Helmet>

      {/* Main Container */}
      <div className={`bg-white rounded-[2.5rem] p-6 md:p-12 border border-emerald-900/10 shadow-2xl relative overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Luxury Background Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 emerald-gradient opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 gold-gradient opacity-10 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none blur-3xl" />

        {/* ========================================================================= */}
        {/* HERO HEADER */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-gray-100 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-xs font-bold uppercase tracking-widest mb-3 shadow-sm">
              <ShieldCheck size={14} className="text-emerald-700" />
              <span>
                {currentLang === 'ar' 
                  ? 'بوابة الأنظمة واللوائح السعودية الرسمية 2026' 
                  : currentLang === 'ur' 
                  ? 'سعودی سرکاری لیبر و امیگریشن پورٹل 2026' 
                  : 'Official Saudi Labor & Residency Simulation Engine 2026'}
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary tracking-tight leading-tight">
              {currentLang === 'ar' 
                ? 'حاسبة الإقامة، التأشيرات، وحقوق العمل العالمية' 
                : currentLang === 'ur' 
                ? 'عالمی اقامہ، خروج و عودہ اور لیبر لاء کیلکولیٹر' 
                : 'Global KSA Expat Residency, Visa & Labor Suite'}
            </h2>
            
            <p className="text-gray-600 text-sm md:text-base mt-2 max-w-3xl font-light leading-relaxed">
              {currentLang === 'ar'
                ? 'محرك حسابي قانوني متوافق 100% مع أنظمة وزارة الموارد البشرية والجوازات ومجلس الضمان الصحي، يدعم أكثر من 15 جالية مع التحويل المباشر للعملات المحلية.'
                : currentLang === 'ur'
                ? 'سعودی وزارت افرادی قوت، محکمہ پاسپورٹ (جوازات) اور ہیلتھ کونسل کے عین مطابق، 15 سے زائد ممالک کے ورکرز اور فیملیز کے لیے مکمل حل۔'
                : 'Precision regulatory engine compliant with Saudi HRSD, Jawazat, and CCHI decrees. Configured for international workforces with real-time currency conversions.'}
            </p>
          </div>

          {/* Interactive Nationality Selector */}
          <div className="bg-paper p-4 rounded-3xl border border-gray-200 shadow-sm flex flex-col gap-2 min-w-[280px]">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <Globe2 size={14} className="text-secondary" />
              <span>{currentLang === 'ar' ? 'الجنسية والعملة المحلية:' : currentLang === 'ur' ? 'شہریت اور مقامی کرنسی:' : 'Home Nationality & Currency:'}</span>
            </label>
            <select
              value={selectedCountryId}
              onChange={(e) => setSelectedCountryId(e.target.value)}
              className="w-full bg-white border border-gray-200 font-bold text-primary text-sm rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer shadow-sm"
            >
              {NATIONALITIES.map((nat, nIdx) => (
                <option key={`nat-opt-${nat.id}-${nIdx}`} value={nat.id}>
                  {nat.flag} {nat.name[currentLang]} ({nat.currencyCode})
                </option>
              ))}
            </select>
            <div className="text-[10px] text-gray-400 font-mono text-center pt-1">
              1 SAR ≈ {selectedCountry.sarRate} {selectedCountry.currencyCode}
            </div>
          </div>
        </div>

        {/* Nationality Specific Intelligence Advisory */}
        <div className="mt-6 p-4 md:p-5 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-4 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 font-bold text-lg">
            {selectedCountry.flag}
          </div>
          <div className="text-xs md:text-sm text-amber-950 leading-relaxed">
            <span className="font-bold underline decoration-amber-400">
              {selectedCountry.name[currentLang]} {currentLang === 'ar' ? '– تنبيه اللوائح المعتمدة:' : currentLang === 'ur' ? '– متعلقہ ملکی ہدایات:' : '– Regulatory Directives:'}
            </span>{' '}
            {selectedCountry.notes[currentLang]}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* NAVIGATION TABS */}
        {/* ========================================================================= */}
        <div className="flex flex-wrap gap-2 md:gap-3 mt-8 border-b border-gray-100 pb-5 relative z-10">
          <button
            onClick={() => setActiveTab('iqama')}
            className={`flex items-center gap-2.5 px-5 py-3.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
              activeTab === 'iqama'
                ? 'bg-primary text-secondary shadow-xl scale-[1.02]'
                : 'bg-paper text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Building2 size={18} />
            <span>{currentLang === 'ar' ? '١. الإقامة والمرافقين والتأمين' : currentLang === 'ur' ? '۱. اقامہ تجدید، فیملی فیس و انشورنس' : '1. Iqama, Dependents & CCHI'}</span>
          </button>

          <button
            onClick={() => setActiveTab('exitReentry')}
            className={`flex items-center gap-2.5 px-5 py-3.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
              activeTab === 'exitReentry'
                ? 'bg-primary text-secondary shadow-xl scale-[1.02]'
                : 'bg-paper text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Plane size={18} />
            <span>{currentLang === 'ar' ? '٢. تأشيرة خروج وعودة والمهلة القصوى' : currentLang === 'ur' ? '۲. خروج و عودہ آخری تاریخ واپسی' : '2. Exit Re-Entry & Ban Shield'}</span>
          </button>

          <button
            onClick={() => setActiveTab('gratuity')}
            className={`flex items-center gap-2.5 px-5 py-3.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
              activeTab === 'gratuity'
                ? 'bg-primary text-secondary shadow-xl scale-[1.02]'
                : 'bg-paper text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Scale size={18} />
            <span>{currentLang === 'ar' ? '٣. مكافأة نهاية الخدمة (نظام العمل وقوى)' : currentLang === 'ur' ? '۳. قویٰ لیبر اینڈ آف سروس گریجویٹی' : '3. Qiwa End of Service (ESB)'}</span>
          </button>

          <button
            onClick={() => setActiveTab('countryMatrix')}
            className={`flex items-center gap-2.5 px-5 py-3.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
              activeTab === 'countryMatrix'
                ? 'bg-primary text-secondary shadow-xl scale-[1.02]'
                : 'bg-paper text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Layers size={18} />
            <span>{currentLang === 'ar' ? '٤. متطلبات الدول (وافد / الفحص المهني)' : currentLang === 'ur' ? '۴. ملکی قوانین و شرائط چارٹ' : '4. Country Verification Matrix'}</span>
          </button>

          <button
            onClick={() => setActiveTab('faq')}
            className={`flex items-center gap-2.5 px-5 py-3.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
              activeTab === 'faq'
                ? 'bg-primary text-secondary shadow-xl scale-[1.02]'
                : 'bg-paper text-gray-600 hover:bg-gray-100'
            }`}
          >
            <HelpCircle size={18} />
            <span>{currentLang === 'ar' ? '٥. الأسئلة الشائعة والأحكام' : currentLang === 'ur' ? '۵. اہم سوالات و جوابات' : '5. Legal FAQ & Guidelines'}</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: IQAMA & DEPENDENT LEVY REFINED CALCULATOR */}
        {/* ========================================================================= */}
        {activeTab === 'iqama' && (
          <div className="mt-8 space-y-8 relative z-10">
            {/* Inline Statutory Formula Definition Banner */}
            <div className="p-5 md:p-6 rounded-3xl bg-amber-50/80 border border-amber-200/80 shadow-xs relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Calculator size={18} className="text-amber-800" />
                  <span className="text-xs font-black uppercase tracking-wider text-amber-950">
                    {currentLang === 'ar' ? 'معادلة المقابل المالي ورسوم تجديد الإقامة المعتمدة:' : currentLang === 'ur' ? 'اقامہ تجدید اور فیملی لیوی کا سرکاری حسابی فارمولہ:' : 'Official Iqama Renewal & Dependent Levy Formula:'}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  HRSD / Jawazat Decrees
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-amber-100 font-mono text-xs sm:text-sm text-amber-950 font-bold tracking-tight shadow-2xs">
                <code>Total Fee = Work Permit (800/700 SAR/mo) + Jawazat (650 SAR/yr) + (Dependents × 400 SAR/mo) + CCHI Insurance</code>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-amber-800 font-medium">
                <span>{currentLang === 'ar' ? '• رخصة العمل: 800 أو 700 ريال/شهر' : currentLang === 'ur' ? '• مکتب عمل: 800 یا 700 ریال ماہانہ' : '• Work Permit: 800 or 700 SAR/mo'}</span>
                <span>{currentLang === 'ar' ? '• رسوم المرافقين: 400 ريال شهرياً لكل مرافق' : currentLang === 'ur' ? '• فیملی فیس: 400 ریال ماہانہ فی مرافق' : '• Dependent Levy: SAR 400/mo per dep'}</span>
                <span>{currentLang === 'ar' ? '• الجوازات: 650 ريال سنوياً' : currentLang === 'ur' ? '• جوازات فیس: 650 ریال سالانہ' : '• Jawazat: SAR 650/yr'}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Controls Column */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Expat Worker Category & Exemption Status */}
                <div className="bg-paper p-6 rounded-3xl border border-gray-100 space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                      {currentLang === 'ar' ? 'فئة العامل وحالة الإعفاء النظامية:' : currentLang === 'ur' ? 'ورکر کیٹیگری اور قانونی استثنیٰ:' : 'Expat Category & Legal Exemption Status:'}
                    </label>
                    <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                      Official HRSD
                    </span>
                  </div>
                  
                  <select
                    value={workerCategory}
                    onChange={(e) => setWorkerCategory(e.target.value as any)}
                    className="w-full bg-white border border-gray-200 font-bold text-primary text-sm rounded-2xl p-3.5 focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer shadow-sm"
                  >
                    <option value="commercial">
                      {currentLang === 'ar' ? '🏢 عامل قطاع خاص تجاري (نظام العمل وقوى العادي)' : currentLang === 'ur' ? '🏢 پرائیویٹ کمپنی ورکر (عام قویٰ اور لیبر لاء)' : '🏢 Regular Commercial Private Sector Worker'}
                    </option>
                    <option value="industrial">
                      {currentLang === 'ar' ? '🏭 مصانع مرخصة (مستفيد من مبادرة دعم القطاع الصناعي - إعفاء)' : currentLang === 'ur' ? '🏭 منظور شدہ فیکٹری/انڈسٹری (صنعتی مراعات یافتہ - لیوی فری)' : '🏭 Licensed Industrial / Manufacturing Sector (Gov Subsidized Exemption)'}
                    </option>
                    <option value="microBusiness">
                      {currentLang === 'ar' ? '🏪 منشأة متناهية الصغر (1-5 عمال مع تفرغ المالك السعودي - إعفاء 2 إلى 4)' : currentLang === 'ur' ? '🏪 مائیکرو کاروبار (1 تا 5 ورکرز، سعودی مالک حاضر - لیوی فری)' : '🏪 Micro Enterprise (1-5 Workers with Full-Time Saudi Owner in GOSI)'}
                    </option>
                    <option value="sonOfSaudiMother">
                      {currentLang === 'ar' ? '👑 ابن / ابنة مواطنة سعودية (معفى تماماً من المقابل المالي والمرافقين)' : currentLang === 'ur' ? '👑 سعودی ماں کی غیر ملکی اولاد (ورک لیوی اور فیملی فیس سے 100٪ مستثنیٰ)' : '👑 Son / Daughter of a Saudi Mother (100% Expat Levy & Dependent Exempt)'}
                    </option>
                    <option value="foreignSpouse">
                      {currentLang === 'ar' ? '💍 زوج مواطنة أو زوجة مواطن (معفى من المقابل المالي لرخصة العمل)' : currentLang === 'ur' ? '💍 سعودی شہری کا غیر ملکی شریک حیات (مکتب عمل لیوی سے مستثنیٰ)' : '💍 Foreign Spouse of a Saudi Citizen (Exempt from Commercial Expat Levy)'}
                    </option>
                    <option value="domestic">
                      {currentLang === 'ar' ? '🏠 عمالة منزلية / سائق خاص / حارس (منصة مساند - أول 4 عمال معفون)' : currentLang === 'ur' ? '🏠 گھریلو ورکر، پرائیویٹ ڈرائیور یا چوکیدار (مساند - پہلے 4 ورکرز فیس فری)' : '🏠 Domestic Worker / Private Driver / Maid (Musaned - First 4 Exempt)'}
                    </option>
                    <option value="premiumResidency">
                      {currentLang === 'ar' ? '💎 الإقامة المميزة (كفاءة استثنائية، مستثمر، موهبة - بدون مقابل مالي)' : currentLang === 'ur' ? '💎 پریمیم ریذیڈنسی (سرمایہ کار، خصوصی ٹیلنٹ - زیرو لیوی)' : '💎 Premium Residency Holder (Special Talent / Investor - Zero Expat Levy)'}
                    </option>
                    <option value="exemptStatus">
                      {currentLang === 'ar' ? '📜 فئات خاصة (فلسطيني بوثيقة سفر، برماوي، قبائل نازحة)' : currentLang === 'ur' ? '📜 خصوصی مستثنیٰ کیٹیگریز (سفری دستاویزات یا شاہی احکامات)' : '📜 Special Exempt Categories (Palestinian Travel Doc / Burmese / Displaced)'}
                    </option>
                  </select>
                </div>

                {/* Company Nitaqat Ratio (Commercial only) */}
                {workerCategory === 'commercial' && !isGcc && (
                  <div className="bg-paper p-6 rounded-3xl border border-gray-100 space-y-3">
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">
                      {currentLang === 'ar' ? 'نسبة السعودة في المنشأة (مكتب العمل):' : currentLang === 'ur' ? 'کمپنی میں سعودائزیشن کا تناسب (مکتب عمل):' : 'Company Saudization Ratio (Maktab Amal Work Permit):'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setNitaqatRatio('moreThan')}
                        className={`p-4 rounded-2xl border text-left rtl:text-right transition-all ${
                          nitaqatRatio === 'moreThan'
                            ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 shadow-sm font-bold'
                            : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-sm">
                          {currentLang === 'ar' ? 'الوافدون أكثر من السعوديين' : currentLang === 'ur' ? 'غیر ملکی عملہ سعودیوں سے زیادہ' : 'Expats > Saudis in Firm'}
                        </div>
                        <div className="text-xs text-gray-500 font-normal mt-1">
                          {currentLang === 'ar' ? '800 ريال / شهر (9,600 ريال سنوياً)' : currentLang === 'ur' ? '800 ریال ماہانہ (9,600 سالانہ)' : '800 SAR/month (9,600 SAR/yr)'}
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setNitaqatRatio('equalOrLess')}
                        className={`p-4 rounded-2xl border text-left rtl:text-right transition-all ${
                          nitaqatRatio === 'equalOrLess'
                            ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 shadow-sm font-bold'
                            : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-sm">
                          {currentLang === 'ar' ? 'الوافدون يساوي أو أقل من السعوديين' : currentLang === 'ur' ? 'غیر ملکی عملہ سعودیوں کے برابر یا کم' : 'Expats ≤ Saudis in Firm'}
                        </div>
                        <div className="text-xs text-gray-500 font-normal mt-1">
                          {currentLang === 'ar' ? '700 ريال / شهر (8,400 ريال سنوياً)' : currentLang === 'ur' ? '700 ریال ماہانہ (8,400 سالانہ)' : '700 SAR/month (8,400 SAR/yr)'}
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Renewal Duration & Dependents Granularity */}
                <div className="bg-paper p-6 rounded-3xl border border-gray-100 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                        {currentLang === 'ar' ? 'مدة التجديد (أشهر):' : currentLang === 'ur' ? 'تجدید کی مدت (ماہ):' : 'Renewal Duration (Months):'}
                      </label>
                      <select
                        value={iqamaMonths}
                        onChange={(e) => setIqamaMonths(Number(e.target.value))}
                        className="w-full bg-white border border-gray-200 font-bold text-primary text-sm rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                      >
                        <option value={3}>3 {currentLang === 'ar' ? 'أشهر (ربع سنوي)' : currentLang === 'ur' ? 'ماہ (سہ ماہی)' : 'Months (Quarterly)'}</option>
                        <option value={6}>6 {currentLang === 'ar' ? 'أشهر (نصف سنوي)' : currentLang === 'ur' ? 'ماہ (چھ ماہ)' : 'Months (Half-Year)'}</option>
                        <option value={9}>9 {currentLang === 'ar' ? 'أشهر' : currentLang === 'ur' ? 'ماہ' : 'Months'}</option>
                        <option value={12}>12 {currentLang === 'ar' ? 'شهراً (سنة كاملة)' : currentLang === 'ur' ? 'ماہ (ایک سال)' : 'Months (1 Year)'}</option>
                        <option value={24}>24 {currentLang === 'ar' ? 'شهراً (سنتان)' : currentLang === 'ur' ? 'ماہ (دو سال)' : 'Months (2 Years)'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                        {currentLang === 'ar' ? 'عدد الزوجات المرافقات:' : currentLang === 'ur' ? 'بیوی / شریک حیات کی تعداد:' : 'Number of Spouses:'}
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={4}
                        value={spousesCount}
                        onChange={(e) => setSpousesCount(Math.max(0, parseInt(e.target.value) || 0))}
                        disabled={dependentExempt}
                        className="w-full bg-white border border-gray-200 font-bold text-primary text-sm rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-secondary disabled:bg-gray-100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                        {currentLang === 'ar' ? 'الأبناء دون 18 عاماً:' : currentLang === 'ur' ? '18 سال سے کم بچے:' : 'Children Under 18:'}
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={15}
                        value={minorChildrenCount}
                        onChange={(e) => setMinorChildrenCount(Math.max(0, parseInt(e.target.value) || 0))}
                        disabled={dependentExempt}
                        className="w-full bg-white border border-gray-200 font-bold text-primary text-sm rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-secondary disabled:bg-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                        {currentLang === 'ar' ? 'التابعون البالغون (فوق 18/بنات/والدين):' : currentLang === 'ur' ? '18 سال سے بڑے افراد / والدین:' : 'Adult Dependents (18+ / Parents):'}
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={10}
                        value={adultDependentsCount}
                        onChange={(e) => setAdultDependentsCount(Math.max(0, parseInt(e.target.value) || 0))}
                        disabled={dependentExempt}
                        className="w-full bg-white border border-gray-200 font-bold text-primary text-sm rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-secondary disabled:bg-gray-100"
                      />
                    </div>
                  </div>

                  {/* Newborn inside KSA check */}
                  <div className="pt-3 border-t border-gray-100">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasNewbornInKsa}
                        onChange={(e) => setHasNewbornInKsa(e.target.checked)}
                        disabled={dependentExempt}
                        className="w-4 h-4 text-emerald-600 rounded focus:ring-secondary"
                      />
                      <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                        <Baby size={16} className="text-emerald-700" />
                        {currentLang === 'ar' ? 'إضافة مولود جديد وُلد داخل المملكة؟' : currentLang === 'ur' ? 'سعودی عرب میں پیدا ہونے والے نئے بچے کا اضافہ؟' : 'Adding a newborn baby born inside Saudi Arabia?'}
                      </span>
                    </label>

                    {hasNewbornInKsa && !dependentExempt && (
                      <div className="mt-3 p-3 bg-white rounded-xl border border-gray-200 space-y-2">
                        <label className="block text-[11px] font-bold text-gray-500">
                          {currentLang === 'ar' ? 'كم شهراً مضى على تاريخ ولادة الطفل داخل المملكة؟' : currentLang === 'ur' ? 'بچے کی پیدائش کو کتنے مہینے گزر چکے ہیں؟' : 'Months elapsed since birth inside KSA:'}
                        </label>
                        <input
                          type="number"
                          min={1}
                          max={24}
                          value={newbornMonthsSinceBirth}
                          onChange={(e) => setNewbornMonthsSinceBirth(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-32 bg-paper border border-gray-200 font-bold text-primary text-xs rounded-xl p-2"
                        />
                        <p className="text-[10px] text-gray-400">
                          {currentLang === 'ar' 
                            ? 'تُحسب رسوم المرافقين للمولود من تاريخ الولادة مباشرة بمعدل 400 ريال/شهر. تأخير التبليغ لأكثر من عام يفرض غرامة 2000 ريال.'
                            : currentLang === 'ur' 
                            ? 'نئے بچے کی فیس پیدائش کی تاریخ سے 400 ریال ماہانہ لاگو ہوتی ہے۔ 1 سال سے زیادہ تاخیر پر 2000 ریال جرمانہ ہے۔'
                            : 'Newborn dependent fees accrue from birth date at 400 SAR/month. Late civil reporting beyond 1 year incurs a 2,000 SAR fine.'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Health Insurance & Penalties Toggle */}
                <div className="bg-paper p-6 rounded-3xl border border-gray-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-2">
                      <HeartPulse size={16} className="text-red-500" />
                      <span>{currentLang === 'ar' ? 'التأمين الطبي الإلزامي (مجلس الضمان الصحي CCHI):' : currentLang === 'ur' ? 'لازمی ہیلتھ انشورنس (کونسل آف ہیلتھ انشورنس):' : 'Mandatory Health Insurance (CCHI Tier):'}</span>
                    </label>
                    <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs font-bold text-primary">
                      <input
                        type="checkbox"
                        checked={includeInsurance}
                        onChange={(e) => setIncludeInsurance(e.target.checked)}
                        className="w-4 h-4 text-emerald-600 rounded"
                      />
                      <span>{currentLang === 'ar' ? 'تضمين بالحساب' : currentLang === 'ur' ? 'شامل کریں' : 'Include in Total'}</span>
                    </label>
                  </div>

                  {includeInsurance && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                      {[
                        { id: 'basic', label: currentLang === 'ar' ? 'أساسي (منشآت)' : currentLang === 'ur' ? 'بیسک' : 'Basic SME', price: '~650 SAR/yr' },
                        { id: 'classB', label: currentLang === 'ar' ? 'الفئة الفضية B' : currentLang === 'ur' ? 'کلاس بی' : 'Class B', price: '~1,100 SAR/yr' },
                        { id: 'classA', label: currentLang === 'ar' ? 'الفئة الذهبية A' : currentLang === 'ur' ? 'کلاس اے' : 'Class A', price: '~2,400 SAR/yr' },
                        { id: 'vip', label: currentLang === 'ar' ? 'كبار الشخصيات VIP' : currentLang === 'ur' ? 'وی آئی پی' : 'VIP Class', price: '~4,500 SAR/yr' },
                      ].map((tier, tIdx) => (
                        <button
                          key={`ins-tier-${tier.id}-${tIdx}`}
                          type="button"
                          onClick={() => setInsuranceTier(tier.id as any)}
                          className={`p-3 rounded-2xl border text-center transition-all ${
                            insuranceTier === tier.id
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-sm'
                              : 'border-gray-200 bg-white text-gray-600'
                          }`}
                        >
                          <div className="text-xs">{tier.label}</div>
                          <div className="text-[10px] text-gray-400 mt-0.5">{tier.price}</div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Late Renewal Penalties Toggle */}
                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                        <AlertTriangle size={15} className="text-amber-600" />
                        <span>{currentLang === 'ar' ? 'هل الإقامة منتهية الصلاحية حالياً؟' : currentLang === 'ur' ? 'کیا اقامہ کی میعاد پہلے ہی ختم ہو چکی ہے؟' : 'Is Iqama Currently Expired?'}</span>
                      </label>
                      <input
                        type="checkbox"
                        checked={isIqamaExpired}
                        onChange={(e) => setIsIqamaExpired(e.target.checked)}
                        className="w-4 h-4 text-emerald-600 rounded"
                      />
                    </div>

                    {isIqamaExpired && (
                      <div className="mt-3 p-4 bg-red-50/70 border border-red-200 rounded-2xl space-y-2">
                        <label className="block text-xs font-bold text-red-900">
                          {currentLang === 'ar' ? 'مرات التأخير السابقة (نظام الجوازات):' : currentLang === 'ur' ? 'ماضی میں تاخیر کی تعداد (جوازات قوانین):' : 'Previous Late Renewal Occurrences:'}
                        </label>
                        <div className="flex gap-2">
                          {[
                            { occ: 1, label: currentLang === 'ar' ? 'المرة الأولى (500 ريال)' : currentLang === 'ur' ? 'پہلی بار (500 ریال)' : '1st (500 SAR)' },
                            { occ: 2, label: currentLang === 'ar' ? 'المرة الثانية (1,000 ريال)' : currentLang === 'ur' ? 'دوسری بار (1,000 ریال)' : '2nd (1,000 SAR)' },
                            { occ: 3, label: currentLang === 'ar' ? 'المرة الثالثة (1,000 ريال + إبعاد)' : currentLang === 'ur' ? 'تیسری بار (1,000 + ڈیپورٹیشن)' : '3rd (1,000 SAR + Deportation Risk)' },
                          ].map((item, occIdx) => (
                            <button
                              key={`late-occ-${item.occ}-${occIdx}`}
                              type="button"
                              onClick={() => setLateOccurrence(item.occ as any)}
                              className={`flex-1 py-2 px-2 text-[11px] rounded-xl border text-center font-bold ${
                                lateOccurrence === item.occ
                                  ? 'bg-red-600 text-white border-red-600 shadow'
                                  : 'bg-white text-red-900 border-red-200'
                              }`}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                        <p className="text-[10px] text-red-700 leading-normal">
                          {currentLang === 'ar'
                            ? 'تمنح الجوازات مهلة سماح 3 أيام بعد انتهاء الإقامة. التأخير للمرة الثالثة يعرض العامل لعقوبة الإبعاد والترحيل.'
                            : currentLang === 'ur'
                            ? 'جوازات ختم ہونے کے بعد 3 دن کی رعایت دیتی ہے۔ تیسری بار تاخیر پر ڈیپورٹیشن کی کارروائی ہو سکتی ہے۔'
                            : 'Jawazat grants a 3-day grace period. A 3rd late renewal offense triggers deportation proceedings.'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Live Output Card Column */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-primary text-white p-8 rounded-[2.5rem] shadow-2xl border border-emerald-700/40 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-widest border border-white/10">
                        {currentLang === 'ar' ? 'كشف الحساب الرسمي المعتمد' : currentLang === 'ur' ? 'مصدقہ فیس بریک ڈاؤن' : 'Official SADAD Statement'}
                      </span>
                      <span className="text-xs text-emerald-300 font-mono">
                        {iqamaMonths} {currentLang === 'ar' ? 'شهر' : currentLang === 'ur' ? 'ماہ' : 'Months'}
                      </span>
                    </div>

                    <div className="space-y-3.5 text-sm font-light border-b border-white/15 pb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">
                          {currentLang === 'ar' ? 'رسم رخصة العمل (المقابل المالي):' : currentLang === 'ur' ? 'مکتب عمل ورک پرمٹ لیوی:' : 'Work Permit Expat Levy:'}
                        </span>
                        <span className="font-mono font-bold text-white">{totalExpatLevy.toLocaleString()} SAR</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-white/80">
                          {currentLang === 'ar' ? 'رسوم الجوازات (الهوية):' : currentLang === 'ur' ? 'جوازات اقامہ تجدید فیس:' : 'Jawazat Residency Fee:'}
                        </span>
                        <span className="font-mono font-bold text-white">{proratedJawazat.toLocaleString()} SAR</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-white/80">
                          {currentLang === 'ar' ? 'تأمين رخصة العمل الإلزامي:' : currentLang === 'ur' ? 'لازمی ورک پرمٹ انشورنس:' : 'HRSD Work Permit Insurance:'}
                        </span>
                        <span className="font-mono font-bold text-white">{hrInsurance.toLocaleString()} SAR</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-white/80">
                          {currentLang === 'ar' 
                            ? `رسوم المرافقين (${totalLivingDependents} تابع):` 
                            : currentLang === 'ur' 
                            ? `فیملی ممبرز فیس (${totalLivingDependents} افراد):` 
                            : `Dependent Levy (${totalLivingDependents} persons):`}
                        </span>
                        <span className="font-mono font-bold text-amber-300">{regularDependentLevy.toLocaleString()} SAR</span>
                      </div>

                      {hasNewbornInKsa && !dependentExempt && (
                        <div className="flex justify-between items-center text-xs text-amber-200">
                          <span>{currentLang === 'ar' ? 'رسوم المولود الجديد بأثر رجعي:' : currentLang === 'ur' ? 'نئے بچے کی پچھلی فیس:' : 'Newborn Backdated Levy:'}</span>
                          <span className="font-mono font-bold">{newbornLevy.toLocaleString()} SAR</span>
                        </div>
                      )}

                      {isIqamaExpired && (
                        <div className="flex justify-between items-center text-xs text-red-300 font-bold">
                          <span>{currentLang === 'ar' ? 'غرامة تأخير التجديد:' : currentLang === 'ur' ? 'اقامہ تاخیر کا جرمانہ:' : 'Late Renewal Fine:'}</span>
                          <span className="font-mono">{latePenaltyFee.toLocaleString()} SAR</span>
                        </div>
                      )}

                      {includeInsurance && (
                        <div className="flex justify-between items-center text-xs text-emerald-200 pt-2 border-t border-white/10">
                          <span>{currentLang === 'ar' ? `تأمين الضمان الصحي (${totalInsuredPersons} أفراد):` : currentLang === 'ur' ? `ہیلتھ انشورنس (${totalInsuredPersons} افراد):` : `CCHI Health Insurance (${totalInsuredPersons} pax):`}</span>
                          <span className="font-mono font-bold">{estimatedInsuranceCost.toLocaleString()} SAR</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-6">
                    <div className="flex justify-between items-baseline mb-1">
                      <div className="text-xs text-white/60 uppercase tracking-widest font-semibold">
                        {currentLang === 'ar' ? 'إجمالي المستحق الشامل:' : currentLang === 'ur' ? 'کل واجب الادا رقم:' : 'Grand Total Payable:'}
                      </div>
                      <div className="text-[11px] text-emerald-300 font-mono">
                        {includeInsurance ? '+ CCHI Included' : 'Gov Fees Only'}
                      </div>
                    </div>

                    <div className="text-3xl md:text-4xl font-serif font-bold text-amber-300">
                      {grandTotalIqamaWithInsuranceSar.toLocaleString()} <span className="text-lg font-sans text-white">SAR</span>
                    </div>

                    {/* Local Currency Box */}
                    {selectedCountry.id !== 'gcc' && (
                      <div className="mt-4 p-3.5 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-between">
                        <span className="text-xs text-emerald-200">
                          {currentLang === 'ar' ? `المعادل بالعملة الوطنية (${selectedCountry.currencyCode}):` : currentLang === 'ur' ? `آبائی کرنسی میں قیمت (${selectedCountry.currencyCode}):` : `Equivalent in ${selectedCountry.currencyCode}:`}
                        </span>
                        <span className="text-lg font-bold text-white font-mono">
                          ≈ {grandTotalIqamaLocal.toLocaleString()} {selectedCountry.currencyCode}
                        </span>
                      </div>
                    )}

                    <div className="mt-4 p-3 rounded-2xl bg-black/20 text-[11px] text-white/70 leading-relaxed font-light">
                      <span className="font-bold text-amber-300">
                        {currentLang === 'ar' ? 'المسؤولية النظامية:' : currentLang === 'ur' ? 'قانونی ذمہ داری:' : 'Legal Obligation:'}{' '}
                      </span>
                      {currentLang === 'ar'
                        ? 'يلتزم صاحب العمل نظاماً بسداد رسوم رخصة العمل والإقامة والتأمين للعامل، بينما يسدد الوافد رسوم مرافقيه عبر سداد.'
                        : currentLang === 'ur'
                        ? 'قانون کے مطابق کمپنی ورکر کا اقامہ، ورک پرمٹ اور میڈیکل انشورنس بھرنے کی پابند ہے، جبکہ فیملی فیس ورکر خود ادا کرتا ہے۔'
                        : 'By law, employers bear the worker levy, residency fee, and primary insurance, while expatriates pay personal family dependent fees via SADAD.'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: EXIT & RE-ENTRY CALCULATOR REFINED */}
        {/* ========================================================================= */}
        {activeTab === 'exitReentry' && (
          <div className="mt-8 space-y-8 relative z-10">
            {/* Inline Statutory Formula Definition Banner */}
            <div className="p-5 md:p-6 rounded-3xl bg-blue-50/80 border border-blue-200/80 shadow-xs relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Plane size={18} className="text-blue-800" />
                  <span className="text-xs font-black uppercase tracking-wider text-blue-950">
                    {currentLang === 'ar' ? 'جدول رسوم تأشيرة الخروج والعودة (لوائح الجوازات):' : currentLang === 'ur' ? 'خروج و عودہ (ایگزٹ ری انٹری) کا سرکاری ٹیرف فارمولہ:' : 'Official Exit & Re-Entry Visa Tariff Formula (Jawazat Scale):'}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-300">
                  MOI Jawazat Scale
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-blue-100 font-mono text-xs sm:text-sm text-blue-950 font-bold tracking-tight shadow-2xs">
                <code>Single Visa = 200 SAR (First 60 Days) + 100 SAR/Extra Month | Multiple Visa = 500 SAR (First 90 Days) + 200 SAR/Extra Month</code>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-blue-800 font-medium">
                <span>{currentLang === 'ar' ? '• تأشيرة مفردة: 200 ريال لأول شهرين + 100 ريال لكل شهر إضافي' : currentLang === 'ur' ? '• سنگل ویزا: 200 ریال پہلے 2 ماہ + 100 ریال فی اضافی ماہ' : '• Single: 200 SAR (first 2 mos) + 100 SAR/mo'}</span>
                <span>{currentLang === 'ar' ? '• تأشيرة متعددة: 500 ريال لأول 3 أشهر + 200 ريال لكل شهر إضافي' : currentLang === 'ur' ? '• ملٹیپل ویزا: 500 ریال پہلے 3 ماہ + 200 ریال فی اضافی ماہ' : '• Multiple: 500 SAR (first 3 mos) + 200 SAR/mo'}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-6">
                
                {/* Calculation Mode: Duration vs Fixed Date */}
                <div className="bg-paper p-6 rounded-3xl border border-gray-100 space-y-3">
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">
                    {currentLang === 'ar' ? 'طريقة تحديد صلاحية التأشيرة في الجوازات:' : currentLang === 'ur' ? 'ویزا مدت کے تعین کا طریقہ:' : 'Visa Validity Determination Method:'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setVisaCalculationMode('durationDays')}
                      className={`p-4 rounded-2xl border text-left rtl:text-right transition-all ${
                        visaCalculationMode === 'durationDays'
                          ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold shadow-sm'
                          : 'border-gray-200 bg-white text-gray-600'
                      }`}
                    >
                      <div className="text-sm">
                        {currentLang === 'ar' ? 'مدة محددة بالأيام من تاريخ السفر' : currentLang === 'ur' ? 'روانگی سے دنوں کی تعداد (جیسے 60 دن)' : 'Duration in Days from Departure'}
                      </div>
                      <div className="text-xs text-gray-400 font-normal mt-1">
                        {currentLang === 'ar' ? 'مثال: 60 أو 90 يوماً من ختم المطار' : currentLang === 'ur' ? 'ایئرپورٹ پر پاسپورٹ پر مہر لگنے سے' : 'e.g. 60 or 90 days from airport scan'}
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setVisaCalculationMode('fixedReturnDate')}
                      className={`p-4 rounded-2xl border text-left rtl:text-right transition-all ${
                        visaCalculationMode === 'fixedReturnDate'
                          ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold shadow-sm'
                          : 'border-gray-200 bg-white text-gray-600'
                      }`}
                    >
                      <div className="text-sm">
                        {currentLang === 'ar' ? 'العودة قبل تاريخ محدد (هجري / ميلادي)' : currentLang === 'ur' ? 'مخصوص تاریخ سے پہلے واپسی' : 'Return Before Specific Date'}
                      </div>
                      <div className="text-xs text-gray-400 font-normal mt-1">
                        {currentLang === 'ar' ? 'مثال: قبل 20 شعبان أو قبل 30 يونيو' : currentLang === 'ur' ? 'ہجری یا عیسوی تاریخ کی آخری حد' : 'Must enter KSA territory before 23:59'}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Visa Type Selection */}
                <div className="bg-paper p-6 rounded-3xl border border-gray-100 space-y-3">
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">
                    {currentLang === 'ar' ? 'نوع التأشيرة المقررة بالسداد:' : currentLang === 'ur' ? 'تأشیرہ خروج و عودہ کی قسم:' : 'Exit & Re-Entry Visa Classification:'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setVisaType('single')}
                      className={`p-4 rounded-2xl border text-left rtl:text-right transition-all ${
                        visaType === 'single'
                          ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold shadow-sm'
                          : 'border-gray-200 bg-white text-gray-600'
                      }`}
                    >
                      <div className="text-sm">
                        {currentLang === 'ar' ? 'تأشيرة مفردة (سفرة واحدة)' : currentLang === 'ur' ? 'سنگل انٹری (ایک چکر)' : 'Single Entry Visa'}
                      </div>
                      <div className="text-xs text-gray-500 font-normal mt-1">
                        {currentLang === 'ar' ? '200 ريال لأول شهرين + 100 ريال لكل شهر إضافي' : currentLang === 'ur' ? '200 ریال پہلے 2 ماہ + 100 ریال فی اضافی ماہ' : '200 SAR (first 2 mo) + 100 SAR/extra mo'}
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setVisaType('multiple')}
                      className={`p-4 rounded-2xl border text-left rtl:text-right transition-all ${
                        visaType === 'multiple'
                          ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold shadow-sm'
                          : 'border-gray-200 bg-white text-gray-600'
                      }`}
                    >
                      <div className="text-sm">
                        {currentLang === 'ar' ? 'تأشيرة متعددة (سفرات متعددة)' : currentLang === 'ur' ? 'ملٹیپل انٹری (متعدد چکر)' : 'Multiple Entry Visa'}
                      </div>
                      <div className="text-xs text-gray-500 font-normal mt-1">
                        {currentLang === 'ar' ? '500 ريال لأول 3 أشهر + 200 ريال لكل شهر إضافي' : currentLang === 'ur' ? '500 ریال پہلے 3 ماہ + 200 ریال فی اضافی ماہ' : '500 SAR (first 3 mo) + 200 SAR/extra mo'}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Dates Configuration */}
                <div className="bg-paper p-6 rounded-3xl border border-gray-100 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Calendar size={14} className="text-secondary" />
                        <span>{currentLang === 'ar' ? 'تاريخ المغادرة المتوقع:' : currentLang === 'ur' ? 'روانگی کی متوقع تاریخ:' : 'Expected Departure Date:'}</span>
                      </label>
                      <input
                        type="date"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        className="w-full bg-white border border-gray-200 font-bold text-primary text-sm rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    </div>

                    {visaCalculationMode === 'durationDays' ? (
                      <div>
                        <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Clock size={14} className="text-secondary" />
                          <span>{currentLang === 'ar' ? 'المدة بالأيام:' : currentLang === 'ur' ? 'مدت (دنوں میں):' : 'Duration in Days:'}</span>
                        </label>
                        <select
                          value={visaDurationDays}
                          onChange={(e) => setVisaDurationDays(Number(e.target.value))}
                          className="w-full bg-white border border-gray-200 font-bold text-primary text-sm rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                        >
                          <option value={30}>30 {currentLang === 'ar' ? 'يوماً (شهر)' : currentLang === 'ur' ? 'دن (1 ماہ)' : 'Days (1 Month)'}</option>
                          <option value={60}>60 {currentLang === 'ar' ? 'يوماً (شهران)' : currentLang === 'ur' ? 'دن (2 ماہ)' : 'Days (2 Months)'}</option>
                          <option value={90}>90 {currentLang === 'ar' ? 'يوماً (3 أشهر)' : currentLang === 'ur' ? 'دن (3 ماہ)' : 'Days (3 Months)'}</option>
                          <option value={120}>120 {currentLang === 'ar' ? 'يوماً (4 أشهر)' : currentLang === 'ur' ? 'دن (4 ماہ)' : 'Days (4 Months)'}</option>
                          <option value={180}>180 {currentLang === 'ar' ? 'يوماً (6 أشهر)' : currentLang === 'ur' ? 'دن (6 ماہ)' : 'Days (6 Months)'}</option>
                          <option value={240}>240 {currentLang === 'ar' ? 'يوماً (8 أشهر)' : currentLang === 'ur' ? 'دن (8 ماہ)' : 'Days (8 Months)'}</option>
                          <option value={365}>365 {currentLang === 'ar' ? 'يوماً (سنة كاملة)' : currentLang === 'ur' ? 'دن (1 سال)' : 'Days (1 Year)'}</option>
                        </select>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Calendar size={14} className="text-secondary" />
                          <span>{currentLang === 'ar' ? 'تاريخ العودة الأقصى المطلوب:' : currentLang === 'ur' ? 'آخری تاریخ واپسی کا ہدف:' : 'Target Return Date:'}</span>
                        </label>
                        <input
                          type="date"
                          value={fixedReturnTargetDate}
                          onChange={(e) => setFixedReturnTargetDate(e.target.value)}
                          className="w-full bg-white border border-gray-200 font-bold text-primary text-sm rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                        />
                      </div>
                    )}
                  </div>

                  {/* Passport and Iqama Expiry Validation Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-gray-100">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                        {currentLang === 'ar' ? 'تاريخ انتهاء الجواز الحالي:' : currentLang === 'ur' ? 'پاسپورٹ کی تاریخ تنسیخ:' : 'Current Passport Expiry:'}
                      </label>
                      <input
                        type="date"
                        value={passportExpiryDate}
                        onChange={(e) => setPassportExpiryDate(e.target.value)}
                        className={`w-full bg-white border text-sm rounded-2xl p-3 focus:outline-none font-bold ${
                          passportValidityWarning ? 'border-red-400 text-red-900 bg-red-50' : 'border-gray-200 text-primary'
                        }`}
                      />
                      {passportValidityWarning && (
                        <p className="text-[10px] text-red-600 font-bold mt-1">
                          {currentLang === 'ar' ? '⚠️ تنبيه: صلاحية الجواز أقل من الحد النظامي المطلوب للسفر (3 إلى 6 أشهر).' : currentLang === 'ur' ? '⚠️ پاسپورٹ کی مدت قانوناً مطلوبہ مدت (3 تا 6 ماہ) سے کم ہے۔' : '⚠️ Passport validity is below required minimum (3 to 6 months).'}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                        {currentLang === 'ar' ? 'تاريخ انتهاء الإقامة الحالي:' : currentLang === 'ur' ? 'موجودہ اقامہ ایکسپائری تاریخ:' : 'Current Iqama Expiry Date:'}
                      </label>
                      <input
                        type="date"
                        value={iqamaExpiryDate}
                        onChange={(e) => setIqamaExpiryDate(e.target.value)}
                        className={`w-full bg-white border text-sm rounded-2xl p-3 focus:outline-none font-bold ${
                          iqamaValidityWarning ? 'border-amber-400 text-amber-900 bg-amber-50' : 'border-gray-200 text-primary'
                        }`}
                      />
                      {iqamaValidityWarning && (
                        <p className="text-[10px] text-amber-700 font-bold mt-1">
                          {currentLang === 'ar' ? '⚠️ تنبيه: يشترط أن تغطي الإقامة مدة التأشيرة بالإضافة إلى 90 يوماً.' : currentLang === 'ur' ? '⚠️ اقامہ میں ویزا مدت کے علاوہ کم از کم 90 دن کی اضافی میعاد ہونی چاہیے۔' : '⚠️ Iqama must cover visa duration plus at least 90 days buffer.'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Strict 3-Year Ban Advisory */}
                <div className="p-5 rounded-3xl bg-red-50 border border-red-200 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-800 flex items-center justify-center shrink-0">
                    <AlertTriangle size={22} />
                  </div>
                  <div className="text-xs text-red-950 leading-relaxed">
                    <div className="font-bold text-sm mb-1">
                      {currentLang === 'ar' ? 'نظام الجوازات الصارم: عقوبة "خرج ولم يعد" (حرمان 3 سنوات)' : currentLang === 'ur' ? 'جوازات کا سخت قانون: "خرج ولم يعد" (3 سال بلیک لسٹ بین)' : 'Strict Jawazat Penalty: "Exited and Did Not Return" 3-Year Entry Ban'}
                    </div>
                    {currentLang === 'ar' 
                      ? 'إذا تجاوزت تاريخ العودة المحدد دون العودة للمملكة ودون تمديد التأشيرة إلكترونياً عبر منصة أبشر أو مقيم، يتم تسجيلك بنظام "خرج ولم يعد" وتمنع من دخول أراضي المملكة لمدة 3 سنوات كاملة، ما لم تعد على نفس صاحب العمل السابق بتأشيرة جديدة.'
                      : currentLang === 'ur' 
                      ? 'اگر آپ نے ابشر یا مقیم پورٹل سے ویزا میں توسیع کرائے بغیر واپسی کی آخری تاریخ گزار دی تو خودکار طور پر 3 سال کا سفری بین لگ جائے گا، سوائے پرانے کفیل کی جانب سے نئے ویزے پر واپسی کے۔'
                      : 'If you fail to return before the deadline and do not extend online via Absher/Muqeem prior to expiration, an automated 3-year entry ban is imposed under "Kharaj wa Lam Ya\'ud", unless returning on the same previous employer with a fresh visa.'}
                  </div>
                </div>

              </div>

              {/* Deadline & Safety Card Column */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-primary text-white p-8 rounded-[2.5rem] shadow-2xl border border-emerald-700/40 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-widest border border-white/10">
                        {currentLang === 'ar' ? 'موعد العودة النهائي المصرح به' : currentLang === 'ur' ? 'قانونی آخری تاریخ واپسی' : 'Absolute Return Deadline'}
                      </span>
                      <span className="text-xs text-emerald-300 font-mono">
                        {actualDaysDuration} {currentLang === 'ar' ? 'يوماً' : currentLang === 'ur' ? 'دن' : 'Days'}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className="text-xs text-white/70 uppercase tracking-widest font-semibold">
                        {currentLang === 'ar' ? 'آخر لحظة لدخول المنافذ السعودية (23:59):' : currentLang === 'ur' ? 'سعودی ائیرپورٹ داخلے کی آخری حتمی تاریخ:' : 'Must Clear Saudi Border Control Before:'}
                      </div>
                      
                      <div className="text-2xl md:text-3xl font-serif font-bold text-amber-300 border-b border-white/15 pb-4 leading-snug">
                        {formattedReturnDate}
                      </div>

                      {/* Recommended Safe Flight Buffer Date */}
                      <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1.5">
                        <div className="text-xs font-bold text-emerald-200 uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 size={15} className="text-emerald-300" />
                          <span>{currentLang === 'ar' ? 'الموعد الآمن لتفادي إلغاء الطيران (عازل 5 أيام):' : currentLang === 'ur' ? 'محفوظ ترین پرواز کی تاریخ (5 دن پہلے):' : 'Safe Recommended Flight Date (5-Day Buffer):'}</span>
                        </div>
                        <div className="text-xl font-bold text-white">
                          {formattedSafeDate}
                        </div>
                        <p className="text-[11px] text-white/70 leading-relaxed font-light">
                          {currentLang === 'ar'
                            ? 'احجز تذكرتك قبل 5 أيام على الأقل من انتهاء التأشيرة لتفادي أي تأخير أو تغيير في جداول الرحلات والترانزيت.'
                            : currentLang === 'ur'
                            ? 'فلائٹ منسوخی، تاخیر یا ٹرانزٹ مسائل سے محفوظ رہنے کے لیے ہمیشہ کم از کم 5 دن پہلے واپسی کی سیٹ بک کروائیں۔'
                            : 'Always book flights at least 5 days prior to protect against transit delays, technical airline disruptions, or weather cancellations.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/15 mt-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs text-white/75">
                        {currentLang === 'ar' ? 'رسوم التأشيرة الحكومية (سداد):' : currentLang === 'ur' ? 'ویزا سرکاری فیس (سداد):' : 'Government Visa SADAD Fee:'}
                      </span>
                      <span className="text-2xl font-bold font-mono text-amber-300">{exitVisaFeeSar} SAR</span>
                    </div>

                    <div className="p-3 bg-black/20 rounded-2xl text-[11px] text-white/80 space-y-1">
                      <div className="flex justify-between">
                        <span>{currentLang === 'ar' ? 'التمديد خارج المملكة:' : currentLang === 'ur' ? 'باہر سے ویزا میں توسیع:' : 'Extension while Abroad:'}</span>
                        <span className="font-bold text-emerald-200">
                          {visaType === 'single' ? '100 SAR/month' : '200 SAR/month'}
                        </span>
                      </div>
                      <div className="text-[10px] text-white/60">
                        {currentLang === 'ar' ? 'عبر منصة أبشر أو مقيم شريطة سريان الإقامة' : currentLang === 'ur' ? 'ابشر یا مقیم پورٹل سے ممکن ہے، اقامہ کا کارآمد ہونا لازمی ہے' : 'Via Absher / Muqeem portal provided Iqama is still valid'}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-white/80 pt-3 mt-3 border-t border-white/10">
                      <span>{currentLang === 'ar' ? 'فحص الصلاحية برقم الجواز:' : currentLang === 'ur' ? 'پاسپورٹ نمبر سے آن لائن چیک:' : 'Direct Online Passport Inquiry:'}</span>
                      <a
                        href="https://muqeem.sa/#/visa-validity/check"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-amber-300 hover:underline font-bold"
                      >
                        <span>Muqeem Portal</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: QIWA LABOR LAW GRATUITY (ESB) REFINED CALCULATOR */}
        {/* ========================================================================= */}
        {activeTab === 'gratuity' && (
          <div className="mt-8 space-y-8 relative z-10">
            {/* Inline Statutory Formula Definition Banner */}
            <div className="p-5 md:p-6 rounded-3xl bg-emerald-50/80 border border-emerald-200/80 shadow-xs relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Scale size={18} className="text-emerald-800" />
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-950">
                    {currentLang === 'ar' ? 'المعادلة الحسابية النظامية (المادتان 84 و 85 من نظام العمل):' : currentLang === 'ur' ? 'سرکاری گریجویٹی فارمولہ (سعودی لیبر لاء آرٹیکل 84 و 85):' : 'Official Statutory Gratuity Formula (Articles 84 & 85, Labor Law):'}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                  Royal Decree No. M/51
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-emerald-100 font-mono text-xs sm:text-sm text-emerald-950 font-bold tracking-tight shadow-2xs">
                <code>EOSB = (Last Salary ÷ 2) × Min(Years, 5) + (Last Salary × Max(Years - 5, 0)) × Resignation Ratio</code>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-emerald-800 font-medium">
                <span>{currentLang === 'ar' ? '• أول 5 سنوات: نصف أجر شهري' : currentLang === 'ur' ? '• پہلے 5 سال: آدھی ماہانہ تنخواہ' : '• First 5 Years: ½ Month Wage'}</span>
                <span>{currentLang === 'ar' ? '• بعد 5 سنوات: أجر شهر كامل' : currentLang === 'ur' ? '• 5 سال بعد: مکمل ماہانہ تنخواہ' : '• After 5 Years: 1 Full Month Wage'}</span>
                <span>{currentLang === 'ar' ? '• تدرج الاستقالة: 0% (&lt;2س) | 33% (2-5س) | 66% (5-10س) | 100% (+10س)' : currentLang === 'ur' ? '• استعفیٰ کٹوتی: 0% (&lt;2 سال) | 33% (2-5 سال) | 66% (5-10 سال) | 100% (+10 سال)' : '• Resignation Tiers: 0% (<2y) | 33% (2-5y) | 66% (5-10y) | 100% (10y+)'}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-6">
                
                {/* Termination Reason - Fully compliant with Articles 80, 81, 84, 85, 87 */}
                <div className="bg-paper p-6 rounded-3xl border border-gray-100 space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                      {currentLang === 'ar' ? 'السبب النظامي لانتهاء العلاقة التعاقدية:' : currentLang === 'ur' ? 'ملازمت ختم ہونے کی قانونی وجہ:' : 'Legal Ground for Employment Separation:'}
                    </label>
                    <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      Labor Law Royal Decree M/51
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <button
                      type="button"
                      onClick={() => setTerminationReason('contractEnd')}
                      className={`w-full p-4 rounded-2xl border text-left rtl:text-right transition-all ${
                        terminationReason === 'contractEnd'
                          ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold shadow-sm'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-sm">
                        {currentLang === 'ar' ? '١. انتهاء مدة العقد المحدد دون تجديد من الطرفين أو من صاحب العمل (المادة 84)' : currentLang === 'ur' ? '۱. معاہدہ کی مدت مکمل ہونا یا کمپنی کی طرف سے تجدید نہ ہونا (آرٹیکل 84)' : '1. Contract Expiration or Non-Renewal by Employer (Article 84)'}
                      </div>
                      <div className="text-xs text-gray-500 font-normal mt-1">
                        {currentLang === 'ar' ? 'استحقاق كامل بنسبة 100% لمكافأة نهاية الخدمة دون أي خصم' : currentLang === 'ur' ? '100 فیصد مکمل گریجویٹی بغیر کسی کٹوتی کے' : 'Full 100% award entitlement without deductions'}
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setTerminationReason('employerTermination')}
                      className={`w-full p-4 rounded-2xl border text-left rtl:text-right transition-all ${
                        terminationReason === 'employerTermination'
                          ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold shadow-sm'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-sm">
                        {currentLang === 'ar' ? '٢. إنهاء العقد من طرف صاحب العمل لسبب غير مشروع أو تصفية (المادتان 84 و77)' : currentLang === 'ur' ? '۲. کمپنی کی طرف سے بلا جواز برطرفی یا ادارہ بند ہونا (آرٹیکل 84 اور 77)' : '2. Termination by Employer / Redundancy without Article 80 cause'}
                      </div>
                      <div className="text-xs text-gray-500 font-normal mt-1">
                        {currentLang === 'ar' ? 'استحقاق كامل 100% + تعويض المادة 77 + أجر فترة الإنذار' : currentLang === 'ur' ? '100 فیصد مکمل گریجویٹی + ہرجانہ + نوٹس پیریڈ تنخواہ' : 'Full 100% gratuity + Article 77 compensation + notice wage'}
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setTerminationReason('resignation')}
                      className={`w-full p-4 rounded-2xl border text-left rtl:text-right transition-all ${
                        terminationReason === 'resignation'
                          ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold shadow-sm'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-sm">
                        {currentLang === 'ar' ? '٣. استقالة اختيارية اعتيادية من طرف العامل (المادة 85)' : currentLang === 'ur' ? '۳. ملازم کی اپنی مرضی سے عام استعفیٰ (آرٹیکل 85)' : '3. Standard Voluntary Resignation by Employee (Article 85)'}
                      </div>
                      <div className="text-xs text-gray-500 font-normal mt-1">
                        {currentLang === 'ar' ? 'متدرجة: 0% (أقل من سنتين)، ثلث (2-5 سنين)، ثلثين (5-10 سنين)، 100% (أكثر من 10 سنين)' : currentLang === 'ur' ? '2 سال سے کم 0، 2 تا 5 سال ایک تہائی، 5 تا 10 سال دو تہائی، 10 سال بعد مکمل' : 'Graduated: 0 (<2 yrs), 1/3 (2-5 yrs), 2/3 (5-10 yrs), 100% (>10 yrs)'}
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setTerminationReason('article81')}
                      className={`w-full p-4 rounded-2xl border text-left rtl:text-right transition-all ${
                        terminationReason === 'article81'
                          ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold shadow-sm'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-sm text-emerald-900">
                        {currentLang === 'ar' ? '٤. استقالة مشروعة فورية دون إشعار بموجب المادة 81 (تأخر الرواتب 3 أشهر / إخلال صاحب العمل)' : currentLang === 'ur' ? '۴. آرٹیکل 81 کے تحت فوری استعفیٰ (3 ماہ تنخواہ بندش یا کمپنی کی خلاف ورزی)' : '4. Immediate Resignation under Article 81 (3 Mos Unpaid Wages / Employer Breach)'}
                      </div>
                      <div className="text-xs text-gray-500 font-normal mt-1">
                        {currentLang === 'ar' ? 'استحقاق 100% كامل للمكافأة، إعفاء تام من الإنذار، ونقل كفالة فوري عبر قوى' : currentLang === 'ur' ? '100 فیصد مکمل گریجویٹی، نوٹس پیریڈ معاف، اور قویٰ پر فوری کفالہ ٹرانسفر' : 'Full 100% gratuity, zero notice penalty, and instant Qiwa job mobility'}
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setTerminationReason('femaleMarriageOrChild')}
                      className={`w-full p-4 rounded-2xl border text-left rtl:text-right transition-all ${
                        terminationReason === 'femaleMarriageOrChild'
                          ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold shadow-sm'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-sm">
                        {currentLang === 'ar' ? '٥. استقالة العاملة خلال 6 أشهر من الزواج أو 3 أشهر من الوضع (المادة 87)' : currentLang === 'ur' ? '۵. خاتون ملازمہ کا شادی کے 6 ماہ یا پیدائش کے 3 ماہ کے اندر استعفیٰ (آرٹیکل 87)' : '5. Female Employee Resignation within 6 Mos of Marriage / 3 Mos of Childbirth (Art 87)'}
                      </div>
                      <div className="text-xs text-gray-500 font-normal mt-1">
                        {currentLang === 'ar' ? 'استحقاق كامل بنسبة 100% بغض النظر عن مدة الخدمة' : currentLang === 'ur' ? 'ملازمت کے سالوں سے قطع نظر 100 فیصد مکمل گریجویٹی' : 'Full 100% award regardless of total service duration'}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Salary Details (Article 84 Definition) */}
                <div className="bg-paper p-6 rounded-3xl border border-gray-100 space-y-4">
                  <div className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                    {currentLang === 'ar' ? 'بيانات الأجر المحتسب نظاماً (المادة 84):' : currentLang === 'ur' ? 'قانون کے مطابق بنیادی تنخواہ اور الاؤنسز:' : 'Calculated Gross Wage Details (Labor Law Article 84):'}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5">
                        {currentLang === 'ar' ? 'الراتب الأساسي (SAR):' : currentLang === 'ur' ? 'بنیادی تنخواہ (SAR):' : 'Basic Monthly Salary (SAR):'}
                      </label>
                      <input
                        type="number"
                        min={0}
                        step={100}
                        value={basicSalary}
                        onChange={(e) => setBasicSalary(Number(e.target.value) || 0)}
                        className="w-full bg-white border border-gray-200 font-bold text-primary text-sm rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5">
                        {currentLang === 'ar' ? 'بدل السكن الفعلي (SAR):' : currentLang === 'ur' ? 'ہاؤسنگ الاؤنس (SAR):' : 'Housing Allowance (SAR):'}
                      </label>
                      <input
                        type="number"
                        min={0}
                        step={50}
                        value={housingAllowance}
                        onChange={(e) => setHousingAllowance(Number(e.target.value) || 0)}
                        className="w-full bg-white border border-gray-200 font-bold text-primary text-sm rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    </div>
                  </div>

                  <p className="text-[10px] text-gray-400">
                    {currentLang === 'ar' 
                      ? 'ملاحظة قانونية: تنص المادة 84 على أن الأجر المعتمد لحساب المكافأة هو الأجر الفعلي الأخير متضمناً الراتب الأساسي والبدلات الثابتة (السكن).'
                      : currentLang === 'ur' 
                      ? 'قانونی وضاحت: آرٹیکل 84 کے تحت گریجویٹی آخری تنخواہ پر لگتی ہے جس میں بنیادی تنخواہ اور رہائش الاؤنس لازمی شامل ہیں۔'
                      : 'Legal Rule: Under Article 84, ESB is computed on the final actual wage, which strictly includes basic salary plus fixed housing.'}
                  </p>
                </div>

                {/* Service Tenure Duration */}
                <div className="bg-paper p-6 rounded-3xl border border-gray-100 space-y-4">
                  <div className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                    {currentLang === 'ar' ? 'مدة الخدمة المستمرة:' : currentLang === 'ur' ? 'کل ملازمت کا دورانیہ:' : 'Continuous Length of Service:'}
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">
                        {currentLang === 'ar' ? 'سنوات:' : currentLang === 'ur' ? 'سال:' : 'Years:'}
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={50}
                        value={serviceYears}
                        onChange={(e) => setServiceYears(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full bg-white border border-gray-200 font-bold text-primary text-sm rounded-2xl p-3"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">
                        {currentLang === 'ar' ? 'أشهر:' : currentLang === 'ur' ? 'مہینے:' : 'Months:'}
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={11}
                        value={serviceMonths}
                        onChange={(e) => setServiceMonths(Math.min(11, Math.max(0, parseInt(e.target.value) || 0)))}
                        className="w-full bg-white border border-gray-200 font-bold text-primary text-sm rounded-2xl p-3"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">
                        {currentLang === 'ar' ? 'أيام:' : currentLang === 'ur' ? 'دن:' : 'Days:'}
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={30}
                        value={serviceDays}
                        onChange={(e) => setServiceDays(Math.min(30, Math.max(0, parseInt(e.target.value) || 0)))}
                        className="w-full bg-white border border-gray-200 font-bold text-primary text-sm rounded-2xl p-3"
                      />
                    </div>
                  </div>

                  {/* Unused annual leave days encashment (Article 111) */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <label className="text-xs font-bold text-gray-600 block">
                        {currentLang === 'ar' ? 'رصيد الإجازات السنوية غير المستنفذة (أيام):' : currentLang === 'ur' ? 'سالانہ چھٹیوں کے بقایا دن (کیش الاؤنس):' : 'Accrued Unused Annual Leave Days (Art 111):'}
                      </label>
                      <span className="text-[10px] text-gray-400">
                        {currentLang === 'ar' ? 'يستحق العامل أجرها الفعلي عن كل يوم' : currentLang === 'ur' ? 'ہر غیر استعمال شدہ چھٹی کا پورا معاوضہ' : 'Paid at full daily gross wage'}
                      </span>
                    </div>
                    <input
                      type="number"
                      min={0}
                      max={120}
                      value={unusedLeaveDays}
                      onChange={(e) => setUnusedLeaveDays(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-24 bg-white border border-gray-200 font-bold text-primary text-sm rounded-2xl p-2.5 text-center"
                    />
                  </div>
                </div>

              </div>

              {/* Settlement Award Output Card Column */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-primary text-white p-8 rounded-[2.5rem] shadow-2xl border border-emerald-700/40 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-widest border border-white/10">
                        {currentLang === 'ar' ? 'مستحقات التصفية العمالية' : currentLang === 'ur' ? 'لیبر سیٹلمنٹ ایوارڈ' : 'Final Settlement Breakdown'}
                      </span>
                      <span className="text-xs text-emerald-300 font-mono">
                        {serviceYears}y {serviceMonths}m {serviceDays}d
                      </span>
                    </div>

                    <div className="space-y-3.5 text-sm font-light border-b border-white/15 pb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">
                          {currentLang === 'ar' ? 'الأجر المحتسب (أساسي + سكن):' : currentLang === 'ur' ? 'شمار کردہ تنخواہ:' : 'Calculated Gross Monthly Wage:'}
                        </span>
                        <span className="font-mono font-bold text-white">{grossWageForESB.toLocaleString()} SAR</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-white/80">
                          {currentLang === 'ar' ? 'المكافأة الأساسية (المادة 84 كاملة):' : currentLang === 'ur' ? 'بنیادی گریجویٹی (آرٹیکل 84):' : 'Full Base Award (Art 84):'}
                        </span>
                        <span className="font-mono font-bold text-white">{Math.round(baseGratuity).toLocaleString()} SAR</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-white/80">
                          {currentLang === 'ar' ? 'نسبة الاستحقاق المطبقة:' : currentLang === 'ur' ? 'لاگو شدہ فیصد:' : 'Applied Entitlement Ratio:'}
                        </span>
                        <span className="font-mono font-bold text-amber-300">{(payoutMultiplier * 100).toFixed(1)}%</span>
                      </div>

                      <div className="flex justify-between items-center text-xs text-emerald-200">
                        <span>{currentLang === 'ar' ? 'صافي مكافأة نهاية الخدمة:' : currentLang === 'ur' ? 'خالص گریجویٹی رقم:' : 'Net Gratuity Award:'}</span>
                        <span className="font-mono font-bold">{finalGratuitySar.toLocaleString()} SAR</span>
                      </div>

                      {unusedLeaveDays > 0 && (
                        <div className="flex justify-between items-center text-xs text-amber-200 pt-2 border-t border-white/10">
                          <span>{currentLang === 'ar' ? `بدل رصيد الإجازات (${unusedLeaveDays} يوم):` : currentLang === 'ur' ? `چھٹیوں کے بقایاجات (${unusedLeaveDays} دن):` : `Unused Leave Pay (${unusedLeaveDays} days):`}</span>
                          <span className="font-mono font-bold">{unusedLeavePaySar.toLocaleString()} SAR</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 p-3.5 rounded-2xl bg-white/10 border border-white/15 text-xs text-emerald-100 leading-relaxed font-light">
                      <div className="font-bold text-amber-300 mb-0.5">{legalReference}</div>
                      {explanation}
                    </div>
                  </div>

                  <div className="pt-6">
                    <div className="text-xs text-white/60 uppercase tracking-widest font-semibold mb-1">
                      {currentLang === 'ar' ? 'إجمالي مستحقات التصفية النهائية للعامل:' : currentLang === 'ur' ? 'ورکر کو کل واجب الادا حتمی رقم:' : 'Total Final Settlement Due to Expat:'}
                    </div>
                    <div className="text-3xl md:text-4xl font-serif font-bold text-amber-300">
                      {totalSettlementDueSar.toLocaleString()} <span className="text-lg font-sans text-white">SAR</span>
                    </div>

                    {selectedCountry.id !== 'gcc' && (
                      <div className="mt-4 p-3.5 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-between">
                        <span className="text-xs text-emerald-200">
                          {currentLang === 'ar' ? `المعادل بالعملة (${selectedCountry.currencyCode}):` : currentLang === 'ur' ? `آبائی کرنسی میں کل رقم (${selectedCountry.currencyCode}):` : `In ${selectedCountry.currencyCode}:`}
                        </span>
                        <span className="text-lg font-bold text-white font-mono">
                          ≈ {totalSettlementDueLocal.toLocaleString()} {selectedCountry.currencyCode}
                        </span>
                      </div>
                    )}

                    <p className="text-[11px] text-white/70 mt-4 leading-relaxed font-light">
                      {currentLang === 'ar'
                        ? 'ملاحظة ملزمة: تنص المادة 88 على وجوب تصفية وصرف كافة المستحقات خلال أسبوع من إنهاء العقد، أو أسبوعين كحد أقصى في حال الاستقالة، تحت طائلة الغرامات في المحكمة العمالية عبر منصة ناجز.'
                        : currentLang === 'ur'
                        ? 'آرٹیکل 88: کمپنی معاہدہ ختم ہونے پر 1 ہفتے کے اندر (استعفیٰ پر 2 ہفتوں میں) تمام رقم ادا کرنے کی پابند ہے۔ تاخیر پر ناجز لیبر کورٹ سے فوری کارروائی ہو سکتی ہے۔'
                        : 'Article 88 mandates that all final dues must be settled within 1 week of employer contract termination (or 2 weeks in resignation), enforceable via Najiz Labor Court.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: COUNTRY-SPECIFIC VERIFICATION MATRIX (RULE[AGENTS_md] COMPLIANT) */}
        {/* ========================================================================= */}
        {activeTab === 'countryMatrix' && (
          <div className="mt-8 space-y-6 relative z-10">
            <div className="p-6 rounded-3xl bg-paper border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-primary">
                  {currentLang === 'ar' 
                    ? 'جدول متطلبات وإجراءات الاستقدام والإقامة المعتمدة حسب الدول 2026' 
                    : currentLang === 'ur' 
                    ? 'مختلف ممالک کے لیے ویزا، میڈیکل اور اسکل ویریفکیشن کی شرائط 2026' 
                    : 'Official KSA Country-Specific Expat Requirements Matrix 2026'}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {currentLang === 'ar'
                    ? 'مقارنة شاملة لمتطلبات الفحص الطبي المعتمد (وافد/جامكا)، الفحص المهني للحرفيين (SVP)، وشهادات عدم المحكومية واعتماد الهيئات المهنية.'
                    : currentLang === 'ur'
                    ? 'وافد میڈیکل، پولیس کلیرنس (PCC)، اسکل ویریفکیشن اور پیشہ ورانہ کونسل رجسٹریشن کی تصدیق شدہ فہرست۔'
                    : 'Exhaustive comparative framework covering Wafid/GAMCA medical fitness, Skill Verification Program (SVP), and Police Clearance across nationalities.'}
                </p>
              </div>
              
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-950 px-4 py-2.5 rounded-2xl text-xs font-bold shrink-0">
                <ShieldCheck size={16} className="text-emerald-800" />
                <span>Verified HRSD & MOFA Grounded</span>
              </div>
            </div>

            {/* Standard GFM Table Structure compliant with RULE[AGENTS_md] */}
            <div className="overflow-x-auto rounded-3xl border border-gray-100 shadow-xl">
              <table className="w-full text-left rtl:text-right text-xs md:text-sm">
                <thead className="bg-primary text-secondary font-serif">
                  <tr>
                    <th className="p-4 md:p-5 font-bold">{currentLang === 'ar' ? 'الدولة والجالية' : currentLang === 'ur' ? 'ملک اور کمیونٹی' : 'Country & Community'}</th>
                    <th className="p-4 md:p-5 font-bold text-center">{currentLang === 'ar' ? 'فحص وافد / جامكا الطبي' : currentLang === 'ur' ? 'وافد / گامکا میڈیکل' : 'Wafid/GAMCA Medical'}</th>
                    <th className="p-4 md:p-5 font-bold text-center">{currentLang === 'ar' ? 'شهادة السوابق (PCC)' : currentLang === 'ur' ? 'پولیس سرٹیفکیٹ (PCC)' : 'Police Clearance (PCC)'}</th>
                    <th className="p-4 md:p-5 font-bold text-center">{currentLang === 'ar' ? 'الفحص المهني (SVP)' : currentLang === 'ur' ? 'اسکل ویریفکیشن (SVP)' : 'Skill Test (SVP)'}</th>
                    <th className="p-4 md:p-5 font-bold">{currentLang === 'ar' ? 'أبرز الإجراءات الخاصة' : currentLang === 'ur' ? 'اہم خصوصی قواعد و ضوابط' : 'Key Regulatory Directives'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {NATIONALITIES.map((nat, nIdx) => (
                    <tr key={`nat-table-row-${nat.id}-${nIdx}`} className="even:bg-gray-50/50 hover:bg-emerald-50/40 transition-colors">
                      <td className="p-4 md:p-5 font-bold text-primary whitespace-nowrap">
                        <span className="text-lg mr-2 rtl:ml-2">{nat.flag}</span>
                        <span>{nat.name[currentLang]}</span>
                      </td>
                      <td className="p-4 md:p-5 text-center">
                        {nat.requiresGamca ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-bold text-xs border border-emerald-100">
                            <Check size={12} /> {currentLang === 'ar' ? 'إلزامي (وافد)' : currentLang === 'ur' ? 'لازمی' : 'Mandatory'}
                          </span>
                        ) : (
                          <span className="text-gray-400 font-medium text-xs">
                            {currentLang === 'ar' ? 'غير مطلوب' : currentLang === 'ur' ? 'غیر ضروری' : 'Not Required'}
                          </span>
                        )}
                      </td>
                      <td className="p-4 md:p-5 text-center">
                        {nat.requiresPcc ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-bold text-xs border border-emerald-100">
                            <Check size={12} /> {currentLang === 'ar' ? 'مطلوب' : currentLang === 'ur' ? 'مطلوب' : 'Required'}
                          </span>
                        ) : (
                          <span className="text-gray-400 font-medium text-xs">
                            {currentLang === 'ar' ? 'حسب المهنة' : currentLang === 'ur' ? 'حسب ضرورت' : 'Discretionary'}
                          </span>
                        )}
                      </td>
                      <td className="p-4 md:p-5 text-center">
                        {nat.requiresSvp ? (
                          <span className="inline-flex items-center gap-1 text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full font-bold text-xs border border-amber-200">
                            <Sparkles size={12} /> {currentLang === 'ar' ? 'مرحلي (مهن فنية)' : currentLang === 'ur' ? 'تکنیکی پیشے' : 'Active (Trades)'}
                          </span>
                        ) : (
                          <span className="text-gray-400 font-medium text-xs">
                            {currentLang === 'ar' ? 'مستثنى' : currentLang === 'ur' ? 'مستثنیٰ' : 'Exempt'}
                          </span>
                        )}
                      </td>
                      <td className="p-4 md:p-5 text-xs text-gray-600 leading-relaxed max-w-xs md:max-w-md">
                        {nat.notes[currentLang]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: LEGAL FAQ & ANTI-MISINFORMATION GUIDELINES */}
        {/* ========================================================================= */}
        {activeTab === 'faq' && (
          <div className="mt-8 space-y-6 relative z-10">
            <div className="p-6 rounded-3xl bg-paper border border-gray-100">
              <h3 className="text-xl md:text-2xl font-serif font-bold text-primary mb-2">
                {currentLang === 'ar' ? 'الأسئلة الأكثر بحثاً وتدقيقاً حول الإقامة والتأشيرات والعمل' : currentLang === 'ur' ? 'اقامہ، ویزا اور لیبر لاء کے سب سے اہم سوالات اور مصدقہ جوابات' : 'Frequently Researched KSA Legal Inquiries & Verified Answers'}
              </h3>
              <p className="text-xs text-gray-500">
                {currentLang === 'ar'
                  ? 'إجابات مبنية حصراً على نصوص نظام العمل واللوائح التنفيذية للمديرية العامة للجوازات لمنع الشائعات والمعلومات المغلوطة.'
                  : currentLang === 'ur'
                  ? 'غلط فہمیوں اور افواہوں کے سدباب کے لیے سعودی قوانین اور سرکاری ضوابط پر مبنی مصدقہ رہنمائی۔'
                  : 'Grounded strictly in Saudi Labor Law (Decree M/51) and official Jawazat executive circulars to ensure zero misinformation.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  q: {
                    en: 'Can an expat transfer sponsorship without current employer consent?',
                    ar: 'هل يحق للعامل الوافد نقل الكفالة في قوى دون موافقة صاحب العمل؟',
                    ur: 'کیا ملازم اپنے موجودہ کفیل کی اجازت کے بغیر قویٰ سے کفالہ ٹرانسفر کر سکتا ہے؟'
                  },
                  a: {
                    en: 'Yes, under official HRSD rules: if the digital contract is not authenticated on Qiwa, if salary is unpaid for 3 consecutive months, if the employer is in the Red Nitaqat zone, or if the Iqama/work permit has expired.',
                    ar: 'نعم، وفق ضوابط وزارة الموارد البشرية: إذا لم يتم توثيق العقد على قوى، أو تأخر الراتب 3 أشهر متتالية، أو وقعت المنشأة في النطاق الأحمر، أو انتهت الإقامة ورخصة العمل دون تجديد.',
                    ur: 'جی ہاں، قویٰ کے سرکاری قوانین کے تحت: اگر ڈیجیٹل کنٹریکٹ تصدیق نہ ہو، لگاتار 3 ماہ تنخواہ نہ ملے، کمپنی ریڈ کیٹیگری میں ہو، یا اقامہ ختم ہو چکا ہو۔'
                  }
                },
                {
                  q: {
                    en: 'What happens if exit re-entry visa expires outside Saudi Arabia?',
                    ar: 'ما هي العقوبة النظامية لانتهاء تأشيرة الخروج والعودة خارج المملكة؟',
                    ur: 'اگر خروج و عودہ کی میعاد سعودی عرب سے باہر ختم ہو جائے تو کیا ہوتا ہے؟'
                  },
                  a: {
                    en: 'The expat is marked as "Exited and Did Not Return" (Kharaj wa Lam Ya\'ud), triggering an automatic 3-year ban from entering Saudi Arabia, unless returning on a new visa issued by the same sponsor.',
                    ar: 'يُسجل العامل آلياً بنظام الجوازات كـ "خرج ولم يعد"، مما يترتب عليه حرمان من دخول المملكة لمدة 3 سنوات، إلا إذا استقدمه صاحب العمل السابق نفسه بتأشيرة جديدة.',
                    ur: 'ملازم کو "خرج ولم يعد" لسٹ میں ڈال کر 3 سال کے لیے سعودی عرب داخلے پر خودکار پابندی لگا دی جاتی ہے، سوائے اسی پرانے کفیل کی جانب سے نئے ویزے پر واپسی کے۔'
                  }
                },
                {
                  q: {
                    en: 'Are sons and daughters of Saudi mothers subject to expat fees?',
                    ar: 'هل يُعامل أبناء المواطنات السعوديات كوافدين في الرسوم ونطاقات؟',
                    ur: 'کیا سعودی ماں کی غیر ملکی اولاد پر اقامہ اور فیملی فیس لاگو ہوتی ہے؟'
                  },
                  a: {
                    en: 'No. Royal decrees exempt them 100% from the Expatriate Worker Levy (800/700 SAR) and Dependent Fees. They are counted as Saudi nationals in Nitaqat localization quotas.',
                    ar: 'لا، صدرت أوامر ملكية بإعفائهم تماماً من المقابل المالي ورسوم المرافقين، ويُعاملون كـ مواطنين سعوديين في حساب نسب التوطين بنظام نطاقات.',
                    ur: 'نہیں، شاہی احکامات کے تحت وہ ورک لیوی اور فیملی فیس سے 100 فیصد مکمل مستثنیٰ ہیں، اور نطاقات میں سعودی شہریوں کے برابر گنے جاتے ہیں۔'
                  }
                },
                {
                  q: {
                    en: 'When must End of Service Gratuity be paid to the departing expat?',
                    ar: 'متى يلزم صاحب العمل نظاماً بصرف مكافأة نهاية الخدمة؟',
                    ur: 'ملازمت ختم ہونے کے بعد گریجویٹی ادا کرنے کی سرکاری آخری مدت کیا ہے؟'
                  },
                  a: {
                    en: 'Under Article 88 of the Labor Law, employers must settle all end-of-service dues within 1 week of employer contract termination, or within 2 weeks if the employee resigned.',
                    ar: 'تنص المادة 88 على صرف المستحقات كاملة خلال أسبوع واحد إذا أنهى صاحب العمل العقد، أو خلال أسبوعين إذا استقال العامل، تحت طائلة التقاضي في المحكمة العمالية عبر ناجز.',
                    ur: 'سعودی لیبر لاء آرٹیکل 88 کے مطابق کمپنی ملازمت ختم ہونے پر 1 ہفتے کے اندر (استعفیٰ کی صورت میں 2 ہفتوں میں) تمام واجبات ادا کرنے کی پابند ہے۔'
                  }
                }
              ].map((faqItem, idx) => (
                <div key={`expat-calc-faq-${idx}`} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
                  <div className="flex items-center gap-2.5 text-primary font-bold text-base md:text-lg">
                    <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-mono shrink-0">
                      Q{idx + 1}
                    </span>
                    <h4>{faqItem.q[currentLang]}</h4>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed pl-9 rtl:pr-9 rtl:pl-0 font-light">
                    {faqItem.a[currentLang]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BOTTOM UTILITY & VERIFIED PORTAL BAR */}
        {/* ========================================================================= */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleShareWhatsApp}
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg transition-transform hover:scale-105 active:scale-95 text-xs uppercase tracking-wider"
            >
              <Share2 size={16} />
              <span>{currentLang === 'ar' ? 'مشاركة عبر واتساب' : currentLang === 'ur' ? 'واٹس ایپ پر شیئر کریں' : 'Share on WhatsApp'}</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 bg-paper hover:bg-gray-200 text-primary font-bold px-5 py-3.5 rounded-2xl border border-gray-200 transition-colors text-xs uppercase tracking-wider"
            >
              {copiedLink ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
              <span>{copiedLink ? (currentLang === 'ar' ? 'تم النسخ!' : currentLang === 'ur' ? 'لنک کاپی ہو گیا!' : 'Copied!') : (currentLang === 'ar' ? 'نسخ رابط الحاسبة' : currentLang === 'ur' ? 'کیلکولیٹر کا لنک کاپی کریں' : 'Copy Tool Link')}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 bg-paper hover:bg-gray-200 text-gray-700 font-bold px-4 py-3.5 rounded-2xl border border-gray-200 transition-colors text-xs uppercase tracking-wider"
            >
              <Printer size={16} />
              <span>{currentLang === 'ar' ? 'طباعة الكشف' : currentLang === 'ur' ? 'پرنٹ کریں' : 'Print Statement'}</span>
            </button>
          </div>

          {/* Official Verification Badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
            <span className="font-bold text-gray-400 uppercase tracking-widest">{currentLang === 'ar' ? 'الروابط الرسمية:' : currentLang === 'ur' ? 'سرکاری تصدیق:' : 'Verified Portals:'}</span>
            <a href="https://absher.sa" target="_blank" rel="noopener noreferrer" className="hover:text-primary underline flex items-center gap-1 font-semibold">
              Absher <ExternalLink size={11} />
            </a>
            <span>•</span>
            <a href="https://qiwa.sa" target="_blank" rel="noopener noreferrer" className="hover:text-primary underline flex items-center gap-1 font-semibold">
              Qiwa <ExternalLink size={11} />
            </a>
            <span>•</span>
            <a href="https://muqeem.sa" target="_blank" rel="noopener noreferrer" className="hover:text-primary underline flex items-center gap-1 font-semibold">
              Muqeem <ExternalLink size={11} />
            </a>
            <span>•</span>
            <a href="https://cchi.gov.sa" target="_blank" rel="noopener noreferrer" className="hover:text-primary underline flex items-center gap-1 font-semibold">
              CCHI <ExternalLink size={11} />
            </a>
            <span>•</span>
            <a href="https://musaned.com.sa" target="_blank" rel="noopener noreferrer" className="hover:text-primary underline flex items-center gap-1 font-semibold">
              Musaned <ExternalLink size={11} />
            </a>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-[11px] text-gray-400 leading-relaxed font-light text-center">
          {currentLang === 'ar'
            ? 'إخلاء مسؤولية نظامي: هذا المحاكي الاستشاري أداة حسابية مستقلة مطابقة للأنظمة الرسمية الصادرة عن وزارات المملكة العربية السعودية (الموارد البشرية، الداخلية، الصحة، الزكاة والضريبة). يتم سداد الرسوم الفعلية عبر القنوات المصرفية المعتمدة ونظام سداد.'
            : currentLang === 'ur'
            ? 'قانونی ڈسکلیمر: یہ کیلکولیٹر سعودی عرب کی متعلقہ وزارتوں (افرادی قوت، پاسپورٹ جوازات، کونسل آف ہیلتھ انشورنس) کے جاری کردہ قوانین کے عین مطابق آزادانہ معلوماتی ٹول ہے۔ سرکاری فیس صرف سداد یا مجاز بینکنگ پورٹل پر ادا کی جاتی ہے۔'
            : 'Legal Regulatory Notice: This advisory simulator is an independent utility modeled strictly on official decrees issued by Saudi Arabian authorities (HRSD, Jawazat, CCHI, ZATCA). Official fees are payable exclusively via authorized banking channels and SADAD.'}
        </div>

        {/* 4-Step Dedicated Explanatory Text Blocks & Trilingual Regulatory Guide for SEO */}
        <ExpatCalculatorExplanatoryGuide currentLang={currentLang} />
      </div>
    </div>
  );
};

export default GlobalExpatCalculator;
