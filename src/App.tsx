import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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

function HomePage() {
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
    <div className="min-h-screen bg-[#f2f4f7] overflow-x-hidden">
      <CustomCursor />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projeto/transcricoes-insights-ia" element={<TranscricoesInsightsIA />} />
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
