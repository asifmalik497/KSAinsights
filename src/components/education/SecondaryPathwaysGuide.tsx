import React from 'react';
import { BookOpen, Layers, CheckCircle2, Award, Sparkles, FileText, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SecondaryPathwaysGuideProps {
  currentLang: 'en' | 'ar' | 'ur';
}

export const SecondaryPathwaysGuide: React.FC<SecondaryPathwaysGuideProps> = ({ currentLang }) => {
  const pathways = [
    {
      id: 'general',
      name: { en: 'General Pathway (المسار العام)', ar: 'المسار العام', ur: 'جنرل پاتھ وے (المسار العام)' },
      eligibility: { en: 'Eligible for all humanities, business, and select science disciplines.', ar: 'متاح لكافة التخصصات الإنسانية والإدارية وبعض الكليات العلمية.', ur: 'تمام ہیومینٹیز، بزنس اور منتخب سائنسی شعبوں کے لیے اہل۔' },
      keySubjects: { en: 'Mathematics, Science, English, Digital Tech', ar: 'الرياضيات، العلوم، اللغة الإنجليزية، التقنية الرقمية', ur: 'ریاضی، سائنس، انگلش، ڈیجیٹل ٹیکنالوجی' },
      accent: 'border-blue-200 bg-blue-50/40 text-blue-700'
    },
    {
      id: 'cs-eng',
      name: { en: 'Computer Science & Engineering Pathway', ar: 'مسار علوم الحاسب والهندسة', ur: 'کمپیوٹر سائنس اور انجینئرنگ پاتھ وے' },
      eligibility: { en: 'Direct priority for Engineering, AI, Cybersecurity, Data Science, and Architecture.', ar: 'أولوية مباشرة لكليات الهندسة، الذكاء الاصطناعي، الأمن السيبراني، والحاسب.', ur: 'انجینئرنگ، اے آئی، سائبر سیکیورٹی اور ڈیٹا سائنس میں اولین ترجیح۔' },
      keySubjects: { en: 'Advanced Calculus, AI Systems, Robotics, Cyber Defense', ar: 'التفاضل المتقدم، نظم الذكاء الاصطناعي، الروبوتات، الأمن السيبراني', ur: 'ایڈوانسڈ کیلکولس، روبوٹکس، سائبر ڈیفنس، اے آئی سسٹمز' },
      accent: 'border-emerald-200 bg-emerald-50/40 text-emerald-700'
    },
    {
      id: 'health',
      name: { en: 'Health & Life Sciences Pathway', ar: 'مسار الصحة والحياة', ur: 'ہیلتھ اور لائف سائنسز پاتھ وے' },
      eligibility: { en: 'Prerequisite for Medicine (MBBS), Dentistry, Clinical Pharmacy, and Nursing.', ar: 'المتطلب الأساسي لكليات الطب البشري، طب الأسنان، الصيدلة والتمريض.', ur: 'ایم بی بی ایس، ڈینٹسٹری، کلینیکل فارمیسی اور نرسنگ کے لیے بنیادی شرط۔' },
      keySubjects: { en: 'Anatomy, Organic Chemistry, Cellular Biology, Biostatistics', ar: 'علم وظائف الأعضاء، الكيمياء العضوية، الأحياء الخلوية، الإحصاء الحيوي', ur: 'اناٹومی، آرگینک کیمسٹری، سیلولر بیالوجی، بائیو اسٹیٹسٹکس' },
      accent: 'border-rose-200 bg-rose-50/40 text-rose-700'
    },
    {
      id: 'business',
      name: { en: 'Business Administration Pathway', ar: 'مسار إدارة الأعمال', ur: 'بزنس ایڈمنسٹریشن پاتھ وے' },
      eligibility: { en: 'Direct access to AACSB business faculties, FinTech, Logistics, and Law.', ar: 'مؤهل لكليات الأعمال المعتمدة، التقنية المالية، سلاسل الإمداد، والحقوق.', ur: 'بزنس اسکولز، فن ٹیک، سپلائی چین مینجمنٹ اور قانون کے لیے بہترین۔' },
      keySubjects: { en: 'Financial Accounting, Microeconomics, Supply Chain, Business Law', ar: 'المحاسبة المالية، الاقتصاد الجزئي، سلاسل الإمداد، الأنظمة التجارية', ur: 'فنانشل اکاؤنٹنگ، مائیکرو اکنامکس، سپلائی چین، بزنس لا' },
      accent: 'border-amber-200 bg-amber-50/40 text-amber-700'
    },
    {
      id: 'sharia',
      name: { en: 'Sharia & Legal Sciences Pathway', ar: 'مسار الشريعة والعلوم القانونية', ur: 'شریعہ اور قانونی علوم کا پاتھ وے' },
      eligibility: { en: 'Focused track for Law, Islamic Jurisprudence, Diplomatic Studies, and Media.', ar: 'مخصص لكليات الحقوق والأنظمة، الشريعة، العلوم السياسية والإعلام.', ur: 'قانون، اسلامی فقہ، ڈپلومیٹک اسٹڈیز اور میڈیا کے لیے مخصوص۔' },
      keySubjects: { en: 'Judicial Precedents, Legal Analysis, Logic, Arabic Linguistics', ar: 'أصول الفقه، القواعد القانونية، المنطق، اللسانيات العربية', ur: 'اصولِ فقہ، قانونی تجزیہ، منطق اور عربی زبان و ادب' },
      accent: 'border-purple-200 bg-purple-50/40 text-purple-700'
    }
  ];

  return (
    <div className="bg-white rounded-[3rem] p-6 sm:p-10 lg:p-12 border border-gray-100 shadow-xl mb-16">
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-wider mb-2">
          <Layers size={16} />
          <span>
            {currentLang === 'ar' ? 'نظام المسارات التخصصية الجديد للثانوية' : currentLang === 'ur' ? 'ہائی اسکول ٹریکس (نظام المسارات)' : 'Secondary Pathways & University Alignment'}
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-3">
          {currentLang === 'ar' 
            ? 'كيف تؤثر مسارات الثانوية العامة على قبولك في الجامعات السعودية؟' 
            : currentLang === 'ur' 
            ? 'سعودی ہائی اسکول کے 5 مسارات اور یونیورسٹی داخلوں پر ان کے اثرات' 
            : 'How the 5 High School Pathways Dictate University Faculty Eligibility'}
        </h2>
        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
          {currentLang === 'ar' ? (
            'تحول التعليم الثانوي في المملكة إلى 5 مسارات تخصصية دقيقة تحدد بشكل مباشر الكليات التي يحق للطالب التنافس عليها في بوابات القبول الموحد.'
          ) : currentLang === 'ur' ? (
            'سعودی وزارتِ تعلیم نے ثانویہ کو 5 مخصوص شعبوں میں تقسیم کیا ہے جو یہ طے کرتے ہیں کہ طالب علم کس یونیورسٹی اور فیکلٹی میں داخلے کا حقدار ہے۔'
          ) : (
            'Saudi high schools follow a streamlined 5-pathway system where specialized coursework directly determines which college faculties applicants can unlock.'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {pathways.map((p, idx) => (
          <div 
            key={p.id}
            className="p-5 rounded-2xl border border-gray-150 bg-paper/60 hover:bg-white hover:border-secondary/40 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold text-gray-400 uppercase">
                  Pathway 0{idx + 1}
                </span>
                <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border", p.accent)}>
                  {currentLang === 'ar' ? 'معتمد رسمياً' : currentLang === 'ur' ? 'مصدقہ' : 'MoE Certified'}
                </span>
              </div>

              <h4 className="font-serif font-bold text-base text-primary mb-2">
                {p.name[currentLang] || p.name.en}
              </h4>

              <div className="space-y-2 text-xs text-gray-600 mb-4">
                <div>
                  <span className="font-bold text-primary block text-[11px] mb-0.5">
                    {currentLang === 'ar' ? 'الكليات المتاحة:' : currentLang === 'ur' ? 'اہل فیکلٹیز:' : 'Eligible Faculties:'}
                  </span>
                  <p className="text-gray-500 text-[11px] leading-relaxed">
                    {p.eligibility[currentLang] || p.eligibility.en}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 text-[10px] text-gray-400">
              <span className="font-bold text-gray-600 block mb-0.5">
                {currentLang === 'ar' ? 'المقررات التخصصية:' : currentLang === 'ur' ? 'اہم مضامین:' : 'Core Coursework:'}
              </span>
              <span>{p.keySubjects[currentLang] || p.keySubjects.en}</span>
            </div>
          </div>
        ))}
      </div>

      {/* English Exemption & STEP Matrix */}
      <div className="p-6 rounded-2xl bg-paper border border-gray-200">
        <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-wider mb-2">
          <Award size={16} />
          <span>
            {currentLang === 'ar' ? 'معايير إعفاء السنة التحضيرية (اختبارات اللغة)' : currentLang === 'ur' ? 'پریپ ایئر استثنیٰ اور انگلش ٹیسٹ معیار' : 'Foundation Year Exemption Benchmarks'}
          </span>
        </div>
        <h3 className="text-lg font-serif font-bold text-primary mb-3">
          {currentLang === 'ar' ? 'درجات ستيب (STEP) والآيلتس (IELTS) المطلوبة للإعفاء الجامعي' : currentLang === 'ur' ? 'اسٹیپ (STEP) اور آئیلٹس (IELTS) اسکور اور سالانہ چھوٹ' : 'STEP, IELTS, & TOEFL Score Requirements for Advanced Placement'}
        </h3>
        <p className="text-xs text-gray-600 leading-relaxed mb-4">
          {currentLang === 'ar' ? (
            'تتيح جامعات مثل KSU وKFUPM وKAU وPSU للطلاب الحاصلين على درجات معتمدة في اختبار كفايات اللغة الإنجليزية (STEP) أو آيلتس تجاوز السنة التحضيرية والالتحاق مباشرة بالسنة التخصصية الأولى.'
          ) : currentLang === 'ur' ? (
            'کنگ سعود، کے ایف یو پی ایم اور پرنس سلطان یونیورسٹی میں اسٹیپ (STEP) یا آئیلٹس میں مطلوبہ اسکور حاصل کرنے پر طلباء کو فاؤنڈیشن ایئر سے استثنیٰ مل جاتا ہے اور وہ براہ راست پہلے تعلیمی سال میں داخل ہو جاتے ہیں۔'
          ) : (
            'Premier institutions including KSU, KFUPM, KAU, and PSU allow incoming undergraduates holding verified STEP, IELTS, or TOEFL scores to waive the preparatory foundation year and enter major study plans immediately.'
          )}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-white p-3.5 rounded-xl border border-gray-150">
            <span className="font-bold text-primary block mb-1">
              {currentLang === 'ar' ? 'كفايات ستيب (STEP - قياس)' : currentLang === 'ur' ? 'قیاس اسٹیپ (STEP)' : 'ETEC STEP (Qiyas)'}
            </span>
            <span className="text-secondary font-black text-sm block mb-1">75+ / 83+</span>
            <span className="text-[11px] text-gray-500">
              {currentLang === 'ar' ? 'إعفاء تام من اللغة الإنجليزية التحضيرية' : currentLang === 'ur' ? 'فاؤنڈیشن انگلش سے مکمل استثنیٰ' : 'Full Foundation English Waiver'}
            </span>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-gray-150">
            <span className="font-bold text-primary block mb-1">
              {currentLang === 'ar' ? 'آيلتس الأكاديمي (IELTS Academic)' : currentLang === 'ur' ? 'آئیلٹس اکیڈمک (IELTS)' : 'IELTS Academic'}
            </span>
            <span className="text-secondary font-black text-sm block mb-1">5.5 - 6.5</span>
            <span className="text-[11px] text-gray-500">
              {currentLang === 'ar' ? 'تجاوز مواد اللغة لكليات الهندسة والحاسب' : currentLang === 'ur' ? 'انجینئرنگ و میڈیکل میں ایڈوانسڈ انٹری' : 'Direct Specialization Entry'}
            </span>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-gray-150">
            <span className="font-bold text-primary block mb-1">
              {currentLang === 'ar' ? 'توفل الإلكتروني (TOEFL iBT)' : currentLang === 'ur' ? 'ٹوفل انٹرنیٹ بیسڈ (TOEFL)' : 'TOEFL iBT'}
            </span>
            <span className="text-secondary font-black text-sm block mb-1">65 - 80+</span>
            <span className="text-[11px] text-gray-500">
              {currentLang === 'ar' ? 'معتمد في جامعة البترول والجامعات الخاصة' : currentLang === 'ur' ? 'کے ایف یو پی ایم اور نجی جامعات میں معتبر' : 'Accepted at KFUPM, Alfaisal & PSU'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
