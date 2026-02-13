import {
  motion,
  useInView,
  AnimatePresence,
} from 'motion/react';
import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from './ui/ImageWithFallback';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useContactModal } from '../contexts/ContactModalContext';
import { useTranslation } from '../hooks/useTranslation';
import { getPublishedProjects, PROJECTS } from '../config/projects';

/** Mix a hex colour toward white to create a softer tint (0 = original, 1 = white) */
function lightenHex(hex: string, amount = 0.55): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  const lr = Math.round(r + (255 - r) * amount);
  const lg = Math.round(g + (255 - g) * amount);
  const lb = Math.round(b + (255 - b) * amount);
  return `rgb(${lr}, ${lg}, ${lb})`;
}

/* ────────────────────────────────────────────
   ProjectCard — Individual card with 3D tilt
   ──────────────────────────────────────────── */

interface ProjectCardProps {
  project: Record<string, any>;
  index: number;
  total: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const hasGradient = 'gradient' in project && project.gradient;
  const isComingSoon = 'comingSoon' in project && project.comingSoon;

  const cardContent = (
    <div
      ref={cardRef}
      className="project-card w-full h-full"
    >
      <div
        className="project-card__inner relative w-full h-full rounded-3xl overflow-hidden"
      >
        {/* ── background ── */}
        {isComingSoon ? (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl md:text-8xl font-bold text-white/10 tracking-tight select-none">
                {project.comingSoonLabel}
              </span>
            </div>
          </div>
        ) : hasGradient ? (
          <>
            <div
              className="absolute inset-0"
              style={{ background: project.gradient }}
            />
            <div className="absolute inset-x-[5%] bottom-0 top-0 md:top-[10%] flex justify-center items-end pointer-events-none project-card__gradient-image origin-bottom">
              <ImageWithFallback
                src={project.image!}
                alt={project.title}
                className="w-full h-full object-contain object-bottom"
              />
            </div>
          </>
        ) : (
          <div className="absolute inset-0">
            <ImageWithFallback
              src={project.image!}
              alt={project.title}
              className="w-full h-full object-cover project-card__image"
            />
          </div>
        )}

        {/* ── gradient overlay ── */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${hasGradient
            ? 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'
            : 'bg-gradient-to-t from-black/80 via-black/40 to-transparent'
            }`}
        />

        {/* ── content ── */}
        <div className="absolute inset-0 p-8 md:p-12 flex flex-col-reverse md:flex-col justify-between z-10">
          {/* arrow button — bottom on mobile, top-right on desktop */}
          <div className="flex justify-end md:justify-between items-start">
            <span className="hidden md:block text-[7rem] font-bold leading-none text-white/[0.07] select-none">
              {String(index + 1).padStart(2, '0')}
            </span>

            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-[360deg] group-hover:bg-white/20">
              <ArrowRight className="text-white" size={18} />
            </div>
          </div>

          {/* text info — top on mobile, bottom on desktop */}
          <div>
            <p
              className="mb-3 tracking-widest text-xs md:text-sm uppercase font-medium"
              style={{ color: hasGradient ? lightenHex(project.primaryColor) : undefined }}
            >
              <span className={hasGradient ? '' : 'text-purple-300/90'}>
                {project.category} · {project.year}
              </span>
            </p>

            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.1] tracking-tight">
              {project.title}
            </h3>
          </div>
        </div>

        {/* ── hover border ── */}
        <div
          className="absolute inset-0 rounded-3xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border-white/20"
        />
      </div>
    </div>
  );

  return (
    <div className="group h-full">
      {'link' in project && project.link ? (
        <Link to={project.link} className="block w-full h-full">
          {cardContent}
        </Link>
      ) : (
        <div className="w-full h-full">
          {cardContent}
        </div>
      )}
    </div>
  );

}

/* ────────────────────────────────────────────
   HorizontalScroll — Cinematic Gallery
   ──────────────────────────────────────────── */

export function HorizontalScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { openModal } = useContactModal();
  const { t } = useTranslation();

  /* ── project data ── */
  const projectVisuals = useMemo(
    () =>
      getPublishedProjects().map((project) => ({
        ...project,
        link: project.route,
      })),
    [],
  );

  const translatedCards = t<any[]>('horizontalScroll.projectCards') || [];

  const projects = useMemo(() => {
    return projectVisuals.map((visual) => {
      const originalIndex = PROJECTS.findIndex((p) => p.id === visual.id);
      const translation = translatedCards[originalIndex] || {};
      return {
        ...visual,
        ...translation,
        comingSoonLabel: t('horizontalScroll.comingSoon'),
      };
    });
  }, [translatedCards, projectVisuals, t]);

  const totalSlides = projects.length; // only project cards, exclude CTA

  /* ── observe active slide via IntersectionObserver ── */
  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const slides = gallery.querySelectorAll<HTMLElement>(
      '.project-gallery__slide',
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(
              (entry.target as HTMLElement).dataset.slideIndex,
            );
            if (!isNaN(idx)) setActiveIndex(idx);
          }
        });
      },
      { root: null, threshold: 0.5 },
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [projects]);

  /* ── scroll to slide ── */
  const scrollToSlide = useCallback(
    (idx: number) => {
      const gallery = galleryRef.current;
      if (!gallery) return;
      const slide = gallery.querySelector<HTMLElement>(
        `[data-slide-index="${idx}"]`,
      );
      slide?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    [],
  );

  /* ── section in-view for progress indicator visibility ── */
  const sectionInView = useInView(sectionRef, { amount: 0.1 });

  return (
    <section
      id="projetos"
      ref={sectionRef}
      className="relative bg-[#f2f4f7] z-0 isolate"
      aria-label={t('accessibility.projectGallery')}
    >
      {/* ── subtle background ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f2f4f7] via-purple-50/30 to-[#f2f4f7] -z-10" />

      {/* ── title ── */}
      <div className="px-6 md:px-12 pt-20 md:pt-28 pb-8 md:pb-12">
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

      {/* ── scroll gallery ── */}
      <div
        ref={galleryRef}
        className="project-gallery px-6 md:px-12"
        style={{ maxHeight: 'none' }}
      >
        {/* Project slides */}
        {projects.map((project, index) => (
          <div
            key={project.id}
            data-slide-index={index}
            className="project-gallery__slide pb-8 md:pb-12"
          >
            <div
              style={{
                height: 'clamp(360px, 60vh, 700px)',
              }}
            >
              <ProjectCard
                project={project}
                index={index}
                total={projects.length}
              />
            </div>
          </div>
        ))}

        {/* CTA — horizontal footer-style bar */}
        <div
          data-slide-index={projects.length}
          className="project-gallery__slide pt-4 pb-20 md:pb-28"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-slate-200"
          >
            <h3 className="text-xl md:text-2xl font-medium text-slate-800 tracking-tight text-center sm:text-left">
              {t('horizontalScroll.ctaTitle')}
            </h3>

            <motion.button
              onClick={openModal}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-medium rounded-full hover:from-purple-700 hover:to-violet-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 group/btn"
            >
              <span className="inline-flex items-center gap-3">
                {t('nav.getInTouch')}
                <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* ── progress indicator (desktop) ── */}
      <AnimatePresence>
        {sectionInView && (
          <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
            className="project-progress"
            aria-label="Project navigation"
          >
            <span className="project-progress__counter">
              {String(Math.min(activeIndex + 1, totalSlides)).padStart(2, '0')}
            </span>

            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToSlide(i)}
                className={`project-progress__dot ${i === activeIndex ? 'project-progress__dot--active' : ''
                  }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}

            <span className="project-progress__counter">
              {String(totalSlides).padStart(2, '0')}
            </span>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ── scroll hint (shows only at first slide) ── */}
      <AnimatePresence>
        {activeIndex === 0 && sectionInView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-slate-400"
          >
            <span className="text-xs tracking-widest uppercase">
              {t('hero.scrollIndicator')}
            </span>
            <ChevronDown size={16} className="animate-scroll-hint" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
