import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, ArrowRight } from 'lucide-react';
import imgEu1 from "../assets/image-rp.png";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useTranslation } from '../hooks/useTranslation';
import { useLanguage } from '../contexts/LanguageContext';

// Logo images from assets/logos with company names
import logo1 from '../assets/logos/1.png';
import logo2 from '../assets/logos/2.png';
import logo3 from '../assets/logos/3.png';
import logo4 from '../assets/logos/4.png';
import logo5 from '../assets/logos/5.png';
import logo6 from '../assets/logos/6.png';
import logo7 from '../assets/logos/7.png';
import logo8 from '../assets/logos/8.png';
import logo9 from '../assets/logos/9.png';
import logo10 from '../assets/logos/10.png';
import logo11 from '../assets/logos/11.png';
import logo12 from '../assets/logos/12.png';
import logo13 from '../assets/logos/13.png';
import logo15 from '../assets/logos/15.png';
import logo16 from '../assets/logos/16.png';
import logo17 from '../assets/logos/17.png';
import logo18 from '../assets/logos/18.png';

const logoImages = [
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
  { src: logo12, alt: 'Logo Alex Mamed' },
  { src: logo13, alt: 'Logo Lequipe' },
  { src: logo15, alt: 'Logo Super Anos 80' },
  { src: logo16, alt: 'Logo Leads2b' },
  { src: logo17, alt: 'Logo Sisand' },
  { src: logo18, alt: 'Logo Viasoft' }
];

export function AboutSection() {
  const containerRef = useRef(null);
  const { t } = useTranslation();
  const { translations, language } = useLanguage();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Dynamic LinkedIn URL based on language
  const linkedinUrl = language === 'en-US'
    ? 'https://www.linkedin.com/in/picolodesign/?locale=en_US'
    : 'https://www.linkedin.com/in/picolodesign/';

  return (
    <section id="sobre" ref={containerRef} className="relative pt-16 pb-0 bg-[#f2f4f7] overflow-hidden z-40">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-200/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="px-6 md:px-12 relative z-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-[2.75rem] sm:text-[3.5rem] md:text-7xl [@media(min-width:2560px)]:text-8xl [@media(min-width:3840px)]:text-9xl font-medium text-slate-900 tracking-tight leading-[1.1] mb-6"
          >
            {t('about.sectionTitle')}
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="h-[1px] bg-gradient-to-r from-purple-500 via-violet-500 to-transparent"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-center">

          {/* Left: Text Content */}
          <div className="order-2 lg:order-1 lg:pr-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6 text-zinc-600 text-lg leading-relaxed w-full">
                <p dangerouslySetInnerHTML={{ __html: t('about.description') }} />
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-8">
                  {translations.about.skills.map((item: string, index: number) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08, duration: 0.4 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 text-zinc-600 group"
                    >
                      <span className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm shadow-purple-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span className="text-base group-hover:text-zinc-900 transition-colors duration-200">{item}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA to AboutPage */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="mt-8"
                >
                  <Link
                    to="/sobre"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-medium rounded-full hover:from-purple-700 hover:to-violet-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 group"
                  >
                    {t('about.cta')}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </motion.div>
              </div>

              {/* Actions */}

            </motion.div>
          </div>

          {/* Right: Image/Visual */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end mb-8 lg:mb-0">
            <motion.div
              style={{ y }}
              className="relative w-full max-w-xs aspect-[4/5]"
            >
              {/* Decorative background blur */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-[#9810fa33] to-[#155dfc33] rounded-[32px] blur-2xl" />

              {/* Decorative rotated circle */}
              <div className="absolute -top-12 left-1/2 w-[114px] h-[114px] border border-purple-200 rounded-full rotate-[78deg] -z-10" />

              <div className="relative h-full w-full rounded-[32px] overflow-hidden border border-zinc-200 bg-white shadow-2xl group">
                <div className="absolute inset-0">
                  <ImageWithFallback
                    src={imgEu1}
                    alt="Rodrigo Picolo"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                {/* Gradient Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.3 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black z-10"
                />

                {/* Glass Badge on Image */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/20 backdrop-blur-md rounded-[14px] z-20 border border-white/30">
                  <motion.a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-[14px] p-4 flex items-center justify-between hover:bg-[#0077b5]/90 transition-colors cursor-pointer group/link"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div>
                      <p className="text-white font-bold text-lg leading-tight">Rodrigo Picolo</p>
                      <p className="text-white/80 text-xs uppercase tracking-wider mt-0.5 group-hover/link:text-white">{t('about.linkedinCta')}</p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-[#0077b5] border border-white/20 flex items-center justify-center text-white shrink-0">
                      <Linkedin size={16} fill="currentColor" strokeWidth={0} />
                    </div>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Carousel moved from MagneticButton */}
        <div className="w-full overflow-hidden mt-20 pb-20" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)' }}>
          <motion.div
            className="flex gap-12 items-center"
            animate={{ x: "-50%" }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            style={{ width: "fit-content" }}
          >
            {[...logoImages, ...logoImages].map((logo, index) => (
              <div
                key={index}
                className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                style={{
                  width: '280px',
                  height: '150px',
                  flexShrink: 0,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
              </div>
            ))}
          </motion.div>
        </div>

      </div >
    </section >
  );
}
