/**
 * Centralized projects configuration
 * Add new projects here and they will automatically appear in navigation
 */

export interface ProjectConfig {
    id: string;
    slug: string;
    route: string;
    translationKey: string;
    image?: string;
    video?: string;
    lottie?: string;
    gradientClass: string;
    primaryColorClass: string;
    hoverBorderClass?: string;
    hoverTextClass?: string;
    footerVerticalClass: string;
    footerHorizontalClass: string;
    /** Theme key used as data-panel-theme attribute; CSS rules apply the dark background */
    panelTheme: string;
    comingSoon?: boolean;
    published?: boolean;
    imagePosition?: 'center' | 'bottom';
}

export const PROJECTS: ProjectConfig[] = [
    {
        id: 'ia-notetaker-app',
        slug: 'ia-notetaker-app',
        route: '/projeto/ia-notetaker-app',
        translationKey: 'iaNotetakerApp',
        image: '/assets/projects/ia-notetaker-app/card-home.webp',
        lottie: '/assets/projects/ia-notetaker-app/notetakerIA.json',
        gradientClass: 'from-notetaker-primary to-notetaker-dark',
        primaryColorClass: 'text-notetaker-primary',
        hoverBorderClass: 'group-hover:border-notetaker-primary',
        hoverTextClass: 'group-hover:text-notetaker-primary',
        footerVerticalClass: 'from-notetaker-primary to-notetaker-primary/60',
        footerHorizontalClass: 'from-notetaker-primary via-notetaker-primary/40 to-slate-50',
        panelTheme: 'notetaker',
        imagePosition: 'center',
        comingSoon: true,
    },
    {
        id: 'transcricoes-insights-ia',
        slug: 'transcricoes-insights-ia',
        route: '/projeto/transcricoes-insights-ia',
        translationKey: 'transcricoesIA',
        image: '/assets/projects/transcricoes-insights-ia/card-home.webp',
        lottie: '/assets/projects/transcricoes-insights-ia/transcricoesIA.json',
        gradientClass: 'from-transcricoes-primary to-transcricoes-dark',
        primaryColorClass: 'text-transcricoes-primary',
        hoverBorderClass: 'group-hover:border-transcricoes-primary',
        hoverTextClass: 'group-hover:text-transcricoes-primary',
        footerVerticalClass: 'from-transcricoes-primary to-transcricoes-primary/60',
        footerHorizontalClass: 'from-transcricoes-primary via-transcricoes-primary/40 to-slate-50',
        panelTheme: 'transcricoes',
        imagePosition: 'center',
        published: true,
    },
    {
        id: 'medical-office',
        slug: 'medical-office',
        route: '/projeto/medical-office',
        translationKey: 'medicalOffice',
        image: '/assets/projects/medical-office/card-home.webp',
        lottie: '/assets/projects/medical-office/medoffice.json',
        gradientClass: 'from-medical-dark to-medical-light',
        primaryColorClass: 'text-medical-primary',
        hoverBorderClass: 'group-hover:border-medical-primary',
        hoverTextClass: 'group-hover:text-medical-primary',
        footerVerticalClass: 'from-medical-primary to-medical-primary/60',
        footerHorizontalClass: 'from-medical-primary via-medical-primary/40 to-slate-50',
        panelTheme: 'medical',
        imagePosition: 'center',
        published: true,
    },
    {
        id: 'importacao-empresas',
        slug: 'importacao-empresas',
        route: '/projeto/importacao-empresas',
        translationKey: 'importacaoEmpresas',
        image: '/assets/projects/importacao-empresas/capa.webp',
        lottie: '/assets/projects/importacao-empresas/importemp.json',
        gradientClass: 'from-importacao-light to-importacao-dark',
        primaryColorClass: 'text-importacao-primary',
        hoverBorderClass: 'group-hover:border-importacao-primary',
        hoverTextClass: 'group-hover:text-importacao-primary',
        footerVerticalClass: 'from-importacao-primary to-importacao-primary/60',
        footerHorizontalClass: 'from-importacao-primary via-importacao-primary/40 to-slate-50',
        panelTheme: 'importacao',
        imagePosition: 'center',
        published: true,
    },
];

/**
 * Get active (non-coming-soon) AND published projects
 */
export function getActiveProjects(): ProjectConfig[] {
    return PROJECTS.filter(p => !p.comingSoon && p.published !== false);
}

/**
 * Get ALL published projects (including coming soon if referenced)
 * Useful for routes check
 */
export function getPublishedProjects(): ProjectConfig[] {
    return PROJECTS.filter(p => p.published !== false);
}

/**
 * Get project by slug
 */
export function getProjectBySlug(slug: string): ProjectConfig | undefined {
    return PROJECTS.find(p => p.slug === slug);
}

/**
 * Get project by route
 */
export function getProjectByRoute(route: string): ProjectConfig | undefined {
    return PROJECTS.find(p => p.route === route);
}

/**
 * Get adjacent projects (previous and next) based on current route
 * Only cycles through PUBLISHED projects
 */
export function getAdjacentProjects(currentRoute: string): {
    previous: ProjectConfig | null;
    next: ProjectConfig | null;
} {
    const activeProjects = getActiveProjects();
    const currentIndex = activeProjects.findIndex(p => p.route === currentRoute);

    if (currentIndex === -1) {
        return { previous: null, next: null };
    }

    const previous = currentIndex > 0 ? activeProjects[currentIndex - 1] : activeProjects[activeProjects.length - 1];
    const next = currentIndex < activeProjects.length - 1 ? activeProjects[currentIndex + 1] : activeProjects[0];

    return { previous, next };
}
