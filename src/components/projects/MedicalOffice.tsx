import { motion, useScroll, useSpring, useTransform, useInView, useMotionTemplate, AnimatePresence } from 'motion/react';
import { useRef, useEffect, useState, ReactNode, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Target, Zap, Users, CheckCircle2, Lightbulb, Search, Settings, Share2, Gauge, ShieldCheck, Code, Palette, Layout, Smartphone, FileCheck, Layers, Compass, ClipboardList, PenTool, XCircle, Ban } from 'lucide-react';
import { MinimalNav } from '../MinimalNav';
import { FooterNew } from '../FooterNew';
import { ScrollToTop } from '../ScrollToTop';
import { ParticleBackground } from '../ParticleBackground';
import { RealisticMacBook } from '../RealisticMacBook';
import { RealisticIphone } from '../RealisticIphone';
import { ProjectCTAFooter } from './ProjectCTAFooter';
import { AudioMiniPlayer } from '../AudioMiniPlayer';
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
    const p = translations.projects?.medicalOffice;

    if (!p) {
        // Fallback to PT-BR hardcoded data
        return {
            title: "Redesign Medical Office",
            category: "UX Design",
            year: "2021",
            resumo: <>Redesign UI/UX da plataforma web Medical Office, que conecta profissionais de saúde sem espaço próprio a clínicas com capacidade ociosa.<br />O objetivo principal foi redesenhar a interface, torná-la responsiva e aprimorar a usabilidade, mantendo uma experiência familiar para os usuários já existentes.</>,
            objetivo: <>A Medical Office é uma plataforma web que conecta profissionais de saúde iniciantes que não possuem espaço físico para atuação, com proprietários de consultórios que possuem espaços ociosos.<br />Dessa forma, busca suprir a demanda de múltiplos profissionais, viabilizando a geração de renda aos proprietários através do aluguel.</>,
            desafio: <>Redesenhar a ferramenta tornando-a mais moderna e responsiva, facilitando o uso e mantendo o feeling já adquirido pelos usuários. O redesign precisava equilibrar inovação com familiaridade, garantindo que a transição fosse suave para a base de usuários existente.</>,
            meuPapel: [
                { title: "Lean Inception", desc: "Participação no workshop colaborativo para alinhar o MVP com stakeholders e equipe de desenvolvimento." },
                { title: "Pesquisa & Discovery", desc: "Criação de Matriz CSD, personas e mapeamento de jornadas do usuário." },
                { title: "Design de Interface", desc: "Atuação como designer único após a inception, criando protótipos de alta fidelidade." },
                { title: "Handoff Colaborativo", desc: "Trabalho integrado com a equipe de desenvolvimento desde a concepção." },
            ],
            processoPesquisa: [
                { title: "Lean Inception", desc: "Workshop colaborativo com 2 Designers, 2 Desenvolvedores, COO, CTO e 3 fundadores para definir o MVP." },
                { title: "Matriz CSD", desc: "Levantamento de Certezas, Suposições e Dúvidas para alinhamento da equipe sobre o produto." },
                { title: "Visão Atual", desc: "Documentação da plataforma existente para entender pontos de fricção e identificar oportunidades de melhoria." },
                { title: "Visão do Produto", desc: "Definição do que o produto é, não é, faz e não faz para evitar ambiguidades e definir escopo." },
                { title: "Personas", desc: "Criação de três perfis de usuário: Administrador, Locador e Locatário, com suas necessidades específicas." },
                { title: "Sequenciamento", desc: "Priorização de funcionalidades por importância, valor de negócio e viabilidade técnica para criar uma sequência lógica de desenvolvimento." },
            ],
            descobertas: [
                { title: "Benchmarking", desc: "Análise de plataformas como Airbnb, Booking e QuintoAndar para identificar padrões de mercado e reduzir fricções." },
                { title: "Fluxos de Usuário", desc: "Criação de fluxogramas detalhados indicando o caminho desde o ponto inicial até o objetivo final de cada jornada." },
                { title: "Débito Técnico", desc: "Identificação de limitações técnicas que impactaram o redesign, exigindo ajustes no escopo de algumas rotinas." },
                { title: "Cadastro Problemático", desc: "O fluxo anterior era moroso com formulário extenso; implementamos processo passo a passo mais intuitivo." },
            ],
            prototipo: {
                intro: "O protótipo final foi desenvolvido considerando a responsividade, os anseios dos stakeholders, os insights obtidos a partir de um benchmarking detalhado e o atendimento às principais heurísticas de usabilidade.",
                telas: [
                    { titulo: "Landing Page", descricao: "A landing page foi reformulada com base nas diretrizes definidas pelos stakeholders.", imagens: ["/assets/projects/medical-office/1.png"] },
                    { titulo: "Plataforma Web", descricao: "Algumas limitações de débito técnico impactaram o redesign.", imagens: ["/assets/projects/medical-office/prototipo/2-1.png", "/assets/projects/medical-office/prototipo/2-2.png", "/assets/projects/medical-office/prototipo/2-3.png", "/assets/projects/medical-office/prototipo/2-4.png"] },
                    { titulo: "Cadastro de Espaços", descricao: "Implementamos um fluxo de cadastro passo a passo, mais intuitivo.", imagens: ["/assets/projects/medical-office/3.png"] },
                    { titulo: "Templates de Email", descricao: "Desenvolvemos templates de e-mail personalizados para os três tipos de usuários.", imagens: ["/assets/projects/medical-office/4.png"] },
                    { titulo: "Plataforma Mobile", descricao: "Todo o layout foi projetado com foco na responsividade.", imagens: ["/assets/projects/medical-office/5.png"] },
                    { titulo: "Style Guide", descricao: "Foi criado um style guide componentizado.", imagens: ["/assets/projects/medical-office/6.png"] }
                ]
            },
            handoff: {
                titulo: "Handoff Design-Dev",
                descricao: "Atuamos de forma colaborativa desde as etapas iniciais de prototipação.",
                bullets: [
                    "Colaboração: Envolvimento da engenharia desde a fase de ideação",
                    "Viabilidade: Apenas rotinas viáveis e refinadas encaminhadas para desenvolvimento",
                    "Comunicação: Processo promove integração fluida entre designers e desenvolvedores"
                ],
                imagem: "/assets/projects/medical-office/handoff.png"
            },
            resultados: [
                { title: "Responsividade Total", desc: "Toda a plataforma passou a funcionar perfeitamente em dispositivos móveis." },
                { title: "Experiência Otimizada", desc: "O novo fluxo de cadastro passo a passo reduziu significativamente a fricção." },
                { title: "Identidade Visual", desc: "Templates de email e style guide criaram um padrão de comunicação consistente." },
                { title: "Longevidade do Design", desc: "A plataforma segue em funcionamento até hoje com o mesmo visual de 2021." },
            ],
            licoes: [
                { title: "Design Adaptável", desc: "Considerar futuras modificações e expansões faz parte do planejamento de qualquer redesign." },
                { title: "Colaboração Early", desc: "O envolvimento precoce da engenharia garantiu que apenas soluções viáveis fossem prototipadas." },
                { title: "Concessões Estratégicas", desc: "Algumas concessões de design foram necessárias para atender aos stakeholders." },
            ],
            ferramentas: [
                { name: "Figma", desc: "Prototipagem em alta fidelidade" },
                { name: "Photoshop", desc: "Manipulação de imagens" },
                { name: "Miro", desc: "Lean Inception e fluxogramas" },
                { name: "Jira", desc: "Gerenciamento e handoff" },
            ],
            productVision: {
                whatItIs: { title: "O que É", items: ["Uma plataforma de conexão entre profissionais de saúde e proprietários de consultórios", "Um marketplace para locação de espaços médicos ociosos", "Uma solução digital para otimizar a ocupação de consultórios"] },
                whatItIsNot: { title: "O que NÃO É", items: ["Uma clínica ou consultório próprio", "Um sistema de gestão de prontuários médicos", "Uma plataforma de telemedicina"] },
                whatItDoes: { title: "O que FAZ", items: ["Conecta profissionais iniciantes a espaços disponíveis", "Facilita a geração de renda para proprietários", "Gerencia reservas e disponibilidade de espaços"] },
                whatItDoesNot: { title: "O que NÃO FAZ", items: ["Não oferece serviços médicos diretamente", "Não gerencia agenda de pacientes", "Não processa pagamentos de consultas"] },
            },
            previousView: {
                desc: "Veja como a plataforma era antes do processo de redesign. As imagens abaixo mostram o estado anterior da interface que foi completamente repensada.",
            },
            ui: {
                backButton: "Voltar",
                heroTitle: { line1: "Redesign", line2: "Medical Office" },
                heroTags: ["2021", "Product Design", "Web", "Mobile"],
                heroAlt: "Capa do Projeto: Redesign Medical Office",
                heroMobileAlt: "Medical Office - Versão Mobile",
                sections: {
                    overview: { label: "Objetivo", title: "O Projeto", objetivo: "Visão Geral", desafio: "Desafio" },
                    role: { label: "Contribuição", title: "Meu Papel" },
                    research: { label: "Descoberta & Definição", title: "Processo de Pesquisa" },
                    discoveries: { label: "Descobertas", title: "Principais Insights" },
                    previousView: { label: "Antes do Redesign", title: "Visão Prévia" },
                    productVision: { label: "Descoberta & Definição", title: "Visão de Produto", desc: "Registros da etapa de descoberta e definição das características do produto para evitar ambiguidades e manter o foco durante o desenvolvimento." },
                    prototype: { label: "Protótipo", title: "Interface do Projeto" },
                    handoff: { label: "Handoff" },
                    results: { label: "Resultados", title: "Impacto do Projeto" },
                    lessons: { label: "Análise Crítica", title: "Insights e Reflexões" },
                },
            },
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
            intro: p.prototipo.intro,
            telas: p.prototipo.telas.map((t: { titulo: string; descricao: string }, i: number) => ({
                titulo: t.titulo,
                descricao: t.descricao,
                imagens: i === 1
                    ? ["/assets/projects/medical-office/prototipo/2-1.png", "/assets/projects/medical-office/prototipo/2-2.png", "/assets/projects/medical-office/prototipo/2-3.png", "/assets/projects/medical-office/prototipo/2-4.png"]
                    : i === 2
                        ? [
                            "/assets/projects/medical-office/prototipo/3-0.png",
                            "/assets/projects/medical-office/prototipo/3-1.png",
                            "/assets/projects/medical-office/prototipo/3-2.png",
                            "/assets/projects/medical-office/prototipo/3-3.png",
                            "/assets/projects/medical-office/prototipo/3-4.png",
                            "/assets/projects/medical-office/prototipo/3-5.png",
                            "/assets/projects/medical-office/prototipo/3-6.png",
                            "/assets/projects/medical-office/prototipo/3-7.png",
                            "/assets/projects/medical-office/prototipo/3-8.png",
                            "/assets/projects/medical-office/prototipo/3-9.png"
                        ]
                        : i === 3
                            ? [
                                "/assets/projects/medical-office/prototipo/4-1.png",
                                "/assets/projects/medical-office/prototipo/4-2.png",
                                "/assets/projects/medical-office/prototipo/4-3.png",
                                "/assets/projects/medical-office/prototipo/4-4.png",
                                "/assets/projects/medical-office/prototipo/4-5.png",
                                "/assets/projects/medical-office/prototipo/4-6.png"
                            ]
                            : i === 4
                                ? [
                                    "/assets/projects/medical-office/prototipo/5-1.png",
                                    "/assets/projects/medical-office/prototipo/5-2.png",
                                    "/assets/projects/medical-office/prototipo/5-4.png",
                                    "/assets/projects/medical-office/prototipo/5-5.png",
                                    "/assets/projects/medical-office/prototipo/5-6.png"
                                ]
                                : i === 5
                                    ? ["/assets/projects/medical-office/prototipo/style-guide.png"]
                                    : [`/assets/projects/medical-office/${i + 1}.png`]
            }))
        },
        handoff: {
            titulo: p.handoff.titulo,
            descricao: p.handoff.descricao,
            bullets: p.handoff.bullets,
            imagem: "/assets/projects/medical-office/handoff.png"
        },
        resultados: p.resultados,
        licoes: p.licoes,
        ferramentas: p.ferramentas,
        productVision: p.productVision,
        previousView: p.previousView,
        ui: p.ui,
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
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-medical-dark to-medical-light origin-left z-50"
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
// Animated text reveal
function RevealText({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={className}
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
            {/* Geometric Gradient Background - matches home page */}
            <AnimatePresence mode="wait">
                <motion.div
                    key="medical-gradient"
                    className="hero-gradient-bg bg-gradient-to-br from-medical-dark to-medical-light"
                    initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
                    animate={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 0% 100%)' }}
                    exit={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 0% 100%)' }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                >
                    {/* Inner shadow overlay - inside the animated container */}
                    <div className="hero-diagonal-shadow" />
                </motion.div>
            </AnimatePresence>

            {/* Background with particle effect */}
            <div className="absolute inset-0 z-0">
                <ParticleBackground color="medical" />
                {/* Soft gradient for depth */}
                <div className="absolute inset-0 bg-gradient-radial from-medical-primary/5 via-transparent to-transparent pointer-events-none" />
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
                                    className="inline-flex items-center gap-2 text-slate-500 hover:text-medical-primary transition-colors group"
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
                                className="flex flex-wrap gap-4 items-center mb-16"
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
                    </motion.div>

                    {/* Right Side - Device Mockups (MacBook + iPhone) */}
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="hidden lg:flex items-center relative"
                        style={{ marginRight: '-15%', x: mockupX }}
                    >
                        {/* MacBook Mockup - Same as TranscricoesInsightsIA */}
                        <RealisticMacBook className="w-[110%] max-w-none">
                            <div className="w-full h-full bg-black overflow-hidden relative">
                                <img
                                    src="/assets/projects/medical-office/cover.png"
                                    alt={projectData.ui.heroAlt}
                                    className="w-full h-full object-cover"
                                    loading="eager"
                                />
                                {/* Overlay to match the design vibe */}
                                <div className="absolute inset-0 bg-medical-primary/10 mix-blend-overlay pointer-events-none" />
                            </div>
                        </RealisticMacBook>

                        {/* iPhone Mockup - positioned to the left bottom */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="absolute -left-[8%] bottom-[-15%] z-10"
                            style={{ width: '28%' }}
                        >
                            <RealisticIphone className="w-full">
                                <div className="w-full h-full bg-black overflow-hidden relative">
                                    <img
                                        src="/assets/projects/medical-office/cover-mobile.png"
                                        alt={projectData.ui.heroMobileAlt}
                                        className="w-full h-full object-cover object-top"
                                        loading="eager"
                                    />
                                    {/* Overlay to match the design vibe */}
                                    <div className="absolute inset-0 bg-medical-primary/10 mix-blend-overlay pointer-events-none" />
                                </div>
                            </RealisticIphone>
                        </motion.div>
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
                            <span className="text-medical-primary font-medium text-sm uppercase tracking-widest mb-4 block">
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
                            <div className="w-24 h-1 bg-gradient-to-r from-medical-dark to-medical-light rounded-full" />
                        </RevealText>
                    </div>

                    {/* Resumo - Full Width Text */}
                    <RevealText delay={0.3}>
                        <div className="mb-16 md:mb-20">
                            <p className="text-lg text-slate-600 leading-relaxed text-justify">
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
                            <div className="h-full p-8 md:p-10 rounded-3xl bg-gradient-to-br from-medical-primary/5 via-white to-medical-primary/10 border border-medical-primary/20 hover:border-medical-primary/40 transition-all duration-500 hover:shadow-xl hover:shadow-medical-primary/20">
                                {/* Icon */}
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-medical-primary to-medical-dark flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-medical-primary/25">
                                    <Target className="w-7 h-7 text-white" />
                                </div>

                                {/* Title */}
                                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                    {projectData.ui.sections.overview.objetivo}
                                </h3>

                                {/* Decorative Line */}
                                <div className="w-12 h-0.5 bg-gradient-to-r from-medical-light to-transparent rounded-full mb-6" />

                                {/* Content */}
                                <p className="text-slate-600 leading-relaxed text-base md:text-lg text-justify">
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
                            <div className="h-full p-8 md:p-10 rounded-3xl bg-gradient-to-br from-medical-primary/5 via-white to-medical-primary/10 border border-medical-primary/20 hover:border-medical-primary/40 transition-all duration-500 hover:shadow-xl hover:shadow-medical-primary/20">
                                {/* Icon */}
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-medical-primary to-medical-dark flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-medical-primary/25">
                                    <Zap className="w-7 h-7 text-white" />
                                </div>

                                {/* Title */}
                                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                    {projectData.ui.sections.overview.desafio}
                                </h3>

                                {/* Decorative Line */}
                                <div className="w-12 h-0.5 bg-gradient-to-r from-medical-light to-transparent rounded-full mb-6" />

                                {/* Content */}
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

// Role Section (Meu Papel)
function RoleSection() {
    return (
        <ChapterSection id="role" className="bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative">
                <BigNumber number="02" className="-top-20 -right-10 md:-right-20" />

                <div className="relative z-10 grid lg:grid-cols-2 gap-16 lg:gap-24">
                    <div>
                        <RevealText>
                            <span className="text-medical-primary font-medium text-sm uppercase tracking-widest mb-4 block">
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
                            <div className="w-24 h-1 bg-gradient-to-r from-medical-dark to-medical-light rounded-full" />
                        </RevealText>
                    </div>

                    <div>
                        <StaggeredList
                            items={projectData.meuPapel}
                            renderItem={(item, index) => {
                                const icons = [Users, Search, PenTool, FileCheck];
                                const IconComponent = icons[index] || Users;
                                return (
                                    <div className="flex gap-6 items-start group">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-medical-primary/10 flex items-center justify-center group-hover:bg-medical-primary transition-colors">
                                            <IconComponent className="w-5 h-5 text-medical-primary group-hover:text-white transition-colors" />
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
                            <span className="text-medical-primary font-medium text-sm uppercase tracking-widest mb-4 block">
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
                            <div className="w-24 h-1 bg-gradient-to-r from-medical-dark to-medical-light rounded-full" />
                        </RevealText>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {projectData.processoPesquisa.map((item, index) => (
                            <RevealText key={index} delay={0.2 + index * 0.1}>
                                <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:border-medical-light transition-colors group">
                                    <div className="flex items-start gap-4">
                                        <span className="text-6xl font-bold text-slate-200 group-hover:text-medical-primary/40 transition-colors leading-none" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
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
                            <span className="text-medical-primary font-medium text-sm uppercase tracking-widest mb-4 block">
                                {projectData.ui.sections.discoveries.label}
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2
                                className="text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1] mb-6"
                            >
                                {projectData.ui.sections.discoveries.title}
                            </h2>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <div className="w-24 h-1 bg-gradient-to-r from-medical-dark to-medical-light rounded-full mx-auto" />
                        </RevealText>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {projectData.descobertas.map((item, index) => {
                            const icons = [Compass, Layers, Settings, ClipboardList];
                            const IconComponent = icons[index] || Lightbulb;
                            return (
                                <RevealText key={index} delay={0.2 + index * 0.1}>
                                    <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-medical-light transition-all group h-full shadow-sm hover:shadow-md">
                                        <div className="flex items-center gap-3 mb-4">
                                            <IconComponent className="w-6 h-6 text-medical-primary" />
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


// Custom carousel for MacBook mockup to ensure robust rendering and animations
function SimpleMacbookCarousel({ images }: { images: string[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!images || images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images]);

    if (!images || images.length === 0) return null;

    return (
        <div className="w-full h-full relative bg-gray-900 overflow-hidden">
            <AnimatePresence mode="popLayout">
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={`Project Screen ${currentIndex + 1}`}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    onError={(e) => console.error(`Failed to load image: ${images[currentIndex]}`, e)}
                />
            </AnimatePresence>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all shadow-sm ${idx === currentIndex ? "bg-white w-4 scale-110" : "bg-white/40 hover:bg-white/60"
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

// Prototype Section - Alternating Layout
function PrototypeSection() {
    const telas = projectData.prototipo.telas;

    return (
        <ChapterSection id="prototype" className="bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative">
                <BigNumber number="07" className="-top-20 -right-10 md:-right-20" />

                <div className="relative z-10">
                    {/* Section Header */}
                    <div className="lg:max-w-xl mb-16 md:mb-24">
                        <RevealText>
                            <span className="text-medical-primary font-medium text-sm uppercase tracking-widest mb-4 block">
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
                            <div className="w-24 h-1 bg-gradient-to-r from-medical-dark to-medical-light rounded-full mb-6" />
                        </RevealText>
                        <RevealText delay={0.3}>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                {projectData.prototipo.intro}
                            </p>
                        </RevealText>
                    </div>

                    {/* Alternating Screen Rows */}
                    <div className="space-y-24 md:space-y-32">
                        {telas.map((tela, index) => {
                            const isEven = index % 2 === 0;

                            return (
                                <RevealText key={index} delay={0.1}>
                                    <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center justify-center">
                                        {/* Text Content - Shows first on mobile, order changes on desktop */}
                                        <div className={`w-full md:w-[30%] flex-shrink-0 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                                            <div className="space-y-3 md:space-y-4">
                                                {/* Number Badge */}
                                                <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-medical-primary to-medical-dark text-white font-bold text-base md:text-lg shadow-lg shadow-medical-primary/25">
                                                    {String(index + 1).padStart(2, '0')}
                                                </div>

                                                {/* Title */}
                                                <h3
                                                    className="text-xl md:text-3xl font-bold text-slate-900"
                                                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                                                >
                                                    {tela.titulo}
                                                </h3>

                                                {/* Decorative Line */}
                                                <div className="w-10 md:w-12 h-0.5 bg-gradient-to-r from-medical-light to-transparent rounded-full" />

                                                {/* Description */}
                                                <p className="text-sm md:text-lg text-slate-600 leading-relaxed">
                                                    {tela.descricao}
                                                </p>
                                            </div>
                                        </div>

                                        <div className={`w-full md:w-[70%] flex-shrink-0 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                                            {index === 0 ? (
                                                <motion.div
                                                    whileHover={{ scale: 1.02 }}
                                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                                    className="group"
                                                >
                                                    {/* MacBook */}
                                                    <RealisticMacBook>
                                                        <motion.div
                                                            className="w-full h-full bg-top"
                                                            style={{
                                                                backgroundImage: `url(/assets/projects/medical-office/Home.png)`,
                                                                backgroundSize: '100% auto',
                                                            }}
                                                            animate={{
                                                                backgroundPosition: ["50% 0%", "50% 100%"]
                                                            }}
                                                            transition={{
                                                                duration: 15,
                                                                ease: "linear",
                                                                repeat: Infinity,
                                                                repeatType: "reverse",
                                                                repeatDelay: 2
                                                            }}
                                                        />
                                                    </RealisticMacBook>
                                                </motion.div>
                                            ) : index === 1 || index === 2 ? (
                                                <motion.div
                                                    whileHover={{ scale: 1.02 }}
                                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                                    className="group"
                                                >
                                                    <RealisticMacBook>
                                                        <SimpleMacbookCarousel images={tela.imagens} />
                                                    </RealisticMacBook>
                                                </motion.div>
                                            ) : index === 3 ? (
                                                <motion.div
                                                    whileHover={{ scale: 1.02 }}
                                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                                    className="group"
                                                >
                                                    <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl shadow-slate-900/10 border border-slate-200 bg-white relative">
                                                        <Carousel
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
                                                            <CarouselContent>
                                                                {tela.imagens.map((img, idx) => (
                                                                    <CarouselItem key={idx}>
                                                                        <div className="relative h-[600px] w-full overflow-hidden bg-slate-100 flex items-center justify-center">
                                                                            <img
                                                                                src={img}
                                                                                alt={`${tela.titulo} - ${idx + 1}`}
                                                                                className="w-full h-full object-contain object-center"
                                                                                loading="lazy"
                                                                            />
                                                                        </div>
                                                                    </CarouselItem>
                                                                ))}
                                                            </CarouselContent>
                                                            <div className="hidden md:block">
                                                                <CarouselPrevious className="left-4 bg-white/80 hover:bg-white text-slate-800 border-slate-200" />
                                                                <CarouselNext className="right-4 bg-white/80 hover:bg-white text-slate-800 border-slate-200" />
                                                            </div>
                                                        </Carousel>
                                                    </div>
                                                </motion.div>
                                            ) : index === 4 ? (

                                                <motion.div
                                                    whileHover={{ scale: 1.02 }}
                                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                                    className="group flex flex-col md:flex-row gap-8 justify-center items-center"
                                                >
                                                    {/* Original Home-mobile Mockup */}
                                                    <div className="w-[80%] md:w-[45%] lg:w-[40%]">
                                                        <RealisticIphone>
                                                            <motion.div
                                                                className="w-full h-full bg-top"
                                                                style={{
                                                                    backgroundImage: `url(/assets/projects/medical-office/Home-mobile.png)`,
                                                                    backgroundSize: '100% auto',
                                                                }}
                                                                animate={{
                                                                    backgroundPosition: ["50% 0%", "50% 100%"]
                                                                }}
                                                                transition={{
                                                                    duration: 15,
                                                                    ease: "linear",
                                                                    repeat: Infinity,
                                                                    repeatType: "reverse",
                                                                    repeatDelay: 2
                                                                }}
                                                            />
                                                        </RealisticIphone>
                                                    </div>

                                                    {/* New Carousel Mockup */}
                                                    <div className="w-[80%] md:w-[45%] lg:w-[40%]">
                                                        <RealisticIphone>
                                                            <div className="w-full h-full bg-slate-900 relative overflow-hidden">
                                                                <Carousel
                                                                    opts={{
                                                                        align: "start",
                                                                        loop: true,
                                                                    }}
                                                                    plugins={[
                                                                        Autoplay({
                                                                            delay: 3000,
                                                                        }),
                                                                    ]}
                                                                    className="w-full h-full"
                                                                >
                                                                    <CarouselContent className="h-full ml-0">
                                                                        {tela.imagens.map((img, idx) => (
                                                                            <CarouselItem key={idx} className="pl-0 h-full w-full">
                                                                                <div className="relative w-full h-full">
                                                                                    <img
                                                                                        src={img}
                                                                                        alt={`${tela.titulo} - Carousel - Image ${idx + 1}`}
                                                                                        className="w-full h-full object-cover object-top"
                                                                                        loading="lazy"
                                                                                    />
                                                                                </div>
                                                                            </CarouselItem>
                                                                        ))}
                                                                    </CarouselContent>
                                                                </Carousel>
                                                            </div>
                                                        </RealisticIphone>
                                                    </div>
                                                </motion.div>
                                            ) : (
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
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>
                                </RevealText>
                            );
                        })}
                    </div>
                </div>
            </div >
        </ChapterSection >
    );
}

// Handoff Section
function HandoffSection() {
    return (
        <ChapterSection id="handoff" className="bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative">
                <BigNumber number="08" className="-top-20 -right-10 md:-right-20" />

                <div className="relative z-10">
                    {/* Section Header */}
                    <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
                        <RevealText>
                            <span className="text-medical-primary font-medium text-sm uppercase tracking-widest mb-4 block">
                                {projectData.ui.sections.handoff.label}
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2
                                className="text-[2.75rem] sm:text-[3.5rem] md:text-7xl font-medium text-slate-900 tracking-tight leading-[1.1] mb-6"
                            >
                                {projectData.handoff.titulo}
                            </h2>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <div className="w-24 h-1 bg-gradient-to-r from-medical-dark to-medical-light rounded-full mx-auto" />
                        </RevealText>
                        <RevealText delay={0.3}>
                            <p className="text-lg text-slate-600 leading-relaxed mt-8">
                                {projectData.handoff.descricao}
                            </p>
                        </RevealText>
                    </div>

                    {/* Content - 3 Column Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {projectData.handoff.bullets.map((bullet, index) => {
                            const [title, ...rest] = bullet.split(': ');
                            const description = rest.join(': ');

                            // Map index to icon
                            const icons = [Users, Code, Share2];
                            const Icon = icons[index] || CheckCircle2;

                            return (
                                <RevealText key={index} delay={0.4 + (index * 0.1)}>
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-white p-8 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 h-full flex flex-col items-center text-center group"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-medical-primary/5 flex items-center justify-center mb-6 group-hover:bg-medical-primary/10 transition-colors duration-300">
                                            <Icon className="w-8 h-8 text-medical-primary" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-4">
                                            {title}
                                        </h3>
                                        <p className="text-slate-600 leading-relaxed">
                                            {description}
                                        </p>
                                    </motion.div>
                                </RevealText>
                            );
                        })}
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
                <BigNumber number="09" className="-top-20 -right-10 md:-right-20" />

                <div className="relative z-10">
                    <div className="lg:max-w-xl mb-10">
                        <RevealText>
                            <span className="text-medical-primary font-medium text-sm uppercase tracking-widest mb-4 block">
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
                            <div className="w-24 h-1 bg-gradient-to-r from-medical-dark to-medical-light rounded-full" />
                        </RevealText>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {projectData.resultados.map((item, index) => {
                            const icons = [Smartphone, Gauge, Palette, ShieldCheck];
                            const IconComponent = icons[index] || CheckCircle2;
                            return (
                                <RevealText key={index} delay={0.2 + index * 0.1}>
                                    <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:border-medical-light hover:bg-gradient-to-br hover:from-medical-primary/5 hover:to-white transition-all group h-full">
                                        <div className="flex items-center gap-3 mb-4">
                                            <IconComponent className="w-6 h-6 text-slate-400 group-hover:text-medical-primary transition-colors" />
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
                <BigNumber number="10" className="-top-20 -left-10 md:-left-20" />

                <div className="relative z-10">
                    <div className="text-center mb-10">
                        <RevealText>
                            <span className="text-medical-primary font-medium text-sm uppercase tracking-widest mb-4 block">
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
                            <div className="w-24 h-1 bg-gradient-to-r from-medical-dark to-medical-light rounded-full mx-auto" />
                        </RevealText>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {projectData.licoes.map((item, index) => {
                            const icons = [Layout, Code, Share2];
                            const IconComponent = icons[index] || Sparkles;
                            return (
                                <RevealText key={index} delay={0.2 + index * 0.1}>
                                    <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-medical-light transition-colors group text-center h-full">
                                        <div className="w-16 h-16 rounded-2xl bg-medical-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-medical-primary transition-colors">
                                            <IconComponent className="w-7 h-7 text-medical-primary group-hover:text-white transition-colors" />
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

// Previous View Section (Visão Prévia - before redesign)
function PreviousViewSection() {
    // Placeholder images for before redesign - update paths as needed
    const beforeImages = [
        { src: "/assets/projects/medical-office/before-1.png", alt: "Tela anterior 1" },
        { src: "/assets/projects/medical-office/before-2.png", alt: "Tela anterior 2" },
        { src: "/assets/projects/medical-office/before-3.png", alt: "Tela anterior 3" },
    ];

    return (
        <ChapterSection id="previous-view" className="bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative">
                <BigNumber number="05" className="-top-20 -right-10 md:-right-20" />

                <div className="relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <RevealText>
                            <span className="text-medical-primary font-medium text-sm uppercase tracking-widest mb-4 block">
                                {projectData.ui.sections.previousView.label}
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2
                                className="text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1] mb-6"
                            >
                                {projectData.ui.sections.previousView.title}
                            </h2>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <div className="w-24 h-1 bg-gradient-to-r from-medical-dark to-medical-light rounded-full mx-auto mb-6" />
                        </RevealText>
                        <RevealText delay={0.3}>
                            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                                {projectData.previousView.desc}
                            </p>
                        </RevealText>
                    </div>

                    {/* Image Gallery */}
                    {/* Image Gallery */}
                    <div className="flex flex-col gap-8 lg:gap-10">
                        {/* First Image - Full Width */}
                        <RevealText delay={0.2}>
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="group w-full"
                            >
                                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/20 border border-slate-200 bg-white p-2 md:p-3">
                                    <img
                                        src={beforeImages[0].src}
                                        alt={beforeImages[0].alt}
                                        className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.01]"
                                        loading="lazy"
                                    />
                                </div>
                            </motion.div>
                        </RevealText>

                        {/* Second Row - Flexbox for equal height */}
                        <div className="flex flex-col md:flex-row gap-8 lg:gap-10">
                            {/* Image 2 - AR ~1.395 */}
                            <div className="md:flex-[1.395] min-w-0">
                                <RevealText delay={0.3} className="h-full">
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="group h-full"
                                    >
                                        <div className="rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/20 border border-slate-200 bg-white p-2 md:p-3 h-full">
                                            <img
                                                src={beforeImages[1].src}
                                                alt={beforeImages[1].alt}
                                                className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.01]"
                                                loading="lazy"
                                            />
                                        </div>
                                    </motion.div>
                                </RevealText>
                            </div>

                            {/* Image 3 - AR ~2.097 */}
                            <div className="md:flex-[2.097] min-w-0">
                                <RevealText delay={0.4} className="h-full">
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="group h-full"
                                    >
                                        <div className="rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/20 border border-slate-200 bg-white p-2 md:p-3 h-full">
                                            <img
                                                src={beforeImages[2].src}
                                                alt={beforeImages[2].alt}
                                                className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.01]"
                                                loading="lazy"
                                            />
                                        </div>
                                    </motion.div>
                                </RevealText>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ChapterSection>
    );
}

// Product Vision Section (Visão de Produto)
function ProductVisionSection() {
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
        <ChapterSection id="product-vision" className="bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative">
                <BigNumber number="06" className="-top-20 -left-10 md:-left-20" />

                <div className="relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-12 md:mb-16">
                        <RevealText>
                            <span className="text-medical-primary font-medium text-sm uppercase tracking-widest mb-4 block">
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
                            <div className="w-24 h-1 bg-gradient-to-r from-medical-dark to-medical-light rounded-full mx-auto mb-6" />
                        </RevealText>
                        <RevealText delay={0.3}>
                            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                                {projectData.ui.sections.productVision.desc}
                            </p>
                        </RevealText>
                    </div>

                    {/* Image Carousel */}
                    <div className="mt-16 md:mt-24 relative">
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
                                    {[
                                        "/assets/projects/medical-office/visao-de-produto/Frame 182.png",
                                        "/assets/projects/medical-office/visao-de-produto/Frame 183.png",
                                        "/assets/projects/medical-office/visao-de-produto/Frame 185.png",
                                        "/assets/projects/medical-office/visao-de-produto/Frame 189.png",
                                        "/assets/projects/medical-office/visao-de-produto/Frame 190.png",
                                        "/assets/projects/medical-office/visao-de-produto/flow.png", // Added flow image
                                        "/assets/projects/medical-office/visao-de-produto/image 11.png",
                                        "/assets/projects/medical-office/visao-de-produto/image 14.png",
                                        "/assets/projects/medical-office/visao-de-produto/image 18.png",
                                        "/assets/projects/medical-office/visao-de-produto/image 20.png"
                                    ].map((img, index) => (
                                        <CarouselItem key={index} className="pl-4 md:basis-1/2">
                                            <div className="p-1">
                                                <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50 aspect-video bg-slate-100 relative group">
                                                    <img
                                                        src={img}
                                                        alt={`Carousel Image ${index + 1}`}
                                                        className={`w-full h-full ${img.includes('flow.png') ? 'object-contain p-2' : 'object-cover'} transition-transform duration-500 group-hover:scale-105`}
                                                    />
                                                    <div className="absolute inset-0 bg-medical-dark/0 group-hover:bg-medical-dark/10 transition-colors duration-300" />
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
                                        className={`h-2 rounded-full transition-all duration-300 ${index + 1 === current ? "bg-medical-primary w-6" : "bg-slate-300 w-2"
                                            }`}
                                    />
                                ))}
                            </div>
                        </RevealText>
                    </div>

                    {/* 2x2 Grid */}
                    <div className="grid md:grid-cols-2 gap-6 md:gap-8 relative mt-16 md:mt-24">
                        {/* O que É */}
                        <RevealText delay={0.2}>
                            <div className="p-8 rounded-3xl bg-gradient-to-br from-medical-primary/5 via-white to-medical-primary/10 border border-medical-primary/30 h-full">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-medical-primary flex items-center justify-center">
                                        <CheckCircle2 className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-slate-900" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                        {projectData.productVision.whatItIs.title}
                                    </h3>
                                </div>
                                <ul className="space-y-3">
                                    {projectData.productVision.whatItIs.items.map((item: string, index: number) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-medical-primary mt-2 flex-shrink-0" />
                                            <span className="text-base text-slate-600">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </RevealText>

                        {/* O que NÃO É */}
                        <RevealText delay={0.3}>
                            <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-50 via-white to-slate-50/30 border border-slate-200 h-full">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-slate-400 flex items-center justify-center">
                                        <XCircle className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-slate-900" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                        {projectData.productVision.whatItIsNot.title}
                                    </h3>
                                </div>
                                <ul className="space-y-3">
                                    {projectData.productVision.whatItIsNot.items.map((item: string, index: number) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                                            <span className="text-base text-slate-600">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </RevealText>

                        {/* O que FAZ */}
                        <RevealText delay={0.4}>
                            <div className="p-8 rounded-3xl bg-gradient-to-br from-medical-primary/5 via-white to-medical-primary/10 border border-medical-primary/30 h-full">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-medical-primary flex items-center justify-center">
                                        <Zap className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-slate-900" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                        {projectData.productVision.whatItDoes.title}
                                    </h3>
                                </div>
                                <ul className="space-y-3">
                                    {projectData.productVision.whatItDoes.items.map((item: string, index: number) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-medical-primary mt-2 flex-shrink-0" />
                                            <span className="text-base text-slate-600">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </RevealText>

                        {/* O que NÃO FAZ */}
                        <RevealText delay={0.5}>
                            <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-50 via-white to-slate-50/30 border border-slate-200 h-full">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-slate-400 flex items-center justify-center">
                                        <Ban className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-slate-900" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                        {projectData.productVision.whatItDoesNot.title}
                                    </h3>
                                </div>
                                <ul className="space-y-3">
                                    {projectData.productVision.whatItDoesNot.items.map((item: string, index: number) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                                            <span className="text-base text-slate-600">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </RevealText>
                    </div>

                </div>
            </div>
        </ChapterSection>
    );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function MedicalOffice() {
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
                <DiscoveriesSection />
                <PreviousViewSection />
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
