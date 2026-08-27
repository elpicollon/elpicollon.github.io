import { ReactNode } from 'react';

interface RealisticMacBookProps {
    children: ReactNode;
    className?: string;
    /** Cor da moldura de alumínio. Default: spacegray. */
    finish?: 'silver' | 'spacegray';
    /**
     * Como o conteúdo se ajusta à tela.
     * - 'cover' (default): preenche tudo, ancora no topo.
     * - 'contain': mostra tudo sem cortar, pode deixar faixas.
     */
    fit?: 'cover' | 'contain';
}

/**
 * Mockup realístico de MacBook (tela 16:10).
 *
 * Moldura de vidro preta (bezel) 100% uniforme e proporcional nos 4 lados
 * usando sintaxe Tailwind p-[5%] (valor arbitrário correto) e chassi de alumínio p-[0.6%].
 * NOTA: [padding:X%] é sintaxe de propriedade CSS arbitrária e gera 0px — usar p-[X%].
 */
export function RealisticMacBook({
    children,
    className = '',
    finish = 'spacegray',
    fit = 'cover',
}: RealisticMacBookProps) {
    const chassisGradient =
        finish === 'spacegray'
            ? 'bg-gradient-to-b from-[#4a4d53] via-[#32353a] to-[#1a1b1e]'
            : 'bg-gradient-to-b from-[#e6eaef] via-[#ccd2d9] to-[#9ea7b1]';

    const ringColor =
        finish === 'spacegray'
            ? 'ring-black/80'
            : 'ring-slate-400/50';

    const deckGradient =
        finish === 'spacegray'
            ? 'from-[#54575e] via-[#393c41] to-[#242629]'
            : 'from-[#e8ecf0] via-[#c8d0d8] to-[#98a2ac]';

    const objectFitClass = fit === 'contain' ? 'object-contain object-center' : 'object-cover object-top';

    return (
        /* Wrapper externo */
        <div className={`relative w-full select-none @container ${className}`}>
            <div className="flex flex-col items-center w-full">

                {/* ── 1. CHASSI EXTERNO DE ALUMÍNIO (TELA) ──────────────────── */}
                <div
                    className={`
                        relative w-full
                        rounded-t-[2.4cqw] rounded-b-[0.4cqw]
                        ${chassisGradient}
                        ring-1 ${ringColor}
                        shadow-[0_20px_40px_-10px_rgba(0,0,0,0.85)]
                        p-[0.6%]
                    `}
                >
                    {/* ── 2. PAINEL DE VIDRO PRETO (BEZEL) ────────────────────── */}
                    <div
                        className="
                            relative w-full bg-black
                            rounded-t-[1.9cqw] rounded-b-[0.3cqw]
                            overflow-hidden
                            p-[1%]
                            flex flex-col items-center
                        "
                    >
                        {/* ── 3. DISPLAY DE EXIBIÇÃO DA TELA (16:10) ──────────────── */}
                        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-[0.5cqw] bg-black">
                            <div className="absolute inset-0 overflow-hidden bg-black flex items-center justify-center">
                                <div className={`w-full h-full relative overflow-hidden [&>img]:w-full [&>img]:h-full [&>img]:${objectFitClass} [&>video]:w-full [&>video]:h-full [&>video]:${objectFitClass}`}>
                                    {children}
                                </div>
                            </div>

                            {/* ── Notch da câmera ── */}
                            <div className="pointer-events-none absolute -top-px left-1/2 -translate-x-1/2 z-30 bg-black rounded-b-[0.6cqw] flex items-center justify-center w-[13%] py-[0.4cqw]">
                                <div className="h-[0.6cqw] w-[0.6cqw] min-h-[4px] min-w-[4px] rounded-full bg-[#1a1a1a] ring-1 ring-white/10 flex items-center justify-center">
                                    <div className="h-[0.2cqw] w-[0.2cqw] min-h-[1.5px] min-w-[1.5px] rounded-full bg-emerald-500/80" />
                                </div>
                            </div>

                            {/* Reflexo sutil de vidro */}
                            <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent" />
                        </div>
                    </div>
                </div>

                {/* ── 4. VINCO DA DOBRADIÇA ───────────────────────────── */}
                <div className="w-[98%] h-[0.35cqw] min-h-[2px] bg-[#050607]" />

                {/* ── 5. BASE DE ALUMÍNIO / DECK (LATERAIS MAIORES QUE A TELA) ── */}
                <div
                    className={`
                        relative w-[103.5%] -mx-[1.75%] overflow-hidden
                        h-[2.5cqw] min-h-[12px]
                        rounded-b-[2cqw]
                        bg-gradient-to-b ${deckGradient}
                        ring-1 ring-black/40
                        shadow-[0_10px_22px_-4px_rgba(0,0,0,0.45)]
                    `}
                >
                    {/* Recorte central para abertura da tampa */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[12%] max-w-[90px] h-[42%] rounded-b-[0.5cqw] bg-black/60" />
                    {/* Highlight superior de reflexo de alumínio */}
                    <div className="absolute inset-x-0 top-0 h-px bg-white/40" />
                    {/* Sombra inferior */}
                    <div className="absolute inset-x-0 bottom-0 h-[1px] bg-black/30" />
                </div>

                {/* ── SOMBRA NO CHÃO ──────────────────────────────────────── */}
                <div className="pointer-events-none w-[92%] h-[1.4cqw] min-h-[7px] rounded-[50%] bg-black/35 blur-[0.9cqw] -mt-[1px]" />
            </div>
        </div>
    );
}
