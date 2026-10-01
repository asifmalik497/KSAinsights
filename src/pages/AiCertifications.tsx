import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, GraduationCap } from 'lucide-react';
import { getLanguage } from '../lib/utils';
import SEO from '../components/SEO';
import { Ai900CertificationHub } from '../components/education/Ai900CertificationHub';

export default function AiCertifications() {
  const { i18n } = useTranslation();
  const currentLang = getLanguage(i18n.language);
  const isRTL = currentLang === 'ar' || currentLang === 'ur';

  const ai900Keywords = currentLang === 'ar'
    ? 'اختبار AI-900 مايكروسوفت, شهادة مايكروسوفت للذكاء الاصطناعي, دعم هدف للشهادات المهنية, استرداد رسوم اختبار AI-900, طاقات هدف, اختبار تجريبي AI-900 بالعربي, أسئلة امتحان Azure AI Fundamentals, حوسبة سحابية سدايا'
    : currentLang === 'ur'
    ? 'مائیکروسافٹ AI-900 امتحان, ازور اے آئی فنڈامینٹلز, ہدف فنڈ فیس واپسی, طاقات پورٹل رجسٹریشن, مائیکروسافٹ سرٹیفیکیشن پاکستان انڈیا سعودی عرب, اے آئی 900 پریکٹس ٹیسٹ'
    : 'Microsoft Azure AI-900 exam prep, AI-900 practice test, HRDF Hadaf certification reimbursement, Taqat professional certificates, Azure AI Fundamentals exam simulator, Microsoft AI certification Saudi Arabia, SDAIA AI certifications';

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      'name': 'Microsoft Azure AI-900 Fundamentals & HRDF Reimbursement Prep',
      'description': 'Comprehensive bilingual diagnostic exam simulator, cheat sheets, and 100% HRDF Hadaf exam fee reimbursement step-by-step guidance in Saudi Arabia.',
      'provider': {
        '@type': 'Organization',
        'name': 'KSA Insights Education & Tech Desk',
        'sameAs': 'https://ksainsights.com'
      },
      'educationalCredentialAwarded': 'Microsoft Certified: Azure AI Fundamentals (AI-900)'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'AI-900 Interactive Diagnostic Simulator (10 Questions)',
      'applicationCategory': 'EducationalApplication',
      'operatingSystem': 'All',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'SAR'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafaf9] py-8 lg:py-14">
      <SEO 
        title={
          currentLang === 'ar' 
            ? 'مركز التحضير لاختبار مايكروسوفت AI-900 | التعليم في السعودية ودعم هدف'
            : currentLang === 'ur'
            ? 'مائیکروسافٹ AI-900 امتحان کی تیاری | سعودی عرب میں تعلیم اور ہدف فنڈ'
            : 'Microsoft Azure AI-900 Prep Hub | Education in KSA & HRDF Reimbursement'
        }
        description={
          currentLang === 'ar'
            ? 'دليل واختبار تجريبي تفاعلي لاختبار Microsoft AI-900 ضمن قطاع التعليم في السعودية مع شرح استرداد الرسوم 100% من هدف.'
            : 'Interactive diagnostic simulator and bilingual cheat sheets for Microsoft Azure AI-900 certification within the Education in KSA portal.'
        }
        keywords={ai900Keywords}
        jsonLd={jsonLd}
      />

      <div className="max-w-6xl mx-auto px-4">
        {/* Back Link to Education in KSA */}
        <div className="mb-6">
          <Link
            to="/higher-education"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-primary transition-colors"
          >
            {isRTL ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
            <GraduationCap size={16} className="text-secondary" />
            <span>
              {currentLang === 'ar' 
                ? 'العودة إلى بوابة التعليم في السعودية وحاسبة الموزونة' 
                : currentLang === 'ur'
                ? 'سعودی عرب میں تعلیم اور یونیورسٹی داخلہ گائیڈ پر واپس جائیں'
                : 'Back to Education in KSA & Admission Hub'}
            </span>
          </Link>
        </div>

        {/* The Reusable AI-900 Certification Hub Component */}
        <Ai900CertificationHub currentLang={currentLang} />
      </div>
    </div>
  );
}
