import { useEffect, useState } from 'react';
import { ArrowDown, Github, Linkedin } from 'lucide-react';
import { portfolio } from '../data/portfolio';

export function HeroSection() {
    const [introComplete, setIntroComplete] = useState(false);

    useEffect(() => {
        const timer = window.setTimeout(() => setIntroComplete(true), 900);
        return () => window.clearTimeout(timer);
    }, []);

    return (
        <header
            id="top"
            className={`hero-section relative flex min-h-screen items-end overflow-hidden bg-black px-5 pb-12 pt-28 text-white sm:px-8 lg:px-16 ${introComplete ? 'hero-intro-complete' : ''}`}
        >
            <div className="hero-glow pointer-events-none absolute inset-0" />
            <div className="hero-grid pointer-events-none absolute inset-0" />

            <nav className="absolute left-5 right-5 top-5 z-20 flex items-center justify-between sm:left-8 sm:right-8 lg:left-16 lg:right-16">
                <a href="#top" className="text-xs tracking-[.2em]">
                    AP / 01
                </a>

                <div className="flex items-center gap-2">
                    {['WORK', 'JOURNEY', 'SKILLS', 'ABOUT', 'CONTACT'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="hidden rounded-full border border-white/10 px-4 py-2 text-[9px] tracking-[.2em] text-white/55 transition-colors hover:border-white/30 hover:text-white sm:block"
                        >
                            {item}
                        </a>
                    ))}
                </div>
            </nav>

            <div className="hero-copy relative z-10 w-full">
                <p className="hero-reveal mb-5 text-[10px] uppercase tracking-[.35em] text-white/40">
                    {portfolio.location}
                </p>

                <h1 className="hero-name max-w-6xl text-[17vw] font-light leading-[.76] tracking-[-.07em] sm:text-[13vw] lg:text-[10vw]">
                    {portfolio.name}
                </h1>

                <div className="hero-reveal mt-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xl font-light sm:text-3xl">{portfolio.title}</p>
                        <p className="mt-2 text-xs tracking-[.12em] text-white/45 sm:text-sm">
                            {portfolio.specialization}
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <a
                            aria-label="LinkedIn"
                            href={portfolio.links.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="flex h-11 w-11 items-center justify-center border border-white/10 transition-all hover:-translate-y-1 hover:border-white/40"
                        >
                            <Linkedin size={16} />
                        </a>

                        <a
                            aria-label="GitHub"
                            href={portfolio.links.github}
                            target="_blank"
                            rel="noreferrer"
                            className="flex h-11 w-11 items-center justify-center border border-white/10 transition-all hover:-translate-y-1 hover:border-white/40"
                        >
                            <Github size={16} />
                        </a>

                        <a
                            href="#work"
                            className="flex h-11 items-center gap-2 border border-white/10 px-4 text-[9px] uppercase tracking-[.2em] text-white/65 transition-all hover:-translate-y-1 hover:border-white/40 hover:text-white"
                        >
                            Explore <ArrowDown size={14} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="hero-scroll-hint pointer-events-none absolute bottom-4 right-5 z-10 text-[9px] tracking-[.25em] text-white/35 sm:right-8 lg:right-16">
                SCROLL TO EXPLORE ↓
            </div>
        </header>

    );
}