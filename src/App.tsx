import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { CinematicLoader } from './components/CinematicLoader';
import { CinematicCanvas } from './components/CinematicCanvas';
import { CustomCursor } from './components/CustomCursor';
import { CommandPalette } from './components/CommandPalette';
import { Navigation } from './components/Navigation';
import { ScrollIndicator } from './components/ScrollIndicator';
import { ToastContainer } from './components/Toast';
import { HireMeBanner } from './components/HireMeBanner';
import { ResumeModal } from './components/ResumeModal';

// ── Page Sections (in clean separated sequence) ──────────────
import { HeroSection } from './components/HeroSection';                   // 01 HERO
import { WhatIDoSection } from './components/WhatIDoSection';             // 02 WHAT I DO + TECHSTACK
import { ProjectsSection } from './components/ProjectsSection';           // 03 FEATURED WORK
import { SkillsSection } from './components/SkillsSection';               // 04 CAPABILITY MATRIX
import { EducationSection } from './components/EducationSection';         // 05 EDUCATION (SEPARATE)
import { CertificationsSection } from './components/CertificationsSection';// 06 CERTIFICATIONS (SEPARATE)
import { AboutSection } from './components/AboutSection';                 // 07 PHILOSOPHY & ABOUT
import { ContactSection } from './components/ContactSection';             // 08 CONTACT

gsap.registerPlugin(ScrollTrigger);

const SECTION_IDS = [
  'home',
  'services',
  'projects',
  'skills',
  'education',
  'certifications',
  'about',
  'contact',
];

export default function App() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [isTerminalOpen, setTerminal] = useState(false);
  const [isResumeOpen, setResumeOpen] = useState(false);
  const [activeSection, setSection] = useState('home');
  const mainRef = useRef<HTMLElement>(null);

  // ── Lenis smooth scroll + GSAP ticker sync ────────────────
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

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  // ── GSAP scroll-triggered section reveals ────────────────
  useEffect(() => {
    if (!loaderDone) return;

    const sections = mainRef.current?.querySelectorAll<HTMLElement>('section[id]');
    if (!sections) return;

    sections.forEach((section) => {
      const heading = section.querySelector('h2');
      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 44 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [loaderDone]);

  // ── Keyboard: Cmd/Ctrl + K → terminal toggle ──────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setTerminal((p) => !p);
      }
      if (e.key === 'Escape') {
        setTerminal(false);
        setResumeOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // ── Active section tracker for nav pills ──────────────────
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 220;
      for (const id of SECTION_IDS) {
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
      {/* ── Boot preloader ── */}
      {!loaderDone && <CinematicLoader onDone={() => setLoaderDone(true)} />}

      {/* ── Always-on background layers ── */}
      <CinematicCanvas />
      <CustomCursor />
      <ScrollIndicator />

      {/* ── Global toast notifications ── */}
      <ToastContainer />

      {/* ── Modals & Overlays ── */}
      <CommandPalette isOpen={isTerminalOpen} onClose={() => setTerminal(false)} />
      <ResumeModal isOpen={isResumeOpen} onClose={() => setResumeOpen(false)} />

      {/* ── Global Navigation HUD ── */}
      <Navigation
        onOpenTerminal={() => setTerminal(true)}
        activeSection={activeSection}
      />

      {/* ── Sticky "Open to Work" bottom banner ── */}
      <HireMeBanner />

      {/*
        PAGE FLOW - All sections separate & in logical narrative order:
        01 HERO
        02 SERVICES / WHAT I DO + TECHSTACK PHYSICS
        03 PROJECTS (WORK)
        04 SKILLS MATRIX
        05 EDUCATION (SEPARATE)
        06 CERTIFICATIONS (SEPARATE)
        07 PHILOSOPHY & ABOUT (WITH LIVE GITHUB TELEMETRY)
        08 CONTACT TRANSMISSION DOCK
      */}
      <main id="main-content" ref={mainRef} className="relative z-10">
        {/* 01 ── HERO */}
        <HeroSection
          onOpenTerminal={() => setTerminal(true)}
          onOpenResume={() => setResumeOpen(true)}
        />

        {/* 02 ── WHAT I DO + TECHSTACK */}
        <WhatIDoSection />

        {/* 03 ── FEATURED PROJECTS */}
        <ProjectsSection />

        {/* 04 ── CAPABILITY MATRIX */}
        <SkillsSection />

        {/* 05 ── EDUCATION (SEPARATE) */}
        <EducationSection />

        {/* 06 ── CERTIFICATIONS (SEPARATE) */}
        <CertificationsSection />

        {/* 07 ── PHILOSOPHY & ABOUT */}
        <AboutSection onOpenResume={() => setResumeOpen(true)} />

        {/* 08 ── CONTACT */}
        <ContactSection />
      </main>
    </div>
  );
}
