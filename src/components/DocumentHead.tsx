import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const OG_LOCALE: Record<string, string> = {
  'pt-BR': 'pt_BR',
  en: 'en_US',
  es: 'es_ES',
};

const HTML_LANG: Record<string, string> = {
  'pt-BR': 'pt-BR',
  en: 'en',
  es: 'es',
};

export function DocumentHead() {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const lng = i18n.language;
    const title = t('seo.pageTitle');
    const description = t('seo.pageDescription');

    document.title = title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    document.documentElement.lang = HTML_LANG[lng] ?? lng;

    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    const twDesc = document.querySelector('meta[name="twitter:description"]');

    if (ogTitle) ogTitle.setAttribute('content', title);
    if (ogDesc) ogDesc.setAttribute('content', description);
    if (ogLocale && OG_LOCALE[lng]) {
      ogLocale.setAttribute('content', OG_LOCALE[lng]);
    }
    if (twTitle) twTitle.setAttribute('content', title);
    if (twDesc) twDesc.setAttribute('content', description);
  }, [i18n.language, t]);

  return null;
}
