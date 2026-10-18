import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  GraduationCap, 
  Award, 
  Calculator, 
  CheckCircle, 
  Landmark, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  School, 
  ShieldCheck, 
  FileText 
} from 'lucide-react';

interface MawzoonahExplanatoryGuideProps {
  currentLang: 'en' | 'ar' | 'ur';
}

export const MawzoonahExplanatoryGuide: React.FC<MawzoonahExplanatoryGuideProps> = ({ currentLang }) => {
  const isRTL = currentLang === 'ar' || currentLang === 'ur';
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Trilingual Schema.org JSON-LD for HowTo and FAQPage targeting long-tail queries
  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        "name": currentLang === 'ar'
          ? "كيفية حساب النسبة الموزونة للقبول الجامعي في السعودية 1447هـ"
          : currentLang === 'ur'
          ? "سعودی جامعات کے لیے موزونہ اسکور کا حساب لگانے کا سرکاری طریقہ"
          : "How to Calculate Mawzoonah Percentage for Saudi University Admissions 2026",
        "description": currentLang === 'ar'
          ? "دليل تفصيلي خطوة بخطوة لمعادلة النسبة الموزونة المعتمدة من وزارة التعليم وهيئة تقويم التعليم (قياس)، وضوابط نسبة 5 بالمئة للطلاب المقيمين."
          : currentLang === 'ur'
          ? "سعودی وزارت تعلیم اور قیاس کے تحت موزونہ پرسنٹیج اور غیر ملکی طلبہ کے لیے 5 فیصد کوٹہ قوانین کا مکمل طریقہ کار۔"
          : "Official step-by-step mathematical guide to calculating the Saudi university Mawzoonah percentage and navigating the 5% expat admission quota.",
        "step": [
          {
            "@type": "HowToStep",
            "name": currentLang === 'ar' ? "تحديد وزن معدل الثانوية العامة" : currentLang === 'ur' ? "ہائی اسکول اسکور کا وزن" : "Determine High School Cumulative Weight",
            "text": currentLang === 'ar' ? "ضرب نسبة الثانوية العامة في الوزن المعتمد للجامعة (30% للمسار الصحي أو 20% للمسار الهندسي)." : currentLang === 'ur' ? "ہائی اسکول فیصد کو یونیورسٹی کے مقررہ وزن (30% یا 20%) سے ضرب دیں۔" : "Multiply cumulative high school GPA by the institutional weight (30% for health or 20% for engineering)."
          },
          {
            "@type": "HowToStep",
            "name": currentLang === 'ar' ? "احتساب وزن اختبار القدرات العامة (قياس)" : currentLang === 'ur' ? "قدرات ٹیسٹ کا اسکور" : "Calculate General Aptitude Test (Qudurat) Points",
            "text": currentLang === 'ar' ? "ضرب درجة القدرات العامة في وزنها المحدد للكلية (30% أو 40%)." : currentLang === 'ur' ? "قدرات ٹیسٹ کے نمبروں کو مختص کردہ وزن (30% یا 40%) سے ضرب دیں۔" : "Multiply Qudurat aptitude score by the specific college weight (30% or 40%)."
          },
          {
            "@type": "HowToStep",
            "name": currentLang === 'ar' ? "احتساب وزن الاختبار التحصيلي (قياس)" : currentLang === 'ur' ? "تحصیلی ٹیسٹ کا اسکور" : "Calculate Standardized Achievement (Tahsili) Points",
            "text": currentLang === 'ar' ? "ضرب درجة التحصيلي في وزنه الأكاديمي (40% للمسارات العلمية والصحية والهندسية)." : currentLang === 'ur' ? "تحصیلی اسکور کو سائنس و انجینئرنگ کے 40 فیصد وزن سے ضرب دیں۔" : "Multiply Tahsili achievement score by its faculty weight (40% for health and STEM tracks)."
          },
          {
            "@type": "HowToStep",
            "name": currentLang === 'ar' ? "جمع الأوزان واستخراج النسبة الموزونة النهائية" : currentLang === 'ur' ? "حتمی موزونہ فیصد کا مجموعہ" : "Sum Components for Final Composite Score",
            "text": currentLang === 'ar' ? "جمع النقاط الثلاث لاستخراج النسبة المئوية المركبة من 100% لمقارنتها بدرجات الفرز." : currentLang === 'ur' ? "تینوں اسکورز کو جمع کر کے کل 100 میں سے حتمی میرٹ اسکور حاصل کریں۔" : "Sum the three subtotal weighted points to generate the final composite admission percentage out of 100%."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How to calculate Mawzoonah percentage for Saudi university admissions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To calculate the Saudi university Mawzoonah percentage, multiply your High School GPA by its weight (e.g., 30%), your Qudurat aptitude score by its weight (e.g., 30%), and your Tahsili achievement score by its weight (e.g., 40%), then sum the products: Mawzoonah (%) = (High School × 0.30) + (Qudurat × 0.30) + (Tahsili × 0.40)."
            }
          },
          {
            "@type": "Question",
            "name": "What are the Saudi university 5 percent expat quota guidelines?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Under Ministry of Education regulations and Royal Decree M/27, Saudi public universities reserve up to a 5% quota of annual admission seats for resident non-Saudi expatriate students via Internal Government Scholarships (المنح الداخلية) on the Study in Saudi portal. Applicants must hold a valid regular Iqama, possess a Saudi high school certificate or MoE equivalency, and typically achieve a Mawzoonah score ≥ 90%."
            }
          },
          {
            "@type": "Question",
            "name": "Can resident expatriates apply to Medicine and Health Colleges under the 5% quota?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Clinical medicine, dentistry, and pharmacy programs in public universities are primarily restricted to Saudi citizens by ministerial directives. However, resident expatriates under the 5% quota have full access to high-demand tracks including Engineering, Computer Science, Artificial Intelligence, Business Administration, Architecture, and Natural Sciences."
            }
          },
          {
            "@type": "Question",
            "name": "What are the Digital SAT requirements for KFUPM and KSU international tracks?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "KFUPM typically requires a minimum composite Digital SAT score of 1350 with at least 650 to 700 in the Math section for fast-track international applicants, exempting qualified candidates from traditional Qudurat and Tahsili exams."
            }
          }
        ]
      }
    ]
  };

  const visibleFaqs = [
    {
      q: {
        en: 'How to calculate Mawzoonah percentage for Saudi university admissions?',
        ar: 'كيف يتم حساب النسبة الموزونة للقبول في الجامعات السعودية؟',
        ur: 'سعودی یونیورسٹی داخلوں کے لیے موزونہ پرسنٹیج کا حساب کیسے لگایا جاتا ہے؟'
      },
      a: {
        en: 'To calculate the Saudi university Mawzoonah percentage, multiply your High School GPA by 0.30, your Qudurat aptitude score by 0.30, and your Tahsili achievement score by 0.40, then sum the three products: Mawzoonah (%) = (High School × 0.30) + (Qudurat × 0.30) + (Tahsili × 0.40). For humanities tracks, it is typically: (High School × 0.50) + (Qudurat × 0.50).',
        ar: 'تُحسب النسبة الموزونة بضرب معدل الثانوية العامة في وزنه (30% للمسار الصحي)، ودرجة القدرات العامة في وزنها (30%)، ودرجة التحصيلي في وزنه (40%)، ثم جمع النواتج الثلاثة. أما الكليات النظرية فتعتمد غالباً على: 50% ثانوية + 50% قدرات.',
        ur: 'موزونہ اسکور نکالنے کے لیے اپنے ہائی اسکول اسکور کو 0.30، قدرات ٹیسٹ کو 0.30 اور تحصیلی ٹیسٹ کو 0.40 سے ضرب دے کر تینوں حاصل شدہ نمبروں کو جمع کریں: موزونہ = (ہائی اسکول × 30%) + (قدرات × 30%) + (تحصیلی × 40%)۔ نظریاتی شعبوں میں 50% ہائی اسکول اور 50% قدرات لیا جاتا ہے۔'
      }
    },
    {
      q: {
        en: 'What are the Saudi university 5 percent expat quota guidelines?',
        ar: 'ما هي ضوابط نسبة 5 بالمئة للطلاب المقيمين في الجامعات السعودية؟',
        ur: 'سعودی سرکاری جامعات میں مقیم غیر ملکی طلبہ کے لیے 5 فیصد کوٹہ کے کیا قواعد ہیں؟'
      },
      a: {
        en: 'Under Ministry of Education regulations and Royal Decree M/27, Saudi public universities reserve up to a 5% quota of annual admission seats for resident non-Saudi expatriate students via Internal Government Scholarships (المنح الداخلية) on the Study in Saudi portal. Applicants must hold a valid regular Iqama, possess a Saudi high school certificate or MoE equivalency, and typically achieve a Mawzoonah score ≥ 90% to compete successfully.',
        ar: 'بموجب تنظيمات وزارة التعليم والمرسوم الملكي (م/27)، تخصص الجامعات السعودية الحكومية نسبة تصل إلى 5% من مقاعد القبول السنوية للطلاب المقيمين غير السعوديين عبر نظام "المنح الدراسية الداخلية" على منصة "ادرس في السعودية". يشترط حمل إقامة نظامية سارية وشهادة ثانوية من داخل المملكة وتحقيق موزونة تنافسية تفوق 90% غالباً.',
        ur: 'سعودی وزارت تعلیم اور شاہی فرمان (م/27) کے تحت تمام سرکاری جامعات میں سالانہ نشستوں کا 5 فیصد کوٹہ غیر ملکی مقیم طلبہ کے لیے "انٹرنل اسکالرشپس" (المنح الداخلية) کی مد میں مختص ہوتا ہے۔ اس کے لیے درست اقامہ، سعودی ہائی اسکول سند اور عام طور پر 90 فیصد سے زائد مسابقتی موزونہ اسکور درکار ہوتا ہے۔'
      }
    },
    {
      q: {
        en: 'Can resident expatriates apply to Medicine and Health Colleges under the 5% quota?',
        ar: 'هل يحق للمقيمين التقديم على كليات الطب والصيدلة ضمن نسبة 5%؟',
        ur: 'کیا غیر ملکی طلبہ 5 فیصد کوٹہ کے تحت میڈیکل اور ڈینٹل کالجز میں داخلہ لے سکتے ہیں؟'
      },
      a: {
        en: 'Clinical medicine, dentistry, and pharmacy programs in public universities are primarily restricted to Saudi citizens by ministerial directives. However, resident expatriates under the 5% quota have full access to high-demand tracks including Engineering, Computer Science, Artificial Intelligence, Business Administration, Architecture, and Natural Sciences.',
        ar: 'تقتصر تخصصات الطب البشري وطب الأسنان والصيدلة في الجامعات الحكومية على المواطنين السعوديين بموجب التوجيهات الوزارية. ومع ذلك، يتاح للمقيمين التقديم على كليات الهندسة، علوم الحاسب، الذكاء الاصطناعي، إدارة الأعمال، العمارة، والعلوم التطبيقية.',
        ur: 'سرکاری جامعات میں ایم بی بی ایس، ڈینٹسٹری اور فارمیسی کے شعبے وزارتی احکامات کے تحت صرف سعودی شہریوں کے لیے مخصوص ہیں۔ تاہم، 5 فیصد کوٹے کے تحت مقیم طلبہ انجینئرنگ، کمپیوٹر سائنس، مصنوعی ذہانت (AI)، بزنس ایڈمنسٹریشن اور دیگر سائنسی شعبوں میں داخلے کے مکمل اہل ہیں۔'
      }
    },
    {
      q: {
        en: 'What are the Digital SAT requirements for KFUPM and KSU international tracks?',
        ar: 'ما هي متطلبات اختبار السات (Digital SAT) لجامعة الملك فهد وجامعة الملك سعود؟',
        ur: 'کے ایف یو پی ایم اور کنگ سعود یونیورسٹی کے لیے ڈیجیٹل سیٹ (SAT) کی کیا شرائط ہیں؟'
      },
      a: {
        en: 'KFUPM typically requires a minimum composite Digital SAT score of 1350 with at least 650 to 700 in the Math section for fast-track international applicants, exempting qualified candidates from traditional Qudurat and Tahsili exams. King Saud University also provides early admissions pathways for SAT holders in select STEM tracks.',
        ar: 'تشترط جامعة الملك فهد للبترول والمعادن (KFUPM) درجة مجمعة لا تقل عن 1350 في اختبار السات الرقمي (مع 650-700 كحد أدنى في قسم الرياضيات)، مما يعفي المتقدم من اختباري القدرات والتحصيلي. كما توفر جامعة الملك سعود مسارات قبول للمتفوقين الحاصلين على السات.',
        ur: 'کنگ فہد یونیورسٹی (KFUPM) عام طور پر ڈیجیٹل سیٹ میں کم از کم 1350 کمپوزٹ اسکور (ریاضی سیکشن میں کم از کم 650 تا 700) کا تقاضا کرتی ہے، جس سے طالب علم روایتی قدرات اور تحصیلی امتحانات سے مستثنیٰ ہو جاتا ہے۔ کنگ سعود یونیورسٹی بھی منتخب شعبوں میں سیٹ ہولڈرز کو ترجیحی داخلہ دیتی ہے۔'
      }
    }
  ];

  const markdownContentEn = `
## How to Calculate Mawzoonah Percentage (النسبة الموزونة): Step-by-Step Formula & Guide

Under the directives of the **Ministry of Education (MoE)** and the **Education and Training Evaluation Commission (ETEC / Qiyas)**, admission to public universities across the Kingdom of Saudi Arabia is determined by the **Mawzoonah (النسبة الموزونة)** composite formula.

### The Official Mathematical Formula Definition (Plain Text)

$$\\text{Mawzoonah (\\%)} = (\\text{High School GPA} \\times W_{hs}) + (\\text{Qudurat Aptitude} \\times W_q) + (\\text{Tahsili Achievement} \\times W_t)$$

#### Standard Institutional Weighting Distributions in Saudi Universities:
1. **Health, Medical & Clinical Track (KSU, PNU, KAU):**
   * High School Cumulative GPA Weight ($W_{hs}$): **30% (0.30)**
   * Qudurat General Aptitude Test Weight ($W_q$): **30% (0.30)**
   * Tahsili Standardized Achievement Weight ($W_t$): **40% (0.40)**
   * *Formula Sum:* $30\\% + 30\\% + 40\\% = 100\\%$
2. **Engineering, Computer Science & STEM (KFUPM National Standard):**
   * High School Cumulative GPA Weight ($W_{hs}$): **20% (0.20)**
   * Qudurat General Aptitude Test Weight ($W_q$): **40% (0.40)**
   * Tahsili Standardized Achievement Weight ($W_t$): **40% (0.40)**
   * *Formula Sum:* $20\\% + 40\\% + 40\\% = 100\\%$
3. **Humanities, Arts & Business Administration Track:**
   * High School Cumulative GPA Weight ($W_{hs}$): **50% (0.50)**
   * Qudurat General Aptitude Test Weight ($W_q$): **50% (0.50)**
   * *Formula Sum:* $50\\% + 50\\% = 100\\%$ (Tahsili exam not required for non-science majors)

---

### Step-by-Step Practical Numerical Case Study

**Candidate Profile:** An applicant seeking competitive admission to the **College of Computer & Information Sciences at King Saud University (KSU)** in Riyadh with the following verified examination scores:
* High School Cumulative GPA: **98.00%**
* Qudurat (GAT) Exam Score: **88.00%**
* Tahsili (SAAT) Exam Score: **92.00%**

| Assessment Component | Examination Result | Institutional Weight (%) | Earned Composite Points |
| :--- | :---: | :---: | ---: |
| **High School Cumulative GPA** | 98.00% | 30% (0.30) | **29.40 Points** |
| **Qudurat General Aptitude (Qiyas)** | 88.00% | 30% (0.30) | **26.40 Points** |
| **Tahsili Standardized Achievement (Qiyas)** | 92.00% | 40% (0.40) | **36.80 Points** |
| **Final Mawzoonah Composite Score** | **Standard STEM Matrix** | **100% (Sum)** | **92.60% (Qualified)** |

*Admission Sorting Analysis:* The candidate achieves a composite Mawzoonah score of **92.60%**. Comparing this against the historical computer science cutoff (**91.50%**), the applicant comfortably qualifies for first-round seat confirmation through the Unified Admission Portal.

---

### Official Legal & Ministerial Citations (E-E-A-T Foundation)

* **Saudi Universities Law:** Promulgated by **Royal Decree No. M/27**, empowering university boards to determine annual admission quotas, academic prerequisites, and weighted formula ratios.
* **Education and Training Evaluation Commission (ETEC / Qiyas):** Executive decree regulating standard scores, testing validity (5 Gregorian years for Qudurat and Tahsili), and instant electronic verification through the National Nafath single sign-on platform.
* **Ministry of Education Unified Admission Portal:** The regulatory authority governing electronic sorting, capacity allocation, and transparent applicant selection.

---

## Saudi University 5% Expat Quota Guidelines: Eligibility, Royal Decrees & Seat Allocation

Expatriate students residing inside Saudi Arabia are eligible to pursue undergraduate studies in premier public universities through the official **Internal Government Scholarship Program (المنح الدراسية الداخلية)** governed by **Royal Decree No. M/27** and Council of Ministers Resolutions.

### Statutory Basis & Quota Regulations
1. **The 5% Institutional Seat Allocation:** Under Ministry of Education policy, Saudi public universities reserve **up to 5% of their total annual admissions capacity** for non-Saudi resident students holding a valid Iqama.
2. **Tuition-Free Internal Scholarships:** Admitted resident students receive tuition-free higher education, academic library access, campus health center services, and student housing subsidies identical to domestic students.
3. **Eligible vs Restricted Academic Tracks:**
   * **Fully Eligible:** College of Engineering, Computer Science, Artificial Intelligence, Cybersecurity, Business Administration, Architecture, Accounting, and Applied Natural Sciences.
   * **Restricted to Saudi Nationals:** Medicine, Dentistry, Nursing, and Clinical Pharmacy are strictly reserved for Saudi citizens in public universities pursuant to Supreme Royal Directives.

---

### Comparative University Matrix: 5% Expat Quotas & Mawzoonah Benchmarks

| University Name & Location | Expat Admission Track | Required Assessment Formula | Historic Expat Cutoff | Eligible Majors Under Quota |
| :--- | :--- | :--- | :---: | :--- |
| **King Saud University (KSU - Riyadh)** | Internal Scholarship (Study in Saudi) | HS (30%) + Qudurat (30%) + Tahsili (40%) | **≥ 92.50%** | Engineering, CS, AI, Business, Sciences |
| **King Fahd Univ of Petroleum & Minerals (KFUPM - Dhahran)** | Digital SAT or Qiyas ETEC Fast-Track | Digital SAT ≥ 1350 or Mawzoonah | **≥ 95.00%** | All Engineering, Data Science, Physics |
| **King Abdulaziz University (KAU - Jeddah)** | Western Unified Admission Portal | HS (40%) + Qudurat (30%) + Tahsili (30%) | **≥ 90.00%** | Computing, Economics, Marine Sciences |
| **Princess Nourah University (PNU - Riyadh)** | Female Resident Internal Grants | HS (30%) + Qudurat (30%) + Tahsili (40%) | **≥ 89.00%** | Engineering, Graphic Design, Languages |
| **Umm Al-Qura University (UQU - Makkah)** | Unified Resident Scholarship Portal | HS (40%) + Qudurat (30%) + Tahsili (30%) | **≥ 88.50%** | Applied Sciences, Computing, Sharia |

*Note: Percentages sum exactly to 100% across all university criteria. Historical cutoffs are subject to annual applicant cohort sorting percentiles.*

---

### 4-Phase Step-by-Step Expat Application Roadmap on "Study in Saudi"

1. **Phase 1: Digital Identity & Iqama Verification**  
   Create an official applicant account on the **Study in Saudi (منصة ادرس في السعودية)** portal (\`studyinsaudi.moe.gov.sa\`). The applicant's Iqama residency must be valid for at least 6 months at the time of submission.
2. **Phase 2: High School Equivalency (Muadalah)**  
   Graduates from Saudi high schools submit their certificate directly. Students graduating from international curricula inside KSA (British IGCSE/A-Levels, American Diploma, CBSE) must secure an official Certificate Equivalency (\`المعادلة\`) from the Ministry of Education Examination Directorate.
3. **Phase 3: ETEC Qiyas Score Transmission**  
   Link your verified Qiyas identification number. Results for General Aptitude (Qudurat) and Standardized Achievement (Tahsili) are electronically pulled from the ETEC national database.
4. **Phase 4: Department Sorting & Electronic Seat Confirmation**  
   Select up to 10 ranked major preferences across participating universities. Once the university nomination is issued, accept the electronic scholarship grant within the 48-hour portal window to confirm admission.
`;

  const markdownContentAr = `
## كيفية حساب النسبة الموزونة (النسبة الموزونة): الدليل النظامي الشامل والمعادلات المعتمدة

بموجب تنظيمات **وزارة التعليم** و**هيئة تقويم التعليم والتدريب (مركز قياس)**، يُعتمد القبول في الجامعات الحكومية في المملكة العربية السعودية على **معادلة النسبة الموزونة المركبة**.

### التعريف الرياضي النظامي لمعادلة النسبة الموزونة

$$\\text{النسبة الموزونة (\\%)} = (\\text{معدل الثانوية العامة} \\times W_{hs}) + (\\text{درجة اختبار القدرات} \\times W_q) + (\\text{درجة الاختبار التحصيلي} \\times W_t)$$

#### توزيع الأوزان المعتمدة في الجامعات السعودية:
1. **المسار الصحي والكليات الطبية (جامعة الملك سعود، الأميرة نورة، الملك عبد العزيز):**
   * وزن الثانوية العامة التراكمي ($W_{hs}$): **30% (0.30)**
   * وزن اختبار القدرات العامة ($W_q$): **30% (0.30)**
   * وزن الاختبار التحصيلي ($W_t$): **40% (0.40)**
   * *مجموع أوزان المعادلة:* $30\\% + 30\\% + 40\\% = 100\\%$
2. **مسار الهندسة والحاسب والذكاء الاصطناعي (معيار جامعة الملك فهد KFUPM):**
   * وزن الثانوية العامة التراكمي ($W_{hs}$): **20% (0.20)**
   * وزن اختبار القدرات العامة ($W_q$): **40% (0.40)**
   * وزن الاختبار التحصيلي ($W_t$): **40% (0.40)**
   * *مجموع أوزان المعادلة:* $20\\% + 40\\% + 40\\% = 100\\%$
3. **مسار الكليات الإنسانية والإدارية والأدبية:**
   * وزن الثانوية العامة التراكمي ($W_{hs}$): **50% (0.50)**
   * وزن اختبار القدرات العامة ($W_q$): **50% (0.50)**
   * *مجموع أوزان المعادلة:* $50\\% + 50\\% = 100\\%$ (مع إعفاء الكليات النظرية من التحصيلي في أغلب الجامعات)

---

### دراسة حالة رقمية تطبيقية واقعية بالأرقام

**بيانات الطالب المتقدم:** طالب ثانوية عامة متقدم للقبول التنافسي في **كلية علوم الحاسب والمعلومات بجامعة الملك سعود** بالرياض وفق النتائج الموثقة التالية:
* معدل الثانوية العامة التراكمي: **98.00%**
* درجة اختبار القدرات العامة (قياس): **88.00%**
* درجة الاختبار التحصيلي للتخصصات العلمية (قياس): **92.00%**

| معيار التقييم الأكاديمي | الدرجة المحققة | الوزن المعتمد للجامعة (%) | النقاط الموزونة المكتسبة |
| :--- | :---: | :---: | ---: |
| **معدل الثانوية العامة التراكمي** | 98.00% | 30% (0.30) | **29.40 نقطة** |
| **اختبار القدرات العامة (قياس)** | 88.00% | 30% (0.30) | **26.40 نقطة** |
| **الاختبار التحصيلي للتخصصات العلمية** | 92.00% | 40% (0.40) | **36.80 نقطة** |
| **النسبة الموزونة المركبة النهائية** | **معيار التخصصات العلمية والهندسية** | **100% (مجموع الأوزان)** | **92.60% (مؤهل للفرز الأول)** |

*تحليل نتيجة القبول:* حقق الطالب نسبة موزونة نهائية قدرها **92.60%**، وهي تتجاوز الحد الأدنى التاريخي للفرز في تخصص علوم الحاسب (**91.50%**)، مما يمنحه أولوية الاستدعاء وتأكيد المقعد عبر بوابة القبول الموحد والنفاذ الوطني.

---

### السند التشريعي والمراجع النظامية المعتمدة (E-E-A-T)

* **نظام الجامعات السعودي:** الصادر بالمرسوم الملكي رقم (م/27)، الذي يمنح مجالس الجامعات صلاحية تحديد معايير ونسب القبول السنوية وتوزيع أوزان الموزونة.
* **هيئة تقويم التعليم والتدريب (قياس):** التنظيمات الرسمية لاختباري القدرات والتحصيلي وفترة صلاحية الدرجة (5 سنوات ميلادية) والربط الإلكتروني الفوري مع منصة نفاذ.
* **بوابة القبول الموحد لجامعات منطقة الرياض:** الدليل الإجرائي الصادر عن وزارة التعليم واللجنة الإشرافية للقبول الإلكتروني.

---

## ضوابط نسبة 5 بالمئة للطلاب المقيمين بالجامعات السعودية: الشروط، المراسيم الملكية وتوزيع المقاعد

يتاح للطلاب المقيمين داخل المملكة العربية السعودية التقديم على برامج البكالوريوس في الجامعات الحكومية المرموقة عبر نظام **المنح الدراسية الداخلية للطلاب غير السعوديين** بموجب **المرسوم الملكي رقم (م/27)** وقرارات مجلس الوزراء المنظمة.

### الأساس النظامي وضوابط توزيع المقاعد
1. **تخصيص نسبة الـ 5%:** تنص لوائح وزارة التعليم على تخصيص **نسبة لا تتجاوز 5% من إجمالي مقاعد القبول السنوية** في الجامعات الحكومية للطلاب المقيمين الحاملين لإقامة نظامية سارية.
2. **منح دراسية مجانية بالكامل:** يُعفى الطالب المقيم المقبول ضمن المنحة الداخلية من الرسوم الدراسية، ويتمتع بكافة الحقوق الأكاديمية والخدمات الصحية والمكتبية داخل الحرم الجامعي.
3. **التخصصات المتاحة مقابل التخصصات المقيدة:**
   * **تخصصات متاحة للمقيمين:** كليات الهندسة، علوم الحاسب، الذكاء الاصطناعي، الأمن السيبراني، إدارة الأعمال، العمارة، المحاسبة، والعلوم الطبيعية.
   * **تخصصات مقصورة على السعوديين:** تقتصر دراسة الطب البشري وطب الأسنان والتمريض والصيدلة الإكلينيكية في الجامعات الحكومية على المواطنين السعوديين فقط بأمر سامٍ كريم.

---

### جدول مقارنة الجامعات السعودية: نسبة 5% للمقيمين والحدود الدنيا للموزونة

| اسم الجامعة والمنطقة | مسار قبول المقيمين | معادلة وأوزان القبول المعتمدة | الحد الأدنى التاريخي للموزونة | أبرز الكليات المتاحة ضمن النسبة |
| :--- | :--- | :--- | :---: | :--- |
| **جامعة الملك سعود (الرياض)** | المنح الداخلية (ادرس في السعودية) | ثانوية (30%) + قدرات (30%) + تحصيلي (40%) | **≥ 92.50%** | الهندسة، الحاسب، الذكاء الاصطناعي، الأعمال |
| **جامعة الملك فهد للبترول والمعادن (الظهران)** | مسار السات الرقمي أو قياس الوطني | سات ≥ 1350 أو النسبة الموزونة | **≥ 95.00%** | كافة تخصصات الهندسة، علوم البيانات، الفيزياء |
| **جامعة الملك عبد العزيز (جدة)** | بوابة القبول الموحد للمنح | ثانوية (40%) + قدرات (30%) + تحصيلي (30%) | **≥ 90.00%** | الحوسبة، الاقتصاد والإدارة، علوم البحار |
| **جامعة الأميرة نورة (الرياض)** | المنح الداخلية للطالبات المقيمات | ثانوية (30%) + قدرات (30%) + تحصيلي (40%) | **≥ 89.00%** | الهندسة، التصميم، إدارة الأعمال، اللغات |
| **جامعة أم القرى (مكة المكرمة)** | بوابة المنح للمقيمين بالمنطقة | ثانوية (40%) + قدرات (30%) + تحصيلي (30%) | **≥ 88.50%** | العلوم التطبيقية، الحاسب، الشريعة والدراسات |

*ملاحظة: مجموع نسب الأوزان يساوي 100% بدقة، وتخضع الحدود الدنيا لمعايير الفرز والمفاضلة التنافسية سنوياً.*

---

### خارطة طريق التقديم خطوة بخطوة للطلاب المقيمين عبر منصة "ادرس في السعودية"

1. **المرحلة 1: إنشاء الحساب والتحقق من الإقامة**  
   الدخول على منصة **ادرس في السعودية** التابعة لوزارة التعليم (\`studyinsaudi.moe.gov.sa\`) وتسجيل الحساب، والتأكد من سريان مفعول الإقامة لمدة 6 أشهر على الأقل.
2. **المرحلة 2: معادلة الشهادة الثانوية (المعادلة)**  
   خريجو المدارس السعودية الحكومية والأهلية تُربط نتائجهم آلياً. أما خريجو المدارس العالمية داخل المملكة (البريطانية أو الأمريكية أو الهندية)، فيلزمهم استخراج معادلة رسمية من إدارة الاختبارات والمعادلات بوزارة التعليم.
3. **المرحلة 3: الربط الإلكتروني لدرجات قياس (ETEC)**  
   ربط رقم السجل المدني برقم المشترك في قياس لاستيراد درجات القدرات العامة والاختبار التحصيلي بشكل مباشر دون الحاجة لرفع مستندات ورقية.
4. **المرحلة 4: ترتيب الرغبات وتأكيد القبول الإلكتروني**  
   تحديد الرغبات الأكاديمية وترتيب الجامعات. عند صدور الترشيح المبدئي، يلزم تأكيد القبول إلكترونياً خلال المهلة المحددة (48 ساعة) لتثبيت المقعد الجامعي.
`;

  const markdownContentUr = `
## سعودی یونیورسٹی موزونہ اسکور کا حساب کیسے لگائیں (النسبة الموزونة): سرکاری فارمولہ اور مکمل گائیڈ

**سعودی وزارت تعلیم** اور **ایجوکیشن اینڈ ٹریننگ ایویلیوایشن کمیشن (قیاس ETEC)** کے قوانین کے تحت تمام سرکاری جامعات میں داخلے **موزونہ (النسبة الموزونة)** یعنی ویٹڈ کمپوزٹ فارمولے کے ذریعے کیے جاتے ہیں۔

### سرکاری ریاضیاتی فارمولے کی واضح تعریف (Plain Text)

$$\\text{موزونہ (\\%)} = (\\text{ہائی اسکول جی پی اے} \\times W_{hs}) + (\\text{قدرات اسکور} \\times W_q) + (\\text{تحصیلی اسکور} \\times W_t)$$

#### سعودی جامعات کے معیاری وزنی تناسب:
1. **میڈیکل اور ہیلتھ سائنسز ٹریک (کنگ سعود، پرنسس نورہ، کنگ عبدالعزیز):**
   * ہائی اسکول اسکور کا وزن ($W_{hs}$): **30% (0.30)**
   * جنرل ایپیٹیوڈ ٹیسٹ (قدرات) کا وزن ($W_q$): **30% (0.30)**
   * اسٹینڈرڈائزڈ اچیومنٹ ٹیسٹ (تحصیلی) کا وزن ($W_t$): **40% (0.40)**
   * *کل مجموعی وزن:* $30\\% + 30\\% + 40\\% = 100\\%$
2. **انجینئرنگ، کمپیوٹر سائنس اور ٹیکنالوجی (کنگ فہد یونیورسٹی KFUPM معیار):**
   * ہائی اسکول اسکور کا وزن ($W_{hs}$): **20% (0.20)**
   * جنرل ایپیٹیوڈ ٹیسٹ (قدرات) کا وزن ($W_q$): **40% (0.40)**
   * اسٹینڈرڈائزڈ اچیومنٹ ٹیسٹ (تحصیلی) کا وزن ($W_t$): **40% (0.40)**
   * *کل مجموعی وزن:* $20\\% + 40\\% + 40\\% = 100\\%$
3. **آرٹس، ہیومینٹیز اور بزنس ایڈمنسٹریشن ٹریک:**
   * ہائی اسکول اسکور کا وزن ($W_{hs}$): **50% (0.50)**
   * قدرات ٹیسٹ کا وزن ($W_q$): **50% (0.50)**
   * *کل مجموعی وزن:* $50\\% + 50\\% = 100\\%$ (نظریاتی شعبوں میں تحصیلی ٹیسٹ سے استثنیٰ)

---

### مرحلہ وار حسابی و حقیقی کیس اسٹڈی (مکمل حساب کتاب)

**طالب علم کا پروفائل:** ایک طالب علم جس نے ریاض کی **کنگ سعود یونیورسٹی (فیکلٹی آف کمپیوٹر اینڈ انفارمیشن سائنسز)** میں داخلے کے لیے درخواست دی ہے اور اس کے امتحانی نتائج درج ذیل ہیں:
* ہائی اسکول مجموعی اسکور: **98.00%**
* قدرات ٹیسٹ (قیاس) کا اسکور: **88.00%**
* تحصیلی ٹیسٹ (قیاس) کا اسکور: **92.00%**

| تعلیمی امتحانی معیار | حاصل کردہ نمبر | یونیورسٹی کا مقررہ وزن (%) | حاصل شدہ حتمی پوائنٹس |
| :--- | :---: | :---: | ---: |
| **ہائی اسکول مجموعی اسکور** | 98.00% | 30% (0.30) | **29.40 پوائنٹس** |
| **قدرات جنرل ایپیٹیوڈ ٹیسٹ (قیاس)** | 88.00% | 30% (0.30) | **26.40 پوائنٹس** |
| **تحصیلی اچیومنٹ ٹیسٹ (قیاس)** | 92.00% | 40% (0.40) | **36.80 پوائنٹس** |
| **حتمی موزونہ میرٹ اسکور** | **سائنس و ٹیکنالوجی اسٹینڈرڈ** | **100% (مجموعہ)** | **92.60% (کامیاب و اہل)** |

*داخلے کے نتائج کا تجزیہ:* اس طالب علم کا حتمی موزونہ اسکور **92.60%** بنا ہے، جو کمپیوٹر سائنس کے عمومی کٹ آف اسکور (**91.50%**) سے زیادہ ہے۔ یہ اسکور طالب علم کو پہلے راؤنڈ میں سیٹ کی تصدیق اور پورٹل پر داخلے کی فراہمی کا اہل بناتا ہے۔

---

### سرکاری قانونی بنیادیں اور وزارتی احکامات (E-E-A-T)

* **سعودی جامعات کا قانون:** شاہی فرمان نمبر (م/27) کے تحت جامعات کی سپریم کونسل کو داخلے کے سالانہ معیارات اور کوٹہ مقرر کرنے کے قانونی اختیارات حاصل ہیں۔
* **ایجوکیشن اینڈ ٹریننگ ایویلیوایشن کمیشن (قیاس ETEC):** قدرات اور تحصیلی ٹیسٹ کی 5 سالہ قانونی میعاد اور قومی پلیٹ فارم 'نفاذ' کے ساتھ خودکار تصدیق کا نظام۔
* **ریاض یونیفائیڈ ایڈمشن پورٹل گائیڈ لائنز:** تعلیمی سال 1447ھ / 2026ء کے لیے پبلک جامعات کے مابین مشترکہ شفاف داخلہ پالیسی۔

---

## سعودی جامعات میں غیر ملکیوں کا 5 فیصد کوٹہ اصول: شرائط، شاہی احکامات اور داخلہ گائیڈ لائنز

سعودی عرب میں مقیم غیر ملکی طلباء سرکاری جامعات میں بیچلر ڈگری کے لیے **انٹرنل اسکالرشپس (المنح الدراسية الداخلية)** کے تحت درخواست دینے کے اہل ہیں، جو **شاہی فرمان نمبر (م/27)** اور کابینہ کی قراردادوں کے تحت ریگولیٹ ہوتا ہے۔

### قانونی بنیاد اور کوٹہ کے بنیادی قواعد
1. **جامعات میں 5 فیصد مخصوص کوٹہ:** وزارت تعلیم کے اصولوں کے مطابق تمام پبلک جامعات میں سالانہ داخلوں کی کل تعداد کا **5 فیصد تک کوٹہ** مقیم اقامہ ہولڈرز کے لیے مختص ہوتا ہے۔
2. **مکمل مفت ٹیوشن اسکالرشپ:** اسکالرشپ کے تحت منتخب ہونے والے مقیم طلباء کو بغیر کسی فیس کے اعلیٰ تعلیم، کیمپس ہیلتھ کیئر اور لائبریری کی تمام سہولیات فراہم کی جاتی ہیں۔
3. **اہل بمقابلہ محدود شعبہ جات:**
   * **مکمل اہل شعبے:** انجینئرنگ، کمپیوٹر سائنس، مصنوعی ذہانت (AI)، سائبر سیکیورٹی، بزنس ایڈمنسٹریشن، آرکیٹیکچر اور اپلائیڈ سائنسز۔
   * **صرف شہریوں کے لیے مخصوص:** سرکاری جامعات میں ہیومن میڈیسن، ڈینٹسٹری، نرسنگ اور فارمیسی کے شعبے شاہی احکامات کے تحت صرف سعودی شہریوں کے لیے ہیں۔

---

### سعودی جامعات کا تقابلی جدول: مقیم طلبہ کا 5% کوٹہ اور میرٹ کٹ آف

| یونیورسٹی اور شہر | مقیم طلبہ کا داخلہ ٹریک | لازمی امتحانات کا حسابی فارمولہ | تاریخی موزونہ کٹ آف | کوٹہ کے تحت دستیاب اہم شعبے |
| :--- | :--- | :--- | :---: | :--- |
| **کنگ سعود یونیورسٹی (KSU - ریاض)** | انٹرنل اسکالرشپ (اسٹڈی ان سعودی) | ہائی اسکول (30%) + قدرات (30%) + تحصیلی (40%) | **≥ 92.50%** | انجینئرنگ، کمپیوٹر، اے آئی، بزنس، سائنس |
| **کنگ فہد یونیورسٹی آف پیٹرولیم اینڈ منرلز (KFUPM - الظهران)** | ڈیجیٹل سیٹ یا قیاس فاسٹ ٹریک | ڈیجیٹل سیٹ ≥ 1350 یا موزونہ اسکور | **≥ 95.00%** | تمام انجینئرنگ، ڈیٹا سائنس، فزکس |
| **کنگ عبدالعزیز یونیورسٹی (KAU - جدہ)** | ویسٹرن یونیفائیڈ ایڈمشن پورٹل | ہائی اسکول (40%) + قدرات (30%) + تحصیلی (30%) | **≥ 90.00%** | کمپیوٹنگ، اکنامکس، میرین سائنسز |
| **پرنسس نورہ یونیورسٹی (PNU - ریاض)** | خواتین مقیم طلبہ کی انٹرنل گرانٹ | ہائی اسکول (30%) + قدرات (30%) + تحصیلی (40%) | **≥ 89.00%** | انجینئرنگ، ڈیزائن، بزنس، زبانیں |
| **ام القریٰ یونیورسٹی (UQU - مکہ مکرمہ)** | مکہ ریجنل اسکالرشپ پورٹل | ہائی اسکول (40%) + قدرات (30%) + تحصیلی (30%) | **≥ 88.50%** | اپلائیڈ سائنسز، کمپیوٹر، شریعہ و اسٹڈیز |

*نوٹ: تمام اوزان کا مجموعہ درست 100% بنتا ہے، اور داخلے مسابقتی میرٹ پر دیے جاتے ہیں۔*

---

### 'اسٹڈی ان سعودی' پورٹل کے ذریعے غیر ملکی طلبہ کا مرحلہ وار طریقہ کار

1. **پہلا مرحلہ: ڈیجیٹل پروفائل اور اقامہ کی تصدیق**  
   وزارت تعلیم کے سرکاری پورٹل **Study in Saudi** (\`studyinsaudi.moe.gov.sa\`) پر جائیں۔ درخواست جمع کرواتے وقت اقامہ کی مدت کم از کم 6 ماہ باقی ہونا لازمی ہے۔
2. **دوسرا مرحلہ: ہائی اسکول سند کی سرکاری معادلہ (موازنہ)**  
   سعودی اسکولوں کے طلباء کا ڈیٹا خودکار تصدیق ہوتا ہے۔ انٹرنیشنل اسکولوں (برٹش، امریکن، کیمبرج یا فیڈرل بورڈ) کے فارغ التحصیل طلباء کے لیے وزارت تعلیم سے معادلہ سرٹیفکیٹ حاصل کرنا لازمی ہے۔
3. **تیسرا مرحلہ: قیاس امتحانی نتائج کی ترسیل**  
   اپنے قیاس اکاؤنٹ کو قومی نفاذ کے ذریعے منسلک کریں۔ قدرات اور تحصیلی ٹیسٹ کے نمبرات خودکار طور پر پورٹل میں شامل ہو جاتے ہیں۔
4. **چوتھا مرحلہ: شعبہ جات کی ترجیحات اور حتمی تصدیق**  
   مختلف جامعات کے 10 تک تعلیمی شعبے منتخب کریں۔ یونیورسٹی کی طرف سے سیٹ الاٹ ہونے پر پورٹل پر دیے گئے 48 گھنٹوں کے اندر الیکٹرانک منظوری پر کلک کر کے اپنی سیٹ کنفرم کریں۔
`;

  const currentMarkdown = currentLang === 'ar' 
    ? markdownContentAr 
    : currentLang === 'ur' 
    ? markdownContentUr 
    : markdownContentEn;

  return (
    <section 
      id="mawzoonah-editorial-guide"
      className="mt-12 bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-xl relative overflow-hidden" 
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* JSON-LD Structured Data Injection for Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />

      {/* Decorative Gold & Emerald Blurs */}
      <div className="absolute top-0 right-0 w-80 h-80 gold-gradient opacity-[0.05] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 emerald-gradient opacity-[0.04] rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-100 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl gold-gradient text-primary flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20 font-bold">
            <GraduationCap size={30} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">
                {currentLang === 'ar' ? 'المعايير المعتمدة من وزارة التعليم' : currentLang === 'ur' ? 'وزارت تعلیم اور قیاس کے معیارات' : 'Ministry of Education & Qiyas Certified'}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                1447H / 2026 Academic Year
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary">
              {currentLang === 'ar'
                ? 'الدليل النظامي لاحتساب النسبة الموزونة وضوابط نسبة 5% للمقيمين'
                : currentLang === 'ur'
                ? 'سعودی یونیورسٹی موزونہ اسکور اور غیر ملکی طلبہ کا 5 فیصد کوٹہ گائیڈ'
                : 'How to Calculate Mawzoonah Percentage & Saudi University 5% Expat Quota Guidelines'}
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <div className="flex items-center gap-2 bg-paper px-4 py-2 rounded-2xl border border-gray-100 text-xs font-semibold text-gray-600">
            <Landmark size={15} className="text-secondary" />
            <span>{currentLang === 'ar' ? 'المرسوم الملكي م/27' : currentLang === 'ur' ? 'شاہی فرمان م/27' : 'Royal Decree No. M/27'}</span>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 px-3.5 py-2 rounded-2xl border border-emerald-100 text-xs font-bold text-emerald-800">
            <School size={15} className="text-emerald-700" />
            <span>{currentLang === 'ar' ? 'منصة ادرس في السعودية' : currentLang === 'ur' ? 'اسٹڈی ان سعودی' : 'Study in Saudi Portal'}</span>
          </div>
        </div>
      </div>

      {/* Quick Distribution Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
        <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center gap-3">
          <Award size={24} className="text-emerald-700 shrink-0" />
          <div>
            <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
              {currentLang === 'ar' ? 'المسار الصحي (الطب وطب الأسنان)' : currentLang === 'ur' ? 'میڈیکل و ہیلتھ ٹریک' : 'Health & Medicine Track'}
            </div>
            <div className="text-sm font-bold text-emerald-950">
              30% ثانوية • 30% قدرات • 40% تحصيلي
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center gap-3">
          <Calculator size={24} className="text-blue-700 shrink-0" />
          <div>
            <div className="text-[10px] font-bold text-blue-800 uppercase tracking-wider">
              {currentLang === 'ar' ? 'المسار الهندسي والتقني (KFUPM)' : currentLang === 'ur' ? 'انجینئرنگ و ٹیکنالوجی ٹریک' : 'Engineering & STEM Track'}
            </div>
            <div className="text-sm font-bold text-blue-950">
              20% ثانوية • 40% قدرات • 40% تحصيلي
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 flex items-center gap-3">
          <CheckCircle size={24} className="text-amber-800 shrink-0" />
          <div>
            <div className="text-[10px] font-bold text-amber-900 uppercase tracking-wider">
              {currentLang === 'ar' ? 'نسبة 5% للطلاب المقيمين' : currentLang === 'ur' ? 'مقیم طلبہ کا 5% کوٹہ' : '5% Expat Resident Quota'}
            </div>
            <div className="text-sm font-bold text-amber-950">
              {currentLang === 'ar' ? 'منح داخلية مجانية لكافة المقيمين' : currentLang === 'ur' ? 'مفت ٹیوشن و اسکالرشپ گرانٹ' : 'Tuition-Free Internal Grants'}
            </div>
          </div>
        </div>
      </div>

      {/* Render Markdown Content with Strict GFM Tables & Emerald Styling */}
      <div className="prose prose-slate max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            table: ({ node, ...props }) => (
              <div className="overflow-x-auto my-8 rounded-2xl border border-emerald-900/10 shadow-lg bg-gradient-to-b from-white to-emerald-50/20 p-2 ring-1 ring-black/5">
                <table {...props} className="min-w-full text-sm border-collapse" />
              </div>
            ),
            thead: ({ node, ...props }) => (
              <thead {...props} className="bg-primary text-white rounded-t-xl" />
            ),
            th: ({ node, ...props }) => (
              <th {...props} className="px-5 py-3.5 text-left rtl:text-right text-xs font-bold text-secondary uppercase tracking-[0.15em] border-b border-emerald-800" />
            ),
            td: ({ node, ...props }) => (
              <td {...props} className="px-5 py-3.5 text-sm text-gray-700 border-b border-gray-100/80 font-normal" />
            ),
            tr: ({ node, ...props }) => (
              <tr {...props} className="hover:bg-emerald-50/40 transition-colors even:bg-gray-50/50" />
            ),
            h2: ({ node, ...props }) => (
              <h2 {...props} className="text-2xl md:text-3xl font-serif font-bold text-primary mt-12 mb-6 pb-3 border-b border-gray-100 flex items-center gap-3">
                <span className="w-3 h-8 rounded-full gold-gradient inline-block shrink-0" />
                {props.children}
              </h2>
            ),
            h3: ({ node, ...props }) => (
              <h3 {...props} className="text-xl md:text-2xl font-serif font-bold text-primary mt-10 mb-4 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary inline-block shrink-0" />
                {props.children}
              </h3>
            ),
            h4: ({ node, ...props }) => (
              <h4 {...props} className="text-base font-bold text-primary/90 mt-6 mb-3 flex items-center gap-2" />
            ),
            p: ({ node, ...props }) => (
              <p {...props} className="text-gray-600 leading-relaxed text-sm md:text-base mb-4 font-light" />
            ),
            ul: ({ node, ...props }) => (
              <ul {...props} className="space-y-2 mb-6 text-sm md:text-base text-gray-600 list-disc list-inside" />
            ),
            li: ({ node, ...props }) => (
              <li {...props} className="leading-relaxed" />
            )
          }}
        >
          {currentMarkdown}
        </ReactMarkdown>
      </div>

      {/* Visible Interactive FAQ Accordion for Search Engine Crawlers & Snippets */}
      <div className="mt-14 pt-10 border-t border-gray-100 relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="text-secondary" size={24} />
          <h3 className="text-xl md:text-2xl font-serif font-bold text-primary">
            {currentLang === 'ar'
              ? 'الأسئلة الشائعة حول النسبة الموزونة وقبول المقيمين'
              : currentLang === 'ur'
              ? 'موزونہ اسکور اور مقیم طلبہ کے داخلوں کے اہم ترین سوالات'
              : 'Frequently Asked Questions: Mawzoonah & Expat Quota Guidelines'}
          </h3>
        </div>

        <div className="space-y-4">
          {visibleFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={`mawzoonah-vis-faq-${idx}`} 
                className="bg-paper rounded-2xl border border-gray-100 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left rtl:text-right p-5 flex items-center justify-between gap-4 font-bold text-primary text-sm md:text-base hover:text-secondary transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span>{faq.q[currentLang]}</span>
                  </div>
                  {isOpen ? <ChevronUp size={18} className="shrink-0 text-secondary" /> : <ChevronDown size={18} className="shrink-0 text-gray-400" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs md:text-sm text-gray-600 leading-relaxed font-light border-t border-gray-100/60 pt-3">
                    {faq.a[currentLang]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
