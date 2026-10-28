import { GraduationCap, Award, Code2, BriefcaseBusiness, Mail, Sparkles, Shield, Cpu, Cloud, Palette } from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { RadialOrbitalTimeline } from './ui/radial-orbital-timeline';
import type { TimelineItem } from './ui/radial-orbital-timeline';

export function ExperienceSection() {
  const p = portfolio;

  const orbitalItems: TimelineItem[] = [
    {
      id: 'profile',
      title: 'Current Focus',
      date: 'PRESENT // 2026',
      category: 'ENGINEERING',
      icon: <Code2 size={16} />,
      relatedIds: ['education', 'skills'],
      content: (
        <span>
          Full-Stack Developer engineering end-to-end applications with React.js, Python, Node.js, and SQL. Focus on high-reliability, clean architecture, and responsive UX.
        </span>
      ),
    },
    {
      id: 'education',
      title: 'B.Tech CSE',
      date: '2021 — 2025',
      category: 'ACADEMICS',
      icon: <GraduationCap size={16} />,
      relatedIds: ['profile', 'skills', 'certifications'],
      content: (
        <span>
          <strong>{p.education[0].institution}</strong> — Bhubaneswar, Odisha.
          <br />
          Computer Science & Engineering · <span className="text-cyan-400 font-semibold">{p.education[0].detail}</span>
          <br />
          <span className="text-xs text-zinc-400 mt-1 block">
            Focus: Data Structures, OOPS, Operating Systems, DBMS & Web Engineering.
          </span>
        </span>
      ),
    },
    {
      id: 'rmh',
      title: 'Pharmacy System',
      date: 'PRODUCTION',
      category: 'DEPLOYED WORK',
      icon: <BriefcaseBusiness size={16} />,
      relatedIds: ['profile', 'forge'],
      content: (
        <span>
          <strong>{p.projects[0].name}</strong> — {p.projects[0].subtitle}.
          <br />
          Custom WordPress & WooCommerce architecture with prescription safeguards and WhatsApp dispatch.
        </span>
      ),
    },
    {
      id: 'forge',
      title: 'FORGE Platform',
      date: 'AI ARCHITECTURE',
      category: 'AI SYSTEM',
      icon: <Cpu size={16} />,
      relatedIds: ['rmh', 'certifications'],
      content: (
        <span>
          <strong>{p.projects[1].name}</strong> — {p.projects[1].subtitle}.
          <br />
          Python backend, REST APIs, persistent data models, and intelligent fitness recommendation logic.
        </span>
      ),
    },
    {
      id: 'certifications',
      title: 'Certifications',
      date: 'ACCREDITED',
      category: 'CREDENTIALS',
      icon: <Award size={16} />,
      relatedIds: ['education', 'contact'],
      content: (
        <span>
          Certified in <strong>Cyber Security</strong> (NPTEL, IIT Kanpur), <strong>Data Science</strong> (LearnWik),{' '}
          <strong>Cloud Security</strong> (Palo Alto Networks), and <strong>UX Design</strong> (Google).
        </span>
      ),
    },
    {
      id: 'contact',
      title: 'Open Radar',
      date: 'NOW',
      category: 'STATUS',
      icon: <Mail size={16} />,
      relatedIds: ['profile', 'certifications'],
      content: (
        <span>
          Actively interviewing and open for software developer, full-stack, and frontend engineering roles.
          <br />
          Coordinates: <span className="text-cyan-400">{p.email}</span> · {p.location}.
        </span>
      ),
    },
  ];

  return (
    <section id="journey" className="relative min-h-screen bg-[#03060c] py-28 text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-cyan-400 uppercase">
              <Sparkles size={13} />
              <span>02 // CAREER RADIAL UNIVERSE</span>
            </div>
            <h2 className="mt-4 text-4xl font-extralight tracking-tight sm:text-6xl lg:text-7xl">
              Journey, Systems & <span className="font-semibold text-white">Growth.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-zinc-400 font-normal leading-relaxed">
            Interact with the celestial orbital wheel to navigate through academic milestones, deployed projects, verified credentials, and active focus.
          </p>
        </div>

        {/* The Radial Timeline */}
        <div className="mt-14">
          <RadialOrbitalTimeline items={orbitalItems} />
        </div>

        {/* Education & Certifications Hologram Cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {/* Education Card */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
                <GraduationCap size={16} /> ACADEMIC FOUNDATION
              </div>
              <span className="font-mono text-xs text-white/40">2021 — 2025</span>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-medium text-white">{p.education[0].title}</h3>
              <p className="mt-1 text-sm text-zinc-400">{p.education[0].institution} · {p.education[0].location}</p>
              <div className="mt-3 inline-block rounded-lg border border-cyan-400/30 bg-cyan-950/40 px-3 py-1 font-mono text-xs font-bold text-cyan-300">
                {p.education[0].detail}
              </div>
              <p className="mt-4 text-xs font-mono text-zinc-400">
                Core Coursework: {p.education[0].coursework}
              </p>
            </div>
          </div>

          {/* Certifications Deck */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
                <Award size={16} /> VERIFIED CREDENTIALS
              </div>
              <span className="font-mono text-xs text-white/40">4 SPECIALIZATIONS</span>
            </div>

            <div className="mt-6 space-y-3.5">
              {[
                { name: 'Practical Cyber Security for Practitioners', org: 'NPTEL · IIT Kanpur', icon: Shield },
                { name: 'Industrial Training in Data Science', org: 'LearnWik Solutions', icon: Cpu },
                { name: 'Cloud Security Fundamentals', org: 'Palo Alto Networks via Coursera', icon: Cloud },
                { name: 'Foundations of User Experience (UX) Design', org: 'Google via Coursera', icon: Palette },
              ].map((cert, idx) => {
                const CertIcon = cert.icon;
                return (
                  <div key={idx} className="flex items-start gap-3 rounded-xl border border-white/5 bg-zinc-900/40 p-3">
                    <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded bg-cyan-950/60 text-cyan-400 shrink-0">
                      <CertIcon size={13} />
                    </span>
                    <div>
                      <h4 className="text-xs font-medium text-white/90">{cert.name}</h4>
                      <p className="text-[11px] font-mono text-zinc-400 mt-0.5">{cert.org}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
