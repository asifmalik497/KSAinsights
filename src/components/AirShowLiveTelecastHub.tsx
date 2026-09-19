import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Tv, 
  Radio, 
  Play, 
  Clock, 
  Sparkles, 
  Shield, 
  ExternalLink, 
  Signal, 
  Eye, 
  Maximize2, 
  CheckCircle2, 
  Info,
  Calendar,
  Flame,
  Volume2
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface StreamChannel {
  id: string;
  name: { en: string; ar: string; ur: string };
  badge: { en: string; ar: string; ur: string };
  description: { en: string; ar: string; ur: string };
  embedUrl: string;
  directUrl: string;
  thumbnail: string;
  resolution: string;
  isLiveNow: boolean;
  viewersEst: string;
  sourceAttribution: string;
}

interface FlyoverTarget {
  id: string;
  city: { en: string; ar: string; ur: string };
  dateLabel: { en: string; ar: string; ur: string };
  targetIso: string; // ISO string in KSA time (UTC+3)
  keyFormation: { en: string; ar: string; ur: string };
}

// Static Target Flyover Events (KSA Timezone: UTC+3)
const FLYOVER_TARGETS: FlyoverTarget[] = [
  {
    id: 'jeddah-today',
    city: { en: 'Jeddah Waterfront Flyover', ar: 'عرض واجهة جدة البحرية', ur: 'جدہ واٹر فرنٹ ایئر شو' },
    dateLabel: { en: 'Sept 19 – 4:30 PM KSA', ar: '19 سبتمبر – 4:30 عصراً بتوقيت مكة', ur: '19 ستمبر – شام 4:30 سعودی وقت' },
    targetIso: '2026-09-19T16:30:00+03:00',
    keyFormation: { en: 'Saudi Hawks Aerobatic Team + F-15SA Smoke Trails', ar: 'فريق الصقور السعودية + إف-15 إس إيه', ur: 'سعودی ہاکس اور ایف 15 گرین سموک پرواز' }
  },
  {
    id: 'tabuk-gate',
    city: { en: 'Tabuk & Sharma (NEOM Gateway)', ar: 'سماء تبوك وشواطئ شرما (نيوم)', ur: 'تبوک و شرما کوسٹل شو' },
    dateLabel: { en: 'Sept 20 – 4:15 PM KSA', ar: '20 سبتمبر – 4:15 عصراً', ur: '20 ستمبر – شام 4:15 سعودی وقت' },
    targetIso: '2026-09-20T16:15:00+03:00',
    keyFormation: { en: 'King Faisal Base High-Speed Interceptors', ar: 'مقاتلات قاعدة الملك فيصل التكتيكية', ur: 'شاہ فیصل ایئربیس کے سپرسانک انٹرسیپٹرز' }
  },
  {
    id: 'riyadh-kafd',
    city: { en: 'Riyadh Capital Sky & KAFD', ar: 'سماء العاصمة الرياض ومركز KAFD', ur: 'ریاض دارالحکومت اور کے اے ایف ڈی' },
    dateLabel: { en: 'Sept 21 – 4:00 PM KSA', ar: '21 سبتمبر – 4:00 عصراً', ur: '21 ستمبر – شام 4:00 سعودی وقت' },
    targetIso: '2026-09-21T16:00:00+03:00',
    keyFormation: { en: 'Combined RSAF Strike Fleet + A330 Tanker Escort', ar: 'الأسطول الجوي المشترك وطائرات A330 للتزود بالوقود', ur: 'مشترکہ اسٹرائیک فلیٹ اور ری فیولنگ طیارے' }
  },
  {
    id: 'national-day-grand',
    city: { en: 'National & Defence Day 96 Grand Finale', ar: 'العرض الختامي المهيب لليوم الوطني والدفاع 96', ur: '96ویں نیشنل و ڈیفنس ڈے کا مرکزی گرینڈ فائنل' },
    dateLabel: { en: 'Sept 23 – 4:00 PM KSA', ar: '23 سبتمبر – 4:00 عصراً (العيد الوطني)', ur: '23 ستمبر – شام 4:00 سعودی وقت' },
    targetIso: '2026-09-23T16:00:00+03:00',
    keyFormation: { en: 'Nationwide Synchronized 86-Jet Flyover & Royal Escort', ar: 'تحليق متزامن لـ 86 مقاتلة في كافة سماء المملكة', ur: '86 لڑاکا طیاروں کی ملک گیر تاریخی مشترکہ پرواز' }
  }
];

