import { motion, useScroll, useTransform } from 'motion/react';
import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import PicoloDesignLogo from '../imports/PicoloDesignLogo-9-474';
import { useContactModal } from '../contexts/ContactModalContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from '../hooks/useTranslation';

// Função para scroll suave até uma seção
function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

export function MinimalNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const { openModal } = useContactModal();
  const location = useLocation();
  const navigate = useNavigate();

  // Check if we're on the home page
  const isHomePage = location.pathname === '/';
  const { t } = useTranslation();

  // Função para navegar para home e scrollar para seção
  const handleNavClick = (sectionId: string) => {
    if (isHomePage) {
      scrollToSection(sectionId);
    } else {
      navigate('/');
      // Espera a navegação e então faz scroll
      setTimeout(() => scrollToSection(sectionId), 100);
    }
  };

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
          <div className="flex items-center justify-between px-4 py-3">
            {/* Logo */}
            <motion.button
              onClick={() => handleNavClick('inicio')}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="h-8 md:h-10 block cursor-pointer"
              style={{ width: 'auto', aspectRatio: '700/273' }}
            >
              <PicoloDesignLogo />
            </motion.button>

            {/* Desktop menu - Center - only show on lg screens */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2"
            >
              {[
                { label: t('nav.menu.projects'), sectionId: 'projetos', isLink: false },
                { label: t('nav.menu.about'), path: '/sobre', isLink: true },
                { label: t('nav.menu.expertise'), sectionId: 'expertise', isLink: false },
                { label: t('nav.menu.contact'), sectionId: 'contato', isLink: false }
              ].map((item, index) => (
                item.isLink ? (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    <Link
                      to={item.path!}
                      className="text-xs text-slate-600 hover:bg-purple-900 hover:text-white font-medium transition-all tracking-wider cursor-pointer px-4 py-2 rounded-full block"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.button
                    key={item.label}
                    onClick={() => handleNavClick(item.sectionId!)}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    whileHover={{ y: -2 }}
                    className="text-xs text-slate-600 hover:bg-purple-900 hover:text-white font-medium transition-all tracking-wider cursor-pointer px-4 py-2 rounded-full"
                  >
                    {item.label}
                  </motion.button>
                )
              ))}
            </motion.div>

            {/* CTA Button and Language Switcher - Desktop only on lg screens */}
            <div className="hidden lg:flex items-center gap-3">
              <LanguageSwitcher />
              <motion.button
                onClick={openModal}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center bg-black text-white px-6 h-10 rounded-full text-xs tracking-wider hover:bg-purple-900 transition-colors cursor-pointer"
              >
                {t('nav.getInTouch')}
              </motion.button>
            </div>

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
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
        className="fixed top-0 right-0 bottom-0 w-full lg:hidden z-[110] flex flex-col justify-center items-center gap-8 border-l border-white/40 shadow-lg shadow-black/5"
      >
        {/* Close button - X at top right */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 p-2 text-black hover:text-purple-600 transition-colors"
          aria-label={t('accessibility.closeMenu')}
        >
          <X size={28} />
        </motion.button>

        {[
          { label: t('nav.home'), sectionId: 'inicio', isModal: false, isLink: false },
          { label: t('nav.projects'), sectionId: 'projetos', isModal: false, isLink: false },
          { label: t('nav.about'), path: '/sobre', isModal: false, isLink: true },
          { label: t('nav.expertise'), sectionId: 'expertise', isModal: false, isLink: false },
          { label: t('nav.contact'), sectionId: 'contato', isModal: true, isLink: false }
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
          ) : item.isLink ? (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : 50 }}
              transition={{ duration: 0.3, delay: isOpen ? index * 0.1 : 0 }}
            >
              <Link
                to={item.path!}
                onClick={() => setIsOpen(false)}
                className="text-4xl font-medium text-black hover:text-purple-600 transition-colors cursor-pointer block"
              >
                {item.label}
              </Link>
            </motion.div>
          ) : (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : 50 }}
              transition={{ duration: 0.3, delay: isOpen ? index * 0.1 : 0 }}
              onClick={() => { setIsOpen(false); handleNavClick(item.sectionId!); }}
              className="text-4xl font-medium text-black hover:text-purple-600 transition-colors cursor-pointer"
            >
              {item.label}
            </motion.button>
          )
        ))}

        {/* Language Switcher - Mobile */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : 50 }}
          transition={{ duration: 0.3, delay: isOpen ? 0.5 : 0 }}
          className="mt-4"
        >
          <LanguageSwitcher onLanguageChange={() => setIsOpen(false)} />
        </motion.div>
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