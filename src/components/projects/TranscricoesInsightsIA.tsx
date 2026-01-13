import { motion, useScroll, useSpring, useTransform, useInView, useMotionTemplate, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { useRef, useEffect, useState, ReactNode, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Target, Zap, Users, CheckCircle2, Lightbulb, Search, LayoutGrid, Settings, Brain, Database, Share2, TrendingUp, Gauge, BadgeDollarSign, Rocket, ShieldCheck, Code, BarChart3 } from 'lucide-react';
import { MinimalNav } from '../MinimalNav';
import { FooterNew } from '../FooterNew';
import { ScrollToTop } from '../ScrollToTop';
import { TealParticleBackground } from '../TealParticleBackground';
import { HeroParticleGrid } from '../HeroParticleGrid';
import { RealisticMacBook } from '../RealisticMacBook';
import { useContactModal } from '../../contexts/ContactModalContext';

// ============================================================================
// PROJECT DATA
// ============================================================================

const projectData = {
    title: "Transcrições & Insights com IA",
    category: "Product Design",
    year: "2024",

    resumo: <>Redesign do ecossistema de videoconferências focado na centralização de gravações, transcrições e insights de IA.<br />O projeto automatizou a documentação pós-reunião, eliminando trabalho manual e transformando uma ferramenta operacional em um ativo estratégico de vendas, validado por alta adoção espontânea.</>,

    objetivo: <>Centralizar gravações, transcrições e insights de IA para eliminar a gestão manual e o ruído no compartilhamento de dados.<br />O foco foi transformar registros de reuniões em inteligência acionável para times de Vendas, Suporte e Produto, elevando a competitividade da ferramenta no mercado.</>,

    desafio: <>Arquitetar a unificação de múltiplas fontes de dados (vídeo, ligações e transcrições) que eram dispostos em diferentes locais, integrando um volume denso de informações em um fluxo único e performático, reduzindo a carga cognitiva do usuário sem comprometer experiência de uso e viabilidade técnica.</>,

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
        { title: "Acesso à Inteligência", desc: "Transformar um simples \"log de reunião\" em um hub de conteúdo pesquisável (transcrição e IA), eliminando a necessidade de assistir ao vídeo completo." },
        { title: "Centralização da Verdade", desc: "Unificar calls internas e externas em uma visualização única, removendo a fricção de buscar registros dentro de pipelines de vendas." },
        { title: "Desbloqueio de Colaboração", desc: "Compartilhamento fácil para que a informação flua entre Vendas, Suporte e Produto sem barreiras manuais." },
        { title: "Estratégia de Viralização", desc: "Envio automático de resumos como alavanca de Product-Led Growth, estimulando a adoção espontânea por novos usuários." },
    ],

    prototipo: {
        telas: [
            {
                titulo: "Tela Inicial",
                descricao: "Organização em duas abas — agendamentos futuros e realizados.",
                imagens: [
                    "/assets/projects/transcricoes-insights-ia/tela-inicial-1.png",
                    "/assets/projects/transcricoes-insights-ia/tela-inicial-2.png"
                ]
            },
            {
                titulo: "Visualização das Gravações",
                descricao: "Acesso simultâneo a gravação, transcrições, comentários e insights.",
                imagens: [
                    "/assets/projects/transcricoes-insights-ia/visualizacao-gravacoes-1.png",
                    "/assets/projects/transcricoes-insights-ia/visualizacao-gravacoes-2.png"
                ]
            },
            {
                titulo: "Gravações de Áudio",
                descricao: "Inclusão das gravações de ligações em áudio na mesma rotina visual.",
                imagens: [
                    "/assets/projects/transcricoes-insights-ia/gravacoes-audio-2.png"
                ]
            },
            {
                titulo: "Email de Resumo",
                descricao: "E-mail de resumo contendo informações-chave da reunião.",
                imagens: [
                    "/assets/projects/transcricoes-insights-ia/email-resumo-correto.png"
                ]
            }
        ]
    },

    resultados: [
        { title: "Eficiência Operacional", desc: "Centralização de assets (gravação, transcrição e IA) em um único hub, eliminando a organização manual de atas e liberando horas produtivas dos times." },
        { title: "Impacto Comercial", desc: "A nova interface elevou a percepção de valor do produto, sendo adotada pela equipe de Vendas como diferencial competitivo em demonstrações para novos clientes." },
        { title: "Growth e Adoção", desc: "O redirecionamento automático pós-reunião impulsionou a descoberta orgânica da feature, integrando-a naturalmente ao fluxo diário sem custo de marketing." },
        { title: "Recuperação de Confiança", desc: "Usuários detratores da versão anterior tornaram-se promotores da nova funcionalidade, validando a resolução das fricções críticas de usabilidade." },
    ],

    licoes: [
        { title: "Shift-Left Dev", desc: "A validação técnica na fase de ideação provou-se vital para calibração e eliminação de retrabalho." },
        { title: "Alavancas de Growth", desc: "O redirecionamento automático evidenciou que pequenas intervenções no fluxo podem gerar mais adoção orgânica do que grandes funcionalidades." },
        { title: "Dados como Premissa", desc: "A experiência reforçou que a definição de KPIs deve nascer junto com o projeto, garantindo a mensuração de sucesso no rollout." },
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
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-teal-300 origin-left z-50"
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
// Section wrapper - content-driven height
const ChapterSection = forwardRef<HTMLElement, { children: ReactNode; className?: string; id?: string }>(
    ({ children, className = "", id }, ref) => {
        return (
            <section
                ref={ref}
                id={id}
                className={`relative overflow-hidden py-section ${className}`}
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

    // Mockup slide animation - slides right when scrolling down
    // Maps scroll progress to X position: 0% at top, 80% when hero is scrolled out
    const mockupXRaw = useTransform(scrollYProgress, [0, 1], [0, 80]);
    // Use spring for smoother animation
    const mockupXSpring = useSpring(mockupXRaw, { stiffness: 100, damping: 30, restDelta: 0.001 });
    // Convert to percentage string for transform
    const mockupX = useMotionTemplate`${mockupXSpring}%`;

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f2f4f7] z-50 isolate mobile-tiny-fix pt-24 lg:pt-0"
        >
            {/* Background with particle effect */}
            <div className="absolute inset-0 z-0">
                <TealParticleBackground />
                {/* Soft gradient for depth */}
                <div className="absolute inset-0 bg-gradient-radial from-teal-500/5 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Content Container - Matching Home Structure */}
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
                                    className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-500 transition-colors group"
                                >
                                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                    <span className="text-sm font-medium uppercase tracking-wider">Voltar</span>
                                </Link>
                            </motion.div>

                            {/* Title */}
                            <div className="hero-title-container mt-0 lg:mt-24 mb-6 md:mb-10 overflow-hidden w-full">
                                <div className="flex flex-col gap-2">
                                    <h1 className="hero-title-mobile text-5xl sm:text-6xl md:text-8xl font-semibold text-[#0f172a] tracking-tight leading-[1.1]">
                                        Transcrições &
                                    </h1>
                                    <h1 className="hero-title-mobile text-5xl sm:text-6xl md:text-8xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#14b8a6] to-[#0d9488] tracking-tight leading-[1.1]">
                                        Insights com IA
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
                                        className="scroll-indicator w-1.5 h-1.5 bg-slate-600 rounded-full"
                                    />
                                </div>
                                <span className="text-sm font-medium text-slate-500 tracking-widest uppercase">
                                    Scroll to explore
                                </span>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - MacBook Mockup (extends beyond screen) */}
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="hidden lg:flex items-center relative"
                        style={{ marginRight: '-15%', x: mockupX }}
                    >
                        <RealisticMacBook className="w-[110%] max-w-none">
                            <div className="w-full h-full bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center">
                                <div className="text-center text-white/60">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-white/30 flex items-center justify-center">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <p className="text-sm">Imagem de capa do projeto</p>
                                </div>
                            </div>
                        </RealisticMacBook>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// Overview Section (Resumo, Objetivo, Desafio)
function OverviewSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <ChapterSection id="overview" className="bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative">
                <BigNumber number="01" className="-top-20 -left-10 md:-left-20" />

                <div className="relative z-10">
                    {/* Section Header */}
                    <div className="mb-16 md:mb-24">
                        <RevealText>
                            <span className="text-teal-600 font-medium text-sm uppercase tracking-widest mb-4 block">
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
                            <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-teal-300 rounded-full" />
                        </RevealText>
                    </div>

                    {/* Resumo - Full Width Text */}
                    <RevealText delay={0.3}>
                        <div className="mb-16 md:mb-20">
                            <p className="text-lg text-slate-600 leading-relaxed">
                                {projectData.resumo}
                            </p>
                        </div>
                    </RevealText>

                    {/* Objetivo & Desafio - Staggered Cards */}
                    <div ref={ref} className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        {/* Objetivo Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 60 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="group"
                        >
                            <div className="h-full p-8 md:p-10 rounded-3xl bg-gradient-to-br from-teal-50 via-white to-teal-50/30 border border-teal-100 hover:border-teal-200 transition-all duration-500 hover:shadow-xl hover:shadow-teal-100/50">
                                {/* Icon */}
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-teal-500/25">
                                    <Target className="w-7 h-7 text-white" />
                                </div>

                                {/* Title */}
                                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                    Objetivo
                                </h3>

                                {/* Decorative Line */}
                                <div className="w-12 h-0.5 bg-gradient-to-r from-teal-400 to-transparent rounded-full mb-6" />

                                {/* Content */}
                                <p className="text-slate-600 leading-relaxed text-base md:text-lg">
                                    {projectData.objetivo}
                                </p>
                            </div>
                        </motion.div>

                        {/* Desafio Card - Offset for visual interest */}
                        <motion.div
                            initial={{ opacity: 0, y: 60 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="md:mt-12 group"
                        >
                            <div className="h-full p-8 md:p-10 rounded-3xl bg-gradient-to-br from-purple-50 via-white to-violet-50/30 border border-purple-100 hover:border-purple-200 transition-all duration-500 hover:shadow-xl hover:shadow-purple-100/50">
                                {/* Icon */}
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-purple-500/25">
                                    <Zap className="w-7 h-7 text-white" />
                                </div>

                                {/* Title */}
                                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                    Desafio
                                </h3>

                                {/* Decorative Line */}
                                <div className="w-12 h-0.5 bg-gradient-to-r from-purple-400 to-transparent rounded-full mb-6" />

                                {/* Content */}
                                <p className="text-slate-600 leading-relaxed text-base md:text-lg">
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

// Role Section (Meu Papel)
function RoleSection() {
    return (
        <ChapterSection id="role" className="bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative">
                <BigNumber number="02" className="-top-20 -right-10 md:-right-20" />

                <div className="relative z-10 grid lg:grid-cols-2 gap-16 lg:gap-24">
                    <div>
                        <RevealText>
                            <span className="text-teal-600 font-medium text-sm uppercase tracking-widest mb-4 block">
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
                            <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-teal-300 rounded-full" />
                        </RevealText>
                    </div>

                    <div>
                        <StaggeredList
                            items={projectData.meuPapel}
                            renderItem={(item, index) => {
                                const icons = [Search, LayoutGrid, Settings, CheckCircle2];
                                const IconComponent = icons[index] || Users;
                                return (
                                    <div className="flex gap-6 items-start group">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-teal-100 flex items-center justify-center group-hover:bg-teal-500 transition-colors">
                                            <IconComponent className="w-5 h-5 text-teal-600 group-hover:text-white transition-colors" />
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
                            <span className="text-teal-600 font-medium text-sm uppercase tracking-widest mb-4 block">
                                Pesquisa
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-6"
                                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                            >
                                Processo de <br />Pesquisa
                            </h2>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-teal-300 rounded-full" />
                        </RevealText>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {projectData.processoPesquisa.map((item, index) => (
                            <RevealText key={index} delay={0.2 + index * 0.1}>
                                <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:border-teal-300 transition-colors group">
                                    <div className="flex items-start gap-4">
                                        <span className="text-6xl font-bold text-slate-200 group-hover:text-teal-200 transition-colors leading-none" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
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
                            <span className="text-teal-600 font-medium text-sm uppercase tracking-widest mb-4 block">
                                Descobertas
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-6"
                                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                            >
                                Insights Principais
                            </h2>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-teal-300 rounded-full mx-auto" />
                        </RevealText>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {projectData.descobertas.map((item, index) => {
                            const icons = [Brain, Database, Share2, TrendingUp];
                            const IconComponent = icons[index] || Lightbulb;
                            return (
                                <RevealText key={index} delay={0.2 + index * 0.1}>
                                    <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-teal-300 transition-all group h-full shadow-sm hover:shadow-md">
                                        <div className="flex items-center gap-3 mb-4">
                                            <IconComponent className="w-6 h-6 text-teal-600" />
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

// Prototype Section with Sticky TV Effect
function PrototypeSection() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Content data - Flattened to show every image as a distinct slide
    const telas = projectData.prototipo.telas;
    const allSlides = telas.flatMap(tela =>
        tela.imagens.map((img, index) => ({
            ...tela,
            imagem: img,
            // Add (X/Y) to title if multiple images
            tituloDisplay: tela.imagens.length > 1 ? `${tela.titulo} (${index + 1}/${tela.imagens.length})` : tela.titulo
        }))
    );
    const totalSlides = allSlides.length;

    // State for current slide and transition effect
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isChangingChannel, setIsChangingChannel] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isProgrammaticScroll, setIsProgrammaticScroll] = useState(false);
    const lastScrollProgress = useRef(0);
    const scrollThreshold = 1 / (totalSlides * 2); // Threshold for triggering slide change

    // Use scroll direction to navigate slides (not absolute position)
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Don't change slides while transitioning or during programmatic scroll
        if (isTransitioning || isProgrammaticScroll) return;

        const delta = latest - lastScrollProgress.current;

        // Only trigger if scroll delta exceeds threshold
        if (Math.abs(delta) > scrollThreshold) {
            lastScrollProgress.current = latest;

            if (delta > 0 && currentSlide < totalSlides - 1) {
                // Scrolling down - next slide
                triggerChannelChange(currentSlide + 1, false);
            } else if (delta < 0 && currentSlide > 0) {
                // Scrolling up - previous slide
                triggerChannelChange(currentSlide - 1, false);
            }
        }
    });

    const triggerChannelChange = (newIndex: number, scrollToPosition = true) => {
        if (isTransitioning) return;
        if (newIndex < 0 || newIndex >= totalSlides) return;

        setIsTransitioning(true);
        setIsChangingChannel(true);

        // If triggered by button (scrollToPosition=true), try to scroll to matching position
        if (scrollToPosition && containerRef.current) {
            setIsProgrammaticScroll(true);

            const container = containerRef.current;
            const rect = container.getBoundingClientRect();
            const scrollTop = window.scrollY;

            // The scroll range is from when container top hits viewport top
            // to when container bottom hits viewport bottom
            const containerTop = scrollTop + rect.top;
            const scrollRange = container.scrollHeight - window.innerHeight;

            // Calculate target scroll position based on slide index
            // Adding 0.5 to center the position within the slide's scroll range
            const targetProgress = (newIndex + 0.5) / totalSlides;
            const targetScrollY = containerTop + (scrollRange * targetProgress);

            // Try to scroll to position
            try {
                window.scrollTo(0, targetScrollY);
            } catch (e) {
                // Ignore scroll errors on some mobile browsers
            }

            // CRITICAL: Update lastScrollProgress to the TARGET progress
            // This ensures direction-based logic works from the new slide position
            // even if scrollTo didn't fully succeed
            lastScrollProgress.current = targetProgress;

            // Reset flag after scroll completes
            setTimeout(() => {
                // Re-sync lastScrollProgress with actual scroll position
                lastScrollProgress.current = scrollYProgress.get();
                setIsProgrammaticScroll(false);
            }, 200);
        } else {
            // Update last scroll progress to current position to prevent jumps
            lastScrollProgress.current = scrollYProgress.get();
        }

        // Small delay to show static before switching content
        setTimeout(() => {
            setCurrentSlide(newIndex);
            // Hide static after a short burst
            setTimeout(() => {
                setIsChangingChannel(false);
                // Allow next transition after animation completes
                setTimeout(() => {
                    setIsTransitioning(false);
                }, 200);
            }, 200);
        }, 100);
    };

    return (
        <ChapterSection ref={containerRef} id="prototype" className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white min-h-[600vh] !overflow-visible">
            {/* Sticky Container - layout with proper spacing */}
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 md:px-12 pt-20 md:pt-24 pb-6 md:pb-8">

                {/* Big Number - Behind Mockup */}
                <span
                    className="absolute right-2 sm:right-4 md:right-12 top-12 sm:top-16 md:top-20 text-[8rem] sm:text-[12rem] md:text-[20rem] lg:text-[28rem] font-bold text-white/[0.03] leading-none select-none pointer-events-none z-0"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                    05
                </span>

                {/* Vertical Title - Left Edge, rotated */}
                <span
                    className="absolute left-2 sm:left-4 md:left-8 lg:left-12 top-[101%] text-[3rem] sm:text-[5rem] md:text-[8rem] lg:text-[12rem] font-bold text-teal-400/20 leading-none select-none pointer-events-none z-5 whitespace-nowrap"
                    style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        transform: 'translateY(-50%) rotate(-90deg)',
                        transformOrigin: 'left center'
                    }}
                >
                    Protótipo
                </span>

                {/* Mobile Title - Above Mockup (visible only on mobile) */}
                <AnimatePresence mode="wait">
                    {!isChangingChannel && (
                        <motion.div
                            key={`mobile-title-${currentSlide}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="sm:hidden w-full max-w-5xl px-2 mb-3"
                        >
                            <h3 className="text-sm font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                {allSlides[currentSlide].tituloDisplay}
                            </h3>
                            <p className="text-slate-400 mt-1 text-xs line-clamp-2">
                                {allSlides[currentSlide].descricao}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Central MacBook Mockup - Responsive for all screen sizes */}
                <div className="relative z-10 w-full max-w-6xl px-2 sm:px-0 mx-auto flex items-center">
                    <RealisticMacBook className="w-full max-h-[calc(100vh-8rem)] shadow-2xl shadow-black/50">
                        <div className="relative w-full aspect-[16/10] bg-black overflow-hidden">
                            {/* Screen Content */}
                            <img
                                src={allSlides[currentSlide].imagem}
                                alt={allSlides[currentSlide].titulo}
                                className={`w-full h-full object-contain transition-opacity duration-100 ${isChangingChannel ? 'opacity-50' : 'opacity-100'}`}
                            />

                            {/* Static Noise Overlay */}
                            <AnimatePresence>
                                {isChangingChannel && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 z-20 pointer-events-none mix-blend-hard-light"
                                    >
                                        <div className="w-full h-full bg-slate-900" style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
                                            filter: 'contrast(150%) brightness(100%)',
                                            backgroundSize: '200px 200px'
                                        }} />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Title Overlay - Bottom (text only) - Hidden on mobile/tablet */}
                            <div className="hidden lg:block absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
                                <AnimatePresence mode="wait">
                                    {!isChangingChannel && (
                                        <motion.div
                                            key={currentSlide}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="relative p-4 md:p-6 lg:p-8"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent rounded-t-xl" />
                                            <div className="relative">
                                                <h3 className="text-base md:text-2xl lg:text-3xl font-bold text-white tracking-tight pr-32 md:pr-40" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                                    {allSlides[currentSlide].tituloDisplay}
                                                </h3>
                                                <p className="text-slate-300 mt-1 md:mt-2 max-w-xl text-sm lg:text-base pr-32 md:pr-40">
                                                    {allSlides[currentSlide].descricao}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Progress Bar */}
                            <div className="absolute bottom-0 left-0 right-0 z-50 h-1 bg-white/10">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-teal-400 to-teal-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                />
                            </div>
                        </div>
                    </RealisticMacBook>

                    {/* Navigation Buttons - Desktop: positioned absolutely on mockup */}
                    <div className="hidden lg:flex absolute bottom-4 md:bottom-6 lg:bottom-8 right-4 md:right-6 lg:right-8 items-center gap-2 md:gap-4 z-50">
                        <button
                            onClick={() => currentSlide > 0 && triggerChannelChange(currentSlide - 1)}
                            disabled={currentSlide === 0 || isTransitioning}
                            className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 transition-all backdrop-blur-sm ${currentSlide === 0 || isTransitioning
                                ? 'border-white/20 text-white/20 cursor-not-allowed bg-black/20'
                                : 'border-white/40 text-white bg-black/40 hover:border-teal-400 hover:text-teal-400 hover:bg-teal-400/20'
                                }`}
                            aria-label="Slide anterior"
                        >
                            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <span className="text-white text-sm md:text-base font-medium min-w-[60px] text-center bg-black/40 backdrop-blur-sm px-3 py-2 rounded-full">
                            {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
                        </span>

                        <button
                            onClick={() => currentSlide < totalSlides - 1 && triggerChannelChange(currentSlide + 1)}
                            disabled={currentSlide === totalSlides - 1 || isTransitioning}
                            className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 transition-all backdrop-blur-sm ${currentSlide === totalSlides - 1 || isTransitioning
                                ? 'border-white/20 text-white/20 cursor-not-allowed bg-black/20'
                                : 'border-white/40 text-white bg-black/40 hover:border-teal-400 hover:text-teal-400 hover:bg-teal-400/20'
                                }`}
                            aria-label="Próximo slide"
                        >
                            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Navigation Buttons - Mobile/Tablet: centered below mockup */}
                <div className="lg:hidden flex items-center justify-center gap-4 mt-4 z-50">
                    <button
                        onClick={() => currentSlide > 0 && triggerChannelChange(currentSlide - 1)}
                        disabled={currentSlide === 0 || isTransitioning}
                        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${currentSlide === 0 || isTransitioning
                            ? 'border-white/20 text-white/20 cursor-not-allowed'
                            : 'border-white/40 text-white hover:border-teal-400 hover:text-teal-400'
                            }`}
                        aria-label="Slide anterior"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <span className="text-white text-sm font-medium min-w-[50px] text-center">
                        {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
                    </span>

                    <button
                        onClick={() => currentSlide < totalSlides - 1 && triggerChannelChange(currentSlide + 1)}
                        disabled={currentSlide === totalSlides - 1 || isTransitioning}
                        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${currentSlide === totalSlides - 1 || isTransitioning
                            ? 'border-white/20 text-white/20 cursor-not-allowed'
                            : 'border-white/40 text-white hover:border-teal-400 hover:text-teal-400'
                            }`}
                        aria-label="Próximo slide"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
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
                <BigNumber number="06" className="-top-20 -right-10 md:-right-20" />

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
                                Impacto do <br />Projeto
                            </h2>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full" />
                        </RevealText>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {projectData.resultados.map((item, index) => {
                            const icons = [Gauge, BadgeDollarSign, Rocket, ShieldCheck];
                            const IconComponent = icons[index] || CheckCircle2;
                            return (
                                <RevealText key={index} delay={0.2 + index * 0.1}>
                                    <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 hover:border-emerald-300 transition-colors group h-full">
                                        <div className="flex items-center gap-3 mb-4">
                                            <IconComponent className="w-6 h-6 text-emerald-500" />
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
                <BigNumber number="07" className="-top-20 -left-10 md:-left-20" />

                <div className="relative z-10">
                    <div className="text-center mb-10">
                        <RevealText>
                            <span className="text-purple-600 font-medium text-sm uppercase tracking-widest mb-4 block">
                                Aprendizados
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-6"
                                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                            >
                                Lições Aprendidas
                            </h2>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-purple-300 rounded-full mx-auto" />
                        </RevealText>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {projectData.licoes.map((item, index) => {
                            const icons = [Code, TrendingUp, BarChart3];
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
            {/* Background Effects */}
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

                    <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
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
                                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-purple-600 hover:text-purple-700 font-medium whitespace-nowrap"
                            >
                                <ArrowLeft size={18} />
                                Voltar aos Projetos
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

export function TranscricoesInsightsIA() {
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
                <ResultsSection />
                <LessonsSection />
                <CTASection />
            </main>

            <FooterNew />
            <ScrollToTop />
        </div>
    );
}
