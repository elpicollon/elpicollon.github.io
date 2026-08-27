import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

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
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const { t } = useTranslation();

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

    const isVideo = Boolean(images[currentIndex] && /\.(mp4|webm|mov|ogg|m4v)$/i.test(images[currentIndex]));

    return (
        <div className="w-full h-full absolute inset-0 bg-black flex items-center justify-center">
            {/* Images and Videos */}
            <AnimatePresence mode="wait">
                {isVideo ? (
                    <motion.video
                        key={currentIndex}
                        src={images[currentIndex]}
                        autoPlay
                        loop
                        muted
                        playsInline
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-full max-h-full w-auto h-auto object-contain"
                    />
                ) : (
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex]}
                        alt={`Slide ${currentIndex + 1}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-full max-h-full w-auto h-auto object-contain"
                    />
                )}
            </AnimatePresence>

            {/* Navigation Arrows */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={goPrev}
                        aria-label={t('accessibility.previousSlide')}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 border-none cursor-pointer flex items-center justify-center text-white transition-colors duration-200 hover:bg-black/80"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={goNext}
                        aria-label={t('accessibility.nextSlide')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 border-none cursor-pointer flex items-center justify-center text-white transition-colors duration-200 hover:bg-black/80"
                    >
                        <ChevronRight size={20} />
                    </button>
                </>
            )}

            {/* Dots */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goTo(index)}
                            aria-label={`Ir para slide ${index + 1}`}
                            className={`h-2 rounded-full border-none cursor-pointer transition-all duration-300 ${
                                currentIndex === index ? 'w-6 bg-white' : 'w-2 bg-white/50'
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

