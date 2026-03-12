import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locale/en.json';
import es from './locale/es.json';
import ptBR from './locale/ptbr.json';

i18n.use(initReactI18next).init({
    fallbackLng: 'pt-BR',
    debug: false,
    interpolation: {
        escapeValue: false,
    },
    resources: {
        'pt-BR': {
            translation: ptBR,
        },
        en: {
            translation: en,
        },
        es: {
            translation: es,
        },
    },
    lng: (() => {
        if (typeof window === 'undefined') return 'pt-BR';
        const params = new URLSearchParams(window.location.search);
        const hl = params.get('hl');
        const supported = ['pt-BR', 'en', 'es'];
        if (hl && supported.includes(hl)) {
            localStorage.setItem('language', hl);
            return hl;
        }
        return localStorage.getItem('language') || 'pt-BR';
    })(),
});

export default i18n;
