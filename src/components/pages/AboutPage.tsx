import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { useRef, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Briefcase,
    GraduationCap,
    Award,
    MapPin,
    Building2,
    Sparkles,
    Lightbulb,
    Users,
    Target,
    Layers,
    Code,
    Mic
} from 'lucide-react';
import { MinimalNav } from '../MinimalNav';
import { FooterNew } from '../FooterNew';
import { ScrollToTop } from '../ScrollToTop';
import { ParticleBackground } from '../ParticleBackground';
import { HeroParticleGrid } from '../HeroParticleGrid';
import { useContactModal } from '../../contexts/ContactModalContext';
import imgEu1 from "../../assets/image-rp.png";
import { ImageWithFallback } from '../figma/ImageWithFallback';

// ============================================================================
// DATA
// ============================================================================

const experienceData = [
    {
        period: "Fev 2014 – Atual",
        role: "Fundador",
        company: "Picolo Design Digital",
        location: "Remoto",
        type: "work" as const,
        current: true
    },
    {
        period: "Ago 2025 – Atual",
        role: "Product Designer",
        company: "Sisand",
        location: "Remoto",
        type: "work" as const,
        current: true
    },
    {
        period: "Jul 2025 – Atual",
        role: "Professor Universitário",
        company: "Centro Universitário Mater Dei (Unimater)",
        location: "Pato Branco, PR",
        type: "work" as const,
        current: true
    },
    {
        period: "Ago 2022 – Abr 2025",
        role: "Senior Product Designer",
        company: "Leads2b",
        location: "Remoto",
        type: "work" as const
    },
    {
        period: "Mai 2021 – Ago 2022",
        role: "Product Designer",
        company: "INDT - Instituto de Desenvolvimento Tecnológico",
        location: "Remoto",
        type: "work" as const
    },
    {
        period: "Fev 2020 – Jun 2021",
        role: "Analista UX",
        company: "Sponte - Software de Gestão Escolar",
        location: "Pato Branco, PR",
        type: "work" as const
    },
    {
        period: "Out 2016 – Jan 2020",
        role: "Analista de Requisitos",
        company: "VIASOFT",
        location: "Pato Branco, PR",
        type: "work" as const
    },
    {
        period: "Fev 2014 – Set 2016",
        role: "Analista de Suporte",
        company: "VIASOFT",
        location: "Pato Branco, PR",
        type: "work" as const
    }
];

const educationData = [
    {
        period: "2018 – 2020",
        degree: "Pós-graduação em Design Digital e Multimídia",
        institution: "Estácio",
        type: "education" as const
    },
    {
        period: "2014 – 2017",
        degree: "Bacharelado em Sistemas de Informação",
        institution: "Faculdade Mater Dei (Unimater)",
        type: "education" as const
    },
    {
        period: "2012 – 2013",
        degree: "Curso Técnico em Informática",
        institution: "SENAI Paraná",
        type: "education" as const
    }
];

const certifications = [
    { name: "Product Delivery & Scrum", org: "Bruna Fonseca", year: "2025" },
    { name: "IA/UX Lab Workshop", org: "UX Unicórnio", year: "2025" },
    { name: "UX Metrics", org: "PunkMetrics", year: "2025" },
    { name: "Product Design 4.0", org: "BTX Consultoria", year: "2025" },
    { name: "Liderança em Design", org: "BTX Consultoria", year: "2025" },
    { name: "Formação em Liderança", org: "Escola Conquer", year: "2023" },
    { name: "Métricas de Negócios Digitais", org: "PM3", year: "2023" },
    { name: "Product Design 2.0 - PLG", org: "BTX Consultoria", year: "2022" },
    { name: "Design System Specialist", org: "Meiuca", year: "2022" },
    { name: "Certified Lean Inception Facilitator", org: "Caroli.org", year: "2021" },
    { name: "Avaliação de Usabilidade", org: "UFRGS", year: "2021" },
    { name: "Scrum Foundation & DevOps", org: "Certiprof", year: "2020" }
];

