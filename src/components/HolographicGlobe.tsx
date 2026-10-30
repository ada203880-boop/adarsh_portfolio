import { useRef, useEffect } from 'react';

interface HolographicGlobeProps {
  className?: string;
}

const BHUBANESWAR = { lat: 20.2961, lng: 85.8245 };

function toCartesian(lat: number, lng: number, rotX: number, rotY: number, r: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  let x = -r * Math.sin(phi) * Math.cos(theta);
  let y = r * Math.cos(phi);
  let z = r * Math.sin(phi) * Math.sin(theta);

  // Rotate Y
  const cosY = Math.cos(rotY);
  const sinY = Math.sin(rotY);
  const x2 = x * cosY + z * sinY;
  const z2 = -x * sinY + z * cosY;

  // Rotate X
  const cosX = Math.cos(rotX);
  const sinX = Math.sin(rotX);
  const y2 = y * cosX - z2 * sinX;
  const z3 = y * sinX + z2 * cosX;

  return { x: x2, y: y2, z: z3 };
}

export function HolographicGlobe({ className = '' }: HolographicGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotX = useRef(0.3);
  const rotY = useRef(0);
  const targetRotY = useRef(0);
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const frame = useRef(0);
  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      const size = Math.min(canvas.parentElement?.clientWidth ?? 360, 360);
      canvas.width = size;
      canvas.height = size;
    };
    resize();
    window.addEventListener('resize', resize);

    let raf: number;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const R = w * 0.38;

      ctx.clearRect(0, 0, w, h);

      // Auto-rotate (slow)
      if (!isDragging.current && !prefersReduced.current) {
        rotY.current += 0.003;
      }

      // Smooth drag
      rotY.current += (targetRotY.current - rotY.current) * 0.1;

      // Starfield
      ctx.save();
      const starCount = 60;
      for (let i = 0; i < starCount; i++) {
        const sx = ((i * 137.5 * w) % w);
        const sy = ((i * 97.3 * h) % h);
        const sz = (Math.sin(i + frame.current * 0.01) + 1) / 2;
        ctx.beginPath();
        ctx.arc(sx, sy, sz * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148,163,184,${sz * 0.3})`;
        ctx.fill();
      }
      ctx.restore();

      // Globe atmosphere glow
      const grad = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R * 1.3);
      grad.addColorStop(0, 'rgba(6,182,212,0.06)');
      grad.addColorStop(0.6, 'rgba(139,92,246,0.04)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Grid lines (lat/lng every 30°)
      const STEPS = 60;
      ctx.lineWidth = 0.5;

      // Latitude lines
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let first = true;
        for (let lng = -180; lng <= 180; lng += 360 / STEPS) {
          const p = toCartesian(lat, lng, rotX.current, rotY.current, R);
          const visible = p.z > 0;
          ctx.strokeStyle = visible ? 'rgba(6,182,212,0.25)' : 'rgba(6,182,212,0.04)';
          if (first) { ctx.moveTo(cx + p.x, cy - p.y); first = false; }
          else ctx.lineTo(cx + p.x, cy - p.y);
        }
        ctx.stroke();
      }

      // Longitude lines
      for (let lng = 0; lng < 360; lng += 30) {
        ctx.beginPath();
        let first = true;
        for (let lat = -90; lat <= 90; lat += 180 / STEPS) {
          const p = toCartesian(lat, lng, rotX.current, rotY.current, R);
          const visible = p.z > 0;
          ctx.strokeStyle = visible ? 'rgba(139,92,246,0.2)' : 'rgba(139,92,246,0.03)';
          if (first) { ctx.moveTo(cx + p.x, cy - p.y); first = false; }
          else ctx.lineTo(cx + p.x, cy - p.y);
        }
        ctx.stroke();
      }

      // Equator highlight
      ctx.beginPath();
      ctx.lineWidth = 1;
      let first = true;
      for (let lng = -180; lng <= 180; lng += 360 / STEPS) {
        const p = toCartesian(0, lng, rotX.current, rotY.current, R);
        const visible = p.z > 0;
        ctx.strokeStyle = visible ? 'rgba(6,182,212,0.5)' : 'rgba(6,182,212,0.06)';
        if (first) { ctx.moveTo(cx + p.x, cy - p.y); first = false; }
        else ctx.lineTo(cx + p.x, cy - p.y);
      }
      ctx.stroke();

      // Bhubaneswar location dot
      const loc = toCartesian(BHUBANESWAR.lat, BHUBANESWAR.lng, rotX.current, rotY.current, R);
      const dotVisible = loc.z > 0;

      if (dotVisible) {
        const lx = cx + loc.x;
        const ly = cy - loc.y;
        const pulseFactor = (Math.sin(frame.current * 0.05) + 1) / 2;

        // Ping rings
        for (let ring = 0; ring < 3; ring++) {
          const ringSize = 4 + ring * 8 + pulseFactor * 6;
          const ringOpacity = (1 - ring * 0.3) * (1 - pulseFactor * 0.5) * 0.6;
          ctx.beginPath();
          ctx.arc(lx, ly, ringSize, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(52,211,153,${ringOpacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(lx, ly, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#34d399';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(lx, ly, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();

        // Label
        ctx.font = '9px "DM Mono", monospace';
        ctx.fillStyle = 'rgba(52,211,153,0.9)';
        ctx.fillText('BHU, IN', lx + 8, ly - 4);
      }

      frame.current++;
      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Drag handlers
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastMouse.current.x;
    targetRotY.current += dx * 0.008;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };
  const onMouseUp = () => { isDragging.current = false; };

  // Touch
  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    lastMouse.current = { x: e.touches[0].clientX, y: 0 };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const dx = e.touches[0].clientX - lastMouse.current.x;
    targetRotY.current += dx * 0.008;
    lastMouse.current = { x: e.touches[0].clientX, y: 0 };
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Outer ring decoration */}
      <div className="absolute inset-0 rounded-full border border-cyan-500/10 animate-spin" style={{ animationDuration: '20s' }} />
      <div className="absolute inset-2 rounded-full border border-violet-500/10 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />

      <canvas
        ref={canvasRef}
        className="rounded-full cursor-grab active:cursor-grabbing"
        aria-label="Interactive 3D globe showing Bhubaneswar, India"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={() => { isDragging.current = false; }}
      />

      {/* HUD labels */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.25em] text-cyan-400/60 uppercase select-none">
        DRAG TO ROTATE
      </div>
    </div>
  );
}

