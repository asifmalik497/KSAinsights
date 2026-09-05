import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Zap, 
  Globe, 
  ChevronRight, 
  Rss, 
  ExternalLink, 
  Info,
  ArrowRight,
  X,
  Building2,
  LineChart,
  FileText,
  Briefcase,
  Home,
  GraduationCap,
  HeartPulse
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { expatGuides, ExpatGuide } from '../data/expatGuides';
import { getLanguage } from '../lib/utils';
import SEO from '../components/SEO';

const ExpatHub: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selectedGuide, setSelectedGuide] = useState<ExpatGuide | null>(null);
  const currentLang = getLanguage(i18n.language);
  const isRTL = currentLang === 'ar' || currentLang === 'ur';

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck size={28} />;
      case 'Zap': return <Zap size={28} />;
      case 'Building2': return <Building2 size={28} />;
      case 'LineChart': return <LineChart size={28} />;
      case 'Home': return <Home size={28} />;
      case 'GraduationCap': return <GraduationCap size={28} />;
      case 'HeartPulse': return <HeartPulse size={28} />;
      case 'Briefcase': return <Briefcase size={28} />;
      default: return <FileText size={28} />;
    }
  };

  // Simulated Live RSS Feed Data
  const [rssFeed, setRssFeed] = useState([
    {
      id: 1,
      source: 'SPA (Saudi Press Agency)',
      title: {
        en: 'New regulations for Premium Residency holders announced',
        ar: 'الإعلان عن لوائح جديدة لحاملي الإقامة المميزة',
        ur: 'پریمیم ریذیڈنسی ہولڈرز کے لیے نئے ضوابط کا اعلان'
      },
      time: '2 hours ago',
      link: 'https://www.spa.gov.sa'
    },
    {
      id: 2,
      source: 'HRSD (Ministry of Human Resources)',
      title: {
        en: 'Update on Qiwa platform contract authentication deadlines',
        ar: 'تحديث بشأن المواعيد النهائية لتوثيق العقود عبر منصة قوى',
        ur: 'قوی پلیٹ فارم پر معاہدوں کی تصدیق کی آخری تاریخوں کے بارے میں اپ ڈیٹ'
      },
      time: '5 hours ago',
      link: 'https://hrsd.gov.sa'
    },
    {
      id: 3,
      source: 'MISA (Ministry of Investment)',
      title: {
        en: 'Investor visa processing time reduced to 24 hours',
        ar: 'تقليص وقت معالجة تأشيرة المستثمر إلى 24 ساعة',
        ur: 'انویسٹر ویزا پروسیسنگ کا وقت کم کر کے 24 گھنٹے کر دیا گیا'
      },
      time: 'Yesterday',
      link: 'https://misa.gov.sa'
    }
  ]);

  const publicServices = [
    { name: 'STC Pay', category: t('expatHub.publicServices.telecom'), url: 'https://stcpay.com.sa', desc: 'Digital wallet with multi-language support (Urdu, Tagalog, etc.)' },
    { name: 'Enjaz', category: t('expatHub.publicServices.banking'), url: 'https://www.bankalbilad.com/en/personal/remittance/enjaz/Pages/default.aspx', desc: 'Leading remittance service with dedicated Urdu support.' },
    { name: 'Tahweel Al Rajhi', category: t('expatHub.publicServices.banking'), url: 'https://www.alrajhibank.com.sa/Personal/Remittance/Tahweel-Al-Rajhi', desc: 'Al Rajhi Bank\'s remittance arm with trilingual portals.' },
    { name: 'Urdu News', category: t('expatHub.publicServices.retail'), url: 'https://www.urdunews.com', desc: 'The Kingdom\'s premier Urdu language news and business portal.' },
    { name: 'Lulu Hypermarket', category: t('expatHub.publicServices.retail'), url: 'https://www.luluhypermarket.com/en-sa/', desc: 'Major retail chain with extensive expat-focused services.' },
    { name: 'Fawri', category: t('expatHub.publicServices.banking'), url: 'https://www.baj.com.sa/en-us/Personal-Banking/Fawri-Money-Transfer', desc: 'Bank Aljazira\'s remittance service for global workers.' },
    { name: 'TeleMoney', category: t('expatHub.publicServices.banking'), url: 'https://www.anb.com.sa/en/personal/remittance/telemoney', desc: 'ANB\'s dedicated remittance platform for expats.' },
    { name: 'Alinma Pay', category: t('expatHub.publicServices.telecom'), url: 'https://www.alinmapay.com', desc: 'Modern digital payment solution with multi-language UI.' },
    { name: 'Friendi Mobile', category: t('expatHub.publicServices.telecom'), url: 'https://www.friendimobile.com/en-sa/', desc: 'Expat-focused mobile provider with trilingual support.' },
    { name: 'Lebara Mobile', category: t('expatHub.publicServices.telecom'), url: 'https://www.lebara.sa/en/', desc: 'Global telecom brand serving the Saudi expat community.' }
  ];

  const jobPortals = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/jobs/jobs-in-saudi-arabia',
      desc: {
        en: 'The global standard for professional and executive recruitment in the Kingdom.',
        ar: 'المعيار العالمي للتوظيف المهني والتنفيذي في المملكة.',
        ur: 'مملکت میں پیشہ ورانہ اور ایگزیکٹو بھرتی کے لیے عالمی معیار۔'
      },
      tags: ['Professional', 'Vision 2030']
    },
    {
      name: 'Bayt.com',
      url: 'https://www.bayt.com/en/saudi-arabia/',
      desc: {
        en: 'The largest local job site in the Middle East with thousands of Saudi listings.',
        ar: 'أكبر موقع توظيف محلي في الشرق الأوسط مع آلاف الوظائف السعودية.',
        ur: 'مشرق وسطیٰ کی سب سے بڑی مقامی جاب سائٹ جس میں ہزاروں سعودی لسٹنگز ہیں۔'
      },
      tags: ['Local', 'All Sectors']
    },
    {
      name: 'GulfTalent',
      url: 'https://www.gulftalent.com/saudi-arabia/jobs',
      desc: {
        en: 'Premium recruitment portal focused on professional roles across the GCC.',
        ar: 'بوابة توظيف متميزة تركز على الأدوار المهنية في جميع أنحاء دول مجلس التعاون الخليجي.',
        ur: 'پریمیم بھرتی پورٹل جو پورے جی سی سی میں پیشہ ورانہ کرداروں پر مرکوز ہے۔'
      },
      tags: ['GCC Wide', 'Executive']
    },
    {
      name: 'Naukrigulf',
      url: 'https://www.naukrigulf.com/jobs-in-saudi-arabia',
      desc: {
        en: 'Highly popular for construction, healthcare, and hospitality sectors.',
        ar: 'شعبية كبيرة لقطاعات الإنشاءات والرعاية الصحية والضيافة.',
        ur: 'تعمیرات، صحت کی دیکھ بھال، اور مہمان نوازی کے شعبوں کے لیے انتہائی مقبول۔'
      },
      tags: ['Agencies', 'Technical']
    }
  ];

  return (
    <div className="bg-paper min-h-screen relative overflow-hidden">
      <SEO 
        title={t('expatHub.title')} 
        description={t('expatHub.subtitle')}
      />
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] emerald-gradient opacity-[0.03] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] gold-gradient opacity-[0.03] rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 pt-40 pb-32 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-6 py-2 gold-gradient text-primary rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-8 shadow-xl">
              {currentLang === 'ar' ? 'مركز المواهب العالمية' : currentLang === 'ur' ? 'عالمی ٹیلنٹ ہب' : 'Global Talent Hub'}
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-8 leading-tight">
              {t('expatHub.title')}
            </h1>
            <p className="text-gray-500 text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
              {t('expatHub.subtitle')}
            </p>
          </motion.div>
        </div>

        {/* Live Regulatory Feed (RESTORED AS MAIN SECTION) */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 bg-white rounded-[3rem] p-10 md:p-16 border border-gray-100 premium-shadow relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 emerald-gradient opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6 relative z-10">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 emerald-gradient text-white rounded-2xl flex items-center justify-center premium-shadow">
                <Rss size={32} />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
                  {t('expatHub.regulatoryFeed')}
                </h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className="flex items-center gap-2 text-[10px] font-bold text-green-500 bg-green-50 px-3 py-1 rounded-full animate-pulse border border-green-100">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    LIVE UPDATES
                  </span>
                  <p className="text-xs text-gray-400 font-medium tracking-widest uppercase">SPA & HRSD Intelligence</p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-start gap-4 p-4 bg-paper rounded-2xl border border-gray-100 max-w-md">
              <Info className="text-secondary shrink-0" size={18} />
              <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
                {t('expatHub.spaSource')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {rssFeed.map((item, idx) => (
              <motion.div 
                key={`rss-item-${item.id || idx}`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group bg-paper p-8 rounded-[2rem] border border-transparent hover:border-secondary/30 hover:bg-white hover:shadow-xl transition-all h-full flex flex-col"
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="px-3 py-1 bg-white text-secondary text-[10px] font-bold rounded-lg uppercase tracking-widest border border-gray-50 shadow-sm">{item.source}</span>
                  <span className="text-[10px] text-gray-400 font-medium">{item.time}</span>
                </div>
                <h4 className="text-xl font-serif font-bold text-primary group-hover:text-secondary transition-colors leading-snug mb-6 flex-grow">
                  {item.title[currentLang]}
                </h4>
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2 hover:text-primary transition-colors border-t border-gray-100 pt-6"
                >
                  {t('expatHub.officialSource')} <ExternalLink size={12} />
                </a>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Connectivity Advisory */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 p-8 bg-white rounded-[2.5rem] premium-shadow border border-emerald-100 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group"
        >
          <div className="absolute inset-0 emerald-gradient opacity-[0.02] group-hover:opacity-[0.05] transition-opacity" />
          <div className="w-20 h-20 emerald-gradient text-white rounded-2xl flex items-center justify-center shrink-0 premium-shadow relative z-10">
            <ShieldCheck size={40} />
          </div>
          <div className="flex-grow text-center md:text-left rtl:md:text-right relative z-10">
            <h3 className="text-primary font-serif font-bold text-2xl mb-2">
              {currentLang === 'ar' ? 'تنبيه حول الوصول إلى البوابات الحكومية' : currentLang === 'ur' ? 'سرکاری پورٹلز تک رسائی کے بارے میں مشورہ' : 'Government Portal Access Advisory'}
            </h3>
            <p className="text-gray-500 text-lg font-light leading-relaxed">
              {currentLang === 'ar' 
                ? 'البوابات الحكومية السعودية (.gov.sa) مقيدة جغرافياً بشكل صارم. إذا كنت خارج المملكة، قد تواجه رسائل "محجوب" أو "انتهت المهلة". نوصي باستخدام VPN سعودي أو البحث عن المستندات عبر جوجل.' 
                : currentLang === 'ur'
                ? 'سعودی سرکاری پورٹلز (.gov.sa) جغرافیائی طور پر سختی سے محدود ہیں۔ اگر آپ سعودی عرب سے باہر ہیں، تو آپ کو "بلاک" یا "ٹائم آؤٹ" کے پیغامات مل سکتے ہیں۔ ہم سعودی وی پی این استعمال کرنے کی سفارش کرتے ہیں۔'
                : 'Saudi government portals (.gov.sa) are strictly geo-fenced. If you are accessing from outside the Kingdom, you may encounter "Blocked" or "Timeout" messages. We recommend using a Saudi-based VPN or searching for specific documents on Google.'}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-16 md:gap-20">
          {/* Main Content: Guides */}
          <div className="space-y-24">
            <section>
              <div className="flex items-center gap-6 mb-12">
                <div className="w-3 h-12 emerald-gradient rounded-full" />
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
                  {currentLang === 'ar' ? 'أدلة الإقامة والعمل' : currentLang === 'ur' ? 'رہائش اور لیبر گائیڈز' : 'Residency & Labor Guides'}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {expatGuides.filter(g => g.category !== 'Lifestyle').map((guide, idx) => (
                  <motion.div
                    key={guide.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    onClick={() => setSelectedGuide(guide)}
                    className="bg-white p-10 rounded-[2.5rem] premium-shadow border border-gray-100 hover:-translate-y-2 transition-all cursor-pointer group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 emerald-gradient opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                    <div className="w-16 h-16 bg-paper text-secondary rounded-2xl flex items-center justify-center mb-8 group-hover:emerald-gradient group-hover:text-white transition-all premium-shadow relative z-10">
                      {getIcon(guide.icon)}
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-primary mb-4 group-hover:text-secondary transition-colors relative z-10">
                      {guide.title[currentLang]}
                    </h3>
                    <p className="text-gray-500 text-lg font-light leading-relaxed mb-8 relative z-10">
                      {guide.excerpt[currentLang]}
                    </p>
                    <div className="flex items-center gap-3 text-secondary font-bold text-xs uppercase tracking-widest relative z-10">
                      {currentLang === 'ar' ? 'اقرأ الدليل الكامل' : currentLang === 'ur' ? 'مکمل گائیڈ پڑھیں' : 'Read Full Guide'}
                      <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Public Services Section */}
            <section className="bg-white rounded-[3rem] p-10 md:p-16 border border-gray-100 premium-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 gold-gradient opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <div className="mb-16 relative z-10">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
                  {t('expatHub.publicServices.title')}
                </h2>
                <p className="text-gray-500 text-xl font-light">
                  {t('expatHub.publicServices.subtitle')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {publicServices.map((service, idx) => (
                  <motion.a
                    key={`public-service-${service.name}-${idx}`}
                    href={service.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className="flex flex-col p-8 bg-paper rounded-[2rem] border border-transparent hover:border-secondary/30 hover:bg-white hover:shadow-xl transition-all group"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <span className="px-4 py-1.5 bg-white text-secondary text-[10px] font-bold rounded-full uppercase tracking-widest border border-gray-100 premium-shadow">
                        {service.category}
                      </span>
                      <ExternalLink size={18} className="text-gray-300 group-hover:text-secondary transition-colors" />
                    </div>
                    <h4 className="text-xl font-serif font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                      {service.name}
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed mb-6 font-light">
                      {service.desc}
                    </p>
                    <span className="text-[10px] font-bold text-secondary flex items-center gap-2 mt-auto uppercase tracking-widest">
                      {t('expatHub.publicServices.visitWebsite')} <ArrowRight size={14} className="rtl:rotate-180" />
                    </span>
                  </motion.a>
                ))}
              </div>
            </section>
            
            {/* Top Job Portals Section */}
            <section className="bg-white rounded-[3rem] p-10 md:p-16 border border-gray-100 premium-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 emerald-gradient opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <div className="mb-16 relative z-10">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6 flex items-center gap-6">
                  <div className="w-16 h-16 emerald-gradient text-white rounded-2xl flex items-center justify-center premium-shadow">
                    <Briefcase size={32} />
                  </div>
                  {currentLang === 'ar' ? 'أهم بوابات الوظائف' : currentLang === 'ur' ? 'ٹاپ جاب پورٹلز' : 'Top Job Portals'}
                </h2>
                <p className="text-gray-500 text-xl font-light">
                  {currentLang === 'ar' 
                    ? 'ابدأ رحلتك المهنية في المملكة من خلال المنصات الأكثر ثقة للوافدين.' 
                    : currentLang === 'ur'
                    ? 'ایکسپٹس کے لیے سب سے زیادہ قابل اعتماد پلیٹ فارمز کے ذریعے مملکت میں اپنے کیریئر کا سفر شروع کریں۔'
                    : 'Start your career journey in the Kingdom through the most trusted platforms for expats.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                {jobPortals.map((portal, idx) => (
                  <motion.a
                    key={`job-portal-${portal.name}-${idx}`}
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="p-10 bg-paper rounded-[2.5rem] border border-transparent hover:border-secondary/30 hover:bg-white hover:shadow-2xl transition-all group"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <h4 className="text-2xl font-serif font-bold text-primary group-hover:text-secondary transition-colors">
                        {portal.name}
                      </h4>
                      <ExternalLink size={24} className="text-gray-300 group-hover:text-secondary transition-colors" />
                    </div>
                    <p className="text-lg text-gray-500 leading-relaxed mb-8 font-light">
                      {portal.desc[currentLang]}
                    </p>
                    <div className="flex flex-wrap gap-3 mt-auto">
                      {portal.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-white text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] rounded-lg border border-gray-100 premium-shadow">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.a>
                ))}
              </div>
            </section>

            {/* Lifestyle Section */}
            <div className="mt-24 bg-primary rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden premium-shadow">
              <div className="absolute inset-0 emerald-gradient opacity-90" />
              <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-16 h-16 gold-gradient rounded-2xl flex items-center justify-center premium-shadow">
                    <Globe className="text-primary" size={32} />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold">
                    {currentLang === 'ar' ? 'نمط الحياة التنفيذي' : currentLang === 'ur' ? 'ایگزیکٹو طرز زندگی' : 'Executive Lifestyle'}
                  </h2>
                </div>
                <p className="text-white/80 text-xl mb-12 max-w-3xl font-light leading-relaxed">
                  {currentLang === 'ar' 
                    ? 'من المدارس الدولية إلى المجتمعات السكنية الفاخرة، نساعدك على الاستقرار في أرقى مناطق المملكة.' 
                    : currentLang === 'ur'
                    ? 'بین الاقوامی اسکولوں سے لے کر پرتعیش رہائشی کمپاؤنڈز تک، ہم آپ کو مملکت کے سب سے معتبر علاقوں میں بسنے میں مدد کرتے ہیں۔'
                    : 'From international schools to luxury residential compounds, we help you settle into the Kingdom\'s most prestigious areas.'}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {expatGuides.filter(g => g.category === 'Lifestyle').map((guide, i) => (
                    <motion.div 
                      key={guide.id} 
                      whileHover={{ x: 10 }}
                      onClick={() => setSelectedGuide(guide)}
                      className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-white/20 transition-all cursor-pointer group"
                    >
                      <div className="w-3 h-3 gold-gradient rounded-full group-hover:scale-150 transition-transform shadow-lg shadow-secondary/50" />
                      <span className="font-serif font-bold text-xl">{guide.title[currentLang]}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for Guides */}
        <AnimatePresence>
          {selectedGuide && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/95 backdrop-blur-xl"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[3rem] overflow-hidden relative shadow-2xl flex flex-col border border-white/20"
              >
                <button 
                  onClick={() => setSelectedGuide(null)}
                  className="absolute top-8 right-8 z-10 w-14 h-14 bg-paper hover:bg-gray-100 rounded-full flex items-center justify-center text-primary transition-all premium-shadow"
                >
                  <X size={28} />
                </button>

                <div className="overflow-y-auto w-full" dir="ltr">
                  <div className="p-10 md:p-20" dir={isRTL ? 'rtl' : 'ltr'}>
                    <div className="flex items-center gap-6 text-secondary text-[10px] font-bold uppercase tracking-[0.3em] mb-12">
                    <span className="gold-gradient text-primary px-4 py-1.5 rounded-full shadow-sm">{selectedGuide.category}</span>
                    <span className="w-2 h-2 emerald-gradient rounded-full" />
                    <span className="text-gray-400">Updated April 2026</span>
                  </div>

                  <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-16 leading-tight">
                    {selectedGuide.title[currentLang]}
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
                      {selectedGuide.content[currentLang]}
                    </ReactMarkdown>
                  </div>

                  <div className="mt-20 p-10 bg-paper rounded-[2.5rem] border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
                    <div className="absolute inset-0 emerald-gradient opacity-[0.02]" />
                    <div className="flex items-center gap-6 relative z-10">
                      <div className="w-16 h-16 emerald-gradient text-white rounded-2xl flex items-center justify-center premium-shadow">
                        <FileText size={32} />
                      </div>
                      <div>
                        <div className="font-serif font-bold text-2xl text-primary">
                          {selectedGuide.reference ? selectedGuide.reference[currentLang] : 'Verified Intelligence'}
                        </div>
                        <div className="text-xs text-secondary font-bold uppercase tracking-widest mt-1">
                          {currentLang === 'ar' ? 'مرجع السياسة الرسمية' : currentLang === 'ur' ? 'سرکاری پالیسی کا حوالہ' : 'Official Policy Reference'}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedGuide(null)}
                      className="emerald-gradient text-white px-12 py-5 rounded-2xl font-bold hover:scale-105 transition-all premium-shadow uppercase tracking-widest text-xs relative z-10"
                    >
                      {currentLang === 'ar' ? 'إغلاق الدليل' : currentLang === 'ur' ? 'گائیڈ بند کریں' : 'Close Guide'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExpatHub;
