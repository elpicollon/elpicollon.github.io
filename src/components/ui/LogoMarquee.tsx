import { motion } from "motion/react";
import logo1 from "../../assets/logos/1.webp";
import logo2 from "../../assets/logos/2.webp";
import logo3 from "../../assets/logos/3.webp";
import logo4 from "../../assets/logos/4.webp";
import logo5 from "../../assets/logos/5.webp";
import logo6 from "../../assets/logos/6.webp";
import logo7 from "../../assets/logos/7.webp";
import logo8 from "../../assets/logos/8.webp";
import logo9 from "../../assets/logos/9.webp";
import logo10 from "../../assets/logos/10.webp";
import logo11 from "../../assets/logos/11.webp";
import logo13 from "../../assets/logos/13.webp";
import logo15 from "../../assets/logos/15.webp";
import logo16 from "../../assets/logos/16.webp";
import logo17 from "../../assets/logos/17.webp";
import logo18 from "../../assets/logos/18.webp";

export const logoImages = [
  { src: logo1, alt: 'Logo Lojhan' },
  { src: logo2, alt: 'Logo Itt' },
  { src: logo3, alt: 'Logo INDT' },
  { src: logo4, alt: 'Logo InoBram' },
  { src: logo5, alt: 'Logo THDFM' },
  { src: logo6, alt: 'Logo Autêntica' },
  { src: logo7, alt: 'Logo Gattini' },
  { src: logo8, alt: 'Logo Marcelle Calegari' },
  { src: logo9, alt: 'Logo UniMater' },
  { src: logo10, alt: 'Logo Prepel' },
  { src: logo11, alt: 'Logo Coffbox' },
  { src: logo13, alt: 'Logo Lequipe' },
  { src: logo15, alt: 'Logo Super Anos 80' },
  { src: logo16, alt: 'Logo Leads2b' },
  { src: logo17, alt: 'Logo Sisand' },
  { src: logo18, alt: 'Logo Viasoft' }
];

interface LogoMarqueeProps {
  className?: string;
  duration?: number;
}

export function LogoMarquee({ className = "", duration = 40 }: LogoMarqueeProps) {
  const marqueeLogos = [...logoImages, ...logoImages];

  return (
    <div className={`w-full overflow-hidden pb-8 sm:pb-12 eb-marquee-mask reveal ${className}`}>
      <motion.div
        className="flex gap-8 sm:gap-12 items-center w-fit"
        animate={{ x: "-50%" }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {marqueeLogos.map((logo, index) => (
          <div
            key={index}
            className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 w-40 sm:w-60 h-16 sm:h-24 shrink-0 overflow-hidden flex items-center justify-center"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              width="240"
              height="100"
              className="max-w-full max-h-full object-contain block"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
