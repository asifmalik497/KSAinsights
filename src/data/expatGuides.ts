export interface ExpatGuide {
  id: string;
  category: 'Residency' | 'Lifestyle' | 'Business' | 'Legal';
  title: { en: string; ar: string; ur: string };
  excerpt: { en: string; ar: string; ur: string };
  content: { en: string; ar: string; ur: string };
  icon: string;
  reference?: { en: string; ar: string; ur: string };
}

export const expatGuides: ExpatGuide[] = [
  {
    id: 'lri-initiative-2026',
    category: 'Residency',
    title: {
      en: 'Labor Relation Initiative (LRI)',
      ar: 'مبادرة تحسين العلاقة التعاقدية (LRI)',
      ur: 'لیبر ریلیشن انیشیٹو (LRI)'
    },
    excerpt: {
      en: 'The most significant shift in Saudi labor law: Job mobility, Exit/Re-entry, and Final Departure rights.',
      ar: 'التحول الأبرز في نظام العمل السعودي: التنقل الوظيفي، الخروج والعودة، وحقوق الخروج النهائي.',
      ur: 'سعودی لیبر قانون میں سب سے اہم تبدیلی: ملازمت کی منتقلی، خروج و عودہ، اور فائنل ایگزٹ کے حقوق۔'
    },
    content: {
      en: `
### Understanding the LRI Framework

The Labor Relation Initiative (LRI) has fundamentally modernized the relationship between employers and employees in the Kingdom.

#### 1. Job Mobility (Transfer)
* **The Rule:** Expats can now move to a new employer without the "Kafeel's" (sponsor's) consent after their current contract expires.
* **During Contract:** Mobility is also possible if the employer fails to fulfill specific legal obligations (e.g., not paying salary for 3 months).

#### 2. Exit & Re-entry Visas
* **The Rule:** You can apply for travel visas directly via **Absher**. 
* **Humanized Fact:** You no longer need a physical signature or "permission paper" from your employer to travel. The system notifies them automatically.

#### 3. Final Departure
* **The Rule:** Expats can initiate their own final exit at the end of their contract via **Absher**.
* **Protection:** This prevents employer interference or "blocking" of departure after the legal relationship has ended.

---
**Official Policy Reference:**
*Ministry of Human Resources and Social Development (HRSD) - Labor Relation Initiative (LRI) Decree No. 51648.*
      `,
      ar: `
### فهم إطار مبادرة تحسين العلاقة التعاقدية

لقد قامت مبادرة تحسين العلاقة التعاقدية (LRI) بتحديث العلاقة بين أصحاب العمل والموظفين في المملكة بشكل جذري.

#### 1. التنقل الوظيفي (النقل)
* **القاعدة:** يمكن للوافدين الآن الانتقال إلى صاحب عمل جديد دون موافقة "الكفيل" بعد انتهاء عقدهم الحالي.
* **خلال العقد:** التنقل ممكن أيضاً إذا فشل صاحب العمل في الوفاء بالتزامات قانونية محددة (مثل عدم دفع الراتب لمدة 3 أشهر).

#### 2. تأشيرات الخروج والعودة
* **القاعدة:** يمكنك التقدم بطلب للحصول على تأشيرات السفر مباشرة عبر **أبشر**.
* **حقيقة مبسطة:** لم تعد بحاجة إلى توقيع فعلي أو "ورقة إذن" من صاحب العمل للسفر. يقوم النظام بإخطارهم تلقائياً.

#### 3. الخروج النهائي
* **القاعدة:** يمكن للوافدين بدء خروجهم النهائي بأنفسهم عند نهاية عقدهم عبر **أبشر**.
* **الحماية:** هذا يمنع تدخل صاحب العمل أو "منع" المغادرة بعد انتهاء العلاقة القانونية.

---
**مرجع السياسة الرسمية:**
*وزارة الموارد البشرية والتنمية الاجتماعية - قرار مبادرة تحسين العلاقة التعاقدية رقم 51648.*
      `,
      ur: `
### لیبر ریلیشن انیشیٹو (LRI) فریم ورک کو سمجھنا

لیبر ریلیشن انیشیٹو (LRI) نے مملکت میں آجروں اور ملازمین کے درمیان تعلقات کو بنیادی طور پر جدید بنا دیا ہے۔

#### 1. ملازمت کی منتقلی (ٹرانسفر)
* **قاعدہ:** تارکین وطن اب اپنے موجودہ معاہدے کی میعاد ختم ہونے کے بعد "کفیل" کی رضامندی کے بغیر نئے آجر کے پاس جا سکتے ہیں۔
* **معاہدے کے دوران:** منتقلی اس صورت میں بھی ممکن ہے اگر آجر مخصوص قانونی ذمہ داریوں کو پورا کرنے میں ناکام رہے (مثلاً 3 ماہ تک تنخواہ نہ دینا)۔

#### 2. خروج و عودہ (ایگزٹ اینڈ ری انٹری) ویزا
* **قاعدہ:** آپ **ابشر** کے ذریعے براہ راست ٹریول ویزا کے لیے درخواست دے سکتے ہیں۔
* **حقیقت:** اب آپ کو سفر کرنے کے لیے اپنے آجر کے جسمانی دستخط یا "اجازت نامہ" کی ضرورت نہیں ہے۔ سسٹم انہیں خود بخود مطلع کر دیتا ہے۔

#### 3. خروج نہائی (فائنل ایگزٹ)
* **قاعدہ:** تارکین وطن اپنے معاہدے کے اختتام پر **ابشر** کے ذریعے اپنا فائنل ایگزٹ خود شروع کر سکتے ہیں۔
* **تحفظ:** یہ قانونی تعلق ختم ہونے کے بعد آجر کی مداخلت یا روانگی کو "روکنے" سے روکتا ہے۔

---
**سرکاری پالیسی کا حوالہ:**
*وزارت انسانی وسائل اور سماجی ترقی (HRSD) - لیبر ریلیشن انیشیٹو (LRI) حکمنامہ نمبر 51648۔*
      `
    },
    icon: 'ShieldCheck',
    reference: {
      en: 'HRSD Decree No. 51648',
      ar: 'قرار وزارة الموارد البشرية رقم 51648',
      ur: 'ایچ آر ایس ڈی حکمنامہ نمبر 51648'
    }
  },
  {
    id: 'digital-ecosystem-guide',
    category: 'Business',
    title: {
      en: 'Digital Ecosystem: Qiwa & Absher',
      ar: 'النظام البيئي الرقمي: قوى وأبشر',
      ur: 'ڈیجیٹل ایکو سسٹم: قوی اور ابشر'
    },
    excerpt: {
      en: 'The "Split" in management: Qiwa for business contracts and Absher for personal residency.',
      ar: 'التوزيع في الإدارة: قوى لعقود العمل وأبشر للإقامة الشخصية.',
      ur: 'انتظام میں "تقسیم": کاروباری معاہدوں کے لیے قوی اور ذاتی رہائش کے لیے ابشر۔'
    },
    content: {
      en: `
### Navigating the Digital Split

Residency management in KSA is now split between two powerful digital platforms. Understanding this "split" is vital for compliance.

#### 1. Qiwa (The Business Side)
* **Purpose:** Contract authentication and professional services.
* **Critical Rule:** Your Iqama **cannot be renewed** unless a valid digital contract is signed and authenticated on Qiwa.
* **Services:** Job transfers, professional verification, and work permits.

#### 2. Absher (The Personal Side)
* **Purpose:** Individual and family residency management.
* **Services:** Managing family (dependent) Iqamas, paying dependent fees, issuing travel visas, and accessing your Digital ID.
* **Humanized Fact:** Absher is your "Digital Passport Office" in your pocket.

---
**Official Policy Reference:**
*Unified Digital Transformation Policy - Ministry of Human Resources (HRSD) & Ministry of Interior (MOI).*
      `,
      ar: `
### التنقل في التقسيم الرقمي

تنقسم إدارة الإقامة في المملكة الآن بين منصتين رقميتين قويتين. فهم هذا "التقسيم" حيوي لامتثال.

#### 1. قوى (الجانب التجاري)
* **الغرض:** توثيق العقود والخدمات المهنية.
* **قاعدة حاسمة:** **لا يمكن تجديد** إقامتك ما لم يتم توقيع عقد رقمي سارٍ وتوثيقه على منصة قوى.
* **الخدمات:** نقل الخدمات، التحقق المهني، ورخص العمل.

#### 2. أبشر (الجانب الشخصي)
* **الغرض:** إدارة الإقامة الفردية والعائلية.
* **الخدمات:** إدارة إقامات أفراد الأسرة (المرافقين)، دفع رسوم المرافقين، إصدار تأشيرات السفر، والوصول إلى هويتك الرقمية.
* **حقيقة مبسطة:** أبشر هي "مكتب الجوازات الرقمي" في جيبك.

---
**مرجع السياسة الرسمية:**
*سياسة التحول الرقمي الموحدة - وزارة الموارد البشرية ووزارة الداخلية.*
      `,
      ur: `
### ڈیجیٹل تقسیم کو سمجھنا

سعودی عرب میں رہائش کا انتظام اب دو طاقتور ڈیجیٹل پلیٹ فارمز کے درمیان تقسیم ہے۔ تعمیل کے لیے اس "تقسیم" کو سمجھنا بہت ضروری ہے۔

#### 1. قوی (کاروباری پہلو)
* **مقصد:** معاہدے کی تصدیق اور پیشہ ورانہ خدمات۔
* **اہم قاعدہ:** آپ کے اقامہ کی **تجدید نہیں کی جا سکتی** جب تک کہ قوی پر ایک درست ڈیجیٹل معاہدے پر دستخط اور تصدیق نہ ہو جائے۔
* **خدمات:** ملازمت کی منتقلی، پیشہ ورانہ تصدیق، اور ورک پرمٹ۔

#### 2. ابشر (ذاتی پہلو)
* **مقصد:** انفرادی اور خاندانی رہائش کا انتظام۔
* **خدمات:** خاندان (مرافقین) کے اقاموں کا انتظام، مرافقین کی فیسوں کی ادائیگی، ٹریول ویزا جاری کرنا، اور آپ کی ڈیجیٹل آئی ڈی تک رسائی۔
* **حقیقت:** ابشر آپ کی جیب میں آپ کا "ڈیجیٹل پاسپورٹ آفس" ہے۔

---
**سرکاری پالیسی کا حوالہ:**
*متحدہ ڈیجیٹل تبدیلی کی پالیسی - وزارت انسانی وسائل (HRSD) اور وزارت داخلہ (MOI)۔*
      `
    },
    icon: 'Building2',
    reference: {
      en: 'HRSD & MOI Digital Policy',
      ar: 'سياسة التحول الرقمي - الموارد البشرية والداخلية',
      ur: 'ایچ آر ایس ڈی اور ایم او آئی ڈیجیٹل پالیسی'
    }
  },
  {
    id: 'financial-structure-fees',
    category: 'Business',
    title: {
      en: 'Financial Structure: Fees & Levies',
      ar: 'الهيكل المالي: الرسوم والضرائب',
      ur: 'مالیاتی ڈھانچہ: فیس اور لیویز'
    },
    excerpt: {
      en: 'A breakdown of Dependent Fees, Expat Levies (Maktab Amal), and Renewal Costs.',
      ar: 'تفصيل لرسوم المرافقين، المقابل المالي (مكتب العمل)، وتكاليف التجديد.',
      ur: 'مرافقین کی فیس، ایکسپٹ لیویز (مکتب عمل)، اور تجدید کے اخراجات کی تفصیل۔'
    },
    content: {
      en: `
### The Cost of Residency in 2026

Understanding the financial breakdown of residency is crucial for both expats and business owners.

#### 1. Dependent Fees
* **Rate:** SAR 400 per month per family member.
* **Payment:** Paid upfront during Iqama renewal or visa issuance via SADAD.

#### 2. Expat Levy (Maktab Amal)
* **The Rule:** Fees paid by companies for each foreign worker.
* **Nitaqat Factor:** The cost varies based on the company's Saudization level (Platinum, Green, etc.). Companies with more Saudis pay lower levies.

#### 3. Renewal Cost Breakdown
To renew an Iqama, the following must be covered:
* **HRSD Fee:** Work permit fees.
* **Insurance:** Mandatory medical insurance coverage.
* **Jawazat Fee:** Passport office residency fee (SAR 500-650 depending on profession).

---
**Official Policy Reference:**
*Ministry of Finance & General Directorate of Passports (Jawazat) - Financial Levy Regulations.*
      `,
      ar: `
### تكلفة الإقامة في عام 2026

فهم التفاصيل المالية للإقامة أمر بالغ الأهمية لكل من الوافدين وأصحاب الأعمال.

#### 1. رسوم المرافقين
* **السعر:** 400 ريال شهرياً لكل فرد من أفراد الأسرة.
* **الدفع:** يتم دفعه مقدماً أثناء تجديد الإقامة أو إصدار التأشيرة عبر نظام سداد.

#### 2. المقابل المالي (مكتب العمل)
* **القاعدة:** رسوم تدفعها الشركات عن كل عامل وافد.
* **عامل نطاقات:** تختلف التكلفة بناءً على مستوى توطين الشركة (بلاتيني، أخضر، إلخ). الشركات التي لديها عدد أكبر من السعوديين تدفع رسوماً أقل.

#### 3. تفصيل تكاليف التجديد
لتجديد الإقامة، يجب تغطية ما يلي:
* **رسوم الموارد البشرية:** رسوم رخصة العمل.
* **التأمين:** تغطية التأمين الطبي الإلزامي.
* **رسوم الجوازات:** رسوم إقامة مكتب الجوازات (500-650 ريال حسب المهنة).

---
**مرجع السياسة الرسمية:**
*وزارة المالية والمديرية العامة للجوازات - لوائح المقابل المالي.*
      `,
      ur: `
### 2026 میں رہائش کی لاگت

رہائش کی مالی تفصیلات کو سمجھنا تارکین وطن اور کاروباری مالکان دونوں کے لیے بہت ضروری ہے۔

#### 1. مرافقین (ڈیپینڈنٹ) فیس
* **شرح:** 400 ریال فی مہینہ فی خاندان کا رکن۔
* **ادائیگی:** اقامہ کی تجدید یا ویزا جاری کرنے کے دوران سداد کے ذریعے پیشگی ادائیگی کی جاتی ہے۔

#### 2. ایکسپٹ لیوی (مکتب عمل)
* **قاعدہ:** کمپنیوں کی طرف سے ہر غیر ملکی کارکن کے لیے ادا کی جانے والی فیس۔
* **نطاقات فیکٹر:** لاگت کمپنی کی سعودائزیشن کی سطح (پلاٹینم، گرین، وغیرہ) کی بنیاد پر مختلف ہوتی ہے۔ زیادہ سعودیوں والی کمپنیاں کم لیوی ادا کرتی ہیں۔

#### 3. تجدید کی لاگت کی تفصیل
اقامہ کی تجدید کے لیے، درج ذیل کا احاطہ کیا جانا چاہیے:
* **ایچ آر ایس ڈی فیس:** ورک پرمٹ فیس۔
* **انشورنس:** لازمی طبی انشورنس کوریج۔
* **جوازات فیس:** پاسپورٹ آفس رہائشی فیس (پیشہ کے لحاظ سے 500-650 ریال)۔

---
**سرکاری پالیسی کا حوالہ:**
*وزارت خزانہ اور ڈائریکٹوریٹ جنرل آف پاسپورٹ (جوازات) - مالیاتی لیوی کے قواعد و ضوابط۔*
      `
    },
    icon: 'LineChart',
    reference: {
      en: 'Ministry of Finance & Jawazat Regs',
      ar: 'لوائح وزارة المالية والجوازات',
      ur: 'وزارت خزانہ اور جوازات کے قواعد'
    }
  },
  {
    id: 'premium-residency-tiers',
    category: 'Legal',
    title: {
      en: 'Premium Residency (Saudi Green Card)',
      ar: 'الإقامة المميزة (البطاقة الخضراء السعودية)',
      ur: 'پریمیم ریذیڈنسی (سعودی گرین کارڈ)'
    },
    excerpt: {
      en: 'The 5+ new categories for Talent, Investors, Property Owners, and Entrepreneurs.',
      ar: 'أكثر من 5 فئات جديدة للمواهب والمستثمرين وملاك العقارات ورواد الأعمال.',
      ur: 'ٹیلنٹ، سرمایہ کاروں، جائیداد کے مالکان اور کاروباری افراد کے لیے 5 سے زیادہ نئی کیٹیگریز۔'
    },
    content: {
      en: `
### The New Tier of Residency

The Premium Residency Center has launched specialized tracks to attract global contributors.

#### 1. Special Talent
* **Target:** Doctors, scientists, and high-level executives.
* **Benefit:** Long-term residency based on professional excellence.

#### 2. Investor
* **Target:** Business owners with significant capital.
* **Requirement:** Direct investment in KSA and a MISA license.

#### 3. Real Estate Owner
* **Target:** Individuals buying residential property.
* **Requirement:** Property value must be SAR 4,000,000 or higher.

#### 4. Entrepreneur
* **Target:** Startup founders.
* **Requirement:** Proven VC funding or significant annual revenue.

---
**Official Policy Reference:**
*Premium Residency Center (PRC) - Royal Decree M/106.*
      `,
      ar: `
### الفئة الجديدة من الإقامة

أطلق مركز الإقامة المميزة مسارات متخصصة لجذب المساهمين العالميين.

#### 1. الكفاءة الاستثنائية
* **المستهدف:** الأطباء والعلماء والمديرون التنفيذيون رفيعو المستوى.
* **الميزة:** إقامة طويلة الأمد بناءً على التميز المهني.

#### 2. مستثمر
* **المستهدف:** أصحاب الأعمال ذوي رأس المال الكبير.
* **المتطلب:** استثمار مباشر في المملكة وترخيص من وزارة الاستثمار.

#### 3. مالك عقار
* **المستهدف:** الأفراد الذين يشترون عقارات سكنية.
* **المتطلب:** يجب أن تكون قيمة العقار 4,000,000 ريال أو أكثر.

#### 4. رائد أعمال
* **المستهدف:** مؤسسو الشركات الناشئة.
* **المتطلب:** تمويل مثبت من رأس المال الجريء أو إيرادات سنوية كبيرة.

---
**مرجع السياسة الرسمية:**
*مركز الإقامة المميزة - المرسوم الملكي رقم م/106.*
      `,
      ur: `
### رہائش کی نئی سطح

پریمیم ریذیڈنسی سینٹر نے عالمی تعاون کرنے والوں کو راغب کرنے کے لیے خصوصی ٹریکس شروع کیے ہیں۔

#### 1. خصوصی ٹیلنٹ
* **ہدف:** ڈاکٹر، سائنسدان، اور اعلیٰ سطح کے ایگزیکٹوز۔
* **فائدہ:** پیشہ ورانہ فضیلت کی بنیاد پر طویل مدتی رہائش۔

#### 2. سرمایہ کار
* **ہدف:** بڑے سرمائے والے کاروباری مالکان۔
* **ضرورت:** سعودی عرب میں براہ راست سرمایہ کاری اور میسا (MISA) لائسنس۔

#### 3. رئیل اسٹیٹ مالک
* **ہدف:** رہائشی جائیداد خریدنے والے افراد۔
* **ضرورت:** جائیداد کی مالیت 4,000,000 ریال یا اس سے زیادہ ہونی چاہیے۔

#### 4. کاروباری شخصیت (انٹرپرینیور)
* **ہدف:** اسٹارٹ اپ بانی۔
* **ضرورت:** ثابت شدہ وی سی فنڈنگ یا اہم سالانہ آمدنی۔

---
**سرکاری پالیسی کا حوالہ:**
*پریمیم ریذیڈنسی سینٹر (PRC) - شاہی فرمان M/106۔*
      `
    },
    icon: 'Zap',
    reference: {
      en: 'Royal Decree M/106',
      ar: 'المرسوم الملكي رقم م/106',
      ur: 'شاہی فرمان M/106'
    }
  },
  {
    id: 'luxury-housing-guide',
    category: 'Lifestyle',
    title: {
      en: 'Luxury Housing Guide',
      ar: 'دليل السكن الفاخر',
      ur: 'لگژری ہاؤسنگ گائیڈ'
    },
    excerpt: {
      en: 'Navigating compounds, luxury apartments, and the Ejar digital rental platform.',
      ar: 'التنقل في المجمعات السكنية، الشقق الفاخرة، ومنصة إيجار الرقمية لتأجير العقارات.',
      ur: 'کمپاؤنڈز، لگژری اپارٹمنٹس، اور ایجار ڈیجیٹل رینٹل پلیٹ فارم کو سمجھنا۔'
    },
    content: {
      en: `
### Luxury Living in the Kingdom

Expats in Saudi Arabia typically choose between two main types of luxury housing: Residential Compounds and High-end Apartments.

#### 1. Residential Compounds
* **The Vibe:** Gated communities with western-style amenities (pools, gyms, restaurants, and grocery stores).
* **Benefits:** High security, social community for families, and relaxed dress codes within the walls.
* **Popular Areas:** Al Nakheel and Al Mohammadiyah in Riyadh; Obhur and Al Rawdah in Jeddah.

#### 2. High-end Apartments
* **The Vibe:** Modern skyscrapers and luxury low-rise buildings in the city center.
* **Benefits:** Proximity to business hubs and high-end dining.

#### 3. The Ejar Platform
* **The Rule:** All rental contracts **must** be registered on the **Ejar** platform to be legally binding.
* **Humanized Fact:** Ejar protects your rights as a tenant and ensures your security deposit is handled according to the law.

---
**Official Policy Reference:**
*Ministry of Municipal and Rural Affairs and Housing - Ejar Program.*
      `,
      ar: `
### الحياة الفاخرة في المملكة

عادة ما يختار المغتربون في المملكة العربية السعودية بين نوعين رئيسيين من السكن الفاخر: المجمعات السكنية والشقق الراقية.

#### 1. المجمعات السكنية (Compounds)
* **الأجواء:** مجتمعات مغلقة مع وسائل راحة على الطراز الغربي (مسابح، صالات رياضية، مطاعم، ومحلات بقالة).
* **المزايا:** أمن عالٍ، مجتمع اجتماعي للعائلات، وقواعد لباس مريحة داخل المجمع.
* **المناطق الشهيرة:** النخيل والمحمدية في الرياض؛ أبحر والروضة في جدة.

#### 2. الشقق الراقية
* **الأجواء:** ناطحات سحاب حديثة ومباني فاخرة منخفضة الارتفاع في وسط المدينة.
* **المزايا:** القرب من مراكز الأعمال والمطاعم الراقية.

#### 3. منصة إيجار
* **القاعدة:** **يجب** تسجيل جميع عقود الإيجار على منصة **إيجار** لتكون ملزمة قانوناً.
* **حقيقة مبسطة:** تحمي منصة إيجار حقوقك كمستأجر وتضمن التعامل مع مبلغ التأمين وفقاً للقانون.

---
**مرجع السياسة الرسمية:**
*وزارة الشؤون البلدية والقروية والإسكان - برنامج إيجار.*
      `,
      ur: `
### مملکت میں پرتعیش زندگی

سعودی عرب میں مقیم غیر ملکی عام طور پر لگژری ہاؤسنگ کی دو اہم اقسام کے درمیان انتخاب کرتے ہیں: رہائشی کمپاؤنڈز اور ہائی اینڈ اپارٹمنٹس۔

#### 1. رہائشی کمپاؤنڈز
* **ماحول:** مغربی طرز کی سہولیات (پول، جم، ریستوراں اور گروسری اسٹورز) کے ساتھ گیٹڈ کمیونٹیز۔
* **فوائد:** اعلیٰ سیکورٹی، خاندانوں کے لیے سماجی کمیونٹی، اور دیواروں کے اندر لباس کے نرم ضوابط۔
* **مشہور علاقے:** ریاض میں النخیل اور المحمدیہ؛ جدہ میں ابحر اور الروضہ۔

#### 2. ہائی اینڈ اپارٹمنٹس
* **ماحول:** شہر کے مرکز میں جدید فلک بوس عمارتیں اور لگژری لو رائز عمارتیں۔
* **فوائد:** بزنس ہب اور ہائی اینڈ ڈائننگ سے قربت۔

#### 3. ایجار پلیٹ فارم
* **قاعدہ:** تمام کرایہ کے معاہدوں کا قانونی طور پر پابند ہونے کے لیے **ایجار** پلیٹ فارم پر رجسٹر ہونا **لازمی** ہے۔
* **حقیقت:** ایجار ایک کرایہ دار کے طور پر آپ کے حقوق کا تحفظ کرتا ہے اور اس بات کو یقینی بناتا ہے کہ آپ کی سیکیورٹی ڈپازٹ قانون کے مطابق ہینڈل کی جائے۔

---
**سرکاری پالیسی کا حوالہ:**
*وزارت بلدیات و دیہی امور اور ہاؤسنگ - ایجار پروگرام۔*
      `
    },
    icon: 'Home',
    reference: {
      en: 'Ejar Rental Policy',
      ar: 'سياسة إيجار التأجيرية',
      ur: 'ایجار رینٹل پالیسی'
    }
  },
  {
    id: 'top-international-schools',
    category: 'Lifestyle',
    title: {
      en: 'Top International Schools',
      ar: 'أفضل المدارس الدولية',
      ur: 'ٹاپ انٹرنیشنل اسکولز'
    },
    excerpt: {
      en: 'A guide to IB, British, and American curricula in the Kingdom.',
      ar: 'دليل للمناهج الدولية (IB)، البريطانية، والأمريكية في المملكة.',
      ur: 'مملکت میں آئی بی، برطانوی اور امریکی نصاب کے لیے ایک گائیڈ۔'
    },
    content: {
      en: `
### Education Excellence for Expat Families

Saudi Arabia offers a wide range of international schools catering to various global curricula.

#### 1. Curriculum Types
* **IB (International Baccalaureate):** Highly regarded for global mobility.
* **British Curriculum:** Following the IGCSE and A-Level systems.
* **American Curriculum:** Leading to the High School Diploma and AP courses.

#### 2. Top-tier Institutions
* **Riyadh:** American International School Riyadh (AISR), British International School Riyadh (BISR).
* **Jeddah:** American International School Jeddah (AISJ), British International School Jeddah (BISJ).
* **Dhahran:** ISG Dhahran.

#### 3. "Study in Saudi" Initiative
* **The Rule:** The government is actively encouraging international education brands to open branches in the Kingdom.
* **Humanized Fact:** Many schools now offer "Saudi Culture and Language" as integrated subjects to help expat children integrate better.

---
**Official Policy Reference:**
*Ministry of Education - International Schools Department.*
      `,
      ar: `
### التميز التعليمي للعائلات المغتربة

تقدم المملكة العربية السعودية مجموعة واسعة من المدارس الدولية التي تلبي مختلف المناهج العالمية.

#### 1. أنواع المناهج
* **IB (البكالوريا الدولية):** تحظى بتقدير كبير للتنقل العالمي.
* **المنهج البريطاني:** يتبع أنظمة IGCSE و A-Level.
* **المنهج الأمريكي:** يؤدي إلى دبلوم المدرسة الثانوية ودورات AP.

#### 2. المؤسسات المرموقة
* **الرياض:** المدرسة الأمريكية الدولية بالرياض (AISR)، المدرسة البريطانية الدولية بالرياض (BISR).
* **جدة:** المدرسة الأمريكية الدولية بجدة (AISJ)، المدرسة البريطانية الدولية بجدة (BISJ).
* **الظهران:** مدارس المجموعة الدولية بالظهران (ISG).

#### 3. مبادرة "ادرس في السعودية"
* **القاعدة:** تشجع الحكومة بنشاط العلامات التجارية التعليمية الدولية على فتح فروع لها في المملكة.
* **حقيقة مبسطة:** تقدم العديد من المدارس الآن "الثقافة واللغة السعودية" كمواد متكاملة لمساعدة أطفال المغتربين على الاندماج بشكل أفضل.

---
**مرجع السياسة الرسمية:**
*وزارة التعليم - إدارة المدارس الدولية.*
      `,
      ur: `
### ایکسپیٹ خاندانوں کے لیے تعلیمی فضیلت

سعودی عرب بین الاقوامی اسکولوں کی ایک وسیع رینج پیش کرتا ہے جو مختلف عالمی نصابوں کو پورا کرتے ہیں۔

#### 1. نصاب کی اقسام
* **IB (انٹرنیشنل بیکلیوریٹ):** عالمی نقل و حرکت کے لیے انتہائی معتبر۔
* **برطانوی نصاب:** IGCSE اور A-Level سسٹمز کی پیروی کرنا۔
* **امریکی نصاب:** ہائی اسکول ڈپلوما اور اے پی کورسز کی طرف لے جانا۔

#### 2. اعلیٰ درجے کے ادارے
* **ریاض:** امریکن انٹرنیشنل اسکول ریاض (AISR)، برٹش انٹرنیشنل اسکول ریاض (BISR)۔
* **جدہ:** امریکن انٹرنیشنل اسکول جدہ (AISJ)، برٹش انٹرنیشنل اسکول جدہ (BISJ)۔
* **ظہران:** آئی ایس جی ظہران۔

#### 3. "اسٹڈی ان سعودی" اقدام
* **قاعدہ:** حکومت بین الاقوامی تعلیمی برانڈز کو مملکت میں شاخیں کھولنے کے لیے فعال طور پر حوصلہ افزائی کر رہی ہے۔
* **حقیقت:** بہت سے اسکول اب "سعودی ثقافت اور زبان" کو مربوط مضامین کے طور پر پیش کرتے ہیں تاکہ غیر ملکی بچوں کو بہتر طریقے سے ضم ہونے میں مدد مل سکے۔

---
**سرکاری پالیسی کا حوالہ:**
*وزارت تعلیم - بین الاقوامی اسکولوں کا شعبہ۔*
      `
    },
    icon: 'GraduationCap',
    reference: {
      en: 'Ministry of Education Policy',
      ar: 'سياسة وزارة التعليم',
      ur: 'وزارت تعلیم کی پالیسی'
    }
  },
  {
    id: 'expat-healthcare-guide',
    category: 'Lifestyle',
    title: {
      en: 'Expat Healthcare',
      ar: 'الرعاية الصحية للمغتربين',
      ur: 'ایکسپٹ ہیلتھ کیئر'
    },
    excerpt: {
      en: 'Understanding CCHI insurance, top hospitals, and the Sehaty app.',
      ar: 'فهم تأمين مجلس الضمان الصحي (CCHI)، أفضل المستشفيات، وتطبيق صحتي.',
      ur: 'سی سی ایچ آئی انشورنس، ٹاپ اسپتالوں اور صحتی ایپ کو سمجھنا۔'
    },
    content: {
      en: `
### World-class Healthcare in KSA

Saudi Arabia has a robust healthcare system with a mix of high-quality public and private providers.

#### 1. Mandatory Insurance (CCHI)
* **The Rule:** Every expat **must** have valid medical insurance linked to their Iqama.
* **Coverage:** Employers are legally required to provide insurance for the employee and their dependents.

#### 2. Top Hospital Groups
* **Dr. Sulaiman Al Habib:** Known for advanced technology and high-end facilities.
* **Mouwasat Hospitals:** Widespread presence across the Kingdom.
* **Saudi German Health:** A leader in private healthcare.

#### 3. The Sehaty App
* **The Rule:** The **Sehaty** app is the central hub for booking appointments, viewing test results, and accessing digital prescriptions.
* **Humanized Fact:** You can access your "Digital Health ID" via Sehaty, which is recognized by all pharmacies and clinics.

---
**Official Policy Summary:**
* **Mandatory Coverage:** All private sector employees and their dependents must be covered.
* **Minimum Benefits:** Includes outpatient clinics, hospitalization, surgery, maternity, and emergency dental.
* **Digital ID:** Your insurance is linked to your Iqama and visible in the **Tawakkalna** and **Sehaty** apps.

**How to Access Official Documents:**
* [Search for "CCHI Unified Policy 2026" on Google](https://www.google.com/search?q=CCHI+Unified+Insurance+Policy+Saudi+Arabia+2026+PDF)
* *Note: Saudi government portals (.gov.sa) are strictly geo-fenced. If you are outside Saudi Arabia, you will see a "Blocked" message. We recommend using a Saudi VPN or searching for the PDF version on Google.*
* Council of Cooperative Health Insurance (CCHI) & Ministry of Health (MOH).
      `,
      ar: `
### رعاية صحية عالمية المستوى في المملكة

تمتلك المملكة العربية السعودية نظام رعاية صحية قوي مع مزيج من مقدمي الخدمات العامة والخاصة ذوي الجودة العالية.

#### 1. التأمين الإلزامي (CCHI)
* **القاعدة:** **يجب** أن يكون لدى كل وافد تأمين طبي سارٍ مرتبط بإقامته.
* **التغطية:** يلتزم أصحاب العمل قانوناً بتوفير التأمين للموظف ومرافقيه.

#### 2. مجموعات المستشفيات الكبرى
* **د. سليمان الحبيب:** معروفة بالتكنولوجيا المتقدمة والمرافق الراقية.
* **مستشفيات المواساة:** انتشار واسع في جميع أنحاء المملكة.
* **السعودي الألماني الصحية:** رائدة في الرعاية الصحية الخاصة.

#### 3. تطبيق صحتي
* **القاعدة:** تطبيق **صحتي** هو المركز الرئيسي لحجز المواعيد، وعرض نتائج الاختبارات، والوصول إلى الوصفات الطبية الرقمية.
* **حقيقة مبسطة:** يمكنك الوصول إلى "هويتك الصحية الرقمية" عبر صحتي، وهي معترف بها من قبل جميع الصيدليات والعيادات.

---
**ملخص السياسة الرسمية:**
* **التغطية الإلزامية:** يجب تغطية جميع موظفي القطاع الخاص ومعاليهم.
* **الحد الأدنى من المزايا:** تشمل العيادات الخارجية، التنويم، الجراحة، الأمومة، وطوارئ الأسنان.
* **الهوية الرقمية:** تأمينك مرتبط بإقامتك ويظهر في تطبيقي **توكلنا** و**صحتي**.

**كيفية الوصول إلى المستندات الرسمية:**
* [ابحث عن "وثيقة الضمان الصحي الموحدة 2026" على جوجل](https://www.google.com/search?q=وثيقة+الضمان+الصحي+الموحدة+السعودية+2026)
* *ملاحظة: غالباً ما تكون البوابات الرسمية (.gov.sa) مقيدة جغرافياً. إذا كنت خارج المملكة، قد تظهر لك رسالة "محجوب". نوصي باستخدام VPN سعودي أو البحث عن نسخة PDF على جوجل.*
* مجلس الضمان الصحي (CCHI) ووزارة الصحة.
      `,
      ur: `
### سعودی عرب میں عالمی معیار کی صحت کی دیکھ بھال

سعودی عرب میں اعلیٰ معیار کے سرکاری اور نجی فراہم کنندگان کے امتزاج کے ساتھ ایک مضبوط صحت کی دیکھ بھال کا نظام موجود ہے۔

#### 1. لازمی انشورنس (CCHI)
* **قاعدہ:** ہر غیر ملکی کے پاس اپنے اقامہ سے منسلک ایک درست طبی انشورنس ہونا **لازمی** ہے۔
* **کوریج:** آجر قانونی طور پر ملازم اور ان کے زیر کفالت افراد کے لیے انشورنس فراہم کرنے کے پابند ہیں۔

#### 2. ٹاپ ہاسپٹل گروپس
* **ڈاکٹر سلیمان الحبیب:** جدید ٹیکنالوجی اور ہائی اینڈ سہولیات کے لیے مشہور۔
* **مواسات اسپتال:** پورے مملکت میں وسیع موجودگی۔
* **سعودی جرمن ہیلتھ:** نجی صحت کی دیکھ بھال میں ایک رہنما۔

#### 3. صحتی ایپ
* **قاعدہ:** **صحتی** ایپ اپائنٹمنٹ بک کرنے، ٹیسٹ کے نتائج دیکھنے اور ڈیجیٹل نسخوں تک رسائی کا مرکزی مرکز ہے۔
* **حقیقت:** آپ صحتی کے ذریعے اپنی "ڈیجیٹل ہیلتھ آئی ڈی" تک رسائی حاصل کر سکتے ہیں، جسے تمام فارمیسی اور کلینک تسلیم کرتے ہیں۔

---
**سرکاری پالیسی کا خلاصہ:**
* **لازمی کوریج:** نجی شعبے کے تمام ملازمین اور ان کے زیر کفالت افراد کا احاطہ کرنا ضروری ہے۔
* **کم از کم فوائد:** اس میں آؤٹ پیشنٹ کلینک، ہسپتال میں داخل ہونا، سرجری، زچگی، اور ہنگامی دانتوں کا علاج شامل ہے۔
* **ڈیجیٹل آئی ڈی:** آپ کا انشورنس آپ کے اقامہ سے منسلک ہے اور **توکلنا** اور **صحتی** ایپس میں نظر آتا ہے۔

**سرکاری دستاویزات تک رسائی کا طریقہ:**
* [گوگل پر "CCHI Unified Policy 2026" تلاش کریں](https://www.google.com/search?q=CCHI+Unified+Insurance+Policy+Saudi+Arabia+2026+PDF)
* *نوٹ: سرکاری .gov.sa پورٹلز اکثر جغرافیائی طور پر محدود ہوتے ہیں۔ اگر آپ سعودی عرب سے باہر ہیں، تو آپ کو "بلاک" کا پیغام نظر آ سکتا ہے۔ ہم سعودی وی پی این استعمال کرنے یا گوگل پر پی ڈی ایف ورژن تلاش کرنے کی سفارش کرتے ہیں۔*
* کونسل آف کوآپریٹو ہیلتھ انشورنس (CCHI) اور وزارت صحت (MOH)۔
      `
    },
    icon: 'HeartPulse',
    reference: {
      en: 'CCHI Insurance Policy',
      ar: 'سياسة مجلس الضمان الصحي',
      ur: 'سی سی ایچ آئی انشورنس پالیسی'
    }
  },
  {
    id: 'saudi-business-etiquette',
    category: 'Lifestyle',
    title: {
      en: 'Saudi Business Etiquette',
      ar: 'إتيكيت الأعمال السعودي',
      ur: 'سعودی بزنس ایٹیکیٹ'
    },
    excerpt: {
      en: 'Mastering greetings, prayer times, and the Majlis culture.',
      ar: 'إتقان التحيات، أوقات الصلاة، وثقافة المجلس.',
      ur: 'سلام، نماز کے اوقات، اور مجلس کی ثقافت میں مہارت حاصل کرنا۔'
    },
    content: {
      en: `
### Navigating Professional Culture in KSA

Understanding local customs is the key to building successful business relationships in Saudi Arabia.

#### 1. Greetings and First Impressions
* **The Custom:** A firm handshake with the right hand is standard. Use "As-salamu alaykum" (Peace be upon you) as a respectful greeting.
* **The Rule:** Avoid using your left hand for eating or passing documents, as it is traditionally considered disrespectful.

#### 2. Prayer Time Awareness
* **The Rule:** Businesses and shops may pause briefly during the five daily prayer times.
* **Humanized Fact:** While many malls and restaurants now stay open, it is respectful to avoid scheduling meetings during these times.

#### 3. The "Majlis" Culture
* **The Vibe:** Business in Saudi is built on trust and personal relationships. Meetings often start with small talk over coffee (Gahwa) and dates.
* **The Tip:** Never rush into business talk immediately. Showing interest in your host's well-being and culture is highly valued.

#### 4. Dress Code
* **Professional:** For men, a suit and tie are standard for formal meetings. For women, modest professional attire is required.

---
**Official Policy Reference:**
*Ministry of Culture & Saudi Chambers of Commerce - Cultural Etiquette Guide.*
      `,
      ar: `
### التنقل في الثقافة المهنية في المملكة

فهم العادات المحلية هو المفتاح لبناء علاقات عمل ناجحة في المملكة العربية السعودية.

#### 1. التحيات والانطباعات الأولى
* **العادة:** المصافحة القوية باليد اليمنى هي المعيار. استخدم "السلام عليكم" كتحية محترمة.
* **القاعدة:** تجنب استخدام يدك اليسرى للأكل أو تمرير المستندات، حيث تعتبر تقليدياً غير محترمة.

#### 2. الوعي بأوقات الصلاة
* **القاعدة:** قد تتوقف الشركات والمحلات التجارية لفترة وجيزة خلال أوقات الصلوات الخمس اليومية.
* **حقيقة مبسطة:** بينما تظل العديد من مراكز التسوق والمطاعم مفتوحة الآن، فمن الاحترام تجنب جدولة الاجتماعات خلال هذه الأوقات.

#### 3. ثقافة "المجلس"
* **الأجواء:** يتم بناء الأعمال في السعودية على الثقة والعلاقات الشخصية. غالباً ما تبدأ الاجتماعات بحديث ودي مع القهوة السعودية والتمر.
* **نصيحة:** لا تندفع أبداً في الحديث عن العمل فوراً. إظهار الاهتمام بصحة المضيف وثقافته يحظى بتقدير كبير.

#### 4. قواعد اللباس
* **المهنية:** بالنسبة للرجال، البدلة وربطة العنق هي المعيار للاجتماعات الرسمية. بالنسبة للنساء، مطلوب ملابس مهنية محتشمة.

---
**مرجع السياسة الرسمية:**
*وزارة الثقافة واتحاد الغرف السعودية - دليل الإتيكيت الثقافي.*
      `,
      ur: `
### سعودی عرب میں پیشہ ورانہ ثقافت کو سمجھنا

سعودی عرب میں کامیاب کاروباری تعلقات استوار کرنے کے لیے مقامی رسوم و رواج کو سمجھنا کلیدی حیثیت رکھتا ہے۔

#### 1. سلام اور پہلے تاثرات
* **رواج:** دائیں ہاتھ سے مضبوطی سے ہاتھ ملانا ایک معیار ہے۔ احترام کے طور پر "السلام علیکم" کہیں۔
* **قاعدہ:** کھانے یا دستاویزات دینے کے لیے بائیں ہاتھ کے استعمال سے گریز کریں، کیونکہ اسے روایتی طور پر غیر محترم سمجھا جاتا ہے۔

#### 2. نماز کے اوقات کا خیال
* **قاعدہ:** روزانہ پانچ وقت کی نماز کے دوران کاروبار اور دکانیں تھوڑی دیر کے لیے رک سکتی ہیں۔
* **حقیقت:** اگرچہ اب بہت سے مالز اور ریستوراں کھلے رہتے ہیں، لیکن ان اوقات میں میٹنگز شیڈول کرنے سے گریز کرنا احترام کی علامت ہے۔

#### 3. "مجلس" کی ثقافت
* **ماحول:** سعودی عرب میں کاروبار اعتماد اور ذاتی تعلقات پر مبنی ہوتا ہے۔ میٹنگز اکثر قہوہ اور کھجور کے ساتھ غیر رسمی گفتگو سے شروع ہوتی ہیں۔
* **ٹپ:** کبھی بھی فوراً کاروباری بات شروع نہ کریں۔ اپنے میزبان کی خیریت اور ثقافت میں دلچسپی ظاہر کرنا بہت اہم سمجھا جاتا ہے۔

#### 4. لباس کا ضابطہ (Dress Code)
* **پیشہ ورانہ:** مردوں کے لیے، رسمی میٹنگز کے لیے سوٹ اور ٹائی معیار ہے۔ خواتین کے لیے، باوقار پیشہ ورانہ لباس ضروری ہے۔

---
**سرکاری پالیسی کا حوالہ:**
*وزارت ثقافت اور سعودی چیمبرز آف کامرس - ثقافتی آداب گائیڈ۔*
      `
    },
    icon: 'Briefcase',
    reference: {
      en: 'Saudi Cultural Etiquette',
      ar: 'الإتيكيت الثقافي السعودي',
      ur: 'سعودی ثقافتی آداب'
    }
  }
];

