import { motion } from 'motion/react';
import { useTranslation } from '../hooks/useTranslation';

export function MarqueeSection() {
  const { t } = useTranslation();
  const skills = (t<string[]>('marquee.skills')) || [];

  return (
    <section className="overflow-hidden relative pb-8">
      {/* Marquee - Simplified for performance */}
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
          className="flex gap-12 whitespace-nowrap will-change-transform"
          style={{ transform: 'translateZ(0)' }}
        >
          {/* Reduced duplication from 3x to 2x */}
          {[...skills, ...skills].map((skill, index) => (
            <span
              key={index}
              className="text-3xl md:text-4xl font-medium leading-tight inline-block text-slate-300"
              style={{
                fontFamily: 'var(--font-display)',
                lineHeight: '1.2',
              }}
            >
              {skill}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Second marquee in opposite direction */}
      <div className="relative mt-4">
        <motion.div
          animate={{
            x: [-1920, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-12 whitespace-nowrap will-change-transform"
          style={{ transform: 'translateZ(0)' }}
        >
          {[...skills, ...skills].map((skill, index) => (
            <span
              key={index}
              className="text-3xl md:text-4xl font-medium text-slate-200/50 leading-tight inline-block"
              style={{ fontFamily: 'var(--font-display)', lineHeight: '1.2' }}
            >
              {skill}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}