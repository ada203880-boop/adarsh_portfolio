import { useRef, useEffect, useState } from 'react';
import { RotateCw, Compass, Sparkles } from 'lucide-react';
import { sound } from '../lib/sound';

interface HolographicGlobeProps {
  className?: string;
}

const BHUBANESWAR = { lat: 20.2961, lng: 85.8245, label: 'BHUBANESWAR, IN 📍' };

// Simplified high-density polygon landmasses for the globe
const CONTINENT_POLYGONS: Array<{ name: string; color: string; points: Array<[number, number]> }> = [
  // India & South Asia (Highlighted)
  {
    name: 'India',
    color: '#00e5ff',
    points: [
      [8.1, 77.5], [10.5, 79.8], [13.1, 80.3], [16.5, 82.2], [19.8, 85.8], [21.5, 87.5],
      [22.8, 89.1], [25.5, 91.8], [27.3, 88.5], [28.6, 84.1], [30.9, 79.0], [34.5, 76.5],
      [35.5, 74.5], [32.0, 74.0], [28.5, 70.0], [24.0, 68.5], [21.0, 72.0], [18.9, 72.8],
      [15.4, 73.8], [11.5, 75.8], [8.1, 77.5],
    ],
  },
  // East Asia & China
  {
    name: 'East Asia',
    color: '#38bdf8',
    points: [
      [22.0, 108.0], [28.0, 120.0], [35.0, 119.5], [38.5, 122.0], [40.0, 128.0],
      [42.5, 131.0], [48.0, 135.0], [53.0, 120.0], [50.0, 100.0], [45.0, 90.0],
      [42.0, 80.0], [35.0, 80.0], [28.0, 95.0], [22.0, 100.0], [22.0, 108.0],
    ],
  },
  // Japan
  {
    name: 'Japan',
    color: '#38bdf8',
    points: [
      [31.0, 130.5], [34.0, 134.0], [36.0, 138.0], [40.0, 141.0], [43.5, 144.0],
      [44.0, 142.0], [39.0, 139.0], [35.0, 135.0], [32.0, 130.0], [31.0, 130.5],
    ],
  },
  // Europe
  {
    name: 'Europe',
    color: '#818cf8',
    points: [
      [36.5, -5.5], [43.5, -9.0], [47.5, -2.5], [53.5, 5.0], [55.0, 12.0], [59.0, 10.0],
      [68.0, 15.0], [70.0, 28.0], [60.0, 30.0], [55.0, 37.0], [45.0, 35.0], [41.0, 28.0],
      [36.0, 22.0], [37.5, 15.0], [40.0, 0.0], [36.5, -5.5],
    ],
  },
  // Africa
  {
    name: 'Africa',
    color: '#a78bfa',
    points: [
      [35.0, -6.0], [37.0, 10.0], [32.0, 25.0], [31.0, 32.0], [25.0, 35.0], [12.0, 44.0],
      [0.0, 42.0], [-10.0, 40.0], [-25.0, 33.0], [-34.5, 20.0], [-34.0, 18.0], [-22.0, 14.0],
      [-5.0, 12.0], [4.5, 9.0], [6.0, 2.0], [4.5, -7.0], [14.5, -17.0], [21.0, -17.0],
      [30.0, -10.0], [35.0, -6.0],
    ],
  },
  // North America
  {
    name: 'North America',
    color: '#34d399',
    points: [
      [25.0, -80.0], [30.0, -82.0], [35.0, -75.0], [42.0, -70.0], [45.0, -65.0],
      [55.0, -58.0], [60.0, -65.0], [68.0, -95.0], [70.0, -130.0], [65.0, -165.0],
      [58.0, -155.0], [50.0, -125.0], [38.0, -123.0], [30.0, -115.0], [20.0, -105.0],
      [15.0, -92.0], [18.0, -88.0], [25.0, -80.0],
    ],
  },
  // South America
  {
    name: 'South America',
    color: '#10b981',
    points: [
      [12.0, -72.0], [8.0, -60.0], [0.0, -50.0], [-5.0, -35.0], [-15.0, -38.0],
      [-23.0, -43.0], [-35.0, -55.0], [-45.0, -65.0], [-55.0, -68.0], [-50.0, -75.0],
      [-40.0, -73.0], [-20.0, -70.0], [-5.0, -80.0], [5.0, -77.0], [12.0, -72.0],
    ],
  },
  // Australia
  {
    name: 'Australia',
    color: '#fbbf24',
    points: [
      [-12.0, 131.0], [-15.0, 136.0], [-12.0, 142.0], [-22.0, 150.0], [-28.0, 153.0],
      [-37.0, 150.0], [-38.0, 144.0], [-35.0, 136.0], [-32.0, 128.0], [-34.0, 115.0],
      [-25.0, 113.0], [-20.0, 118.0], [-15.0, 125.0], [-12.0, 131.0],
    ],
  },
  // Southeast Asia & Indonesia
  {
    name: 'Southeast Asia',
    color: '#06b6d4',
    points: [
      [6.0, 100.0], [10.0, 105.0], [15.0, 101.0], [20.0, 106.0], [16.0, 108.0],
      [10.0, 108.0], [1.5, 104.0], [-6.0, 106.0], [-8.0, 115.0], [-7.5, 111.0],
      [-3.0, 102.0], [4.0, 97.0], [6.0, 100.0],
    ],
  },
  // Middle East
  {
    name: 'Middle East',
    color: '#f59e0b',
    points: [
      [30.0, 32.0], [33.0, 36.0], [37.0, 38.0], [36.0, 48.0], [30.0, 50.0],
      [25.0, 56.0], [22.0, 59.0], [15.0, 53.0], [12.5, 44.0], [20.0, 40.0],
      [28.0, 35.0], [30.0, 32.0],
    ],
  },
];

