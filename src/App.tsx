import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { CinematicLoader } from './components/CinematicLoader';
import { CinematicCanvas } from './components/CinematicCanvas';
import { CustomCursor } from './components/CustomCursor';
import { CommandPalette } from './components/CommandPalette';
import { Navigation } from './components/Navigation';
import { ScrollIndicator } from './components/ScrollIndicator';

// ── Page Sections (in sequence) ────────────────────────────────
import { HeroSection } from './components/HeroSection';      // 01 HERO
import { WhatIDoSection } from './components/WhatIDoSection';   // 02 WHAT I DO + 03 TECHSTACK
import { ProjectsSection } from './components/ProjectsSection';  // 04 FEATURED WORK
import { CareerTimeline } from './components/CareerTimeline';   // 05 CAREER & EXPERIENCE
import { AboutSection } from './components/AboutSection';     // 06 ABOUT & PHILOSOPHY
import { ContactSection } from './components/ContactSection';   // 07 CONTACT

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [isTerminalOpen, setTerminal] = useState(false);
  const [activeSection, setSection] = useState('home');

  // ── Lenis smooth scroll + GSAP ticker sync ──────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => { gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);

  // ── Keyboard: Cmd/Ctrl + K → terminal toggle ────────────────
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

  // ── Active section tracker for nav pills ────────────────────
  useEffect(() => {
    const IDS = ['home', 'services', 'projects', 'journey', 'about', 'contact'];
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

  return (
    <div className="relative min-h-screen bg-[#03060c] text-white selection:bg-cyan-500 selection:text-black">

      {/* ── Boot preloader ──────────────────────────────── */}
      {!loaderDone && <CinematicLoader onDone={() => setLoaderDone(true)} />}

      {/* ── Always-on background layers ─────────────────── */}
      <CinematicCanvas />
      <CustomCursor />
      <ScrollIndicator />

      {/* ── Overlays ────────────────────────────────────── */}
      <CommandPalette isOpen={isTerminalOpen} onClose={() => setTerminal(false)} />

      {/* ── Global Navigation HUD ───────────────────────── */}
      <Navigation
        onOpenTerminal={() => setTerminal(true)}
        activeSection={activeSection}
      />

      {/* ═══════════════════════════════════════════════════
          PAGE FLOW — exact sequence matching reference video
          ═══════════════════════════════════════════════════ */}
      <main id="main-content" className="relative z-10">

        {/* 01 ── HERO */}
        <HeroSection onOpenTerminal={() => setTerminal(true)} />

        {/* 02 ── WHAT I DO  +  03 ── MY TECHSTACK (same section component) */}
        <WhatIDoSection />

        {/* 04 ── FEATURED SYSTEMS / PROJECTS */}
        <ProjectsSection />

        {/* 05 ── CAREER & EXPERIENCE TIMELINE */}
        <CareerTimeline />

        {/* 06 ── ABOUT & ENGINEERING PHILOSOPHY */}
        <AboutSection />

        {/* 07 ── CONTACT / TRANSMISSION DOCK */}
        <ContactSection />

      </main>
    </div>
  );
}
