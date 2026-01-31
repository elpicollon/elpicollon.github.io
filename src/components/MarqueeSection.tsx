import { motion } from 'motion/react';
import { useTranslation } from '../hooks/useTranslation';

export function MarqueeSection() {
  const { t } = useTranslation();
  const skills = (t<string[]>('marquee.skills')) || [];

  return (
    <section className="py-20 bg-[#f2f4f7] overflow-hidden relative">
      {/* Marquee */}
      <div className="relative">
        <motion.div
          animate={{
            x: [0, -1920],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-12 whitespace-nowrap"
        >
          {/* Duplicate skills array to create seamless loop */}
          {[...skills, ...skills, ...skills].map((skill, index) => (
            <span
              key={index}
              className="text-6xl md:text-8xl font-medium leading-tight inline-block"
              style={{
                fontFamily: 'var(--font-display)',
                lineHeight: '1.2',
              }}
            >
              {skill.split('').map((letter, letterIndex) => (
                <motion.span
                  key={letterIndex}
                  className="inline-block cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-violet-500 to-purple-600"
                  whileHover={{
                    y: -8,
                    opacity: 0.3,
                    transition: {
                      type: "spring",
                      stiffness: 500,
                      damping: 20,
                      delay: letterIndex * 0.02,
                    }
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Second marquee in opposite direction */}
      <div className="relative mt-8">
        <motion.div
          animate={{
            x: [-1920, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-12 whitespace-nowrap"
        >
          {[...skills, ...skills, ...skills].map((skill, index) => (
            <span
              key={index}
              className="text-6xl md:text-8xl font-medium text-black/5 leading-tight cursor-pointer inline-block"
              style={{ fontFamily: 'var(--font-display)', lineHeight: '1.2' }}
            >
              {skill.split('').map((letter, letterIndex) => (
                <motion.span
                  key={letterIndex}
                  className="inline-block"
                  whileHover={{
                    y: -8,
                    opacity: 0.3,
                    transition: {
                      type: "spring",
                      stiffness: 500,
                      damping: 20,
                      delay: letterIndex * 0.02,
                    }
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}