import { Sparkles, Code2, ShieldCheck, Zap, HeartHandshake, ArrowUpRight, FileText } from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { sound } from '../lib/sound';
import { useCountUp } from '../lib/useCountUp';
import { SpotlightCard } from './SpotlightCard';
import { GithubActivity } from './GithubActivity';

interface AboutSectionProps {
  onOpenResume?: () => void;
}

export function AboutSection({ onOpenResume }: AboutSectionProps) {
  const gradYear = useCountUp(2025, 1800, 0);
  const cgpa = useCountUp(7.6, 2000, 1);
  const systems = useCountUp(3, 1600, 0);
  const certs = useCountUp(4, 1800, 0);

  const values = [
    {
      num: '01',
      title: 'Full-Stack Ownership',
      desc: 'Bridging user-facing interfaces with dependable server-side logic, database schemas, validation safeguards, and automated integrations.',
      icon: Code2,
    },
    {
      num: '02',
      title: 'Performance & Reliability',
      desc: 'Optimizing rendering cycles, asset compression, database queries, and response latencies to ensure fast, zero-jank execution.',
      icon: Zap,
    },
    {
      num: '03',
      title: 'Security & Integrity',
      desc: 'Informed by practical cyber security and cloud fundamentals—enforcing input sanitation, safe auth flows, and data safeguards.',
      icon: ShieldCheck,
    },
    {
      num: '04',
      title: 'Intentional UX Design',
      desc: 'Grounding every interface in clarity, accessible color contrast, semantic structure, and responsive ergonomics for real humans.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="about" className="relative min-h-screen bg-[#03060c] py-28 text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/3 h-[500px] w-[500px] rounded-full bg-cyan-600/[0.06] blur-[160px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-cyan-400 uppercase">
              <Sparkles size={13} />
              <span>08 // PHILOSOPHY & BACKGROUND</span>
            </div>
            <h2 className="mt-4 text-4xl font-extralight tracking-tight sm:text-6xl lg:text-7xl">
              Engineered with <span className="font-semibold text-white">Intention.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-zinc-400 font-normal leading-relaxed">
            A developer who views code as a holistic craft—connecting intuitive frontend experiences with resilient, scalable backend engines.
          </p>
        </div>

        {/* Story Grid */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-8">
            <p className="text-xl sm:text-2xl font-light leading-relaxed text-zinc-300">
              {portfolio.summary}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  sound.playHover();
                  onOpenResume?.();
                }}
                data-cursor="RESUME"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-5 py-3 text-xs font-mono tracking-wider text-white hover:border-cyan-400 hover:text-cyan-300 transition"
              >
                <FileText size={14} /> PREVIEW FULL RESUME / CV
              </button>

              <a
                href="#contact"
                data-cursor="CONTACT"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 text-xs font-bold tracking-wider text-black hover:bg-cyan-300 transition"
              >
                LET'S DISCUSS ROLES <ArrowUpRight size={14} />
              </a>
            </div>

            {/* Live GitHub Telemetry Feed */}
            <div className="pt-2">
              <GithubActivity />
            </div>
          </div>

          {/* Quick Metrics HUD with Animated Count-Up & Spotlight */}
          <div className="grid grid-cols-2 gap-4">
            <SpotlightCard className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl">
              <div
                ref={gradYear.ref as React.RefObject<HTMLDivElement>}
                className="font-mono text-3xl sm:text-4xl font-light text-cyan-400"
              >
                {gradYear.value}
              </div>
              <div className="mt-2 text-xs font-mono uppercase tracking-widest text-zinc-400">
                B.Tech Graduate
              </div>
              <div className="mt-1 text-[11px] text-zinc-500">CV Raman Global University</div>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl">
              <div
                ref={cgpa.ref as React.RefObject<HTMLDivElement>}
                className="font-mono text-3xl sm:text-4xl font-light text-emerald-400"
              >
                {cgpa.value.toFixed(1)}
              </div>
              <div className="mt-2 text-xs font-mono uppercase tracking-widest text-zinc-400">
                B.Tech CGPA
              </div>
              <div className="mt-1 text-[11px] text-zinc-500">Computer Science & Engg</div>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl">
              <div
                ref={systems.ref as React.RefObject<HTMLDivElement>}
                className="font-mono text-3xl sm:text-4xl font-light text-indigo-400"
              >
                0{systems.value}+
              </div>
              <div className="mt-2 text-xs font-mono uppercase tracking-widest text-zinc-400">
                Production Systems
              </div>
              <div className="mt-1 text-[11px] text-zinc-500">Deployed Web Platforms</div>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl">
              <div
                ref={certs.ref as React.RefObject<HTMLDivElement>}
                className="font-mono text-3xl sm:text-4xl font-light text-amber-400"
              >
                0{certs.value}
              </div>
              <div className="mt-2 text-xs font-mono uppercase tracking-widest text-zinc-400">
                Certifications
              </div>
              <div className="mt-1 text-[11px] text-zinc-500">IIT Kanpur, Google, Palo Alto</div>
            </SpotlightCard>
          </div>
        </div>

        {/* 4 Core Pillars with Spotlights */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <SpotlightCard
                key={v.num}
                enableTilt
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/40"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-cyan-400 font-bold">{v.num}</span>
                  <Icon size={16} className="text-zinc-400" />
                </div>
                <h3 className="mt-5 text-lg font-medium text-white">{v.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">{v.desc}</p>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
