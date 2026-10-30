import { useState, useEffect, useRef } from 'react';
import { Globe, Package, Rocket } from 'lucide-react';
import { sound } from '../lib/sound';

interface Pin {
  id: string;
  x: number;
  y: number;
  label: string;
  description: string;
  color: string;
  glowColor: string;
  size: 'lg' | 'md' | 'sm';
  pulse?: boolean;
}

const PINS: Pin[] = [
  {
    id: 'bhubaneswar',
    x: 715,
    y: 238,
    label: 'Bhubaneswar, India',
    description: "Adarsh's base — Full-Stack Dev hub",
    color: '#00e5ff',
    glowColor: 'rgba(0,229,255,0.6)',
    size: 'lg',
    pulse: true,
  },
  {
    id: 'india-north',
    x: 700,
    y: 210,
    label: 'North India',
    description: 'WooCommerce store customers',
    color: '#00e5ff',
    glowColor: 'rgba(0,229,255,0.3)',
    size: 'sm',
  },
  {
    id: 'india-south',
    x: 710,
    y: 260,
    label: 'South India',
    description: 'WooCommerce store customers',
    color: '#00e5ff',
    glowColor: 'rgba(0,229,255,0.3)',
    size: 'sm',
  },
  {
    id: 'usa',
    x: 185,
    y: 188,
    label: 'United States',
    description: 'GitHub portfolio visitors & OSS users',
    color: '#a855f7',
    glowColor: 'rgba(168,85,247,0.5)',
    size: 'md',
    pulse: true,
  },
  {
    id: 'europe',
    x: 498,
    y: 148,
    label: 'Europe',
    description: 'GitHub portfolio visitors',
    color: '#a855f7',
    glowColor: 'rgba(168,85,247,0.4)',
    size: 'md',
  },
  {
    id: 'australia',
    x: 832,
    y: 330,
    label: 'Australia',
    description: 'Portfolio reach via GitHub',
    color: '#f59e0b',
    glowColor: 'rgba(245,158,11,0.4)',
    size: 'sm',
  },
];

const PIN_SIZES = { lg: 10, md: 7, sm: 5 };
const PULSE_SIZES = { lg: 22, md: 16, sm: 10 };

// Simplified continent paths for a 1000×500 viewBox
// These approximate real continent shapes
const CONTINENTS = [
  // North America
  {
    id: 'namerica',
    d: 'M 100 100 L 140 90 L 190 85 L 230 95 L 270 105 L 285 130 L 275 160 L 255 180 L 240 200 L 220 220 L 210 240 L 195 260 L 175 270 L 160 255 L 145 240 L 130 210 L 115 190 L 100 165 L 90 140 Z',
    fill: '#1a3a5c',
  },
  // South America
  {
    id: 'samerica',
    d: 'M 210 265 L 235 255 L 255 265 L 265 290 L 270 320 L 260 355 L 245 375 L 228 388 L 215 380 L 205 360 L 198 335 L 195 305 L 200 280 Z',
    fill: '#1a3a5c',
  },
  // Europe
  {
    id: 'europe',
    d: 'M 455 100 L 490 88 L 530 90 L 555 100 L 565 115 L 555 130 L 540 140 L 520 150 L 505 158 L 490 165 L 475 160 L 460 150 L 450 135 L 448 118 Z',
    fill: '#1a3a5c',
  },
  // Africa
  {
    id: 'africa',
    d: 'M 470 170 L 510 160 L 545 165 L 565 180 L 570 210 L 565 240 L 560 270 L 548 300 L 530 320 L 515 335 L 500 338 L 485 330 L 470 310 L 460 285 L 455 255 L 455 225 L 458 200 L 463 182 Z',
    fill: '#1a3a5c',
  },
  // Asia (main body)
  {
    id: 'asia',
    d: 'M 560 90 L 610 80 L 660 75 L 710 78 L 750 85 L 790 95 L 825 105 L 850 120 L 855 140 L 840 155 L 820 165 L 800 175 L 780 185 L 760 195 L 740 205 L 720 218 L 700 230 L 680 235 L 655 238 L 630 232 L 605 225 L 580 215 L 560 200 L 545 185 L 540 165 L 545 145 L 550 125 L 556 108 Z',
    fill: '#1a3a5c',
  },
  // Indian subcontinent (highlighted)
  {
    id: 'india',
    d: 'M 680 200 L 705 198 L 725 205 L 738 220 L 740 238 L 730 255 L 718 268 L 705 275 L 693 270 L 683 258 L 678 242 L 675 225 L 676 210 Z',
    fill: '#0f3460',
  },
  // Southeast Asia
  {
    id: 'seasia',
    d: 'M 740 210 L 770 200 L 795 205 L 810 218 L 815 235 L 808 248 L 790 255 L 770 252 L 752 242 L 742 228 Z',
    fill: '#1a3a5c',
  },
  // Australia
  {
    id: 'australia',
    d: 'M 800 290 L 845 282 L 878 285 L 900 298 L 905 318 L 895 340 L 875 355 L 850 360 L 825 355 L 805 340 L 795 320 L 796 303 Z',
    fill: '#1a3a5c',
  },
  // Greenland
  {
    id: 'greenland',
    d: 'M 310 60 L 345 55 L 370 62 L 375 78 L 360 88 L 335 90 L 312 82 L 305 70 Z',
    fill: '#152840',
  },
  // Japan/Korea islands
  {
    id: 'japan',
    d: 'M 838 140 L 850 135 L 860 142 L 858 155 L 848 160 L 838 155 Z',
    fill: '#1a3a5c',
  },
  // UK/British Isles
  {
    id: 'uk',
    d: 'M 452 108 L 460 104 L 468 108 L 468 118 L 460 122 L 452 118 Z',
    fill: '#1a3a5c',
  },
];

