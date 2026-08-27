import { ReactNode } from 'react';
import { Target, Zap, Quote } from 'lucide-react';
import { ChapterSection } from './ChapterSection';
import { RevealText } from './RevealText';
import { SectionHeader } from '../../ui/SectionHeader';

export interface ProjectOverviewSectionProps {
    id?: string;
    label?: string;
    sublabel?: string;
    title?: ReactNode;
    resumo: ReactNode;
    objetivo: ReactNode;
    desafio: ReactNode;
    resumoTitle?: string;
    objetivoTitle?: string;
    desafioTitle?: string;
}

function renderFormattedContent(content: ReactNode, isQuote = false) {
    const textClasses = isQuote
        ? "!text-foreground/95 !text-base sm:!text-lg md:!text-xl !leading-relaxed font-normal italic m-0"
        : "!text-foreground/90 !text-base md:!text-lg !leading-relaxed font-normal m-0";

    if (typeof content === 'string') {
        return (
            <p
                className={textClasses}
                dangerouslySetInnerHTML={{ __html: content }}
            />
        );
    }
    return (
        <div className={textClasses}>
            {content}
        </div>
    );
}

export function ProjectOverviewSection({
    id = "overview",
    label = "01",
    sublabel = "VISÃO GERAL",
    title = "O Projeto",
    resumo,
    objetivo,
    desafio,
    objetivoTitle = "Objetivo",
    desafioTitle = "Desafio",
}: ProjectOverviewSectionProps) {
    return (
        <ChapterSection id={id}>
            <SectionHeader label={label} sublabel={sublabel} title={title} bgNumber={label} showLine={false} />

            <div className="flex flex-col gap-10">
                {/* Intro summary paragraph formatted as blockquote callout with chamfered cut corners */}
                <RevealText delay={0.05}>
                    <blockquote className="exp-wrap w-full my-2 m-0 p-[1px] border-0">
                        <div className="exp w-full relative overflow-hidden p-6 sm:p-8 md:p-10 flex items-start gap-4 sm:gap-6">
                            {/* Background decorative quote watermark */}
                            <span 
                                className="absolute right-6 sm:right-10 -bottom-4 sm:-bottom-6 text-[var(--project-primary,var(--color-primary))]/10 text-7xl sm:text-8xl md:text-9xl font-serif select-none pointer-events-none leading-none"
                            >
                                ”
                            </span>

                            <div 
                                className="w-10 h-10 sm:w-12 sm:h-12 cut-icon bg-[var(--project-primary,var(--color-primary))]/10 border border-[var(--project-primary,var(--color-primary))]/20 text-[var(--project-primary,var(--color-primary))] flex items-center justify-center shrink-0 mt-1 z-10"
                            >
                                <Quote size={22} className="rotate-180" />
                            </div>
                            <div className="w-full z-10">
                                {renderFormattedContent(resumo, true)}
                            </div>
                        </div>
                    </blockquote>
                </RevealText>

                {/* Cards 2 & 3: Objetivo & Desafio (Side by side) */}
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mt-2">
                    <RevealText delay={0.15}>
                        <div className="exp-wrap h-full">
                            <div className="exp h-full flex flex-col justify-between p-6 sm:p-8">
                                <div className="flex flex-col gap-4">
                                    <div 
                                        className="w-12 h-12 cut-icon bg-[var(--project-primary,var(--color-primary))]/10 border border-[var(--project-primary,var(--color-primary))]/20 text-[var(--project-primary,var(--color-primary))] flex items-center justify-center shrink-0 mb-1"
                                    >
                                        <Target size={22} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground text-xl sm:text-2xl font-display m-0">
                                            {objetivoTitle}
                                        </h3>
                                        <div 
                                            className="w-10 h-0.5 bg-[var(--project-primary,var(--color-primary))]/60 rounded-full mt-2 mb-4" 
                                        />
                                    </div>
                                    <div>
                                        {renderFormattedContent(objetivo)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </RevealText>

                    <RevealText delay={0.25}>
                        <div className="exp-wrap h-full">
                            <div className="exp h-full flex flex-col justify-between p-6 sm:p-8">
                                <div className="flex flex-col gap-4">
                                    <div 
                                        className="w-12 h-12 cut-icon bg-[var(--project-primary,var(--color-primary))]/10 border border-[var(--project-primary,var(--color-primary))]/20 text-[var(--project-primary,var(--color-primary))] flex items-center justify-center shrink-0 mb-1"
                                    >
                                        <Zap size={22} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground text-xl sm:text-2xl font-display m-0">
                                            {desafioTitle}
                                        </h3>
                                        <div 
                                            className="w-10 h-0.5 bg-[var(--project-primary,var(--color-primary))]/60 rounded-full mt-2 mb-4" 
                                        />
                                    </div>
                                    <div>
                                        {renderFormattedContent(desafio)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </RevealText>
                </div>
            </div>
        </ChapterSection>
    );
}
