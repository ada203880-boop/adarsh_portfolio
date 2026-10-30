import { useEffect, useState, useRef } from 'react';

export function CustomCursor() {
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });

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
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor]');
      if (interactive) {
        setIsHovered(true);
        const text = interactive.getAttribute('data-cursor') || '';
        setCursorText(text);
      } else {
        setIsHovered(false);
        setCursorText('');
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

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  return (
    <div
      className={`custom-cursor-wrap pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      aria-hidden="true"
    >
      {/* Precision core dot */}
      <div
        ref={dotRef}
        className={`fixed left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.8)] transition-transform duration-75 ${isHovered ? 'scale-0' : 'scale-100'
          }`}
      />

      {/* Trailing elastic ring */}
      <div
        ref={ringRef}
        className={`fixed left-0 top-0 flex items-center justify-center rounded-full border transition-[width,height,margin,border-color,background-color] duration-300 ease-out ${cursorText
            ? '-ml-8 -mt-8 h-16 w-16 border-violet-400/80 bg-violet-950/80 backdrop-blur-md text-[9px] font-mono font-medium tracking-widest text-violet-200 uppercase shadow-[0_0_20px_rgba(139,92,246,0.35)]'
            : isHovered
              ? '-ml-5 -mt-5 h-10 w-10 border-violet-400/60 bg-violet-500/10 backdrop-blur-sm'
              : '-ml-3.5 -mt-3.5 h-7 w-7 border-white/20 bg-transparent'
          }`}
      >
        {cursorText && <span>{cursorText}</span>}
      </div>
    </div>
  );
}
