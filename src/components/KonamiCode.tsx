import { useEffect, useState, useRef } from 'react';
import { Trophy, Sparkles, X, Terminal, Shield, Zap, Flame } from 'lucide-react';
import { sound } from '../lib/sound';

const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  vRot: number;
}

export function KonamiCode() {
  const [isActive, setIsActive] = useState(false);
  const keyIndex = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrame = useRef<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const expected = KONAMI_SEQUENCE[keyIndex.current];
      const actual = e.code;

      if (actual === expected) {
        keyIndex.current++;
        if (keyIndex.current === KONAMI_SEQUENCE.length) {
          keyIndex.current = 0;
          setIsActive(true);
          sound.playSuccess();
        }
      } else {
        keyIndex.current = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Confetti Particle Engine
  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#00e5ff', '#a855f7', '#10b981', '#f59e0b', '#ec4899', '#3b82f6'];
    const particles: Particle[] = [];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 5 + 3,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 10,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;

        if (p.y > canvas.height) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      animFrame.current = requestAnimationFrame(render);
    };

    render();

    // Auto-dismiss after 12 seconds
    const timer = setTimeout(() => {
      setIsActive(false);
    }, 12000);

    return () => {
      clearTimeout(timer);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={() => setIsActive(false)}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 cursor-pointer animate-in fade-in duration-300"
    >
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 max-w-lg w-full rounded-3xl border-2 border-cyan-400 bg-[#070b18]/95 p-6 sm:p-8 shadow-[0_0_80px_rgba(6,182,212,0.6)] font-mono text-center cursor-default"
      >
        <button
          type="button"
          onClick={() => setIsActive(false)}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/50 bg-cyan-950/60 px-4 py-1.5 text-xs text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.4)] mb-4">
          <Sparkles size={14} className="animate-spin" />
          <span>KONAMI CODE UNLOCKED</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-300 to-violet-400">
          SECRET LEVEL ACTIVATED
        </h2>

        <p className="mt-3 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
          You entered the legendary sequence: <span className="font-mono text-cyan-300 font-bold">↑ ↑ ↓ ↓ ← → ← → B A</span>.
          You clearly know your tech history and have an elite eye for detail.
        </p>

        {/* Unlocked Badges */}
        <div className="mt-6 grid grid-cols-2 gap-2.5 text-left text-xs">
          <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <Trophy className="text-amber-400 shrink-0" size={16} />
            <div>
              <div className="font-bold text-white">Retro Gamer</div>
              <div className="text-[10px] text-zinc-400">+5000 Dev XP</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <Zap className="text-cyan-400 shrink-0" size={16} />
            <div>
              <div className="font-bold text-white">10x Curiosity</div>
              <div className="text-[10px] text-zinc-400">Hidden routes mapped</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <Flame className="text-rose-400 shrink-0" size={16} />
            <div>
              <div className="font-bold text-white">Code Architect</div>
              <div className="text-[10px] text-zinc-400">Mastery verified</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <Shield className="text-emerald-400 shrink-0" size={16} />
            <div>
              <div className="font-bold text-white">VIP Access</div>
              <div className="text-[10px] text-zinc-400">Priority hire radar</div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-4 text-[11px] text-zinc-400">
          <span className="flex items-center gap-1.5">
            <Terminal size={12} className="text-cyan-400" />
            Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-bold">ESC</kbd> to return
          </span>
          <a
            href="https://wa.me/919861054025?text=Hey%20Adarsh!%20I%20unlocked%20your%20Konami%20Easter%20Egg%20%F0%9F%8E%AE"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-4 py-2 text-xs font-bold text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all"
          >
            Claim Secret Perks →
          </a>
        </div>
      </div>
    </div>
  );
}

