import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';

const CookieConsent: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (type: 'all' | 'none' | 'settings') => {
    if (type !== 'settings') {
      localStorage.setItem('cookie-consent', type);
      setIsVisible(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] w-[90%] max-w-2xl"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 md:p-8 text-center">
            <p className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
              {t('cookies.message')}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => handleConsent('all')}
                className="px-8 py-2.5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold rounded-lg transition-colors text-sm md:text-base shadow-sm"
              >
                {t('cookies.accept')}
              </button>
              <button
                onClick={() => handleConsent('none')}
                className="px-8 py-2.5 bg-[#ef4444] hover:bg-[#dc2626] text-white font-bold rounded-lg transition-colors text-sm md:text-base shadow-sm"
              >
                {t('cookies.reject')}
              </button>
              <button
                onClick={() => handleConsent('settings')}
                className="px-8 py-2.5 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold rounded-lg transition-colors text-sm md:text-base shadow-sm"
              >
                {t('cookies.settings')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
