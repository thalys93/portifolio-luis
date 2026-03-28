import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const BASE_URL = 'https://thalysdev.com';


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

        const html = document.documentElement;
        const langMap: Record<string, string> = {
            'pt-BR': 'pt-BR',
            en: 'en',
            es: 'es',
        };
        html.lang = langMap[lng] ?? lng;

        // Atualiza OG e Twitter dinâmicos (opcional, para compartilhamento após troca de idioma)
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDesc = document.querySelector('meta[property="og:description"]');
        const twTitle = document.querySelector('meta[name="twitter:title"]');
        const twDesc = document.querySelector('meta[name="twitter:description"]');
        if (ogTitle) ogTitle.setAttribute('content', title);
        if (ogDesc) ogDesc.setAttribute('content', description);
        if (twTitle) twTitle.setAttribute('content', title);
        if (twDesc) twDesc.setAttribute('content', description);
    }, [i18n.language, t]);

    return null;
}
