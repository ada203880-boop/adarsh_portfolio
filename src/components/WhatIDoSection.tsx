import { useState } from 'react';
import {
  Code2, Palette, Terminal, Database, Globe, BrainCircuit,
  ArrowRight, Sparkles
} from 'lucide-react';
import { sound } from '../lib/sound';
import { TechStackPhysics } from './TechStackPhysics';

const SERVICES = [
  {
    num: '01',
    icon: Code2,
    title: 'Full-Stack Web Development',
    desc: 'Building complete web applications that connect responsive React.js interfaces with dependable Node.js / Express.js server logic, MySQL database operations, and REST API integrations.',
    tags: ['React.js', 'Node.js', 'Express.js'],
  },
  {
    num: '02',
    icon: Palette,
    title: 'Frontend Engineering',
    desc: 'Crafting responsive, accessible UI components with React.js, Tailwind CSS, and animation frameworks. Focus on 60fps rendering, semantic HTML, and mobile-first layouts.',
    tags: ['React.js', 'Tailwind', 'GSAP'],
  },
  {
    num: '03',
    icon: Terminal,
    title: 'Backend & REST API Engineering',
    desc: 'Implementing server-side architecture with Node.js, Express.js, structured auth flows, input validation layers, and scalable request / response lifecycle management.',
    tags: ['Node.js', 'REST APIs', 'Auth'],
  },
  {
    num: '04',
    icon: Globe,
    title: 'E-Commerce & CMS Development',
    desc: 'Architecting and customizing high-conversion online stores on WordPress + WooCommerce with product catalogues, prescription-gated checkout flows, and order automation.',
    tags: ['WordPress', 'WooCommerce', 'PHP'],
  },
  {
    num: '05',
    icon: Database,
    title: 'Database Design & Integration',
    desc: 'Modelling relational schemas in MySQL, writing optimized queries, building structured migration pipelines, and integrating data layers into full-stack applications.',
    tags: ['MySQL', 'DBMS', 'SQL'],
  },
  {
    num: '06',
    icon: BrainCircuit,
    title: 'AI & Data Pipeline Integration',
    desc: 'Wiring AI inference layers with contextual JSON configurations, integrating NumPy / Pandas data pipelines, and building structured offline-resilient fallback handling.',
    tags: ['Python', 'Pandas', 'AI APIs'],
  },
];

export function WhatIDoSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section id="services" className="relative bg-[#03060c] py-28 text-white overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-1/2 right-0 h-[600px] w-[600px] rounded-full bg-indigo-700/[0.07] blur-[160px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* ── Section Header ───────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-cyan-400 uppercase">
              <Sparkles size={13} />
              <span>02 // CAPABILITIES</span>
            </div>
            <h2 className="mt-4 text-5xl font-extralight tracking-[-0.04em] sm:text-7xl lg:text-8xl">
              WHAT<br />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-sky-400">
                I DO.
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-zinc-400 leading-relaxed font-light">
            Six engineering disciplines — from pixel-perfect interfaces to AI-wired backends and production-deployed e-commerce systems.
          </p>
        </div>

        {/* ── Capability Cards Grid ────────────────────────── */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((svc, idx) => {
            const Icon = svc.icon;
            const isActive = activeIdx === idx;

            return (
              <div
                key={svc.num}
                onMouseEnter={() => { setActiveIdx(idx); sound.playHover(); }}
                onMouseLeave={() => setActiveIdx(null)}
                data-cursor="VIEW"
                className={`group relative flex flex-col justify-between gap-8 overflow-hidden rounded-2xl border p-7 transition-all duration-500 cursor-default ${isActive
                    ? 'border-cyan-400/60 bg-gradient-to-br from-cyan-950/40 to-black shadow-[0_0_50px_rgba(6,182,212,0.2)]'
                    : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04]'
                  }`}
              >
                {/* Cyber-bracket corner decoration */}
                <span className={`absolute top-4 right-4 font-mono text-[11px] font-bold transition-colors duration-300 ${isActive ? 'text-cyan-400' : 'text-white/20'}`}>
                  [{svc.num}]
                </span>

                {/* Content */}
                <div>
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 ${isActive ? 'border-cyan-400/60 bg-cyan-900/60 text-cyan-300' : 'border-white/10 bg-zinc-900 text-white/60'
                    }`}>
                    <Icon size={20} />
                  </div>

                  <h3 className={`mt-5 text-lg font-semibold tracking-tight transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/90'}`}>
                    {svc.title}
                  </h3>

                  <p className={`mt-3 text-sm leading-relaxed transition-colors duration-300 ${isActive ? 'text-zinc-300' : 'text-zinc-500'}`}>
                    {svc.desc}
                  </p>
                </div>

                {/* Tags + Arrow */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {svc.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] transition-colors duration-300 ${isActive ? 'border-cyan-400/40 bg-cyan-900/40 text-cyan-300' : 'border-white/10 bg-zinc-900 text-zinc-400'
                          }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ArrowRight
                    size={16}
                    className={`shrink-0 transition-all duration-300 ${isActive ? 'translate-x-1 text-cyan-400' : 'text-white/20'}`}
                  />
                </div>

                {/* Bottom glow line on hover */}
                <div className={`absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-cyan-500 to-sky-400 transition-transform duration-500 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0'}`} />
              </div>
            );
          })}
        </div>

        {/* ── Tech Stack Physics Arena ─────────────────────── */}
        <div className="mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-cyan-400 uppercase">
                <Sparkles size={13} />
                <span>03 // TECH UNIVERSE</span>
              </div>
              <h2 className="mt-4 text-5xl font-extralight tracking-[-0.04em] sm:text-7xl lg:text-8xl">
                MY<br />
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-sky-400">
                  TECHSTACK.
                </span>
              </h2>
            </div>
            <p className="max-w-sm text-sm text-zinc-400 leading-relaxed font-light">
              Push the spheres with your cursor — each orbiting ball is a technology I've shipped in real products.
            </p>
          </div>

          {/* Physics Canvas */}
          <div className="mt-10 h-[520px] sm:h-[600px] lg:h-[650px] w-full rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-950/60 to-black overflow-hidden relative">
            {/* Faint radial background nebula */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.06),transparent_65%)]" />
            <TechStackPhysics />

            {/* Corner labels */}
            <div className="absolute top-4 left-5 font-mono text-[10px] text-white/20 tracking-widest pointer-events-none">
              INTERACTIVE PHYSICS ENGINE // PUSH THE BALLS ↗
            </div>
            <div className="absolute bottom-4 right-5 font-mono text-[10px] text-cyan-400/40 pointer-events-none">
              20 TECHNOLOGIES
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
