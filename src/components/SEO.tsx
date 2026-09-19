import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: string;
  jsonLd?: object | object[];
}

const DEFAULT_KEYWORDS = {
  ar: 'رؤية السعودية 2030, الاستثمار في السعودية, تأسيس الشركات في الرياض, ترخيص وزارة الاستثمار ميزا, النسبة الموزونة 1447, القبول الموحد للجامعات السعودية, اختبار القدرات والتحصيلي, أخبار السعودية عاجل, الإقامة المميزة في السعودية, أنظمة العمل والعمال السعودية, منصة أبشر, وزارة التعليم السعودية',
  en: 'Saudi Vision 2030, Saudi Arabia business consultancy, MISA investment license, Mawzoonah calculator Saudi, Saudi university admissions 2026, Qudurat Tahsili KFUPM KSU, Saudi business news SPA, Saudi Premium Residency, expat guide Saudi Arabia, Ministry of Education KSA',
  ur: 'سعودی ویژن 2030, سعودی عرب میں بزنس اور سرمایہ کاری, میزا لائسنس, سعودی یونیورسٹی داخلے اور موزونہ کیلکولیٹر, اقامہ اور وزٹ ویزا قوانین, سعودی عرب تازہ ترین خبریں'
};

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  ogImage = 'https://picsum.photos/seed/riyadh/1200/630',
  twitterCard = 'summary_large_image',
  jsonLd,
}) => {
  const { t, i18n } = useTranslation();
  
  const currentLang = (i18n.language || 'en').startsWith('ar') 
    ? 'ar' 
    : (i18n.language || 'en').startsWith('ur') 
    ? 'ur' 
    : 'en';

  const siteName = currentLang === 'ar' 
    ? 'رؤى السعودية | KSA Insights' 
    : currentLang === 'ur'
    ? 'کے ایس اے انسائٹس | KSA Insights'
    : 'KSA Insights';

  const defaultTitle = currentLang === 'ar'
    ? 'رؤى السعودية | بوابة استشارات الأعمال والتعليم والأنظمة 2026'
    : currentLang === 'ur'
    ? 'کے ایس اے انسائٹس | سعودی بزنس، تعلیم اور قانونی رہنمائی'
    : 'KSA Insights | Expert Saudi Business Consultancy, Education & Regulations 2026';

  const defaultDescription = currentLang === 'ar'
    ? 'البوابة المعتمدة لاستشارات الأعمال في المملكة العربية السعودية، تحليلات رؤية 2030، حاسبة النسبة الموزونة للجامعات 1447هـ، وتحديثات وزارة الاستثمار والتعليم المباشرة.'
    : currentLang === 'ur'
    ? 'سعودی عرب میں کاروبار، سرمایہ کاری، ویژن 2030، سعودی جامعات کے داخلے اور تازہ ترین سرکاری قوانین کی جامع گائیڈ۔'
    : 'Authoritative intelligence portal for Saudi Vision 2030, MISA business setup, Saudi university admissions Mawzoonah calculator, and live regulatory news.';

  const fullTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const fullDescription = description || defaultDescription;
  const activeKeywords = keywords || (DEFAULT_KEYWORDS[currentLang] + ', ' + DEFAULT_KEYWORDS.ar);
  const origin = typeof window !== 'undefined' && window.location.origin.includes('ksainsights.com') 
    ? 'https://ksainsights.com' 
    : (typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'https://ksainsights.com');
  const pathname = typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') : '';
  const cleanCanonical = canonical || `${origin}${pathname || '/'}`;

  const resolvedOgImage = ogImage 
    ? (ogImage.startsWith('http') ? ogImage : `${origin}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`)
    : `${origin}/images/saudi_airshow_formation_1789755150950.jpg`;
  
  // Hreflang links
  const languages = ['en', 'ar', 'ur'];
  const baseUrl = `${origin}${pathname || ''}`;

  // Process JSON-LD to ensure it's always an array for mapping
  const jsonLdArray = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  // Update HTML lang attribute
  React.useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === 'ar' || i18n.language === 'ur' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={activeKeywords} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={cleanCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={cleanCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={cleanCanonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={resolvedOgImage} />

      {/* Hreflang tags for multilingual SEO */}
      {languages.map((lang, index) => (
        <link
          key={`hreflang-${lang}-${index}`}
          rel="alternate"
          hrefLang={lang}
          href={`${baseUrl}?lng=${lang}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}?lng=en`} />

      {/* Structured Data (JSON-LD) */}
      {jsonLdArray.map((ld, index) => (
        <script key={`seo-jsonld-${index}`} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
