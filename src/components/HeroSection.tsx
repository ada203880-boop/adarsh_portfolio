import { useState } from 'react';
import {
  ArrowDown, FileText, ArrowUpRight,
  Code2, Server, Database, Sparkles
} from 'lucide-react';
import { sound } from '../lib/sound';
import { SpotlightCard } from './SpotlightCard';
import { HolographicGlobe } from './HolographicGlobe';
import { BlurFadeText } from './BlurFadeText';
import { ClaymorphicSocialBadges } from './ClaymorphicSocialBadges';
import { useTypewriter } from '../lib/useTypewriter';
import { useI18n } from '../lib/useI18n';
import { useMagnetic } from '../lib/useMagnetic';
import profileImg from '../assets/profile.jpeg';

interface HeroSectionProps {
  onOpenTerminal: () => void;
  onOpenResume?: () => void;
}

const ROLES = [
  'Software Developer',
  'Full-Stack Web Engineer',
  'React.js & Node.js Specialist',
  'WooCommerce E-Commerce Architect',
  'REST API & Systems Builder',
];

export function HeroSection({ onOpenTerminal, onOpenResume }: HeroSectionProps) {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<'architecture' | 'stack' | 'status' | 'globe'>('architecture');

  const hour = new Date().getHours();
  const timeGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const btnWorkRef = useMagnetic<HTMLAnchorElement>({ distance: 35, strength: 0.25 });
  const btnContactRef = useMagnetic<HTMLAnchorElement>({ distance: 35, strength: 0.25 });
  const btnResumeRef = useMagnetic<HTMLAnchorElement>({ distance: 35, strength: 0.25 });

  const typedRole = useTypewriter(ROLES, 70, 2200);

  const handleResumeClick = (e: React.MouseEvent) => {
    sound.playHover();
    if (onOpenResume) {
      e.preventDefault();
      onOpenResume();
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[95vh] w-full overflow-hidden bg-[#07060f] pt-28 pb-16 text-white flex flex-col justify-between"
    >
      {/* Background restrained ambient glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[550px] rounded-full bg-cyan-900/[0.1] blur-[160px]" />
      <div className="pointer-events-none absolute bottom-12 right-12 h-[450px] w-[450px] rounded-full bg-violet-950/[0.15] blur-[150px]" />

      {/* Main Content Container */}
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 z-10 flex-1 flex flex-col justify-center">

        {/* Top Header Row with Greeting Badges & Circular 3D Glow Profile in Top-Right Corner */}
        <div className="flex items-start justify-between gap-3 mb-6">
          {/* Status Badges only */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/25 bg-violet-950/20 px-2.5 sm:px-3 py-1 sm:py-1.5 font-mono text-[10px] sm:text-xs text-violet-300">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
              Adarsh Panda · B.Tech CSE '25
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/25 px-2.5 sm:px-3 py-1 sm:py-1.5 font-mono text-[10px] sm:text-xs text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {t('status.available')}
            </span>
          </div>

          {/* Profile Picture in Top-Right Corner on all screen sizes — responsive, circular, 3D glow */}
          <div className="relative group shrink-0">
            {/* Ethereal dual-tone cyan & violet 3D ambient aura */}
            <div
              className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-tr from-cyan-500/40 via-violet-600/35 to-emerald-400/35 blur-xl sm:blur-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                boxShadow: '0 0 70px rgba(6,182,212,0.45), 0 0 100px rgba(139,92,246,0.3)',
              }}
            />

            {/* 3D Glass Bevel Ring with Depth — Significantly Enlarged */}
            <div className="relative h-28 w-28 min-[400px]:h-36 min-[400px]:w-36 sm:h-48 sm:w-48 lg:h-56 lg:w-56 xl:h-64 xl:w-64 rounded-full p-1 sm:p-1.5 bg-gradient-to-b from-white/50 via-cyan-400/50 to-violet-600/60 shadow-[0_20px_60px_rgba(0,0,0,0.85),inset_0_2px_6px_rgba(255,255,255,0.45)] transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1">
              <img
                src={profileImg}
                alt="Adarsh Panda"
                className="h-full w-full rounded-full object-cover object-center ring-2 sm:ring-4 ring-black"
              />

              {/* Verified Online Active Indicator */}
              <span className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 flex h-5 w-5 sm:h-7 sm:w-7 lg:h-8 lg:w-8 items-center justify-center rounded-full bg-black border-2 border-emerald-400 shadow-[0_0_15px_#10b981]">
                <span className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-emerald-400 animate-pulse" />
              </span>
            </div>
          </div>
        </div>

        {/* Hero Grid: Typography & Actions on Left, Architecture Stage on Right */}
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">

          {/* Left Column: Headline & Bio */}
          <div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.25]">
              {/* Dynamic time-based greeting + Namaste */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-zinc-400 font-extralight">{timeGreeting},</span>
                <BlurFadeText text={t('hero.greeting')} delay={100} />
              </div>
              {/* I'm Adarsh Panda on the next line */}
              <div className="mt-1">
                <span className="font-semibold text-cyan-300 drop-shadow-[0_0_25px_rgba(34,211,238,0.45)]">
                  <BlurFadeText text={t('hero.name')} delay={250} />
                </span>
              </div>
            </h1>

            {/* Flowing Typewriter Sentence */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:gap-2 font-mono text-xs sm:text-base text-zinc-300">
              <span className="text-cyan-400 font-medium">I am a</span>
              <span className="font-semibold text-white border-b border-cyan-400/50 pb-0.5">
                {typedRole}
              </span>
              <span className="animate-pulse font-bold text-cyan-400">|</span>
            </div>

            {/* Professional Bio Intro */}
            <p className="mt-5 max-w-xl text-sm sm:text-lg leading-relaxed text-zinc-300 font-light">
              Computer Science graduate and software engineer specializing in <strong className="text-white font-medium">React.js</strong>, <strong className="text-white font-medium">Node.js</strong>, <strong className="text-white font-medium">Python</strong>, and <strong className="text-white font-medium">MySQL</strong>.
              I architect dependable full-stack web platforms, custom WooCommerce e-commerce pipelines, and production-grade REST APIs designed for real-world reliability and scale.
            </p>

            {/* Primary Action Buttons with Subtle Magnetic Physics */}
            <div className="mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3.5">
              <a
                ref={btnWorkRef}
                href="#projects"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-5 sm:px-6 py-3 sm:py-3.5 text-xs font-semibold tracking-wide text-white transition-all duration-200 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                {t('hero.cta.work')}
                <ArrowDown size={14} />
              </a>

              <a
                ref={btnContactRef}
                href="#contact"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 sm:px-5 py-3 sm:py-3.5 text-xs font-semibold text-zinc-200 transition-all duration-200 hover:border-cyan-400/40 hover:bg-white/[0.08] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                {t('hero.cta.contact')}
                <ArrowUpRight size={14} />
              </a>

              <a
                ref={btnResumeRef}
                href={`${import.meta.env.BASE_URL}resume.pdf`}
                onClick={handleResumeClick}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3.5 sm:px-4 py-3 sm:py-3.5 text-xs font-mono text-zinc-300 hover:text-cyan-300 hover:border-cyan-400/40 transition-all duration-200"
                title="View Resume PDF"
              >
                <FileText size={14} className="text-cyan-400" />
                {t('hero.cta.resume')}
              </a>
            </div>

            {/* Direct Verified Channels — Standalone 3D Apple Squircle App Icon Badges */}
            <div className="mt-8 border-t border-white/[0.08] pt-6">
              <p className="font-mono text-[10px] tracking-widest text-cyan-400 uppercase mb-3 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                DIRECT VERIFIED CHANNELS // 3D APP BADGES
              </p>
              <ClaymorphicSocialBadges />
            </div>
          </div>

          {/* Right Column: Technical Credibility & Architecture Stage */}
          <div className="relative">
            <SpotlightCard
              enableTilt
              className="rounded-2xl border border-cyan-500/25 bg-[#0e0c20]/90 p-5 sm:p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            >
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                  <span className="ml-2 font-mono text-[11px] text-zinc-400">adarsh-dev-environment</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {(['architecture', 'stack', 'status', 'globe'] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => {
                        setActiveTab(tab);
                        sound.playHover();
                      }}
                      className={`px-2.5 py-1 rounded text-[10px] font-mono capitalize transition-colors ${activeTab === tab
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                        : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                    >
                      {tab === 'globe' ? '🌐 3D Globe' : tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab 1: Architecture Highlights */}
              {activeTab === 'architecture' && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="rounded-lg bg-black/40 border border-white/[0.06] p-3 text-zinc-300 space-y-2">
                    <div className="text-cyan-400 font-semibold">// Engineering Focus & Philosophy</div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                      Writing predictable, type-safe full-stack code. Integrating responsive user interfaces with resilient API endpoints and relational schemas.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
                      <div className="flex items-center gap-1.5 text-cyan-300 mb-1">
                        <Code2 size={12} /> Frontend
                      </div>
                      <div className="text-zinc-400">React.js, Tailwind, TS</div>
                    </div>
                    <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
                      <div className="flex items-center gap-1.5 text-cyan-300 mb-1">
                        <Server size={12} /> Backend
                      </div>
                      <div className="text-zinc-400">Node.js, Express, Python</div>
                    </div>
                    <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
                      <div className="flex items-center gap-1.5 text-cyan-300 mb-1">
                        <Database size={12} /> Databases
                      </div>
                      <div className="text-zinc-400">MySQL, Relational Design</div>
                    </div>
                    <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
                      <div className="flex items-center gap-1.5 text-cyan-300 mb-1">
                        <Sparkles size={12} /> E-Commerce
                      </div>
                      <div className="text-zinc-400">WooCommerce & PHP</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Verified Stack */}
              {activeTab === 'stack' && (
                <div className="space-y-2.5 font-mono text-xs">
                  <div className="text-zinc-400 text-[11px]">Core Verified Languages & Frameworks:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {['JavaScript', 'React.js', 'Python', 'Node.js', 'Express.js', 'MySQL', 'PHP', 'WordPress', 'WooCommerce', 'Git', 'Vite', 'HTML5/CSS3'].map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-cyan-500/20 bg-cyan-950/30 px-2.5 py-1 text-[11px] text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-[11px] text-zinc-500 pt-2 font-sans leading-relaxed">
                    Used across production e-pharmacy storefront, full-stack prototypes, and academic coursework.
                  </p>
                </div>
              )}

              {/* Tab 3: Current Status */}
              {activeTab === 'status' && (
                <div className="space-y-3 font-mono text-xs text-zinc-300">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                    <span className="text-zinc-500">Degree:</span>
                    <span className="text-cyan-300">B.Tech Computer Science</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                    <span className="text-zinc-500">Institution:</span>
                    <span>CV Raman Global University</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                    <span className="text-zinc-500">Academic Score:</span>
                    <span className="text-emerald-400">CGPA 7.6 / 10</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Target Roles:</span>
                    <span>Junior / Full-Stack / Software Dev</span>
                  </div>
                </div>
              )}

              {/* Tab 4: 3D Interactive Map Globe */}
              {activeTab === 'globe' && (
                <div className="flex flex-col items-center justify-center py-1">
                  <HolographicGlobe className="w-full max-w-[340px]" />
                  <p className="mt-1 text-center font-mono text-[10px] text-zinc-400">
                    Location Coordinates: <span className="text-cyan-400 font-semibold">20.2961° N, 85.8245° E (Bhubaneswar, IN)</span>
                  </p>
                </div>
              )}

              {/* Card Footer */}
              <div className="mt-4 border-t border-white/[0.06] pt-3 flex items-center justify-between font-mono text-[10px] text-zinc-500">
                <span>Location: Bhubaneswar, Odisha</span>
                <button
                  type="button"
                  onClick={onOpenTerminal}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Press ⌘K for terminal →
                </button>
              </div>
            </SpotlightCard>
          </div>

        </div>
      </div>

      {/* Understated bottom technology strip */}
      <div className="mt-12 border-y border-white/[0.06] bg-white/[0.01] py-3 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-zinc-400">
          <span className="text-cyan-400/80 font-medium tracking-wider">ENGINEERING FOUNDATION:</span>
          <span>React.js</span>
          <span>·</span>
          <span>Node.js</span>
          <span>·</span>
          <span>Python</span>
          <span>·</span>
          <span>Express.js</span>
          <span>·</span>
          <span>MySQL</span>
          <span>·</span>
          <span>WordPress / WooCommerce</span>
          <span>·</span>
          <span>REST APIs</span>
        </div>
      </div>
    </section>
  );
}
