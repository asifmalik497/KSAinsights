import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ChevronRight, HelpCircle, Search, Mic, MicOff } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn, getLanguage } from '../lib/utils';
import SEO from '../components/SEO';

const FAQ: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const currentLang = getLanguage(i18n.language);

  const faqKeys = ['q_top10', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10'];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqKeys.map(key => ({
      "@type": "Question",
      "name": t(`consultancy.faq.${key}.q`),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": t(`consultancy.faq.${key}.a`)
      }
    }))
  };

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Your browser does not support voice search. Please try Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = i18n.language === 'ar' ? 'ar-SA' : i18n.language === 'ur' ? 'ur-PK' : 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const filteredFaqKeys = faqKeys.filter(key => {
    const question = t(`consultancy.faq.${key}.q`).toLowerCase();
    const answer = t(`consultancy.faq.${key}.a`).toLowerCase();
    const query = searchQuery.toLowerCase();
    return question.includes(query) || answer.includes(query);
  });

  return (
    <div className="bg-paper min-h-screen relative overflow-hidden">
      <SEO 
        title={t('footer.faqTitle')} 
        description={currentLang === 'ar' 
          ? 'كل ما تحتاج لمعرفته حول تأسيس الأعمال واللوائح في المملكة العربية السعودية.' 
          : currentLang === 'ur'
          ? 'سعودی عرب میں کاروبار کے آغاز اور قواعد و ضوابط کے بارے میں وہ سب کچھ جو آپ کو جاننے کی ضرورت ہے۔'
          : 'Everything you need to know about business setup and regulations in Saudi Arabia.'}
        jsonLd={faqJsonLd}
      />
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] emerald-gradient opacity-[0.03] rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] gold-gradient opacity-[0.03] rounded-full blur-[100px] translate-y-1/2 translate-x-1/2" />

      <div className="max-w-4xl mx-auto px-4 pt-40 pb-32 relative z-10">
        {/* Header */}
        <div className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center w-24 h-24 emerald-gradient text-white rounded-[2rem] mb-10 premium-shadow"
          >
            <HelpCircle size={48} />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-8 leading-tight">
            {t('footer.faqTitle')}
          </h1>
          <p className="text-gray-500 text-xl md:text-2xl max-w-2xl mx-auto font-light leading-relaxed mb-16">
            {currentLang === 'ar' 
              ? 'كل ما تحتاج لمعرفته حول تأسيس الأعمال واللوائح في المملكة العربية السعودية.' 
              : currentLang === 'ur'
              ? 'سعودی عرب میں کاروبار کے آغاز اور قواعد و ضوابط کے بارے میں وہ سب کچھ جو آپ کو جاننے کی ضرورت ہے۔'
              : 'Everything you need to know about business setup and regulations in Saudi Arabia.'}
          </p>

          {/* Search Bar */}
          <div className="relative w-full max-w-2xl mx-auto mb-20">
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-secondary" size={28} />
            <input 
              type="text" 
              placeholder={t('blog.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-100 rounded-[2.5rem] py-7 pl-20 pr-20 focus:outline-none focus:border-secondary transition-all premium-shadow text-xl font-light"
            />
            <button
              onClick={startListening}
              className={cn(
                "absolute right-8 top-1/2 -translate-y-1/2 transition-all duration-300",
                isListening ? "text-secondary scale-125" : "text-gray-400 hover:text-secondary"
              )}
              title="Voice Search"
            >
              {isListening ? (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <Mic size={28} />
                </motion.div>
              ) : (
                <Mic size={28} />
              )}
            </button>
            {isListening && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -top-14 left-1/2 -translate-x-1/2 emerald-gradient text-white px-8 py-3 rounded-full text-sm font-bold premium-shadow whitespace-nowrap"
              >
                Listening...
              </motion.div>
            )}
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-8">
          {filteredFaqKeys.map((key, idx) => (
            <motion.details
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group bg-white rounded-[3rem] border border-gray-100 overflow-hidden transition-all hover:border-secondary/30 premium-shadow"
            >
              <summary className="flex justify-between items-center p-10 cursor-pointer list-none">
                <span className="text-xl md:text-2xl font-serif font-bold text-primary pr-10 leading-tight group-hover:text-secondary transition-colors">
                  {t(`consultancy.faq.${key}.q`)}
                </span>
                <span className="flex-shrink-0 w-12 h-12 bg-paper rounded-full flex items-center justify-center text-secondary group-open:emerald-gradient group-open:text-white transition-all premium-shadow">
                  <ChevronRight size={28} className={cn("rotate-90 group-open:-rotate-90 transition-transform", currentLang !== 'en' && "rotate-270 group-open:rotate-90")} />
                </span>
              </summary>
              <div className="px-10 pb-10 text-gray-500 text-lg font-light leading-relaxed border-t border-gray-50 pt-8">
                <div className="markdown-body">
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
                    {t(`consultancy.faq.${key}.a`)}
                  </ReactMarkdown>
                </div>
              </div>
            </motion.details>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-32 p-16 md:p-24 bg-primary rounded-[4rem] text-center text-white relative overflow-hidden premium-shadow">
          <div className="absolute inset-0 emerald-gradient opacity-90" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">
              {currentLang === 'ar' ? 'لا تزال لديك أسئلة؟' : currentLang === 'ur' ? 'کیا اب بھی کوئی سوال ہے؟' : 'Still have questions?'}
            </h2>
            <p className="text-white/70 text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed">
              {currentLang === 'ar' 
                ? 'فريق الخبراء لدينا هنا لمساعدتك في التنقل في كل خطوة من رحلتک الاستثمارية.' 
                : currentLang === 'ur'
                ? 'ہماری ماہرین کی ٹیم آپ کے سرمایہ کاری کے سفر کے ہر قدم پر آپ کی رہنمائی کے لیے موجود ہے۔'
                : 'Our team of experts is here to help you navigate every step of your investment journey.'}
            </p>
            <a
              href="/contact"
              className="inline-block gold-gradient text-primary px-14 py-6 rounded-full font-bold text-sm uppercase tracking-[0.2em] hover:scale-105 transition-all premium-shadow"
            >
              {t('nav.contact')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
