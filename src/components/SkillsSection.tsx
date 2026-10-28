import { useState } from 'react';
import { Sparkles, Terminal, Code2, Database, Palette, BrainCircuit, Layers, Server } from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { sound } from '../lib/sound';

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categoryIcons: Record<string, typeof Code2> = {
    Languages: Code2,
    Frontend: Palette,
    Backend: Server,
    'Databases & CMS': Database,
    'Data & AI': BrainCircuit,
    'Tools & Cloud': Layers,
  };

  const categories = ['ALL', ...Object.keys(portfolio.skills)];

  const filteredEntries = Object.entries(portfolio.skills).filter(([cat]) => {
    if (activeCategory === 'ALL') return true;
    return cat === activeCategory;
  });

  return (
    <section id="skills" className="relative min-h-screen bg-[#03060c] py-28 text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-indigo-600/[0.08] blur-[150px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-cyan-400 uppercase">
              <Sparkles size={13} />
              <span>03 // TECHNICAL TELEMETRY</span>
            </div>
            <h2 className="mt-4 text-4xl font-extralight tracking-tight sm:text-6xl lg:text-7xl">
              Languages, Engines & <span className="font-semibold text-white">Frameworks.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-zinc-400 font-normal leading-relaxed">
            A comprehensive, production-tested toolkit spanning frontend rendering, server-side REST APIs, database schemas, and AI integrations.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-12 flex flex-wrap gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                sound.playHover();
              }}
              data-cursor="FILTER"
              className={`rounded-full border px-4 py-2 font-mono text-xs tracking-wider transition-all duration-300 ${activeCategory === cat
                  ? 'border-cyan-400 bg-cyan-500/10 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                  : 'border-white/10 bg-white/[0.02] text-white/50 hover:border-white/30 hover:text-white'
                }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEntries.map(([category, skillList]) => {
            const Icon = categoryIcons[category] || Terminal;

            return (
              <div
                key={category}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition-all duration-500 hover:border-cyan-400/50 hover:bg-white/[0.04] hover:shadow-[0_10px_40px_rgba(6,182,212,0.12)] backdrop-blur-xl"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-950/40 text-cyan-300 transition-transform group-hover:scale-110">
                      <Icon size={18} />
                    </span>
                    <h3 className="font-mono text-xs font-bold tracking-widest text-white uppercase">
                      {category}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-500">
                    {skillList.length} MODULES
                  </span>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {skillList.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-white/10 bg-zinc-900/80 px-3 py-1.5 font-mono text-xs text-zinc-300 transition-all hover:border-cyan-400/60 hover:text-white hover:bg-cyan-950/40"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
