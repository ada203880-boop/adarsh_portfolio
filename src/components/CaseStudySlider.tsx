import { useState, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  label: string;
  caption: string;
  color: string; // hex accent
}

// Simulated before/after slides for each project
const PROJECT_SLIDES: Record<string, { before: Slide; after: Slide }> = {
  'rmh-ecommerce': {
    before: { label: 'Figma Wireframe', caption: 'Initial low-fidelity mockup — basic WooCommerce product grid layout designed in Figma.', color: '#f97316' },
    after:  { label: 'Live Deployed',   caption: 'Production storefront on ravindramedicalhall.in — fully responsive WooCommerce build with custom prescription upload.', color: '#34d399' },
  },
  'data-pipeline': {
    before: { label: 'Architecture Draft', caption: 'Hand-sketched system architecture diagram — initial service flow design for pipeline visualizer.', color: '#a78bfa' },
    after:  { label: 'Live Visualizer',   caption: 'Deployed interactive canvas — animated data beams connecting services in real time, built with React 19 + Canvas API.', color: '#06b6d4' },
  },
};

interface CaseStudySliderProps {
  projectId: string;
  className?: string;
}

export function CaseStudySlider({ projectId, className = '' }: CaseStudySliderProps) {
  const slides = PROJECT_SLIDES[projectId];
  const [position, setPosition] = useState(50); // 0-100 percent
  const [isDragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct  = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    setPosition(pct);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => { setDragging(true); updatePosition(e.clientX); };
  const onMouseMove = (e: React.MouseEvent) => { if (isDragging) updatePosition(e.clientX); };
  const onMouseUp   = ()                    => setDragging(false);
  const onTouchMove = (e: React.TouchEvent) => { if (isDragging) updatePosition(e.touches[0].clientX); };

  if (!slides) return null;

  const { before, after } = slides;
  const isBefore = position < 50;

  return (
    <div className={`relative select-none overflow-hidden rounded-2xl border border-white/10 ${className}`}
      ref={containerRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={(e) => { setDragging(true); updatePosition(e.touches[0].clientX); }}
      onTouchMove={onTouchMove}
      onTouchEnd={() => setDragging(false)}
      style={{ cursor: isDragging ? 'col-resize' : 'ew-resize', userSelect: 'none' }}
    >
      {/* BEFORE panel (full width behind) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-black p-6">
        <div className="w-full max-w-xs">
          <div className="rounded-xl border-2 border-dashed p-8 text-center"
            style={{ borderColor: `${before.color}60`, backgroundColor: `${before.color}10` }}>
            <div className="text-4xl mb-3">🎨</div>
            <div className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: before.color }}>{before.label}</div>
            <p className="text-xs text-zinc-400 leading-relaxed">{before.caption}</p>
          </div>
          <div className="mt-3 flex items-center gap-2 font-mono text-[10px] text-zinc-500">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: before.color }} />
            BEFORE · DESIGN PHASE
          </div>
        </div>
      </div>

      {/* AFTER panel (clips from left edge to position) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#060d1a] via-[#0b1625] to-black p-6">
          <div className="w-full max-w-xs">
            <div className="rounded-xl border-2 p-8 text-center"
              style={{ borderColor: `${after.color}60`, backgroundColor: `${after.color}10` }}>
              <div className="text-4xl mb-3">🚀</div>
              <div className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: after.color }}>{after.label}</div>
              <p className="text-xs text-zinc-300 leading-relaxed">{after.caption}</p>
            </div>
            <div className="mt-3 flex items-center gap-2 font-mono text-[10px] text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: after.color }} />
              AFTER · DEPLOYED & LIVE
            </div>
          </div>
        </div>
      </div>

      {/* Divider handle */}
      <div
        className="absolute top-0 bottom-0 z-20 flex items-center"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        <div className="h-full w-px bg-white/30" />
        <div className="absolute flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-zinc-900 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          <ChevronLeft size={11} className="text-white/80" />
          <ChevronRight size={11} className="text-white/80" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 z-10 font-mono text-[10px] text-zinc-400 pointer-events-none">
        {isBefore ? '← BEFORE' : '← BEFORE'}
      </div>
      <div className="absolute top-3 right-3 z-10 font-mono text-[10px] text-zinc-400 pointer-events-none">
        AFTER →
      </div>
    </div>
  );
}

