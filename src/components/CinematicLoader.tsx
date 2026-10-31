import { useEffect, useState } from 'react';

interface CinematicLoaderProps {
  onDone: () => void;
}

export function CinematicLoader({ onDone }: CinematicLoaderProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasVisited = typeof window !== 'undefined' && sessionStorage.getItem('portfolio_visited');

    if (prefersReducedMotion || hasVisited) {
      onDone();
      return;
    }

    sessionStorage.setItem('portfolio_visited', 'true');

    // Clean, natural transition without fake percentage tickers
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onDone, 600);
    }, 750);

    return () => clearTimeout(timer);
  }, [onDone]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(onDone, 200);
  };

  return (
    <div
      className={`fixed inset-0 z-[100000] flex flex-col justify-between overflow-hidden bg-[#03060c] text-white select-none transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isExiting ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
      aria-hidden="true"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4 font-mono text-xs text-white/50">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-semibold tracking-wider text-white/80">ADARSH PANDA</span>
          <span className="text-white/30">|</span>
          <span className="text-zinc-400">Full-Stack Developer</span>
        </div>
        <button
          type="button"
          onClick={handleSkip}
          className="rounded-lg border border-white/20 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-zinc-300 hover:border-cyan-400 hover:text-white transition"
        >
          Skip [ESC]
        </button>
      </div>

      {/* Center Grand Entrance Typography */}
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 px-3.5 py-1 mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-mono text-[10px] tracking-[0.3em] text-cyan-300 uppercase">
            React.js • Node.js • Python • MySQL
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extralight tracking-tight text-white">
          ADARSH <span className="font-semibold bg-gradient-to-r from-cyan-300 via-white to-violet-300 bg-clip-text text-transparent">PANDA</span>
        </h1>

        <p className="mt-3 text-xs sm:text-sm text-zinc-400 font-light max-w-md">
          Architecting resilient full-stack web applications, e-commerce systems, and modern APIs.
        </p>

        {/* Minimalist Glowing Pulse Bar */}
        <div className="mt-8 w-48 h-1 rounded-full bg-white/10 overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-cyan-400 to-violet-500 animate-[shimmer_1.2s_infinite]" />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.08] px-6 py-4 flex items-center justify-between font-mono text-[11px] text-zinc-500">
        <span>Bhubaneswar, Odisha, India</span>
        <span className="text-cyan-400/80">Available Immediately</span>
      </div>
    </div>
  );
}
