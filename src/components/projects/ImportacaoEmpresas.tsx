import { motion, useScroll, useSpring, useTransform, useInView, useMotionTemplate, AnimatePresence, useMotionValue } from 'motion/react';
import { useRef, useEffect, useState, ReactNode, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Target, Zap, Users, CheckCircle2, Lightbulb, Search, Settings, Gauge, ShieldCheck, Layout, FileCheck, Layers, Compass, PenTool, GitCompare, AlertTriangle, Columns, Workflow } from 'lucide-react';
import { MinimalNav } from '../MinimalNav';
import { FooterNew } from '../FooterNew';
import { ScrollToTop } from '../ScrollToTop';
import { ParticleBackground } from '../ParticleBackground';
import { RealisticMacBook } from '../RealisticMacBook';
import { ProjectCTAFooter } from './ProjectCTAFooter';
import { AudioMiniPlayer } from '../AudioMiniPlayer';
import { ScrollIndicator } from '../ui/ScrollIndicator';
import { useLanguage } from '../../contexts/LanguageContext';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

// ============================================================================
// PROJECT DATA - using translations
// ============================================================================

function useProjectData() {
    const { translations } = useLanguage();
    const p = translations.projects?.importacaoEmpresas;

    if (!p) {
        // Fallback to PT-BR hardcoded data
        return {
            title: "Importação de Empresas",
            category: "UX Design",
            year: "2025",
            resumo: <>Este projeto busca aprimorar a funcionalidade de "Sinalização de Empresas" dentro da plataforma Econodata.<br />O objetivo central é otimizar a experiência do usuário, lidando com desafios significativos que impactavam diretamente a eficiência operacional.</>,
            objetivo: <>Evoluir a plataforma melhorando a experiência do usuário na funcionalidade de "Sinalização de empresas", como parte de um teste técnico para Product Designer na Econodata.</>,
            desafio: <>Melhorar a experiência do usuário na funcionalidade de Sinalização de Empresas, com foco em suprir dores recorrentes que impactam diretamente a eficiência do processo.</>,
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
                        "Uma ferramenta de prospecção fria",
                        "Um software de gestão financeira"
                    ]
                },
                whatItDoes: {
                    title: "O que FAZ",
                    items: [
                        "Detecta e remove duplicatas automaticamente",
                        "Valida dados antes da importação final",
                        "Permite mapeamento inteligente de colunas"
                    ]
                },
                whatItDoesNot: {
                    title: "O que NÃO FAZ",
                    items: [
                        "Não realiza vendas diretas",
                        "Não substitui a equipe comercial",
                        "Não gerencia contratos"
                    ]
                }
            },
            descobertas: [
                { title: "Validação de Listas", desc: "Necessidade de detecção automática de duplicados." },
                { title: "Dados Inconsistentes", desc: "Pré-validação necessária antes da importação." },
                { title: "Sinalização de Duplicados", desc: "Integração para marcar automaticamente empresas já abordadas." },
                { title: "Mapeamento de Colunas", desc: "Preview automático com sugestão inteligente de colunas." },
            ],
            prototipo: {
                telas: [
                    { titulo: "Tela Inicial", descricao: "Modernização mantendo o padrão visual da plataforma.", imagens: ["/assets/projects/importacao-empresas/1.png"] },
                    { titulo: "Seleção do Arquivo", descricao: "Processo de importação reformulado para ocorrer em modal.", imagens: ["/assets/projects/importacao-empresas/2.png"] },
                    { titulo: "Configurações", descricao: "Mapeamento automático das colunas com base nos títulos.", imagens: ["/assets/projects/importacao-empresas/3.png"] },
                    { titulo: "Validação", descricao: "Totalizadores de linhas e erros.", imagens: ["/assets/projects/importacao-empresas/4.png"] },
                    { titulo: "Flexibilidade", descricao: "Modal permite execução do processo a partir de outras telas.", imagens: ["/assets/projects/importacao-empresas/5.png"] }
                ]
            },
            handoff: {
                titulo: "Design Handoff",
                descricao: "O arquivo foi estruturado para garantir entendimento coeso e acessível a todos os perfis envolvidos.",
                bullets: [
                    "Organização: Frames agrupados em seções conforme suas funcionalidades",
                    "Componentização: Elementos reutilizados organizados na lateral esquerda",
                    "Comunicação: Estrutura que contribui para eficiência entre equipes"
                ],
                imagem: "/assets/projects/importacao-empresas/handoff.png"
            },
            resultados: [
                { title: "Fluxo Otimizado", desc: "Modal de importação dividido em etapas claras." },
                { title: "Redução de Erros", desc: "Mapeamento automático de colunas e validação prévia." },
                { title: "Maior Transparência", desc: "Histórico de ações permite rastrear cada importação." },
                { title: "Experiência Unificada", desc: "Possibilidade de executar importação a partir de diferentes contextos." },
            ],
            licoes: [
                { title: "Processo de UX", desc: "Com mais tempo, poderiam ser incluídas personas e jornadas de usuário." },
                { title: "Métricas de Sucesso", desc: "Definir métricas claras como redução do tempo de tarefa." },
                { title: "Validação com Usuários", desc: "Ideal seria disponibilizar o projeto para testes de usabilidade." },
            ],
            ui: {
                backButton: "Voltar",
                heroTitle: { line1: "Importação de", line2: "Empresas" },
                heroTags: ["2025", "Product Design", "Teste Técnico"],
                tags: { ux: "UX Design", product: "Product Design", year: "2025" },
                sections: {
                    overview: { label: "Visão Geral", title: "O Projeto", objetivo: "Objetivo", desafio: "Desafio" },
                    role: { label: "Contribuição", title: "Meu Papel" },
                    research: { label: "Pesquisa & Definição", title: "Processo de Pesquisa" },
                    productVision: {
                        label: "Descoberta & Definição",
                        title: "Visão de Produto",
                        desc: "Registros da etapa de descoberta e definição das características do produto para evitar ambiguidades e manter o foco durante o desenvolvimento."
                    },
                    discoveries: { label: "Descobertas", title: "Principais Insights" },
                    userFlow: { label: "Fluxos", title: "Fluxo de Usuários", description: "Nesta fase, transformei objetivos do usuário em um fluxo claro e contínuo, guiando cada etapa da experiência até a conclusão do processo de forma simples e intuitiva." },
                    prototype: { label: "Protótipo", title: "Interface do Projeto" },
                    handoff: { label: "Handoff" },
                    results: { label: "Resultados", title: "Impacto do Projeto" },
                    lessons: { label: "Análise Crítica", title: "Insights e Reflexões" }
                }
            }
        };
    }

    // Return translated data
    return {
        title: p.title,
        category: p.category,
        year: p.year,
        resumo: <span dangerouslySetInnerHTML={{ __html: p.resumo }} />,
        objetivo: <span dangerouslySetInnerHTML={{ __html: p.objetivo }} />,
        desafio: <span dangerouslySetInnerHTML={{ __html: p.desafio }} />,
        meuPapel: p.meuPapel,
        processoPesquisa: p.processoPesquisa,
        descobertas: p.descobertas,
        prototipo: {
            telas: p.prototipo.telas.map((t: { titulo: string; descricao: string }, i: number) => {
                const filenames = [
                    "01-inicial.png",
                    "02-selecao.png",
                    "03-configuracao.png",
                    "04-validacao.png",
                    "05-busca.png"
                ];
                return {
                    titulo: t.titulo,
                    descricao: t.descricao,
                    imagens: [`/assets/projects/importacao-empresas/prototipo/${filenames[i]}`]
                };
            })
        },
        handoff: {
            titulo: p.handoff.titulo,
            descricao: p.handoff.descricao,
            bullets: p.handoff.bullets,
            imagem: "/assets/projects/importacao-empresas/handoff.png"
        },
        resultados: p.resultados,
        licoes: p.licoes,
        ui: p.ui,
        productVision: p.productVision
    };
}

