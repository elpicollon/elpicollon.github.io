import { ReactNode } from "react";
import { channelOrder, ChannelConfig } from "../crt/channels";
import { Arrow } from "../crt/parts";
import { useTranslation } from "../../hooks/useTranslation";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { Button } from "../ui/button";
import { ProjectCopyrightSection, NextProjectSection } from "../projects/shared";
import { ContactSection } from "../ui/ContactSection";
import { ProjectHeroSection, ProjectHeroTitle } from "../projects/shared/ProjectHeroSection";
import { ProjectThemeProvider, PROJECT_THEMES } from "../../contexts/ProjectThemeContext";

interface ProjectLayoutProps {
  c: ChannelConfig;
  title?: string;
  heroTitle?: ProjectHeroTitle;
  heroTags?: string[];
  heroImage?: string;
  secondaryHeroImage?: string;
  deviceType?: 'macbook' | 'iphone' | 'dual' | string;
  children: ReactNode;
  hideHeader?: boolean;
  hideFooter?: boolean;
}

export default function ProjectLayout({
  c,
  title,
  heroTitle,
  heroTags,
  heroImage,
  secondaryHeroImage,
  deviceType,
  children,
  hideHeader = false,
  hideFooter = false
}: ProjectLayoutProps) {
  const { tune, navigateToHome } = useAppNavigation();
  const { isPortuguese } = useTranslation();

  const i = c.n !== undefined ? channelOrder.indexOf(c.n as number) : -1;
  const next = i !== -1 ? channelOrder[(i + 1) % channelOrder.length] : channelOrder[0];
  const prev = i !== -1 ? channelOrder[(i - 1 + channelOrder.length) % channelOrder.length] : channelOrder[0];

  const getProjectThemeKey = (path: string) => {
    if (path.includes('transcricoes')) return 'transcricoes';
    if (path.includes('notetaker')) return 'notetaker';
    if (path.includes('medical')) return 'medical';
    if (path.includes('importacao')) return 'importacao';
    return 'default';
  };

  const themeKey = getProjectThemeKey(c.path);
  const primaryColor = PROJECT_THEMES[themeKey]?.primaryColor;

  return (
    <>
      <ProjectThemeProvider themeKey={themeKey}>
        <div
          className="proj"
          data-project-theme={themeKey}
          style={primaryColor ? {
            '--color-primary': primaryColor,
            '--green': primaryColor,
          } as React.CSSProperties : undefined}
        >
          {!hideHeader && (
            <ProjectHeroSection
              c={c}
              title={title}
              heroTitle={heroTitle}
              tags={heroTags}
              heroImage={heroImage}
              secondaryHeroImage={secondaryHeroImage}
              deviceType={deviceType}
            />
          )}

          {/* Case Study Content */}
          <div className="proj-details-container wrap reveal pt-10">
            {children}
          </div>

          {!hideFooter && (
            <>
              {/* Copyright Section */}
              <div className="wrap mt-16 mb-6">
                <ProjectCopyrightSection />
              </div>

              {/* Navigation Buttons (Previous / Home / Next) */}
              <div className="wrap mb-12">
                <hr className="gradline mb-4" />
                <div className="flex justify-between items-center py-4">
                  <Button variant="ghost" onClick={() => tune(prev)} className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                    <span className="rotate-180 inline-block">
                      <Arrow />
                    </span>
                    {isPortuguese ? "Anterior" : "Previous"}
                  </Button>
                  <Button variant="ghost" onClick={navigateToHome} className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                    {isPortuguese ? "Voltar ao Início" : "Back to Home"}
                  </Button>
                  <Button variant="ghost" onClick={() => tune(next)} className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                    {isPortuguese ? "Próximo" : "Next"} <Arrow />
                  </Button>
                </div>
              </div>

              {/* Full Width Next Project Banner (No rounded corners) */}
              <NextProjectSection currentRoute={c.path} />
            </>
          )}
        </div>
      </ProjectThemeProvider>

      {!hideFooter && (
        <ContactSection cardWrapClassName="contact-card-wrap reveal" />
      )}
    </>
  );
}
