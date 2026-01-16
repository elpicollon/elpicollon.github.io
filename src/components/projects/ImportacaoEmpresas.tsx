import { motion, useScroll, useSpring, useTransform, useInView, useMotionTemplate } from 'motion/react';
import { useRef, useEffect, ReactNode, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Target, Zap, Users, CheckCircle2, Lightbulb, Search, Settings, Gauge, ShieldCheck, Layout, FileCheck, Layers, Compass, PenTool, GitCompare, AlertTriangle, Columns, Workflow } from 'lucide-react';
import { MinimalNav } from '../MinimalNav';
import { FooterNew } from '../FooterNew';
import { ScrollToTop } from '../ScrollToTop';
import { ParticleBackground } from '../ParticleBackground';
import { HeroParticleGrid } from '../HeroParticleGrid';
import { RealisticMacBook } from '../RealisticMacBook';
import { useContactModal } from '../../contexts/ContactModalContext';

// ============================================================================
// PROJECT DATA
// ============================================================================

const projectData = {
    title: "Importação de Empresas",
    category: "UX Design",
    year: "2024",

    resumo: <>Este projeto busca aprimorar a funcionalidade de "Sinalização de Empresas" dentro da plataforma Econodata, um trabalho realizado como parte de um teste técnico para Product Designer.<br />O objetivo central é otimizar a experiência do usuário, lidando com desafios significativos que impactavam diretamente a eficiência operacional. Abordei problemas como a perda de tempo com limpeza e validação manual de listas, dados duplicados ou desatualizados, e um processo de mapeamento de colunas CSV confuso e propenso a erros.</>,

    objetivo: <>Evoluir a plataforma melhorando a experiência do usuário na funcionalidade de "Sinalização de empresas", como parte de um teste técnico para Product Designer na Econodata.<br />A proposta visa uma rotina mais fluida e intuitiva, que não só atenda às necessidades dos usuários, mas também supere as limitações técnicas existentes, resultando em maior produtividade e precisão nos dados.</>,

    desafio: <>Melhorar a experiência do usuário na funcionalidade de Sinalização de Empresas, com foco em suprir dores recorrentes que impactam diretamente a eficiência do processo.<br />Os principais problemas identificados incluem: perda de tempo com limpeza e validação manual de listas, dados duplicados ou desatualizados que geram retrabalho, ausência de sinalização clara sobre empresas já clientes, e processo de mapeamento de colunas CSV confuso e propenso a erros.</>,

    meuPapel: [
        { title: "Levantamento de Problemas", desc: "Identificação das dores da funcionalidade atual através de análise heurística e testes na plataforma." },
        { title: "Benchmarking", desc: "Estudo de concorrentes e players de mercado para mapear boas práticas e oportunidades de melhoria." },
        { title: "Análise Técnica", desc: "Avaliação das limitações técnicas da rotina atual e propostas para superá-las." },
        { title: "Design da Solução", desc: "Proposição de nova rotina contemplando objetivos do negócio e solicitações dos usuários." },
    ],

    processoPesquisa: [
        { title: "Visão Anterior", desc: "Teste e documentação do produto atual para análise aprofundada da experiência existente e identificação de pontos de fricção." },
        { title: "Matriz CSD", desc: "Aplicação da ferramenta para identificar Certezas, Suposições e Dúvidas, assegurando visão unificada da equipe." },
        { title: "Benchmarking", desc: "Análise comparativa detalhada com concorrentes para mapear oportunidades de melhoria significativas." },
        { title: "Wireframes", desc: "Desenvolvimento de wireframes para validar a solução antes do protótipo de alta fidelidade." },
    ],

    descobertas: [
        { title: "Validação de Listas", desc: "Necessidade de detecção automática de duplicados e enriquecimento de dados com base em CNPJ, domínio ou e-mail." },
        { title: "Dados Inconsistentes", desc: "Pré-validação necessária antes da importação, mostrando dados incorretos e duplicados para ação do usuário." },
        { title: "Sinalização de Duplicados", desc: "Integração para marcar automaticamente empresas já abordadas ou clientes com tags e alertas visuais." },
        { title: "Mapeamento de Colunas", desc: "Preview automático com sugestão inteligente de colunas e validação visual antes da confirmação." },
    ],

    prototipo: {
        telas: [
            {
                titulo: "Tela Inicial",
                descricao: "Modernização mantendo o padrão visual da plataforma, com adição de histórico de ações para maior transparência, exibindo quem realizou cada importação e quando.",
                imagens: ["/assets/projects/importacao-empresas/1.png"]
            },
            {
                titulo: "Seleção do Arquivo",
                descricao: "Processo de importação reformulado para ocorrer em modal, concentrando a atenção do usuário e dividido em três etapas para um fluxo mais didático e guiado.",
                imagens: ["/assets/projects/importacao-empresas/2.png"]
            },
            {
                titulo: "Configurações",
                descricao: "Mapeamento automático das colunas com base nos títulos ou padrão dos dados, reduzindo erros e adicionando opção de sinalizar empresas já clientes.",
                imagens: ["/assets/projects/importacao-empresas/3.png"]
            },
            {
                titulo: "Validação",
                descricao: "Totalizadores de linhas e erros permitindo visualizar quantidade de registros a serem importados, com pré-visualização das inconsistências.",
                imagens: ["/assets/projects/importacao-empresas/4.png"]
            },
            {
                titulo: "Flexibilidade",
                descricao: "Modal permite execução do processo a partir de outras telas como Empresas, facilitando a operação e aplicação de filtros por tag no mesmo contexto.",
                imagens: ["/assets/projects/importacao-empresas/5.png"]
            }
        ]
    },

    handoff: {
        titulo: "Design Handoff",
        descricao: "O arquivo foi estruturado para garantir entendimento coeso e acessível a todos os perfis envolvidos. Dentro do Figma, as etapas foram divididas em páginas: Pesquisa, Benchmarking, Fluxo, Wireframes e Protótipo.",
        bullets: [
            "Organização: Frames agrupados em seções conforme suas funcionalidades",
            "Componentização: Elementos reutilizados organizados na lateral esquerda do arquivo",
            "Comunicação: Estrutura que contribui para eficiência entre equipes e minimiza dúvidas"
        ],
        imagem: "/assets/projects/importacao-empresas/handoff.png"
    },

    resultados: [
        { title: "Fluxo Otimizado", desc: "Modal de importação dividido em etapas claras, tornando o processo mais intuitivo e reduzindo a curva de aprendizado." },
        { title: "Redução de Erros", desc: "Mapeamento automático de colunas e validação prévia eliminam erros comuns no processo de importação." },
        { title: "Maior Transparência", desc: "Histórico de ações permite rastrear quem realizou cada importação e quando, aumentando a accountability." },
        { title: "Experiência Unificada", desc: "Possibilidade de executar importação a partir de diferentes contextos da plataforma sem perder o foco." },
    ],

    licoes: [
        { title: "Processo de UX", desc: "Com mais tempo, poderiam ser incluídas personas, jornadas de usuário e pesquisas diretas com usuários reais." },
        { title: "Métricas de Sucesso", desc: "Definir métricas claras como redução do tempo de tarefa, satisfação do usuário e diminuição da taxa de erros." },
        { title: "Validação com Usuários", desc: "Ideal seria disponibilizar o projeto para testes de usabilidade e obter feedback da equipe de produto." },
    ]
};

