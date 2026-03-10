import {
  motion,
  useInView,
  AnimatePresence,
} from 'motion/react';
import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { ImageWithFallback } from './ui/ImageWithFallback';
import { ArrowRight, Lock } from 'lucide-react';
import { useContactModal } from '../contexts/ContactModalContext';
import { useTranslation } from '../hooks/useTranslation';
import { getPublishedProjects, PROJECTS } from '../config/projects';


/* ────────────────────────────────────────────
   ProjectVisual — pure visual card (no text)
   ──────────────────────────────────────────── */

interface ProjectVisualProps {
  project: Record<string, any>;
  isActive: boolean;
}

function ProjectVisual({ project, isActive }: ProjectVisualProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const directionRef = useRef<1 | -1>(1);
  const timeoutRef = useRef<NodeJS.Timeout>(undefined);
  const isInView = useInView(cardRef, { amount: 0.3 });
  const [lottieData, setLottieData] = useState<any>(null);
  const { t } = useTranslation();

  const handleComplete = useCallback(() => {
    if (!lottieRef.current) return;

    if (directionRef.current === 1) {
      // Reached the end, reverse and play immediately
      directionRef.current = -1;
      lottieRef.current.setDirection(-1);
      lottieRef.current.play();
    } else {
      // Reached the start (after reversing), wait a bit then play forward again
      directionRef.current = 1;
      lottieRef.current.setDirection(1);

      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (lottieRef.current) {
          lottieRef.current.play();
        }
      }, 1000);
    }
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (project.lottie && isInView) {
      if (!lottieData && !lottieRef.current) {
        fetch(project.lottie)
          .then(res => res.json())
          .then(data => setLottieData(data))
          .catch(err => console.error('Failed to load lottie animation:', err));
      }
    }
  }, [project.lottie, isInView, lottieData]);

  useEffect(() => {
    const video = videoRef.current;
    if (project.video && video) {
      if (isInView && isActive) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => console.warn('Video playback failed:', err));
        }
      }
    }

    // Play control based on visibility (doesn't pause when scrolling away)
    const lottie = lottieRef.current;
    if (project.lottie && lottie) {
      if (isInView && isActive) {
        lottie.play();
      }
    }
  }, [isInView, isActive, project.video, project.lottie]);

  const hasGradient = 'gradientClass' in project && project.gradientClass;

  return (
    <div ref={cardRef} className="absolute inset-0">
      {hasGradient ? (
        <>
          <div className={`absolute inset-0 bg-gradient-to-b ${project.gradientClass}`} />
          <div className={`absolute pointer-events-none ${project.imagePosition === 'center'
            ? `inset-0 ${project.video || project.lottie ? '' : 'inset-4 md:inset-8'} flex justify-center items-center`
            : 'inset-x-6 md:inset-x-[10%] bottom-0 top-[5%] md:top-[12%] flex justify-center items-end origin-bottom'
            }`}>
            {project.lottie && lottieData ? (
              <Lottie
                lottieRef={lottieRef}
                animationData={lottieData}
                loop={false}
                onComplete={handleComplete}
                autoplay={true}
                role="img"
                aria-label={`${t('common.animation')}: ${project.title}`}
                rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
                className={`w-full h-full object-contain ${project.imagePosition === 'center' ? 'object-center' : 'object-bottom'}`}
              />
            ) : project.video ? (
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                aria-label={`${t('common.video')}: ${project.title}`}
                className={`w-full h-full object-cover ${project.imagePosition === 'center' ? 'object-center' : 'object-bottom'}`}
              >
                <source src={project.video} type="video/webm" />
              </video>
            ) : (
              <ImageWithFallback
                src={project.image!}
                alt={project.title}
                className={`w-full h-full object-contain ${project.imagePosition === 'center' ? 'object-center' : 'object-bottom'}`}
              />
            )}
          </div>
        </>
      ) : (
        <div className="absolute inset-0">
          <ImageWithFallback
            src={project.image!}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
}


/* ────────────────────────────────────────────
   ProjectSlide — full-screen slide with stack
   ──────────────────────────────────────────── */

interface ProjectSlideProps {
  project: Record<string, any>;
  index: number;
  isActive: boolean;
}

function ProjectSlide({
  project,
  index,
  isActive,
}: ProjectSlideProps) {
  const { t } = useTranslation();
  const isComingSoon = 'comingSoon' in project && project.comingSoon;
  const slideRef = useRef<HTMLDivElement>(null);
  const slideInView = useInView(slideRef, { once: true, amount: 0.3 });

  return (
    <div
      ref={slideRef}
      data-slide-index={index}
      className="project-gallery__slide flex flex-col items-center justify-center px-5 sm:px-8 md:px-12 lg:px-16"
    >
      {/* ── Wrapper: card + painel sobrepostos ── */}
      <div className="project-card-wrapper w-full">

        {/* Card 16:9 — raio só no topo, sem borda, acima do painel */}
        <motion.div
          className="project-card-active relative w-full rounded-t-2xl md:rounded-t-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.33, 1, 0.68, 1] }}
          viewport={{ once: true, amount: 0.4 }}
        >
          {'link' in project && project.link && !isComingSoon ? (
            <Link
              to={project.link}
              className="absolute inset-0"
              tabIndex={-1}
              aria-label={project.title}
            >
              <ProjectVisual project={project} isActive={isActive} />
            </Link>
          ) : (
            <ProjectVisual project={project} isActive={isActive} />
          )}
        </motion.div>

        {/* Painel de título — desliza de trás do card */}
        <div className="project-info-panel w-full overflow-hidden">
          <motion.div
            animate={{ y: slideInView ? 0 : '-100%' }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
          >
            <div className="project-info-panel__inner" data-panel-theme={project.panelTheme}>
              {/* Left: title + meta */}
              <div className="flex-1 min-w-0">
                <h3 className="project-text-strip__title truncate text-white">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs sm:text-sm font-medium text-white/60 uppercase tracking-wider">
                    {project.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/30 shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-white/40 uppercase tracking-wider">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <div className="project-info-panel__cta">
                {isComingSoon ? (
                  <span className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-sm font-medium transition-all duration-300 bg-white/5 border border-white/10 text-white/40 cursor-not-allowed shadow-sm select-none">
                    <span>{t('horizontalScroll.comingSoon')}</span>
                    <Lock size={14} className="opacity-80" />
                  </span>
                ) : 'link' in project && project.link ? (
                  <Link
                    to={project.link}
                    className="group/cta inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-sm font-medium text-white transition-all duration-300 bg-white/25 hover:bg-white/40 border border-white/30 hover:border-white/60 shadow-lg backdrop-blur-sm"
                    aria-label={`${t('common.viewProject')}: ${project.title}`}
                  >
                    <span>{t('common.viewProject')}</span>
                    <ArrowRight size={14} className="group-hover/cta:translate-x-0.5 transition-transform duration-200" />
                  </Link>
                ) : null}
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}


/* ────────────────────────────────────────────
   HorizontalScroll — Snap Gallery
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

  const totalSlides = projects.length;

  /* ── observe active slide via IntersectionObserver ── */
  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const slides = gallery.querySelectorAll<HTMLElement>('.project-gallery__slide');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.slideIndex);
            if (!isNaN(idx)) setActiveIndex(idx);
          }
        });
      },
      { root: null, threshold: 0.5 },
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [projects]);

  /* ── scroll to slide — centres the card visually below the nav ── */
  const scrollToSlide = useCallback((idx: number) => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const slide = gallery.querySelector<HTMLElement>(`[data-slide-index="${idx}"]`);
    if (!slide) return;

    // Nav height offset (fixed header ~64px on desktop, smaller on mobile)
    const navOffset = window.innerWidth >= 1024 ? 64 : 56;

    // Card element (first child of slide)
    const card = slide.querySelector<HTMLElement>('.project-card-active');
    const panel = slide.querySelector<HTMLElement>('.project-info-panel');

    if (card) {
      const cardH = card.offsetHeight;
      const panelH = panel ? panel.offsetHeight : 0;
      const totalContentH = cardH + panelH;
      const availableH = window.innerHeight - navOffset;
      // Top position so content is vertically centred in available space
      const slideTop = slide.getBoundingClientRect().top + window.scrollY;
      const padTop = Math.max(0, (availableH - totalContentH) / 2);
      const targetY = slideTop - navOffset - padTop;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    } else {
      // Fallback for CTA slide
      const slideTop = slide.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: slideTop - navOffset, behavior: 'smooth' });
    }
  }, []);

  const sectionInView = useInView(sectionRef, { amount: 0.05 });



  return (
    <section
      id="projetos"
      ref={sectionRef}
      className="relative bg-[#f2f4f7] z-0 isolate"
      aria-label={t('accessibility.projectGallery')}
    >
      {/* ── subtle background ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f2f4f7] via-purple-50/30 to-[#f2f4f7] -z-10" />

      {/* ── section title ── */}
      <div className="px-5 sm:px-8 md:px-12 lg:px-16 pt-20 md:pt-28 pb-10 md:pb-14">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-[2.75rem] sm:text-[3.5rem] md:text-7xl font-medium text-slate-900 tracking-tight leading-[1.1]"
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
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-zinc-600 text-lg leading-relaxed mt-6"
        >
          {t('horizontalScroll.sectionDescription')}
        </motion.p>
      </div>

      {/* ── snap gallery ── */}
      <div ref={galleryRef} className="project-gallery">

        {/* Project slides */}
        {projects.map((project, index) => (
          <ProjectSlide
            key={project.id}
            project={project}
            index={index}
            isActive={index === activeIndex}
          />
        ))}

        {/* CTA slide — auto height, not full screen */}
        <div
          data-slide-index={projects.length}
          className="project-gallery__cta-slide px-5 sm:px-8 md:px-12 lg:px-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.5 }}
            className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 py-16 md:py-24 border-t border-slate-200"
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

      {/* ── progress dots (desktop only) ── */}
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
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToSlide(i)}
                className={`project-progress__dot ${i === activeIndex ? 'project-progress__dot--active' : ''}`}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </section>
  );
}
