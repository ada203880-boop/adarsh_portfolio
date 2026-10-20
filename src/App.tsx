import { useEffect, useRef, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, ArrowUp,
  Code2, Github, Linkedin, Mail, MapPin, Menu, X,
  GraduationCap, Database, Palette, Globe, Sparkles,
  Terminal, Layers, ShieldCheck, BrainCircuit, Heart,
  ExternalLink, Copy, Check, FileText, Phone,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';
import scene from './assets/character-scene.png';
import rmhScreenshot from './assets/rmh-screenshot.png';

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ──────────────────────────────────────────────── */

const skills = [
  {
    group: 'Languages',
    icon: Code2,
    items: ['JavaScript', 'Python', 'Java', 'C++', 'PHP'],
  },
  {
    group: 'Frontend',
    icon: Palette,
    items: ['React.js', 'HTML', 'CSS', 'Responsive UI'],
  },
  {
    group: 'Backend',
    icon: Terminal,
    items: ['Node.js', 'Express.js', 'REST APIs'],
  },
  {
    group: 'Databases',
    icon: Database,
    items: ['MySQL', 'SQL'],
  },
  {
    group: 'CMS & E-Commerce',
    icon: Globe,
    items: ['WordPress', 'WooCommerce'],
  },
  {
    group: 'Data & Analytics',
    icon: BrainCircuit,
    items: ['Pandas', 'NumPy', 'Introductory ML'],
  },
  {
    group: 'Dev Tools',
    icon: Layers,
    items: ['Git', 'GitHub'],
  },
];

const services = [
  {
    n: '01',
    icon: Code2,
    title: 'Full-Stack Web Development',
    desc: 'Building complete web applications that connect responsive interfaces with dependable server-side logic, database operations, and application workflows.',
  },
  {
    n: '02',
    icon: Palette,
    title: 'Frontend Development',
    desc: 'Developing responsive, accessible interfaces with React.js, JavaScript, HTML, and CSS, with an emphasis on usability and maintainable components.',
  },
  {
    n: '03',
    icon: Terminal,
    title: 'Backend & API Development',
    desc: 'Implementing server-side functionality, REST API integrations, request validation, authentication workflows, and structured application logic.',
  },
  {
    n: '04',
    icon: Globe,
    title: 'E-Commerce Development',
    desc: 'Creating and customizing online shopping experiences with WordPress, WooCommerce, product catalogues, cart workflows, and order-management integrations.',
  },
  {
    n: '05',
    icon: Database,
    title: 'Database Integration',
    desc: 'Working with relational databases and structured data to support application functionality, data retrieval, validation, and reliable information handling.',
  },
];

const projects = [
  {
    id: '01',
    title: 'Rabindra Medical Hall',
    type: 'E-PHARMACY WEBSITE',
    desc: 'An e-commerce pharmacy project built around WordPress and WooCommerce, with a responsive storefront, medicine catalogue, shopping workflows, and order-handling functionality. The project focuses on making medicine discovery and online ordering more accessible through a clear, mobile-friendly shopping experience.',
    tech: ['WordPress', 'WooCommerce', 'PHP', 'JavaScript', 'MySQL'],
    url: 'https://ravindramedicalhall.in',
    visual: 'pharmacy',
  },
  {
    id: '02',
    title: 'FORGE Fitness',
    type: 'FITNESS APPLICATION CONCEPT',
    desc: 'An AI-oriented fitness application project exploring structured workout tracking, nutrition planning, recovery-related insights, and personalized fitness guidance. The project brings together application interface design, data-oriented workflows, and fitness-focused digital experiences.',
    tech: ['JavaScript', 'Python', 'REST APIs', 'MySQL'],
    url: '',
    visual: 'forge',
  },
];

const education = [
  {
    period: '2021 — 2025',
    title: 'B.Tech · Computer Science & Engineering',
    org: 'CV Raman Global University',
    note: 'Bhubaneswar, Odisha · CGPA 7.6 / 10',
    icon: GraduationCap,
  },
  {
    period: '2018 — 2020',
    title: 'Class XII · Intermediate',
    org: 'Suddhananda Vidyalaya',
    note: 'Cuttack, Odisha',
    icon: GraduationCap,
  },
];

const certificates = [
  { issuer: 'NPTEL · IIT Kanpur', name: 'Practical Cyber Security for Cyber Security Practitioners', type: 'shield' },
  { issuer: 'LearnWik Solutions', name: 'Industrial Training in Data Science', type: 'data' },
  { issuer: 'Palo Alto Networks · Coursera', name: 'Cloud Security Fundamentals', type: 'cloud' },
  { issuer: 'Google · Coursera', name: 'Foundations of User Experience (UX) Design', type: 'ux' },
];

/* ─── Particle canvas (lightweight background ambience) ─── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0;
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();

    const COUNT = window.innerWidth < 768 ? 26 : 48;
    type Particle = { x: number; y: number; r: number; vx: number; vy: number; alpha: number; col: string };
    const palette = ['rgba(148,98,255,', 'rgba(66,216,255,', 'rgba(255,255,255,'];

    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.4,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.12,
      alpha: Math.random() * 0.35 + 0.08,
      col: palette[Math.floor(Math.random() * palette.length)],
    }));

    let rafId: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.col}${p.alpha})`;
        ctx.fill();
      }
      rafId = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener('resize', resize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      aria-hidden="true"
    />
  );
}

/* ─── Cinematic Loader ────────────────────────────────── */
function CinematicLoader({ onDone }: { onDone: () => void }) {
  const nameRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasVisited = typeof window !== 'undefined' && sessionStorage.getItem('portfolio_visited');
    if (prefersReducedMotion || hasVisited) { onDone(); return; }

    sessionStorage.setItem('portfolio_visited', 'true');

    const nameTimer = window.setTimeout(() => {
      nameRef.current?.classList.add('ready');
    }, 80);

    const exitTimer = window.setTimeout(() => {
      loaderRef.current?.classList.add('cin-loader-exit');
      window.setTimeout(onDone, 700);
    }, 1400);

    return () => {
      window.clearTimeout(nameTimer);
      window.clearTimeout(exitTimer);
    };
  }, [onDone]);

  return (
    <div ref={loaderRef} className="cin-loader" aria-hidden="true">
      <div className="cin-loader-inner">
        <div ref={nameRef} className="cin-loader-name">ADARSH PANDA</div>
        <div className="cin-loader-bar" />
        <div className="cin-loader-tag">Full-Stack Developer</div>
      </div>
    </div>
  );
}

