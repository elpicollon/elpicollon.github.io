import { motion, useScroll, useSpring, useTransform, useInView, useMotionTemplate } from 'motion/react';
import { useRef, useEffect, ReactNode, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Target, Zap, Users, CheckCircle2, Lightbulb, Search, Settings, Share2, Gauge, ShieldCheck, Code, Palette, Layout, Smartphone, FileCheck, Layers, Compass, ClipboardList, PenTool } from 'lucide-react';
import { MinimalNav } from '../MinimalNav';
import { FooterNew } from '../FooterNew';
import { ScrollToTop } from '../ScrollToTop';
import { ParticleBackground } from '../ParticleBackground';
import { RealisticMacBook } from '../RealisticMacBook';
import { ProjectCTAFooter } from './ProjectCTAFooter';

// ============================================================================
// PROJECT DATA
// ============================================================================

const projectData = {
    title: "Redesign Medical Office",
    category: "UX Design",
    year: "2021",

    resumo: <>Redesign UI/UX da plataforma web Medical Office, que conecta profissionais de saúde sem espaço próprio a clínicas com capacidade ociosa.<br />O objetivo principal foi redesenhar a interface, torná-la responsiva e aprimorar a usabilidade, mantendo uma experiência familiar para os usuários já existentes. O processo incluiu um workshop de Lean Inception, definição de visão do produto, criação de personas e mapeamento de jornadas do usuário.</>,

    objetivo: <>A Medical Office é uma plataforma web que conecta profissionais de saúde iniciantes que não possuem espaço físico para atuação, com proprietários de consultórios que possuem espaços ociosos.<br />Dessa forma, busca suprir a demanda de múltiplos profissionais, viabilizando a geração de renda aos proprietários através do aluguel, ao mesmo tempo que permite aos profissionais iniciantes atuarem em um espaço totalmente equipado.</>,

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
        { title: "Visão do Produto", desc: "Definição do que o produto é, não é, faz e não faz para evitar ambiguidades e definir escopo." },
        { title: "Personas", desc: "Criação de três perfis de usuário: Administrador, Locador e Locatário, com suas necessidades específicas." },
    ],

    descobertas: [
        { title: "Benchmarking", desc: "Análise de plataformas como Airbnb, Booking e QuintoAndar para identificar padrões de mercado e reduzir fricções." },
        { title: "Fluxos de Usuário", desc: "Criação de fluxogramas detalhados indicando o caminho desde o ponto inicial até o objetivo final de cada jornada." },
        { title: "Débito Técnico", desc: "Identificação de limitações técnicas que impactaram o redesign, exigindo ajustes no escopo de algumas rotinas." },
        { title: "Cadastro Problemático", desc: "O fluxo anterior era moroso com formulário extenso; implementamos processo passo a passo mais intuitivo." },
    ],

    prototipo: {
        telas: [
            {
                titulo: "Landing Page",
                descricao: "A landing page foi reformulada com base nas diretrizes definidas pelos stakeholders, mantendo o estilo visual desejado pelos fundadores sem comprometer os padrões do style guide nem os critérios de usabilidade.",
                imagens: ["/assets/projects/medical-office/1.png"]
            },
            {
                titulo: "Plataforma Web",
                descricao: "Algumas limitações de débito técnico impactaram o redesign. Por isso, determinadas rotinas passaram por ajustes visuais para alinhar com o novo padrão, enquanto outras puderam ser totalmente reconstruídas.",
                imagens: ["/assets/projects/medical-office/2.png"]
            },
            {
                titulo: "Cadastro de Espaços",
                descricao: "Implementamos um fluxo de cadastro passo a passo, mais intuitivo e visualmente agradável. Essa abordagem trouxe leveza a uma etapa naturalmente mais densa, tornando o processo mais claro para o usuário.",
                imagens: ["/assets/projects/medical-office/3.png"]
            },
            {
                titulo: "Templates de Email",
                descricao: "Desenvolvemos templates de e-mail personalizados para os três tipos de usuários. Todos os eventos que demandam interação passaram a seguir um padrão de comunicação, fortalecendo a identidade da marca.",
                imagens: ["/assets/projects/medical-office/4.png"]
            },
            {
                titulo: "Plataforma Mobile",
                descricao: "Grande parte da versão anterior não era responsiva. Com o redesign, todo o layout foi projetado com foco na responsividade, garantindo experiência consistente independentemente do dispositivo.",
                imagens: ["/assets/projects/medical-office/5.png"]
            },
            {
                titulo: "Style Guide",
                descricao: "Foi criado um style guide componentizado, pensado para facilitar tanto a criação quanto a manutenção futura da interface, seguindo diretrizes definidas com o time de marketing.",
                imagens: ["/assets/projects/medical-office/6.png"]
            }
        ]
    },

    handoff: {
        titulo: "Handoff Design-Dev",
        descricao: "Atuamos de forma colaborativa desde as etapas iniciais de prototipação, definindo um escopo viável com base na stack tecnológica e no tempo disponível para o projeto. Eventuais limitações técnicas eram identificadas e ajustadas ainda na fase de prototipação.",
        bullets: [
            "Colaboração: Envolvimento da engenharia desde a fase de ideação",
            "Viabilidade: Apenas rotinas viáveis e refinadas encaminhadas para desenvolvimento",
            "Comunicação: Processo promove integração fluida entre designers e desenvolvedores"
        ],
        imagem: "/assets/projects/medical-office/handoff.png"
    },

    resultados: [
        { title: "Responsividade Total", desc: "Toda a plataforma passou a funcionar perfeitamente em dispositivos móveis, resolvendo uma das principais limitações da versão anterior." },
        { title: "Experiência Otimizada", desc: "O novo fluxo de cadastro passo a passo reduziu significativamente a fricção e abandono durante o registro de consultórios." },
        { title: "Identidade Visual", desc: "Templates de email e style guide criaram um padrão de comunicação consistente, fortalecendo a marca." },
        { title: "Longevidade do Design", desc: "A plataforma segue em funcionamento até hoje com o mesmo visual de 2021, validando a robustez do design implementado." },
    ],

    licoes: [
        { title: "Design Adaptável", desc: "Considerar futuras modificações e expansões faz parte do planejamento de qualquer redesign - o design deve ser um organismo vivo." },
        { title: "Colaboração Early", desc: "O envolvimento precoce da engenharia garantiu que apenas soluções viáveis fossem prototipadas, eliminando retrabalho." },
        { title: "Concessões Estratégicas", desc: "Algumas concessões de design foram necessárias para atender aos stakeholders, sem comprometer usabilidade." },
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
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-300 origin-left z-50"
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
            {/* Background with particle effect */}
            <div className="absolute inset-0 z-0">
                <ParticleBackground color="blue" />
                {/* Soft gradient for depth */}
                <div className="absolute inset-0 bg-gradient-radial from-blue-500/5 via-transparent to-transparent pointer-events-none" />
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
                                    className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors group"
                                >
                                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                    <span className="text-sm font-medium uppercase tracking-wider">Voltar</span>
                                </Link>
                            </motion.div>

                            {/* Title */}
                            <div className="hero-title-container mt-0 lg:mt-24 mb-6 md:mb-10 overflow-hidden w-full">
                                <div className="flex flex-col gap-2">
                                    <h1 className="hero-title-mobile text-5xl sm:text-6xl md:text-8xl font-semibold text-[#0f172a] tracking-tight leading-[1.1]">
                                        Redesign
                                    </h1>
                                    <h1 className="hero-title-mobile text-5xl sm:text-6xl md:text-8xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#4088FF] to-[#2563eb] tracking-tight leading-[1.1]">
                                        Medical Office
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
                                        UI Design
                                    </span>
                                </div>
                                <div className="px-6 py-3 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm ring-1 ring-white/50">
                                    <span className="text-sm md:text-base font-medium text-slate-600">
                                        2021
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

                    {/* Right Side - MacBook Mockup (extends beyond screen) */}
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
                                    src="/assets/projects/medical-office/cover.png"
                                    alt="Capa do Projeto: Redesign Medical Office"
                                    className="w-full h-full object-cover"
                                />
                                {/* Overlay to match the design vibe */}
                                <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay pointer-events-none" />
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
                            <span className="text-blue-600 font-medium text-sm uppercase tracking-widest mb-4 block">
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
                            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full" />
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
                            <div className="h-full p-8 md:p-10 rounded-3xl bg-gradient-to-br from-blue-50 via-white to-blue-50/30 border border-blue-100 hover:border-blue-200 transition-all duration-500 hover:shadow-xl hover:shadow-blue-100/50">
                                {/* Icon */}
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-blue-500/25">
                                    <Target className="w-7 h-7 text-white" />
                                </div>

                                {/* Title */}
                                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                    Visão Geral
                                </h3>

                                {/* Decorative Line */}
                                <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-transparent rounded-full mb-6" />

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
                            <span className="text-blue-600 font-medium text-sm uppercase tracking-widest mb-4 block">
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
                            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full" />
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
                                        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                                            <IconComponent className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
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
                            <span className="text-blue-600 font-medium text-sm uppercase tracking-widest mb-4 block">
                                Descoberta & Definição
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
                            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full" />
                        </RevealText>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {projectData.processoPesquisa.map((item, index) => (
                            <RevealText key={index} delay={0.2 + index * 0.1}>
                                <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:border-blue-300 transition-colors group">
                                    <div className="flex items-start gap-4">
                                        <span className="text-6xl font-bold text-slate-200 group-hover:text-blue-200 transition-colors leading-none" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
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
                            <span className="text-blue-600 font-medium text-sm uppercase tracking-widest mb-4 block">
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
                            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full mx-auto" />
                        </RevealText>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {projectData.descobertas.map((item, index) => {
                            const icons = [Compass, Layers, Settings, ClipboardList];
                            const IconComponent = icons[index] || Lightbulb;
                            return (
                                <RevealText key={index} delay={0.2 + index * 0.1}>
                                    <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-blue-300 transition-all group h-full shadow-sm hover:shadow-md">
                                        <div className="flex items-center gap-3 mb-4">
                                            <IconComponent className="w-6 h-6 text-blue-600" />
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

// Prototype Section - Alternating Layout
function PrototypeSection() {
    const telas = projectData.prototipo.telas;

    return (
        <ChapterSection id="prototype" className="bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative">
                <BigNumber number="05" className="-top-20 -right-10 md:-right-20" />

                <div className="relative z-10">
                    {/* Section Header */}
                    <div className="lg:max-w-xl mb-16 md:mb-24">
                        <RevealText>
                            <span className="text-blue-600 font-medium text-sm uppercase tracking-widest mb-4 block">
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
                            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full" />
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
                                                <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-base md:text-lg shadow-lg shadow-blue-500/25">
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
                                                <div className="w-10 md:w-12 h-0.5 bg-gradient-to-r from-blue-400 to-transparent rounded-full" />

                                                {/* Description */}
                                                <p className="text-sm md:text-lg text-slate-600 leading-relaxed">
                                                    {tela.descricao}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Image - Shows second on mobile */}
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
                    {/* Section Header */}
                    <div className="lg:max-w-xl mb-16 md:mb-24">
                        <RevealText>
                            <span className="text-blue-600 font-medium text-sm uppercase tracking-widest mb-4 block">
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
                            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full" />
                        </RevealText>
                    </div>

                    {/* Content - Text + Image */}
                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-stretch">
                        {/* Text */}
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
                                                <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-base text-slate-600">
                                                    <strong className="font-semibold text-slate-700">{title}:</strong> {description}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </RevealText>
                        </div>

                        {/* Image */}
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
                            const icons = [Smartphone, Gauge, Palette, ShieldCheck];
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
                                Insights e Reflexões
                            </h2>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-purple-300 rounded-full mx-auto" />
                        </RevealText>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {projectData.licoes.map((item, index) => {
                            const icons = [Layout, Code, Share2];
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

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function MedicalOffice() {
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

                <ProjectCTAFooter />
            </main>

            <FooterNew />
            <ScrollToTop />
        </div>
    );
}
