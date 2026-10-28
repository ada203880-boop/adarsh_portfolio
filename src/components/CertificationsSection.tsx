import { Award, Shield, Cpu, Cloud, Palette, CheckCircle2, Sparkles } from 'lucide-react';

const CERTIFICATIONS = [
  {
    id: 'nptel',
    num: '01',
    name: 'Practical Cyber Security for Cyber Security Practitioners',
    issuer: 'NPTEL — IIT Kanpur',
    category: 'CYBER SECURITY',
    color: 'rose',
    icon: Shield,
    description:
      'Comprehensive course covering network security principles, threat analysis, vulnerability assessment, and practical defense strategies for real-world systems.',
    skills: ['Network Security', 'Threat Analysis', 'Vulnerability Assessment', 'Ethical Hacking'],
  },
  {
    id: 'learnwik',
    num: '02',
    name: 'Industrial Training in Data Science',
    issuer: 'LearnWik Solutions Pvt. Ltd.',
    category: 'DATA SCIENCE',
    color: 'cyan',
    icon: Cpu,
    description:
      'Hands-on industrial training covering Python-based data analysis, NumPy and Pandas pipelines, exploratory data analysis, and introductory machine learning workflows.',
    skills: ['Python', 'NumPy', 'Pandas', 'Machine Learning', 'EDA'],
  },
  {
    id: 'paloalto',
    num: '03',
    name: 'Cloud Security Fundamentals',
    issuer: 'Palo Alto Networks via Coursera',
    category: 'CLOUD SECURITY',
    color: 'orange',
    icon: Cloud,
    description:
      'Foundational cloud security curriculum covering identity & access management, secure cloud architecture principles, and network protection in modern cloud environments.',
    skills: ['IAM', 'Cloud Architecture', 'Zero Trust', 'Network Protection'],
  },
  {
    id: 'google',
    num: '04',
    name: 'Foundations of User Experience (UX) Design',
    issuer: 'Google via Coursera',
    category: 'UX DESIGN',
    color: 'emerald',
    icon: Palette,
    description:
      'Google-authored course on UX design thinking — covering user research, wireframing, usability testing, and inclusive design principles for digital products.',
    skills: ['UX Research', 'Wireframing', 'Usability Testing', 'Inclusive Design'],
  },
];

const COLOR_MAP: Record<string, { border: string; bg: string; badge: string; icon: string; num: string; glow: string }> = {
  rose:    { border: 'border-rose-500/30',    bg: 'bg-rose-950/15 hover:bg-rose-950/30',    badge: 'border-rose-500/30 bg-rose-900/30 text-rose-300',       icon: 'text-rose-400',    num: 'text-rose-400/50',    glow: 'bg-rose-500/10'    },
  cyan:    { border: 'border-cyan-500/30',    bg: 'bg-cyan-950/15 hover:bg-cyan-950/30',    badge: 'border-cyan-500/30 bg-cyan-900/30 text-cyan-300',       icon: 'text-cyan-400',    num: 'text-cyan-400/50',    glow: 'bg-cyan-500/10'    },
  orange:  { border: 'border-orange-500/30',  bg: 'bg-orange-950/15 hover:bg-orange-950/30', badge: 'border-orange-500/30 bg-orange-900/30 text-orange-300', icon: 'text-orange-400',  num: 'text-orange-400/50',  glow: 'bg-orange-500/10'  },
  emerald: { border: 'border-emerald-500/30', bg: 'bg-emerald-950/15 hover:bg-emerald-950/30', badge: 'border-emerald-500/30 bg-emerald-900/30 text-emerald-300', icon: 'text-emerald-400', num: 'text-emerald-400/50', glow: 'bg-emerald-500/10' },
};

export function CertificationsSection() {
  return (
    <section id="certifications" className="relative bg-[#03060c] py-28 text-white overflow-hidden">
      <div className="pointer-events-none absolute bottom-1/3 right-0 h-[600px] w-[600px] rounded-full bg-amber-700/[0.05] blur-[180px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-amber-400 uppercase">
              <Sparkles size={13} />
              <span>05 // VERIFIED CREDENTIALS</span>
            </div>
            <h2 className="mt-4 text-5xl font-extralight tracking-[-0.04em] sm:text-7xl lg:text-8xl">
              MY<br />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-orange-300">
                CERTIFICATIONS.
              </span>
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            <p className="max-w-sm text-sm text-zinc-400 leading-relaxed font-light">
              Accredited specializations from IIT Kanpur, Google, and Palo Alto Networks — spanning cyber security, cloud, data science, and UX.
            </p>
            <div className="mt-2 inline-flex items-center gap-2 self-start rounded-full border border-amber-400/30 bg-amber-950/20 px-3 py-1 font-mono text-[10px] text-amber-300">
              <Award size={12} /> 4 PROFESSIONAL CERTIFICATIONS
            </div>
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {CERTIFICATIONS.map((cert) => {
            const c = COLOR_MAP[cert.color];
            const Icon = cert.icon;

            return (
              <div
                key={cert.id}
                className={`group relative overflow-hidden rounded-2xl border p-7 sm:p-8 transition-all duration-400 backdrop-blur-xl ${c.border} ${c.bg}`}
              >
                {/* Ambient glow on hover */}
                <div className={`pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${c.glow}`} />

                {/* Top Row */}
                <div className="relative flex items-start justify-between gap-4 mb-6">
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${c.border} bg-black/40 ${c.icon}`}>
                    <Icon size={22} />
                  </span>

                  <div className="flex items-center gap-2">
                    <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[9px] tracking-widest ${c.badge}`}>
                      {cert.category}
                    </span>
                    <span className={`font-mono text-2xl font-extralight ${c.num}`}>
                      {cert.num}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-lg font-semibold text-white leading-snug tracking-tight">
                    {cert.name}
                  </h3>
                  <p className={`mt-1.5 font-mono text-xs ${c.icon}`}>{cert.issuer}</p>

                  <p className="mt-4 text-sm leading-relaxed text-zinc-400 font-light">
                    {cert.description}
                  </p>

                  {/* Skill Pills */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <span key={skill} className="flex items-center gap-1 rounded-full border border-white/10 bg-zinc-900/80 px-2.5 py-1 font-mono text-[10px] text-zinc-300">
                        <CheckCircle2 size={10} className={c.icon} /> {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Left accent bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl opacity-60 group-hover:opacity-100 transition-opacity ${
                  cert.color === 'rose'    ? 'bg-rose-400'    :
                  cert.color === 'cyan'    ? 'bg-cyan-400'    :
                  cert.color === 'orange'  ? 'bg-orange-400'  :
                  'bg-emerald-400'
                }`} />
              </div>
            );
          })}
        </div>

        {/* Issuers footer strip */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 border-t border-white/10 pt-10">
          {['NPTEL · IIT KANPUR', 'LEARNWIK SOLUTIONS', 'PALO ALTO NETWORKS · COURSERA', 'GOOGLE · COURSERA'].map((org) => (
            <span key={org} className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
              {org}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
