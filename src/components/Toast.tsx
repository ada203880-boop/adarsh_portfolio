import { useEffect, useState } from 'react';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
  emoji?: string;
}

// Global toast queue — use this from anywhere
let _dispatch: ((t: ToastMessage) => void) | null = null;

export function toast(message: string, type: ToastType = 'success', emoji?: string) {
  if (_dispatch) {
    _dispatch({ id: Math.random().toString(36).slice(2), type, message, emoji });
  }
}

const ICONS = {
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
};

const COLORS = {
  success: {
    border: 'border-emerald-500/40',
    bg: 'bg-emerald-950/60',
    icon: 'text-emerald-400',
    bar: 'bg-emerald-400',
  },
  info: {
    border: 'border-cyan-500/40',
    bg: 'bg-cyan-950/60',
    icon: 'text-cyan-400',
    bar: 'bg-cyan-400',
  },
  warning: {
    border: 'border-amber-500/40',
    bg: 'bg-amber-950/60',
    icon: 'text-amber-400',
    bar: 'bg-amber-400',
  },
};

function ToastItem({ toast: t, onRemove }: { toast: ToastMessage; onRemove: () => void }) {
  const [visible, setVisible] = useState(false);
  const Icon = ICONS[t.type];
  const c = COLORS[t.type];

  useEffect(() => {
    // Trigger entrance
    const show = setTimeout(() => setVisible(true), 10);
    // Auto-dismiss after 3.2s
    const hide = setTimeout(() => {
      setVisible(false);
      setTimeout(onRemove, 350);
    }, 3200);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, [onRemove]);

  return (
    <div
      className={`
        relative flex items-center gap-3 rounded-xl border px-4 py-3
        backdrop-blur-xl shadow-2xl min-w-[260px] max-w-[360px]
        transition-all duration-350
        ${c.border} ${c.bg}
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      {t.emoji ? (
        <span className="text-xl leading-none">{t.emoji}</span>
      ) : (
        <Icon size={16} className={`shrink-0 ${c.icon}`} />
      )}
      <p className="flex-1 font-mono text-xs text-white/90 tracking-wide">{t.message}</p>
      <button
        onClick={() => { setVisible(false); setTimeout(onRemove, 350); }}
        className="ml-1 text-white/30 hover:text-white/70 transition-colors"
      >
        <X size={13} />
      </button>
      {/* Progress bar */}
      <div
        className={`absolute bottom-0 left-0 h-[2px] rounded-b-xl ${c.bar} opacity-60`}
        style={{ animation: 'toast-drain 3.2s linear forwards' }}
      />
    </div>
  );
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    _dispatch = (t) => setToasts((prev) => [...prev.slice(-3), t]);
    return () => { _dispatch = null; };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 items-end pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <ToastItem
            toast={t}
            onRemove={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
          />
        </div>
      ))}
    </div>
  );
}
