import { useEffect, useState, useRef, useCallback } from 'react';
import { Terminal, X, CornerDownLeft, Sparkles, ExternalLink, Play } from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { sound } from '../lib/sound';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleCRT?: () => void;
}

export function CommandPalette({ isOpen, onClose, onToggleCRT }: CommandPaletteProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ cmd: string; result: string | React.ReactNode }>>([
    {
      cmd: 'init',
      result: (
        <span className="text-zinc-400">
          Welcome to <span className="text-cyan-400 font-semibold">Adarsh's Terminal v2.6</span>. Type{' '}
          <span className="text-white bg-zinc-800 px-1 py-0.5 rounded font-mono">help</span> or click suggestions below.
          <br />
          <span className="text-violet-400 text-[10px]">TIP: Press <strong>▶ PLAY DEMO</strong> to watch an auto-guided tour.</span>
        </span>
      ),
    },
  ]);
  const [isDemoRunning, setDemoRunning] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const demoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      sound.playClick();
    }
    // Stop demo if terminal closes
    if (!isOpen && demoTimerRef.current) {
      clearTimeout(demoTimerRef.current);
      setDemoRunning(false);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Auto-Demo sequence: types each command with a typewriter delay
  const DEMO_SEQUENCE = ['about', 'projects', 'skills', 'contact', 'sudo hire'];

  const runAutoDemo = useCallback(() => {
    if (isDemoRunning) return;
    setDemoRunning(true);
    setHistory([{ cmd: 'init', result: <span className="text-violet-400 font-mono text-xs animate-pulse">▶ AUTO-DEMO MODE ACTIVATED — sit back and watch...</span> }]);

    let delay = 600;
    DEMO_SEQUENCE.forEach((cmd) => {
      // Show typing animation then execute
      demoTimerRef.current = setTimeout(() => {
        setInput(cmd);
        demoTimerRef.current = setTimeout(() => {
          setInput('');
          handleCommand(cmd);
        }, 700);
      }, delay);
      delay += 2800;
    });

    demoTimerRef.current = setTimeout(() => {
      setDemoRunning(false);
      setHistory(prev => [...prev, { cmd: '---', result: <span className="text-emerald-400 font-mono text-xs">✓ Demo complete. Type <strong>help</strong> to explore further.</span> }]);
    }, delay + 300);
  }, [isDemoRunning]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCommand = (cmdText: string) => {
    const raw = cmdText.trim();
    const cmd = raw.toLowerCase();
    if (!raw) return;

    sound.playHover();

    let output: React.ReactNode = '';

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs font-mono text-zinc-300">
            <p className="text-cyan-400 font-semibold">Available Commands:</p>
            <div className="grid grid-cols-[110px_1fr] gap-1 pt-1">
              <span className="text-white font-semibold">projects</span> <span>View deployed systems & case studies</span>
              <span className="text-white font-semibold">skills</span> <span>List technical stack & proficiencies</span>
              <span className="text-white font-semibold">contact</span> <span>Display email, phone, and coordinates</span>
              <span className="text-white font-semibold">about</span> <span>Read background & engineering focus</span>
              <span className="text-white font-semibold">admin</span> <span>Open system diagnostics console</span>
              <span className="text-white font-semibold">sudo hire</span> <span>Initiate recruitment / interview request</span>
              <span className="text-white font-semibold">clear</span> <span>Clear console logs</span>
            </div>
          </div>
        );
        break;

      case 'projects':
      case 'work':
        output = (
          <div className="space-y-2 text-xs font-mono">
            {portfolio.projects.map((p) => (
              <div key={p.id} className="rounded border border-zinc-800 bg-zinc-900/60 p-2.5">
                <div className="flex justify-between items-center text-cyan-400 font-bold">
                  <span>{p.name}</span>
                  <span className="text-[10px] text-zinc-400">{p.subtitle}</span>
                </div>
                <p className="text-zinc-400 mt-1">{p.stack}</p>
              </div>
            ))}
            <a
              href="#projects"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-cyan-400 underline hover:text-cyan-300 text-xs mt-1"
            >
              Scroll to interactive exhibition <ExternalLink size={12} />
            </a>
          </div>
        );
        break;

      case 'skills':
      case 'stack':
        output = (
          <div className="space-y-2 text-xs font-mono">
            {Object.entries(portfolio.skills).map(([category, items]) => (
              <div key={category}>
                <span className="text-cyan-400 font-semibold">{category}: </span>
                <span className="text-zinc-300">{items.join(', ')}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1.5 text-xs font-mono text-zinc-300">
            <p>
              <span className="text-cyan-400 font-semibold">Email: </span>
              <a href={`mailto:${portfolio.email}`} className="text-white underline">{portfolio.email}</a>
            </p>
            <p>
              <span className="text-cyan-400 font-semibold">Phone: </span>
              <a href={`tel:${portfolio.phone}`} className="text-white">{portfolio.phone}</a>
            </p>
            <p>
              <span className="text-cyan-400 font-semibold">LinkedIn: </span>
              <a href={portfolio.links.linkedin} target="_blank" rel="noreferrer" className="text-cyan-300 underline">
                adarsh-panda-5181b9214
              </a>
            </p>
            <p>
              <span className="text-cyan-400 font-semibold">Location: </span>
              <span>{portfolio.location}</span>
            </p>
          </div>
        );
        break;

      case 'admin':
        window.dispatchEvent(new CustomEvent('open-admin-panel'));
        onClose();
        output = <span className="text-emerald-400 font-mono">Launching diagnostics console...</span>;
        break;

      case 'about':
      case 'bio':
        output = (
          <p className="text-xs font-mono text-zinc-300 leading-relaxed">
            {portfolio.summary}
          </p>
        );
        break;

      case 'sudo hire':
      case 'hire':
        sound.playSuccess();
        output = (
          <div className="rounded border border-emerald-500/30 bg-emerald-950/20 p-3 text-xs font-mono text-emerald-300">
            <p className="font-bold flex items-center gap-1.5">
              <Sparkles size={14} /> ACCESS GRANTED: PRIORITY CONTACT CHANNEL
            </p>
            <p className="mt-1 text-zinc-300">
              Direct dispatch initiated. Emailing <strong className="text-white">{portfolio.email}</strong> with subject "[Hire Inquiry]".
            </p>
            <a
              href={`mailto:${portfolio.email}?subject=Collaboration%20%2F%20Opportunity%20with%20Adarsh&body=Hi%20Adarsh,%0A%0AWe%20reviewed%20your%20portfolio%20and%20would%20love%20to%20connect.`}
              className="mt-2.5 inline-block rounded bg-emerald-500 px-3 py-1.5 font-bold text-black hover:bg-emerald-400 transition"
            >
              Open Direct Mail
            </a>
          </div>
        );
        break;

      case 'matrix':
        sound.playSuccess();
        output = (
          <span className="text-emerald-400 font-mono text-xs animate-pulse">
            Initiating Matrix rain... 🟩 (Easter egg unlocked! You found it.)
          </span>
        );
        // Trigger a temporary full-screen matrix overlay
        (() => {
          const canvas = document.createElement('canvas');
          canvas.style.cssText = 'position:fixed;inset:0;z-index:99999;pointer-events:none;opacity:0.92;';
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          document.body.appendChild(canvas);
          const ctx = canvas.getContext('2d')!;
          const cols = Math.floor(canvas.width / 16);
          const drops = Array(cols).fill(1);
          const chars = 'アイウエオカキクケコ0123456789ABCDEF'.split('');
          let frame = 0;
          const draw = () => {
            ctx.fillStyle = 'rgba(0,0,0,0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#00ff41';
            ctx.font = '14px monospace';
            drops.forEach((y, i) => {
              const char = chars[Math.floor(Math.random() * chars.length)];
              ctx.fillText(char, i * 16, y * 16);
              if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
              drops[i]++;
            });
            frame = requestAnimationFrame(draw);
          };
          draw();
          setTimeout(() => {
            cancelAnimationFrame(frame);
            canvas.remove();
          }, 5000);
        })();
        break;

      case 'crt':
      case 'phosphor':
        sound.playSuccess();
        if (onToggleCRT) onToggleCRT();
        output = (
          <span className="text-[#00ff41] font-mono text-xs">
            ▶ CRT PHOSPHOR MODE TOGGLED — scanlines + barrel distortion active
          </span>
        );
        break;

      case 'whoami':
        output = (
          <span className="text-cyan-300 font-mono text-xs">
            adarsh@portfolio:~$ <span className="text-white">Adarsh Panda</span> — Full-Stack Developer, Bhubaneswar, India
          </span>
        );
        break;

      case 'open to work':
      case 'hire me':
        sound.playSuccess();
        output = (
          <div className="rounded border border-cyan-500/30 bg-cyan-950/20 p-3 text-xs font-mono text-cyan-300">
            <p className="font-bold flex items-center gap-1.5">
              <Sparkles size={14} /> STATUS: ACTIVELY SEEKING OPPORTUNITIES
            </p>
            <p className="mt-1 text-zinc-300">B.Tech CSE 2025 · Full-Stack Developer · Available immediately.</p>
            <a
              href={`mailto:${portfolio.email}?subject=Opportunity%20for%20Adarsh%20Panda`}
              className="mt-2.5 inline-block rounded bg-cyan-500 px-3 py-1.5 font-bold text-black hover:bg-cyan-400 transition"
            >
              Send Offer →
            </a>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        output = (
          <span className="text-rose-400 font-mono text-xs">
            command not found: {raw}. Type <span className="underline">help</span> for recognized instructions.
          </span>
        );
    }

    setHistory((prev) => [...prev, { cmd: raw, result: output }]);
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-cyan-500/30 bg-[#090d16] shadow-[0_0_80px_rgba(6,182,212,0.18)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-950/70 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="ml-3 flex items-center gap-2 text-xs font-mono text-zinc-400">
              <Terminal size={14} className="text-cyan-400" />
              <span>adarsh-dev-shell [bash]</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
            aria-label="Close terminal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Console Body */}
        <div className="h-80 overflow-y-auto p-4 space-y-3 font-mono text-xs text-zinc-300">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-cyan-400">
                <span className="text-zinc-500">guest@adarsh-portfolio:~$</span>
                <span className="text-white font-medium">{item.cmd}</span>
              </div>
              <div className="pl-4">{item.result}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap gap-2 border-t border-zinc-800/80 bg-zinc-950/40 px-4 py-2 text-[11px] font-mono">
          <span className="text-zinc-500 self-center">Try:</span>
          {['help', 'projects', 'skills', 'contact', 'sudo hire', 'crt', 'clear'].map((btn) => (
            <button
              key={btn}
              onClick={() => handleCommand(btn)}
              className="rounded border border-zinc-700/60 bg-zinc-800/40 px-2 py-0.5 text-zinc-300 hover:border-cyan-500 hover:text-cyan-300 transition"
            >
              {btn}
            </button>
          ))}

          {/* Auto-Demo button */}
          <button
            onClick={runAutoDemo}
            disabled={isDemoRunning}
            className={`ml-auto flex items-center gap-1.5 rounded border px-3 py-0.5 font-semibold transition ${
              isDemoRunning
                ? 'border-violet-500/40 bg-violet-950/30 text-violet-400 cursor-wait animate-pulse'
                : 'border-violet-500/60 bg-violet-900/30 text-violet-300 hover:border-violet-400 hover:text-violet-200'
            }`}
            title="Watch an auto-guided demo of this terminal"
          >
            <Play size={11} />
            {isDemoRunning ? 'Running...' : '▶ PLAY DEMO'}
          </button>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCommand(input);
          }}
          className="flex items-center gap-2 border-t border-zinc-800 bg-zinc-950 px-4 py-3"
        >
          <span className="font-mono text-xs text-cyan-400 font-bold">❯</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type command ('help', 'projects', 'contact')..."
            className="w-full bg-transparent font-mono text-xs text-white placeholder-zinc-500 focus:outline-none"
          />
          <button
            type="submit"
            className="flex items-center gap-1 rounded bg-cyan-500/10 px-2 py-1 text-[11px] font-mono text-cyan-400 hover:bg-cyan-500/20"
          >
            Run <CornerDownLeft size={11} />
          </button>
        </form>
      </div>
    </div>
  );
}
