import React, { useState, useMemo } from 'react';
import { Target, HelpCircle, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { UniversityFormula } from '../../data/higherEducationData';

interface ReverseTargetCalculatorProps {
  currentLang: 'en' | 'ar' | 'ur';
  universities: UniversityFormula[];
  selectedUniId: string;
  selectedTrackId: string;
  onSelectUniversity: (uniId: string, trackId: string) => void;
}

export const ReverseTargetCalculator: React.FC<ReverseTargetCalculatorProps> = ({
  currentLang,
  universities,
  selectedUniId,
  selectedTrackId,
  onSelectUniversity
}) => {
  const [targetMawzoonah, setTargetMawzoonah] = useState<number>(92.0);
  const [highSchoolScore, setHighSchoolScore] = useState<number>(96.0);
  const [knownQudurat, setKnownQudurat] = useState<number>(88);
  const [solveFor, setSolveFor] = useState<'tahsili' | 'qudurat'>('tahsili');

  const currentUni = useMemo(() => {
    return universities.find(u => u.id === selectedUniId) || universities[0];
  }, [universities, selectedUniId]);

  const currentTrack = useMemo(() => {
    return currentUni.tracks.find(t => t.id === selectedTrackId) || currentUni.tracks[0];
  }, [currentUni, selectedTrackId]);

  const weights = currentTrack.weights;

  // Calculate needed Tahsili or Qudurat score
  const calculationResult = useMemo(() => {
    if (weights.sat && weights.sat > 0) {
      return {
        neededScore: 1350,
        achievable: true,
        difficulty: 'sat',
        message: {
          en: 'SAT Track requires a direct score of 1350+ (Math 650+). High School GPA and Qudurat are not factored into this specific track.',
          ar: 'مسار السات يتطلب درجة 1350+ كحد أدنى مباشر دون احتساب الثانوية أو قياس.',
          ur: 'سیٹ ٹریک کے لیے کم از کم 1350 اسکور درکار ہے۔ ہائی اسکول اسکور اس میں شامل نہیں ہے۔'
        }
      };
    }

    const hsContribution = highSchoolScore * (weights.highSchool / 100);

    if (solveFor === 'tahsili') {
      if (weights.tahsili <= 0) {
        return {
          neededScore: 0,
          achievable: true,
          difficulty: 'not-required',
          message: {
            en: 'This program does not require Tahsili. Admission depends entirely on High School GPA and Qudurat.',
            ar: 'هذا المسار لا يشترط التحصيلي، ويعتمد فقط على الثانوية والقدرات.',
            ur: 'اس پروگرام میں تحصیلی کی ضرورت نہیں، صرف ہائی اسکول اور قدرات شامل ہیں۔'
          }
        };
      }

      const quduratContribution = knownQudurat * (weights.qudurat / 100);
      const remainingNeeded = targetMawzoonah - hsContribution - quduratContribution;
      const rawNeededTahsili = (remainingNeeded / (weights.tahsili / 100));
      const roundedNeeded = Math.ceil(rawNeededTahsili * 10) / 10;

      let difficulty: 'easy' | 'moderate' | 'competitive' | 'extreme' | 'impossible' = 'moderate';
      if (roundedNeeded <= 75) difficulty = 'easy';
      else if (roundedNeeded <= 85) difficulty = 'moderate';
      else if (roundedNeeded <= 93) difficulty = 'competitive';
      else if (roundedNeeded <= 100) difficulty = 'extreme';
      else difficulty = 'impossible';

      return {
        neededScore: roundedNeeded,
        achievable: roundedNeeded <= 100,
        difficulty,
        message: {
          en: roundedNeeded > 100 
            ? `Achieving ${targetMawzoonah}% is mathematically impossible with your current Qudurat (${knownQudurat}). You must retake Qudurat to raise your base.`
            : `You need an exact Tahsili score of ${roundedNeeded} to secure your target ${targetMawzoonah}% Mawzoonah.`,
          ar: roundedNeeded > 100
            ? `تحقيق نسبة ${targetMawzoonah}% مستحيل حسابياً بدرجة القدرات الحالية (${knownQudurat}). يجب رفع درجة القدرات أولاً.`
            : `تحتاج إلى الحصول على ${roundedNeeded} في اختبار التحصيلي للوصول لنسبتك المستهدفة ${targetMawzoonah}%.`,
          ur: roundedNeeded > 100
            ? `موجودہ قدرات اسکور (${knownQudurat}) کے ساتھ ${targetMawzoonah}% حاصل کرنا ناممکن ہے۔ پہلے قدرات بہتر بنائیں۔`
            : `اپنا ہدف ${targetMawzoonah}% حاصل کرنے کے لیے تحصیلی میں کم از کم ${roundedNeeded} اسکور چاہیے۔`
        }
      };
    } else {
      // Solve for Qudurat
      if (weights.qudurat <= 0) {
        return {
          neededScore: 0,
          achievable: true,
          difficulty: 'not-required',
          message: {
            en: 'This program does not require Qudurat.',
            ar: 'هذا المسار لا يشترط القدرات.',
            ur: 'اس پروگرام میں قدرات ٹیسٹ کی ضرورت نہیں ہے۔'
          }
        };
      }

      const tahsiliContribution = knownQudurat * (weights.tahsili / 100); // using knownQudurat input field as known score
      const remainingNeeded = targetMawzoonah - hsContribution - tahsiliContribution;
      const rawNeededQudurat = (remainingNeeded / (weights.qudurat / 100));
      const roundedNeeded = Math.ceil(rawNeededQudurat * 10) / 10;

      let difficulty: 'easy' | 'moderate' | 'competitive' | 'extreme' | 'impossible' = 'moderate';
      if (roundedNeeded <= 75) difficulty = 'easy';
      else if (roundedNeeded <= 85) difficulty = 'moderate';
      else if (roundedNeeded <= 93) difficulty = 'competitive';
      else if (roundedNeeded <= 100) difficulty = 'extreme';
      else difficulty = 'impossible';

      return {
        neededScore: roundedNeeded,
        achievable: roundedNeeded <= 100,
        difficulty,
        message: {
          en: roundedNeeded > 100 
            ? `Achieving ${targetMawzoonah}% is impossible with this score combination. Boost your High School GPA or reset targets.`
            : `You need an exact Qudurat score of ${roundedNeeded} to achieve ${targetMawzoonah}%.`,
          ar: roundedNeeded > 100
            ? `غير ممكن حسابياً بهذه المدخلات. يلزم رفع معدل الثانوية أو إعادة تقييم الهدف.`
            : `تحتاج إلى الحصول على ${roundedNeeded} في القدرات لتحقيق موزونة ${targetMawzoonah}%.`,
          ur: roundedNeeded > 100
            ? `اس فارمولے میں یہ اسکور ناممکن ہے۔ ہائی اسکول اسکور بڑھائیں یا ہدف میں ترمیم کریں۔`
            : `آپ کو ${targetMawzoonah}% کا ہدف پانے کے لیے قدرات میں ${roundedNeeded} اسکور درکار ہے۔`
        }
      };
    }
  }, [weights, highSchoolScore, knownQudurat, targetMawzoonah, solveFor]);

  return (
    <div className="bg-paper rounded-3xl p-6 sm:p-8 border border-gray-200 mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-wider mb-1">
            <Target size={16} />
            <span>
              {currentLang === 'ar' ? 'الحاسبة العكسية للدرجة المستهدفة' : currentLang === 'ur' ? 'ریورس ٹارگٹ کیلکولیٹر' : 'Reverse Target Score Calculator'}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-primary">
            {currentLang === 'ar' 
              ? 'كم تحتاج في التحصيلي أو القدرات للقبول في كليتك المنشودة؟' 
              : currentLang === 'ur' 
              ? 'من پسند شعبے میں داخلے کے لیے تحصیلی میں کتنا اسکور چاہیے؟' 
              : 'What Tahsili or Qudurat Score Do You Need to Get In?'}
          </h3>
        </div>

        {/* Toggle between solving for Tahsili or Qudurat */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-gray-200 text-xs font-bold">
          <button
            onClick={() => setSolveFor('tahsili')}
            className={cn(
              "px-3 py-1.5 rounded-lg transition-colors",
              solveFor === 'tahsili' ? "bg-primary text-white shadow-sm" : "text-gray-600 hover:text-primary"
            )}
          >
            {currentLang === 'ar' ? 'حساب درجة التحصيلي' : currentLang === 'ur' ? 'تحصیلی اسکور نکالیں' : 'Solve for Tahsili'}
          </button>
          <button
            onClick={() => setSolveFor('qudurat')}
            className={cn(
              "px-3 py-1.5 rounded-lg transition-colors",
              solveFor === 'qudurat' ? "bg-primary text-white shadow-sm" : "text-gray-600 hover:text-primary"
            )}
          >
            {currentLang === 'ar' ? 'حساب درجة القدرات' : currentLang === 'ur' ? 'قدرات اسکور نکالیں' : 'Solve for Qudurat'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Controls */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-primary mb-1">
                {currentLang === 'ar' ? 'النسبة الموزونة المستهدفة (%)' : currentLang === 'ur' ? 'ہدف موزونہ فیصد (%)' : 'Target Mawzoonah GPA (%)'}
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="75"
                  max="98"
                  step="0.5"
                  value={targetMawzoonah}
                  onChange={(e) => setTargetMawzoonah(Number(e.target.value))}
                  className="flex-grow accent-secondary cursor-pointer h-2 bg-gray-200 rounded-lg"
                />
                <span className="font-serif font-black text-secondary text-base w-14 text-center">
                  {targetMawzoonah}%
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-primary mb-1">
                {currentLang === 'ar' ? 'معدل الثانوية العامة الفعلي (%)' : currentLang === 'ur' ? 'ہائی اسکول جی پی اے (%)' : 'Current High School GPA (%)'}
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="70"
                  max="100"
                  step="0.5"
                  value={highSchoolScore}
                  onChange={(e) => setHighSchoolScore(Number(e.target.value))}
                  className="flex-grow accent-secondary cursor-pointer h-2 bg-gray-200 rounded-lg"
                />
                <span className="font-serif font-black text-primary text-base w-14 text-center">
                  {highSchoolScore}%
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-primary mb-1">
              {solveFor === 'tahsili'
                ? (currentLang === 'ar' ? 'درجة اختبار القدرات التي حصلت عليها' : currentLang === 'ur' ? 'حاصل کردہ قدرات اسکور' : 'Known Qudurat Score')
                : (currentLang === 'ar' ? 'درجة اختبار التحصيلي التي حصلت عليها' : currentLang === 'ur' ? 'حاصل کردہ تحصیلی اسکور' : 'Known Tahsili Score')}
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="50"
                max="100"
                step="1"
                value={knownQudurat}
                onChange={(e) => setKnownQudurat(Number(e.target.value))}
                className="flex-grow accent-secondary cursor-pointer h-2 bg-gray-200 rounded-lg"
              />
              <span className="font-serif font-black text-primary text-base w-14 text-center">
                {knownQudurat}
              </span>
            </div>
          </div>

          <div className="text-[11px] text-gray-500 bg-white p-3 rounded-xl border border-gray-200 flex items-center justify-between">
            <span>
              {currentLang === 'ar' ? 'تطبيق على:' : currentLang === 'ur' ? 'زیرِ غور یونیورسٹی:' : 'Applied to:'} <strong>{currentUni.name[currentLang] || currentUni.name.en}</strong> ({currentTrack.name[currentLang] || currentTrack.name.en})
            </span>
            <span className="text-secondary font-bold">
              {weights.highSchool}% / {weights.qudurat}% / {weights.tahsili}%
            </span>
          </div>
        </div>

        {/* Dynamic Solution Card */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between text-center">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-1">
              {solveFor === 'tahsili'
                ? (currentLang === 'ar' ? 'الدرجة المطلوبة في التحصيلي' : currentLang === 'ur' ? 'تحصیلی میں درکار اسکور' : 'Required Tahsili Exam Score')
                : (currentLang === 'ar' ? 'الدرجة المطلوبة في القدرات' : currentLang === 'ur' ? 'قدرات میں درکار اسکور' : 'Required Qudurat Exam Score')}
            </div>

            <div className={cn(
              "text-5xl font-serif font-black my-2",
              calculationResult.difficulty === 'impossible' 
                ? "text-rose-600" 
                : calculationResult.difficulty === 'extreme' 
                ? "text-amber-600" 
                : "text-emerald-700"
            )}>
              {calculationResult.neededScore > 0 ? calculationResult.neededScore : '—'}
            </div>

            <p className="text-xs text-gray-600 leading-relaxed px-2">
              {calculationResult.message[currentLang] || calculationResult.message.en}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-center gap-2 text-[11px]">
            {calculationResult.achievable ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 size={14} />
                {currentLang === 'ar' ? 'ضمن النطاق الممكن تحقيقه' : currentLang === 'ur' ? 'قابلِ حصول ہدف' : 'Achievable Milestone'}
              </span>
            ) : (
              <span className="text-rose-600 font-bold flex items-center gap-1">
                <AlertTriangle size={14} />
                {currentLang === 'ar' ? 'يتجاوز الحد الأقصى للاختبار' : currentLang === 'ur' ? 'اضافی تیاری درکار ہے' : 'Exceeds 100 pt Ceiling'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