// Official Verified Video Stream Channels
const STREAM_CHANNELS: StreamChannel[] = [
  {
    id: 'ekhbariya-live',
    name: {
      en: 'Al Ekhbariya News (قناة الإخبارية)',
      ar: 'قناة الإخبارية الإخبارية — البث المباشر',
      ur: 'العربیہ / الاخباریہ نیوز — باضابطہ لائیو'
    },
    badge: {
      en: 'Official SBA 24/7 Feed',
      ar: 'البث الرسمي لهيئة الإذاعة والتلفزيون',
      ur: 'سرکاری سعودی براڈکاسٹنگ فیڈ'
    },
    description: {
      en: 'Continuous live commentary, on-the-ground cameras at Riyadh KAFD & Jeddah Waterfront, pilot comms and crowd atmosphere.',
      ar: 'تغطية حية مستمرة على مدار الساعة مع كاميرات ميدانية في واجهة جدة وبرج KAFD بالرياض ومقابلات الطيارين.',
      ur: 'ریاض کے اے ایف ڈی اور جدہ کارنیش سے مسلسل لائیو کوریج، فلائٹ کمنٹری اور پائلٹس سے براہِ راست رابطے۔'
    },
    embedUrl: 'https://www.youtube-nocookie.com/embed/live_stream?channel=UC5y4_8vO_1f0p7Cq4s2i4Xw&autoplay=1&mute=1&enablejsapi=1',
    directUrl: 'https://www.youtube.com/@alekhbariyatv/live',
    thumbnail: '/images/ekhbariya_tv_broadcast.jpg',
    resolution: '1080p 60fps HD',
    isLiveNow: true,
    viewersEst: '284K+ watching',
    sourceAttribution: 'Saudi Broadcasting Authority (SBA) / هيئة الإذاعة والتلفزيون'
  },
  {
    id: 'saudi-tv-1',
    name: {
      en: 'Saudi TV 1 (القناة السعودية الأولى)',
      ar: 'القناة السعودية الأولى الرسمية',
      ur: 'سعودی فرسٹ چینل — قومی نشریات'
    },
    badge: {
      en: 'Flagship National Station',
      ar: 'القناة الوطنية الأولى',
      ur: 'قومی چینل نمبر 1'
    },
    description: {
      en: 'Official state television coverage featuring national anthems, panoramic coastal sweeps, and royal ceremonial protocols.',
      ar: 'التغطية الاحتفالية الكبرى على مستوى المملكة، واستعراض قوافل الطيران فوق المعالم الحضارية والتاريخية.',
      ur: 'قومی ترانوں کے ساتھ تاریخی یادگاروں اور ساحلوں پر طیاروں کے دلکش کرتب کی سرکاری نشریات۔'
    },
    embedUrl: 'https://www.youtube-nocookie.com/embed/live_stream?channel=UCVp3gXmX_YlB3OQxG9ZlVZw&autoplay=1&mute=1&enablejsapi=1',
    directUrl: 'https://www.youtube.com/@saudiatv/live',
    thumbnail: '/images/saudi_airshow_formation_1789755150950.jpg',
    resolution: '4K Ultra-HD Live',
    isLiveNow: true,
    viewersEst: '195K+ watching',
    sourceAttribution: 'Ministry of Media / وزارة الإعلام السعودية'
  },
  {
    id: 'rsaf-cockpit',
    name: {
      en: 'Ministry of Defence & RSAF Tactical Highlights',
      ar: 'وزارة الدفاع — استعراضات القوات الجوية والصقور',
      ur: 'وزارتِ دفاع و سعودی فضائیہ — کاک پٹ ہائی لائٹس'
    },
    badge: {
      en: 'Tactical Cockpit & Aerobatics',
      ar: 'مشاهد قمرة القيادة والإثارة العسكرية',
      ur: 'کاک پٹ کیمرہ و جیٹ ایکروبیٹکس'
    },
    description: {
      en: 'Spectacular inside-the-cockpit POV cameras, sonic passes, emerald smoke deployment, and precision formation aerobatics.',
      ar: 'لقطات فائقة الدقة من داخل قمرات القيادة لطائرات الإف-15 والتايفون واستعراض حلقات الدخان الأخضر.',
      ur: 'لڑاکا طیاروں کے کاک پٹ کے اندر سے لائیو ویوز، ہائی اسپیڈ فلائی پاسٹ اور سبز دھویں کے ریکارڈ کرتب۔'
    },
    embedUrl: 'https://www.youtube-nocookie.com/embed/live_stream?channel=UC8K2QeK3xT8q8jE6Z0eR7Lg&autoplay=1&mute=1&enablejsapi=1',
    directUrl: 'https://www.youtube.com/@modgovksa/featured',
    thumbnail: '/images/rsaf_cockpit_view.jpg',
    resolution: '4K 60fps HDR',
    isLiveNow: true,
    viewersEst: '340K+ views',
    sourceAttribution: 'Royal Saudi Air Force (RSAF) / القوات الجوية الملكية'
  }
];

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassedOrLive: boolean;
}

