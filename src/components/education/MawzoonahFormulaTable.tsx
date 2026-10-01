import React from 'react';
import { Calculator, Award, ExternalLink, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { UNIVERSITIES_DATA } from '../../data/higherEducationData';

interface MawzoonahFormulaTableProps {
  currentLang: 'en' | 'ar' | 'ur';
  onSelectTrack?: (uniId: string, trackId: string) => void;
}

export const MawzoonahFormulaTable: React.FC<MawzoonahFormulaTableProps> = ({
  currentLang,
  onSelectTrack
}) => {
  const isRTL = currentLang === 'ar' || currentLang === 'ur';

  // Master rows for the table
  const formulaRows = [
    {
      uni: { en: 'King Saud University (KSU)', ar: 'جامعة الملك سعود (الرياض)', ur: 'کنگ سعود یونیورسٹی (ریاض)' },
      track: { en: 'Health & Medical Colleges', ar: 'الكليات الصحية والطبية', ur: 'طبی اور ہیلتھ کالجز' },
      hs: 30,
      qudurat: 30,
      tahsili: 40,
      total: 100,
      benchmark: '90% - 96%+',
      uniId: 'ksu',
      trackId: 'health'
    },
    {
      uni: { en: 'King Saud University (KSU)', ar: 'جامعة الملك سعود (الرياض)', ur: 'کنگ سعود یونیورسٹی (ریاض)' },
      track: { en: 'Engineering & Computing', ar: 'الكليات الهندسية والحاسوبية', ur: 'انجینئرنگ اور کمپیوٹر سائنس' },
      hs: 40,
      qudurat: 30,
      tahsili: 30,
      total: 100,
      benchmark: '88% - 94%',
      uniId: 'ksu',
      trackId: 'science-eng'
    },
    {
      uni: { en: 'King Saud University (KSU)', ar: 'جامعة الملك سعود (الرياض)', ur: 'کنگ سعود یونیورسٹی (ریاض)' },
      track: { en: 'Business & Humanities', ar: 'إدارة الأعمال والكليات الإنسانية', ur: 'بزنس اور ہیومینٹیز' },
      hs: 50,
      qudurat: 50,
      tahsili: 0,
      total: 100,
      benchmark: '82% - 88%',
      uniId: 'ksu',
      trackId: 'humanities'
    },
    {
      uni: { en: 'King Fahd Univ (KFUPM)', ar: 'جامعة الملك فهد للبترول (الظهران)', ur: 'کنگ فہد یونیورسٹی (دہران)' },
      track: { en: 'General Standard Track (Engineering & Sciences)', ar: 'مسار القبول الأساسي (الهندسة والعلوم)', ur: 'جنرل ٹریک (انجینئرنگ و سائنسز)' },
      hs: 10,
      qudurat: 50,
      tahsili: 40,
      total: 100,
      benchmark: '91% - 97%',
      uniId: 'kfupm',
      trackId: 'standard'
    },
    {
      uni: { en: 'King Abdulaziz Univ (KAU)', ar: 'جامعة الملك عبدالعزيز (جدة)', ur: 'کنگ عبدالعزیز یونیورسٹی (جدہ)' },
      track: { en: 'Health & Scientific Stream', ar: 'المسار الصحي والعلمي', ur: 'طبی اور سائنسی اسٹریم' },
      hs: 30,
      qudurat: 30,
      tahsili: 40,
      total: 100,
      benchmark: '88% - 95%',
      uniId: 'kau',
      trackId: 'scientific'
    },
    {
      uni: { en: 'King Abdulaziz Univ (KAU)', ar: 'جامعة الملك عبدالعزيز (جدة)', ur: 'کنگ عبدالعزیز یونیورسٹی (جدہ)' },
      track: { en: 'Administrative & Humanities', ar: 'المسار الإداري والإنساني', ur: 'انتظامی اور ہیومینٹیز' },
      hs: 40,
      qudurat: 30,
      tahsili: 30,
      total: 100,
      benchmark: '80% - 86%',
      uniId: 'kau',
      trackId: 'humanities'
    },
    {
      uni: { en: 'Princess Nourah Univ (PNU)', ar: 'جامعة الأميرة نورة (الرياض)', ur: 'پرنسس نورہ یونیورسٹی (ریاض)' },
      track: { en: 'Health Colleges (Medicine & Nursing)', ar: 'الكليات الصحية (الطب والتمريض)', ur: 'ہیلتھ کالجز (میڈیسن و نرسنگ)' },
      hs: 30,
      qudurat: 30,
      tahsili: 40,
      total: 100,
      benchmark: '89% - 94%',
      uniId: 'pnu',
      trackId: 'health'
    },
    {
      uni: { en: 'Princess Nourah Univ (PNU)', ar: 'جامعة الأميرة نورة (الرياض)', ur: 'پرنسس نورہ یونیورسٹی (ریاض)' },
      track: { en: 'Science, Computing & Engineering', ar: 'المسار العلمي والهندسي والحاسوبي', ur: 'سائنس، کمپیوٹر اور انجینئرنگ' },
      hs: 30,
      qudurat: 30,
      tahsili: 40,
      total: 100,
      benchmark: '84% - 90%',
      uniId: 'pnu',
      trackId: 'science-tech'
    },
    {
      uni: { en: 'Imam Abdulrahman Univ (IAU)', ar: 'جامعة الإمام عبدالرحمن (الدمام)', ur: 'امام عبدالرحمن یونیورسٹی (دمام)' },
      track: { en: 'Health Stream (Medicine & Pharmacy)', ar: 'المسار الصحي (الطب والصيدلة)', ur: 'ہیلتھ ٹریک (میڈیسن و فارمیسی)' },
      hs: 30,
      qudurat: 30,
      tahsili: 40,
      total: 100,
      benchmark: '89% - 95%',
      uniId: 'iau',
      trackId: 'health'
    },
    {
      uni: { en: 'King Khalid Univ (KKU)', ar: 'جامعة الملك خالد (أبها - عسير)', ur: 'کنگ خالد یونیورسٹی (ابہا)' },
      track: { en: 'Medical & Dental Sciences', ar: 'الكليات الصحية وطب الأسنان', ur: 'میڈیکل اور ڈینٹل کالجز' },
      hs: 30,
      qudurat: 30,
      tahsili: 40,
      total: 100,
      benchmark: '88% - 94%',
      uniId: 'kku',
      trackId: 'health'
    },
    {
      uni: { en: 'Taibah University', ar: 'جامعة طيبة (المدينة المنورة)', ur: 'طیبہ یونیورسٹی (مدینہ منورہ)' },
      track: { en: 'Medical & Applied Sciences', ar: 'المسار الصحي والطبي', ur: 'میڈیکل اور اپلائیڈ سائنسز' },
      hs: 30,
      qudurat: 30,
      tahsili: 40,
      total: 100,
      benchmark: '88% - 95%',
      uniId: 'taibah',
      trackId: 'health-sciences'
    },
    {
      uni: { en: 'Imam Mohammad Islamic Univ (IMSIU)', ar: 'جامعة الإمام محمد بن سعود (الرياض)', ur: 'امام محمد بن سعود یونیورسٹی (ریاض)' },
      track: { en: 'Engineering & Computing Track', ar: 'مسار الهندسة وعلوم الحاسب', ur: 'انجینئرنگ اور کمپیوٹر ٹریک' },
      hs: 30,
      qudurat: 30,
      tahsili: 40,
      total: 100,
      benchmark: '85% - 91%',
      uniId: 'imsiu',
      trackId: 'science-eng'
    },
    {
      uni: { en: 'Umm Al-Qura University (UQU)', ar: 'جامعة أم القرى (مكة المكرمة)', ur: 'ام القریٰ یونیورسٹی (مکہ مکرمہ)' },
      track: { en: 'Medical & Engineering', ar: 'المسار الطبي والهندسي', ur: 'میڈیکل اور انجینئرنگ ٹریک' },
      hs: 40,
      qudurat: 30,
      tahsili: 30,
      total: 100,
      benchmark: '84% - 92%',
      uniId: 'uqu',
      trackId: 'scientific'
    },
    {
      uni: { en: 'Prince Sultan University (PSU)', ar: 'جامعة الأمير سلطان (الرياض)', ur: 'پرنس سلطان یونیورسٹی (ریاض)' },
      track: { en: 'Computing & Software Engineering', ar: 'علوم الحاسب وهندسة البرمجيات', ur: 'کمپیوٹر سائنس اور سافٹ ویئر' },
      hs: 40,
      qudurat: 30,
      tahsili: 30,
      total: 100,
      benchmark: '82% - 90%',
      uniId: 'psu',
      trackId: 'computing-eng'
    },
    {
      uni: { en: 'Saudi Electronic University (SEU)', ar: 'الجامعة السعودية الإلكترونية', ur: 'سعودی الیکٹرانک یونیورسٹی' },
      track: { en: 'Blended Bachelor Programs (All Majors)', ar: 'البكالوريوس المدمج (كافة التخصصات)', ur: 'بلینڈڈ بیچلر ڈگری پروگرامز' },
      hs: 100,
      qudurat: 0,
      tahsili: 0,
      total: 100,
      benchmark: 'Competitive HS GPA',
      uniId: 'seu',
      trackId: 'blended-bachelor'
    }
  ];

  return (
    <div className="bg-white rounded-[3rem] p-6 sm:p-10 lg:p-12 border border-gray-100 shadow-xl mb-16 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-wider mb-1">
            <Calculator size={16} />
            <span>
              {currentLang === 'ar' ? 'الجدول المرجعي الموحد للأوزان والنسب' : currentLang === 'ur' ? 'وزارتی فارمولوں کا ماسٹر ٹیبل' : 'Official Weighting Reference Table'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary">
            {currentLang === 'ar' 
              ? 'أوزان ومعادلات النسبة الموزونة المعتمدة في كافة الجامعات السعودية' 
              : currentLang === 'ur' 
              ? 'سعودی عرب کی تمام بڑی جامعات کے مصدقہ ویٹڈ پرسنٹیج فارمولے' 
              : 'Master Mawzoonah Weighting Formulas Across All Saudi Universities'}
          </h2>
        </div>
        <div className="text-xs text-gray-500 font-medium">
          {currentLang === 'ar' ? 'محدث للعام الدراسي 1447 / 1448هـ' : currentLang === 'ur' ? 'تعلیمی سال 1447/1448ھ کے لیے اپ ڈیٹڈ' : 'Updated for 1447H / 2026-2027'}
        </div>
      </div>

      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6">
        {currentLang === 'ar' ? (
          'جدول تحليلي استرشادي شامل يوضح النسب المئوية الدقيقة لكل مكون (الثانوية، القدرات العامة، والاختبار التحصيلي) لجميع الجامعات، والتي يجب أن يصل مجموعها رياضياً إلى 100% بدقة.'
        ) : currentLang === 'ur' ? (
          'سعودی وزارتِ تعلیم کے ضوابط کے مطابق تمام جامعات میں ہائی اسکول، قدرات اور تحصیلی کا باضابطہ شیڈول۔ تمام فارمولوں کا مجموعہ لازمی طور پر 100 فیصد بنتا ہے۔'
        ) : (
          'Authoritative reference breakdown displaying the exact mathematical weight allocated to High School GPA, Qudurat (Aptitude), and Tahsili (Achievement). Every ministerial formula strictly totals 100%.'
        )}
      </p>

      {/* Editorial Responsive Table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200">
        <table className={cn("w-full text-xs text-left border-collapse", isRTL && "text-right")}>
          <thead>
            <tr className="bg-primary text-secondary uppercase font-bold tracking-wider text-[11px] border-b border-primary/20">
              <th className="py-4 px-4 sm:px-6">{currentLang === 'ar' ? 'الجامعة' : currentLang === 'ur' ? 'یونیورسٹی' : 'University'}</th>
              <th className="py-4 px-4 sm:px-6">{currentLang === 'ar' ? 'الكلية / المسار المستهدف' : currentLang === 'ur' ? 'کالج / اسٹریم' : 'Target College / Track'}</th>
              <th className="py-4 px-3 sm:px-4 text-center">{currentLang === 'ar' ? 'الثانوية (%)' : currentLang === 'ur' ? 'تھانویہ (%)' : 'High School (%)'}</th>
              <th className="py-4 px-3 sm:px-4 text-center">{currentLang === 'ar' ? 'القدرات (%)' : currentLang === 'ur' ? 'قدرات (%)' : 'Qudurat (%)'}</th>
              <th className="py-4 px-3 sm:px-4 text-center">{currentLang === 'ar' ? 'التحصيلي (%)' : currentLang === 'ur' ? 'تحصیلی (%)' : 'Tahsili (%)'}</th>
              <th className="py-4 px-3 sm:px-4 text-center">{currentLang === 'ar' ? 'المجموع' : currentLang === 'ur' ? 'مجموع' : 'Total'}</th>
              <th className="py-4 px-4 sm:px-6 text-center">{currentLang === 'ar' ? 'الحد التاريخي' : currentLang === 'ur' ? 'کٹ آف بینچ مارک' : 'Benchmark Cutoff'}</th>
              <th className="py-4 px-3 sm:px-4 text-center">{currentLang === 'ar' ? 'إجراء' : currentLang === 'ur' ? 'ایکشن' : 'Action'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {formulaRows.map((row, idx) => (
              <tr 
                key={`formula-row-${idx}`}
                className="even:bg-gray-50/50 hover:bg-emerald-50/40 transition-colors"
              >
                <td className="py-3.5 px-4 sm:px-6 font-serif font-bold text-primary whitespace-nowrap">
                  {row.uni[currentLang] || row.uni.en}
                </td>
                <td className="py-3.5 px-4 sm:px-6 text-gray-700 whitespace-nowrap">
                  {row.track[currentLang] || row.track.en}
                </td>
                <td className="py-3.5 px-3 sm:px-4 text-center font-bold text-gray-800">
                  {row.hs}%
                </td>
                <td className="py-3.5 px-3 sm:px-4 text-center font-bold text-gray-800">
                  {row.qudurat}%
                </td>
                <td className="py-3.5 px-3 sm:px-4 text-center font-bold text-gray-800">
                  {row.tahsili}%
                </td>
                <td className="py-3.5 px-3 sm:px-4 text-center font-black text-emerald-700">
                  {row.total}%
                </td>
                <td className="py-3.5 px-4 sm:px-6 text-center text-secondary font-bold whitespace-nowrap">
                  {row.benchmark}
                </td>
                <td className="py-3.5 px-3 sm:px-4 text-center">
                  {onSelectTrack && (
                    <button
                      onClick={() => onSelectTrack(row.uniId, row.trackId)}
                      className="px-2.5 py-1 rounded-lg bg-primary/10 hover:bg-primary hover:text-white text-primary text-[10px] font-bold transition-colors"
                    >
                      {currentLang === 'ar' ? 'حساب' : currentLang === 'ur' ? 'کیلکولیٹ' : 'Calculate'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
