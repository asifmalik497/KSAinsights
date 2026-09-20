import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Calculator, 
  ShieldCheck, 
  ExternalLink, 
  Share2, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Clock, 
  Copy, 
  Check, 
  ChevronDown,
  UserCheck,
  Building2,
  Users,
  Tag,
  Search,
  Sparkles
} from 'lucide-react';

interface TrilingualKeyword {
  id: string;
  lang: 'ur' | 'ar' | 'en';
  cat: 'transfer' | 'fees' | 'huroob' | 'article81' | 'expiry';
  kw: string;
  enDesc: string;
}

const TRILINGUAL_KEYWORDS: TrilingualKeyword[] = [
  // URDU (25 Keywords)
  { id: 'ur-1', lang: 'ur', cat: 'transfer', kw: 'کیوا سے کفالہ ٹرانسفر کا طریقہ', enDesc: 'Qiwa sponsorship transfer method' },
  { id: 'ur-2', lang: 'ur', cat: 'transfer', kw: 'کفیل کی مرضی کے بغیر نقل کفالہ', enDesc: 'Transfer without kafeel approval' },
  { id: 'ur-3', lang: 'ur', cat: 'transfer', kw: 'قوی پلیٹ فارم جاب ٹرانسفر', enDesc: 'Qiwa platform job transfer' },
  { id: 'ur-4', lang: 'ur', cat: 'fees', kw: 'اقامہ تجدید فیس 2026', enDesc: 'Iqama renewal fees 2026' },
  { id: 'ur-5', lang: 'ur', cat: 'fees', kw: 'رخصت عمل مکتب عمل فیس', enDesc: 'Work permit Maktab Amal fee' },
  { id: 'ur-6', lang: 'ur', cat: 'fees', kw: 'مکتب عمل 700 اور 800 فیس', enDesc: 'Maktab Amal 700 and 800 fee' },
  { id: 'ur-7', lang: 'ur', cat: 'huroob', kw: 'ابشر ہروب چیک آن لائن', enDesc: 'Absher Huroob check online' },
  { id: 'ur-8', lang: 'ur', cat: 'huroob', kw: 'ہروب چیک کرنے کا طریقہ', enDesc: 'How to check Huroob status' },
  { id: 'ur-9', lang: 'ur', cat: 'article81', kw: 'سعودی لیبر لاء آرٹیکل 81', enDesc: 'Saudi Labor Law Article 81' },
  { id: 'ur-10', lang: 'ur', cat: 'article81', kw: 'آرٹیکل 81 کے تحت استعفیٰ', enDesc: 'Article 81 resignation rights' },
  { id: 'ur-11', lang: 'ur', cat: 'expiry', kw: 'اقامہ ایکسپائری چیک بغیر پاس ورڈ', enDesc: 'Check Iqama expiry without password' },
  { id: 'ur-12', lang: 'ur', cat: 'fees', kw: 'جوازات اقامہ فیس 650 ریال', enDesc: 'Jawazat Iqama fee 650 SAR' },
  { id: 'ur-13', lang: 'ur', cat: 'fees', kw: 'فیملی ڈیپنڈنٹ لیوی فیس', enDesc: 'Family dependent levy fee' },
  { id: 'ur-14', lang: 'ur', cat: 'transfer', kw: 'ریڈ کیٹگری کمپنی سے نقل کفالہ', enDesc: 'Transfer from red category firm' },
  { id: 'ur-15', lang: 'ur', cat: 'transfer', kw: 'تنخواہ نہ ملنے پر کفالہ ٹرانسفر', enDesc: 'Transfer for 3 months unpaid salary' },
  { id: 'ur-16', lang: 'ur', cat: 'article81', kw: 'مکافأة نهاية الخدمة حقوق', enDesc: 'End-of-service gratuity rights' },
  { id: 'ur-17', lang: 'ur', cat: 'article81', kw: 'سعودی ویج پروٹیکشن سسٹم', enDesc: 'Saudi Wage Protection System WPS' },
  { id: 'ur-18', lang: 'ur', cat: 'transfer', kw: 'قوی کنٹریکٹ ایکسیپٹ کرنے کا طریقہ', enDesc: 'How to accept Qiwa contract' },
  { id: 'ur-19', lang: 'ur', cat: 'article81', kw: 'سعودی لیبر کورٹ آن لائن شکایت', enDesc: 'Saudi Labor Court online dispute' },
  { id: 'ur-20', lang: 'ur', cat: 'expiry', kw: 'چائلڈ لیبر پابندی سعودی قانون', enDesc: 'Child labor ban Article 161' },
  { id: 'ur-21', lang: 'ur', cat: 'expiry', kw: 'نابالغ ملازمین کے کام کے گھنٹے', enDesc: 'Juvenile working hours KSA' },
  { id: 'ur-22', lang: 'ur', cat: 'expiry', kw: '60 سال سے زائد اقامہ تجدید', enDesc: 'Iqama renewal over 60 years' },
  { id: 'ur-23', lang: 'ur', cat: 'transfer', kw: 'کفیل کی اجازت کے بغیر خروج نہائی', enDesc: 'Final exit without sponsor consent' },
  { id: 'ur-24', lang: 'ur', cat: 'expiry', kw: 'ابشر پبلک کوئری اقامہ ایکسپائری', enDesc: 'Absher public query Iqama validity' },
  { id: 'ur-25', lang: 'ur', cat: 'fees', kw: 'خروج و عودہ ویزا فیس 2026', enDesc: 'Exit re-entry visa fees 2026' },

  // ARABIC (25 Keywords)
  { id: 'ar-1', lang: 'ar', cat: 'transfer', kw: 'نقل الكفالة عبر منصة قوى بدون موافقة الكفيل', enDesc: 'Sponsorship transfer via Qiwa without sponsor consent' },
  { id: 'ar-2', lang: 'ar', cat: 'transfer', kw: 'طريقة نقل الكفالة في قوى 2026', enDesc: 'Qiwa sponsorship transfer method 2026' },
  { id: 'ar-3', lang: 'ar', cat: 'fees', kw: 'رسوم تجديد الإقامة ورخصة العمل 2026', enDesc: 'Iqama & work permit renewal fees 2026' },
  { id: 'ar-4', lang: 'ar', cat: 'fees', kw: 'حاسبة المقابل المالي ورسوم المرافقين', enDesc: 'Expat levy and dependent fee calculator' },
  { id: 'ar-5', lang: 'ar', cat: 'fees', kw: 'رسوم الجوازات 650 ريال تجديد الإقامة', enDesc: 'Jawazat fee 650 SAR Iqama renewal' },
  { id: 'ar-6', lang: 'ar', cat: 'huroob', kw: 'الاستعلام عن بلاغ هروب برقم الإقامة', enDesc: 'Query Huroob report by Iqama number' },
  { id: 'ar-7', lang: 'ar', cat: 'huroob', kw: 'الاستعلام عن موظف وافد وزارة الموارد البشرية', enDesc: 'Query expat employee status on HRSD' },
  { id: 'ar-8', lang: 'ar', cat: 'article81', kw: 'المادة 81 من نظام العمل السعودي', enDesc: 'Article 81 of Saudi Labor Law' },
  { id: 'ar-9', lang: 'ar', cat: 'article81', kw: 'شروط الاستقالة بموجب المادة 81 دون إشعار', enDesc: 'Conditions of Article 81 resignation without notice' },
  { id: 'ar-10', lang: 'ar', cat: 'article81', kw: 'حالات فسخ عقد العمل دون موافقة صاحب العمل', enDesc: 'Contract termination without employer approval' },
  { id: 'ar-11', lang: 'ar', cat: 'expiry', kw: 'استعلام عن صلاحية الإقامة وتاريخ الانتهاء أبشر', enDesc: 'Query Iqama validity & expiry date Absher' },
  { id: 'ar-12', lang: 'ar', cat: 'expiry', kw: 'الاستعلام العام عن صلاحية الهوية أبشر أفراد', enDesc: 'Public query of ID validity Absher Individuals' },
  { id: 'ar-13', lang: 'ar', cat: 'article81', kw: 'مكافأة نهاية الخدمة نظام العمل السعودي', enDesc: 'End of service gratuity Saudi labor law' },
  { id: 'ar-14', lang: 'ar', cat: 'transfer', kw: 'نقل خدمة عامل وافد من منشأة حمراء', enDesc: 'Expat service transfer from red establishment' },
  { id: 'ar-15', lang: 'ar', cat: 'transfer', kw: 'تأخر الرواتب 3 أشهر ونقل الكفالة', enDesc: 'Salary delayed 3 months and transfer' },
  { id: 'ar-16', lang: 'ar', cat: 'transfer', kw: 'عدم توثيق العقد في منصة قوى', enDesc: 'Non-authenticated contract on Qiwa' },
  { id: 'ar-17', lang: 'ar', cat: 'article81', kw: 'نظام حماية الأجور السعودي WPS', enDesc: 'Saudi Wage Protection System WPS' },
  { id: 'ar-18', lang: 'ar', cat: 'expiry', kw: 'ضوابط تشغيل الأحداث نظام العمل السعودي', enDesc: 'Juvenile labor regulations Saudi labor law' },
  { id: 'ar-19', lang: 'ar', cat: 'expiry', kw: 'حظر تشغيل الأطفال دون سن 15 المادة 161', enDesc: 'Prohibition of child labor under 15 Article 161' },
  { id: 'ar-20', lang: 'ar', cat: 'expiry', kw: 'تجديد إقامة العامل فوق 60 سنة في السعودية', enDesc: 'Iqama renewal for workers over 60 in KSA' },
  { id: 'ar-21', lang: 'ar', cat: 'transfer', kw: 'شروط نقل الكفالة في النظام الجديد 2026', enDesc: 'Conditions of sponsorship transfer new system 2026' },
  { id: 'ar-22', lang: 'ar', cat: 'article81', kw: 'فترة التجربة في نظام العمل السعودي حقوق العامل', enDesc: 'Probation period employee rights KSA' },
  { id: 'ar-23', lang: 'ar', cat: 'article81', kw: 'رفع دعوى عمالية ناجز وزارة العدل', enDesc: 'File labor dispute on Najiz Ministry of Justice' },
  { id: 'ar-24', lang: 'ar', cat: 'huroob', kw: 'بلاغ التغيب عن العمل وإلغاء الهروب قوى', enDesc: 'Absence report and cancelling Huroob on Qiwa' },
  { id: 'ar-25', lang: 'ar', cat: 'fees', kw: 'تأمين رخصة العمل وتأمين العمالة الوافدة', enDesc: 'Work permit and expat worker insurance' },

  // ENGLISH (25 Keywords)
  { id: 'en-1', lang: 'en', cat: 'transfer', kw: 'Qiwa transfer without current employer consent', enDesc: 'نقل الكفالة في قوى دون موافقة صاحب العمل' },
  { id: 'en-2', lang: 'en', cat: 'transfer', kw: 'How to transfer sponsorship in Saudi Arabia via Qiwa', enDesc: 'طريقة نقل الكفالة عبر منصة قوى' },
  { id: 'en-3', lang: 'en', cat: 'fees', kw: 'Saudi Iqama renewal fee breakdown 2026', enDesc: 'تفصيل رسوم تجديد الإقامة 2026' },
  { id: 'en-4', lang: 'en', cat: 'fees', kw: 'Maktab Amal work permit fee 800 vs 700 SAR', enDesc: 'رسوم رخصة العمل 800 مقابل 700 ريال' },
  { id: 'en-5', lang: 'en', cat: 'fees', kw: 'Jawazat Iqama renewal fee 650 SAR', enDesc: 'رسوم الجوازات 650 ريال للإقامة' },
  { id: 'en-6', lang: 'en', cat: 'huroob', kw: 'How to check Huroob status online Absher', enDesc: 'طريقة الاستعلام عن بلاغ الهروب في أبشر' },
  { id: 'en-7', lang: 'en', cat: 'huroob', kw: 'Check runaway status HRSD Saudi Arabia', enDesc: 'الاستعلام عن حالة التغيب وزارة الموارد البشرية' },
  { id: 'en-8', lang: 'en', cat: 'article81', kw: 'Saudi Labor Law Article 81 resignation', enDesc: 'استقالة بموجب المادة 81 نظام العمل السعودي' },
  { id: 'en-9', lang: 'en', cat: 'article81', kw: 'Resign without notice period Saudi Arabia Article 81', enDesc: 'الاستقالة الفورية دون فترة إنذار' },
  { id: 'en-10', lang: 'en', cat: 'expiry', kw: 'Check Iqama expiry date online without Absher login', enDesc: 'الاستعلام عن صلاحية الإقامة دون تسجيل دخول أبشر' },
  { id: 'en-11', lang: 'en', cat: 'article81', kw: 'End of service benefits calculation Saudi Labor Law', enDesc: 'حساب مكافأة نهاية الخدمة نظام العمل' },
  { id: 'en-12', lang: 'en', cat: 'fees', kw: 'Dependent levy fee calculator Saudi Arabia', enDesc: 'حاسبة المقابل المالي للمرافقين' },
  { id: 'en-13', lang: 'en', cat: 'transfer', kw: 'Red Nitaqat category company sponsorship transfer', enDesc: 'نقل الكفالة من منشأة في النطاق الأحمر' },
  { id: 'en-14', lang: 'en', cat: 'transfer', kw: 'Sponsorship transfer for unpaid salary 3 consecutive months', enDesc: 'نقل الكفالة لعدم استلام الراتب 3 أشهر' },
  { id: 'en-15', lang: 'en', cat: 'article81', kw: 'Wage Protection System KSA compliance rules', enDesc: 'ضوابط الامتثال لنظام حماية الأجور' },
  { id: 'en-16', lang: 'en', cat: 'transfer', kw: 'Qiwa digital contract authentication process', enDesc: 'إجراءات توثيق العقد الرقمي في قوى' },
  { id: 'en-17', lang: 'en', cat: 'article81', kw: 'Saudi Labor Court filing labor dispute online', enDesc: 'رفع دعوى عمالية إلكترونية بالمحكمة' },
  { id: 'en-18', lang: 'en', cat: 'expiry', kw: 'Child labor prohibition Article 161 Saudi Labor Law', enDesc: 'حظر عمل الأطفال المادة 161' },
  { id: 'en-19', lang: 'en', cat: 'expiry', kw: 'Juvenile working hours restrictions Saudi Arabia', enDesc: 'قيود ساعات عمل الأحداث' },
  { id: 'en-20', lang: 'en', cat: 'expiry', kw: 'Iqama renewal after 60 years old regulations KSA', enDesc: 'تجديد الإقامة بعد سن 60 عاماً' },
  { id: 'en-21', lang: 'en', cat: 'fees', kw: 'Exit re-entry visa fees 2026 Saudi Arabia', enDesc: 'رسوم تأشيرة الخروج والعودة 2026' },
  { id: 'en-22', lang: 'en', cat: 'expiry', kw: 'Absher public query Iqama validity', enDesc: 'استعلام أبشر العام عن صلاحية الهوية' },
  { id: 'en-23', lang: 'en', cat: 'transfer', kw: 'Saudi Arabia labor reform initiative 2026', enDesc: 'مبادرة تحسين العلاقة التعاقدية 2026' },
  { id: 'en-24', lang: 'en', cat: 'transfer', kw: 'Final exit visa without sponsor consent', enDesc: 'تأشيرة الخروج النهائي دون موافقة الكفيل' },
  { id: 'en-25', lang: 'en', cat: 'transfer', kw: 'Domestic worker transfer and insurance Qiwa Individual', enDesc: 'نقل وتأمين العمالة المنزلية' }
];

