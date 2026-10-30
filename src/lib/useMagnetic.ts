import { useEffect, useRef } from 'react';

interface MagneticOptions {
  distance?: number; // Distance in px to trigger magnetic pull
  strength?: number; // Factor to scale the magnetic displacement
}

export function useMagnetic<T extends HTMLElement>(options: MagneticOptions = {}) {
  const { distance = 40, strength = 0.35 } = options;
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Do not enable on coarse touch screens
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let animId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const dist = Math.hypot(distX, distY);

      if (dist < rect.width / 2 + distance) {
        targetX = distX * strength;
        targetY = distY * strength;
      } else {
        targetX = 0;
        targetY = 0;
      }
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      if (Math.abs(currentX) > 0.05 || Math.abs(currentY) > 0.05) {
        el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      } else if (el.style.transform !== '') {
        el.style.transform = '';
      }

      animId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    el.addEventListener('mouseleave', handleMouseLeave);
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
      if (el) el.style.transform = '';
    };
  }, [distance, strength]);

  return ref;
}
