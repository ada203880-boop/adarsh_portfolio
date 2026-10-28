import { useEffect, useState } from 'react';
import { sound } from '../lib/sound';

interface CinematicLoaderProps {
  onDone: () => void;
}

export function CinematicLoader({ onDone }: CinematicLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusLog, setStatusLog] = useState('BOOTING RUNTIME...');
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasVisited = typeof window !== 'undefined' && sessionStorage.getItem('portfolio_visited');

    if (prefersReducedMotion || hasVisited) {
      onDone();
      return;
    }

    sessionStorage.setItem('portfolio_visited', 'true');

    const logs = [
      'SYSTEM BOOT // INITIALIZING ENGINE',
      'CALIBRATING MOTION MATRIX & GSAP TICKER',
      'COMPILING WEBGL SHADER CANVAS',
      'HYDRATING FULL-STACK DATA ARCHITECTURE',
      'SYNCHRONIZING ORBITAL TIMELINE',
      'SYSTEM READY // LAUNCHING EXPERIENCE',
    ];

    let current = 0;
    const interval = window.setInterval(() => {
      current += Math.floor(Math.random() * 8) + 4;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setProgress(100);
        setStatusLog('READY');

        // Play gentle chime
        sound.playHover();

        // Trigger cinematic curtain split
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onDone();
          }, 850);
        }, 300);
      } else {
        setProgress(current);
        const logIndex = Math.min(Math.floor((current / 100) * logs.length), logs.length - 1);
        setStatusLog(logs[logIndex]);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onDone]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(onDone, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-[100000] flex flex-col justify-between overflow-hidden bg-[#03060c] text-white select-none transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${isExiting ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        }`}
      aria-hidden="true"
    >
      {/* Top telemetry bar */}
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 font-mono text-xs text-white/40">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
          <span>ADARSH PANDA // PORTFOLIO OS</span>
        </div>
        <button
          onClick={handleSkip}
          className="rounded border border-white/20 px-2.5 py-1 text-[10px] uppercase tracking-widest text-white/60 hover:border-white/60 hover:text-white transition"
        >
          Skip Intro [ESC]
        </button>
      </div>

      {/* Center Grand Typography & Progress */}
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
        <p className="mb-3 font-mono text-[10px] tracking-[0.4em] text-cyan-400 uppercase">
          Full-Stack Developer & Software Engineer
        </p>
        <h1 className="text-4xl font-extralight tracking-[-0.04em] sm:text-6xl md:text-7xl">
          ADARSH <span className="font-semibold text-white/40">PANDA</span>
        </h1>

        <div className="mt-12 w-full max-w-md">
          {/* Progress number */}
          <div className="flex items-baseline justify-between font-mono text-xs text-white/50 mb-2">
            <span className="text-cyan-400">{statusLog}</span>
            <span className="text-2xl font-light text-white">{progress}%</span>
          </div>

          {/* Progress Track */}
          <div className="h-[2px] w-full overflow-hidden bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 transition-all duration-150 ease-out shadow-[0_0_12px_rgba(56,189,248,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Coordinates & Latency */}
      <div className="flex items-center justify-between border-t border-white/10 px-6 py-4 font-mono text-[10px] text-white/30">
        <span>LOC: BHUBANESWAR, IN [20.2961° N, 85.8245° E]</span>
        <span>LATENCY: 0.12ms // 60 FPS</span>
      </div>
    </div>
  );
}
