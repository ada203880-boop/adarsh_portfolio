import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
}

export function CinematicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let rafId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let isMobile = width < 768;

    // Mouse coordinates tracking
    let mouseX = -9999;
    let mouseY = -9999;
    let isMouseOver = false;

    // 65 floating micro-particles in soft teal/cyan tints with ~0.18 opacity and 1px - 3px sizes
    const PARTICLE_COUNT = 65;
    const particles: Particle[] = [];

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.55,
          vy: (Math.random() - 0.5) * 0.55,
          size: 1 + Math.random() * 2, // 1px to 3px
          baseAlpha: 0.14 + Math.random() * 0.08, // around 0.18
        });
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      isMobile = width < 768;

      canvas.width = width;
      canvas.height = height;

      // Keep particles bounded within new dimensions
      for (const p of particles) {
        if (p.x > width) p.x = Math.random() * width;
        if (p.y > height) p.y = Math.random() * height;
      }
    };

    canvas.width = width;
    canvas.height = height;
    initParticles();

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseOver = true;
    };

    const handleMouseLeave = () => {
      isMouseOver = false;
      mouseX = -9999;
      mouseY = -9999;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    const render = () => {
      // Deep canvas background color matching #0b0c10
      ctx.fillStyle = '#0b0c10';
      ctx.fillRect(0, 0, width, height);

      // Desktop proximity magnetic radius & network parameters
      const magneticRadius = 130;
      const networkBoundary = 90;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Position update
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries smoothly
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        // Desktop mousemove proximity magnetic logic loop
        if (!isMobile && isMouseOver) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < magneticRadius && dist > 1) {
            const force = (1 - dist / magneticRadius) * 0.04;
            p.x += dx * force;
            p.y += dy * force;
          }
        }

        // Draw individual micro-particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        // Soft teal/cyan tint (rgb 45, 212, 191 / rgb 6, 182, 212)
        ctx.fillStyle = `rgba(34, 211, 238, ${p.baseAlpha})`;
        ctx.fill();

        // MOBILE RENDER RULE:
        // On screens under 768px, disable line tracing calculations entirely to save CPU/battery
        if (!isMobile) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Draw fine network lines between separate nodes passing within 90px boundary radius
            if (dist < networkBoundary) {
              const lineAlpha = (1 - dist / networkBoundary) * 0.16;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(6, 182, 212, ${lineAlpha})`;
              ctx.lineWidth = 0.75;
              ctx.stroke();
            }
          }
        }
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      id="portfolioCanvasBG"
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 w-full h-full"
      style={{
        zIndex: -1,
        backgroundColor: '#0b0c10',
      }}
      aria-hidden="true"
    />
  );
}
