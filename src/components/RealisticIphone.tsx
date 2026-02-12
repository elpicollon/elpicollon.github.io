import { ReactNode } from 'react';

interface RealisticIphoneProps {
    children: ReactNode;
    className?: string;
}

export function RealisticIphone({ children, className = '' }: RealisticIphoneProps) {
    return (
        <div className={`relative ${className}`}>
            {/* iPhone Frame - Clean and Simple */}
            <div
                style={{
                    padding: '8px',
                    borderRadius: '40px',
                    background: '#1c1c1e',
                    boxShadow: `
                        0 25px 50px -12px rgba(0,0,0,0.5),
                        inset 0 0 0 1px rgba(255,255,255,0.1)
                    `,
                }}
            >
                {/* Screen */}
                <div
                    style={{
                        position: 'relative',
                        borderRadius: '32px',
                        overflow: 'hidden',
                        background: '#000',
                        aspectRatio: '9 / 19.5',
                    }}
                >
                    {/* Dynamic Island - Small pill */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '8px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '32%',
                            height: '14px',
                            background: '#000',
                            borderRadius: '10px',
                            zIndex: 30,
                        }}
                    />

                    {/* Screen content */}
                    <div style={{ position: 'absolute', inset: 0 }}>
                        {children}
                    </div>

                    {/* Home indicator */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '6px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '100px',
                            height: '4px',
                            background: 'rgba(255,255,255,0.2)',
                            borderRadius: '2px',
                            zIndex: 30,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
