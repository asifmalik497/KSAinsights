import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { 
  GraduationCap, Calculator, Award, Calendar, ExternalLink,
  BookOpen, Compass, CheckCircle2, Sparkles, Share2, Copy,
  MapPin, Users, Globe2, ChevronRight, Check
} from 'lucide-react';
import { cn, getLanguage } from '../lib/utils';
import SEO from '../components/SEO';

interface UniversityFormula {
  id: string;
  name: { en: string; ar: string; ur: string };
  region: 'riyadh' | 'eastern' | 'western' | 'other';
  location: { en: string; ar: string; ur: string };
  qsRank?: string;
  portalUrl: string;
  tracks: {
    id: string;
    name: { en: string; ar: string; ur: string };
    weights: {
      highSchool: number;
      qudurat: number;
      tahsili: number;
      sat?: number;
      step?: number;
    };
    typicalCutoff: string;
    description: { en: string; ar: string; ur: string };
  }[];
}

const UNIVERSITIES_DATA: UniversityFormula[] = [
  {
    id: 'ksu',
    name: {
      en: 'King Saud University (KSU)',
      ar: 'جامعة الملك سعود (الرياض)',
      ur: 'کنگ سعود یونیورسٹی (ریاض)'
    },
    region: 'riyadh',
    location: { en: 'Riyadh', ar: 'الرياض', ur: 'ریاض' },
    qsRank: 'Top 200 Globally',
    portalUrl: 'https://dar.ksu.edu.sa/',
    tracks: [
      {
        id: 'health',
        name: { en: 'Health & Medical Colleges', ar: 'الكليات الصحية والطبية', ur: 'طبی اور ہیلتھ کالجز' },
        weights: { highSchool: 30, qudurat: 30, tahsili: 40 },
        typicalCutoff: '90% - 96%+',
        description: {
          en: 'Medicine, Dentistry, Pharmacy, Applied Medical Sciences.',
          ar: 'الطب البشري، طب الأسنان، الصيدلة، العلوم الطبية التطبيقية.',
          ur: 'میڈیسن، ڈینٹسٹری، فارمیسی، اپلائیڈ میڈیکل سائنسز۔'
        }
      },
      {
        id: 'science-eng',
        name: { en: 'Engineering & Computer Science', ar: 'الكليات الهندسية والحاسوبية', ur: 'انجینئرنگ اور کمپیوٹر سائنس' },
        weights: { highSchool: 40, qudurat: 30, tahsili: 30 },
        typicalCutoff: '88% - 94%',
        description: {
          en: 'Software Eng, AI, Mechanical, Electrical, Civil Engineering.',
          ar: 'هندسة البرمجيات، الذكاء الاصطناعي، الميكانيكا، الكهرباء، الهندسة المدنية.',
          ur: 'سافٹ ویئر انجینئرنگ، اے آئی، مکینیکل، الیکٹریکل انجینئرنگ۔'
        }
      },
      {
        id: 'humanities',
        name: { en: 'Business & Humanities', ar: 'إدارة الأعمال والكليات الإنسانية', ur: 'بزنس اور ہیومینٹیز' },
        weights: { highSchool: 50, qudurat: 50, tahsili: 0 },
        typicalCutoff: '82% - 88%',
        description: {
          en: 'Business Administration, Accounting, Finance, Law, Languages.',
          ar: 'إدارة الأعمال، المحاسبة، المالية، القانون، اللغات والترجمة.',
          ur: 'بزنس ایڈمنسٹریشن، اکاؤنٹنگ، فنانس، قانون اور زبانیں۔'
        }
      }
    ]
  },
  {
    id: 'kfupm',
    name: {
      en: 'King Fahd Univ of Petroleum & Minerals (KFUPM)',
      ar: 'جامعة الملك فهد للبترول والمعادن (الظهران)',
      ur: 'کنگ فہد یونیورسٹی آف پیٹرولیم اینڈ منرلز (دہران)'
    },
    region: 'eastern',
    location: { en: 'Dhahran', ar: 'الظهران', ur: 'دہران' },
    qsRank: '#1 in Arab World / Top 100',
    portalUrl: 'https://apply.kfupm.edu.sa/',
    tracks: [
      {
        id: 'standard',
        name: { en: 'General Standard Track', ar: 'مسار القبول الأساسي (العام)', ur: 'جنرل ریگولر ٹریک' },
        weights: { highSchool: 10, qudurat: 50, tahsili: 40 },
        typicalCutoff: '91% - 97%',
        description: {
          en: 'All Engineering, Computer, Sciences, and Business disciplines.',
          ar: 'جميع التخصصات الهندسية، علوم الحاسب، العلوم الطبيعية، والأعمال.',
          ur: 'تمام انجینئرنگ، کمپیوٹر سائنس، نیچرل سائنسز اور بزنس ڈگریز۔'
        }
      },
      {
        id: 'sat',
        name: { en: 'International SAT Track (Direct Admission)', ar: 'مسار السات الدولي (قبول مباشر)', ur: 'بین الاقوامی سیٹ (SAT) ٹریک' },
        weights: { highSchool: 0, qudurat: 0, tahsili: 0, sat: 100 },
        typicalCutoff: '1350+ SAT Score',
        description: {
          en: 'Exempts from Qudurat & Tahsili. Requires SAT 1350+ and Math placement.',
          ar: 'إعفاء تام من القدرات والتحصيلي لحملة السات 1350+ مع اختبار الرياضيات.',
          ur: 'قدرات اور تحصیلی سے استثنیٰ۔ کم از کم 1350 اسکور درکار ہے۔'
        }
      }
    ]
  },
  {
    id: 'kau',
    name: {
      en: 'King Abdulaziz University (KAU)',
      ar: 'جامعة الملك عبدالعزيز (جدة)',
      ur: 'کنگ عبدالعزیز یونیورسٹی (جدہ)'
    },
    region: 'western',
    location: { en: 'Jeddah', ar: 'جدة', ur: 'جدہ' },
    qsRank: 'Top 150 Globally',
    portalUrl: 'https://admission.kau.edu.sa/',
    tracks: [
      {
        id: 'scientific',
        name: { en: 'Health & Scientific Stream', ar: 'المسار الصحي والعلمي', ur: 'سائنسی اور میڈیکل ٹریک' },
        weights: { highSchool: 30, qudurat: 30, tahsili: 40 },
        typicalCutoff: '88% - 95%',
        description: {
          en: 'Medicine, Dentistry, Engineering, Computing, Applied Sciences.',
          ar: 'الطب والجراحة، طب الأسنان، الهندسة، علوم الحاسب، العلوم التطبيقية.',
          ur: 'میڈیسن، ڈینٹل، انجینئرنگ، کمپیوٹر سائنس اور اپلائیڈ سائنسز۔'
        }
      },
      {
        id: 'humanities',
        name: { en: 'Administrative & Humanities Stream', ar: 'المسار الإداري والإنساني', ur: 'انتظامی اور ہیومینٹیز ٹریک' },
        weights: { highSchool: 40, qudurat: 30, tahsili: 30 },
        typicalCutoff: '80% - 86%',
        description: {
          en: 'Economics, Communication, Law, Arts, and Business.',
          ar: 'الاقتصاد والإدارة، الإعلام والاتصال، الحقوق، والآداب.',
          ur: 'معاشیات، ابلاغ عامہ، قانون، آرٹس اور مینجمنٹ۔'
        }
      }
    ]
  },
  {
    id: 'pnu',
    name: {
      en: 'Princess Nourah bint Abdulrahman University (PNU)',
      ar: 'جامعة الأميرة نورة بنت عبدالرحمن (الرياض)',
      ur: 'پرنسس نورہ بنت عبدالرحمن یونیورسٹی (ریاض)'
    },
    region: 'riyadh',
    location: { en: 'Riyadh', ar: 'الرياض', ur: 'ریاض' },
    qsRank: 'Largest Women University in the World',
    portalUrl: 'https://www.pnu.edu.sa/',
    tracks: [
      {
        id: 'health',
        name: { en: 'Health Stream (Medicine & Nursing)', ar: 'المسار الصحي (الطب والتمريض والصيدلة)', ur: 'ہیلتھ اسٹریم (میڈیسن و نرسنگ)' },
        weights: { highSchool: 30, qudurat: 30, tahsili: 40 },
        typicalCutoff: '89% - 94%',
        description: {
          en: 'College of Medicine, Dental, Health Sciences, Nursing.',
          ar: 'كلية الطب البشري، طب الأسنان، العلوم الصحية، والتمريض.',
          ur: 'میڈیکل کالج، ڈینٹل، ہیلتھ سائنسز، نرسنگ۔'
        }
      },
      {
        id: 'science-tech',
        name: { en: 'Science, Computing & Engineering', ar: 'المسار العلمي والهندسي والحاسوبي', ur: 'سائنس، کمپیوٹر اور انجینئرنگ' },
        weights: { highSchool: 30, qudurat: 30, tahsili: 40 },
        typicalCutoff: '84% - 90%',
        description: {
          en: 'Computer Sciences, Cyber Security, Artificial Intelligence, Architecture.',
          ar: 'علوم الحاسب، الأمن السيبراني، الذكاء الاصطناعي، والتصميم المعماري.',
          ur: 'کمپیوٹر سائنس، سائبر سیکیورٹی، مصنوعی ذہانت، آرکیٹیکچر۔'
        }
      },
      {
        id: 'humanities',
        name: { en: 'Humanities & Business Administration', ar: 'المسار الإنساني وإدارة الأعمال', ur: 'ہیومینٹیز اور بزنس ایڈمنسٹریشن' },
        weights: { highSchool: 50, qudurat: 25, tahsili: 25 },
        typicalCutoff: '80% - 86%',
        description: {
          en: 'Business, Management, Law, Education, Languages.',
          ar: 'الأعمال، المحاسبة، القانون، علوم التربية، واللغات.',
          ur: 'بزنس، مینجمنٹ، قانون، تعلیم اور السنہ۔'
        }
      }
    ]
  },
  {
    id: 'imsiu',
    name: {
      en: 'Imam Mohammad Ibn Saud Islamic University (IMSIU)',
      ar: 'جامعة الإمام محمد بن سعود الإسلامية (الرياض)',
      ur: 'امام محمد بن سعود اسلامک یونیورسٹی (ریاض)'
    },
    region: 'riyadh',
    location: { en: 'Riyadh', ar: 'الرياض', ur: 'ریاض' },
    portalUrl: 'https://imamu.edu.sa/',
    tracks: [
      {
        id: 'science-eng',
        name: { en: 'Engineering & Computing Track', ar: 'مسار الهندسة وعلوم الحاسب', ur: 'انجینئرنگ اور کمپیوٹر ٹریک' },
        weights: { highSchool: 30, qudurat: 30, tahsili: 40 },
        typicalCutoff: '85% - 91%',
        description: {
          en: 'Computer Science, Information Systems, Engineering disciplines.',
          ar: 'علوم الحاسب، نظم المعلومات، والبرامج الهندسية المتنوعة.',
          ur: 'کمپیوٹر سائنس، انفارمیشن سسٹمز، انجینئرنگ۔'
        }
      },
      {
        id: 'sharia-humanities',
        name: { en: 'Sharia, Law & Humanities', ar: 'الشريعة والأنظمة والعلوم الإنسانية', ur: 'شریعہ، قانون اور ہیومینٹیز' },
        weights: { highSchool: 50, qudurat: 50, tahsili: 0 },
        typicalCutoff: '78% - 84%',
        description: {
          en: 'Islamic Jurisprudence, Law, Media, Arabic Literature.',
          ar: 'الشريعة، الأنظمة (القانون)، الإعلام، واللغة العربية.',
          ur: 'شریعہ، قانون، میڈیا، عربی ادب۔'
        }
      }
    ]
  },
  {
    id: 'iau',
    name: {
      en: 'Imam Abdulrahman Bin Faisal University (IAU)',
      ar: 'جامعة الإمام عبدالرحمن بن فيصل (الدمام)',
      ur: 'امام عبدالرحمن بن فیصل یونیورسٹی (دمام)'
    },
    region: 'eastern',
    location: { en: 'Dammam', ar: 'الدمام', ur: 'دمام' },
    qsRank: 'Top Medical Hub in Eastern Province',
    portalUrl: 'https://admitportal.iau.edu.sa/',
    tracks: [
      {
        id: 'health',
        name: { en: 'Health Track', ar: 'المسار الصحي', ur: 'ہیلتھ ٹریک' },
        weights: { highSchool: 30, qudurat: 30, tahsili: 40 },
        typicalCutoff: '89% - 95%',
        description: {
          en: 'Medicine, Clinical Pharmacy, Dentistry, Nursing.',
          ar: 'الطب والجراحة، الصيدلة الإكلينيكية، طب الأسنان، والتمريض.',
          ur: 'میڈیسن، کلینیکل فارمیسی، ڈینٹل اور نرسنگ۔'
        }
      },
      {
        id: 'engineering',
        name: { en: 'Engineering & Computer Sciences', ar: 'المسار الهندسي والحاسوبي', ur: 'انجینئرنگ اور کمپیوٹر ٹریک' },
        weights: { highSchool: 30, qudurat: 30, tahsili: 40 },
        typicalCutoff: '85% - 91%',
        description: {
          en: 'Biomedical Engineering, Computer Engineering, Architecture.',
          ar: 'الهندسة الطبية الحيوية، هندسة الحاسب، والعمارة والتخطيط.',
          ur: 'بایومیڈیکل انجینئرنگ، کمپیوٹر انجینئرنگ، آرکیٹیکچر۔'
        }
      }
    ]
  },
  {
    id: 'uqu',
    name: {
      en: 'Umm Al-Qura University (UQU)',
      ar: 'جامعة أم القرى (مكة المكرمة)',
      ur: 'ام القریٰ یونیورسٹی (مکہ مکرمہ)'
    },
    region: 'western',
    location: { en: 'Makkah', ar: 'مكة المكرمة', ur: 'مکہ مکرمہ' },
    portalUrl: 'https://uqu.edu.sa/admission',
    tracks: [
      {
        id: 'scientific',
        name: { en: 'Medical, Engineering & Science', ar: 'المسار الطبي والهندسي والعلمي', ur: 'میڈیکل، انجینئرنگ اور سائنس' },
        weights: { highSchool: 40, qudurat: 30, tahsili: 30 },
        typicalCutoff: '84% - 92%',
        description: {
          en: 'Medicine, Electrical Engineering, Computing, Applied Sciences.',
          ar: 'الطب، الهندسة الكهربائية، الحاسبات، والعلوم التطبيقية.',
          ur: 'میڈیسن، الیکٹریکل انجینئرنگ، کمپیوٹر سائنس۔'
        }
      },
      {
        id: 'islamic-admin',
        name: { en: 'Islamic Studies, Business & Arts', ar: 'الدراسات الإسلامية وإدارة الأعمال والآداب', ur: 'اسلامک اسٹڈیز، بزنس اور آرٹس' },
        weights: { highSchool: 50, qudurat: 30, tahsili: 20 },
        typicalCutoff: '78% - 85%',
        description: {
          en: 'Da’wah, Islamic Economics, Management, English.',
          ar: 'الدعوة وأصول الدين، الاقتصاد الإسلامي، الإدارة، واللغة الإنجليزية.',
          ur: 'دعوہ، اسلامک اکنامکس، مینجمنٹ، انگریزی۔'
        }
      }
    ]
  },
  {
    id: 'seu',
    name: {
      en: 'Saudi Electronic University (SEU)',
      ar: 'الجامعة السعودية الإلكترونية (التعليم المدمج)',
      ur: 'سعودی الیکٹرانک یونیورسٹی (بلینڈڈ لرننگ)'
    },
    region: 'riyadh',
    location: { en: 'Nationwide Campuses', ar: 'فروع في كافة مناطق المملكة', ur: 'ملک بھر میں کیمپس' },
    portalUrl: 'https://seu.edu.sa/',
    tracks: [
      {
        id: 'blended-bachelor',
        name: { en: 'Blended Bachelor Programs (All Majors)', ar: 'برامج البكالوريوس المدمج (للسعوديين والمقيمين)', ur: 'بلینڈڈ بیچلر ڈگری پروگرامز' },
        weights: { highSchool: 100, qudurat: 0, tahsili: 0 },
        typicalCutoff: 'Competitive High School GPA',
        description: {
          en: 'No Qudurat/Tahsili required for many tracks. Open for Saudis and Expats alike.',
          ar: 'لا يشترط اختبارات قياس لبعض التخصصات. متاح للسعوديين والمقيمين بتعليم مدمج.',
          ur: 'قدرات اور تحصیلی لازمی نہیں۔ سعودی اور مقیم طلبا دونوں کے لیے موزوں۔'
        }
      }
    ]
  }
];

