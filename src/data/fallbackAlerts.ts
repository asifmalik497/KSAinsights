export interface FallbackAlert {
  id: string;
  category: 'regulatory' | 'residency' | 'opportunity' | 'macro' | 'local' | 'intelligence' | 'lifestyle' | 'community' | 'fashion' | 'education' | 'sports';
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
    id: "fallback-balady-ejar-smart-mediation-sep20-2026",
    category: "regulatory",
    impact: "High",
    source: "Ministry of Municipalities and Housing (MOMRAH) & Real Estate General Authority (REGA)",
    date: "September 20, 2026",
    url: "https://www.rega.gov.sa/",
    createdAt: "2026-09-20T11:00:00.000Z",
    title: {
      en: "REGA & Ejar Launch Automated Rental Dispute Mediation & Digital Security Deposit Escrow",
      ar: "الهيئة العامة للعقار ومنصة إيجار تطلقان خدمة الصلح العقاري الآلي والمحفظة الرقمية للتأمين",
      ur: "ریئل اسٹیٹ جنرل اتھارٹی اور ایجار نے خودکار تنازعات کے حل اور ڈیجیٹل سیکیورٹی ڈپازٹ اکاؤنٹ کا نفاذ کر دیا"
    },
    summary: {
      en: "The Real Estate General Authority (REGA), integrated with the Ejar platform, deployed mandatory digital security deposit escrow accounts across all new residential and commercial lease agreements. The system automates dispute resolution within 7 calendar days without litigation, enforcing automated refund disbursements and photographic property handover logs on Balady.",
      ar: "أطلقت الهيئة العامة للعقار بالتعاون مع شبكة إيجار خدمة المحفظة الرقمية الموحدة لحفظ مبالغ التأمين الإيجاري لجميع العقود السكنية والتجارية، مع تفعيل مسار الصلح الآلي لفض الخلافات خلال 7 أيام عمل دون حاجة للمحاكم، واعتماد التوثيق المصور للوحدات العقارية.",
      ur: "سعودی ریئل اسٹیٹ جنرل اتھارٹی اور ایجار پورٹل نے تمام نئے رہائشی و تجارتی کرایہ ناموں کے لیے ڈیجیٹل سیکیورٹی ڈپازٹ اکاؤنٹ لازمی قرار دے دیا ہے۔ کسی بھی تنازع کی صورت میں عدالت جائے بغیر 7 دن کے اندر اندر آن لائن ازالہ اور بلدی پورٹل کی تصدیق کے ساتھ ڈپازٹ کی فوری واپسی ممکن ہو گی۔"
    },
    aiInsight: {
      en: "Automating security deposit returns via escrow protects tenant liquidity and eliminates bad-faith landlord withholdings, elevating institutional confidence in Saudi real estate markets under Vision 2030.",
      ar: "يحمي إيداع مبالغ التأمين في حسابات الضمان حقوق المستأجرين ويمنع الاحتجاز غير المبرر للأموال، معززاً الشفافية وجاذبية الاستثمار العقاري بالمملكة.",
      ur: "یہ اقدام کرایہ داروں کے پیسوں کو تحفظ فراہم کرتا ہے اور مکان مالکان کی جانب سے غیر ضروری کٹوتیوں کو روک کر کرایہ داری نظام میں شفافیت لاتا ہے۔"
    }
  },
  {
    id: "fallback-sama-fintech-sme-venture-sep20-2026",
    category: "opportunity",
    impact: "High",
    source: "Saudi Central Bank (SAMA) & Monsha'at",
    date: "September 20, 2026",
    url: "https://www.sama.gov.sa/",
    createdAt: "2026-09-20T08:30:00.000Z",
    title: {
      en: "SAMA and Monsha'at Announce SAR 10B Venture Debt & Fintech Scale-Up Facility for KSA Founders",
      ar: "البنك المركزي ومنشآت يطلقان صندوق تمويل رأس المال الجريء وحلول الفنتك بقيمة 10 مليارات ريال",
      ur: "سعودی سینٹرل بینک اور منشآت نے فنٹیک اور اسٹارٹ اپس کے لیے 10 ارب ریال کے فنڈ کا باضابطہ اعلان کر دیا"
    },
    summary: {
      en: "The Saudi Central Bank (SAMA) partnered with the Small and Medium Enterprises General Authority (Monsha'at) to establish a SAR 10 billion liquidity and venture-debt facility targeting artificial intelligence, open banking, and supply-chain fintech startups. Over 1,200 enterprises with regional headquarters in Riyadh qualify for expedited credit lines and regulatory sandbox fast-tracking.",
      ar: "أعلن البنك المركزي السعودي (ساما) وهيئة 'منشآت' تأسيس برنامج التمويل الجريء وتطوير التقنية المالية بقيمة 10 مليارات ريال لدعم شركات الذكاء الاصطناعي والمصرفية المفتوحة، مع إتاحة مسارات سريعة في البيئة التجريبية التشريعية لأكثر من 1,200 منشأة مقرها الرياض.",
      ur: "سعودی سینٹرل بینک (ساما) اور منشآت نے آرٹیفیشل انٹیلی جنس اور فنٹیک اسٹارٹ اپس کی مدد کے لیے 10 ارب ریال کے وینچر فنڈنگ پروگرام کا آغاز کیا ہے، جس کے تحت ریاض میں موجود رجسٹرڈ کمپنیوں کو فوری قرضے اور آسان قانونی سہولیات دی جائیں گی۔"
    },
    aiInsight: {
      en: "Subsidized liquidity reduces capital acquisition bottlenecks for international expat co-founders and local entrepreneurs, positioning Riyadh as the Middle East's undisputed fintech powerhouse.",
      ar: "تسهم هذه المبادرة في تذليل عقبات التمويل لرواد الأعمال والمستثمرين العالميين والمحليين، مما يرسخ مكانة الرياض كعاصمة إقليمية للابتكار المالي.",
      ur: "یہ فنڈ غیر ملکی اور مقامی کاروباری افراد کو سرمایہ کاری کے بہترین مواقع فراہم کرتا ہے اور ریاض کو خطے کا سب سے بڑا فنانشل ٹیکنالوجی مرکز بناتا ہے۔"
    }
  },
  {
    id: "fallback-hrsd-qiwa-transfer-regulations-sep19-2026",
    category: "regulatory",
    impact: "High",
    source: "Ministry of Human Resources and Social Development (HRSD) & Qiwa Platform",
    date: "September 19, 2026",
    url: "https://hrsd.gov.sa/",
    createdAt: "2026-09-19T14:30:00.000Z",
    title: {
      en: "HRSD & Qiwa Enforce Digital Sponsorship Transfer Directives & Age Slab Work Regulations Across KSA",
      ar: "الموارد البشرية ومنصة قوى تعتمدان الضوابط المحدثة لنقل الكفالة رقمياً ولوائح الفئات العمرية العمالية",
      ur: "وزارتِ انسانی وسائل اور قویٰ پلیٹ فارم کا ڈیجیٹل کفالہ ٹرانسفر اور عمر کے مختلف سلیبس کے لیے نئے ضوابط کا باضابطہ نفاذ"
    },
    summary: {
      en: "The Ministry of Human Resources and Social Development (HRSD), in synchronization with Qiwa, enacted new operational procedures for contractual sponsorship transfers without current employer consent. Key triggers include expired work permits (>30 days), non-payment of wages for 3 consecutive months, or lack of a digitally authenticated contract on Qiwa. The directive also codifies age-slab operational rules and introduces an instant Huroob dispute resolution portal.",
      ar: "أعلنت وزارة الموارد البشرية والتنمية الاجتماعية بالتعاون مع منصة قوى تفعيل المسار الآلي المحدث لنقل الخدمات دون اشتراط موافقة صاحب العمل الحالي، في حالات انتهاء الإقامة لأكثر من 30 يوماً، أو تعثر صرف الأجور لثلاثة أشهر متتالية، أو غياب العقد الموثق. كما حددت اللائحة ضوابط عمل الفئات العمرية وأطلقت بوابة رقمية لفض بلاغات التغيب عن العمل.",
      ur: "وزارتِ انسانی وسائل اور قویٰ پورٹل نے موجودہ کفیل کی رضامندی کے بغیر نوکری اور کفالہ ٹرانسفر کے نئے ڈیجیٹل قواعد نافذ کر دیے ہیں، جن میں اقامہ یا ورک پرمٹ 30 دن سے زائد زائد المیعاد ہونا، مسلسل 3 ماہ تنخواہ نہ ملنا، یا قویٰ پر ڈیجیٹل معاہدہ نہ ہونا شامل ہے۔ مزید برآں، مختلف عمر کے سلیبس کے لیے کام کے الگ قوانین اور ہروب تنازعات کا فوری آن لائن حل بھی متعارف کرایا گیا ہے۔"
    },
    aiInsight: {
      en: "These operational updates eliminate informal transfer friction and provide transparent, legally protected labor mobility under the Labor Reform Initiative (LRI), directly benefiting over 10 million expatriates across the private sector.",
      ar: "تقضي هذه التحديثات التنظيمية على عقبات النقل التقليدية وتوفر مرونة تعاقدية وحماية قانونية بموجب مبادرة تحسين العلاقة التعاقدية، مستفيدة منها شريحة تتجاوز 10 ملايين مقيم في القطاع الخاص.",
      ur: "یہ اصلاحات پرانے پیچیدہ نظام کے بغیر ورکرز کو قانونی تحفظ فراہم کرتی ہیں اور لیبر ریفارم اینیشی ایٹو کے تحت نجی شعبے کے ایک کروڑ سے زائد غیر ملکی ملازمین کو جاب مارکیٹ میں تحفظ دیتی ہیں۔"
    }
  },
  {
    id: "fallback-sama-zatca-einvoicing-phase3-sep19-2026",
    category: "macro",
    impact: "High",
    source: "ZATCA & Saudi Central Bank (SAMA)",
    date: "September 19, 2026",
    url: "https://zatca.gov.sa/",
    createdAt: "2026-09-19T09:15:00.000Z",
    title: {
      en: "ZATCA & SAMA Launch Phase 3 Real-Time E-Invoicing & Automated Tax Clearance Network for KSA Businesses",
      ar: "هيئة الزكاة والضريبة والجمارك والبنك المركزي يطلقان المرحلة الثالثة للربط الآمن للفاتورة الإلكترونية عبر ساما",
      ur: "زکوٰۃ و ٹیکس اتھارٹی (ZATCA) اور ساما کا سعودی کاروباروں کے لیے فیز 3 ای انوائسنگ اور فوری ٹیکس نیٹ ورک کا آغاز"
    },
    summary: {
      en: "Zakat, Tax and Customs Authority (ZATCA), alongside SAMA, inaugurated the integration phase of real-time point-of-sale and B2B corporate billing clearance. Over 85,000 medium and small commercial enterprises have successfully integrated their ERP architectures into the Fatoora cloud portal, unlocking automatic VAT verification and instant supplier reconciliation.",
      ar: "أطلقت هيئة الزكاة والضريبة والجمارك (زاتكا) بالتعاون مع ساما المرحلة التوسعية لمنظومة الفاتورة الإلكترونية (فاتورة) للربط المباشر مع شبكات الدفع ونقاط البيع، مع انضمام أكثر من 85 ألف منشأة تجارية متوسطة وصغيرة للربط السحابي والتحقق الفوري من ضريبة القيمة المضافة.",
      ur: "زکوٰۃ، ٹیکس و کسٹمز اتھارٹی (ZATCA) نے سعودی سینٹرل بینک کے اشتراک سے ای انوائسنگ سسٹم کے فیز 3 کا آغاز کر دیا ہے۔ 85,000 سے زائد چھوٹے اور درمیانے تجارتی ادارے براہ راست فاتورہ کلاؤڈ سے منسلک ہو چکے ہیں جس سے وی اے ٹی کی خودکار تصدیق اور ادائیگیاں فوری ممکن ہو گئی ہیں۔"
    },
    aiInsight: {
      en: "Automated billing integration curbs commercial concealment (Tasattur), reduces accounting disputes, and allows compliant firms to process cross-border supplier transactions in seconds.",
      ar: "يسهم الربط الآلي في مكافحة التستر التجاري، والحد من النزاعات المحاسبية، وتسهيل المدفوعات التجارية العابرة للحدود في ثوانٍ معدودة.",
      ur: "خودکار بلنگ سسٹم کمرشل پردہ پوشی (تستر) کو روکتا ہے اور باضابطہ ٹیکس فائل کرنے والی کمپنیوں کے لیے فوری قانونی ادائیگیاں یقینی بناتا ہے۔"
    }
  },
  {
    id: "fallback-mod-rsaf-national-day-airshow-sep18-2026",
    category: "local",
    impact: "High",
    source: "Ministry of Defence (وزارة الدفاع) & General Entertainment Authority",
    date: "September 18, 2026",
    url: "https://www.mod.gov.sa/",
    createdAt: "2026-09-18T16:00:00.000Z",
    title: {
      en: "Ministry of Defence Announces Historic 96th Saudi National Day Air Shows Across Six Regional Hubs",
      ar: "وزارة الدفاع تعلن جدول أضخم استعراض جوي لليوم الوطني الـ96 في سماء 6 مدن سعودية بمشاركة الصقور الخضر",
      ur: "وزارتِ دفاع کا 96 ویں سعودی قومی دن پر 6 بڑے شہروں میں تاریخی ایئر شوز اور الصقور الخضر کی شاندار پروازوں کا اعلان"
    },
    summary: {
      en: "The Royal Saudi Air Force (RSAF), in partnership with the General Entertainment Authority, unveiled the finalized schedule for the National Day 96 air displays. Advanced strike fighters including the F-15SA, Typhoon, and Tornado will accompany the Saudi Hawks Aerobatic Team across Jeddah Waterfront, Riyadh KAFD, Al-Khobar Corniche, Taif, Abha, and Tabuk.",
      ar: "كشفت القوات الجوية الملكية السعودية بالتعاون مع الهيئة العامة للترفيه عن المسارات النهائية والمواعيد الزمنية للاستعراضات الجوية الكبرى لليوم الوطني الـ96. تحلق مقاتلات F-15SA والتايفون والتورنيدو بجانب فريق الصقور السعودية فوق واجهة جدة، وسماء الرياض، وكورنيش الخبر، والطائف، وأبها، وتبوك.",
      ur: "رائل سعودی ایئر فورس نے جنرل انٹرٹینمنٹ اتھارٹی کے اشتراک سے 96 ویں نیشنل ڈے پر تاریخی فضائی مظاہروں کے حتمی اوقات جاری کر دیے ہیں۔ جدید ایف 15، ٹائیفون اور ٹورنیڈو طیارے سعودی ہاکس کے ہمراہ جدہ کورنیش، ریاض، الخبر، طائف، ابہا اور تبوک کی فضاؤں میں پرواز کریں گے۔"
    },
    aiInsight: {
      en: "Coordinated airspace management by GACA ensures zero commercial flight disruptions while providing public waterfront and vantage points with prime visual access to military aviation demonstrations.",
      ar: "تضمن إدارة الأجواء المنسقة مع هيئة الطيران المدني انسيابية الحركة الجوية التجارية وتوفير أفضل مواقع المشاهدة العامة على الواجهات البحرية.",
      ur: "سول ایوی ایشن کے تعاون سے فضائی ٹریفک کو بغیر کسی رکاوٹ کے جاری رکھتے ہوئے عوام کے لیے ساحلی مقامات اور پارکوں میں بہترین نظارے کا انتظام کیا گیا ہے۔"
    }
  },
  {
    id: "fallback-hrsd-national-day-holiday-calendar-sep18-2026",
    category: "residency",
    impact: "High",
    source: "Ministry of Human Resources and Social Development (HRSD)",
    date: "September 18, 2026",
    url: "https://hrsd.gov.sa/",
    createdAt: "2026-09-18T11:00:00.000Z",
    title: {
      en: "HRSD Declares Official 4-Day Paid Holiday for Saudi National Day 96 for Public & Private Sectors",
      ar: "الموارد البشرية تعلن رسمياً إجازة اليوم الوطني الـ96 مدفوعة الأجر للقطاعين العام والخاص والبنوك والمدارس",
      ur: "وزارتِ انسانی وسائل کی جانب سے 96 ویں سعودی نیشنل ڈے پر سرکاری، نجی و بینکنگ سیکٹر کے لیے 4 روزہ باضابطہ تنخواہ دار تعطیلات کا اعلان"
    },
    summary: {
      en: "HRSD issued official holiday guidelines stipulating a 4-day nationwide break for Saudi National Day 96. Employees in the private and non-profit sectors receive full statutory paid leave pursuant to Article 127 of the Executive Regulations of the Saudi Labor Law, with financial overtime protections for shift workers.",
      ar: "أصدرت وزارة الموارد البشرية التعميم الرسمي لإجازة اليوم الوطني الـ96 المقررة بـ 4 أيام عطلة رسمية مدفوعة الأجر لكافة العاملين في القطاع الخاص، وغير الربحي، والدوائر الحكومية، وفق المادة 127 من اللائحة التنفيذية لنظام العمل، مع احتساب الأجر الإضافي للمناوبات الضرورية.",
      ur: "وزارتِ انسانی وسائل نے 96 ویں قومی دن کے موقع پر 4 روزہ طویل ویک اینڈ چھٹیوں کا باضابطہ نوٹیفکیشن جاری کر دیا ہے۔ سعودی لیبر لاء کے آرٹیکل 127 کے تحت نجی و فلاحی اداروں کے تمام ملازمین کو مکمل تنخواہ کے ساتھ چھٹی ملے گی جبکہ ایمرجنسی ڈیوٹی کرنے والوں کو اوور ٹائم ادا کیا جائے گا۔"
    },
    aiInsight: {
      en: "Mandatory statutory compliance safeguards labor rights across retail and hospitality sectors. Employers requiring active presence must issue compensatory rest days or statutory overtime premiums.",
      ar: "يلزم النظام المنشآت بحفظ حقوق العاملين؛ ويجب على أصحاب الأعمال تعويض العاملين بالمناوبة بيوم بديل أو أجر إضافي وفق المادة 107 من نظام العمل.",
      ur: "یہ حکمنامہ نجی شعبے میں ورکرز کے حقوق کا تحفظ کرتا ہے، جن اداروں میں کام ناگزیر ہو وہاں ملازمین کو متبادل چھٹی یا لیبر لاء کے تحت اوور ٹائم دینا لازمی ہے۔"
    }
  },
  {
    id: "fallback-red-sea-amaala-renewable-energy-sep17-2026",
    category: "opportunity",
    impact: "Medium",
    source: "Red Sea Global (RSG)",
    date: "September 17, 2026",
    url: "https://www.redseaglobal.com/",
    createdAt: "2026-09-17T15:30:00.000Z",
    title: {
      en: "Red Sea Global Surpasses 90% Renewable Energy Target at AMAALA Triple Bay Destination",
      ar: "البحر الأحمر الدولية تعلن تجاوز 90% من جاهزية الطاقة المتجددة بمشروع أمالا تريبل باي الساحلي",
      ur: "ریڈ سی گلوبل کا امالا ٹرپل بے لگژری ویلنیس ریزورٹ میں 90 فیصد قابل تجدید توانائی کے سنگ میل کی تکمیل کا اعلان"
    },
    summary: {
      en: "Red Sea Global (RSG) announced that AMAALA's Triple Bay ultra-luxury wellness destination has powered on its utility-scale solar PV and battery storage systems, achieving over 90% off-grid clean energy stability ahead of its late 2026 guest opening.",
      ar: "أعلنت شركة البحر الأحمر الدولية إتمام تشغيل منظومة الطاقة الشمسية المستقلة ومحطات تخزين البطاريات العملاقة في وجهة 'تريبل باي' بمشروع أمالا، محققة استقلالية تامة بالطاقة المتجددة بنسبة تفوق 90% قبل استقبال الزوار أواخر عام 2026.",
      ur: "ریڈ سی گلوبل نے امالا کے فائیو اسٹار ٹرپل بے منصوبے میں بڑے سولر پلانٹ اور انرجی اسٹوریج سسٹمز کو کامیابی سے فعال کر دیا ہے، جس سے 2026 کے اواخر میں سیاحوں کے استقبال سے قبل 90 فیصد ماحول دوست بجلی کی فراہمی یقینی ہو گئی ہے۔"
    },
    aiInsight: {
      en: "AMAALA and the Red Sea destination solidify Saudi Arabia's leadership in regenerative ecotourism and zero-carbon infrastructure, serving as a regional model for sustainable mega-developments.",
      ar: "يرسخ مشروعا أمالا والبحر الأحمر ريادة المملكة في السياحة البيئية المتجددة والبنية التحتية الخالية من الانبعاثات، كنموذج إقليمي رائد للمشاريع العملاقة المستدامة.",
      ur: "امالا اور بحیرہ احمر کا منصوبہ ماحول دوست سیاحت اور زیرو کاربن انفراسٹرکچر میں سعودی عرب کی عالمی قیادت کا منہ بولتا ثبوت ہے۔"
    }
  },
  {
    id: "fallback-momrah-municipal-facade-signage-sep17-2026",
    category: "community",
    impact: "Medium",
    source: "Ministry of Municipal and Rural Affairs and Housing (MOMRAH)",
    date: "September 17, 2026",
    url: "https://momrah.gov.sa/",
    createdAt: "2026-09-17T08:45:00.000Z",
    title: {
      en: "MOMRAH Enforces Unified Commercial Façade & Urban Landscape Guidelines Across Major Saudi Cities",
      ar: "وزارة البلديات والإسكان تبدأ تطبيق اشتراطات المشهد الحضري واللوحات التجارية الموحدة في المدن الكبرى",
      ur: "سعودی وزارت بلدیات و ہاؤسنگ کی جانب سے بڑے شہروں میں دکانوں کے سائن بورڈز اور خوبصورتی کے نئے بلدیاتی ضوابط کا نفاذ"
    },
    summary: {
      en: "MOMRAH launched strict enforcement of the Urban Landscape Enhancement Code. Commercial establishments across Riyadh, Jeddah, and Dammam must comply with standardized exterior signage dimensions, Arabic typographical predominance, and illuminated LED requirements via the Balady portal.",
      ar: "بدأت وزارة البلديات والإسكان الجولات الرقابية المكثفة لتطبيق دليل تحسين المشهد الحضري، ملزمة كافة المتاجر والمنشآت التجارية في الرياض وجدة والدمام بتوحيد مقاسات اللوحات الإعلانية، ووضوح الخط العربي بنسبة 70% على الأقل، واستيفاء تصاريح منصة بلدي.",
      ur: "سعودی وزارت بلدیات و ہاؤسنگ نے شہری خوبصورتی کے تحفظ کے لیے ریاض، جدہ اور دمام میں تجارتی دکانوں کے سائن بورڈز اور فرنٹ والز کے نئے معیار پر سختی سے عمل درآمد شروع کر دیا ہے، جس کے تحت بلدی پورٹل سے باضابطہ تصدیق اور عربی زبان کو نمایاں رکھنا لازمی ہے۔"
    },
    aiInsight: {
      en: "Standardized façades elevate visual appeal in metropolitan commercial districts. Retailers that promptly calibrate signage avoid municipal fines and benefit from enhanced customer footfall.",
      ar: "يعزز توحيد واجهات المحلات الجاذبية البصرية في المناطق التجارية، ويجنب أصحاب المتاجر الغرامات البلدية مع تحسين تجربة التسوق.",
      ur: "دکانوں کے معیاری سائن بورڈز مارکیٹوں کی خوبصورتی میں اضافہ کرتے ہیں اور فوری ضوابط مکمل کرنے والے دکاندار بھاری جرمانوں سے محفوظ رہتے ہیں۔"
    }
  },
  {
    id: "fallback-saff-khaleeji-27-squad-2026",
    category: "sports",
    impact: "High",
    source: "Saudi Arabian Football Federation (الاتحاد السعودي لكرة القدم)",
    date: "September 16, 2026",
    url: "https://www.saff.com.sa/",
    createdAt: "2026-09-16T17:00:00.000Z",
    title: {
      en: "Saudi Football Federation Confirms 26-Man Squad for Arabian Gulf Cup 27 in Jeddah",
      ar: "الاتحاد السعودي لكرة القدم يعلن القائمة النهائية للمنتخب الوطني المشاركة في خليجي 27 بجدة",
      ur: "سعودی فٹبال فیڈریشن کا عرب گلف کپ 27 کے لیے 26 رکنی قومی اسکواڈ کا باضابطہ اعلان"
    },
    summary: {
      en: "The Saudi Arabian Football Federation (SAFF) officially unveiled the 26-player roster for the 27th Arabian Gulf Cup hosted in Jeddah (Sep 23 - Oct 4, 2026). The Green Falcons boast a 25.4-year average squad age, led by an 8-player Al-Hilal contingent, 6 from Al-Nassr, and 3 breakthrough U-23 prodigies.",
      ar: "أعلن الاتحاد السعودي لكرة القدم القائمة الرسمية لكتيبة الصقور الخضر (26 لاعباً) لخوض منافسات كأس الخليج العربي الـ27 في جدة. تصدر نادي الهلال التمثيل بـ8 لاعبين يليه النصر بـ6 لاعبين، مع تصعيد 3 مواهب أولمبية بمعدل أعمار عام يبلغ 25.4 عاماً.",
      ur: "سعودی عربین فٹبال فیڈریشن نے جدہ میں منعقد ہونے والے 27 ویں خلیجی کپ کے لیے 26 رکنی حتمی اسکواڈ کا اعلان کر دیا ہے۔ اسکواڈ میں الہلال کے 8 اور النصر کے 6 کھلاڑی شامل ہیں جبکہ 3 نوجوان اولمپک کھلاڑیوں کو بھی موقع دیا گیا ہے۔"
    },
    aiInsight: {
      en: "This roster strategy balances tournament resilience with generational succession, using home advantage at King Abdullah Sports City (Al-Jawhara) to optimize high-press tactical transitions ahead of 2026 World Cup qualifiers.",
      ar: "تعكس التشكيلة تحولاً تكتيكياً ذكياً يجمع بين صلابة الخبرة في دوري روشن وحيوية المواهب الصاعدة، للاستفادة القصوى من مؤازرة جماهير ملعب الجوهرة المشعة بجدة.",
      ur: "یہ متوازن اسکواڈ ہوم گراؤنڈ پر ملکی وقار کی بحالی کے لیے انتہائی موزوں ہے جہاں الجوہرہ اسٹیڈیم کا پرجوش کراؤڈ سعودی ٹیم کے لیے بارہواں کھلاڑی ثابت ہوگا۔"
    }
  },
  {
    id: "fallback-cairo-summit-mbs-sisi-2026",
    category: "macro",
    impact: "High",
    source: "Saudi Press Agency (واس) & Cairo Presidency",
    date: "September 15, 2026",
    url: "https://www.spa.gov.sa/",
    createdAt: "2026-09-15T18:00:00.000Z",
    title: {
      en: "Crown Prince Mohammed bin Salman and President El-Sisi Conclude High-Level Strategic Talks in Cairo",
      ar: "ولي العهد والرئيس المصري يختتمان مباحثات قمة القاهرة الاستراتيجية: شراكة استثمارية وصون أمن البحر الأحمر",
      ur: "قاہرہ میں سعودی ولی عہد اور صدر السیسی کے درمیان تاریخی مذاکرات: بحیرہ احمر کی حفاظت اور اربوں ڈالر کے معاشی معاہدے"
    },
    summary: {
      en: "HRH Crown Prince Mohammed bin Salman met with Egyptian President Abdel Fattah El-Sisi at Al-Ittihadiya Palace. The summit formalized the Bilateral Investment Promotion & Protection Agreement (IPA), reviewed progress on the 3,000 MW electrical grid interconnection, and affirmed unyielding joint security measures for maritime navigation through the Red Sea and Bab al-Mandab.",
      ar: "عقد صاحب السمو الملكي الأمير محمد بن سلمان جلسة مباحثات معمقة مع الرئيس عبدالفتاح السيسي بقصر الاتحادية، توجت بتوقيع اتفاقية تشجيع وحماية الاستثمارات المتبادلة، ومتابعة المراحل التشغيلية لمشروع الربط الكهربائي (3000 ميجاوات)، مع تأكيد مشترك على صون حرية الملاحة والتصدي الصارم لتهديدات البحر الأحمر وباب المندب.",
      ur: "سعودی ولی عہد شہزادہ محمد بن سلمان اور مصری صدر السیسی کی قصر الاتحادیہ میں تفصیلی ملاقات۔ دونوں ممالک کے درمیان سرمایہ کاری کے تحفظ کا دوطرفہ تاریخی معاہدہ طے پایا، 3,000 میگاواٹ کے پاور گرڈ منصوبے کا جائزہ لیا گیا، اور بحیرہ احمر میں عالمی تجارت کی مکمل حفاظت کے عزم کا اعادہ کیا گیا۔"
    },
    aiInsight: {
      en: "This diplomatic convergence solidifies the Arab world's core military and financial axis. The investment protection pact directly de-risks over 7,000 Saudi operating entities in Egypt, while naval cooperation safeguards Suez Canal and King Abdullah Port logistics corridors.",
      ar: "يرسخ هذا اللقاء التاريخي محور التوازن العربي؛ إذ تمنح اتفاقية حماية الاستثمارات ضمانة قانونية لأكثر من 7,000 شركة سعودية بمصر، في حين يؤمن التعاون البحري تدفقات التجارة العالمية عبر قناة السويس وميناء الملك عبدالله.",
      ur: "یہ سربراہی اجلاس مشرقِ وسطیٰ میں استحکام کا ضامن ہے۔ سرمایہ کاری تحفظ معاہدے سے مصر میں کام کرنے والی 7,000 سے زائد سعودی کمپنیوں کے مفادات محفوظ ہو گئے ہیں جبکہ نہر سویز اور سعودی بندرگاہوں کو مشترکہ بحری تحفظ مل گیا ہے۔"
    }
  },
  {
    id: "fallback-moe-grading-matrix-1448",
    category: "education",
    impact: "High",
    source: "Saudi Ministry of Education (وزارة التعليم)",
    date: "September 14, 2026",
    url: "https://www.moe.gov.sa/",
    createdAt: "2026-09-14T12:00:00.000Z",
    title: {
      en: "Ministry of Education Approves Continuous Assessment Framework: 60% Coursework & 40% Final Exam Split",
      ar: "وزارة التعليم تعتمد لائحة تقويم الطالب وتوزيع درجات أعمال السنة: 60 درجة لأعمال السنة و40 للاختبار النهائي",
      ur: "سعودی وزارتِ تعلیم کا سالانہ امتحانی درجات کے نئے فارمولے کا نفاذ: 60 فیصد سالانہ کارکردگی اور 40 فیصد فائنل امتحان"
    },
    summary: {
      en: "The Saudi Ministry of Education has released the standardized assessment directives for the 1448H academic year across all public and private schools. The updated matrix mandates that continuous coursework accounts for 60% (comprising 20% short quizzes, 15% performance tasks, 15% homework & digital portfolios, and 10% attendance/engagement), while end-of-term examinations represent the remaining 40%.",
      ar: "أصدرت وزارة التعليم التنظيمات الرسمية المعتمدة لتوزيع درجات أعمال السنة وتقويم الطلاب للعام الدراسي 1448هـ. خُصصت 60 درجة لأعمال السنة (20 درجة للاختبارات القصيرة، 15 درجة للمهمات الأدائية، 15 درجة للواجبات والأنشطة عبر منصة مدرستي، و10 درجات للمواظبة والحضور الصفي)، فيما خُصصت 40 درجة للاختبار التحريري والعملي النهائي.",
      ur: "سعودی وزارتِ تعلیم نے تعلیمی سال 1448ھ کے پہلے سمسٹر کے لیے طلبہ کی مارکنگ اسکیم کا حتمی اعلان کر دیا۔ 60 فیصد نمبرز سالانہ کارکردگی (20 نمبرز کوئزز، 15 نمبرز عملی پراجیکٹس، 15 نمبرز ہوم ورکس اور مدرستی اسائنمنٹس، 10 نمبرز حاضری) جبکہ 40 فیصد نمبرز فائنل تحریری امتحان کے لیے مختص کیے گئے ہیں۔"
    },
    aiInsight: {
      en: "This shift reinforces continuous experiential learning and digital accountability via the Madrasati and Noor portals. Expat families and parents must closely monitor attendance and weekly tasks, as cumulative GPA directly influences the prestigious Unified University Admission Mawzoonah ratios.",
      ar: "يرسخ هذا التنظيم نهج التعلم المستمر والتحول الرقمي عبر منصتي مدرستي ونظام نور. يتوجب على أولياء الأمور متابعة الحضور والمهام الأدائية أسبوعياً؛ إذ يُعد المعدل التراكمي المرتكز الأساسي لاحتساب النسبة الموزونة للقبول الجامعي الموحد.",
      ur: "یہ نیا نظام منصہ مدرستی اور نظام نور کے ذریعے طلبہ کی روزانہ کارکردگی کو شفاف بناتا ہے۔ والدین کو حاضری اور ہفتہ وار اسائنمنٹس پر خصوصی توجہ دینی چاہیے کیونکہ اسکول کا مجموعی اسکور ہی سعودی یونیورسٹیوں کے داخلے کی موزونہ فیصد کا تعین کرتا ہے۔"
    }
  },
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
