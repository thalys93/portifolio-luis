/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Languages } from 'lucide-react'
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
    const { i18n, t } = useTranslation();

    const languages = [
        { key: 'pt-BR', label: t('lang.portuguese') },
        { key: 'en', label: t('lang.english') },
        { key: 'es', label: t('lang.spanish') },
    ]

    const updateLanguage = (lng: string) => {
        i18n.changeLanguage(lng)
        localStorage.setItem('language', lng);
    }

    React.useEffect(() => {
        const language = localStorage.getItem('language');
        if (language) {
            i18n.changeLanguage(language);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='glass-effect hover:bg-orange-700/50 transition-all p-2 rounded relative md:top-3'>
                <Languages className='size-4' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {languages.map((lang) => (
                    <DropdownMenuItem onClick={(e) => { e.preventDefault(), updateLanguage(lang.key) }}>{lang.label}</DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default LanguageSwitcher