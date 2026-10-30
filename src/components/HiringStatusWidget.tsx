import { useState } from 'react';
import { Briefcase, Clock, MapPin, MessageCircle, ArrowUpRight, X, Sparkles } from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { sound } from '../lib/sound';

export function HiringStatusWidget() {
  // Start collapsed by default as a slim, non-intrusive edge tab to prevent any overlapping
  const [collapsed, setCollapsed] = useState(true);

  return (
    <aside
      aria-label="Hiring Status"
      className="fixed right-0 top-24 z-[85] hidden lg:flex flex-col items-end pointer-events-auto select-none"
    >
      {collapsed ? (
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setCollapsed(false);
          }}
          className="group flex items-center gap-2 rounded-l-2xl border-2 border-r-0 border-emerald-400/50 bg-[#070b18]/95 px-3 py-3 backdrop-blur-2xl shadow-[-8px_10px_30px_rgba(0,0,0,0.7),0_0_20px_rgba(16,185,129,0.3)] hover:border-emerald-300 hover:bg-[#0c142e] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all cursor-pointer"
          title="Click to view availability & instant hire details"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-80" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-xs font-bold text-emerald-300 [writing-mode:vertical-rl] tracking-widest py-1 group-hover:text-white transition-colors">
            HIRE ADARSH
          </span>
        </button>
      ) : (
        <div className="relative mr-4 w-60 rounded-3xl border border-emerald-500/40 bg-[#080c1d]/95 p-5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(16,185,129,0.25)] transition-all animate-in fade-in slide-in-from-right-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-80" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-xs font-bold text-emerald-300 tracking-wider">AVAILABLE NOW</span>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setCollapsed(true);
              }}
              className="rounded-lg p-1 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X size={14} />
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="mt-3.5 space-y-2.5 text-xs font-mono text-zinc-300">
            <div className="flex items-center gap-2">
              <Briefcase size={13} className="text-cyan-400 shrink-0" />
              <span className="text-zinc-400">Target:</span>
              <span className="text-white font-medium truncate">Full-Stack / React</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={13} className="text-violet-400 shrink-0" />
              <span className="text-zinc-400">Base:</span>
              <span className="text-white font-medium">Bhubaneswar, IN</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={13} className="text-amber-400 shrink-0" />
              <span className="text-zinc-400">Response:</span>
              <span className="text-emerald-400 font-semibold">&lt; 24 Hours</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-5 flex flex-col gap-2">
            <a
              href={portfolio.links.whatsapp}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick()}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-3.5 py-2.5 font-mono text-xs font-bold text-white shadow-[0_4px_20px_rgba(16,185,129,0.4)] hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] transition-all"
            >
              <MessageCircle size={14} />
              <span>Direct WhatsApp Chat</span>
              <ArrowUpRight size={13} />
            </a>
            <a
              href={`mailto:${portfolio.email}?subject=Job%20Opportunity%20for%20Adarsh%20Panda`}
              onClick={() => sound.playClick()}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2 font-mono text-xs text-zinc-300 hover:border-cyan-400/50 hover:bg-white/[0.08] hover:text-white transition-all"
            >
              <Sparkles size={12} className="text-cyan-400" />
              <span>Email Proposal</span>
            </a>
          </div>
        </div>
      )}
    </aside>
  );
}
