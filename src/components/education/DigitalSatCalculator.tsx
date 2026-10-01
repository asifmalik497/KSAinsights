import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Award, CheckCircle2, XCircle, AlertCircle, 
  ExternalLink, Compass, GraduationCap, ChevronRight,
  TrendingUp, ShieldCheck, Info, Scale, ArrowRight
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '../../lib/utils';

interface DigitalSatCalculatorProps {
  currentLang: 'en' | 'ar' | 'ur';
}

type CurriculumType = 'american' | 'british' | 'ib' | 'saudi';
type ResidencyType = 'saudi' | 'expat' | 'international';
type MajorTrack = 'cs_ai' | 'engineering' | 'business' | 'premed' | 'sciences';

export const DigitalSatCalculator: React.FC<DigitalSatCalculatorProps> = ({ currentLang }) => {
  // Score state
  const [mathScore, setMathScore] = useState<number>(710);
  const [erwScore, setErwScore] = useState<number>(670);
  const [curriculum, setCurriculum] = useState<CurriculumType>('american');
  const [gpaScore, setGpaScore] = useState<number>(96); // Percentage 70 - 100
  const [majorTrack, setMajorTrack] = useState<MajorTrack>('cs_ai');
  const [residency, setResidency] = useState<ResidencyType>('expat');

  // Computed total Digital SAT score
  const totalSat = useMemo(() => mathScore + erwScore, [mathScore, erwScore]);

  // KFUPM Eligibility & Competitive Assessment
  const kfupmAssessment = useMemo(() => {
    // KFUPM Hard Rules: Minimum total 1350, Minimum Math 650
    if (totalSat < 1350 || mathScore < 650) {
      return {
        status: 'ineligible',
        verdict: {
          en: 'Below Minimum Threshold',
          ar: 'دون الحد الأدنى المشروط',
          ur: 'کم از کم مطلوبہ حد سے کم'
        },
        color: 'bg-rose-50 text-rose-800 border-rose-200',
        badgeColor: 'bg-rose-500 text-white',
        reason: {
          en: totalSat < 1350 
            ? `Total SAT (${totalSat}) is below KFUPM's non-negotiable minimum cut-off of 1350/1600.`
            : `Math score (${mathScore}) is below KFUPM's mandatory minimum of 650/800.`,
          ar: totalSat < 1350 
            ? `مجموع درجات السات (${totalSat}) يقل عن الحد الأدنى الإلزامي لجامعة الملك فهد للبترول والمعادن (1350 من 1600).`
            : `درجة الرياضيات في السات (${mathScore}) تقل عن الحد الأدنى الإلزامي المشروط (650 من 800).`,
          ur: totalSat < 1350 
            ? `سیٹ کا مجموعی اسکور (${totalSat}) کنگ فہد یونیورسٹی کی کم از کم 1350 کی حد سے کم ہے۔`
            : `ریاضی کا اسکور (${mathScore}) لازمی 650 نمبروں کی حد سے کم ہے۔`
        },
        recommendation: {
          en: 'Retake the Digital SAT to achieve $\\ge 1350$ (Math $\\ge 650$), or utilize the standard Qiyas Mawzoonah pathway (Qudurat + Tahsili).',
          ar: 'يُنصح بإعادة اختبار السات الرقمي لتحقيق 1350+ مع 650+ رياضيات، أو التقديم عبر مسار النسبة الموزونة العادية (قدرات + تحصيلي).',
          ur: 'دوبارہ ڈیجیٹل سیٹ دیں تاکہ 1350+ حاصل ہوں، یا معیاری قیاس موزونہ (قدرات + تحصیلی) کا راستہ اختیار کریں۔'
        },
        matchPercentage: 35
      };
    }

    // Competitive breakdown for major
    if (majorTrack === 'cs_ai') {
      if (totalSat >= 1440 && mathScore >= 720) {
        return {
          status: 'elite',
          verdict: {
            en: 'High Competitive Match (Tier 1 Elite)',
            ar: 'فرصة قبول مرتفعة جداً (الفئة الأولى - النخبة)',
            ur: 'انتہائی شاندار میرٹ (ٹاپ کیٹیگری)'
          },
          color: 'bg-emerald-50 text-emerald-900 border-emerald-300',
          badgeColor: 'bg-emerald-600 text-white',
          reason: {
            en: `Outstanding composite (${totalSat}) with strong Math (${mathScore}). Exceeds typical historical cutoffs for Software Engineering, Computer Science, and Artificial Intelligence.`,
            ar: `مجموع استثنائي (${totalSat}) مع تفوق نوعي في الرياضيات (${mathScore})؛ يتجاوز معدلات القبول التنافسية لعلوم الحاسب وهندسة البرمجيات والذكاء الاصطناعي.`,
            ur: `شاندار مجموعی اسکور (${totalSat}) اور ریاضی میں بہترین کارکردگی (${mathScore})۔ کمپیوٹر سائنس اور اے آئی کے لیے انتہائی مضبوط پوزیشن۔`
          },
          recommendation: {
            en: 'Priority Candidate. Prepare for the KFUPM internal Math Proficiency Screening Exam and submit during the Early Admission window.',
            ar: 'مرشح ذو أولوية عالية. استعد لاختبار كفاءة الرياضيات الداخلي لجامعة الملك فهد وقدّم فور فتح بوابة القبول المبكر.',
            ur: 'ترجیحی امیدوار۔ یونیورسٹی کے داخلی ریاضی اسکریننگ ٹیسٹ کی تیاری کریں اور ارلی ایڈمیشن میں اپلائی کریں۔'
          },
          matchPercentage: 96
        };
      } else if (totalSat >= 1390 && mathScore >= 680) {
        return {
          status: 'competitive',
          verdict: {
            en: 'Competitive Match (Tier 2)',
            ar: 'فرصة تنافسية قوية (الفئة الثانية)',
            ur: 'مضبوط مسابقتی پوزیشن'
          },
          color: 'bg-blue-50 text-blue-900 border-blue-300',
          badgeColor: 'bg-blue-600 text-white',
          reason: {
            en: `Strong score (${totalSat}) meeting computing standards. Admission will hinge on your percentile rank among early applicants and internal math screening.`,
            ar: `درجة قوية (${totalSat}) تلبي معايير كليات الحاسب، ويعتمد القبول النهائي على الترتيب التنافسي واختبار الرياضيات الداخلي.`,
            ur: `کمپیوٹر کالج کے معیار کے مطابق اچھا اسکور (${totalSat})، حتمی داخلہ ریاضی کے داخلی ٹیسٹ پر منحصر ہوگا۔`
          },
          recommendation: {
            en: 'Apply via Early SAT Track. Also list Core Engineering tracks as secondary preferences to guarantee seat placement.',
            ar: 'قدّم عبر مسار السات المبكر، وأدرج مسارات الهندسة العامة كرغبات بديلة لضمان مقعدك.',
            ur: 'ارلی سیٹ ٹریک میں اپلائی کریں اور متبادل کے طور پر جنرل انجینئرنگ کو بھی ترجیحات میں رکھیں۔'
          },
          matchPercentage: 84
        };
      } else {
        return {
          status: 'moderate',
          verdict: {
            en: 'Eligible / Borderline for CS (Tier 3)',
            ar: 'مؤهل نظاماً / فرصة متوازنة (الفئة الثالثة)',
            ur: 'اہل مگر سخت مقابلہ'
          },
          color: 'bg-amber-50 text-amber-900 border-amber-300',
          badgeColor: 'bg-amber-600 text-white',
          reason: {
            en: `Meets KFUPM baseline criteria (1350+), but Computer Science & AI typically demand higher Math ($\ge 700$) due to heavy applicant volume.`,
            ar: `مستوفٍ للحد الأدنى (1350+)، لكن تخصصات الذكاء الاصطناعي والحاسب تتطلب عادة درجات رياضيات أعلى (700+) لشدة التنافس.`,
            ur: `بنیادی حد پوری ہے، لیکن کمپیوٹر اور اے آئی میں زیادہ تر 700+ ریاضی اسکور والے طلباء کا غلبہ رہتا ہے۔`
          },
          recommendation: {
            en: 'Consider Mechanical, Industrial, or Systems Engineering where 1350–1380 has significantly higher clearance rates.',
            ar: 'يُنصح باختيار الهندسة الميكانيكية، الصناعية، أو الكيميائية حيث تكون فرص القبول أعلى بكثير لهذا المجموع.',
            ur: 'مکینیکل، انڈسٹریل یا کیمیکل انجینئرنگ کا انتخاب کریں جہاں اس اسکور پر داخلے کا امکان کہیں زیادہ ہے۔'
          },
          matchPercentage: 68
        };
      }
    } else {
      // Engineering, Sciences, Business
      if (totalSat >= 1410 && mathScore >= 700) {
        return {
          status: 'elite',
          verdict: {
            en: 'High Competitive Match (Engineering Elite)',
            ar: 'فرصة قبول مرتفعة جداً في كليات الهندسة',
            ur: 'انجینئرنگ کے لیے شاندار میرٹ'
          },
          color: 'bg-emerald-50 text-emerald-900 border-emerald-300',
          badgeColor: 'bg-emerald-600 text-white',
          reason: {
            en: `Composite score of ${totalSat} (Math ${mathScore}) strongly positions you for top engineering disciplines (Mechanical, Chemical, Electrical).`,
            ar: `مجموع ${totalSat} مع تميز الرياضيات (${mathScore}) يمنحك أفضلية حاسمة في كبرى تخصصات الهندسة (الميكانيكية، الكيميائية، والكهربائية).`,
            ur: `مجموعی اسکور ${totalSat} اور ریاضی ${mathScore} مکینیکل، کیمیکل اور الیکٹریکل انجینئرنگ کے لیے بہترین ہے۔`
          },
          recommendation: {
            en: 'Early admission highly probable. Ensure transcript verification and register for the math verification exam.',
            ar: 'القبول المبكر مرجح جداً. تأكد من معادلة شهادتك وتأكيد التسجيل في اختبار الرياضيات.',
            ur: 'ارلی ایڈمیشن کا قوی امکان۔ دستاویزات کی تصدیق مکمل رکھیں۔'
          },
          matchPercentage: 94
        };
      } else if (totalSat >= 1360 && mathScore >= 660) {
        return {
          status: 'competitive',
          verdict: {
            en: 'Competitive Match (Engineering Core)',
            ar: 'فرصة تنافسية جيدة جداً في الهندسة والعلوم',
            ur: 'انجینئرنگ کے لیے تسلی بخش اسکور'
          },
          color: 'bg-blue-50 text-blue-900 border-blue-300',
          badgeColor: 'bg-blue-600 text-white',
          reason: {
            en: `Meets and exceeds KFUPM benchmarks for Civil, Petroleum, Materials Science, and Business Analytics.`,
            ar: `يتجاوز المعايير التنافسية لهندسة البترول، الهندسة المدنية، علوم المواد، وتحليلات الأعمال.`,
            ur: `سول، پیٹرولیم، مٹیریل سائنس اور بزنس اینالیٹکس کے لیے موزوں اسکور۔`
          },
          recommendation: {
            en: 'Excellent opportunity. Review the university Math syllabus for the pre-matriculation exam.',
            ar: 'فرصة ممتازة للالتحاق. راجع منهج الرياضيات التحضيري للاختبار الداخلي.',
            ur: 'بہترین موقع۔ ریاضی کے داخلی امتحان کے نصاب کا جائزہ لیں۔'
          },
          matchPercentage: 82
        };
      } else {
        return {
          status: 'moderate',
          verdict: {
            en: 'Eligible Baseline (Engineering / Sciences)',
            ar: 'مستوفٍ للحد الأدنى للمنافسة',
            ur: 'اہل مگر میرٹ کا انتظار'
          },
          color: 'bg-amber-50 text-amber-900 border-amber-300',
          badgeColor: 'bg-amber-600 text-white',
          reason: {
            en: `Above the 1350 threshold. Seat allocation will depend on remaining capacity after top-tier sorting.`,
            ar: `فوق حد الـ 1350 المشروط، وسيعتمد الفرز على السعة الاستيعابية المتبقية للكليات.`,
            ur: `1350 کی حد پوری ہے، حتمی سیٹ کا تعین طلباء کی مجموعی تعداد کے بعد ہوگا۔`
          },
          recommendation: {
            en: 'Apply immediately upon portal opening; consider taking Qiyas as a safety benchmark.',
            ar: 'قدّم فور فتح البوابة، ويُفضل الاحتفاظ بنتيجة قياس كخيار بديل مساند.',
            ur: 'پورٹل کھلتے ہی فوری درخواست دیں اور بیک اپ کے طور پر قیاس بھی تیار رکھیں۔'
          },
          matchPercentage: 70
        };
      }
    }
  }, [totalSat, mathScore, majorTrack]);

  // King Saud University (KSU) Assessment
  const ksuAssessment = useMemo(() => {
    // KSU considerations: 1200+ for STEM, 1300+ competitive, 1060+ general
    if (totalSat >= 1350) {
      return {
        status: 'high',
        verdict: {
          en: 'Direct Admission Candidate (High Match)',
          ar: 'مرشح ذو أولوية للقبول المباشر والمنح',
          ur: 'براہ راست داخلے اور اسکالرشپ کے لیے اہل'
        },
        badge: { en: 'Top Tier KSU', ar: 'الفئة الأولى سعود', ur: 'ٹاپ میرٹ کے ایس یو' },
        reason: {
          en: 'Exceeds KSU requirements for College of Computer & Information Sciences (CCIS) and College of Engineering.',
          ar: 'يتجاوز متطلبات كلية علوم الحاسب والمعلومات وكلية الهندسة بجامعة الملك سعود.',
          ur: 'کنگ سعود یونیورسٹی کے کمپیوٹر اور انجینئرنگ کالجز کے لیے شاندار اسکور۔'
        },
        probability: '92%'
      };
    } else if (totalSat >= 1200) {
      return {
        status: 'moderate',
        verdict: {
          en: 'Competitive Match (STEM & Sciences)',
          ar: 'فرصة تنافسية في الكليات العلمية',
          ur: 'سائنس کالجز کے لیے مسابقتی پوزیشن'
        },
        badge: { en: 'Eligible STEM', ar: 'مؤهل للمسارات العلمية', ur: 'سائنس کے لیے اہل' },
        reason: {
          en: 'Qualifies for KSU College of Science, Business Administration, and Architecture with high school transcript review.',
          ar: 'يؤهل للتقديم على كلية العلوم، إدارة الأعمال، والعمارة بجامعة الملك سعود مع مراجعة المعدل التراكمي.',
          ur: 'سائنس، بزنس ایڈمنسٹریشن اور آرکیٹیکچر کے لیے موزوں۔'
        },
        probability: '78%'
      };
    } else {
      return {
        status: 'limited',
        verdict: {
          en: 'General Admission / Below STEM Cutoff',
          ar: 'دون الحد التنافسي للكليات الهندسية',
          ur: 'انجینئرنگ کی حد سے کم'
        },
        badge: { en: 'Standard Track', ar: 'مسار عام', ur: 'معیاری ٹریک' },
        reason: {
          en: 'Below competitive range for engineering and medicine; better suited for humanities or standard Qiyas admission.',
          ar: 'يقل عن المعدل التنافسي للهندسة والحاسب؛ يُفضل استخدام النسبة الموزونة عبر قياس.',
          ur: 'انجینئرنگ اور میڈیکل کے لیے کم ہے، قیاس موزونہ کا راستہ زیادہ بہتر ہے۔'
        },
        probability: '45%'
      };
    }
  }, [totalSat]);

  // Strategic Decision: SAT Track vs Qiyas Mawzoonah
  const strategicAdvice = useMemo(() => {
    if (residency === 'expat') {
      if (totalSat >= 1350 && mathScore >= 650) {
        return {
          winner: 'sat',
          title: {
            en: 'Strong Recommendation: Apply via Digital SAT Track',
            ar: 'توصية استراتيجية حاسمة: التقديم عبر مسار السات الدولي',
            ur: 'حتمی مشورہ: ڈیجیٹل سیٹ ٹریک کے ذریعے اپلائی کریں'
          },
          body: {
            en: 'For resident expatriates in KSA, standard unified admission has an extremely restrictive 5% quota requiring a nearly impossible Mawzoonah (typically 98.5%+). The KFUPM & KSU SAT tracks evaluate you purely on your global SAT benchmark, exempting you completely from Qudurat and Tahsili!',
            ar: 'بالنسبة للمقيمين في المملكة، يخضع القبول الحكومي العادي لكوتة الـ 5% المشروطة بنسب موزونة خيالية (غالباً 98.5%+). مسار السات في جامعة الملك فهد وسعود يقيمك بناءً على معايير السات الدولية فقط، ويعفيك تماماً من اختبارات قياس والتحصيلي!',
            ur: 'سعودی عرب میں مقیم غیر ملکی طلباء کے لیے عام داخلوں میں 5 فیصد کی سخت حد ہے جس کے لیے 98.5 فیصد سے زائد موزونہ چاہیے ہوتا ہے۔ کے ایف یو پی ایم اور کے ایس یو کا سیٹ ٹریک آپ کو براہ راست انٹرنیشنل میرٹ پر پرکھتا ہے اور قدرات و تحصیلی سے مکمل استثناء دیتا ہے!'
          }
        };
      } else {
        return {
          winner: 'hybrid',
          title: {
            en: 'Retake SAT or Prepare for Qiyas Pathway',
            ar: 'إعادة اختبار السات أو الاستعداد لاختبارات قياس',
            ur: 'سیٹ دوبارہ دیں یا قیاس کی تیاری کریں'
          },
          body: {
            en: 'Because your SAT is currently below the 1350/650 gate, KFUPM early admission will not clear. We strongly advise taking the next Digital SAT sitting, while simultaneously registering for the Tahsili/Qudurat exams as an essential contingency.',
            ar: 'نظراً لأن نتيجتك الحالية دون حاجز الـ 1350/650، فلن يُقبل الملف عبر مسار السات المبكر. يُوصى بالتركيز على جلسة السات القادمة مع التسجيل الإلزامي في قياس كشبكة أمان.',
            ur: 'چونکہ اسکور ابھی 1350 کی حد سے کم ہے، اس لیے ارلی ایڈمیشن ممکن نہیں۔ اگلا ڈیجیٹل سیٹ دیں اور ساتھ ساتھ قیاس کے ٹیسٹ کی بھی تیاری رکھیں۔'
          }
        };
      }
    } else {
      // Saudi Citizen
      if (totalSat >= 1400) {
        return {
          winner: 'sat',
          title: {
            en: 'Fast-Track Advantage: Secure Seat via Early SAT',
            ar: 'ميزة الأسبقية: تثبيت المقعد مبكراً عبر السات',
            ur: 'ارلی سیٹ کے ذریعے داخلہ محفوظ بنائیں'
          },
          body: {
            en: 'Your 1400+ score unlocks early conditional admission at KFUPM months before the general high school graduation rush, with automatic exemption from national Tahsili stress.',
            ar: 'درجتك المرتفعة تتيح لك تثبيت مقعدك الجامعي مبكراً قبل تخرج الثانوية بأشهر، وتجنبك ضغوط المنافسة على المقاعد في الصيف.',
            ur: 'آپ کا شاندار اسکور آپ کو ہائی اسکول کے نتائج سے کئی ماہ قبل ہی کے ایف یو پی ایم میں کنفرم داخلہ دلوا سکتا ہے۔'
          }
        };
      } else {
        return {
          winner: 'qiyas',
          title: {
            en: 'Dual Strategy: Benchmark SAT vs. Mawzoonah',
            ar: 'استراتيجية مزدوجة: الموازنة بين السات والموزونة',
            ur: 'دوہری حکمت عملی: سیٹ اور موزونہ کا تقابل'
          },
          body: {
            en: 'If your projected Qudurat is 90+ and Tahsili 88+, standard Mawzoonah offers vast options across Riyadh, Eastern, and Western unified portals alongside your SAT application.',
            ar: 'إذا كانت درجاتك المتوقعة في القدرات والتحصيلي تتجاوز 90%، فإن مسار الموزونة العادي يمنحك خيارات رحبة في بوابات الرياض وجدة إلى جانب ملف السات.',
            ur: 'اگر قدرات اور تحصیلی میں 90+ اسکور ممکن ہے تو عام پورٹلز پر بھی آپ کے پاس وسیع مواقع موجود رہیں گے۔'
          }
        };
      }
    }
  }, [residency, totalSat, mathScore]);

  // GFM Markdown comparison table for Institutional SAT Guidelines
  const SAT_INSTITUTIONAL_TABLE = {
    en: `
| University / Academic Institution | Minimum SAT Requirement | Math Sub-Score Rule | Qiyas Exemption | Key Track Focus |
| :--- | :--- | :--- | :--- | :--- |
| **King Fahd University (KFUPM)** | **1350 / 1600** (Strict Minimum) | **$\\ge 650$** (700+ for CS/AI) | **100% Exempt** from Qudurat & Tahsili | Early Admission for Computing & Core Engineering. No superscoring. |
| **King Saud University (KSU)** | **1200+** (STEM) / **1060+** (General) | Recommended **$\\ge 620$** | **Exempt** on International Streams | College of Computer & Info Sciences, Engineering & Science. |
| **Alfaisal University (Riyadh)** | **1250+** (Full Admission) | **$\\ge 600$** | **Accepted** as alternative to Tahsili | College of Medicine, Engineering & Business (Merit Scholarships up to 100%). |
| **KAUST (Undergraduate STEM)** | **1450+** (Competitive Tier) | **$\\ge 750$** | Full Exemption | Fully funded global STEM fellowship with direct advanced research placement. |
`,
    ar: `
| الجامعة / المؤسسة الأكاديمية | الحد الأدنى المشروط لاختبار السات | شرط درجة الرياضيات (Math) | الإعفاء من قياس | أبرز المسارات والاشتراطات |
| :--- | :--- | :--- | :--- | :--- |
| **جامعة الملك فهد للبترول والمعادن (KFUPM)** | **1350 من 1600** (حد إلزامي قطعي) | **650+** (700+ للحاسب والذكاء الاصطناعي) | **إعفاء تام 100%** من القدرات والتحصيلي | القبول المبكر لهندسة الحاسب والتخصصات الهندسية. لا يُقبل السوبرسكور. |
| **جامعة الملك سعود (KSU)** | **1200+** (العلمي) / **1060+** (الأدبي) | يُوصى بتحقيق **620+** | **إعفاء** في المسارات الدولية والمنح | كلية علوم الحاسب، الهندسة، وإدارة الأعمال. |
| **جامعة الفيصل (الرياض)** | **1250+** (للقبول المباشر) | **600+** | **بديل معتمد** عن اختبار التحصيلي | كلية الطب البشري، الهندسة، وإدارة الأعمال (منح تفوق تصل إلى 100%). |
| **جامعة كاوست (برنامج البكالوريوس المرموق)** | **1450+** (تنافسي عالمي) | **750+** | إعفاء كامل | بعثة بحثية متكاملة ممولة بالكامل لرواد العلوم والابتكار التقني. |
`,
    ur: `
| یونیورسٹی / تعلیمی ادارہ | کم از کم سیٹ (SAT) اسکور | ریاضی کا کم از کم اسکور | قیاس سے استثناء | اہم مضامین اور شرائط |
| :--- | :--- | :--- | :--- | :--- |
| **کنگ فہد یونیورسٹی (KFUPM)** | **1350 از 1600** (لازمی حد) | **650+** (کمپیوٹر کے لیے 700+) | قدرات اور تحصیلی سے **100% استثناء** | ارلی ایڈمیشن، کمپیوٹر سائنس، انجینئرنگ۔ سوپراسکور قابل قبول نہیں۔ |
| **کنگ سعود یونیورسٹی (KSU)** | **1200+** (سائنس) / **1060+** (جنرل) | کم از کم **620+** تجویز کردہ | انٹرنیشنل ٹریکس میں استثناء | کمپیوٹر کالج، انجینئرنگ، بزنس ایڈمنسٹریشن۔ |
| **الفیصل یونیورسٹی (ریاض)** | **1250+** (براہ راست داخلہ) | **600+** | تحصیلی کا مصدقہ متبادل | میڈیکل، انجینئرنگ، بزنس (100% تک میرٹ اسکالرشپ)۔ |
| **کاوست (KAUST انڈرگریجویٹ)** | **1450+** (انتہائی سخت میرٹ) | **750+** | مکمل استثناء | مکمل فنڈڈ گلوبل ریسرچ فیلوشپ اور ایڈوانس لیبز۔ |
`
  };

  const customMarkdownComponents = {
    table: ({ node, ...props }: any) => (
      <div className="overflow-x-auto my-4 rounded-2xl border border-gray-200/80 shadow-xs">
        <table className="w-full text-left rtl:text-right border-collapse text-xs md:text-sm" {...props} />
      </div>
    ),
    thead: ({ node, ...props }: any) => (
      <thead className="bg-primary text-secondary font-serif uppercase tracking-wider text-[11px] md:text-xs" {...props} />
    ),
    tbody: ({ node, ...props }: any) => (
      <tbody className="divide-y divide-gray-100 bg-white" {...props} />
    ),
    tr: ({ node, ...props }: any) => (
      <tr className="even:bg-gray-50/50 hover:bg-emerald-50/40 transition-colors" {...props} />
    ),
    th: ({ node, ...props }: any) => (
      <th className="py-3 px-4 font-bold tracking-wider border-b border-white/10" {...props} />
    ),
    td: ({ node, ...props }: any) => (
      <td className="py-2.5 px-4 text-gray-700 leading-relaxed font-sans" {...props} />
    ),
    strong: ({ node, ...props }: any) => (
      <strong className="font-bold text-primary" {...props} />
    )
  };

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-150">
        <div>
          <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-[0.2em] mb-1">
            <Sparkles size={16} />
            <span>
              {currentLang === 'ar' ? 'حاسبة السات الدولي لكبرى الجامعات' : currentLang === 'ur' ? 'ڈیجیٹل سیٹ بینچ مارک کیلکولیٹر' : 'Digital SAT Benchmark & Admission Calculator'}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-primary">
            {currentLang === 'ar'
              ? 'معايير قبول السات الرقمي بجامعة الملك فهد وجامعة الملك سعود'
              : currentLang === 'ur'
              ? 'کنگ فہد اور کنگ سعود یونیورسٹی میں سیٹ اسکور کی بنیاد پر داخلہ'
              : 'Digital SAT Benchmark Engine: KFUPM & KSU Admissions'}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 font-light mt-1">
            {currentLang === 'ar'
              ? 'تقييم تنافسي مباشر لطلاب المدارس الدولية والدبلومة الأمريكية وخريجي الأنظمة العالمية للقبول المبكر والإعفاء من قياس.'
              : currentLang === 'ur'
              ? 'امریکن ڈپلومہ، کیمبرج اور انٹرنیشنل اسکولوں کے طلباء کے لیے کے ایف یو پی ایم اور کے ایس یو میں داخلے کا فوری تخمینہ۔'
              : 'Instant algorithmic assessment for American Diploma, British IGCSE, and IB graduates seeking early admission without Qiyas.'}
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold shrink-0">
          <Award size={15} className="text-secondary" />
          <span>{currentLang === 'ar' ? 'معتمد لمسار السات 2026–2027' : currentLang === 'ur' ? '2026-2027 ایڈمیشن' : 'KFUPM Track 2026–2027'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Target Track & Residency Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">
                {currentLang === 'ar' ? '1. التخصص والمسار المستهدف' : currentLang === 'ur' ? '1. مطلوبہ شعبہ' : '1. Target Discipline'}
              </label>
              <select
                value={majorTrack}
                onChange={(e) => setMajorTrack(e.target.value as MajorTrack)}
                className="w-full bg-paper border border-gray-200 rounded-2xl px-4 py-3 text-xs sm:text-sm font-semibold text-primary focus:outline-none focus:ring-2 focus:ring-secondary/50 cursor-pointer"
              >
                <option value="cs_ai">{currentLang === 'ar' ? 'علوم الحاسب والذكاء الاصطناعي (CS & AI)' : 'Computer Science, Software & AI'}</option>
                <option value="engineering">{currentLang === 'ar' ? 'الهندسة الميكانيكية والكيميائية والكهربائية' : 'Mechanical, Electrical & Chemical Engineering'}</option>
                <option value="business">{currentLang === 'ar' ? 'إدارة الأعمال والتقنية المالية (FinTech)' : 'Business Administration & FinTech'}</option>
                <option value="premed">{currentLang === 'ar' ? 'الطب والجراحة والعلوم الصحية (KSU / الفيصل)' : 'Medicine & Health Sciences (KSU / Alfaisal)'}</option>
                <option value="sciences">{currentLang === 'ar' ? 'العلوم الأساسية والفيزياء التطبيقية' : 'Applied Physics & Chemistry'}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">
                {currentLang === 'ar' ? '2. صفة المتقدم' : currentLang === 'ur' ? '2. رہائشی حیثیت' : '2. Applicant Residency'}
              </label>
              <select
                value={residency}
                onChange={(e) => setResidency(e.target.value as ResidencyType)}
                className="w-full bg-paper border border-gray-200 rounded-2xl px-4 py-3 text-xs sm:text-sm font-semibold text-primary focus:outline-none focus:ring-2 focus:ring-secondary/50 cursor-pointer"
              >
                <option value="expat">{currentLang === 'ar' ? 'مقيم في المملكة (غير سعودي - إقامة نظامية)' : 'Resident Expatriate in KSA'}</option>
                <option value="saudi">{currentLang === 'ar' ? 'مواطن سعودي (ثانوية عالمية أو أهلية)' : 'Saudi Citizen'}</option>
                <option value="international">{currentLang === 'ar' ? 'طالب دولي (خارج المملكة - ادرس في السعودية)' : 'International Applicant (Outside KSA)'}</option>
              </select>
            </div>
          </div>

          {/* Math Score Slider (Critical Sub-Score) */}
          <div className="bg-paper p-5 rounded-3xl border border-gray-200/80 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-primary">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                {currentLang === 'ar' ? 'درجة الرياضيات في السات (SAT Math - الأهم لجامعة الملك فهد)' : 'SAT Math Score (Critical for KFUPM Engineering)'}
              </span>
              <span className="text-lg font-serif font-black text-secondary">{mathScore} / 800</span>
            </div>
            <p className="text-[11px] text-gray-500 font-light">
              {currentLang === 'ar'
                ? 'الحد الأدنى القطعي لجامعة الملك فهد هو 650، بينما تتطلب هندسة الحاسب والذكاء الاصطناعي 700+ للتنافس القوي.'
                : 'KFUPM non-negotiable minimum is 650. Top-tier Computer Science & AI typically require 700+.'}
            </p>
            <div className="flex items-center gap-4 pt-2">
              <input
                type="range"
                min="400"
                max="800"
                step="10"
                value={mathScore}
                onChange={(e) => setMathScore(Number(e.target.value))}
                className="flex-grow accent-secondary cursor-pointer h-2 bg-gray-200 rounded-lg"
              />
              <input
                type="number"
                min="400"
                max="800"
                step="10"
                value={mathScore}
                onChange={(e) => setMathScore(Math.min(800, Math.max(200, Number(e.target.value))))}
                className="w-18 px-2 py-1.5 text-center font-bold text-sm bg-white border border-gray-200 rounded-xl"
              />
            </div>
          </div>

          {/* Reading & Writing (ERW) Slider */}
          <div className="bg-paper p-5 rounded-3xl border border-gray-200/80 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-primary">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                {currentLang === 'ar' ? 'درجة القراءة والكتابة (SAT Evidence-Based Reading & Writing)' : 'SAT Evidence-Based Reading & Writing (ERW)'}
              </span>
              <span className="text-lg font-serif font-black text-secondary">{erwScore} / 800</span>
            </div>
            <p className="text-[11px] text-gray-500 font-light">
              {currentLang === 'ar'
                ? 'تساهم في رفع المجموع الكلي للسات فوق حاجز الـ 1350 وحاجز الـ 1420 التنافسي.'
                : 'Crucial for elevating your composite score above the 1350 minimum and 1420+ competitive cutoff.'}
            </p>
            <div className="flex items-center gap-4 pt-2">
              <input
                type="range"
                min="400"
                max="800"
                step="10"
                value={erwScore}
                onChange={(e) => setErwScore(Number(e.target.value))}
                className="flex-grow accent-secondary cursor-pointer h-2 bg-gray-200 rounded-lg"
              />
              <input
                type="number"
                min="400"
                max="800"
                step="10"
                value={erwScore}
                onChange={(e) => setErwScore(Math.min(800, Math.max(200, Number(e.target.value))))}
                className="w-18 px-2 py-1.5 text-center font-bold text-sm bg-white border border-gray-200 rounded-xl"
              />
            </div>
          </div>

          {/* Curriculum & High School GPA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">
                {currentLang === 'ar' ? '3. النظام الثانوي' : currentLang === 'ur' ? '3. ہائی اسکول سسٹم' : '3. High School System'}
              </label>
              <select
                value={curriculum}
                onChange={(e) => setCurriculum(e.target.value as CurriculumType)}
                className="w-full bg-paper border border-gray-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-primary focus:outline-none focus:ring-2 focus:ring-secondary/50 cursor-pointer"
              >
                <option value="american">American High School Diploma</option>
                <option value="british">British Curriculum (IGCSE & A-Levels)</option>
                <option value="ib">International Baccalaureate (IB)</option>
                <option value="saudi">Saudi National Curriculum (مسارات ثانوية)</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-bold text-primary mb-2">
                <span>{currentLang === 'ar' ? '4. النسبة المئوية للثانوية' : '4. High School GPA / %'}</span>
                <span className="text-secondary font-black">{gpaScore}%</span>
              </div>
              <input
                type="range"
                min="75"
                max="100"
                step="0.5"
                value={gpaScore}
                onChange={(e) => setGpaScore(Number(e.target.value))}
                className="w-full accent-secondary cursor-pointer h-2 bg-gray-200 rounded-lg mt-2"
              />
            </div>
          </div>
        </div>

        {/* Right Output: Real-Time Benchmark Verdict Card (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-primary text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 emerald-gradient opacity-95 pointer-events-none" />
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-secondary/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-secondary">
                {currentLang === 'ar' ? 'المجموع الكلي لاختبار السات الرقمي' : 'Digital SAT Composite'}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-white font-mono text-xs font-bold">
                Max 1600
              </span>
            </div>

            <div className="text-center py-2">
              <div className="text-6xl sm:text-7xl font-serif font-black text-white tracking-tight">
                {totalSat}
              </div>
              <div className="flex justify-center items-center gap-3 text-xs text-white/70 mt-2 font-medium">
                <span>Math: <strong className="text-secondary">{mathScore}</strong></span>
                <span>•</span>
                <span>ERW: <strong className="text-white">{erwScore}</strong></span>
              </div>
            </div>

            {/* KFUPM Assessment Box */}
            <div className={cn("p-4 rounded-2xl border text-xs space-y-2", kfupmAssessment.color)}>
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs">KFUPM Admission Match:</span>
                <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase", kfupmAssessment.badgeColor)}>
                  {kfupmAssessment.matchPercentage}% Match
                </span>
              </div>
              <h5 className="font-serif font-bold text-sm">
                {kfupmAssessment.verdict[currentLang] || kfupmAssessment.verdict.en}
              </h5>
              <p className="text-[11px] leading-relaxed font-light">
                {kfupmAssessment.reason[currentLang] || kfupmAssessment.reason.en}
              </p>
            </div>

            {/* KSU Assessment Box */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white/80">King Saud University (KSU):</span>
                <span className="text-secondary font-bold">{ksuAssessment.probability} Probability</span>
              </div>
              <div className="text-xs font-bold text-white">
                {ksuAssessment.verdict[currentLang] || ksuAssessment.verdict.en}
              </div>
              <p className="text-[11px] text-white/70 leading-relaxed font-light">
                {ksuAssessment.reason[currentLang] || ksuAssessment.reason.en}
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-6 mt-6 border-t border-white/15">
            <a
              href="https://apply.kfupm.edu.sa/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full gold-gradient text-primary font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform text-xs uppercase tracking-widest shadow-lg"
            >
              <span>{currentLang === 'ar' ? 'زيارة بوابة السات لجامعة الملك فهد' : currentLang === 'ur' ? 'کے ایف یو پی ایم سیٹ پورٹل' : 'Open KFUPM SAT Admission Portal'}</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Strategic Decision Matrix: Digital SAT vs Qiyas Mawzoonah */}
      <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50/60 border border-emerald-200/80 space-y-4">
        <div className="flex items-center gap-2 text-primary font-bold text-sm">
          <Scale size={18} className="text-secondary" />
          <h4 className="font-serif font-bold text-base text-primary">
            {strategicAdvice.title[currentLang] || strategicAdvice.title.en}
          </h4>
        </div>
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
          {strategicAdvice.body[currentLang] || strategicAdvice.body.en}
        </p>
      </div>

      {/* Official Guidelines Table complying with RULE[AGENTS_md] */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-serif font-bold text-base text-primary flex items-center gap-2">
            <Info size={16} className="text-secondary" />
            <span>
              {currentLang === 'ar'
                ? 'المعايير المعتمدة لقبول السات في الجامعات السعودية'
                : currentLang === 'ur'
                ? 'سعودی جامعات میں سیٹ قبولیت کے سرکاری تقاضے'
                : 'Institutional SAT Benchmark Guidelines in Saudi Arabia'}
            </span>
          </h4>
        </div>

        <ReactMarkdown remarkPlugins={[remarkGfm]} components={customMarkdownComponents}>
          {SAT_INSTITUTIONAL_TABLE[currentLang] || SAT_INSTITUTIONAL_TABLE.en}
        </ReactMarkdown>
      </div>
    </div>
  );
};
