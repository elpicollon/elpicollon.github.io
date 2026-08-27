import { useTranslation } from "../../hooks/useTranslation";
import { useContactModal } from "../../contexts/ContactModalContext";
import { useTypewriter } from "../../hooks/useTypewriter";
import { Arrow } from "../crt/parts";
import { Button } from "./button";

const CTA_WORDS_PT = ["inteligente", "relevante", "memorável", "escalável", "incrível", "transformador"];
const CTA_WORDS_EN = ["intelligent", "relevant", "memorable", "scalable", "extraordinary", "transformative"];

export interface ContactSectionProps {
  description?: string;
  useTypewriterEffect?: boolean;
  className?: string;
  cardWrapClassName?: string;
  showBorderTop?: boolean;
}

export function ContactSection({
  description,
  useTypewriterEffect = true,
  className = "",
  cardWrapClassName = "contact-card-wrap reveal",
  showBorderTop = false
}: ContactSectionProps) {
  const { openModal } = useContactModal();
  const { isPortuguese, language } = useTranslation();

  const ctaWords = isPortuguese ? CTA_WORDS_PT : CTA_WORDS_EN;
  const typedCtaWord = useTypewriter(ctaWords);

  const cvUrl = language === "en-US"
    ? "/assets/CV/Resume-Rodrigo-Picolo-EN.pdf"
    : "/assets/CV/Curriculo-Rodrigo-Picolo-PT.pdf";

  const defaultDescription = isPortuguese
    ? "Transformando conceitos complexos em experiências digitais intuitivas e bem estruturadas. Fale comigo."
    : "Turning complex ideas into end-to-end digital experiences. Tell me what you're working on.";

  return (
    <section id="contact" className={`contact ${showBorderTop ? "mt-16 pt-16 border-t border-line" : ""} ${className}`}>
      <div className="wrap">
        <div className={cardWrapClassName}>
          <div className="contact-card">
            {useTypewriterEffect ? (
              <h2 aria-label={isPortuguese ? "Vamos criar algo inteligente." : "Let's build something intelligent."}>
                {isPortuguese ? (
                  <>Vamos criar algo <span className="hl typewriter-container" aria-hidden="true">{typedCtaWord}<span className="typewriter-cursor" /></span>.</>
                ) : (
                  <>Let's build something <span className="hl typewriter-container" aria-hidden="true">{typedCtaWord}<span className="typewriter-cursor" /></span>.</>
                )}
              </h2>
            ) : (
              <h2>
                {isPortuguese ? (
                  <>Crie algo <span className="hl">inteligente</span>.</>
                ) : (
                  <>Build something <span className="hl">intelligent</span>.</>
                )}
              </h2>
            )}

            <p>{description || defaultDescription}</p>

            <div className="row flex-col sm:flex-row w-full sm:w-auto">
              <Button onClick={openModal} variant="solid" className="w-full sm:w-auto justify-center">
                {isPortuguese ? "Fale comigo" : "Talk to me"} <Arrow />
              </Button>
              <Button asChild variant="line" className="w-full sm:w-auto justify-center">
                <a href={cvUrl} target="_blank" rel="noopener noreferrer">
                  {isPortuguese ? "Baixar Currículo" : "Download Resume"}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
