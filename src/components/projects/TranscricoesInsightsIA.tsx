import { useEffect } from 'react';
import {
    Search, LayoutGrid, Settings, CheckCircle2,
    Brain, Database, Share2, TrendingUp,
    Gauge, BadgeDollarSign, Rocket, ShieldCheck,
    Code, BarChart3
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
    ProjectPrototypeSection,
    ProjectHandoffSection,
    getProjectSectionLabels,
} from './shared';

const FALLBACK_DATA = {
    title: "Transcrições & Insights com IA",
    category: "Product Design",
    year: "2024",
    resumo: "Redesign do ecossistema de videoconferências focado na centralização de gravações, transcrições e insights de IA.<br />O projeto automatizou a documentação pós-reunião, eliminando trabalho manual e transformando uma ferramenta operacional em um ativo estratégico de vendas, validado por alta adoção espontânea.",
    objetivo: "Centralizar gravações, transcrições e insights de IA para eliminar a gestão manual e o ruído no compartilhamento de dados.<br />O foco foi transformar registros de reuniões em inteligência acionável para times de Vendas, Suporte e Produto, elevando a competitividade da ferramenta no mercado.",
    desafio: "Arquitetar a unificação de múltiplas fontes de dados (vídeo, ligações e transcrições) que eram dispostos em diferentes locais, integrando um volume denso de informações em um fluxo único e performático, reduzindo a carga cognitiva do usuário sem comprometer experiência de uso e viabilidade técnica.",
    meuPapel: [
        { title: "Discovery e Estratégia", desc: "Diagnóstico de fricções e benchmarking competitivo para definição de requisitos." },
        { title: "Arquitetura e Interação", desc: "Redesign da jornada para integrar vídeo e dados em um fluxo único." },
        { title: "Viabilidade Técnica", desc: "Alinhamento com engenharia para implementação dos recursos de IA." },
        { title: "Validação e Refino", desc: "Ajustes de usabilidade baseados em feedback qualitativo." },
    ],
    processoPesquisa: [
        { title: "Auditoria do Legado", desc: "Análise heurística da versão anterior para mapear fricções e dívidas de experiência." },
        { title: "Dados Internos", desc: "Cruzamento de chamados de Suporte e Vendas para validar dores reais e priorizar correções." },
        { title: "Benchmarking", desc: "Estudo de padrões de interação em players como Apollo, Fireflies, tl;dv e Bluedot." },
        { title: "Viabilidade Técnica", desc: "Validação precoce com engenharia para antecipar restrições e evitar retrabalho." },
    ],
    descobertas: [
        { title: "Acesso à Inteligência", desc: "Transformar um simples 'log de reunião' em um hub de conteúdo pesquisável (transcrição e IA), eliminando a necessidade de assistir ao vídeo completo." },
        { title: "Centralização da Verdade", desc: "Unificar calls internas e externas em uma visualização única, removendo a fricção de buscar registros dentro de pipelines." },
        { title: "Desbloqueio de Colaboração", desc: "Compartilhamento fácil para que a informação flua entre Vendas, Suporte e Produto sem barreiras manuais." },
        { title: "Estratégia de Viralização", desc: "Envio automático de resumos como alavanca de Product-Led Growth, estimulando a adoção espontânea." },
    ],
    prototipo: {
        telas: [
            { titulo: "Tela Inicial", descricao: "Interface construída sobre o Design System da Leads2b, assegurando consistência visual e reduzindo a curva de aprendizado.", imagens: ["/assets/projects/transcricoes-insights-ia/1.webp"] },
            { titulo: "Video & Transcrição", descricao: "Visualização imersiva com painel lateral de dados. A estrutura sincroniza a reprodução do vídeo com a transcrição e insights.", imagens: ["/assets/projects/transcricoes-insights-ia/1.webp"] },
            { titulo: "Smart Insights", descricao: "Interface unificada que integra o player de vídeo e os Smart Insights. O layout permite consumo simultâneo de comentários e análises.", imagens: ["/assets/projects/transcricoes-insights-ia/3.webp"] },
            { titulo: "Compartilhamento Ágil", descricao: "Fluxo de envio otimizado para inclusão rápida de múltiplos destinatários com poucos cliques.", imagens: ["/assets/projects/transcricoes-insights-ia/4.webp"] },
            { titulo: "Design = Conversão", descricao: "Utilização do padrão de Teaser (blur) para funcionalidades avançadas, estimulando o upgrade de plano.", imagens: ["/assets/projects/transcricoes-insights-ia/6.webp"] },
            { titulo: "Insights = Conversão", descricao: "Ferramenta de agendamento de atividades integrada à tela, reduzindo o time-to-action.", imagens: ["/assets/projects/transcricoes-insights-ia/7.webp"] },
            { titulo: "Experiência Cross-Media", descricao: "Aplicação do mesmo modelo visual para gravações de áudio, garantindo coerência cross-channel.", imagens: ["/assets/projects/transcricoes-insights-ia/8.webp"] },
            { titulo: "Email Viral de Aquisição", descricao: "E-mail de resumo como alavanca de PLG para gerar descoberta orgânica e novos cadastros.", imagens: ["/assets/projects/transcricoes-insights-ia/10.mp4"] }
        ]
    },
    handoff: {
        titulo: "Design Handoff",
        descricao: "Seguindo a técnica Shift-Left que preza pelo envolvimento da Engenharia desde a ideação, eliminamos o risco de prototipar soluções inviáveis e garantimos fluidez no desenvolvimento.",
        bullets: [
            "Navegação: Frames agrupados por funcionalidade lógica",
            "Consistência: Componentes locais isolados para facilitar manutenção",
            "Semântica: Sistema de anotações visuais e fluxogramas integrados"
        ],
        imagem: "/assets/projects/transcricoes-insights-ia/handoff.mp4"
    },
    resultados: [
        { title: "Eficiência Operacional", desc: "Centralização de assets em um único hub, eliminando organização manual de atas e liberando horas produtivas dos times." },
        { title: "Impacto Comercial", desc: "A nova interface elevou a percepção de valor do produto, sendo adotada pela equipe comercial como diferencial em demonstrações." },
        { title: "Growth e Adoção", desc: "O redirecionamento automático pós-reunião impulsionou a descoberta orgânica da feature sem custos adicionais de marketing." },
        { title: "Recuperação de Confiança", desc: "Usuários detratores da versão anterior tornaram-se promotores da nova funcionalidade." },
    ],
    licoes: [
        { title: "Shift-Left Dev", desc: "A validação técnica na fase de ideação provou-se vital para eliminar retrabalho." },
        { title: "Alavancas de Growth", desc: "Pequenas intervenções no fluxo pós-reunião geram mais adoção orgânica do que grandes funcionalidades isoladas." },
        { title: "Dados como Premissa", desc: "A definição de KPIs deve nascer junto com a concepção do produto para garantir mensuração contínua." },
    ]
};

