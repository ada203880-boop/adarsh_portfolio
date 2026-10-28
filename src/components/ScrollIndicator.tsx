import { useState, useEffect } from 'react';
import { sound } from '../lib/sound';

export function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100));
        setScrollProgress(Math.round(progress));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { label: '01', href: '#home', title: 'Home' },
    { label: '02', href: '#services', title: 'Services' },
    { label: '03', href: '#projects', title: 'Work' },
    { label: '04', href: '#skills', title: 'Skills' },
    { label: '05', href: '#education', title: 'Education' },
    { label: '06', href: '#certifications', title: 'Certs' },
    { label: '07', href: '#about', title: 'About' },
    { label: '08', href: '#contact', title: 'Contact' },
  ];

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-4 select-none pointer-events-auto">
      {/* Scroll percentage */}
      <div className="font-mono text-[9px] text-cyan-400 font-bold tracking-widest">
        {String(scrollProgress).padStart(2, '0')}%
      </div>

      {/* Progress track */}
      <div className="relative h-32 w-[2px] bg-white/10 rounded-full overflow-hidden">
        <div
          className="w-full bg-cyan-400 transition-all duration-75 ease-out shadow-[0_0_8px_rgba(6,182,212,0.8)]"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      {/* Section jump dots */}
      <div className="flex flex-col gap-2.5">
        {sections.map((s) => (
          <a
            key={s.label}
            href={s.href}
            onClick={() => sound.playHover()}
            title={s.title}
            data-cursor={s.title.toUpperCase()}
            className="group relative flex items-center justify-center"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white/30 transition-all duration-300 group-hover:scale-150 group-hover:bg-cyan-400" />
            <span className="absolute right-5 font-mono text-[9px] text-white/50 opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap bg-zinc-950/90 border border-white/10 px-1.5 py-0.5 rounded">
              {s.label} {s.title}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
