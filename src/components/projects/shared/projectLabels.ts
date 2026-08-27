/**
 * Retorna os rótulos internacionalizados para as seções padrão dos cases de projetos.
 */
export function getProjectSectionLabels(isPortuguese: boolean) {
    return {
        overview: {
            sublabel: isPortuguese ? "VISÃO GERAL" : "OVERVIEW",
            title: isPortuguese ? "O Projeto" : "The Project"
        },
        role: {
            sublabel: isPortuguese ? "CONTRIBUIÇÃO" : "CONTRIBUTION",
            title: isPortuguese ? "Meu Papel" : "My Role"
        },
        prototype: {
            sublabel: isPortuguese ? "PROTÓTIPO" : "PROTOTYPE",
            title: isPortuguese ? "Interface do Projeto" : "Project Interface"
        },
        process: {
            sublabel: isPortuguese ? "PESQUISA" : "RESEARCH",
            title: isPortuguese ? "Processo de Pesquisa" : "Research Process"
        },
        research: {
            sublabel: isPortuguese ? "PESQUISA" : "RESEARCH",
            title: isPortuguese ? "Processo de Pesquisa" : "Research Process"
        },
        vision: {
            sublabel: isPortuguese ? "DEFINIÇÃO" : "DEFINITION",
            title: isPortuguese ? "Visão de Produto" : "Product Vision"
        },
        productVision: {
            sublabel: isPortuguese ? "DEFINIÇÃO" : "DEFINITION",
            title: isPortuguese ? "Visão de Produto" : "Product Vision"
        },
        results: {
            sublabel: isPortuguese ? "IMPACTO" : "IMPACT",
            title: isPortuguese ? "Resultados Obtidos" : "Results Achieved"
        },
        lessons: {
            sublabel: isPortuguese ? "APRENDIZADOS" : "LESSONS",
            title: isPortuguese ? "Lições Aprendidas" : "Lessons Learned"
        },
        handoff: {
            sublabel: isPortuguese ? "ENGENHARIA" : "ENGINEERING",
            title: isPortuguese ? "Handoff & Design System" : "Handoff & Design System"
        }
    };
}
