import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useState, useCallback } from 'react';
import { HeroParticleGrid } from './HeroParticleGrid';
import { GeometricCarousel, carouselItems } from './GeometricCarousel';
import { ScrollIndicator } from './ui/ScrollIndicator';
import { MarqueeSection } from './MarqueeSection';
import { useTranslation } from '../hooks/useTranslation';

export function HeroNew() {
  const containerRef = useRef(null);
  const [currentGradient, setCurrentGradient] = useState(carouselItems[0].gradient);
  const { t } = useTranslation();

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
          animate={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 0% 100%)' }}
          exit={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 0% 100%)' }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          style={{
            background: `linear-gradient(135deg, ${currentGradient[0]} 0%, ${currentGradient[1]} 100%)`,
          }}
        >
          {/* Inner shadow overlay - inside the animated container */}
          <div className="hero-diagonal-shadow" />
        </motion.div>
      </AnimatePresence>

      {/* Background Waves - Restored as requested */}
      <div className="absolute inset-0 z-0">
        <HeroParticleGrid />

        {/* Soft gradients for depth */}
        <div className="absolute inset-0 bg-gradient-radial from-purple-500/5 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* MarqueeSection - Fixed at bottom, behind all content */}
      <motion.div
        style={{ y, opacity, scale, transform: 'translateZ(0)' }}
        className="absolute bottom-0 left-0 right-0 z-0 will-change-transform"
      >
        <MarqueeSection />
      </motion.div>

      <motion.div
        style={{ y, opacity, scale, transform: 'translateZ(0)' }}
        className="relative z-10 w-full px-6 md:px-12 will-change-transform"
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
              <h1 className="flex flex-col gap-2">
                <span className="hero-title-mobile text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1]">
                  {t('hero.title1')}
                </span>
                <span className="hero-title-mobile text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1]">
                  {t('hero.title2')}
                </span>
              </h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4 items-center mb-16"
            >
              <div className="px-6 py-3 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm ring-1 ring-white/50">
                <span className="text-sm md:text-base [@media(min-width:2560px)]:text-lg [@media(min-width:3840px)]:text-xl font-medium text-slate-600">
                  {t('hero.tags.productDesigner')}
                </span>
              </div>
              <div className="px-6 py-3 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm ring-1 ring-white/50">
                <span className="text-sm md:text-base [@media(min-width:2560px)]:text-lg [@media(min-width:3840px)]:text-xl font-medium text-slate-600">
                  {t('hero.tags.professor')}
                </span>
              </div>
              <div className="px-6 py-3 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm ring-1 ring-white/50">
                <span className="text-sm md:text-base [@media(min-width:2560px)]:text-lg [@media(min-width:3840px)]:text-xl font-medium text-slate-600">
                  {t('hero.tags.specialist')}
                </span>
              </div>
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

      {/* Scroll Indicator - Absolute positioned at bottom center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="flex absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ScrollIndicator />
      </motion.div>
    </section>
  );
}