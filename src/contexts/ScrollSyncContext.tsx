import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export interface SectionContent {
    id: string;
    title: string;
    subtitle?: string;
    description?: string;
    leftContent?: ReactNode;
    mockupMode: 'image' | 'carousel' | 'scroll-cards';
    mockupContent: {
        images?: string[];
        cards?: ReactNode[];
        videoUrl?: string;
    };
}

interface ScrollSyncContextType {
    activeSection: number;
    setActiveSection: (index: number) => void;
    sections: SectionContent[];
    setSections: (sections: SectionContent[]) => void;
    registerSection: (section: SectionContent) => void;
}

const ScrollSyncContext = createContext<ScrollSyncContextType | null>(null);

export function ScrollSyncProvider({ children }: { children: ReactNode }) {
    const [activeSection, setActiveSection] = useState(0);
    const [sections, setSections] = useState<SectionContent[]>([]);

    const registerSection = useCallback((section: SectionContent) => {
        setSections(prev => {
            const exists = prev.find(s => s.id === section.id);
            if (exists) return prev;
            return [...prev, section];
        });
    }, []);

    return (
        <ScrollSyncContext.Provider
            value={{
                activeSection,
                setActiveSection,
                sections,
                setSections,
                registerSection
            }}
        >
            {children}
        </ScrollSyncContext.Provider>
    );
}

export function useScrollSync() {
    const context = useContext(ScrollSyncContext);
    if (!context) {
        throw new Error('useScrollSync must be used within a ScrollSyncProvider');
    }
    return context;
}

export function useActiveSection() {
    const { activeSection, sections } = useScrollSync();
    return sections[activeSection] || null;
}
