import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle } from 'lucide-react';
import { cn, getLanguage } from '../lib/utils';
import Logo from './Logo';

const SupportWidget: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = getLanguage(i18n.language);
  const [isOpen, setIsOpen] = useState(false);
  const isRTL = currentLang === 'ar' || currentLang === 'ur';

  const socialLinks = {
    whatsapp: 'https://wa.me/1234567890',
    messenger: 'https://m.me/ksainsights',
    telegram: 'https://t.me/ksainsights'
  };

  return (
    <div className={cn(
      "fixed bottom-6 z-[150] flex flex-col items-end",
      isRTL ? "left-6" : "right-6"
    )}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[320px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-[#4a1d1d] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Logo currentLang={currentLang} variant="light" size="xs" className="w-10 h-10 bg-white rounded-full p-0.5" />
                <div>
                  <h3 className="font-serif font-bold text-sm leading-tight">KSA Insights</h3>
                  <p className="text-[10px] opacity-80 uppercase tracking-widest">Support Team</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 bg-gray-50/50">
              <div className="flex gap-3 mb-6">
                <Logo currentLang={currentLang} variant="light" size="xs" className="w-8 h-8 rounded-full p-0.5 shadow-sm border border-gray-100 flex-shrink-0" />
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {t('support.welcome')}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-2 text-right">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">{t('support.startChat')}</p>
                <div className="flex justify-center gap-4">
                  <a 
                    href={socialLinks.whatsapp} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#25d366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </a>
                  <a 
                    href={socialLinks.messenger} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#0084ff] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.303 2.254.464 3.443.464 6.627 0 12-4.974 12-11.111C24 4.974 18.627 0 12 0zm1.291 14.193l-3.076-3.285-5.995 3.285 6.592-7.003 3.153 3.285 5.918-3.285-6.592 7.003z"/></svg>
                  </a>
                  <a 
                    href={socialLinks.telegram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#0088cc] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-.962 4.084-1.362 5.441-.168.575-.347.768-.551.787-.444.041-.781-.293-1.212-.575-.673-.441-1.053-.716-1.706-1.146-.755-.497-.266-.771.165-1.218.113-.117 2.072-1.899 2.11-2.06.005-.02.01-.094-.034-.133-.044-.039-.109-.026-.156-.015-.066.015-1.122.712-3.164 2.094-.299.205-.57.305-.813.299-.267-.006-.782-.151-1.164-.275-.468-.152-.84-.233-.808-.492.017-.135.202-.273.556-.415 2.17-.944 3.617-1.567 4.341-1.868 2.069-.859 2.498-1.008 2.779-1.013.062-.001.201.015.291.088.076.061.097.144.105.208.008.064.01.204-.006.273z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#ef4444] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
      >
        <MessageCircle size={28} />
      </button>
    </div>
  );
};

export default SupportWidget;
