import { useEffect, useRef } from 'react';

export function HeroParticleGrid() {
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
      // On desktop, we track mouse. On mobile, we ignore mouse/touch for this effect
      if (!isMobile) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Initial resize
    handleResize();

    // Particle settings
    const spacing = 35;
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

    // Re-init on resize listener wrap
    const onResize = () => {
      handleResize();
      initParticles();
    };
    window.addEventListener('resize', onResize);

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.005;

      // Determine interaction point
      let targetX = mouse.x;
      let targetY = mouse.y;

      if (isMobile) {
        // On mobile, auto-animate the "focus" point
        // Move slowly in a figure-8 pattern near the bottom
        targetX = width / 2 + Math.sin(time * 0.5) * (width * 0.15);
        targetY = height * 0.85 + Math.cos(time * 0.3) * (height * 0.1);
      }

      particles.forEach((p) => {
        const dx = targetX - p.originX;
        const dy = targetY - p.originY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Wave parameters
        const waveRadius = 600;

        let scale = 1;
        let alpha = 0.05; // Base visibility

        if (dist < waveRadius) {
          // Normalize distance
          const relDist = 1 - (dist / waveRadius);

          // "Wave" effect - particles scale/brighten based on sine wave of distance
          const angle = dist * 0.02 - time * 4;
          const wave = Math.sin(angle);

          // Apply wave to scale and alpha
          // We want peaks to be brighter
          scale = 1 + (wave * 0.8 * relDist) + (relDist * 0.8);
          alpha = 0.2 + (Math.max(0, wave) * 0.8 * relDist) + (relDist * 0.5);

        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.originX, p.originY, 1.5 * scale, 0, Math.PI * 2);

        // Color: Violet/Purple theme - Darker for Light Mode
        ctx.fillStyle = `rgba(124, 58, 237, ${alpha})`; // violet-600
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
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-30"
    />
  );
}
