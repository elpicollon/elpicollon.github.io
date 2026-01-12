import { ReactNode } from 'react';

interface RealisticMacBookProps {
    children: ReactNode;
    className?: string;
}

export function RealisticMacBook({ children, className = '' }: RealisticMacBookProps) {
    return (
        <div className={`relative ${className}`} style={{ perspective: '1200px' }}>
            {/* MacBook Pro Container */}
            <div
                style={{
                    transformStyle: 'preserve-3d',
                    transform: 'rotateX(2deg)',
                }}
            >
                {/* Screen Assembly */}
                <div
                    className="p-1.5 sm:p-2 md:p-3 pb-0 sm:pb-0 md:pb-0 rounded-t-lg sm:rounded-t-xl md:rounded-t-2xl"
                    style={{
                        background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)',
                        boxShadow: `
                            0 0 0 1px rgba(255,255,255,0.05),
                            0 -1px 0 1px rgba(0,0,0,0.8),
                            0 25px 60px -10px rgba(0,0,0,0.5),
                            0 10px 30px -5px rgba(0,0,0,0.3)
                        `,
                        position: 'relative',
                    }}
                >
                    {/* Top Bezel with Camera Notch - Hidden on mobile */}
                    <div
                        className="hidden sm:flex"
                        style={{
                            position: 'absolute',
                            top: '4px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '60px',
                            height: '14px',
                            background: '#0d0d0d',
                            borderRadius: '0 0 8px 8px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 10,
                        }}
                    >
                        {/* Camera Lens */}
                        <div
                            style={{
                                width: '5px',
                                height: '5px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
                                boxShadow: `
                                    inset 0 1px 2px rgba(0,0,0,0.8),
                                    0 0 0 1px rgba(255,255,255,0.05)
                                `,
                            }}
                        >
                            {/* Camera indicator light */}
                            <div
                                style={{
                                    width: '2px',
                                    height: '2px',
                                    borderRadius: '50%',
                                    background: '#2a2a2a',
                                    margin: '1px auto 0',
                                }}
                            />
                        </div>
                    </div>

                    {/* Screen Bezel Frame */}
                    <div
                        className="p-0.5 rounded-md sm:rounded-lg"
                        style={{
                            background: '#0a0a0a',
                            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.03)',
                        }}
                    >
                        {/* Actual Screen Content Area */}
                        <div
                            className="rounded sm:rounded-md"
                            style={{
                                background: '#000',
                                overflow: 'hidden',
                                aspectRatio: '16/10',
                                position: 'relative',
                            }}
                        >
                            {/* Screen Reflection Overlay */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '30%',
                                    background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)',
                                    pointerEvents: 'none',
                                    zIndex: 20,
                                }}
                            />

                            {/* Dynamic Content */}
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    inset: 0,
                                }}
                            >
                                {children}
                            </div>
                        </div>
                    </div>
                </div>

                {/* MacBook Bottom Hinge/Base */}
                <div
                    style={{
                        position: 'relative',
                        marginTop: '-1px',
                    }}
                >
                    {/* Hinge connector */}
                    <div
                        className="h-1 sm:h-1.5 md:h-2 rounded-b sm:rounded-b-md"
                        style={{
                            background: 'linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 50%, #2a2a2a 100%)',
                            boxShadow: `
                                0 2px 4px rgba(0,0,0,0.3),
                                inset 0 1px 0 rgba(255,255,255,0.05)
                            `,
                        }}
                    />

                    {/* Base/Keyboard area (truncated view) */}
                    <div
                        className="h-2 sm:h-2.5 md:h-3 rounded-b-md sm:rounded-b-lg"
                        style={{
                            background: 'linear-gradient(180deg, #e0e0e0 0%, #c8c8c8 30%, #b0b0b0 100%)',
                            marginTop: '-1px',
                            boxShadow: `
                                0 4px 12px rgba(0,0,0,0.2),
                                inset 0 1px 0 rgba(255,255,255,0.8),
                                inset 0 -1px 0 rgba(0,0,0,0.1)
                            `,
                            position: 'relative',
                        }}
                    >
                        {/* Notch cutout in base */}
                        <div
                            className="h-0.5 sm:h-1 rounded-b sm:rounded-b-md"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '25%',
                                background: 'linear-gradient(180deg, #888 0%, #999 100%)',
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

