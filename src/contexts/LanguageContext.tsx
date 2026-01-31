import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import ptBR from '../locales/pt-BR.json';
import enUS from '../locales/en-US.json';

export type Language = 'pt-BR' | 'en-US';

type TranslationData = typeof ptBR;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    translations: TranslationData;
}

const translations: Record<Language, TranslationData> = {
    'pt-BR': ptBR,
    'en-US': enUS,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
    children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
    const [language, setLanguageState] = useState<Language>(() => {
        // Check localStorage first
        const saved = localStorage.getItem('language');
        if (saved === 'pt-BR' || saved === 'en-US') {
            return saved;
        }
        // Detect browser language - if Portuguese, use pt-BR, otherwise use en-US
        const browserLang = navigator.language.toLowerCase();
        return browserLang.startsWith('pt') ? 'pt-BR' : 'en-US';
    });

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
        // Update html lang attribute
        document.documentElement.lang = lang;
    };

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                translations: translations[language],
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