// Major tech capitals / clusters as 3D coordinate pins
const GLOBAL_NODES = [
  { lat: 37.7749, lng: -122.4194, label: 'SF / Silicon Valley', color: '#a855f7' },
  { lat: 51.5074, lng: -0.1278, label: 'London, UK', color: '#38bdf8' },
  { lat: 1.3521, lng: 103.8198, label: 'Singapore', color: '#34d399' },
  { lat: 35.6762, lng: 139.6503, label: 'Tokyo, JP', color: '#f43f5e' },
];

function project3D(lat: number, lng: number, rotX: number, rotY: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  // Spherical to Cartesian
  const x0 = -radius * Math.sin(phi) * Math.cos(theta);
  const y0 = radius * Math.cos(phi);
  const z0 = radius * Math.sin(phi) * Math.sin(theta);

  // Rotate about Y axis (longitude roll)
  const cosY = Math.cos(rotY);
  const sinY = Math.sin(rotY);
  const x1 = x0 * cosY + z0 * sinY;
  const z1 = -x0 * sinY + z0 * cosY;

  // Rotate about X axis (latitude tilt)
  const cosX = Math.cos(rotX);
  const sinX = Math.sin(rotX);
  const y2 = y0 * cosX - z1 * sinX;
  const z2 = y0 * sinX + z1 * cosX;

  return { x: x1, y: y2, z: z2 };
}

