import { ReactNode } from 'react';
import { CheckCircle2, XCircle, Zap, ShieldAlert } from 'lucide-react';
import { ChapterSection } from './ChapterSection';
import { RevealText } from './RevealText';
import { SectionHeader } from '../../ui/SectionHeader';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '../../ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { CarouselImageItem } from './ProjectImageCarouselSection';

export interface VisionCategory {
    title: string;
    items: string[];
}

export interface ProductVisionData {
    whatItIs?: VisionCategory;
    whatItIsNot?: VisionCategory;
    whatItDoes?: VisionCategory;
    whatItDoesNot?: VisionCategory;
}

export interface ProjectProductVisionSectionProps {
    id?: string;
    label?: string;
    sublabel?: string;
    title?: ReactNode;
    description?: ReactNode;
    images?: (string | CarouselImageItem)[];
    data: ProductVisionData;
}

export function ProjectProductVisionSection({
    id = "product-vision",
    label = "04",
    sublabel = "DESCOBERTA & DEFINIÇÃO",
    title = "Visão de Produto",
    description,
    images,
    data,
}: ProjectProductVisionSectionProps) {
    const formattedImages: CarouselImageItem[] = (images || []).map((img) =>
        typeof img === 'string' ? { src: img, alt: title ? String(title) : 'Visão de produto' } : img
    );
    const cards = [
        {
            key: 'whatItIs',
            category: data.whatItIs,
            icon: CheckCircle2,
            accentColor: 'text-emerald-500',
            bgIcon: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500',
        },
        {
            key: 'whatItIsNot',
            category: data.whatItIsNot,
            icon: XCircle,
            accentColor: 'text-rose-500',
            bgIcon: 'bg-rose-500/10 border-rose-500/20 text-rose-500',
        },
        {
            key: 'whatItDoes',
            category: data.whatItDoes,
            icon: Zap,
            accentColor: 'text-[var(--project-primary,var(--color-primary))]',
            bgIcon: 'bg-[var(--project-primary,var(--color-primary))]/10 border-[var(--project-primary,var(--color-primary))]/20 text-[var(--project-primary,var(--color-primary))]',
        },
        {
            key: 'whatItDoesNot',
            category: data.whatItDoesNot,
            icon: ShieldAlert,
            accentColor: 'text-amber-500',
            bgIcon: 'bg-amber-500/10 border-amber-500/20 text-amber-500',
        },
    ];

    return (
        <ChapterSection id={id}>
            <SectionHeader label={label} sublabel={sublabel} title={title} bgNumber={label} showLine={false} />
            {description && (
                <RevealText delay={0.05}>
                    <div className="w-full text-muted text-lg sm:text-xl leading-relaxed mb-10">
                        {typeof description === 'string' ? (
                            <p dangerouslySetInnerHTML={{ __html: description }} />
                        ) : (
                            description
                        )}
                    </div>
                </RevealText>
            )}

            {formattedImages.length > 0 && (
                <RevealText delay={0.08}>
                    <div className="relative mb-10">
                        <Carousel
                            opts={{ align: 'start', loop: true }}
                            plugins={[Autoplay({ delay: 4000 })]}
                            className="w-full"
                        >
                            <CarouselContent className="-ml-6 sm:-ml-8">
                                {formattedImages.map((item, index) => (
                                    <CarouselItem key={index} className="pl-6 sm:pl-8 basis-full md:basis-1/2">
                                        <div className="exp-wrap h-full">
                                            <div className="exp p-3 sm:p-4 h-full flex flex-col items-center justify-center">
                                                <div className="w-full aspect-video rounded-lg overflow-hidden flex items-center justify-center bg-background/50">
                                                    <img
                                                        src={item.src}
                                                        alt={item.alt || `Visão de Produto ${index + 1}`}
                                                        className="w-full h-full object-contain"
                                                        loading="lazy"
                                                    />
                                                </div>
                                                {item.caption && (
                                                    <div className="mt-2 text-center text-xs sm:text-sm text-muted">
                                                        {typeof item.caption === 'string' ? (
                                                            <p dangerouslySetInnerHTML={{ __html: item.caption }} />
                                                        ) : (
                                                            item.caption
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            {formattedImages.length > 1 && (
                                <div className="hidden md:block">
                                    <CarouselPrevious className="-left-4 lg:-left-6 bg-background/90 text-foreground border border-border shadow-md" />
                                    <CarouselNext className="-right-4 lg:-right-6 bg-background/90 text-foreground border border-border shadow-md" />
                                </div>
                            )}
                        </Carousel>
                    </div>
                </RevealText>
            )}

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                {cards.map((card, index) => {
                    if (!card.category) return null;
                    const IconComp = card.icon;

                    return (
                        <RevealText key={card.key} delay={0.1 + index * 0.08}>
                            <div className="exp-wrap h-full">
                                <div className="exp p-6 sm:p-8 h-full flex flex-col justify-start">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div 
                                            className={`w-10 h-10 cut-icon border flex items-center justify-center shrink-0 ${card.bgIcon}`}
                                        >
                                            <IconComp size={20} />
                                        </div>
                                        <h3 className="font-semibold text-foreground text-xl font-display m-0">
                                            {card.category.title}
                                        </h3>
                                    </div>
                                    <ul className="space-y-3 m-0 p-0 list-none text-muted text-sm sm:text-base leading-relaxed">
                                        {card.category.items.map((item, itemIdx) => (
                                            <li key={itemIdx} className="flex items-start gap-2.5">
                                                <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${card.accentColor.replace('text-', 'bg-')}`} />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </RevealText>
                    );
                })}
            </div>
        </ChapterSection>
    );
}
