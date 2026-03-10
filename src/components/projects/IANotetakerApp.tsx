// IANotetakerApp Project Page
import { motion, useScroll, useSpring, useTransform, useInView, useMotionTemplate, AnimatePresence } from 'motion/react';
import { useRef, useEffect, ReactNode, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, Zap, Compass, LayoutGrid, Smartphone, MessageSquare, Mic, ShieldCheck, TrendingUp, Lightbulb, CheckCircle2, Sparkles, Search } from 'lucide-react';
import { MinimalNav } from '../MinimalNav';
import { FooterNew } from '../FooterNew';
import { ScrollToTop } from '../ScrollToTop';
import { ParticleBackground } from '../ParticleBackground';
import { RealisticIphone } from '../RealisticIphone';
import { ProjectCTAFooter } from './ProjectCTAFooter';
import { AudioMiniPlayer } from '../AudioMiniPlayer';
import { ScrollIndicator } from '../ui/ScrollIndicator';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from '../../hooks/useTranslation';

// ============================================================================
// PROJECT DATA - using translations
// ============================================================================

function useProjectData() {
    const { translations } = useLanguage();
    const p = translations.projects?.iaNotetakerApp;

    if (!p) {
        // Fallback to PT-BR hardcoded data
        return {
            title: "IA Notetaker - App Leads2b",
            category: "Product Design",
            year: "2025",
            resumo: <>Expansão do ecossistema do Meetnotes (IA para transcrição e insights) para o ambiente mobile, focando na captação de áudio e inteligência de vendas para equipes em campo (porta-a-porta e visitas presenciais).</>,
            objetivo: <>Descentralizar a captura de dados de reuniões, levando o poder da documentação automatizada para fora das videochamadas. O foco foi transformar o smartphone do vendedor em um assistente de captação ágil, eliminando a dependência de computadores e a perda de informações no trabalho de campo.</>,
            desafio: <>Desenhar uma interface de baixa fricção que respeitasse a imprevisibilidade do ambiente externo. Era preciso garantir que a gravação e a vinculação de dados ao CRM fossem quase instantâneas, não interrompendo o fluxo natural de uma conversa presencial, além de lidar com limitações de hardware (bateria, oscilação de rede e interrupções do sistema).</>,
            meuPapel: [
                { title: "Estratégia e Contexto", desc: "Redefinição do Job-to-be-Done (de 'consumo denso em vídeo' na web para 'captação ágil em áudio' no mobile)." },
                { title: "Arquitetura de Informação", desc: "Desenho de fluxos enxutos para vinculação de gravações a negócios (deals) em andamento ou criação instantânea de novos." },
                { title: "Design de Interação e Edge Cases", desc: "Mapeamento de cenários de erro e interrupção (ex: chamadas recebidas durante a gravação, gestão de estado offline/online)." },
                { title: "UI e Carga Cognitiva", desc: "Adaptação da leitura de transcrições longas para o modelo mental de aplicativos de mensagens." },
            ],
            prototipo: {
                telas: [
                    { titulo: "Áudio-First: Foco na Captação", descricao: "Diferente da versão web, o contexto mobile exigiu a remoção deliberada da interface de vídeo. O app foca exclusivamente em áudio. Essa decisão estratégica não apenas simplificou a interface, reduzindo a carga cognitiva, mas também otimizou o consumo de bateria e processamento do dispositivo do vendedor em campo.", imagens: ["/assets/projects/ia-notetaker-app/1.webp"] },
                    { titulo: "Criação de Negócios On-the-Fly", descricao: "Vendedores porta-a-porta não têm tempo para fluxos complexos. Integramos o acesso ao CRM diretamente na tela de gravação. O usuário pode vincular a conversa a um Deal existente ou criar um novo negócio instantaneamente. A inteligência do sistema permite ainda reconhecer participantes pelo tom de voz, automatizando a ata da reunião antes mesmo do vendedor voltar para o carro.", imagens: ["/assets/projects/ia-notetaker-app/2.webp"] },
                    { titulo: "Transcrições com Modelo Mental de Chat", descricao: "Apresentar blocos densos de texto gerados por IA em uma tela de celular quebra a experiência de leitura. A solução foi refatorar a visualização dos insights e falas utilizando o padrão de design de aplicativos de mensagens (balões, alinhamentos e cores sutis). Isso permitiu diferenciar os falantes rapidamente, garantindo escaneabilidade e conforto visual.", imagens: ["/assets/projects/ia-notetaker-app/3.webp"] },
                    { titulo: "Resiliência: Lidando com o Caos do Mundo Real", descricao: "O design previu as interrupções naturais do mobile. Se o vendedor recebe uma ligação, o app pausa a gravação automaticamente, protegendo o contexto sem perda de dados. Além disso, estruturamos os estados da interface para lidar com oscilações da rede 4G, garantindo que o áudio seja salvo localmente e sincronizado com o processamento da IA na nuvem apenas quando houver estabilidade, mitigando a ansiedade do usuário.", imagens: ["/assets/projects/ia-notetaker-app/4.webp"] },
                ]
            },
            resultados: [
                { title: "Captura do 'Funil Invisível'", desc: "Reuniões físicas, que antes dependiam da memória do vendedor ou de anotações manuais precárias, passaram a gerar dados estruturados, enriquecendo o CRM com transcrições precisas." },
                { title: "Adoção sem Fricção", desc: "A simplicidade do modelo 'gravar e vincular' reduziu a barreira de entrada para vendedores externos, transformando o celular em uma ferramenta de inteligência competitiva em tempo real." },
            ],
            licoes: [
                { title: "Contexto dita a Interface", desc: "Tentar espelhar a densidade da versão web no mobile seria um erro crasso. Entender que o vendedor em campo precisa de um 'capturador' (e não de um painel de análise complexo) foi o divisor de águas para o sucesso da usabilidade." },
                { title: "Design para a Imperfeição", desc: "Trabalhar com áudio no mobile ensina que o sistema nunca atua em condições ideais. Projetar os estados intermediários (pausas forçadas, ausência de rede, processamento em background) é tão importante quanto desenhar a 'tela feliz'." },
                { title: "Familiaridade Acelera a Adoção", desc: "Reutilizar o modelo visual de mensageria (balões de chat) para a leitura de transcrições provou que não precisamos reinventar a roda quando já existe um padrão mental consolidado no dia a dia do usuário." },
            ]
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
        prototipo: {
            telas: p.prototipo.telas.map((t: { titulo: string; descricao: string }, i: number) => {
                return {
                    titulo: t.titulo,
                    descricao: t.descricao,
                    imagens: [`/assets/projects/ia-notetaker-app/${i + 1}.webp`]
                };
            })
        },
        resultados: p.resultados,
        licoes: p.licoes
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
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-notetaker-primary to-notetaker-light origin-left z-50"
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
            className={`absolute font-bold text-[12rem] md:text-[18rem] lg:text-[24rem] text-slate-900 select-none pointer-events-none leading-none font-display ${className}`}
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
    const { t } = useTranslation();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

    // Mockup slide animation
    const mockupXRaw = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const mockupXSpring = useSpring(mockupXRaw, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const mockupX = useMotionTemplate`${mockupXSpring}%`;

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f2f4f7] z-50 isolate mobile-tiny-fix pt-24 lg:pt-0"
        >
            {/* Geometric Gradient Background */}
            <AnimatePresence mode="wait">
                <motion.div
                    key="notetaker-gradient"
                    className="hero-gradient-bg bg-gradient-to-br from-notetaker-dark to-notetaker-light"
                    initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
                    animate={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 0% 100%)' }}
                    exit={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 0% 100%)' }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                >
                    <div className="hero-diagonal-shadow" />
                </motion.div>
            </AnimatePresence>

            {/* Background with particle effect */}
            <div className="absolute inset-0 z-0">
                <ParticleBackground color="notetaker" />
                <div className="absolute inset-0 bg-gradient-radial from-notetaker-primary/5 via-transparent to-transparent pointer-events-none" />
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
                                    className="inline-flex items-center gap-2 text-slate-500 hover:text-notetaker-primary transition-colors group"
                                >
                                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                    <span className="text-sm font-medium uppercase tracking-wider">{t('projects.iaNotetakerApp.ui.backButton')}</span>
                                </Link>
                            </motion.div>

                            {/* Title */}
                            <div className="hero-title-container mt-0 lg:mt-24 mb-6 md:mb-10 overflow-hidden w-full">
                                <h1 className="flex flex-col gap-2">
                                    <span className="hero-title-mobile text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1]">
                                        {t('projects.iaNotetakerApp.ui.heroTitle.line1')}
                                    </span>
                                    <span className="hero-title-mobile text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1]">
                                        {t('projects.iaNotetakerApp.ui.heroTitle.line2')}
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
                                <div className="px-6 py-3 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm ring-1 ring-white/50">
                                    <span className="text-sm md:text-base font-medium text-slate-600">
                                        Product Design
                                    </span>
                                </div>
                                <div className="px-6 py-3 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm ring-1 ring-white/50">
                                    <span className="text-sm md:text-base font-medium text-slate-600">
                                        {t('projects.iaNotetakerApp.ui.mobileAppTag')}
                                    </span>
                                </div>
                                <div className="px-6 py-3 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm ring-1 ring-white/50">
                                    <span className="text-sm md:text-base font-medium text-slate-600">
                                        2025
                                    </span>
                                </div>
                            </motion.div>

                            {/* Mobile Scroll Indicator */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 1 }}
                                className="flex md:hidden mt-4"
                            >
                                <ScrollIndicator className="items-start" />
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - iPhone Mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="hidden lg:flex items-center justify-center relative"
                        style={{ x: mockupX }}
                    >
                        <RealisticIphone className="w-[280px] xl:w-[320px]">
                            <div className="w-full h-full bg-black overflow-hidden relative">
                                <img
                                    src="/assets/projects/ia-notetaker-app/capa.webp"
                                    alt={t('projects.iaNotetakerApp.ui.heroAlt')}
                                    className="w-full h-full object-cover"
                                    loading="eager"
                                />
                                <div className="absolute inset-0 bg-notetaker-primary/10 mix-blend-overlay pointer-events-none" />
                            </div>
                        </RealisticIphone>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator - Desktop */}
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
    const { t } = useTranslation();
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
                            <span className="text-notetaker-primary font-medium text-sm uppercase tracking-widest mb-4 block">
                                {t('projects.iaNotetakerApp.ui.sections.overview.label')}
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2 className="text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1] mb-6">
                                {t('projects.iaNotetakerApp.ui.sections.overview.title')}
                            </h2>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <div className="w-24 h-1 bg-gradient-to-r from-notetaker-primary to-notetaker-light rounded-full" />
                        </RevealText>
                    </div>

                    {/* Resumo */}
                    <RevealText delay={0.3}>
                        <div className="mb-16 md:mb-20">
                            <p className="text-lg text-slate-600 leading-relaxed text-justify">
                                {projectData.resumo}
                            </p>
                        </div>
                    </RevealText>

                    {/* Objetivo & Desafio */}
                    <div ref={ref} className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        <motion.div
                            initial={{ opacity: 0, y: 60 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="group"
                        >
                            <div className="h-full p-8 md:p-10 rounded-3xl bg-gradient-to-br from-notetaker-primary/5 via-white to-notetaker-primary/10 border border-notetaker-primary/20 hover:border-notetaker-primary/40 transition-all duration-500 hover:shadow-xl hover:shadow-notetaker-primary/20">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-notetaker-primary to-notetaker-dark flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-notetaker-primary/25">
                                    <Target className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 font-display">
                                    {t('projects.iaNotetakerApp.ui.sections.overview.objetivo')}
                                </h3>
                                <div className="w-12 h-0.5 bg-gradient-to-r from-notetaker-light to-transparent rounded-full mb-6" />
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
                            <div className="h-full p-8 md:p-10 rounded-3xl bg-gradient-to-br from-notetaker-primary/5 via-white to-notetaker-primary/10 border border-notetaker-primary/20 hover:border-notetaker-primary/40 transition-all duration-500 hover:shadow-xl hover:shadow-notetaker-primary/20">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-notetaker-primary to-notetaker-dark flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-notetaker-primary/25">
                                    <Zap className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 font-display">
                                    {t('projects.iaNotetakerApp.ui.sections.overview.desafio')}
                                </h3>
                                <div className="w-12 h-0.5 bg-gradient-to-r from-notetaker-light to-transparent rounded-full mb-6" />
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
    const { t } = useTranslation();
    return (
        <ChapterSection id="role" className="bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative">
                <BigNumber number="02" className="-top-20 -right-10 md:-right-20" />

                <div className="relative z-10 grid lg:grid-cols-2 gap-16 lg:gap-24">
                    <div>
                        <RevealText>
                            <span className="text-notetaker-primary font-medium text-sm uppercase tracking-widest mb-4 block">
                                {t('projects.iaNotetakerApp.ui.sections.role.label')}
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2 className="text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1] mb-8">
                                {t('projects.iaNotetakerApp.ui.sections.role.title')}
                            </h2>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <div className="w-24 h-1 bg-gradient-to-r from-notetaker-primary to-notetaker-light rounded-full" />
                        </RevealText>
                    </div>

                    <div>
                        <StaggeredList
                            items={projectData.meuPapel}
                            renderItem={(item, index) => {
                                const icons = [Compass, LayoutGrid, Smartphone, MessageSquare];
                                const IconComponent = icons[index] || Sparkles;
                                return (
                                    <div className="flex gap-6 items-start group">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-notetaker-primary/10 flex items-center justify-center group-hover:bg-notetaker-primary transition-colors">
                                            <IconComponent className="w-5 h-5 text-notetaker-primary group-hover:text-white transition-colors" />
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

// Discovery Section (Placeholder)
function DiscoverySection() {
    const { t } = useTranslation();
    return (
        <ChapterSection id="discovery" className="bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative">
                <BigNumber number="03" className="-top-20 -left-10 md:-left-20" />

                <div className="relative z-10">
                    <div className="lg:max-w-xl mb-10">
                        <RevealText>
                            <span className="text-notetaker-primary font-medium text-sm uppercase tracking-widest mb-4 block">
                                {t('projects.iaNotetakerApp.ui.sections.discovery.label')}
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2 className="text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1] mb-6">
                                {t('projects.iaNotetakerApp.ui.sections.discovery.title')}
                            </h2>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <div className="w-24 h-1 bg-gradient-to-r from-notetaker-primary to-notetaker-light rounded-full" />
                        </RevealText>
                    </div>

                    {/* Placeholder Card */}
                    <RevealText delay={0.3}>
                        <div className="p-12 rounded-3xl bg-gradient-to-br from-notetaker-primary/5 via-white to-notetaker-light/10 border border-notetaker-primary/15 border-dashed flex flex-col items-center justify-center text-center min-h-[200px]">
                            <div className="w-16 h-16 rounded-2xl bg-notetaker-primary/10 flex items-center justify-center mb-6">
                                <Search className="w-8 h-8 text-notetaker-primary/50" />
                            </div>
                            <p className="text-lg text-slate-400 font-medium">
                                {t('projects.iaNotetakerApp.ui.sections.discovery.placeholder')}
                            </p>
                        </div>
                    </RevealText>
                </div>
            </div>
        </ChapterSection>
    );
}

// Prototype Section - Strategy & Solution
function PrototypeSection() {
    const { t } = useTranslation();
    const telas = projectData.prototipo.telas;

    return (
        <ChapterSection id="prototype" className="bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative">
                <BigNumber number="04" className="-top-20 -right-10 md:-right-20" />

                <div className="relative z-10">
                    {/* Section Header */}
                    <div className="lg:max-w-xl mb-16 md:mb-24">
                        <RevealText>
                            <span className="text-notetaker-primary font-medium text-sm uppercase tracking-widest mb-4 block">
                                {t('projects.iaNotetakerApp.ui.sections.prototype.label')}
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2 className="text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1] mb-6">
                                {t('projects.iaNotetakerApp.ui.sections.prototype.title')}
                            </h2>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <div className="w-24 h-1 bg-gradient-to-r from-notetaker-primary to-notetaker-light rounded-full" />
                        </RevealText>
                    </div>

                    {/* Alternating Screen Rows */}
                    <div className="space-y-24 md:space-y-32">
                        {telas.map((tela, index) => {
                            const isEven = index % 2 === 0;

                            return (
                                <RevealText key={index} delay={0.1}>
                                    <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center justify-center">
                                        {/* Text Content */}
                                        <div className={`w-full md:w-[55%] flex-shrink-0 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                                            <div className="space-y-3 md:space-y-4">
                                                {/* Number Badge */}
                                                <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-notetaker-primary to-notetaker-dark text-white font-bold text-base md:text-lg shadow-lg shadow-notetaker-primary/25">
                                                    {String(index + 1).padStart(2, '0')}
                                                </div>

                                                {/* Title */}
                                                <h3
                                                    className="text-xl md:text-3xl font-bold text-slate-900 font-display"
                                                >
                                                    {tela.titulo}
                                                </h3>

                                                {/* Decorative Line */}
                                                <div className="w-10 md:w-12 h-0.5 bg-gradient-to-r from-notetaker-light to-transparent rounded-full" />

                                                {/* Description */}
                                                <p className="text-sm md:text-lg text-slate-600 leading-relaxed">
                                                    {tela.descricao}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Image - iPhone Mockup */}
                                        <div className={`w-full md:w-[45%] flex-shrink-0 flex justify-center ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                                            <motion.div
                                                whileHover={{ scale: 1.02 }}
                                                transition={{ duration: 0.4, ease: "easeOut" }}
                                                className="group"
                                            >
                                                <RealisticIphone className="w-[220px] md:w-[260px]">
                                                    <img
                                                        src={tela.imagens[0]}
                                                        alt={tela.titulo}
                                                        className="w-full h-full object-cover"
                                                        loading="lazy"
                                                    />
                                                </RealisticIphone>
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

// Results Section
function ResultsSection() {
    const { t } = useTranslation();
    return (
        <ChapterSection id="results" className="bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative">
                <BigNumber number="05" className="-top-20 -right-10 md:-right-20" />

                <div className="relative z-10">
                    <div className="lg:max-w-xl mb-10">
                        <RevealText>
                            <span className="text-notetaker-primary font-medium text-sm uppercase tracking-widest mb-4 block">
                                {t('projects.iaNotetakerApp.ui.sections.results.label')}
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2 className="text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1] mb-6">
                                {t('projects.iaNotetakerApp.ui.sections.results.title')}
                            </h2>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <div className="w-24 h-1 bg-gradient-to-r from-notetaker-primary to-notetaker-primary/60 rounded-full" />
                        </RevealText>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {projectData.resultados.map((item, index) => {
                            const icons = [TrendingUp, CheckCircle2];
                            const IconComponent = icons[index] || Sparkles;
                            return (
                                <RevealText key={index} delay={0.2 + index * 0.1}>
                                    <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:border-notetaker-primary hover:bg-gradient-to-br hover:from-notetaker-primary/5 hover:to-white transition-all group h-full">
                                        <div className="flex items-center gap-3 mb-4">
                                            <IconComponent className="w-6 h-6 text-slate-400 group-hover:text-notetaker-primary transition-colors" />
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

// Lessons Section (Análise Crítica)
function LessonsSection() {
    const { t } = useTranslation();
    return (
        <ChapterSection id="lessons" className="bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative">
                <BigNumber number="06" className="-top-20 -left-10 md:-left-20" />

                <div className="relative z-10">
                    <div className="text-center mb-10">
                        <RevealText>
                            <span className="text-notetaker-primary font-medium text-sm uppercase tracking-widest mb-4 block">
                                {t('projects.iaNotetakerApp.ui.sections.lessons.label')}
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2 className="text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1] mb-6">
                                {t('projects.iaNotetakerApp.ui.sections.lessons.title')}
                            </h2>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <div className="w-24 h-1 bg-gradient-to-r from-notetaker-primary to-notetaker-primary/60 rounded-full mx-auto" />
                        </RevealText>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {projectData.licoes.map((item, index) => {
                            const icons = [Lightbulb, ShieldCheck, Mic];
                            const IconComponent = icons[index] || Sparkles;
                            return (
                                <RevealText key={index} delay={0.2 + index * 0.1}>
                                    <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-notetaker-primary transition-colors group text-center h-full">
                                        <div className="w-16 h-16 rounded-2xl bg-notetaker-primary/20 flex items-center justify-center mx-auto mb-6 group-hover:bg-notetaker-primary transition-colors">
                                            <IconComponent className="w-7 h-7 text-notetaker-primary group-hover:text-white transition-colors" />
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

export function IANotetakerApp() {
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
                <DiscoverySection />
                <PrototypeSection />
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
