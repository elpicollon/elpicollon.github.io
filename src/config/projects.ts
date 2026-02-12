/**
 * Centralized projects configuration
 * Add new projects here and they will automatically appear in navigation
 */

export interface ProjectConfig {
    id: string;
    slug: string;
    route: string;
    translationKey: string;
    image: string;
    gradient: string;
    primaryColor: string;
    comingSoon?: boolean;
    published?: boolean; // New flag
}

export const PROJECTS: ProjectConfig[] = [
    {
        id: 'transcricoes-insights-ia',
        slug: 'transcricoes-insights-ia',
        route: '/projeto/transcricoes-insights-ia',
        translationKey: 'transcricoesIA',
        image: '/assets/projects/transcricoes-insights-ia/card-home.png',
        gradient: 'linear-gradient(to bottom, #2F968C, #00463F)',
        primaryColor: '#2F968C',
        published: true,
    },
    {
        id: 'medical-office',
        slug: 'medical-office',
        route: '/projeto/medical-office',
        translationKey: 'medicalOffice',
        image: '/assets/projects/medical-office/card-home.png',
        gradient: 'linear-gradient(to bottom, #3066BF, #4088FF)',
        primaryColor: '#3066BF',
        published: true,
    },
    {
        id: 'importacao-empresas',
        slug: 'importacao-empresas',
        route: '/projeto/importacao-empresas',
        translationKey: 'importacaoEmpresas',
        image: '/assets/projects/importacao-empresas/card-home.png',
        gradient: 'linear-gradient(to bottom, #02376D, #0a4b8a)',
        primaryColor: '#02376D',
        published: false, // Not published yet
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
