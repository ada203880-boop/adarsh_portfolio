import { Trophy, CheckCircle, Zap, Sparkles } from 'lucide-react';
import { sound } from '../lib/sound';

interface Achievement {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  year: string;
  xp: number;
  category: 'DEGREE' | 'PRODUCTION' | 'SECURITY' | 'FULL-STACK' | 'AI';
  color: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'scholar',
    icon: '🎓',
    title: 'Scholar Unlocked',
    subtitle: 'B.Tech Computer Science & Engineering from CV Raman Global University with 7.6 / 10 CGPA.',
    year: '2021 — 2025',
    xp: 1500,
    category: 'DEGREE',
    color: '#38bdf8',
  },
  {
    id: 'prod-deploy',
    icon: '🚀',
    title: 'First Production Deploy',
    subtitle: 'Launched live e-pharmacy Rabindra Medical Hall (rabindramedicalhall.in) serving real patients.',
    year: '2024',
    xp: 2000,
    category: 'PRODUCTION',
    color: '#00e5ff',
  },
  {
    id: 'woo-architect',
    icon: '💊',
    title: 'E-Commerce Architect',
    subtitle: 'Custom WooCommerce checkout, prescription verification safeguards & automated WhatsApp alert flow.',
    year: '2024',
    xp: 1200,
    category: 'PRODUCTION',
    color: '#10b981',
  },
  {
    id: 'ai-fitness',
    icon: '🤖',
    title: 'AI Integration Pioneer',
    subtitle: 'Engineered FORGE Fitness with AI-driven nutrition coaching, workout planning & REST persistence.',
    year: '2024',
    xp: 1400,
    category: 'AI',
    color: '#a855f7',
  },
  {
    id: 'cyber-guard',
    icon: '🛡️',
    title: 'Certified Cyber Guardian',
    subtitle: 'Practical Cyber Security certification from NPTEL & IIT Kanpur for robust defensive engineering.',
    year: '2023',
    xp: 1000,
    category: 'SECURITY',
    color: '#f43f5e',
  },
  {
    id: 'cloud-sec',
    icon: '☁️',
    title: 'Cloud Security Cleared',
    subtitle: 'Palo Alto Networks Cloud Security Fundamentals — zero trust, IAM & cloud network defense.',
    year: '2023',
    xp: 800,
    category: 'SECURITY',
    color: '#f59e0b',
  },
  {
    id: 'ux-cert',
    icon: '🎨',
    title: 'UX Foundations Mastered',
    subtitle: 'Google Foundations of User Experience (UX) Design — wireframing, empathy mapping & usability.',
    year: '2023',
    xp: 700,
    category: 'FULL-STACK',
    color: '#ec4899',
  },
  {
    id: 'data-sci',
    icon: '📊',
    title: 'Industrial Data Science',
    subtitle: 'LearnWik Solutions industrial training covering Python data pipelines, NumPy, Pandas & ML workflows.',
    year: '2022',
    xp: 900,
    category: 'AI',
    color: '#6366f1',
  },
  {
    id: 'rest-master',
    icon: '⚡',
    title: 'REST API & Systems Builder',
    subtitle: 'Architected robust Node.js/Express REST endpoints with JWT authentication and MySQL migrations.',
    year: '2024',
    xp: 1100,
    category: 'FULL-STACK',
    color: '#06b6d4',
  },
  {
    id: 'fullstack-seal',
    icon: '🌐',
    title: 'Full-Stack Complete',
    subtitle: 'End-to-end fluency spanning React 19 UI, TypeScript, Tailwind CSS, Node.js backend, and relational databases.',
    year: '2024 — 2025',
    xp: 1400,
    category: 'FULL-STACK',
    color: '#10b981',
  },
];

export function AchievementsSection() {
  const totalXp = ACHIEVEMENTS.reduce((acc, curr) => acc + curr.xp, 0);

  return (
    <section id="achievements" className="relative w-full max-w-full overflow-hidden bg-[#03060c] py-20 sm:py-28 text-white">
      {/* Background ambient gamer glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-cyan-600/[0.04] blur-[180px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-cyan-400 uppercase">
              <Sparkles size={13} />
              <span>HONORS & ACHIEVEMENTS</span>
            </div>
            <h2 className="mt-4 text-4xl sm:text-6xl lg:text-7xl font-extralight tracking-tight">
              Career 
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-emerald-300">
                Milestones.
              </span>
            </h2>
          </div>

          {/* XP Level Bar & Stats */}
          <div className="flex flex-col gap-2.5 max-w-sm w-full">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="flex items-center gap-1.5 text-amber-300">
                <Trophy size={14} /> LEVEL 10 DEVELOPER
              </span>
              <span className="text-cyan-400 font-bold">{totalXp.toLocaleString()} / {totalXp.toLocaleString()} XP</span>
            </div>
            {/* Progress bar */}
            <div className="h-2.5 w-full rounded-full bg-white/10 overflow-hidden p-0.5 border border-white/15">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-300 shadow-[0_0_15px_rgba(34,211,238,0.8)]"
                style={{ width: '100%' }}
              />
            </div>
            <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400">
              <span>UNLOCKED: 10 / 10 ACHIEVEMENTS</span>
              <span className="text-emerald-400 font-semibold">100% COMPLETION</span>
            </div>
          </div>
        </div>

        {/* Achievement Grid */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {ACHIEVEMENTS.map((a) => (
            <div
              key={a.id}
              onMouseEnter={() => sound.playHover()}
              className="group relative flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 backdrop-blur-md transition-all duration-300 hover:scale-[1.01] hover:border-cyan-500/40 hover:bg-white/[0.04] shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
            >
              {/* Left Emoji Badge */}
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)] border border-white/15"
                style={{
                  background: `linear-gradient(135deg, ${a.color}25 0%, #000000 100%)`,
                }}
              >
                <span>{a.icon}</span>
              </div>

              {/* Main Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors truncate">
                      {a.title}
                    </h3>
                  </div>
                  <span className="rounded-full bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 font-mono text-[9px] font-bold text-emerald-400 shrink-0 flex items-center gap-1">
                    <CheckCircle size={10} /> UNLOCKED
                  </span>
                </div>

                <p className="mt-1 text-xs text-zinc-400 leading-relaxed font-light">
                  {a.subtitle}
                </p>

                <div className="mt-3 flex items-center justify-between border-t border-white/[0.05] pt-2 font-mono text-[10px]">
                  <span className="text-zinc-500">{a.year}</span>
                  <span className="flex items-center gap-1 font-semibold text-amber-300">
                    <Zap size={11} /> +{a.xp} XP
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
