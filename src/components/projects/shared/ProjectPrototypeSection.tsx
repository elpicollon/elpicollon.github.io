import { ReactNode, useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ChapterSection } from './ChapterSection';
import { RevealText } from './RevealText';
import { SectionHeader } from '../../ui/SectionHeader';
import { RealisticMacBook } from '../../RealisticMacBook';
import { RealisticIphone } from '../../RealisticIphone';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '../../ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { ImageCarousel } from '../../MockupContentComponents';
import { LazyVideo } from '../../ui/LazyVideo';

export interface PrototypeScreenItem {
    titulo: string;
    descricao: ReactNode;
    imagens?: string[];
    secondaryImagens?: string[];
    deviceType?: 'macbook' | 'iphone' | 'dual-iphone' | 'raw' | string;
    scrollAnimation?: boolean;
    imageFit?: 'contain' | 'cover';
}

export interface ProjectPrototypeSectionProps {
    id?: string;
    label?: string;
    sublabel?: string;
    title?: ReactNode;
    intro?: ReactNode;
    telas?: PrototypeScreenItem[];
    defaultDeviceType?: 'macbook' | 'iphone' | 'dual-iphone' | 'raw' | string;
}

function ScrollingPageImage({ src, alt }: { src: string; alt: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [scrollDistance, setScrollDistance] = useState(0);

    const updateDistance = () => {
        if (containerRef.current && imgRef.current) {
            const containerH = containerRef.current.offsetHeight;
            const imgH = imgRef.current.offsetHeight;
            const distance = Math.max(0, imgH - containerH);
            setScrollDistance(distance);
        }
    };

    useEffect(() => {
        updateDistance();

        if (!containerRef.current || !imgRef.current) return;

        const ro = new ResizeObserver(() => {
            updateDistance();
        });

        ro.observe(containerRef.current);
        ro.observe(imgRef.current);

        window.addEventListener('resize', updateDistance);
        return () => {
            ro.disconnect();
            window.removeEventListener('resize', updateDistance);
        };
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-black">
            <motion.img
                ref={imgRef}
                src={src}
                alt={alt}
                onLoad={updateDistance}
                className="w-full h-auto block absolute top-0 left-0 select-none"
                animate={
                    scrollDistance > 0
                        ? {
                              y: [0, -scrollDistance, -scrollDistance, 0, 0],
                          }
                        : { y: 0 }
                }
                transition={
                    scrollDistance > 0
                        ? {
                              duration: Math.max(10, scrollDistance / 70),
                              times: [0, 0.45, 0.55, 0.95, 1],
                              ease: 'easeInOut',
                              repeat: Infinity,
                              repeatDelay: 1.5,
                          }
                        : undefined
                }
                loading="lazy"
            />
        </div>
    );
}

const isVideoFile = (url?: string) => Boolean(url && /\.(mp4|webm|mov|ogg|m4v)$/i.test(url));

function MediaDisplay({
    imagens = [],
    secondaryImagens = [],
    titulo,
    device,
    scrollAnimation = false,
    imageFit = 'cover',
}: {
    imagens?: string[];
    secondaryImagens?: string[];
    titulo: string;
    device: 'macbook' | 'iphone' | 'dual-iphone' | 'raw' | string;
    scrollAnimation?: boolean;
    imageFit?: 'contain' | 'cover';
}) {
    const safeImagens = imagens || [];
    const safeSecondary = secondaryImagens || [];
    const hasMultiple = safeImagens.length > 1;

    const renderInnerContent = () => {
        if (scrollAnimation && safeImagens[0]) {
            return <ScrollingPageImage src={safeImagens[0]} alt={titulo} />;
        }

        if (imageFit === 'contain') {
            return <ImageCarousel images={safeImagens} />;
        }

        if (!hasMultiple) {
            const firstMedia = safeImagens[0] || '';
            if (isVideoFile(firstMedia)) {
                return (
                    <LazyVideo
                        src={firstMedia}
                        className="w-full h-full object-cover object-top"
                    />
                );
            }

            return (
                <img
                    src={firstMedia}
                    alt={titulo}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                />
            );
        }

        return (
            <Carousel
                opts={{ align: 'start', loop: true }}
                plugins={[Autoplay({ delay: 4000 })]}
                className="w-full h-full"
            >
                <CarouselContent className="h-full">
                    {safeImagens.map((img, idx) => (
                        <CarouselItem key={idx} className="h-full basis-full flex items-center justify-center">
                            {isVideoFile(img) ? (
                                <LazyVideo
                                    src={img}
                                    className="w-full h-full object-cover object-top"
                                />
                            ) : (
                                <img
                                    src={img}
                                    alt={`${titulo} ${idx + 1}`}
                                    className="w-full h-full object-cover object-top"
                                    loading="lazy"
                                />
                            )}
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="hidden md:block">
                    <CarouselPrevious className="left-2 bg-background/80 text-foreground" />
                    <CarouselNext className="right-2 bg-background/80 text-foreground" />
                </div>
            </Carousel>
        );
    };

    if (device === 'dual-iphone') {
        const leftImages = safeImagens;
        const rightImages = safeSecondary.length > 0 ? safeSecondary : safeImagens.slice(1);

        return (
            <div className="w-full flex flex-row items-center justify-center gap-3 sm:gap-6">
                {/* Left iPhone - Landing Page Mobile */}
                <div className="flex-1 max-w-[200px] sm:max-w-[240px] md:max-w-[260px]">
                    <RealisticIphone fit="cover">
                        {scrollAnimation && leftImages[0] ? (
                            <ScrollingPageImage src={leftImages[0]} alt={`${titulo} - Mobile Home`} />
                        ) : isVideoFile(leftImages[0]) ? (
                            <LazyVideo
                                src={leftImages[0] || ''}
                                className="w-full h-full object-cover object-top"
                            />
                        ) : (
                            <img
                                src={leftImages[0] || ''}
                                alt={`${titulo} - Mobile Home`}
                                className="w-full h-full object-cover object-top"
                                loading="lazy"
                            />
                        )}
                    </RealisticIphone>
                </div>

                {/* Right iPhone - Mobile Screens Carousel */}
                <div className="flex-1 max-w-[200px] sm:max-w-[240px] md:max-w-[260px]">
                    <RealisticIphone fit="cover">
                        {rightImages.length > 1 ? (
                            <Carousel
                                opts={{ align: 'start', loop: true }}
                                plugins={[Autoplay({ delay: 3500 })]}
                                className="w-full h-full"
                            >
                                <CarouselContent className="h-full -ml-0" viewportClassName="h-full">
                                    {rightImages.map((img, idx) => (
                                        <CarouselItem key={idx} className="h-full basis-full pl-0 flex items-center justify-center">
                                            {isVideoFile(img) ? (
                                                <LazyVideo
                                                    src={img}
                                                    className="w-full h-full object-cover object-top"
                                                />
                                            ) : (
                                                <img
                                                    src={img}
                                                    alt={`${titulo} App ${idx + 1}`}
                                                    className="w-full h-full object-cover object-top"
                                                    loading="lazy"
                                                />
                                            )}
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <div className="hidden sm:block">
                                    <CarouselPrevious className="left-1.5 h-7 w-7 bg-background/80 text-foreground" />
                                    <CarouselNext className="right-1.5 h-7 w-7 bg-background/80 text-foreground" />
                                </div>
                            </Carousel>
                        ) : isVideoFile(rightImages[0]) ? (
                            <LazyVideo
                                src={rightImages[0] || ''}
                                className="w-full h-full object-cover object-top"
                            />
                        ) : (
                            <img
                                src={rightImages[0] || ''}
                                alt={`${titulo} App`}
                                className="w-full h-full object-cover object-top"
                                loading="lazy"
                            />
                        )}
                    </RealisticIphone>
                </div>
            </div>
        );
    }

    if (device === 'raw') {
        return (
            <div className="w-full h-auto overflow-hidden rounded-xl border border-border shadow-md bg-card">
                {renderInnerContent()}
            </div>
        );
    }

    if (device === 'iphone') {
        return (
            <div className="w-full max-w-[280px] sm:max-w-[320px] mx-auto">
                <RealisticIphone fit={imageFit || 'cover'}>
                    {renderInnerContent()}
                </RealisticIphone>
            </div>
        );
    }

    return (
        <div className="w-full">
            <RealisticMacBook fit="contain">
                {renderInnerContent()}
            </RealisticMacBook>
        </div>
    );
}

export function ProjectPrototypeSection({
    id = "prototype",
    label = "03",
    sublabel = "PROTÓTIPO",
    title = "Interface do Projeto",
    intro,
    telas = [],
    defaultDeviceType = "macbook",
}: ProjectPrototypeSectionProps) {
    return (
        <ChapterSection id={id}>
            <SectionHeader label={label} sublabel={sublabel} title={title} bgNumber={label} showLine={false} />
            {intro && (
                <RevealText delay={0.05}>
                    <div className="w-full text-muted text-lg sm:text-xl leading-relaxed mb-12">
                        {typeof intro === 'string' ? (
                            <p dangerouslySetInnerHTML={{ __html: intro }} />
                        ) : (
                            intro
                        )}
                    </div>
                </RevealText>
            )}
            <div className="flex flex-col gap-16 sm:gap-24">
                {(telas || []).map((tela, index) => {
                    const device = tela.deviceType || defaultDeviceType;
                    const isEven = index % 2 === 0;

                    const textColumn = (
                        <div className="flex flex-col justify-center gap-3">
                            <div 
                                className="w-12 h-12 cut-icon bg-[var(--project-primary,var(--color-primary))]/10 border border-[var(--project-primary,var(--color-primary))]/20 text-[var(--project-primary,var(--color-primary))] font-display font-bold text-lg flex items-center justify-center shrink-0"
                            >
                                {String(index + 1).padStart(2, '0')}
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground text-2xl sm:text-3xl font-display m-0">
                                    {tela.titulo}
                                </h3>
                                <div 
                                    className="w-12 h-0.5 bg-[var(--project-primary,var(--color-primary))]/60 rounded-full mt-2 mb-3" 
                                />
                            </div>
                            <div className="text-muted text-base sm:text-lg leading-relaxed">
                                {typeof tela.descricao === 'string' ? (
                                    <p dangerouslySetInnerHTML={{ __html: tela.descricao }} />
                                ) : (
                                    tela.descricao
                                )}
                            </div>
                        </div>
                    );

                    const mediaColumn = (
                        <MediaDisplay
                            imagens={tela.imagens}
                            secondaryImagens={tela.secondaryImagens}
                            titulo={tela.titulo}
                            device={device}
                            scrollAnimation={tela.scrollAnimation}
                            imageFit={tela.imageFit}
                        />
                    );

                    return (
                        <RevealText key={index} delay={0.1}>
                            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                                {isEven ? (
                                    <>
                                        <div className="lg:col-span-7">{mediaColumn}</div>
                                        <div className="lg:col-span-5">{textColumn}</div>
                                    </>
                                ) : (
                                    <>
                                        <div className="lg:col-span-5 lg:order-1 order-2">{textColumn}</div>
                                        <div className="lg:col-span-7 lg:order-2 order-1">{mediaColumn}</div>
                                    </>
                                )}
                            </div>
                        </RevealText>
                    );
                })}
            </div>
        </ChapterSection>
    );
}
