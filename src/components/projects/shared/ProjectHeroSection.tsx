import { ChannelConfig } from "../../crt/channels";
import { RevealText } from "./RevealText";
import { ScrollIndicator } from "../../ui/ScrollIndicator";
import { RealisticMacBook } from "../../RealisticMacBook";
import { RealisticIphone } from "../../RealisticIphone";
import { useTranslation } from "../../../hooks/useTranslation";

export interface ProjectHeroTitle {
    line1?: string;
    line2?: string;
    highlight?: string;
}

export interface ProjectHeroSectionProps {
    c: ChannelConfig;
    title?: string;
    heroTitle?: ProjectHeroTitle;
    tags?: string[];
    heroImage?: string;
    secondaryHeroImage?: string;
    deviceType?: 'macbook' | 'iphone' | 'dual' | string;
}

export function ProjectHeroSection({
    c,
    title,
    heroTitle,
    tags,
    heroImage,
    secondaryHeroImage,
    deviceType
}: ProjectHeroSectionProps) {
    const { isPortuguese } = useTranslation();

    // Determine default project values based on channel path
    const getProjectDefaults = () => {
        switch (c.path) {
            case "/projeto/transcricoes-insights-ia":
                return {
                    image: "/assets/projects/transcricoes-insights-ia/cover.webp",
                    secondaryImage: undefined,
                    deviceType: "macbook" as const,
                    line1: isPortuguese ? "Transcrições &" : "Transcriptions &",
                    line2: isPortuguese ? "Insights de chamadas" : "Call Insights",
                    highlight: isPortuguese ? "com Inteligência Artificial" : "with Artificial Intelligence",
                    tags: isPortuguese
                        ? ["Product Design", "Inteligência Artificial", "2024"]
                        : ["Product Design", "Artificial Intelligence", "2024"]
                };
            case "/projeto/ia-notetaker-app":
                return {
                    image: "/assets/projects/ia-notetaker-app/capa.webp",
                    secondaryImage: undefined,
                    deviceType: "iphone" as const,
                    line1: isPortuguese ? "Resumos & Insights" : "Summaries & Insights",
                    line2: isPortuguese ? "de reuniões presenciais" : "from in-person meetings",
                    highlight: isPortuguese ? "com Inteligência Artificial" : "with Artificial Intelligence",
                    tags: isPortuguese
                        ? ["Product Design", "Inteligência Artificial", "Mobile", "2025"]
                        : ["Product Design", "Artificial Intelligence", "Mobile", "2025"]
                };
            case "/projeto/medical-office":
                return {
                    image: "/assets/projects/medical-office/cover.webp",
                    secondaryImage: "/assets/projects/medical-office/prototipo/5-1.webp",
                    deviceType: "dual" as const,
                    line1: isPortuguese ? "Redesign da Plataforma" : "Platform Redesign",
                    line2: isPortuguese ? "de Locação de consultórios" : "for Clinic Rentals at",
                    highlight: "Medical Office",
                    tags: isPortuguese
                        ? ["Product Design", "Web App", "2021"]
                        : ["Product Design", "Web App", "2021"]
                };
            case "/projeto/importacao-empresas":
                return {
                    image: "/assets/projects/importacao-empresas/home.webp",
                    secondaryImage: undefined,
                    deviceType: "macbook" as const,
                    line1: isPortuguese ? "Importação em Massa" : "Bulk Importation",
                    line2: isPortuguese ? "e Qualificação de" : "and Qualification of",
                    highlight: isPortuguese ? "Empresas B2B" : "B2B Companies",
                    tags: isPortuguese
                        ? ["Product Design", "Gestão de Dados", "2025"]
                        : ["Product Design", "Data Management", "2025"]
                };
            default:
                return {
                    image: c.image || "",
                    secondaryImage: undefined,
                    deviceType: "macbook" as const,
                    line1: c.name || title || "",
                    line2: "",
                    highlight: "",
                    tags: [c.disc || "Product Design", c.year || "2024"]
                };
        }
    };

    const defaults = getProjectDefaults();

    // Final title resolution
    const finalLine1 = heroTitle?.line1 !== undefined ? heroTitle.line1 : defaults.line1;
    const finalLine2 = heroTitle?.line2 !== undefined ? heroTitle.line2 : defaults.line2;
    const finalHighlight = heroTitle?.highlight !== undefined ? heroTitle.highlight : defaults.highlight;

    const finalTags = tags && tags.length > 0 ? tags : defaults.tags;
    const finalImage = heroImage || defaults.image;
    const finalSecondaryImage = secondaryHeroImage !== undefined ? secondaryHeroImage : defaults.secondaryImage;
    const finalDeviceType = deviceType || defaults.deviceType;

    return (
        <div className="hero">
            <div className="wrap">
                <div className="hero-grid">
                    <div className="flex flex-col justify-center items-start w-full">
                        <RevealText delay={0.05}>
                            <h1 className="project-hero-title text-[26px] sm:text-[34px] md:text-[40px] lg:text-[44px] xl:text-[52px] font-semibold tracking-tight leading-[1.15]">
                                {finalLine1 && <>{finalLine1}<br /></>}
                                {finalLine2 && <>{finalLine2}<br /></>}
                                {finalHighlight && <span className="hl">{finalHighlight}</span>}
                                {!finalLine1 && !finalLine2 && !finalHighlight && (title || c.name)}
                            </h1>
                        </RevealText>

                        <RevealText delay={0.15}>
                            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 mt-3 sm:mt-4">
                                {finalTags.map((tag, idx) => (
                                    <span key={idx} className="project-hero-tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </RevealText>
                    </div>

                    <div className="relative flex justify-center lg:justify-end items-center w-full py-2 lg:py-0 min-h-0">
                        <RevealText delay={0.25} className="w-full flex justify-center lg:justify-end">
                            {finalDeviceType === 'iphone' ? (
                                <div className="w-full max-w-[180px] sm:max-w-[230px] md:max-w-[270px] lg:max-w-[260px] mx-auto lg:ml-auto lg:mr-0 drop-shadow-md sm:drop-shadow-xl lg:drop-shadow-2xl my-1 sm:my-2 shrink-0">
                                    <RealisticIphone>
                                        <img
                                            src={finalImage}
                                            alt={c.name || title}
                                            className="w-full h-full object-cover object-top block"
                                        />
                                    </RealisticIphone>
                                </div>
                            ) : (
                                <div className="relative w-full max-w-[280px] sm:max-w-[420px] md:max-w-[520px] lg:max-w-[483px] mx-auto lg:ml-auto lg:mr-0 drop-shadow-md sm:drop-shadow-xl lg:drop-shadow-2xl my-1 sm:my-2 shrink-0">
                                    <RealisticMacBook>
                                        <img
                                            src={finalImage}
                                            alt={c.name || title}
                                            className="w-full h-full object-cover object-top block"
                                        />
                                    </RealisticMacBook>

                                    {finalSecondaryImage && (
                                        <div className="absolute -left-[4%] sm:-left-[5%] lg:-left-[6%] -bottom-[4%] sm:-bottom-[5%] w-[22%] sm:w-[23%] lg:w-[24%] z-20 drop-shadow-[0_8px_16px_rgba(0,0,0,0.25)]">
                                            <RealisticIphone fit="cover">
                                                <img
                                                    src={finalSecondaryImage}
                                                    alt={`${c.name || title} - Mobile`}
                                                    className="w-full h-full object-cover object-top block"
                                                />
                                            </RealisticIphone>
                                        </div>
                                    )}
                                </div>
                            )}
                        </RevealText>
                    </div>
                </div>
            </div>

            <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none z-20">
                <ScrollIndicator />
            </div>
        </div>
    );
}