export function TranscricoesInsightsIA() {
    const projectData = useProjectPageData('transcricoesIA', FALLBACK_DATA);
    const { isPortuguese } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const c = CHANNELS.find((chan) => chan.path === "/projeto/transcricoes-insights-ia") || CHANNELS[0];

    const roleIcons = [Search, LayoutGrid, Settings, CheckCircle2];
    const discoveryIcons = [Brain, Database, Share2, TrendingUp];
    const resultIcons = [Gauge, BadgeDollarSign, Rocket, ShieldCheck];
    const lessonIcons = [Code, TrendingUp, BarChart3];
    const labels = getProjectSectionLabels(isPortuguese);

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
                sublabel={labels.process.sublabel}
                title={labels.process.title}
                items={projectData.processoPesquisa}
            />

            <ProjectCardGridSection
                id="discoveries"
                label="04"
                sublabel={labels.vision.sublabel}
                title={labels.vision.title}
                items={projectData.descobertas}
                defaultIcons={discoveryIcons}
            />

            <ProjectPrototypeSection
                id="prototype"
                label="05"
                sublabel={labels.prototype.sublabel}
                title={labels.prototype.title}
                telas={projectData.prototipo.telas}
                defaultDeviceType="macbook"
            />

            <ProjectHandoffSection
                id="handoff"
                label="06"
                sublabel={labels.handoff.sublabel}
                data={projectData.handoff}
            />

            <ProjectCardGridSection
                id="results"
                label="07"
                sublabel={labels.results.sublabel}
                title={labels.results.title}
                items={projectData.resultados}
                defaultIcons={resultIcons}
                layoutVariant="grid"
            />

            <ProjectCardGridSection
                id="lessons"
                label="08"
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
