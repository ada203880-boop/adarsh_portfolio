import { useState } from 'react';
import {
  ArrowDown, Github, Linkedin, Mail, FileText, ArrowUpRight,
  Code2, Server, Database, Sparkles, Instagram
} from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { sound } from '../lib/sound';
import { SpotlightCard } from './SpotlightCard';
import { HolographicGlobe } from './HolographicGlobe';
import { BlurFadeText } from './BlurFadeText';
import { useTypewriter } from '../lib/useTypewriter';
import { useI18n } from '../lib/useI18n';
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
              className="absolute -inset-2 sm:-inset-3 rounded-full bg-gradient-to-tr from-cyan-500/40 via-violet-600/30 to-emerald-400/30 blur-lg sm:blur-xl opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                boxShadow: '0 0 50px rgba(6,182,212,0.4), 0 0 70px rgba(139,92,246,0.25)',
              }}
            />

            {/* 3D Glass Bevel Ring with Depth */}
            <div className="relative h-20 w-20 min-[400px]:h-24 min-[400px]:w-24 sm:h-36 sm:w-36 lg:h-44 lg:w-44 rounded-full p-0.5 sm:p-1 bg-gradient-to-b from-white/40 via-cyan-400/40 to-violet-600/50 shadow-[0_15px_35px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.4)] transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1">
              <img
                src={profileImg}
                alt="Adarsh Panda"
                className="h-full w-full rounded-full object-cover object-center ring-2 ring-black"
              />

              {/* Verified Online Active Indicator */}
              <span className="absolute bottom-0.5 right-0.5 sm:bottom-1.5 sm:right-1.5 flex h-4 w-4 sm:h-6 sm:w-6 lg:h-7 lg:w-7 items-center justify-center rounded-full bg-black border sm:border-2 border-emerald-400 shadow-[0_0_12px_#10b981]">
                <span className="h-1.5 w-1.5 sm:h-2.5 sm:w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              </span>
            </div>
          </div>
        </div>

        {/* Hero Grid: Typography & Actions on Left, Architecture Stage on Right */}
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">

          {/* Left Column: Headline & Bio */}
          <div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.25]">
              {/* Namaste on its own line */}
              <div>
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

            {/* Primary Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3.5">
              <a
                href="#projects"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-5 sm:px-6 py-3 sm:py-3.5 text-xs font-semibold tracking-wide text-white transition-all duration-200 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                {t('hero.cta.work')}
                <ArrowDown size={14} />
              </a>

              <a
                href="#contact"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 sm:px-5 py-3 sm:py-3.5 text-xs font-semibold text-zinc-200 transition-all duration-200 hover:border-cyan-400/40 hover:bg-white/[0.08] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                {t('hero.cta.contact')}
                <ArrowUpRight size={14} />
              </a>

              <a
                href={`${import.meta.env.BASE_URL}resume.pdf`}
                onClick={handleResumeClick}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3.5 sm:px-4 py-3 sm:py-3.5 text-xs font-mono text-zinc-300 hover:text-cyan-300 hover:border-cyan-400/40 transition-all duration-200"
                title="View Resume PDF"
              >
                <FileText size={14} className="text-cyan-400" />
                {t('hero.cta.resume')}
              </a>
            </div>

            {/* Direct Verified Channels — Realistic Glowing 3D Social Icons */}
            <div className="mt-8 flex flex-wrap items-center gap-2 sm:gap-3 border-t border-white/[0.08] pt-6">
              {/* WhatsApp */}
              <a
                href={portfolio.links.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 rounded-xl px-3.5 py-2.5 transition-all duration-200 hover:-translate-y-0.5"
                title="Chat directly on WhatsApp"
                style={{
                  background: 'linear-gradient(145deg,#128C7E,#075E54)',
                  boxShadow: '0 4px 15px rgba(18,140,126,0.4), 0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
                }}
              >
                {/* WhatsApp SVG icon */}
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white drop-shadow-lg" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="font-mono text-[11px] text-white font-semibold">WhatsApp</span>
              </a>

              {/* Instagram */}
              <a
                href={portfolio.links.instagram}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 rounded-xl px-3.5 py-2.5 transition-all duration-200 hover:-translate-y-0.5"
                title="Follow on Instagram"
                style={{
                  background: 'linear-gradient(145deg,#833ab4,#fd1d1d,#fcb045)',
                  boxShadow: '0 4px 15px rgba(253,29,29,0.4), 0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
                }}
              >
                <Instagram size={15} className="text-white drop-shadow-lg" />
                <span className="font-mono text-[11px] text-white font-semibold">Instagram</span>
              </a>

              {/* GitHub */}
              <a
                href={portfolio.links.github}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 rounded-xl px-3.5 py-2.5 transition-all duration-200 hover:-translate-y-0.5"
                title="GitHub Profile"
                style={{
                  background: 'linear-gradient(145deg,#24292e,#1a1e22)',
                  boxShadow: '0 4px 15px rgba(100,100,100,0.3), 0 2px 4px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)',
                }}
              >
                <Github size={15} className="text-white drop-shadow-lg" />
                <span className="font-mono text-[11px] text-white font-semibold">GitHub</span>
              </a>

              {/* LinkedIn */}
              <a
                href={portfolio.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 rounded-xl px-3.5 py-2.5 transition-all duration-200 hover:-translate-y-0.5"
                title="LinkedIn Profile"
                style={{
                  background: 'linear-gradient(145deg,#0077b5,#005885)',
                  boxShadow: '0 4px 15px rgba(0,119,181,0.45), 0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
                }}
              >
                <Linkedin size={15} className="text-white drop-shadow-lg" />
                <span className="font-mono text-[11px] text-white font-semibold">LinkedIn</span>
              </a>

              {/* Gmail */}
              <a
                href={`mailto:${portfolio.email}`}
                className="group flex items-center gap-2 rounded-xl px-3.5 py-2.5 transition-all duration-200 hover:-translate-y-0.5"
                title="Send Email"
                style={{
                  background: 'linear-gradient(145deg,#EA4335,#c1271e)',
                  boxShadow: '0 4px 15px rgba(234,67,53,0.4), 0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
                }}
              >
                <Mail size={15} className="text-white drop-shadow-lg" />
                <span className="font-mono text-[11px] text-white font-semibold">Gmail</span>
              </a>
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

              {/* Tab 4: 3D Holographic Globe */}
              {activeTab === 'globe' && (
                <div className="flex flex-col items-center justify-center py-2">
                  <HolographicGlobe className="w-full max-w-[280px] h-[220px]" />
                  <p className="mt-2 text-center font-mono text-[10px] text-zinc-400">
                    Location Coordinates: <span className="text-cyan-400">20.2961° N, 85.8245° E (Bhubaneswar, IN)</span>
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