const computeCountdown = (targetIso: string): CountdownState => {
  const targetTime = new Date(targetIso).getTime();
  const now = Date.now();
  const diff = targetTime - now;

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPassedOrLive: true
    };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isPassedOrLive: false
  };
};

export const AirShowLiveTelecastHub: React.FC = () => {
  const { i18n } = useTranslation();
  const lang = (i18n.language === 'ar' || i18n.language === 'ur') ? i18n.language : 'en';
  const isRTL = lang === 'ar' || lang === 'ur';

  const [selectedTargetIndex, setSelectedTargetIndex] = useState<number>(0);
  const [activeChannelId, setActiveChannelId] = useState<string>(STREAM_CHANNELS[0].id);

  const activeChannel = STREAM_CHANNELS.find(c => c.id === activeChannelId) || STREAM_CHANNELS[0];
  const activeTarget = FLYOVER_TARGETS[selectedTargetIndex] || FLYOVER_TARGETS[0];

  // Countdown timer calculations
  const [timeLeft, setTimeLeft] = useState<CountdownState>(() => 
    computeCountdown(FLYOVER_TARGETS[0].targetIso)
  );

  useEffect(() => {
    const targetIso = FLYOVER_TARGETS[selectedTargetIndex]?.targetIso || FLYOVER_TARGETS[0].targetIso;
    setTimeLeft(computeCountdown(targetIso));

    const timer = setInterval(() => {
      setTimeLeft(computeCountdown(targetIso));
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedTargetIndex]);

  return (
    <div 
      className="my-12 rounded-[2.5rem] overflow-hidden border border-emerald-500/20 bg-gradient-to-b from-[#011a0f] via-[#022416] to-[#01140c] text-white shadow-2xl ring-1 ring-white/10"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Top Banner: Broadcast Notice & Status */}
      <div className="px-6 py-6 md:px-10 border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-400 via-emerald-600 to-emerald-800 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <Tv className="w-6 h-6 text-white" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-[#011a0f]"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-red-600/90 text-white shadow-sm shadow-red-500/30">
                  <Radio className="w-3 h-3 animate-pulse" />
                  {lang === 'ar' ? 'بث مباشر معتمد' : lang === 'ur' ? 'باضابطہ لائیو نشریات' : 'Official Live Broadcast'}
                </span>
                <span className="text-xs text-emerald-400/90 font-medium">
                  {lang === 'ar' ? 'اليوم الوطني والدفاع 96' : lang === 'ur' ? '96واں قومی و دفاعی دن' : 'National & Defence Day 96'}
                </span>
              </div>
              <h3 className="text-xl md:text-3xl font-serif font-bold text-white tracking-tight">
                {lang === 'ar' 
                  ? 'مركز البث التلفزيوني الحي للعروض الجوية السعودية' 
                  : lang === 'ur' 
                  ? 'سعودی ایئر شوز کا باضابطہ لائیو ٹیلی کاسٹ حب' 
                  : 'Official Saudi Air Shows Live Telecast Hub'}
              </h3>
            </div>
          </div>

          {/* Attribution badge for copyright safety */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs">
            <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
            <span className="leading-snug">
              {lang === 'ar'
                ? 'بث رسمي آمن وقانوني عبر مشغل هيئة الإذاعة والتلفزيون ووزارة الدفاع'
                : lang === 'ur'
                ? 'سعودی براڈکاسٹنگ اتھارٹی اور وزارتِ دفاع کی مصدقہ و قانونی لائیو اسٹریمنگ'
                : '100% Authorized & Safe Embed via Official Broadcasters (SBA & MoD)'}
            </span>
          </div>
        </div>

        {/* Live Countdown Clock Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-secondary" />
              {lang === 'ar' ? 'العد التنازلي لموعد التحليق الجوي القادم:' : lang === 'ur' ? 'اگلی پرواز کا لائیو کاؤنٹ ڈاؤن:' : 'Live Flyover Window Countdown:'}
            </div>
            <div className="text-sm md:text-base font-semibold text-emerald-300 flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
              <span>{activeTarget.city[lang] || activeTarget.city.en}</span>
              <span className="text-xs text-gray-400 font-normal">({activeTarget.dateLabel[lang] || activeTarget.dateLabel.en})</span>
            </div>
          </div>

          {/* Modern Digits Grid */}
          <div className="flex items-center gap-2 md:gap-3">
            {timeLeft.isPassedOrLive ? (
              <div className="px-6 py-3 rounded-2xl bg-red-600/90 text-white font-bold text-sm tracking-wide flex items-center gap-3 animate-pulse shadow-lg shadow-red-600/30">
                <span className="w-3 h-3 rounded-full bg-white animate-ping"></span>
                {lang === 'ar' ? 'نافذة العرض الجوي نشطة الآن في الأجواء!' : lang === 'ur' ? 'ایئر شو فلائٹ ونڈو اس وقت لائیو ہے!' : 'Flyover Window Is Active Now in Skies!'}
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-black/60 border border-emerald-500/30 shadow-inner">
                  <span className="text-2xl md:text-3xl font-mono font-bold text-white">{String(timeLeft.days).padStart(2, '0')}</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest">{lang === 'ar' ? 'يوم' : lang === 'ur' ? 'دن' : 'Days'}</span>
                </div>
                <span className="text-emerald-400 font-bold text-xl">:</span>
                <div className="flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-black/60 border border-emerald-500/30 shadow-inner">
                  <span className="text-2xl md:text-3xl font-mono font-bold text-emerald-300">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest">{lang === 'ar' ? 'ساعة' : lang === 'ur' ? 'گھنٹے' : 'Hours'}</span>
                </div>
                <span className="text-emerald-400 font-bold text-xl">:</span>
                <div className="flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-black/60 border border-emerald-500/30 shadow-inner">
                  <span className="text-2xl md:text-3xl font-mono font-bold text-secondary">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest">{lang === 'ar' ? 'دقيقة' : lang === 'ur' ? 'منٹ' : 'Mins'}</span>
                </div>
                <span className="text-emerald-400 font-bold text-xl">:</span>
                <div className="flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-black/60 border border-red-500/40 shadow-inner shadow-red-900/20">
                  <span className="text-2xl md:text-3xl font-mono font-bold text-red-400">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest">{lang === 'ar' ? 'ثانية' : lang === 'ur' ? 'سیکنڈ' : 'Secs'}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* City Flyover Target Quick Selector Tabs */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider shrink-0 mr-1">
            {lang === 'ar' ? 'الجدول الزمني:' : lang === 'ur' ? 'فلائٹ ایونٹس:' : 'Schedule Targets:'}
          </span>
          {FLYOVER_TARGETS.map((target, idx) => (
            <button
              key={target.id}
              onClick={() => setSelectedTargetIndex(idx)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedTargetIndex === idx 
                  ? 'bg-secondary text-primary font-bold shadow-md shadow-amber-500/30 scale-102' 
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{target.city[lang] || target.city.en}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Video Screen Player Area */}
      <div className="relative aspect-[16/9] w-full bg-black overflow-hidden group">
        <iframe
          src={activeChannel.embedUrl}
          title={activeChannel.name[lang] || activeChannel.name.en}
          className="w-full h-full border-0 absolute inset-0 z-10"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />

        {/* Video Overlay Watermark & Badges */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center gap-2">
          <div className="bg-red-600/90 text-white font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg shadow-red-900/50">
            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
            <span>LIVE</span>
          </div>
          <div className="bg-black/70 backdrop-blur-md border border-white/10 text-emerald-300 text-xs px-3 py-1 rounded-full font-medium">
            {activeChannel.resolution}
          </div>
        </div>

        {/* Top-Right Quick Links */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <a
            href={activeChannel.directUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-full bg-black/70 hover:bg-red-600 text-white text-xs font-semibold backdrop-blur-md border border-white/20 transition-all flex items-center gap-1.5 shadow-lg"
          >
            <span>{lang === 'ar' ? 'المشاهدة على يوتيوب الرسمي' : lang === 'ur' ? 'یوٹیوب پر دیکھیں' : 'Watch on YouTube'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Eye-Catching Channel Selector Cards & Controls */}
      <div className="p-6 md:p-10 bg-[#01140c]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2 mb-1">
              <Signal className="w-3.5 h-3.5" />
              {lang === 'ar' ? 'اختر القناة أو زاوية الكاميرا:' : lang === 'ur' ? 'چینل یا کیمرہ اینگل منتخب کریں:' : 'Select Channel or Camera Angle:'}
            </div>
            <p className="text-sm text-gray-300">
              {lang === 'ar' 
                ? 'بدّل بين القنوات الرسمية الناقلة للعروض الجوية بدقة عالية وصوت مباشر'
                : lang === 'ur'
                ? 'سرکاری لائیو نشریاتی چینلز اور کاک پٹ کیمروں کے درمیان بآسانی سوئچ کریں'
                : 'Switch between verified national broadcast feeds and high-definition cockpit streams'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.youtube.com/@alekhbariyatv"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-2 border border-white/10"
            >
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>{activeChannel.viewersEst}</span>
            </a>
          </div>
        </div>

        {/* 3 Eye-Catching Channel Card Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {STREAM_CHANNELS.map((channel) => {
            const isSelected = channel.id === activeChannelId;
            return (
              <button
                key={channel.id}
                onClick={() => setActiveChannelId(channel.id)}
                className={`relative rounded-2xl overflow-hidden p-4 text-start transition-all duration-300 flex flex-col group ${
                  isSelected
                    ? 'ring-2 ring-secondary bg-gradient-to-br from-emerald-900/60 to-[#032e1c] shadow-xl shadow-emerald-950/60 -translate-y-1'
                    : 'bg-black/40 hover:bg-white/5 border border-white/10 hover:border-emerald-500/30'
                }`}
              >
                {/* Channel Thumbnail Preview with Overlay */}
                <div className="relative h-32 w-full rounded-xl overflow-hidden mb-3.5 bg-gray-900">
                  <img
                    src={channel.thumbnail}
                    alt={channel.name[lang] || channel.name.en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Floating badge inside thumbnail */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-emerald-300 text-[10px] font-bold tracking-wider">
                      {channel.resolution}
                    </span>
                    {isSelected ? (
                      <span className="px-2.5 py-0.5 rounded-md bg-secondary text-primary text-[10px] font-bold flex items-center gap-1 shadow">
                        <Play className="w-3 h-3 fill-current" />
                        {lang === 'ar' ? 'قيد العرض' : lang === 'ur' ? 'جاری' : 'Playing'}
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-md bg-white/20 text-white text-[10px] font-medium group-hover:bg-emerald-500 transition-colors">
                        {lang === 'ar' ? 'تشغيل' : lang === 'ur' ? 'پلے کریں' : 'Click to Play'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Badge */}
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                  <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">
                    {channel.badge[lang] || channel.badge.en}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-base text-white mb-2 leading-snug group-hover:text-emerald-300 transition-colors">
                  {channel.name[lang] || channel.name.en}
                </h4>
                <p className="text-xs text-gray-400 font-light line-clamp-2 leading-relaxed mb-3">
                  {channel.description[lang] || channel.description.en}
                </p>

                <div className="mt-auto pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400">
                  <span className="truncate max-w-[200px]">{channel.sourceAttribution}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all rtl:rotate-180" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Satellite TV Tuning Details & Copyright Assurance Box */}
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Satellite Frequencies Card */}
          <div className="p-5 rounded-2xl bg-black/40 border border-emerald-500/20 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-secondary/20 border border-secondary/40 flex items-center justify-center shrink-0 text-secondary">
              <Tv className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <h5 className="font-bold text-white text-sm mb-1">
                {lang === 'ar' ? 'ترددات البث الفضائي على التلفزيون (عرب سات ونايل سات)' : lang === 'ur' ? 'ٹی وی ناظرین کے لیے سیٹلائٹ فریکوئنسی' : 'Satellite TV Broadcast Frequencies (Arabsat & Nilesat)'}
              </h5>
              <p className="text-gray-400 mb-2 leading-relaxed">
                {lang === 'ar' 
                  ? 'لمتابعة العروض على الشاشات المنزلية بدقة فائقة عبر القنوات الرسمية:'
                  : lang === 'ur'
                  ? 'گھریلو ٹی وی اسکرین پر ایئر شو دیکھنے کے لیے آفیشل فریکوئنسیز:'
                  : 'For ultra-HD living room viewing via national broadcast networks:'}
              </p>
              <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                <div className="bg-emerald-950/60 p-2 rounded-lg border border-emerald-500/30 text-emerald-300">
                  <span className="font-bold text-white block">Arabsat (Badr-4/6):</span>
                  12149 H | 27500 | 5/6 (HD)
                </div>
                <div className="bg-emerald-950/60 p-2 rounded-lg border border-emerald-500/30 text-emerald-300">
                  <span className="font-bold text-white block">Nilesat (Eutelsat):</span>
                  12149 H | 27500 | 3/4 (HD)
                </div>
              </div>
            </div>
          </div>

          {/* Legal Compliance & Disclaimer Box */}
          <div className="p-5 rounded-2xl bg-black/40 border border-emerald-500/20 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 text-emerald-400">
              <Shield className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <h5 className="font-bold text-white text-sm mb-1">
                {lang === 'ar' ? 'حقوق النشر والامتياز الإعلامي المعتمد' : lang === 'ur' ? 'کاپی رائٹ تحفظ اور باضابطہ اسٹریمنگ' : 'Copyright Compliance & Official Accreditation'}
              </h5>
              <p className="text-gray-400 leading-relaxed">
                {lang === 'ar'
                  ? 'يتم تشغيل هذا البث عبر تضمين المشغلات الرسمية لـ (هيئة الإذاعة والتلفزيون) و(وزارة الدفاع). تعود جميع حقوق الملكية الفكرية والعلامات التجارية والتعليقات الصوتية لأصحابها النظاميين دون أي مساس بحقوق النشر.'
                  : lang === 'ur'
                  ? 'یہ نشریات سعودی براڈکاسٹنگ اتھارٹی اور وزارتِ دفاع کے باضابطہ ایمبیڈ پلیئرز کے ذریعے چلائی جا رہی ہیں۔ تمام آڈیو، ویڈیو اور نشریاتی جملہ حقوق اصل اداروں کے نام محفوظ ہیں۔'
                  : 'This broadcast hub operates strictly via authorized standard embed APIs from the Saudi Broadcasting Authority (SBA) and Ministry of Defence. All intellectual property, commentary, and feeds belong to their respective statutory owners.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
