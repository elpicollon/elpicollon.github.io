import { useEffect } from 'react';
import {
    Search, Compass, Settings, PenTool,
    FileCheck, AlertTriangle, GitCompare, Columns,
    Gauge, ShieldCheck, Rocket, BadgeDollarSign,
    Code, TrendingUp, BarChart3
} from 'lucide-react';
import { AudioMiniPlayer } from '../AudioMiniPlayer';
import { useTranslation } from '../../hooks/useTranslation';
import { useProjectPageData } from '../../hooks/useProjectPageData';
import ProjectLayout from '../layout/ProjectLayout';
import { CHANNELS } from '../crt/channels';

import {
    ProjectOverviewSection,
    ProjectCardGridSection,
    ProjectProcessSection,
    ProjectProductVisionSection,
    ProjectImageCarouselSection,
    ProjectPrototypeSection,
    ProjectHandoffSection,
    getProjectSectionLabels,
} from './shared';

const FALLBACK_DATA = {
    title: "Importação de Empresas",
    category: "UX Design",
    year: "2025",
    resumo: "Este projeto busca aprimorar a funcionalidade de 'Sinalização de Empresas' dentro da plataforma Econodata.<br />O objetivo central é otimizar a experiência do usuário, lidando com desafios significativos que impactavam diretamente a eficiência operacional.",
    objetivo: "Evoluir a plataforma melhorando a experiência do usuário na funcionalidade de 'Sinalização de empresas', como parte de um teste técnico para Product Designer na Econodata.",
    desafio: "Melhorar a experiência do usuário na funcionalidade de Sinalização de Empresas, com foco em suprir dores recorrentes que impactam diretamente a eficiência do processo.",
    meuPapel: [
        { title: "Levantamento de Problemas", desc: "Identificação das dores da funcionalidade atual através de análise heurística e testes na plataforma." },
        { title: "Benchmarking", desc: "Estudo de concorrentes e players de mercado para mapear boas práticas e oportunidades de melhoria." },
        { title: "Análise Técnica", desc: "Avaliação das limitações técnicas da rotina atual e propostas para superá-las." },
        { title: "Design da Solução", desc: "Proposição de nova rotina contemplando objetivos do negócio e solicitações dos usuários." },
    ],
    processoPesquisa: [
        { title: "Visão Anterior", desc: "Teste e documentação do produto atual para análise aprofundada." },
        { title: "Matriz CSD", desc: "Aplicação da ferramenta para identificar Certezas, Suposições e Dúvidas." },
        { title: "Benchmarking", desc: "Análise comparativa detalhada com concorrentes." },
        { title: "Wireframes", desc: "Desenvolvimento de wireframes para validar a solução." },
    ],
    productVision: {
        whatItIs: {
            title: "O que É",
            items: [
                "Uma ferramenta para validação e enriquecimento de dados",
                "Um otimizador de processos de importação",
                "Uma solução para gestão de qualidade de dados"
            ]
        },
        whatItIsNot: {
            title: "O que NÃO É",
            items: [
                "Um sistema de CRM completo",
                "Uma ferramenta de disparo de emails",
                "Um banco de dados de terceiros desvinculado"
            ]
        },
        whatItDoes: {
            title: "O que FAZ",
            items: [
                "Valida dados de empresas em lote",
                "Identifica e sinaliza duplicidades",
                "Permite enriquecimento de registros"
            ]
        },
        whatItDoesNot: {
            title: "O que NÃO FAZ",
            items: [
                "Não altera dados originais sem confirmação",
                "Não apaga registros automaticamente",
                "Não substitui validações manuais necessárias"
            ]
        }
    },
    descobertas: [
        { title: "Validação Lenta", desc: "O processo anterior dependia de checagens linha a linha, reduzindo o ritmo da equipe." },
        { title: "Erros de Duplicidade", desc: "Falta de avisos prévios gerava sobreposição de registros idênticos no sistema." },
        { title: "Falta de Feedback", desc: "Usuários não sabiam o progresso real da importação até que ela fosse totalmente concluída." },
        { title: "Formatos Incompatíveis", desc: "Arquivos CSV com formatos fora do padrão travavam a rotina sem indicação clara de erro." }
    ],
    userFlowImages: [
        "/assets/projects/importacao-empresas/fluxo/1.webp",
        "/assets/projects/importacao-empresas/fluxo/2.webp",
        "/assets/projects/importacao-empresas/fluxo/3.webp",
        "/assets/projects/importacao-empresas/fluxo/4.webp"
    ],
    prototipo: {
        telas: [
            { titulo: "Tela Inicial", descricao: "Modernização mantendo o padrão visual da plataforma, com adição de histórico de ações para maior transparência, exibindo quem realizou cada importação e quando.", imagens: ["/assets/projects/importacao-empresas/prototipo/01-inicial.webp"] },
            { titulo: "Seleção do Arquivo", descricao: "Processo de importação reformulado para ocorrer em modal, concentrando a atenção do usuário e dividido em três etapas para um fluxo mais didático e guiado.", imagens: ["/assets/projects/importacao-empresas/prototipo/02-selecao.webp"] },
            { titulo: "Configurações", descricao: "Mapeamento automático das colunas com base nos títulos ou padrão dos dados, reduzindo erros e adicionando opção de sinalizar empresas já clientes.", imagens: ["/assets/projects/importacao-empresas/prototipo/03-configuracao.webp"] },
            { titulo: "Validação", descricao: "Totalizadores de linhas e erros permitindo visualizar quantidade de registros a serem importados, com pré-visualização das inconsistências.", imagens: ["/assets/projects/importacao-empresas/prototipo/04-validacao.webp"] },
            { titulo: "Flexibilidade", descricao: "Modal permite execução do processo a partir de outras telas como Empresas, facilitando a operação e aplicação de filtros por tag no mesmo contexto.", imagens: ["/assets/projects/importacao-empresas/prototipo/05-busca.webp"] }
        ]
    },
    handoff: {
        titulo: "Handoff & Componentização",
        descricao: "Estruturação completa no Figma enviada aos desenvolvedores com documentação detalhada.",
        bullets: [
            "Componentes: Biblioteca com estados de hover, active, disabled e loading",
            "Mapeamento: Matriz de erros possíveis para apoio no desenvolvimento backend",
            "Documentação: Guia de tokens de cor, espaçamentos e tipografia"
        ],
        imagem: "/assets/projects/importacao-empresas/handoff.webp"
    },
    resultados: [
        { title: "Redução de Erros", desc: "Alertas preventivos reduziram drasticamente a inserção de dados duplicados no banco." },
        { title: "Maior Eficiência", desc: "O fluxo otimizado reduziu pela metade o tempo gasto em rotinas de importação pesadas." },
        { title: "Satisfação dos Usuários", desc: "Feedback altamente positivo sobre a clareza dos feedbacks visuais e transparência do processo." },
        { title: "Ganho de Escala", desc: "A solução permitiu que lotes maiores de dados fossem processados sem instabilidade." }
    ],
    licoes: [
        { title: "Prevenção é Melhor que Correção", desc: "Notificar potenciais inconsistências antes de efetivar a importação evita limpezas complexas no banco posteriormente." },
        { title: "Clareza em Processos Assíncronos", desc: "Manter o usuário informado sobre o progresso em tempo real transforma a percepção de performance da aplicação." },
        { title: "Padrões Consolidados Reduzem Fricção", desc: "Seguir convenções de drag-and-drop e mapeamento conhecidas agilizou o aprendizado dos usuários." }
    ]
};

