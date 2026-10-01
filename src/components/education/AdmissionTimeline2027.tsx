import React, { useState } from 'react';
import { Calendar, Globe2, Clock, CheckCircle2, ChevronRight, AlertCircle, ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AdmissionTimelineProps {
  currentLang: 'en' | 'ar' | 'ur';
}

interface TimelineItem {
  id: string;
  phase: string;
  dates: { en: string; ar: string; ur: string };
  title: { en: string; ar: string; ur: string };
  description: { en: string; ar: string; ur: string };
  portal: { name: string; url: string };
  status: 'active' | 'upcoming' | 'testing';
  badge: { en: string; ar: string; ur: string };
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    id: 'phase-1-supplementary',
    phase: 'Phase 01',
    dates: { en: 'September - October 2026', ar: 'سبتمبر - أكتوبر 2026', ur: 'ستمبر - اکتوبر 2026' },
    title: { 
      en: 'Supplementary Admission & Second Semester (Spring 2027) Windows',
      ar: 'بوابات القبول الإلحاقي والتسجيل للفصل الدراسي الثاني',
      ur: 'ضمنی داخلے اور دوسرے سمسٹر (بہار 2027) کے لیے رجسٹریشن'
    },
    description: {
      en: 'Vacant seat allocation across King Saud, Princess Nourah, and regional community colleges for spring intake.',
      ar: 'شغل المقاعد الشاغرة بجامعة الملك سعود وجامعة الأميرة نورة وكليات المجتمع للفصل الثاني.',
      ur: 'کنگ سعود اور پرنسس نورہ یونیورسٹی میں خالی نشستوں کے لیے ضمنی داخلوں کا عمل۔'
    },
    portal: { name: 'Riyadh Unified Portal', url: 'https://rgu-admissions.edu.sa/' },
    status: 'active',
    badge: { en: 'Active Now', ar: 'نشط الآن', ur: 'فی الوقت جاری' }
  },
  {
    id: 'phase-2-studyinsaudi',
    phase: 'Phase 02',
    dates: { en: 'November 2026 - January 2027', ar: 'نوفمبر 2026 - يناير 2027', ur: 'نومبر 2026 - جنوری 2027' },
    title: { 
      en: 'Study in Saudi International & Resident Expat Scholarship Portals',
      ar: 'فرز ومطابقة منح "ادرس في السعودية" للطلاب الدوليين والمقيمين',
      ur: 'اسٹڈی ان سعودی پلیٹ فارم: مقیم اور بین الاقوامی طلباء کی اسکالرشپ اسکروٹنی'
    },
    description: {
      en: 'Ministry of Education evaluations for internal scholarships (resident expat quota) and external international visas.',
      ar: 'تقييم طلبات المنح الدراسية الداخلية للمقيمين والمنح الخارجية الممولة بالكامل وإصدار التأشيرات التعليمية.',
      ur: 'وزارتِ تعلیم کی جانب سے مقیم طلباء کے لیے 5 فیصد کوٹہ اور غیر ملکی طلباء کے لیے ایجوکیشنل ویزا کی جانچ۔'
    },
    portal: { name: 'studyinsaudi.moe.gov.sa', url: 'https://studyinsaudi.moe.gov.sa/' },
    status: 'upcoming',
    badge: { en: 'Upcoming', ar: 'قادم', ur: 'آئندہ' }
  },
  {
    id: 'phase-3-kfupm-sat',
    phase: 'Phase 03',
    dates: { en: 'January - February 2027', ar: 'يناير - فبراير 2027', ur: 'جنوری - فروری 2027' },
    title: { 
      en: 'KFUPM Early Admission & International SAT Track (1350+ SAT)',
      ar: 'بدء القبول المبكر ومسار السات الدولي بجامعة الملك فهد للبترول والمعادن',
      ur: 'کنگ فہد یونیورسٹی (KFUPM) ارلی ایڈمیشن اور انٹرنیشنل سیٹ ٹریک (1350+ اسکور)'
    },
    description: {
      en: 'Direct pre-graduation admission for top SAT achievers (1350+ with 650+ Math), exempting applicants from Qiyas testing.',
      ar: 'قبول مبكر ومباشر لمتفوقي اختبار السات دون اشتراط القدرات أو التحصيلي مع اختبار تحديد مستوى الرياضيات.',
      ur: 'سیٹ میں 1350 سے زائد نمبر حاصل کرنے والے طلباء کا بغیر قدرات و تحصیلی کے براہِ راست داخلہ۔'
    },
    portal: { name: 'apply.kfupm.edu.sa', url: 'https://apply.kfupm.edu.sa/' },
    status: 'upcoming',
    badge: { en: 'Early Access', ar: 'قبول مبكر', ur: 'ابتدائی داخلہ' }
  },
  {
    id: 'phase-4-qiyas-testing',
    phase: 'Phase 04',
    dates: { en: 'February - May 2027', ar: 'فبراير - مايو 2027', ur: 'فروری - مئی 2027' },
    title: { 
      en: 'ETEC Qiyas Tahsili & General Aptitude Testing (Round 1 & 2)',
      ar: 'الفترتان الأولى والثانية لاختبار التحصيلي الورقي والمحوسب (قياس)',
      ur: 'ہائت تقویم التعلیم (قیاس): تحصیلی اور قدرات کے کمپیوٹرائزڈ و پیپر ٹیسٹ کے دونوں راؤنڈز'
    },
    description: {
      en: 'Crucial achievement examination window administered by ETEC for high school seniors across all regions.',
      ar: 'فترة الاختبارات المعيارية التحصيلية المؤثرة على 40% من النسبة الموزونة لطلاب المسارات الثانوية.',
      ur: 'ہائی اسکول کے تمام طلباء کے لیے حتمی تحصیلی امتحان جو موزونہ کا 40 فیصد طے کرتا ہے۔'
    },
    portal: { name: 'etec.gov.sa (Qiyas)', url: 'https://etec.gov.sa/' },
    status: 'testing',
    badge: { en: 'Testing Window', ar: 'فترة الاختبارات', ur: 'امتحانی شیڈول' }
  },
  {
    id: 'phase-5-unified-portals',
    phase: 'Phase 05',
    dates: { en: 'Late June - July 2027', ar: 'أواخر يونيو - يوليو 2027', ur: 'جون کے اختتام تا جولائی 2027' },
    title: { 
      en: 'Unified Electronic Admission Portals Open (Fall 2027 / 1449H Intake)',
      ar: 'فتح بوابات القبول الإلكتروني الموحد لجامعات الرياض والغربية والشرقية',
      ur: 'تمام سرکاری جامعات کے یونیفائیڈ الیکٹرانک ایڈمیشن پورٹلز کا باضابطہ آغاز'
    },
    description: {
      en: 'Simultaneous application windows for KSU, IMSIU, PNU, KAU, IAU, UQU, and KKU. Up to 20 preferred desires entered.',
      ar: 'التقديم الموحد لترتيب الرغبات الجامعية حسب النسبة الموزونة عبر بوابات الرياض، جدة، والشرقية.',
      ur: 'طلباء کی جانب سے موزونہ میرٹ کی بنیاد پر اپنی ترجیحات (Desires) کا آن لائن اندراج۔'
    },
    portal: { name: 'Unified Admission Gateways', url: 'https://rgu-admissions.edu.sa/' },
    status: 'upcoming',
    badge: { en: 'Main Window', ar: 'البوابة الرئيسية', ur: 'مرکزی داخلے' }
  },
  {
    id: 'phase-6-sorting-confirmation',
    phase: 'Phase 06',
    dates: { en: 'July - August 2027', ar: 'يوليو - أغسطس 2027', ur: 'جولائی - اگست 2027' },
    title: { 
      en: 'Merit Sorting Rounds (الفرز الأكاديمي) & Seat Confirmation',
      ar: 'إعلان نتائج الفرز الأكاديمي وتثبيت القبول النهائي عبر النفاذ الوطني',
      ur: 'میرٹ لسٹس کا اجراء اور نفاذ پورٹل کے ذریعے داخلے کی حتمی تصدیق'
    },
    description: {
      en: 'Sequential 1st, 2nd, and 3rd sorting tiers. 48-hour mandatory electronic seat confirmation window.',
      ar: 'إعلان نتائج الفرز الأول والثاني، مع مهلة 48 ساعة لتأكيد القبول إلكترونياً عبر النفاذ الموحد تجنباً لإلغاء المقعد.',
      ur: 'پہلے اور دوسرے راؤنڈ کے نتائج کے بعد 48 گھنٹوں کے اندر نفاذ کے ذریعے سیٹ کی تصدیق لازمی ہے۔'
    },
    portal: { name: 'Absher / Nafath Portal', url: 'https://www.iam.gov.sa/' },
    status: 'upcoming',
    badge: { en: 'Seat Confirmation', ar: 'تثبيت المقعد', ur: 'سیٹ کنفرمیشن' }
  }
];

