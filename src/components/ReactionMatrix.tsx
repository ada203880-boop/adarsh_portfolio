import { useState, useEffect, useRef } from 'react';

interface ReactionCounts {
  rocket: number;
  fire: number;
  lightning: number;
  bulb: number;
}

const INITIAL: ReactionCounts = { rocket: 0, fire: 0, lightning: 0, bulb: 0 };

const REACTIONS: Array<{ key: keyof ReactionCounts; emoji: string; label: string; color: string }> = [
  { key: 'rocket',    emoji: '🚀', label: 'Impressive', color: '#06b6d4' },
  { key: 'fire',      emoji: '🔥', label: 'Hot Work',   color: '#f97316' },
  { key: 'lightning', emoji: '⚡', label: 'Fast',       color: '#eab308' },
  { key: 'bulb',      emoji: '💡', label: 'Creative',   color: '#a78bfa' },
];

const LS_KEY = 'adarsh-portfolio-reactions';

export function ReactionMatrix() {
  const [counts, setCounts] = useState<ReactionCounts>(() => {
    try {
      const stored = localStorage.getItem(LS_KEY);
      return stored ? { ...INITIAL, ...JSON.parse(stored) } : INITIAL;
    } catch { return INITIAL; }
  });

  const [tapped, setTapped] = useState<Partial<Record<keyof ReactionCounts, boolean>>>({});
  const [floating, setFloating] = useState<Array<{ id: number; key: string; emoji: string }>>([]);
  const nextId = useRef(0);

  // Persist to localStorage
  useEffect(() => {
    try { localStorage.setItem(LS_KEY, JSON.stringify(counts)); } catch { /* ok */ }
  }, [counts]);

  const handleReact = (key: keyof ReactionCounts, emoji: string) => {
    // Allow multiple taps (each tap adds 1)
    setCounts(prev => ({ ...prev, [key]: prev[key] + 1 }));
    setTapped(prev => ({ ...prev, [key]: true }));
    setTimeout(() => setTapped(prev => ({ ...prev, [key]: false })), 300);

    // Floating emoji particle
    const id = nextId.current++;
    setFloating(prev => [...prev, { id, key, emoji }]);
    setTimeout(() => setFloating(prev => prev.filter(f => f.id !== id)), 1200);
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-3 justify-center">
        {REACTIONS.map(({ key, emoji, label, color }) => {
          const isTapped = tapped[key];
          return (
            <button
              key={key}
              type="button"
              onClick={() => handleReact(key, emoji)}
              className="relative flex flex-col items-center gap-1.5 rounded-2xl border px-5 py-3.5 font-mono text-xs transition-all duration-200 hover:scale-110 active:scale-95 select-none"
              style={{
                borderColor: isTapped ? color : `${color}40`,
                backgroundColor: isTapped ? `${color}22` : `${color}0a`,
                boxShadow: isTapped ? `0 0 20px ${color}50` : 'none',
              }}
              aria-label={`React with ${label}`}
            >
              <span className="text-2xl" style={{ filter: isTapped ? `drop-shadow(0 0 8px ${color})` : 'none' }}>
                {emoji}
              </span>
              <span className="text-zinc-400" style={{ color: isTapped ? color : undefined }}>
                {label}
              </span>
              <span
                className="min-w-[24px] rounded-full px-2 py-0.5 text-center text-[10px] font-bold transition-all"
                style={{ backgroundColor: `${color}25`, color }}
              >
                {counts[key]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 overflow-visible">
        {floating.map(({ id, emoji }) => (
          <span
            key={id}
            className="absolute text-2xl animate-bounce"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: '-10px',
              animation: 'floatUp 1.2s ease-out forwards',
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes floatUp {
          0%   { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-70px) scale(1.5); }
        }
      `}</style>
    </div>
  );
}