const ADMISSION_SCHEDULE_2026 = [
  {
    date: { en: 'Mid-September 2026', ar: 'منتصف سبتمبر 2026', ur: 'ستمبر 2026 کے وسط میں' },
    event: { 
      en: 'Supplementary Admission & Second Semester Window Opens',
      ar: 'فتح باب القبول الإلحاقي والتسجيل للفصل الدراسي الثاني',
      ur: 'ضمنی داخلے اور دوسرے سمسٹر کے لیے رجسٹریشن کا آغاز'
    },
    portal: { en: 'Riyadh & Western Unified Portals', ar: 'بوابات القبول الموحد بالرياض وجدة', ur: 'ریاض اور جدہ کے پورٹلز' },
    status: 'active'
  },
  {
    date: { en: 'October - November 2026', ar: 'أكتوبر - نوفمبر 2026', ur: 'اکتوبر - نومبر 2026' },
    event: { 
      en: 'Study in Saudi International Scholarship Evaluations',
      ar: 'فرز ومطابقة طلبات منصة "ادرس في السعودية" للطلاب الدوليين',
      ur: 'اسٹڈی ان سعودی پلیٹ فارم پر انٹرنیشنل اسکالرشپ اسکروٹنی'
    },
    portal: { en: 'studyinsaudi.moe.gov.sa', ar: 'منصة ادرس في السعودية', ur: 'اسٹڈی ان سعودی پورٹل' },
    status: 'upcoming'
  },
  {
    date: { en: 'January 2027', ar: 'يناير 2027', ur: 'جنوری 2027' },
    event: { 
      en: 'KFUPM SAT Track & Early Admission Launch for Fall 2027',
      ar: 'بدء التقديم لمسار السات والقبول المبكر بجامعة الملك فهد للبترول',
      ur: 'کنگ فہد یونیورسٹی کے سیٹ (SAT) ٹریک کے لیے رجسٹریشن کا آغاز'
    },
    portal: { en: 'apply.kfupm.edu.sa', ar: 'بوابة قبول البترول والمعادن', ur: 'کے ایف یو پی ایم پورٹل' },
    status: 'upcoming'
  }
];

