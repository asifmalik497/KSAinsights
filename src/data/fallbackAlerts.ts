export interface FallbackAlert {
  id: string;
  category: 'regulatory' | 'residency' | 'opportunity' | 'macro' | 'local' | 'intelligence' | 'lifestyle' | 'community' | 'fashion';
  impact: 'High' | 'Medium' | 'Low';
  source: string;
  date: string;
  url?: string;
  title: { en: string; ar: string; ur: string };
  summary: { en: string; ar: string; ur: string };
  aiInsight: { en: string; ar: string; ur: string };
  createdAt?: string | Date;
}

export const FALLBACK_ALERTS: FallbackAlert[] = [
  {
    id: "fallback-misa-august-2026",
    category: "regulatory",
    impact: "High",
    source: "Ministry of Investment (MISA)",
    date: "August 7, 2026",
    url: "https://www.misa.gov.sa/",
    createdAt: "2026-08-07T10:00:00.000Z",
    title: {
      en: "MISA & Ministry of Commerce Enforce Instant Electronic Commercial Registration for Global Investors",
      ar: "وزارة الاستثمار ووزارة التجارة تطبقان نظام السجل التجاري الإلكتروني الفوري للمستثمرين العالميين",
      ur: "وزارت سرمایہ کاری اور وزارت تجارت کا عالمی سرمایہ کاروں کے لیے فوری الیکٹرانک کمرشل رجسٹریشن کا نفاذ"
    },
    summary: {
      en: "The Ministry of Investment (MISA), alongside the Ministry of Commerce, has fully operationalized an automated electronic registration framework under Saudi Arabia's updated Investment Law. International tech enterprises and foreign investors now receive commercial registration (CR) approvals within 15 minutes, guaranteed 100% foreign equity security, and streamlined tax incentive processing within Special Economic Zones (SEZs).",
      ar: "أعلنت وزارة الاستثمار بالتعاون مع وزارة التجارة عن التفعيل الكامل لنظام السجل التجاري الإلكتروني الآلي بموجب نظام الاستثمار المحدث. تحصل الشركات العالمية والمستثمرون الأجانب الآن على موافقات السجل التجاري خلال 15 دقيقة مع ضمان الملكية الكاملة بنسبة 100% وتسهيل المزايا الضريبية في المناطق الاقتصادية الخاصة.",
      ur: "وزارت سرمایہ کاری نے وزارت تجارت کے ساتھ مل کر سعودی عرب کے نئے انویسٹمنٹ لاء کے تحت خودکار الیکٹرانک رجسٹریشن فریم ورک کو مکمل طور پر فعال کر دیا ہے۔ عالمی کمپنیوں اور غیر ملکی سرمایہ کاروں کو 15 منٹ کے اندر فوری commercial registration (CR)، 100 فیصد ملکیت کی ضمانت، اور خصوصی اقتصادی زونز کے اندر ٹیکس فوائد فراہم کیے جا رہے ہیں۔"
    },
    aiInsight: {
      en: "Replacing legacy licensing requirements with instant registration eliminates foreign expansion friction. Global enterprises establishing GCC operations in Riyadh can immediately secure commercial credentials and streamline executive residency pathways.",
      ar: "إن استبدال متطلبات الترخيص السابقة بالتسجيل الفوري يزيل عقبات التوسع الأجنبي. يمكن للشركات العالمية التي تؤسس أعمالها في الرياض التقديم فوراً وتسهيل مسارات الإقامة للتنفيذيين.",
      ur: "پرانے لائسنسنگ نظام کو فوری رجسٹریشن سے بدلنے سے غیر ملکی توسیع میں انتظامی تاخیر ختم ہو جاتی ہے۔ عالمی اداروں کو ریاض میں فوری تجارتی اسناد اور ایگزیکٹوز کی رہائشی کارروائیوں کو ہموار کرنے کے لیے اس سہولت سے فائدہ اٹھانا چاہیے۔"
    }
  },
  {
    id: "fallback-sama-august-2026",
    category: "macro",
    impact: "High",
    source: "Saudi Central Bank (SAMA)",
    date: "August 6, 2026",
    url: "https://www.sama.gov.sa/",
    createdAt: "2026-08-06T14:30:00.000Z",
    title: {
      en: "SAMA Enforces Payment System Oversight Framework & Phase 3 Open Banking Mandates",
      ar: "ساما تطبق إطار الإشراف على نظم المدفوعات وأنظمة المرحلة الثالثة للمصرفية المفتوحة",
      ur: "ساما نے پیمنٹ سسٹمز کے اوور سائٹ فریم ورک اور فیز 3 اوپن بینکنگ قوانین کا باضابطہ نفاذ کر دیا"
    },
    summary: {
      en: "The Saudi Central Bank (SAMA) has officially enforced its updated Oversight Framework for Payment Systems and Phase 3 Open Banking regulations. The mandate requires commercial banks and licensed fintechs to provide standardized API rails for B2B liquidity management, real-time cross-border GCC interbank settlements, and automated corporate compliance via the Wathq verification network.",
      ar: "أصدر البنك المركزي السعودي (ساما) رسمياً إطار الإشراف المحدث لنظم المدفوعات والأنظمة التنفيذية للمرحلة الثالثة للمصرفية المفتوحة. يلزم القرار البنوك التجارية وشركات التقنية المالية بتقديم واجهات برمجة تطبيقات معيارية لإدارة السيولة التجارية والتسويات الفورية عبر الحدود بين دول الخليج والتحقق الآلي من الامتثال.",
      ur: "سعودی سینٹرل بینک (SAMA) نے پیمنٹ سسٹمز کے لیے اپ ڈیٹ شدہ اوور سائٹ فریم ورک اور اوپن بینکنگ کے فیز 3 قوانین کو نافذ کر دیا ہے۔ ہدایت کے تحت لائسنس یافتہ بینکوں اور فن ٹیک کمپنیوں کے لیے B2B لیکویڈیٹی مینجمنٹ، جی سی سی بین البنکی ادائیگیوں اور واثق نیٹ ورک کے ذریعے خودکار تعمیل کے لیے APIs فراہم کرنا لازمی ہے۔"
    },
    aiInsight: {
      en: "SAMA's modernized payment rules accelerate Vision 2030's 70% non-cash transaction target. Corporate treasury departments gain transparent multi-bank cash visibility and significantly reduced transaction fees across the Middle East.",
      ar: "تسرع القواعد المصرفية المحدثة لساما تحقيق هدف 70% للمعاملات غير النقدية ضمن رؤية 2030. تكتسب إدارات الخزينة بالشركات رؤية شفافة للسيولة وانخفاضاً كبيراً في رسوم المعاملات عبر المنطقة.",
      ur: "SAMA کی جدید ریگولیٹری اصلاحات رؤیت 2030 کے تحت 70 فیصد کیش لیس لین دین کے ہدف کو تیز کرتی ہیں۔ کارپوریٹ مالیاتی شعبوں کو حقیقی وقت میں متعدد بینکوں کی لیکویڈیٹی مانیٹرنگ اور کم اخراجات کا براہ راست فائدہ ملتا ہے۔"
    }
  },
  {
    id: "fallback-cma-august-2026",
    category: "residency",
    impact: "High",
    source: "Capital Market Authority (CMA)",
    date: "August 5, 2026",
    url: "https://cma.org.sa/",
    createdAt: "2026-08-05T08:15:00.000Z",
    title: {
      en: "CMA & Jawazat Launch Fast-Track Foreign Capital Entry & Investor Golden Residency Portal",
      ar: "هيئة السوق المالية والجوازات تطلقان منصة الإثمار الأجنبي المباشر والإقامة الذهبية للمستثمرين",
      ur: "کیپٹل مارکیٹ اتھارٹی اور جوازات کا براہ راست غیر ملکی سرمایہ کاری اور گولڈن ویزا کے لیے تیز رفتار پورٹل"
    },
    summary: {
      en: "The Capital Market Authority (CMA) in coordination with Jawazat has expanded direct foreign investment access on the Tadawul stock exchange, removing legacy swap restrictions. Simultaneously, a unified portal grants fast-tracked 5-year renewable or permanent Premium Residency clearances for institutional asset managers, C-suite executives, and tech venture founders.",
      ar: "أعلنت هيئة السوق المالية بالتعاون مع الجوازات عن توسيع نطاق الاستثمار الأجنبي المباشر في سوق الأسهم (تداول) وإلغاء القيود السابقة. في الوقت نفسه، تمنح منصة موحدة موافقات سريعة للإقامة المميزة (الذهبية) لمديري الأصول التنفيذيين ومؤسسي المشاريع التقنية.",
      ur: "کیپٹل مارکیٹ اتھارٹی (CMA) نے جوازات کے ساتھ مل کر تداول اسٹاک ایکسچینج میں براہ راست غیر ملکی سرمایہ کاری کی سہولت میں اضافہ کیا ہے۔ اسی کے ساتھ ایک مربوط پورٹل ادارہ جاتی سرمایہ کاروں اور ٹیک بانیوں کے لیے پریمیم رہائش (گولڈن ویزا) کی تیز رفتار منظوری فراہم کرتا ہے۔"
    },
    aiInsight: {
      en: "Coupling capital market liberalization directly with long-term executive residency strengthens Saudi Arabia's standing in global emerging market indices. International fund managers can now achieve direct equity market exposure and residential stability in one streamlined workflow.",
      ar: "إن ربط تحرير السوق المالية بالإقامة طويلة الأجل يعزز موقع المملكة في مؤشرات الأسواق الناشئة العالمية. يمكن لمديري الصناديق العالمية الآن تحقيق الاستثمار المباشر والاستقرار السكني عبر إجراءات موحدة.",
      ur: "کیپٹل مارکیٹ کو آزاد بنانے اور طویل مدتی رہائش فراہم کرنے سے عالمگیر انڈیکس میں سعودی عرب کا مقام مضبوط ہوتا ہے۔ بین الاقوامی فنڈ مینیجرز اب مارکیٹ ایکسپوژر اور رہائشی تحفظ ایک ہی جگہ سے حاصل کر سکتے ہیں۔"
    }
  }
];
