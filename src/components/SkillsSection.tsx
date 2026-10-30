import { useState } from 'react';
import {
  Code2, Server, Database, Layers, Sparkles, Atom, LayoutGrid, Globe
} from 'lucide-react';
import { sound } from '../lib/sound';
import { SpotlightCard } from './SpotlightCard';
import { TechStackPhysics } from './TechStackPhysics';
import { SkillSphere3D } from './SkillSphere3D';
import { BlurFadeText } from './BlurFadeText';

const SKILL_CATEGORIES = [
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    icon: Code2,
    description: 'Component architecture, responsive styling, and accessible interactive interfaces.',
    skills: [
      { name: 'React.js', context: 'Production portfolio & full-stack web platforms' },
      { name: 'JavaScript (ES6+)', context: 'Asynchronous event handling, DOM manipulation, REST APIs' },
      { name: 'HTML5 & Semantic Structure', context: 'Accessible DOM landmarks, forms, dialogs' },
      { name: 'CSS3 & Responsive Design', context: 'Flexbox, Grid, mobile-first queries, media handling' },
      { name: 'Tailwind CSS', context: 'Design tokens, utility-first styling, minimal bundle footprint' },
      { name: 'TypeScript', context: 'Typed component interfaces, state models, API contracts' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & API Engineering',
    icon: Server,
    description: 'Server logic, RESTful API design, authentication, and secure request validation.',
    skills: [
      { name: 'Node.js', context: 'Runtime server execution, asynchronous I/O, npm ecosystems' },
      { name: 'Express.js', context: 'Route management, middleware pipelines, CORS, rate limiting' },
      { name: 'Python', context: 'Data analysis workflows, AI inference integration, CLI utilities' },
      { name: 'PHP', context: 'Custom WooCommerce hooks, filter overrides, storefront logic' },
      { name: 'REST APIs', context: 'CRUD endpoints, HTTP status codes, structured JSON payloads' },
      { name: 'Authentication & Validation', context: 'JWT stateless tokens, password hashing, input sanitation' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases & CMS',
    icon: Database,
    description: 'Relational data models, query optimization, and e-commerce content systems.',
    skills: [
      { name: 'MySQL', context: 'Normalized tables, relational foreign keys, indexing' },
      { name: 'SQL & DBMS', context: 'Join queries, schema migrations, transactional integrity' },
      { name: 'WordPress', context: 'CMS structure, child-theme hierarchy, custom plugins' },
      { name: 'WooCommerce', context: 'Product catalogs, checkout customization, order webhooks' },
    ],
  },
  {
    id: 'tools',
    title: 'Platforms, Tools & Workflow',
    icon: Layers,
    description: 'Development environments, version control, build tools, and CI/CD automation.',
    skills: [
      { name: 'Git & GitHub', context: 'Version control, branch management, pull requests' },
      { name: 'Vite', context: 'Sub-second bundling, hot module reloading, asset compression' },
      { name: 'GitHub Actions', context: 'Automated CI/CD pipelines deploying to GitHub Pages' },
      { name: 'VS Code & Linux CLI', context: 'Primary development environment, shell commands' },
      { name: 'Postman', context: 'API route validation, endpoint debugging, payload testing' },
      { name: 'Web Audio API', context: 'Procedural browser-native sound design without audio files' },
    ],
  },
];

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'matrix' | 'physics' | 'sphere'>('matrix');

  const filteredCategories = SKILL_CATEGORIES.filter((cat) => {
    if (activeCategory === 'all') return true;
    return cat.id === activeCategory;
  });

  return (
    <section id="skills" className="relative bg-[#07060f] py-28 text-white">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute bottom-1/4 left-1/3 h-[500px] w-[500px] rounded-full bg-violet-950/[0.1] blur-[160px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-violet-400 uppercase">
              <Sparkles size={13} />
              <span>03 // TECHNICAL EXPERTISE</span>
            </div>
            <h2 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white">
              <BlurFadeText text="Demonstrated Skills &" delay={100} />{' '}
              <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-purple-400">
                <BlurFadeText text="Verified Tooling." delay={300} />
              </span>
            </h2>
          </div>
          
          {/* View Mode Toggle: Matrix vs Zero-G Physics vs 3D Sphere */}
          <div className="flex flex-wrap items-center gap-1 rounded-2xl sm:rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur-md">
            <button
              type="button"
              onClick={() => { setViewMode('matrix'); sound.playClick(); }}
              className={`flex items-center gap-1.5 rounded-full px-2.5 sm:px-3.5 py-1 sm:py-1.5 font-mono text-[11px] sm:text-xs transition-all ${
                viewMode === 'matrix'
                  ? 'bg-violet-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <LayoutGrid size={13} />
              <span>Matrix Grid</span>
            </button>
            <button
              type="button"
              onClick={() => { setViewMode('physics'); sound.playClick(); }}
              className={`flex items-center gap-1.5 rounded-full px-2.5 sm:px-3.5 py-1 sm:py-1.5 font-mono text-[11px] sm:text-xs transition-all ${
                viewMode === 'physics'
                  ? 'bg-cyan-500 text-black font-semibold shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Atom size={13} className={viewMode === 'physics' ? 'animate-spin' : ''} />
              <span>Zero-G Physics</span>
            </button>
            <button
              type="button"
              onClick={() => { setViewMode('sphere'); sound.playClick(); }}
              className={`flex items-center gap-1.5 rounded-full px-2.5 sm:px-3.5 py-1 sm:py-1.5 font-mono text-[11px] sm:text-xs transition-all ${
                viewMode === 'sphere'
                  ? 'bg-emerald-500 text-black font-semibold shadow-[0_0_15px_rgba(52,211,153,0.5)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Globe size={13} className={viewMode === 'sphere' ? 'animate-spin' : ''} />
              <span>3D Sphere</span>
            </button>
          </div>
        </div>

        {viewMode === 'sphere' ? (
          /* Interactive 3D Skill Sphere with Drag-to-Rotate + Filter by Category */
          <div className="mt-10 overflow-hidden rounded-3xl border border-emerald-500/30 bg-[#060e18]/80 p-4 sm:p-6 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,0.8)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-xs text-emerald-400 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  3D SKILL SPHERE // DRAG TO ROTATE · HOVER FOR DETAILS
                </span>
                <p className="mt-1 text-xs text-zinc-400 font-light">
                  Click a category filter below to highlight skills by domain
                </p>
              </div>
              {/* Category filters inline with sphere */}
              <div className="flex flex-wrap gap-1.5">
                {['all', 'frontend', 'backend', 'database', 'tools'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => { setActiveCategory(cat); sound.playHover(); }}
                    className={`rounded-full px-3 py-1 font-mono text-[11px] capitalize transition-colors ${
                      activeCategory === cat
                        ? 'bg-emerald-600 text-white'
                        : 'border border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative mt-4 h-[360px] sm:h-[500px] w-full rounded-2xl bg-black/40 border border-white/5 overflow-hidden">
              <SkillSphere3D activeFilter={activeCategory} />
            </div>
          </div>
        ) : viewMode === 'physics' ? (
          /* Interactive 2D Physics Playground */
          <div className="mt-10 overflow-hidden rounded-3xl border border-cyan-500/30 bg-[#0a0d18]/80 p-4 sm:p-6 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,0.8)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-xs text-cyan-400 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                  KINETIC COLLISION SIMULATOR // 20 VERIFIED TECHNOLOGIES
                </span>
                <p className="mt-1 text-xs text-zinc-400 font-light">
                  Click or drag anywhere to trigger kinetic impulses • Hover to deflect particle nodes
                </p>
              </div>
              <button
                type="button"
                onClick={() => sound.playHover()}
                className="font-mono text-[11px] text-zinc-500 hover:text-cyan-300 transition"
              >
                60 FPS Hardware Accelerated
              </button>
            </div>

            <div className="relative mt-4 h-[340px] sm:h-[440px] w-full rounded-2xl bg-black/60 border border-white/5 overflow-hidden">
              <TechStackPhysics />
            </div>
          </div>
        ) : (
          /* Matrix Grid View */
          <>
            {/* Filter Pills */}
            <div className="mt-10 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => { setActiveCategory('all'); sound.playHover(); }}
                className={`rounded-full px-4 py-1.5 font-mono text-xs transition-colors ${activeCategory === 'all'
                    ? 'bg-violet-600 text-white'
                    : 'border border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:text-white'
                  }`}
              >
                All Categories
              </button>
              {SKILL_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => { setActiveCategory(cat.id); sound.playHover(); }}
                  className={`rounded-full px-4 py-1.5 font-mono text-xs transition-colors ${activeCategory === cat.id
                      ? 'bg-violet-600 text-white'
                      : 'border border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:text-white'
                    }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>

            {/* Skills Grid */}
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {filteredCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <SpotlightCard
                    key={cat.id}
                    className="rounded-2xl border border-white/[0.08] bg-[#0c0a1f]/70 p-6 sm:p-7 backdrop-blur-xl"
                  >
                    <div className="flex items-center gap-3 border-b border-white/[0.06] pb-4">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-500/30 bg-violet-950/30 text-violet-300">
                        <Icon size={18} />
                      </span>
                      <div>
                        <h3 className="text-base font-medium text-white">{cat.title}</h3>
                        <p className="text-xs text-zinc-400 font-light">{cat.description}</p>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {cat.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 transition-colors hover:border-violet-500/30"
                        >
                          <div className="font-mono text-xs font-semibold text-white">
                            {skill.name}
                          </div>
                          <div className="mt-1 text-[11px] text-zinc-400 font-light leading-snug">
                            {skill.context}
                          </div>
                        </div>
                      ))}
                    </div>
                  </SpotlightCard>
                );
              })}
            </div>
          </>
        )}

        {/* Verification Summary Note */}
        <div className="mt-10 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-xs font-mono text-zinc-400 flex items-center justify-between flex-wrap gap-3">
          <span>✓ All listed technologies supported by verifiable repository commits and project files</span>
          <span className="text-violet-400">0% Fabricated Rankings</span>
        </div>
      </div>
    </section>
  );
}
