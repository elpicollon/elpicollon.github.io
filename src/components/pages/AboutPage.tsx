import { motion, useInView } from 'motion/react';
import { useRef, ReactNode, useEffect } from 'react';
import { Briefcase, GraduationCap, Award, MapPin, Star } from 'lucide-react';
import {
    useAboutPageData,
    ExperienceItem,
    EducationItem,
    HighlightCardItem,
    EventItem,
    AboutPageData
} from '../../hooks/useAboutPageData';
import { useTranslation } from '../../hooks/useTranslation';
import { Arrow } from '../crt/parts';
import { ScrollIndicator } from '../ui/ScrollIndicator';
import { SectionHeader } from '../ui/SectionHeader';
import { ContactSection } from '../ui/ContactSection';
import { StatCard } from '../ui/StatCard';

// ============================================================================
// ANIMATED REVEAL COMPONENT
// ============================================================================

function RevealText({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// ============================================================================
// HERO SECTION
// ============================================================================

function AboutHeroSection({ data }: { data: AboutPageData }) {
    return (
        <div className="hero">
            <div className="wrap">
                <div className="hero-grid my-auto">
                    <div className="flex flex-col justify-center items-start w-full">
                        <RevealText delay={0.05}>
                            <h1 className="about-hero-title text-[26px] sm:text-[34px] md:text-[40px] lg:text-[48px] xl:text-[54px] font-semibold tracking-tight leading-[1.15]">
                                {data.hero.title1}<br />
                                <span className="hl">{data.hero.title2}</span>
                            </h1>
                        </RevealText>
                        <RevealText delay={0.15}>
                            <div className="cred text-[14px] sm:text-[15px] md:text-[16px] max-w-xl mt-3 sm:mt-4">
                                {data.hero.subtitle}
                            </div>
                        </RevealText>
                    </div>
                    <div className="relative flex justify-center lg:justify-end items-center w-full py-2 lg:py-0 min-h-0">
                        <RevealText delay={0.25} className="w-full flex justify-center lg:justify-end">
                            <div className="about-hero-portrait cursor-pointer my-1 sm:my-2 mx-auto lg:ml-auto lg:mr-0 shrink-0">
                                <figure className="portrait">
                                    <img src="/assets/image-rp-speaker.jpg" alt="Rodrigo Picolo" />
                                </figure>
                            </div>
                        </RevealText>
                    </div>
                </div>
            </div>

            <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none z-20">
                <ScrollIndicator />
            </div>
        </div>
    );
}

// ============================================================================
// QUEM SOU SECTION
// ============================================================================

function QuemSouSection({ data }: { data: AboutPageData }) {
    return (
        <section id="about">
            <div className="wrap">
                <SectionHeader
                    label={data.quemSou.label ? data.quemSou.label.split(' · ')[0] : "Quem sou eu"}
                    sublabel={data.quemSou.label ? data.quemSou.label.split(' · ')[1] : "minha trajetória"}
                    title={data.quemSou.title1}
                    hlTitle={data.quemSou.title2}
                    showLine={false}
                />

                <div className="quem-sou-grid">
                    {/* Left Column: 3 Credential Cards + Intro Paragraphs */}
                    <div>
                        {/* 3 Credential cards */}
                        <div className="quem-sou-cards">
                            {data.quemSou.numbers.map((num, idx) => (
                                <StatCard key={idx} value={num.title} label={num.subtitle} variant="credential" />
                            ))}
                        </div>

                        {/* Intro paragraphs */}
                        <div className="quem-sou-txt">
                            {data.quemSou.intro.map((paragraph, index) => (
                                <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Meus Destaques Card */}
                    <div>
                        <div className="exp-wrap highlights-card">
                            <div className="exp">
                                <div className="highlights-header">
                                    <div className="ic cut-icon">
                                        <Star size={18} />
                                    </div>
                                    <h3>
                                        {data.quemSou.highlightsTitle}
                                    </h3>
                                </div>
                                <ul className="highlights-list">
                                    {data.quemSou.highlights.map((item, index) => {
                                        const emoji = data.quemSou.highlightEmojis?.[index] || "🏆";
                                        return (
                                            <li key={index}>
                                                <span className="emoji">{emoji}</span>
                                                <span className="text">{item}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// O QUE ME DEFINE SECTION
// ============================================================================

function DefinesMeSection({ data }: { data: AboutPageData }) {
    return (
        <section id="defines-me">
            <div className="wrap">
                <SectionHeader title={data.quemSou.definesMe} />
                <div className="exp-grid">
                    {data.highlightCards.map((item, index) => (
                        <HighlightCard key={index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function HighlightCard({ item, index }: { item: HighlightCardItem; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-30px" });
    const Icon = item.icon;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            className="exp-wrap"
        >
            <div className="exp">
                <div className="ic mb-4">
                    <Icon size={18} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
            </div>
        </motion.div>
    );
}

// ============================================================================
// EVENTS SECTION (PALESTRAS & EVENTOS)
// ============================================================================

function EventsSection({ data }: { data: AboutPageData }) {
    return (
        <section id="palestras">
            <div className="wrap">
                <SectionHeader
                    title={data.sections.eventsTitle}
                />
                <div className="events-grid">
                    {data.events.map((event, index) => (
                        <EventCard key={index} event={event} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function EventCard({ event, index }: { event: EventItem; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-30px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="about-wcard"
        >
            <div className="media-wrap">
                <div className="media cut">
                    <img src={event.image} alt={event.title} />
                </div>
            </div>
            <div className="rowi">
                <span className="meta">{event.subtitle}</span>
                <h3>{event.title}</h3>
            </div>
        </motion.div>
    );
}

// ============================================================================
// TIMELINE COMPONENT FOR CAREER & EDUCATION
// ============================================================================

function TimelineSection({
    label,
    sublabel,
    title1,
    title2,
    items,
    currentLabel,
    showLine = true
}: {
    label: string;
    sublabel?: string;
    title1: string;
    title2: string;
    items: (ExperienceItem | EducationItem)[];
    currentLabel: string;
    showLine?: boolean;
}) {
    return (
        <section>
            <div className="wrap">
                <SectionHeader label={label} sublabel={sublabel} title={title1} hlTitle={title2} showLine={showLine} />
                <div className="timeline-log max-w-4xl">
                    {items.map((item, index) => {
                        const isCurrent = 'current' in item && item.current;
                        const isWork = item.type === 'work';
                        const Icon = isWork ? Briefcase : GraduationCap;

                        return (
                            <div key={index} className={`timeline-item ${isCurrent ? 'current' : ''}`}>
                                <div className="timeline-header flex items-center gap-3 mb-1">
                                    <div className="timeline-period">{item.period}</div>
                                    {isCurrent && <span className="chip timeline-chip">{currentLabel}</span>}
                                </div>
                                <div className="timeline-content">
                                    <h3>{'role' in item ? item.role : item.degree}</h3>
                                    <div className="timeline-details">
                                        <span>
                                            <Icon size={14} className="text-primary" />
                                            <b>{'company' in item ? item.company : item.institution}</b>
                                        </span>
                                        {'location' in item && item.location && (
                                            <span>
                                                <MapPin size={13} />
                                                {item.location}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// CERTIFICATIONS SECTION
// ============================================================================

function CertificationsSection({ data }: { data: AboutPageData }) {
    return (
        <section id="certifications">
            <div className="wrap">
                <SectionHeader
                    label={data.sections.certificationsLabel ? data.sections.certificationsLabel.split(' · ')[0] : "Certificações"}
                    sublabel={data.sections.certificationsLabel ? data.sections.certificationsLabel.split(' · ')[1] : "desenvolvimento"}
                    title={data.sections.certificationsTitle1}
                    hlTitle={data.sections.certificationsTitle2}
                    showLine={false}
                />
                <div className="exp-grid">
                    {data.certifications.map((cert, index) => (
                        <div key={index} className="exp-wrap">
                            <div className="exp flex flex-col justify-between h-full">
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-3">
                                        <span className="chip">{cert.year}</span>
                                        <Award size={16} className="text-primary" />
                                    </div>
                                    <h3>{cert.name}</h3>
                                    <p>{cert.org}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// ABOUT PAGE CONTACT SECTION
// ============================================================================

import { useAppNavigation } from '../../hooks/useAppNavigation';
import { Button } from '../ui/button';

function AboutContactSection({ data }: { data: AboutPageData }) {
    const { isPortuguese } = useTranslation();
    const { navigateToHome, navigateToSection } = useAppNavigation();

    return (
        <>
            <div className="wrap mt-16 mb-12">
                <div className="flex justify-between items-center py-4">
                    <Button
                        onClick={navigateToHome}
                        variant="ghost"
                        className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                    >
                        <span className="rotate-180 inline-block">
                            <Arrow />
                        </span>
                        {isPortuguese ? "Voltar ao Início" : "Back to Home"}
                    </Button>

                    <Button
                        onClick={() => navigateToSection("work")}
                        variant="ghost"
                        className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                    >
                        {isPortuguese ? "Ver Projetos" : "View Projects"}
                        <Arrow />
                    </Button>
                </div>
                <hr className="gradline mt-2" />
            </div>

            <ContactSection description={data.cta.description} cardWrapClassName="contact-card-wrap" />
        </>
    );
}

// ============================================================================
// MAIN ABOUT PAGE
// ============================================================================

export function AboutPage() {
    const data = useAboutPageData();

    // Scroll to section if specified or scroll to top on page load
    useEffect(() => {
        const target = sessionStorage.getItem('scroll_to_section') || (window.location.hash ? window.location.hash.replace('#', '') : null);
        if (target) {
            sessionStorage.removeItem('scroll_to_section');
            const el = document.getElementById(target);
            if (el) {
                const timer = setTimeout(() => {
                    el.scrollIntoView({ behavior: 'smooth' });
                }, 200);
                return () => clearTimeout(timer);
            }
        }
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            {/* Hero Header */}
            <AboutHeroSection data={data} />

            {/* Quem Sou */}
            <QuemSouSection data={data} />

            {/* O que me define */}
            <DefinesMeSection data={data} />

            {/* Palestras & Eventos */}
            <EventsSection data={data} />

            {/* Professional Experience Timeline */}
            <TimelineSection
                label={data.sections.experienceLabel ? data.sections.experienceLabel.split(' · ')[0] : "Profissional"}
                sublabel={data.sections.experienceLabel ? data.sections.experienceLabel.split(' · ')[1] : "Minhas Experiências"}
                title1={data.sections.experienceTitle1}
                title2={data.sections.experienceTitle2}
                items={data.experience}
                currentLabel={data.common.current}
                showLine={false}
            />

            {/* Education Timeline */}
            <TimelineSection
                label={data.sections.educationLabel ? data.sections.educationLabel.split(' · ')[0] : "Educação"}
                sublabel={data.sections.educationLabel ? data.sections.educationLabel.split(' · ')[1] : "Formação"}
                title1={data.sections.educationTitle1}
                title2={data.sections.educationTitle2}
                items={data.education}
                currentLabel={data.common.current}
                showLine={false}
            />

            {/* Certifications */}
            <CertificationsSection data={data} />

            {/* Closing Contact Call to Action */}
            <AboutContactSection data={data} />
        </>
    );
}