export const AdmissionTimeline2027: React.FC<AdmissionTimelineProps> = ({ currentLang }) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'upcoming'>('all');

  const filteredItems = TIMELINE_DATA.filter(item => {
    if (filter === 'active') return item.status === 'active';
    if (filter === 'upcoming') return item.status === 'upcoming' || item.status === 'testing';
    return true;
  });

  return (
    <div className="mb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-wider mb-1">
            <Calendar size={16} />
            <span>
              {currentLang === 'ar' ? 'التقويم الزمني المحدث للقبول' : currentLang === 'ur' ? 'یونیورسٹی داخلہ شیڈول 2026-2027' : 'Admissions Chronology 2026 - 2027'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary">
            {currentLang === 'ar' 
              ? 'مراحل ومواعيد القبول الموحد لجامعات السعودية لعام 1448هـ / 2027م' 
              : currentLang === 'ur' 
              ? 'سعودی جامعات کے داخلہ مراحل اور حتمی ٹائم لائن برائے 2026-2027' 
              : 'Chronological Roadmap for Saudi Higher Education Admissions 2026 - 2027'}
          </h2>
        </div>

        {/* Filter Controls */}
        <div className="flex gap-2">
          {[
            { id: 'all', label: { en: 'All 6 Phases', ar: 'كافة المراحل', ur: 'تمام 6 مراحل' } },
            { id: 'active', label: { en: 'Active Now', ar: 'النشط حالياً', ur: 'جاری مراحل' } },
            { id: 'upcoming', label: { en: 'Upcoming 2027', ar: 'مواعيد 2027', ur: 'سال 2027' } }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as any)}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all",
                filter === f.id
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
              )}
            >
              {f.label[currentLang] || f.label.en}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-secondary/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono font-bold text-secondary tracking-widest uppercase">
                  {item.phase}
                </span>
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border",
                  item.status === 'active'
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200 animate-pulse"
                    : item.status === 'testing'
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : "bg-blue-50 text-blue-700 border-blue-200"
                )}>
                  {item.badge[currentLang] || item.badge.en}
                </span>
              </div>

              <div className="text-xs font-bold text-gray-400 mb-2 flex items-center gap-1.5">
                <Clock size={13} className="text-secondary" />
                <span>{item.dates[currentLang] || item.dates.en}</span>
              </div>

              <h3 className="font-serif font-bold text-base sm:text-lg text-primary mb-2 leading-snug">
                {item.title[currentLang] || item.title.en}
              </h3>

              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                {item.description[currentLang] || item.description.en}
              </p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-400 font-medium flex items-center gap-1">
                <Globe2 size={13} />
                <span className="line-clamp-1">{item.portal.name}</span>
              </span>
              <a
                href={item.portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-primary font-bold flex items-center gap-1 transition-colors"
              >
                <span>{currentLang === 'ar' ? 'البوابة' : currentLang === 'ur' ? 'پورٹل' : 'Portal'}</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
