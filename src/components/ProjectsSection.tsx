import { useState, lazy, Suspense } from 'react';
import {
  ArrowUpRight, Sparkles, Pill, Dumbbell, CheckCircle2,
  BookOpen, Layers, SlidersHorizontal, Code2
} from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { sound } from '../lib/sound';
import type { CaseStudyData } from './CaseStudyModal';
import { SpotlightCard } from './SpotlightCard';
import { ScrollStack } from './ScrollStack';
import { ForgeSimulator } from './ProjectSimulators';
import { PhoneSimulator } from './PhoneSimulator';
import { BlurFadeText } from './BlurFadeText';

const CaseStudyModal = lazy(() => import('./CaseStudyModal').then((m) => ({ default: m.CaseStudyModal })));

export function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(0);
  const [viewLayout, setViewLayout] = useState<'stack' | 'single'>('stack');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudyData | null>(null);

  const projects = [
    {
      ...portfolio.projects[0],
      tagline: 'Production E-Commerce Pharmacy & Prescription Workflow',
      badge: 'LIVE PRODUCTION STOREFRONT',
      color: 'from-emerald-500/20 to-cyan-500/10',
      borderColor: 'border-emerald-500/30',
      icon: Pill,
      metrics: [
        { label: 'ARCHITECTURE', value: 'WordPress + WooCommerce + PHP' },
        { label: 'WORKFLOW', value: 'Prescription Upload & Rx Safeguards' },
        { label: 'NOTIFICATIONS', value: 'Automated WhatsApp Dispatch' },
      ],
      image: null,
      url: 'https://rabindramedicalhall.in',
      caseStudy: {
        id: 'rmh',
        number: '01',
        name: 'Rabindra Medical Hall',
        subtitle: 'Production E-Commerce Pharmacy & Prescription Safeguards',
        stack: 'WordPress · WooCommerce · PHP · JavaScript · MySQL',
        liveUrl: 'https://rabindramedicalhall.in',
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
      tagline: 'High-Performance Interactive Web Portfolio & Creative System',
      badge: 'PRODUCTION CREATIVE SYSTEM',
      color: 'from-violet-500/20 to-purple-500/10',
      borderColor: 'border-violet-500/30',
      icon: Code2,
      metrics: [
        { label: 'FRONTEND ENGINE', value: 'React 19 + TypeScript + GSAP' },
        { label: 'SYNTHESIZER', value: 'Web Audio API Procedural Sound' },
        { label: 'PERFORMANCE', value: '< 200 kB Core Code-Split' },
      ],
      image: null,
      url: 'https://ada203880-boop.github.io/adarsh_portfolio/',
      caseStudy: {
        id: 'cinematic-portfolio',
        number: '03',
        name: 'Cinematic Developer Engine',
        subtitle: 'Award-Tier Developer Portfolio & Interactive Creative System',
        stack: 'React 19 · TypeScript · GSAP · Web Audio API · Tailwind CSS',
        liveUrl: 'https://ada203880-boop.github.io/adarsh_portfolio/',
        overview:
          'A flagship creative engineering platform built to deliver an immersive, cyberpunk-inspired developer operating system featuring 60fps Canvas particle physics, 3D interactive holographic globe, bash terminal, and code-split bundle architecture.',
        challenge:
          'Balancing high-density visual fidelity (3D globe, Web Audio synthesizers, particle networks) with sub-second page loads, mobile responsiveness, and zero CPU thermal throttling.',
        solution:
          'Engineered a multi-layered rendering engine that decouples expensive Canvas loops during background visibility, disables network lines on mobile devices (<768px), and employs dynamic Rollup chunk splitting to reduce initial JavaScript payload by 82.5%.',
        architecturePoints: [
          'Custom HTML5 Canvas particle background with 60fps magnetic mouse cursor pull and mobile-responsive power saver mode.',
          'Procedural Web Audio synthesizer generating dynamic tactile soundscapes (clicks, hums, velocity whooshes) with 0 byte audio assets.',
          'Interactive Dev Terminal Workstation with history navigation, tab completion, and multi-tab operational HUD.',
          'Rollup code splitting via Vite isolating heavy AI models and modal overlays into lazy-loaded chunks.',
        ],
        metrics: [
          { label: 'INITIAL BUNDLE', value: '193.85 kB (-82.5%)' },
          { label: 'FRAME RATE', value: '60 FPS Solid' },
          { label: 'LINT STATUS', value: '0 Warnings / 0 Errors' },
        ],
      },
    },
  ];

  const renderCard = (proj: (typeof projects)[0]) => {
    const Icon = proj.icon;

    return (
      <SpotlightCard
        key={proj.id}
        enableTilt
        className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#090b18]/95 to-black/95 p-6 sm:p-10 shadow-[0_20px_70px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
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
              {(proj.points || []).map((pt, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                  <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            {/* Metric Badges */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-white/10 pt-6">
              {(proj.metrics || []).map((m, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                  <div className="font-mono text-[9px] text-white/40 tracking-wider uppercase">{m.label}</div>
                  <div className="mt-1 text-xs font-semibold text-white/90">{m.value}</div>
                </div>
              ))}
            </div>

            {/* Tech Stack Pills & CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
              <div className="flex flex-wrap gap-2">
                {(proj.stack || '').split(/[·•]/).map((tech) => (
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

          {/* Right: Visual Showcase (Real Working Mobile Simulator or Interactive Telemetry) */}
          <div className="relative group flex items-center justify-center">
            {proj.id === 'rmh' ? (
              <PhoneSimulator url="https://rabindramedicalhall.in" title="Rabindra Medical Hall" />
            ) : proj.id === 'forge' ? (
              <div className="w-full overflow-hidden rounded-2xl border border-white/15 bg-black/80 p-4 shadow-2xl">
                <ForgeSimulator />
              </div>
            ) : (
              <div className="w-full overflow-hidden rounded-2xl border border-cyan-500/30 bg-[#090b14] p-5 shadow-[0_0_40px_rgba(6,182,212,0.15)] font-mono text-xs">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-cyan-300 font-semibold text-[11px]">CINEMATIC_ENGINE_TELEMETRY</span>
                  </div>
                  <span className="text-[10px] text-zinc-500">v2.4.0-PRO</span>
                </div>
                <div className="space-y-2.5 text-zinc-300">
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-zinc-500">Render Engine:</span>
                    <span className="text-cyan-300 font-medium">HTML5 Canvas (60 FPS)</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-zinc-500">Audio Synthesis:</span>
                    <span className="text-violet-300 font-medium">Web Audio Procedural</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-zinc-500">Initial Chunk:</span>
                    <span className="text-emerald-400 font-medium">193.85 kB (-82.5%)</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-zinc-500">Code Architecture:</span>
                    <span className="text-cyan-300 font-medium">React 19 + TypeScript</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">CI/CD Pipeline:</span>
                    <span className="text-emerald-400 font-medium">GitHub Actions Automated</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </SpotlightCard>
    );
  };

  return (
    <section id="projects" className="relative min-h-screen w-full max-w-full overflow-hidden bg-[#03060c] py-20 sm:py-28 text-white">
      {/* Background radial highlight */}
      <div className="pointer-events-none absolute top-1/3 left-1/4 h-[500px] w-[500px] rounded-full bg-cyan-600/[0.08] blur-[150px]" />

      {/* Case Study Modal (Code-Split) */}
      <Suspense fallback={null}>
        <CaseStudyModal
          study={selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
        />
      </Suspense>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-cyan-400 uppercase">
              <Sparkles size={13} />
              <span>03 // FEATURED SYSTEMS</span>
            </div>
            <h2 className="mt-4 text-4xl font-extralight tracking-tight sm:text-6xl lg:text-7xl">
              <BlurFadeText text="Architected" delay={100} />{' '}
              <span className="font-semibold text-white">
                <BlurFadeText text="End to End." delay={300} />
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-zinc-400 font-normal leading-relaxed">
            Production-grade web systems engineered for performance, security, and intuitive user workflows.
          </p>
        </div>

        {/* Layout Switcher & Quick Filters */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2.5">
            {projects.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => {
                  setActiveProject(idx);
                  setViewLayout('single');
                  sound.playHover();
                }}
                data-cursor="SELECT"
                className={`flex items-center gap-2.5 rounded-full border px-4 py-2 font-mono text-xs tracking-wider transition-all duration-300 ${
                  viewLayout === 'single' && activeProject === idx
                    ? 'border-cyan-400 bg-cyan-500/10 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                    : 'border-white/10 bg-white/[0.02] text-white/50 hover:border-white/30 hover:text-white'
                }`}
              >
                <span>{proj.number}</span>
                <span className="font-semibold">{proj.name}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur-md">
            <button
              type="button"
              onClick={() => { setViewLayout('stack'); sound.playClick(); }}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-xs transition-all ${
                viewLayout === 'stack'
                  ? 'bg-cyan-500 text-black font-semibold shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Layers size={13} />
              <span>3D Card Stack</span>
            </button>
            <button
              type="button"
              onClick={() => { setViewLayout('single'); sound.playClick(); }}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-xs transition-all ${
                viewLayout === 'single'
                  ? 'bg-cyan-500 text-black font-semibold shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <SlidersHorizontal size={13} />
              <span>Focused Tabs</span>
            </button>
          </div>
        </div>

        {/* Dynamic Project Presentation */}
        <div className="mt-8">
          {viewLayout === 'stack' ? (
            <ScrollStack stickyOffset={95}>
              {projects.map((proj) => renderCard(proj))}
            </ScrollStack>
          ) : (
            renderCard(projects[activeProject])
          )}
        </div>
      </div>
    </section>
  );
}