const eventsData = [
    {
        title: "Processo de Redesign Petroshow PDV",
        subtitle: "DevConference - 2018",
        image: "/assets/about/evento-1.png"
    },
    {
        title: "Workshop Fundamentos de Prototipagem",
        subtitle: "Sponte/Medplus - 2020",
        image: "/assets/about/evento-2.png"
    },
    {
        title: "UX Design: Na Prática, a Teoria é Outra!",
        subtitle: "Unimater - 2022",
        image: "/assets/about/evento-3.png"
    },
    {
        title: "Design Thinking: MeetUp",
        subtitle: "Viasoft - 2019",
        image: "/assets/about/evento-4.jpg"
    },
    {
        title: "Design Thinking: Seu aliado no desenvolvimento",
        subtitle: "Viasoft Connect - 2019",
        image: "/assets/about/evento-5.jpg"
    }
];

// ============================================================================
// ANIMATED COMPONENTS
// ============================================================================

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

function SectionHeader({ label, title }: { label: string; title: string }) {
    return (
        <div className="mb-12 md:mb-16">
            <RevealText>
                <span className="text-purple-600 font-medium text-sm uppercase tracking-widest mb-4 block">
                    {label}
                </span>
            </RevealText>
            <RevealText delay={0.1}>
                <h2
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-6"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                    {title}
                </h2>
            </RevealText>
            <RevealText delay={0.2}>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-purple-300 rounded-full" />
            </RevealText>
        </div>
    );
}

// ============================================================================
// TIMELINE COMPONENT
// ============================================================================

interface TimelineItem {
    period: string;
    role?: string;
    degree?: string;
    company?: string;
    institution?: string;
    location?: string;
    type: 'work' | 'education';
    current?: boolean;
}

