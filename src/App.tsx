import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { CinematicLoader } from './components/CinematicLoader';
import { CinematicCanvas } from './components/CinematicCanvas';
import { CustomCursor } from './components/CustomCursor';
import { CommandPalette } from './components/CommandPalette';
import { ResumeModal } from './components/ResumeModal';
import { ToastContainer } from './components/Toast';
import { Navigation } from './components/Navigation';
import { VelocityMarquee } from './components/VelocityMarquee';
import { BentoGrid } from './components/BentoGrid';
import { FloatingDock } from './components/FloatingDock';
import { CRTOverlay } from './components/CRTOverlay';
import { AudioVisualizerHUD } from './components/AudioVisualizerHUD';
import { sound } from './lib/sound';

// Advanced & Interactive Additions
import { AskAdarshChat } from './components/AskAdarshChat';
import { KonamiCode } from './components/KonamiCode';
import { HiringStatusWidget } from './components/HiringStatusWidget';
import MusicPlayer from './components/MusicPlayer';
import { AdminView } from './components/AdminView';
import { InteractiveResume } from './components/InteractiveResume';
import { MultiDeviceMockup } from './components/MultiDeviceMockup';
import { WorldMap } from './components/WorldMap';
import { AchievementsSection } from './components/AchievementsSection';
import WorkspaceGallery from './components/WorkspaceGallery';

