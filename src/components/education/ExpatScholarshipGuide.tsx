import React from 'react';
import { Users, Award, Globe2, CheckCircle2, ShieldCheck, DollarSign, HelpCircle, FileText } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ExpatScholarshipGuideProps {
  currentLang: 'en' | 'ar' | 'ur';
}

export const ExpatScholarshipGuide: React.FC<ExpatScholarshipGuideProps> = ({ currentLang }) => {
  return (
    <div className="bg-paper rounded-[3rem] p-6 sm:p-10 lg:p-12 border border-gray-200/80 mb-16 shadow-sm">
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-wider mb-2">
          <Users size={16} />
          <span>
            {currentLang === 'ar' ? 'اللوائح التنظيمية للطلاب المقيمين والدوليين' : currentLang === 'ur' ? 'مقیم غیر ملکی اور بین الاقوامی طلباء کی پالیسی' : 'Resident Expats & International Policy Matrix'}
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-3">
          {currentLang === 'ar' 
            ? 'قواعد القبول والمنح الحكومية لغير السعوديين في الجامعات 1448هـ' 
            : currentLang === 'ur' 
            ? 'سعودی جامعات میں غیر ملکی طلباء کے لیے داخلہ ضوابط اور سرکاری اسکالرشپس' 
            : 'Admissions, Quota Limits & Internal Scholarships for Non-Saudis'}
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
          {currentLang === 'ar' ? (
            'بموجب تنظيمات وزارة التعليم ومجلس شؤون الجامعات، تتاح الدراسة للمقيمين عبر 4 مسارات قانونية واضحة ومحددة المقاعد.'
          ) : currentLang === 'ur' ? (
            'وزارتِ تعلیم کے ضوابط کے تحت اقامہ رکھنے والے غیر ملکی اور بین الاقوامی طلباء 4 باقاعدہ قانونی ٹریکس کے تحت داخلہ حاصل کر سکتے ہیں۔'
          ) : (
            'Regulated by the Ministry of Education and the Council of Universities Affairs, foreign residents and global applicants access Saudi higher education through four distinct legal pathways.'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Tier 1: Children of Saudi Mothers */}
        <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold mb-4">
              <ShieldCheck size={20} />
            </div>
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded">
              {currentLang === 'ar' ? 'مساواة كاملة' : currentLang === 'ur' ? 'مکمل مساوات' : '100% Parity'}
            </span>
            <h3 className="font-serif font-bold text-base text-primary mt-2 mb-2">
              {currentLang === 'ar' ? 'أبناء المواطنات السعوديات' : currentLang === 'ur' ? 'سعودی ماؤں کے بچے' : 'Children of Saudi Mothers'}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">
              {currentLang === 'ar' ? (
                'معاملة كاملة كالمواطن السعودي؛ مجانية التعليم، الدخول في المفاضلة الموحدة، واستحقاق المكافأة الشهرية في كافة الكليات.'
              ) : currentLang === 'ur' ? (
                'یونیورسٹی داخلوں، مفت ٹیوشن، ماہانہ وظیفے اور میڈیکل/انجینئرنگ کی تمام نشستوں پر سعودی شہریوں کے برابر حقوق۔'
              ) : (
                'Treated with absolute parity to Saudi citizens: zero tuition, monthly stipends, and open competition across all colleges.'
              )}
            </p>
          </div>
          <div className="text-[11px] font-bold text-emerald-700 pt-2 border-t border-gray-100">
            {currentLang === 'ar' ? 'بدون شروط إضافية' : currentLang === 'ur' ? 'اضافی کوٹہ شرط نہیں' : 'Zero Quota Limits'}
          </div>
        </div>

        {/* Tier 2: Internal Scholarships */}
        <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-secondary flex items-center justify-center font-bold mb-4">
              <Award size={20} />
            </div>
            <span className="text-[10px] font-bold text-secondary uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded">
              {currentLang === 'ar' ? 'حصة 5% سنوياً' : currentLang === 'ur' ? '5 فیصد کوٹہ' : '5% Reserved Quota'}
            </span>
            <h3 className="font-serif font-bold text-base text-primary mt-2 mb-2">
              {currentLang === 'ar' ? 'المنح الداخلية لحاملي الإقامة' : currentLang === 'ur' ? 'اقامہ ہولڈرز کے لیے داخلی اسکالرشپ' : 'Internal Resident Scholarships'}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">
              {currentLang === 'ar' ? (
                'مقاعد مجانية مخصصة للمقيمين النظاميين المتفوقين في الثانوية والتحصيلي (غالباً تتطلب موزونة 94%+ لكليات العلوم والحاسب).'
              ) : currentLang === 'ur' ? (
                'ہائی اسکول اور قیامی امتحانات میں نمایاں پوزیشن حاصل کرنے والے اقامہ ہولڈرز کے لیے مفت سرکاری نشستیں (موزونہ 94+ مطلوب)۔'
              ) : (
                'Merit-based fully funded government seats for valid Iqama holders with exceptional Mawzoonah (typically 94%+ required).'
              )}
            </p>
          </div>
          <div className="text-[11px] font-bold text-secondary pt-2 border-t border-gray-100">
            {currentLang === 'ar' ? 'تقديم إلكتروني مباشر' : currentLang === 'ur' ? 'پورٹل سے براہ راست درخواست' : 'Direct Portal Application'}
          </div>
        </div>

        {/* Tier 3: Study in Saudi Platform */}
        <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold mb-4">
              <Globe2 size={20} />
            </div>
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded">
              {currentLang === 'ar' ? 'تأشيرة تعليمية' : currentLang === 'ur' ? 'ایجوکیشنل ویزا' : 'Educational Visa'}
            </span>
            <h3 className="font-serif font-bold text-base text-primary mt-2 mb-2">
              {currentLang === 'ar' ? 'منصة "ادرس في السعودية"' : currentLang === 'ur' ? 'اسٹڈی ان سعودی پورٹل' : 'Study in Saudi Global Portal'}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">
              {currentLang === 'ar' ? (
                'منح كاملة وجزئية للطلاب الدوليين تشمل السكن، التذاكر، والمكافأة الشهرية وإصدار إقامة تعليمية عبر وزارة الخارجية.'
              ) : currentLang === 'ur' ? (
                'سعودی عرب سے باہر مقیم بین الاقوامی طلباء کے لیے مکمل فنڈڈ اسکالرشپس، رہائش، ہوائی ٹکٹ اور اسٹوڈنٹ ریزیڈنسی۔'
              ) : (
                'Unified gateway for international students abroad featuring full funding, on-campus housing, and MOFA student visa sponsorship.'
              )}
            </p>
          </div>
          <div className="text-[11px] font-bold text-blue-700 pt-2 border-t border-gray-100">
            studyinsaudi.moe.gov.sa
          </div>
        </div>

        {/* Tier 4: Paid Credit-Hour Degrees */}
        <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold mb-4">
              <DollarSign size={20} />
            </div>
            <span className="text-[10px] font-bold text-purple-700 uppercase tracking-widest bg-purple-50 px-2 py-0.5 rounded">
              {currentLang === 'ar' ? 'برامج برسوم معتمدة' : currentLang === 'ur' ? 'فیس والے ڈگری پروگرامز' : 'Paid Parallel Tracks'}
            </span>
            <h3 className="font-serif font-bold text-base text-primary mt-2 mb-2">
              {currentLang === 'ar' ? 'التعليم الموازي والجامعات الخاصة' : currentLang === 'ur' ? 'پیرالل ایجوکیشن و پرائیویٹ کالجز' : 'Paid Degree Programs & Private Unis'}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">
              {currentLang === 'ar' ? (
                'برامج الساعات المعتمدة في الجامعات الحكومية (SEU، KSU) والجامعات الخاصة (سلطان، الفيصل) برسوم محددة تتراوح بين 500 إلى 1,200 ريال/ساعة.'
              ) : currentLang === 'ur' ? (
                'سرکاری یونیورسٹیوں کے پیڈ پروگرامز اور پرنس سلطان/الفیصل میں فی کریڈٹ گھنٹہ فیس (500 تا 1,200 ریال) کے تحت کھلی نشستیں۔'
              ) : (
                'Available in SEU, public paid parallel degrees, and premier private universities (PSU, Alfaisal) priced SAR 500 - 1,200/credit.'
              )}
            </p>
          </div>
          <div className="text-[11px] font-bold text-purple-700 pt-2 border-t border-gray-100">
            {currentLang === 'ar' ? 'متاح للجميع دون حصص' : currentLang === 'ur' ? 'بغیر کسی کوٹہ پابندی کے' : 'Open Enrollment'}
          </div>
        </div>
      </div>

      {/* Advisory Note for Expat Families */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 flex items-start gap-3 text-xs text-gray-600">
        <HelpCircle size={18} className="text-secondary shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-primary block font-bold mb-0.5">
            {currentLang === 'ar' ? 'ملاحظة جوهرية لأولياء الأمور والطلاب المقيمين:' : currentLang === 'ur' ? 'مقیم فیملیز اور طلباء کے لیے ضروری ہدایت:' : 'Critical Advisory for Resident Expat Families:'}
          </strong>
          {currentLang === 'ar' ? (
            'يتم التقديم للمنح الداخلية عبر بوابات القبول الموحد ذاتها خلال الفترة المحددة سنوياً. يُشترط سريان هوية مقيم (الإقامة) وجواز السفر وعدم تجاوز سن 25 عاماً لخريجي الثانوية.'
          ) : currentLang === 'ur' ? (
            'داخلی اسکالرشپ کے لیے اسی یونیفائیڈ پورٹل پر مقررہ تاریخوں میں درخواست دی جاتی ہے۔ طالب علم کا اقامہ اور پاسپورٹ ویلڈ ہونا ضروری ہے اور عمر 25 سال سے زائد نہ ہو۔'
          ) : (
            'Applications for internal scholarships must be filed through the same unified admission gateways. Students must hold a valid Iqama and valid passport, with age not exceeding 25 years.'
          )}
        </div>
      </div>
    </div>
  );
};
