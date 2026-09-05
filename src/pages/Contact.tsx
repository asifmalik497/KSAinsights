import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Send, MessageSquare, Clock, CheckCircle2, Loader2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, OperationType, handleFirestoreError } from '../firebase';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: t('contact.form.subjects.general'),
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const path = 'contact_inquiries';
      await addDoc(collection(db, path), {
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: t('contact.form.subjects.general'),
        message: ''
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'contact_inquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-paper min-h-screen relative overflow-hidden">
      <SEO 
        title={t('contact.title')} 
        description={t('contact.subtitle')}
      />
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] emerald-gradient opacity-[0.03] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] gold-gradient opacity-[0.03] rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 pt-40 pb-32 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-8 leading-tight">
              {t('contact.title')}
            </h1>
            <p className="text-gray-500 text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
              {t('contact.subtitle')}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 md:gap-20">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-10 rounded-[2.5rem] premium-shadow border border-gray-100 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 emerald-gradient opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-150 duration-700" />
              <div className="flex items-start gap-6 relative z-10">
                <div className="w-16 h-16 emerald-gradient rounded-2xl flex items-center justify-center text-white premium-shadow shrink-0">
                  <MessageSquare size={32} />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-2xl text-primary mb-2">{t('contact.info.email.title')}</h3>
                  <p className="text-gray-500 text-lg font-light leading-relaxed">support@ksainsights.com</p>
                  <p className="text-secondary font-bold text-xs mt-3 uppercase tracking-widest">{t('contact.info.email.subtitle')}</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-white p-10 rounded-[2.5rem] premium-shadow border border-gray-100 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 emerald-gradient opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-150 duration-700" />
              <div className="flex items-start gap-6 relative z-10">
                <div className="w-16 h-16 gold-gradient rounded-2xl flex items-center justify-center text-primary premium-shadow shrink-0">
                  <Phone size={32} />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-2xl text-primary mb-2">{t('contact.info.phone.title')}</h3>
                  <p className="text-gray-500 text-lg font-light leading-relaxed">+966 50 000 0000</p>
                  <p className="text-secondary font-bold text-xs mt-3 uppercase tracking-widest">{t('contact.info.phone.subtitle')}</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-primary text-white p-10 rounded-[2.5rem] premium-shadow relative overflow-hidden group"
            >
              <div className="absolute inset-0 emerald-gradient opacity-90" />
              <div className="relative z-10">
                <h3 className="font-serif font-bold text-2xl mb-6 text-secondary">Global Support</h3>
                <p className="text-white/70 text-lg font-light leading-relaxed mb-8">
                  Our strategic advisors are available across multiple time zones to support your entry into the Saudi market.
                </p>
                <div className="flex items-center gap-4 text-secondary font-bold text-sm uppercase tracking-widest">
                  <Clock size={20} />
                  24/7 Strategic Advisory
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-10 md:p-16 rounded-[3rem] premium-shadow border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 gold-gradient opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-10 relative z-10"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] ml-2">{t('contact.name')}</label>
                        <input 
                          required
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={t('contact.form.placeholders.name')}
                          className="w-full bg-paper border border-transparent rounded-2xl px-8 py-5 focus:outline-none focus:border-secondary focus:bg-white transition-all premium-shadow font-medium text-primary"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] ml-2">{t('contact.email')}</label>
                        <input 
                          required
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder={t('contact.form.placeholders.email')}
                          className="w-full bg-paper border border-transparent rounded-2xl px-8 py-5 focus:outline-none focus:border-secondary focus:bg-white transition-all premium-shadow font-medium text-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] ml-2">{t('contact.form.subject')}</label>
                      <div className="relative">
                        <select 
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full bg-paper border border-transparent rounded-2xl px-8 py-5 focus:outline-none focus:border-secondary focus:bg-white transition-all premium-shadow font-medium text-primary appearance-none"
                        >
                          <option>{t('contact.form.subjects.general')}</option>
                          <option>{t('contact.form.subjects.setup')}</option>
                          <option>{t('contact.form.subjects.legal')}</option>
                          <option>{t('contact.form.subjects.investment')}</option>
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-secondary">
                          <Send size={18} className="rotate-90" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] ml-2">{t('contact.message')}</label>
                      <textarea 
                        required
                        rows={6}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={t('contact.form.placeholders.message')}
                        className="w-full bg-paper border border-transparent rounded-2xl px-8 py-5 focus:outline-none focus:border-secondary focus:bg-white transition-all premium-shadow font-medium text-primary resize-none"
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      disabled={loading}
                      className="w-full emerald-gradient text-white py-6 rounded-2xl font-bold text-sm uppercase tracking-[0.2em] hover:scale-[1.02] transition-all premium-shadow flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                      {t('contact.submit')}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
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
            </motion.div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-48">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">{t('contact.faq.title')}</h2>
            <p className="text-gray-500 text-xl font-light">{t('contact.faq.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-10 rounded-[2.5rem] premium-shadow border border-gray-100 group"
            >
              <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-8 group-hover:emerald-gradient group-hover:text-white transition-all">
                <MessageSquare size={28} />
              </div>
              <h4 className="text-2xl font-serif font-bold text-primary mb-4">
                {t('contact.faq.q1.q')}
              </h4>
              <p className="text-gray-500 text-lg font-light leading-relaxed">{t('contact.faq.q1.a')}</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-10 rounded-[2.5rem] premium-shadow border border-gray-100 group"
            >
              <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-8 group-hover:emerald-gradient group-hover:text-white transition-all">
                <Clock size={28} />
              </div>
              <h4 className="text-2xl font-serif font-bold text-primary mb-4">
                {t('contact.faq.q2.q')}
              </h4>
              <p className="text-gray-500 text-lg font-light leading-relaxed">{t('contact.faq.q2.a')}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