export const QiwaLaborInteractiveHub: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language === 'ar' || i18n.language === 'ur') ? i18n.language : 'en';

  // Age Slab State
  const [selectedAgeSlab, setSelectedAgeSlab] = useState<'under15' | '15to18' | '18to60' | 'above60'>('18to60');

  // Calculator State
  const [nitaqatRatio, setNitaqatRatio] = useState<'equalOrLess' | 'moreThan'>('moreThan'); // 700 vs 800
  const [durationMonths, setDurationMonths] = useState<number>(12);
  const [dependentsCount, setDependentsCount] = useState<number>(0);

  // Guide Walkthrough Step
  const [selectedTopic, setSelectedTopic] = useState<'qiwa' | 'huroob' | 'expiry' | 'article81'>('qiwa');

  // Keywords Filter State
  const [selectedKwLang, setSelectedKwLang] = useState<'all' | 'ur' | 'ar' | 'en'>('all');
  const [selectedKwCategory, setSelectedKwCategory] = useState<'all' | 'transfer' | 'fees' | 'huroob' | 'article81' | 'expiry'>('all');
  const [copiedKeywordId, setCopiedKeywordId] = useState<string | null>(null);
  const [copiedAllKw, setCopiedAllKw] = useState(false);

  // WhatsApp copied state
  const [copied, setCopied] = useState(false);

  // Calculation Math
  const monthlyLaborFee = nitaqatRatio === 'moreThan' ? 800 : 700;
  const totalLaborFee = monthlyLaborFee * durationMonths;
  const annualJawazatFee = 650;
  const proratedJawazat = Math.round((annualJawazatFee / 12) * durationMonths);
  const hrInsuranceFee = durationMonths >= 12 ? 150 : 75;
  const dependentMonthlyRate = 400;
  const totalDependentFee = dependentsCount * dependentMonthlyRate * durationMonths;
  const grandTotalCost = totalLaborFee + proratedJawazat + hrInsuranceFee + totalDependentFee;

  const currentUrl = typeof window !== 'undefined' 
    ? window.location.origin + '/blog/complete-qiwa-labor-law-iqama-guide-2026'
    : 'https://ksainsights.com/blog/complete-qiwa-labor-law-iqama-guide-2026';

  const shareText = currentLang === 'ur'
    ? `سعودی عرب لیبر لاء، کیوا پر کفالہ ٹرانسفر، اقامہ تجدید فیس اور ہروب چیک کرنے کا سب سے آسان تصویری گائیڈ:\n${currentUrl}?lng=ur`
    : currentLang === 'ar'
    ? `دليل نظام العمل السعودي، نقل الكفالة عبر قوى، حاسبة رسوم الإقامة ورخصة العمل والاستعلام عن بلاغ الهروب:\n${currentUrl}?lng=ar`
    : `Complete Guide & Interactive Portal for Saudi Labor Law, Qiwa Job Transfer, Iqama Renewal Fees & Huroob Status:\n${currentUrl}?lng=en`;

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`${currentUrl}?lng=${currentLang}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Filtered Keywords Logic
  const filteredKeywords = TRILINGUAL_KEYWORDS.filter((item) => {
    const matchLang = selectedKwLang === 'all' || item.lang === selectedKwLang;
    const matchCat = selectedKwCategory === 'all' || item.cat === selectedKwCategory;
    return matchLang && matchCat;
  });

  const handleCopySingleKeyword = (keywordText: string, id: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(keywordText);
      setCopiedKeywordId(id);
      setTimeout(() => setCopiedKeywordId(null), 2000);
    }
  };

  const handleCopyAllFilteredKeywords = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      const allText = filteredKeywords.map(k => k.kw).join(', ');
      navigator.clipboard.writeText(allText);
      setCopiedAllKw(true);
      setTimeout(() => setCopiedAllKw(false), 2500);
    }
  };

  return (
    <div id="qiwa-labor-interactive-hub" className="my-16 space-y-12">
      
      {/* WhatsApp Sharing Bar */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white p-6 md:p-8 rounded-3xl shadow-2xl border border-emerald-700/50 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left rtl:md:text-right">
          <div className="inline-flex items-center gap-2 bg-emerald-700/60 px-4 py-1.5 rounded-full text-xs font-bold text-amber-300 uppercase tracking-widest">
            <Share2 size={14} />
            {currentLang === 'ur' ? 'کمیونٹی ہیلپ اور شیئرنگ' : currentLang === 'ar' ? 'مشاركة الفائدة المجتمعية' : 'Community Knowledge Share'}
          </div>
          <h4 className="text-xl md:text-2xl font-bold font-serif">
            {currentLang === 'ur' 
              ? 'یہ رہنمائی دوستوں اور فیملی ممبرز کے ساتھ واٹس ایپ پر شیئر کریں' 
              : currentLang === 'ar' 
              ? 'شارك هذا الدليل المعتمد مع أصدقائك عبر الواتساب' 
              : 'Share this verified tutorial with your friends on WhatsApp'}
          </h4>
          <p className="text-sm text-emerald-100 max-w-2xl font-light">
            {currentLang === 'ur'
              ? 'سعودی عرب میں رہنے والے ہر غیر ملکی کارکن اور فیملی کے لیے بنیادی قوانین، فیس اور کفالہ کے مسائل کا آسان حل۔'
              : currentLang === 'ar'
              ? 'مرجع مبسط لكافة المقيمين والعمالة الوافدة لحساب الرسوم الرسمية وفهم حقوق التنقل الوظيفي بدقة.'
              : 'Empower fellow expatriates and colleagues with clear, verified procedures on job transfers, fees, and legal rights.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-center">
          <button
            onClick={handleWhatsAppShare}
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-95 text-sm"
          >
            <Share2 size={18} />
            <span>{currentLang === 'ur' ? 'واٹس ایپ پر بھیجیں' : currentLang === 'ar' ? 'إرسال عبر واتساب' : 'Share on WhatsApp'}</span>
          </button>
          
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3.5 rounded-2xl border border-white/20 transition-all text-sm"
          >
            {copied ? <Check size={18} className="text-emerald-300" /> : <Copy size={18} />}
            <span>{copied ? (currentLang === 'ur' ? 'لنک کاپی ہو گیا!' : currentLang === 'ar' ? 'تم نسخ الرابط!' : 'Copied!') : (currentLang === 'ur' ? 'لنک کاپی کریں' : currentLang === 'ar' ? 'نسخ الرابط' : 'Copy Link')}</span>
          </button>
        </div>
      </div>

      {/* Interactive Tool 1: Age Slab Regulations */}
      <div className="bg-white rounded-3xl p-8 md:p-10 border border-emerald-900/10 shadow-xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest flex items-center gap-1.5">
              <UserCheck size={16} />
              {currentLang === 'ur' ? 'عمر کے مختلف مراحل کے لیے قوانین' : currentLang === 'ar' ? 'قواعد الفئات العمرية في نظام العمل' : 'Age Bracket Regulatory Slabs'}
            </span>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-emerald-950">
              {currentLang === 'ur' 
                ? 'مختلف عمر کے افراد کے لیے لیبر و اقامہ قوانین' 
                : currentLang === 'ar' 
                ? 'اختلاف الأنظمة والشروط حسب الفئة العمرية' 
                : 'Saudi Labor & Iqama Regulations by Age Bracket'}
            </h3>
            <p className="text-sm text-gray-500">
              {currentLang === 'ur'
                ? 'سعودی لیبر لاء میں بچوں، نوعمروں، بالغ کارکنوں اور بزرگوں کے لیے الگ الگ قوانین ہیں:'
                : currentLang === 'ar'
                ? 'حدد نظام العمل السعودي ضوابط صارمة ومتباينة بحسب الفئة العمرية للوافدين والمواطنين:'
                : 'Select an age bracket below to see the specific legal limits, permitted hours, and sponsorship rules:'}
            </p>
          </div>

          <div className="relative min-w-[260px]">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              {currentLang === 'ur' ? 'عمر کی کیٹیگری منتخب کریں:' : currentLang === 'ar' ? 'اختر الفئة العمرية:' : 'Select Age Bracket:'}
            </label>
            <div className="relative">
              <select
                value={selectedAgeSlab}
                onChange={(e) => setSelectedAgeSlab(e.target.value as any)}
                className="w-full appearance-none bg-emerald-50/60 border border-emerald-300 text-emerald-950 font-bold py-3.5 px-4 pr-10 rtl:pl-10 rtl:pr-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm cursor-pointer shadow-sm"
              >
                <option value="under15">{currentLang === 'ur' ? '15 سال سے کم (بچے / نابالغ)' : currentLang === 'ar' ? 'أقل من 15 سنة (الأطفال)' : 'Under 15 Years (Children / Minors)'}</option>
                <option value="15to18">{currentLang === 'ur' ? '15 تا 18 سال (نو عمر کارکن - حدث)' : currentLang === 'ar' ? '15 إلى 18 سنة (تشغيل الأحداث)' : '15 – 18 Years (Juvenile Workers)'}</option>
                <option value="18to60">{currentLang === 'ur' ? '18 تا 60 سال (معیاری ورک فورس)' : currentLang === 'ar' ? '18 إلى 60 سنة (القوة العاملة القياسية)' : '18 – 60 Years (Standard Adult Workforce)'}</option>
                <option value="above60">{currentLang === 'ur' ? '60 سال سے زائد (سینئر ملازمین اور والدین)' : currentLang === 'ar' ? 'أكثر من 60 سنة (كبار السن والمرافقون)' : '60+ Years (Seniors & Elderly Dependents)'}</option>
              </select>
              <ChevronDown size={18} className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-emerald-700 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Dynamic Display for Selected Age Slab */}
        <div className="bg-gradient-to-br from-gray-50 to-emerald-50/30 p-6 md:p-8 rounded-2xl border border-emerald-900/10 space-y-6">
          {selectedAgeSlab === 'under15' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-red-700">
                <AlertTriangle size={24} className="flex-shrink-0" />
                <h4 className="text-xl font-bold font-serif">
                  {currentLang === 'ur' ? '15 سال سے کم عمر: ملازمت پر مکمل پابندی (چائلڈ لیبر پروٹیکشن)' : currentLang === 'ar' ? 'أقل من 15 سنة: حظر كامل لتشغيل الأطفال (المادة 161)' : 'Under 15: Absolute Ban on Employment (Article 161)'}
                </h4>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {currentLang === 'ur'
                  ? 'سعودی لیبر لاء کے آرٹیکل 161 کے تحت 15 سال سے کم عمر کسی بھی بچے سے کام لینا مکمل طور پر غیر قانونی اور قابل سزا جرم ہے۔ بچے صرف والدین کے ڈیپنڈنٹ اقامہ (مرافق) پر رہ سکتے ہیں۔ ان کے لیے اسکول میں داخلہ لازمی ہے اور ان سے کسی قسم کا تجارتی کام نہیں لیا جا سکتا۔'
                  : currentLang === 'ar'
                  ? 'يحظر نظام العمل السعودي تشغيل أي طفل لم يكمل الخامسة عشرة من عمره بأي شكل من الأشكال. يقتصر وجودهم داخل المملكة على إقامة التابعين (مرافق) تحت كفالة الأب أو الأم مع إلزامية التسجيل في المدارس المعتمدة وفق لوائح وزارة التعليم.'
                  : 'Under Article 161 of the Saudi Labor Law, employing any individual under 15 years old is strictly illegal and subject to heavy statutory fines. Children are legally registered as dependents under their parent\'s sponsorship with mandatory school enrollment.'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="bg-white p-4 rounded-xl border border-red-200">
                  <span className="text-xs font-bold text-red-600 block mb-1">{currentLang === 'ur' ? 'کام کی اجازت:' : currentLang === 'ar' ? 'تصريح العمل:' : 'Work Permit:'}</span>
                  <p className="text-sm font-bold text-gray-900">{currentLang === 'ur' ? 'مکمل ممنوع (0 گھنٹے)' : currentLang === 'ar' ? 'ممنوع كلياً (صفر ساعات)' : 'Strictly Prohibited (0 Hours)'}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <span className="text-xs font-bold text-gray-500 block mb-1">{currentLang === 'ur' ? 'اقامہ کی قسم:' : currentLang === 'ar' ? 'نوع الإقامة:' : 'Residency Type:'}</span>
                  <p className="text-sm font-bold text-gray-900">{currentLang === 'ur' ? 'فیملی ڈیپنڈنٹ (مرافق)' : currentLang === 'ar' ? 'إقامة مرافق / تابع' : 'Family Dependent (Murafeq)'}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <span className="text-xs font-bold text-gray-500 block mb-1">{currentLang === 'ur' ? 'ماہانہ ڈیپنڈنٹ فیس:' : currentLang === 'ar' ? 'المقابل المالي للتابعين:' : 'Monthly Levy:'}</span>
                  <p className="text-sm font-bold text-gray-900">{currentLang === 'ur' ? '400 ریال ماہانہ' : currentLang === 'ar' ? '400 ريال شهرياً' : 'SAR 400 / Month'}</p>
                </div>
              </div>
            </div>
          )}

          {selectedAgeSlab === '15to18' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-amber-800">
                <Clock size={24} className="flex-shrink-0 text-amber-600" />
                <h4 className="text-xl font-bold font-serif">
                  {currentLang === 'ur' ? '15 تا 18 سال: نو عمر افراد کے لیے سخت حفاظتی شرائط (الأحداث)' : currentLang === 'ar' ? '15 إلى 18 سنة: نظام تشغيل الأحداث والضوابط المشددة (المواد 162-167)' : '15 – 18 Years: Juvenile Labor Safeguards (Articles 162-167)'}
                </h4>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {currentLang === 'ur'
                  ? '15 سے 18 سال کی عمر کے نو عمر لڑکے یا لڑکیوں کو کام کرنے کی خصوصی اجازت ہے، لیکن اس کے لیے سخت شرائط ہیں: روزانہ زیادہ سے زیادہ 6 گھنٹے کام (رمضان میں 4 گھنٹے)، رات کے وقت (شام 7 بجے سے صبح 6 بجے تک) کام پر مکمل پابندی، اور خطرناک کاموں یا بھاری مشینری چلانے پر ممانعت۔ والد یا سرپرست کی تحریری منظوری لازمی ہے۔'
                  : currentLang === 'ar'
                  ? 'يسمح النظام بتشغيل الأحداث (15-18 سنة) تحت رقابة مشددة: لا يجوز تشغيلهم أكثر من 6 ساعات يومياً (4 ساعات في رمضان)، ويحظر حظراً قاطعاً تشغيلهم ليلاً بين 7 مساءً و6 صباحاً، ويمنع تشغيلهم في الأعمال الخطرة أو الصناعات الشاقة، مع وجوب موافقة ولي الأمر الرسمية.'
                  : 'Individuals aged 15–18 may only work under strict juvenile labor provisions: a maximum of 6 hours per day (4 hours in Ramadan), zero night shifts (7:00 PM to 6:00 AM prohibited), complete exclusion from hazardous machinery or construction, and mandatory guardian consent.'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="bg-white p-4 rounded-xl border border-amber-200">
                  <span className="text-xs font-bold text-amber-700 block mb-1">{currentLang === 'ur' ? 'زیادہ سے زیادہ کام کے اوقات:' : currentLang === 'ar' ? 'الحد الأقصى لساعات العمل:' : 'Max Working Hours:'}</span>
                  <p className="text-sm font-bold text-gray-900">{currentLang === 'ur' ? '6 گھنٹے روزانہ (اوور ٹائم ممنوع)' : currentLang === 'ar' ? '6 ساعات يومياً (يمنع الإضافي)' : '6 Hours/Day (No Overtime)'}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-amber-200">
                  <span className="text-xs font-bold text-amber-700 block mb-1">{currentLang === 'ur' ? 'رات کا کام:' : currentLang === 'ar' ? 'العمل الليلي:' : 'Night Shifts:'}</span>
                  <p className="text-sm font-bold text-gray-900">{currentLang === 'ur' ? 'شام 7 تا صبح 6 بجے مکمل منع' : currentLang === 'ar' ? 'محظور بين 7م و6ص' : 'Forbidden (7 PM - 6 AM)'}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <span className="text-xs font-bold text-gray-500 block mb-1">{currentLang === 'ur' ? 'طبی معائنہ:' : currentLang === 'ar' ? 'الفحص الطبي:' : 'Medical Assessment:'}</span>
                  <p className="text-sm font-bold text-gray-900">{currentLang === 'ur' ? 'ملازمت سے پہلے لازمی' : currentLang === 'ar' ? 'فحص دوري وإلزامي' : 'Mandatory Periodic Checkup'}</p>
                </div>
              </div>
            </div>
          )}

          {selectedAgeSlab === '18to60' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-emerald-800">
                <ShieldCheck size={24} className="flex-shrink-0 text-emerald-600" />
                <h4 className="text-xl font-bold font-serif">
                  {currentLang === 'ur' ? '18 تا 60 سال: معیاری ملازمت اور کیوا جاب موبلٹی حقوق' : currentLang === 'ar' ? '18 إلى 60 سنة: سن العمل القياسي وحرية التنقل الوظيفي الكاملة' : '18 – 60 Years: Standard Workforce & Full Qiwa Mobility Rights'}
                </h4>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {currentLang === 'ur'
                  ? 'یہ سعودی عرب میں فعال ورک فورس کا بنیادی دائرہ ہے۔ اس عمر کے تمام غیر ملکی ملازمین کو کیوا پلیٹ فارم کے ذریعے مکمل تحفظ حاصل ہے: کنٹریکٹ کی میعاد ختم ہونے پر بغیر کفیل کی رضامندی کے نوکری تبدیل کرنے کا حق، تنخواہ 3 ماہ تک نہ ملنے پر فوری منتقلی، اور لیبر لاء آرٹیکل 81 کے تحت حقوق کا تحفظ۔'
                  : currentLang === 'ar'
                  ? 'تتمتع هذه الشريحة بكامل حقوق مبادرة تحسين العلاقة التعاقدية عبر منصة قوى: إمكانية الانتقال الوظيفي لصاحب عمل جديد دون موافقة الكفيل الحالي عند انتهاء العقد أو تأخر الرواتب 3 أشهر أو عدم إصدار الإقامة، والشمول التام بنظام حماية الأجور والتأمين الطبي الشامل.'
                  : 'This represents the core active expat workforce. Workers in this age bracket enjoy full statutory protections under the Contractual Relationship Improvement Initiative on Qiwa: freedom to transfer upon contract completion or employer default (wage delay, expired Iqama), full WPS wage protections, and complete Article 81 rights.'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="bg-white p-4 rounded-xl border border-emerald-200">
                  <span className="text-xs font-bold text-emerald-700 block mb-1">{currentLang === 'ur' ? 'کیوا پر جاب ٹرانسفر:' : currentLang === 'ar' ? 'النقل عبر قوى:' : 'Qiwa Transfer:'}</span>
                  <p className="text-sm font-bold text-gray-900">{currentLang === 'ur' ? 'مکمل الیکٹرانک سہولت' : currentLang === 'ar' ? 'متاح إلكترونياً بالكامل' : '100% Digital via Qiwa'}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <span className="text-xs font-bold text-gray-500 block mb-1">{currentLang === 'ur' ? 'معیاری کام کے اوقات:' : currentLang === 'ar' ? 'ساعات العمل القياسية:' : 'Standard Hours:'}</span>
                  <p className="text-sm font-bold text-gray-900">{currentLang === 'ur' ? '8 گھنٹے روزانہ (48 ہفتہ وار)' : currentLang === 'ar' ? '8 ساعات يومياً (48 أسبوعياً)' : '8 Hours/Day (48/Week)'}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <span className="text-xs font-bold text-gray-500 block mb-1">{currentLang === 'ur' ? 'لیبر فیس (مکتب عمل):' : currentLang === 'ar' ? 'المقابل المالي للعمالة:' : 'Maktab Amal Fee:'}</span>
                  <p className="text-sm font-bold text-gray-900">{currentLang === 'ur' ? '700 تا 800 ریال ماہانہ' : currentLang === 'ar' ? '700 - 800 ريال شهرياً' : 'SAR 700 - 800 / Month'}</p>
                </div>
              </div>
            </div>
          )}

          {selectedAgeSlab === 'above60' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-blue-900">
                <Building2 size={24} className="flex-shrink-0 text-blue-700" />
                <h4 className="text-xl font-bold font-serif">
                  {currentLang === 'ur' ? '60 سال سے زائد: سینئر ورک فورس اور ریٹائرمنٹ کے قواعد' : currentLang === 'ar' ? 'أكثر من 60 سنة: ضوابط كبار السن وشروط تجديد رخص العمل' : '60+ Years: Senior Expat Workforce & Residency Controls'}
                </h4>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {currentLang === 'ur'
                  ? '60 سال سے زائد عمر کے غیر ملکی کارکنوں کے لیے ورک پرمٹ کی تجدید نجی کمپنیوں میں ممکن ہے، لیکن نتاقات کے تحت عام پیشوں میں ترجیح نوجوان سعودیوں کو دی جاتی ہے۔ اعلیٰ ڈاکٹروں، انجینئرز، مشیروں اور سرمایہ کاروں کو آسانی سے چھوٹ ملتی ہے۔ والدین کو فیملی ڈیپنڈنٹ اقامہ پر رکھنے کے لیے اعلیٰ کیٹیگری کا میڈیکل انشورنس لازمی ہے۔'
                  : currentLang === 'ar'
                  ? 'تسمح وزارة الموارد البشرية بتجديد رخص العمل لمن تجاوزوا سن الستين في القطاع الخاص وفق معايير النطاقات، مع تسهيلات واسعة للكوادر التخصصية النادرة (الأطباء، المهندسون، الخبراء الأكاديميون والمستثمرون). كما تشترط الجوازات تغطية تأمينية شاملة لكبار السن عند كفالة الوالدين كمرافقين.'
                  : 'Renewing work permits for expats over 60 remains fully permitted in the private sector, especially for technical specialists, physicians, engineers, consultants, and business executives. However, higher-tier health insurance premiums apply, and routine entry-level occupations face stricter national replacement scrutiny.'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="bg-white p-4 rounded-xl border border-blue-200">
                  <span className="text-xs font-bold text-blue-700 block mb-1">{currentLang === 'ur' ? 'تجدید کی شرط:' : currentLang === 'ar' ? 'شرط التجديد:' : 'Renewal Condition:'}</span>
                  <p className="text-sm font-bold text-gray-900">{currentLang === 'ur' ? 'کمپنی کا نطاقات گرین ہونا' : currentLang === 'ar' ? 'نطاق المنشأة الأخضر المعتمد' : 'Company in High Green Nitaqat'}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <span className="text-xs font-bold text-gray-500 block mb-1">{currentLang === 'ur' ? 'میڈیکل انشورنس:' : currentLang === 'ar' ? 'التأمين الطبي:' : 'Medical Insurance:'}</span>
                  <p className="text-sm font-bold text-gray-900">{currentLang === 'ur' ? 'سینئر کیٹیگری کوریج' : currentLang === 'ar' ? 'فئة كبار السن الشاملة' : 'Senior Tier Comprehensive'}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <span className="text-xs font-bold text-gray-500 block mb-1">{currentLang === 'ur' ? 'والدین کی کفالت:' : currentLang === 'ar' ? 'كفالة الوالدين:' : 'Parent Sponsorship:'}</span>
                  <p className="text-sm font-bold text-gray-900">{currentLang === 'ur' ? 'خصوصی انسانی بنیادوں پر ممکن' : currentLang === 'ar' ? 'متاح وفق اشتراطات الدخل' : 'Available with Salary Criteria'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Tool 2: Iqama & Maktab Amal Fee Calculator */}
      <div className="bg-white rounded-3xl p-8 md:p-10 border border-emerald-900/10 shadow-xl space-y-8">
        <div className="border-b border-gray-100 pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Calculator size={14} />
            {currentLang === 'ur' ? 'باقاعدہ ریٹ کیلیولیٹر 2026' : currentLang === 'ar' ? 'حاسبة الرسوم المعتمدة 2026' : 'Official Rate Simulator 2026'}
          </div>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-emerald-950">
            {currentLang === 'ur' 
              ? 'اقامہ تجدید فیس اور ورک پرمٹ کی درست حساب کتاب' 
              : currentLang === 'ar' 
              ? 'حاسبة رسوم تجديد الإقامة والمقابل المالي لرخصة العمل' 
              : 'Iqama Renewal & Work Permit (Maktab Amal) Cost Calculator'}
          </h3>
          <p className="text-sm text-gray-500 max-w-3xl">
            {currentLang === 'ur'
              ? 'نیچے دیے گئے ڈراپ ڈاؤن آپشنز سے اپنی کمپنی کا تناسب، مدت (3، 6، 9 یا 12 ماہ) اور فیملی ممبرز منتخب کریں تاکہ آپ کو کل سرکاری فیس فوراً معلوم ہو سکے:'
              : currentLang === 'ar'
              ? 'اختر نسبة العمالة الوافدة بمنشأتك، والمدة المطلوبة للتجديد ربع السنوي، وعدد المرافقين لحساب التكلفة الإجمالية بدقة:'
              : 'Customize the company staffing ratio, renewal duration, and family dependents to see an itemized breakdown of mandatory government fees:'}
          </p>
        </div>

        {/* Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Dropdown 1: Company Ratio */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">
              {currentLang === 'ur' ? 'کمپنی میں غیر ملکیوں کا تناسب:' : currentLang === 'ar' ? 'نسبة العمالة في المنشأة:' : 'Staffing Composition:'}
            </label>
            <div className="relative">
              <select
                value={nitaqatRatio}
                onChange={(e) => setNitaqatRatio(e.target.value as any)}
                className="w-full appearance-none bg-emerald-50/50 border border-emerald-300 font-semibold text-gray-900 py-3.5 px-4 pr-10 rtl:pl-10 rtl:pr-4 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none text-sm cursor-pointer shadow-sm"
              >
                <option value="moreThan">
                  {currentLang === 'ur' ? 'غیر ملکی سعودیوں سے زیادہ ہیں (800 ریال/ماہ)' : currentLang === 'ar' ? 'الوافدون أكثر من السعوديين (800 ريال/شهر)' : 'Expats exceed Saudis (SAR 800/mo)'}
                </option>
                <option value="equalOrLess">
                  {currentLang === 'ur' ? 'غیر ملکی سعودیوں کے برابر یا کم ہیں (700 ریال/ماہ)' : currentLang === 'ar' ? 'الوافدون مساوون أو أقل (700 ريال/شهر)' : 'Expats equal or less (SAR 700/mo)'}
                </option>
              </select>
              <ChevronDown size={18} className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Dropdown 2: Duration */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">
              {currentLang === 'ur' ? 'تجدید کی مدت (ماہ):' : currentLang === 'ar' ? 'مدة التجديد المطلوبة:' : 'Renewal Period:'}
            </label>
            <div className="relative">
              <select
                value={durationMonths}
                onChange={(e) => setDurationMonths(Number(e.target.value))}
                className="w-full appearance-none bg-emerald-50/50 border border-emerald-300 font-semibold text-gray-900 py-3.5 px-4 pr-10 rtl:pl-10 rtl:pr-4 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none text-sm cursor-pointer shadow-sm"
              >
                <option value={3}>{currentLang === 'ur' ? '3 ماہ (سہ ماہی تجدید)' : currentLang === 'ar' ? '3 أشهر (تجديد ربع سنوي)' : '3 Months (Quarterly)'}</option>
                <option value={6}>{currentLang === 'ur' ? '6 ماہ (نصف سال)' : currentLang === 'ar' ? '6 أشهر (نصف سنوي)' : '6 Months (Semi-Annual)'}</option>
                <option value={9}>{currentLang === 'ur' ? '9 ماہ' : currentLang === 'ar' ? '9 أشهر' : '9 Months'}</option>
                <option value={12}>{currentLang === 'ur' ? '12 ماہ (مکمل ایک سال)' : currentLang === 'ar' ? '12 شهراً (سنة كاملة)' : '12 Months (Full Year)'}</option>
              </select>
              <ChevronDown size={18} className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Dropdown 3: Dependents Count */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">
              {currentLang === 'ur' ? 'فیملی ممبرز / مرافقین کی تعداد:' : currentLang === 'ar' ? 'عدد التابعين والمرافقين:' : 'Family Dependents:'}
            </label>
            <div className="relative">
              <select
                value={dependentsCount}
                onChange={(e) => setDependentsCount(Number(e.target.value))}
                className="w-full appearance-none bg-emerald-50/50 border border-emerald-300 font-semibold text-gray-900 py-3.5 px-4 pr-10 rtl:pl-10 rtl:pr-4 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none text-sm cursor-pointer shadow-sm"
              >
                <option value={0}>{currentLang === 'ur' ? 'کوئی ڈیپنڈنٹ نہیں (صرف خود)' : currentLang === 'ar' ? 'بدون مرافقين (الموظف فقط)' : '0 Dependents (Single Worker)'}</option>
                <option value={1}>{currentLang === 'ur' ? '1 فرد (بیوی یا بچہ)' : currentLang === 'ar' ? 'مرافق واحد (زوجة أو ابن)' : '1 Dependent (Spouse/Child)'}</option>
                <option value={2}>{currentLang === 'ur' ? '2 افراد' : currentLang === 'ar' ? '2 مرافقين' : '2 Dependents'}</option>
                <option value={3}>{currentLang === 'ur' ? '3 افراد' : currentLang === 'ar' ? '3 مرافقين' : '3 Dependents'}</option>
                <option value={4}>{currentLang === 'ur' ? '4 افراد' : currentLang === 'ar' ? '4 مرافقين' : '4 Dependents'}</option>
                <option value={5}>{currentLang === 'ur' ? '5 افراد' : currentLang === 'ar' ? '5 مرافقين' : '5 Dependents'}</option>
              </select>
              <ChevronDown size={18} className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Calculation Result Cards */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white p-6 md:p-8 rounded-2xl shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-800/80 pb-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                {currentLang === 'ur' ? 'مجموعی کل لاگت' : currentLang === 'ar' ? 'التكلفة الإجمالية التقديرية' : 'Estimated Total Fees'}
              </span>
              <div className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight mt-1">
                SAR {grandTotalCost.toLocaleString()}
              </div>
            </div>
            <div className="bg-emerald-800/80 px-4 py-2 rounded-xl text-xs text-emerald-100 border border-emerald-700">
              {currentLang === 'ur' ? `${durationMonths} ماہ کی مکمل سرکاری فیس` : currentLang === 'ar' ? `رسوم رسمية شاملة لمدة ${durationMonths} أشهر` : `All-inclusive for ${durationMonths} Months`}
            </div>
          </div>

          {/* Breakdown Rows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <span className="text-emerald-300 text-xs block mb-1">
                {currentLang === 'ur' ? 'مکتب عمل رخصتہ العمل:' : currentLang === 'ar' ? 'المقابل المالي لرخصة العمل:' : 'Maktab Amal Labor Fee:'}
              </span>
              <span className="text-lg font-bold text-white">SAR {totalLaborFee.toLocaleString()}</span>
              <span className="text-[11px] text-gray-400 block mt-0.5">{monthlyLaborFee} × {durationMonths} {currentLang === 'ur' ? 'ماہ' : currentLang === 'ar' ? 'شهر' : 'months'}</span>
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <span className="text-emerald-300 text-xs block mb-1">
                {currentLang === 'ur' ? 'جوازات اقامہ فیس:' : currentLang === 'ar' ? 'رسوم الجوازات (الإقامة):' : 'Jawazat Residency Fee:'}
              </span>
              <span className="text-lg font-bold text-white">SAR {proratedJawazat.toLocaleString()}</span>
              <span className="text-[11px] text-gray-400 block mt-0.5">{currentLang === 'ur' ? 'سالانہ 650 ریال کی مناسبت سے' : currentLang === 'ar' ? 'موزعة على أساس 650 ريال سنوياً' : 'Prorated on SAR 650/yr base'}</span>
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <span className="text-emerald-300 text-xs block mb-1">
                {currentLang === 'ur' ? 'انشورنس ویلفیئر فیس:' : currentLang === 'ar' ? 'التأمين على عقود العمالة:' : 'Contract Guarantee Fee:'}
              </span>
              <span className="text-lg font-bold text-white">SAR {hrInsuranceFee.toLocaleString()}</span>
              <span className="text-[11px] text-gray-400 block mt-0.5">{currentLang === 'ur' ? 'سرکاری فیس برائے حقوق تحفظ' : currentLang === 'ar' ? 'وثيقة تأمين حقوق العمالة' : 'HRSD wage protection cover'}</span>
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <span className="text-emerald-300 text-xs block mb-1">
                {currentLang === 'ur' ? 'مرافقین / ڈیپنڈنٹ لیوی:' : currentLang === 'ar' ? 'رسوم التابعين والمرافقين:' : 'Dependent Family Levy:'}
              </span>
              <span className="text-lg font-bold text-amber-300">SAR {totalDependentFee.toLocaleString()}</span>
              <span className="text-[11px] text-gray-400 block mt-0.5">{dependentsCount} × 400 × {durationMonths} {currentLang === 'ur' ? 'ماہ' : currentLang === 'ar' ? 'شهر' : 'months'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Tool 3: Step-by-Step Official Portal Walkthrough */}
      <div className="bg-white rounded-3xl p-8 md:p-10 border border-emerald-900/10 shadow-xl space-y-8">
        <div className="border-b border-gray-100 pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <FileText size={14} />
            {currentLang === 'ur' ? 'آفیشل پورٹلز کا تصویری و مرحلہ وار طریقہ کار' : currentLang === 'ar' ? 'الدليل الإرشادي الميداني لمنصات أبشر وقوى' : 'Interactive Official Portals Walkthrough'}
          </div>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-emerald-950">
            {currentLang === 'ur' 
              ? 'مرحلہ وار ٹیٹوریل: سرکاری ویب سائٹس پر کام کرنے کا طریقہ' 
              : currentLang === 'ar' 
              ? 'خطوات عملية سهلة لإتمام معاملات الإقامة والتنقل الوظيفي' 
              : 'Child-Simple Walkthrough: Step-by-Step Official Portal Instructions'}
          </h3>
          <p className="text-sm text-gray-500">
            {currentLang === 'ur'
              ? 'نیچے دیے گئے ٹیبز پر کلک کریں تاکہ متعلقہ کارروائی کا طریقہ کار اور سرکاری پورٹل کی تفصیلات آپ کے سامنے آ جائیں:'
              : currentLang === 'ar'
              ? 'انقر على العملية المطلوبة لاستعراض الخطوات التفصيلية مع الروابط المباشرة للمنصات الحكومية:'
              : 'Select a process below for an ultra-clear, 8th-grade level walkthrough with verified official direct links:'}
          </p>
        </div>

        {/* Process Selection Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => setSelectedTopic('qiwa')}
            className={`p-4 rounded-2xl border text-sm font-bold text-center transition-all ${
              selectedTopic === 'qiwa'
                ? 'bg-emerald-900 text-white border-emerald-900 shadow-md ring-2 ring-emerald-600/30'
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-emerald-50/50'
            }`}
          >
            {currentLang === 'ur' ? '1. کیوا کفالہ ٹرانسفر' : currentLang === 'ar' ? '1. نقل الكفالة عبر قوى' : '1. Qiwa Job Transfer'}
          </button>
          <button
            onClick={() => setSelectedTopic('expiry')}
            className={`p-4 rounded-2xl border text-sm font-bold text-center transition-all ${
              selectedTopic === 'expiry'
                ? 'bg-emerald-900 text-white border-emerald-900 shadow-md ring-2 ring-emerald-600/30'
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-emerald-50/50'
            }`}
          >
            {currentLang === 'ur' ? '2. اقامہ ایکسپائری چیک' : currentLang === 'ar' ? '2. استعلام صلاحية الإقامة' : '2. Check Iqama Expiry'}
          </button>
          <button
            onClick={() => setSelectedTopic('huroob')}
            className={`p-4 rounded-2xl border text-sm font-bold text-center transition-all ${
              selectedTopic === 'huroob'
                ? 'bg-emerald-900 text-white border-emerald-900 shadow-md ring-2 ring-emerald-600/30'
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-emerald-50/50'
            }`}
          >
            {currentLang === 'ur' ? '3. ابشر پر ہروب چیک' : currentLang === 'ar' ? '3. فحص بلاغ الهروب (انقطاع)' : '3. Check Huroob on Absher'}
          </button>
          <button
            onClick={() => setSelectedTopic('article81')}
            className={`p-4 rounded-2xl border text-sm font-bold text-center transition-all ${
              selectedTopic === 'article81'
                ? 'bg-emerald-900 text-white border-emerald-900 shadow-md ring-2 ring-emerald-600/30'
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-emerald-50/50'
            }`}
          >
            {currentLang === 'ur' ? '4. آرٹیکل 81 فوری استعفیٰ' : currentLang === 'ar' ? '4. الاستقالة بالمادة 81' : '4. Article 81 Resignation'}
          </button>
        </div>

        {/* Walkthrough Cards */}
        <div className="bg-emerald-50/30 p-6 md:p-8 rounded-2xl border border-emerald-100 space-y-6">
          {selectedTopic === 'qiwa' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-xl font-bold font-serif text-emerald-950">
                    {currentLang === 'ur' ? 'کیوا پورٹل سے ملازمت منتقلی (کفالہ ٹرانسفر) کے 4 آسان اقدامات' : currentLang === 'ar' ? 'خطوات قبول ونقل الخدمات عبر منصة قوى أفراد' : '4 Simple Steps to Accept Job Transfer on Qiwa Platform'}
                  </h4>
                  <p className="text-xs text-emerald-700 font-medium mt-1">
                    {currentLang === 'ur' ? 'کسی پرانے کفیل کے پاس جانے یا این او سی لینے کی ضرورت نہیں' : currentLang === 'ar' ? 'لا يتطلب موافقة صاحب العمل السابق في الحالات النظامية' : 'No prior sponsor paper NOC required when eligibility rules are met'}
                  </p>
                </div>
                <a
                  href="https://auth.qiwa.sa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all self-start"
                >
                  <span>{currentLang === 'ur' ? 'کیوا پورٹل کھولیں' : currentLang === 'ar' ? 'فتح منصة قوى' : 'Open Qiwa Portal'}</span>
                  <ExternalLink size={14} />
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white p-5 rounded-xl border border-emerald-200/70 shadow-sm space-y-2">
                  <span className="w-7 h-7 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-xs">1</span>
                  <h5 className="font-bold text-gray-900">{currentLang === 'ur' ? 'نئی کمپنی سے آفر حاصل کریں' : currentLang === 'ar' ? 'طلب النقل من المنشأة الجديدة' : 'New Company Submits Offer'}</h5>
                  <p className="text-xs text-gray-600">
                    {currentLang === 'ur' 
                      ? 'نئی کمپنی اپنے کیوا بزنس اکاؤنٹ سے آپ کے اقامہ نمبر اور تاریخ پیدائش پر باقاعدہ جاب ٹرانسفر کی درخواست جمع کرے گی۔'
                      : currentLang === 'ar'
                      ? 'تقوم المنشأة الجديدة بإنشاء طلب نقل خدمة عبر حساب المنشأة في قوى وإرفاق العقد الإلكتروني الموثق.'
                      : 'The recruiting enterprise creates an electronic transfer order and attaches an authenticated standard e-contract via Qiwa Business.'}
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-emerald-200/70 shadow-sm space-y-2">
                  <span className="w-7 h-7 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-xs">2</span>
                  <h5 className="font-bold text-gray-900">{currentLang === 'ur' ? 'اپنے کیوا انفرادی اکاؤنٹ میں لاگ ان کریں' : currentLang === 'ar' ? 'تسجيل الدخول في قوى أفراد' : 'Login to Qiwa Individuals'}</h5>
                  <p className="text-xs text-gray-600">
                    {currentLang === 'ur'
                      ? 'اپنے موبائل یا کمپیوٹر سے auth.qiwa.sa پر جائیں۔ اپنے ابشر یوزر نیم اور پاس ورڈ کے ذریعے نفاذ (Nafath) سے تصدیق کریں۔'
                      : currentLang === 'ar'
                      ? 'ادخل إلى منصة قوى أفراد مستخدماً بيانات الهوية الوطنية/الإقامة والتحقق الموحد عبر نفاذ.'
                      : 'Sign into Qiwa Individual using your Saudi National Single Sign-On (Nafath) biometric authentication code.'}
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-emerald-200/70 shadow-sm space-y-2">
                  <span className="w-7 h-7 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-xs">3</span>
                  <h5 className="font-bold text-gray-900">{currentLang === 'ur' ? 'ملازمت کی آفر اور تنخواہ کا جائزہ لیں' : currentLang === 'ar' ? 'مراجعة العقد الوظيفي والراتب' : 'Review Contract Terms & Salary'}</h5>
                  <p className="text-xs text-gray-600">
                    {currentLang === 'ur'
                      ? 'ملازمت کی منتقلی کے سیکشن میں جائیں۔ نئے آجر کا نام، بنیادی تنخواہ، ہاؤسنگ الاؤنس اور کنٹریکٹ کی مدت چیک کریں۔'
                      : currentLang === 'ar'
                      ? 'انتقل إلى تبويب (الانتقال الوظيفي)، واطلع على العقد المقترح والبدلات والمهام المسندة بعناية.'
                      : 'Open the (Employee Transfer) tab to review the proposed job title, basic wage, housing allowance, and duration.'}
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-emerald-200/70 shadow-sm space-y-2">
                  <span className="w-7 h-7 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-xs">4</span>
                  <h5 className="font-bold text-gray-900">{currentLang === 'ur' ? 'قبول کریں (Accept Request)' : currentLang === 'ar' ? 'الموافقة والإرسال' : 'Click Accept & Complete'}</h5>
                  <p className="text-xs text-gray-600">
                    {currentLang === 'ur'
                      ? 'شروط پر نشان لگا کر "قبول کریں" پر کلک کریں۔ نوٹس پیریڈ مکمل ہوتے ہی آپ کا اقامہ نئی کمپنی پر ٹرانسفر ہو جائے گا۔'
                      : currentLang === 'ar'
                      ? 'اضغط زر (قبول الطلب) وتأكيد رمز التحقق. يتم استكمال الفترة الإشعارية وسداد الرسوم لتحديث الإقامة.'
                      : 'Confirm acceptance via OTP. Once notice period conditions conclude, sponsorship switches automatically on Qiwa & Jawazat.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {selectedTopic === 'expiry' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-xl font-bold font-serif text-emerald-950">
                    {currentLang === 'ur' ? 'بغیر پاس ورڈ اور لاگ ان کے اقامہ ایکسپائری چیک کرنے کا طریقہ' : currentLang === 'ar' ? 'الاستعلام عن صلاحية الإقامة إلكترونياً بدون تسجيل دخول' : 'How to Check Iqama Expiry Date Online Without Password'}
                  </h4>
                  <p className="text-xs text-emerald-700 font-medium mt-1">
                    {currentLang === 'ur' ? 'وزارتِ محنت اور ابشر کے مفت پبلک سروس پورٹل سے' : currentLang === 'ar' ? 'عبر بوابة الخدمات العامة لوزارة الموارد البشرية ومنصة أبشر' : 'Instant query using Public MOL/Absher Inquiry Gateway'}
                  </p>
                </div>
                <a
                  href="https://www.absher.sa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all self-start"
                >
                  <span>{currentLang === 'ur' ? 'ابشر پورٹل پر جائیں' : currentLang === 'ar' ? 'فتح بوابة أبشر' : 'Go to Absher Portal'}</span>
                  <ExternalLink size={14} />
                </a>
              </div>

              <div className="bg-white p-6 rounded-xl border border-emerald-200 space-y-4 text-sm">
                <ol className="list-decimal list-inside space-y-3 text-gray-700 font-medium leading-relaxed">
                  <li>
                    {currentLang === 'ur' 
                      ? 'سرکاری ویب سائٹ (absher.sa) پر جائیں اور "افراد (Individuals)" منتخب کریں۔'
                      : currentLang === 'ar'
                      ? 'ادخل على الموقع الإلكتروني (absher.sa) واختر بوابة (أبشر أفراد).'
                      : 'Navigate to absher.sa and select the (Absher Individuals) portal.'}
                  </li>
                  <li>
                    {currentLang === 'ur'
                      ? 'سرچ بار میں لکھیں: "الاستعلام عن صلاحية الإقامة" (Query Iqama Expiry).'
                      : currentLang === 'ar'
                      ? 'اختر من قائمة الاستعلامات العامة (الاستعلام عن صلاحية الإقامة).'
                      : 'Choose (Public Inquiries) > (Query Iqama Expiration Service).'}
                  </li>
                  <li>
                    {currentLang === 'ur'
                      ? 'اپنا 10 ہندسوں کا اقامہ نمبر درج کریں اور اسکرین پر دیا گیا تصویری کوڈ (Captcha) ٹائپ کریں۔'
                      : currentLang === 'ar'
                      ? 'أدخل رقم الإقامة المكون من 10 أرقام والرمز المرئي الظاهر أمامك.'
                      : 'Enter your 10-digit Iqama number along with the on-screen visual security captcha.'}
                  </li>
                  <li>
                    {currentLang === 'ur'
                      ? 'اسکرین پر سبز رنگ کا پیغام آئے گا جس میں آپ کے اقامہ کی ہجری اور عیسوی تاریخ واضح ہوگی۔'
                      : currentLang === 'ar'
                      ? 'ستظهر لك فوراً رسالة تؤكد (الإقامة سارية حتى تاريخ كذا) بالتقويمين الهجري والميلادي.'
                      : 'A clear status message will display showing your exact expiry date in both Hijri and Gregorian formats.'}
                  </li>
                </ol>
              </div>
            </div>
          )}

          {selectedTopic === 'huroob' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-xl font-bold font-serif text-emerald-950">
                    {currentLang === 'ur' ? 'ابشر اور وزارتِ محنت پر ہروب (بلاغ انقطاع عن العمل) چیک کرنا' : currentLang === 'ar' ? 'طريقة الاستعلام عن بلاغ الهروب (انقطاع عن العمل) برقم الإقامة' : 'How to Check Huroob (Absent from Work Report) Online'}
                  </h4>
                  <p className="text-xs text-emerald-700 font-medium mt-1">
                    {currentLang === 'ur' ? 'اگر اسٹیٹس "علی رأس العمل" ہے تو آپ مکمل محفوظ ہیں' : currentLang === 'ar' ? 'ظهور عبارة (على رأس العمل) يعني سلامة وضعك القانوني تماماً' : 'Status "On the Job (على رأس العمل)" confirms you are 100% in good standing'}
                  </p>
                </div>
                <a
                  href="https://hrsd.gov.sa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all self-start"
                >
                  <span>{currentLang === 'ur' ? 'وزارت محنت پورٹل' : currentLang === 'ar' ? 'بوابة الموارد البشرية' : 'HRSD Official Portal'}</span>
                  <ExternalLink size={14} />
                </a>
              </div>

              <div className="bg-white p-6 rounded-xl border border-emerald-200 space-y-4 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="text-xs font-bold text-emerald-800 uppercase block mb-1">
                      {currentLang === 'ur' ? 'محفوظ اسٹیٹس:' : currentLang === 'ar' ? 'الحالة الآمنة النظامية:' : 'Safe Official Status:'}
                    </span>
                    <p className="text-sm font-bold text-emerald-950">
                      {currentLang === 'ur' ? 'على رأس العمل (کام پر موجود)' : currentLang === 'ar' ? 'على رأس العمل' : 'Active / On the Job (على رأس العمل)'}
                    </p>
                    <p className="text-xs text-emerald-700 mt-1">
                      {currentLang === 'ur' ? 'اس کا مطلب ہے کہ کوئی ہروب نہیں ہے اور آپ قانونی طور پر درست ہیں۔' : currentLang === 'ar' ? 'الوضع سليم، ولا يوجد أي بلاغ تغيب أو انقطاع مسجل.' : 'No violation or absent-from-work report registered against you.'}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                    <span className="text-xs font-bold text-red-800 uppercase block mb-1">
                      {currentLang === 'ur' ? 'ہروب لگا ہونے کی علامت:' : currentLang === 'ar' ? 'حالة وجود بلاغ:' : 'Infraction Status:'}
                    </span>
                    <p className="text-sm font-bold text-red-950">
                      {currentLang === 'ur' ? 'متغيب عن العمل / منقطع (غیر حاضر)' : currentLang === 'ar' ? 'متغيب عن العمل / منقطع' : 'Absent from Work (متغيب عن العمل)'}
                    </p>
                    <p className="text-xs text-red-700 mt-1">
                      {currentLang === 'ur' ? 'اس کا مطلب ہے کہ مالک نے رپورٹ کر دی ہے۔ آپ کے پاس لیبر کورٹ جانے کے لیے 60 دن ہوتے ہیں۔' : currentLang === 'ar' ? 'يمنح النظام مهلة 60 يوماً للاعتراض أو الانتقال لصاحب عمل جديد.' : 'Grace window allows 60 days to contest legally or transfer through Qiwa.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTopic === 'article81' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-xl font-bold font-serif text-emerald-950">
                    {currentLang === 'ur' ? 'سعودی لیبر لاء کا آرٹیکل 81: بغیر نوٹس فوری استعفیٰ کے 7 اصول' : currentLang === 'ar' ? 'المادة 81 من نظام العمل: شروط ترك العمل فوراً دون إشعار ودون خسارة المكافأة' : 'Saudi Labor Law Article 81: Resign Immediately Without Notice'}
                  </h4>
                  <p className="text-xs text-emerald-700 font-medium mt-1">
                    {currentLang === 'ur' ? 'تمام بقایا جات اور اینڈ آف سروس بینیفٹ مکمل وصول کرنے کا قانونی حق' : currentLang === 'ar' ? 'يضمن للعامل كامل مكافأة نهاية الخدمة والتعويضات النظامية' : 'Guarantees full End-of-Service Gratuity and indemnity payouts'}
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-emerald-200 space-y-4 text-sm">
                <p className="text-xs text-gray-600 font-medium">
                  {currentLang === 'ur'
                    ? 'لیبر لاء کے آرٹیکل 81 کے تحت اگر مالک درج ذیل میں سے کسی ایک غلطی کا مرتکب ہو، تو کارکن بغیر کسی نوٹس کے نوکری چھوڑ سکتا ہے:'
                    : currentLang === 'ar'
                    ? 'يحق للعامل إنهاء عقد العمل دون سابق إنذار والاحتفاظ بكامل حقوقه ومكافأته في الحالات السبع التالية:'
                    : 'An employee can lawfully terminate their employment contract with zero advance notice in any of these documented conditions:'}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{currentLang === 'ur' ? 'مسلسل 3 ماہ تک تنخواہ ادا نہ کی گئی ہو (تأخر الرواتب)' : currentLang === 'ar' ? 'تأخر صرف الرواتب لمدة 3 أشهر متتالية' : 'Employer withholds wages for 3 consecutive months'}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{currentLang === 'ur' ? 'اقامہ یا ورک پرمٹ کی میعاد ختم ہونے پر 3 ماہ تک تجدید نہ کی ہو' : currentLang === 'ar' ? 'عدم تجديد رخصة العمل أو الإقامة بعد انتهائها بـ 3 أشهر' : 'Failure to renew Work Permit or Iqama within 3 months of expiry'}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{currentLang === 'ur' ? 'مالک نے معاہدے کی اہم شرائط کی خلاف ورزی کی ہو' : currentLang === 'ar' ? 'إخلال صاحب العمل بالتزاماته الجوهرية المحددة بالعقد' : 'Substantial breach of material contractual obligations'}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{currentLang === 'ur' ? 'کام کی جگہ پر جان و صحت کو شدید خطرہ لاحق ہو' : currentLang === 'ar' ? 'وجود خطر جسيم يهدد سلامة وصحة العامل في بيئة العمل' : 'Grave safety or health hazards unaddressed by the employer'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Trilingual SEO Keywords & Official Search Index (75 Verified Search Terms) */}
      <div id="trilingual-seo-keywords-index" className="bg-white rounded-3xl p-6 md:p-10 border border-emerald-100 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} className="text-secondary" />
              <span>{currentLang === 'ur' ? '75 تصدیق شدہ سرچ کی ورڈز' : currentLang === 'ar' ? '75 كلمة مفتاحية ثلاثية معتمدة' : '75 Verified Trilingual Legal Keywords'}</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-emerald-950">
              {currentLang === 'ur' ? 'سرچ کی ورڈز اور متعلقہ اصطلاحات کی مکمل ڈائریکٹری' : currentLang === 'ar' ? 'دليل الكلمات المفتاحية ومصطلحات البحث الرسمية' : 'Trilingual Search & Regulatory Query Index'}
            </h3>
            <p className="text-xs text-gray-500 max-w-2xl">
              {currentLang === 'ur' 
                ? 'گوگل، ابشر اور قوی پلیٹ فارم پر فوری تلاش کے لیے قانونی کی ورڈز۔ کسی بھی کی ورڈ پر کلک کر کے کاپی کریں:' 
                : currentLang === 'ar' 
                ? 'مصطلحات ومفاتيح البحث المعتمدة في منصات قوى، أبشر ومحركات البحث. انقر على أي كلمة لنسخها فوراً:' 
                : 'High-intent search queries for Google, Qiwa, and Absher. Click any term to copy directly:'}
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 bg-emerald-900 text-white px-4 py-2 rounded-2xl text-xs font-semibold self-start md:self-auto">
            <Tag size={16} className="text-secondary" />
            <span>25 اردو • 25 العربية • 25 English</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-bold text-gray-500 mr-2 rtl:ml-2">
            {currentLang === 'ur' ? 'زبان منتخب کریں:' : currentLang === 'ar' ? 'تصفية باللغة:' : 'Language Filter:'}
          </span>
          {(['all', 'ur', 'ar', 'en'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedKwLang(lang)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedKwLang === lang
                  ? 'bg-emerald-800 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {lang === 'all' 
                ? (currentLang === 'ur' ? 'تمام زبانیں (75)' : currentLang === 'ar' ? 'الكل (75)' : 'All Languages (75)')
                : lang === 'ur' ? 'اردو (25)' : lang === 'ar' ? 'العربية (25)' : 'English (25)'}
            </button>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 pb-2">
          <span className="text-xs font-bold text-gray-500 mr-2 rtl:ml-2">
            {currentLang === 'ur' ? 'موضوع منتخب کریں:' : currentLang === 'ar' ? 'حسب الموضوع:' : 'Topic:'}
          </span>
          {([
            { id: 'all', labelUr: 'تمام موضوعات', labelAr: 'جميع المواضيع', labelEn: 'All Topics' },
            { id: 'transfer', labelUr: 'کفالہ ٹرانسفر', labelAr: 'نقل الكفالة', labelEn: 'Job Transfer' },
            { id: 'fees', labelUr: 'اقامہ و تجدید فیس', labelAr: 'رسوم الإقامة', labelEn: 'Renewal Fees' },
            { id: 'huroob', labelUr: 'ابشر ہروب', labelAr: 'بلاغ هروب', labelEn: 'Huroob Status' },
            { id: 'article81', labelUr: 'آرٹیکل 81 استعفیٰ', labelAr: 'المادة 81', labelEn: 'Article 81' },
            { id: 'expiry', labelUr: 'ایکسپائری و عمر کے اصول', labelAr: 'الصلاحية والسن', labelEn: 'Expiry & Age' }
          ] as const).map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedKwCategory(topic.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedKwCategory === topic.id
                  ? 'bg-secondary text-primary font-bold shadow-sm'
                  : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {currentLang === 'ur' ? topic.labelUr : currentLang === 'ar' ? topic.labelAr : topic.labelEn}
            </button>
          ))}
        </div>

        {/* Keywords Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-emerald-200">
          {filteredKeywords.map((item) => {
            const isItemCopied = copiedKeywordId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => handleCopySingleKeyword(item.kw, item.id)}
                className="group relative bg-gray-50 hover:bg-emerald-50/70 border border-gray-200 hover:border-emerald-300 rounded-xl p-3 cursor-pointer transition-all flex items-center justify-between gap-2 text-xs"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      item.lang === 'ur' 
                        ? 'bg-amber-100 text-amber-900' 
                        : item.lang === 'ar' 
                        ? 'bg-emerald-100 text-emerald-900' 
                        : 'bg-blue-100 text-blue-900'
                    }`}>
                      {item.lang.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-gray-400 capitalize">{item.cat}</span>
                  </div>
                  <p className="font-semibold text-gray-900 group-hover:text-emerald-950 truncate" title={item.kw}>
                    {item.kw}
                  </p>
                  <p className="text-[10px] text-gray-500 truncate" title={item.enDesc}>
                    {item.enDesc}
                  </p>
                </div>
                <button
                  aria-label="Copy keyword"
                  className={`p-1.5 rounded-md flex-shrink-0 transition-all ${
                    isItemCopied 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-white text-gray-400 group-hover:text-emerald-700 shadow-sm border border-gray-200'
                  }`}
                >
                  {isItemCopied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            );
          })}
        </div>

        {/* Copy All Keywords Action */}
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <span>
            {currentLang === 'ur'
              ? `دکھائے گئے کی ورڈز: ${filteredKeywords.length} از 75`
              : currentLang === 'ar'
              ? `الكلمات المعروضة: ${filteredKeywords.length} من 75`
              : `Showing: ${filteredKeywords.length} of 75 legal keywords`}
          </span>
          <button
            onClick={handleCopyAllFilteredKeywords}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-semibold transition-all shadow-md"
          >
            {copiedAllKw ? <Check size={14} className="text-secondary" /> : <Copy size={14} className="text-secondary" />}
            <span>
              {copiedAllKw 
                ? (currentLang === 'ur' ? 'تمام کی ورڈز کاپی ہو گئے!' : currentLang === 'ar' ? 'تم نسخ جميع الكلمات!' : 'All Keywords Copied!') 
                : (currentLang === 'ur' ? 'تمام فلٹر شدہ کی ورڈز کاپی کریں' : currentLang === 'ar' ? 'نسخ كافة الكلمات المحددة' : 'Copy All Filtered Keywords')}
            </span>
          </button>
        </div>
      </div>

    </div>
  );
};