// Page Sections
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { GithubActivity } from './components/GithubActivity';
import { CareerTimeline } from './components/CareerTimeline';
import { EducationSection } from './components/EducationSection';
import { CertificationsSection } from './components/CertificationsSection';
import { WhatIDoSection } from './components/WhatIDoSection';
import { ContactSection } from './components/ContactSection';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [isTerminalOpen, setTerminal] = useState(false);
  const [isResumeOpen, setResumeOpen] = useState(false);
  const [isInteractiveResumeOpen, setInteractiveResumeOpen] = useState(false);
  const [activeSection, setSection] = useState('home');
  const [crtMode, setCrtMode] = useState(false);
  const [isMuted, setMuted] = useState(!sound.enabled);
  const [scrollVel, setScrollVel] = useState(0);

  // Sync sound mute state with navigation toggle
  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<{ enabled: boolean }>;
      if (custom.detail) {
        setMuted(!custom.detail.enabled);
      }
    };
    window.addEventListener('sound-state-change', handler);
    return () => window.removeEventListener('sound-state-change', handler);
  }, []);

  // Lenis smooth scroll + GSAP ticker sync
  useEffect(() => {
    const isMobile = window.innerWidth < 1024 || window.matchMedia('(pointer: coarse)').matches;
    const lenis = new Lenis({
      duration: isMobile ? 0.9 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1,
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    lenis.on('scroll', (e: { velocity: number }) => {
      ScrollTrigger.update();
      if (typeof e.velocity === 'number') {
        sound.playScrollFlow(e.velocity);
        setScrollVel(e.velocity);
      }
      // Never skew on mobile/touch screens to guarantee 100% viewport width alignment
      if (prefersReducedMotion || isMobile) return;
      const main = document.getElementById('main-content');
      if (main && typeof e.velocity === 'number') {
        const clampedSkew = Math.max(-1.5, Math.min(1.5, e.velocity * 0.06));
        main.style.transform = Math.abs(clampedSkew) > 0.05 ? `skewY(${clampedSkew.toFixed(3)}deg)` : 'none';
        main.style.transition = 'transform 0.15s cubic-bezier(0.2, 0, 0, 1)';
      }
    });

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => { gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);

  // Keyboard: Cmd/Ctrl + K -> terminal toggle
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setTerminal((p) => !p);
      }
      if (e.key === 'Escape') setTerminal(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Active section tracker for nav pills
  useEffect(() => {
    const IDS = ['home', 'about', 'skills', 'projects', 'devices', 'worldmap', 'achievements', 'telemetry', 'journey', 'education', 'certifications', 'workspace', 'services', 'contact'];
    const onScroll = () => {
      const y = window.scrollY + 220;
      for (const id of IDS) {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop && y < el.offsetTop + el.offsetHeight) {
          setSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleCRT = () => setCrtMode((p) => !p);

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-[#03060c] text-white selection:bg-cyan-500 selection:text-black">

      {/* Boot preloader */}
      {!loaderDone && <CinematicLoader onDone={() => setLoaderDone(true)} />}

      {/* Audio Visualizer HUD — bottom bar, appears when audio is active */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[200] pointer-events-none transition-opacity duration-500"
        style={{ opacity: !isMuted ? 1 : 0.25, height: '36px' }}
      >
        <AudioVisualizerHUD active={!isMuted} scrollVelocity={scrollVel} />
      </div>

      {/* Always-on background layers (with data pipeline network beams across whole page) */}
      <CinematicCanvas />
      <CustomCursor />

      {/* Overlays & Interactive Systems */}
      <CommandPalette
        isOpen={isTerminalOpen}
        onClose={() => setTerminal(false)}
        onToggleCRT={toggleCRT}
      />
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setResumeOpen(false)}
        onOpenInteractive={() => {
          setResumeOpen(false);
          setInteractiveResumeOpen(true);
        }}
      />
      <InteractiveResume
        isOpen={isInteractiveResumeOpen}
        onClose={() => setInteractiveResumeOpen(false)}
      />
      <ToastContainer />

      {/* Secret Diagnostic Admin View (#admin or PIN 2580) */}
      <AdminView />

      {/* Konami Code Easter Egg (↑↑↓↓←→←→BA) */}
      <KonamiCode />

      {/* AI "Ask Adarsh" Chat Widget (Gemini 2.0 Flash) */}
      <AskAdarshChat />

      {/* Ambient Lo-Fi Background Music Player */}
      <MusicPlayer />

      {/* Sticky Hiring Status Quick Widget (Desktop) */}
      <HiringStatusWidget />

      {/* CRT Phosphor Mode */}
      <CRTOverlay active={crtMode} />

      {/* Floating Vertical Shortcut Dock shifted slightly right to eliminate screen overlap */}
      <FloatingDock
        onOpenTerminal={() => setTerminal(true)}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Global Navigation HUD with Signature branding */}
      <Navigation
        onOpenTerminal={() => setTerminal(true)}
        activeSection={activeSection}
      />

      {/* =====================================================
          PAGE FLOW — seamlessly unified creative journey
          ===================================================== */}
      <main id="main-content" className="relative z-10 w-full max-w-full overflow-x-hidden">

        {/* 01 HERO */}
        <HeroSection
          onOpenTerminal={() => setTerminal(true)}
          onOpenResume={() => setResumeOpen(true)}
        />

        {/* VELOCITY MARQUEE */}
        <VelocityMarquee />

        {/* 02 ABOUT (Replaced in place of services) */}
        <AboutSection />

        {/* BENTO GRID — animated full-stack pipeline viz */}
        <BentoGrid />

        {/* 03 VERIFIED SKILLS & INTERACTIVE ZERO-G PHYSICS LAB */}
        <SkillsSection />

        {/* 04 FEATURED SYSTEMS / PROJECTS */}
        <ProjectsSection />

        {/* 05 CROSS-DEVICE PERFECTION (Multi-Device Mockup) */}
        <MultiDeviceMockup />

        {/* 06 WHERE I'VE SHIPPED (Interactive World Map) */}
        <WorldMap />

        {/* 07 MILESTONE ACHIEVEMENTS (Gamer XP Log) */}
        <AchievementsSection />

        {/* 08 LIVE GITHUB TELEMETRY RADAR & HEATMAP */}
        <section id="telemetry" className="relative w-full max-w-full overflow-hidden bg-[#03060c] pb-20 sm:pb-24 text-white">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <GithubActivity />
          </div>
        </section>

        {/* 09 CAREER & EXPERIENCE TIMELINE */}
        <CareerTimeline />

        {/* 10 ACADEMIC FOUNDATION */}
        <EducationSection />

        {/* 11 PROFESSIONAL CERTIFICATIONS */}
        <CertificationsSection />

        {/* 12 BEHIND THE BUILD (Workspace Code Gallery) */}
        <WorkspaceGallery />

        {/* 13 WHAT I DO (SERVICES FOR CLIENTS) */}
        <WhatIDoSection />

        {/* 14 CONTACT / TRANSMISSION DOCK */}
        <ContactSection />

      </main>
    </div>
  );
}