// Legacy static data reference (for sections that need it)
let projectData: ReturnType<typeof useProjectData>;

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
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0B73D9] to-[#0B73D9]/70 origin-left z-50"
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

// Zoomable Image Component with Pan effect
function ZoomableImage({ src, alt }: { src: string; alt: string }) {
    const x = useMotionValue(50);
    const y = useMotionValue(50);
    const transformOrigin = useMotionTemplate`${x}% ${y}%`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const xPos = ((e.clientX - rect.left) / rect.width) * 100;
        const yPos = ((e.clientY - rect.top) / rect.height) * 100;
        x.set(xPos);
        y.set(yPos);
    };

    return (
        <motion.div
            className="overflow-hidden relative w-full rounded-3xl border border-slate-200 shadow-sm bg-white hover:border-[#0B73D9] transition-colors group cursor-zoom-in"
            onMouseMove={handleMouseMove}
        >
            <div className="p-2 md:p-4 bg-white">
                <motion.img
                    src={src}
                    alt={alt}
                    className="w-full h-auto object-contain"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 2 }}
                    style={{
                        transformOrigin
                    }}
                    transition={{ type: 'tween', duration: 0.2 }}
                />
            </div>
        </motion.div>
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
            {/* Geometric Gradient Background - matches home page */}
            <AnimatePresence mode="wait">
                <motion.div
                    key="importacao-gradient"
                    className="hero-gradient-bg"
                    initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
                    animate={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 0% 100%)' }}
                    exit={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 0% 100%)' }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    style={{
                        background: `linear-gradient(135deg, #005C7F 0%, #00A5E5 100%)`,
                    }}
                >
                    {/* Inner shadow overlay - inside the animated container */}
                    <div className="hero-diagonal-shadow" />
                </motion.div>
            </AnimatePresence>

            {/* Background with particle effect */}
            <div className="absolute inset-0 z-0">
                <ParticleBackground color={[{ r: 11, g: 115, b: 217 }, { r: 5, g: 80, b: 160 }, { r: 30, g: 140, b: 240 }]} />
                {/* Soft gradient for depth */}
                <div className="absolute inset-0 bg-gradient-radial from-[#0B73D9]/5 via-transparent to-transparent pointer-events-none" />
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
                                    className="inline-flex items-center gap-2 text-slate-500 hover:text-[#0B73D9] transition-colors group"
                                >
                                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                    <span className="text-sm font-medium uppercase tracking-wider">{projectData.ui.backButton}</span>
                                </Link>
                            </motion.div>

                            {/* Title */}
                            <div className="hero-title-container mt-0 lg:mt-24 mb-6 md:mb-10 overflow-hidden w-full">
                                <h1 className="flex flex-col gap-2">
                                    <span className="hero-title-mobile text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1]">
                                        {projectData.ui.heroTitle.line1}
                                    </span>
                                    <span className="hero-title-mobile text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1]">
                                        {projectData.ui.heroTitle.line2}
                                    </span>
                                </h1>
                            </div>

                            {/* Tags */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="flex flex-wrap gap-4 items-center mb-6 md:mb-16"
                            >
                                {projectData.ui.heroTags?.map((tag: string, index: number) => (
                                    <div key={index} className="px-6 py-3 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm ring-1 ring-white/50">
                                        <span className="text-sm md:text-base font-medium text-slate-600">
                                            {tag}
                                        </span>
                                    </div>
                                ))}
                            </motion.div>


                        </motion.div>

                        {/* Mobile Scroll Indicator - Below Tags */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="flex md:hidden mt-4"
                        >
                            <ScrollIndicator className="items-start" />
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
                                    src="/assets/projects/importacao-empresas/home.png"
                                    alt="Capa do Projeto: Importação de Empresas"
                                    className="w-full h-full object-cover"
                                    loading="eager"
                                />
                                <div className="absolute inset-0 bg-[#0B73D9]/10 mix-blend-overlay pointer-events-none" />
                            </div>
                        </RealisticMacBook>
                    </motion.div>
                </div>
            </div>
            {/* Scroll Indicator - Absolute positioned at bottom center */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
            >
                <div className="w-[26px] h-[42px] border-2 border-slate-400 rounded-full flex justify-center pt-2">
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-1 h-1 bg-slate-500 rounded-full"
                    />
                </div>
            </motion.div>
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
                            <span className="text-[#0B73D9] font-medium text-sm uppercase tracking-widest mb-4 block">
                                {projectData.ui.sections.overview.label}
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2
                                className="text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1] mb-6"
                            >
                                {projectData.ui.sections.overview.title}
                            </h2>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <div className="w-24 h-1 bg-gradient-to-r from-[#0B73D9] to-[#0B73D9]/60 rounded-full" />
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
                            <div className="h-full p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[#0B73D9]/5 via-white to-[#0B73D9]/10 border border-[#0B73D9]/20 hover:border-[#0B73D9]/40 transition-all duration-500 hover:shadow-xl hover:shadow-[#0B73D9]/20">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0B73D9] to-[#054a8c] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-[#0B73D9]/25">
                                    <Target className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                    {projectData.ui.sections.overview.objetivo}
                                </h3>
                                <div className="w-12 h-0.5 bg-gradient-to-r from-[#0B73D9] to-transparent rounded-full mb-6" />
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
                            <div className="h-full p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[#0B73D9]/5 via-white to-[#0B73D9]/10 border border-[#0B73D9]/20 hover:border-[#0B73D9]/40 transition-all duration-500 hover:shadow-xl hover:shadow-[#0B73D9]/20">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0B73D9] to-[#054a8c] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-[#0B73D9]/25">
                                    <Zap className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                    {projectData.ui.sections.overview.desafio}
                                </h3>
                                <div className="w-12 h-0.5 bg-gradient-to-r from-[#0B73D9] to-transparent rounded-full mb-6" />
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
                            <span className="text-[#0B73D9] font-medium text-sm uppercase tracking-widest mb-4 block">
                                {projectData.ui.sections.role.label}
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2
                                className="text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1] mb-8"
                            >
                                {projectData.ui.sections.role.title}
                            </h2>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <div className="w-24 h-1 bg-gradient-to-r from-[#0B73D9] to-[#0B73D9]/60 rounded-full" />
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
                                        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#0B73D9]/20 flex items-center justify-center group-hover:bg-[#0B73D9] transition-colors">
                                            <IconComponent className="w-5 h-5 text-[#0B73D9] group-hover:text-white transition-colors" />
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
                            <span className="text-[#0B73D9] font-medium text-sm uppercase tracking-widest mb-4 block">
                                {projectData.ui.sections.research.label}
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2
                                className="text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1] mb-6"
                            >
                                {projectData.ui.sections.research.title}
                            </h2>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <div className="w-24 h-1 bg-gradient-to-r from-[#0B73D9] to-[#0B73D9]/60 rounded-full" />
                        </RevealText>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {projectData.processoPesquisa.map((item, index) => (
                            <RevealText key={index} delay={0.2 + index * 0.1}>
                                <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:border-[#0B73D9] transition-colors group">
                                    <div className="flex items-start gap-4">
                                        <span className="text-6xl font-bold text-slate-200 group-hover:text-[#0B73D9]/50 transition-colors leading-none" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
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

// Helper Component for Carousels
function ImageCarousel({ images, title }: { images: string[]; title: string }) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <div className="mb-24 last:mb-0">
            <RevealText delay={0.4}>
                <div className="flex items-center justify-center gap-6 mb-10 md:mb-14 opacity-90">
                    <div className="w-12 h-1 rounded-full bg-gradient-to-r from-transparent to-[#0B73D9]/50" />
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        {title}
                    </h3>
                    <div className="w-12 h-1 rounded-full bg-gradient-to-l from-transparent to-[#0B73D9]/50" />
                </div>
            </RevealText>

            <div className="relative">
                <RevealText delay={0.6}>
                    <Carousel
                        setApi={setApi}
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        plugins={[
                            Autoplay({
                                delay: 4000,
                            }),
                        ]}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4">
                            {images.map((img, index) => (
                                <CarouselItem key={index} className="pl-4 basis-full">
                                    <div className="p-1">
                                        <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50 aspect-video bg-white relative group flex items-center justify-center">
                                            <img
                                                src={img}
                                                alt={`${title} Image ${index + 1}`}
                                                className={`w-full h-full object-contain transition-transform duration-500 group-hover:scale-105`}
                                            />
                                            <div className="absolute inset-0 bg-[#0B73D9]/0 group-hover:bg-[#0B73D9]/10 transition-colors duration-300" />
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="hidden md:block">
                            <CarouselPrevious />
                            <CarouselNext />
                        </div>
                    </Carousel>

                    {/* Pagination Dots (Mobile Only) */}
                    <div className="flex justify-center gap-2 mt-6 md:hidden">
                        {Array.from({ length: count }).map((_, index) => (
                            <div
                                key={index}
                                className={`h-2 rounded-full transition-all duration-300 ${index + 1 === current ? "bg-[#0B73D9] w-6" : "bg-slate-300 w-2"
                                    }`}
                            />
                        ))}
                    </div>
                </RevealText>
            </div>
        </div>
    );
}

// Product Vision Section (Visão de Produto)
function ProductVisionSection() {
    return (
        <ChapterSection id="product-vision" className="bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative">
                <BigNumber number="04" className="-top-20 -left-10 md:-left-20" />

                <div className="relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-12 md:mb-16">
                        <RevealText>
                            <span className="text-[#0B73D9] font-medium text-sm uppercase tracking-widest mb-4 block">
                                {projectData.ui.sections.productVision.label}
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2
                                className="text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1] mb-6"
                            >
                                {projectData.ui.sections.productVision.title}
                            </h2>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <div className="w-24 h-1 bg-gradient-to-r from-[#0B73D9] to-[#0B73D9]/60 rounded-full mx-auto mb-6" />
                        </RevealText>
                        <RevealText delay={0.3}>
                            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                                {projectData.ui.sections.productVision.desc}
                            </p>
                        </RevealText>
                    </div>

                    {/* Image Carousels */}
                    <div className="mt-16 md:mt-24">
                        <ImageCarousel
                            title={(projectData.ui.sections.productVision as any).carousels?.previousView || "Visão Anterior"}
                            images={[
                                "/assets/projects/importacao-empresas/Descoberta-Definicao/visao-anterior/Empresas.png",
                                "/assets/projects/importacao-empresas/Descoberta-Definicao/visao-anterior/Empresas-resultados.png",
                                "/assets/projects/importacao-empresas/Descoberta-Definicao/visao-anterior/Importação.png"
                            ]}
                        />

                        <ImageCarousel
                            title={(projectData.ui.sections.productVision as any).carousels?.research || "Matriz CSD & Benchmarking"}
                            images={[
                                "/assets/projects/importacao-empresas/Descoberta-Definicao/Pesquisa/Benchmarking-1.png",
                                "/assets/projects/importacao-empresas/Descoberta-Definicao/Pesquisa/Benchmarking-2.png",
                                "/assets/projects/importacao-empresas/Descoberta-Definicao/Pesquisa/Matriz CSD.png"
                            ]}
                        />
                    </div>
                    {/* Principais Insights (Moved from Discoveries) */}
                    <div className="mt-24 md:mt-32">
                        <RevealText delay={0.2}>
                            <div className="flex items-center justify-center gap-6 mb-10 md:mb-14 opacity-90">
                                <div className="w-12 h-1 rounded-full bg-gradient-to-r from-transparent to-[#0B73D9]/50" />
                                <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                    {projectData.ui.sections.discoveries.title}
                                </h3>
                                <div className="w-12 h-1 rounded-full bg-gradient-to-l from-transparent to-[#0B73D9]/50" />
                            </div>
                        </RevealText>

                        <div className="grid md:grid-cols-2 gap-6">
                            {projectData.descobertas.map((item, index) => {
                                const icons = [FileCheck, AlertTriangle, GitCompare, Columns];
                                const IconComponent = icons[index] || Lightbulb;
                                return (
                                    <RevealText key={index} delay={0.2 + index * 0.1}>
                                        <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-[#0B73D9] transition-all group h-full shadow-sm hover:shadow-md">
                                            <div className="flex items-center gap-3 mb-4">
                                                <IconComponent className="w-6 h-6 text-[#0B73D9]" />
                                                <h3 className="font-semibold text-slate-900 text-xl md:text-2xl">{item.title}</h3>
                                            </div>
                                            <p className="text-base md:text-lg text-slate-600 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </RevealText>
                                );
                            })}
                        </div>
                    </div>

                    {/* Fluxo de Usuários (New Subsection) */}
                    <div className="mt-24 md:mt-32">
                        <RevealText delay={0.2}>
                            <div className="flex items-center justify-center gap-6 mb-10 md:mb-14 opacity-90">
                                <div className="w-12 h-1 rounded-full bg-gradient-to-r from-transparent to-[#0B73D9]/50" />
                                <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                    {(projectData.ui.sections as any).userFlow?.title || "Fluxo de Usuários"}
                                </h3>
                                <div className="w-12 h-1 rounded-full bg-gradient-to-l from-transparent to-[#0B73D9]/50" />
                            </div>
                        </RevealText>
                        <RevealText delay={0.3}>
                            {(projectData.ui.sections as any).userFlow?.description && (
                                <p className="text-lg text-slate-600 leading-relaxed text-justify md:text-center max-w-3xl mx-auto mb-12">
                                    {(projectData.ui.sections as any).userFlow.description}
                                </p>
                            )}
                        </RevealText>

                        <div className="relative">
                            <RevealText delay={0.2}>
                                <ZoomableImage
                                    src="/assets/projects/importacao-empresas/Descoberta-Definicao/Fluxo.png"
                                    alt="Fluxo de Usuários"
                                />
                            </RevealText>
                        </div>
                    </div>
                </div>

            </div>
        </ChapterSection >
    );
}

// Discoveries Section


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
                            <span className="text-[#0B73D9] font-medium text-sm uppercase tracking-widest mb-4 block">
                                {projectData.ui.sections.prototype.label}
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2
                                className="text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1] mb-6"
                            >
                                {projectData.ui.sections.prototype.title}
                            </h2>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <div className="w-24 h-1 bg-gradient-to-r from-[#0B73D9] to-[#0B73D9]/60 rounded-full" />
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
                                                <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#0B73D9] to-[#054a8c] text-white font-bold text-base md:text-lg shadow-lg shadow-[#0B73D9]/25">
                                                    {String(index + 1).padStart(2, '0')}
                                                </div>
                                                <h3
                                                    className="text-xl md:text-3xl font-bold text-slate-900"
                                                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                                                >
                                                    {tela.titulo}
                                                </h3>
                                                <div className="w-10 md:w-12 h-0.5 bg-gradient-to-r from-[#0B73D9] to-transparent rounded-full" />
                                                <p className="text-sm md:text-lg text-slate-600 leading-relaxed">
                                                    {tela.descricao}
                                                </p>
                                            </div>
                                        </div>

                                        <div className={`w-full md:w-[70%] flex-shrink-0 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                                            <div className="relative group p-4 md:p-8">
                                                {/* Background Glow */}
                                                <div className="absolute inset-0 bg-[#0B73D9]/5 rounded-[3rem] -z-10 blur-3xl group-hover:bg-[#0B73D9]/10 transition-colors duration-500" />

                                                <RealisticMacBook>
                                                    <img
                                                        src={tela.imagens[0]}
                                                        alt={tela.titulo}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </RealisticMacBook>
                                            </div>
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
                            <span className="text-[#0B73D9] font-medium text-sm uppercase tracking-widest mb-4 block">
                                {projectData.ui.sections.handoff.label}
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2
                                className="text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1] mb-6"
                            >
                                {projectData.handoff.titulo}
                            </h2>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <div className="w-24 h-1 bg-gradient-to-r from-[#0B73D9] to-[#0B73D9]/60 rounded-full" />
                        </RevealText>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                        <div className="w-full md:w-[45%] flex-shrink-0">
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
                                                <CheckCircle2 className="w-5 h-5 text-[#0B73D9] flex-shrink-0 mt-0.5" />
                                                <span className="text-base text-slate-600">
                                                    <strong className="font-semibold text-slate-700">{title}:</strong> {description}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </RevealText>
                        </div>

                        <div className="w-full md:w-[55%] flex-shrink-0">
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
                                            loading="lazy"
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
                            <span className="text-[#0B73D9] font-medium text-sm uppercase tracking-widest mb-4 block">
                                {projectData.ui.sections.results.label}
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2
                                className="text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1] mb-6"
                            >
                                {projectData.ui.sections.results.title}
                            </h2>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <div className="w-24 h-1 bg-gradient-to-r from-[#0B73D9] to-[#0B73D9]/60 rounded-full" />
                        </RevealText>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {projectData.resultados.map((item, index) => {
                            const icons = [Workflow, ShieldCheck, Layers, Layout];
                            const IconComponent = icons[index] || CheckCircle2;
                            return (
                                <RevealText key={index} delay={0.2 + index * 0.1}>
                                    <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:border-[#0B73D9]/60 hover:bg-gradient-to-br hover:from-[#0B73D9]/5 hover:to-white transition-all group h-full">
                                        <div className="flex items-center gap-3 mb-4">
                                            <IconComponent className="w-6 h-6 text-slate-400 group-hover:text-[#0B73D9] transition-colors" />
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
                            <span className="text-[#0B73D9] font-medium text-sm uppercase tracking-widest mb-4 block">
                                {projectData.ui.sections.lessons.label}
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2
                                className="text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1] mb-6"
                            >
                                {projectData.ui.sections.lessons.title}
                            </h2>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <div className="w-24 h-1 bg-gradient-to-r from-[#0B73D9] to-[#0B73D9]/60 rounded-full mx-auto" />
                        </RevealText>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {projectData.licoes.map((item, index) => {
                            const icons = [Compass, Gauge, Users];
                            const IconComponent = icons[index] || Sparkles;
                            return (
                                <RevealText key={index} delay={0.2 + index * 0.1}>
                                    <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-[#0B73D9]/60 transition-colors group text-center h-full">
                                        <div className="w-16 h-16 rounded-2xl bg-[#0B73D9]/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-[#0B73D9] transition-colors">
                                            <IconComponent className="w-7 h-7 text-[#0B73D9] group-hover:text-white transition-colors" />
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

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function ImportacaoEmpresas() {
    // Assign translated data to module-level variable for use by section components
    projectData = useProjectData();

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
                <ProductVisionSection />

                <PrototypeSection />
                <HandoffSection />
                <ResultsSection />
                <LessonsSection />

                <ProjectCTAFooter />
            </main>

            <FooterNew />
            <AudioMiniPlayer />
            <ScrollToTop />
        </div>
    );
}
