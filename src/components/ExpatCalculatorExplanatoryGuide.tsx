import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  BookOpen, 
  Scale, 
  Calculator, 
  CheckCircle2, 
  FileText, 
  Landmark, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  DollarSign 
} from 'lucide-react';

interface ExpatCalculatorExplanatoryGuideProps {
  currentLang: 'en' | 'ar' | 'ur';
}

export const ExpatCalculatorExplanatoryGuide: React.FC<ExpatCalculatorExplanatoryGuideProps> = ({ currentLang }) => {
  const isRTL = currentLang === 'ar' || currentLang === 'ur';
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Trilingual Schema.org JSON-LD (HowTo and FAQPage) targeting long-tail expat queries
  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        "name": currentLang === 'ar' 
          ? "كيفية احتساب مكافأة نهاية الخدمة ورسوم المقيمين في السعودية" 
          : currentLang === 'ur'
          ? "سعودی عرب میں اینڈ آف سروس گریجویٹی اور اقامہ فیس کا حساب کیسے لگائیں"
          : "How to Calculate Saudi End of Service Gratuity & Expat Fees",
        "description": currentLang === 'ar'
          ? "دليل تفصيلي خطوة بخطوة لحساب مكافأة نهاية الخدمة بموجب المادتين 84 و 85 من نظام العمل السعودي، والمقابل المالي للمرافقين."
          : currentLang === 'ur'
          ? "سعودی لیبر لاء کے آرٹیکل 84 اور 85 کے تحت گریجویٹی اور فیملی لیوی کا مستند طریقہ کار۔"
          : "Step-by-step regulatory calculation guide for Saudi End of Service Benefits (EOSB) under Articles 84 and 85 of the Labor Law.",
        "step": [
          {
            "@type": "HowToStep",
            "name": currentLang === 'ar' ? "تحديد الأجر الفعلي الأخير" : currentLang === 'ur' ? "آخری تنخواہ کا تعین" : "Determine the Final Comprehensive Wage",
            "text": currentLang === 'ar' ? "احتساب الراتب الأساسي مضافاً إليه كافة البدلات الثابتة (السكن والنقل)." : currentLang === 'ur' ? "بنیادی تنخواہ بمعہ تمام مقررہ الاؤنسز (رہائش و ٹرانسپورٹ) شامل کریں۔" : "Sum the basic salary plus all fixed recurring allowances (housing, transport)."
          },
          {
            "@type": "HowToStep",
            "name": currentLang === 'ar' ? "تطبيق معامل سنوات الخدمة (المادة 84)" : currentLang === 'ur' ? "مدت ملازمت کا فارمولہ (آرٹیکل 84)" : "Apply Tenure Entitlement (Article 84)",
            "text": currentLang === 'ar' ? "نصف أجر شهر عن كل سنة من السنوات الخمس الأولى، وأجر شهر كامل عن كل سنة تالية." : currentLang === 'ur' ? "پہلے پانچ سالوں کے لیے نصف ماہ کی تنخواہ فی سال، اور بعد کے ہر سال کے لیے ایک مکمل ماہ کی تنخواہ۔" : "Half month wage per year for the first 5 years, plus a full month wage for each subsequent year."
          },
          {
            "@type": "HowToStep",
            "name": currentLang === 'ar' ? "تطبيق نسبة الاستحقاق في حال الاستقالة (المادة 85)" : currentLang === 'ur' ? "استعفیٰ کی صورت میں کٹوتی کا اصول (آرٹیکل 85)" : "Apply Resignation Adjustment Ratio (Article 85)",
            "text": currentLang === 'ar' ? "أقل من سنتين: لا شيء؛ من سنتين إلى 5 سنوات: الثلث؛ من 5 إلى 10 سنوات: الثلثان؛ 10 سنوات فأكثر: المكافأة كاملة." : currentLang === 'ur' ? "2 سال سے کم: صفر؛ 2 تا 5 سال: ایک تہائی؛ 5 تا 10 سال: دو تہائی؛ 10 سال یا زائد: مکمل رقم۔" : "Under 2 years: 0%; 2 to 5 years: 1/3rd; 5 to 10 years: 2/3rds; 10+ years: 100% full entitlement."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the official statutory formula for Saudi End of Service Gratuity?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Under Article 84 of the Saudi Labor Law (Decree M/51), End of Service Gratuity = (Last Comprehensive Wage ÷ 2) × (First 5 Years) + (Last Comprehensive Wage × Years thereafter). If the employee resigns voluntarily, Article 85 applies: 0% under 2 years, 33.33% for 2 to 5 years, 66.67% for 5 to 10 years, and 100% for 10 or more years."
            }
          },
          {
            "@type": "Question",
            "name": "What is the official rate for the expat dependent levy in Saudi Arabia?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The expatriate dependent fee (Marfoqeen levy) is SAR 400 per month for each dependent registered under the expat worker Iqama. The total fee is calculated as: Number of Dependents × SAR 400 × Number of Months of Iqama Renewal, payable in advance via SADAD."
            }
          },
          {
            "@type": "Question",
            "name": "How is single vs multiple exit re-entry visa fee calculated?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "According to General Directorate of Passports (Jawazat) regulations: A Single Exit & Re-Entry visa costs SAR 200 for up to 60 days, plus SAR 100 for each additional month. A Multiple Exit & Re-Entry visa costs SAR 500 for up to 90 days, plus SAR 200 for each additional month."
            }
          },
          {
            "@type": "Question",
            "name": "When must an employer pay the final settlement after contract termination?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Under Article 88 of the Saudi Labor Law, if the employer terminates the employee, all final dues and end-of-service awards must be paid within one week. If the employee resigns, the employer must settle all dues within two weeks."
            }
          }
        ]
      }
    ]
  };

  const visibleFaqs = [
    {
      q: {
        en: 'What is the official statutory formula for Saudi End of Service Gratuity?',
        ar: 'ما هو الأساس الحسابي لمكافأة نهاية الخدمة في نظام العمل السعودي؟',
        ur: 'سعودی لیبر لاء میں اینڈ آف سروس گریجویٹی کا سرکاری فارمولہ کیا ہے؟'
      },
      a: {
        en: 'Under Article 84 of the Saudi Labor Law (Royal Decree M/51), End of Service Gratuity = (Last Comprehensive Wage ÷ 2) × (First 5 Years) + (Last Comprehensive Wage × Years thereafter). If the employee resigns voluntarily, Article 85 applies: 0% under 2 years, 33.33% for 2 to 5 years, 66.67% for 5 to 10 years, and 100% for 10 or more years.',
        ar: 'بموجب المادة 84 من نظام العمل السعودي (المرسوم الملكي م/51)، تُحسب مكافأة نهاية الخدمة كالتالي: (الأجر الفعلي الأخير ÷ 2) عن كل سنة من السنوات الخمس الأولى + (أجر شهر كامل) عن كل سنة تالية. وفي حال الاستقالة تُطبق المادة 85: لا شيء لأقل من سنتين، ثلث المكافأة من 2 إلى 5 سنوات، ثلثا المكافأة من 5 إلى 10 سنوات، والمكافأة كاملة لـ 10 سنوات فأكثر.',
        ur: 'سعودی لیبر لاء آرٹیکل 84 کے تحت پہلے 5 سال کے لیے ہر سال آدھی تنخواہ اور اس کے بعد ہر سال کی مکمل تنخواہ دی جاتی ہے: (آخری تنخواہ ÷ 2 × پہلے 5 سال) + (آخری تنخواہ × بقیہ سال)۔ استعفیٰ کی صورت میں آرٹیکل 85 کے تحت: 2 سال سے کم پر 0%، 2 تا 5 سال پر ایک تہائی (33%)، 5 تا 10 سال پر دو تہائی (66%)، اور 10 سال سے زائد پر 100% ادا کیا جاتا ہے۔'
      }
    },
    {
      q: {
        en: 'What is the official rate for the expat dependent levy in Saudi Arabia?',
        ar: 'كم تبلغ رسوم المرافقين والتابعين للمقيم في المملكة العربية السعودية؟',
        ur: 'سعودی عرب میں مقیم غیر ملکیوں کے فیملی ڈیپینڈنٹ (مرافقین) کی ماہانہ فیس کتنی ہے؟'
      },
      a: {
        en: 'The expatriate dependent fee (Marfoqeen levy) is fixed at SAR 400 per month for each dependent registered under the expat worker Iqama. The total fee is calculated as: Number of Dependents × SAR 400 × Number of Months of Iqama Renewal, payable in advance via SADAD.',
        ar: 'تبلغ رسوم المرافقين والتابعين 400 ريال سعودي شهرياً عن كل مرافق مسجل في سجل المقيم. وتُحسب بالمعادلة: عدد المرافقين × 400 ريال × عدد أشهر تجديد الإقامة، وتُسدد مسبقاً عبر نظام سداد المعتمد.',
        ur: 'فیملی ممبر (مرافق) کے لیے ماہانہ 400 سعودی ریال فیس مقرر ہے۔ فارمولہ: مرافقین کی تعداد × 400 ریال × اقامہ تجدید کے مہینے۔ یہ رقم اقامہ تجدید یا خروج نہائی سے قبل سداد کے ذریعے پیشگی ادا کی جاتی ہے۔'
      }
    },
    {
      q: {
        en: 'How is single vs multiple exit re-entry visa fee calculated?',
        ar: 'كيف تُحسب رسوم تأشيرة الخروج والعودة المفردة والمتعددة؟',
        ur: 'سنگل اور ملٹیپل ایگزٹ ری انٹری (خروج و عودہ) ویزا فیس کا کیا فارمولہ ہے؟'
      },
      a: {
        en: 'According to Jawazat regulations: A Single Exit & Re-Entry visa costs SAR 200 for up to 60 days (2 months), plus SAR 100 for each additional month. A Multiple Exit & Re-Entry visa costs SAR 500 for up to 90 days (3 months), plus SAR 200 for each additional month, conditioned upon valid Iqama duration.',
        ar: 'وفق لوائح المديرية العامة للجوازات: تأشيرة الخروج والعودة المفردة تكلف 200 ريال لأول 60 يوماً (شهران) + 100 ريال عن كل شهر إضافي. والتأشيرة المتعددة تكلف 500 ريال لأول 90 يوماً (3 أشهر) + 200 ريال عن كل شهر إضافي، بشرط سريان الإقامة.',
        ur: 'جوازات کے قوانین کے مطابق: سنگل خروج و عودہ ویزا کے پہلے 60 دنوں کے 200 ریال اور ہر اضافی مہینے کے 100 ریال ہیں۔ ملٹیپل خروج و عودہ ویزا کے پہلے 90 دنوں کے 500 ریال اور ہر اضافی مہینے کے 200 ریال ہیں، بشرطیکہ اقامہ اتنی مدت کے لیے کارآمد ہو۔'
      }
    },
    {
      q: {
        en: 'When must an employer settle end-of-service benefits upon contract end?',
        ar: 'متى يلزم صاحب العمل نظاماً بصرف مكافأة نهاية الخدمة؟',
        ur: 'ملازمت ختم ہونے کے بعد گریجویٹی ادا کرنے کی قانونی ڈیڈ لائن کیا ہے؟'
      },
      a: {
        en: 'Under Article 88 of the Saudi Labor Law, if the employer terminates the employment contract, all end-of-service awards and final dues must be paid within one week. If the employee resigns voluntarily, the employer must settle all entitlements within two weeks.',
        ar: 'تنص المادة 88 من نظام العمل على وجوب صرف مكافأة نهاية الخدمة وتصفية المستحقات خلال أسبوع واحد إذا أنهى صاحب العمل العقد، وخلال أسبوعين إذا كان انتهاء العقد بناءً على استقالة العامل.',
        ur: 'سعودی لیبر لاء آرٹیکل 88 کے مطابق کمپنی کی طرف سے برطرفی پر 1 ہفتے کے اندر اور ملازم کے استعفیٰ کی صورت میں 2 ہفتوں کے اندر تمام مالی حقوق اور گریجویٹی ادا کرنا قانونی طور پر لازمی ہے۔'
      }
    }
  ];

  const markdownContentEn = `
## How to Calculate Saudi End of Service Gratuity & Expat Fees (Official Article 84 & 85 Guide)

Under **Saudi Labor Law (Royal Decree No. M/51)**, end-of-service awards and residency tariffs must follow statutory arithmetic rules that protect employee rights and institutional compliance.

### The Official Formula Definition (Plain Text Mathematical Statement)

1. **End of Service Benefits (EOSB) Article 84 Formula:**
   * **For the First 5 Years of Continuous Service:**  
     $$\\text{EOSB}_{\\text{Tier 1}} = \\left(\\frac{\\text{Last Comprehensive Salary}}{2}\\right) \\times \\min(\\text{Years}, 5)$$
   * **For Subsequent Continuous Service (Years 6 and Beyond):**  
     $$\\text{EOSB}_{\\text{Tier 2}} = \\text{Last Comprehensive Salary} \\times \\max(\\text{Years} - 5, 0)$$
   * **Gross Statutory Baseline Award:**  
     $$\\text{Total Base Award} = \\text{EOSB}_{\\text{Tier 1}} + \\text{EOSB}_{\\text{Tier 2}}$$

2. **Resignation Adjustment Scale (Article 85 Statutory Ratio):**
   * **Continuous Tenure under 2 years:** Entitlement is **0%** (0 SAR).
   * **Continuous Tenure from 2 to 5 full years:** Entitlement is **1/3rd (33.33%)** of the base award.
   * **Continuous Tenure from 5 to 10 full years:** Entitlement is **2/3rds (66.67%)** of the base award.
   * **Continuous Tenure of 10 or more years (or employer contract termination):** Entitlement is **100% in full**.

3. **Expat Dependent Levy (Marfoqeen) Statutory Tariff:**
   $$\\text{Total Dependent Levy} = \\text{Number of Dependents} \\times \\text{SAR 400} \\times \\text{Renewal Duration (Months)}$$

4. **Exit Re-Entry Visa Tariff (Jawazat Scale):**
   * **Single Exit Re-Entry:** SAR 200 for the first 60 days (2 months) + SAR 100 for each additional month up to Iqama validity.
   * **Multiple Exit Re-Entry:** SAR 500 for the first 90 days (3 months) + SAR 200 for each additional month up to Iqama validity.

---

### A Real-World Practical Example (Step-by-Step Worked Numbers)

**Scenario:** An expatriate employee with a **last comprehensive monthly wage of SAR 6,000** (Basic SAR 4,500 + Housing SAR 1,000 + Transport SAR 500) resigns voluntarily after completing **7 full years of continuous service**.

| Calculation Phase | Statutory Governing Rule | Applied Arithmetic | Subtotal Entitlement (SAR) |
| :--- | :--- | :---: | ---: |
| **First Tier (Years 1–5)** | Article 84 (Half Month Wage per Year) | 5 years × (SAR 6,000 ÷ 2) | **15,000 SAR** |
| **Second Tier (Years 6–7)** | Article 84 (Full Month Wage per Year) | 2 years × SAR 6,000 | **12,000 SAR** |
| **Gross Statutory Baseline** | Aggregate Article 84 Base | SAR 15,000 + SAR 12,000 | **27,000 SAR** |
| **Resignation Factor** | Article 85 (Tenure between 5 & 10 Years) | Entitlement Ratio: 2/3rds (66.67%) | **Deduction: 1/3rd** |
| **Final Net Payable Gratuity** | **Article 85 Statutory Payout** | **SAR 27,000 × (2 ÷ 3)** | **18,000 SAR** |

*Statutory Payout Timeline:* Under Article 88, the employer is legally obligated to settle this final net amount of **SAR 18,000** within 2 weeks of the resignation effective date via the Wage Protection System (WPS) or direct corporate bank transfer.

---

### Official Legal and Ministerial Citations (E-E-A-T Compliance)

* **Saudi Labor Law:** Promulgated by **Royal Decree No. M/51** dated 23 Sha'ban 1426H, amended by Council of Ministers Resolution No. 258.
* **MHRSD Executive Regulations:** Ministerial Resolution No. 70273 governing labor dispute conciliation on Qiwa, standard unified contracts, and mandatory Wage Protection System (WPS) compliance.
* **Council of Ministers Resolution No. 553:** Authorizing the expatriate worker levy and dependent fee tariffs under the Fiscal Balance Program.
* **General Directorate of Passports (Jawazat):** Executive orders regulating exit re-entry validity, final exit processing, and automated SADAD billing schedules.
`;

  const markdownContentAr = `
## كيفية احتساب مكافأة نهاية الخدمة ورسوم المقيمين في السعودية (دليل المادتين 84 و 85 من نظام العمل)

بموجب **نظام العمل السعودي الصادر بالمرسوم الملكي رقم (م/51)**، تخضع مكافأة نهاية الخدمة ورسوم الإقامة والتأشيرات لصيغ حسابية ملزمة قانوناً لصاحب العمل والعامل لضمان العدالة والمطابقة النظامية.

### التعريف الرياضي النظامي للمعادلة الحسابية المعتمدة

1. **صيغة مكافأة نهاية الخدمة الأساسية (المادة 84 من نظام العمل):**
   * **السنوات الخمس الأولى من الخدمة المستمرة:**  
     $$\\text{مكافأة الشريحة الأولى} = \\left(\\frac{\\text{الأجر الفعلي الأخير}}{2}\\right) \\times \\min(\\text{سنوات الخدمة}, 5)$$
   * **السنوات التالية (السنة السادسة فما فوق):**  
     $$\\text{مكافأة الشريحة الثانية} = \\text{الأجر الفعلي الأخير} \\times \\max(\\text{سنوات الخدمة} - 5, 0)$$
   * **إجمالي المكافأة التراكمية الأساسية:**  
     $$\\text{المكافأة الأساسية الإجمالية} = \\text{مكافأة الشريحة الأولى} + \\text{مكافأة الشريحة الثانية}$$

2. **معامل الاستقالة وتدرج الاستحقاق (المادة 85 من نظام العمل):**
   * **مدة خدمة أقل من سنتين متتاليتين:** لا يستحق العامل أي مكافأة (**0%**).
   * **مدة خدمة من سنتين إلى 5 سنوات كاملة:** يستحق العامل **ثلث المكافأة (33.33%)**.
   * **مدة خدمة من 5 سنوات إلى 10 سنوات كاملة:** يستحق العامل **ثلثي المكافأة (66.67%)**.
   * **مدة خدمة تبلغ 10 سنوات فأكثر (أو فسخ العقد من صاحب العمل):** يستحق العامل **المكافأة كاملة (100%)**.

3. **صيغة المقابل المالي للمرافقين والتابعين (الجوازات):**
   $$\\text{إجمالي رسوم المرافقين} = \\text{عدد المرافقين} \\times 400\\text{ ريال} \\times \\text{مدة التجديد بالشهور}$$

4. **رسوم تأشيرات الخروج والعودة (لوائح الجوازات):**
   * **تأشيرة مفردة:** 200 ريال لأول 60 يوماً (شهران) + 100 ريال عن كل شهر إضافي في حدود سريان الإقامة.
   * **تأشيرة متعددة:** 500 ريال لأول 90 يوماً (3 أشهر) + 200 ريال عن كل شهر إضافي في حدود سريان الإقامة.

---

### دراسة حالة عملية تطبيقية واقعية بالأرقام

**مثال تطبيقي:** موظف وافد يتقاضى **أجراً شهرياً شاملاً قدره 6,000 ريال سعودي** (الأساسي 4,500 ريال + بدل السكن 1,000 ريال + بدل النقل 500 ريال)، تقدم باستقالته النظامية بعد إتمام **7 سنوات خدمة متواصلة**.

| مرحلة الاحتساب النظامي | المادة النظامية المعتمدة | العملية الحسابية الدقيقة | المبلغ المستحق (بالريال السعودي) |
| :--- | :--- | :---: | ---: |
| **الشريحة الأولى (أول 5 سنوات)** | المادة 84 (نصف أجر شهري عن كل سنة) | 5 سنوات × (6,000 ريال ÷ 2) | **15,000 ر.س** |
| **الشريحة الثانية (السنتان 6 و 7)** | المادة 84 (أجر شهر كامل عن كل سنة) | 2 سنة × 6,000 ريال | **12,000 ر.س** |
| **إجمالي المكافأة التراكمية الأساسية** | مجموع احتساب المادة 84 | 15,000 ر.س + 12,000 ر.س | **27,000 ر.س** |
| **معامل الاستقالة النظامي** | المادة 85 (الخدمة بين 5 و 10 سنوات) | نسبة الاستحقاق: الثلثان (66.67%) | **خصم الثلث نظاماً** |
| **صافي المكافأة واجبة الصرف قانوناً** | **المستحق النهائي بموجب المادة 85** | **27,000 ر.س × (2 ÷ 3)** | **18,000 ر.س** |

*مهلة الصرف القانونية:* بموجب المادة 88، يلزم صاحب العمل بدفع هذا المبلغ الصافي البالغ **18,000 ريال** خلال أسبوعين من تاريخ انتهاء العقد بالاستقالة عبر نظام حماية الأجور (WPS).

---

### السند التشريعي والمراجع النظامية والوزارية المعتمدة (E-E-A-T)

* **نظام العمل السعودي:** الصادر بالمرسوم الملكي رقم (م/51) وتاريخ 23 شعبان 1426هـ، وتعديلاته بقرار مجلس الوزراء رقم 258.
* **اللائحة التنفيذية لوزارة الموارد البشرية والتنمية الاجتماعية:** القرار الوزاري رقم 70273 المنظم لتوثيق العقود الرقمية عبر منصة قوى والامتثال لنظام حماية الأجور (WPS).
* **قرار مجلس الوزراء رقم 553:** المنظم لرسوم المقابل المالي على رخص العمل والتابعين والمرافقين.
* **المديرية العامة للجوازات (وزارة الداخلية):** التنظيمات المالية لتأشيرات الخروج والعودة وسداد المقابل المالي عبر نظام سداد المعتمد.
`;

  const markdownContentUr = `
## سعودی عرب میں اینڈ آف سروس گریجویٹی اور اقامہ فیس کا حساب کیسے لگائیں (آرٹیکل 84 اور 85 گائیڈ)

**سعودی لیبر لاء (شاہی فرمان نمبر م/51)** کے تحت اینڈ آف سروس گریجویٹی اور اقامہ فیس کا حساب درج ذیل سرکاری ریاضیاتی فارمولے کے تحت کیا جاتا ہے تاکہ ملازمین کے حقوق کا تحفظ ہو سکے۔

### سرکاری ریاضیاتی فارمولے کی واضح تعریف (Plain Text)

1. **اینڈ آف سروس بینیفٹس (آرٹیکل 84 فارمولہ):**
   * **پہلے 5 سال کی ملازمت:**  
     $$\\text{پہلا حصہ} = \\left(\\frac{\\text{آخری مکمل تنخواہ}}{2}\\right) \\times \\min(\\text{ملازمت کے سال}, 5)$$
   * **چھٹے سال سے آگے کی ملازمت:**  
     $$\\text{دوسرا حصہ} = \\text{آخری مکمل تنخواہ} \\times \\max(\\text{ملازمت کے سال} - 5, 0)$$
   * **کل بنیادی گریجویٹی:**  
     $$\\text{مجموعی رقم} = \\text{پہلا حصہ} + \\text{دوسرا حصہ}$$

2. **استعفیٰ کی صورت میں کٹوتی کے سرکاری اصول (آرٹیکل 85):**
   * **2 سال سے کم سروس:** قانونی طور پر کوئی رقم واجب الادا نہیں (**0%**).
   * **2 تا 5 سال کی سروس:** کل بنی ہوئی رقم کا **ایک تہائی (33.33%)** ملتا ہے۔
   * **5 تا 10 سال کی سروس:** کل رقم کا **دو تہائی (66.67%)** واجب الادا ہوتا ہے۔
   * **10 سال یا زائد سروس (یا کمپنی کی طرف سے برطرفی):** پوری رقم یعنی **100%** ادا کرنا قانونی طور پر لازمی ہے۔

3. **فیملی فیس (مرافقین لیوی) فارمولہ:**
   $$\\text{کل فیملی فیس} = \\text{مرافقین کی تعداد} \\times 400\\text{ ریال} \\times \\text{تجدید کے مہینے}$$

4. **خروج و عودہ (ایگزٹ ری انٹری ویزا) فیس اصول:**
   * **سنگل ویزا:** پہلے 60 دنوں (2 ماہ) کے 200 ریال + ہر اضافی مہینے کے 100 ریال۔
   * **ملٹیپل ویزا:** پہلے 90 دنوں (3 ماہ) کے 500 ریال + ہر اضافی مہینے کے 200 ریال۔

---

### عملی و حقیقی کیس اسٹڈی (حسابی مثال)

**حقیقی مثال:** ایک ملازم جس کی **ماہانہ مکمل تنخواہ 6,000 سعودی ریال** ہے (بنیادی 4,500 ریال + رہائش 1,000 ریال + ٹرانسپورٹ 500 ریال)، کمپنی میں **7 سال مسلسل سروس** مکمل کرنے کے بعد استعفیٰ دیتا ہے۔

| قانونی مرحلہ | متعلقہ سعودی لیبر لاء آرٹیکل | درست حسابی طریقہ | قانونی رقم (سعودی ریال) |
| :--- | :--- | :---: | ---: |
| **پہلے 5 سال کا حساب** | آرٹیکل 84 (ہر سال کے لیے آدھی تنخواہ) | 5 سال × (6,000 ریال ÷ 2) | **15,000 ریال** |
| **اگلے 2 سال کا حساب (چھٹا اور ساتواں سال)** | آرٹیکل 84 (ہر سال کے لیے مکمل تنخواہ) | 2 سال × 6,000 ریال | **12,000 ریال** |
| **کل بنیادی مجموعی گریجویٹی** | آرٹیکل 84 کی مشترکہ رقم | 15,000 ریال + 12,000 ریال | **27,000 ریال** |
| **استعفیٰ کی قانونی کٹوتی** | آرٹیکل 85 (5 تا 10 سال سروس کے قواعد) | حق دار تناسب: دو تہائی (66.67%) | **ایک تہائی کٹوتی** |
| **حتمی قابل ادائیگی واجبات** | **آرٹیکل 85 کے تحت حتمی رقم** | **27,000 ریال × (2 ÷ 3)** | **18,000 ریال** |

*قانونی ادائیگی کی آخری تاریخ:* آرٹیکل 88 کے تحت کمپنی استعفیٰ کی تاریخ سے 2 ہفتوں کے اندر اندر یہ رقم (**18,000 ریال**) ادا کرنے کی قانونی طور پر پابند ہے۔

---

### سرکاری و قانونی مراجع اور وزارتی احکامات (E-E-A-T)

* **سعودی لیبر لاء:** شاہی فرمان نمبر (م/51) مورخہ 23 شعبان 1426ھ، اور کابینہ کی قرارداد نمبر 258۔
* **وزارت افرادی قوت و سماجی بہبود (MHRSD) کے ایگزیکٹو ضوابط:** قویٰ پلیٹ فارم ڈیجیٹل معاہدوں اور ویج پروٹیکشن سسٹم (WPS) کے لازمی قواعد۔
* **کابینہ کی قرارداد نمبر 553:** فنانشل بیلنس پروگرام کے تحت ورک پرمٹ اور فیملی لیوی کا باضابطہ نفاذ۔
* **محکمہ پاسپورٹ (جوازات - وزارت داخلہ):** خروج و عودہ، خروج نہائی اور سداد بینکنگ کے ذریعے فیسوں کی وصولی کا نظام۔
`;

  const currentMarkdown = currentLang === 'ar' 
    ? markdownContentAr 
    : currentLang === 'ur' 
    ? markdownContentUr 
    : markdownContentEn;

  return (
    <section 
      id="expat-formula-explanatory-guide"
      className="mt-16 bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-xl relative overflow-hidden" 
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* JSON-LD Structured Data Injection for Google Crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />

      {/* Decorative Emerald Blur */}
      <div className="absolute top-0 right-0 w-80 h-80 emerald-gradient opacity-[0.04] rounded-full blur-3xl pointer-events-none" />

      {/* Editorial Title Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-100 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl emerald-gradient text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-950/20 font-bold">
            <BookOpen size={28} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">
                {currentLang === 'ar' ? 'التوثيق القانوني المعتمد' : currentLang === 'ur' ? 'سرکاری قانونی گائیڈ' : 'Official Regulatory Standards'}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                MHRSD / Qiwa Certified
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary">
              {currentLang === 'ar' 
                ? 'الدليل النظامي لحساب مكافأة نهاية الخدمة ورسوم الإقامة والتأشيرات'
                : currentLang === 'ur'
                ? 'سعودی لیبر لاء کے تحت گریجویٹی اور اقامہ فیس کا تفصیلی حسابی جائزہ'
                : 'How to Calculate Saudi End of Service Gratuity & Expat Fees'}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto bg-paper px-4 py-2 rounded-2xl border border-gray-100 text-xs font-semibold text-gray-600">
          <Landmark size={15} className="text-secondary" />
          <span>{currentLang === 'ar' ? 'المرسوم الملكي م/51' : currentLang === 'ur' ? 'شاہی فرمان م/51' : 'Royal Decree No. M/51'}</span>
        </div>
      </div>

      {/* Key Metric Highlights Badge Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
        <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center gap-3">
          <Scale size={24} className="text-emerald-700 shrink-0" />
          <div>
            <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
              {currentLang === 'ar' ? 'المادة 84 (أول 5 سنوات)' : currentLang === 'ur' ? 'آرٹیکل 84 (پہلے 5 سال)' : 'Article 84 (Years 1–5)'}
            </div>
            <div className="text-sm font-bold text-emerald-950">
              {currentLang === 'ar' ? 'نصف أجر شهري / سنة' : currentLang === 'ur' ? 'آدھی تنخواہ سالانہ' : '½ Month Wage / Year'}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center gap-3">
          <Calculator size={24} className="text-emerald-700 shrink-0" />
          <div>
            <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
              {currentLang === 'ar' ? 'المادة 84 (بعد 5 سنوات)' : currentLang === 'ur' ? 'آرٹیکل 84 (5 سال بعد)' : 'Article 84 (Post 5 Yrs)'}
            </div>
            <div className="text-sm font-bold text-emerald-950">
              {currentLang === 'ar' ? 'أجر شهر كامل / سنة' : currentLang === 'ur' ? 'مکمل تنخواہ سالانہ' : '1 Full Month Wage / Year'}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 flex items-center gap-3">
          <FileText size={24} className="text-amber-800 shrink-0" />
          <div>
            <div className="text-[10px] font-bold text-amber-900 uppercase tracking-wider">
              {currentLang === 'ar' ? 'المادة 85 (الاستقالة)' : currentLang === 'ur' ? 'آرٹیکل 85 (استعفیٰ اصول)' : 'Article 85 (Resignation)'}
            </div>
            <div className="text-sm font-bold text-amber-950">
              {currentLang === 'ar' ? 'تدرج: 0%، 33%، 66%، 100%' : currentLang === 'ur' ? 'تناسب: 0%، 33%، 66%، 100%' : 'Tiered 0%, 33%, 66%, 100%'}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center gap-3">
          <CheckCircle2 size={24} className="text-emerald-700 shrink-0" />
          <div>
            <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
              {currentLang === 'ar' ? 'رسوم المرافقين' : currentLang === 'ur' ? 'فیملی لیوی فیس' : 'Dependent Levy'}
            </div>
            <div className="text-sm font-bold text-emerald-950">
              {currentLang === 'ar' ? '400 ر.س / شهر / مرافق' : currentLang === 'ur' ? '400 ریال فی مرافق / ماہ' : 'SAR 400 / Month / Dep'}
            </div>
          </div>
        </div>
      </div>

      {/* Render Markdown Content with Strict GFM Tables & Styling */}
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
              ? 'الأسئلة الشائعة حول مكافأة نهاية الخدمة ورسوم المقيمين'
              : currentLang === 'ur'
              ? 'اینڈ آف سروس گریجویٹی اور اقامہ فیس کے اہم ترین سوالات'
              : 'Frequently Asked Questions: End of Service Gratuity & Expat Fees'}
          </h3>
        </div>

        <div className="space-y-4">
          {visibleFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={`expat-vis-faq-${idx}`} 
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
