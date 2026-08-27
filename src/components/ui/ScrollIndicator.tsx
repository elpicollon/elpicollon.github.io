import { motion } from 'motion/react';

interface ScrollIndicatorProps {
    className?: string;
}

export function ScrollIndicator({ className = "" }: ScrollIndicatorProps) {
    return (
        <div className={`scroll-indicator flex flex-col items-center gap-2 ${className}`}>
            <div className="w-[18px] h-[29px] flex-shrink-0 relative">
                {/* Tactical Chamfered Shell */}
                <svg className="w-full h-full text-slate-400" viewBox="0 0 26 42" fill="none">
                    <polygon 
                        points="4,1 22,1 25,4 25,38 22,41 4,41 1,38 1,4" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                    />
                </svg>
                {/* Scrolling Dot */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 flex justify-center">
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-[4px] h-[6px] bg-slate-500 shrink-0"
                    />
                </div>
            </div>
        </div>
    );
}
