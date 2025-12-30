import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Types for the component
export interface PrototypeSection {
    titulo: string;
    descricao: string;
    imagens: string[];
}

export interface PrototypeShowcaseProps {
    intro: string;
    sections: PrototypeSection[];
}

// MacBook Mockup with Carousel
function MacBookMockup({ images }: { images: string[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    // Auto-play carousel every 5 seconds
    useEffect(() => {
        if (images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    // Reset to first image when images array changes
    useEffect(() => {
        setCurrentIndex(0);
    }, [images]);

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '700px',
            margin: '0 auto',
            perspective: '1500px'
        }}>
            {/* MacBook Screen */}
            <div
                style={{
                    background: '#0c0c0c',
                    borderRadius: '12px 12px 0 0',
                    padding: '6px',
                    boxShadow: '0 20px 50px -15px rgba(0, 0, 0, 0.5)',
                    position: 'relative'
                }}
            >
                {/* Camera */}
                <div
                    style={{
                        position: 'absolute',
                        top: '3px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: '#1f1f1f',
                        border: '1px solid #2a2a2a'
                    }}
                />

                {/* Browser Window */}
                <div style={{ borderRadius: '6px', overflow: 'hidden', background: '#1a1a1a' }}>
                    {/* Minimal Header */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '6px 10px',
                            background: '#2a2a2a'
                        }}
                    >
                        <div style={{ display: 'flex', gap: '6px' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
                        </div>
                    </div>

                    {/* Screen Content */}
                    <div style={{ position: 'relative', background: '#000', overflow: 'hidden' }}>
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentIndex}
                                src={images[currentIndex]}
                                alt={`Tela ${currentIndex + 1}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block'
                                }}
                            />
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={goToPrevious}
                                    style={{
                                        position: 'absolute',
                                        left: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '50%',
                                        background: 'rgba(255, 255, 255, 0.9)',
                                        border: 'none',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        zIndex: 10
                                    }}
                                >
                                    <ChevronLeft style={{ width: '18px', height: '18px', color: '#333' }} />
                                </button>
                                <button
                                    onClick={goToNext}
                                    style={{
                                        position: 'absolute',
                                        right: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '50%',
                                        background: 'rgba(255, 255, 255, 0.9)',
                                        border: 'none',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        zIndex: 10
                                    }}
                                >
                                    <ChevronRight style={{ width: '18px', height: '18px', color: '#333' }} />
                                </button>
                            </>
                        )}

                        {/* Dots */}
                        {images.length > 1 && (
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: '12px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    display: 'flex',
                                    gap: '6px',
                                    background: 'rgba(0,0,0,0.6)',
                                    padding: '6px 10px',
                                    borderRadius: '16px'
                                }}
                            >
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        style={{
                                            width: index === currentIndex ? '20px' : '6px',
                                            height: '6px',
                                            borderRadius: '3px',
                                            background: index === currentIndex ? '#fff' : 'rgba(255,255,255,0.4)',
                                            border: 'none',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            padding: 0
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* MacBook Hinge */}
            <div
                style={{
                    width: '100%',
                    height: '10px',
                    background: 'linear-gradient(180deg, #d0d0d0 0%, #a8a8a8 100%)',
                    position: 'relative'
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: '0',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '70px',
                        height: '4px',
                        background: 'linear-gradient(180deg, #999 0%, #777 100%)',
                        borderRadius: '0 0 4px 4px'
                    }}
                />
            </div>

            {/* MacBook Body with perspective */}
            <div
                style={{
                    width: '100%',
                    height: '20px',
                    background: 'linear-gradient(180deg, #c8c8c8 0%, #a0a0a0 50%, #888 100%)',
                    transformOrigin: 'top center',
                    transform: 'rotateX(70deg)',
                    borderRadius: '0 0 4px 4px',
                    boxShadow: '0 15px 30px -5px rgba(0,0,0,0.3)'
                }}
            />
        </div>
    );
}

// Hook to detect window size
function useWindowSize() {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkSize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        checkSize();
        window.addEventListener('resize', checkSize);
        return () => window.removeEventListener('resize', checkSize);
    }, []);

    return isDesktop;
}

// Main PrototypeShowcase Component
export function PrototypeShowcase({ intro, sections }: PrototypeShowcaseProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDesktop = useWindowSize();

    // Intersection Observer for scroll-based section detection
    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        sectionRefs.current.forEach((ref, index) => {
            if (!ref) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                            setActiveIndex(index);
                        }
                    });
                },
                { threshold: 0.5, rootMargin: '-20% 0px -20% 0px' }
            );

            observer.observe(ref);
            observers.push(observer);
        });

        return () => {
            observers.forEach(observer => observer.disconnect());
        };
    }, [sections.length]);

    return (
        <section
            id="prototipo"
            style={{
                paddingTop: '5rem',
                paddingBottom: '5rem',
                paddingLeft: isDesktop ? '3rem' : '1.5rem',
                paddingRight: isDesktop ? '3rem' : '1.5rem',
                background: 'linear-gradient(to bottom, rgba(243, 232, 255, 0.3), #f2f4f7)'
            }}
        >
            <div>
                {/* Intro */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    style={{ marginBottom: '3rem' }}
                >
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: 600,
                        color: '#1e293b',
                        marginBottom: '1rem'
                    }}>
                        O Protótipo
                    </h2>
                    <p style={{ color: '#52525b', maxWidth: '48rem', marginBottom: '1.5rem' }}>
                        {intro}
                    </p>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '150px' }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        style={{
                            height: '4px',
                            background: 'linear-gradient(to right, #9333ea, transparent)'
                        }}
                    />
                </motion.div>

                {/* Split Screen Container */}
                <div
                    ref={containerRef}
                    style={{
                        display: 'flex',
                        flexDirection: isDesktop ? 'row' : 'column',
                        gap: isDesktop ? '3rem' : '2rem'
                    }}
                >
                    {/* Left Side - Scrolling Content */}
                    <div style={{
                        width: isDesktop ? '50%' : '100%',
                        order: isDesktop ? 1 : 2
                    }}>
                        <div>
                            {sections.map((section, index) => (
                                <div
                                    key={index}
                                    ref={(el) => { sectionRefs.current[index] = el; }}
                                    style={{
                                        minHeight: isDesktop ? '60vh' : 'auto',
                                        display: 'flex',
                                        alignItems: 'center',
                                        paddingBottom: isDesktop ? 0 : '2rem'
                                    }}
                                >
                                    <motion.div
                                        initial={{ opacity: 0.3 }}
                                        animate={{
                                            opacity: activeIndex === index ? 1 : 0.3,
                                            scale: activeIndex === index ? 1 : 0.98
                                        }}
                                        transition={{ duration: 0.4, ease: 'easeOut' }}
                                        style={{
                                            position: 'relative',
                                            paddingLeft: '2rem',
                                            borderLeft: '2px solid #e9d5ff'
                                        }}
                                    >
                                        {/* Section indicator dot */}
                                        <div
                                            style={{
                                                position: 'absolute',
                                                left: '-9px',
                                                top: 0,
                                                width: '16px',
                                                height: '16px',
                                                borderRadius: '50%',
                                                border: '2px solid',
                                                borderColor: activeIndex === index ? '#9333ea' : '#d8b4fe',
                                                background: activeIndex === index ? '#9333ea' : '#fff',
                                                transform: activeIndex === index ? 'scale(1.1)' : 'scale(1)',
                                                transition: 'all 0.3s ease'
                                            }}
                                        />

                                        {/* Section number */}
                                        <span style={{
                                            fontSize: '3.5rem',
                                            fontWeight: 700,
                                            color: activeIndex === index ? '#e9d5ff' : '#f3e8ff',
                                            transition: 'color 0.3s ease',
                                            display: 'block'
                                        }}>
                                            0{index + 1}
                                        </span>

                                        {/* Title */}
                                        <h3 style={{
                                            fontSize: '1.75rem',
                                            fontWeight: 600,
                                            marginBottom: '1rem',
                                            color: activeIndex === index ? '#1e293b' : '#94a3b8',
                                            transition: 'color 0.3s ease'
                                        }}>
                                            {section.titulo}
                                        </h3>

                                        {/* Description */}
                                        <p style={{
                                            fontSize: '1rem',
                                            lineHeight: 1.7,
                                            maxWidth: '28rem',
                                            color: activeIndex === index ? '#52525b' : '#a1a1aa',
                                            transition: 'color 0.3s ease'
                                        }}>
                                            {section.descricao}
                                        </p>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Sticky Mockup */}
                    <div style={{
                        width: isDesktop ? '50%' : '100%',
                        order: isDesktop ? 2 : 1
                    }}>
                        <div style={{
                            position: isDesktop ? 'sticky' : 'relative',
                            top: isDesktop ? '50%' : 'auto',
                            transform: isDesktop ? 'translateY(-50%)' : 'none',
                            alignSelf: 'flex-start'
                        }}>
                            <MacBookMockup images={sections[activeIndex]?.imagens || []} />

                            {/* Mini section indicators below mockup */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                marginTop: '1.5rem'
                            }}>
                                {sections.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setActiveIndex(index);
                                            sectionRefs.current[index]?.scrollIntoView({
                                                behavior: 'smooth',
                                                block: 'center'
                                            });
                                        }}
                                        style={{
                                            width: activeIndex === index ? '2rem' : '0.5rem',
                                            height: '0.5rem',
                                            borderRadius: '9999px',
                                            background: activeIndex === index ? '#9333ea' : '#e9d5ff',
                                            border: 'none',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            padding: 0
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
