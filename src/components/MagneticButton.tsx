import { motion } from 'motion/react';
import { Mail } from 'lucide-react';
import { HeroParticleGrid } from './HeroParticleGrid';
import { useContactModal } from '../contexts/ContactModalContext';

export function MagneticButton() {
  const { openModal } = useContactModal();

  return (
    <section id="contato" className="py-20 px-6 md:px-12 bg-[#f2f4f7] relative overflow-hidden">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0">
        <HeroParticleGrid />
        <div className="absolute inset-0 bg-gradient-radial from-purple-500/5 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-6xl md:text-8xl font-medium text-black mb-8"
            >
              Let's Create
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-violet-500 to-purple-600 animate-gradient-x bg-[length:200%_auto]">
                Together
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-zinc-600 mb-6"
            >
              Transformo ideias complexas em experiências digitais completas, de ponta a ponta.
            </motion.p>
          </motion.div>

          {/* Right - Magnetic button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex items-center justify-center relative"
          >
            <button onClick={openModal} className="relative cursor-pointer group z-10 block">
              {/* Dashed Ring - Outer */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 -m-8 border border-dashed border-purple-300 rounded-full pointer-events-none"
              />

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="relative w-56 h-56 rounded-full bg-gradient-to-br from-[#6d28d9] to-[#4c1d95] shadow-[0_20px_50px_rgba(109,40,217,0.5)] flex flex-col items-center justify-center gap-1 z-10 overflow-hidden"
              >
                {/* Inner Glow */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent opacity-50 pointer-events-none" />

                <motion.div className="flex flex-col items-center">
                  <Mail size={28} className="text-white mb-2 opacity-80" />

                  <span className="text-[10px] font-bold text-white/60 tracking-[0.2em] uppercase mb-1">
                    FALE COMIGO
                  </span>
                  <span className="text-xl font-bold text-white leading-none text-center">
                    ENTRE EM<br />CONTATO
                  </span>
                </motion.div>
              </motion.div>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}