import { ReactNode, MouseEvent, useCallback } from 'react';
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

export interface CarouselImageItem {
    src: string;
    alt?: string;
    caption?: ReactNode;
    zoomable?: boolean;
}

export interface ProjectImageCarouselSectionProps {
    id?: string;
    label?: string;
    sublabel?: string;
    title?: ReactNode;
    description?: ReactNode;
    images: (string | CarouselImageItem)[];
    autoplayDelay?: number;
    aspectRatio?: 'video' | 'auto' | 'square';
    zoomable?: boolean;
}

export function ProjectImageCarouselSection({
    id = "gallery",
    label,
    sublabel,
    title,
    description,
    images,
    autoplayDelay = 4000,
    aspectRatio = 'video',
    zoomable = false,
}: ProjectImageCarouselSectionProps) {
    const formattedImages: CarouselImageItem[] = images.map((img) =>
        typeof img === 'string' ? { src: img, alt: title ? String(title) : 'Project image' } : img
    );

    const isSingle = formattedImages.length <= 1;

    const aspectClass =
        aspectRatio === 'video'
            ? 'aspect-video'
            : aspectRatio === 'square'
            ? 'aspect-square'
            : 'h-auto';

    const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        e.currentTarget.style.setProperty('--zoom-x', `${x}%`);
        e.currentTarget.style.setProperty('--zoom-y', `${y}%`);
    }, []);

    const handleMouseLeave = useCallback((e: MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.removeProperty('--zoom-x');
        e.currentTarget.style.removeProperty('--zoom-y');
    }, []);

    const renderImageItem = (item: CarouselImageItem, index: number, isSingleView: boolean = false) => {
        const isItemZoomable = item.zoomable ?? zoomable ?? false;

        return (
            <div className="w-full flex flex-col items-center justify-center p-2 sm:p-4">
                <div
                    className={`w-full overflow-hidden rounded-lg ${aspectClass} flex items-center justify-center bg-background/50 ${
                        isItemZoomable ? 'zoomable-image-container' : ''
                    }`}
                    onMouseMove={isItemZoomable ? handleMouseMove : undefined}
                    onMouseLeave={isItemZoomable ? handleMouseLeave : undefined}
                >
                    <img
                        src={item.src}
                        alt={item.alt || (isSingleView ? (title ? String(title) : 'Project image') : `Slide ${index + 1}`)}
                        className={`w-full h-full object-contain ${
                            isItemZoomable ? 'zoomable-image' : ''
                        }`}
                        loading="lazy"
                    />
                </div>
                {item.caption && (
                    <div className="mt-3 text-center text-sm text-muted">
                        {typeof item.caption === 'string' ? (
                            <p dangerouslySetInnerHTML={{ __html: item.caption }} />
                        ) : (
                            item.caption
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <ChapterSection id={id}>
            {title && (
                <SectionHeader label={label} sublabel={sublabel} title={title} bgNumber={label} showLine={false} />
            )}

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

            <RevealText delay={0.1}>
                <div className="relative overflow-hidden rounded-xl border border-border shadow-md bg-card">
                    {isSingle ? (
                        formattedImages[0] ? renderImageItem(formattedImages[0], 0, true) : null
                    ) : (
                        <Carousel
                            opts={{ align: 'start', loop: true }}
                            plugins={[Autoplay({ delay: autoplayDelay })]}
                            className="w-full"
                        >
                            <CarouselContent>
                                {formattedImages.map((item, index) => (
                                    <CarouselItem key={index} className="basis-full">
                                        {renderImageItem(item, index, false)}
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <div className="hidden md:block">
                                <CarouselPrevious className="left-4 bg-background/80 text-foreground" />
                                <CarouselNext className="right-4 bg-background/80 text-foreground" />
                            </div>
                        </Carousel>
                    )}
                </div>
            </RevealText>
        </ChapterSection>
    );
}
