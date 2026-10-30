import { GraduationCap, MapPin, BookOpen, Sparkles } from 'lucide-react';
import { portfolio } from '../data/portfolio';

export function EducationSection() {
  return (
    <section id="education" className="relative w-full max-w-full bg-[#03060c] py-20 sm:py-28 text-white overflow-hidden">
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-indigo-700/[0.07] blur-[160px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-indigo-400 uppercase">
              <Sparkles size={13} />
              <span>04 // ACADEMIC FOUNDATION</span>
            </div>
            <h2 className="mt-4 text-4xl font-extralight tracking-[-0.04em] sm:text-7xl lg:text-8xl">
              MY<br />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-cyan-300">
                EDUCATION.
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-zinc-400 leading-relaxed font-light">
            Academic milestones that built the technical foundation behind every system I've shipped.
          </p>
        </div>

        {/* Education Cards */}
        <div className="mt-16 space-y-8">

          {/* B.Tech Card — Primary */}
          <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/30 to-black p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl">
            {/* Glow accent */}
            <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-indigo-500/10 blur-[80px]" />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start">
              <div>
                {/* Badge row */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/40 bg-indigo-900/40 px-3.5 py-1 font-mono text-[10px] tracking-widest text-indigo-300">
                    <GraduationCap size={12} /> PRIMARY DEGREE
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10px] text-white/50">
                    2021 — 2025
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-light tracking-tight text-white">
                  B.Tech — Computer Science<br />
                  <span className="text-indigo-300 font-medium">&amp; Engineering</span>
                </h3>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-400">
                  <span className="flex items-center gap-2">
                    <BookOpen size={15} className="text-indigo-400" />
                    {portfolio.education[0].institution}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin size={15} className="text-indigo-400" />
                    {portfolio.education[0].location}
                  </span>
                </div>

                <p className="mt-6 max-w-2xl text-sm leading-relaxed text-zinc-300 font-light">
                  Four-year undergraduate program in Computer Science and Engineering with a strong focus on
                  algorithmic thinking, systems design, and full-stack engineering practices.
                </p>

                {/* Coursework */}
                <div className="mt-8">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-indigo-400 mb-3">Core Coursework</p>
                  <div className="flex flex-wrap gap-2">
                    {(portfolio.education[0].coursework ?? '').split('•').map((course) => (
                      <span
                        key={course.trim()}
                        className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 px-3 py-1.5 font-mono text-xs text-indigo-200"
                      >
                        {course.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CGPA card */}
              <div className="flex flex-col items-center justify-center rounded-2xl border border-indigo-400/30 bg-indigo-950/40 px-8 py-8 min-w-[160px] text-center backdrop-blur-md shadow-[0_0_40px_rgba(99,102,241,0.15)]">
                <span className="font-mono text-[10px] uppercase tracking-widest text-indigo-400">CGPA</span>
                <span className="mt-2 text-5xl font-extralight text-white">7.6</span>
                <span className="text-sm text-indigo-300 font-mono">/ 10</span>
                <div className="mt-4 h-[1px] w-10 bg-indigo-400/40" />
                <span className="mt-4 font-mono text-[10px] text-zinc-400 uppercase tracking-wider">CSE HONORS</span>
              </div>
            </div>

            {/* Left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-3xl bg-gradient-to-b from-indigo-400 via-indigo-600 to-transparent" />
          </div>

          {/* Class XII Card — Secondary */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-7 sm:p-8 backdrop-blur-xl transition-all hover:border-indigo-400/30 hover:bg-indigo-950/10">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-start gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-950/60 text-indigo-300">
                  <GraduationCap size={22} />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-0.5 font-mono text-[10px] text-white/50">
                      2018 — 2020
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-0.5 font-mono text-[10px] text-zinc-500">
                      INTERMEDIATE
                    </span>
                  </div>
                  <h3 className="text-xl font-medium text-white">Class XII — Intermediate</h3>
                  <p className="mt-1 flex items-center gap-2 text-sm text-zinc-400">
                    <BookOpen size={13} className="text-indigo-400" />
                    {portfolio.education[1].institution}
                    <span className="text-zinc-600">·</span>
                    <MapPin size={13} className="text-indigo-400" />
                    {portfolio.education[1].location}
                  </p>
                  <p className="mt-3 text-sm text-zinc-400 font-light">
                    Science stream with core focus on Mathematics, Physics, and Chemistry — the foundation for computational thinking and problem-solving.
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl bg-indigo-800/60" />
          </div>
        </div>
      </div>
    </section>
  );
}
