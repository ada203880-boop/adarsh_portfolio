import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

type TimelineItem = { id: string; title: string; date: string; content: ReactNode; category: string; icon?: ReactNode; relatedIds: string[] };

export function RadialOrbitalTimeline({ items }: { items: TimelineItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? '');
  const [paused, setPaused] = useState(false);
  const activeItem = items.find((item) => item.id === active) ?? items[0];
  const activeIndex = Math.max(0, items.findIndex((item) => item.id === active));
  const related = useMemo(() => new Set(activeItem?.relatedIds ?? []), [activeItem]);

  useEffect(() => {
    if (paused || items.length < 2) return;
    const id = window.setInterval(() => setActive((current) => items[(items.findIndex((x) => x.id === current) + 1) % items.length].id), 2600);
    return () => window.clearInterval(id);
  }, [paused, items]);

  return (
    <div className="relative mx-auto min-h-[620px] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#070707] px-4 py-10 sm:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,.09),transparent_35%)]" />
      <div className="relative mx-auto aspect-square w-full max-w-[560px]">
        <div className="absolute inset-[10%] rounded-full border border-white/10" />
        <div className="absolute inset-[24%] rounded-full border border-white/10" />
        <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/20 bg-white/[.04] text-center shadow-[0_0_80px_rgba(255,255,255,.08)]">
          <span className="text-[9px] uppercase tracking-[.35em] text-white/40">Journey</span>
          <strong className="mt-2 text-sm tracking-[.18em] text-white">{activeItem?.category}</strong>
        </div>
        {items.map((item, i) => {
          const angle = (i / items.length) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + Math.cos(angle) * 39;
          const y = 50 + Math.sin(angle) * 39;
          const isActive = item.id === active;
          const isRelated = related.has(item.id);
          return (
            <button key={item.id} type="button" onClick={() => { setActive(item.id); setPaused(true); }} aria-label={`Open ${item.title}`} className="absolute -translate-x-1/2 -translate-y-1/2 text-left outline-none" style={{ left: `${x}%`, top: `${y}%` }}>
              <span className={`flex h-14 w-14 items-center justify-center rounded-full border text-[10px] font-semibold uppercase tracking-wider transition-all duration-500 sm:h-16 sm:w-16 ${isActive ? 'scale-125 border-white bg-white text-black shadow-[0_0_35px_rgba(255,255,255,.35)]' : isRelated ? 'border-white/50 bg-white/10 text-white' : 'border-white/15 bg-black text-white/55 hover:border-white/50 hover:text-white'}`}>
                {item.icon ?? String(i + 1).padStart(2, '0')}
              </span>
              <span className="absolute left-1/2 top-full mt-2 w-24 -translate-x-1/2 text-center text-[8px] uppercase tracking-[.18em] text-white/45">{item.title}</span>
            </button>
          );
        })}
      </div>
      <div className="relative mx-auto mt-6 max-w-2xl border-t border-white/10 pt-6 text-center">
        <div className="mb-2 text-[9px] uppercase tracking-[.3em] text-white/35">{activeItem?.date} · {activeIndex + 1}/{items.length}</div>
        <h3 className="text-2xl font-light tracking-tight text-white sm:text-3xl">{activeItem?.title}</h3>
        <div className="mt-3 text-sm leading-7 text-white/55">{activeItem?.content}</div>
        <button type="button" onClick={() => setPaused((v) => !v)} className="mt-5 min-h-11 border border-white/15 px-4 text-[10px] uppercase tracking-[.2em] text-white/60 hover:border-white/40 hover:text-white">{paused ? 'Resume orbit' : 'Pause orbit'}</button>
      </div>
    </div>
  );
}
