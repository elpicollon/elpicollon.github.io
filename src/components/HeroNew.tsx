import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { LayoutGrid } from 'lucide-react';
import { HeroParticleGrid } from './HeroParticleGrid';

export function HeroNew() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section 
      id="inicio" 
      ref={containerRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f2f4f7] z-50 isolate mobile-tiny-fix"
    >
      {/* Background Waves - Restored as requested */}
      <div className="absolute inset-0 z-0">
          <HeroParticleGrid />
          
          {/* Soft gradients for depth */}
          <div className="absolute inset-0 bg-gradient-radial from-purple-500/5 via-transparent to-transparent pointer-events-none" />
      </div>

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 w-full px-6 md:px-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-[5%] items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Title */}
            <div className="mt-24 mb-6 md:mb-10 overflow-hidden">
                <div className="flex flex-col gap-2">
                  <h1 className="text-5xl sm:text-7xl md:text-8xl font-semibold text-[#0f172a] tracking-tight leading-[1.1]">
                    Experiências digitais
                  </h1>
                  
                  <h1 className="text-5xl sm:text-7xl md:text-8xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#a855f7] tracking-tight leading-[1.1]">
                    de ponta a ponta!
                  </h1>
                </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4 items-center mb-16"
            >
               <div className="px-6 py-3 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm ring-1 ring-white/50">
                 <span className="text-sm md:text-base font-medium text-slate-600">
                   Product Designer Sênior
                 </span>
               </div>
               <div className="px-6 py-3 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm ring-1 ring-white/50">
                 <span className="text-sm md:text-base font-medium text-slate-600">
                   Especialista em Design Digital
                 </span>
               </div>
            </motion.div>

            {/* Scroll Indicator - Matches reference */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="flex items-center gap-4"
            >
                <div className="w-[30px] h-[48px] border-2 border-slate-400 rounded-full flex justify-center pt-2">
                    <motion.div 
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-1.5 h-1.5 bg-slate-600 rounded-full"
                    />
                </div>
                <span className="text-sm font-medium text-slate-500 tracking-widest uppercase">
                    Scroll to explore
                </span>
            </motion.div>
          </motion.div>

          {/* Right - Magnetic button - Matches reference style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="hidden md:flex items-center justify-center relative"
          >
            <motion.a
              href="#projetos"
              ref={buttonRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative cursor-pointer group z-10 block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Dashed Ring - Outer */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 -m-8 border border-dashed border-purple-300 rounded-full pointer-events-none"
              />

              {/* Main Button Circle */}
              <div
                className="relative w-56 h-56 rounded-full bg-gradient-to-br from-[#6d28d9] to-[#4c1d95] shadow-[0_20px_50px_rgba(109,40,217,0.5)] flex flex-col items-center justify-center gap-1 z-10 overflow-hidden"
              >
                {/* Inner Glow */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent opacity-50 pointer-events-none" />

                <motion.div
                  animate={{
                    y: isHovered ? -5 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center"
                >
                    <LayoutGrid size={28} className="text-white mb-2 opacity-80" />
                    
                    <span className="text-[10px] font-bold text-white/60 tracking-[0.2em] uppercase mb-1">
                      Ver
                    </span>
                    <span className="text-xl font-bold text-white leading-none text-center">
                      MEUS<br />PROJETOS
                    </span>
                </motion.div>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}