import { useState } from 'react';
import { ArrowDown, Github, Linkedin, Mail, FileText, Sparkles, Terminal, ArrowUpRight } from 'lucide-react';
import { portfolio } from '../data/portfolio';
import characterScene from '../assets/character-scene.png';
import { sound } from '../lib/sound';
import { useScrambleText } from '../lib/useScrambleText';

interface HeroSectionProps {
  onOpenTerminal: () => void;
}

export function HeroSection({ onOpenTerminal }: HeroSectionProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const { displayText: headlinePurpose, trigger: triggerScramble } = useScrambleText('Purpose.');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 18, y: -y * 18 });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-[#03060c] pt-28 pb-16 text-white flex flex-col justify-between"
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[550px] rounded-full bg-cyan-600/[0.12] blur-[140px]" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-[450px] w-[450px] rounded-full bg-indigo-600/[0.1] blur-[150px]" />

      {/* ── Left vertical social dock (desktop) ────────────── */}
      <div className="pointer-events-none absolute left-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex">
        {/* Vertical line top */}
        <div className="h-20 w-[1px] bg-gradient-to-b from-transparent to-white/20" />

        {[
          { href: portfolio.links.github, Icon: Github, label: 'GitHub' },
          { href: portfolio.links.linkedin, Icon: Linkedin, label: 'LinkedIn' },
          { href: `mailto:${portfolio.email}`, Icon: Mail, label: 'Email' },
        ].map(({ href, Icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            title={label}
            onClick={() => sound.playHover()}
            className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/50 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/60 hover:bg-cyan-950/40 hover:text-cyan-300 hover:shadow-[0_0_14px_rgba(6,182,212,0.4)]"
          >
            <Icon size={15} />
          </a>
        ))}

        {/* Vertical line bottom */}
        <div className="h-20 w-[1px] bg-gradient-to-b from-white/20 to-transparent" />
      </div>

      {/* ── Floating Resume Badge (bottom-right, desktop) ──── */}
      <a
        href={`${import.meta.env.BASE_URL}resume.pdf`}
        target="_blank"
        rel="noreferrer"
        onClick={() => sound.playClick()}
        data-cursor="RESUME"
        className="pointer-events-auto absolute bottom-24 right-6 z-20 hidden flex-col items-center gap-4 lg:flex"
      >
        <div className="h-16 w-[1px] bg-gradient-to-b from-transparent to-white/20" />
        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-4 py-2 font-mono text-[10px] tracking-widest text-white/60 backdrop-blur-md transition hover:border-cyan-400 hover:text-cyan-300">
          RESUME <ArrowUpRight size={11} />
        </div>
        <div className="h-16 w-[1px] bg-gradient-to-b from-white/20 to-transparent" />
      </a>

      {/* ── Main Content ─────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-16 z-10 flex-1 flex flex-col justify-center">

        {/* Status capsule */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/20 px-3.5 py-1 text-[10px] font-mono tracking-widest text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span>AVAILABLE FOR OPPORTUNITIES // 2026</span>
          </div>
          <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[10px] font-mono tracking-widest text-white/50">
            FULL-STACK SOFTWARE ENGINEER
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">

          {/* Left: Typography */}
          <div>
            <h1
              className="select-none cursor-default text-5xl font-extralight tracking-tight sm:text-7xl lg:text-[6vw] xl:text-8xl leading-[0.9]"
              onMouseEnter={() => { triggerScramble(); sound.playHover(); }}
            >
              Building Digital <br />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-sky-400">
                Products
              </span>{' '}
              with <br />
              <span className="font-mono italic font-normal text-cyan-300 underline decoration-cyan-400/50 underline-offset-8">
                {headlinePurpose}
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg font-light">
              Hi, I'm <strong className="text-white font-medium">Adarsh Panda</strong> — a Full-Stack Developer specializing in
              React.js, Node.js, Python, and MySQL. I engineer responsive, high-performance web applications
              and scalable digital platforms from end to end.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center gap-3.5">
              <a
                href="#projects"
                data-cursor="EXPLORE"
                onClick={() => sound.playClick()}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-xs font-bold tracking-widest text-black transition-all duration-300 hover:bg-cyan-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
              >
                EXPLORE WORK
                <ArrowDown size={14} className="transition-transform group-hover:translate-y-0.5" />
              </a>

              <a
                href={`${import.meta.env.BASE_URL}resume.pdf`}
                target="_blank"
                rel="noreferrer"
                data-cursor="RESUME"
                onClick={() => sound.playHover()}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3.5 text-xs font-semibold tracking-wider text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/10"
              >
                <FileText size={14} className="text-cyan-400" />
                RESUME / CV
              </a>

              <button
                onClick={onOpenTerminal}
                data-cursor="TERMINAL"
                className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 px-4 py-3.5 text-xs font-mono tracking-wider text-cyan-300 hover:bg-cyan-500/20 transition-all duration-300"
              >
                <Terminal size={14} />
                TERMINAL
              </button>
            </div>

            {/* Social links (mobile/tablet — the dock hides on desktop) */}
            <div className="mt-10 flex items-center gap-6 border-t border-white/10 pt-6 lg:hidden">
              <a href={portfolio.links.github} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-white/50 hover:text-cyan-400 transition">
                <Github size={15} /> GITHUB
              </a>
              <a href={portfolio.links.linkedin} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-white/50 hover:text-cyan-400 transition">
                <Linkedin size={15} /> LINKEDIN
              </a>
              <a href={`mailto:${portfolio.email}`}
                className="flex items-center gap-2 text-xs font-mono text-white/50 hover:text-cyan-400 transition">
                <Mail size={15} /> EMAIL
              </a>
            </div>
          </div>

          {/* Right: 3D Holographic Character Stage */}
          <div
            className="relative flex items-center justify-center"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          >
            <div
              className="relative w-full max-w-[480px] transition-transform duration-200 ease-out"
              style={{
                transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="absolute -inset-4 rounded-3xl border border-cyan-500/20 bg-gradient-to-b from-cyan-500/10 to-transparent blur-sm -z-10" />
              <div className="absolute -inset-1 rounded-3xl border border-white/10 -z-10" />

              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-900/90 to-black p-2 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
                <img
                  src={characterScene}
                  alt="Adarsh Panda — Full Stack Developer character artwork"
                  className="w-full h-auto object-cover rounded-xl transition-transform duration-700 hover:scale-105"
                  loading="eager"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/15 bg-black/60 p-3.5 backdrop-blur-xl shadow-lg"
                  style={{ transform: 'translateZ(30px)' }}>
                  <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400">
                    <span className="flex items-center gap-1.5"><Sparkles size={11} /> ADARSH PANDA // CSE</span>
                    <span className="text-white/40">CGPA 7.6 / 10</span>
                  </div>
                  <div className="mt-1 text-xs font-medium text-white/90">Full-Stack Engineer • React & Python • Node.js</div>
                </div>

                <div className="absolute top-4 right-4 rounded-lg border border-cyan-400/40 bg-cyan-950/80 px-2.5 py-1 text-[9px] font-mono font-bold tracking-wider text-cyan-300 backdrop-blur-md"
                  style={{ transform: 'translateZ(20px)' }}>
                  60 FPS ENGINE
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Tech Ticker */}
      <div className="mt-16 border-y border-white/10 bg-white/[0.01] py-3.5 overflow-hidden">
        <div className="flex animate-pulse whitespace-nowrap gap-12 font-mono text-xs tracking-[0.25em] text-white/30">
          {['REACT.JS', '•', 'NODE.JS', '•', 'PYTHON', '•', 'EXPRESS.JS', '•', 'REST APIS', '•', 'MYSQL', '•', 'WORDPRESS', '•', 'TAILWIND', '•', 'GSAP', '•', 'DATA SCIENCE'].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
