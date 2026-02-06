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
    Sparkles
} from 'lucide-react';
import { MinimalNav } from '../MinimalNav';
import { FooterNew } from '../FooterNew';
import { ScrollToTop } from '../ScrollToTop';
import { ParticleBackground } from '../ParticleBackground';
import { HeroParticleGrid } from '../HeroParticleGrid';
import { useContactModal } from '../../contexts/ContactModalContext';
import imgEu1 from "../../assets/image-rp.png";
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useAboutPageData, ExperienceItem, EducationItem, HighlightCardItem, CertificationItem, EventItem, AboutPageData } from '../../hooks/useAboutPageData';

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
                    className="text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1] mb-6"
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

type TimelineItem = (ExperienceItem | EducationItem);

function TimelineCard({ item, index, isLeft, currentLabel }: { item: TimelineItem; index: number; isLeft: boolean; currentLabel: string }) {
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
                                {'current' in item && item.current && (
                                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700 flex items-center gap-1">
                                        <Sparkles size={10} />
                                        {currentLabel}
                                    </span>
                                )}
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-tight">
                                {'role' in item ? item.role : item.degree}
                            </h3>
                        </div>
                    </div>

                    {/* Details */}
                    <div className={`space-y-1 text-sm text-slate-600 ${isLeft ? 'md:text-right' : ''}`}>
                        <div className={`flex items-center gap-2 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                            <Building2 size={14} className={`${isWork ? 'text-purple-500' : 'text-violet-500'} flex-shrink-0`} />
                            <span className="font-medium">{'company' in item ? item.company : item.institution}</span>
                        </div>
                        {'location' in item && item.location && (
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

function Timeline({ items, currentLabel }: { items: TimelineItem[]; currentLabel: string }) {
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
                        currentLabel={currentLabel}
                    />
                ))}
            </div>
        </div>
    );
}

// ============================================================================
// QUEM SOU SECTION
// ============================================================================

function HighlightCard({ item, index }: { item: HighlightCardItem; index: number }) {
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

function QuemSouSection({ data }: { data: AboutPageData }) {
    return (
        <section className="py-20 md:py-32 bg-white px-6 md:px-12">
            <div>
                {/* Header */}
                <div className="mb-16">
                    <RevealText>
                        <span className="text-purple-600 font-medium text-sm uppercase tracking-widest mb-4 block">
                            {data.quemSou.label}
                        </span>
                    </RevealText>
                    <RevealText delay={0.1}>
                        <h2
                            className="text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1] mb-6"
                        >
                            {data.quemSou.title1} <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-500">
                                {data.quemSou.title2}
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
                            {data.quemSou.intro.map((paragraph, index) => (
                                <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                            ))}
                        </div>
                    </RevealText>

                    {/* Right: Achievement Highlights */}
                    <RevealText delay={0.4}>
                        <div className="bg-gradient-to-br from-purple-50 via-white to-violet-50 rounded-3xl p-8 border border-purple-100">
                            <h3 className="text-xl font-bold text-slate-900 mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                {data.quemSou.highlightsTitle}
                            </h3>
                            <ul className="space-y-4">
                                {data.quemSou.highlights.map((item, index) => (
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
                        {data.quemSou.definesMe}
                    </h3>
                </RevealText>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.highlightCards.map((item, index) => (
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

function CertificationBadge({ cert, index }: { cert: CertificationItem; index: number }) {
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

function EventCard({ event, index }: { event: EventItem; index: number }) {
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

function CTAButtons({ data }: { data: AboutPageData }) {
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
                {data.cta.contactButton}
            </motion.button>
            <motion.button
                onClick={() => navigate(-1)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-purple-600 hover:text-purple-700 font-medium whitespace-nowrap cursor-pointer"
            >
                <ArrowLeft size={18} />
                {data.cta.backButton}
            </motion.button>
        </div>
    );
}

// ============================================================================
// HERO SECTION
// ============================================================================

function HeroSection({ data }: { data: AboutPageData }) {
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
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f2f4f7] isolate pt-24 lg:pt-0"
        >
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <ParticleBackground color="purple" />
                <div className="absolute inset-0 bg-gradient-radial from-purple-500/5 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="relative z-10 w-full px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center">
                    {/* Left Content */}
                    <motion.div style={{ y, opacity }} className="relative">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col items-start"
                        >
                            {/* Back Button */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="relative lg:absolute lg:top-0 lg:left-0 z-20 mb-2 lg:mb-0"
                            >
                                <button
                                    onClick={() => navigate(-1)}
                                    className="inline-flex items-center gap-2 text-slate-500 hover:text-purple-500 transition-colors group cursor-pointer"
                                    type="button"
                                >
                                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                    <span className="text-sm font-medium uppercase tracking-wider">{data.common.back}</span>
                                </button>
                            </motion.div>

                            {/* Title */}
                            <div className="hero-title-container mt-0 lg:mt-24 mb-6 md:mb-10 overflow-hidden w-full">
                                <motion.h1
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1] mb-2"
                                >
                                    {data.hero.title1}
                                </motion.h1>
                                <motion.h1
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                    className="text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1]"
                                >
                                    {data.hero.title2}
                                </motion.h1>
                            </div>

                            {/* Subtitle */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-lg md:text-xl text-slate-600 max-w-xl mb-8"
                            >
                                {data.hero.subtitle}
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
            </motion.div>
        </section >
    );
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export function AboutPage() {
    const data = useAboutPageData();

    // Scroll to top on page load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#f2f4f7]">
            <MinimalNav />

            {/* Hero */}
            <HeroSection data={data} />

            {/* Quem Sou */}
            <QuemSouSection data={data} />

            {/* Palestras & Eventos */}
            <section className="py-20 md:py-32 bg-slate-50 px-6 md:px-12">
                <div>
                    <SectionHeader label={data.sections.eventsLabel} title={data.sections.eventsTitle} />
                    <div className="flex flex-wrap justify-center gap-6">
                        {data.events.map((event, index) => (
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
                    <SectionHeader label={data.sections.experienceLabel} title={data.sections.experienceTitle} />
                    <Timeline items={data.experience} currentLabel={data.common.current} />
                </div>
            </section>

            {/* Education */}
            <section className="py-20 md:py-32 bg-slate-50 px-6 md:px-12">
                <div>
                    <SectionHeader label={data.sections.educationLabel} title={data.sections.educationTitle} />
                    <Timeline items={data.education} currentLabel={data.common.current} />
                </div>
            </section>

            {/* Certifications */}
            <section className="py-20 md:py-32 bg-white px-6 md:px-12">
                <div>
                    <SectionHeader label={data.sections.certificationsLabel} title={data.sections.certificationsTitle} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data.certifications.map((cert, index) => (
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
                                {data.cta.title}
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                {data.cta.description}
                            </p>
                        </div>

                        <CTAButtons data={data} />
                    </motion.div>
                </div>
            </section>

            <FooterNew />
            <ScrollToTop />
        </div>
    );
}
