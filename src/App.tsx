import { useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { MinimalNav } from './components/MinimalNav';
import { HeroNew } from './components/HeroNew';
import { AboutSection } from './components/AboutSection';
import { BentoGrid } from './components/BentoGrid';
import { MarqueeSection } from './components/MarqueeSection';
import { HorizontalScroll } from './components/HorizontalScroll';
import { MagneticButton } from './components/MagneticButton';
import { FooterNew } from './components/FooterNew';

export default function App() {
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
    </div>
  );
}
