import { useLanguage } from '../contexts/LanguageContext';
import { LucideIcon, Target, Layers, Users, Code, Lightbulb, Mic } from 'lucide-react';

// Icons mapping for highlight cards
const iconMap: Record<number, LucideIcon> = {
    0: Target,
    1: Layers,
    2: Users,
    3: Code,
    4: Lightbulb,
    5: Mic
};

// Event images mapping
const eventImages = [
    "/assets/about/evento-1.png",
    "/assets/about/evento-2.png",
    "/assets/about/evento-3.png",
    "/assets/about/evento-4.jpg",
    "/assets/about/evento-5.jpg"
];

export interface ExperienceItem {
    period: string;
    role: string;
    company: string;
    location: string;
    current?: boolean;
    type: 'work';
}

export interface EducationItem {
    period: string;
    degree: string;
    institution: string;
    type: 'education';
}

export interface CertificationItem {
    name: string;
    org: string;
    year: string;
}

export interface EventItem {
    title: string;
    subtitle: string;
    image: string;
}

export interface HighlightCardItem {
    icon: LucideIcon;
    title: string;
    description: string;
    color: string;
}

export interface AboutPageData {
    hero: {
        title1: string;
        title2: string;
        subtitle: string;
    };
    quemSou: {
        label: string;
        title1: string;
        title2: string;
        intro: string[];
        highlightsTitle: string;
        highlights: string[];
        definesMe: string;
    };
    highlightCards: HighlightCardItem[];
    sections: {
        eventsLabel: string;
        eventsTitle: string;
        experienceLabel: string;
        experienceTitle: string;
        educationLabel: string;
        educationTitle: string;
        certificationsLabel: string;
        certificationsTitle: string;
    };
    experience: ExperienceItem[];
    education: EducationItem[];
    certifications: CertificationItem[];
    events: EventItem[];
    cta: {
        title: string;
        description: string;
        contactButton: string;
        backButton: string;
    };
    common: {
        current: string;
        scroll: string;
        back: string;
    };
}

export function useAboutPageData(): AboutPageData {
    const { translations } = useLanguage();
    const t = translations.aboutPage;
    const common = translations.common;

    // Build highlight cards with icons
    const highlightCards: HighlightCardItem[] = (t?.highlightCards || []).map((card: { title: string; description: string }, index: number) => ({
        icon: iconMap[index] || Target,
        title: card.title,
        description: card.description,
        color: index % 2 === 0 ? 'purple' : 'violet'
    }));

    // Build experience items with type
    const experience: ExperienceItem[] = (t?.experience || []).map((exp: { period: string; role: string; company: string; location: string; current?: boolean }) => ({
        ...exp,
        type: 'work' as const
    }));

    // Build education items with type
    const education: EducationItem[] = (t?.education || []).map((edu: { period: string; degree: string; institution: string }) => ({
        ...edu,
        type: 'education' as const
    }));

    // Build events with images
    const events: EventItem[] = (t?.events || []).map((event: { title: string; subtitle: string }, index: number) => ({
        ...event,
        image: eventImages[index] || eventImages[0]
    }));

    return {
        hero: t?.hero || {
            title1: 'Minha',
            title2: 'Trajetória',
            subtitle: 'Conheça minha jornada profissional, formação acadêmica e as certificações que moldam minha atuação.'
        },
        quemSou: t?.quemSou || {
            label: 'Quem Sou',
            title1: 'Design que conecta',
            title2: 'tecnologia e negócios',
            intro: [],
            highlightsTitle: 'Destaques da Trajetória',
            highlights: [],
            definesMe: 'O que me define'
        },
        highlightCards,
        sections: t?.sections || {
            eventsLabel: 'Conhecimento Aplicado',
            eventsTitle: 'Palestras & Eventos',
            experienceLabel: 'Experiência',
            experienceTitle: 'Carreira Profissional',
            educationLabel: 'Educação',
            educationTitle: 'Formação Acadêmica',
            certificationsLabel: 'Certificações',
            certificationsTitle: 'Desenvolvimento Contínuo'
        },
        experience,
        education,
        certifications: t?.certifications || [],
        events,
        cta: t?.cta || {
            title: 'Vamos trabalhar juntos?',
            description: 'Estou disponível para novos projetos e oportunidades de colaboração.',
            contactButton: 'Entre em Contato',
            backButton: 'Voltar'
        },
        common: {
            current: common?.current || 'Atual',
            scroll: common?.scroll || 'Scroll',
            back: common?.back || 'Voltar'
        }
    };
}
