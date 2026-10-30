import { useEffect, useState, useRef } from 'react';

interface CodeParticle {
  id: number;
  x: number;
  y: number;
  char: string;
  color: string;
}

const CODE_CHARS = ['{', '}', '()', '=>', '//', ';', 'const', 'fn', '<>', '[]', '&&', '||', '==', '++', 'if', 'return', 'await'];
const CODE_COLORS = ['#00e5ff', '#a855f7', '#10b981', '#f59e0b', '#38bdf8'];

export function CustomCursor() {
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [particles, setParticles] = useState<CodeParticle[]>([]);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const lastParticleTime = useRef(0);
  const particleId = useRef(0);

  useEffect(() => {
    // Detect touch / coarse pointer
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Check cursor data attribute or interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor]');
        if (interactive) {
          setIsHovered(true);
          const text = interactive.getAttribute('data-cursor') || '';
          setCursorText(text);
        } else {
          setIsHovered(false);
          setCursorText('');
        }
      }

      // Throttle Code Particles emission
      const now = performance.now();
      if (now - lastParticleTime.current > 75) {
        lastParticleTime.current = now;
        const newParticle: CodeParticle = {
          id: particleId.current++,
          x: e.clientX + (Math.random() - 0.5) * 16,
          y: e.clientY + (Math.random() - 0.5) * 16,
          char: CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)],
          color: CODE_COLORS[Math.floor(Math.random() * CODE_COLORS.length)],
        };

        setParticles((prev) => [...prev.slice(-18), newParticle]);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    let rafId: number;
    const animate = () => {
      // Lerp ring towards mouse position
      const ease = 0.18;
      const dx = mouse.current.x - ring.current.x;
      const dy = mouse.current.y - ring.current.y;
      ring.current.x += dx * ease;
      ring.current.y += dy * ease;

      // Dynamic velocity squash and stretch
      const speed = Math.min(Math.hypot(dx, dy), 80);
      const angle = Math.atan2(dy, dx);
      const stretch = 1 + speed * 0.0035;
      const squash = Math.max(0.7, 1 / stretch);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) rotate(${angle}rad) scale(${stretch}, ${squash})`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    // Particle cleanup interval
    const cleanupInterval = setInterval(() => {
      setParticles((prev) => (prev.length > 0 ? prev.slice(1) : prev));
    }, 180);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafId);
      clearInterval(cleanupInterval);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  return (
    <>
      <style>{`
        @keyframes float-fade-particle {
          0% {
            opacity: 0.85;
            transform: translateY(0px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-28px) scale(0.8);
          }
        }
      `}</style>

      {/* Floating Code Character Trail Particles */}
      <div className="pointer-events-none fixed inset-0 z-[9990] overflow-hidden">
        {particles.map((p) => (
          <span
            key={p.id}
            className="fixed pointer-events-none font-mono text-[10px] font-bold select-none drop-shadow-[0_0_8px_currentColor]"
            style={{
              left: p.x,
              top: p.y,
              color: p.color,
              animation: 'float-fade-particle 0.85s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
            }}
          >
            {p.char}
          </span>
        ))}
      </div>

      {/* Main Cursor Element */}
      <div
        className={`custom-cursor-wrap pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        {/* Precision core dot */}
        <div
          ref={dotRef}
          className={`fixed left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.9)] transition-transform duration-75 ${
            isHovered ? 'scale-0' : 'scale-100'
          }`}
        />

        {/* Trailing elastic ring */}
        <div
          ref={ringRef}
          className={`fixed left-0 top-0 flex items-center justify-center rounded-full border transition-[width,height,margin,border-color,background-color] duration-300 ease-out ${
            cursorText
              ? '-ml-8 -mt-8 h-16 w-16 border-cyan-400/80 bg-cyan-950/80 backdrop-blur-md text-[9px] font-mono font-medium tracking-widest text-cyan-200 uppercase shadow-[0_0_20px_rgba(6,182,212,0.35)]'
              : isHovered
                ? '-ml-5 -mt-5 h-10 w-10 border-cyan-400/60 bg-cyan-500/10 backdrop-blur-sm'
                : '-ml-3.5 -mt-3.5 h-7 w-7 border-white/20 bg-transparent'
          }`}
        >
          {cursorText && <span>{cursorText}</span>}
        </div>
      </div>
    </>
  );
}
