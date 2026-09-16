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
