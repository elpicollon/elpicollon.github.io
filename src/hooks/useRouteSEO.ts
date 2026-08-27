import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

interface RouteMetaConfig {
    title: { 'pt-BR': string; 'en-US': string };
    description: { 'pt-BR': string; 'en-US': string };
    ogImage?: string;
}

const routeMetadata: Record<string, RouteMetaConfig> = {
    '/': {
        title: {
            'pt-BR': 'Picolo Design Digital | Staff UX/UI & Product Designer',
            'en-US': 'Picolo Design Digital | Staff UX/UI & Product Designer'
        },
        description: {
            'pt-BR': 'Portfolio de Rodrigo Picolo - Staff UX/UI & Product Designer com mais de 12 anos em tecnologia e 7 anos em UX. Especialista em interfaces com IA, SaaS B2B e Design Systems.',
            'en-US': 'Rodrigo Picolo Portfolio - Staff UX/UI & Product Designer with 12+ years in technology and 7+ years in UX. Specialist in AI interfaces, B2B SaaS, and Design Systems.'
        },
        ogImage: '/assets/image-rp.webp'
    },
    '/sobre': {
        title: {
            'pt-BR': 'Sobre Rodrigo Picolo | Trajetória, Formação e Certificações',
            'en-US': 'About Rodrigo Picolo | Career, Education & Certifications'
        },
        description: {
            'pt-BR': 'Conheça a trajetória de Rodrigo Picolo, Staff Product Designer com background técnico, pós-graduação em Design Digital e atuação AI-First.',
            'en-US': 'Learn about Rodrigo Picolo, Staff Product Designer with technical background, Digital Design specialization, and AI-First approach.'
        },
        ogImage: '/assets/image-rp.webp'
    },
    '/projeto/ia-notetaker-app': {
        title: {
            'pt-BR': 'IA Notetaker App · Case de UX/UI | Rodrigo Picolo',
            'en-US': 'AI Notetaker App · UX/UI Case Study | Rodrigo Picolo'
        },
        description: {
            'pt-BR': 'Case de design do aplicativo mobile IA Notetaker: áudio-first, transcrição estilo chat e Smart Insights gerados por IA para vendedores em campo.',
            'en-US': 'AI Notetaker mobile app design case study: audio-first, chat-style transcription, and AI-powered Smart Insights for sales reps in the field.'
        },
        ogImage: '/assets/projects/ia-notetaker-app/card-home.webp'
    },
    '/projeto/transcricoes-insights-ia': {
        title: {
            'pt-BR': 'Transcrições & Insights com IA · Case de UX/UI | Rodrigo Picolo',
            'en-US': 'Transcriptions & AI Insights · UX/UI Case Study | Rodrigo Picolo'
        },
        description: {
            'pt-BR': 'Redesign de ecossistema de videoconferências focado na centralização de gravações, transcrições e insights de IA com estratégias de PLG.',
            'en-US': 'Videoconference ecosystem redesign focused on centralizing recordings, transcriptions, and AI insights with PLG strategies.'
        },
        ogImage: '/assets/projects/transcricoes-insights-ia/card-home.webp'
    },
    '/projeto/medical-office': {
        title: {
            'pt-BR': 'Medical Office · Case de UX/UI | Rodrigo Picolo',
            'en-US': 'Medical Office · UX/UI Case Study | Rodrigo Picolo'
        },
        description: {
            'pt-BR': 'Redesign completo de software médico legado para clínicas e consultórios, reduzindo carga cognitiva e aumentando a agilidade clínica.',
            'en-US': 'Complete redesign of legacy medical software for clinics, reducing cognitive load and accelerating clinical workflows.'
        },
        ogImage: '/assets/projects/medical-office/card-home.webp'
    },
    '/projeto/importacao-empresas': {
        title: {
            'pt-BR': 'Importação de Empresas · Case de UX/UI | Rodrigo Picolo',
            'en-US': 'Company Import · UX/UI Case Study | Rodrigo Picolo'
        },
        description: {
            'pt-BR': 'Fluxo intuitivo e resiliente para importação em lote e enriquecimento de dados corporativos em plataforma B2B.',
            'en-US': 'Intuitive and resilient batch import and corporate data enrichment workflow for B2B platform.'
        },
        ogImage: '/assets/projects/importacao-empresas/capa.webp'
    }
};

export function useRouteSEO() {
    const location = useLocation();
    const { language } = useLanguage();

    useEffect(() => {
        const path = location.pathname;
        const config = routeMetadata[path] || routeMetadata['/'];

        const title = config.title[language] || config.title['pt-BR'];
        const description = config.description[language] || config.description['pt-BR'];
        const canonicalUrl = `https://picolodesign.com.br${path === '/' ? '' : path}`;

        // 1. Update Title
        document.title = title;

        // 2. Update Meta Description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', description);
        }

        // 3. Update Canonical Link
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (canonicalLink) {
            canonicalLink.setAttribute('href', canonicalUrl);
        }

        // 4. Update OpenGraph Tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', title);

        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', description);

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);

        if (config.ogImage) {
            const ogImage = document.querySelector('meta[property="og:image"]');
            if (ogImage) {
                ogImage.setAttribute('content', `https://picolodesign.com.br${config.ogImage}`);
            }
        }

        // 5. Update Twitter Meta Tags
        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (twitterTitle) twitterTitle.setAttribute('content', title);

        const twitterDesc = document.querySelector('meta[name="twitter:description"]');
        if (twitterDesc) twitterDesc.setAttribute('content', description);

        const twitterUrl = document.querySelector('meta[name="twitter:url"]');
        if (twitterUrl) twitterUrl.setAttribute('content', canonicalUrl);

    }, [location.pathname, language]);
}
