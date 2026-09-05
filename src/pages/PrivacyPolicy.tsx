import React from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, Lock, Eye, FileText, Globe, Bell } from 'lucide-react';
import { motion } from 'motion/react';
import SEO from '../components/SEO';

const PrivacyPolicy: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <div className="min-h-screen bg-paper relative overflow-hidden">
      <SEO 
        title={t('privacy.title')} 
        description={t('privacy.intro.content').substring(0, 160)}
      />
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] emerald-gradient opacity-[0.03] rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] gold-gradient opacity-[0.03] rounded-full blur-[100px] translate-y-1/2 translate-x-1/2" />

      <div className="max-w-4xl mx-auto px-4 pt-40 pb-32 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[4rem] p-10 md:p-20 premium-shadow border border-gray-100 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 emerald-gradient opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="flex flex-col md:flex-row md:items-center gap-8 mb-16 relative z-10">
            <div className="w-20 h-20 emerald-gradient rounded-[1.5rem] flex items-center justify-center text-white premium-shadow">
              <Shield size={36} />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-4">
                {t('privacy.title')}
              </h1>
              <p className="text-gray-400 font-light italic text-lg">
                {t('privacy.lastUpdated')}: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="space-y-16 text-gray-500 leading-relaxed relative z-10">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-primary mb-6 flex items-center gap-4">
                <Globe size={24} className="text-secondary" />
                {t('privacy.intro.title')}
              </h2>
              <p className="text-lg font-light leading-relaxed">{t('privacy.intro.content')}</p>
            </section>

            {/* Data Collection */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-primary mb-6 flex items-center gap-4">
                <Eye size={24} className="text-secondary" />
                {t('privacy.collection.title')}
              </h2>
              <p className="text-lg font-light leading-relaxed mb-6">{t('privacy.collection.content')}</p>
              <ul className="space-y-4 ml-4">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="flex items-start gap-3 text-lg font-light">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2.5 flex-shrink-0" />
                    {t(`privacy.collection.item${i}`)}
                  </li>
                ))}
              </ul>
            </section>

            {/* Google AdSense & Cookies */}
            <section className="bg-paper p-10 md:p-12 rounded-[3rem] border border-gray-100 relative overflow-hidden group">
              <div className="absolute inset-0 emerald-gradient opacity-0 group-hover:opacity-[0.02] transition-opacity duration-700" />
              <h2 className="text-2xl font-serif font-bold text-primary mb-6 flex items-center gap-4 relative z-10">
                <Bell size={24} className="text-secondary" />
                {t('privacy.adsense.title')}
              </h2>
              <p className="text-lg font-light leading-relaxed mb-6 relative z-10">{t('privacy.adsense.content')}</p>
              <ul className="space-y-4 ml-4 relative z-10">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="flex items-start gap-3 text-lg font-light">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2.5 flex-shrink-0" />
                    {t(`privacy.adsense.item${i}`)}
                  </li>
                ))}
              </ul>
            </section>

            {/* Saudi PDPL Compliance */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-primary mb-6 flex items-center gap-4">
                <Lock size={24} className="text-secondary" />
                {t('privacy.pdpl.title')}
              </h2>
              <p className="text-lg font-light leading-relaxed">{t('privacy.pdpl.content')}</p>
            </section>

            {/* GDPR Rights */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-primary mb-6 flex items-center gap-4">
                <FileText size={24} className="text-secondary" />
                {t('privacy.gdpr.title')}
              </h2>
              <p className="text-lg font-light leading-relaxed">{t('privacy.gdpr.content')}</p>
            </section>

            {/* Contact */}
            <section className="pt-12 border-t border-gray-100">
              <h2 className="text-2xl font-serif font-bold text-primary mb-6">
                {t('privacy.contact.title')}
              </h2>
              <p className="text-lg font-light leading-relaxed mb-8">{t('privacy.contact.content')}</p>
              <a 
                href="mailto:malikasifjavid099@gmail.com"
                className="inline-block text-2xl font-serif font-bold text-secondary hover:emerald-gradient hover:text-transparent hover:bg-clip-text transition-all"
              >
                malikasifjavid099@gmail.com
              </a>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