const HigherEducation: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = getLanguage(i18n.language);
  const isRTL = currentLang === 'ar' || currentLang === 'ur';

  // Calculator State
  const [selectedUniId, setSelectedUniId] = useState<string>('ksu');
  const [selectedTrackId, setSelectedTrackId] = useState<string>('health');
  const [highSchoolScore, setHighSchoolScore] = useState<number>(95);
  const [quduratScore, setQuduratScore] = useState<number>(90);
  const [tahsiliScore, setTahsiliScore] = useState<number>(88);
  const [satScore, setSatScore] = useState<number>(1400);
  const [copied, setCopied] = useState<boolean>(false);

  // Directory filter
  const [regionFilter, setRegionFilter] = useState<'all' | 'riyadh' | 'eastern' | 'western'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  const performanceTier = useMemo(() => {
    if (currentTrack.weights.sat && currentTrack.weights.sat > 0) {
      if (satScore >= 1450) return { label: 'Elite KFUPM SAT Tier', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
      if (satScore >= 1350) return { label: 'Eligible for Direct Admission (1350+)', color: 'text-secondary bg-amber-50 border-amber-200' };
      return { label: 'Below Minimum 1350 Threshold', color: 'text-rose-700 bg-rose-50 border-rose-200' };
    }

    if (calculatedPercentage >= 93) {
      return { label: 'Highly Competitive for Medicine & AI', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    } else if (calculatedPercentage >= 85) {
      return { label: 'Strong for Engineering & Computing', color: 'text-secondary bg-amber-50 border-amber-200' };
    } else if (calculatedPercentage >= 78) {
      return { label: 'Eligible for Business, Law & Humanities', color: 'text-blue-700 bg-blue-50 border-blue-200' };
    } else {
      return { label: 'Standard / Foundation College Range', color: 'text-gray-700 bg-gray-50 border-gray-200' };
    }
  }, [calculatedPercentage, currentTrack, satScore]);

  const handleCopyBreakdown = () => {
    const text = `🎓 KSA Insights University Admission Result:\nUniversity: ${currentUni.name[currentLang] || currentUni.name.en}\nTrack: ${currentTrack.name[currentLang] || currentTrack.name.en}\nCalculated Weighted Percentage: ${calculatedPercentage.toFixed(2)}%\nTarget Benchmark: ${currentTrack.typicalCutoff}\nCalculate yours: https://ksainsights.com/higher-education`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`🎓 KSA Insights Weighted GPA Result: ${currentUni.name.en} (${currentTrack.name.en}) = ${calculatedPercentage.toFixed(2)}% | Check your eligibility: https://ksainsights.com/higher-education`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const filteredUnis = useMemo(() => {
    return UNIVERSITIES_DATA.filter(uni => {
      const matchesRegion = regionFilter === 'all' || uni.region === regionFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        uni.name.en.toLowerCase().includes(q) || 
        uni.name.ar.includes(q) || 
        uni.name.ur.includes(q) ||
        uni.location.en.toLowerCase().includes(q) ||
        uni.location.ar.includes(q);
      return matchesRegion && matchesSearch;
    });
  }, [regionFilter, searchQuery]);

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
        keywords="النسبة الموزونة 1447, حاسبة النسبة الموزونة, القبول الموحد للجامعات, جامعة الملك سعود, جامعة الملك فهد للبترول والمعادن, قياس قدرات وتحصيلي, شروط قبول المقيمين في الجامعات السعودية, دراسة الأجانب في السعودية, منح الجامعات السعودية للوافدين, Saudi university admissions, Mawzoonah calculator, KFUPM SAT admission, KSU admission percentage"
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
          </div>
        </div>

        {/* Section 1: The Interactive Weighted Percentage Calculator */}
        <div id="calculator" className="bg-white rounded-[3rem] p-6 sm:p-10 lg:p-12 shadow-xl border border-gray-100 mb-16 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-100 mb-8">
            <div>
              <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-[0.2em] mb-2">
                <Calculator size={16} />
                <span>
                  {currentLang === 'ar' ? 'الأداة التفاعلية الرسمية' : currentLang === 'ur' ? 'آفیشل آن لائن ٹول' : 'Official Interactive Tool'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-primary">
                {currentLang === 'ar' ? 'حاسبة النسبة الموزونة الموحدة لجامعات السعودية' : currentLang === 'ur' ? 'سعودی جامعات کا ویٹڈ پرسنٹیج کیلکولیٹر' : 'KSA University Weighted Percentage Calculator'}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyBreakdown}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-primary hover:bg-gray-50 text-xs font-bold transition-all shadow-sm"
              >
                {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                <span>{copied ? (currentLang === 'ar' ? 'تم النسخ!' : currentLang === 'ur' ? 'کاپی ہوگیا!' : 'Copied!') : (currentLang === 'ar' ? 'نسخ النتيجة' : currentLang === 'ur' ? 'اسکور کاپی کریں' : 'Copy Score')}</span>
              </button>
              <button
                onClick={handleShareWhatsApp}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold transition-all shadow-sm"
              >
                <Share2 size={14} />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>

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
                  {performanceTier.label}
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
        </div>

        {/* Section 2: Key Admission Dates & Calendar */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-[0.2em] mb-2">
            <Calendar size={16} />
            <span>
              {currentLang === 'ar' ? 'المواعيد والتقويم الجامعي' : currentLang === 'ur' ? 'داخلہ شیڈول 2026' : 'Academic Timeline & Deadlines'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-6">
            {currentLang === 'ar' ? 'أهم مواعيد القبول والتسجيل لعام 1447 / 2026' : currentLang === 'ur' ? 'سعودی یونیورسٹی داخلہ کے اہم شیڈولز' : 'Key Saudi University Admission Windows'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ADMISSION_SCHEDULE_2026.map((item, idx) => (
              <div 
                key={`schedule-${item.event?.en || idx}`}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-secondary/10 text-secondary border border-secondary/20">
                      {item.status === 'active' ? (currentLang === 'ar' ? 'نشط الآن' : currentLang === 'ur' ? 'فعال' : 'Active Now') : (currentLang === 'ar' ? 'قادم' : currentLang === 'ur' ? 'آئندہ' : 'Upcoming')}
                    </span>
                    <span className="text-xs font-bold text-gray-400">{item.date[currentLang] || item.date.en}</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-primary mb-2">
                    {item.event[currentLang] || item.event.en}
                  </h3>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Globe2 size={14} className="text-secondary" />
                    {item.portal[currentLang] || item.portal.en}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Guide for Expat & International Students */}
        <div className="bg-paper rounded-[3rem] p-8 sm:p-12 border border-gray-200/80 mb-16 shadow-sm">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-[0.2em] mb-2">
              <Users size={16} />
              <span>
                {currentLang === 'ar' ? 'دليل الطلاب المقيمين والدوليين' : currentLang === 'ur' ? 'مقیم اور غیر ملکی طلباء کے لیے گائیڈ' : 'Resident Expats & Global Students'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4">
              {currentLang === 'ar' ? 'فرص القبول والمنح للطلاب غير السعوديين' : currentLang === 'ur' ? 'غیر ملکی و مقیم طلباء کے لیے داخلے اور اسکالرشپ' : 'University Admission Rules for Non-Saudis & Residents'}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {currentLang === 'ar' ? (
                'تتيح المملكة العربية السعودية فرصاً تعليمية متميزة للمقيمين داخل المملكة والطلاب الدوليين عبر مسارات حكومية متعددة.'
              ) : currentLang === 'ur' ? (
                'سعودی عرب کی حکومت مقیم غیر ملکیوں اور بین الاقوامی طلباء کے لیے سرکاری یونیورسٹیوں میں متعدد مواقع فراہم کرتی ہے۔'
              ) : (
                'Saudi Arabia provides world-class higher education opportunities for residents holding valid Iqama as well as international applicants from across the globe.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Box 1: Children of Saudi Mothers */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold mb-4">
                <CheckCircle2 size={20} />
              </div>
              <h3 className="font-serif font-bold text-lg text-primary mb-2">
                {currentLang === 'ar' ? 'أبناء المواطنات السعوديات' : currentLang === 'ur' ? 'سعودی ماؤں کے بچے' : 'Children of Saudi Mothers'}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {currentLang === 'ar' ? (
                  'يُعامل أبناء المواطنات معاملة المواطن السعودي تماماً في القبول الجامعي والدراسة المجانية واستحقاق المكافأة الشهرية في أغلب التخصصات.'
                ) : currentLang === 'ur' ? (
                  'سعودی ماؤں کے بچوں کو یونیورسٹی داخلوں، مفت تعلیم اور ماہانہ وظیفے میں سعودی شہریوں کے بالکل برابر حقوق حاصل ہیں۔'
                ) : (
                  'Legally treated identically to Saudi citizens during university admissions, enjoying tuition-free education and monthly academic stipends.'
                )}
              </p>
            </div>

            {/* Box 2: Internal Scholarships for Resident Expats */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-secondary flex items-center justify-center font-bold mb-4">
                <Award size={20} />
              </div>
              <h3 className="font-serif font-bold text-lg text-primary mb-2">
                {currentLang === 'ar' ? 'المنح الداخلية للطلاب المقيمين' : currentLang === 'ur' ? 'مقیم غیر ملکیوں کے لیے داخلی اسکالرشپ' : 'Internal Scholarships (Resident Expats)'}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {currentLang === 'ar' ? (
                  'تخصص الجامعات السعودية الحكومية نسبة مقاعد محددة سنوياً للطلاب المقيمين الحاصلين على الثانوية العامة واختبارات قياس بنسب تنافسية عالية.'
                ) : currentLang === 'ur' ? (
                  'اقامہ ہولڈر طلباء کے لیے تمام بڑی سرکاری جامعات میں میرٹ پر مفت اور جزوی فیس والی نشستیں مختص کی جاتی ہیں۔'
                ) : (
                  'Public universities reserve a dedicated competitive quota for expatriate residents holding valid Iqamas based on high school and Qudurat merit.'
                )}
              </p>
            </div>

            {/* Box 3: Study in Saudi International Platform */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold mb-4">
                <Globe2 size={20} />
              </div>
              <h3 className="font-serif font-bold text-lg text-primary mb-2">
                {currentLang === 'ar' ? 'منصة ادرس في السعودية' : currentLang === 'ur' ? 'اسٹڈی ان سعودی پورٹل' : 'Study in Saudi Portal'}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {currentLang === 'ar' ? (
                  'البوابة الرسمية الموحدة للطلاب الدوليين من خارج المملكة، توفر منحاً دراسية ممولة بالكامل تشمل السكن وتذاكر الطيران ومكافأة شهرية.'
                ) : currentLang === 'ur' ? (
                  'بیرون ملک کے طلباء کے لیے باضابطہ حکومتی پورٹل جس میں مکمل فنڈڈ اسکالرشپ، رہائش اور ماہانہ وظیفہ شامل ہے۔'
                ) : (
                  'Official Ministry of Education portal for international applicants outside KSA, featuring fully funded scholarships with housing, flights, and living stipends.'
                )}
              </p>
            </div>

          </div>
        </div>

        {/* Section 4: Comprehensive University Directory */}
        <div className="mb-16">
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

        {/* Section 5: Vision 2030 In-Demand Academic Majors */}
        <div className="bg-white rounded-[3rem] p-8 sm:p-12 border border-gray-100 shadow-xl mb-12">
          <div className="max-w-3xl mb-8">
            <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-[0.2em] mb-2">
              <Sparkles size={16} />
              <span>
                {currentLang === 'ar' ? 'سوق العمل وبرنامج تنمية القدرات البشرية' : currentLang === 'ur' ? 'ویژن 2030 اور مستقبل کی ملازمتیں' : 'Vision 2030 Future Careers'}
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
        </div>

      </div>
    </div>
  );
};

export default HigherEducation;
