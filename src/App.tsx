import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CustomCursor } from './components/CustomCursor';
import { MinimalNav } from './components/MinimalNav';
import { HeroNew } from './components/HeroNew';
import { LazyLoad } from './components/ui/LazyLoad';

import { ContactModal } from './components/ContactModal';
import { ContactModalProvider, useContactModal } from './contexts/ContactModalContext';
import { ScrollToTop } from './components/ScrollToTop';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Preloader } from './components/ui/Preloader';

// Lazy load heavy homepage sections to reduce initial bundle size
const HorizontalScroll = lazy(() => import('./components/HorizontalScroll').then(m => ({ default: m.HorizontalScroll })));
const AboutSection = lazy(() => import('./components/AboutSection').then(m => ({ default: m.AboutSection })));
const BentoGrid = lazy(() => import('./components/BentoGrid').then(m => ({ default: m.BentoGrid })));
const MagneticButton = lazy(() => import('./components/MagneticButton').then(m => ({ default: m.MagneticButton })));
const FooterNew = lazy(() => import('./components/FooterNew').then(m => ({ default: m.FooterNew })));

// Lazy load project pages for code-splitting
const TranscricoesInsightsIA = lazy(() => import('./components/projects/TranscricoesInsightsIA').then(m => ({ default: m.TranscricoesInsightsIA })));
const MedicalOffice = lazy(() => import('./components/projects/MedicalOffice').then(m => ({ default: m.MedicalOffice })));
const ImportacaoEmpresas = lazy(() => import('./components/projects/ImportacaoEmpresas').then(m => ({ default: m.ImportacaoEmpresas })));
const AboutPage = lazy(() => import('./components/pages/AboutPage').then(m => ({ default: m.AboutPage })));

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

        <LazyLoad rootMargin="100px 0px">
          <Suspense fallback={null}>
            <HorizontalScroll />
          </Suspense>
        </LazyLoad>

        <LazyLoad rootMargin="200px 0px">
          <Suspense fallback={null}>
            <AboutSection />
          </Suspense>
        </LazyLoad>

        <LazyLoad rootMargin="200px 0px">
          <Suspense fallback={null}>
            <BentoGrid />
          </Suspense>
        </LazyLoad>

        <LazyLoad rootMargin="100px 0px">
          <Suspense fallback={null}>
            <MagneticButton />
          </Suspense>
        </LazyLoad>
      </main>

      <LazyLoad rootMargin="100px 0px">
        <Suspense fallback={null}>
          <FooterNew />
        </Suspense>
      </LazyLoad>

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

      <Suspense fallback={
        <Preloader />
      }>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projeto/transcricoes-insights-ia" element={
            <ProtectedRoute>
              <TranscricoesInsightsIA />
            </ProtectedRoute>
          } />
          <Route path="/projeto/medical-office" element={
            <ProtectedRoute>
              <MedicalOffice />
            </ProtectedRoute>
          } />
          <Route path="/projeto/importacao-empresas" element={
            <ProtectedRoute>
              <ImportacaoEmpresas />
            </ProtectedRoute>
          } />
          <Route path="/sobre" element={<AboutPage />} />
        </Routes>
      </Suspense>

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
