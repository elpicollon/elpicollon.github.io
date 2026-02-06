import { useEffect, useRef } from 'react';

// Predefined color palettes
const COLOR_PALETTES = {
    purple: [
        { r: 216, g: 180, b: 254 },  // purple-300
        { r: 192, g: 132, b: 252 },  // purple-400
        { r: 168, g: 85, b: 247 },   // purple-500
        { r: 147, g: 51, b: 234 },   // purple-600
    ],
    teal: [
        { r: 94, g: 234, b: 212 },   // teal-300
        { r: 45, g: 212, b: 191 },   // teal-400
        { r: 20, g: 184, b: 166 },   // teal-500
        { r: 13, g: 148, b: 136 },   // teal-600
    ],
    blue: [
        { r: 147, g: 197, b: 253 },  // blue-300
        { r: 96, g: 165, b: 250 },   // blue-400
        { r: 64, g: 136, b: 255 },   // #4088FF
        { r: 37, g: 99, b: 235 },    // blue-600
    ],
    navy: [
        { r: 99, g: 143, b: 191 },   // Lighter navy
        { r: 55, g: 104, b: 156 },   // Medium navy
        { r: 2, g: 55, b: 109 },     // #02376D
        { r: 1, g: 35, b: 70 },      // Darker navy
    ],
};

type ColorPreset = keyof typeof COLOR_PALETTES;

interface ParticleBackgroundProps {
    /**
     * Color preset or custom color array
     * Presets: 'purple', 'teal', 'blue', 'navy'
     */
    color?: ColorPreset | { r: number; g: number; b: number }[];
}

export function ParticleBackground({ color = 'purple' }: ParticleBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Determine color palette
    const particleColors = typeof color === 'string'
        ? COLOR_PALETTES[color]
        : color;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = window.innerWidth;
        let height = window.innerHeight;
        let isMobile = window.innerWidth < 1024;

        // Detect Safari for performance optimizations
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

        // Reduce animation frequency on Safari/mobile for better scroll performance
        let frameCount = 0;
        const frameSkip = isSafari || isMobile ? 2 : 1; // Skip every other frame on Safari/mobile

        // Mouse state
        const mouse = { x: -1000, y: -1000 };

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            isMobile = window.innerWidth < 1024;
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isMobile) {
                const rect = canvas.getBoundingClientRect();
                mouse.x = e.clientX - rect.left;
                mouse.y = e.clientY - rect.top;
            }
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        handleResize();

        // Particle settings - use larger spacing on mobile/Safari for fewer particles
        const spacing = isMobile || isSafari ? 50 : 40;
        const particles: { x: number; y: number; originX: number; originY: number }[] = [];

        const initParticles = () => {
            particles.length = 0;
            const cols = Math.ceil(width / spacing);
            const rows = Math.ceil(height / spacing);

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    particles.push({
                        x: i * spacing,
                        y: j * spacing,
                        originX: i * spacing,
                        originY: j * spacing
                    });
                }
            }
        };

        initParticles();

        const onResize = () => {
            handleResize();
            initParticles();
        };
        window.addEventListener('resize', onResize);

        let time = 0;

        const animate = () => {
            frameCount++;

            // Skip frames on Safari/mobile for better performance
            if (frameCount % frameSkip !== 0) {
                animationFrameId = requestAnimationFrame(animate);
                return;
            }

            ctx.clearRect(0, 0, width, height);
            time += 0.005 * frameSkip; // Compensate for skipped frames

            let targetX = mouse.x;
            let targetY = mouse.y;

            if (isMobile) {
                targetX = width / 2 + Math.sin(time * 0.5) * (width * 0.15);
                targetY = height * 0.85 + Math.cos(time * 0.3) * (height * 0.1);
            }

            particles.forEach((p) => {
                const dx = targetX - p.originX;
                const dy = targetY - p.originY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                const waveRadius = 600;

                let scale = 1;
                let alpha = 0.08;

                if (dist < waveRadius) {
                    const relDist = 1 - (dist / waveRadius);
                    const angle = dist * 0.02 - time * 4;
                    const wave = Math.sin(angle);

                    scale = 1 + (wave * 0.8 * relDist) + (relDist * 0.8);
                    alpha = 0.15 + (Math.max(0, wave) * 0.6 * relDist) + (relDist * 0.4);
                }

                // Pick color based on position for gradient effect
                const colorIndex = Math.floor((p.originY / height) * 3.99);
                const particleColor = particleColors[colorIndex];

                ctx.beginPath();
                ctx.arc(p.originX, p.originY, 1.8 * scale, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${particleColor.r}, ${particleColor.g}, ${particleColor.b}, ${alpha})`;
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('resize', onResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [particleColors]);

    return (
        <>
            {/* Base background */}
            <div
                className="absolute inset-0"
                style={{
                    background: '#f2f4f7'
                }}
            />
            {/* Particle canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none opacity-60"
            />
        </>
    );
}