export function ImportacaoEmpresas() {
    const projectData = useProjectPageData('importacaoEmpresas', FALLBACK_DATA);
    const { isPortuguese } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const c = CHANNELS.find((chan) => chan.path === "/projeto/importacao-empresas") || CHANNELS[4];

    const roleIcons = [Search, Compass, Settings, PenTool];
    const discoveryIcons = [FileCheck, AlertTriangle, GitCompare, Columns];
    const resultIcons = [Gauge, ShieldCheck, Rocket, BadgeDollarSign];
    const lessonIcons = [Code, TrendingUp, BarChart3];

    const labels = {
        ...getProjectSectionLabels(isPortuguese),
        productVision: {
            ...getProjectSectionLabels(isPortuguese).vision,
            desc: isPortuguese
                ? "Registros da etapa de descoberta e definição das características do produto para evitar ambiguidades e manter o foco durante o desenvolvimento."
                : "Records from the discovery and definition stage of product characteristics to avoid ambiguity and maintain focus during development."
        },
        discoveries: {
            sublabel: isPortuguese ? "DESCOBERTAS" : "DISCOVERIES",
            title: isPortuguese ? "Principais Insights" : "Key Discoveries"
        },
        userFlow: {
            sublabel: isPortuguese ? "FLUXOS" : "FLOWS",
            title: isPortuguese ? "Fluxo de Usuários" : "User Flow",
            desc: isPortuguese
                ? "Nesta fase, transformei objetivos do usuário em um fluxo claro e contínuo, guiando cada etapa da experiência até a conclusão do processo de forma simples e intuitiva."
                : "In this phase, I transformed user objectives into a clear and continuous flow, guiding each step of the experience to process completion simply and intuitively."
        }
    };

    return (
        <ProjectLayout c={c} title={projectData.title}>
            <ProjectOverviewSection
                label="01"
                sublabel={labels.overview.sublabel}
                title={labels.overview.title}
                resumo={projectData.resumo}
                objetivo={projectData.objetivo}
                desafio={projectData.desafio}
            />

            <ProjectCardGridSection
                id="role"
                label="02"
                sublabel={labels.role.sublabel}
                title={labels.role.title}
                items={projectData.meuPapel}
                defaultIcons={roleIcons}
                layoutVariant="split"
            />

            <ProjectProcessSection
                id="research"
                label="03"
                sublabel={labels.research.sublabel}
                title={labels.research.title}
                items={projectData.processoPesquisa}
            />

            <ProjectProductVisionSection
                id="product-vision"
                label="04"
                sublabel={labels.productVision.sublabel}
                title={labels.productVision.title}
                description={labels.productVision.desc}
                data={projectData.productVision}
            />

            <ProjectImageCarouselSection
                id="previous-view"
                label="05"
                sublabel={isPortuguese ? "GALERIA" : "GALLERY"}
                title={isPortuguese ? "Visão Anterior" : "Previous View"}
                images={[
                    "/assets/projects/importacao-empresas/Descoberta-Definicao/visao-anterior/Empresas.webp",
                    "/assets/projects/importacao-empresas/Descoberta-Definicao/visao-anterior/Empresas-resultados.webp",
                    "/assets/projects/importacao-empresas/Descoberta-Definicao/visao-anterior/Importação.webp"
                ]}
            />

            <ProjectImageCarouselSection
                id="research-gallery"
                label="06"
                sublabel={isPortuguese ? "PESQUISA" : "RESEARCH"}
                title={isPortuguese ? "Matriz CSD & Benchmarking" : "CSD Matrix & Benchmarking"}
                images={[
                    "/assets/projects/importacao-empresas/Descoberta-Definicao/Pesquisa/Benchmarking-1.webp",
                    "/assets/projects/importacao-empresas/Descoberta-Definicao/Pesquisa/Benchmarking-2.webp",
                    "/assets/projects/importacao-empresas/Descoberta-Definicao/Pesquisa/Matriz CSD.webp"
                ]}
            />

            <ProjectCardGridSection
                id="discoveries"
                label="07"
                sublabel={labels.discoveries.sublabel}
                title={labels.discoveries.title}
                items={projectData.descobertas}
                defaultIcons={discoveryIcons}
                layoutVariant="grid"
            />

            <ProjectImageCarouselSection
                id="user-flow"
                label="08"
                sublabel={labels.userFlow.sublabel}
                title={labels.userFlow.title}
                description={labels.userFlow.desc}
                images={[
                    {
                        src: "/assets/projects/importacao-empresas/Descoberta-Definicao/Fluxo.webp",
                        alt: labels.userFlow.title,
                        zoomable: true
                    }
                ]}
                aspectRatio="auto"
                zoomable={true}
            />

            <ProjectPrototypeSection
                id="prototype"
                label="09"
                sublabel={labels.prototype.sublabel}
                title={labels.prototype.title}
                telas={projectData.prototipo.telas}
            />

            <ProjectHandoffSection
                id="handoff"
                label="10"
                sublabel={labels.handoff.sublabel}
                data={projectData.handoff}
            />

            <ProjectCardGridSection
                id="results"
                label="11"
                sublabel={labels.results.sublabel}
                title={labels.results.title}
                items={projectData.resultados}
                defaultIcons={resultIcons}
                layoutVariant="grid"
            />

            <ProjectCardGridSection
                id="lessons"
                label="12"
                sublabel={labels.lessons.sublabel}
                title={labels.lessons.title}
                items={projectData.licoes}
                defaultIcons={lessonIcons}
                layoutVariant="centered"
            />

            <AudioMiniPlayer />
        </ProjectLayout>
    );
}
