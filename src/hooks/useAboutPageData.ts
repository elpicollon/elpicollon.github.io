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
    "/assets/about/evento-1.webp",
    "/assets/about/evento-2.webp",
    "/assets/about/evento-3.webp",
    "/assets/about/evento-4.webp",
    "/assets/about/evento-5.webp"
];

export interface CredentialNumberItem {
    title: string;
    subtitle: string;
}

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
        numbers: CredentialNumberItem[];
        intro: string[];
        highlightsTitle: string;
        highlights: string[];
        highlightEmojis?: string[];
        definesMe: string;
    };
    highlightCards: HighlightCardItem[];
    sections: {
        eventsLabel: string;
        eventsTitle: string;
        experienceLabel: string;
        experienceTitle1: string;
        experienceTitle2: string;
        educationLabel: string;
        educationTitle1: string;
        educationTitle2: string;
        certificationsLabel: string;
        certificationsTitle1: string;
        certificationsTitle2: string;
    };
    experience: ExperienceItem[];
    education: EducationItem[];
    certifications: CertificationItem[];
    events: EventItem[];
    cta: {
        title1: string;
        title2: string;
        description: string;
        contactButton: string;
        cvButton: string;
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
            title1: 'Conheça a',
            title2: 'minha trajetória.',
            subtitle: 'Conheça minha jornada profissional, formação acadêmica e as certificações que moldam minha atuação.'
        },
        quemSou: t?.quemSou || {
            label: 'Quem sou eu · minha trajetória',
            title1: 'Product Designer com',
            title2: 'background técnico',
            numbers: [
                { title: 'Sistemas de Informação', subtitle: 'Bacharel' },
                { title: 'Design Digital', subtitle: 'Especialista' },
                { title: 'AI First', subtitle: 'Design' }
            ],
            intro: [],
            highlightsTitle: 'Meus Destaques',
            highlights: [],
            highlightEmojis: ['🏆', '🎓', '🎤', '📜', '🚀'],
            definesMe: 'O que me define'
        },
        highlightCards,
        sections: t?.sections || {
            eventsLabel: 'Palestras e Eventos',
            eventsTitle: 'Palestras e Eventos',
            experienceLabel: 'Profissional · Minhas Experiências',
            experienceTitle1: 'Carreira',
            experienceTitle2: 'Profissional',
            educationLabel: 'Educação · Formação',
            educationTitle1: 'Formação',
            educationTitle2: 'Acadêmica',
            certificationsLabel: 'Certificações',
            certificationsTitle1: 'Desenvolvimento',
            certificationsTitle2: 'Contínuo'
        },
        experience,
        education,
        certifications: t?.certifications || [],
        events,
        cta: t?.cta || {
            title1: 'Vamos criar algo',
            title2: 'inteligente',
            description: 'Transformando conceitos complexos em experiências digitais intuitivas e bem estruturadas. Fale comigo.',
            contactButton: 'Fale comigo',
            cvButton: 'Baixar Currículo'
        },
        common: {
            current: common?.current || 'Atual',
            scroll: common?.scroll || 'Scroll',
            back: common?.back || 'Voltar'
        }
    };
}
