import { useState } from 'react';
import { Briefcase, Clock, MapPin, MessageCircle, ArrowUpRight, X } from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { sound } from '../lib/sound';

export function HiringStatusWidget() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      aria-label="Hiring Status"
      className="fixed right-4 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col items-end pointer-events-auto select-none"
    >
      {collapsed ? (
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setCollapsed(false);
          }}
          className="group flex items-center gap-2 rounded-l-2xl border border-r-0 border-emerald-500/40 bg-[#070b18]/90 px-3 py-2.5 backdrop-blur-xl shadow-[-5px_10px_25px_rgba(0,0,0,0.5)] hover:border-emerald-400 hover:bg-[#0c1228] transition-all"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-xs font-semibold text-emerald-300 [writing-mode:vertical-rl] tracking-widest py-1">
            HIRE ADARSH
          </span>
        </button>
      ) : (
        <div className="relative w-52 rounded-2xl border border-emerald-500/30 bg-[#080c1d]/95 p-4 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(16,185,129,0.15)] transition-all animate-in fade-in slide-in-from-right-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-[11px] font-bold text-emerald-300">AVAILABLE NOW</span>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setCollapsed(true);
              }}
              className="text-zinc-500 hover:text-white transition-colors"
            >
              <X size={13} />
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="mt-3 space-y-2 text-[11px] font-mono text-zinc-300">
            <div className="flex items-center gap-2">
              <Briefcase size={12} className="text-cyan-400 shrink-0" />
              <span className="text-zinc-400">Target:</span>
              <span className="text-white font-medium truncate">Full-Stack / React</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={12} className="text-violet-400 shrink-0" />
              <span className="text-zinc-400">Base:</span>
              <span className="text-white font-medium">Bhubaneswar, IN</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={12} className="text-amber-400 shrink-0" />
              <span className="text-zinc-400">Response:</span>
              <span className="text-emerald-400 font-semibold">&lt; 24 Hours</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-4 flex flex-col gap-2">
            <a
              href={portfolio.links.whatsapp}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick()}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-3 py-2 font-mono text-xs font-semibold text-white shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:scale-105 transition-all"
            >
              <MessageCircle size={13} />
              <span>Instant Chat</span>
              <ArrowUpRight size={12} />
            </a>
            <a
              href={`mailto:${portfolio.email}?subject=Job%20Opportunity%20for%20Adarsh%20Panda`}
              onClick={() => sound.playClick()}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] text-zinc-300 hover:border-cyan-400/40 hover:text-white transition-all"
            >
              <span>Email Proposal</span>
            </a>
          </div>
        </div>
      )}
    </aside>
  );
}
