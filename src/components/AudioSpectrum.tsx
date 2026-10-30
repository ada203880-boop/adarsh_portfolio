import { useEffect, useRef } from 'react';
import { sound } from '../lib/sound';

interface AudioSpectrumProps {
  bands?: number;
  barWidth?: number;
  height?: number;
  className?: string;
}

export function AudioSpectrum({ bands = 5, barWidth = 2, height = 14, className = '' }: AudioSpectrumProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = bands * barWidth + (bands - 1) * 2;
    canvas.width = width;
    canvas.height = height;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const data = sound.getAnalyserData();
      const hasSound = sound.enabled;

      for (let i = 0; i < bands; i++) {
        // Sample frequency buckets
        const bucketIndex = Math.min(i * 3, data.length - 1);
        const rawVal = data[bucketIndex] || 0;
        // Normalize 0..1
        let norm = rawVal / 255;

        // If enabled but quiet, provide gentle ambient jitter
        if (hasSound && norm < 0.15) {
          norm = 0.15 + Math.sin(Date.now() * 0.005 + i * 1.2) * 0.1;
        }

        const barH = Math.max(2, norm * height);
        const x = i * (barWidth + 2);
        const y = height - barH;

        ctx.fillStyle = '#22d3ee';
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 4;
        ctx.fillRect(x, y, barWidth, barH);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [bands, barWidth, height]);

  return (
    <canvas
      ref={canvasRef}
      className={`inline-block ${className}`}
      aria-label="Real-time Audio Spectrum HUD"
    />
  );
}

