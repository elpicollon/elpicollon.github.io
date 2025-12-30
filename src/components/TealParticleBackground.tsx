import { useEffect, useRef } from 'react';

export function TealParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = window.innerWidth;
        let height = window.innerHeight;
        let isMobile = window.innerWidth < 1024;

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
        window.addEventListener('mousemove', handleMouseMove);

        handleResize();

        // Particle settings
        const spacing = 40;
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

        // Teal color palette: teal-300 (#5eead4) to teal-500 (#14b8a6)
        const tealColors = [
            { r: 94, g: 234, b: 212 },  // teal-300
            { r: 45, g: 212, b: 191 },  // teal-400
            { r: 20, g: 184, b: 166 },  // teal-500
            { r: 13, g: 148, b: 136 },  // teal-600 (for depth)
        ];

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            time += 0.005;

            let targetX = mouse.x;
            let targetY = mouse.y;

            if (isMobile) {
                targetX = width / 2 + Math.sin(time * 0.5) * (width * 0.15);
                targetY = height / 2 + Math.cos(time * 0.3) * (height * 0.15);
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
                const color = tealColors[colorIndex];

                ctx.beginPath();
                ctx.arc(p.originX, p.originY, 1.8 * scale, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
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
    }, []);

    return (
        <>
            {/* Base background - same as original page */}
            <div
                className="absolute inset-0"
                style={{
                    background: '#f2f4f7'
                }}
            />
            {/* Particle canvas with teal gradient bubbles */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none opacity-60"
            />
        </>
    );
}
