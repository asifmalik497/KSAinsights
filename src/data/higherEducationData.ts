export interface UniversityFormula {
  id: string;
  name: { en: string; ar: string; ur: string };
  region: 'riyadh' | 'eastern' | 'western' | 'southern' | 'other';
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
    cutoffMin?: number;
    cutoffMax?: number;
    typicalCutoff: string;
    stepRequirement?: { en: string; ar: string; ur: string };
    description: { en: string; ar: string; ur: string };
  }[];
}

export const UNIVERSITIES_DATA: UniversityFormula[] = [
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
        cutoffMin: 90,
        cutoffMax: 96,
        typicalCutoff: '90% - 96%+',
        stepRequirement: {
          en: 'STEP 75+ or IELTS 5.5+ recommended for prep year exemption',
          ar: 'اختبار كفايات ستيب 75+ أو آيلتس 5.5+ لإعفاء السنة التحضيرية',
          ur: 'اسٹیپ 75+ یا آئیلٹس 5.5 پریپ ایئر استثنیٰ کے لیے مفید'
        },
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
        cutoffMin: 88,
        cutoffMax: 94,
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
        cutoffMin: 82,
        cutoffMax: 88,
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
        cutoffMin: 91,
        cutoffMax: 97,
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
        cutoffMin: 1350,
        cutoffMax: 1550,
        typicalCutoff: '1350+ SAT Score',
        stepRequirement: {
          en: 'Official SAT score of 1350+ (Math 650+) with online verification',
          ar: 'درجة سات رسمية 1350+ (الرياضيات 650+) مع التحقق الإلكتروني',
          ur: 'آفیشل سیٹ اسکور 1350+ (ریاضی 650+) آن لائن تصدیق کے ساتھ'
        },
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
        cutoffMin: 88,
        cutoffMax: 95,
        typicalCutoff: '88% - 95%',
        stepRequirement: {
          en: 'STEP 70+ or IELTS 5.0+ for direct medical specialization',
          ar: 'ستيب 70+ أو آيلتس 5.0+ للتخصص المباشر في المسار الصحي',
          ur: 'طبی ٹریک میں براہ راست داخلے کے لیے اسٹیپ 70 یا آئیلٹس 5.0'
        },
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
        cutoffMin: 80,
        cutoffMax: 86,
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
        cutoffMin: 89,
        cutoffMax: 94,
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
        cutoffMin: 84,
        cutoffMax: 90,
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
        cutoffMin: 80,
        cutoffMax: 86,
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
        cutoffMin: 89,
        cutoffMax: 95,
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
        cutoffMin: 85,
        cutoffMax: 91,
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
    id: 'kku',
    name: {
      en: 'King Khalid University (KKU)',
      ar: 'جامعة الملك خالد (أبها - عسير)',
      ur: 'کنگ خالد یونیورسٹی (ابہا - عسیر)'
    },
    region: 'southern',
    location: { en: 'Abha / Asir', ar: 'أبها / عسير', ur: 'ابہا / عسیر' },
    qsRank: 'Top 300 Globally / Flagship Southern Hub',
    portalUrl: 'https://www.kku.edu.sa/',
    tracks: [
      {
        id: 'health',
        name: { en: 'Health Colleges (Medicine & Dentistry)', ar: 'الكليات الصحية (الطب والأسنان والصيدلة)', ur: 'ہیلتھ کالجز (میڈیسن و ڈینٹل)' },
        weights: { highSchool: 30, qudurat: 30, tahsili: 40 },
        cutoffMin: 88,
        cutoffMax: 94,
        typicalCutoff: '88% - 94%',
        description: {
          en: 'Medicine, Dentistry, Medical Laboratories, Clinical Nursing.',
          ar: 'الطب البشري، جراحة الأسنان، المختبرات الطبية، والتمريض.',
          ur: 'میڈیسن، ڈینٹل، میڈیکل لیبارٹریز اور نرسنگ۔'
        }
      },
      {
        id: 'engineering-computing',
        name: { en: 'Engineering & Computing', ar: 'الهندسة والحاسب الآلي والعلوم', ur: 'انجینئرنگ اور کمپیوٹر سائنس' },
        weights: { highSchool: 30, qudurat: 30, tahsili: 40 },
        cutoffMin: 82,
        cutoffMax: 89,
        typicalCutoff: '82% - 89%',
        description: {
          en: 'Civil, Mechanical, Electrical Engineering, AI, and IT.',
          ar: 'الهندسة المدنية، الميكانيكية، الكهربائية، وتقنية المعلومات.',
          ur: 'سول، مکینیکل، الیکٹریکل انجینئرنگ اور آئی ٹی۔'
        }
      }
    ]
  },
  {
    id: 'taibah',
    name: {
      en: 'Taibah University',
      ar: 'جامعة طيبة (المدينة المنورة)',
      ur: 'طیبہ یونیورسٹی (مدینہ منورہ)'
    },
    region: 'western',
    location: { en: 'Madinah', ar: 'المدينة المنورة', ur: 'مدینہ منورہ' },
    qsRank: 'Premier Madinah Regional Institution',
    portalUrl: 'https://www.taibahu.edu.sa/',
    tracks: [
      {
        id: 'health-sciences',
        name: { en: 'Medical & Applied Sciences', ar: 'المسار الصحي والطبي', ur: 'میڈیکل اور اپلائیڈ سائنسز' },
        weights: { highSchool: 30, qudurat: 30, tahsili: 40 },
        cutoffMin: 88,
        cutoffMax: 95,
        typicalCutoff: '88% - 95%',
        description: {
          en: 'Medicine, Rehabilitation Sciences, Nursing, Medical Imaging.',
          ar: 'الطب والجراحة، التأهيل الطبي، التمريض، والعلوم الإشعاعية.',
          ur: 'میڈیسن، میڈیکل ری ہیبلیٹیشن اور ریڈیولوجی۔'
        }
      },
      {
        id: 'computing-eng',
        name: { en: 'Computer Sciences & Engineering', ar: 'علوم وهندسة الحاسب الآلي', ur: 'کمپیوٹر سائنس اور انجینئرنگ' },
        weights: { highSchool: 40, qudurat: 30, tahsili: 30 },
        cutoffMin: 82,
        cutoffMax: 89,
        typicalCutoff: '82% - 89%',
        description: {
          en: 'Software Engineering, Networks, AI, Electrical and Mechanical.',
          ar: 'هندسة البرمجيات، شبكات الحاسب، الذكاء الاصطناعي، الهندسة الكهربائية.',
          ur: 'سافٹ ویئر انجینئرنگ، کمپیوٹر نیٹ ورکس اور اے آئی۔'
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
        cutoffMin: 85,
        cutoffMax: 91,
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
        cutoffMin: 78,
        cutoffMax: 84,
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
        cutoffMin: 84,
        cutoffMax: 92,
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
        cutoffMin: 78,
        cutoffMax: 85,
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
    id: 'psu',
    name: {
      en: 'Prince Sultan University (PSU)',
      ar: 'جامعة الأمير سلطان (الرياض)',
      ur: 'پرنس سلطان یونیورسٹی (ریاض)'
    },
    region: 'riyadh',
    location: { en: 'Riyadh', ar: 'الرياض', ur: 'ریاض' },
    qsRank: '#1 Private University in KSA / Top 500 Globally',
    portalUrl: 'https://www.psu.edu.sa/',
    tracks: [
      {
        id: 'computing-eng',
        name: { en: 'Computer Sciences & Engineering', ar: 'علوم الحاسب وهندسة البرمجيات والذكاء الاصطناعي', ur: 'کمپیوٹر سائنس اور سافٹ ویئر انجینئرنگ' },
        weights: { highSchool: 40, qudurat: 30, tahsili: 30 },
        cutoffMin: 82,
        cutoffMax: 90,
        typicalCutoff: '82% - 90%',
        stepRequirement: {
          en: 'STEP 75+ or IELTS 5.5+ required (100% English curriculum)',
          ar: 'ستيب 75+ أو آيلتس 5.5+ إلزامي (المنهج بالكامل بالإنجليزية)',
          ur: 'اسٹیپ 75+ یا آئیلٹس 5.5 لازمی (مکمل انگلش نصاب)'
        },
        description: {
          en: 'ABET-accredited software engineering, cybersecurity, data science, and AI.',
          ar: 'برامج معتمدة من ABET الأمريكية في هندسة البرمجيات والأمن السيبراني والذكاء الاصطناعي.',
          ur: 'امریکی اسناد یافتہ سافٹ ویئر انجینئرنگ، سائبر سیکیورٹی اور ڈیٹا سائنس۔'
        }
      },
      {
        id: 'business-law',
        name: { en: 'Business Administration & Law', ar: 'إدارة الأعمال والمحاسبة والقانون', ur: 'بزنس ایڈمنسٹریشن اور قانون' },
        weights: { highSchool: 50, qudurat: 30, tahsili: 20 },
        cutoffMin: 78,
        cutoffMax: 86,
        typicalCutoff: '78% - 86%',
        description: {
          en: 'AACSB-accredited finance, marketing, commercial law, aviation management.',
          ar: 'إدارة الطيران، المالية والمحاسبة معتمدة من AACSB الدولية.',
          ur: 'فنانس، مارکیٹنگ، کمرشل قانون اور ایوی ایشن مینجمنٹ۔'
        }
      }
    ]
  },
  {
    id: 'alfaisal',
    name: {
      en: 'Alfaisal University',
      ar: 'جامعة الفيصل (الرياض)',
      ur: 'الفیصل یونیورسٹی (ریاض)'
    },
    region: 'riyadh',
    location: { en: 'Riyadh', ar: 'الرياض', ur: 'ریاض' },
    qsRank: 'Top Research & Medical Hub / Elite Private Non-Profit',
    portalUrl: 'https://www.alfaisal.edu/',
    tracks: [
      {
        id: 'medicine',
        name: { en: 'College of Medicine (MBBS)', ar: 'كلية الطب البشري', ur: 'کالج آف میڈیسن (ایم بی بی ایس)' },
        weights: { highSchool: 40, qudurat: 30, tahsili: 30 },
        cutoffMin: 90,
        cutoffMax: 97,
        typicalCutoff: '90% - 97%',
        description: {
          en: 'Premier medical program clinical rotations with King Faisal Specialist Hospital.',
          ar: 'برنامج طبي رائد وتدريب سريري بمستشفى الملك فيصل التخصصي ومركز الأبحاث.',
          ur: 'کنگ فیصل اسپیشلسٹ ہسپتال میں کلینیکل ٹریننگ اور اعلیٰ ترین میڈیکل ڈگری۔'
        }
      },
      {
        id: 'engineering-ai',
        name: { en: 'Engineering & Computing', ar: 'الهندسة المعمارية والذكاء الاصطناعي', ur: 'انجینئرنگ اور مصنوعی ذہانت' },
        weights: { highSchool: 40, qudurat: 30, tahsili: 30 },
        cutoffMin: 85,
        cutoffMax: 92,
        typicalCutoff: '85% - 92%',
        description: {
          en: 'Mechanical, Electrical, Industrial Engineering, AI and Cybersecurity.',
          ar: 'الهندسة الميكانيكية، الكهربائية، الصناعية، وهندسة البرمجيات.',
          ur: 'مکینیکل، الیکٹریکل، انڈسٹریل انجینئرنگ اور سائبر سیکیورٹی۔'
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
        cutoffMin: 75,
        cutoffMax: 85,
        typicalCutoff: 'Competitive High School GPA',
        stepRequirement: {
          en: 'STEP 60+ or IELTS 4.5+ required before sophomore year',
          ar: 'ستيب 60+ أو آيلتس 4.5+ شرط لاجتياز السنة الأولى',
          ur: 'پہلا سال پاس کرنے کے لیے اسٹیپ 60 یا آئیلٹس 4.5 لازمی'
        },
        description: {
          en: 'No Qudurat/Tahsili required for many tracks. Open for Saudis and Expats alike.',
          ar: 'لا يشترط اختبارات قياس لبعض التخصصات. متاح للسعوديين والمقيمين بتعليم مدمج.',
          ur: 'قدرات اور تحصیلی لازمی نہیں۔ سعودی اور مقیم طلبا دونوں کے لیے موزوں۔'
        }
      }
    ]
  }
];