// Latitude lines
const LAT_LINES = [80, 130, 170, 210, 250, 290, 330, 380, 430];
// Longitude lines
const LON_LINES = [50, 150, 250, 350, 450, 550, 650, 750, 850, 950];

export function WorldMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="worldmap"
      ref={sectionRef}
      className="relative w-full bg-[#03060c] py-20 sm:py-28 overflow-hidden text-white"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full bg-cyan-900/10 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-purple-900/10 blur-[120px]" />

      {/* Scanline overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.025]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.4) 2px, rgba(255,255,255,0.4) 3px)',
        }}
      />

      <div className="relative z-20 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div
          className="mb-12 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)' }}
        >
          <div className="flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-cyan-400 uppercase mb-4">
            <Globe size={13} />
            <span>06 // GLOBAL REACH</span>
          </div>
          <h2 className="text-4xl font-extralight tracking-[-0.04em] sm:text-7xl lg:text-8xl">
            WHERE I'VE<br />
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-blue-300">
              SHIPPED.
            </span>
          </h2>
          <p className="mt-4 text-sm text-zinc-400 max-w-lg font-light leading-relaxed">
            From Bhubaneswar to the world — projects serving real users across continents.
          </p>
        </div>

        {/* Map Container */}
        <div
          className="relative rounded-2xl border border-white/5 overflow-hidden shadow-2xl transition-all duration-700 delay-200"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)' }}
        >
          {/* Map inner glow frame */}
          <div className="absolute inset-0 rounded-2xl border border-cyan-500/10 pointer-events-none z-20" />

          <svg
            viewBox="0 0 1000 500"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto block"
            style={{ background: 'linear-gradient(180deg, #060d1a 0%, #030810 100%)' }}
          >
            <defs>
              {/* Ocean gradient */}
              <radialGradient id="oceanGrad" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#071428" />
                <stop offset="100%" stopColor="#030810" />
              </radialGradient>

              {/* India highlight gradient */}
              <radialGradient id="indiaGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
              </radialGradient>

              {/* Pin glow filter */}
              <filter id="pinGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Soft glow filter */}
              <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Continent filter */}
              <filter id="contGlow">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Pin gradients */}
              {PINS.map((pin) => (
                <radialGradient key={`grad-${pin.id}`} id={`grad-${pin.id}`} cx="50%" cy="30%" r="70%">
                  <stop offset="0%" stopColor={pin.color} stopOpacity="1" />
                  <stop offset="100%" stopColor={pin.color} stopOpacity="0.3" />
                </radialGradient>
              ))}
            </defs>

            {/* Ocean background */}
            <rect width="1000" height="500" fill="url(#oceanGrad)" />

            {/* Latitude grid lines */}
            {LAT_LINES.map((y) => (
              <line
                key={`lat-${y}`}
                x1="0" y1={y} x2="1000" y2={y}
                stroke="#ffffff" strokeOpacity="0.04" strokeWidth="0.5"
              />
            ))}
            {/* Longitude grid lines */}
            {LON_LINES.map((x) => (
              <line
                key={`lon-${x}`}
                x1={x} y1="0" x2={x} y2="500"
                stroke="#ffffff" strokeOpacity="0.04" strokeWidth="0.5"
              />
            ))}

            {/* Equator line */}
            <line x1="0" y1="250" x2="1000" y2="250" stroke="#00e5ff" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="6 4" />

            {/* Continents */}
            {CONTINENTS.map((c) => (
              <path
                key={c.id}
                d={c.d}
                fill={c.fill}
                stroke="#2a4a6a"
                strokeWidth="0.8"
                filter="url(#contGlow)"
              />
            ))}

            {/* India highlight glow */}
            <ellipse cx="706" cy="238" rx="38" ry="48" fill="url(#indiaGlow)" />
            <path
              d="M 680 200 L 705 198 L 725 205 L 738 220 L 740 238 L 730 255 L 718 268 L 705 275 L 693 270 L 683 258 L 678 242 L 675 225 L 676 210 Z"
              fill="none"
              stroke="#00e5ff"
              strokeWidth="0.6"
              strokeOpacity="0.5"
            />

            {/* Connection lines from Bhubaneswar */}
            {PINS.filter((p) => p.id !== 'bhubaneswar').map((pin) => (
              <line
                key={`line-${pin.id}`}
                x1={715} y1={238}
                x2={pin.x} y2={pin.y}
                stroke={pin.color}
                strokeWidth="0.5"
                strokeOpacity={hovered === pin.id ? 0.4 : 0.1}
                strokeDasharray="4 6"
              />
            ))}

            {/* Pins */}
            {PINS.map((pin) => {
              const r = PIN_SIZES[pin.size];
              const pr = PULSE_SIZES[pin.size];
              const isHov = hovered === pin.id;

              return (
                <g
                  key={pin.id}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => { setHovered(pin.id); sound.playHover(); }}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Pulse ring */}
                  {pin.pulse && (
                    <circle
                      cx={pin.x} cy={pin.y}
                      r={pr}
                      fill="none"
                      stroke={pin.color}
                      strokeWidth="1"
                      strokeOpacity={isHov ? 0.6 : 0.25}
                      filter="url(#softGlow)"
                    >
                      <animate attributeName="r" values={`${pr};${pr * 1.6};${pr}`} dur="2s" repeatCount="indefinite" />
                      <animate attributeName="stroke-opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}
                  {/* Glow halo */}
                  <circle
                    cx={pin.x} cy={pin.y}
                    r={r + 6}
                    fill={pin.glowColor}
                    opacity={isHov ? 0.9 : 0.5}
                    filter="url(#softGlow)"
                  />
                  {/* Main pin dot */}
                  <circle
                    cx={pin.x} cy={pin.y}
                    r={r}
                    fill={`url(#grad-${pin.id})`}
                    stroke={pin.color}
                    strokeWidth={isHov ? 1.5 : 1}
                    filter="url(#pinGlow)"
                  />
                  {/* Center highlight */}
                  <circle
                    cx={pin.x - r * 0.3} cy={pin.y - r * 0.3}
                    r={r * 0.35}
                    fill="white"
                    opacity={0.6}
                  />
                </g>
              );
            })}
          </svg>

          {/* Hovering tooltip overlays using foreignObject-like approach via absolute divs */}
          <div className="absolute inset-0 pointer-events-none">
            <svg
              viewBox="0 0 1000 500"
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {PINS.map((pin) => {
                if (hovered !== pin.id) return null;
                const svgW = 1000;
                const svgH = 500;
                const xPct = (pin.x / svgW) * 100;
                const yPct = (pin.y / svgH) * 100;
                return (
                  <foreignObject
                    key={`tt-${pin.id}`}
                    x={Math.min(pin.x - 88, 820)}
                    y={Math.max(pin.y - 80, 8)}
                    width="176"
                    height="76"
                    style={{ overflow: 'visible' }}
                    // We need xPct / yPct just to avoid lint warnings
                    data-x={xPct}
                    data-y={yPct}
                  >
                    <div
                      style={{
                        background: 'rgba(6,13,26,0.96)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        padding: '10px 12px',
                        backdropFilter: 'blur(12px)',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ color: pin.color, fontSize: '11px', fontWeight: '600', marginBottom: '4px', lineHeight: 1.3 }}>
                        {pin.label}
                      </div>
                      <div style={{ color: '#9ca3af', fontSize: '10px', lineHeight: 1.4 }}>
                        {pin.description}
                      </div>
                    </div>
                  </foreignObject>
                );
              })}
            </svg>
          </div>

          {/* Legend */}
          <div className="absolute bottom-3 left-4 flex flex-col gap-1.5 z-30">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
              <span className="font-mono text-[9px] text-zinc-400 tracking-widest">BASE / DEPLOYED</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_6px_rgba(168,85,247,0.7)]" />
              <span className="font-mono text-[9px] text-zinc-400 tracking-widest">GITHUB REACH</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
              <span className="font-mono text-[9px] text-zinc-400 tracking-widest">PORTFOLIO REACH</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          className="mt-10 grid grid-cols-3 gap-4 sm:gap-6 transition-all duration-700 delay-400"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)' }}
        >
          {[
            { icon: Globe, label: '1 Live Production Site', sub: 'rabindramedicalhall.in' },
            { icon: Package, label: '1000+ Products Online', sub: 'WooCommerce catalogue' },
            { icon: Rocket, label: '2 Deployed Projects', sub: 'Global GitHub audience' },
          ].map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-4 sm:p-5 text-center backdrop-blur-sm"
            >
              <Icon size={18} className="text-cyan-400" />
              <div className="text-sm font-semibold text-white leading-tight">{label}</div>
              <div className="font-mono text-[10px] text-zinc-500">{sub}</div>
            </div>
          ))}
        </div>

        {/* Pin map legend row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 border-t border-white/5 pt-8">
          {[
            { label: 'BHUBANESWAR', color: 'bg-cyan-400' },
            { label: 'USA · EUROPE', color: 'bg-purple-400' },
            { label: 'AUSTRALIA', color: 'bg-amber-400' },
          ].map(({ label, color }) => (
            <span key={label} className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase">
              <span className={`h-2 w-2 rounded-full ${color}`} />
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes worldmap-ping {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
