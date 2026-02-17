import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

// Images from carousel folder with their associated gradient colors
const carouselItems = [
    { src: '/assets/carousel/1-picolo.webp', gradient: ['#22143C', '#4A208A'], alt: 'Projeto de identidade visual Picolo Design' },
    { src: '/assets/carousel/2-Leads1.webp', gradient: ['#2A645E', '#55CABE'], alt: 'Projeto Leads2b - Plataforma de vendas B2B' },
    { src: '/assets/carousel/3-Lojhan.webp', gradient: ['#121F2B', '#083968'], alt: 'Projeto Lojhan - Identidade visual' },
    { src: '/assets/carousel/4-MedOfc.webp', gradient: ['#3066BF', '#4088FF'], alt: 'Projeto Medical Office - Locação de clínicas' },
    { src: '/assets/carousel/5-iconvia.webp', gradient: ['#731F1F', '#CB2E2E'], alt: 'Projeto Iconvia - Ícones para ERP' },
    { src: '/assets/carousel/6-Sponte.webp', gradient: ['#005C7F', '#00A5E5'], alt: 'Projeto Sponte - Sistema de gestão escolar' },
    { src: '/assets/carousel/7-Marcelle.webp', gradient: ['#772717', '#B04530'], alt: 'Projeto Marcelle - Identidade visual' },
    { src: '/assets/carousel/8-Rubi.webp', gradient: ['#2D2159', '#E91E63'], alt: 'Projeto Rubi - Plataforma digital' },
    { src: '/assets/carousel/9-Gattini.webp', gradient: ['#214E71', '#357BB6'], alt: 'Projeto Gattini - Identidade Visual' },
    { src: '/assets/carousel/10-Autentica.webp', gradient: ['#1F4E56', '#46C0D2'], alt: 'Projeto Autêntica - Branding e identidade' },
    { src: '/assets/carousel/11-MedPlus.webp', gradient: ['#895CC3', '#523273'], alt: 'Projeto MedPlus - Sistema de saúde' },
    { src: '/assets/carousel/12-Mada.webp', gradient: ['#ECCEA9', '#FFF3C4'], alt: 'Projeto Mada - Identidade Visual' },
];
// Export the items so HeroNew can access the gradient colors
export { carouselItems };

export function GeometricCarousel({ onGradientChange }: { onGradientChange?: (gradient: string[]) => void }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const rectRef = useRef<DOMRect | null>(null);

    // Mouse position for parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring for parallax
    const springConfig = { stiffness: 100, damping: 30 };
    const parallaxX = useSpring(useTransform(mouseX, [-300, 300], [15, -15]), springConfig);
    const parallaxY = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), springConfig);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    // Notify parent of gradient change
    useEffect(() => {
        if (onGradientChange) {
            onGradientChange(carouselItems[currentIndex].gradient);
        }
    }, [currentIndex, onGradientChange]);

    const updateRect = () => {
        if (containerRef.current) {
            rectRef.current = containerRef.current.getBoundingClientRect();
        }
    };

    const handleMouseEnter = () => {
        updateRect();
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        // Fallback if not cached yet
        if (!rectRef.current) updateRect();

        const rect = rectRef.current;
        if (!rect) return;

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    // Update rect on resize to ensure accuracy
    useEffect(() => {
        window.addEventListener('resize', updateRect);
        return () => window.removeEventListener('resize', updateRect);
    }, []);

    // Update rect on scroll to handle layout shifts (optional but safer)
    useEffect(() => {
        window.addEventListener('scroll', updateRect, { passive: true });
        return () => window.removeEventListener('scroll', updateRect);
    }, []);

    const currentItem = carouselItems[currentIndex];

    return (
        <div
            ref={containerRef}
            className="dynamic-gradient-carousel"
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Floating image with parallax */}
            <motion.div
                className="carousel-image-wrapper"
                style={{
                    x: parallaxX,
                    y: parallaxY,
                }}
            >
                <AnimatePresence initial={false}>
                    <motion.div
                        key={currentIndex}
                        className="carousel-image-container"
                        initial={{
                            y: 40,
                            opacity: 0,
                        }}
                        animate={{
                            y: 0,
                            opacity: 1,
                        }}
                        exit={{
                            y: -40,
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.6,
                            ease: [0.4, 0, 0.2, 1],
                        }}
                    >
                        <img
                            src={currentItem.src}
                            alt={currentItem.alt}
                            className="carousel-floating-image"
                            fetchPriority="high"
                        />
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
