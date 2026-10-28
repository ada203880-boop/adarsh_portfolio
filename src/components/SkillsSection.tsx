import { useState, useRef, useEffect } from 'react';
import {
  Sparkles, Code2, Database, Palette, BrainCircuit, Layers, Server,
} from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { sound } from '../lib/sound';

/* ─── Skill level map ─────────────────────────────────────── */
const SKILL_LEVELS: Record<string, number> = {
  // Languages
  JavaScript: 90, Python: 80, Java: 65, 'C++': 60, PHP: 70,
  // Frontend
  HTML5: 95, CSS3: 90, 'React.js': 88, 'Responsive Web Design': 85,
  // Backend
  'Node.js': 82, 'Express.js': 80, 'REST APIs': 85, Authentication: 78, 'Input Validation': 75,
  // DB & CMS
  MySQL: 80, SQL: 82, DBMS: 75, WordPress: 85, WooCommerce: 82,
  // Data & AI
  Pandas: 72, NumPy: 70, 'Machine Learning': 65, 'AI Integration': 68,
  // Tools
  Git: 88, GitHub: 88, 'VS Code': 92, 'AWS Fundamentals': 55,
};

const CATEGORY_META: Record<string, { icon: typeof Code2; color: string; bg: string; bar: string }> = {
  Languages: { icon: Code2, color: 'text-violet-400', bg: 'bg-violet-950/20 border-violet-500/25', bar: 'from-violet-500 to-violet-400' },
  Frontend: { icon: Palette, color: 'text-cyan-400', bg: 'bg-cyan-950/20 border-cyan-500/25', bar: 'from-cyan-500 to-sky-400' },
  Backend: { icon: Server, color: 'text-emerald-400', bg: 'bg-emerald-950/20 border-emerald-500/25', bar: 'from-emerald-500 to-teal-400' },
  'Databases & CMS': { icon: Database, color: 'text-amber-400', bg: 'bg-amber-950/20 border-amber-500/25', bar: 'from-amber-500 to-yellow-400' },
  'Data & AI': { icon: BrainCircuit, color: 'text-rose-400', bg: 'bg-rose-950/20 border-rose-500/25', bar: 'from-rose-500 to-pink-400' },
  'Tools & Cloud': { icon: Layers, color: 'text-indigo-400', bg: 'bg-indigo-950/20 border-indigo-500/25', bar: 'from-indigo-500 to-blue-400' },
};

/* ─── Animated bar ────────────────────────────────────────── */
function SkillBar({
  name, level, barClass, delay,
}: { name: string; level: number; barClass: string; delay: number }) {
  const barRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(level), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [level, delay]);

  return (
    <div ref={barRef} className="group">
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-mono text-[11px] text-white/80 tracking-wide group-hover:text-white transition-colors">
          {name}
        </span>
        <span className="font-mono text-[10px] text-white/40 tabular-nums">{level}%</span>
      </div>
      <div className="h-[3px] w-full rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${barClass} transition-all ease-out`}
          style={{ width: `${width}%`, transitionDuration: '1.1s' }}
        />
      </div>
    </div>
  );
}

/* ─── Main Component ──────────────────────────────────────── */
export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const categories = ['ALL', ...Object.keys(portfolio.skills)];

  const filteredEntries = Object.entries(portfolio.skills).filter(([cat]) =>
    activeCategory === 'ALL' ? true : cat === activeCategory,
  );

  return (
    <section id="skills" className="relative bg-[#03060c] py-28 text-white overflow-hidden">
      {/* Glow */}
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-indigo-600/[0.07] blur-[150px]" />
      <div className="pointer-events-none absolute top-1/3 left-0 h-[400px] w-[400px] rounded-full bg-violet-600/[0.05] blur-[130px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-violet-400 uppercase">
              <Sparkles size={13} />
              <span>04 // CAPABILITY MATRIX</span>
            </div>
            <h2 className="mt-4 text-5xl font-extralight tracking-[-0.04em] sm:text-7xl lg:text-8xl">
              MY<br />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-white to-cyan-300">
                SKILLS.
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-zinc-400 leading-relaxed font-light">
            A living matrix of languages, frameworks, and tools — refined through real production systems.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((cat) => {
            const meta = cat !== 'ALL' ? CATEGORY_META[cat] : null;
            const Icon = meta?.icon;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); sound.playHover(); }}
                className={`
                  flex items-center gap-1.5 rounded-full border px-4 py-1.5
                  font-mono text-[10px] tracking-widest uppercase transition-all duration-200
                  ${isActive
                    ? 'border-white/30 bg-white/10 text-white shadow-[0_0_12px_rgba(255,255,255,0.1)]'
                    : 'border-white/10 bg-white/[0.03] text-white/40 hover:border-white/20 hover:text-white/70'}
                `}
              >
                {Icon && <Icon size={10} className={isActive ? 'text-white' : (meta?.color ?? '')} />}
                {cat === 'ALL' ? 'All Skills' : cat}
              </button>
            );
          })}
        </div>

        {/* Skill cards grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEntries.map(([category, skills], ci) => {
            const meta = CATEGORY_META[category];
            const Icon = meta?.icon ?? Code2;
            return (
              <div
                key={category}
                className={`
                  rounded-2xl border p-6 backdrop-blur-sm
                  transition-all duration-300 hover:scale-[1.01]
                  ${meta?.bg ?? 'bg-white/[0.03] border-white/10'}
                `}
                style={{ animationDelay: `${ci * 80}ms` }}
              >
                {/* Card header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] ${meta?.color ?? 'text-white'}`}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className={`font-mono text-[10px] uppercase tracking-widest ${meta?.color ?? 'text-white/50'}`}>
                      {category}
                    </p>
                    <p className="font-mono text-[9px] text-white/30">
                      {(skills as readonly string[]).length} skills
                    </p>
                  </div>
                </div>

                {/* Skill bars */}
                <div className="flex flex-col gap-4">
                  {(skills as readonly string[]).map((skill, si) => (
                    <SkillBar
                      key={skill}
                      name={skill}
                      level={SKILL_LEVELS[skill] ?? 70}
                      barClass={meta?.bar ?? 'from-white to-white/50'}
                      delay={ci * 80 + si * 60}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats strip */}
        <div className="mt-14 grid grid-cols-3 gap-4 sm:grid-cols-6">
          {[
            { num: '24+', label: 'Technologies' },
            { num: '6', label: 'Categories' },
            { num: '2', label: 'Live Projects' },
            { num: '4', label: 'Certifications' },
            { num: '4', label: 'Years Study' },
            { num: '∞', label: 'Learning' },
          ].map(({ num, label }) => (
            <div
              key={label}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-4 text-center"
            >
              <p className="font-mono text-2xl font-light text-white">{num}</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-white/40">{label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
