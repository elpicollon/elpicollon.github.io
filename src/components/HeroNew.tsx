import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useState, useCallback } from 'react';
import { HeroParticleGrid } from './HeroParticleGrid';
import { GeometricCarousel, carouselItems } from './GeometricCarousel';

export function HeroNew() {
  const containerRef = useRef(null);
  const [currentGradient, setCurrentGradient] = useState(carouselItems[0].gradient);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const handleGradientChange = useCallback((gradient: string[]) => {
    setCurrentGradient(gradient);
  }, []);

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f2f4f7] z-50 isolate mobile-tiny-fix"
    >
      {/* Dynamic Gradient Background - Full height with reveal transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentGradient.join('-')}
          className="hero-gradient-bg"
          initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
          animate={{ clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)' }}
          exit={{ clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)' }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          style={{
            background: `linear-gradient(135deg, ${currentGradient[0]} 0%, ${currentGradient[1]} 100%)`,
          }}
        />
      </AnimatePresence>

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
            <div className="hero-title-container mt-24 mb-6 md:mb-10 overflow-hidden">
              <div className="flex flex-col gap-2">
                <h1 className="hero-title-mobile text-[3.25rem] sm:text-[4rem] md:text-8xl font-semibold text-[#0f172a] tracking-tight leading-[1.1]">
                  Experiências digitais
                </h1>

                <h1 className="hero-title-mobile text-[3.25rem] sm:text-[4rem] md:text-8xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#a855f7] tracking-tight leading-[1.1]">
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
                  Product Designer
                </span>
              </div>
              <div className="px-6 py-3 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm ring-1 ring-white/50">
                <span className="text-sm md:text-base font-medium text-slate-600">
                  Professor
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
              <div className="scroll-indicator w-[30px] h-[48px] border-2 border-slate-400 rounded-full flex justify-center pt-2">
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

          {/* Right - Geometric Image Carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="hidden lg:flex items-center justify-center relative"
          >
            <GeometricCarousel onGradientChange={handleGradientChange} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}