import { createContext, useContext, ReactNode } from 'react';

export interface ProjectTheme {
  primaryColor?: string;
  themeKey?: string;
}

export const PROJECT_THEMES: Record<string, { primaryColor: string }> = {
  transcricoes: { primaryColor: '#0D9488' }, // Teal
  medical: { primaryColor: '#0B73D9' },     // Medical Blue
  notetaker: { primaryColor: '#3D8A52' },   // Notetaker Green
  importacao: { primaryColor: '#02376D' },  // B2B Blue
};

const ProjectThemeContext = createContext<ProjectTheme>({});

export function ProjectThemeProvider({
  themeKey,
  children
}: {
  themeKey?: string;
  children: ReactNode;
}) {
  const theme = themeKey ? PROJECT_THEMES[themeKey] : undefined;
  const primaryColor = theme?.primaryColor;

  return (
    <ProjectThemeContext.Provider value={{ primaryColor, themeKey }}>
      <div 
        style={primaryColor ? ({ '--project-primary': primaryColor } as React.CSSProperties) : undefined}
        className="contents"
      >
        {children}
      </div>
    </ProjectThemeContext.Provider>
  );
}

export function useProjectTheme() {
  return useContext(ProjectThemeContext);
}