function TimelineCard({ item, index, isLeft }: { item: TimelineItem; index: number; isLeft: boolean }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const isWork = item.type === 'work';
    const Icon = isWork ? Briefcase : GraduationCap;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            className={`relative flex items-center gap-6 md:gap-8 ${isLeft ? 'md:flex-row-reverse md:text-right' : ''}`}
        >
            {/* Timeline dot */}
            <div className={`
        absolute left-0 md:left-1/2 md:-translate-x-1/2 
        w-4 h-4 rounded-full border-4 border-white shadow-lg z-10
        ${isWork ? 'bg-purple-500' : 'bg-violet-500'}
      `} />

            {/* Content Card */}
            <div className={`
        ml-8 md:ml-0 md:w-[calc(50%-2rem)] 
        ${isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}
      `}>
                <div className={`
          p-6 rounded-2xl border transition-all duration-300 group
          hover:shadow-xl hover:scale-[1.02]
          ${isWork
                        ? 'bg-gradient-to-br from-purple-50 via-white to-purple-50/30 border-purple-100 hover:border-purple-300 hover:shadow-purple-100/50'
                        : 'bg-gradient-to-br from-violet-50 via-white to-violet-50/30 border-violet-100 hover:border-violet-300 hover:shadow-violet-100/50'
                    }
        `}>
                    {/* Header */}
                    <div className={`flex items-start gap-4 mb-4 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                        <div className={`
              w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
              ${isWork ? 'bg-purple-100 text-purple-600' : 'bg-violet-100 text-violet-600'}
              group-hover:scale-110 transition-transform duration-300
            `}>
                            <Icon size={24} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className={`flex items-center gap-2 mb-1 flex-wrap ${isLeft ? 'md:justify-end' : ''}`}>
                                <span className={`
                  text-xs font-medium px-2 py-0.5 rounded-full
                  ${isWork ? 'bg-purple-100 text-purple-700' : 'bg-violet-100 text-violet-700'}
                `}>
                                    {item.period}
                                </span>
                                {item.current && (
                                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700 flex items-center gap-1">
                                        <Sparkles size={10} />
                                        Atual
                                    </span>
                                )}
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-tight">
                                {item.role || item.degree}
                            </h3>
                        </div>
                    </div>

                    {/* Details */}
                    <div className={`space-y-1 text-sm text-slate-600 ${isLeft ? 'md:text-right' : ''}`}>
                        <div className={`flex items-center gap-2 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                            <Building2 size={14} className={`${isWork ? 'text-purple-500' : 'text-violet-500'} flex-shrink-0`} />
                            <span className="font-medium">{item.company || item.institution}</span>
                        </div>
                        {item.location && (
                            <div className={`flex items-center gap-2 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                                <MapPin size={14} className="text-slate-400 flex-shrink-0" />
                                <span>{item.location}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function Timeline({ items }: { items: TimelineItem[] }) {
    return (
        <div className="relative max-w-4xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-[7px] md:left-1/2 md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-300 via-violet-200 to-slate-200" />

            {/* Items */}
            <div className="space-y-8 md:space-y-12">
                {items.map((item, index) => (
                    <TimelineCard
                        key={index}
                        item={item}
                        index={index}
                        isLeft={index % 2 === 0}
                    />
                ))}
            </div>
        </div>
    );
}

// ============================================================================
// QUEM SOU SECTION
// ============================================================================

const highlightCards = [
    {
        icon: Target,
        title: "Foco em Resultados",
        description: "Design centrado no usuário que impulsiona métricas de negócio tangíveis",
        color: "purple"
    },
    {
        icon: Layers,
        title: "Sistemas Complexos",
        description: "Especialista em ERP, SaaS, CRM e estratégias de Product-Led Growth",
        color: "violet"
    },
    {
        icon: Users,
        title: "Liderança & Colaboração",
        description: "Facilitação de workshops, gestão de times e comunicação com stakeholders",
        color: "purple"
    },
    {
        icon: Code,
        title: "Base Técnica Sólida",
        description: "Conhecimento em linguagens de programação, HTML/CSS e banco de dados para entregas viáveis",
        color: "violet"
    },
    {
        icon: Lightbulb,
        title: "Resolução de Problemas",
        description: "Transformo requisitos densos em experiências funcionais e escaláveis",
        color: "purple"
    },
    {
        icon: Mic,
        title: "Educador & Palestrante",
        description: "Professor universitário e palestrante em eventos de tecnologia",
        color: "violet"
    }
];

function HighlightCard({ item, index }: { item: typeof highlightCards[0]; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-30px" });
    const Icon = item.icon;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`group relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-${item.color}-300 hover:shadow-xl hover:shadow-${item.color}-100/30 transition-all duration-300`}
        >
            {/* Icon */}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-${item.color}-100 text-${item.color}-600 group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={24} />
            </div>

            {/* Content */}
            <h4 className="text-lg font-bold text-slate-900 mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {item.title}
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
                {item.description}
            </p>
        </motion.div>
    );
}

function QuemSouSection() {
    return (
        <section className="py-20 md:py-32 bg-white px-6 md:px-12">
            <div>
                {/* Header */}
                <div className="mb-16">
                    <RevealText>
                        <span className="text-purple-600 font-medium text-sm uppercase tracking-widest mb-4 block">
                            Quem Sou
                        </span>
                    </RevealText>
                    <RevealText delay={0.1}>
                        <h2
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-6"
                            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                        >
                            Design que conecta <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-500">
                                tecnologia e negócios
                            </span>
                        </h2>
                    </RevealText>
                    <RevealText delay={0.2}>
                        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-purple-300 rounded-full" />
                    </RevealText>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
                    {/* Left: Introduction Text */}
                    <RevealText delay={0.3}>
                        <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                            <p>
                                Com mais de <strong className="text-slate-900">12 anos em tecnologia</strong> e <strong className="text-slate-900">7 anos como Product Designer</strong>, sou especialista em Design Digital para plataformas web, mobile e aplicativos. Minha paixão é criar experiências digitais impactantes que atendam às necessidades dos usuários e impulsionem resultados de negócio.
                            </p>
                            <p>
                                Meu perfil é <strong className="text-slate-900">analítico, proativo e orientado a resultados</strong>, com domínio em pesquisa de usuário, prototipagem de alta fidelidade e Design Systems. Atuo em ambientes ágeis com Scrum e Kanban, e sou <strong className="text-slate-900">facilitador certificado em Lean Inception</strong>.
                            </p>
                            <p>
                                Meu diferencial está na capacidade de resolver problemas complexos e atuar como <strong className="text-slate-900">elo facilitador entre equipes</strong>, garantindo que a estratégia de design seja compreendida e aplicada com clareza por todos.
                            </p>
                        </div>
                    </RevealText>

                    {/* Right: Achievement Highlights */}
                    <RevealText delay={0.4}>
                        <div className="bg-gradient-to-br from-purple-50 via-white to-violet-50 rounded-3xl p-8 border border-purple-100">
                            <h3 className="text-xl font-bold text-slate-900 mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                Destaques da Trajetória
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    "🏆 1º lugar no Hackathon da Educação - Feira Inventum 2019",
                                    "🎓 Professor Universitário em UX/UI Design",
                                    "🎤 Palestrante em eventos como DevConference e Viasoft Connect",
                                    "📜 16 certificações em Design, Liderança e Produto",
                                    "🚀 Experiência com ERPs, SaaS, CRM e PLG"
                                ].map((item, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex items-start gap-3 text-slate-700"
                                    >
                                        <span className="text-lg">{item.substring(0, 2)}</span>
                                        <span>{item.substring(3)}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </RevealText>
                </div>

                {/* Competency Cards */}
                <RevealText delay={0.5}>
                    <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        O que me define
                    </h3>
                </RevealText>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {highlightCards.map((item, index) => (
                        <HighlightCard key={index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// CERTIFICATION BADGE
// ============================================================================

function CertificationBadge({ cert, index }: { cert: typeof certifications[0]; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-30px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group relative bg-zinc-50 border border-zinc-200 rounded-3xl p-8 hover:bg-zinc-100 transition-all duration-500 overflow-hidden cursor-default h-full"
        >
            {/* Animated Gradient Blob */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
                <div className="mb-4 inline-flex p-3 rounded-2xl bg-white border border-zinc-200 group-hover:border-purple-500/30 group-hover:bg-purple-500/10 transition-all duration-500 w-fit">
                    <Award className="w-6 h-6 text-zinc-500 group-hover:text-purple-600 transition-colors duration-500" />
                </div>

                <h4 className="text-xl font-medium text-zinc-900 group-hover:text-black transition-colors duration-500 mb-2">
                    {cert.name}
                </h4>

                <p className="text-zinc-600 group-hover:text-zinc-800 transition-colors duration-500 text-base leading-relaxed mb-3">
                    {cert.org}
                </p>

                <span className="mt-auto inline-block text-sm font-medium px-3 py-1 rounded-full bg-zinc-200/50 text-zinc-600 w-fit">
                    {cert.year}
                </span>
            </div>
        </motion.div>
    );
}

// ============================================================================
// EVENT CARD
// ============================================================================

function EventCard({ event, index }: { event: typeof eventsData[0]; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-30px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer"
        >
            {/* Image */}
            <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="text-2xl font-bold text-white mb-1 group-hover:translate-y-0 transition-transform duration-300 drop-shadow-lg">
                    {event.title}
                </h4>
                <p className="text-sm text-white/80 group-hover:text-white transition-colors duration-300 drop-shadow-md">
                    {event.subtitle}
                </p>
            </div>

            {/* Hover Border Effect */}
            <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-purple-500/50 transition-colors duration-300 pointer-events-none" />
        </motion.div>
    );
}


// ============================================================================
// CTA BUTTONS
// ============================================================================

function CTAButtons() {
    const { openModal } = useContactModal();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center gap-4 mt-4">
            <motion.button
                onClick={openModal}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-purple-600 text-white rounded-full hover:bg-purple-500 transition-all font-medium shadow-lg shadow-purple-300/50 whitespace-nowrap cursor-pointer"
            >
                Entre em Contato
            </motion.button>
            <motion.button
                onClick={() => navigate(-1)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-purple-600 hover:text-purple-700 font-medium whitespace-nowrap cursor-pointer"
            >
                <ArrowLeft size={18} />
                Voltar
            </motion.button>
        </div>
    );
}

// ============================================================================
// HERO SECTION
// ============================================================================

function HeroSection() {
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f2f4f7] pt-24"
        >
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <ParticleBackground color="purple" />
                <div className="absolute inset-0 bg-gradient-radial from-purple-500/5 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="relative z-10 w-full px-6 md:px-12 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center">
                    {/* Left Content */}
                    <motion.div style={{ y, opacity }}>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col items-start"
                        >
                            {/* Back Button */}
                            <motion.button
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                onClick={() => navigate(-1)}
                                className="inline-flex items-center gap-2 text-slate-500 hover:text-purple-500 transition-colors group mb-6 cursor-pointer"
                            >
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                <span className="text-sm font-medium uppercase tracking-wider">Voltar</span>
                            </motion.button>

                            {/* Title */}
                            <div className="mb-8">
                                <motion.h1
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-4"
                                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                                >
                                    Minha
                                </motion.h1>
                                <motion.h1
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-500 tracking-tight leading-[1.1]"
                                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                                >
                                    Trajetória
                                </motion.h1>
                            </div>

                            {/* Subtitle */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-lg md:text-xl text-slate-600 max-w-xl mb-8"
                            >
                                Conheça minha jornada profissional, formação acadêmica e as certificações que moldam minha atuação.
                            </motion.p>
                        </motion.div>
                    </motion.div>

                    {/* Right - Photo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative w-96 h-[480px]">
                            {/* Decorative blur */}
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-purple-400/30 to-violet-400/30 rounded-[32px] blur-2xl scale-110" />

                            {/* Image */}
                            <div className="relative h-full w-full rounded-[32px] overflow-hidden border border-zinc-200 bg-white shadow-2xl group">
                                <ImageWithFallback
                                    src={imgEu1}
                                    alt="Rodrigo Picolo"
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
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
                <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">Scroll</span>
            </motion.div>
        </section >
    );
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export function AboutPage() {
    // Combine experience and education for timeline
    const allTimelineItems: TimelineItem[] = [...experienceData];

    // Scroll to top on page load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#f2f4f7]">
            <MinimalNav />

            {/* Hero */}
            <HeroSection />

            {/* Quem Sou */}
            <QuemSouSection />

            {/* Palestras & Eventos */}
            <section className="py-20 md:py-32 bg-slate-50 px-6 md:px-12">
                <div>
                    <SectionHeader label="Conhecimento Aplicado" title="Palestras & Eventos" />
                    <div className="flex flex-wrap justify-center gap-6">
                        {eventsData.map((event, index) => (
                            <div key={index} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                                <EventCard event={event} index={index} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Professional Experience Timeline */}
            <section className="py-20 md:py-32 bg-white px-6 md:px-12">
                <div>
                    <SectionHeader label="Experiência" title="Carreira Profissional" />
                    <Timeline items={allTimelineItems} />
                </div>
            </section>

            {/* Education */}
            <section className="py-20 md:py-32 bg-slate-50 px-6 md:px-12">
                <div>
                    <SectionHeader label="Educação" title="Formação Acadêmica" />
                    <Timeline items={educationData} />
                </div>
            </section>

            {/* Certifications */}
            <section className="py-20 md:py-32 bg-white px-6 md:px-12">
                <div>
                    <SectionHeader label="Certificações" title="Desenvolvimento Contínuo" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {certifications.map((cert, index) => (
                            <CertificationBadge key={index} cert={cert} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
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
                                Se você gostou da minha trajetória e quer discutir como posso ajudar sua equipe, entre em contato!
                            </p>
                        </div>

                        <CTAButtons />
                    </motion.div>
                </div>
            </section>

            <FooterNew />
            <ScrollToTop />
        </div>
    );
}
