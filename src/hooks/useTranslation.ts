import { useLanguage } from '../contexts/LanguageContext';

type NestedKeyOf<T> = T extends object
    ? { [K in keyof T]: K extends string ? K | `${K}.${NestedKeyOf<T[K]>}` : never }[keyof T]
    : never;

type TranslationKeys = NestedKeyOf<typeof import('../locales/pt-BR.json')>;

export function useTranslation() {
    const { language, setLanguage, translations } = useLanguage();

    const t = <T = string>(key: TranslationKeys, params?: Record<string, string | number>): T => {
        const keys = key.split('.');
        let value: unknown = translations;

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = (value as Record<string, unknown>)[k];
            } else {
                console.warn(`Translation key not found: ${key}`);
                return key as unknown as T;
            }
        }

        // Return the value directly if it's not a string (e.g. array or object)
        if (typeof value !== 'string') {
            return value as T;
        }

        // Replace parameters like {year} with actual values
        if (params) {
            return value.replace(/\{(\w+)\}/g, (_, paramKey) => {
                return params[paramKey]?.toString() ?? `{${paramKey}}`;
            }) as unknown as T;
        }

        return value as unknown as T;
    };

    return {
        t,
        language,
        setLanguage,
        isPortuguese: language === 'pt-BR',
        isEnglish: language === 'en-US',
    };
}
