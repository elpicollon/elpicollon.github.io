import { ReactNode } from 'react';
import { LucideIcon, Sparkles } from 'lucide-react';
import { ChapterSection } from './ChapterSection';
import { RevealText } from './RevealText';
import { SectionHeader } from '../../ui/SectionHeader';

export interface ProjectCardGridItem {
    title: string;
    desc: ReactNode;
    icon?: LucideIcon;
}

export interface ProjectCardGridSectionProps {
    id: string;
    label?: string;
    sublabel?: string;
    title: ReactNode;
    items?: ProjectCardGridItem[];
    defaultIcons?: LucideIcon[];
    gridClassName?: string;
    layoutVariant?: 'grid' | 'split' | 'centered';
}

export function ProjectCardGridSection({
    id,
    label,
    sublabel,
    title,
    items = [],
    defaultIcons = [],
    gridClassName,
    layoutVariant = 'grid',
}: ProjectCardGridSectionProps) {
    if (layoutVariant === 'split') {
        return (
            <ChapterSection id={id}>
                <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
                    <div className="lg:col-span-5">
                        <SectionHeader label={label} sublabel={sublabel} title={title} bgNumber={label} showLine={false} className="mb-0" />
                    </div>
                    <div className="lg:col-span-7 flex flex-col gap-5">
                        {items.map((item, index) => {
                            const IconComponent = item.icon || defaultIcons[index] || Sparkles;
                            return (
                                <RevealText key={index} delay={index * 0.1}>
                                    <div className="exp-wrap">
                                        <div className="exp p-5 sm:p-6 flex items-start gap-4">
                                            <div 
                                                className="w-11 h-11 cut-icon bg-[var(--project-primary,var(--color-primary))]/10 border border-[var(--project-primary,var(--color-primary))]/20 text-[var(--project-primary,var(--color-primary))] flex items-center justify-center shrink-0 mt-0.5"
                                            >
                                                <IconComponent size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-foreground text-lg sm:text-xl font-display mb-1">
                                                    {item.title}
                                                </h4>
                                                <p className="text-muted text-sm sm:text-base leading-relaxed">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </RevealText>
                            );
                        })}
                    </div>
                </div>
            </ChapterSection>
        );
    }

    if (layoutVariant === 'centered') {
        return (
            <ChapterSection id={id}>
                <SectionHeader label={label} sublabel={sublabel} title={title} bgNumber={label} showLine={false} />
                <div className={gridClassName || "grid md:grid-cols-3 gap-6"}>
                    {items.map((item, index) => {
                        const IconComponent = item.icon || defaultIcons[index] || Sparkles;
                        return (
                            <RevealText key={index} delay={index * 0.1}>
                                <div className="exp-wrap h-full">
                                    <div className="exp h-full flex flex-col items-center text-center p-6 sm:p-8 justify-start">
                                        <div 
                                            className="w-12 h-12 cut-icon bg-[var(--project-primary,var(--color-primary))]/10 border border-[var(--project-primary,var(--color-primary))]/20 text-[var(--project-primary,var(--color-primary))] flex items-center justify-center shrink-0 mb-5"
                                        >
                                            <IconComponent size={22} />
                                        </div>
                                        <h4 className="font-semibold text-foreground text-lg sm:text-xl font-display mb-3">
                                            {item.title}
                                        </h4>
                                        <p className="text-muted text-sm sm:text-base leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </RevealText>
                        );
                    })}
                </div>
            </ChapterSection>
        );
    }

    const defaultGrid = gridClassName || "grid md:grid-cols-2 gap-6";

    return (
        <ChapterSection id={id}>
            <SectionHeader label={label} sublabel={sublabel} title={title} bgNumber={label} showLine={false} />
            <div className={defaultGrid}>
                {items.map((item, index) => {
                    const IconComponent = item.icon || defaultIcons[index] || Sparkles;
                    return (
                        <RevealText key={index} delay={index * 0.08}>
                            <div className="exp-wrap h-full">
                                <div className="exp flex items-start gap-4 p-6 h-full">
                                    <div 
                                        className="w-10 h-10 cut-icon bg-[var(--project-primary,var(--color-primary))]/10 border border-[var(--project-primary,var(--color-primary))]/20 text-[var(--project-primary,var(--color-primary))] flex items-center justify-center shrink-0 mt-0.5"
                                    >
                                        <IconComponent size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground text-lg font-display mb-1.5">{item.title}</h4>
                                        <p className="text-muted text-sm sm:text-base leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </div>
                        </RevealText>
                    );
                })}
            </div>
        </ChapterSection>
    );
}
