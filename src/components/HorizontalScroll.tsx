import { motion, useMotionValue, useSpring } from 'motion/react';
import { useRef, useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ExternalLink } from 'lucide-react';
import { useContactModal } from '../contexts/ContactModalContext';
import { useTranslation } from '../hooks/useTranslation';

export function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const smoothX = useSpring(x, {
    stiffness: 100,
    damping: 30,
    mass: 0.5
  });
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const { openModal } = useContactModal();
  const { t } = useTranslation();

  // Visual data that doesn't need translation
  const projectVisuals = useMemo(() => [
    {
      id: 1,
      comingSoon: false,
      image: '/assets/projects/transcricoes-insights-ia/card-home.png',
      gradient: 'linear-gradient(to bottom, #2F968C, #00463F)',
      link: '/projeto/transcricoes-insights-ia'
    },
    {
      id: 2,
      comingSoon: true,
    },
    {
      id: 3,
      comingSoon: true,
    },
  ], []);

  const translatedCards = t<any[]>('horizontalScroll.projectCards') || [];
  const projects = useMemo(() =>
    translatedCards.length > 0 ? translatedCards.map((project, index) => ({
      ...project,
      ...projectVisuals[index]
    })) : projectVisuals,
    [translatedCards, projectVisuals]
  );

  useEffect(() => {
    const updateConstraints = () => {
      if (scrollContainerRef.current) {
        const scrollWidth = scrollContainerRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        // Constraints: right is 0 (start), left is negative (scroll distance)
        setDragConstraints({ left: -(scrollWidth - viewportWidth), right: 0 });
      }
    };

    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, [projects]);

  useEffect(() => {
    const section = sectionRef.current;
    const scrollContainer = scrollContainerRef.current;

    if (!section || !scrollContainer) return;

    const handleWheel = (e: WheelEvent) => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // Check if section is visible (at least 50% in viewport)
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(viewportHeight, rect.bottom);
      const visibleHeight = visibleBottom - visibleTop;
      const isVisible = visibleHeight > sectionHeight * 0.3;

      if (!isVisible) return;

      const scrollWidth = scrollContainer.scrollWidth;
      const viewportWidth = window.innerWidth;
      const maxScroll = -(scrollWidth - viewportWidth + 48); // Account for padding
      const currentX = x.get();

      // Calculate new position
      let newX = currentX - e.deltaY * 1.5;

      // Clamp the value
      newX = Math.max(maxScroll, Math.min(0, newX));

      // If we're at the limits and trying to scroll further, allow vertical scroll
      if ((currentX >= -1 && e.deltaY < 0) || (currentX <= maxScroll + 1 && e.deltaY > 0)) {
        return;
      }

      // Otherwise prevent default and scroll horizontally
      e.preventDefault();
      x.set(newX);
    };

    section.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      section.removeEventListener('wheel', handleWheel);
    };
  }, [x]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const current = x.get();
      const target = current - 300;
      x.set(Math.max(dragConstraints.left, target));
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const current = x.get();
      const target = current + 300;
      x.set(Math.min(dragConstraints.right, target));
    }
  };

  return (
    <section
      id="projetos"
      ref={sectionRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative py-16 md:py-20 bg-[#f2f4f7] z-0 isolate mb-32 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
      aria-label={t('accessibility.projectGallery')}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#f2f4f7] via-purple-100/40 to-[#f2f4f7] -z-10" />

      {/* Content wrapper */}
      <div className="relative flex flex-col overflow-hidden">
        {/* Title */}
        <div className="px-6 md:px-12 mb-6 md:mb-8">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1]"
          >
            {t('horizontalScroll.sectionTitle')}
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '300px' }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="h-[2px] bg-gradient-to-r from-purple-500 to-transparent mt-4"
          />
        </div>

        {/* Projects horizontal scroll */}
        <div className="flex items-center overflow-visible pt-16">
          <motion.div
            ref={scrollContainerRef}
            style={{ x: smoothX }}
            drag="x"
            dragConstraints={dragConstraints}
            className="flex gap-6 md:gap-8 px-6 md:px-12 will-change-transform cursor-grab active:cursor-grabbing"
          >
            {projects.map((project, index) => {
              const hasGradient = 'gradient' in project && project.gradient;
              const isComingSoon = 'comingSoon' in project && project.comingSoon;

              const cardContent = (
                <div className={`relative w-full h-full rounded-3xl ${hasGradient ? '' : 'overflow-hidden'}`}>
                  {/* Background - Gradient, Coming Soon, or Image */}
                  {isComingSoon ? (
                    <>
                      {/* Coming Soon Background - subtle colors */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600" />
                      {/* Coming Soon Badge */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <span className="text-6xl md:text-7xl lg:text-8xl font-bold text-white/15 tracking-tight">
                            {t('horizontalScroll.comingSoon')}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : hasGradient ? (
                    <>
                      {/* Gradient Background - with overflow hidden */}
                      <div
                        className="absolute inset-0 rounded-3xl overflow-hidden"
                        style={{ background: project.gradient }}
                      />
                      {/* Centered image at bottom - can overflow the card on hover */}
                      <div
                        className="absolute inset-x-[5%] bottom-0 top-0 md:top-[10%] flex justify-center items-end pointer-events-none transition-all duration-500 ease-out group-hover:inset-x-[-10%] group-hover:top-[-15%] group-hover:scale-[1.05] origin-bottom"
                      >
                        <ImageWithFallback
                          src={project.image!}
                          alt={project.title}
                          className="w-full h-full object-contain object-bottom"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Regular Image */}
                      <ImageWithFallback
                        src={project.image!}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </>
                  )}

                  {/* Gradient overlay - Keep dark for text readability over images */}
                  <div className={`absolute inset-0 rounded-b-3xl ${hasGradient ? 'bg-gradient-to-t from-black/60 via-transparent to-transparent' : 'bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80'} transition-opacity duration-300`} />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                    {/* Top - Number */}
                    <div className="flex justify-between items-start">
                      <span
                        className="text-5xl md:text-6xl font-medium text-white/30"
                        style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 45 }}
                        className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl border border-white/20 flex items-center justify-center"
                      >
                        <ExternalLink className="text-white" size={20} />
                      </motion.div>
                    </div>

                    {/* Bottom - Info */}
                    <div style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                      <p className={`${hasGradient ? 'text-teal-200' : 'text-purple-300'} mb-2 tracking-wider text-sm md:text-base`}>
                        {project.category} • {project.year}
                      </p>
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Hover effect border */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute inset-0 border-2 ${hasGradient ? 'border-teal-400/50' : 'border-purple-500/50'} rounded-3xl pointer-events-none`}
                  />
                </div>
              );

              return (
                <motion.div
                  key={project.id}
                  className={`relative flex-shrink-0 group cursor-pointer ${hasGradient ? 'overflow-visible' : ''}`}
                  style={{
                    width: 'clamp(300px, 70vw, 600px)',
                    height: 'clamp(220px, 35vh, 380px)'
                  }}
                  whileHover={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  {'link' in project && project.link ? (
                    <Link to={project.link} className="block w-full h-full">
                      {cardContent}
                    </Link>
                  ) : (
                    cardContent
                  )}
                </motion.div>
              );
            })}

            {/* End card */}
            <div
              className="flex-shrink-0 rounded-3xl bg-gradient-to-br from-purple-50 to-white backdrop-blur-xl border border-purple-100 flex items-center justify-center shadow-lg"
              style={{
                width: 'clamp(300px, 70vw, 600px)',
                height: 'clamp(220px, 35vh, 380px)'
              }}
            >
              <div className="text-center p-8">
                <motion.h3
                  whileHover={{ scale: 1.05 }}
                  className="text-3xl md:text-5xl lg:text-6xl font-medium text-purple-900 mb-6"
                >
                  {t('horizontalScroll.ctaTitle')}
                </motion.h3>
                <motion.button
                  onClick={openModal}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-purple-600 text-white rounded-full hover:bg-purple-500 transition-colors cursor-pointer"
                >
                  {t('nav.getInTouch')}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
