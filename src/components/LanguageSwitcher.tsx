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
        <div className="flex items-center gap-1 md:gap-1 px-2 md:px-2 py-1.5 md:py-1 eb-bevel eb-bevel-xs eb-bevel-border bg-card/60 backdrop-blur-md shadow-sm">
            <motion.button
                onClick={() => handleLanguageChange('pt-BR')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 md:px-2.5 py-1.5 md:py-1 text-sm md:text-xs font-medium eb-bevel eb-bevel-xs transition-all duration-200 cursor-pointer ${language === 'pt-BR'
                    ? 'bg-primary text-primary-foreground shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-[#2DB354]'
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
                className={`px-3 md:px-2.5 py-1.5 md:py-1 text-sm md:text-xs font-medium eb-bevel eb-bevel-xs transition-all duration-200 cursor-pointer ${language === 'en-US'
                    ? 'bg-primary text-primary-foreground shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-[#2DB354]'
                    }`}
                aria-label={language === 'en-US' ? t('accessibility.languageSwitcher.switchToEnglish') : t('accessibility.languageSwitcher.switchToEnglish')}
                aria-pressed={language === 'en-US'}
            >
                EN
            </motion.button>
        </div>
    );
}
