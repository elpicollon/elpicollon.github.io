import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

// Images from carousel folder with their associated gradient colors
const carouselItems = [
    { src: '/assets/carousel/1-picolo.png', gradient: ['#22143C', '#4A208A'] },
    { src: '/assets/carousel/2-Leads1.png', gradient: ['#2A645E', '#55CABE'] },
    { src: '/assets/carousel/3-Lojhan.png', gradient: ['#121F2B', '#083968'] },
    { src: '/assets/carousel/4-MedOfc.png', gradient: ['#3066BF', '#4088FF'] },
    { src: '/assets/carousel/5-iconvia.png', gradient: ['#731F1F', '#CB2E2E'] },
    { src: '/assets/carousel/6-Sponte.png', gradient: ['#005C7F', '#00A5E5'] },
    { src: '/assets/carousel/7-Marcelle.png', gradient: ['#772717', '#B04530'] },
    { src: '/assets/carousel/8-Rubi.png', gradient: ['#2D2159', '#E91E63'] },
    { src: '/assets/carousel/9-Gattini.png', gradient: ['#214E71', '#357BB6'] },
    { src: '/assets/carousel/10-Autentica.png', gradient: ['#1F4E56', '#46C0D2'] },
    { src: '/assets/carousel/11-MedPlus.png', gradient: ['#895CC3', '#523273'] },
    { src: '/assets/carousel/12-Mada.png', gradient: ['#ECCEA9', '#FFF3C4'] },
];
// Export the items so HeroNew can access the gradient colors
export { carouselItems };

export function GeometricCarousel({ onGradientChange }: { onGradientChange?: (gradient: string[]) => void }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

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

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const currentItem = carouselItems[currentIndex];

    return (
        <div
            ref={containerRef}
            className="dynamic-gradient-carousel"
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
                            alt="Portfolio showcase"
                            className="carousel-floating-image"
                        />
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
