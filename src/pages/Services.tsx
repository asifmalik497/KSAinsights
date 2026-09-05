import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Briefcase, Gavel, LineChart, Globe, Building2, UserCheck } from 'lucide-react';
import SEO from '../components/SEO';

import { getLanguage } from '../lib/utils';

const Services: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = getLanguage(i18n.language);

  const insights = [
    {
      icon: <Building2 size={40} />,
      title: currentLang === 'ar' ? 'أدلة تأسيس الأعمال' : currentLang === 'ur' ? 'کاروبار شروع کرنے کی گائیڈز' : 'Business Setup Guides',
      desc: currentLang === 'ar' ? 'وثائق خطوة بخطوة حول تراخيص وزارة الاستثمار، وتسجيل السجل التجاري، والمتطلبات القانونية للكيانات الأجنبية.' : currentLang === 'ur' ? 'میسا لائسنس، سی آر رجسٹریشن، اور غیر ملکی اداروں کے لیے قانونی تقاضوں پر مرحلہ وار دستاویزات۔' : 'Step-by-step documentation on MISA licenses, CR registration, and legal requirements for foreign entities.',
      path: '/blog?category=Business'
    },
    {
      icon: <Gavel size={40} />,
      title: currentLang === 'ar' ? 'تتبع الأنظمة' : currentLang === 'ur' ? 'ریگولیٹری ٹریکنگ' : 'Regulatory Tracking',
      desc: currentLang === 'ar' ? 'تحديثات في الوقت الفعلي حول قوانين العمل السعودية، والقوانين التجارية، والمراسيم الحكومية الجديدة.' : currentLang === 'ur' ? 'سعودی لیبر قوانین، تجارتی ضوابط، اور نئے حکومتی احکامات پر لائیو اپ ڈیٹس۔' : 'Real-time updates on Saudi labor laws, commercial codes, and new government decrees.',
      path: '/blog?category=Vision 2030'
    },
    {
      icon: <LineChart size={40} />,
      title: currentLang === 'ar' ? 'استخبارات السوق' : currentLang === 'ur' ? 'مارکیٹ انٹیلیجنس' : 'Market Intelligence',
      desc: currentLang === 'ar' ? 'تحليل مدفوع بالبيانات لاتجاهات المستهلكين، وتحركات المنافسين، والقطاعات عالية النمو.' : currentLang === 'ur' ? 'صارفین کے رجحانات، حریفوں کی نقل و حرکت، اور تیزی سے بڑھتے ہوئے شعبوں کا ڈیٹا پر مبنی تجزیہ۔' : 'Data-driven analysis of consumer trends, competitor movements, and high-growth sectors.',
      path: '/blog?category=Business'
    },
    {
      icon: <Globe size={40} />,
      title: currentLang === 'ar' ? 'تحليل رؤية 2030' : currentLang === 'ur' ? 'ویژن 2030 کا تجزیہ' : 'Vision 2030 Analysis',
      desc: currentLang === 'ar' ? 'تعمق في المشاريع العملاقة مثل نيوم والبحر الأحمر والقدية للتخطيط الاستراتيجي.' : currentLang === 'ur' ? 'اسٹریٹجک منصوبہ بندی کے لیے نیوم، بحیرہ احمر، اور قدیہ جیسے میگا پروجیکٹس کا گہرا مطالعہ۔' : 'Deep dives into mega-projects like NEOM, the Red Sea, and Qiddiya for strategic planning.',
      path: '/blog?category=Vision 2030'
    },
    {
      icon: <Briefcase size={40} />,
      title: currentLang === 'ar' ? 'رؤى تشغيلية' : currentLang === 'ur' ? 'آپریشنل بصیرت' : 'Operational Insights',
      desc: currentLang === 'ar' ? 'أدلة عملية حول إدارة العلاقات الحكومية، وحصص التأشيرات، وتصاريح التشغيل المحلية.' : currentLang === 'ur' ? 'حکومتی تعلقات، ویزا کوٹہ، اور مقامی آپریشنل اجازت ناموں کے انتظام پر عملی گائیڈز۔' : 'Practical guides on managing government relations, visa quotas, and local operational permits.',
      path: '/blog?category=Business'
    },
    {
      icon: <UserCheck size={40} />,
      title: currentLang === 'ar' ? 'اتجاهات رأس المال البشری' : currentLang === 'ur' ? 'ہیومن کیپیٹل کے رجحانات' : 'Human Capital Trends',
      desc: currentLang === 'ar' ? 'تحليل لسوق العمل السعودي، وتحديثات التوطين (نطاقات)، واستراتيجيات جذب المواهب.' : currentLang === 'ur' ? 'سعودی لیبر مارکیٹ کا تجزیہ، سعودائزیشن (نطاقات) اپ ڈیٹس، اور ٹیلنٹ کے حصول کی حکمت عملی۔' : 'Analysis of the Saudi labor market, Saudization (Nitaqat) updates, and talent acquisition strategies.',
      path: '/blog?category=Business'
    }
  ];

  return (
    <div className="bg-paper min-h-screen relative overflow-hidden">
      <SEO 
        title={currentLang === 'ar' ? 'رؤى السوق' : currentLang === 'ur' ? 'مارکیٹ بصیرت' : 'Market Insights'} 
        description={currentLang === 'ar' 
          ? 'استخبارات أعمال شاملة لتأسيس وتعزيز تواجدك في المملكة.' 
          : currentLang === 'ur'
          ? 'مملکت میں اپنی موجودگی قائم کرنے اور بڑھانے کے لیے جامع بزنس انٹیلیجنس۔'
          : 'Comprehensive business intelligence for establishing and growing your presence in the Kingdom.'}
      />
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] emerald-gradient opacity-[0.03] rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] gold-gradient opacity-[0.03] rounded-full blur-[100px] translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 pt-40 pb-32 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-emerald-gradient mb-8 leading-tight">
              {currentLang === 'ar' ? 'رؤى السوق' : currentLang === 'ur' ? 'مارکیٹ بصیرت' : 'Market Insights'}
            </h1>
            <p className="text-gray-500 text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
              {currentLang === 'ar' 
                ? 'استخبارات أعمال شاملة لتأسيس وتعزيز تواجدك في المملكة.' 
                : currentLang === 'ur'
                ? 'مملکت میں اپنی موجودگی قائم کرنے اور بڑھانے کے لیے جامع بزنس انٹیلیجنس۔'
                : 'Comprehensive business intelligence for establishing and growing your presence in the Kingdom.'}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
          {insights.map((insight, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-12 rounded-[3rem] premium-shadow border border-gray-100 hover:-translate-y-2 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 emerald-gradient opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              <div className="w-20 h-20 emerald-gradient text-white rounded-2xl flex items-center justify-center mb-10 group-hover:premium-shadow transition-all relative z-10">
                {insight.icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-6 group-hover:text-secondary transition-colors relative z-10">{insight.title}</h3>
              <p className="text-gray-500 text-lg font-light leading-relaxed mb-10 relative z-10">
                {insight.desc}
              </p>
              <Link 
                to={insight.path}
                className="text-secondary font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-3 group/btn relative z-10"
              >
                {currentLang === 'ar' ? 'عرض التقارير' : currentLang === 'ur' ? 'رپورٹس دیکھیں' : 'View Reports'} 
                <Globe size={18} className="group-hover/btn:rotate-180 transition-transform duration-700" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <div className="mt-48 bg-primary rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden premium-shadow">
          <div className="absolute inset-0 emerald-gradient opacity-90" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          
          <div className="relative z-10">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 text-gold-gradient">Our Intelligence Framework</h2>
              <p className="text-white/60 text-xl font-light max-w-2xl mx-auto">
                A rigorous methodology for delivering verified Saudi market intelligence.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {[
                { step: '01', title: 'Data Collection', desc: 'Aggregating data from official Saudi government sources and market feeds.' },
                { step: '02', title: 'Expert Curation', desc: 'Filtering noise to provide actionable business intelligence.' },
                { step: '03', title: 'Bilingual Reporting', desc: 'Delivering insights in both English and Arabic for global accessibility.' },
                { step: '04', title: 'Strategic Connect', desc: 'Connecting our readers with verified local legal and business partners.' }
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="text-8xl font-serif font-bold text-white/5 mb-6 group-hover:text-secondary/10 transition-colors">{item.step}</div>
                  <h4 className="text-2xl font-serif font-bold text-secondary mb-4">{item.title}</h4>
                  <p className="text-white/60 text-lg font-light leading-relaxed">{item.desc}</p>
                  {idx < 3 && <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-px bg-white/10" />}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
