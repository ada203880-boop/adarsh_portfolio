import { GraduationCap, BriefcaseBusiness, Award, Code2, Sparkles, ArrowUpRight } from 'lucide-react';

const TIMELINE = [
  {
    period: 'PRESENT',
    label: 'NOW',
    color: 'emerald',
    icon: Code2,
    title: 'Full-Stack Developer',
    org: 'Available for Opportunities',
    desc: 'Seeking full-stack, frontend, or software engineering roles. Building personal systems with React.js, Node.js, Python, and MySQL.',
    tags: ['Open to Work', 'Full-Stack', 'Remote / Hybrid'],
  },
  {
    period: '2021 — 2025',
    label: 'B.TECH',
    color: 'cyan',
    icon: GraduationCap,
    title: 'B.Tech — Computer Science & Engineering',
    org: 'CV Raman Global University, Bhubaneswar, Odisha',
    desc: 'Core coursework in Data Structures, OOPS, Operating Systems, DBMS, and Web Engineering. CGPA 7.6 / 10.',
    tags: ['CGPA 7.6 / 10', 'CSE', 'Bhubaneswar'],
  },
  {
    period: '2021 — 2025',
    label: 'PROJECTS',
    color: 'indigo',
    icon: BriefcaseBusiness,
    title: 'Rabindra Medical Hall',
    org: 'Production E-Commerce Pharmacy System',
    desc: 'Engineered a responsive e-pharmacy storefront with prescription validation, WhatsApp order alerts, and WooCommerce + PHP backend.',
    tags: ['WordPress', 'WooCommerce', 'PHP', 'MySQL'],
    link: 'https://ravindramedicalhall.in',
  },
  {
    period: '2023 — 2024',
    label: 'AI PROJECT',
    color: 'purple',
    icon: BriefcaseBusiness,
    title: 'FORGE Fitness',
    org: 'AI-Powered Health & Biometrics Platform',
    desc: 'Python REST API backend for AI-guided workout planning, nutrition tracking, biometric log processing, and structured MySQL data migrations.',
    tags: ['Python', 'REST APIs', 'MySQL', 'AI'],
  },
  {
    period: '2023 — 2024',
    label: 'CERTS',
    color: 'amber',
    icon: Award,
    title: 'Professional Certifications',
    org: 'NPTEL · Google · Palo Alto · LearnWik',
    desc: 'Practical Cyber Security (NPTEL / IIT Kanpur), Data Science (LearnWik), Cloud Security (Palo Alto Networks via Coursera), UX Design (Google via Coursera).',
    tags: ['Cyber Security', 'Data Science', 'UX Design', 'Cloud'],
  },
  {
    period: '2018 — 2020',
    label: '12TH',
    color: 'zinc',
    icon: GraduationCap,
    title: 'Class XII — Intermediate',
    org: 'Suddhananda Vidyalaya, Cuttack, Odisha',
    desc: 'Completed Intermediate education with a science focus, building foundational knowledge in mathematics and physics.',
    tags: ['Science', 'Cuttack'],
  },
];

