import React from 'react';
import { Award, ArrowRight, ExternalLink, CheckCircle2, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { UniversityFormula } from '../../data/higherEducationData';

interface MultiUniComparisonProps {
  currentLang: 'en' | 'ar' | 'ur';
  universities: UniversityFormula[];
  highSchoolScore: number;
  quduratScore: number;
  tahsiliScore: number;
  onSelectUniversity: (uniId: string, trackId: string) => void;
}

export const MultiUniComparison: React.FC<MultiUniComparisonProps> = ({
  currentLang,
  universities,
  highSchoolScore,
  quduratScore,
  tahsiliScore,
  onSelectUniversity
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-lg mt-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-wider mb-1">
            <Award size={16} />
            <span>
              {currentLang === 'ar' ? 'المقارنة المتزامنة للجامعات' : currentLang === 'ur' ? 'تمام جامعات کا موازنہ' : 'Multi-University Comparative Matrix'}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-primary">
            {currentLang === 'ar' 
              ? 'موقع نسبتك الموزونة في كبرى الجامعات الحكومية' 
              : currentLang === 'ur' 
              ? 'سعودی جامعات میں آپ کی متوقع پوزیشن اور اہلیت' 
              : 'Your Standing Across All Flagship Saudi Universities'}
          </h3>
        </div>
        <div className="text-xs text-gray-500 font-medium bg-paper px-3.5 py-2 rounded-xl border border-gray-200">
          {currentLang === 'ar'
            ? `بناءً على: ثانوية ${highSchoolScore}% | قدرات ${quduratScore} | تحصيلي ${tahsiliScore}`
            : currentLang === 'ur'
            ? `بنیادی اسکور: ہائی اسکول ${highSchoolScore}% | قدرات ${quduratScore} | تحصیلی ${tahsiliScore}`
            : `Scores: HS ${highSchoolScore}% | Qudurat ${quduratScore} | Tahsili ${tahsiliScore}`}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {universities.map(uni => {
          // Calculate for the first primary scientific/health track
          const primaryTrack = uni.tracks.find(t => !t.weights.sat) || uni.tracks[0];
          const w = primaryTrack.weights;
          const score = (w.highSchool * highSchoolScore / 100) + 
                        (w.qudurat * quduratScore / 100) + 
                        (w.tahsili * tahsiliScore / 100);
          const finalPercent = Math.min(100, Math.max(0, score));
          const minCutoff = primaryTrack.cutoffMin || 85;
          const maxCutoff = primaryTrack.cutoffMax || 92;
          const isAbove = finalPercent >= maxCutoff;
          const isInBand = finalPercent >= minCutoff && finalPercent < maxCutoff;

          return (
            <div 
              key={`comp-${uni.id}`}
              className="p-5 rounded-2xl border border-gray-150 bg-paper/60 hover:bg-white hover:border-secondary/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    {uni.location[currentLang] || uni.location.en}
                  </span>
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border",
                    isAbove 
                      ? "text-emerald-700 bg-emerald-50 border-emerald-200" 
                      : isInBand 
                      ? "text-secondary bg-amber-50 border-amber-200" 
                      : "text-gray-600 bg-gray-100 border-gray-200"
                  )}>
                    {isAbove 
                      ? (currentLang === 'ar' ? 'مؤهل بقوة' : currentLang === 'ur' ? 'مضبوط پوزیشن' : 'High Probability')
                      : isInBand 
                      ? (currentLang === 'ar' ? 'ضمن المنافسة' : currentLang === 'ur' ? 'مسابقتی حد' : 'Competitive')
                      : (currentLang === 'ar' ? 'أقل من المعتاد' : currentLang === 'ur' ? 'متبادل دیکھیں' : 'Target Alternate')}
                  </span>
                </div>

                <h4 className="font-serif font-bold text-base text-primary mb-1 line-clamp-1">
                  {uni.name[currentLang] || uni.name.en}
                </h4>
                <p className="text-xs text-gray-500 mb-3">
                  {primaryTrack.name[currentLang] || primaryTrack.name.en}
                </p>

                <div className="flex items-baseline justify-between mb-3 bg-white p-3 rounded-xl border border-gray-100">
                  <span className="text-xs text-gray-500">
                    {currentLang === 'ar' ? 'النسبة الموزونة:' : currentLang === 'ur' ? 'آپ کا اسکور:' : 'Calculated GPA:'}
                  </span>
                  <span className="text-2xl font-serif font-black text-primary">
                    {finalPercent.toFixed(2)}%
                  </span>
                </div>

                <div className="text-[11px] text-gray-500 space-y-1 mb-3">
                  <div className="flex justify-between">
                    <span>{currentLang === 'ar' ? 'الحد التاريخي:' : currentLang === 'ur' ? 'کٹ آف رینج:' : 'Benchmark Cutoff:'}</span>
                    <span className="font-semibold text-gray-700">{primaryTrack.typicalCutoff}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{currentLang === 'ar' ? 'المعادلة:' : currentLang === 'ur' ? 'فارمولا:' : 'Weights:'}</span>
                    <span className="font-mono text-[10px] text-gray-600">
                      {w.highSchool}% / {w.qudurat}% / {w.tahsili}%
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectUniversity(uni.id, primaryTrack.id)}
                className="w-full mt-2 py-2 px-3 rounded-xl border border-gray-200 hover:border-secondary hover:bg-secondary/5 text-primary text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>{currentLang === 'ar' ? 'فحص تفاصيل المسارات' : currentLang === 'ur' ? 'تفصیلی جائزہ لیں' : 'Analyze in Main Calculator'}</span>
                <ChevronRight size={14} className={currentLang === 'ar' || currentLang === 'ur' ? 'rotate-180' : ''} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
