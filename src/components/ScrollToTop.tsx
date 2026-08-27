import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface ScrollToTopProps {
    onClick?: () => void;
    isVisible?: boolean;
}

export function ScrollToTop({ onClick, isVisible: isVisibleProp }: ScrollToTopProps = {}) {
    const [isVisibleState, setIsVisibleState] = useState(false);
    const { isPortuguese, t } = useTranslation();

    useEffect(() => {
        if (isVisibleProp !== undefined) return;
        const handleScroll = () => {
            setIsVisibleState(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isVisibleProp]);

    const isVisible = isVisibleProp !== undefined ? isVisibleProp : isVisibleState;

    const scrollToTop = () => {
        if (onClick) {
            onClick();
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.2 }}
                    onClick={scrollToTop}
                    className="scroll-to-top-btn group"
                    aria-label={t('common.backToTop')}
                >
                    <ArrowUp size={16} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
                    <span className="text-[8px] font-mono tracking-widest leading-none mt-1 uppercase">
                        {isPortuguese ? "TOPO" : "TOP"}
                    </span>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
