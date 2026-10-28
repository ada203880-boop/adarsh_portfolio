import { useState, useEffect } from 'react';
import { Terminal, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { sound } from '../lib/sound';

interface NavigationProps {
  onOpenTerminal: () => void;
  activeSection: string;
}

export function Navigation({ onOpenTerminal, activeSection }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(sound.enabled);
  const [istTime, setIstTime] = useState('');

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setIstTime(now.toLocaleTimeString('en-US', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const state = sound.toggle();
    setSoundEnabled(state);
  };

  const navLinks = [
    { label: 'WHAT I DO', href: '#services' },
    { label: 'WORK', href: '#projects' },
    { label: 'JOURNEY', href: '#journey' },
    { label: 'ABOUT', href: '#about' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-[#03060c]/80 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-5'
          }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Brand Monogram */}
          <a
            href="#home"
            className="group flex items-center gap-3 text-white"
            data-cursor="HOME"
            onClick={() => sound.playHover()}
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/[0.04] font-mono text-sm font-bold tracking-tighter transition-all duration-300 group-hover:border-cyan-400 group-hover:bg-cyan-500/10">
              <span className="text-white group-hover:text-cyan-400">AP</span>
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-semibold tracking-wider text-white">ADARSH PANDA</div>
              <div className="flex items-center gap-1.5 text-[9px] font-mono tracking-widest text-white/40">
                <span>BHU, IN</span>
                <span>•</span>
                <span className="text-cyan-400/90">{istTime || 'IST'}</span>
              </div>
            </div>
          </a>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => sound.playHover()}
                  data-cursor="GO"
                  className={`relative rounded-full px-4 py-1.5 text-[10px] font-mono font-medium tracking-[0.2em] transition-all duration-300 ${isActive
                    ? 'bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
                    }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action HUD: Sound + Terminal + Let's Talk */}
          <div className="flex items-center gap-2.5">
            {/* Audio Toggle with Equalizer bars */}
            <button
              onClick={toggleSound}
              className={`flex h-9 items-center gap-2 rounded-full border px-3 text-[10px] font-mono tracking-wider transition-all duration-300 ${soundEnabled
                ? 'border-cyan-400/40 bg-cyan-500/10 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                : 'border-white/10 bg-white/[0.02] text-white/40 hover:border-white/30 hover:text-white'
                }`}
              title={soundEnabled ? 'Mute audio' : 'Enable ambient soundscape'}
              aria-label="Toggle sound"
            >
              {soundEnabled ? (
                <div className="flex items-end gap-0.5 h-3 w-3">
                  <span className="w-0.5 bg-cyan-400 animate-pulse h-full" />
                  <span className="w-0.5 bg-cyan-400 animate-pulse h-2/3" style={{ animationDelay: '0.15s' }} />
                  <span className="w-0.5 bg-cyan-400 animate-pulse h-4/5" style={{ animationDelay: '0.3s' }} />
                </div>
              ) : (
                <VolumeX size={13} />
              )}
              <span className="hidden lg:inline">{soundEnabled ? 'AUDIO ON' : 'AUDIO OFF'}</span>
            </button>

            {/* Terminal Command Palette Button */}
            <button
              onClick={onOpenTerminal}
              className="flex h-9 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 text-[10px] font-mono tracking-wider text-white/70 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-300 transition-all duration-300"
              data-cursor="TERMINAL"
              title="Open Terminal [Cmd + K]"
            >
              <Terminal size={13} className="text-cyan-400" />
              <span className="hidden sm:inline">TERMINAL</span>
              <kbd className="hidden lg:inline rounded bg-white/10 px-1 py-0.2 text-[9px] text-white/40 font-mono">⌘K</kbd>
            </button>

            {/* Let's Talk CTA */}
            <a
              href="#contact"
              onClick={() => sound.playClick()}
              data-cursor="CONNECT"
              className="hidden sm:flex h-9 items-center gap-1.5 rounded-full bg-white px-4 text-[11px] font-semibold tracking-wider text-black transition-all duration-300 hover:bg-cyan-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.5)]"
            >
              LET'S TALK
              <ArrowUpRight size={13} />
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white md:hidden"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col justify-between bg-black/95 backdrop-blur-2xl px-6 pt-28 pb-10 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="space-y-6">
            <p className="font-mono text-xs text-cyan-400 tracking-[0.3em]">NAVIGATION MENU</p>
            <div className="space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-3xl font-light tracking-tight text-white/80 hover:text-cyan-400 transition"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4 border-t border-white/10 pt-6">
            <div className="flex items-center justify-between text-xs font-mono text-white/50">
              <span>LOCATION: BHUBANESWAR</span>
              <span>{istTime} IST</span>
            </div>
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3.5 text-xs font-bold uppercase tracking-wider text-black"
            >
              Initiate Contact <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
