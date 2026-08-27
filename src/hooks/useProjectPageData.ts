import { useLanguage } from '../contexts/LanguageContext';

export interface BaseProjectData {
    title: string;
    category: string;
    year: string;
    resumo: string;
    objetivo: string;
    desafio: string;
    meuPapel: Array<{ title: string; desc: string }>;
    prototipo?: {
        intro?: string;
        telas: Array<{
            titulo: string;
            descricao: string;
            imagens?: string[];
            secondaryImagens?: string[];
            scrollAnimation?: boolean;
            deviceType?: 'macbook' | 'iphone' | 'dual-iphone' | 'raw' | string;
            imageFit?: 'contain' | 'cover';
        }>;
    };
    resultados?: Array<{ title: string; desc: string }>;
    licoes?: Array<{ title: string; desc: string }>;
    [key: string]: any;
}

/**
 * Custom hook para carregar e formatar dados i18n de uma página de projeto
 * mantendo dados de fallback para desenvolvimento e prerender sem erros,
 * preservando as imagens do protótipo caso o JSON de tradução não as contenha.
 */
export function useProjectPageData<T extends BaseProjectData>(
    projectKey: string,
    fallbackData: T,
    imagePathPrefix?: string
): T {
    const { translations } = useLanguage();
    const p = (translations.projects as Record<string, any>)?.[projectKey];

    if (!p) {
        return fallbackData;
    }

    const merged = { ...fallbackData, ...p };

    if (fallbackData.handoff) {
        const pHandoff = p.handoff || {};
        const hasTitulo = typeof pHandoff.titulo === 'string' && pHandoff.titulo.trim() !== '';
        const hasDesc = typeof pHandoff.descricao === 'string' && pHandoff.descricao.trim() !== '';
        const hasBullets = Array.isArray(pHandoff.bullets) && pHandoff.bullets.length > 0;

        merged.handoff = {
            ...fallbackData.handoff,
            ...pHandoff,
            titulo: hasTitulo ? pHandoff.titulo : fallbackData.handoff.titulo,
            descricao: hasDesc ? pHandoff.descricao : fallbackData.handoff.descricao,
            bullets: hasBullets ? pHandoff.bullets : fallbackData.handoff.bullets,
            imagem: pHandoff.imagem || fallbackData.handoff.imagem,
        };
    }

    if (p.prototipo?.telas && fallbackData.prototipo?.telas) {
        merged.prototipo = {
            ...fallbackData.prototipo,
            ...p.prototipo,
            telas: p.prototipo.telas.map((t: any, i: number) => {
                const fallbackTela = fallbackData.prototipo?.telas?.[i];
                const fallbackImagens = fallbackTela?.imagens || (imagePathPrefix ? [`${imagePathPrefix}/${i + 1}.webp`] : []);
                return {
                    ...fallbackTela,
                    ...t,
                    imagens: t.imagens && t.imagens.length > 0 ? t.imagens : fallbackImagens,
                    secondaryImagens: t.secondaryImagens && t.secondaryImagens.length > 0 ? t.secondaryImagens : fallbackTela?.secondaryImagens,
                    scrollAnimation: t.scrollAnimation !== undefined ? t.scrollAnimation : fallbackTela?.scrollAnimation,
                    deviceType: t.deviceType || fallbackTela?.deviceType,
                    imageFit: t.imageFit || fallbackTela?.imageFit
                };
            })
        };
    }

    return merged as T;
}
