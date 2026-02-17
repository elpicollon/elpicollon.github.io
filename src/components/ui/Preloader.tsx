import { motion } from 'motion/react';

export function Preloader() {


    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#f2f4f7]">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative flex flex-col items-center"
            >
                <img
                    src="/assets/logo-picolo.gif"
                    alt="Carregando..."
                    className="w-32 h-32 md:w-48 md:h-48 object-contain"
                    fetchPriority="high"
                />
            </motion.div>
        </div>
    );
}
