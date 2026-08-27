import { ReactNode } from 'react';

interface RealisticIphoneProps {
    children: ReactNode;
    className?: string;
    /** Cor do titânio. Default: black. */
    finish?: 'natural' | 'black' | 'blue';
    /**
     * Como o conteúdo se ajusta à tela.
     * - 'cover' (default): preenche tudo, ancora no topo.
     * - 'contain': mostra tudo sem cortar, pode deixar faixas.
     */
    fit?: 'cover' | 'contain';
}

/**
 * Mockup realístico de iPhone (linha 15/16 Pro, tela 9:19.5).
 *
 * O componente pai controla a largura. O mockup ocupa 100% e
 * é completamente redimensionável. Construído com 100% Tailwind CSS.
 */
export function RealisticIphone({
    children,
    className = '',
    finish = 'black',
    fit = 'cover',
}: RealisticIphoneProps) {
    const frameGradient =
        finish === 'natural'
            ? 'bg-gradient-to-br from-[#d6d2cc] via-[#a8a39c] to-[#69655f]'
            : finish === 'blue'
            ? 'bg-gradient-to-br from-[#596b85] via-[#334358] to-[#1c2736]'
            : 'bg-gradient-to-br from-[#4d4d50] via-[#28282a] to-[#0f0f11]';

    const buttonBgClass = finish === 'natural' ? 'bg-[#8f8b85]' : 'bg-[#303032]';

    // Classes de fit — valores literais completos para o Tailwind não purgar no build.
    const imgFitCls =
        fit === 'contain'
            ? '[&>img]:object-contain [&>img]:object-center [&>video]:object-contain [&>video]:object-center'
            : '[&>img]:object-cover [&>img]:object-top [&>video]:object-cover [&>video]:object-top';

    return (
        /* Wrapper externo com Container Queries para escala estritamente proporcional */
        <div className={`relative w-full select-none @container ${className}`}>

            {/* ── BOTÕES LATERAIS (proporcionais com cqw) ── */}
            {/* Silêncio / Action Button (topo-esquerda) */}
            <div
                className={`absolute z-20 rounded-l-[0.4cqw] -left-[1.1cqw] top-[13%] w-[1.1cqw] h-[4.5%] min-w-[2px] ${buttonBgClass} shadow-[-1px_0_2px_rgba(0,0,0,0.5)]`}
            />
            {/* Volume + */}
            <div
                className={`absolute z-20 rounded-l-[0.4cqw] -left-[1.1cqw] top-[19.5%] w-[1.1cqw] h-[7%] min-w-[2px] ${buttonBgClass} shadow-[-1px_0_2px_rgba(0,0,0,0.5)]`}
            />
            {/* Volume − */}
            <div
                className={`absolute z-20 rounded-l-[0.4cqw] -left-[1.1cqw] top-[28%] w-[1.1cqw] h-[7%] min-w-[2px] ${buttonBgClass} shadow-[-1px_0_2px_rgba(0,0,0,0.5)]`}
            />
            {/* Power (direita) */}
            <div
                className={`absolute z-20 rounded-r-[0.4cqw] -right-[1.1cqw] top-[23%] w-[1.1cqw] h-[11%] min-w-[2px] ${buttonBgClass} shadow-[1px_0_2px_rgba(0,0,0,0.5)]`}
            />

            {/* ── FRAME DE TITÂNIO (Geometria iPhone Pro: 12.8cqw) ── */}
            <div
                className={`
                    relative w-full
                    rounded-[12.8cqw] p-[2.8%]
                    ${frameGradient}
                    ring-1 ring-black/80
                    shadow-[0_12px_24px_-6px_rgba(0,0,0,0.35),0_4px_8px_-2px_rgba(0,0,0,0.15),inset_0_0_0_1px_rgba(255,255,255,0.15),inset_0_1px_0_rgba(255,255,255,0.2)]
                `}
            >
                {/* ── BEZEL INTERNO PRETO (10.5cqw) ── */}
                <div className="w-full bg-black rounded-[10.5cqw] p-[1.2%]">

                    {/* ── ÁREA DA TELA (9:19.5 - 9.2cqw) ── */}
                    <div className="relative w-full aspect-[9/19.5] overflow-hidden bg-black rounded-[9.2cqw]">
                        {/* Conteúdo — absolutamente contido */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div
                                className={`w-full h-full [&>img]:block [&>img]:w-full [&>img]:h-full [&>video]:block [&>video]:w-full [&>video]:h-full [&>div]:w-full [&>div]:h-full [&>*]:max-w-full ${imgFitCls}`}
                            >
                                {children}
                            </div>
                        </div>

                        {/* ── DYNAMIC ISLAND (Proporcional com cqw) ── */}
                        <div
                            className="absolute left-1/2 z-30 -translate-x-1/2 flex items-center justify-end rounded-full bg-black top-[3.2cqw] h-[7.2cqw] w-[29cqw] pr-[2.2cqw] gap-[1.5cqw]"
                        >
                            {/* Câmera frontal com anel e lente */}
                            <div className="w-[2.4cqw] h-[2.4cqw] rounded-full flex items-center justify-center bg-[#0c1622] ring-1 ring-white/10">
                                <div className="w-[0.8cqw] h-[0.8cqw] rounded-full bg-[#1b3a61]/70" />
                            </div>
                        </div>

                        {/* ── HOME INDICATOR ── */}
                        <div className="absolute left-1/2 z-30 -translate-x-1/2 rounded-full bottom-[2.5cqw] h-[1.1cqw] min-h-[2px] w-[34%] bg-white/35" />

                        {/* Reflexo de vidro sutil */}
                        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent" />
                    </div>
                </div>
            </div>
        </div>
    );
}
