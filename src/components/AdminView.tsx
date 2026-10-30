import { useState, useEffect } from 'react';
import { Terminal, Shield, Cpu, Activity, Clock, Trash2, X, RefreshCw, Eye } from 'lucide-react';
import { sound } from '../lib/sound';

export function AdminView() {
  const [isOpen, setIsOpen] = useState(false);
  const [pin, setPin] = useState('');
  const [isAuthed, setIsAuthed] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [visits, setVisits] = useState(1);
  const [uptime, setUptime] = useState(0);

  // Check URL hash #admin or custom event
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setIsOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);

    const handleCustomOpen = () => setIsOpen(true);
    window.addEventListener('open-admin-panel', handleCustomOpen);

    // Track total visits in localStorage
    const saved = parseInt(localStorage.getItem('adarsh_admin_visits') || '0', 10) + 1;
    localStorage.setItem('adarsh_admin_visits', String(saved));
    setVisits(saved);

    const timer = setInterval(() => setUptime((p) => p + 1), 1000);

    return () => {
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('open-admin-panel', handleCustomOpen);
      clearInterval(timer);
    };
  }, []);

  const handlePinDigit = (digit: string) => {
    if (pin.length >= 4) return;
    sound.playClick();
    const next = pin + digit;
    setPin(next);

    if (next.length === 4) {
      if (next === '2580') {
        sound.playSuccess();
        setIsAuthed(true);
        setPinError(false);
      } else {
        setPinError(true);
        setTimeout(() => {
          setPin('');
          setPinError(false);
        }, 800);
      }
    }
  };

  const handleClose = () => {
    sound.playClick();
    setIsOpen(false);
    if (window.location.hash === '#admin') {
      history.replaceState(null, '', window.location.pathname);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 font-mono text-[#00ff41] animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl rounded-2xl border-2 border-[#00ff41]/50 bg-[#060906] p-6 sm:p-8 shadow-[0_0_60px_rgba(0,255,65,0.25)] overflow-hidden">
        
        {/* Scanline overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-25" />

        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#00ff41]/30 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Terminal size={18} />
            <span className="font-bold tracking-widest text-sm sm:text-base">
              SYSTEM_DIAGNOSTICS // ADMIN_CONSOLE v2.5
            </span>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="text-[#00ff41] hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {!isAuthed ? (
          /* PIN Gate */
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <Shield size={36} className="text-[#00ff41] animate-pulse mb-3" />
            <h3 className="text-lg font-bold">ENTER AUTHORIZATION PIN</h3>
            <p className="mt-1 text-xs text-[#00ff41]/70">Default admin bypass PIN: 2580</p>

            <div className="mt-6 flex gap-3">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-4 w-4 rounded-full border-2 border-[#00ff41] transition-all ${
                    pinError
                      ? 'bg-rose-500 border-rose-500 animate-bounce'
                      : pin.length > i
                        ? 'bg-[#00ff41]'
                        : 'bg-transparent'
                  }`}
                />
              ))}
            </div>

            {/* Keypad */}
            <div className="mt-8 grid grid-cols-3 gap-3 w-56">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => {
                    if (k === 'C') {
                      setPin('');
                    } else if (k === '⌫') {
                      setPin((p) => p.slice(0, -1));
                    } else {
                      handlePinDigit(k);
                    }
                  }}
                  className="rounded-xl border border-[#00ff41]/40 bg-[#00ff41]/[0.05] py-2.5 text-sm font-bold hover:bg-[#00ff41]/20 active:scale-95 transition-all"
                >
                  {k}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Admin Dashboard */
          <div className="space-y-6 text-xs">
            {/* Real-time stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl border border-[#00ff41]/30 bg-[#00ff41]/[0.03] p-3">
                <div className="flex items-center gap-1.5 text-[#00ff41]/70 text-[10px]">
                  <Activity size={12} /> TOTAL SESSIONS
                </div>
                <div className="mt-1 text-xl font-bold">{visits}</div>
              </div>

              <div className="rounded-xl border border-[#00ff41]/30 bg-[#00ff41]/[0.03] p-3">
                <div className="flex items-center gap-1.5 text-[#00ff41]/70 text-[10px]">
                  <Clock size={12} /> SESSION UPTIME
                </div>
                <div className="mt-1 text-xl font-bold">{uptime}s</div>
              </div>

              <div className="rounded-xl border border-[#00ff41]/30 bg-[#00ff41]/[0.03] p-3">
                <div className="flex items-center gap-1.5 text-[#00ff41]/70 text-[10px]">
                  <Cpu size={12} /> MEMORY ALLOC
                </div>
                <div className="mt-1 text-xl font-bold">12.8 MB</div>
              </div>

              <div className="rounded-xl border border-[#00ff41]/30 bg-[#00ff41]/[0.03] p-3">
                <div className="flex items-center gap-1.5 text-[#00ff41]/70 text-[10px]">
                  <Eye size={12} /> ENGINE STATUS
                </div>
                <div className="mt-1 text-sm font-bold text-emerald-400">NOMINAL (100%)</div>
              </div>
            </div>

            {/* Client Telemetry */}
            <div className="rounded-xl border border-[#00ff41]/30 bg-black/60 p-4 space-y-1.5 text-[11px]">
              <div>HOST: <span className="text-white">{window.location.host}</span></div>
              <div>VIEWPORT: <span className="text-white">{window.innerWidth} × {window.innerHeight}</span></div>
              <div>USER AGENT: <span className="text-white truncate block">{navigator.userAgent}</span></div>
              <div>SPEECH SYNTHESIS: <span className="text-emerald-400">ACTIVE ('en-IN')</span></div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-[#00ff41]/30">
              <button
                type="button"
                onClick={() => {
                  localStorage.clear();
                  sound.playSuccess();
                  alert('LocalStorage cleared.');
                }}
                className="flex items-center gap-1.5 rounded-lg border border-rose-500/50 bg-rose-950/20 px-3 py-1.5 text-rose-400 hover:bg-rose-900/40 text-xs"
              >
                <Trash2 size={12} /> Purge Cache
              </button>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="flex items-center gap-1.5 rounded-lg border border-[#00ff41]/50 bg-[#00ff41]/10 px-3 py-1.5 text-xs text-[#00ff41] hover:bg-[#00ff41]/20"
              >
                <RefreshCw size={12} /> Hard Reboot
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

