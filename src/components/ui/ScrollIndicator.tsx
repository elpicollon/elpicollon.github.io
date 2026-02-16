import { motion } from 'motion/react';

interface ScrollIndicatorProps {
    className?: string;
}

export function ScrollIndicator({ className = "" }: ScrollIndicatorProps) {
    return (
        <div className={`scroll-indicator flex flex-col items-center gap-2 ${className}`}>
            <div className="w-[26px] h-[42px] flex-shrink-0 border-2 border-slate-400 rounded-full flex flex-col items-center justify-start pt-2 box-border">
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1 h-1 bg-slate-500 rounded-full block flex-shrink-0"
                    style={{
                        width: '4px',
                        height: '4px',
                        minWidth: '4px',
                        minHeight: '4px',
                        maxWidth: '4px',
                        maxHeight: '4px',
                        padding: 0 // Explicitly override any inherited padding
                    }}
                />
            </div>
        </div>
    );
}
