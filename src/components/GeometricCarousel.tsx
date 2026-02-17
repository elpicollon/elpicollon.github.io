import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

import { carouselItems } from '../config/carousel';

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
                            // @ts-expect-error - fetchpriority is valid in React 19 / modern browsers but types might be outdated
                            fetchpriority="high"
                        />
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