export function HolographicGlobe({ className = '' }: HolographicGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 3D Rotation angles and physics velocity for true drag & roll momentum
  const rotX = useRef(0.35); // Initial pitch tilt
  const rotY = useRef(-1.4); // Initial yaw pointing towards India
  const velX = useRef(0);
  const velY = useRef(0.0025); // Subtle auto-orbit
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);
  const tick = useRef(0);

  const [autoRotate, setAutoRotate] = useState(true);
  const [hudCoords, setHudCoords] = useState('20.29° N, 85.82° E');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High-DPI 4K rendering configuration
    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 2, 3);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    const render = () => {
      const dpr = Math.min(window.devicePixelRatio || 2, 3);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.42;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      // Inertia & Physics damping
      if (!isDragging.current) {
        if (autoRotate) {
          rotY.current += 0.003;
        } else {
          rotY.current += velY.current;
          rotX.current += velX.current;
          velY.current *= 0.94;
          velX.current *= 0.94;
        }
      }

      // Constrain latitude tilt (-65° to +65°)
      rotX.current = Math.max(-1.15, Math.min(1.15, rotX.current));

      tick.current++;

      // ─── Layer 1: Atmospheric Outer Glow ───────────────────────────────
      const atmoGrad = ctx.createRadialGradient(cx, cy, R * 0.85, cx, cy, R * 1.35);
      atmoGrad.addColorStop(0, 'rgba(6,182,212,0.12)');
      atmoGrad.addColorStop(0.4, 'rgba(99,102,241,0.06)');
      atmoGrad.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.35, 0, Math.PI * 2);
      ctx.fillStyle = atmoGrad;
      ctx.fill();

      // ─── Layer 2: Deep Volumetric Sphere Base ──────────────────────────
      const globeGrad = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.35, R * 0.1, cx, cy, R);
      globeGrad.addColorStop(0, '#0f172a'); // Lit apex
      globeGrad.addColorStop(0.65, '#050914');
      globeGrad.addColorStop(1, '#020409'); // Shaded rim

      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = globeGrad;
      ctx.fill();

      // Rim light edge
      ctx.strokeStyle = 'rgba(34,211,238,0.35)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // ─── Layer 3: Coordinate Parallels & Meridians Grid ────────────────
      const STEPS = 48;
      ctx.lineWidth = 0.5;

      // Latitudes
      for (let lat = -60; lat <= 60; lat += 20) {
        ctx.beginPath();
        let started = false;
        for (let lng = -180; lng <= 180; lng += 360 / STEPS) {
          const pt = project3D(lat, lng, rotX.current, rotY.current, R);
          if (pt.z > 0) {
            const alpha = (pt.z / R) * 0.22;
            ctx.strokeStyle = `rgba(148,163,184,${alpha})`;
            if (!started) {
              ctx.moveTo(cx + pt.x, cy - pt.y);
              started = true;
            } else {
              ctx.lineTo(cx + pt.x, cy - pt.y);
            }
          } else {
            started = false;
          }
        }
        ctx.stroke();
      }

      // Longitudes
      for (let lng = 0; lng < 360; lng += 30) {
        ctx.beginPath();
        let started = false;
        for (let lat = -90; lat <= 90; lat += 180 / STEPS) {
          const pt = project3D(lat, lng, rotX.current, rotY.current, R);
          if (pt.z > 0) {
            const alpha = (pt.z / R) * 0.2;
            ctx.strokeStyle = `rgba(139,92,246,${alpha})`;
            if (!started) {
              ctx.moveTo(cx + pt.x, cy - pt.y);
              started = true;
            } else {
              ctx.lineTo(cx + pt.x, cy - pt.y);
            }
          } else {
            started = false;
          }
        }
        ctx.stroke();
      }

      // Equator Gold Highlight
      ctx.beginPath();
      let eqStarted = false;
      for (let lng = -180; lng <= 180; lng += 360 / STEPS) {
        const pt = project3D(0, lng, rotX.current, rotY.current, R);
        if (pt.z > 0) {
          const alpha = (pt.z / R) * 0.45;
          ctx.strokeStyle = `rgba(34,211,238,${alpha})`;
          ctx.lineWidth = 1;
          if (!eqStarted) {
            ctx.moveTo(cx + pt.x, cy - pt.y);
            eqStarted = true;
          } else {
            ctx.lineTo(cx + pt.x, cy - pt.y);
          }
        } else {
          eqStarted = false;
        }
      }
      ctx.stroke();

      // ─── Layer 4: Real Continents Landmass Polygons ────────────────────
      CONTINENT_POLYGONS.forEach((poly) => {
        ctx.beginPath();
        let polyVisible = false;
        poly.points.forEach(([lat, lng], idx) => {
          const pt = project3D(lat, lng, rotX.current, rotY.current, R);
          if (pt.z > 0) {
            polyVisible = true;
            if (idx === 0) ctx.moveTo(cx + pt.x, cy - pt.y);
            else ctx.lineTo(cx + pt.x, cy - pt.y);
          }
        });

        if (polyVisible) {
          ctx.closePath();
          ctx.fillStyle = `${poly.color}20`; // Glassmorphism translucent land fill
          ctx.fill();
          ctx.strokeStyle = poly.name === 'India' ? '#00e5ff' : `${poly.color}80`;
          ctx.lineWidth = poly.name === 'India' ? 2 : 1;
          ctx.stroke();
        }
      });

      // ─── Layer 5: Global Data Connectivity Nodes ──────────────────────
      GLOBAL_NODES.forEach((node) => {
        const pt = project3D(node.lat, node.lng, rotX.current, rotY.current, R);
        if (pt.z > 0) {
          const alpha = pt.z / R;
          ctx.save();
          ctx.globalAlpha = Math.max(0.2, alpha);
          ctx.beginPath();
          ctx.arc(cx + pt.x, cy - pt.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = node.color;
          ctx.shadowColor = node.color;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.restore();
        }
      });

      // ─── Layer 6: Bhubaneswar, India Primary 3D Location Marker ────────
      const bhu = project3D(BHUBANESWAR.lat, BHUBANESWAR.lng, rotX.current, rotY.current, R);
      if (bhu.z > 0) {
        const bx = cx + bhu.x;
        const by = cy - bhu.y;
        const pulse = (Math.sin(tick.current * 0.08) + 1) / 2;

        // Sonic radar pulses
        for (let i = 0; i < 3; i++) {
          const ringRadius = 5 + i * 8 + pulse * 7;
          const ringAlpha = (1 - i * 0.3) * (1 - pulse * 0.5) * 0.8;
          ctx.beginPath();
          ctx.arc(bx, by, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0,229,255,${ringAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        // Elevated 3D pin pole
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(bx + 12, by - 16);
        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Glowing core
        ctx.beginPath();
        ctx.arc(bx, by, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = '#00e5ff';
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = 12;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(bx, by, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.shadowBlur = 0;

        // Elevated Label Card
        ctx.font = 'bold 10px "DM Mono", monospace';
        const labelText = 'BHUBANESWAR [BASE]';
        const labelWidth = ctx.measureText(labelText).width;

        // Badge pill
        ctx.fillStyle = 'rgba(6,13,26,0.92)';
        ctx.strokeStyle = 'rgba(0,229,255,0.7)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(bx + 16, by - 26, labelWidth + 12, 18, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#00e5ff';
        ctx.fillText(labelText, bx + 22, by - 13);
      }

      // ─── Layer 7: Specular 3D Gloss Sheen ──────────────────────────────
      const sheenGrad = ctx.createRadialGradient(cx - R * 0.45, cy - R * 0.45, 0, cx - R * 0.45, cy - R * 0.45, R * 0.8);
      sheenGrad.addColorStop(0, 'rgba(255,255,255,0.25)');
      sheenGrad.addColorStop(0.4, 'rgba(255,255,255,0.05)');
      sheenGrad.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = sheenGrad;
      ctx.fill();

      ctx.restore();

      frameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', updateSize);
    };
  }, [autoRotate]);

  // Touch and Drag handlers for 2-axis free rotation
  const handleStart = (clientX: number, clientY: number) => {
    isDragging.current = true;
    lastPos.current = { x: clientX, y: clientY };
    velX.current = 0;
    velY.current = 0;
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging.current) return;
    const dx = clientX - lastPos.current.x;
    const dy = clientY - lastPos.current.y;

    rotY.current += dx * 0.007;
    rotX.current -= dy * 0.007;

    velY.current = dx * 0.007;
    velX.current = -dy * 0.007;

    lastPos.current = { x: clientX, y: clientY };

    // Update real-time HUD coordinates
    const calcLat = ((-rotX.current * 180) / Math.PI).toFixed(1);
    const calcLng = (((rotY.current * 180) / Math.PI) % 360).toFixed(1);
    setHudCoords(`${Math.abs(Number(calcLat))}° ${Number(calcLat) >= 0 ? 'N' : 'S'}, ${Math.abs(Number(calcLng))}° ${Number(calcLng) >= 0 ? 'E' : 'W'}`);
  };

  const handleEnd = () => {
    isDragging.current = false;
  };

  const resetToBhubaneswar = () => {
    sound.playClick();
    rotX.current = 0.35;
    rotY.current = -1.4;
    velX.current = 0;
    velY.current = 0;
    setHudCoords('20.29° N, 85.82° E');
  };

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* 3D Canvas with 4K touch and mouse drag capabilities */}
      <div className="relative w-full h-[280px] sm:h-[300px] flex items-center justify-center">
        <canvas
          ref={canvasRef}
          onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
          onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchEnd={handleEnd}
          className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
          title="Drag and roll in 3D to explore the globe"
        />

        {/* Ambient Orbiting Outer Ring */}
        <div
          className="pointer-events-none absolute inset-4 rounded-full border border-cyan-400/20 animate-spin"
          style={{ animationDuration: '32s' }}
        />
        <div
          className="pointer-events-none absolute inset-8 rounded-full border border-violet-500/20 animate-spin"
          style={{ animationDuration: '24s', animationDirection: 'reverse' }}
        />
      </div>

      {/* Interactive Controls & Telemetry HUD */}
      <div className="w-full mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.08] pt-2.5 font-mono text-[10px]">
        <div className="flex items-center gap-1.5 text-zinc-400">
          <Compass size={11} className="text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
          <span>RADAR:</span>
          <span className="text-cyan-300 font-semibold">{hudCoords}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setAutoRotate((p) => !p);
            }}
            className={`px-2 py-0.5 rounded text-[9px] border transition-all ${
              autoRotate
                ? 'border-cyan-400/50 bg-cyan-950/60 text-cyan-300'
                : 'border-white/10 text-zinc-500 hover:text-white'
            }`}
          >
            {autoRotate ? 'Orbit: ON' : 'Orbit: OFF'}
          </button>

          <button
            type="button"
            onClick={resetToBhubaneswar}
            className="flex items-center gap-1 px-2 py-0.5 rounded border border-white/10 bg-white/[0.03] text-zinc-400 hover:border-cyan-400/40 hover:text-white transition-all text-[9px]"
            title="Focus camera on Bhubaneswar, Odisha"
          >
            <RotateCw size={9} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="mt-1 text-center font-mono text-[9px] tracking-widest text-zinc-500 uppercase">
        <Sparkles size={9} className="inline mr-1 text-cyan-400" />
        Touch & Drag 3D globe to roll in 360°
      </div>
    </div>
  );
}
