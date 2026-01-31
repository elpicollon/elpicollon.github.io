import { motion } from 'motion/react';
import { useTranslation } from '../hooks/useTranslation';

interface LanguageSwitcherProps {
    /** Optional callback to execute after language is changed */
    onLanguageChange?: () => void;
}

export function LanguageSwitcher({ onLanguageChange }: LanguageSwitcherProps = {}) {
    const { language, setLanguage, t } = useTranslation();

    const handleLanguageChange = (newLanguage: 'pt-BR' | 'en-US') => {
        setLanguage(newLanguage);
        onLanguageChange?.();
    };

    return (
        <div className="flex items-center gap-1 md:gap-1 px-2 md:px-2 py-1.5 md:py-1 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm">
            <motion.button
                onClick={() => handleLanguageChange('pt-BR')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 md:px-2 py-1.5 md:py-1 text-sm md:text-xs font-medium rounded-full transition-all duration-200 ${language === 'pt-BR'
                    ? 'bg-black text-white shadow-sm'
                    : 'text-slate-600 hover:text-purple-600'
                    }`}
                aria-label={language === 'pt-BR' ? t('accessibility.languageSwitcher.switchToPortuguese') : t('accessibility.languageSwitcher.switchToPortuguese')}
                aria-pressed={language === 'pt-BR'}
            >
                PT
            </motion.button>
            <motion.button
                onClick={() => handleLanguageChange('en-US')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 md:px-2 py-1.5 md:py-1 text-sm md:text-xs font-medium rounded-full transition-all duration-200 ${language === 'en-US'
                    ? 'bg-black text-white shadow-sm'
                    : 'text-slate-600 hover:text-purple-600'
                    }`}
                aria-label={language === 'en-US' ? t('accessibility.languageSwitcher.switchToEnglish') : t('accessibility.languageSwitcher.switchToEnglish')}
                aria-pressed={language === 'en-US'}
            >
                EN
            </motion.button>
        </div>
    );
}
