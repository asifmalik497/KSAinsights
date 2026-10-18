import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, Landmark, Sparkles, BookOpen, X, Info } from 'lucide-react';

export type SupportedTermId = 
  | 'mawzoonah'
  | 'qudurat'
  | 'tahsili'
  | 'expat_quota'
  | 'muadalah'
  | 'etec'
  | 'reverse_target'
  | 'digital_sat'
  | 'eosb_article84'
  | 'eosb_article85'
  | 'actual_wage'
  | 'dependent_levy'
  | 'exit_reentry'
  | 'qiwa'
  | 'wps'
  | 'nitaqat'
  | 'haraj_lam_yaud';

export interface TermDefinition {
  id: SupportedTermId;
  category: {
    en: string;
    ar: string;
    ur: string;
  };
  title: {
    en: string;
    ar: string;
    ur: string;
  };
  shortDefinition: {
    en: string;
    ar: string;
    ur: string;
  };
  detailedExplanation: {
    en: string;
    ar: string;
    ur: string;
  };
  statutoryBasis: {
    en: string;
    ar: string;
    ur: string;
  };
  impactTip?: {
    en: string;
    ar: string;
    ur: string;
  };
}

export const KSA_TERMS_DICTIONARY: Record<SupportedTermId, TermDefinition> = {
  mawzoonah: {
    id: 'mawzoonah',
    category: {
      en: 'Saudi University Admissions',
      ar: 'القبول الجامعي الموحد',
      ur: 'سعودی یونیورسٹی داخلے'
    },
    title: {
      en: 'Mawzoonah (النسبة الموزونة)',
      ar: 'النسبة الموزونة المركبة',
      ur: 'موزونہ (ویٹڈ کمپوزٹ اسکور)'
    },
    shortDefinition: {
      en: 'The certified weighted percentage score used by Saudi public universities to rank applicants for competitive seat allocation.',
      ar: 'المعيار الحسابي المركب المعتمد للمفاضلة بين المتقدمين في الجامعات الحكومية وفق أوزان محددة.',
      ur: 'سعودی سرکاری جامعات میں داخلے کے لیے ہائی اسکول، قدرات اور تحصیلی کا ویٹڈ میرٹ اسکور۔'
    },
    detailedExplanation: {
      en: 'Calculated by multiplying High School GPA, Qudurat (Aptitude), and Tahsili (Achievement) by each university track weighting (e.g. 30% HS + 30% Qudurat + 40% Tahsili for Health majors).',
      ar: 'تُحسب بجمع حاصل ضرب درجات الثانوية العامة والقدرات العامة والتحصيلي في الأوزان المعتمدة لكل كلية (مثل 30% ثانوية + 30% قدرات + 40% تحصيلي للمسار الصحي).',
      ur: 'ہائی اسکول، قدرات اور تحصیلی کے نمبروں کو فیکلٹی کے مقررہ تناسب (جیسے میڈیکل کے لیے 30%، 30%، اور 40%) سے ضرب دے کر حتمی 100 میں سے اسکور نکالا جاتا ہے۔'
    },
    statutoryBasis: {
      en: 'Royal Decree M/27 & Ministry of Education Admissions Framework',
      ar: 'المرسوم الملكي م/27 ولائحة القبول الموحد بوزارة التعليم',
      ur: 'شاہی فرمان م/27 اور سعودی وزارت تعلیم کے ضوابط'
    },
    impactTip: {
      en: 'A Mawzoonah of 90%+ is typically required for competitive STEM and internal scholarship seats.',
      ar: 'تحقيق موزونة تفوق 90% يعزز فرص الترشيح للكليات الهندسية وبرامج المنح التنافسية.',
      ur: 'انجینئرنگ اور اسکالرشپ کی نشستوں کے لیے عموماً 90 فیصد سے زائد موزونہ درکار ہوتا ہے۔'
    }
  },
  qudurat: {
    id: 'qudurat',
    category: {
      en: 'National Standardized Testing',
      ar: 'الاختبارات الوطنية المعيارية',
      ur: 'قومی امتحانات'
    },
    title: {
      en: 'Qudurat / GAT (اختبار القدرات العامة)',
      ar: 'اختبار القدرات العامة (قياس)',
      ur: 'قدرات ٹیسٹ (جنرل ایپیٹیوڈ)'
    },
    shortDefinition: {
      en: 'The General Aptitude Test developed by ETEC/Qiyas measuring analytical reasoning and verbal comprehension.',
      ar: 'مقياس موحد من هيئة تقويم التعليم والتدريب يقيس القدرات التحليلية والاستدلالية واللفظية والكمية.',
      ur: 'ای ٹی ای سی قیاس کا لازمی ٹیسٹ جو ریاضیاتی، تجزیاتی اور منطقی صلاحیتوں کا اندازہ لگاتا ہے۔'
    },
    detailedExplanation: {
      en: 'Administered in Arabic and English (GAT). Students are permitted up to 5 attempts, with scores remaining officially valid for 5 Gregorian years.',
      ar: 'يُقدم باللغتين العربية والإنجليزية، وتتاح للمتقدم 5 محاولات نظامية، وتظل الدرجة صالحة رسمياً لمدة 5 سنوات ميلادية.',
      ur: 'یہ ٹیسٹ انگریزی اور عربی دونوں میں دیا جا سکتا ہے۔ طلباء 5 بار ٹیسٹ دے سکتے ہیں اور اس کا اسکور 5 سال تک کارآمد رہتا ہے۔'
    },
    statutoryBasis: {
      en: 'Education and Training Evaluation Commission (ETEC / Qiyas)',
      ar: 'تنظيمات هيئة تقويم التعليم والتدريب (مركز قياس الوطني)',
      ur: 'ایجوکیشن اینڈ ٹریننگ ایویلیوایشن کمیشن (قیاس کونسل)'
    }
  },
  tahsili: {
    id: 'tahsili',
    category: {
      en: 'National Standardized Testing',
      ar: 'الاختبارات الوطنية المعيارية',
      ur: 'قومی امتحانات'
    },
    title: {
      en: 'Tahsili / SAAT (الاختبار التحصيلي)',
      ar: 'الاختبار التحصيلي للتخصصات العلمية',
      ur: 'تحصیلی ٹیسٹ (سبجیکٹ اچیومنٹ)'
    },
    shortDefinition: {
      en: 'Standardized Achievement Admission Test measuring cumulative mastery in Math, Physics, Chemistry, and Biology.',
      ar: 'اختبار يقيس الحصيلة المعرفية التراكمية في الرياضيات والفيزياء والكيمياء والأحياء لمرحلة الثانوية.',
      ur: 'سائنس، فزکس، کیمسٹری، ریاضی اور بیالوجی کے نصاب پر مبنی تعلیمی اچیومنٹ ٹیسٹ۔'
    },
    detailedExplanation: {
      en: 'Carries the highest institutional weight (up to 40%) in Saudi university engineering, computer science, and healthcare admissions.',
      ar: 'يحظى بالوزن الأكبر (حتى 40%) في معادلات القبول للكليات الصحية والهندسية وعلم البيانات.',
      ur: 'سعودی جامعات میں انجینئرنگ اور ٹیکنالوجی کے داخلوں میں اس کا وزن سب سے زیادہ (40 فیصد) ہوتا ہے۔'
    },
    statutoryBasis: {
      en: 'ETEC Higher Admissions Mandate & Nafath Automated Linking',
      ar: 'قرارات هيئة تقويم التعليم والربط الآلي عبر النفاذ الوطني',
      ur: 'ای ٹی ای سی قوانین اور نفاذ تصدیقی پورٹل'
    }
  },
  expat_quota: {
    id: 'expat_quota',
    category: {
      en: 'Scholarships & Residency Policy',
      ar: 'سياسات المنح والإقامة',
      ur: 'اسکالرشپ اور کوٹہ پالیسی'
    },
    title: {
      en: '5% Expat Resident Quota (كوتة المقيمين)',
      ar: 'نسبة الـ 5% للمقيمين (المنح الداخلية)',
      ur: 'مقیم طلبہ کا 5 فیصد کوٹہ'
    },
    shortDefinition: {
      en: 'Statutory seat reservation allocating up to 5% of public university admissions for non-Saudi resident students.',
      ar: 'نسبة مقاعد مخصصة نظاماً للطلاب غير السعوديين المقيمين بالمملكة عبر نظام المنح الدراسية الداخلية المجانية.',
      ur: 'سرکاری جامعات میں اقامہ ہولڈر غیر ملکی طلبہ کے لیے مفت تعلیم کا 5 فیصد مخصوص کوٹہ۔'
    },
    detailedExplanation: {
      en: 'Available through the official "Study in Saudi" platform. Covers STEM, Computer Science, Artificial Intelligence, Business, and Architecture without tuition fees.',
      ar: 'يُتاح التقديم عبر منصة "ادرس في السعودية" في تخصصات الهندسة والذكاء الاصطناعي وإدارة الأعمال والعلوم دون رسوم دراسية.',
      ur: 'یہ نشستیں "اسٹڈی ان سعودی" پورٹل کے ذریعے دی جاتی ہیں اور انجینئرنگ، کمپیوٹر اور سائنس کے شعبوں میں مکمل ٹیوشن فری ہیں۔'
    },
    statutoryBasis: {
      en: 'Council of Ministers Resolution & Royal Decree M/27',
      ar: 'قرار مجلس الوزراء المنظم للمنح الدراسية والمرسوم الملكي م/27',
      ur: 'کابینہ کی قرارداد اور شاہی فرمان م/27'
    },
    impactTip: {
      en: 'Requires a valid Iqama and completion of secondary education inside KSA with Mawzoonah typically ≥ 90%.',
      ar: 'يتطلب إقامة سارية وإنهاء الثانوية داخل المملكة وموزونة تفوق 90% للمفاضلة.',
      ur: 'درست اقامہ، سعودی ہائی اسکول سرٹیفکیٹ اور مسابقتی موزونہ اسکور لازمی شرائط ہیں۔'
    }
  },
  muadalah: {
    id: 'muadalah',
    category: {
      en: 'Academic Credential Evaluation',
      ar: 'معادلة المؤهلات الدراسية',
      ur: 'تعلیمی اسناد کی معادلہ'
    },
    title: {
      en: 'Muadalah / Equivalency (معادلة الشهادة)',
      ar: 'معادلة الشهادة الثانوية',
      ur: 'سرکاری معادلہ (موازنہ سند)'
    },
    shortDefinition: {
      en: 'Official certificate equivalency issued by the Ministry of Education for graduates of non-Saudi curricula.',
      ar: 'وثيقة رسمية صادرة عن إدارة الاختبارات بوزارة التعليم لمعادلة شهادات المدارس الدولية بالمملكة.',
      ur: 'غیر ملکی نصاب (برٹش، امریکن، کیمبرج، سی بی ایس ای) کے طلبہ کے لیے سعودی وزارت تعلیم کی تصدیق۔'
    },
    detailedExplanation: {
      en: 'Mandatory for graduates of British (IGCSE/A-Level), American Diploma, or CBSE schools in Saudi Arabia to convert raw grades into a recognized Saudi percentage.',
      ar: 'إلزامية لخريجي المدارس العالمية (البريطانية والأمريكية والهندية) داخل المملكة لتحويل التقديرات إلى نسبة مئوية نظامية.',
      ur: 'اس سرٹیفکیٹ کے بغیر انٹرنیشنل اسکولوں کے طلبہ سرکاری یونیورسٹی کے ایڈمشن پورٹل پر درخواست نہیں دے سکتے۔'
    },
    statutoryBasis: {
      en: 'Saudi Ministry of Education Examination & Equivalency Directorate',
      ar: 'الإدارة العامة للاختبارات والقبول بوزارة التعليم السعودية',
      ur: 'وزارت تعلیم، ڈائریکٹوریٹ آف ایگزامینیشنز'
    }
  },
  etec: {
    id: 'etec',
    category: {
      en: 'Regulatory Authorities',
      ar: 'الهيئات والتنظيمات الحكومية',
      ur: 'سرکاری ریگولیٹری ادارے'
    },
    title: {
      en: 'ETEC / Qiyas (هيئة تقويم التعليم قياس)',
      ar: 'هيئة تقويم التعليم والتدريب (مركز قياس)',
      ur: 'ای ٹی ای سی / قیاس کونسل'
    },
    shortDefinition: {
      en: 'The Saudi government authority responsible for national educational assessment, accreditation, and university entrance exams.',
      ar: 'الجهة الحكومية المختصة بالتقويم والقياس والاعتماد الأكاديمي واختبارات القبول الجامعي.',
      ur: 'سعودی قومی ادارہ برائے تعلیمی جانچ، معیار بندی اور یونیورسٹی داخلہ امتحانات۔'
    },
    detailedExplanation: {
      en: 'Operates the Qiyas electronic portal, directly synchronizing exam results with university admission portals via the National Information Center.',
      ar: 'تدير منصة قياس الرقمية وتربط نتائج الاختبارات آلياً مع بوابات الجامعات عبر مركز المعلومات الوطني.',
      ur: 'تمام داخلہ نتائج کو براہ راست قومی ڈیٹا بیس کے ساتھ منسلک کر کے شفاف میرٹ یقینی بناتا ہے۔'
    },
    statutoryBasis: {
      en: 'Council of Ministers Resolution No. 108',
      ar: 'تنظيم هيئة تقويم التعليم الصادر بقرار مجلس الوزراء رقم 108',
      ur: 'کابینہ کی منظوری کے تحت قائم خود مختار کمیشن'
    }
  },
  reverse_target: {
    id: 'reverse_target',
    category: {
      en: 'Predictive Admission Tools',
      ar: 'أدوات التنبؤ الأكاديمي',
      ur: 'پیشن گوئی کے ٹولز'
    },
    title: {
      en: 'Reverse Target Score (الدرجة العكسية)',
      ar: 'حاسبة الدرجة العكسية المستهدفة',
      ur: 'ریورس ٹارگٹ اسکور کیلکولیٹر'
    },
    shortDefinition: {
      en: 'A mathematical reverse solver calculating the exact Tahsili score required to achieve a target university cutoff.',
      ar: 'معادلة عكسية تحدد بدقة درجة التحصيلي المطلوبة لتحقيق النسبة الموزونة المستهدفة لأي تخصص.',
      ur: 'یہ فارمولہ بتاتا ہے کہ پسندیدہ شعبے کے کٹ آف کو چھونے کے لیے تحصیلی ٹیسٹ میں کتنے نمبر درکار ہیں۔'
    },
    detailedExplanation: {
      en: 'Takes known High School GPA and Qudurat score to determine whether the desired college cutoff is mathematically reachable, optimizing study efforts.',
      ar: 'تستخدم معدل الثانوية ودرجة القدرات المحققة لتحديد مدى إمكانية الوصول لنسب القبول المستهدفة وتوجيه الجهد الدراسي.',
      ur: 'اس سے طلباء کو اپنی امتحانی تیاری اور محنت کا ہدف طے کرنے میں درست رہنمائی ملتی ہے۔'
    },
    statutoryBasis: {
      en: 'Algorithmic Inversion of Official MoE Weighting Matrix',
      ar: 'المعادلة الرياضية العكسية المعتمدة لمعايير الفرز الجامعي',
      ur: 'وزارت تعلیم کے حسابی فارمولے پر مبنی ریورس طریقہ کار'
    }
  },
  digital_sat: {
    id: 'digital_sat',
    category: {
      en: 'International Admission Tracks',
      ar: 'المسارات الدولية للقبول',
      ur: 'بین الاقوامی داخلہ ٹریکس'
    },
    title: {
      en: 'Digital SAT Track (مسار السات الرقمي)',
      ar: 'مسار السات الدولي (KFUPM & KSU)',
      ur: 'ڈیجیٹل سیٹ ٹریک (امریکن بورڈ)'
    },
    shortDefinition: {
      en: 'Direct university admission pathway exempting students from domestic Qudurat and Tahsili exams via standardized College Board SAT.',
      ar: 'مسار قبول دولي سريع يعفي المتفوقين في اختبار السات من اختباري القدرات والتحصيلي بجامعة البترول والملك سعود.',
      ur: 'کالج بورڈ کے ڈیجیٹل سیٹ کی بنیاد پر بغیر قدرات و تحصیلی کے فاسٹ ٹریک داخلہ۔'
    },
    detailedExplanation: {
      en: 'KFUPM typically requires a minimum composite Digital SAT of 1350 with at least 650–700 in Math for early scholarship and admission offers.',
      ar: 'تشترط جامعة الملك فهد (KFUPM) درجة 1350 كحد أدنى في السات مع 650-700 في الرياضيات للقبول المبكر والمنح.',
      ur: 'کے ایف یو پی ایم میں کم از کم 1350 سیٹ اسکور اور میتھ سیکشن میں 650 تا 700 نمبر درکار ہوتے ہیں۔'
    },
    statutoryBasis: {
      en: 'KFUPM International Admissions Board & KSU International Fast-Track',
      ar: 'ضوابط القبول الدولي المبكر بجامعة الملك فهد للبترول والمعادن',
      ur: 'کنگ فہد یونیورسٹی فاسٹ ٹریک داخلہ قوانین'
    }
  },
  eosb_article84: {
    id: 'eosb_article84',
    category: {
      en: 'Saudi Labor Law',
      ar: 'نظام العمل السعودي',
      ur: 'سعودی لیبر لاء'
    },
    title: {
      en: 'Article 84: End of Service Gratuity (المادة 84)',
      ar: 'المادة 84 من نظام العمل (مكافأة نهاية الخدمة)',
      ur: 'آرٹیکل 84: اینڈ آف سروس گریجویٹی'
    },
    shortDefinition: {
      en: 'The core statutory formula granting half month wage per year for the first 5 years and one full month wage for each year thereafter.',
      ar: 'المعيار النظامي الذي يقرر نصف أجر شهري عن كل سنة من السنوات الخمس الأولى، وأجر شهر كامل عن كل سنة تالية.',
      ur: 'پہلے 5 سال کی ملازمت کے لیے آدھی تنخواہ سالانہ اور بعد کے سالوں کے لیے مکمل ماہانہ تنخواہ کا حق۔'
    },
    detailedExplanation: {
      en: 'Calculated on the last comprehensive wage (basic salary + housing + recurring allowances). Fractions of years are awarded proportionately.',
      ar: 'تُحسب على أساس الأجر الفعلي الأخير (الأساسي + السكن + البدلات الثابتة)، وتُحتسب أجزاء السنة بنسبة ما قضي منها.',
      ur: 'اس کا حساب آخری تنخواہ بمعہ تمام مقررہ الاؤنسز پر ہوتا ہے اور ادھورے سالوں کا تناسب بھی دیا جاتا ہے۔'
    },
    statutoryBasis: {
      en: 'Saudi Labor Law (Royal Decree No. M/51)',
      ar: 'المرسوم الملكي رقم (م/51) وتعديلاته بقرار مجلس الوزراء رقم 258',
      ur: 'سعودی لیبر لاء، شاہی فرمان نمبر م/51'
    },
    impactTip: {
      en: 'Applies in full upon employer termination, contract non-renewal, retirement, or female resignation within 6 months of marriage.',
      ar: 'تُصرف كاملة عند إنهاء العقد من صاحب العمل أو انتهاء مدته المحددة أو استقالة المرأة خلال 6 أشهر من الزواج.',
      ur: 'کمپنی کی برطرفی، کنٹریکٹ کی میعاد ختم ہونے، یا ریٹائرمنٹ پر پوری رقم ملتی ہے۔'
    }
  },
  eosb_article85: {
    id: 'eosb_article85',
    category: {
      en: 'Saudi Labor Law',
      ar: 'نظام العمل السعودي',
      ur: 'سعودی لیبر لاء'
    },
    title: {
      en: 'Article 85: Resignation Scale (المادة 85)',
      ar: 'المادة 85 من نظام العمل (استقالة العامل)',
      ur: 'آرٹیکل 85: استعفیٰ کی صورت میں کٹوتی'
    },
    shortDefinition: {
      en: 'The legal adjustment scale determining what fraction of end-of-service gratuity is paid when an employee resigns voluntarily.',
      ar: 'جدول الاستحقاق المتدرج لمكافأة نهاية الخدمة في حال كانت المغادرة بناءً على استقالة العامل الطوعية.',
      ur: 'ملازم کی اپنی مرضی سے استعفیٰ دینے پر گریجویٹی میں قانونی کٹوتی کا باضابطہ شیڈول۔'
    },
    detailedExplanation: {
      en: 'Tenure < 2 yrs = 0%; 2 to 5 yrs = 1/3rd (33.33%); 5 to 10 yrs = 2/3rds (66.67%); 10+ yrs = 100% full award.',
      ar: 'أقل من سنتين = لا شيء (0%)؛ من 2 إلى 5 سنوات = ثلث المكافأة (33.33%)؛ من 5 إلى 10 سنوات = ثلثا المكافأة (66.67%)؛ 10 سنوات فأكثر = المكافأة كاملة.',
      ur: '2 سال سے کم ملازمت = صفر؛ 2 تا 5 سال = ایک تہائی (33.33%)؛ 5 تا 10 سال = دو تہائی (66.67%)؛ 10 سال سے زائد = مکمل 100 فیصد۔'
    },
    statutoryBasis: {
      en: 'Saudi Labor Law (Royal Decree No. M/51, Article 85)',
      ar: 'المادة 85 من نظام العمل الصادر بالمرسوم الملكي م/51',
      ur: 'سعودی لیبر لاء، آرٹیکل 85'
    }
  },
  actual_wage: {
    id: 'actual_wage',
    category: {
      en: 'Labor & Compensation Standards',
      ar: 'معايير الأجور والتعويضات',
      ur: 'تنخواہ اور معاوضے کے اصول'
    },
    title: {
      en: 'Last Actual Wage (الأجر الفعلي الأخير)',
      ar: 'الأجر الفعلي الشامل الأخير',
      ur: 'آخری مجموعی تنخواہ (ایکچوئل ویج)'
    },
    shortDefinition: {
      en: 'The comprehensive gross monthly remuneration used as the legal benchmark for calculating end-of-service benefits.',
      ar: 'الأجر الإجمالي الشامل المعتمد نظاماً لحساب مكافأة نهاية الخدمة والتعويضات العمالية.',
      ur: 'گریجویٹی کا حساب لگانے کے لیے قانونی طور پر تسلیم شدہ آخری مکمل ماہانہ تنخواہ۔'
    },
    detailedExplanation: {
      en: 'Includes Basic Salary PLUS all fixed recurring allowances (such as Housing and Transportation). Overtime and discretionary annual bonuses are typically excluded.',
      ar: 'يشمل الراتب الأساسي مضافاً إليه كافة البدلات الثابتة والمستمرة (كبَدَل السكن والنقل)، مع استبعاد المكافآت السنوية غير الثابتة.',
      ur: 'اس میں بنیادی تنخواہ اور مقررہ الاؤنسز (جیسے رہائش اور کنوینس الاؤنس) شامل ہوتے ہیں۔ عارضی بونس خارج ہوتے ہیں۔'
    },
    statutoryBasis: {
      en: 'Article 2 of the Saudi Labor Law (Definition of Wage & Actual Wage)',
      ar: 'المادة 2 من نظام العمل السعودي (تعريف الأجر والأجر الفعلي)',
      ur: 'سعودی لیبر لاء، آرٹیکل 2 (اجرت کی قانونی تعریف)'
    }
  },
  dependent_levy: {
    id: 'dependent_levy',
    category: {
      en: 'Expatriate Residency Tariffs',
      ar: 'رسوم الإقامة والمرافقين',
      ur: 'فیملی لیوی اور اقامہ فیس'
    },
    title: {
      en: 'Dependent Levy (المقابل المالي للمرافقين)',
      ar: 'المقابل المالي للمرافقين والتابعين',
      ur: 'فیملی ممبر لیوی (مرافقین فیس)'
    },
    shortDefinition: {
      en: 'The government fee of SAR 400 per month charged for each dependent registered under the expatriate worker Iqama.',
      ar: 'الرسم الحكومي المحدد بـ 400 ريال شهرياً عن كل فرد من التابعين والمرافقين تحت كفالة المقيم.',
      ur: 'ہر فیملی ممبر (بیوی، بچوں) کے لیے ماہانہ 400 سعودی ریال سرکاری فیس۔'
    },
    detailedExplanation: {
      en: 'Calculated as: Dependents Count × SAR 400 × Renewal Duration (Months). Must be prepaid electronically via SADAD before Iqama renewal or Final Exit issuance.',
      ar: 'المعادلة: عدد المرافقين × 400 ريال × عدد شهور الإقامة. يلزم سدادها مسبقاً عبر نظام سداد لإتمام تجديد الإقامة أو الخروج النهائي.',
      ur: 'فارمولہ: مرافقین کی تعداد × 400 ریال × تجدید کے مہینے۔ اقامہ تجدید یا خروج نہائی سے قبل سداد پر ادائیگی لازمی ہے۔'
    },
    statutoryBasis: {
      en: 'Council of Ministers Resolution No. 553 & Fiscal Balance Program',
      ar: 'قرار مجلس الوزراء رقم 553 وبرنامج تحقيق التوازن المالي',
      ur: 'کابینہ کی قرارداد نمبر 553 اور مالیاتی توازن پروگرام'
    }
  },
  exit_reentry: {
    id: 'exit_reentry',
    category: {
      en: 'Jawazat Travel Documents',
      ar: 'وثائق السفر والجوازات',
      ur: 'سفری ویزا اور پاسپورٹ قوانین'
    },
    title: {
      en: 'Exit & Re-Entry Visa (تأشيرة الخروج والعودة)',
      ar: 'تأشيرة الخروج والعودة (الجوازات)',
      ur: 'خروج و عودہ (ایگزٹ ری انٹری ویزا)'
    },
    shortDefinition: {
      en: 'Official travel authorization issued by Jawazat enabling resident expatriates and dependents to exit and re-enter KSA.',
      ar: 'إذن سفر رسمي صادر عن المديرية العامة للجوازات يتيح للمقيمين ومرافقيهم مغادرة المملكة والعودة إليها نظاماً.',
      ur: 'محکمہ پاسپورٹ (جوازات) کا سفری پرمٹ جس کے ذریعے مقیم افراد سعودی عرب سے باہر جا اور واپس آ سکتے ہیں۔'
    },
    detailedExplanation: {
      en: 'Single: SAR 200 for up to 60 days + SAR 100 for each extra month. Multiple: SAR 500 for up to 90 days + SAR 200 for each extra month.',
      ar: 'مفردة: 200 ريال لأول 60 يوماً + 100 ريال لكل شهر إضافي. متعددة: 500 ريال لأول 90 يوماً + 200 ريال لكل شهر إضافي.',
      ur: 'سنگل ویزا: 60 دن کے 200 ریال + ہر اضافی ماہ کے 100 ریال۔ ملٹیپل ویزا: 90 دن کے 500 ریال + ہر اضافی ماہ کے 200 ریال۔'
    },
    statutoryBasis: {
      en: 'General Directorate of Passports (Jawazat) Travel Regulations',
      ar: 'اللائحة التنفيذية لنظام وثائق السفر بالمديرية العامة للجوازات',
      ur: 'محکمہ پاسپورٹ و امیگریشن (جوازات) کے باضابطہ قوانین'
    }
  },
  qiwa: {
    id: 'qiwa',
    category: {
      en: 'MHRSD Digital Platforms',
      ar: 'منصات الموارد البشرية الرقمية',
      ur: 'وزارت افرادی قوت کے ڈیجیٹل پلیٹ فارمز'
    },
    title: {
      en: 'Qiwa Platform (منصة قوى)',
      ar: 'منصة قوى (وزارة الموارد البشرية)',
      ur: 'قویٰ پلیٹ فارم (لیبر پورٹل)'
    },
    shortDefinition: {
      en: 'The unified digital platform of the Ministry of Human Resources regulating private sector employment contracts and job mobility.',
      ar: 'المنصة الرقمية الموحدة لوزارة الموارد البشرية لتوثيق العقود ونقل الخدمات وإدارة العلاقة التعاقدية.',
      ur: 'وزارت افرادی قوت کا مرکزی پورٹل جہاں ملازمت کے معاہدوں کی تصدیق اور کفالہ ٹرانسفر ہوتا ہے۔'
    },
    detailedExplanation: {
      en: 'Enables digital contract signing, automatic notice period tracking, employer change requests, and work permit verification under labor reform initiatives.',
      ar: 'تتيح توثيق العقود إلكترونياً، ونقل الكفالة بعد انتهاء العقد أو دون موافقة المنشأة في حالات المخالفات، واحتساب فترات الإشعار.',
      ur: 'اس پر ڈیجیٹل کنٹریکٹ سائن ہوتا ہے اور معاہدہ مکمل ہونے پر ملازم اپنی مرضی سے دوسری کمپنی میں ٹرانسفر لے سکتا ہے۔'
    },
    statutoryBasis: {
      en: 'MHRSD Labor Reform Initiative (LRI) & Ministerial Resolution No. 70273',
      ar: 'مبادرة تحسين العلاقة التعاقدية والقرار الوزاري رقم 70273',
      ur: 'لیبر ریفارم اینیشی ایٹو اور وزارتی قرارداد 70273'
    }
  },
  wps: {
    id: 'wps',
    category: {
      en: 'Banking & Financial Compliance',
      ar: 'الامتثال المالي والمصرفي',
      ur: 'بینکنگ اور تنخواہ کا تحفظ'
    },
    title: {
      en: 'Wage Protection System / WPS (نظام حماية الأجور)',
      ar: 'نظام حماية الأجور (مدد وقوى)',
      ur: 'ویج پروٹیکشن سسٹم (WPS)'
    },
    shortDefinition: {
      en: 'The mandatory electronic financial compliance system monitoring timely wage disbursements to private sector employees.',
      ar: 'نظام رقابي مصرفي يرصد صرف رواتب العاملين في القطاع الخاص في مواعيدها المحددة عبر البنوك المعتمدة.',
      ur: 'سعودی مرکزی بینک اور وزارت کا خودکار نظام جو چیک کرتا ہے کہ ملازمین کو ہر ماہ وقت پر تنخواہ مل رہی ہے یا نہیں۔'
    },
    detailedExplanation: {
      en: 'Unpaid wages for 3 consecutive months through WPS grants the employee the legal right to transfer sponsorship without current employer consent on Qiwa.',
      ar: 'تأخر صرف الراتب لمدة 3 أشهر متتالية في نظام حماية الأجور يمنح العامل حق نقل الخدمات فوراً دون موافقة صاحب العمل عبر قوى.',
      ur: 'اگر کسی ملازم کو مسلسل 3 ماہ تک تنخواہ نہ ملے تو وہ موجودہ کمپنی کی اجازت کے بغیر نیا کفیل تلاش کر سکتا ہے۔'
    },
    statutoryBasis: {
      en: 'MHRSD Wage Protection Directives & Saudi Central Bank (SAMA)',
      ar: 'تنظيمات حماية الأجور الصادرة عن وزارة الموارد والبنك المركزي السعودي',
      ur: 'سعودی سینٹرل بینک (ساما) اور لیبر قوانین'
    }
  },
  nitaqat: {
    id: 'nitaqat',
    category: {
      en: 'Saudization & Localization',
      ar: 'التوطين ونطاقات المنشآت',
      ur: 'سعودائزیشن اور کمپنی کیٹیگری'
    },
    title: {
      en: 'Nitaqat (نظام نطاقات التوطين)',
      ar: 'برنامج نطاقات لتوطين الوظائف',
      ur: 'نطاقات سسٹم (کمپنی گریڈنگ)'
    },
    shortDefinition: {
      en: 'The national system classifying private sector establishments into color tiers based on their Saudi employment percentage.',
      ar: 'برنامج تصنيف المنشآت إلى نطاقات (بلاتيني، أخضر، أحمر) وفق نسب توطين الوظائف وسعودتها.',
      ur: 'کمپنیوں کی کیٹیگری (پلاٹینم، گرین، ریڈ) کا نظام جو سعودی ملازمین کے فیصد کے مطابق طے ہوتا ہے۔'
    },
    detailedExplanation: {
      en: 'Platinum and High Green firms enjoy full visa issuance and transfer privileges. Red tier firms cannot renew work permits or prevent expat transfers.',
      ar: 'المنشآت في النطاق البلاتيني والأخضر تتمتع بتسهيلات الاستقدام ونقل الخدمات، بينما تُحرم منشآت النطاق الأحمر من تجديد الرخص.',
      ur: 'پلاٹینم اور گرین کیٹیگری کی کمپنیاں نئے ویزے اور اقامہ تجدید کر سکتی ہیں، جبکہ ریڈ کیٹیگری پر پابندیاں لگ جاتی ہیں۔'
    },
    statutoryBasis: {
      en: 'MHRSD Localization Bylaws & Council of Economic Affairs Directives',
      ar: 'لوائح التوطين الصادرة بقرارات مجلس الشؤون الاقتصادية والتنمية',
      ur: 'وزارت افرادی قوت کے سعودائزیشن قوانین'
    }
  },
  haraj_lam_yaud: {
    id: 'haraj_lam_yaud',
    category: {
      en: 'Border & Immigration Bans',
      ar: 'تنظيمات الجوازات والمنع من الدخول',
      ur: 'امیگریشن اور سفری پابندیاں'
    },
    title: {
      en: 'Kharaj wa Lam Ya\'ud (خرج ولم يعد)',
      ar: 'حالة خرج ولم يعد (الجوازات)',
      ur: 'خرج ولم يعد (3 سالہ سفری پابندی)'
    },
    shortDefinition: {
      en: 'The official immigration designation for expatriates whose exit and re-entry visas expire while outside Saudi Arabia.',
      ar: 'الحالة النظامية التي تُسجل على المقيم عند انتهاء تأشيرة خروجه وعودته خارج أراضي المملكة دون تمديد.',
      ur: 'جب کوئی ملازم چھٹی پر جا کر واپس نہ آئے اور اس کا ویزا باہر ہی ختم ہو جائے تو یہ لسٹ لگتی ہے۔'
    },
    detailedExplanation: {
      en: 'Triggers an automated 3-year entry ban into Saudi Arabia. The individual cannot return on a new employment visa unless sponsored by their former employer.',
      ar: 'يترتب عليها حظر تلقائي من دخول المملكة لمدة 3 سنوات ميلادية، إلا في حال استقدامه بتأشيرة عمل جديدة على صاحب العمل السابق نفسه.',
      ur: 'اس پر خودکار طور پر 3 سال کی پابندی لگ جاتی ہے، سوائے اس کے کہ پرانا کفیل ہی اسے دوبارہ نیا ویزا جاری کرے۔'
    },
    statutoryBasis: {
      en: 'Ministry of Interior & General Directorate of Passports Ministerial Order',
      ar: 'القرارات الوزارية لوزارة الداخلية والمديرية العامة للجوازات',
      ur: 'وزارت داخلہ اور محکمہ پاسپورٹ کے باضابطہ احکامات'
    }
  }
};

