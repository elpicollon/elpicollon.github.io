import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CustomCursor } from './components/CustomCursor';
import { MinimalNav } from './components/MinimalNav';
import { HeroNew } from './components/HeroNew';
import { AboutSection } from './components/AboutSection';
import { BentoGrid } from './components/BentoGrid';
import { MarqueeSection } from './components/MarqueeSection';
import { HorizontalScroll } from './components/HorizontalScroll';
import { MagneticButton } from './components/MagneticButton';
import { FooterNew } from './components/FooterNew';
import { ContactModal } from './components/ContactModal';
import { ContactModalProvider, useContactModal } from './contexts/ContactModalContext';
import { TranscricoesInsightsIA } from './components/projects/TranscricoesInsightsIA';
import { MedicalOffice } from './components/projects/MedicalOffice';
import { ImportacaoEmpresas } from './components/projects/ImportacaoEmpresas';
import { AboutPage } from './components/pages/AboutPage';
import { ScrollToTop } from './components/ScrollToTop';

function HomePage() {
  const location = useLocation();

  // Handle hash-based navigation (e.g., /#projetos from footer links)
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace('#', '');
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location.hash]);

  return (
    <>
      <MinimalNav />
      <main>
        <HeroNew />
        <HorizontalScroll />
        <AboutSection />
        <BentoGrid />
        <MagneticButton />
        <MarqueeSection />
      </main>
      <FooterNew />
      <ScrollToTop />
    </>
  );
}

function AppContent() {
  const { isOpen, closeModal } = useContactModal();

  useEffect(() => {
    // Hide default cursor on desktop
    document.body.style.cursor = 'none';

    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f2f4f7]" style={{ overflowX: 'clip' }}>
      <CustomCursor />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projeto/transcricoes-insights-ia" element={<TranscricoesInsightsIA />} />
        <Route path="/projeto/medical-office" element={<MedicalOffice />} />
        <Route path="/projeto/importacao-empresas" element={<ImportacaoEmpresas />} />
        <Route path="/sobre" element={<AboutPage />} />
      </Routes>

      <ContactModal isOpen={isOpen} onClose={closeModal} />
    </div>
  );
}

export default function App() {
  return (
    <ContactModalProvider>
      <AppContent />
    </ContactModalProvider>
  );
}
