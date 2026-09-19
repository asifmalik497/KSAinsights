import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  MapPin, 
  Clock, 
  Shield, 
  Sparkles, 
  Navigation, 
  CheckCircle2, 
  Eye, 
  Crosshair, 
  Radio, 
  Compass, 
  PlaneTakeoff 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface AirShowInteractiveViewerProps {
  heroImage?: string;
}

export const AirShowInteractiveViewer: React.FC<AirShowInteractiveViewerProps> = ({
  heroImage = '/images/saudi_airshow_formation_1789755150950.jpg'
}) => {
  const { i18n } = useTranslation();
  const lang = (i18n.language === 'ar' || i18n.language === 'ur') ? i18n.language : 'en';
  const isRTL = lang === 'ar' || lang === 'ur';

  // Video-simulation playback state (33-second loop)
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [showRadar, setShowRadar] = useState<boolean>(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // 6 Major Kingdom Cities & Regional Air Corridors
  const cities = [
    {
      id: 'jeddah',
      tag: { en: 'Western Coast', ar: 'الساحل الغربي', ur: 'مغربی ساحل' },
      name: {
        en: 'Jeddah Waterfront & North Corniche',
        ar: 'واجهة جدة البحرية والكورنيش الشمالي',
        ur: 'جدہ واٹر فرنٹ و نارتھ کارنیش'
      },
      dates: {
        en: 'September 18 – 20, 2026',
        ar: '18 – 20 سبتمبر 2026',
        ur: '18 تا 20 ستمبر 2026'
      },
      time: {
        en: '4:30 PM – 5:45 PM (Daily Sunset Flypast)',
        ar: '4:30 مساءً – 5:45 مساءً (يومياً عند الغروب)',
        ur: 'شام 4:30 تا 5:45 بجے (روزانہ بوقتِ غروبِ آفتاب)'
      },
      aircraft: {
        en: 'Saudi Hawks (Hawk 165), F-15SA Eagle, Eurofighter Typhoon',
        ar: 'فريق الصقور السعودية (هوك 165)، إف-15 إس إيه، تايفون',
        ur: 'سعودی ہاکس، ایف 15 ایس اے ایگل، یوروفائٹر ٹائفون'
      },
      primeSpots: [
        {
          name: { en: 'Roshan Waterfront Promenade', ar: 'ممشى واجهة روشن البحرية', ur: 'روشن واٹر فرنٹ پرومینیڈ' },
          note: { en: 'Front-row view of low-altitude Red Sea flyovers and green smoke loops', ar: 'إطلالة مباشرة على حلقات دوران منخفضة مع انبعاث الدخان الأخضر على مياه البحر', ur: 'بحیرہ احمر پر کم اونچائی پر پرواز اور سبز دھویں کے کرتب' }
        },
        {
          name: { en: 'King Fahd Fountain Overlook', ar: 'منطقة نافورة الملك فهد', ur: 'شاہ فہد فاؤنٹین کا ساحلی حصہ' },
          note: { en: 'Spectacular photo composition with the world’s tallest fountain backdrop', ar: 'زاوية تصوير بانورامية استثنائية مع خلفية النافورة الأطول في العالم', ur: 'دنیا کے سب سے اونچے فوارے کے پس منظر کے ساتھ شاندار کیمرہ ویو' }
        },
        {
          name: { en: 'North Bay & Pier Family Parks', ar: 'حدائق رصيف الكورنيش والخليج الشمالي', ur: 'کارنیش پیئر اور نارتھ بے فیملی پارکس' },
          note: { en: 'Dedicated seating lawns and shaded picnic zones open from 2:30 PM', ar: 'مساحات عشبية عائلية ومواقف مجانية تفتح مبكراً من 2:30 ظهراً', ur: 'فیملیز کے لیے سایہ دار لان اور فری پارکنگ دوپہر 2:30 بجے دستیاب' }
        }
      ],
      radarPoints: [
        { x: 30, y: 70, label: 'Roshan' },
        { x: 50, y: 50, label: 'North Bay' },
        { x: 75, y: 35, label: 'Fountain' }
      ],
      flightPathD: 'M 15 85 Q 35 60 50 48 T 85 25',
      coordinates: '21.5833° N, 39.1067° E'
    },
    {
      id: 'riyadh',
      tag: { en: 'Capital Center', ar: 'قلب العاصمة', ur: 'دارالحکومت' },
      name: {
        en: 'Riyadh Capital Sky & KAFD',
        ar: 'سماء العاصمة الرياض ومركز الملك عبدالله المالي (KAFD)',
        ur: 'ریاض دارالحکومت، کے اے ایف ڈی اور الدرعیہ'
      },
      dates: {
        en: 'September 21 – 23, 2026',
        ar: '21 – 23 سبتمبر 2026',
        ur: '21 تا 23 ستمبر 2026'
      },
      time: {
        en: '4:00 PM – 5:30 PM (Grand Finale on Sept 23)',
        ar: '4:00 مساءً – 5:30 مساءً (العرض الختامي الكبير 23 سبتمبر)',
        ur: 'شام 4:00 تا 5:30 بجے (23 ستمبر کو گرینڈ فائنل)'
      },
      aircraft: {
        en: 'Combined Air Fleet: F-15C/SA, Tornado IDS, Typhoon, Airbus A330 MRTT',
        ar: 'الأسطول الجوي المشترك: إف-15، تورنيدو، تايفون، وطائرات التزود بالوقود A330',
        ur: 'مشترکہ فضائی بیڑہ: ایف-15، ٹورنیڈو، ٹائفون اور ایئر بس اے 330 ٹینکر'
      },
      primeSpots: [
        {
          name: { en: 'KAFD Financial Plaza Rooftops & Open Courts', ar: 'ساحات وحدائق مركز الملك عبدالله المالي (KAFD)', ur: 'کے اے ایف ڈی فنانشل پلازہ اور باغات' },
          note: { en: 'Jets roar between iconic futuristic skyscrapers in tight delta formations', ar: 'تحليق التشكيلات النفاثة بين الأبراج المعمارية الشاهقة بهدير جبار', ur: 'فلک بوس عمارتوں کے عین درمیان سے جیٹس کی پرواز اور شیشوں پر عکس' }
        },
        {
          name: { en: 'Diriyah Historical Bujairi Heritage District', ar: 'حي البجيري التراثي التاريخي بالدرعية', ur: 'تاریخی درعیہ، بجیری ہیریٹیج ایریا' },
          note: { en: 'Stunning contrast of historic Najdi mud-brick architecture and modern fighter jets', ar: 'مشهد بديع يجمع بين العمارة الطينية النجدية التاريخية وأحدث المقاتلات', ur: 'تاریخی نجدی دیواروں اور جدید ترین جنگی طیاروں کا حسین سنگم' }
        },
        {
          name: { en: 'King Fahd Cultural Center Park', ar: 'حديقة مركز الملك فهد الثقافي', ur: 'شاہ فہد کلچرل سینٹر پارک' },
          note: { en: 'Spacious elevated hilltops, ideal for telephoto zoom photography and families', ar: 'تلال مرتفعة ومساحات عشبية مفتوحة مثالية للتصوير الاحترافي والعائلات', ur: 'بلند ٹیلے، بہترین کیمرہ اینگلز اور فیملیز کے لیے پرسکون ماحول' }
        }
      ],
      radarPoints: [
        { x: 25, y: 40, label: 'KAFD' },
        { x: 55, y: 55, label: 'Kingdom' },
        { x: 80, y: 70, label: 'Diriyah' }
      ],
      flightPathD: 'M 10 30 Q 35 45 60 55 T 90 75',
      coordinates: '24.7136° N, 46.6753° E'
    },
    {
      id: 'khobar',
      tag: { en: 'Eastern Province', ar: 'المنطقة الشرقية', ur: 'مشرقی صوبہ' },
      name: {
        en: 'Al-Khobar Corniche & Half Moon Bay',
        ar: 'كورنيش الخبر وشاطئ نصف القمر (المنطقة الشرقية)',
        ur: 'الخبر کارنیش و ہاف مون ساحل (مشرقی صوبہ)'
      },
      dates: {
        en: 'September 19 – 21, 2026',
        ar: '19 – 21 سبتمبر 2026',
        ur: '19 تا 21 ستمبر 2026'
      },
      time: {
        en: '4:15 PM – 5:20 PM',
        ar: '4:15 مساءً – 5:20 مساءً',
        ur: 'شام 4:15 تا 5:20 بجے'
      },
      aircraft: {
        en: 'RSAF Aerobatic Team + Royal Saudi Navy Seahawk Helicopters',
        ar: 'صقور الجو السعودية مع مروحيات سي هوك البحرية الملكية',
        ur: 'سعودی ایئرفورس ایکروبیٹکس اور بحریہ کے سی ہاک ہیلی کاپٹرز'
      },
      primeSpots: [
        {
          name: { en: 'Al-Khobar Water Tower Park', ar: 'محيط برج مياه الخبر والكورنيش الجنوبي', ur: 'الخبر واٹر ٹاور پارک اور ساؤتھ کارنیش' },
          note: { en: 'Front-row view of joint maritime rescue drills and sky acrobatics', ar: 'إطلالة مباشرة على عروض الإنزال البحري والمناورات الجوية المشتركة', ur: 'بحری مشقوں اور فضائی کرتب کا سب سے قریبی اور واضح منظر' }
        },
        {
          name: { en: 'King Fahd Causeway Scenic Point', ar: 'نقطة مشاهدة جسر الملك فهد', ur: 'شاہ فہد کاز وے سینک پوائنٹ' },
          note: { en: 'Fighter formations cruise directly across the international bridge', ar: 'استعراضات جوية تعبر مباشرة فوق الجسر الدولي الرابط مع البحرين', ur: 'بحرین و سعودی عرب کے بین الاقوامی پل پر پرواز کا منظر' }
        },
        {
          name: { en: 'Dammam Murjan Island', ar: 'جزيرة المرجان بالدمام', ur: 'دمام مرجان آئی لینڈ' },
          note: { en: '360-degree open sky views over Arabian Gulf waves', ar: 'رؤية بانورامية بزاوية 360 درجة فوق مياه الخليج العربي الصافية', ur: 'خلیج عرب کی لہروں پر 360 ڈگری کھلا آسمانی منظر' }
        }
      ],
      radarPoints: [
        { x: 30, y: 30, label: 'Murjan' },
        { x: 60, y: 60, label: 'Water Tower' },
        { x: 85, y: 80, label: 'Causeway' }
      ],
      flightPathD: 'M 20 20 Q 45 50 65 65 T 90 90',
      coordinates: '26.2886° N, 50.2083° E'
    },
    {
      id: 'taif',
      tag: { en: 'Makkah Highlands', ar: 'مرتفعات مكة', ur: 'طائف پہاڑی سلسلہ' },
      name: {
        en: 'Taif Al-Rudaf & Al-Hada Heights',
        ar: 'سماء الطائف ومنتزه الردف ومرتفعات الهدا',
        ur: 'طائف، الردف پارک اور الھدا ہائٹس'
      },
      dates: {
        en: 'September 22 – 23, 2026',
        ar: '22 – 23 سبتمبر 2026',
        ur: '22 تا 23 ستمبر 2026'
      },
      time: {
        en: '4:45 PM – 5:30 PM',
        ar: '4:45 مساءً – 5:30 مساءً',
        ur: 'شام 4:45 تا 5:30 بجے'
      },
      aircraft: {
        en: 'King Fahd Air Base Eurofighter Typhoons & Tornado IDS',
        ar: 'مقاتلات التايفون والتورنيدو من قاعدة الملك فهد الجوية',
        ur: 'شاہ فہد ایئر بیس کے ٹائفون اور ٹورنیڈو طیارے'
      },
      primeSpots: [
        {
          name: { en: 'Al-Rudaf National Park Lawns', ar: 'منتزه الردف الوطني', ur: 'الردف نیشنل پارک' },
          note: { en: 'Spacious family seating around musical fountains as jets fly low over mountain ridges', ar: 'مساحات عائلية فسيحة حول النوافير مع تحليق المقاتلات فوق قمم الجبال', ur: 'پہاڑوں کی چوٹیوں کے اوپر سے پرواز اور فیملیز کے لیے پرسکون ماحول' }
        },
        {
          name: { en: 'Al-Hada Cable Car Summit View', ar: 'قمم تلفريك الهدا وجبل كرا', ur: 'الھدا کیبل کار سمٹ' },
          note: { en: 'Look down on jet smoke plumes from cool mountain lookout decks', ar: 'إطلالة باردة من أعلى القمم لمشاهدة الدخان الأخضر أسفل خط الأفق', ur: 'پہاڑ کی بلندی سے طیاروں اور سبز دھویں کا دلکش نظارہ' }
        },
        {
          name: { en: 'King Fahd Ring Road Overlook', ar: 'مطل الطريق الدائري بالطائف', ur: 'شاہ فہد رنگ روڈ اوور لک' },
          note: { en: 'Easy vehicular access with clear views of military base approach paths', ar: 'موقع ممتاز وسهل الوصول لمتابعة هبوط وإقلاع التشكيلات المقاتلة', ur: 'گاڑیوں کے لیے آسان رسائی اور فوجی ایئربیس کے روٹ کا واضح منظر' }
        }
      ],
      radarPoints: [
        { x: 35, y: 35, label: 'Base' },
        { x: 55, y: 55, label: 'Al-Rudaf' },
        { x: 80, y: 75, label: 'Al-Hada' }
      ],
      flightPathD: 'M 25 25 Q 45 45 60 60 T 85 85',
      coordinates: '21.2854° N, 40.4222° E'
    },
    {
      id: 'abha',
      tag: { en: 'Asir Region', ar: 'منطقة عسير', ur: 'عسیر ریجن' },
      name: {
        en: 'Abha & Khamis Mushait (Asir Skies)',
        ar: 'أبها وخميس مشيط (سماء عسير الساحرة)',
        ur: 'ابہا و خمیس مشیط (عسیر کی فضائیں)'
      },
      dates: {
        en: 'September 22 – 23, 2026',
        ar: '22 – 23 سبتمبر 2026',
        ur: '22 تا 23 ستمبر 2026'
      },
      time: {
        en: '4:20 PM – 5:10 PM',
        ar: '4:20 مساءً – 5:10 مساءً',
        ur: 'شام 4:20 تا 5:10 بجے'
      },
      aircraft: {
        en: 'King Khalid Air Base F-15SA Eagle Squadron',
        ar: 'سرب مقاتلات إف-15 إس إيه من قاعدة الملك خالد الجوية',
        ur: 'شاہ خالد ایئر بیس سے ایف 15 ایس اے لڑاکا اسکواڈرن'
      },
      primeSpots: [
        {
          name: { en: 'Abu Kheyal Mountain Park (Abha)', ar: 'حديقة أبو خيال وشارع الفن بأبها', ur: 'ابو خیال ماؤنٹین پارک و شارع الفن' },
          note: { en: 'Misty cloud layers creating cinematic backdrops for roaring afterburners', ar: 'تشكيلات الضباب والغيوم تمنح العروض الجوية بعداً جمالياً لا يضاهى', ur: 'دھند، بادلوں اور جیٹس کے سنہری آفٹر برنر کا سحر انگیز امتزاج' }
        },
        {
          name: { en: 'Al-Dabab Fog Walkway', ar: 'ممشى الضباب المعلق', ur: 'ممشى الضباب (فوگ واک وے)' },
          note: { en: 'Suspended cliffside boardwalk providing top-down perspectives of military flybys', ar: 'ممشى معلق فوق السحاب يتيح رؤية الطائرات وهي تحلق على مستوى العين', ur: 'بادلوں کے اوپر بنا راستہ جہاں سے پروازیں آنکھوں کے بالکل سامنے دکھائی دیتی ہیں' }
        },
        {
          name: { en: 'Khamis Mushait Boulevard', ar: 'بوليفارد خميس مشيط وحديقة الملك فهد', ur: 'خمیس مشیط بولیوارڈ و شاہ فہد پارک' },
          note: { en: 'Prime location nearest to the main air base takeoff vectors', ar: 'الموقع الأقرب لمسار الإقلاع الصاروخي للمقاتلات الحربية', ur: 'لڑاکا طیاروں کے ٹیک آف کے راستے کے قریب ترین فیملی مقام' }
        }
      ],
      radarPoints: [
        { x: 30, y: 70, label: 'Base' },
        { x: 50, y: 45, label: 'Khamis' },
        { x: 75, y: 30, label: 'Abha Fog' }
      ],
      flightPathD: 'M 20 80 Q 40 55 55 45 T 85 20',
      coordinates: '18.2164° N, 42.5053° E'
    },
    {
      id: 'tabuk',
      tag: { en: 'Northern Frontier', ar: 'الحدود الشمالية', ur: 'شمالی سرحد' },
      name: {
        en: 'Tabuk & Coastal Sharma (NEOM Gateway)',
        ar: 'تبوك وشواطئ شرما وقيال (بوابة نيوم)',
        ur: 'تبوک و شرما کوسٹل فرنٹ (نیوم گیٹ وے)'
      },
      dates: {
        en: 'September 20 – 21, 2026',
        ar: '20 – 21 سبتمبر 2026',
        ur: '20 تا 21 ستمبر 2026'
      },
      time: {
        en: '4:15 PM – 5:00 PM',
        ar: '4:15 مساءً – 5:00 مساءً',
        ur: 'شام 4:15 تا 5:00 بجے'
      },
      aircraft: {
        en: 'King Faisal Air Base Tactical Wings',
        ar: 'أجنحة الطيران التكتيكي من قاعدة الملك فيصل الجوية',
        ur: 'شاہ فیصل ایئر بیس کے خصوصی ٹیکٹیکل ونگز'
      },
      primeSpots: [
        {
          name: { en: 'Prince Fahd Bin Sultan Park (Tabuk)', ar: 'منتزه الأمير فهد بن سلطان بتبوك', ur: 'پرنس فہد بن سلطان پارک تبوک' },
          note: { en: 'Lush central urban park with excellent wide-sky visibility', ar: 'مساحات فسيحة وسط المدينة تتيح رؤية واضحة للتشكيلات الجوية', ur: 'وسیع شہری پارک جہاں سے کھلا آسمان صاف دکھائی دیتا ہے' }
        },
        {
          name: { en: 'Sharma Waterfront Promenade', ar: 'كورنيش شرما الساحلي', ur: 'شرما کارنیش و بیچ' },
          note: { en: 'Flyovers against the futuristic coastal development horizons of NEOM', ar: 'عروض جوية تحلق فوق شواطئ البحر الأحمر بمحاذاة مشاريع نيوم المستقبلية', ur: 'نیوم کے مستقبل کے ساحلی کناروں پر فضائی پرواز' }
        },
        {
          name: { en: 'Gayal Beach Overlook', ar: 'شاطئ قيال والمطل البحري', ur: 'قیال بیچ اوور لک' },
          note: { en: 'Crystal clear turquoise water contrast with green smoke aerobatics', ar: 'تدرجات مياه البحر الفيروزية مع الدخان الأخضر في لقطات فوتوغرافية مبهرة', ur: 'نیلے پانیوں پر سبز دھویں کے کرتب کی دلکش تصویر کشی' }
        }
      ],
      radarPoints: [
        { x: 30, y: 30, label: 'Base' },
        { x: 55, y: 55, label: 'Tabuk' },
        { x: 85, y: 75, label: 'Sharma' }
      ],
      flightPathD: 'M 20 20 Q 45 45 60 60 T 90 85',
      coordinates: '28.3835° N, 36.5550° E'
    }
  ];

  // Synthesize soft ambient jet rush using Web Audio API safely
  const toggleSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (soundEnabled) {
        if (gainNodeRef.current) {
          gainNodeRef.current.gain.setTargetAtTime(0, ctx.currentTime, 0.1);
        }
        setSoundEnabled(false);
      } else {
        // Generate gentle aerodynamic jet sweep tone
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = (Math.random() * 2 - 1) * 0.12;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = buffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 450;

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.6);

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        whiteNoise.start(0);
        gainNodeRef.current = gainNode;
        setSoundEnabled(true);
      }
    } catch (e) {
      console.warn('Audio synthesis not supported on this browser', e);
      setSoundEnabled(false);
    }
  };

  // 36-second loop timer (6 seconds per city)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev + 0.25) % 36);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeCityIndex = Math.min(Math.floor(progress / 6), cities.length - 1);
  const activeCity = cities[activeCityIndex];

  return (
    <div 
      className="my-14 rounded-3xl overflow-hidden border border-emerald-800/30 bg-gradient-to-b from-[#011d11] via-[#04281a] to-[#01140c] text-white shadow-2xl ring-1 ring-white/10"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Top Banner Header */}
      <div className="px-6 py-5 md:px-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <Shield className="text-white w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-emerald-400 font-bold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" />
              {lang === 'ar' ? 'القوات الجوية الملكية السعودية' : lang === 'ur' ? 'سعودی فضائیہ و دفاعی فلائٹ شو' : 'Royal Saudi Air Force (RSAF)'}
            </div>
            <h3 className="text-lg md:text-2xl font-serif font-bold text-white tracking-wide">
              {lang === 'ar' ? 'محاكاة العروض الجوية لليوم الوطني 96 (مباشر لكافة المدن)' : lang === 'ur' ? 'نیشنل و ڈیفنس ڈے ایئر شو لائیو سمولیشن (تمام بڑے شہر)' : 'National Day 96 Air Show Flight Simulator'}
            </h3>
          </div>
        </div>

        {/* Live Badges */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setShowRadar(!showRadar)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              showRadar 
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/40' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
            }`}
          >
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            {lang === 'ar' ? 'رادار المسار' : lang === 'ur' ? 'فلائٹ رڈار' : 'Flight Radar'}
          </button>
          <span className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            {lang === 'ar' ? 'فريق الصقور السعودية' : lang === 'ur' ? 'سعودی ہاکس ایکروبیٹکس' : 'Saudi Hawks Aerobatics'}
          </span>
        </div>
      </div>

      {/* Main Video Simulation Player Screen */}
      <div className="relative aspect-[16/9] min-h-[300px] w-full overflow-hidden bg-black select-none group">
        {/* Animated Image Canvas with Cinematic Pan & Zoom */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{
            scale: isPlaying ? [1, 1.07, 1.02, 1] : 1.03,
            x: isPlaying ? [0, -18, 12, 0] : -5,
            y: isPlaying ? [0, -10, 6, 0] : 0
          }}
          transition={{
            duration: 36,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img
            src={heroImage}
            alt="Royal Saudi Air Force Jets Performing Air Show with Emerald Green Smoke"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Ambient Emerald & Gold Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/50 pointer-events-none" />

        {/* Animated Dynamic Green and White Jet Smoke Plumes */}
        {isPlaying && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Green Smoke Trail 1 */}
            <motion.div
              className="absolute h-3 rounded-full bg-gradient-to-r from-transparent via-emerald-400/90 to-transparent blur-[3px]"
              style={{ top: '36%', width: '130%' }}
              animate={{
                x: isRTL ? ['100%', '-100%'] : ['-100%', '100%'],
                opacity: [0, 0.95, 0]
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
            {/* White Smoke Trail 2 */}
            <motion.div
              className="absolute h-2.5 rounded-full bg-gradient-to-r from-transparent via-white/85 to-transparent blur-[2px]"
              style={{ top: '43%', width: '130%' }}
              animate={{
                x: isRTL ? ['100%', '-100%'] : ['-100%', '100%'],
                opacity: [0, 0.85, 0]
              }}
              transition={{
                duration: 5.5,
                delay: 0.5,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
            {/* Green Smoke Trail 3 */}
            <motion.div
              className="absolute h-3.5 rounded-full bg-gradient-to-r from-transparent via-emerald-500/95 to-transparent blur-[4px]"
              style={{ top: '50%', width: '130%' }}
              animate={{
                x: isRTL ? ['100%', '-100%'] : ['-100%', '100%'],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 5.5,
                delay: 1.1,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </div>
        )}

        {/* Jet Radar Telemetry Overlay */}
        <div className="absolute top-5 left-5 rtl:left-auto rtl:right-5 bg-black/70 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2.5 text-xs text-white flex items-center gap-3 shadow-2xl z-20">
          <Navigation className="w-5 h-5 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
          <div>
            <div className="text-[10px] text-emerald-300 font-mono tracking-widest uppercase flex items-center gap-1.5">
              <span>{activeCity.tag[lang]}</span>
              <span className="text-white/40">•</span>
              <span>{activeCity.coordinates}</span>
            </div>
            <div className="font-bold text-sm md:text-base text-white">
              {activeCity.name[lang]}
            </div>
          </div>
        </div>

        {/* Live Radar Graphic Map HUD (Toggled) */}
        {showRadar && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-5 right-5 rtl:right-auto rtl:left-5 w-44 h-44 md:w-52 md:h-52 bg-black/75 backdrop-blur-lg border border-emerald-500/40 rounded-3xl p-3 shadow-2xl z-20 hidden sm:flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400">
              <span className="flex items-center gap-1">
                <Crosshair className="w-3 h-3 text-emerald-400" />
                RADAR_HUD
              </span>
              <span className="text-white/60">360° RSAF</span>
            </div>

            {/* Radar Scope */}
            <div className="relative w-full h-28 md:h-32 flex items-center justify-center overflow-hidden">
              {/* Concentric Circles */}
              <div className="absolute w-28 h-28 border border-emerald-500/20 rounded-full" />
              <div className="absolute w-20 h-20 border border-emerald-500/30 rounded-full" />
              <div className="absolute w-10 h-10 border border-emerald-500/40 rounded-full" />
              {/* Crosshairs */}
              <div className="absolute w-full h-[1px] bg-emerald-500/20" />
              <div className="absolute h-full w-[1px] bg-emerald-500/20" />

              {/* Radar Sweep Line */}
              <div 
                className="absolute w-full h-full rounded-full border-r-2 border-emerald-400/80 animate-spin pointer-events-none"
                style={{ animationDuration: '3.5s', animationTimingFunction: 'linear' }}
              />

              {/* Dynamic Flight Path SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                <path
                  d={activeCity.flightPathD}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeDasharray="4 3"
                  className="animate-pulse"
                />
              </svg>

              {/* Waypoints */}
              {activeCity.radarPoints.map((pt, i) => (
                <div 
                  key={`pt-${i}`}
                  className="absolute w-2.5 h-2.5 rounded-full bg-secondary border border-white shadow-lg shadow-amber-400/50"
                  style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                >
                  <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold text-white bg-black/70 px-1 rounded whitespace-nowrap">
                    {pt.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-[10px] font-mono text-gray-300 flex items-center justify-between border-t border-white/10 pt-1.5">
              <span>WAYPOINTS: 3</span>
              <span className="text-secondary font-bold">ACTIVE</span>
            </div>
          </motion.div>
        )}

        {/* Center Play Overlay when Paused */}
        {!isPlaying && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] z-30"
          >
            <button
              onClick={() => setIsPlaying(true)}
              className="w-20 h-20 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-2xl hover:bg-emerald-400 hover:scale-110 transition-all ring-4 ring-white/30"
              aria-label="Play flight simulation"
            >
              <Play className="w-8 h-8 ml-1 rtl:mr-1 rtl:ml-0 fill-current" />
            </button>
          </motion.div>
        )}

        {/* Bottom Control Bar */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/85 to-transparent p-4 md:p-6 flex flex-col gap-3 z-30">
          {/* Progress Bar (36-second cycle) */}
          <div 
            className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden cursor-pointer relative"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const ratio = Math.max(0, Math.min(1, clickX / rect.width));
              setProgress(ratio * 36);
            }}
          >
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-secondary rounded-full transition-all duration-100"
              style={{ width: `${(progress / 36) * 100}%` }}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-200">
            {/* Play/Pause, Reset & Audio Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5 rtl:mr-0.5" />}
              </button>
              <button
                onClick={() => setProgress(0)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-all"
                title="Restart Tour"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={toggleSound}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  soundEnabled ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/50' : 'bg-white/10 text-gray-300 hover:text-white'
                }`}
                title={soundEnabled ? 'Mute jet sound' : 'Enable ambient jet rush'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <span className="font-mono text-[11px] text-gray-300 hidden sm:inline">
                0:{Math.floor(progress).toString().padStart(2, '0')} / 0:36
              </span>
            </div>

            {/* City Segment Navigation Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 scrollbar-none">
              {cities.map((city, idx) => (
                <button
                  key={city.id}
                  onClick={() => {
                    setProgress(idx * 6);
                  }}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all whitespace-nowrap ${
                    activeCityIndex === idx 
                      ? 'bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/40 ring-1 ring-white/30 scale-105' 
                      : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {city.id === 'jeddah' ? (lang === 'ar' ? 'جدة' : lang === 'ur' ? 'جدہ' : 'Jeddah')
                   : city.id === 'riyadh' ? (lang === 'ar' ? 'الرياض' : lang === 'ur' ? 'ریاض' : 'Riyadh')
                   : city.id === 'khobar' ? (lang === 'ar' ? 'الخبر' : lang === 'ur' ? 'الخبر' : 'Al-Khobar')
                   : city.id === 'taif' ? (lang === 'ar' ? 'الطائف' : lang === 'ur' ? 'طائف' : 'Taif')
                   : city.id === 'abha' ? (lang === 'ar' ? 'أبها' : lang === 'ur' ? 'ابہا' : 'Abha')
                   : (lang === 'ar' ? 'تبوك' : lang === 'ur' ? 'تبوک' : 'Tabuk')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Schedule & Viewing Spot Dossier */}
      <div className="p-6 md:p-10 bg-[#021b10] border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: Active City Overview */}
          <div className="bg-black/35 rounded-3xl p-6 md:p-8 border border-emerald-500/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                <MapPin className="w-4 h-4 text-secondary" />
                <span>{activeCity.tag[lang]}</span>
                <span className="text-white/30">•</span>
                <span>{lang === 'ar' ? 'القطاع المختار' : lang === 'ur' ? 'منتخب سیکٹر' : 'Selected Sector'}</span>
              </div>
              <h4 className="text-2xl md:text-3xl font-serif font-bold text-white mb-5 leading-tight">
                {activeCity.name[lang]}
              </h4>
              <div className="space-y-4 text-sm text-gray-300">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-400">{lang === 'ar' ? 'التاريخ المعتمد:' : lang === 'ur' ? 'سرکاری تاریخیں:' : 'Official Dates:'}</div>
                    <div className="text-white font-semibold">{activeCity.dates[lang]}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Navigation className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-400">{lang === 'ar' ? 'نافذة التحليق اليومية:' : lang === 'ur' ? 'پرواز کا روزانہ وقت:' : 'Daily Flypast Window:'}</div>
                    <div className="text-white font-semibold">{activeCity.time[lang]}</div>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <div className="text-xs text-gray-400 mb-1.5 flex items-center gap-2">
                    <PlaneTakeoff className="w-3.5 h-3.5 text-emerald-400" />
                    {lang === 'ar' ? 'المقاتلات والتشكيلات المشاركة:' : lang === 'ur' ? 'شریک لڑاکا طیارے:' : 'Participating Aircraft:'}
                  </div>
                  <div className="font-semibold text-emerald-300 text-xs leading-relaxed bg-emerald-950/60 p-3 rounded-xl border border-emerald-500/30">
                    {activeCity.aircraft[lang]}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center gap-1.5 text-secondary font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {lang === 'ar' ? 'معتمد رسمياً' : lang === 'ur' ? 'سرکاری تصدیق شدہ' : 'Officially Confirmed'}
              </span>
              <span className="font-mono text-[11px] text-gray-300">{activeCity.coordinates}</span>
            </div>
          </div>

          {/* Column 2 & 3: Top 3 Prime Viewing Spots */}
          <div className="lg:col-span-2 bg-black/25 rounded-3xl p-6 md:p-8 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Eye className="w-4 h-4 text-emerald-400" />
                {lang === 'ar' ? 'أفضل 3 مواقع للمشاهدة والتصوير العائلي' : lang === 'ur' ? 'عوام اور فیملیز کے لیے 3 بہترین مشاہداتی مقامات' : 'Top 3 Prime Spectator & Photography Spots'}
              </div>
              <span className="text-[11px] text-gray-300 bg-white/10 px-3 py-1 rounded-full font-medium">
                {lang === 'ar' ? 'دخول مجاني بالكامل' : lang === 'ur' ? 'مکمل مفت داخلہ' : '100% Free Public Access'}
              </span>
            </div>

            <div className="space-y-4">
              {activeCity.primeSpots.map((spot, i) => (
                <div 
                  key={`spot-${i}`}
                  className="p-4 md:p-5 rounded-2xl bg-white/[0.04] hover:bg-emerald-950/50 border border-white/10 hover:border-emerald-500/40 transition-all flex items-start gap-4 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-800/60 border border-emerald-400/40 flex items-center justify-center font-bold text-sm text-secondary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                    0{i + 1}
                  </div>
                  <div className="flex-grow">
                    <h5 className="font-bold text-base text-white mb-1.5 group-hover:text-emerald-300 transition-colors">
                      {spot.name[lang]}
                    </h5>
                    <p className="text-xs md:text-sm text-gray-300 font-light leading-relaxed">
                      {spot.note[lang]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
