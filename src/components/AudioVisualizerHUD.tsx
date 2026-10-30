import { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  active: boolean;     // true when audio/speech is playing
  scrollVelocity?: number;
}

export function AudioVisualizerHUD({ active, scrollVelocity = 0 }: AudioVisualizerProps) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const animRef    = useRef<number>(0);
  const barsRef    = useRef<number[]>([]);
  const velRef     = useRef(0);

  useEffect(() => {
    if (typeof scrollVelocity === 'number') {
      velRef.current = scrollVelocity;
    }
  }, [scrollVelocity]);

  // Listen directly to decoupled scroll velocity updates without triggering React tree re-renders
  useEffect(() => {
    const handleVel = (e: Event) => {
      const custom = e as CustomEvent<number>;
      if (typeof custom.detail === 'number') {
        velRef.current = custom.detail;
      }
    };
    window.addEventListener('scroll-velocity', handleVel, { passive: true });
    return () => window.removeEventListener('scroll-velocity', handleVel);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const BAR_COUNT = 40;
    if (barsRef.current.length === 0) {
      barsRef.current = Array.from({ length: BAR_COUNT }, () => Math.random() * 0.3 + 0.05);
    }

    let W = 0, H = 0;
    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W;
      canvas.height = H;
    };
    resize();

    let t = 0;

    const render = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.04;

      const vel = Math.abs(velRef.current);
      const basePeak = active ? 0.9 : (vel > 0.3 ? 0.5 : 0.2);

      barsRef.current = barsRef.current.map((v, i) => {
        const wave = Math.sin(t * 2.8 + i * 0.55) * 0.4 + 0.5;
        const target = active
          ? wave * basePeak + Math.random() * 0.3
          : Math.sin(t + i * 0.4) * 0.12 * (1 + vel * 0.8) + 0.08;
        return v + (target - v) * 0.15;
      });

      const barW  = W / BAR_COUNT;
      const midY  = H / 2;

      barsRef.current.forEach((amp, i) => {
        const barH  = amp * midY;
        const x     = i * barW + barW * 0.15;
        const bw    = barW * 0.7;

        // Gradient bar
        const hue     = active ? 185 + i * 2 : 260 + i * 2;
        const alpha   = 0.5 + amp * 0.6;
        const grad    = ctx.createLinearGradient(0, midY - barH, 0, midY + barH);
        grad.addColorStop(0, `hsla(${hue}, 90%, 65%, ${alpha})`);
        grad.addColorStop(0.5, `hsla(${hue + 40}, 100%, 75%, ${alpha * 1.2})`);
        grad.addColorStop(1, `hsla(${hue}, 90%, 65%, ${alpha})`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, midY - barH, bw, barH * 2, 2);
        ctx.fill();

        // Glow
        ctx.shadowColor = `hsla(${hue + 20}, 100%, 70%, 0.8)`;
        ctx.shadowBlur  = amp * 12;
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Center line
      ctx.strokeStyle = active ? 'rgba(6,182,212,0.4)' : 'rgba(139,92,246,0.2)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, midY); ctx.lineTo(W, midY);
      ctx.stroke();

      animRef.current = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animRef.current);
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      aria-hidden="true"
    />
  );
}

