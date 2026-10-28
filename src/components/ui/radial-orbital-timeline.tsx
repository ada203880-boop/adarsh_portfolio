import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Play, Pause, Compass } from 'lucide-react';
import { sound } from '../../lib/sound';

export type TimelineItem = {
  id: string;
  title: string;
  date: string;
  category: string;
  icon?: ReactNode;
  content: ReactNode;
  relatedIds: string[];
};

export function RadialOrbitalTimeline({ items }: { items: TimelineItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? '');
  const [paused, setPaused] = useState(false);

  const activeIndex = Math.max(0, items.findIndex((item) => item.id === active));
  const activeItem = items[activeIndex] ?? items[0];
  const related = useMemo(() => new Set(activeItem?.relatedIds ?? []), [activeItem]);

  // Automatic Orbit Rotation
  useEffect(() => {
    if (paused || items.length < 2) return;
    const interval = window.setInterval(() => {
      setActive((current) => {
        const idx = items.findIndex((x) => x.id === current);
        return items[(idx + 1) % items.length].id;
      });
    }, 3800);
    return () => window.clearInterval(interval);
  }, [paused, items]);

  const handleSelectNode = (id: string) => {
    sound.playHover();
    setActive(id);
    setPaused(true);
  };

  return (
    <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#060911]/90 p-6 sm:p-12 shadow-[0_20px_80px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
      {/* Radial Nebula Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12),transparent_60%)]" />

      {/* Orbit Header Info */}
      <div className="relative z-10 flex flex-wrap items-center justify-between border-b border-white/10 pb-6 gap-4">
        <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 tracking-widest">
          <Compass size={14} className="animate-spin" style={{ animationDuration: '12s' }} />
          <span>ORBITAL REEL // INTERACTIVE CAREER RADIAL</span>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            setPaused((p) => !p);
          }}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-xs text-white/70 hover:border-cyan-400 hover:text-cyan-300 transition"
        >
          {paused ? <Play size={12} className="text-cyan-400" /> : <Pause size={12} className="text-amber-400" />}
          <span>{paused ? 'RESUME ORBIT' : 'PAUSE ORBIT'}</span>
        </button>
      </div>

      {/* Radial Celestial Arena */}
      <div className="relative mx-auto my-8 aspect-square w-full max-w-[420px] sm:max-w-[480px]">
        {/* Orbit track rings */}
        <div className="absolute inset-[6%] rounded-full border border-white/[0.08]" />
        <div className="absolute inset-[22%] rounded-full border border-dashed border-cyan-500/20" />
        <div className="absolute inset-[38%] rounded-full border border-white/[0.05]" />

        {/* Center Celestial Core */}
        <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-cyan-400/30 bg-[#090e1c] text-center shadow-[0_0_60px_rgba(6,182,212,0.25)] backdrop-blur-xl">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-cyan-400">STAGE</span>
          <strong className="mt-1 text-xs font-bold tracking-wider text-white">
            {activeItem?.category}
          </strong>
          <span className="font-mono text-[8px] text-white/40 mt-0.5">
            {activeIndex + 1}/{items.length}
          </span>
        </div>

        {/* Orbital Satellites / Nodes */}
        {items.map((item, i) => {
          const angle = (i / items.length) * Math.PI * 2 - Math.PI / 2;
          const radiusPercent = 42; // Orbit radius
          const x = 50 + Math.cos(angle) * radiusPercent;
          const y = 50 + Math.sin(angle) * radiusPercent;

          const isActive = item.id === active;
          const isRelated = related.has(item.id);

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelectNode(item.id)}
              aria-label={`Open ${item.title}`}
              className="absolute -translate-x-1/2 -translate-y-1/2 outline-none group z-20"
              style={{ left: `${x}%`, top: `${y}%` }}
              data-cursor="NODE"
            >
              <span
                className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border text-xs font-semibold transition-all duration-500 ${isActive
                    ? 'scale-125 border-cyan-400 bg-cyan-400 text-black shadow-[0_0_30px_rgba(34,211,238,0.8)]'
                    : isRelated
                      ? 'border-cyan-400/60 bg-cyan-950/80 text-cyan-300'
                      : 'border-white/15 bg-black/90 text-white/60 hover:border-white/50 hover:text-white'
                  }`}
              >
                {item.icon ?? String(i + 1).padStart(2, '0')}
              </span>

              {/* Node Title Label */}
              <span
                className={`absolute left-1/2 top-full mt-2 w-28 -translate-x-1/2 text-center font-mono text-[9px] uppercase tracking-wider transition-all duration-300 ${isActive ? 'text-cyan-300 font-bold scale-105' : 'text-white/40 group-hover:text-white/80'
                  }`}
              >
                {item.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Orbit Telemetry Output Card */}
      <div className="relative mx-auto mt-12 max-w-xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur-md">
        <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-400">
          {activeItem?.date} // {activeItem?.category}
        </div>
        <h3 className="text-2xl font-light tracking-tight text-white sm:text-3xl">
          {activeItem?.title}
        </h3>
        <div className="mt-3 text-sm leading-relaxed text-zinc-300">
          {activeItem?.content}
        </div>
      </div>
    </div>
  );
}