interface TermTooltipProps {
  termId?: SupportedTermId;
  children?: React.ReactNode;
  currentLang: 'en' | 'ar' | 'ur';
  className?: string;
  badgeOnly?: boolean;
  customTerm?: Partial<TermDefinition>;
}

export const TermTooltip: React.FC<TermTooltipProps> = ({
  termId,
  children,
  currentLang,
  className = '',
  badgeOnly = false,
  customTerm
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isRTL = currentLang === 'ar' || currentLang === 'ur';

  const termData: TermDefinition | undefined = termId 
    ? KSA_TERMS_DICTIONARY[termId] 
    : (customTerm as TermDefinition);

  // Close tooltip when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!termData) {
    return <span className={className}>{children}</span>;
  }

  const titleText = termData.title[currentLang] || termData.title.en;
  const categoryText = termData.category[currentLang] || termData.category.en;
  const shortDefText = termData.shortDefinition[currentLang] || termData.shortDefinition.en;
  const detailedText = termData.detailedExplanation[currentLang] || termData.detailedExplanation.en;
  const statutoryText = termData.statutoryBasis[currentLang] || termData.statutoryBasis.en;
  const impactTipText = termData.impactTip ? (termData.impactTip[currentLang] || termData.impactTip.en) : null;

  return (
    <span 
      ref={containerRef} 
      className={`relative inline-flex items-center align-middle ${className}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        aria-label={`Explain term: ${titleText}`}
        aria-expanded={isOpen}
        className={`inline-flex items-center gap-1 cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary/50 rounded px-1 -mx-1 ${
          badgeOnly 
            ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold py-0.5 rounded-full'
            : 'border-b border-dashed border-secondary/80 hover:border-secondary hover:text-secondary group'
        }`}
      >
        {children ? (
          <span>{children}</span>
        ) : (
          <span className="font-semibold">{titleText}</span>
        )}
        <HelpCircle 
          size={badgeOnly ? 11 : 13} 
          className="text-secondary opacity-75 group-hover:opacity-100 transition-opacity shrink-0" 
        />
      </button>

      {/* Floating Explanatory Popover Card */}
      {isOpen && (
        <div 
          role="tooltip"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className={`absolute z-50 bottom-full mb-2.5 w-72 sm:w-84 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 text-left rtl:text-right text-gray-800 transition-all duration-200 animate-in fade-in zoom-in-95 pointer-events-auto ${
            isRTL 
              ? 'right-0 sm:-right-4' 
              : 'left-0 sm:-left-4'
          }`}
          style={{ filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.12))' }}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 pb-2.5 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <BookOpen size={13} />
              </div>
              <div>
                <span className="text-[9px] font-black uppercase tracking-wider text-secondary block">
                  {categoryText}
                </span>
                <h4 className="text-xs sm:text-sm font-serif font-bold text-primary leading-tight">
                  {titleText}
                </h4>
              </div>
            </div>

            <button 
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 p-0.5 rounded-full transition-colors"
              aria-label="Close tooltip"
            >
              <X size={14} />
            </button>
          </div>

          {/* Body: Short & Detailed Definition */}
          <div className="my-2.5 space-y-2 text-xs leading-relaxed text-gray-600 font-normal">
            <p className="font-medium text-gray-800">
              {shortDefText}
            </p>
            <p className="text-[11px] text-gray-500 font-light">
              {detailedText}
            </p>
          </div>

          {/* Impact Tip if available */}
          {impactTipText && (
            <div className="mb-2.5 p-2 rounded-xl bg-amber-50/70 border border-amber-200/60 text-[10px] text-amber-900 flex items-start gap-1.5 leading-snug">
              <Sparkles size={13} className="text-amber-700 shrink-0 mt-0.5" />
              <span>{impactTipText}</span>
            </div>
          )}

          {/* Statutory Basis & Citation Footer */}
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400 font-medium">
            <div className="flex items-center gap-1 truncate max-w-[240px]">
              <Landmark size={11} className="text-secondary shrink-0" />
              <span className="truncate">{statutoryText}</span>
            </div>
            <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-widest shrink-0">
              Verified
            </span>
          </div>

          {/* Small Arrow indicator */}
          <div 
            className={`absolute top-full w-3 h-3 bg-white transform rotate-45 border-r border-b border-gray-100 -mt-1.5 ${
              isRTL ? 'right-6' : 'left-6'
            }`} 
          />
        </div>
      )}
    </span>
  );
};

export default TermTooltip;
