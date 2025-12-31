import { useEffect, useRef, useState, ReactNode, useCallback, useMemo } from 'react';
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
    const lastScrollTime = useRef<number>(0);
    const SCROLL_COOLDOWN = 1200; // ms between scroll navigations (covers full trackpad gesture with momentum)

    // Calculate section groups for timeline
    const groups = useMemo(() => {
        const g: { name: string; startIndex: number; count: number }[] = [];
        let currentGroup = '';

        sections.forEach((section, index) => {
            const groupName = index === 0 && !section.subtitle
                ? 'Início'
                : section.group || section.subtitle?.split(' • ')[0] || 'Seção';

            if (groupName !== currentGroup) {
                g.push({ name: groupName, startIndex: index, count: 1 });
                currentGroup = groupName;
            } else {
                g[g.length - 1].count++;
            }
        });
        return g;
    }, [sections]);

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
        const now = Date.now();
        const timeSinceLastScroll = now - lastScrollTime.current;

        if (index < 0 || index >= sections.length) return;
        if (timeSinceLastScroll < SCROLL_COOLDOWN) return;

        lastScrollTime.current = now;
        setActiveIndex(index);
        setShowFooter(false);
    }, [sections.length, SCROLL_COOLDOWN]);

    // Navigate to footer
    const navigateToFooter = useCallback(() => {
        const now = Date.now();
        if (now - lastScrollTime.current < SCROLL_COOLDOWN) return;

        lastScrollTime.current = now;
        setShowFooter(true);

        document.getElementById('project-footer')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, [SCROLL_COOLDOWN]);

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

    // Wheel navigation (throttle - immediate execution, then block)
    useEffect(() => {
        if (!isDesktop) return;

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

            // Execute immediately - throttle check is done inside navigateToSection
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
        };

        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false });
        }

        return () => {
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

            {/* Fixed Bottom Section Navigation */}
            {isDesktop && !showFooter && activeIndex > 0 && (
                <div
                    className="fixed bottom-6 left-1/2 z-40"
                    style={{ transform: 'translateX(-50%)' }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="relative rounded-full backdrop-blur-md overflow-hidden"
                        style={{
                            background: 'rgba(255, 255, 255, 0.85)',
                            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.5)',
                        }}
                    >
                        {/* Progress Bar at Top */}
                        <div
                            className="absolute top-0 left-0 right-0"
                            style={{ height: '3px', backgroundColor: 'rgba(148, 163, 184, 0.2)' }}
                        >
                            <motion.div
                                style={{
                                    height: '100%',
                                    backgroundColor: '#0d9488',
                                    borderRadius: '0 3px 3px 0',
                                }}
                                initial={{ width: '0%' }}
                                animate={{
                                    width: (() => {
                                        if (groups.length <= 1) return '100%';

                                        // Find active group index and progress within it
                                        let activeGroupIndex = 0;
                                        let progressInGroup = 0;

                                        for (let i = 0; i < groups.length; i++) {
                                            const g = groups[i];
                                            if (activeIndex >= g.startIndex && activeIndex < g.startIndex + g.count) {
                                                activeGroupIndex = i;
                                                // Calculate internal progress (0 to 1) within this group
                                                if (g.count > 1) {
                                                    progressInGroup = (activeIndex - g.startIndex) / (g.count - 1);
                                                } else {
                                                    progressInGroup = 0;
                                                }
                                                break;
                                            }
                                        }

                                        // Calculate progress to reach the CENTER of the active button
                                        const padding = 7; // percentage from edges
                                        const usableWidth = 100 - (padding * 2);
                                        const stepSize = usableWidth / (groups.length - 1);

                                        // Base progress = center of current button
                                        // Add small micro-progress within the section (max 30% of stepSize)
                                        const microProgress = progressInGroup * stepSize * 0.3;
                                        const progress = padding + (activeGroupIndex * stepSize) + microProgress;

                                        return `${Math.min(progress, 100)}%`;
                                    })()
                                }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                            />
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex gap-4 px-6 py-3 pt-4">
                            {groups.map((group, i) => {
                                const isActiveGroup = activeIndex >= group.startIndex && activeIndex < group.startIndex + group.count;
                                return (
                                    <button
                                        key={i}
                                        onClick={() => navigateToSection(group.startIndex)}
                                        className="transition-all duration-300 cursor-pointer border-none text-sm font-medium px-4 py-2 rounded-full whitespace-nowrap"
                                        style={{
                                            backgroundColor: isActiveGroup ? '#0d9488' : 'transparent',
                                            color: isActiveGroup ? '#ffffff' : '#64748b',
                                        }}
                                    >
                                        {group.name}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
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
                                paddingLeft: '4rem',
                                paddingRight: '2rem',
                            }}
                        >
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                            >
                                {/* Show subtitle and title for non-hero sections */}
                                {activeIndex > 0 && (
                                    <>
                                        {activeSection?.subtitle && (
                                            <span className="text-teal-600 text-sm font-medium tracking-wider uppercase mb-2 block">
                                                {activeSection.subtitle}
                                            </span>
                                        )}
                                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0f172a] mb-6 leading-tight">
                                            {activeSection?.title}
                                        </h2>
                                    </>
                                )}

                                {/* Show leftContent only for hero section */}
                                {activeIndex === 0 && activeSection?.leftContent}
                            </motion.div>

                            {/* Section Navigation moved to sidebar timeline */}
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
                                            initial={{
                                                opacity: 0,
                                                y: 30,
                                                scale: 0.95,
                                                filter: 'blur(8px)'
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                scale: 1,
                                                filter: 'blur(0px)'
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: -20,
                                                scale: 1.02,
                                                filter: 'blur(4px)'
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                ease: [0.22, 1, 0.36, 1]
                                            }}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                            }}
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
                        className="fixed bottom-7 right-6 z-50 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg flex items-center justify-center text-gray-600 hover:bg-white hover:text-teal-600 hover:border-teal-200 transition-all cursor-pointer"
                        aria-label="Voltar ao topo"
                    >
                        <ArrowUp size={20} />
                    </motion.button>
                )}
            </AnimatePresence>


        </div >
    );
}
