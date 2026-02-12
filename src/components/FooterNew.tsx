import { motion } from 'motion/react';
import { Linkedin, Mail, FileText } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo1 from '../imports/Logo';
import { useContactModal } from '../contexts/ContactModalContext';
import { useTranslation } from '../hooks/useTranslation';
import { useLanguage } from '../contexts/LanguageContext';


export function FooterNew() {
  const currentYear = new Date().getFullYear();
  const { openModal } = useContactModal();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { language } = useLanguage();

  // Dynamic LinkedIn URL based on language
  const linkedinUrl = language === 'en-US'
    ? 'https://www.linkedin.com/in/picolodesign/?locale=en_US'
    : 'https://www.linkedin.com/in/picolodesign/';

  const handleNavigation = (sectionId: string) => {
    // Check if we're on the home page
    if (location.pathname === '/') {
      // We're on home, just scroll to section
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // We're on another page, navigate to home with hash
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <footer className="relative bg-[#f2f4f7] border-t border-purple-200 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-50 via-[#f2f4f7] to-transparent" />

      <div className="relative z-10 px-6 md:px-12 py-20">
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* Left - Brand */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="w-[250px] h-[116px] mb-6">
              <Logo1 />
            </div>
            <p className="text-xl text-zinc-600 mb-8 max-w-lg">
              {t('footer.tagline')}
            </p>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '200px' }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
              className="h-[2px] bg-gradient-to-r from-purple-500 to-transparent"
            />
          </motion.div>

          {/* Right - Links */}
          <div className="grid grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-black mb-6 font-medium">{t('footer.navigation')}</h4>
              <ul className="space-y-3">
                {[
                  { label: t('footer.navItems.home'), sectionId: 'inicio' },
                  { label: t('footer.navItems.projects'), sectionId: 'projetos' },
                  { label: t('footer.navItems.about'), sectionId: 'sobre' },
                  { label: t('footer.navItems.expertise'), sectionId: 'expertise' },
                ].map((item) => (
                  <li key={item.label}>
                    <motion.button
                      onClick={() => handleNavigation(item.sectionId)}
                      whileHover={{ x: 5 }}
                      className="text-zinc-600 hover:text-purple-600 transition-colors inline-block cursor-pointer font-[inherit] text-left bg-transparent border-none p-0"
                    >
                      {item.label}
                    </motion.button>
                  </li>
                ))}
                <li>
                  <motion.button
                    onClick={openModal}
                    whileHover={{ x: 5 }}
                    className="text-zinc-600 hover:text-purple-600 transition-colors inline-block cursor-pointer font-[inherit] text-left bg-transparent border-none p-0"
                  >
                    {t('footer.navItems.contact')}
                  </motion.button>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-black mb-6 font-medium">{t('footer.connect')}</h4>
              <ul className="space-y-3">
                {[
                  {
                    label: "WhatsApp",
                    href: "https://wa.me/+5546988281914",
                    icon: ({ size, className }: { size?: number | string; className?: string }) => (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={size}
                        height={size}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={className}
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                      </svg>
                    )
                  },
                  { label: "Email", href: "mailto:contato@picolodesign.com.br", icon: Mail },
                  { label: "Linkedin", href: linkedinUrl, icon: Linkedin },
                  ...(language === 'pt-BR' ? [{
                    label: t('footer.downloadCV'),
                    href: "/assets/CV/Curriculo-Rodrigo-Picolo-PT.pdf",
                    icon: FileText,
                    download: true
                  }] : [])
                ].map((social) => (
                  <li key={social.label}>
                    <motion.a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={social.download}
                      whileHover={{ x: 5 }}
                      className="text-zinc-600 hover:text-purple-600 transition-colors inline-flex items-center gap-2"
                    >
                      <social.icon size={16} />
                      {social.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-purple-200 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-zinc-500">
            {t('footer.copyright', { year: currentYear.toString() })}
          </p>
          <div className="flex gap-6">
            <p className="text-zinc-500">
              {t('footer.madeWith')}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Animated gradient orb */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full blur-3xl pointer-events-none"
      />
    </footer>
  );
}