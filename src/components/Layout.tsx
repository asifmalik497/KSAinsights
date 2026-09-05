import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Menu, X, ChevronRight, ChevronDown, MapPin, Shield, ArrowRight, Calendar, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { cn, getLanguage, findPostById } from '../lib/utils';
import { useDevice } from '../contexts/DeviceContext';
import { useFirebase } from '../contexts/FirebaseContext';
import { blogPosts } from '../data/posts';
import { BlogPost } from '../types';
import CookieConsent from './CookieConsent';
import Logo from './Logo';
import SupportWidget from './SupportWidget';
import Breadcrumbs from './Breadcrumbs';

const DEFAULT_BREAKING_NEWS = [
  { 
    en: 'Hajj 2026: Ministry of Hajj opens final registration phase', 
    ar: 'حج 2026: وزارة الحج تفتح مرحلة التسجيل النهائية', 
    ur: 'حج 2026: وزارت حج نے رجسٹریشن کے آخری مرحلے کا آغاز کر دیا ہے',
    summary_en: 'The Ministry of Hajj and Umrah has announced the final window for domestic pilgrims to finalize their packages for the 2026 season as preparations accelerate for late May.',
    summary_ar: 'أعلنت وزارة الحج والعمرة عن فتح النافذة الأخيرة للحجاج الداخلين لاستكمال باقاتهم لموسم 2026 مع تسارع الاستعدادات لشهر مايو.',
    summary_ur: 'وزارت حج و عمرہ نے مئی کے آخر میں ہونے والے حج کے لیے تیاریوں میں تیزی لاتے ہوئے مقامی حجاج کے لیے 2026 کے سیزن کے پیکجز کو حتمی شکل دینے کے لیے آخری ونڈو کا اعلان کر دیا ہے۔',
    source: 'Ministry of Hajj / SPA',
    postId: 'hajj-2026-registration' 
  },
  { 
    en: 'Riyadh Rent Freeze: 5-Year lockdown on increases confirmed', 
    ar: 'تجميد إيجارات الرياض: تأكيد إيقاف الزيادات لمدة 5 سنوات', 
    ur: 'ریاض میں کرایوں پر پابندی: 5 سال تک اضافے پر روک کی تصدیق',
    summary_en: 'A milestone decree freezes all residential rent increases within Riyadh’s urban boundaries for the next 5 years to ensure housing market stability.',
    summary_ar: 'مرسوم هام يقضي بتجميد جميع زيادات الإيجارات السكنية داخل النطاق العمراني لمدينة الرياض للسنوات الخمس القادمة لضمان استقرار سوق الإسكان.',
    summary_ur: 'ریاض کی شہری حدود میں اگلے 5 سالوں کے لیے رہائشی کرایوں میں اضافے پر پابندی لگا دی گئی ہے تاکہ ہاؤسنگ مارکیٹ میں استحکام رہے۔',
    source: 'REGA / Saudi Scoop',
    postId: 'tenant-rights-ksa-2026' 
  },
  { 
    en: 'King Khalid Airport completes Terminals 1 & 2 upgrade', 
    ar: 'مطار الملك خالد يكمل تحديث الصالتين 1 و 2', 
    ur: 'کنگ خالد ایئرپورٹ کے ٹرمینل 1 اور 2 کی اپ گریڈیشن مکمل',
    summary_en: 'Riyadh’s primary gateway has successfully completed its terminal upgrades, enhancing passenger capacity and digital check-in services.',
    summary_ar: 'أكملت الرياض، البوابة الأساسية، تحديثات الصالات بنجاح، مما يعزز طاقة المسافرين الاستيعابية وخدمات تسجيل الوصول الرقمية.',
    summary_ur: 'ریاض کے مرکزی ایئرپورٹ نے اپنے ٹرمینلز کی اپ گریڈیشن کامیابی سے مکمل کر لی ہے، جس سے مسافروں کی گنجائش اور ڈیجیٹل سروسز میں اضافہ ہوگا۔',
    source: 'General Authority of Civil Aviation',
    postId: 'king-khalid-airport-upgrade' 
  },
  {
    en: 'Saudi Space Agency unveils new 2026 Lunar Mission details',
    ar: 'وكالة الفضاء السعودية تكشف تفاصيل مهمة القمر الجديدة 2026',
    ur: 'سعودی اسپیس ایجنسی نے 2026 کے نئے قمری مشن کی تفصیلات ظاہر کر دیں',
    summary_en: 'The mission aims to establish a lunar research station in collaboration with international partners by the end of the decade.',
    summary_ar: 'تهدف المهمة إلى إنشاء محطة أبحاث قمرية بالتعاون مع شركاء دوليين بحلول نهاية العقد.',
    summary_ur: 'اس مشن کا مقصد دہائی کے آخر تک بین الاقوامی شراکت داروں کے تعاون سے چاند پر ریسرچ اسٹیشن قائم کرنا ہے۔',
    source: 'Saudi Space Agency',
    postId: 'saudi-lunar-mission-2026'
  },
  {
    en: 'NEOM Green Hydrogen Plant begins early phase operations',
    ar: 'محطة نيوم للهيدروجين الأخضر تبدأ عمليات المرحلة المبكرة',
    ur: 'نیوم گرین ہائیڈروجن پلانٹ نے ابتدائی مرحلے کے آپریشنز شروع کر دیے',
    summary_en: 'The worlds largest green hydrogen facility has successfully produced its first batch of ammonia for the global export market.',
    summary_ar: 'نجحت أكبر منشأة للهيدروجين الأخضر في العالم في إنتاج أول دفعة من الأمونيا لسوق التصدير العالمي.',
    summary_ur: 'دنیا کے سب سے بڑے گرین ہائیڈروجن پلانٹ نے عالمی برآمدی مارکیٹ کے لیے امونیا کی پہلی کھیپ کامیابی سے تیار کر لی ہے۔',
    source: 'NEOM / Energy News',
    postId: 'neom-green-hydrogen-2026'
  },
  {
    en: 'Saudi Ministry of Tourism reports record 100M visitors goal reached',
    ar: 'وزارة السياحة السعودية تعلن الوصول لهدف 100 مليون زائر',
    ur: 'سعودی وزارت سیاحت نے 100 ملین زائرین کا ہدف حاصل کرنے کی اطلاع دی',
    summary_en: 'A major milestone for Vision 2030 as the Kingdom welcomes its 100 millionth visitor for the year, far ahead of original schedules.',
    summary_ar: 'إنجاز كبير لرؤية 2030 حيث ترحب المملكة بالزائر رقم 100 مليون لهذا العام، قبل الموعد المحدد بكثير.',
    summary_ur: 'ویژن 2030 کے لیے ایک بڑا سنگ میل کیونکہ مملکت نے سال بھر میں اپنے 100 ملین ویں زائر کا خیرمقدم کیا ہے، جو اصل نظام الاوقات سے بہت آگے ہے۔',
    source: 'Ministry of Tourism',
    postId: 'saudi-tourism-record-2026'
  },
  {
    en: 'Riyadh Metro expands testing to all final phase lines',
    ar: 'مترو الرياض يوسع الاختبارات لتشمل جميع خطوط المرحلة النهائية',
    ur: 'ریاض میٹرو نے تمام آخری مرحلے کی لائنوں تک ٹیسٹنگ کو وسعت دے دی ہے',
    summary_en: 'The city’s ambitious public transport network has entered final-stage durability testing across all six major lines simultaneously.',
    summary_ar: 'دخلت شبكة النقل العام الطموحة في المدينة مرحلة الاختبار النهائية عبر جميع الخطوط الستة الرئيسية في وقت واحد.',
    summary_ur: 'شہر کے پرجوش پبلک ٹرانسپورٹ نیٹ ورک نے بیک وقت تمام چھ بڑی لائنوں پر آخری مرحلے کی پائیداری کی ٹیسٹنگ شروع کر دی ہے۔',
    source: 'RCRC / Riyadh Metro',
    postId: 'riyadh-metro-update-2026'
  },
  {
    en: 'Saudi National Bank announces digital-first luxury banking suite',
    ar: 'البنك الأهلي السعودي يعلن عن مجموعة خدمات مصرفية فاخرة رقمية',
    ur: 'سعودی نیشنل بینک نے ڈیجیٹل فرسٹ لگژری بینکنگ سویٹ کا اعلان کیا ہے',
    summary_en: 'A new tier of private banking for young tech entrepreneurs has been launched, featuring AI-driven wealth management.',
    summary_ar: 'تم إطلاق فئة جديدة من الخدمات المصرفية الخاصة لرواد الأعمال الشباب في مجال التكنولوجيا، تتميز بإدارة الثروات المدفوعة بالذكاء الاصطناعي.',
    summary_ur: 'نوجوان ٹیک انٹرپرینیورز کے لیے نجی بینکنگ کا ایک نیا درجہ شروع کیا گیا ہے، جس میں اے آئی سے چلنے والی دولت کے انتظام کی خصوصیات ہیں۔',
    source: 'SNB / Financial Intelligence',
    postId: 'snb-digital-luxury-2026'
  },
  {
    en: 'UNESCO recognizes three new heritage sites in Saudi Highlands',
    ar: 'اليونسكو تعترف بثلاثة مواقع تراثية جديدة في المرتفعات السعودية',
    ur: 'یونیسکو نے سعودی ہائی لینڈز میں تین نئے عالمی ثقافتی ورثے کے مقامات کو تسلیم کر لیا ہے',
    summary_en: 'Historic mountain settlements in the Aseer region have been added to the World Heritage List for their unique cultural architecture.',
    summary_ar: 'تمت إضافة مستوطنات جبلية تاريخية في منطقة عسير إلى قائمة التراث العالمي لهندستها الثقافية الفريدة.',
    summary_ur: 'عسیر کے علاقے میں پہاڑی بستیوں کو ان کے منفرد ثقافتی فن تعمیر کی وجہ سے عالمی ثقافتی ورثہ کی فہرست میں شامل کیا گیا ہے۔',
    source: 'UNESCO / Culture Ministry',
    postId: 'unesco-saudi-sites-2026'
  },
  {
    en: 'Saudi Aramco increases global R&D investment in blue ammonia',
    ar: 'أرامكو السعودية تزيد استثمارات البحث والتطوير العالمية في الأمونيا الزرقاء',
    ur: 'سعودی آرامکو نے بلیو امونیا میں عالمی آر اینڈ ڈی سرمایہ کاری میں اضافہ کر دیا ہے',
    summary_en: 'The energy giant has committed an additional $2B toward low-carbon fuel research centers in Asia and Europe.',
    summary_ar: 'التزمت عملاقة الطاقة بمبلغ ملياري دولار إضافي لمراكز أبحاث الوقود منخفض الكربون في آسيا وأوروبا.',
    summary_ur: 'توانائی کی بڑی کمپنی نے ایشیا اور یورپ میں کم کاربن ایندھن کے تحقیقی مراکز کے لیے اضافی 2 بلین ڈالر کا عہد کیا ہے۔',
    source: 'Aramco / Global Energy',
    postId: 'aramco-blue-ammonia-2026'
  },
  {
    en: 'Diriyah Gate Phase 2 construction to begin ahead of World Expo',
    ar: 'بدء بناء المرحلة الثانية من بوابة الدرعية قبل إكسبو العالمي',
    ur: 'ورلڈ ایکسپو سے پہلے درعیہ گیٹ فیز 2 کی تعمیر شروع ہونے والی ہے',
    summary_en: 'The heritage project enters a new phase involving the reconstruction of traditional Najdi mud-brick districts alongside luxury hotels.',
    summary_ar: 'يدخل مشروع التراث مرحلة جديدة تشمل إعادة بناء أحياء طينية نجدية تقليدية إلى جانب فنادق فاخرة.',
    summary_ur: 'ثقافتی منصوبہ ایک نئے مرحلے میں داخل ہو گیا ہے جس میں عیش و آرام کے ہوٹلوں کے ساتھ ساتھ روایتی نجدی بستیوں کی تعمیر نو شامل ہے۔',
    source: 'DGDA / Tourism Hub',
    postId: 'diriyah-gate-phase-2'
  },
  {
    en: 'KSA leads Middle East in AI startup funding for Q1 2026',
    ar: 'المملكة تقود الشرق الأوسط في تمويل الشركات الناشئة للذكاء الاصطناعي',
    ur: 'سعودی عرب 2026 کی پہلی سہ ماہی میں اے آئی اسٹارٹ اپ فنڈنگ میں مشرق وسطیٰ میں سرفہرست',
    summary_en: 'Venture capital in Riyadh has surged as local tech firms secure record rounds for regional large language model development.',
    summary_ar: 'ارتفع رأس المال الاستثماري في الرياض حيث حصلت شركات التكنولوجيا المحلية على جولات قياسية لتطوير نماذج لغوية كبيرة.',
    summary_ur: 'ریاض میں وینچر کیپیٹل میں اضافہ ہوا ہے کیونکہ مقامی ٹیک فرموں نے علاقائی بڑے لسانی ماڈلز کی ترقی کے لیے ریکارڈ فنڈز حاصل کیے ہیں۔',
    source: 'SCAI / Tech Report',
    postId: 'saudi-ai-funding-2026'
  },
  {
    en: 'New Riyadh Smart Ring Road uses 5G for automated traffic flow',
    ar: 'الطريق الدائري الذكي الجديد بالرياض يستخدم 5G لتنظيم التدفق التلقائي',
    ur: 'ریاض کی نئی اسمارٹ رنگ روڈ خودکار ٹریفک فلو کے لیے 5G کا استعمال کرے گی',
    summary_en: 'Real-time traffic management systems have been deployed across the main arteries to reduce congestion by 30% using predictive AI.',
    summary_ar: 'تم نشر أنظمة إدارة المرور في الوقت الفعلي عبر الشرايين الرئيسية لتقليل الازدحام بنسبة 30٪ باستخدام الذكاء الاصطناعي التنبؤي.',
    summary_ur: 'پیشن گوئی کرنے والے اے آئی کا استعمال کرتے ہوئے ہجوم کو 30 فیصد تک کم کرنے کے لیے اہم شاہراہوں پر ٹریفک مینجمنٹ سسٹم تعینات کر دیا گیا ہے۔',
    source: 'Riyadh Municipality / Smart City',
    postId: 'riyadh-smart-traffic'
  },
  {
    en: 'Saudi Ministry of Housing to allocate 50,000 new units in Q3',
    ar: 'وزارة الإسكان السعودية تخصص 50 ألف وحدة سادية جديدة في الربع الثالث',
    ur: 'سعودی وزارت ہاؤسنگ تیسری سہ ماہی میں 50,000 نئے یونٹس مختص کرے گی',
    summary_en: 'A major expansion of the Sakani program will provide affordable housing options to families in Riyadh, Jeddah, and Dammam.',
    summary_ar: 'توسع كبير في برنامج سكني سيوفر خيارات سكنية ميسورة التكلفة للأسر في الرياض وجدة والدمام.',
    summary_ur: 'سکنی پروگرام کی ایک بڑی توسیع ریاض، جدہ اور دمام میں خاندانوں کو سستی رہائش کے اختیارات فراہم کرے گی۔',
    source: 'Sakani / Housing Ministry',
    postId: 'sakani-housing-2026'
  },
  {
    en: 'New Riyadh Tech District to host global AI summit in October',
    ar: 'منطقة الرياض التقنية الجديدة تستضيف قمة عالمية للذكاء الاصطناعي في أكتوبر',
    ur: 'ریاض کا نیا ٹیک ڈسٹرکٹ اکتوبر میں عالمی اے آئی سمٹ کی میزبانی کرے گا',
    summary_en: 'Innovation leaders from across the globe will converge in the capital to discuss the ethics and expansion of generative models.',
    summary_ar: 'سيلتقي قادة الابتكار من جميع أنحاء العالم في العاصمة لمناقشة أخلاقيات وتوسع النماذج التوليدية.',
    summary_ur: 'دنیا بھر سے اختراع کرنے والے رہنما جنریٹیو ماڈلز کے اخلاقیات اور توسیع پر تبادلہ خیال کرنے کے لیے دارالحکومت میں جمع ہوں گے۔',
    source: 'SDAIA / Global Events',
    postId: 'riyadh-ai-summit-2026'
  }
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const { user, profile, login, logout, isAdmin: isUserAdmin } = useFirebase();
  const { isMobile, isDesktop } = useDevice();
  const currentLang = getLanguage(i18n.language);
  const isRTL = currentLang === 'ar' || currentLang === 'ur';
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLangOpen, setIsLangOpen] = React.useState(false);
  const [showLangSelector, setShowLangSelector] = React.useState(false);
  const [selectedNews, setSelectedNews] = React.useState<{ en: string; ar: string; ur: string; summary_en: string; summary_ar: string; summary_ur: string; source: string; postId: string } | null>(null);
  const [showFullAnalysis, setShowFullAnalysis] = React.useState(false);
  const location = useLocation();

  const [breakingNews, setBreakingNews] = React.useState<any[]>(DEFAULT_BREAKING_NEWS);
  const [allBlogPosts, setAllBlogPosts] = React.useState<BlogPost[]>(blogPosts);

  useEffect(() => {
    const qBlog = query(collection(db, 'blog_posts'));
    const unsubscribeBlog = onSnapshot(qBlog, (snapshot) => {
      const posts = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: data.id || doc.id,
        };
      }) as BlogPost[];
      const combined = [...posts, ...blogPosts.filter(sp => !posts.some(dp => dp.id === sp.id))];
      setAllBlogPosts(combined);
    }, (err) => {
      console.warn('Could not sync dynamic blog posts in layout:', err);
    });
    return () => unsubscribeBlog();
  }, []);

  useEffect(() => {
    // Sync with live AI Strategic Alerts from Intelligence Engine & News Parsers
    const q = query(
      collection(db, 'strategic_alerts'),
      orderBy('createdAt', 'desc'),
      limit(20)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let alerts: any[] = [];
      if (!snapshot.empty) {
        alerts = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            en: data.title?.en || data.title_en || 'Strategic Alert',
            ar: data.title?.ar || data.title_ar || 'تنبيه استراتيجي',
            ur: data.title?.ur || data.title_ur || data.title?.en || 'Strategic Alert',
            summary_en: data.summary?.en || data.summary_en || '',
            summary_ar: data.summary?.ar || data.summary_ar || '',
            summary_ur: data.summary?.ur || data.summary_ur || data.summary?.en || '',
            source: data.source || 'Intelligence Engine',
            postId: doc.id
          };
        });
      }

      // Prioritize parsed/streamed strategic alerts from official sources
      let finalNews = [...alerts];

      if (finalNews.length < 15) {
        const remainingNeeded = 15 - finalNews.length;
        // Fill remaining slots with standard parsed default news that aren't already represented
        const padding = DEFAULT_BREAKING_NEWS
          .filter(d => !finalNews.some(f => f.en === d.en || f.postId === d.postId))
          .slice(0, remainingNeeded);
        finalNews = [...finalNews, ...padding];
      }
      
      // Final safety cap/slice
      setBreakingNews(finalNews.slice(0, 15));
    }, (error) => {
      console.error("[Ticker] Live Sync Failed, falling back to default parsed news:", error);
      setBreakingNews(DEFAULT_BREAKING_NEWS.slice(0, 15));
    });

    return () => unsubscribe();
  }, []);

  const fullPost = selectedNews ? (
    findPostById(allBlogPosts, selectedNews.postId) ||
    findPostById(allBlogPosts, selectedNews.en) ||
    findPostById(allBlogPosts, selectedNews.ar) ||
    findPostById(allBlogPosts, selectedNews.ur)
  ) || null : null;

  const handleCloseModal = () => {
    setSelectedNews(null);
    setShowFullAnalysis(false);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false);
    setShowLangSelector(false);
    localStorage.setItem('i18nextLng', lng);
    localStorage.setItem('hasSelectedLanguage', 'true');
  };

  useEffect(() => {
    // Keep document direction LTR to ensure scrollbar stays on the right side
    // as requested by the user, while setting the lang for accessibility.
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  useEffect(() => {
    const hasSelected = localStorage.getItem('hasSelectedLanguage');
    if (!hasSelected) {
      const timer = setTimeout(() => {
        setShowLangSelector(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const navItems = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.news'), path: '/news' },
    { name: t('nav.guides'), path: '/guides' },
    { name: t('nav.faq'), path: '/faq' },
    { name: t('nav.blog'), path: '/blog' },
    { name: t('nav.services'), path: '/services' },
    { name: t('nav.expatHub'), path: '/expat-hub' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.consultancy'), path: '/consultancy' },
  ];

  const adminNavItems = isUserAdmin ? [
    { name: '🔥 Strategic Control Panel', path: '/admin/seo' },
  ] : [];

  const allNavItems = [...navItems, ...adminNavItems];

  return (
    <div className="min-h-screen flex flex-col font-sans" dir="ltr">
      <div className={cn("flex flex-col flex-grow", isRTL ? "rtl" : "ltr")} dir={isRTL ? 'rtl' : 'ltr'}>
        {/* First-Visit Language Selector */}
      <AnimatePresence>
        {showLangSelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/95 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="bg-white w-full max-w-xl rounded-[3rem] p-10 md:p-16 shadow-2xl text-center relative overflow-hidden border border-white/20"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-48 h-48 emerald-gradient opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 gold-gradient opacity-5 rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10">
                <div className="w-24 h-24 emerald-gradient rounded-[2rem] flex items-center justify-center text-white mx-auto mb-10 premium-shadow">
                  <Globe size={48} className="text-secondary" />
                </div>
                
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
                  {t('layout.welcome')} <br />
                  <span className="text-gold-gradient">KSA Insights</span>
                </h2>
                
                <p className="text-gray-500 mb-12 text-xl font-light">
                  {t('layout.selectLanguage')}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { code: 'en', label: 'English', sub: 'Global' },
                    { code: 'ar', label: 'العربية', sub: 'المملكة' },
                    { code: 'ur', label: 'اردو', sub: 'کمیونٹی' }
                  ].map((lang) => (
                    <button
                      key={`modal-lang-${lang.code}`}
                      onClick={() => changeLanguage(lang.code)}
                      className="group p-8 rounded-3xl border border-gray-100 hover:border-secondary hover:bg-secondary/5 transition-all flex flex-col items-center gap-3 premium-shadow hover:scale-105"
                    >
                      <span className="text-2xl font-bold text-primary group-hover:text-secondary transition-colors">
                        {lang.label}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                        {lang.sub}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="mt-16 pt-10 border-t border-gray-100">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3">
                    <span className="w-8 h-px bg-gray-100" />
                    {t('layout.vision2030')}
                    <span className="w-8 h-px bg-gray-100" />
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Top Bar - Sticky Language Switcher */}
      <div className="emerald-gradient text-white py-2.5 px-4 text-xs sm:text-sm sticky top-0 z-[60] border-b border-white/10">
        <div className={cn("max-w-7xl mx-auto flex items-center", isRTL ? "justify-start" : "justify-end")}>
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2.5 hover:text-secondary transition-colors font-bold uppercase tracking-widest"
            >
              <Globe size={14} className="text-secondary" />
              {currentLang === 'en' ? 'English' : currentLang === 'ar' ? 'العربية' : 'اردو'}
              <ChevronDown size={12} className={cn("transition-transform", isLangOpen && "rotate-180")} />
            </button>
            
            <AnimatePresence>
              {isLangOpen && (
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsLangOpen(false)}
                />
              )}
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-3 w-40 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-20 overflow-hidden"
                >
                  {[
                    { code: 'en', label: 'English' },
                    { code: 'ar', label: 'العربية' },
                    { code: 'ur', label: 'اردو' }
                  ].map((lang) => (
                    <button
                      key={`dropdown-lang-${lang.code}`}
                      onClick={() => changeLanguage(lang.code)}
                      className={cn(
                        "w-full text-left rtl:text-right px-6 py-3 text-sm hover:bg-paper transition-colors",
                        currentLang === lang.code ? "text-secondary font-bold bg-secondary/5" : "text-primary font-medium"
                      )}
                    >
                      {lang.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Strategic Alert Ticker */}
      <div className="bg-white text-primary py-2.5 overflow-hidden whitespace-nowrap relative border-b border-gray-100 flex items-center group/ticker" dir="ltr">
        <div className="flex items-center gap-2 px-6 shrink-0 z-10 bg-white border-r border-gray-100 h-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">
            {t('layout.breaking')}
          </span>
        </div>
        
        <div className="flex-grow overflow-hidden relative">
          <div className="animate-marquee flex whitespace-nowrap w-max">
            {/* First Set of News */}
            <div className="flex items-center shrink-0">
              {breakingNews.map((news, i) => (
                <button 
                  key={`ticker-1-${news.postId || i}-${i}`} 
                  onClick={() => setSelectedNews(news)}
                  className="mx-20 text-[11px] font-bold uppercase tracking-[0.15em] hover:text-secondary transition-colors inline-flex items-center gap-4 cursor-pointer group/item"
                >
                  <span className="font-mono text-gray-200 group-hover/item:text-secondary transition-colors">[{ i + 1 }]</span>
                  <span className="border-b border-transparent group-hover/item:border-secondary transition-all">{news[currentLang]}</span>
                  <ArrowRight size={10} className="text-secondary/30 group-hover/item:text-secondary transition-colors opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0" />
                </button>
              ))}
            </div>
            {/* Second Identical Set for Seamless Looping */}
            <div className="flex items-center shrink-0">
              {breakingNews.map((news, i) => (
                <button 
                  key={`ticker-2-${news.postId || i}-${i}`} 
                  onClick={() => setSelectedNews(news)}
                  className="mx-20 text-[11px] font-bold uppercase tracking-[0.15em] hover:text-secondary transition-colors inline-flex items-center gap-4 cursor-pointer group/item"
                >
                  <span className="font-mono text-gray-200 group-hover/item:text-secondary transition-colors">[{ i + 1 }]</span>
                  <span className="border-b border-transparent group-hover/item:border-secondary transition-all">{news[currentLang]}</span>
                  <ArrowRight size={10} className="text-secondary/30 group-hover/item:text-secondary transition-colors opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-[41px] z-50">
        <nav className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex justify-between items-center gap-4 lg:gap-6">
          <Link to="/" className="flex items-center gap-3 sm:gap-4 group shrink-0">
            <motion.div 
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-3 sm:gap-4 hover:scale-105 transition-transform duration-300"
            >
              <Logo 
                currentLang={currentLang} 
                size="custom" 
                className="w-10 h-10 sm:w-12 sm:h-12 sm:rounded-xl shadow-xl group-hover:shadow-emerald-900/40" 
              />
              <span className="font-serif text-sm sm:text-base xl:text-lg font-bold tracking-tight text-emerald-gradient leading-[0.9] max-w-[120px] sm:max-w-none block text-start whitespace-nowrap lg:whitespace-normal">
                {t('nav.logo')}
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          {isDesktop && (
            <div className="flex items-center gap-1.5 xl:gap-3 ms-1 xl:ms-2">
              {allNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "text-[10px] xl:text-[11px] font-bold transition-all hover:text-secondary whitespace-nowrap uppercase tracking-widest relative group/nav",
                    location.pathname === item.path ? "text-secondary" : "text-primary"
                  )}
                >
                  {item.name}
                  <span className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-secondary transition-all duration-300",
                    location.pathname === item.path ? "w-full" : "w-0 group-hover/nav:w-full"
                  )} />
                </Link>
              ))}
              
              <div className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-100">
                {user ? (
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-xs font-black text-primary truncate max-w-[100px] uppercase tracking-wider">{profile?.displayName || user.displayName}</p>
                      <Link to="/admin/seo" className="text-[10px] font-bold text-secondary uppercase tracking-widest hover:underline block">
                        {isUserAdmin ? 'Strategic Admin' : 'Investor'}
                      </Link>
                    </div>
                    <button 
                      onClick={logout}
                      className="w-10 h-10 rounded-xl bg-paper flex items-center justify-center text-primary hover:text-secondary hover:bg-secondary/5 transition-all premium-shadow border border-gray-100 group relative"
                    >
                      <User size={18} />
                      <div className="absolute -bottom-8 right-0 bg-primary text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold uppercase tracking-widest">Logout</div>
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={login}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition-all premium-shadow border border-primary/10 shadow-lg shadow-primary/10"
                  >
                    <User size={14} className="text-secondary" />
                    {t('nav.login') || 'Login'}
                  </button>
                )}
              </div>

              <Link 
                to="/contact" 
                className="gold-gradient text-primary px-3 xl:px-6 py-2.5 rounded-xl text-xs xl:text-sm font-bold hover:scale-105 transition-all premium-shadow whitespace-nowrap uppercase tracking-widest ms-1"
              >
                {t('nav.contact')}
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          {isMobile && (
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-14 h-14 bg-paper rounded-2xl flex items-center justify-center text-primary hover:text-secondary transition-all premium-shadow"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          )}
        </nav>

        {/* Mobile Slide-over Menu */}
        <AnimatePresence>
          {isMobile && isMenuOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 250 }}
              className="fixed inset-0 z-[60] bg-white pt-32 px-8 flex flex-col gap-8 overflow-y-auto"
              dir="ltr"
            >
              <div className="flex flex-col gap-8" dir={isRTL ? 'rtl' : 'ltr'}>
                {allNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "text-3xl font-serif font-bold transition-colors flex items-center justify-between group",
                      location.pathname === item.path ? "text-secondary" : "text-primary"
                    )}
                  >
                    {item.name}
                    <ChevronRight size={24} className={cn("text-secondary group-hover:translate-x-2 transition-transform", isRTL && "rotate-180 group-hover:-translate-x-2")} />
                  </Link>
                ))}
                <Link 
                  to="/contact" 
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-auto mb-16 gold-gradient text-primary p-8 rounded-3xl text-center font-bold text-2xl premium-shadow uppercase tracking-widest"
                >
                  {t('nav.contact')}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 mt-6">
          <Breadcrumbs />
        </div>
        {children}
      </main>


      {/* Breaking News Quick View Modal */}
      <AnimatePresence>
        {selectedNews && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/95 backdrop-blur-xl"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={cn(
                "bg-white w-full rounded-[3rem] overflow-hidden relative shadow-2xl flex flex-col transition-all duration-500 border border-white/20 max-h-[90vh]",
                showFullAnalysis ? "max-w-6xl" : "max-w-xl"
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={handleCloseModal}
                className={cn(
                  "absolute z-50 w-12 h-12 flex items-center justify-center transition-all premium-shadow",
                  showFullAnalysis 
                    ? "top-8 right-8 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full" 
                    : "top-6 right-6 bg-paper hover:bg-gray-100 text-primary rounded-full"
                )}
              >
                <X size={24} />
              </button>

              {showFullAnalysis && fullPost ? (
                <div className="overflow-y-auto" dir="ltr">
                  <div dir={isRTL ? 'rtl' : 'ltr'}>
                    {/* Image Gallery */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 h-[35vh] md:h-[45vh] p-2">
                      {(fullPost.images || []).slice(0, 3).map((img, i) => (
                        <div key={`gallery-img-${i}`} className="h-full overflow-hidden rounded-2xl">
                          <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
                        </div>
                      ))}
                    </div>

                    <div className="p-10 md:p-20 max-w-5xl mx-auto">
                      <div className="flex items-center gap-8 text-secondary text-xs font-bold uppercase tracking-[0.3em] mb-10">
                        <span className="gold-gradient text-primary px-4 py-1.5 rounded-full shadow-sm">{fullPost.category}</span>
                        <span className="w-2 h-2 emerald-gradient rounded-full" />
                        <span className="text-gray-400">{fullPost.date}</span>
                      </div>

                      <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-16 leading-tight">
                        {fullPost.title?.[currentLang] || fullPost.title?.en || fullPost.title?.ar || fullPost.title?.ur || (typeof fullPost.title === 'string' ? fullPost.title : '')}
                      </h2>

                      <div className="prose prose-xl max-w-none text-gray-500 leading-relaxed font-light">
                        <ReactMarkdown
                          components={{
                            a: ({ node, ...props }) => (
                              <a 
                                {...props} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-secondary hover:underline font-bold"
                              />
                            ),
                          }}
                        >
                          {fullPost.content?.[currentLang] || fullPost.content?.en || fullPost.content?.ar || fullPost.content?.ur || (typeof fullPost.content === 'string' ? fullPost.content : '')}
                        </ReactMarkdown>
                      </div>

                      <div className="mt-20 pt-16 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-10">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 emerald-gradient rounded-2xl flex items-center justify-center text-white font-serif font-bold text-2xl premium-shadow">
                            {fullPost.author?.charAt(0) || 'S'}
                          </div>
                          <div>
                            <div className="font-serif font-bold text-2xl text-primary">{fullPost.author}</div>
                            <div className="text-xs text-secondary font-bold uppercase tracking-widest">Senior Strategic Analyst</div>
                          </div>
                        </div>
                        <button 
                          onClick={handleCloseModal}
                          className="emerald-gradient text-white px-12 py-5 rounded-2xl font-bold hover:scale-105 transition-all premium-shadow uppercase tracking-widest"
                        >
                          {t('layout.close')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative z-10 p-10 md:p-14 overflow-y-auto" dir="ltr">
                  <div dir={isRTL ? 'rtl' : 'ltr'}>
                    <span className="emerald-gradient text-white text-[10px] font-bold uppercase px-4 py-1.5 rounded-full mb-8 inline-block tracking-[0.2em] shadow-lg shadow-emerald-900/20">
                      {t('layout.breaking')}
                    </span>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-primary leading-tight mb-8">
                      {selectedNews[currentLang]}
                    </h3>
                    <div className="prose prose-sm max-w-none text-gray-500 mb-10 leading-relaxed">
                      <ReactMarkdown>
                        {selectedNews[`summary_${currentLang}`]}
                      </ReactMarkdown>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-12">
                      <span className="text-secondary">{t('layout.source')}:</span>
                      <span className="bg-paper px-3 py-1 rounded-full">{selectedNews.source}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6">
                      {fullPost ? (
                        <button 
                          onClick={() => setShowFullAnalysis(true)}
                          className="flex-1 emerald-gradient text-white text-center py-5 rounded-2xl font-bold hover:scale-105 transition-all premium-shadow flex items-center justify-center gap-3 group uppercase tracking-widest text-[10px]"
                        >
                          {t('layout.readFullAnalysis')}
                          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                        </button>
                      ) : (
                        <Link 
                          to={`/news`}
                          onClick={handleCloseModal}
                          className="flex-1 emerald-gradient text-white text-center py-5 rounded-2xl font-bold hover:scale-105 transition-all premium-shadow flex items-center justify-center gap-3 group uppercase tracking-widest text-[10px]"
                        >
                          {t('layout.viewAllNews') || 'View Industry Reports'}
                          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                        </Link>
                      )}
                      <button 
                        onClick={handleCloseModal}
                        className="flex-1 bg-paper text-primary py-5 rounded-2xl font-bold hover:bg-gray-100 transition-all uppercase tracking-widest text-[10px]"
                      >
                        {t('layout.close')}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-primary text-white pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 emerald-gradient opacity-90" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-12 lg:gap-24">
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-4 mb-10 group">
              <Logo 
                currentLang={currentLang} 
                variant="light" 
                size="sm" 
                className="shadow-xl group-hover:scale-110 shrink-0 border-none bg-white text-primary" 
              />
              <span className="font-serif text-lg font-bold tracking-tight text-white leading-[0.9] block text-start whitespace-nowrap lg:whitespace-normal">
                {t('nav.logo')}
              </span>
            </Link>
            <p className="text-white/60 mb-10 text-sm font-light leading-relaxed">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-4">
              {[
                { name: 'English', code: 'en' },
                { name: 'العربية', code: 'ar' },
                { name: 'اردو', code: 'ur' }
              ].map((lang) => (
                <button 
                  key={`footer-lang-${lang.code}`}
                  onClick={() => changeLanguage(lang.code)}
                  className="group relative w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all cursor-pointer"
                >
                  <Globe size={18} className="group-hover:scale-110 transition-transform" />
                  <div className="absolute top-full mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none translate-y-2 group-hover:translate-y-0">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 whitespace-nowrap">
                      {lang.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold text-xl mb-10 text-gold-gradient">Intelligence</h4>
            <ul className="space-y-6 text-white/60 font-light text-sm">
              <li><Link to="/news" className="hover:text-secondary transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="text-secondary/40 group-hover:translate-x-1 transition-transform" /> {t('nav.news')}</Link></li>
              <li><Link to="/faq" className="hover:text-secondary transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="text-secondary/40 group-hover:translate-x-1 transition-transform" /> {t('nav.faq')}</Link></li>
              <li><Link to="/content-lab" className="hover:text-secondary transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="text-secondary/40 group-hover:translate-x-1 transition-transform" /> {t('footer.aiContentLab')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-xl mb-10 text-gold-gradient">Research</h4>
            <ul className="space-y-6 text-white/60 font-light text-sm">
              <li><Link to="/blog" className="hover:text-secondary transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="text-secondary/40 group-hover:translate-x-1 transition-transform" /> {t('nav.blog')}</Link></li>
              <li><Link to="/guides" className="hover:text-secondary transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="text-secondary/40 group-hover:translate-x-1 transition-transform" /> {t('nav.guides')}</Link></li>
              <li><Link to="/services" className="hover:text-secondary transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="text-secondary/40 group-hover:translate-x-1 transition-transform" /> {t('nav.services')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-xl mb-10 text-gold-gradient">{t('nav.consultancy')}</h4>
            <ul className="space-y-6 text-white/60 font-light text-sm">
              <li><Link to="/consultancy" className="hover:text-secondary transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="text-secondary/40 group-hover:translate-x-1 transition-transform" /> {t('consultancy.services.misa.title')}</Link></li>
              <li><Link to="/consultancy" className="hover:text-secondary transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="text-secondary/40 group-hover:translate-x-1 transition-transform" /> {t('consultancy.services.legal.title')}</Link></li>
              <li><Link to="/consultancy" className="hover:text-secondary transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="text-secondary/40 group-hover:translate-x-1 transition-transform" /> {t('consultancy.services.tax.title')}</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Legal Disclaimer Section */}
        <div className="max-w-7xl mx-auto px-4 mt-24 p-12 bg-white/5 rounded-[3rem] border border-white/10 backdrop-blur-sm">
          <h5 className="text-secondary font-bold text-xs uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
            <Shield size={18} />
            {t('footer.disclaimerTitle')}
          </h5>
          <p className="text-white/40 text-xs leading-relaxed italic font-light">
            {t('footer.disclaimerText')}
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-12 pt-12 border-t border-white/10 text-center text-white/40 text-xs font-bold uppercase tracking-[0.2em] flex flex-col md:flex-row justify-between items-center gap-8">
          <div>&copy; {new Date().getFullYear()} KSA Insights. {t('footer.rights')}</div>
          <div className="flex gap-10">
            <Link to="/content-lab" className="hover:text-secondary transition-colors">{t('footer.aiContentLab')}</Link>
            <Link to="/privacy-policy" className="hover:text-secondary transition-colors">{t('privacy.title')}</Link>
          </div>
        </div>
      </footer>
      <CookieConsent />
      <SupportWidget />
      </div>
    </div>
  );
};

export default Layout;
