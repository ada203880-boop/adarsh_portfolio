import { useEffect } from 'react';
import { X, CheckCircle2, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';
import { sound } from '../lib/sound';

export interface CaseStudyData {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  stack: string;
  liveUrl?: string | null;
  overview: string;
  challenge: string;
  solution: string;
  architecturePoints: string[];
  metrics: Array<{ label: string; value: string }>;
}

interface CaseStudyModalProps {
  study: CaseStudyData | null;
  onClose: () => void;
}

export function CaseStudyModal({ study, onClose }: CaseStudyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (study) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      sound.playSuccess();
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [study, onClose]);

  if (!study) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-2xl"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-cyan-500/30 bg-[#060911] p-6 sm:p-10 shadow-[0_0_100px_rgba(6,182,212,0.2)] text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 font-mono text-xs text-cyan-400">
              PROJECT {study.number} // DEEP ARCHITECTURE
            </span>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 hover:border-white/40 hover:text-white transition"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Title & Subtitle */}
        <div className="mt-8">
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
            {study.name}
          </h2>
          <p className="mt-2 font-mono text-sm tracking-wider text-cyan-400 uppercase">
            {study.subtitle}
          </p>
        </div>

        {/* Executive Overview */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-md">
          <h3 className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-2">Executive Overview</h3>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
            {study.overview}
          </p>
        </div>

        {/* Problem vs Solution Grid */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-rose-500/20 bg-rose-950/10 p-6">
            <div className="flex items-center gap-2 font-mono text-xs text-rose-400 font-bold mb-3">
              <ShieldCheck size={16} /> THE CORE CHALLENGE
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {study.challenge}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-6">
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-bold mb-3">
              <Sparkles size={16} /> ENGINEERING SOLUTION
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {study.solution}
            </p>
          </div>
        </div>

        {/* Architecture & Engineering Decisions */}
        <div className="mt-8">
          <h3 className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-4">
            System Architecture & Decisions
          </h3>
          <div className="space-y-3">
            {study.architecturePoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-3 rounded-xl border border-white/5 bg-zinc-900/40 p-4 text-xs sm:text-sm text-zinc-300">
                <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics Bar */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 pt-6">
          {study.metrics.map((m, idx) => (
            <div key={idx} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center">
              <div className="font-mono text-[10px] text-zinc-500 uppercase">{m.label}</div>
              <div className="mt-1 font-mono text-base font-semibold text-cyan-300">{m.value}</div>
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <div className="flex flex-wrap gap-2">
            {study.stack.split('•').map((tech) => (
              <span key={tech} className="rounded-lg border border-white/10 bg-zinc-900 px-3 py-1 font-mono text-xs text-zinc-300">
                {tech.trim()}
              </span>
            ))}
          </div>

          {study.liveUrl && (
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-2.5 text-xs font-bold tracking-wider text-black hover:bg-cyan-300 transition"
            >
              LAUNCH LIVE PRODUCTION <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