// ============================================================================
// SCROLL PROGRESS BAR
// ============================================================================

function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-700 to-indigo-500 origin-left z-50"
            style={{ scaleX }}
        />
    );
}

// ============================================================================
// ANIMATED COMPONENTS
// ============================================================================

// Big decorative number
function BigNumber({ number, className = "" }: { number: string; className?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.span
            ref={ref}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 0.06, scale: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`absolute font-bold text-[12rem] md:text-[18rem] lg:text-[24rem] text-slate-900 select-none pointer-events-none leading-none ${className}`}
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
            {number}
        </motion.span>
    );
}

// Animated text reveal
function RevealText({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            {children}
        </motion.div>
    );
}

// Staggered list
function StaggeredList({ items, renderItem }: { items: { title: string; desc: string }[]; renderItem: (item: { title: string; desc: string }, index: number) => ReactNode }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <div ref={ref} className="space-y-6">
            {items.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                >
                    {renderItem(item, index)}
                </motion.div>
            ))}
        </div>
    );
}

// Section wrapper - content-driven height
const ChapterSection = forwardRef<HTMLElement, { children: ReactNode; className?: string; id?: string; style?: React.CSSProperties }>(
    ({ children, className = "", id, style }, ref) => {
        return (
            <section
                ref={ref}
                id={id}
                className={`relative overflow-hidden py-section ${className}`}
                style={style}
            >
                {children}
            </section>
        );
    }
);
ChapterSection.displayName = 'ChapterSection';

// ============================================================================
// PAGE SECTIONS
// ============================================================================

