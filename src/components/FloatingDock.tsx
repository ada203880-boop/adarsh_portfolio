import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Download, Mail, ArrowUp, Github, Linkedin, MessageCircle, Instagram, Zap, X as CloseIcon } from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { sound } from '../lib/sound';

interface FloatingDockProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

interface ActionItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  action?: () => void;
  href?: string;
  color: string;
}

export function FloatingDock({ onOpenTerminal, onOpenResume }: FloatingDockProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      setScrollProgress(total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const ringRadius = 18;
  const circumference = 2 * Math.PI * ringRadius;

  const items: ActionItem[] = [
    {
      id: 'whatsapp',
      icon: <MessageCircle size={18} className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] filter" />,
      label: 'WhatsApp: Direct Chat',
      href: 'https://wa.me/919861054025?text=Hello%20Adarsh!%20I%20saw%20your%20portfolio.%20How%20can%20you%20help%20me%3F',
      color: '#25D366',
    },
    {
      id: 'instagram',
      icon: <Instagram size={18} className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] filter" />,
      label: 'Instagram: @__a_._d_._i__',
      href: 'https://www.instagram.com/__a_._d_._i__?srtk=MWpwd2IwczBqaHN2eA==',
      color: '#E1306C',
    },
    {
      id: 'github',
      icon: <Github size={18} className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] filter" />,
      label: 'GitHub Profile',
      href: portfolio.links.github,
      color: '#ffffff',
    },
    {
      id: 'linkedin',
      icon: <Linkedin size={18} className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] filter" />,
      label: 'LinkedIn Profile',
      href: portfolio.links.linkedin,
      color: '#0a66c2',
    },
    {
      id: 'email',
      icon: <Mail size={18} className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] filter" />,
      label: `Email: ${portfolio.email}`,
      href: `mailto:${portfolio.email}?subject=Collaboration%20Inquiry%20with%20Adarsh%20Panda`,
      color: '#ea4335',
    },
    {
      id: 'terminal',
      icon: <Terminal size={18} className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] filter" />,
      label: 'Terminal Console [⌘K]',
      action: () => {
        sound.playClick();
        onOpenTerminal();
      },
      color: '#06b6d4',
    },
    {
      id: 'resume',
      icon: <Download size={18} className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] filter" />,
      label: 'Resume (PDF)',
      action: () => {
        sound.playClick();
        onOpenResume();
      },
      color: '#34d399',
    },
  ];

  return (
    <motion.aside
      className="fixed bottom-6 right-2.5 sm:right-3.5 z-[70] flex flex-col items-center gap-2 select-none"
      initial={{ x: 60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
      aria-label="Quick Actions & Social Dock"
    >
      {/* Vertical Action Column with 3D Glass Depth (Always visible on desktop, toggleable on mobile) */}
      <div className={`${isMobileOpen ? 'flex' : 'hidden sm:flex'} flex-col items-center gap-1.5 rounded-2xl border border-white/15 bg-[#060814]/90 p-1.5 backdrop-blur-2xl shadow-[0_15px_50px_rgba(0,0,0,0.85),inset_0_1px_2px_rgba(255,255,255,0.15)] ring-1 ring-white/[0.06]`}>
        {items.map((item, idx) => {
          const isHovered = hoveredId === item.id;

          const content = (
            <motion.div
              whileHover={{ scale: 1.18, rotateZ: idx % 2 === 0 ? 2 : -2 }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => {
                setHoveredId(item.id);
                sound.playHover();
              }}
              onMouseLeave={() => setHoveredId(null)}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] shadow-[0_4px_12px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-200 hover:border-white/30"
              style={{
                boxShadow: isHovered
                  ? `0 0 20px -2px ${item.color}70, 0 6px 14px rgba(0,0,0,0.8)`
                  : '0 4px 10px rgba(0,0,0,0.6)',
              }}
            >
              {/* Tooltip to the Left (never overlapping the screen) */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-full top-1/2 -translate-y-1/2 mr-3 whitespace-nowrap rounded-lg border border-white/10 bg-[#090b16]/95 px-3 py-1.5 text-[11px] font-mono tracking-wider text-white shadow-2xl backdrop-blur-md pointer-events-none z-50"
                  >
                    <span style={{ color: item.color }} className="font-semibold mr-1.5">●</span>
                    {item.label}
                    <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-0 h-0 border-t-[4px] border-b-[4px] border-l-[4px] border-t-transparent border-b-transparent border-l-white/20" />
                  </motion.div>
                )}
              </AnimatePresence>

              <span
                style={{ color: item.color }}
                className="transform transition-transform duration-200 hover:scale-110"
              >
                {item.icon}
              </span>
            </motion.div>
          );

          if (item.href) {
            return (
              <a
                key={item.id}
                href={item.href}
                target={item.id === 'email' ? undefined : '_blank'}
                rel="noreferrer"
                aria-label={item.label}
              >
                {content}
              </a>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={item.action}
              aria-label={item.label}
            >
              {content}
            </button>
          );
        })}
      </div>

      {/* Mobile Quick Action Toggle FAB Button */}
      <button
        type="button"
        onClick={() => {
          sound.playClick();
          setIsMobileOpen((prev) => !prev);
        }}
        className="flex sm:hidden h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/40 bg-[#060814]/90 backdrop-blur-xl shadow-[0_6px_20px_rgba(6,182,212,0.35)] text-cyan-300 transition-all active:scale-95"
        aria-label="Toggle quick actions dock"
      >
        {isMobileOpen ? <CloseIcon size={16} /> : <Zap size={16} className="text-cyan-400 animate-pulse" />}
      </button>

      {/* Back to Top with Clean Circular Scroll Progress Ring */}
      <motion.button
        type="button"
        onClick={scrollToTop}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => {
          setHoveredId('top');
          sound.playHover();
        }}
        onMouseLeave={() => setHoveredId(null)}
        className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-[#060814]/90 backdrop-blur-xl shadow-[0_8px_25px_rgba(0,0,0,0.85)] transition hover:border-cyan-400/60"
        aria-label="Scroll to top"
      >
        {/* Tooltip to the Left */}
        <AnimatePresence>
          {hoveredId === 'top' && (
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.15 }}
              className="absolute right-full top-1/2 -translate-y-1/2 mr-3 whitespace-nowrap rounded-lg border border-white/10 bg-[#090b16]/95 px-3 py-1.5 text-[11px] font-mono tracking-wider text-cyan-300 shadow-2xl backdrop-blur-md pointer-events-none z-50"
            >
              <span className="text-white font-semibold mr-1.5">↑</span>
              Back to Top ({Math.round(scrollProgress * 100)}%)
              <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-0 h-0 border-t-[4px] border-b-[4px] border-l-[4px] border-t-transparent border-b-transparent border-l-white/20" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* SVG Circular Progress Ring */}
        <svg
          className="absolute inset-0 h-full w-full pointer-events-none"
          viewBox="0 0 44 44"
          style={{ transform: 'rotate(-90deg)' }}
          aria-hidden="true"
        >
          {/* Background track */}
          <circle
            cx="22"
            cy="22"
            r={ringRadius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="2.5"
          />
          {/* Active progress */}
          <circle
            cx="22"
            cy="22"
            r={ringRadius}
            fill="none"
            stroke="#22d3ee"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - scrollProgress)}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.1s linear',
            }}
          />
        </svg>

        <ArrowUp size={16} className="text-cyan-300 relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
      </motion.button>
    </motion.aside>
  );
}