/* ─── Header ──────────────────────────────────────────── */
function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`;
  const links: [string, string][] = [
    ['About', '#about'],
    ['What I Do', '#services'],
    ['Education', '#education'],
    ['Projects', '#projects'],
    ['Tech Stack', '#stack'],
    ['Certifications', '#certifications'],
    ['Resume', resumeUrl],
    ['Contact', '#contact'],
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close mobile menu on outside click/tap */
  useEffect(() => {
    if (!open) return;
    const handleOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.site-header')) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
    };
  }, [open]);

  return (
    <header className={`site-header${scrolled ? ' header-scrolled' : ''}`}>
      <a className="brand" href="#home" aria-label="Adarsh Panda — home">
        <span className="brand-mark">A<span>.</span></span>
        <span>ADARSH PANDA<small>FULL-STACK DEVELOPER</small></span>
      </a>
      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <nav className={open ? 'nav-links nav-open' : 'nav-links'} role="navigation" aria-label="Main navigation">
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={close}>{label}</a>
        ))}
        <a className="nav-cta" href="mailto:ada203880@gmail.com" onClick={close}>
          Let's Talk <ArrowUpRight size={13} />
        </a>
      </nav>
    </header>
  );
}

/* ─── Eyebrow label ───────────────────────────────────── */
function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="eyebrow">
      <span aria-hidden="true" />
      {children}
    </div>
  );
}

/* ─── Section reveal wrapper (IntersectionObserver) ────── */
function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { el.style.opacity = '1'; el.style.transform = 'none'; return; }

    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity 0.72s ease ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        obs.disconnect();
      }
    }, { threshold: 0.1 });

    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ─── Main App ────────────────────────────────────────── */
export default function App() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [charVisible, setCharVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const heroArtRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const copyEmail = () => {
    navigator.clipboard.writeText('ada203880@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  /* Character entrance after loader */
  useEffect(() => {
    if (!loaderDone) return;
    const t = window.setTimeout(() => setCharVisible(true), 120);
    return () => window.clearTimeout(t);
  }, [loaderDone]);

  /* GSAP scroll-driven character parallax */
  useEffect(() => {
    if (!loaderDone) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const art = heroArtRef.current;
    const img = imgRef.current;
    if (!art || !img) return;

    const isMobile = window.innerWidth <= 768;

    const ctx = gsap.context(() => {
      gsap.to(art, {
        yPercent: isMobile ? -5 : -16,
        ease: 'none',
        scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 1.4 },
      });

      gsap.to(art, {
        scale: 0.94,
        opacity: 0.35,
        ease: 'power1.in',
        scrollTrigger: { trigger: '#home', start: '60% top', end: 'bottom top', scrub: 1 },
      });

      gsap.to(img, {
        rotateZ: isMobile ? 0 : -2.5,
        ease: 'none',
        scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 2.2 },
      });
    });

    return () => ctx.revert();
  }, [loaderDone]);

  /* Idle float when out of parallax scrub region */
  useEffect(() => {
    if (!charVisible) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const onScroll = () => {
      const heroEl = document.getElementById('home');
      if (!heroEl) return;
      const heroBottom = heroEl.getBoundingClientRect().bottom;
      const img = imgRef.current;
      if (!img) return;
      if (heroBottom > window.innerHeight * 0.1) {
        img.classList.add('char-idle');
      } else {
        img.classList.remove('char-idle');
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [charVisible]);

  return (
    <>
      {!loaderDone && <CinematicLoader onDone={() => setLoaderDone(true)} />}

      <div className="portfolio-shell">
        <ParticleCanvas />

        {/* Ambient glow orbs */}
        <div className="ambient ambient-one" aria-hidden="true" />
        <div className="ambient ambient-two" aria-hidden="true" />
        <div className="ambient ambient-three" aria-hidden="true" />

        <Header />

        <main id="main-content">

          {/* ── HERO ─────────────────────────────────────────── */}
          <section className="hero section-wrap" id="home" aria-label="Introduction">
            <div className="hero-copy">
              <Eyebrow>AVAILABLE FOR OPPORTUNITIES</Eyebrow>

              <h1 className="hero-headline">
                Building Digital<br />
                Products with<br />
                <span>Purpose.</span>
              </h1>

              <p className="hero-role">
                Full-Stack Developer
                <b> · </b>React.js
                <b> · </b>JavaScript
                <b> · </b>Python
                <b> · </b>Node.js
              </p>

              <p className="hero-intro">
                I build responsive web applications, interactive user experiences,
                and practical digital solutions by combining thoughtful frontend
                design with reliable backend development.
              </p>

              <div className="hero-actions">
                <a className="btn btn-primary" href="#projects">
                  Explore My Work <ArrowRight size={15} />
                </a>
                <a
                  className="btn btn-ghost"
                  href={`${import.meta.env.BASE_URL}resume.pdf`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="View Resume / CV (opens in new tab)"
                >
                  <FileText size={15} /> Resume / CV
                </a>
                <a className="btn btn-ghost" href="#contact">
                  Let's Connect <ArrowUpRight size={15} />
                </a>
              </div>

              <div className="social-row" role="list">
                <a
                  href="https://github.com/ada203880-boop"
                  target="_blank"
                  rel="noreferrer"
                  role="listitem"
                  aria-label="GitHub profile"
                >
                  <Github size={15} /> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/adarsh-panda-5181b9214"
                  target="_blank"
                  rel="noreferrer"
                  role="listitem"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin size={15} /> LinkedIn
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="social-copy-btn"
                  role="listitem"
                  aria-label="Copy email address"
                >
                  {copied ? <Check size={14} color="#4ade80" /> : <Copy size={14} />}
                  {copied ? 'Email Copied!' : 'Copy Email'}
                </button>
              </div>

              <a href="#about" className="scroll-cue" aria-label="Scroll to About section">
                <span aria-hidden="true"><ArrowDownRight size={14} /></span>
                SCROLL TO EXPLORE
              </a>
            </div>

            {/* ── CHARACTER ART ───────────────────────────── */}
            <div ref={heroArtRef} className="hero-art char-scroll-wrap">
              <div className="art-halo" aria-hidden="true" />
              <div className="art-halo art-halo-2" aria-hidden="true" />
              <div className="orbit orbit-a" aria-hidden="true" />
              <div className="orbit orbit-b" aria-hidden="true" />
              <div className="orbit orbit-c" aria-hidden="true" />

              <div className="float-tag tag-react" aria-hidden="true"><span>⚛</span> React.js</div>
              <div className="float-tag tag-python" aria-hidden="true"><span>Py</span> Python</div>
              <div className="float-tag tag-code" aria-hidden="true"><Code2 size={14} /> Full-Stack</div>
              <div className="float-tag tag-node" aria-hidden="true"><span>N</span> Node.js</div>

              <img
                ref={imgRef}
                src={scene}
                alt="Stylized 3D developer character surrounded by floating technology icons"
                className={`char-entrance${charVisible ? ' char-visible' : ''}`}
                loading="eager"
                decoding="async"
              />

              <div className="art-caption" aria-hidden="true">
                <span className="pulse-dot" />
                BUILDING DIGITAL EXPERIENCES
                <b> ↗</b>
              </div>
            </div>
          </section>

          {/* ── ABOUT ──────────────────────────────────────── */}
          <section className="about section-wrap section-block" id="about" aria-labelledby="about-heading">
            <Reveal className="section-heading gsap-heading">
              <Eyebrow>01 / ABOUT ME</Eyebrow>
              <h2 id="about-heading">
                Turning Ideas into<br />
                <span>Digital Experiences.</span>
              </h2>
            </Reveal>

            <Reveal className="about-copy" delay={80}>
              <p>
                I'm a Computer Science and Engineering graduate and aspiring software developer
                with a focus on full-stack web development. I enjoy building practical applications
                that bring together intuitive user interfaces, reliable backend logic, database
                integration, and maintainable code.
              </p>
              <p>
                My experience with technologies including JavaScript, React.js, Python, Node.js,
                Express.js, PHP, MySQL, and WordPress / WooCommerce has helped me explore different
                aspects of application development — from interface implementation to data handling
                and API integration.
              </p>
              <p>
                I'm interested in solving real-world problems, continuously improving my engineering
                skills, and creating digital products that are useful, accessible, and dependable.
              </p>
              <div className="about-pills" role="list">
                <span role="listitem"><MapPin size={13} aria-hidden="true" /> Bhubaneswar, India</span>
                <span role="listitem"><GraduationCap size={13} aria-hidden="true" /> B.Tech CSE · 2025</span>
                <span role="listitem"><Code2 size={13} aria-hidden="true" /> Full-Stack Development</span>
              </div>
            </Reveal>

            <Reveal className="quick-card" delay={140}>
              <div className="quick-top">
                <span className="quick-icon"><Sparkles size={16} aria-hidden="true" /></span>
                <span>QUICK PROFILE</span>
                <b aria-hidden="true">✳</b>
              </div>
              <div className="quick-stat">
                <strong>05<span>+</span></strong>
                <small>Service areas</small>
              </div>
              <div className="quick-stat">
                <strong>02</strong>
                <small>Featured projects</small>
              </div>
              <div className="quick-stat">
                <strong>7.6</strong>
                <small>CGPA / 10</small>
              </div>
            </Reveal>
          </section>

          {/* ── SERVICES ───────────────────────────────────── */}
          <section className="services section-wrap section-block" id="services" aria-labelledby="services-heading">
            <Reveal className="section-heading gsap-heading">
              <Eyebrow>02 / WHAT I DO</Eyebrow>
              <h2 id="services-heading">
                Crafting solutions<br />
                <span>from front to back.</span>
              </h2>
            </Reveal>

            <Reveal className="section-intro-wrap" delay={70}>
              <p className="section-intro">
                A practical blend of engineering skill and product thinking —
                turning requirements into reliable digital experiences.
              </p>
            </Reveal>

            <div className="service-grid" role="list">
              {services.map((s, idx) => (
                <Reveal key={s.n} delay={idx * 55}>
                  <article className="service-card" role="listitem">
                    <div className="service-card-top">
                      <span className="service-icon" aria-hidden="true"><s.icon size={19} /></span>
                      <span className="card-number" aria-label={`Service ${s.n}`}>{s.n}</span>
                    </div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                    <span className="card-arrow" aria-hidden="true"><ArrowUpRight size={15} /></span>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ── EDUCATION ───────────────────────────────────── */}
          <section className="journey section-wrap section-block" id="education" aria-labelledby="education-heading">
            <Reveal className="section-heading gsap-heading">
              <Eyebrow>03 / MY JOURNEY</Eyebrow>
              <h2 id="education-heading">
                Academic<br />
                <span>foundation.</span>
              </h2>
            </Reveal>

            <div className="timeline" role="list">
              {education.map((c, i) => (
                <Reveal key={c.title} delay={i * 90}>
                  <article className="timeline-item" role="listitem">
                    <div className={`timeline-icon tone-${i}`} aria-hidden="true">
                      <c.icon size={18} />
                    </div>
                    <div className="timeline-body">
                      <span className="timeline-period">{c.period}</span>
                      <h3>{c.title}</h3>
                      <h4>{c.org}</h4>
                      <p>{c.note}</p>
                    </div>
                    <span className="timeline-count" aria-hidden="true">0{i + 1}</span>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal className="journey-note" delay={180}>
              <span aria-hidden="true">"</span>
              <p>Always learning. Always building. Always improving the way ideas become useful products.</p>
              <small>— ADARSH PANDA</small>
            </Reveal>
          </section>

          {/* ── PROJECTS ───────────────────────────────────── */}
          <section className="projects section-wrap section-block" id="projects" aria-labelledby="projects-heading">
            <Reveal className="section-heading gsap-heading">
              <Eyebrow>04 / SELECTED WORK</Eyebrow>
              <h2 id="projects-heading">
                Projects with<br />
                <span>purpose.</span>
              </h2>
            </Reveal>

            <Reveal className="projects-intro" delay={60}>
              <p>
                Selected work reflecting my interest in full-stack engineering,
                practical workflows, and useful digital products.
              </p>
              <span aria-hidden="true">02 PROJECTS <ArrowDownRight size={14} /></span>
            </Reveal>

            <div className="project-grid">
              {projects.map((p, idx) => (
                <Reveal key={p.id} delay={idx * 80}>
                  <article className="project-card">
                    <div className={`project-visual ${p.visual}`} role="img" aria-label={`${p.title} preview`}>
                      {p.visual === 'pharmacy' ? (
                        <>
                          <div className="real-screenshot-frame">
                            <div className="screenshot-browser-bar" aria-hidden="true">
                              <div className="browser-dots"><i /><i /><i /></div>
                              <div className="browser-address">ravindramedicalhall.in</div>
                            </div>
                            <div className="screenshot-img-wrap">
                              <img
                                src={rmhScreenshot}
                                alt="Rabindra Medical Hall live e-pharmacy interface screenshot"
                                className="project-screenshot-img"
                                loading="lazy"
                                width={626}
                                height={1156}
                              />
                            </div>
                          </div>
                          <div className="visual-label">LIVE STORE / HEALTHCARE</div>
                        </>
                      ) : (
                        <>
                          <div className="forge-phone" aria-hidden="true">
                            <div className="phone-top" />
                            <div className="phone-greeting">Good morning,<br /><b>LET'S GET STRONG</b></div>
                            <div className="phone-ring"><span>72%</span></div>
                            <div className="phone-bars"><i /><i /><i /><i /></div>
                          </div>
                          <div className="forge-orb orb-purple" />
                          <div className="forge-orb orb-cyan" />
                          <div className="visual-label">CONCEPT / FITNESS APP</div>
                        </>
                      )}
                    </div>

                    <div className="project-content">
                      <div className="project-meta">
                        <span>PROJECT {p.id}</span>
                        <span>{p.type}</span>
                      </div>
                      <h3>{p.title}</h3>
                      <p>{p.desc}</p>
                      <div className="tech-tags" role="list" aria-label="Technologies used">
                        {p.tech.map(t => (
                          <span key={t} role="listitem">{t}</span>
                        ))}
                      </div>
                      <div className="project-footer">
                        {p.url ? (
                          <a
                            href={p.url}
                            target="_blank"
                            rel="noreferrer"
                            className="project-link"
                            aria-label={`Visit ${p.title} website (opens in new tab)`}
                          >
                            <ExternalLink size={13} /> View Project
                          </a>
                        ) : (
                          <a
                            href="https://github.com/ada203880-boop"
                            target="_blank"
                            rel="noreferrer"
                            className="project-link"
                            aria-label={`View code repository for ${p.title} (opens in new tab)`}
                          >
                            <Github size={13} /> Architecture & Code
                          </a>
                        )}
                        <span className="project-arrow" aria-hidden="true">
                          <ArrowUpRight size={16} />
                        </span>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ── TECH STACK ─────────────────────────────────── */}
          <section className="stack section-wrap section-block" id="stack" aria-labelledby="stack-heading">
            <Reveal className="section-heading gsap-heading">
              <Eyebrow>05 / MY TECH STACK</Eyebrow>
              <h2 id="stack-heading">
                Tools I use to<br />
                <span>make things work.</span>
              </h2>
            </Reveal>

            <Reveal className="section-intro-wrap" delay={60}>
              <p className="section-intro">
                Technologies and tools I use to build, integrate, and ship modern applications.
              </p>
            </Reveal>

            <div className="stack-grid" role="list">
              {skills.map((s, i) => (
                <Reveal key={s.group} delay={i * 45}>
                  <article className="stack-card" role="listitem">
                    <div className="stack-card-head">
                      <span className={`stack-icon stack-tone-${i}`} aria-hidden="true">
                        <s.icon size={17} />
                      </span>
                      <h3>{s.group}</h3>
                      <span className="stack-index" aria-label={`Group ${i + 1}`}>0{i + 1}</span>
                    </div>
                    <div className="stack-tags" role="list" aria-label={`${s.group} skills`}>
                      {s.items.map(item => (
                        <span key={item} role="listitem">{item}</span>
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <div className="stack-marquee" aria-label="Technology highlights ticker">
              <div className="marquee-track" aria-hidden="true">
                {[
                  'JAVASCRIPT', 'REACT.JS', 'PYTHON', 'NODE.JS', 'EXPRESS.JS',
                  'MYSQL', 'WORDPRESS', 'WOOCOMMERCE', 'REST APIs', 'PANDAS',
                  'NUMPY', 'PHP', 'HTML', 'CSS', 'GIT',
                  // duplicate for seamless loop
                  'JAVASCRIPT', 'REACT.JS', 'PYTHON', 'NODE.JS', 'EXPRESS.JS',
                  'MYSQL', 'WORDPRESS', 'WOOCOMMERCE', 'REST APIs', 'PANDAS',
                  'NUMPY', 'PHP', 'HTML', 'CSS', 'GIT',
                ].map((t, i) => (
                  <span key={i}>{t}<b>✳</b></span>
                ))}
              </div>
            </div>
          </section>

          {/* ── CERTIFICATIONS ─────────────────────────────── */}
          <section className="certs section-wrap section-block" id="certifications" aria-labelledby="certs-heading">
            <Reveal className="section-heading gsap-heading">
              <Eyebrow>06 / CERTIFICATIONS</Eyebrow>
              <h2 id="certs-heading">
                Learning never<br />
                <span>stops.</span>
              </h2>
            </Reveal>

            <div className="cert-grid" role="list">
              {certificates.map((c, i) => (
                <Reveal key={c.name} delay={i * 60}>
                  <article className="cert-card" role="listitem">
                    <span className={`cert-symbol cert-${c.type}`} aria-hidden="true">
                      {i === 0
                        ? <ShieldCheck size={18} />
                        : i === 1
                          ? <Database size={18} />
                          : i === 2
                            ? <Layers size={18} />
                            : <Palette size={18} />}
                    </span>
                    <span className="cert-org">{c.issuer}</span>
                    <h3>{c.name}</h3>
                    <span className="cert-line" aria-hidden="true" />
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ── CONTACT ────────────────────────────────────── */}
          <section className="contact section-wrap section-block" id="contact" aria-labelledby="contact-heading">
            <div className="contact-glow" aria-hidden="true" />

            <Reveal className="contact-copy">
              <Eyebrow>07 / LET'S CONNECT</Eyebrow>
              <h2 id="contact-heading">
                Let's Build Something<br />
                <span>Meaningful.</span>
              </h2>
              <p>
                I'm interested in opportunities where I can contribute to software development,
                full-stack web applications, and thoughtful digital experiences while continuing
                to grow as an engineer.
              </p>
              <a
                className="btn btn-primary"
                href="mailto:ada203880@gmail.com"
                aria-label="Send an email to Adarsh Panda"
              >
                Start a Conversation <ArrowUpRight size={15} />
              </a>
            </Reveal>

            <Reveal className="contact-details" delay={80}>
              <div className="contact-row">
                <span aria-hidden="true"><Mail size={17} /></span>
                <div>
                  <small>EMAIL ME</small>
                  <strong>ada203880@gmail.com</strong>
                </div>
                <div className="contact-row-actions">
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="btn-icon-subtle"
                    title="Copy email to clipboard"
                    aria-label="Copy email address"
                  >
                    {copied ? <Check size={15} color="#4ade80" /> : <Copy size={15} />}
                  </button>
                  <a
                    href="mailto:ada203880@gmail.com"
                    aria-label="Open email client"
                    className="btn-icon-subtle"
                    title="Open mail application"
                  >
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </div>
              </div>

              <a
                href="tel:+919861054025"
                className="contact-row"
                aria-label="Phone: +91 9861054025"
              >
                <span aria-hidden="true"><Phone size={17} /></span>
                <div>
                  <small>PHONE / WHATSAPP</small>
                  <strong>+91 9861054025</strong>
                </div>
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>

              <a
                href="https://github.com/ada203880-boop"
                target="_blank"
                rel="noreferrer"
                className="contact-row"
                aria-label="GitHub profile: ada203880-boop (opens in new tab)"
              >
                <span aria-hidden="true"><Github size={17} /></span>
                <div>
                  <small>GITHUB</small>
                  <strong>github.com/ada203880-boop</strong>
                </div>
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/in/adarsh-panda-5181b9214"
                target="_blank"
                rel="noreferrer"
                className="contact-row"
                aria-label="LinkedIn profile: Adarsh Panda (opens in new tab)"
              >
                <span aria-hidden="true"><Linkedin size={17} /></span>
                <div>
                  <small>LINKEDIN</small>
                  <strong>adarsh-panda-5181b9214</strong>
                </div>
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <div className="contact-row">
                <span aria-hidden="true"><MapPin size={17} /></span>
                <div>
                  <small>BASED IN</small>
                  <strong>Bhubaneswar, Odisha, India</strong>
                </div>
              </div>
            </Reveal>
          </section>

        </main>

        {/* ── FOOTER ─────────────────────────────────────── */}
        <footer className="site-footer section-wrap" role="contentinfo">
          <a className="brand footer-brand" href="#home" aria-label="Back to top — Adarsh Panda">
            <span className="brand-mark" aria-hidden="true">A<span>.</span></span>
            <span>ADARSH PANDA<small>FULL-STACK DEVELOPER</small></span>
          </a>
          <p>
            Designed with intention. Built with{' '}
            <Heart size={11} fill="currentColor" aria-label="love" /> and code.
          </p>
          <div className="footer-links" role="list">
            <a
              href="https://github.com/ada203880-boop"
              target="_blank"
              rel="noreferrer"
              role="listitem"
              aria-label="GitHub"
            >
              <Github size={15} />
            </a>
            <a
              href="https://www.linkedin.com/in/adarsh-panda-5181b9214"
              target="_blank"
              rel="noreferrer"
              role="listitem"
              aria-label="LinkedIn"
            >
              <Linkedin size={15} />
            </a>
            <a href="mailto:ada203880@gmail.com" role="listitem" aria-label="Email">
              <Mail size={15} />
            </a>
            <a href="#home" role="listitem" aria-label="Scroll to top">
              <ArrowUp size={15} />
            </a>
          </div>
          <small className="copyright">
            © {new Date().getFullYear()} ADARSH PANDA. ALL RIGHTS RESERVED.
          </small>
        </footer>
      </div>
    </>
  );
}
