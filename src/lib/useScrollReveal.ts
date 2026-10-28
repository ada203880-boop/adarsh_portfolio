import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type RevealVariant = 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scaleIn' | 'fadeIn';

interface UseScrollRevealOptions {
  variant?: RevealVariant;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  childSelector?: string;
}

/**
 * Attaches a GSAP ScrollTrigger reveal animation to the returned ref.
 * If `childSelector` is provided, staggers the matching children instead of
 * animating the container element itself.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  variant = 'fadeUp',
  duration = 0.85,
  delay = 0,
  stagger = 0.1,
  start = 'top 82%',
  childSelector,
}: UseScrollRevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = childSelector
      ? Array.from(el.querySelectorAll<HTMLElement>(childSelector))
      : [el];

    const fromVars: gsap.TweenVars = { opacity: 0, duration, delay };
    if (variant === 'fadeUp') { fromVars.y = 50; }
    if (variant === 'fadeLeft') { fromVars.x = -50; }
    if (variant === 'fadeRight') { fromVars.x = 50; }
    if (variant === 'scaleIn') { fromVars.scale = 0.92; }
    // 'fadeIn' — just opacity

    const toVars: gsap.TweenVars = {
      opacity: 1,
      y: 0, x: 0, scale: 1,
      duration,
      delay,
      ease: 'power3.out',
      stagger: childSelector ? stagger : 0,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    };

    gsap.set(targets, fromVars);
    gsap.to(targets, toVars);

    return () => {
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === el)
        .forEach((st) => st.kill());
    };
  }, [variant, duration, delay, stagger, start, childSelector]);

  return ref;
}
