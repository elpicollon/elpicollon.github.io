import { ReactNode, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ============================================
// ScrollCards - Cards com scroll vertical interno
// ============================================
interface ScrollCardsProps {
    cards: {
        title: string;
        content: ReactNode;
        icon?: ReactNode;
    }[];
    autoScroll?: boolean;
    scrollInterval?: number;
}

export function ScrollCards({ cards, autoScroll = true, scrollInterval = 4000 }: ScrollCardsProps) {
    const [activeCard, setActiveCard] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (autoScroll && cards.length > 1) {
            intervalRef.current = setInterval(() => {
                setActiveCard(prev => (prev + 1) % cards.length);
            }, scrollInterval);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [autoScroll, cards.length, scrollInterval]);

    const handleDotClick = (index: number) => {
        setActiveCard(index);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = setInterval(() => {
                setActiveCard(prev => (prev + 1) % cards.length);
            }, scrollInterval);
        }
    };

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
                position: 'absolute',
                inset: 0,
            }}
        >
            {/* Card Content */}
            <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCard}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            padding: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        {/* Card Number */}
                        <span
                            style={{
                                fontSize: '4rem',
                                fontWeight: 'bold',
                                color: 'rgba(255,255,255,0.08)',
                                position: 'absolute',
                                top: '1rem',
                                right: '1.5rem',
                                lineHeight: 1,
                            }}
                        >
                            {String(activeCard + 1).padStart(2, '0')}
                        </span>

                        {/* Icon */}
                        {cards[activeCard].icon && (
                            <div
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    background: 'rgba(20, 184, 166, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '1rem',
                                    color: '#14b8a6',
                                }}
                            >
                                {cards[activeCard].icon}
                            </div>
                        )}

                        {/* Title */}
                        <h3
                            style={{
                                fontSize: '1.5rem',
                                fontWeight: 600,
                                color: 'white',
                                marginBottom: '0.75rem',
                            }}
                        >
                            {cards[activeCard].title}
                        </h3>

                        {/* Content */}
                        <div
                            style={{
                                color: 'rgba(255,255,255,0.7)',
                                fontSize: '0.95rem',
                                lineHeight: 1.6,
                            }}
                        >
                            {cards[activeCard].content}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Progress Dots */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '1rem',
                    background: 'rgba(0,0,0,0.3)',
                }}
            >
                {cards.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        style={{
                            width: activeCard === index ? '1.5rem' : '0.5rem',
                            height: '0.5rem',
                            borderRadius: '9999px',
                            background: activeCard === index ? '#14b8a6' : 'rgba(255,255,255,0.3)',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

// ============================================
// SingleCard - Card único para exibição no mockup
// ============================================
interface SingleCardProps {
    title: string;
    content: ReactNode;
    icon?: ReactNode;
    number?: string;
}

export function SingleCard({ content, icon, number }: SingleCardProps) {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
            }}
        >
            {/* Decorative background elements */}
            <div
                style={{
                    position: 'absolute',
                    top: '-20%',
                    right: '-10%',
                    width: '50%',
                    height: '50%',
                    background: 'radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(40px)',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: '-20%',
                    left: '-10%',
                    width: '40%',
                    height: '40%',
                    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(40px)',
                }}
            />

            {/* Main content container */}
            <div
                style={{
                    flex: 1,
                    padding: '2.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    textAlign: 'center',
                }}
            >
                {/* Card Number - subtle in corner */}
                {number && (
                    <span
                        style={{
                            fontSize: '6rem',
                            fontWeight: 'bold',
                            color: 'rgba(255,255,255,0.04)',
                            position: 'absolute',
                            top: '0.5rem',
                            right: '1rem',
                            lineHeight: 1,
                            fontFamily: 'monospace',
                        }}
                    >
                        {number}
                    </span>
                )}

                {/* Icon Container - Large and prominent */}
                {icon && (
                    <div
                        style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '20px',
                            background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.3) 0%, rgba(20, 184, 166, 0.1) 100%)',
                            border: '1px solid rgba(20, 184, 166, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '2rem',
                            color: '#14b8a6',
                            boxShadow: '0 8px 32px rgba(20, 184, 166, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(8px)',
                        }}
                    >
                        <div style={{ transform: 'scale(1.8)' }}>
                            {icon}
                        </div>
                    </div>
                )}

                {/* Content - Larger and more prominent */}
                <div
                    style={{
                        color: 'rgba(255,255,255,0.9)',
                        fontSize: '1.25rem',
                        lineHeight: 1.7,
                        fontWeight: 400,
                        maxWidth: '90%',
                        letterSpacing: '0.01em',
                    }}
                >
                    {content}
                </div>

                {/* Decorative line */}
                <div
                    style={{
                        width: '60px',
                        height: '3px',
                        background: 'linear-gradient(90deg, transparent, #14b8a6, transparent)',
                        borderRadius: '2px',
                        marginTop: '2rem',
                        opacity: 0.6,
                    }}
                />
            </div>
        </div>
    );
}

// ============================================
// SingleImage - Imagem única centralizada
// ============================================
interface SingleImageProps {
    src: string;
    alt?: string;
}

export function SingleImage({ src, alt = 'Imagem' }: SingleImageProps) {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                inset: 0,
                background: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <img
                src={src}
                alt={alt}
                style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                }}
            />
        </div>
    );
}

// ============================================
// ImageCarousel - Carrossel de imagens
// ============================================
interface ImageCarouselProps {
    images: string[];
    autoPlay?: boolean;
    interval?: number;
}

export function ImageCarousel({ images, autoPlay = true, interval = 3000 }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (autoPlay && images.length > 1) {
            intervalRef.current = setInterval(() => {
                setCurrentIndex(prev => (prev + 1) % images.length);
            }, interval);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [autoPlay, images.length, interval]);

    const goTo = (index: number) => {
        setCurrentIndex(index);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            if (autoPlay) {
                intervalRef.current = setInterval(() => {
                    setCurrentIndex(prev => (prev + 1) % images.length);
                }, interval);
            }
        }
    };

    const goNext = () => goTo((currentIndex + 1) % images.length);
    const goPrev = () => goTo((currentIndex - 1 + images.length) % images.length);

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                inset: 0,
                background: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/* Images */}
            <AnimatePresence mode="wait">
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        width: 'auto',
                        height: 'auto',
                        objectFit: 'contain',
                    }}
                />
            </AnimatePresence>

            {/* Navigation Arrows */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={goPrev}
                        style={{
                            position: 'absolute',
                            left: '0.5rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: 'rgba(0,0,0,0.5)',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            transition: 'background 0.2s',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.8)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={goNext}
                        style={{
                            position: 'absolute',
                            right: '0.5rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: 'rgba(0,0,0,0.5)',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            transition: 'background 0.2s',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.8)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
                    >
                        <ChevronRight size={20} />
                    </button>
                </>
            )}

            {/* Dots */}
            {images.length > 1 && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: '1rem',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: '0.5rem',
                    }}
                >
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goTo(index)}
                            style={{
                                width: currentIndex === index ? '1.5rem' : '0.5rem',
                                height: '0.5rem',
                                borderRadius: '9999px',
                                background: currentIndex === index ? 'white' : 'rgba(255,255,255,0.5)',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

// ============================================
// PlaceholderContent - Placeholder para imagem de capa
// ============================================
interface PlaceholderContentProps {
    text?: string;
}

export function PlaceholderContent({ text = 'Imagem de Capa' }: PlaceholderContentProps) {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, #0f766e 0%, #115e59 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '1rem',
            }}
        >
            <div
                style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                </svg>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
                {text}
            </span>
        </div>
    );
}
