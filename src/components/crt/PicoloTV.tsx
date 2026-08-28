import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { ChannelProvider, useChannel } from "./channelContext";
import { useReveal, Arrow } from "./parts";
import Guide from "./Guide";
import { useTranslation } from "../../hooks/useTranslation";
import { useContactModal } from "../../contexts/ContactModalContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { Button } from "../ui/button";
import { ScrollToTop } from "../ScrollToTop";
import logoWebp from "../../assets/logos/Logo.webp";

function Header() {
  const { tune, setGuideOpen } = useChannel();
  const { isPortuguese, language } = useTranslation();
  const { setLanguage } = useLanguage();
  const { openModal } = useContactModal();

  const isPt = language === "pt-BR";

  return (
    <header>
      <div className="wrap">
        <nav>
          <button className="logo cursor-pointer overflow-visible" onClick={() => tune(3)}>
            <img src={logoWebp} alt="Picolo Design" className="logo-img" width="79" height="44" />
          </button>
          <div className="nav-r">
            <button 
              onClick={() => setGuideOpen(true)} 
              className="guide-btn cursor-pointer"
            >
              ☰ Menu
            </button>
            <button 
              onClick={() => setLanguage(isPt ? "en-US" : "pt-BR")} 
              className={`lang-switch cursor-pointer ${isPt ? "" : "en-active"}`}
              aria-label="Toggle language"
            >
              <span className={`lang-option pt ${isPt ? "active" : ""}`}>PT</span>
              <span className="lang-slider"></span>
              <span className={`lang-option en ${!isPt ? "active" : ""}`}>EN</span>
            </button>
            <Button onClick={openModal} variant="navBtn">
              <span>{isPortuguese ? "Fale comigo" : "Talk to me"}</span> <Arrow />
            </Button>
          </div>
        </nav>
      </div>
      <hr className="gradline"/>
    </header>
  );
}

function Footer() {
  const { openModal } = useContactModal();
  const { language, t } = useTranslation();
  const { navigateToSection } = useAppNavigation();

  const cvUrl = language === "en-US"
    ? "/assets/CV/Resume-Rodrigo-Picolo-EN.pdf"
    : "/assets/CV/Curriculo-Rodrigo-Picolo-PT.pdf";

  const linkedinUrl = language === "en-US"
    ? "https://www.linkedin.com/in/picolodesign/?locale=en_US"
    : "https://www.linkedin.com/in/picolodesign/";

  return (
    <footer>
      <hr className="gradline" />
      <div className="wrap">
        <div className="foot flex flex-wrap items-start justify-between py-8 md:pb-10 gap-8">
          <div className="flex flex-col gap-4 items-start max-w-[503px]">
            <img src={logoWebp} alt="Picolo Design" className="footer-logo-img" width="280" height="156" loading="lazy" />
            <p className="text-muted text-sm leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>
          <div className="flex gap-12 md:gap-32 items-start flex-wrap">
            <div className="flex flex-col gap-4 items-start min-w-[70px]">
              <h4 className="font-semibold text-foreground text-sm">
                {t("footer.navigation")}
              </h4>
              <div className="flex flex-col gap-2 items-start">
                <button
                  onClick={() => navigateToSection("home")}
                  className="text-left text-muted hover:text-foreground text-base transition-colors cursor-pointer"
                >
                  {t("footer.navItems.home")}
                </button>
                <button
                  onClick={() => navigateToSection("work")}
                  className="text-left text-muted hover:text-foreground text-base transition-colors cursor-pointer"
                >
                  {t("footer.navItems.projects")}
                </button>
                <button
                  onClick={() => navigateToSection("sobre")}
                  className="text-left text-muted hover:text-foreground text-base transition-colors cursor-pointer"
                >
                  {t("footer.navItems.about")}
                </button>
                <button
                  onClick={() => navigateToSection("expertise")}
                  className="text-left text-muted hover:text-foreground text-base transition-colors cursor-pointer"
                >
                  {t("footer.navItems.expertise")}
                </button>
                <button
                  onClick={() => navigateToSection("contact")}
                  className="text-left text-muted hover:text-foreground text-base transition-colors cursor-pointer"
                >
                  {t("footer.navItems.contact")}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-4 items-start min-w-[75px]">
              <h4 className="font-semibold text-foreground text-sm">
                {t("footer.connect")}
              </h4>
              <div className="flex flex-col gap-2 items-start">
                <a
                  className="text-muted hover:text-foreground text-base transition-colors"
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  className="text-muted hover:text-foreground text-base transition-colors"
                  href="https://wa.me/+5546988281914"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
                <button
                  onClick={openModal}
                  className="text-left text-muted hover:text-foreground text-base transition-colors cursor-pointer"
                >
                  Email
                </button>
                <a
                  className="text-muted hover:text-foreground text-base transition-colors"
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("footer.downloadCV")}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="foot-bot flex flex-wrap items-center justify-between py-4 border-t border-border text-xs text-muted gap-4">
          <span>{t("footer.copyright", { year: 2026 })}</span>
          <span>{t("footer.madeWith")}</span>
        </div>
      </div>
    </footer>
  );
}

function Shell() {
  const { channel } = useChannel();
  const contentRef = useRef<HTMLDivElement>(null);
  useReveal(contentRef, channel);

  // Scroll to top immediately on channel swap
  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;
    const t = setTimeout(() => {
      root.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
    }, 60);
    return () => clearTimeout(t);
  }, [channel]);

  return (
    <>
      <Guide />
      <Header />

      <main id="screen" ref={contentRef}>
        <Outlet />
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}

export default function PicoloTV() {
  return (
    <ChannelProvider>
      <Shell />
    </ChannelProvider>
  );
}
