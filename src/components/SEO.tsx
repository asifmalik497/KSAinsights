import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: string;
  jsonLd?: object | object[];
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = 'https://picsum.photos/seed/riyadh/1200/630',
  twitterCard = 'summary_large_image',
  jsonLd,
}) => {
  const { t, i18n } = useTranslation();
  
  const siteName = 'KSA Insights';
  const fullTitle = title ? `${title} | ${siteName}` : t('hero.title') + ' | Expert Consultancy';
  const fullDescription = description || t('hero.subtitle');
  const url = window.location.href;
  
  // Hreflang links
  const languages = ['en', 'ar', 'ur'];
  const baseUrl = window.location.origin + window.location.pathname;

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
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={canonical || url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Hreflang tags for multilingual SEO */}
      {languages.map((lang) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={lang}
          href={`${baseUrl}?lng=${lang}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}?lng=en`} />

      {/* Structured Data (JSON-LD) */}
      {jsonLdArray.map((ld, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
