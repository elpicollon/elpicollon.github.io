import { motion, useScroll, useSpring, useTransform, useInView, useMotionTemplate } from 'motion/react';
import { useRef, useEffect, ReactNode, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Target, Zap, Users, CheckCircle2, Lightbulb, Search, LayoutGrid, Settings, Brain, Database, Share2, TrendingUp, Gauge, BadgeDollarSign, Rocket, ShieldCheck, Code, BarChart3 } from 'lucide-react';
import { MinimalNav } from '../MinimalNav';
import { FooterNew } from '../FooterNew';
import { ScrollToTop } from '../ScrollToTop';
import { ParticleBackground } from '../ParticleBackground';
import { RealisticMacBook } from '../RealisticMacBook';
import { ProjectCTAFooter } from './ProjectCTAFooter';
import { AudioMiniPlayer } from '../AudioMiniPlayer';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from '../../hooks/useTranslation';

// ============================================================================
// PROJECT DATA - using translations
// ============================================================================

function useProjectData() {
    const { translations } = useLanguage();
    const p = translations.projects?.transcricoesIA;

    if (!p) {
        // Fallback to PT-BR hardcoded data
        return {
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
                    { titulo: "Tela Inicial", descricao: "Interface construída sobre o Design System da Leads2b, assegurando consistência visual e reduzindo a curva de aprendizado do usuário.", imagens: ["/assets/projects/transcricoes-insights-ia/1.png"] },
                    { titulo: "Video & Transcrição", descricao: "Visualização imersiva com painel lateral de dados. A estrutura sincroniza a reprodução do vídeo com a transcrição e insights de IA, centralizando todo o contexto da reunião em uma única view.", imagens: ["/assets/projects/transcricoes-insights-ia/2.png"] },
                    { titulo: "Smart Insights", descricao: "Interface unificada que integra o player de vídeo e os Smart Insights. O layout permite consumo simultâneo de transcrições, comentários e insights de IA, eliminando a troca de abas e mantendo o foco no conteúdo.", imagens: ["/assets/projects/transcricoes-insights-ia/3.png"] },
                    { titulo: "Compartilhamento Ágil", descricao: "Fluxo de envio otimizado para a inclusão rápida de múltiplos destinatários. A interface garante que o conhecimento gerado na reunião chegue às pessoas certas com poucos cliques, eliminando a necessidade de redigir e-mails.", imagens: ["/assets/projects/transcricoes-insights-ia/4.png"] },
                    { titulo: "Design = Conversão", descricao: "Utilização do padrão de Teaser(blur) para funcionalidades avançadas. A interface revela a estrutura da informação (Smart Insights), mas restringe o detalhe. Isso mostra a capacidade da ferramenta ao mesmo tempo que gera fricção intencional para incentivar o upgrade.", imagens: ["/assets/projects/transcricoes-insights-ia/6.png"] },
                    { titulo: "Insights = Conversão", descricao: "Ferramenta de agendamento de atividades integrada à tela, reduzindo o time-to-action. O usuário pode agendar follow-ups no momento em que identifica uma oportunidade, eliminando a alternância entre abas e ferramentas de calendário externas.", imagens: ["/assets/projects/transcricoes-insights-ia/7.png"] },
                    { titulo: "Experiência Cross-Media", descricao: "Aplicação do mesmo modelo visual de videochamadas para gravações de áudio, garantindo que a inteligência de vendas, como transcrição e análise de IA, seja acessível e visualmente coerente, independentemente do canal de origem.", imagens: ["/assets/projects/transcricoes-insights-ia/8.png"] },
                    { titulo: "Email Viral de Aquisição", descricao: "E-mail de resumo como uma ferramenta de Product-Led Growth. Ao entregar valor imediato (insights e transcrição) para os clientes dos nossos clientes, utilizamos o acesso ao conteúdo completo como gatilho estratégico para atrair novos cadastros e expandir a base de usuários organicamente.", imagens: ["/assets/projects/transcricoes-insights-ia/10.png"] }
                ]
            },
            handoff: {
                titulo: "Design Handoff",
                descricao: "Seguindo a técnica Shift-Left que preza pelo envolvimento da Engenharia desde a ideação para alinhar escopo, stack e prazos, eliminamos o risco de prototipar soluções inviáveis, garantimos fluidez do desenvolvimento e reduzimos drasticamente o ruído de comunicação durante o handoff.",
                bullets: [
                    "Navegação: Frames agrupados por funcionalidade lógica",
                    "Consistência: Componentes locais isolados para facilitar manutenção",
                    "Semântica: Sistema de anotações visuais (Info, Atenção, Importante) e fluxogramas integrados para cobrir regras de negócio não visíveis no protótipo, minimizando dúvidas técnicas"
                ],
                imagem: "/assets/projects/transcricoes-insights-ia/handoff.gif"
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
            telas: p.prototipo.telas.map((t: { titulo: string; descricao: string }, i: number) => ({
                titulo: t.titulo,
                descricao: t.descricao,
                imagens: [`/assets/projects/transcricoes-insights-ia/${[1, 2, 3, 4, 6, 7, 8, 10][i]}.png`]
            }))
        },
        handoff: {
            titulo: p.handoff.titulo,
            descricao: p.handoff.descricao,
            bullets: p.handoff.bullets,
            imagem: "/assets/projects/transcricoes-insights-ia/handoff.gif"
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
                <ParticleBackground color="teal" />
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
                                    <span className="text-sm font-medium uppercase tracking-wider">{t('projects.transcricoesIA.ui.backButton')}</span>
                                </Link>
                            </motion.div>

                            {/* Title */}
                            <div className="hero-title-container mt-0 lg:mt-24 mb-6 md:mb-10 overflow-hidden w-full">
                                <h1 className="flex flex-col gap-2">
                                    <span className="hero-title-mobile text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1]">
                                        {t('projects.transcricoesIA.ui.heroTitle.line1')}
                                    </span>
                                    <span className="hero-title-mobile text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1]">
                                        {t('projects.transcricoesIA.ui.heroTitle.line2')}
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
                                <div className="px-6 py-3 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm ring-1 ring-white/50">
                                    <span className="text-sm md:text-base font-medium text-slate-600">
                                        Product Design
                                    </span>
                                </div>
                                <div className="px-6 py-3 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm ring-1 ring-white/50">
                                    <span className="text-sm md:text-base font-medium text-slate-600">
                                        {t('projects.transcricoesIA.ui.aiTag')}
                                    </span>
                                </div>
                                <div className="px-6 py-3 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm ring-1 ring-white/50">
                                    <span className="text-sm md:text-base font-medium text-slate-600">
                                        2024
                                    </span>
                                </div>
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
                                    src="/assets/projects/transcricoes-insights-ia/cover.png"
                                    alt={t('projects.transcricoesIA.ui.heroAlt')}
                                    className="w-full h-full object-cover"
                                    loading="eager"
                                />
                                {/* Overlay to match the design vibe */}
                                <div className="absolute inset-0 bg-teal-500/10 mix-blend-overlay pointer-events-none" />
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
                            <span className="text-teal-600 font-medium text-sm uppercase tracking-widest mb-4 block">
                                {t('projects.transcricoesIA.ui.sections.overview.label')}
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2
                                className="text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1] mb-6"
                            >
                                {t('projects.transcricoesIA.ui.sections.overview.title')}
                            </h2>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-teal-300 rounded-full" />
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
                            <div className="h-full p-8 md:p-10 rounded-3xl bg-gradient-to-br from-teal-50 via-white to-teal-50/30 border border-teal-100 hover:border-teal-200 transition-all duration-500 hover:shadow-xl hover:shadow-teal-100/50">
                                {/* Icon */}
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-teal-500/25">
                                    <Target className="w-7 h-7 text-white" />
                                </div>

                                {/* Title */}
                                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                    {t('projects.transcricoesIA.ui.sections.overview.objetivo')}
                                </h3>

                                {/* Decorative Line */}
                                <div className="w-12 h-0.5 bg-gradient-to-r from-teal-400 to-transparent rounded-full mb-6" />

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
                                    {t('projects.transcricoesIA.ui.sections.overview.desafio')}
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
    const { t } = useTranslation();
    return (
        <ChapterSection id="role" className="bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative">
                <BigNumber number="02" className="-top-20 -right-10 md:-right-20" />

                <div className="relative z-10 grid lg:grid-cols-2 gap-16 lg:gap-24">
                    <div>
                        <RevealText>
                            <span className="text-teal-600 font-medium text-sm uppercase tracking-widest mb-4 block">
                                {t('projects.transcricoesIA.ui.sections.role.label')}
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2
                                className="text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1] mb-8"
                            >
                                {t('projects.transcricoesIA.ui.sections.role.title')}
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
    const { t } = useTranslation();
    return (
        <ChapterSection id="research" className="bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative">
                <BigNumber number="03" className="-top-20 -left-10 md:-left-20" />

                <div className="relative z-10">
                    <div className="lg:max-w-xl mb-10">
                        <RevealText>
                            <span className="text-teal-600 font-medium text-sm uppercase tracking-widest mb-4 block">
                                {t('projects.transcricoesIA.ui.sections.research.label')}
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2
                                className="text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1] mb-6"
                            >
                                {t('projects.transcricoesIA.ui.sections.research.title')}
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
    const { t } = useTranslation();
    return (
        <ChapterSection id="discoveries" className="bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative">
                <BigNumber number="04" className="-top-20 -right-10 md:-right-20" />

                <div className="relative z-10">
                    <div className="text-center mb-10">
                        <RevealText>
                            <span className="text-teal-600 font-medium text-sm uppercase tracking-widest mb-4 block">
                                {t('projects.transcricoesIA.ui.sections.discoveries.label')}
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2
                                className="text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1] mb-6"
                            >
                                {t('projects.transcricoesIA.ui.sections.discoveries.title')}
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

// Prototype Section - Alternating Layout
function PrototypeSection() {
    const { t } = useTranslation();
    const telas = projectData.prototipo.telas;

    return (
        <ChapterSection id="prototype" className="bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative">
                <BigNumber number="05" className="-top-20 -right-10 md:-right-20" />

                <div className="relative z-10">
                    {/* Section Header */}
                    <div className="lg:max-w-xl mb-16 md:mb-24">
                        <RevealText>
                            <span className="text-teal-600 font-medium text-sm uppercase tracking-widest mb-4 block">
                                {t('projects.transcricoesIA.ui.sections.prototype.label')}
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2
                                className="text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1] mb-6"
                            >
                                {t('projects.transcricoesIA.ui.sections.prototype.title')}
                            </h2>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-teal-300 rounded-full" />
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
                                                <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 text-white font-bold text-base md:text-lg shadow-lg shadow-teal-500/25">
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
                                                <div className="w-10 md:w-12 h-0.5 bg-gradient-to-r from-teal-400 to-transparent rounded-full" />

                                                {/* Description */}
                                                <p className="text-sm md:text-lg text-slate-600 leading-relaxed">
                                                    {tela.descricao}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Image - Shows second on mobile */}
                                        <div className={`w-full ${index === 7 ? 'md:w-[50%]' : 'md:w-[70%]'} flex-shrink-0 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
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
    const { t } = useTranslation();
    return (
        <ChapterSection id="handoff" className="bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative">
                <BigNumber number="06" className="-top-20 -right-10 md:-right-20" />

                <div className="relative z-10">
                    {/* Section Header */}
                    <div className="lg:max-w-xl mb-16 md:mb-24">
                        <RevealText>
                            <span className="text-teal-600 font-medium text-sm uppercase tracking-widest mb-4 block">
                                {t('projects.transcricoesIA.ui.sections.handoff.label')}
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
                            <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-teal-300 rounded-full" />
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
                                                <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
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
    const { t } = useTranslation();
    return (
        <ChapterSection id="results" className="bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative">
                <BigNumber number="07" className="-top-20 -right-10 md:-right-20" />

                <div className="relative z-10">
                    <div className="lg:max-w-xl mb-10">
                        <RevealText>
                            <span className="text-emerald-600 font-medium text-sm uppercase tracking-widest mb-4 block">
                                {t('projects.transcricoesIA.ui.sections.results.label')}
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2
                                className="text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1] mb-6"
                            >
                                {t('projects.transcricoesIA.ui.sections.results.title')}
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
    const { t } = useTranslation();
    return (
        <ChapterSection id="lessons" className="bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative">
                <BigNumber number="08" className="-top-20 -left-10 md:-left-20" />

                <div className="relative z-10">
                    <div className="text-center mb-10">
                        <RevealText>
                            <span className="text-purple-600 font-medium text-sm uppercase tracking-widest mb-4 block">
                                {t('projects.transcricoesIA.ui.sections.lessons.label')}
                            </span>
                        </RevealText>
                        <RevealText delay={0.1}>
                            <h2
                                className="text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1] mb-6"
                            >
                                {t('projects.transcricoesIA.ui.sections.lessons.title')}
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

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function TranscricoesInsightsIA() {
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
