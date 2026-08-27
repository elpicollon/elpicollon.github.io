import { ReactNode } from 'react';
import { ChapterSection } from './ChapterSection';
import { RevealText } from './RevealText';
import { SectionHeader } from '../../ui/SectionHeader';

export interface ProjectProcessItem {
    title: string;
    desc: ReactNode;
}

export interface ProjectProcessSectionProps {
    id?: string;
    label?: string;
    sublabel?: string;
    title?: ReactNode;
    items: ProjectProcessItem[];
    gridClassName?: string;
}

export function ProjectProcessSection({
    id = "research",
    label = "03",
    sublabel = "PESQUISA",
    title = "Processo de Pesquisa",
    items,
    gridClassName = "grid md:grid-cols-2 gap-6 sm:gap-8",
}: ProjectProcessSectionProps) {
    return (
        <ChapterSection id={id}>
            <SectionHeader label={label} sublabel={sublabel} title={title} bgNumber={label} showLine={false} />
            <div className={gridClassName}>
                {items.map((item, index) => (
                    <RevealText key={index} delay={index * 0.1}>
                        <div className="exp-wrap h-full">
                            <div className="exp p-6 sm:p-8 flex items-start gap-5 h-full">
                                <span 
                                    className="font-display font-extrabold text-4xl sm:text-5xl text-[var(--project-primary,var(--color-primary))]/30 shrink-0 leading-none select-none"
                                >
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <div>
                                    <h4 className="font-semibold text-foreground text-lg sm:text-xl font-display mb-2">{item.title}</h4>
                                    <p className="text-muted text-sm sm:text-base leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        </div>
                    </RevealText>
                ))}
            </div>
        </ChapterSection>
    );
}
