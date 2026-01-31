import { useLanguage } from '../contexts/LanguageContext';

interface ProjectRole {
    title: string;
    desc: string;
}

interface PrototypeScreen {
    titulo: string;
    descricao: string;
}

interface HandoffData {
    titulo: string;
    descricao: string;
    bullets: string[];
}

interface ProjectData {
    title: string;
    category: string;
    year: string;
    resumo: string;
    objetivo: string;
    desafio: string;
    meuPapel: ProjectRole[];
    processoPesquisa: ProjectRole[];
    descobertas: ProjectRole[];
    prototipo: {
        telas: PrototypeScreen[];
    };
    handoff: HandoffData;
    resultados: ProjectRole[];
    licoes: ProjectRole[];
}

export function useProjectData(projectKey: string): ProjectData | null {
    const { translations } = useLanguage();

    const projects = translations.projects as Record<string, ProjectData> | undefined;
    const projectTranslations = projects?.[projectKey];

    if (!projectTranslations) {
        return null;
    }

    return {
        title: projectTranslations.title || '',
        category: projectTranslations.category || '',
        year: projectTranslations.year || '',
        resumo: projectTranslations.resumo || '',
        objetivo: projectTranslations.objetivo || '',
        desafio: projectTranslations.desafio || '',
        meuPapel: projectTranslations.meuPapel || [],
        processoPesquisa: projectTranslations.processoPesquisa || [],
        descobertas: projectTranslations.descobertas || [],
        prototipo: projectTranslations.prototipo || { telas: [] },
        handoff: projectTranslations.handoff || { titulo: '', descricao: '', bullets: [] },
        resultados: projectTranslations.resultados || [],
        licoes: projectTranslations.licoes || [],
    };
}
