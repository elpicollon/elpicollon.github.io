import { ReactNode } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { ChapterSection } from './ChapterSection';
import { RevealText } from './RevealText';
import { SectionHeader } from '../../ui/SectionHeader';
import { RealisticMacBook } from '../../RealisticMacBook';

import { LazyVideo } from '../../ui/LazyVideo';

export interface ProjectHandoffData {
    titulo: string;
    descricao: ReactNode;
    bullets: string[];
    imagem: string;
}

const isVideoFile = (url?: string) => Boolean(url && /\.(mp4|webm|mov|ogg|m4v)$/i.test(url));

export interface ProjectHandoffSectionProps {
    id?: string;
    label?: string;
    sublabel?: string;
    data: ProjectHandoffData;
    deviceType?: 'macbook' | 'raw';
}

export function ProjectHandoffSection({
    id = "handoff",
    label = "06",
    sublabel = "ENGENHARIA",
    data,
    deviceType = "macbook",
}: ProjectHandoffSectionProps) {
    return (
        <ChapterSection id={id}>
            <SectionHeader label={label} sublabel={sublabel} title={data.titulo} bgNumber={label} showLine={false} />
            <div className="grid lg:grid-cols-2 gap-10 items-center">
                <RevealText>
                    <div className="flex flex-col gap-6">
                        <div className="text-base sm:text-lg text-muted leading-relaxed whitespace-pre-line">
                            {typeof data.descricao === 'string' ? (
                                <p>{data.descricao}</p>
                            ) : (
                                data.descricao
                            )}
                        </div>
                        <div className="flex flex-col gap-3">
                            {data.bullets.map((bullet, index) => {
                                const parts = bullet.split(': ');
                                const title = parts[0];
                                const description = parts.slice(1).join(': ');
                                return (
                                    <div key={index} className="flex items-start gap-3 text-sm sm:text-base text-muted">
                                        <CheckCircle2 
                                            size={18} 
                                            className="text-[var(--project-primary,var(--color-primary))] shrink-0 mt-1" 
                                        />
                                        <span>
                                            {description ? (
                                                <>
                                                    <strong className="font-semibold text-foreground">{title}:</strong> {description}
                                                </>
                                            ) : (
                                                bullet
                                            )}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </RevealText>

                <RevealText delay={0.2}>
                    {deviceType === 'macbook' ? (
                        <div className="w-full">
                            <RealisticMacBook fit="contain">
                                {isVideoFile(data.imagem) ? (
                                    <LazyVideo
                                        src={data.imagem}
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <img
                                        src={data.imagem}
                                        alt={data.titulo}
                                        className="w-full h-full object-contain"
                                        loading="lazy"
                                    />
                                )}
                            </RealisticMacBook>
                        </div>
                    ) : (
                        <div className="overflow-hidden rounded-xl border border-border shadow-sm">
                            {isVideoFile(data.imagem) ? (
                                <LazyVideo
                                    src={data.imagem}
                                    className="w-full h-auto object-cover block"
                                />
                            ) : (
                                <img
                                    src={data.imagem}
                                    alt={data.titulo}
                                    className="w-full h-auto object-cover block"
                                    loading="lazy"
                                />
                            )}
                        </div>
                    )}
                </RevealText>
            </div>
        </ChapterSection>
    );
}
