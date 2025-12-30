import { useEffect, useRef, useState, ReactNode, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { RealisticMacBook } from './RealisticMacBook';
import { TealParticleBackground } from './TealParticleBackground';

export interface ProjectSection {
    id: string;
    title: string;
    subtitle?: string;
    group?: string; // For grouping sections in navigation (e.g., 'Hero', 'Visão Geral', 'Protótipo')
    leftContent: ReactNode;
    mockupContent: ReactNode;
}

interface ProjectPageLayoutProps {
    sections: ProjectSection[];
    headerContent?: ReactNode;
    footerContent?: ReactNode;
}

export function ProjectPageLayout({ sections, headerContent, footerContent }: ProjectPageLayoutProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isDesktop, setIsDesktop] = useState(false);
    const [showFooter, setShowFooter] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isScrolling = useRef(false);

    // Desktop detection
    useEffect(() => {
        const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
        checkSize();
        window.addEventListener('resize', checkSize);
        return () => window.removeEventListener('resize', checkSize);
    }, []);

    // Show scroll-to-top button after first scroll
    useEffect(() => {
        setShowScrollTop(activeIndex > 0 || showFooter);
    }, [activeIndex, showFooter]);

    // Navigate to section
    const navigateToSection = useCallback((index: number) => {
        if (index < 0 || index >= sections.length || isScrolling.current) return;

        isScrolling.current = true;
        setActiveIndex(index);
        setShowFooter(false);

        sectionRefs.current[index]?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Reset scrolling flag after animation
        setTimeout(() => {
            isScrolling.current = false;
        }, 600);
    }, [sections.length]);

    // Navigate to footer
    const navigateToFooter = useCallback(() => {
        if (isScrolling.current) return;

        isScrolling.current = true;
        setShowFooter(true);

        document.getElementById('project-footer')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        setTimeout(() => {
            isScrolling.current = false;
        }, 600);
    }, []);

    // Keyboard navigation
    useEffect(() => {
        if (!isDesktop) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
                e.preventDefault();
                if (activeIndex < sections.length - 1) {
                    navigateToSection(activeIndex + 1);
                } else if (!showFooter && footerContent) {
                    navigateToFooter();
                }
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                if (showFooter) {
                    setShowFooter(false);
                    navigateToSection(sections.length - 1);
                } else if (activeIndex > 0) {
                    navigateToSection(activeIndex - 1);
                }
            } else if (e.key === 'Home') {
                e.preventDefault();
                navigateToSection(0);
            } else if (e.key === 'End') {
                e.preventDefault();
                if (footerContent) {
                    navigateToFooter();
                } else {
                    navigateToSection(sections.length - 1);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeIndex, isDesktop, sections.length, showFooter, footerContent, navigateToSection, navigateToFooter]);

    // Wheel navigation with debounce
    useEffect(() => {
        if (!isDesktop) return;

        let wheelTimeout: NodeJS.Timeout;

        const handleWheel = (e: WheelEvent) => {
            // Don't block scrolling when footer is shown
            if (showFooter) {
                // Only intercept if scrolling up at top of footer to go back
                const footerEl = document.getElementById('project-footer');
                if (footerEl && e.deltaY < 0 && footerEl.scrollTop <= 0) {
                    e.preventDefault();
                    setShowFooter(false);
                    navigateToSection(sections.length - 1);
                }
                return;
            }

            e.preventDefault();

            clearTimeout(wheelTimeout);
            wheelTimeout = setTimeout(() => {
                if (isScrolling.current) return;

                if (e.deltaY > 0) {
                    // Scroll down
                    if (activeIndex < sections.length - 1) {
                        navigateToSection(activeIndex + 1);
                    } else if (!showFooter && footerContent) {
                        navigateToFooter();
                    }
                } else if (e.deltaY < 0) {
                    // Scroll up
                    if (activeIndex > 0) {
                        navigateToSection(activeIndex - 1);
                    }
                }
            }, 50);
        };

        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false });
        }

        return () => {
            clearTimeout(wheelTimeout);
            if (container) {
                container.removeEventListener('wheel', handleWheel);
            }
        };
    }, [activeIndex, isDesktop, sections.length, showFooter, footerContent, navigateToSection, navigateToFooter]);

    const activeSection = sections[activeIndex];

    return (
        <div
            ref={scrollContainerRef}
            className="relative"
            style={{
                height: isDesktop ? '100vh' : 'auto',
                overflow: isDesktop ? 'hidden' : 'visible'
            }}
        >
            {/* Teal Background with Particles */}
            <div className="fixed inset-0 z-0">
                <TealParticleBackground />
            </div>

            {/* Optional Header (Nav, etc.) */}
            {headerContent && (
                <div className="relative z-50">
                    {headerContent}
                </div>
            )}

            {/* Main Content Area */}
            <div className="relative z-10" style={{ height: isDesktop ? '100%' : 'auto' }}>
                {isDesktop ? (
                    /* Desktop: Split Layout with Snap Scroll */
                    <div
                        style={{
                            display: 'flex',
                            height: '100vh',
                        }}
                    >
                        {/* Left Side - Content + Section Navigation */}
                        <div
                            style={{
                                width: '40%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                paddingLeft: '3rem',
                                paddingRight: '2rem',
                            }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -40 }}
                                    transition={{ duration: 0.5, ease: 'easeOut' }}
                                >
                                    {activeSection?.subtitle && (
                                        <span className="text-teal-600 text-sm font-medium tracking-wider uppercase mb-2 block">
                                            {activeSection.subtitle}
                                        </span>
                                    )}
                                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0f172a] mb-6 leading-tight">
                                        {activeSection?.title}
                                    </h2>
                                    {activeSection?.leftContent}
                                </motion.div>
                            </AnimatePresence>

                            {/* Section Navigation - Now on the left side (hidden on hero) */}
                            {activeIndex > 0 && (
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        gap: '0.75rem',
                                        marginTop: '2.5rem',
                                    }}
                                >
                                    {/* Grouped navigation */}
                                    <div
                                        style={{
                                            display: 'flex',
                                            gap: '0.5rem',
                                            alignItems: 'center',
                                            flexWrap: 'wrap',
                                            justifyContent: 'flex-start',
                                        }}
                                    >
                                        {(() => {
                                            // Group sections by their group property
                                            const groups: { name: string; startIndex: number; count: number }[] = [];
                                            let currentGroup = '';

                                            sections.forEach((section, index) => {
                                                // Use "Início" for the first section, otherwise use group/subtitle
                                                const group = index === 0 && !section.subtitle
                                                    ? 'Início'
                                                    : section.group || section.subtitle?.split(' • ')[0] || 'Seção';
                                                if (group !== currentGroup) {
                                                    groups.push({ name: group, startIndex: index, count: 1 });
                                                    currentGroup = group;
                                                } else {
                                                    groups[groups.length - 1].count++;
                                                }
                                            });

                                            return groups.map((group, groupIndex) => {
                                                const isActive = activeIndex >= group.startIndex && activeIndex < group.startIndex + group.count;

                                                return (
                                                    <button
                                                        key={groupIndex}
                                                        onClick={() => navigateToSection(group.startIndex)}
                                                        style={{
                                                            fontSize: '0.7rem',
                                                            fontWeight: 500,
                                                            color: isActive ? '#0d9488' : 'rgba(100, 116, 139, 0.6)',
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.05em',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s ease',
                                                            background: isActive ? 'rgba(13, 148, 136, 0.1)' : 'transparent',
                                                            border: 'none',
                                                            padding: '0.4rem 0.75rem',
                                                            borderRadius: '9999px',
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            if (!isActive) {
                                                                e.currentTarget.style.color = '#0d9488';
                                                                e.currentTarget.style.background = 'rgba(13, 148, 136, 0.05)';
                                                            }
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            if (!isActive) {
                                                                e.currentTarget.style.color = 'rgba(100, 116, 139, 0.6)';
                                                                e.currentTarget.style.background = 'transparent';
                                                            }
                                                        }}
                                                    >
                                                        {group.name}
                                                    </button>
                                                );
                                            });
                                        })()}
                                    </div>

                                    {/* Navigation hint */}
                                    <div
                                        style={{
                                            color: 'rgba(100, 116, 139, 0.5)',
                                            fontSize: '0.7rem',
                                            display: 'flex',
                                            gap: '0.4rem',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <span>↑↓ scroll</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Side - Centered MacBook (larger) */}
                        <div
                            style={{
                                width: '60%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingRight: '2rem',
                                paddingLeft: '1rem',
                            }}
                        >
                            <div style={{ width: '100%', maxWidth: '800px' }}>
                                <RealisticMacBook>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeIndex}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 1.05 }}
                                            transition={{ duration: 0.4, ease: 'easeOut' }}
                                        >
                                            {activeSection?.mockupContent}
                                        </motion.div>
                                    </AnimatePresence>
                                </RealisticMacBook>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Mobile: Stacked Layout with Snap */
                    <div
                        style={{
                            scrollSnapType: 'y mandatory',
                            overflowY: 'auto',
                            height: '100vh',
                        }}
                    >
                        {sections.map((section, index) => (
                            <div
                                key={section.id}
                                ref={(el) => { sectionRefs.current[index] = el; }}
                                style={{
                                    minHeight: '100vh',
                                    scrollSnapAlign: 'start',
                                    padding: '1.5rem',
                                    paddingTop: index === 0 ? '6rem' : '2rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                }}
                            >
                                {section.subtitle && (
                                    <span className="text-teal-600 text-sm font-medium tracking-wider uppercase mb-2 block">
                                        {section.subtitle}
                                    </span>
                                )}
                                <h2 className="text-3xl font-bold text-[#0f172a] mb-4">
                                    {section.title}
                                </h2>

                                {/* Mobile Mockup */}
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <RealisticMacBook>
                                        {section.mockupContent}
                                    </RealisticMacBook>
                                </div>

                                {section.leftContent}
                            </div>
                        ))}

                        {/* Mobile Footer */}
                        {footerContent && (
                            <div
                                id="project-footer"
                                style={{ scrollSnapAlign: 'start' }}
                                className="bg-[#f2f4f7]"
                            >
                                {footerContent}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Desktop Footer - Hidden sections for scroll reference */}
            {isDesktop && (
                <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
                    {sections.map((section, index) => (
                        <div
                            key={section.id}
                            ref={(el) => { sectionRefs.current[index] = el; }}
                        />
                    ))}
                </div>
            )}

            {/* Footer Content for Desktop */}
            {isDesktop && footerContent && (
                <AnimatePresence>
                    {showFooter && (
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                            id="project-footer"
                            style={{
                                position: 'fixed',
                                inset: 0,
                                zIndex: 20,
                                background: '#f2f4f7',
                                overflowY: 'auto',
                                overflowX: 'hidden',
                                paddingTop: '100px', // Space for nav
                            }}
                            onWheel={(e) => {
                                // Allow normal scrolling inside footer
                                e.stopPropagation();
                            }}
                        >
                            <div style={{ minHeight: 'calc(100vh - 100px)' }}>
                                {footerContent}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}

            {/* Scroll to Top Button */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => {
                            if (isDesktop) {
                                navigateToSection(0);
                                setShowFooter(false);
                            } else {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                        }}
                        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg flex items-center justify-center text-gray-600 hover:bg-white hover:text-teal-600 hover:border-teal-200 transition-all cursor-pointer"
                        aria-label="Voltar ao topo"
                    >
                        <ArrowUp size={20} />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
