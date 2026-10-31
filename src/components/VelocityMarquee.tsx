import { useEffect, useRef } from 'react';
import { useMotionValue, useAnimationFrame } from 'framer-motion';

interface VelocityMarqueeProps {
  topRow?: string[];
  bottomRow?: string[];
  baseSpeed?: number;
}

const DEFAULT_TOP = [
  'REACT 19', 'NODE.JS', 'GSAP', 'REST APIs', 'MySQL',
  'TypeScript', 'Python', 'Tailwind CSS v4', 'WooCommerce', 'FORGE AI',
  'NEXT.JS', 'Framer Motion', 'Lenis', 'Three.js', 'PHPMAILER',
];

const DEFAULT_BOTTOM = [
  'FULL-STACK DEV', 'UI/UX DESIGN', 'API INTEGRATION', 'E-COMMERCE',
  'WHATSAPP WEBHOOKS', 'AI SYSTEMS', 'PERFORMANCE', 'BHUBANESWAR, INDIA',
  'AVAILABLE FOR HIRE', 'CREATIVE DEVELOPER', 'OPEN SOURCE',
];

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

export function VelocityMarquee({ topRow = DEFAULT_TOP, bottomRow = DEFAULT_BOTTOM, baseSpeed = 0.6 }: VelocityMarqueeProps) {
  const scrollVelocity = useRef(0);
  const x1 = useMotionValue(0);
  const x2 = useMotionValue(0);
  const smoothVel = useRef(0);
  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let lastY = window.scrollY;
    let lastTime = performance.now();

    const onScrollVel = () => {
      const now = performance.now();
      const dy = window.scrollY - lastY;
      const dt = now - lastTime;
      scrollVelocity.current = dt > 0 ? (dy / dt) * 16 : 0;
      lastY = window.scrollY;
      lastTime = now;
    };

    window.addEventListener('scroll', onScrollVel, { passive: true });
    return () => window.removeEventListener('scroll', onScrollVel);
  }, []);

  // Track tile width for seamless loop
  const tile1Ref = useRef<HTMLDivElement>(null);
  const tile2Ref = useRef<HTMLDivElement>(null);

  useAnimationFrame(() => {
    if (prefersReduced.current) return;
    smoothVel.current = lerp(smoothVel.current, scrollVelocity.current, 0.08);

    const dir1 = smoothVel.current >= 0 ? 1 : -1;
    const speed = baseSpeed + Math.abs(smoothVel.current) * 0.35;

    // Row 1: left to right base, reversed on scroll down
    let newX1 = x1.get() - speed * dir1;
    const w1 = tile1Ref.current?.offsetWidth ?? 800;
    if (newX1 < -w1) newX1 += w1;
    if (newX1 > 0) newX1 -= w1;
    x1.set(newX1);

    // Row 2: right to left base
    let newX2 = x2.get() + speed * dir1;
    const w2 = tile2Ref.current?.offsetWidth ?? 800;
    if (newX2 > 0) newX2 -= w2;
    if (newX2 < -w2) newX2 += w2;
    x2.set(newX2);
  });

  const separator = <span className="mx-4 text-cyan-500/60 font-mono">•</span>;

  const renderRow = (items: string[]) => (
    <>
      {items.map((item, i) => (
        <span key={i} className="inline-flex items-center">
          <span className="font-mono text-sm font-medium tracking-[0.12em] uppercase whitespace-nowrap text-white/70 hover:text-cyan-300 transition-colors duration-200 cursor-default">
            {item}
          </span>
          {separator}
        </span>
      ))}
    </>
  );

  return (
    <div
      className="relative py-8 overflow-hidden border-y border-white/[0.06] bg-gradient-to-r from-[#03060c] via-[#060d18] to-[#03060c]"
      aria-hidden="true"
    >
      {/* Fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-[#03060c] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-[#03060c] to-transparent" />

      {/* Row 1 */}
      <div className="flex mb-3 relative w-full max-w-full overflow-hidden">
        <div
          className="flex items-center will-change-transform"
          style={{ transform: `translateX(${x1.get()}px)`, display: 'flex' }}
          ref={tile1Ref}
          id="marquee-row1"
        >
          {renderRow(topRow)}
          {renderRow(topRow)}
          {renderRow(topRow)}
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex relative w-full max-w-full overflow-hidden">
        <div
          className="flex items-center will-change-transform"
          style={{ transform: `translateX(${x2.get()}px)`, display: 'flex' }}
          ref={tile2Ref}
          id="marquee-row2"
        >
          {renderRow(bottomRow)}
          {renderRow(bottomRow)}
          {renderRow(bottomRow)}
        </div>
      </div>
    </div>
  );
}