const COLOR_MAP: Record<string, { border: string; bg: string; dot: string; badge: string; text: string }> = {
  emerald: {
    border: 'border-emerald-500/50',
    bg: 'bg-emerald-950/20 hover:bg-emerald-950/40',
    dot: 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]',
    badge: 'border-emerald-500/30 bg-emerald-900/30 text-emerald-300',
    text: 'text-emerald-400',
  },
  cyan: {
    border: 'border-cyan-500/50',
    bg: 'bg-cyan-950/20 hover:bg-cyan-950/40',
    dot: 'bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]',
    badge: 'border-cyan-500/30 bg-cyan-900/30 text-cyan-300',
    text: 'text-cyan-400',
  },
  indigo: {
    border: 'border-indigo-500/50',
    bg: 'bg-indigo-950/20 hover:bg-indigo-950/40',
    dot: 'bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.9)]',
    badge: 'border-indigo-500/30 bg-indigo-900/30 text-indigo-300',
    text: 'text-indigo-400',
  },
  purple: {
    border: 'border-purple-500/50',
    bg: 'bg-purple-950/20 hover:bg-purple-950/40',
    dot: 'bg-purple-400 shadow-[0_0_12px_rgba(192,132,252,0.9)]',
    badge: 'border-purple-500/30 bg-purple-900/30 text-purple-300',
    text: 'text-purple-400',
  },
  amber: {
    border: 'border-amber-500/50',
    bg: 'bg-amber-950/20 hover:bg-amber-950/40',
    dot: 'bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.9)]',
    badge: 'border-amber-500/30 bg-amber-900/30 text-amber-300',
    text: 'text-amber-400',
  },
  zinc: {
    border: 'border-zinc-600/50',
    bg: 'bg-zinc-900/20 hover:bg-zinc-900/40',
    dot: 'bg-zinc-500',
    badge: 'border-zinc-600/30 bg-zinc-800/30 text-zinc-400',
    text: 'text-zinc-400',
  },
};

export function CareerTimeline() {
  return (
    <section id="journey" className="relative w-full max-w-full overflow-hidden bg-[#03060c] py-20 sm:py-28 text-white">
      <div className="pointer-events-none absolute top-1/4 left-0 h-[600px] w-[500px] rounded-full bg-cyan-700/[0.05] blur-[160px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-cyan-400 uppercase">
              <Sparkles size={13} />
              <span>04 // CAREER & EXPERIENCE</span>
            </div>
            <h2 className="mt-4 text-4xl font-extralight tracking-[-0.04em] sm:text-7xl lg:text-8xl">
              MY CAREER &<br />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-sky-400">
                JOURNEY.
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-zinc-400 leading-relaxed font-light">
            From academic foundations to production deployments, certifications, and engineering milestones.
          </p>
        </div>

        {/* Timeline */}
        <div className="mt-16 relative">

          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-gradient-to-b from-cyan-500/50 via-white/10 to-transparent sm:left-8" />

          <div className="space-y-6 pl-14 sm:pl-20">
            {TIMELINE.map((item, idx) => {
              const Icon = item.icon;
              const c = COLOR_MAP[item.color];

              return (
                <div key={idx} className="relative group">
                  {/* Timeline dot */}
                  <div className={`absolute -left-[2.1rem] top-6 sm:-left-[2.85rem] flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#03060c] ${c.dot}`} />

                  {/* Period label */}
                  <div className={`mb-2 font-mono text-[10px] tracking-[0.3em] uppercase ${c.text}`}>
                    {item.period}
                  </div>

                  {/* Card */}
                  <div className={`relative overflow-hidden rounded-2xl border p-7 transition-all duration-400 ${c.border} ${c.bg} backdrop-blur-sm`}>

                    {/* Corner label badge */}
                    <span className={`absolute top-4 right-5 rounded-full border px-2.5 py-0.5 font-mono text-[9px] tracking-widest ${c.badge}`}>
                      {item.label}
                    </span>

                    <div className="flex items-start gap-4">
                      <span className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${c.border} ${c.bg}`}>
                        <Icon size={18} className={c.text} />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-white tracking-tight pr-20">
                          {item.title}
                        </h3>
                        <p className={`mt-0.5 font-mono text-xs ${c.text}`}>
                          {item.org}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                          {item.desc}
                        </p>

                        {/* Tech Tags */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span key={tag} className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] ${c.badge}`}>
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Link */}
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                            className={`mt-4 inline-flex items-center gap-1.5 font-mono text-xs underline-offset-4 hover:underline ${c.text} transition`}
                          >
                            Visit Live Site <ArrowUpRight size={13} />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Left accent bar */}
                    <div className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl ${c.dot.split(' ')[0]}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
