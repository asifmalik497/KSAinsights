import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Briefcase, Scale, Building2, Send, CheckCircle2, X, ExternalLink, Loader2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, OperationType, handleFirestoreError } from '../firebase';
import { cn, getLanguage } from '../lib/utils';
import SEO from '../components/SEO';

const Consultancy: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = getLanguage(i18n.language);
  const isRTL = currentLang === 'ar' || currentLang === 'ur';
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    sector: 'Technology',
    needs: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const path = 'consultancy_requests';
      await addDoc(collection(db, path), {
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        sector: 'Technology',
        needs: ''
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'consultancy_requests');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const services = [
    { icon: <Briefcase className="text-secondary" />, key: 'misa' },
    { icon: <Scale className="text-secondary" />, key: 'legal' },
    { icon: <ShieldCheck className="text-secondary" />, key: 'tax' },
    { icon: <Building2 className="text-secondary" />, key: 'office' }
  ];

  return (
    <div className="bg-paper min-h-screen">
      <SEO 
        title={t('nav.consultancy')} 
        description={t('consultancy.hero.subtitle')}
      />
      {/* Hero Section */}
      <section className="pt-40 pb-24 emerald-gradient text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/5 skew-x-12 transform translate-x-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-white/5 -skew-x-12 transform -translate-x-20 blur-2xl" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-secondary text-xs font-bold tracking-[0.3em] uppercase mb-10 border border-white/10 shadow-xl">
              <ShieldCheck size={18} className="text-secondary" />
              {t('consultancy.hero.badge')}
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-10 leading-[1.1]">
              {t('consultancy.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-white/70 leading-relaxed mb-12 font-light max-w-2xl">
              {t('consultancy.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Connectivity Advisory */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-16 p-10 bg-white border border-secondary/20 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 premium-shadow relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 gold-gradient opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="w-16 h-16 gold-gradient text-primary rounded-2xl flex items-center justify-center shrink-0 premium-shadow">
              <ShieldCheck size={32} />
            </div>
            <div className="flex-grow">
              <h3 className="text-primary font-serif font-bold text-2xl mb-2">
                Government Portal Access Advisory
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed font-light">
                Saudi government portals (.gov.sa) are strictly geo-fenced. If you are accessing from outside the Kingdom, you may encounter "Blocked" or "Timeout" messages. We recommend using a Saudi-based VPN or searching for specific documents on Google.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedService(service.key)}
                className="p-10 rounded-[2.5rem] transition-all group cursor-pointer border border-gray-100 bg-white hover:border-secondary/50 premium-shadow hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all bg-paper group-hover:emerald-gradient group-hover:text-white premium-shadow">
                  {React.cloneElement(service.icon as React.ReactElement<any>, { 
                    className: "transition-colors group-hover:text-white",
                    size: 32
                  })}
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-6 leading-tight">
                  {t(`consultancy.services.${service.key}.title`)}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light mb-8">
                  {t(`consultancy.services.${service.key}.desc`)}
                </p>
                <div className="mt-auto flex items-center gap-3 text-secondary font-bold text-xs uppercase tracking-widest">
                  {t('consultancy.services.clickForDetails')}
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Pop-up */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-primary/95 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-6xl bg-white rounded-[3rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-white/20"
            >
              <div className="flex justify-between items-center p-8 md:p-12 border-b border-gray-100">
                <h3 className="text-3xl md:text-5xl font-serif font-bold text-primary">
                  {t(`consultancy.services.${selectedService}.title`)}
                </h3>
                <button 
                  onClick={() => setSelectedService(null)}
                  className="w-12 h-12 flex items-center justify-center bg-paper hover:bg-gray-100 rounded-full transition-all premium-shadow"
                >
                  <X size={28} className="text-primary" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto w-full" dir="ltr">
                <div className="p-8 md:p-16" dir={isRTL ? 'rtl' : 'ltr'}>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-20">
                  <div className="lg:col-span-2">
                    <p className="text-xl md:text-2xl text-gray-500 mb-12 leading-relaxed font-light">
                      {t(`consultancy.services.${selectedService}.details.overview`)}
                    </p>
                    
                    <div className="space-y-10">
                      <h4 className="text-2xl font-serif font-bold text-primary flex items-center gap-4">
                        <div className="w-10 h-10 emerald-gradient rounded-xl flex items-center justify-center text-white premium-shadow">
                          <CheckCircle2 size={24} />
                        </div>
                        {t('consultancy.services.modal.requirements')}
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {(t(`consultancy.services.${selectedService}.details.requirements`, { returnObjects: true }) as string[]).map((req) => (
                          <li key={`req-${req}`} className="flex items-start gap-4 text-gray-600 text-sm bg-paper p-6 rounded-2xl border border-gray-100 premium-shadow">
                            <span className="w-2 h-2 emerald-gradient rounded-full mt-1.5 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-16 pt-16 border-t border-gray-100">
                      <h4 className="text-xl font-serif font-bold text-primary mb-6 uppercase tracking-widest">{t('consultancy.services.modal.resources')}</h4>
                      <a 
                        href={t(`consultancy.services.${selectedService}.details.officialLink`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 text-secondary font-bold text-lg hover:underline group"
                      >
                        {t(`consultancy.services.${selectedService}.details.officialName`)}
                        <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </a>
                      {t(`consultancy.services.${selectedService}.details.note`) && (
                        <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl">
                          <p className="text-sm text-amber-800 font-medium italic">
                            {t(`consultancy.services.${selectedService}.details.note`)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-10">
                    <div className="emerald-gradient text-white p-10 rounded-[2.5rem] premium-shadow">
                      <h4 className="font-bold mb-6 text-secondary uppercase tracking-[0.2em] text-[10px]">{t('consultancy.services.modal.timeline')}</h4>
                      <p className="text-3xl font-serif font-bold">{t(`consultancy.services.${selectedService}.details.timeline`)}</p>
                    </div>
                    <div className="bg-paper p-10 rounded-[2.5rem] border border-gray-100 premium-shadow">
                      <h4 className="font-bold text-primary mb-6 opacity-60 uppercase tracking-[0.2em] text-[10px]">{t('consultancy.services.modal.cost')}</h4>
                      <p className="text-2xl text-primary font-serif font-bold">{t(`consultancy.services.${selectedService}.details.cost`)}</p>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedService(null);
                        const form = document.getElementById('consultancy-form');
                        form?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full py-6 gold-gradient text-primary font-bold rounded-[2rem] hover:scale-105 transition-all premium-shadow uppercase tracking-widest text-sm"
                    >
                      {t('consultancy.services.modal.cta')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Inquiry Form Section */}
      <section id="consultancy-form" className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full emerald-gradient opacity-[0.02]" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-10 leading-tight">
                {t('consultancy.form.title')}
              </h2>
              <p className="text-xl text-gray-500 mb-16 font-light leading-relaxed">
                {t('consultancy.form.subtitle')}
              </p>

              <div className="space-y-12">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex gap-8 group">
                    <div className="w-16 h-16 emerald-gradient rounded-2xl flex items-center justify-center flex-shrink-0 text-secondary font-serif font-bold text-2xl premium-shadow group-hover:scale-110 transition-transform">
                      {step}
                    </div>
                    <div>
                      <h4 className="text-2xl font-serif font-bold text-primary mb-3">{t(`consultancy.form.process.step${step}.title`)}</h4>
                      <p className="text-gray-500 text-lg font-light">{t(`consultancy.form.process.step${step}.desc`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-10 md:p-16 rounded-[3rem] border border-gray-100 premium-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 emerald-gradient opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleSubmit} 
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="block text-[10px] font-bold text-primary uppercase tracking-[0.2em] ml-2">{t('consultancy.form.name')}</label>
                        <input 
                          required 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 rounded-2xl bg-paper border border-transparent focus:border-secondary focus:bg-white outline-none transition-all font-medium text-primary premium-shadow" 
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="block text-[10px] font-bold text-primary uppercase tracking-[0.2em] ml-2">{t('consultancy.form.email')}</label>
                        <input 
                          required 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 rounded-2xl bg-paper border border-transparent focus:border-secondary focus:bg-white outline-none transition-all font-medium text-primary premium-shadow" 
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="block text-[10px] font-bold text-primary uppercase tracking-[0.2em] ml-2">{t('consultancy.form.company')}</label>
                        <input 
                          required 
                          type="text" 
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 rounded-2xl bg-paper border border-transparent focus:border-secondary focus:bg-white outline-none transition-all font-medium text-primary premium-shadow" 
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="block text-[10px] font-bold text-primary uppercase tracking-[0.2em] ml-2">{t('consultancy.form.sector')}</label>
                        <select 
                          name="sector"
                          value={formData.sector}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 rounded-2xl bg-paper border border-transparent focus:border-secondary focus:bg-white outline-none transition-all font-medium text-primary premium-shadow appearance-none"
                        >
                          <option>Technology</option>
                          <option>Real Estate</option>
                          <option>Tourism</option>
                          <option>Manufacturing</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="block text-[10px] font-bold text-primary uppercase tracking-[0.2em] ml-2">{t('consultancy.form.needs')}</label>
                      <textarea 
                        required 
                        rows={5} 
                        name="needs"
                        value={formData.needs}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 rounded-2xl bg-paper border border-transparent focus:border-secondary focus:bg-white outline-none transition-all font-medium text-primary premium-shadow resize-none" 
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full py-6 emerald-gradient text-white font-bold rounded-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3 premium-shadow disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-[0.2em] text-xs"
                    >
                      {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                      {t('consultancy.form.submit')}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16"
                  >
                    <div className="w-24 h-24 emerald-gradient text-white rounded-[2rem] flex items-center justify-center mx-auto mb-10 premium-shadow">
                      <CheckCircle2 size={48} />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">{t('consultancy.form.process.successTitle')}</h3>
                    <p className="text-xl text-gray-500 font-light leading-relaxed mb-12">
                      {t('consultancy.form.success')}
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="text-secondary font-bold text-lg hover:underline uppercase tracking-widest"
                    >
                      {t('consultancy.form.process.anotherRequest')}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Consultancy;
