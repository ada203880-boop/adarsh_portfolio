import { useState } from 'react';
import { Laptop, Tablet, Smartphone, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import rmhImg from '../assets/rmh-screenshot.png';
import { sound } from '../lib/sound';

export function MultiDeviceMockup() {
  const [activeDevice, setActiveDevice] = useState<'all' | 'macbook' | 'ipad' | 'iphone'>('all');

  return (
    <section id="devices" className="relative w-full max-w-full overflow-hidden bg-[#03060c] py-20 sm:py-28 text-white">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[750px] rounded-full bg-violet-600/[0.05] blur-[170px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-violet-400 uppercase">
              <Sparkles size={13} />
              <span>// MULTI_VIEWPORT_ENGINEERING</span>
            </div>
            <h2 className="mt-4 text-4xl sm:text-6xl lg:text-7xl font-extralight tracking-tight">
              CROSS-DEVICE<br />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-white to-cyan-300">
                PERFECTION.
              </span>
            </h2>
          </div>

          <div className="flex flex-col gap-3 max-w-md">
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              Rabindra Medical Hall (Live Production) architected with fluid breakpoints across desktop workstations, tablets, and handheld devices.
            </p>
            {/* View filter buttons */}
            <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
              {(['all', 'macbook', 'ipad', 'iphone'] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setActiveDevice(d);
                  }}
                  className={`rounded-xl px-3 py-1.5 transition-all uppercase ${
                    activeDevice === d
                      ? 'bg-violet-600 text-white font-bold shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                      : 'border border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Multi-Device Showcase Stage */}
        <div className="mt-14 relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-6 min-h-[440px]">
          
          {/* 1. iPad Frame (Tablet) */}
          {(activeDevice === 'all' || activeDevice === 'ipad') && (
            <div
              onMouseEnter={() => sound.playHover()}
              className="relative w-full max-w-[340px] shrink-0 rounded-3xl border-4 border-[#252836] bg-[#0c0e1a] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(139,92,246,0.2)] transition-transform duration-500 hover:scale-105"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[10px] font-mono text-zinc-400">
                <span className="flex items-center gap-1">
                  <Tablet size={12} className="text-violet-400" /> iPad Pro 11"
                </span>
                <span className="text-emerald-400">834 × 1194</span>
              </div>
              <div className="relative mt-2 h-56 rounded-2xl overflow-hidden border border-white/10 bg-black">
                <img src={rmhImg} alt="Rabindra Medical Hall iPad View" className="h-full w-full object-cover object-top" />
              </div>
            </div>
          )}

          {/* 2. MacBook Workstation Frame (Desktop - Main Hero) */}
          {(activeDevice === 'all' || activeDevice === 'macbook') && (
            <div
              onMouseEnter={() => sound.playHover()}
              className="relative w-full max-w-2xl shrink rounded-2xl border-4 border-[#2d3142] bg-[#121422] p-4 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(6,182,212,0.25)] transition-transform duration-500 hover:scale-[1.02] z-10"
            >
              {/* MacBook Screen Bevel */}
              <div className="flex items-center justify-between pb-2.5 border-b border-white/10 text-[10px] font-mono text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 flex items-center gap-1 text-zinc-300">
                    <Laptop size={12} className="text-cyan-400" /> MacBook Pro 16"
                  </span>
                </div>
                <a
                  href="https://rabindramedicalhall.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-cyan-300 hover:underline"
                >
                  <span>rabindramedicalhall.in</span>
                  <ExternalLink size={10} />
                </a>
              </div>

              {/* Screen Body */}
              <div className="relative mt-2 h-72 sm:h-80 rounded-xl overflow-hidden border border-white/10 bg-black">
                <img src={rmhImg} alt="Rabindra Medical Hall Desktop View" className="h-full w-full object-cover object-top" />
                
                {/* Floating Live Badge */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/80 border border-emerald-400/40 px-3 py-1 font-mono text-[10px] text-emerald-300 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>PRODUCTION SITE ACTIVE</span>
                </div>
              </div>
            </div>
          )}

          {/* 3. iPhone Handheld Frame (Mobile) */}
          {(activeDevice === 'all' || activeDevice === 'iphone') && (
            <div
              onMouseEnter={() => sound.playHover()}
              className="relative w-full max-w-[240px] shrink-0 rounded-[36px] border-4 border-[#2b2d3c] bg-[#0c0e18] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(16,185,129,0.2)] transition-transform duration-500 hover:scale-105"
            >
              {/* Dynamic Island */}
              <div className="mx-auto h-3 w-16 rounded-full bg-black mb-2 flex items-center justify-center">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-800" />
              </div>

              <div className="flex items-center justify-between pb-1.5 text-[9px] font-mono text-zinc-400">
                <span className="flex items-center gap-1">
                  <Smartphone size={10} className="text-emerald-400" /> iPhone 15 Pro
                </span>
                <span className="text-zinc-500">393 × 852</span>
              </div>

              <div className="relative mt-1 h-64 rounded-2xl overflow-hidden border border-white/10 bg-black">
                <img src={rmhImg} alt="Rabindra Medical Hall Mobile View" className="h-full w-full object-cover object-top" />
              </div>
            </div>
          )}

        </div>

        {/* Feature Badges Below */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-zinc-400">
          <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5">
            <CheckCircle2 size={13} className="text-cyan-400" /> 100% Responsive Breakpoints
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5">
            <CheckCircle2 size={13} className="text-violet-400" /> Touch Optimized Architecture
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5">
            <CheckCircle2 size={13} className="text-emerald-400" /> High Density Retina Resolution
          </span>
        </div>
      </div>
    </section>
  );
}
