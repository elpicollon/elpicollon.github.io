import { useState, useEffect, useRef } from "react";
import { Arrow, BroadcastStrip } from "./parts";
import { ScrollIndicator } from "../ui/ScrollIndicator";
import { useTranslation } from "../../hooks/useTranslation";
import { useTypewriter } from "../../hooks/useTypewriter";
import { SectionHeader } from "../ui/SectionHeader";
import { ContactSection } from "../ui/ContactSection";
import { LottieCardMedia } from "../ui/LottieCardMedia";
import { Button } from "../ui/button";
import { StatCard } from "../ui/StatCard";
import { LogoMarquee } from "../ui/LogoMarquee";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "motion/react";
import { carouselItems } from "../../config/carousel";
import { Link } from "react-router-dom";

import imgEu1 from "../../assets/image-rp.webp";
import cardTranscricoes from "../../assets/figma-cards/transcricoes.webp";
import cardMedical from "../../assets/figma-cards/medical.webp";
import cardImportacao from "../../assets/figma-cards/importacao.webp";
import cardNotetaker from "../../assets/figma-cards/notetaker.webp";

interface WorkItem {
  id: string;
  title: string;
  titlePt: string;
  year: string;
  disc: string;
  discPt: string;
  blurbKey: string;
  path: string;
  image: string;
  lottie?: string;
  gradientClass: string;
}

const workItems: WorkItem[] = [
  {
    id: "ia-notetaker-app",
    title: "AI Notetaker — Leads2b",
    titlePt: "IA Notetaker — Leads2b",
    year: "2025",
    disc: "Product Design",
    discPt: "Design de Produto",
    blurbKey: "work.notetakerBlurb",
    path: "/projeto/ia-notetaker-app",
    image: cardNotetaker,
    lottie: "/assets/projects/ia-notetaker-app/notetakerIA.json",
    gradientClass: "card-bg-notetaker"
  },
  {
    id: "transcricoes-insights-ia",
    title: "Transcriptions & AI Insights",
    titlePt: "Transcrições & Insights com IA",
    year: "2024",
    disc: "Product Design",
    discPt: "Design de Produto",
    blurbKey: "work.transcricoesBlurb",
    path: "/projeto/transcricoes-insights-ia",
    image: cardTranscricoes,
    lottie: "/assets/projects/transcricoes-insights-ia/transcricoesIA.json",
    gradientClass: "card-bg-transcricoes"
  },
  {
    id: "medical-office",
    title: "Medical Office — Web App",
    titlePt: "Medical Office — Web App",
    year: "2021",
    disc: "Product Design",
    discPt: "Design de Produto",
    blurbKey: "work.medicalBlurb",
    path: "/projeto/medical-office",
    image: cardMedical,
    lottie: "/assets/projects/medical-office/medoffice.json",
    gradientClass: "card-bg-medical"
  },
  {
    id: "importacao-empresas",
    title: "Company Import",
    titlePt: "Importação de Empresas",
    year: "2025",
    disc: "Product Design",
    discPt: "Design de Produto",
    blurbKey: "work.importacaoBlurb",
    path: "/projeto/importacao-empresas",
    image: cardImportacao,
    lottie: "/assets/projects/importacao-empresas/importemp.json",
    gradientClass: "card-bg-importacao"
  }
];

function TVShowcaseCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const { navigateToSection } = useAppNavigation();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 90, damping: 22 };
  
  const parallaxX = useSpring(useTransform(mouseX, [-200, 200], [15, -15]), springConfig);
  const parallaxY = useSpring(useTransform(mouseY, [-200, 200], [10, -10]), springConfig);

  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [-8, 8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [8, -8]), springConfig);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const updateRect = () => {
    if (showcaseRef.current) {
      rectRef.current = showcaseRef.current.getBoundingClientRect();
    }
  };

  const handleMouseEnter = () => {
    updateRect();
    setIsHovered(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!rectRef.current) {
      updateRect();
    }
    const rect = rectRef.current;
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    rectRef.current = null;
    setIsHovered(false);
  };

  const activeItem = carouselItems[currentIndex];
  const accentColor = activeItem.gradient[0] || "#5FE08C";

  return (
    <div 
      ref={showcaseRef}
      className="relative w-full h-[240px] sm:h-[320px] md:h-[420px] lg:h-[460px] flex items-center justify-center cursor-pointer select-none group"
      onClick={() => navigateToSection("work")}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="absolute w-4/5 h-4/5 rounded-full blur-[80px] opacity-40 transition-all duration-1000 pointer-events-none z-0" 
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`
        }} 
      />

      <motion.div 
        className="w-full h-full flex items-center justify-center relative z-10"
        style={{
          x: parallaxX,
          y: parallaxY,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 1000
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, y: [-6, 6, -6] }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              opacity: { duration: 0.5, ease: "easeInOut" },
              scale: { duration: 0.5, ease: "easeInOut" },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-full h-full flex items-center justify-center [transform:translateZ(30px)]"
          >
            <img 
              src={activeItem.src} 
              alt={activeItem.alt} 
              className="max-w-full max-h-full object-contain scale-100 sm:scale-115 md:scale-130 lg:scale-130"
              loading="eager"
              {...{ fetchpriority: currentIndex === 0 ? "high" : "auto" }}
              style={{
                filter: `drop-shadow(0 20px 45px ${accentColor}50)`
              }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

const teachingEventPhotos = [
  { src: "/assets/about/evento-1.webp" },
  { src: "/assets/about/evento-2.webp" },
  { src: "/assets/about/evento-3.webp" },
  { src: "/assets/about/evento-4.webp" },
  { src: "/assets/about/evento-5.webp" }
];

export default function HomeChannel() {
  const { navigateToAbout } = useAppNavigation();
  const { isPortuguese, language, t } = useTranslation();

  const heroWords = t<string[]>('homeChannel.heroWords');
  const typedWord = useTypewriter(Array.isArray(heroWords) ? heroWords : ["inteligência", "estratégia"]);

  const eventsData = t<Array<{ title: string; subtitle: string }>>('aboutPage.events');

  const [teachingEventIndex, setTeachingEventIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTeachingEventIndex((prev) => (prev + 1) % teachingEventPhotos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentTeachingEvent = teachingEventPhotos[teachingEventIndex];
  const currentEventInfo = Array.isArray(eventsData) && eventsData[teachingEventIndex] ? eventsData[teachingEventIndex] : null;

  const linkedinUrl = language === "en-US"
    ? "https://www.linkedin.com/in/picolodesign/?locale=en_US"
    : "https://www.linkedin.com/in/picolodesign/";

  const aiSteps = t<Array<{ number: string; title: string; desc: string }>>('homeChannel.aiProcess.steps');
  const expertiseCards = t<Array<{ title: string; desc: string }>>('homeChannel.expertise.cards');
  const teachingRoles = t<Array<{ title: string; desc: string }>>('homeChannel.teaching.roles');

  return (
    <>
      {/* HERO */}
      <div className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div className="flex flex-col justify-center">
              <h1 aria-label={t('homeChannel.hero.ariaLabel')}>
                {t('homeChannel.hero.titleLine1')}<br />
                {t('homeChannel.hero.titleLine2')} <span className="hl typewriter-container" aria-hidden="true">{typedWord}<span className="typewriter-cursor" /></span><br />
                {t('homeChannel.hero.titleLine3')}
              </h1>
              <div className="cred">
                <span><i className="mark"></i>{t('homeChannel.hero.yearsTech')}</span>
                <span><i className="mark"></i>{t('homeChannel.hero.yearsUX')}</span>
                <span><i className="mark p"></i>{t('homeChannel.hero.professor')}</span>
                <span><i className="mark p"></i>{t('homeChannel.hero.speaker')}</span>
              </div>
            </div>
            <TVShowcaseCarousel />
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-20">
          <ScrollIndicator />
        </div>
      </div>

      {/* WORK / PROJETOS EM DESTAQUE */}
      <section id="work" className="bg-background py-12 sm:py-16 lg:py-20">
        <div className="wrap">
          <SectionHeader
            title={t('homeChannel.featuredProjects')}
          />

          <div className="worklist reveal flex flex-col gap-10 sm:gap-14 lg:gap-16">
            {workItems.map((item) => {
              const displayTitle = isPortuguese ? item.titlePt : item.title;
              const displayDisc = isPortuguese ? item.discPt : item.disc;

              return (
                <Link 
                  key={item.id}
                  to={item.path}
                  className="wcard grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center group block no-underline transition-all duration-300" 
                >
                  {/* Left side: Figma mockup image inside card container */}
                  <div className="media-wrap">
                    <div 
                      className={`media cut flex items-center justify-center relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.01] ${item.gradientClass}`}
                    >
                      <LottieCardMedia
                        lottieUrl={item.lottie}
                        fallbackImage={item.image}
                        title={displayTitle}
                      />
                    </div>
                  </div>

                  {/* Right side: Project Text & CTA */}
                  <div className="flex flex-col gap-4 sm:gap-6 items-start">
                    <div className="flex flex-col gap-2">
                      <h3 className="group-hover:text-primary transition-colors">
                        {displayTitle}
                      </h3>
                      <span className="text-muted-foreground text-xs font-mono tracking-wider uppercase">
                        {item.year} · {displayDisc}
                      </span>
                    </div>
                  <p className="text-muted text-sm sm:text-base leading-relaxed">
                    {isPortuguese 
                      ? (item.id === "transcricoes-insights-ia" ? "Uma plataforma web que transcreve reuniões e apresenta insights acionados por IA — sentimento, objeções e próximos passos — em uma experiência de revisão focada."
                        : item.id === "medical-office" ? "Aplicativo web voltado para pacientes para encontrar clínicas, comparar disponibilidade e agendar consultas, equilibrando dados médicos densos com uma interface confiável."
                        : item.id === "importacao-empresas" ? "Fluxo de importação de empresas em massa para plataforma B2B — transformando um processo complexo de planilha para banco de dados em uma experiência guiada e tolerante a falhas."
                        : "Notetaker mobile em IA que captura, transcreve e estrutura conversas de vendas em tempo real — transformando chamadas brutas em registros acionáveis para o CRM.")
                      : (item.id === "transcricoes-insights-ia" ? "A web platform that transcribes meetings and surfaces AI-driven insights — sentiment, objections and next steps — inside a focused review experience."
                        : item.id === "medical-office" ? "A patient-facing web app to find clinics, compare availability and book appointments, balancing dense medical data with a calm, trustworthy interface."
                        : item.id === "importacao-empresas" ? "A bulk company-import flow for a B2B platform — taming a messy spreadsheet-to-database process into a guided, forgiving, error-tolerant experience."
                        : "A mobile-first AI notetaker that captures, transcribes and structures sales conversations in real time — turning raw calls into actionable CRM records.")}
                  </p>
                  <span className="go group-hover:bg-primary transition-colors">
                    {t('homeChannel.viewProject')} <Arrow />
                  </span>
                </div>
              </Link>
            );
          })}
          </div>
        </div>
      </section>

      {/* SOBRE RODRIGO */}
      <section id="about">
        <div className="wrap">
          <SectionHeader
            title={t('homeChannel.about.title')}
          />

          <div className="about reveal">
            <div className="flex flex-col gap-6 sm:gap-8">
              <div className="numbers">
                <StatCard value="12+" label={t('homeChannel.about.yearsTechLabel')} />
                <StatCard value="7+" label={t('homeChannel.about.yearsUXLabel')} />
                <StatCard value="50+" label={t('homeChannel.about.projectsLabel')} />
                <StatCard value="16+" label={t('homeChannel.about.certsLabel')} />
              </div>

              <div className="txt">
                <p dangerouslySetInnerHTML={{ __html: t('homeChannel.about.p1') }} />
                <p dangerouslySetInnerHTML={{ __html: t('homeChannel.about.p2') }} />
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-3 sm:gap-4 w-full">
                <Button onClick={() => navigateToAbout()} variant="solid">
                  {t('homeChannel.about.cta')} <Arrow />
                </Button>
                <Button asChild variant="line">
                  <a 
                    href={linkedinUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                  >
                    {t('homeChannel.about.linkedinCta')} <Arrow />
                  </a>
                </Button>
              </div>
            </div>

            <div className="portrait-wrap">
              <figure className="portrait cut">
                <img src={imgEu1} alt="Rodrigo Picolo" />
              </figure>
            </div>
          </div>

          {/* Infinite Marquee */}
          <LogoMarquee />
        </div>
      </section>

      {/* AI PROCESS */}
      <section id="ai" className="ai">
        <div className="wrap">
          <SectionHeader
            title={t('homeChannel.aiProcess.title')}
            className="mb-4 sm:mb-6"
          />

          <p className="lead text-muted text-base sm:text-lg leading-relaxed max-w-full mb-10 sm:mb-16 lg:mb-20 reveal">
            {t('homeChannel.aiProcess.lead')}
          </p>

          <div className="reveal">
            <div className="steps">
              {Array.isArray(aiSteps) && aiSteps.map((step) => (
                <div className="step-wrap" key={step.number}>
                  <div className="step">
                    <div className="n">{step.number}</div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section id="expertise">
        <div className="wrap">
          <SectionHeader
            title={t('homeChannel.expertise.title')}
            className="mb-4 sm:mb-6"
          />

          <p className="lead text-muted text-base sm:text-lg leading-relaxed max-w-full mb-10 sm:mb-16 lg:mb-20 reveal">
            {t('homeChannel.expertise.lead')}
          </p>

          <div className="exp-grid reveal">
            {Array.isArray(expertiseCards) && expertiseCards.map((card) => (
              <div className="exp-wrap" key={card.title}>
                <div className="exp">
                  <div className="ic">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <rect x="2" y="2" width="12" height="12" stroke="currentColor" strokeWidth="1.4" />
                      <path d="M2 6h12" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUTHORITY / TEACHING */}
      <section id="teaching">
        <div className="wrap">
          <div className="teach reveal">
            <BroadcastStrip 
              tag={t('homeChannel.teaching.tag')}
              seg={t('homeChannel.teaching.seg')}
            />

            <div className="teach-grid mt-6">
              <div 
                className="stage-wrap cursor-pointer"
                onClick={() => navigateToAbout("palestras")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    navigateToAbout("palestras");
                  }
                }}
                title={isPortuguese ? "Ver palestras e eventos" : "View talks and events"}
                aria-label={isPortuguese ? "Ver palestras e eventos" : "View talks and events"}
              >
                <figure className="stage cut">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentTeachingEvent.src}
                      src={currentTeachingEvent.src}
                      alt={currentEventInfo?.title || "Rodrigo Picolo on stage"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  </AnimatePresence>
                  <div className="cap label">
                    <b>{currentEventInfo?.title || "ON STAGE"}</b>
                    {currentEventInfo?.subtitle && <span>{currentEventInfo.subtitle}</span>}
                  </div>
                </figure>
              </div>

              <div className="teach-text">
                <blockquote className="quote" dangerouslySetInnerHTML={{ __html: t('homeChannel.teaching.quote') }} />
                <div className="roles">
                  {Array.isArray(teachingRoles) && teachingRoles.map((role) => (
                    <div className="row" key={role.title}>
                      <span className="t">{role.title}</span>
                      <span className="d">{role.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT (PREMIUM CALL TO ACTION) */}
      <ContactSection />
    </>
  );
}
