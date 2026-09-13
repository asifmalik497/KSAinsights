import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Award, Target, Heart, Shield } from 'lucide-react';
import SEO from '../components/SEO';

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-paper min-h-screen relative overflow-hidden">
      <SEO 
        title={t('nav.about')} 
        description={t('about.hero.subtitle')}
      />
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] emerald-gradient opacity-[0.03] rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] gold-gradient opacity-[0.03] rounded-full blur-[100px] translate-y-1/2 translate-x-1/2" />

      {/* Hero */}
      <section className="pt-40 pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-emerald-gradient mb-10 leading-tight">
              {t('about.hero.title')}
            </h1>
            <p className="text-2xl text-gray-500 font-light leading-relaxed mb-10">
              {t('about.hero.subtitle')}
            </p>
            <p className="text-gray-500 text-lg leading-relaxed font-light">
              {t('about.hero.description')}
            </p>
          </motion.div>
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="rounded-[3rem] overflow-hidden premium-shadow relative z-10"
            >
              <img 
                src="https://picsum.photos/seed/saudi-business/1200/1500" 
                alt="Our Team" 
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 emerald-gradient opacity-20" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-12 -left-12 emerald-gradient p-12 rounded-[2.5rem] premium-shadow text-white max-w-[280px] z-20"
            >
              <div className="text-6xl font-serif font-bold mb-3">10+</div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] opacity-80">{t('about.hero.expertise')}</div>
            </motion.div>

            <div className="absolute -top-12 -right-12 w-48 h-48 gold-gradient opacity-10 rounded-full blur-3xl" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-emerald-gradient mb-8">{t('about.values.title')}</h2>
            <div className="w-32 h-1.5 gold-gradient mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { icon: <Target size={32} />, title: t('about.values.precision.title'), desc: t('about.values.precision.desc') },
              { icon: <Shield size={32} />, title: t('about.values.integrity.title'), desc: t('about.values.integrity.desc') },
              { icon: <Award size={32} />, title: t('about.values.excellence.title'), desc: t('about.values.excellence.desc') },
              { icon: <Heart size={32} />, title: t('about.values.commitment.title'), desc: t('about.values.commitment.desc') }
            ].map((value, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-12 rounded-[3rem] premium-shadow border border-gray-100 text-center group hover:-translate-y-2 transition-all"
              >
                <div className="w-20 h-20 emerald-gradient text-white rounded-[1.5rem] flex items-center justify-center mx-auto mb-10 group-hover:premium-shadow transition-all">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-6 group-hover:text-secondary transition-colors">{value.title}</h3>
                <p className="text-gray-500 text-lg font-light leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision 2030 Alignment */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-0 emerald-gradient opacity-90" />
        
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px]" />
        
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-7xl font-serif font-bold text-white mb-10 leading-tight">{t('about.vision.title')}</h2>
            <p className="text-2xl text-white/70 font-light leading-relaxed mb-16 max-w-3xl mx-auto">
              {t('about.vision.text')}
            </p>
            <Link 
              to="/contact"
              className="inline-block px-12 py-6 gold-gradient text-primary font-bold rounded-full uppercase tracking-[0.2em] text-sm hover:premium-shadow hover:scale-105 transition-all"
            >
              {t('about.vision.cta')}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
