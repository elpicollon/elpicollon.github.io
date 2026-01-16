import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show button after scrolling down 300px
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg flex items-center justify-center text-gray-600 hover:bg-white hover:text-purple-600 hover:border-purple-200 transition-all cursor-pointer"
                    aria-label="Voltar ao topo"
                >
                    <ArrowUp size={20} />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
