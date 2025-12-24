import { motion, useScroll, useTransform } from 'motion/react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import PicoloDesignLogo from '../imports/PicoloDesignLogo-9-474';
import { useContactModal } from '../contexts/ContactModalContext';

export function MinimalNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const { openModal } = useContactModal();

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.7)']
  );

  const blur = useTransform(
    scrollY,
    [0, 100],
    ['blur(12px)', 'blur(24px)']
  );

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[100] px-3 pt-3 md:px-6 md:pt-6"
      >
        <motion.div
          style={{
            backgroundColor,
            backdropFilter: blur,
            WebkitBackdropFilter: blur,
          }}
          className="mx-auto rounded-full border border-white/40 shadow-lg shadow-black/5 ring-1 ring-white/50"
        >
          <div className="flex items-center justify-between px-4 py-2 md:px-6 md:py-4">
            {/* Logo */}
            <motion.a
              href="#inicio"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="h-8 md:h-10 block"
              style={{ width: 'auto', aspectRatio: '700/273' }}
            >
              <PicoloDesignLogo />
            </motion.a>

            {/* Desktop menu - Center - only show on lg screens */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2"
            >
              {[
                { label: 'PROJETOS', href: '#projetos' },
                { label: 'SOBRE', href: '#sobre' },
                { label: 'EXPERTISE', href: '#expertise' },
                { label: 'CONTATO', href: '#contato' }
              ].map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="text-xs text-zinc-500 hover:text-black transition-colors tracking-wider"
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.div>

            {/* CTA Button - Desktop only on lg screens */}
            <motion.button
              onClick={openModal}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden lg:flex items-center justify-center bg-black text-white px-6 h-10 rounded-full text-xs tracking-wider hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              ENTRE EM CONTATO
            </motion.button>

            {/* Mobile menu button - show on mobile and tablet */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-black p-1"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{
          x: isOpen ? 0 : '100%',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 bottom-0 w-full lg:hidden bg-white z-[110] flex flex-col justify-center items-center gap-8"
      >
        {[
          { label: 'Início', href: '#inicio', isModal: false },
          { label: 'Projetos', href: '#projetos', isModal: false },
          { label: 'Sobre', href: '#sobre', isModal: false },
          { label: 'Expertise', href: '#expertise', isModal: false },
          { label: 'Contato', href: '#contato', isModal: true }
        ].map((item, index) => (
          item.isModal ? (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : 50 }}
              transition={{ duration: 0.3, delay: isOpen ? index * 0.1 : 0 }}
              onClick={() => { setIsOpen(false); openModal(); }}
              className="text-4xl font-medium text-black hover:text-purple-600 transition-colors cursor-pointer"
            >
              {item.label}
            </motion.button>
          ) : (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : 50 }}
              transition={{ duration: 0.3, delay: isOpen ? index * 0.1 : 0 }}
              onClick={() => setIsOpen(false)}
              className="text-4xl font-medium text-black hover:text-purple-600 transition-colors"
            >
              {item.label}
            </motion.a>
          )
        ))}
      </motion.div>

      {/* Mobile menu overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[105] lg:hidden"
        />
      )}
    </>
  );
}