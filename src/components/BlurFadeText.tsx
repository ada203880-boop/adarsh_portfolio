import { useRef, useEffect, useState } from 'react';

interface BlurFadeTextProps {
  text: string;
  className?: string;
  delay?: number; // base delay in ms
  wordDelay?: number; // extra ms per word
  as?: keyof JSX.IntrinsicElements;
}

export function BlurFadeText({
  text,
  className = '',
  delay = 0,
  wordDelay = 50,
  as: Tag = 'span',
}: BlurFadeTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Re-triggers each time section scrolls into and out of view
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(' ');

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={`inline ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: 'inline-block',
            marginRight: i < words.length - 1 ? '0.3em' : undefined,
            opacity: visible ? 1 : 0,
            filter: visible ? 'blur(0px)' : 'blur(10px)',
            transform: visible ? 'translateY(0px)' : 'translateY(18px)',
            transition: 'opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), filter 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: visible ? `${delay + i * wordDelay}ms` : '0ms',
          }}
        >
          {word}
        </span>
      ))}
    </Tag>
  );
}
