import { motion, useInView } from 'motion/react';
import { useRef, ReactNode } from 'react';

export interface RevealTextProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export function RevealText({ children, delay = 0, className = "" }: RevealTextProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`w-full ${className}`}
        >
            {children}
        </motion.div>
    );
}
