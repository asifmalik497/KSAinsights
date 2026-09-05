import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, X, 
  Scale, Car, CreditCard,
  ShieldCheck, Wifi, Server
} from 'lucide-react';
import { cn, getLanguage } from '../lib/utils';
import SEO from '../components/SEO';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Guides: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = getLanguage(i18n.language);
  const isRTL = currentLang === 'ar' || currentLang === 'ur';
  const [searchQuery, setSearchQuery] = useState('');
  const [previewingDoc, setPreviewingDoc] = useState<any | null>(null);

  const resources = [
    {
      id: 'hajj-mobile-networks-2026',
      category: 'Connectivity',
      icon: <Wifi className="w-16 h-16" />,
      color: 'text-orange-600',
      banner: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2070&auto=format&fit=crop',
      title: {
        en: 'Hajj 2026 Mobile Connectivity: The Ultimate Pilgrim\'s Field Manual',
        ar: 'دليل اتصالات الحج 2026: الدليل الميداني الشامل لضيوف الرحمن',
        ur: 'حج 2026 موبائل کمیونیکیشن اور ڈیٹا پیکجز گائیڈ'
      },
      description: {
        en: 'A comprehensive field manual for pilgrims. Covering STC, Mobily, Zain, eSIM options, and technical tips for ensuring 24/7 connectivity during the holy pilgrimage.',
        ar: 'دليل ميداني شامل للحجاج يغطي باقات STC وموبايلي وزين، وخيارات الشرائح الإلكترونية، ونصائح تقنية لضمان الاتصال الدائم خلال الرحلة الإيمانية.',
        ur: 'حج کے مسافروں کے لیے ایک مکمل گائیڈ جس میں STC، موبایلی، زین پیکجز، eSIM اور تکنیکی تجاویز شامل ہیں تاکہ آپ پورے سفر کے دوران جڑے رہیں۔'
      },
      content: {
        en: `
# **Hajj 2026 Mobile Connectivity: The Ultimate Global Pilgrim's Manual**

Welcome, respected Guest of Allah! In the modern age, a stable internet connection is not just a convenience—it is a **safety-critical lifeline**. Whether you are navigating the intricate, high-density pathways of Mina, waiting for your specific Rawdah slot on the **Nusuk app**, or contacting your Hajj mission in an emergency, your mobile phone is your primary tool for a successful journey.

This 2026 edition guide has been meticulously dynamic-mapped by our technical experts at **KSA Insights** to ensure you never lose touch with what matters most.

---

## 1. **Executive Strategy: Network Selection Matrix**
Before diving into technical details, use this high-level matrix to decide which network fits your specific pilgrimage profile:

| **User Profile** | **Recommended Provider** | **Strategic Advantage** |
| :--- | :--- | :--- |
| **The Power User** (Live streaming) | **STC (Saudi Telecom)** | Best 5G backhaul and most temporary towers in Arafat. |
| **The Family Communicator** | **Mobily** | "Unlimited Social" pass is unbeatable for WhatsApp/Snapchat. |
| **The Budget Traveler** | **Lebara / Friendi** | Competitive rates for South Asia and Africa calling. |
| **The Hotel Resident** | **Zain** | Excellent indoor 5G coverage in Aziziyah & Makkah towers. |

---

## 2. **Pre-Arrival: Technical Readiness Checklist**
Success starts before you land in the Kingdom. Ensure your hardware is physically and digitally prepared:

- **Network Unlocking**: Contact your home carrier **10 days before** departure. Ensure your device is "Global Unlocked."
- **5G/4G Band Compatibility**: Saudi networks rely on **n77/n78 (5G)** and **Bands 1, 3, 7 (4G)**. Modern iPhones (12+) and Samsung S-series (S21+) are fully compatible.
- **Power Strategy**: Data usage in 45°C heat drains batteries 40% faster. You **must** carry a **20,000mAh Power Bank** (minimum 20W PD output).
- **The Dual-SIM Advantage**: Use a phone that supports **Physical SIM + eSIM**. Keep your home SIM active for Bank OTPs, and use the Saudi SIM for data.

---

## 3. **STC (Saudi Telecom Company) - The Infrastructure Leader**
STC is the government-backed incumbent and typically offers the most robust signal when 3 million people are in one location.

### **STC Sawa Ziyarah (Visitor) Packages 2026**
| **Plan Name** | **Main Data** | **Social Data** | **Local Mins** | **Price (VAT Incl)** | **Activation** |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Ziyarah 70** | 10 GB | 10 GB | 500 | 80.5 SAR | **70** to **900** |
| **Ziyarah 100** | 20 GB | 20 GB | 1000 | 115 SAR | **100** to **900** |
| **Ziyarah 150** | 40 GB | **Unlimited** | **Unlimited** | 172.5 SAR | **150** to **900** |
| **Ziyarah 200** | **Unlimited** | **Unlimited** | **Unlimited** | 230 SAR | **200** to **900** |

- **Critical Code**: Dial **\*166#** to check your main balance.
- **Internet Check**: Dial **\*166\*5#** for detailed data usage.
- **Support**: Call **900** from any STC line.

---

## 4. **Mobily - The Social Media Powerhouse**
Mobily is the secondary player but often provides better "value-per-GB" for those who live on social media.

### **Mobily Visitor Data Deals**
| **Package** | **General Data** | **Apps (WA/SC/YT/FB)** | **Voice Mins** | **Price** |
| :--- | :--- | :--- | :--- | :--- |
| **Visitor 75** | 10 GB | 10 GB | 500 | 86 SAR |
| **Visitor 120** | 20 GB | 20 GB | 1200 | 138 SAR |
| **Visitor 150** | 30 GB | **Unlimited** | **1500** | 172 SAR |

- **Check Usage**: Dial **\*1411#** or use the **Mobily App**.
- **Tech Tip**: Mobily's 5G is highly reliable in the **Clock Tower** area.

---

## 5. **Connectivity Strategy for the "Days of Hajj" (Mina/Arafat/Muzdalifah)**
In these three days, network density is the highest on Earth.

1.  **The "Airplane Mode" Refresh**: If you have "Full Signal" but data is not moving, toggle Airplane mode for **15 seconds**. This forces the device to "Handshake" with a less congested cell tower.
2.  **Toggle 4G/LTE**: 5G can get "Congestion Lock." Manually switching your settings to **"4G Only"** often provides a slower but much more **stable** connection in crowds.
3.  **Night Syncing**: Significant uploads (Vlogs, large photo albums) should be scheduled for **2 AM to 5 AM**, when network latency is at its lowest.

---

## 6. **The eSIM Revolution: Skip the Airport Lines**
If your phone supports eSIM (iPhone 11+, Samsung S21+, Pixel 5+), do not wait in line at the airport.
- **Download the Apps**: Install **stc pay**, **my stc**, or **Mobily App** before you fly.
- **Digital Onboarding**: Purchase the "Visitor eSIM" directly. You will need to provide your Passport and Visa number.
- **Instant Activation**: Upon landing at JED or MED, your phone will automatically download the profile and connect.

---

## 7. **Security & Scam Prevention**
- **No Street SIMs**: Some people offer "Free SIMs" or "Anonymous SIMs" on the street. **Do not take them.** All Saudi SIMs must be registered via fingerprint (Biometrics). Using a SIM registered to someone else can result in **deportation or legal action**.
- **Public Wi-Fi Warning**: Only use hotel Wi-Fi for non-sensitive tasks. Never access your banking apps on "Haram Free Wi-Fi" or Mall Wi-Fi without a VPN.

---

## 8. **Troubleshooting & FAQ**
- **Q: My Nusuk app won't load!**
  - **A**: Some roaming SIMs from other countries are blocked by Saudi security. Use a local Saudi SIM to ensure full access.

---
*Managed by KSA Insights Technical Bureau. Hajj Mabroor.*
`,
        ar: `
# دليل اتصالات الحج 2026: الدليل الميداني الشامل لضيوف الرحمن

أهلاً بكم يا ضيوف الرحمن! في عصرنا الرقمي، لم يعد الاتصال المستقر بالإنترنت مجرد رفاهية، بل أصبح **أداة حيوية للأمن والسلامة وإتمام المناسك**. سواء كنت تستخدم **تطبيق نسك** لاستخراج تصاريح الروضة الشريفة، أو تتنقل عبر خرائط جوجل في مشعر منى المزدحم، فإن هاتفك هو رفيقك الذي لا غنى عنه.

تم إعداد هذا الدليل لعام 2026 بدقة من قبل خبرائنا التقنيين في **KSA Insights** لضمان بقائكم على اتصال دائم.

---

## 1. **ملخص تنفيذي: أي شبكة تختار؟**
استخدم هذا الجدول السريع لاختيار المزود المناسب بناءً على احتياجك الأساسي خلال رحلتك:

| **الحاجة الأساسية** | **المزود الموصى به** | **لماذا؟** |
| :--- | :--- | :--- |
| **أفضل تغطية في منى وعرفات** | **STC (الاتصالات السعودية)** | أكبر بنية تحتية وأكبر عدد من الأبراج المؤقتة في المشاعر. |
| **استخدم مكثف لتطبيقات التواصل** | **موبايلي** | أفضل عروض "السوشيال باس" للواتساب والسناب شات والإنستغرام. |
| **سرعات 5G هائلة في مراكز المدن** | **زين** | توسع عدواني لشبكة الجيل الخامس في فنادق مكة والمدينة. |
| **أرخص المكالمات الدولية** | **ليبارا / فيرجن** | أسعار تنافسية للغاية لدول جنوب آسيا وأفريقيا ومصر. |

---

## 2. **قائمة التحقق قبل الوصول: الجاهزية التقنية**
النجاح يبدأ قبل هبوط طائرتك في المملكة. تأكد من جاهزية أجهزتك للبيئة السعودية الفريدة:

- **فك قفل الشبكة**: اتصل بمزود الخدمة في بلدك قبل **10 أيام** للتأكد من أن جهازك "مفتوح على جميع الشبكات".
- **توافق الترددات**: تدعم المملكة العربية السعودية بشكل أساسي **5G NR n77 و n78**. معظم أجهزة آيفون وسامسونج الحديثة متوافقة.
- **إدارة الطاقة**: الحرارة العالية (فوق 45 درجة مئوية) تستنزف البطارية أسرع بـ 40%. **يجب** حمل شاحن متنقل (Power Bank) سعة **20,000 مللي أمبير**.
- **ميزة الشريحة المزدوجة**: نوصي باستخدام هاتف يدعم **الشريحة الفعلية + الإلكترونية (eSIM)** لإبقاء شريحة بلدك مفعلة لاستقبال رسائل البنك مع استخدام الشريحة السعودية للبيانات.

---

## 3. **باقات STC (الاتصالات السعودية) - ملك التغطية**
STC هي المزود الرائد وتقدم الأداء الأكثر استقراراً خلال أيام الزحام الأكبر.

### **باقات سوا زيارة 2026**
| **الباقة** | **البيانات** | **تواصل اجتماعي** | **الدقائق المحلية** | **السعر** | **التفعيل (900)** |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **زيارة 70** | 10 جيجا | 10 جيجا | 500 دقيقة | 80.5 ريال | أرسل **70** |
| **زيارة 100** | 20 جيجا | 20 جيجا | 1000 دقيقة | 115 ريال | أرسل **100** |
| **زيارة 150** | 40 جيجا | **لا محدود** | **لا محدود** | 172.5 ريال | أرسل **150** |
| **زيارة 200** | **لا محدود** | **لا محدود** | **لا محدود** | 230 ريال | أرسل **200** |

- **الاستعلام عن الرصيد**: اتصل بـ **\*166#**.
- **الاستعلام عن البيانات**: اتصل بـ **\*166\*5#**.
- **دعم العملاء**: اتصل بـ **900**.

---

## 4. **ثورة الشريحة الإلكترونية (eSIM): تجاوز طوابير المطار**
إذا كان هاتفك يدعم eSIM، يمكنك تجنب الوقوف في الطوابير تماماً:
- **تحميل التطبيقات**: قم بتحميل تطبيق **my stc** أو **Mobily** قبل سفرك.
- **التسجيل الرقمي**: اشترِ "شريحة الزوار الإلكترونية" مباشرة عبر التطبيق. ستحتاج إلى رقم جواز سفرك وتأشيرتك.
- **التفعيل الفوري**: عند هبوطك في جدة أو المدينة، سيتعرف هاتفك على الشبكة تلقائياً.

---

## 5. **استراتيجية الاتصال خلال "أيام الحج" (منى/عرفات/مزدلفة)**
1.  **تحديث وضع الطيران**: إذا كانت الإشارة قوية ولكن الإنترنت لا يعمل، قم بتفعيل وضع الطيران لمدة **15 ثانية** لإعادة الاتصال بأقل برج مزدحم.
2.  **التبديل إلى 4G**: في الزحام الشديد، قد يتعطل الجيل الخامس 5G. التحويل اليدوي إلى **"الجيل الرابع 4G فقط"** يوفر غالباً اتصالاً أبطأ قليلاً لكنه أكثر **استقراراً**.
3.  **المزامنة الليلية**: إذا سجلت فيديوهات كثيرة، انتظر حتى الساعة **2:00 صباحاً** لرفعها، حيث يكون ضغط الشبكة في أدنى مستوياته.

---

## 6. **تحذيرات الأمان ومنع الاحتيال**
- **لا لشرائح الشوارع**: قد يعرض البعض شرائح "مجانية" في الشوارع. **لا تأخذها**. قانوناً، يجب تسجيل جميع الشرائح بالبصمة. استخدام شريحة مسجلة باسم شخص آخر قد يعرضك **للمساءلة القانونية أو الترحيل**.
- **واي-فاي العام**: استخدم واي-فاي الفندق فقط للتصفح العام، ولا تدخل بيانات بطاقتك الائتمانية أثناء الاتصال بشبكات الواي-فاي المفتوحة في المولات أو المشاعر.

---

## 7. **الأسئلة الشائعة وإصلاح الأعطال**
- **س: تطبيق نسك لا يعمل!**
  - **ج**: بعض شرائح التجوال الدولية محجوبة لأسباب أمنية. استخدم شريحة سعودية محلية لضمان عمل التطبيق.
- **س: كيف أشحن الرصيد؟**
  - **ج**: عبر تطبيق المزود ببطاقتك الائتمانية، أو شراء بطاقات الشحن من أي **تموينات (بقالة)**.

---
*بإشراف المكتب التقني لـ KSA Insights. حج مبرور وسعي مشكور.*
`,
        ur: `
# حج 2026 موبائل کمیونیکیشن اور ڈیٹا پیکجز: حجاجِ کرام کے لیے مکمل گائیڈ

خوش آمدید، اے اللہ کے مہمانو! آج کے ڈیجیٹل دور میں، ایک مستحکم انٹرنیٹ کنکشن محض ایک سہولت نہیں بلکہ **حج کی حفاظت اور مناسک کی بروقت ادائیگی کے لیے ایک ناگزیر ضرورت** بن چکا ہے۔ چاہے آپ منیٰ کی گلیوں میں راستہ تلاش کر رہے ہوں، **نسک ایپ** کے ذریعے روضہ رسول ﷺ کی حاضری کا وقت چیک کر رہے ہوں، یا ایمرجنسی میں اپنے حج مشن سے رابطہ کرنا چاہیں، آپ کا موبائل فون آپ کا سب سے بڑا مددگار ہے۔

یہ 2026 ایڈیشن گائیڈ **KSA Insights** کے ماہرین نے تیار کی ہے تاکہ آپ پورے سفر کے دوران اپنوں سے جڑے رہیں۔

---

## 1. **خلاصہ: آپ کے لیے کون سا نیٹ ورک بہتر ہے؟**
اپنی ضرورت کے مطابق بہترین موبائل نیٹ ورک کا انتخاب اس ٹیبل کی مدد سے کریں:

| **بنیادی ضرورت** | **مجوزہ نیٹ ورک** | **وجہ** |
| :--- | :--- | :--- |
| **منیٰ اور عرفات میں بہترین کوریج** | **STC (سعودی ٹیلی کام)** | سب سے بڑا انفراسٹرکچر اور مشاعر مقدسہ میں سب سے زیادہ ٹاورز۔ |
| **سوشل میڈیا کا زیادہ استعمال** | **Mobily (موبایلی)** | واٹس ایپ، اسنیپ چیٹ اور فیس بک کے لیے بہترین "سوشل پاس"۔ |
| **شہروں میں تیز ترین 5G** | **Zain (زین)** | مکہ اور مدینہ کے ہوٹلوں میں بہترین 5G اسپیڈ۔ |
| **سستی ترین انٹرنیشنل کالنگ** | **Lebara / Friendi** | پاکستان، انڈیا اور دیگر ممالک کے لیے سستے ترین ریٹس۔ |

---

## 2. **سفر سے پہلے: تکنیکی تیاری کی فہرست**
سعودی عرب پہنچنے سے پہلے اپنی تیاری مکمل کریں تاکہ آپ کا سفر پرسکون رہے۔

- **فون ان لاکنگ**: روانگی سے **10 دن پہلے** اپنے ہوم کیریئر سے رابطہ کر کے یقینی بنائیں کہ آپ کا فون کسی بھی نیٹ ورک پر چل سکتا ہے۔
- **5G/4G بینڈ**: سعودی نیٹ ورک **n77/n78 (5G)** اور **بیس 1, 3, 7 (4G)** پر کام کرتے ہیں۔ جدید آئی فون اور سام سنگ فون مکمل طور پر مطابقت رکھتے ہیں۔
- **پاور بینک**: شدید گرمی میں بیٹری 40 فیصد تیزی سے گرتی ہے۔ اپنے پاس کم از کم **20,000mAh** کا پاور بینک ضرور رکھیں۔
- **ای سم (eSIM) کا فائدہ**: اگر آپ کا فون ای سم سپورٹ کرتا ہے تو اسے استعمال کریں تاکہ آپ کا گھر کا نمبر بھی ایکٹیو رہے اور سعودی سم بھی چل سکے۔

---

## 4. **ای سم (eSIM) کا استعمال: ایئرپورٹ کی لائنوں سے بچیں**
اگر آپ کا فون ای سم سپورٹ کرتا ہے تو آپ کو سم کے لیے قطار میں لگنے کی ضرورت نہیں۔
- **ایپ ڈاؤن لوڈ کریں**: اپنے ہوم ملک سے ہی **stc pay** یا **Mobily App** انسٹال کریں۔
- **ڈیجیٹل رجسٹریشن**: ایپ کے ذریعے "Visitor eSIM" خریدیں، اس کے لیے پاسپورٹ اور ویزا نمبر درکار ہوگا۔
- **فوری ایکٹیویشن**: جدہ یا مدینہ پہنچتے ہی آپ کا فون خود بخود سگنل پکڑ لے گا۔

---

## 5. **سیکیورٹی اور اسکیم سے بچاؤ**
- **سڑک سے سم نہ لیں**: حجاج کو سڑک پر کھڑے لوگ "مفت سم" کی پیشکش کرتے ہیں، ان سے بچیں۔ سعودی عرب میں تمام سم کارڈز کا انگلیوں کے نشانات (Biometrics) کے ساتھ رجسٹر ہونا لازمی ہے۔ کسی دوسرے کے نام پر رجسٹرڈ سم کا استعمال آپ کو **ڈی پورٹ یا قانونی کارروائی** کی زد میں لا سکتا ہے۔
- **پبلک وائی فائی**: ہوٹل کے علاوہ کسی کھلے وائی فائی پر اپنی بینکنگ ایپس استعمال نہ کریں۔

---
*کے ایس اے ان سائیٹس (KSA Insights) ٹیکنیکل بیورو کی پیشکش۔ حج مبرور۔*
`
      }
    },
    {
      id: 'nusuk-card-guide-2026',
      category: 'Pilgrimage Intelligence',
      icon: <CreditCard className="w-16 h-16" />,
      color: 'text-purple-600',
      banner: 'https://images.unsplash.com/photo-1564507592333-c60657eaa0ae?q=80&w=2070&auto=format&fit=crop',
      title: {
        en: 'The Definitive Nusuk Card Master Class 2026',
        ar: 'الدليل المعمق لبطاقة نسك 2026',
        ur: 'نسک کارڈ ماسٹر کلاس 2026'
      },
      description: {
        en: 'A strategic blueprint of Hajj identity and smart safety.',
        ar: 'خطة استراتيجية لهوية الحج والسلامة الذكية.',
        ur: 'حج کی شناخت اور سمارٹ حفاظت کا اسٹریٹجک بلیو پرنٹ۔'
      },
      content: {
        en: `
# **The Definitive Nusuk Card Master Class 2026: The Strategic Blueprint of Hajj Identity**

![Hajj 2026 Vision](https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2070&auto=format&fit=crop)

Welcome to the digital transformation of the holiest journey on Earth. As we enter the 2026 Hajj season, the Ministry of Hajj and Umrah has finalized the transition to the **Nusuk Smart Card** as the singular, absolute requirement for all pilgrims. This isn't just an ID; it is a sophisticated piece of infrastructure designed to protect your life, your rights, and the sanctity of the rituals.

In this exhaustive masterclass, we will explore its technical architecture, its legal necessity, and its practical application from the moment you leave your home until you complete your final Tawaf.

---

## **1. The Philosophical Shift: Why the Nusuk Card Exists**

For decades, Hajj management relied on paper permits and wristbands. However, the sheer scale of 2.5 million people in a 20-square-kilometer area (Mina) demanded a more surgical approach. The Nusuk Card is the answer to **"Data-Driven Holiness."**

### **The Elimination of "Ghost Pilgrims"**
In previous years, unauthorized pilgrims put immense strain on resources—water, electricity, and medical services—intended for those with permits. The Nusuk Card, linked to biometric data, ensures that every individual in the Holy Sites is accounted for. This guarantees that **you**, as a legal pilgrim, receive the full allocation of services you paid for.

### **Protection of Individual Rights**
The card serves as a legal contract between you and the Ministry of Hajj. If your Hajj mission fails to provide the promised quality of food, transport, or accommodation, the Nusuk Card tracks these service violations. You can file a claim via the app, and the Ministry will use the card's activity logs to verify your location and the services provided.

---

## **2. Technical Anatomy: What’s Under the Hood?**

![Smart Technology](https://images.unsplash.com/photo-1549421263-5490409a80e1?q=80&w=2070&auto=format&fit=crop)

The 2026 Nusuk Card is a multifaceted tool. It consists of three primary layers:

### **A. The Physical Layer (The Card Itself)**
- **Durability:** Made of high-grade composite PVC, resistant to high temperatures (up to 60°C) and water.
- **Visual Cues:** Features a holographic emblem that changes color under UV light to prevent counterfeiting. 
- **Personalized Data:** Includes your photo, name, nationality, and a unique 12-digit global Hajj ID.

### **B. The Hardware Layer (NFC & RFID)**
- **RFID Chip:** An ultra-high-frequency chip that allows checkpoints to scan entire busloads of pilgrims without them needing to exit the vehicle. This reduces wait times at the entrances of Makkah by up to 80%.
- **NFC (Near Field Communication):** Allows for "tap-to-open" functionality at smart gates in the Mashair Train stations and specific accommodation clusters.

### **C. The Data Layer (Dynamic QR Code)**
The QR code on the card is the "Gateway to your File." When scanned by an official, it provides:
- **Residential Data:** Your specific tent number in Mina and hotel location in Makkah/Madinah.
- **Medical Profile:** Blood type, allergies, and chronic conditions (synchronized from your home country's health records if integrated).
- **Group Info:** Contact details for your Mutawwf (Hajj Organizer) and bus number.

---

## **3. Legal Directives: The "No Card, No Entry" Policy**

The Ministry has issued a strict **Royal Decree** for 2026: The Nusuk Card is the only proof of legal pilgrimage status.

1.  **Checkpoints**: Moving between Makkah and the Holy Sites (Mina, Arafat, Muzdalifah) is impossible without the card.
2.  **Mashair Train**: The card acts as your digital ticket. No card means no train access. 
3.  **Accommodation**: Only pilgrims with a valid Nusuk Card scan can enter the gated tent cities in Mina and the developed towers in Arafat.
4.  **Penalties**: Unauthorized presence in the Holy Sites without a card can lead to immediate deportation, high fines, and a 10-year ban from entering the Kingdom.

---

## **4. The "Digital Twin": Using the Nusuk App**

![Mobile App Integration](https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2070&auto=format&fit=crop)

### **Scenario: "I lost my physical card."**
Don't panic. You have a "Digital Twin."
1.  Open the **Nusuk App**. 
2.  Navigate to the "Electronic Hajj Card" section. 
3.  The dynamic QR code generated there is legally equivalent to the physical card.
4.  **Pro Tip**: Take a high-resolution screenshot of your digital card. While the dynamic code refreshes for security, the static portions can help officials identify you if you have no internet.

---

## **5. On-Ground Operations: A Day in the Life with Nusuk**

### **Mina Transition**
When you board the bus from Makkah to Mina, an official will sweep the bus with a handheld RFID reader. If everyone’s card is active, the bus is cleared in seconds.

### **Medical Emergencies**
In the event of heat exhaustion, if a pilgrim is found unconscious, the medical team will scan the Nusuk Card. This immediately reveals their identity and group contact info, even if the pilgrim cannot speak.

### **Entering the Rawdah**
Your specific slot for visiting the Rawdah Al-Sharifa is linked to your Nusuk Card. At the gate in Madinah, you simply tap your card on the smart pedestal.

---

## **6. Strategic Maintenance and Care**

This card is your ticket to a successful Hajj. Treat it with the respect it deserves:
- **Do Not Luminate**: The heat of lamination can damage the internal RFID chip.
- **Wear It Always**: Use the provided official lanyard. The card must be visible during all movements in the Holy Sites.
- **Keep It Dry**: While water-resistant, prolonged exposure to sweat or Zamzam water can blur the printed details.

---

## **7. Conclusion: Data in Service of Divinity**

The Nusuk Card is not a "tracking device"; it is a "protection device." It protects your space, your food, and your safety from those who try to circumvent the system. By embracing this technology, you are participating in the "Smart Hajj" vision—a vision that prioritizes human life and spiritual focus above all else.

*Guide curated by the Strategic Intelligence Unit of KSA Insights. 2026 Edition.*
`,
        ar: `
# **الدليل الشامل والمعمق لبطاقة نسك 2026: الهوية الاستراتيجية للحاج**

![رؤية حج 2026](https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2070&auto=format&fit=crop)

أهلاً بكم في عصر التحول الرقمي لأقدس رحلة على وجه الأرض. مع دخولنا موسم حج 2026، أكملت وزارة الحج والعمرة التحول الكامل نحو **بطاقة نسك الذكية** باعتبارها المتطلب الوحيد والأساسي لجميع الحجاج. هذه ليست مجرد بطاقة هوية، بل هي بنية تحتية متطورة صُممت لحماية حياتك وحقوقك وقدسية المناسك.

في هذا الدليل التفصيلي، سنغوص في أعماق الهندسة التقنية، والضرورة القانونية، والتطبيق العملي لبطاقة نسك منذ لحظة مغادرتك لمنزلك وحتى إتمام طواف الوداع.

---

## **1. التحول الفلسفي: لماذا صُممت بطاقة نسك؟**

لعقود من الزمن، اعتمدت إدارة الحج على التصاريح الورقية والأساور البلاستيكية البسيطة. ومع ذلك، فإن النطاق الهائل لـ 2.5 مليون شخص في مساحة تبلغ 20 كيلومتراً مربعاً (مشعر منى) استلزم نهجاً أكثر دقة. بطاقة نسك هي الحل لـ **"القدسية المدفوعة بالبيانات"**.

### **القضاء على "حجاج الداخل غير النظاميين"**
في السنوات السابقة، شكل الحجاج غير النظاميين ضغطاً هائلاً على الموارد المخصصة للحجاج الرسميين (المياه، الكهرباء، الخدمات الطبية). بطاقة نسك، المرتبطة بالبيانات البيومترية، تضمن أن كل فرد في المشاعر المقدسة مسجل ومعترف به. هذا يضمن **لك**، بصفتك حاجاً نظامياً، الحصول على كامل حصتك من الخدمات التي دفعت ثمنها.

### **حماية حقوق الأفراد**
تعمل البطاقة كعقد قانوني بينك وبين وزارة الحج. إذا فشلت بعثتك في تقديم الجودة الموعودة من الطعام أو النقل أو السكن، فإن بطاقة نسك تسجل هذه المخالفات. يمكنك تقديم شكوى عبر التطبيق، وستستخدم الوزارة سجلات نشاط البطاقة للتحقق من موقعك والخدمات المقدمة.

---

## **2. التشريح التقني: ماذا يوجد داخل البطاقة؟**

![التكنولوجيا الذكية](https://images.unsplash.com/photo-1549421263-5490409a80e1?q=80&w=2070&auto=format&fit=crop)

تتكون بطاقة نسك 2026 من ثلاث طبقات أساسية:

### **أ. الطبقة المادية (البطاقة نفسها)**
- **المتانة**: مصنوعة من مادة PVC المركبة عالية الجودة، والمقاومة لدرجات الحرارة المرتفعة (حتى 60 درجة مئوية) والماء.
- **العلامات الأمنية**: تحتوي على شعار هولوغرامي يتغير لونه تحت الأشعة فوق البنفسجية لمنع التزوير.
- **البيانات المطبوعة**: تشمل صورتك، اسمك، جنسيتك، ورقم هوية الحج الموحد المكون من 12 رقماً.

### **ب. طبقة الأجهزة (NFC و RFID)**
- **رقاقة RFID**: رقاقة ذات تردد عالٍ جداً تسمح لنقاط التفتيش بمسح حافلات كاملة من الحجاج دون الحاجة لمغادرتهم الحافلة، مما يقلل وقت الانتظار بنسبة 80%.
- **تقنية NFC**: تسمح بخاصية "النقر للفتح" عند البوابات الذكية في محطات قطار المشاعر ومجمعات السكن المحددة.

### **ج. طبقة البيانات (رمز QR الديناميكي)**
رمز QR الموجود على البطاقة هو "بوابة لملفك". عند مسحه من قبل مسؤول، فإنه يوفر:
- **بيانات السكن**: رقم خيمتك المحددة في منى وموقع فندقك في مكة والمدينة.
- **الملف الطبي**: فصيلة الدم، الحساسية، والأمراض المزمنة.
- **معلومات المجموعة**: تفاصيل الاتصال بـ "المطوف" (منظم الحج) ورقم الحافلة.

---

## **3. التوجيهات القانونية: سياسة "لا بطاقة، لا دخول"**

أصدرت الوزارة مرسوماً صارماً لعام 2026: بطاقة نسك هي الإثبات الوحيد لوضع الحج القانوني.
1. **نقاط التفتيش**: التنقل بين مكة والمشاعر المقدسة مستحيل بدون البطاقة.
2. **قطار المشاعر**: تعمل البطاقة كتذكرة رقمية. لا بطاقة تعني لا دخول للقطار.
3. **التواجد غير النظامي**: التواجد في المشاعر بدون بطاقة قد يؤدي للترحيل الفوري والمنع من دخول المملكة لمدة 10 سنوات.

---

## **4. التوأم الرقمي: استخدام تطبيق نسك**
إذا فقدت بطاقتك المادية، افتح تطبيق نسك وانتقل إلى قسم "بطاقة الحج الإلكترونية". رمز QR الديناميكي هناك يعادل قانونياً البطاقة المادية.

*الدليل من إعداد وحدة الاستخبارات الاستراتيجية في KSA Insights. إصدار 2026.*
`,
        ur: `
# **نسک کارڈ ماسٹر کلاس 2026: حج کی نئی ڈیجیٹل شناخت کا مکمل گائیڈ**

![حج 2026 ویژن](https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2070&auto=format&fit=crop)

انسانوں کے سب سے مقدس سفر کی ڈیجیٹل تبدیلی میں خوش آمدید۔ جیسے ہی ہم 2026 کے حج سیزن میں قدم رکھ رہے ہیں، وزارت حج و عمرہ نے تمام حجاج کے لیے **"نسک سمارٹ کارڈ"** کو لازمی قرار دے دیا ہے۔ یہ صرف ایک شناختی کارڈ نہیں ہے، بلکہ یہ ایک ایسا جدید ترین انفراسٹرکچر ہے جو آپ کی زندگی، آپ کے حقوق اور حج کے مناسک کی حفاظت کے لیے تیار کیا گیا ہے۔

اس تفصیلی ماسٹر کلاس میں، ہم اس کی فنی ساخت، اس کی قانونی ضرورت، اور آپ کے گھر سے روانگی سے لے کر آخری طواف تک اس کے عملی استعمال کا جائزہ لیں گے۔

---

## **1. فلسفیانہ تبدیلی: نسک کارڈ کیوں ضروری ہے؟**

کئی دہائیوں تک حج کا انتظام کاغذی اجازت ناموں اور کلائی کے بینڈز پر منحصر تھا۔ تاہم، منیٰ جیسے محدود علاقے میں 25 لاکھ لوگوں کے انتظام کے لیے ایک زیادہ سائنسی طریقے کی ضرورت تھی۔ نسک کارڈ **"ڈیٹا پر مبنی حج"** کا حل ہے۔

### **"غیر قانونی حجاج" کا خاتمہ**
پچھلے سالوں میں، بغیر اجازت حج کرنے والے افراد نے ان وسائل (پانی، بجلی، طبی خدمات) پر بے پناہ دباؤ ڈالا جو قانونی حجاج کے لیے مخصوص تھے۔ نسک کارڈ بائیومیٹرک ڈیٹا سے منسلک ہے، جو اس بات کو یقینی بناتا ہے کہ مقدس مقامات پر موجود ہر شخص کا ریکارڈ موجود ہو۔ یہ اس بات کی ضمانت دیتا ہے کہ **آپ**، ایک قانونی حاجی کے طور پر، ان تمام خدمات کا مکمل حصہ حاصل کریں جن کے آپ نے پیسے ادا کیے ہیں۔

---

## **2. تکنیکی ساخت: نسک کارڈ کے اندر کیا ہے؟**

![سمارٹ ٹیکنالوجی](https://images.unsplash.com/photo-1549421263-5490409a80e1?q=80&w=2070&auto=format&fit=crop)

2026 کا نسک کارڈ تین بنیادی تہوں پر مشتمل ہے:

### **الف۔ فزیکل لیئر (خود کارڈ)**
- **پائیداری**: اعلیٰ درجے کے کمپوزٹ پی وی سی سے بنا ہے، جو شدید گرمی (60 ڈگری تک) اور پانی کو برداشت کر سکتا ہے۔
- **سیکیورٹی فیچرز**: اس میں ہولوگرام شامل ہے جو تزویر (Counterfeiting) کو روکنے کے لیے یو وی روشنی میں رنگ بدلتا ہے۔

### **ب۔ ہارڈویئر لیئر (NFC اور RFID)**
- **RFID چپ**: ایک ایسی چپ جو سیکیورٹی اہلکاروں کو پوری بس کو اسکین کرنے کی اجازت دیتی ہے، جس سے مکہ کے داخلی راستوں پر انتظار کا وقت 80 فیصد کم ہو جاتا ہے۔
- **NFC ٹیکنالوجی**: مشاعر ٹرین اسٹیشنوں اور مخصوص خیموں کے اسمارٹ گیٹس پر "ٹائپ ٹو اوپن" کی سہولت فراہم کرتی ہے۔

### **ج۔ ڈیٹا لیئر (ڈائنامک QR کوڈ)**
کارڈ پر موجود QR کوڈ آپ کی پروفائل کا گیٹ وے ہے۔ اسکین کرنے پر یہ فراہم کرتا ہے:
- **رہائشی ڈیٹا**: منیٰ میں آپ کا خیمہ نمبر اور مکہ/مدینہ میں ہوٹل کی لوکیشن۔
- **طبی معلومات**: بلڈ گروپ، الرجی اور دائمی بیماریاں۔

---

## **3. قانونی ہدایات: "کارڈ نہیں تو داخلہ نہیں"**

وزارت نے 2026 کے لیے سخت قوانین جاری کیے ہیں:
1. **چیک پوسٹس**: مکہ اور مقدس مقامات (منیٰ، عرفات، مزدلفہ) کے درمیان نقل و حرکت کارڈ کے بغیر ناممکن ہے۔
2. **مشاعر ٹرین**: کارڈ آپ کا ڈیجیٹل ٹکٹ ہے۔ کارڈ نہیں تو ٹرین میں داخلہ نہیں۔
3. **سزائیں**: بغیر کارڈ کے پائے جانے والے افراد کو فوری طور پر ڈی پورٹ کیا جا سکتا ہے اور ان پر 10 سال کی پابندی لگ سکتی ہے۔

---

## **4. خلاصہ: کارڈ آپ کا ساتھی ہے**

نسک کارڈ صرف پلاسٹک کا ایک ٹکڑا نہیں ہے؛ یہ حج کو آسان اور محفوظ بنانے کے "ویژن" کا حصہ ہے۔ اس کی حفاظت کریں اور اسے پورے سفر میں اپنے پاس رکھیں۔

*کے ایس اے ان سائیٹس (KSA Insights) کے تعاون سے تیار کردہ۔ ایڈیشن 2026۔*
`
      }
    },
    {
      id: 'driving-license-procedures',
      category: 'E-Services',
      icon: <Car className="w-16 h-16" />,
      color: 'text-emerald-600',
      banner: 'https://images.unsplash.com/photo-1549421263-5490409a80e1?q=80&w=2070&auto=format&fit=crop',
      title: {
        en: 'Saudi Driving License Guide 2026',
        ar: 'دليل رخصة القيادة السعودية 2026',
        ur: 'سعودی ڈرائیونگ لائسنس گائیڈ 2026'
      },
      description: {
        en: 'A comprehensive walkthrough of obtaining, renewing, and converting driving licenses in KSA.',
        ar: 'شرح شامل للحصول على رخص القيادة وتجديدها وتحويلها في المملكة.',
        ur: 'سعودی عرب میں ڈرائیونگ لائسنس حاصل کرنے، تجدید کرنے اور تبدیل کرنے کے بارے میں ایک جامع گائیڈ۔'
      },
      content: {
        en: `
# **Saudi Driving License: Complete Procedural Manual 2026**

Navigating the driving license process in Saudi Arabia has been transformed under Vision 2030, moving almost entirely to digital platforms like **Absher** and **Efada**. This guide outlines the exact, detailed steps for both new residents and those looking to convert existing licenses.

## 1. **Eligibility and Core Prerequisites**
Before applying, ensure you meet the following baseline requirements:
* **Minimum Age:** 18 years for private licenses; 21 years for public transport.
* **Residency:** A valid Iqama (Residency Permit).
* **Medical Fitness:** Completion of the mandatory medical exam.

## 2. **The Digital Medical Assessment (Efada)**
The first physical step is the medical exam, which must be done at an authorized clinic.
* **Tests included:** Vision, Blood Group, and General Health.
* **Digital Link:** Results are automatically uploaded to the **Efada** system and linked to your Iqama.
* **Validity:** The medical report is valid for 3 months.

## 3. **Training and School Enrollment (Muroor)**
New drivers must enroll in a certified driving school (Muroor).
| Phase | Duration | Focus Areas |
| :--- | :--- | :--- |
| **I: Theory** | 8 Hours | Traffic laws, signs, and safety. |
| **II: Simulation** | 2 Hours | Virtual driving environment. |
| **III: Practical** | 20+ Hours | On-road training with instructor. |

## 4. **Fees, Payment, and Issuance**
Payments must be made through SADAD or your banking app before the license can be printed.

### **License Validity Options:**
* **2 Years:** 80 SAR
* **5 Years:** 200 SAR
* **10 Years:** 400 SAR

---

## 5. **Converting Foreign Licenses: The Direct Swap**
If you hold a license from select Western or GCC countries, you may be eligible for a direct swap:
1. **Translation:** Get your original license translated and certified.
2. **Book Appointment:** Use Absher to book a "Foreign License Exchange" slot.
3. **Evaluation:** A brief road test may be required.
`,
        ar: `
# رخصة القيادة السعودية: الدليل الإجرائي الكامل

تم تحويل عملية الحصول على رخصة القيادة في المملكة العربية السعودية بالكامل تحت مظلة رؤية 2030، حيث انتقلت العمليات إلى منصات رقمية مثل **أبشر** و**إفادة**. يوضح هذا الدليل الخطوات الدقيقة للمقيمين الجدد والراغبين في تحويل رخصهم.

## 1. الأهلية والمتطلبات الأساسية
قبل التقديم، تأكد من استيفاء المتطلبات الأساسية التالية:
* **السن الأدنى:** 18 عاماً للرخص الخاصة؛ 21 عاماً للنقل العام.
* **الإقامة:** إقامة سارية المفعول.
* **اللياقة الطبية:** إكمال الفحص الطبي الإلزامي.

## 2. التقييم الطبي (إفادة)
الخطوة الأولى هي الفحص الطبي، ويجب إجراؤه في عيادة معتمدة.
* **الاختبارات المشمولة:** النظر، فصيلة الدم، والصحة العامة.
* **الربط الرقمي:** يتم رفع النتائج تلقائياً إلى نظام **إفادة** وربطها برقم إقامتك.
* **الصلاحية:** التقرير الطبي صالح لمدة 3 أشهر.

## 3. التدريب والتسجيل في المدارس
يجب على السائقين الجدد التسجيل في مدرسة قيادة معتمدة (المرور).
| المرحلة | المدة | مجالات التركيز |
| :--- | :--- | :--- |
| **1: نظري** | 8 ساعات | قوانين المرور والإشارات والسلامة. |
| **2: المحاكاة** | ساعتان | بيئة قيادة افتراضية. |
| **3: عملي** | 20+ ساعة | تدريب على الطريق مع مدرب. |

## 4. الرسوم والإصدار
يجب سداد الرسوم عبر نظام سداد أو التطبيق البنكي قبل طباعة الرخصة.

### خيارات صلاحية الرخصة:
* **سنتان:** 80 ريال
* **5 سنوات:** 200 ريال
* **10 سنوات:** 400 ريال
`,
        ur: `
# سعودی ڈرائیونگ لائسنس: مکمل طریقہ کار کا مینوئل

ویژن 2030 کے تحت سعودی عرب میں ڈرائیونگ لائسنس کا عمل مکمل طور پر تبدیل کر دیا گیا ہے، اور اب یہ زیادہ تر ڈیجیٹل پلیٹ فارمز جیسے **ابشر** اور **افادہ** پر منتقل ہو چکا ہے۔ یہ گائیڈ نئے رہائشیوں اور لائسنس تبدیل کرنے کے خواہشمند افراد کے لیے مکمل طریقہ کار بیان کرتی ہے۔

## 1. اہلیت اور ضروری شرائط
درخواست دینے سے پہلے، یقینی بنائیں کہ آپ درج ذیل شرائط پر پورا اترتے ہیں:
* **کم از کم عمر:** پرائیویٹ لائسنس کے لیے 18 سال؛ پبلک ٹرانسپورٹ کے لیے 21 سال۔
* **رہائش:** درست اقامہ (رہائشی اجازت نامہ)۔
* **طبی فٹنس:** لازمی میڈیکل چیک اپ کی تکمیل۔

## 2. میڈیکل چیک اپ (افادہ)
پہلا مرحلہ میڈیکل ٹیسٹ ہے، جو کسی بھی منظور شدہ کلینک سے کرایا جا سکتا ہے۔
* **شامل ٹیسٹ:** بینائی، بلڈ گروپ، اور عمومی صحت۔
* **ڈیجیٹل لنک:** نتائج خود بخود **افادہ** سسٹم پر اپ لوڈ ہو جاتے ہیں اور آپ کے اقامہ سے لنک کر دیے جاتے ہیں۔
* **صلاحیت:** میڈیکل رپورٹ 3 ماہ کے لیے کارآمد ہوتی ہے۔

## 3. ٹریننگ اور اسکول کا اندراج
نئے ڈرائیوروں کو منظور شدہ ڈرائیونگ اسکول (مرور) میں اندراج کرانا ہوگا۔
| مرحلہ | دورانیہ | توجہ کے شعبے |
| :--- | :--- | :--- |
| **I: تھیوری** | 8 گھنٹے | ٹریفک قوانین، اشارے اور حفاظت۔ |
| **II: سمولیشن** | 2 گھنٹے | ورچوئل ڈرائیونگ ماحول۔ |
| **III: پریکٹیکل** | 20+ گھنٹے | انسٹرکٹر کے ساتھ آن روڈ ٹریننگ۔ |

## 4. فیس اور اجراء
لائسنس پرنٹ کرنے سے پہلے فیس کی ادائیگی سداد (SADAD) یا بینکنگ ایپ کے ذریعے کرنا لازمی ہے۔

### لائسنس کی مدت اور فیس:
* **2 سال:** 80 ریال
* **5 سال:** 200 ریال
* **10 سال:** 400 ریال

## 5. غیر ملکی لائسنس کی تبدیلی
اگر آپ کے پاس منتخب مغربی یا خلیجی ممالک کا لائسنس ہے، تو آپ براہ راست تبادلے کے اہل ہو سکتے ہیں:
1. **ترجمہ:** اپنے اصل لائسنس کا ترجمہ اور تصدیق کروائیں۔
2. **اپوائنٹمنٹ:** ابشر کے ذریعے "غیر ملکی لائسنس کے تبادلے" کے لیے وقت بک کریں۔
3. **تشخیص:** ایک مختصر روڈ ٹیسٹ کی ضرورت پڑ سکتی ہے۔
`
      }
    },
    {
      id: 'rights-of-expatriates',
      category: 'Labor Law',
      icon: <Scale className="w-16 h-16" />,
      color: 'text-blue-600',
      banner: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop',
      title: {
        en: 'Rights of Expatriates under Saudi Labor Law',
        ar: 'حقوق الوافدين في نظام العمل السعودي',
        ur: 'سعودی لیبر لاء کے تحت غیر ملکیوں کے حقوق'
      },
      description: {
        en: 'Detailed insights into contract security, wage protection, and end-of-service benefits.',
        ar: 'رؤى تفصيلية حول أمان العقود وحماية الأجور ومكافآت نهاية الخدمة.',
        ur: 'معاہدے کی حفاظت، اجرت کے تحفظ اور اینڈ آف سروس بینیفٹ کے بارے میں تفصیلی معلومات۔'
      },
      content: {
        en: `
# Rights of Expatriates under Saudi Labor Law: An In-Depth Guide

Understanding your rights is crucial for a successful professional journey in the Kingdom. The Saudi Labor Law, governed by the Ministry of Human Resources and Social Development (MHRSD), ensures a fair and transparent relationship between employers and expatriate workers.

## 1. The Employment Contract
Under the latest regulations, all contracts must be digital and documented on the **Qiwa** platform.
* **Transparency:** You must be able to review your contract before signing.
* **Language:** Contracts are typically in Arabic and English; for legal disputes, the Arabic version prevails.
* **Duration:** Can be fixed-term or unspecified (for Saudis), but usually fixed-term for expats.

## 2. Wage Protection System (WPS)
Saudi Arabia implements a strict WPS to ensure salaries are paid on time.
* **Method:** Salaries must be transferred to local bank accounts.
* **Evidence:** Any deduction from the salary must have a legal basis or written consent.
* **Reporting:** Workers can report non-payment through the MHRSD app or the 19911 hotline.

## 3. Working Hours and Leave
| Category | Standard Provision |
| :--- | :--- |
| **Max Hours** | 8 Hours/Day (48 Hours/Week) |
| **Ramadan Hours** | 6 Hours/Day for Muslims |
| **Annual Leave** | 21 Days (Increases to 30 after 5 years) |
| **Sick Leave** | 120 Days (Tiered: Full pay, 75%, then unpaid) |

## 4. End-of-Service Benefits (ESB)
Upon the termination of the employment relationship, the worker is entitled to an "End of Service Award."
* **First 5 Years:** Half a month's salary for each year.
* **Beyond 5 Years:** A full month's salary for each subsequent year.
* **Calculation:** Based on the last basic salary plus regular allowances.

## 5. Passports and Residency
* **Passport Ownership:** An employer is **legally forbidden** from retaining a worker's passport. This is considered a human rights violation and is subject to heavy fines.
* **Iqama Fees:** The employer is responsible for all costs related to the issuance and renewal of the Residency Permit (Iqama).
`,
        ar: `
# حقوق الوافدين في نظام العمل السعودي: دليل متعمق

فهم حقوقك أمر بالغ الأهمية لرحلة مهنية ناجحة في المملكة. يضمن نظام العمل السعودي، الذي تشرف عليه وزارة الموارد البشرية والتنمية الاجتماعية، علاقة عادلة وشفافة بين أصحاب العمل والعمال الوافدين.

## 1. عقد العمل
بموجب أحدث الأنظمة، يجب أن تكون جميع العقود رقمية وموثقة على منصة **قوى**.
* **الشفافية:** يجب أن تكون قادراً على مراجعة عقدك قبل التوقيع.
* **اللغة:** تكون العقود عادةً باللغتين العربية والإنجليزية؛ وفي النزاعات القانونية، ترجح النسخة العربية.

## 2. نظام حماية الأجور (WPS)
تطبق المملكة نظاماً صارماً لحماية الأجور لضمان صرف الرواتب في وقتها.
* **الطريقة:** يجب تحويل الرواتب إلى حسابات بنكية محلية.
* **الإبلاغ:** يمكن للعمال الإبلاغ عن عدم دفع الرواتب عبر تطبيق الوزارة أو الرقم الموحد 19911.

## 3. ساعات العمل والإجازات
| الفئة | الحكم القياسي |
| :--- | :--- |
| **ساعات العمل** | 8 ساعات يومياً (48 ساعة أسبوعياً) |
| **ساعات رمضان** | 6 ساعات يومياً للمسلمين |
| **الإجازة السنوية** | 21 يوماً (تزيد إلى 30 بعد 5 سنوات) |

## 4. مكافأة نهاية الخدمة
عند انتهاء علاقة العمل، يحق للعامل الحصول على "مكافأة نهاية الخدمة".
* **أول 5 سنوات:** أجر نصف شهر عن كل سنة.
* **بعد 5 سنوات:** أجر شهر كامل عن كل سنة تالية.

## 5. الجوازات والإقامة
* **الاحتفاظ بالجواز:** يحظر على صاحب العمل **قانوناً** الاحتفاظ بجواز سفر العامل.
* **رسوم الإقامة:** يتحمل صاحب العمل جميع التكاليف المتعلقة بإصدار وتجديد الإقامة.
`,
        ur: `
# سعودی لیبر لاء کے تحت غیر ملکیوں کے حقوق: ایک تفصیلی گائیڈ

اپنے حقوق کو سمجھنا کنگڈم میں ایک کامیاب پیشہ ورانہ سفر کے لیے بہت ضروری ہے۔ سعودی لیبر لاء، جو کہ انسانی وسائل اور سماجی ترقی کی وزارت (MHRSD) کے زیر انتظام ہے، آجروں اور غیر ملکی کارکنوں کے درمیان منصفانہ اور شفاف تعلقات کو یقینی بناتا ہے۔

## 1. ملازمت کا معاہدہ
جدید ترین ضوابط کے تحت، تمام معاہدے ڈیجیٹل ہونے چاہئیں اور **قوی** (Qiwa) پلیٹ فارم پر دستاویزی ہونے چاہئیں۔
* **شفافیت:** آپ کو دستخط کرنے سے پہلے اپنے معاہدے کا جائزہ لینے کا حق ہے تاکہ تمام شرائط واضح ہوں۔
* **زبان:** معاہدے عام طور پر عربی اور انگریزی میں ہوتے ہیں؛ کسی بھی قانونی تنازعے کی صورت میں عربی ورژن کو ہی مستند مانا جاتا ہے۔
* **مدت:** یہ محدود مدت کا ہو سکتا ہے یا (سعودی شہریوں کے لیے) غیر معینہ، لیکن غیر ملکیوں کے لیے عام طور پر یہ محدود مدت (Fixed-term) کا ہی ہوتا ہے۔

## 2. ویج پروٹیکشن سسٹم (WPS)
سعودی عرب اس بات کو یقینی بنانے کے لیے ایک سخت ویج پروٹیکشن سسٹم نافذ کرتا ہے کہ تمام ملازمین کو ان کی تنخواہیں وقت پر ادا کی جائیں۔
* **طریقہ:** تنخواہیں لازمی طور پر مقامی بینک اکاؤنٹس میں منتقل ہونی چاہئیں۔
* **ثبوت:** تنخواہ سے کسی بھی قسم کی کٹوتی کے لیے قانونی بنیاد یا ملازم کی تحریری رضامندی ضروری ہے۔
* **رپورٹنگ:** کارکن تنخواہ کی عدم ادائیگی کی شکایت وزارت کی ایپ یا 19911 ہاٹ لائن کے ذریعے کر سکتے ہیں۔

## 3. کام کے اوقات اور چھٹیاں
| زمرہ | معیار |
| :--- | :--- |
| **عام اوقات** | روزانہ 8 گھنٹے (ہفتہ وار 48 گھنٹے) |
| **رمضان المبارک** | مسلمانوں کے لیے روزانہ 6 گھنٹے |
| **سالانہ چھٹی** | 21 دن (5 سال کی ملازمت کے بعد یہ 30 دن ہو جاتی ہے) |
| **بیماری کی چھٹی** | سالانہ 120 دن تک (پہلے 30 دن پوری تنخواہ، پھر 60 دن 75%، اور پھر بغیر تنخواہ) |

## 4. اینڈ آف سروس بینیفٹ (ESB)
ملازمت کا معاہدہ ختم ہونے پر، کارکن "اینڈ آف سروس ایوارڈ" کا حقدار ہوتا ہے جس کا حساب درج ذیل طریقے سے لگایا جاتا ہے:
* **پہلے 5 سال:** ہر سال کی خدمت کے عوض آدھے مہینے کی تنخواہ۔
* **5 سال کے بعد:** اس کے بعد کے ہر سال کے لیے ایک مکمل مہینے کی تنخواہ۔
* **حساب کتاب:** یہ آخری بنیادی تنخواہ اور مقررہ الاؤنسز کی مجموعی رقم پر مبنی ہوتا ہے۔

## 5. پاسپورٹ اور رہائش کے تحفظات
* **پاسپورٹ کی ملکیت:** آجر کے لیے کارکن کا پاسپورٹ قبضے میں رکھنا **سختی سے ممنوع** ہے۔ اسے انسانی حقوق کی سنگین خلاف ورزی تصور کِیا جاتا ہے اور اس پر بھاری جرمانے ہیں۔
* **اقامہ فیس:** آجر اقامہ (رہائشی اجازت نامہ) کے اجراء، تجدید اور اس سے متعلقہ تمام سرکاری اخراجات کا ذمہ دار ہے۔
`
      }
    }
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans pb-40">
      <SEO title="Guides & Procedures" description="Official procedural intelligence and legislative frameworks for the Saudi market." />

      {/* Clean White Main Header */}
      <header className="bg-white border-b border-slate-200 py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
           <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
              <div className="space-y-6">
                 <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-xs font-black uppercase tracking-[0.2em]">
                   <ShieldCheck size={14} className="text-emerald-600" />
                   {t('guides.verifiedRepository')}
                 </div>
                 <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                   {t('guides.title').split(' ').slice(0, 1).join(' ')} <br />
                   <span className="text-emerald-600">{t('guides.title').split(' ').slice(1).join(' ')}</span>
                 </h1>
                 <p className="text-slate-500 max-w-2xl text-xl font-medium leading-relaxed">
                    {t('guides.subtitle')}
                 </p>
              </div>
              <div className="relative w-full lg:w-[480px]">
                 <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
                 <input 
                   type="text" 
                   placeholder={t('guides.searchPlaceholder')}
                   className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-6 pl-16 pr-8 text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-500 transition-all text-slate-700"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                 />
              </div>
           </div>
        </div>
      </header>

      {/* Grid of Resources */}
      <main className="max-w-7xl mx-auto px-8 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {resources.filter(r => r.title.en.toLowerCase().includes(searchQuery.toLowerCase())).map((res, i) => (
            <motion.div
              key={`guide-res-${res.id}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setPreviewingDoc(res)}
              className="bg-white rounded-[2rem] border border-slate-200 p-10 hover:border-emerald-500/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 cursor-pointer group"
            >
              <div className="flex flex-col h-full">
                <div className={cn("mb-8 p-5 w-fit rounded-2xl bg-slate-50 transition-all group-hover:scale-110", res.color)}>
                  {res.icon}
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{res.category}</span>
                    <div className="h-[1px] flex-1 bg-slate-100" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {res.title[currentLang as keyof typeof res.title]}
                  </h3>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    {res.description[currentLang as keyof typeof res.description]}
                  </p>
                </div>
                <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-between">
                   <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('guides.guideVersion')} v2.6.0</span>
                   <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                      {t('guides.readDetails')}
                      <div className="w-8 h-[2px] bg-emerald-600 rounded-full group-hover:w-12 transition-all" />
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Modal - Neat, Clean, Readable Theme */}
      <AnimatePresence>
        {previewingDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md overflow-y-auto flex justify-center py-10 px-4 md:px-12"
            onClick={() => setPreviewingDoc(null)}
            dir="ltr"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white w-full max-w-5xl rounded-[2rem] shadow-2xl flex flex-col relative h-fit"
              onClick={e => e.stopPropagation()}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {/* Close Button Outside child for clean UI */}
              <button 
                onClick={() => setPreviewingDoc(null)} 
                className="absolute top-8 right-8 z-[110] w-12 h-12 bg-white text-slate-900 rounded-full flex items-center justify-center shadow-xl border border-slate-100 hover:scale-110 transition-transform"
              >
                 <X size={24} />
              </button>

              {/* Minimal Cover Header */}
              <div className="h-[300px] relative shrink-0 overflow-hidden rounded-t-[2rem]">
                 <img src={previewingDoc.banner} className="w-full h-full object-cover" alt="" />
                 <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                 
                 <div className="absolute bottom-10 left-10 right-10">
                    <div className="flex items-center gap-4 mb-4">
                       <span className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-black uppercase tracking-widest">
                         {previewingDoc.category}
                       </span>
                       <span className="text-slate-500 font-mono text-xs tracking-[0.3em] uppercase">{t('guides.documentId')}: REG-{previewingDoc.id.substring(0,4).toUpperCase()}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-3xl">
                      {previewingDoc.title[currentLang as keyof typeof previewingDoc.title]}
                    </h2>
                 </div>
              </div>

              {/* Clean White Reading Area */}
              <div className="p-10 md:p-20 bg-white">
                 <div className="max-w-4xl mx-auto">
                    {/* Source Attribution */}
                    <div className="flex items-center justify-between mb-16 pb-8 border-b border-slate-100">
                       <div className="flex items-center gap-4">
                          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-inner", previewingDoc.color.replace('text-', 'bg-').split('-')[0] + '-600')}>
                             {previewingDoc.title.en.charAt(0)}
                          </div>
                          <div>
                             <span className="block text-sm font-bold text-slate-900">{t('guides.legislativeIntelligence')}</span>
                             <span className="block text-xs font-black text-slate-400 uppercase tracking-widest">{t('guides.officialPolicyDatabase')}</span>
                          </div>
                       </div>
                    </div>

                    <article className={cn(
                      "prose prose-slate prose-xl md:prose-2xl max-w-none text-black leading-relaxed font-sans",
                      "prose-headings:text-black prose-headings:font-black prose-headings:tracking-tight prose-headings:mb-10",
                      "prose-h1:text-6xl md:text-7xl prose-h1:mb-16 prose-h1:pb-6 prose-h1:border-b-4 prose-h1:border-emerald-500 prose-h1:font-black",
                      "prose-h2:text-4xl md:text-5xl prose-h2:mt-24 prose-h2:mb-10 prose-h2:font-black prose-h2:tracking-tighter",
                      "prose-h3:text-2xl md:text-3xl prose-h3:mt-12 prose-h3:mb-6 prose-h3:font-bold",
                      "prose-p:text-slate-800 prose-p:leading-[1.8]",
                      "prose-li:text-slate-800",
                      "prose-strong:text-emerald-700 prose-strong:font-bold",
                      "prose-table:border prose-table:border-slate-200 prose-table:rounded-xl prose-table:overflow-hidden",
                      "prose-th:bg-slate-50 prose-th:px-6 prose-th:py-4 prose-th:text-xs prose-th:font-black prose-th:uppercase prose-th:tracking-widest prose-th:text-slate-900",
                      "prose-td:px-6 prose-td:py-4 prose-td:text-slate-700",
                      isRTL ? "text-right font-serif-arabic text-xl md:text-2xl" : "text-left"
                    )} dir={isRTL ? 'rtl' : 'ltr'}>
                       <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {previewingDoc.content[currentLang as keyof typeof previewingDoc.content] || t('guides.processingContent')}
                       </ReactMarkdown>
                    </article>

                    {/* Simple Bottom Action */}
                    <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col items-center gap-8">
                       <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 flex gap-6 items-start w-full">
                          <Scale className="text-slate-400 shrink-0" size={24} />
                          <p className="text-slate-500 text-sm leading-relaxed">
                            <strong className="text-slate-900 block mb-1 uppercase text-[10px] tracking-widest font-black">{t('guides.legalNotice')}</strong>
                            {t('guides.legalNoticeContent')}
                          </p>
                       </div>
                       <button 
                         onClick={() => setPreviewingDoc(null)}
                         className="px-10 py-4 bg-slate-900 text-white rounded-xl font-bold text-sm underline-offset-4 hover:bg-emerald-600 transition-all shadow-lg"
                       >
                         {t('guides.closeDocument')}
                       </button>
                    </div>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Guides;
