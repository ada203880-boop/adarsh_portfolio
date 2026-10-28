import { useEffect, useState } from 'react';
import { FileText, Mail, X, Zap } from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { sound } from '../lib/sound';

export function HireMeBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (pct > 0.25 && !dismissed) setVisible(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed]);

  const dismiss = () => {
    setVisible(false);
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-[200]
        transition-transform duration-500 ease-out
        ${visible ? 'translate-y-0' : 'translate-y-full'}
      `}
    >
      {/* Backdrop blur strip */}
      <div className="relative border-t border-white/[0.08] bg-[#03060c]/80 backdrop-blur-xl">
        {/* Subtle top glow line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">

          {/* Status beacon */}
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
              <span className="font-mono text-[11px] font-medium tracking-widest text-white/90 uppercase">
                Open to Work
              </span>
              <span className="hidden sm:block h-3 w-[1px] bg-white/20" />
              <span className="font-mono text-[10px] text-zinc-400 tracking-wide">
                B.Tech CSE · 2025 Graduate · Full-Stack Developer
              </span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              target="_blank"
              rel="noreferrer"
              onClick={() => { sound.playClick(); }}
              className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.05] px-3 py-1.5 font-mono text-[10px] tracking-widest text-white/70 uppercase transition hover:border-cyan-400/60 hover:text-cyan-300"
            >
              <FileText size={11} />
              <span className="hidden sm:inline">Resume</span>
            </a>

            <a
              href={`mailto:${portfolio.email}?subject=Opportunity for Adarsh Panda`}
              onClick={() => { sound.playClick(); }}
              className="flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-950/40 px-3 py-1.5 font-mono text-[10px] tracking-widest text-cyan-300 uppercase transition hover:border-cyan-400 hover:bg-cyan-900/50 hover:shadow-[0_0_16px_rgba(6,182,212,0.3)]"
            >
              <Zap size={11} />
              <span className="hidden sm:inline">Hire Me</span>
              <span className="sm:hidden">
                <Mail size={11} />
              </span>
            </a>

            <button
              onClick={dismiss}
              className="ml-1 flex h-7 w-7 items-center justify-center rounded-lg text-white/30 transition hover:text-white/70"
              aria-label="Dismiss banner"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