// Hero Section
function HeroSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

    const mockupXRaw = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const mockupXSpring = useSpring(mockupXRaw, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const mockupX = useMotionTemplate`${mockupXSpring}%`;

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f2f4f7] z-50 isolate mobile-tiny-fix pt-24 lg:pt-0"
        >
            {/* Background with particle effect */}
            <div className="absolute inset-0 z-0">
                <ParticleBackground color="navy" />
                {/* Soft gradient for depth */}
                <div className="absolute inset-0 bg-gradient-radial from-indigo-700/5 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
                    {/* Left Content */}
                    <motion.div
                        style={{ y, opacity, scale }}
                        className="relative"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-start"
                        >
                            {/* Back Button */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="relative lg:absolute lg:top-0 lg:left-0 z-20 mb-2 lg:mb-0"
                            >
                                <Link
                                    to="/"
                                    className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-700 transition-colors group"
                                >
                                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                    <span className="text-sm font-medium uppercase tracking-wider">Voltar</span>
                                </Link>
                            </motion.div>

                            {/* Title */}
                            <div className="hero-title-container mt-0 lg:mt-24 mb-6 md:mb-10 overflow-hidden w-full">
                                <div className="flex flex-col gap-2">
                                    <h1 className="hero-title-mobile text-5xl sm:text-6xl md:text-8xl font-semibold text-[#0f172a] tracking-tight leading-[1.1]">
                                        Importação de
                                    </h1>
                                    <h1 className="hero-title-mobile text-5xl sm:text-6xl md:text-8xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#02376D] to-[#0458a8] tracking-tight leading-[1.1]">
                                        Empresas
                                    </h1>
                                </div>
                            </div>

                            {/* Tags */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="flex flex-wrap gap-4 items-center mb-16"
                            >
                                <div className="px-6 py-3 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm ring-1 ring-white/50">
                                    <span className="text-sm md:text-base font-medium text-slate-600">
                                        UX Design
                                    </span>
                                </div>
                                <div className="px-6 py-3 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm ring-1 ring-white/50">
                                    <span className="text-sm md:text-base font-medium text-slate-600">
                                        Product Design
                                    </span>
                                </div>
                                <div className="px-6 py-3 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm ring-1 ring-white/50">
                                    <span className="text-sm md:text-base font-medium text-slate-600">
                                        2024
                                    </span>
                                </div>
                            </motion.div>

                            {/* Scroll Indicator */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 1 }}
                                className="flex items-center gap-4"
                            >
                                <div className="scroll-indicator w-[30px] h-[48px] border-2 border-slate-400 rounded-full flex justify-center pt-2">
                                    <motion.div
                                        animate={{ y: [0, 12, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                        className="w-1.5 h-1.5 bg-slate-600 rounded-full"
                                    />
                                </div>
                                <span className="text-sm font-medium text-slate-500 tracking-widest uppercase">
                                    Scroll to explore
                                </span>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - MacBook Mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="hidden lg:flex items-center relative"
                        style={{ marginRight: '-15%', x: mockupX }}
                    >
                        <RealisticMacBook className="w-[110%] max-w-none">
                            <div className="w-full h-full bg-black overflow-hidden relative">
                                <img
                                    src="/assets/projects/importacao-empresas/cover.png"
                                    alt="Capa do Projeto: Importação de Empresas"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-indigo-700/10 mix-blend-overlay pointer-events-none" />
                            </div>
                        </RealisticMacBook>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// Overview Section
function OverviewSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <ChapterSection id="overview" className="bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative">
                <BigNumber number="01" className="-top-20 -left-10 md:-left-20" />

                <div className="relative z-10">
                    <div className="mb-16 md:mb-24">
                        <RevealText>
                            <span className="text-indigo-800 font-medium text-sm uppercase tracking-widest mb-4 block">
                                Visão Geral
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-6"
                                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                            >
                                O Projeto
                            </h2>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <div className="w-24 h-1 bg-gradient-to-r from-indigo-700 to-indigo-500 rounded-full" />
                        </RevealText>
                    </div>

                    <RevealText delay={0.3}>
                        <div className="mb-16 md:mb-20">
                            <p className="text-lg text-slate-600 leading-relaxed text-justify">
                                {projectData.resumo}
                            </p>
                        </div>
                    </RevealText>

                    <div ref={ref} className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        <motion.div
                            initial={{ opacity: 0, y: 60 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="group"
                        >
                            <div className="h-full p-8 md:p-10 rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-indigo-50/30 border border-indigo-200 hover:border-indigo-400 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-200/50">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-700 to-indigo-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-indigo-700/25">
                                    <Target className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                    Objetivo
                                </h3>
                                <div className="w-12 h-0.5 bg-gradient-to-r from-indigo-600 to-transparent rounded-full mb-6" />
                                <p className="text-slate-600 leading-relaxed text-base md:text-lg text-justify">
                                    {projectData.objetivo}
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 60 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="md:mt-12 group"
                        >
                            <div className="h-full p-8 md:p-10 rounded-3xl bg-gradient-to-br from-purple-50 via-white to-violet-50/30 border border-purple-100 hover:border-purple-200 transition-all duration-500 hover:shadow-xl hover:shadow-purple-100/50">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-purple-500/25">
                                    <Zap className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                    Desafio
                                </h3>
                                <div className="w-12 h-0.5 bg-gradient-to-r from-purple-400 to-transparent rounded-full mb-6" />
                                <p className="text-slate-600 leading-relaxed text-base md:text-lg text-justify">
                                    {projectData.desafio}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </ChapterSection>
    );
}

// Role Section
function RoleSection() {
    return (
        <ChapterSection id="role" className="bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative">
                <BigNumber number="02" className="-top-20 -right-10 md:-right-20" />

                <div className="relative z-10 grid lg:grid-cols-2 gap-16 lg:gap-24">
                    <div>
                        <RevealText>
                            <span className="text-indigo-800 font-medium text-sm uppercase tracking-widest mb-4 block">
                                Contribuição
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-8"
                                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                            >
                                Meu Papel
                            </h2>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <div className="w-24 h-1 bg-gradient-to-r from-indigo-700 to-indigo-500 rounded-full" />
                        </RevealText>
                    </div>

                    <div>
                        <StaggeredList
                            items={projectData.meuPapel}
                            renderItem={(item, index) => {
                                const icons = [Search, Compass, Settings, PenTool];
                                const IconComponent = icons[index] || Users;
                                return (
                                    <div className="flex gap-6 items-start group">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-indigo-200 flex items-center justify-center group-hover:bg-indigo-700 transition-colors">
                                            <IconComponent className="w-5 h-5 text-indigo-800 group-hover:text-white transition-colors" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-900 text-xl md:text-2xl mb-1">{item.title}</h3>
                                            <p className="text-base md:text-lg text-slate-600">{item.desc}</p>
                                        </div>
                                    </div>
                                );
                            }}
                        />
                    </div>
                </div>
            </div>
        </ChapterSection>
    );
}

// Research Section
function ResearchSection() {
    return (
        <ChapterSection id="research" className="bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative">
                <BigNumber number="03" className="-top-20 -left-10 md:-left-20" />

                <div className="relative z-10">
                    <div className="lg:max-w-xl mb-10">
                        <RevealText>
                            <span className="text-indigo-800 font-medium text-sm uppercase tracking-widest mb-4 block">
                                Pesquisa & Definição
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-6"
                                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                            >
                                Processo de Pesquisa
                            </h2>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <div className="w-24 h-1 bg-gradient-to-r from-indigo-700 to-indigo-500 rounded-full" />
                        </RevealText>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {projectData.processoPesquisa.map((item, index) => (
                            <RevealText key={index} delay={0.2 + index * 0.1}>
                                <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:border-indigo-500 transition-colors group">
                                    <div className="flex items-start gap-4">
                                        <span className="text-6xl font-bold text-slate-200 group-hover:text-indigo-400 transition-colors leading-none" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <div className="pt-2">
                                            <h3 className="font-semibold text-slate-900 text-xl md:text-2xl mb-2">{item.title}</h3>
                                            <p className="text-base md:text-lg text-slate-600">{item.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            </RevealText>
                        ))}
                    </div>
                </div>
            </div>
        </ChapterSection>
    );
}

// Discoveries Section
function DiscoveriesSection() {
    return (
        <ChapterSection id="discoveries" className="bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative">
                <BigNumber number="04" className="-top-20 -right-10 md:-right-20" />

                <div className="relative z-10">
                    <div className="text-center mb-10">
                        <RevealText>
                            <span className="text-indigo-800 font-medium text-sm uppercase tracking-widest mb-4 block">
                                Descobertas
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-6"
                                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                            >
                                Principais Insights
                            </h2>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <div className="w-24 h-1 bg-gradient-to-r from-indigo-700 to-indigo-500 rounded-full mx-auto" />
                        </RevealText>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {projectData.descobertas.map((item, index) => {
                            const icons = [FileCheck, AlertTriangle, GitCompare, Columns];
                            const IconComponent = icons[index] || Lightbulb;
                            return (
                                <RevealText key={index} delay={0.2 + index * 0.1}>
                                    <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-indigo-500 transition-all group h-full shadow-sm hover:shadow-md">
                                        <div className="flex items-center gap-3 mb-4">
                                            <IconComponent className="w-6 h-6 text-indigo-800" />
                                            <h3 className="font-semibold text-slate-900 text-xl md:text-2xl">{item.title}</h3>
                                        </div>
                                        <p className="text-base md:text-lg text-slate-600 leading-relaxed">{item.desc}</p>
                                    </div>
                                </RevealText>
                            );
                        })}
                    </div>
                </div>
            </div>
        </ChapterSection>
    );
}

// Prototype Section
function PrototypeSection() {
    const telas = projectData.prototipo.telas;

    return (
        <ChapterSection id="prototype" className="bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative">
                <BigNumber number="05" className="-top-20 -right-10 md:-right-20" />

                <div className="relative z-10">
                    <div className="lg:max-w-xl mb-16 md:mb-24">
                        <RevealText>
                            <span className="text-indigo-800 font-medium text-sm uppercase tracking-widest mb-4 block">
                                Protótipo
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-6"
                                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                            >
                                Interface do Projeto
                            </h2>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <div className="w-24 h-1 bg-gradient-to-r from-indigo-700 to-indigo-500 rounded-full" />
                        </RevealText>
                    </div>

                    <div className="space-y-24 md:space-y-32">
                        {telas.map((tela, index) => {
                            const isEven = index % 2 === 0;

                            return (
                                <RevealText key={index} delay={0.1}>
                                    <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center justify-center">
                                        <div className={`w-full md:w-[30%] flex-shrink-0 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                                            <div className="space-y-3 md:space-y-4">
                                                <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-indigo-700 to-indigo-800 text-white font-bold text-base md:text-lg shadow-lg shadow-indigo-700/25">
                                                    {String(index + 1).padStart(2, '0')}
                                                </div>
                                                <h3
                                                    className="text-xl md:text-3xl font-bold text-slate-900"
                                                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                                                >
                                                    {tela.titulo}
                                                </h3>
                                                <div className="w-10 md:w-12 h-0.5 bg-gradient-to-r from-indigo-600 to-transparent rounded-full" />
                                                <p className="text-sm md:text-lg text-slate-600 leading-relaxed">
                                                    {tela.descricao}
                                                </p>
                                            </div>
                                        </div>

                                        <div className={`w-full md:w-[70%] flex-shrink-0 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                                            <motion.div
                                                whileHover={{ scale: 1.02 }}
                                                transition={{ duration: 0.4, ease: "easeOut" }}
                                                className="group"
                                            >
                                                <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl shadow-slate-900/10 border border-slate-200 bg-white">
                                                    <img
                                                        src={tela.imagens[0]}
                                                        alt={tela.titulo}
                                                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                                                    />
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>
                                </RevealText>
                            );
                        })}
                    </div>
                </div>
            </div>
        </ChapterSection>
    );
}

// Handoff Section
function HandoffSection() {
    return (
        <ChapterSection id="handoff" className="bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative">
                <BigNumber number="06" className="-top-20 -right-10 md:-right-20" />

                <div className="relative z-10">
                    <div className="lg:max-w-xl mb-16 md:mb-24">
                        <RevealText>
                            <span className="text-indigo-800 font-medium text-sm uppercase tracking-widest mb-4 block">
                                Handoff
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-6"
                                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                            >
                                {projectData.handoff.titulo}
                            </h2>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <div className="w-24 h-1 bg-gradient-to-r from-indigo-700 to-indigo-500 rounded-full" />
                        </RevealText>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-stretch">
                        <div className="w-full md:w-[35%] flex-shrink-0">
                            <RevealText delay={0.3}>
                                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                                    {projectData.handoff.descricao}
                                </p>
                                <ul className="space-y-3">
                                    {projectData.handoff.bullets.map((bullet, index) => {
                                        const [title, ...rest] = bullet.split(': ');
                                        const description = rest.join(': ');
                                        return (
                                            <li key={index} className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-indigo-700 flex-shrink-0 mt-0.5" />
                                                <span className="text-base text-slate-600">
                                                    <strong className="font-semibold text-slate-700">{title}:</strong> {description}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </RevealText>
                        </div>

                        <div className="w-full md:w-[65%] flex-shrink-0">
                            <RevealText delay={0.4}>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="group"
                                >
                                    <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl shadow-slate-900/10 border border-slate-200 bg-white">
                                        <img
                                            src={projectData.handoff.imagem}
                                            alt={projectData.handoff.titulo}
                                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                                        />
                                    </div>
                                </motion.div>
                            </RevealText>
                        </div>
                    </div>
                </div>
            </div>
        </ChapterSection>
    );
}

// Results Section
function ResultsSection() {
    return (
        <ChapterSection id="results" className="bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative">
                <BigNumber number="07" className="-top-20 -right-10 md:-right-20" />

                <div className="relative z-10">
                    <div className="lg:max-w-xl mb-10">
                        <RevealText>
                            <span className="text-emerald-600 font-medium text-sm uppercase tracking-widest mb-4 block">
                                Resultados
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-6"
                                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                            >
                                Impacto do Projeto
                            </h2>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full" />
                        </RevealText>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {projectData.resultados.map((item, index) => {
                            const icons = [Workflow, ShieldCheck, Layers, Layout];
                            const IconComponent = icons[index] || CheckCircle2;
                            return (
                                <RevealText key={index} delay={0.2 + index * 0.1}>
                                    <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:border-emerald-300 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-white transition-all group h-full">
                                        <div className="flex items-center gap-3 mb-4">
                                            <IconComponent className="w-6 h-6 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                                            <h3 className="font-semibold text-slate-900 text-xl md:text-2xl">{item.title}</h3>
                                        </div>
                                        <p className="text-base md:text-lg text-slate-600 leading-relaxed">{item.desc}</p>
                                    </div>
                                </RevealText>
                            );
                        })}
                    </div>
                </div>
            </div>
        </ChapterSection>
    );
}

// Lessons Section
function LessonsSection() {
    return (
        <ChapterSection id="lessons" className="bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative">
                <BigNumber number="08" className="-top-20 -left-10 md:-left-20" />

                <div className="relative z-10">
                    <div className="text-center mb-10">
                        <RevealText>
                            <span className="text-purple-600 font-medium text-sm uppercase tracking-widest mb-4 block">
                                Análise Crítica
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-6"
                                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                            >
                                Lições & Aprendizados
                            </h2>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-purple-300 rounded-full mx-auto" />
                        </RevealText>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {projectData.licoes.map((item, index) => {
                            const icons = [Compass, Gauge, Users];
                            const IconComponent = icons[index] || Sparkles;
                            return (
                                <RevealText key={index} delay={0.2 + index * 0.1}>
                                    <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-purple-300 transition-colors group text-center h-full">
                                        <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-500 transition-colors">
                                            <IconComponent className="w-7 h-7 text-purple-600 group-hover:text-white transition-colors" />
                                        </div>
                                        <h3 className="font-semibold text-slate-900 text-xl md:text-2xl mb-3">{item.title}</h3>
                                        <p className="text-base md:text-lg text-slate-600">{item.desc}</p>
                                    </div>
                                </RevealText>
                            );
                        })}
                    </div>
                </div>
            </div>
        </ChapterSection>
    );
}

// CTA Section
function CTASection() {
    const { openModal } = useContactModal();

    return (
        <section className="py-32 px-6 md:px-12 bg-[#f8fafc] relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 z-0">
                <HeroParticleGrid />
                <div className="absolute inset-0 bg-gradient-radial from-violet-500/5 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center gap-8"
                >
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            Vamos criar algo incrível juntos?
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Se você gostou deste projeto e quer discutir como posso ajudar sua equipe, entre em contato!
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-4 mt-4">
                        <motion.button
                            onClick={openModal}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-purple-600 text-white rounded-full hover:bg-purple-500 transition-all font-medium shadow-lg shadow-purple-300/50 whitespace-nowrap cursor-pointer"
                        >
                            Entre em Contato
                        </motion.button>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                to="/"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-purple-600 hover:text-purple-700 font-medium whitespace-nowrap"
                            >
                                <ArrowLeft size={18} />
                                Voltar
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function ImportacaoEmpresas() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white">
            <ScrollProgress />
            <MinimalNav />

            <main>
                <HeroSection />
                <OverviewSection />
                <RoleSection />
                <ResearchSection />
                <DiscoveriesSection />
                <PrototypeSection />
                <HandoffSection />
                <ResultsSection />
                <LessonsSection />
                <CTASection />
            </main>

            <FooterNew />
            <ScrollToTop />
        </div>
    );
}
