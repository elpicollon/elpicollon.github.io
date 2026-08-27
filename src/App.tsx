import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CustomCursor } from './components/CustomCursor';
import PicoloTV from './components/crt/PicoloTV';
import HomeChannel from './components/crt/HomeChannel';

import { ContactModal } from './components/ContactModal';
import { ContactModalProvider, useContactModal } from './contexts/ContactModalContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Preloader } from './components/ui/Preloader';
import { useRouteSEO } from './hooks/useRouteSEO';

// Lazy load project pages for code-splitting
const IANotetakerApp = lazy(() => import('./components/projects/IANotetakerApp').then(m => ({ default: m.IANotetakerApp })));
const TranscricoesInsightsIA = lazy(() => import('./components/projects/TranscricoesInsightsIA').then(m => ({ default: m.TranscricoesInsightsIA })));
const MedicalOffice = lazy(() => import('./components/projects/MedicalOffice').then(m => ({ default: m.MedicalOffice })));
const ImportacaoEmpresas = lazy(() => import('./components/projects/ImportacaoEmpresas').then(m => ({ default: m.ImportacaoEmpresas })));
const AboutPage = lazy(() => import('./components/pages/AboutPage').then(m => ({ default: m.AboutPage })));

function AppContent() {
  const { isOpen, closeModal } = useContactModal();
  useRouteSEO();

  useEffect(() => {
    // Hide default cursor on desktop to support the custom phosphor cursor
    document.body.style.cursor = 'none';

    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <CustomCursor />

      <Suspense fallback={<Preloader />}>
        <Routes>
          <Route element={<PicoloTV />}>
            <Route path="/" element={<HomeChannel />} />
            <Route path="/projeto/ia-notetaker-app" element={
              <ProtectedRoute>
                <IANotetakerApp />
              </ProtectedRoute>
            } />
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
          </Route>
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
