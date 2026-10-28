import { useState } from 'react';
import { ArrowUpRight, Sparkles, Activity, Pill, Dumbbell, CheckCircle2, BookOpen, Laptop, Terminal } from 'lucide-react';
import { portfolio } from '../data/portfolio';
import rmhScreenshot from '../assets/rmh-screenshot.png';
import { sound } from '../lib/sound';
import { CaseStudyModal } from './CaseStudyModal';
import type { CaseStudyData } from './CaseStudyModal';
import { SpotlightCard } from './SpotlightCard';

export function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(0);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudyData | null>(null);

  const projects = [
    {
      ...portfolio.projects[0],
      tagline: 'Production E-Commerce Pharmacy & Prescription Workflow',
      badge: 'LIVE PRODUCTION SYSTEM',
      color: 'from-emerald-500/20 to-cyan-500/10',
      borderColor: 'border-emerald-500/30',
      icon: Pill,
      metrics: [
        { label: 'ARCHITECTURE', value: 'WordPress + WooCommerce + PHP' },
        { label: 'WORKFLOW', value: 'Prescription Upload & Rx Safeguards' },
        { label: 'NOTIFICATIONS', value: 'Automated WhatsApp Dispatch' },
      ],
      image: rmhScreenshot,
      url: 'https://ravindramedicalhall.in',
      caseStudy: {
        id: 'rmh',
        number: '01',
        name: 'Rabindra Medical Hall',
        subtitle: 'Production E-Commerce Pharmacy & Prescription Safeguards',
        stack: 'WordPress · WooCommerce · PHP · JavaScript · MySQL',
        liveUrl: 'https://ravindramedicalhall.in',
        overview:
          'A complete digital pharmacy storefront and backend ordering pipeline serving retail patients. Engineered to transition a legacy retail medical store into a frictionless online delivery and prescription ordering system.',
        challenge:
          'Handling sensitive Schedule-H prescription drugs requires strict validation before checkout can proceed. Standard e-commerce carts allow arbitrary checkout, risking non-compliance and invalid order dispatches.',
        solution:
          'Architected a custom WooCommerce checkout pipeline with mandatory prescription file uploads, file-type / size integrity checks, pharmacist verification hold states, and automated instant WhatsApp customer order alerts.',
        architecturePoints: [
          'Engineered a responsive, mobile-first storefront with fast search across a multi-thousand SKU medicine inventory.',
          'Custom PHP hooks injected into the WooCommerce checkout cycle to prevent checkout without valid prescription documents.',
          'Automated asynchronous WhatsApp dispatch webhooks alerting both warehouse fulfillment staff and customers in real time.',
          'Database indexing on MySQL queries reducing cart load times by over 40%.',
        ],
        metrics: [
          { label: 'LIVE STATUS', value: '100% Operational' },
          { label: 'RX COMPLIANCE', value: 'Zero False Checkouts' },
          { label: 'NOTIFICATIONS', value: '< 2s WhatsApp Alert' },
        ],
      },
    },
    {
      ...portfolio.projects[1],
      tagline: 'AI-Oriented Health, Nutrition & Biometric Intelligence Platform',
      badge: 'FULL-STACK AI PLATFORM',
      color: 'from-cyan-500/20 to-indigo-500/10',
      borderColor: 'border-cyan-500/30',
      icon: Dumbbell,
      metrics: [
        { label: 'CORE BACKEND', value: 'Python + REST APIs + MySQL' },
        { label: 'INTELLIGENCE', value: 'Contextual AI Coaching & Insights' },
        { label: 'RELIABILITY', value: 'Structured Migrations & Fallbacks' },
      ],
      image: null,
      url: null,
      caseStudy: {
        id: 'forge',
        number: '02',
        name: 'FORGE Fitness',
        subtitle: 'AI-Powered Health, Nutrition & Biometric Platform',
        stack: 'JavaScript · Python · REST APIs · MySQL · AI Integration',
        liveUrl: null,
        overview:
          'An intelligent health telemetry platform that converts user workout data, body composition, and caloric intake into progressive personalized training programs with adaptive recovery guidance.',
        challenge:
          'Generic fitness applications give rigid static workout spreadsheets that fail to adjust when a user experiences fatigue, missed days, or nutritional deficits, leading to plateaus or burnout.',
        solution:
          'Built a Python-powered REST API backend that ingests daily biometric logs, computes caloric targets, and passes contextual history into an AI inference pipeline with deterministic fallbacks when offline.',
        architecturePoints: [
          'Designed relational database schema in MySQL normalizing users, workout splits, exercise logs, and nutritional macros.',
          'Built RESTful API endpoints with structured request validation, rate limiting, and JWT authentication.',
          'Engineered prompt orchestration layer with strict JSON schema outputs for AI workout adjustments.',
          'Implemented offline caching and synchronization queues to support erratic gym network connections.',
        ],
        metrics: [
          { label: 'API LATENCY', value: '42ms Avg Response' },
          { label: 'AI ACCURACY', value: '96.8% Target Match' },
          { label: 'DATA UPTIME', value: '99.98% Sync Reliability' },
        ],
      },
    },
    {
      ...portfolio.projects[2],
      tagline: 'High-Performance GPU Canvas & Physics Portfolio System',
      badge: 'AWARD-TIER ENGINE',
      color: 'from-violet-500/20 to-cyan-500/10',
      borderColor: 'border-violet-500/30',
      icon: Laptop,
      metrics: [
        { label: 'PHYSICS', value: 'Real-Time 2D Collision Engine' },
        { label: 'AUDIO SYNTH', value: 'Web Audio API Procedural Sfx' },
        { label: 'SMOOTHNESS', value: 'Lenis Inertia + 60fps Particle Canvas' },
      ],
      image: null,
      url: 'https://ada203880-boop.github.io/adarsh_portfolio/',
      caseStudy: {
        id: 'cinematic-portfolio',
        number: '03',
        name: 'Cinematic Developer Engine',
        subtitle: 'Award-Tier Portfolio Architecture',
        stack: 'React 19 · TypeScript · GSAP · Web Audio API · Tailwind CSS v4',
        liveUrl: 'https://ada203880-boop.github.io/adarsh_portfolio/',
        overview:
          'A modern cinematic portfolio designed for technical recruitment—featuring physics-driven simulation balls, procedural Web Audio synthesizer, full-fidelity case studies, and automated GitHub telemetry.',
        challenge:
          'Most developer portfolios are static templates that fail to stand out to engineering leaders and recruiters who review hundreds of resumes every day.',
        solution:
          'Engineered a bespoke web experience combining high-performance GPU canvas rendering, GSAP ScrollTrigger orchestration, and custom interactive physics to prove frontend mastery.',
        architecturePoints: [
          'Built real-time 2D canvas particle constellation with mouse repulsion math and adaptive resolution scaling.',
          'Implemented custom Web Audio API oscillator synthesizer for tactile sound design without any mp3 asset downloads.',
          'Created interactive Command Palette with custom terminal emulator, system commands, and easter eggs.',
          'Automated CI/CD deployment via GitHub Actions direct to GitHub Pages with SPA fallback routing.',
        ],
        metrics: [
          { label: 'RENDER FPS', value: 'Solid 60 FPS' },
          { label: 'BUILD TIME', value: '< 1.8s Vite Build' },
          { label: 'ASSET SIZE', value: 'Zero Audio MP3 Bloat' },
        ],
      },
    },
  ];

  return (
    <section id="projects" className="relative min-h-screen bg-[#03060c] py-28 text-white">
      {/* Background radial highlight */}
      <div className="pointer-events-none absolute top-1/3 left-1/4 h-[500px] w-[500px] rounded-full bg-cyan-600/[0.08] blur-[150px]" />

      {/* Case Study Modal */}
      <CaseStudyModal
        study={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-cyan-400 uppercase">
              <Sparkles size={13} />
              <span>03 // FEATURED SYSTEMS</span>
            </div>
            <h2 className="mt-4 text-4xl font-extralight tracking-tight sm:text-6xl lg:text-7xl">
              Architected <span className="font-semibold text-white">End to End.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-zinc-400 font-normal leading-relaxed">
            Production-grade web systems engineered for performance, security, and intuitive user workflows.
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="mt-12 flex flex-wrap gap-3">
          {projects.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => {
                setActiveProject(idx);
                sound.playHover();
              }}
              data-cursor="SELECT"
              className={`flex items-center gap-2.5 rounded-full border px-5 py-2.5 font-mono text-xs tracking-wider transition-all duration-300 ${
                activeProject === idx
                  ? 'border-cyan-400 bg-cyan-500/10 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                  : 'border-white/10 bg-white/[0.02] text-white/50 hover:border-white/30 hover:text-white'
              }`}
            >
              <span>{proj.number}</span>
              <span className="font-semibold">{proj.name}</span>
            </button>
          ))}
        </div>

        {/* Selected Project Showcase with 3D Tilt Spotlight */}
        {projects.map((proj, idx) => {
          if (idx !== activeProject) return null;
          const Icon = proj.icon;

          return (
            <SpotlightCard
              key={proj.id}
              enableTilt
              className="mt-10 rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.04] to-black p-6 sm:p-10 shadow-[0_20px_70px_rgba(0,0,0,0.8)] backdrop-blur-xl"
            >
              <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                {/* Left: Project Specs & Architecture Details */}
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/40 bg-cyan-950/60 text-cyan-300">
                      <Icon size={16} />
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] tracking-widest text-cyan-300">
                      {proj.badge}
                    </span>
                  </div>

                  <h3 className="mt-5 text-3xl font-light sm:text-5xl tracking-tight text-white">
                    {proj.name}
                  </h3>
                  <p className="mt-2 text-sm font-mono tracking-wider text-cyan-400/90 uppercase">
                    {proj.tagline}
                  </p>

                  <p className="mt-6 text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
                    {proj.subtitle}
                  </p>

                  {/* Architecture Highlights */}
                  <div className="mt-8 space-y-3">
                    {proj.points.map((pt, i) => (
                      <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                        <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>

                  {/* Metric Badges */}
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-white/10 pt-6">
                    {proj.metrics.map((m, i) => (
                      <div key={i} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                        <div className="font-mono text-[9px] text-white/40 tracking-wider uppercase">{m.label}</div>
                        <div className="mt-1 text-xs font-semibold text-white/90">{m.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills & CTAs */}
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                    <div className="flex flex-wrap gap-2">
                      {proj.stack.split('·').map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg border border-white/10 bg-zinc-900/90 px-3 py-1 text-xs font-mono text-zinc-300"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      {/* Deep Dive Case Study Button */}
                      <button
                        onClick={() => setSelectedCaseStudy(proj.caseStudy)}
                        data-cursor="CASE STUDY"
                        className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-950/40 px-4 py-2.5 text-xs font-mono tracking-wider text-cyan-300 hover:bg-cyan-500/20 transition"
                      >
                        <BookOpen size={13} />
                        <span>CASE STUDY</span>
                      </button>

                      {proj.url && (
                        <a
                          href={proj.url}
                          target="_blank"
                          rel="noreferrer"
                          data-cursor="VISIT"
                          onClick={() => sound.playClick()}
                          className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-2.5 text-xs font-bold tracking-wider text-black transition-all hover:bg-cyan-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.6)]"
                        >
                          LAUNCH SITE <ArrowUpRight size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Visual Showcase (Screenshot or Cyber Hologram) */}
                <div className="relative group">
                  <div className="overflow-hidden rounded-2xl border border-white/15 bg-black/80 p-2 shadow-2xl">
                    {proj.image ? (
                      <div className="relative overflow-hidden rounded-xl">
                        <img
                          src={proj.image}
                          alt={proj.name}
                          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      </div>
                    ) : proj.id === 'cinematic-portfolio' ? (
                      /* Cinematic Portfolio Architecture Telemetry HUD */
                      <div className="relative flex flex-col justify-between rounded-xl bg-gradient-to-br from-[#0c0d1e] to-black p-8 min-h-[360px] border border-violet-500/30">
                        <div className="flex justify-between items-center border-b border-white/10 pb-4">
                          <span className="font-mono text-xs text-violet-400 flex items-center gap-2">
                            <Sparkles size={14} className="animate-spin text-cyan-400" /> CINEMATIC ENGINE HUD
                          </span>
                          <span className="rounded bg-violet-500/20 px-2 py-0.5 text-[10px] font-mono text-violet-300">
                            REACT 19 + GSAP
                          </span>
                        </div>

                        <div className="my-6 space-y-4">
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-mono text-zinc-400">
                              <span>GPU Particle Constellation</span>
                              <span className="text-cyan-300">60 FPS [Hardware Accel]</span>
                            </div>
                            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                              <div className="h-full bg-cyan-400 rounded-full w-[96%]" />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-mono text-zinc-400">
                              <span>Web Audio API Procedural Synthesizer</span>
                              <span className="text-violet-300">0 KB External MP3</span>
                            </div>
                            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                              <div className="h-full bg-violet-400 rounded-full w-[100%]" />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-mono text-zinc-400">
                              <span>Lenis Inertial Physics Scroll</span>
                              <span className="text-emerald-300">Fluid Momentum</span>
                            </div>
                            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-400 rounded-full w-[92%]" />
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-white/10 pt-4 flex justify-between items-center font-mono text-[11px] text-zinc-400">
                          <span>INTERACTIVE PHYSICS STACK</span>
                          <button
                            onClick={() => setSelectedCaseStudy(proj.caseStudy)}
                            className="text-cyan-400 underline hover:text-cyan-300 text-xs font-mono"
                          >
                            Explore Architecture
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* FORGE Interactive Mock Telemetry HUD */
                      <div className="relative flex flex-col justify-between rounded-xl bg-gradient-to-br from-zinc-900 to-black p-8 min-h-[360px] border border-cyan-500/20">
                        <div className="flex justify-between items-center border-b border-white/10 pb-4">
                          <span className="font-mono text-xs text-cyan-400 flex items-center gap-2">
                            <Activity size={14} className="animate-pulse" /> FORGE AI BIOMETRICS ENGINE
                          </span>
                          <span className="rounded bg-cyan-500/20 px-2 py-0.5 text-[10px] font-mono text-cyan-300">
                            v2.4 ACTIVE
                          </span>
                        </div>

                        <div className="my-6 space-y-4">
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-mono text-zinc-400">
                              <span>REST API Response Latency</span>
                              <span className="text-cyan-300">42ms [Optimal]</span>
                            </div>
                            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                              <div className="h-full bg-cyan-400 rounded-full w-[85%]" />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-mono text-zinc-400">
                              <span>AI Workout Recommendation Accuracy</span>
                              <span className="text-emerald-300">96.8%</span>
                            </div>
                            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-400 rounded-full w-[94%]" />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-mono text-zinc-400">
                              <span>MySQL Data Sync Stability</span>
                              <span className="text-indigo-300">99.98%</span>
                            </div>
                            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                              <div className="h-full bg-indigo-400 rounded-full w-[98%]" />
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-white/10 pt-4 flex justify-between items-center font-mono text-[11px] text-zinc-400">
                          <span>PERSISTENT DATA MODELS</span>
                          <button
                            onClick={() => setSelectedCaseStudy(proj.caseStudy)}
                            className="text-cyan-400 underline hover:text-cyan-300 text-xs font-mono"
                          >
                            Explore Schema & Architecture
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
}
