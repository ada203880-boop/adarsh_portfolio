import React, { useState, useRef, useEffect } from 'react';
import { sound } from '../lib/sound';

interface LogEntry {
  id: string;
  type: 'input' | 'output' | 'error' | 'banner';
  text: string;
}

const COMMAND_RESPONSES: Record<string, string> = {
  about: `[PROFILE: ADARSH PANDA]
Full-Stack Software Engineer with dedicated focus on resilient web architecture, production WooCommerce & E-Commerce pipeline builds, and production-grade REST API reliability scaling. Experienced in engineering end-to-end web applications with secure workflows, MySQL schema modeling, and zero-compromise UX performance.`,

  skills: `.
├── 📂 Frontend/
│   ├── ⚛️  React.js (Modern SPA & State Management)
│   ├── 🔷 TypeScript & Modern ES6+ JavaScript
│   └── 🎨 Tailwind CSS & Responsive Systems
├── 📂 Backend/
│   ├── 🟢 Node.js & Express.js Microservices
│   ├── 🐍 Python & Automated Data Pipelines
│   └── 🔌 Production REST APIs & JWT Authentication
└── 📂 Database/
    ├── 🗄️  MySQL & Normalized Relational Schemas
    └── 🛒 WooCommerce & WordPress Backend Architecture`,

  help: `Available operations:
  • about   - Full-stack engineering focus, WooCommerce pipelines & API reliability
  • skills  - Structural ASCII directory map of core technical stacks
  • clear   - Wipe the terminal log feed panel`,
};

export function InteractiveDevTerminal() {
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 'banner',
      type: 'banner',
      text: `Adarsh Dev Environment Bash Shell v2.4 (x86_64-pc-linux-gnu)
Type 'help' to view available operations or 'about' for engineer overview.`,
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const logContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll routine pinning feed window instantly to bottom baseline index
  const scrollToBottom = () => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const rawCmd = inputVal.trim();
      if (!rawCmd) return;

      sound.playClick();
      const lowerCmd = rawCmd.toLowerCase();

      // Clear operation
      if (lowerCmd === 'clear') {
        setLogs([]);
        setInputVal('');
        return;
      }

      const inputEntry: LogEntry = {
        id: `in-${Date.now()}`,
        type: 'input',
        text: rawCmd,
      };

      let responseEntry: LogEntry;

      if (lowerCmd in COMMAND_RESPONSES) {
        responseEntry = {
          id: `out-${Date.now()}`,
          type: 'output',
          text: COMMAND_RESPONSES[lowerCmd],
        };
      } else {
        responseEntry = {
          id: `err-${Date.now()}`,
          type: 'error',
          text: `System shell error: Command '${rawCmd}' not found. Type 'help' to view options.`,
        };
      }

      setLogs((prev) => [...prev, inputEntry, responseEntry]);
      setInputVal('');
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="relative flex flex-col rounded-xl border border-cyan-500/25 shadow-[0_16px_36px_rgba(0,0,0,0.7)] overflow-hidden font-mono text-xs select-text cursor-text"
      style={{
        width: '100%',
        maxWidth: '650px',
        margin: '20px auto',
        backgroundColor: '#0d0e12',
      }}
    >
      {/* Window Header Bar with Three Operational Macro Dots & Title */}
      <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#13161f] px-3.5 py-2.5 select-none">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56] shadow-[0_0_8px_rgba(255,95,86,0.5)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e] shadow-[0_0_8px_rgba(255,189,46,0.5)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f] shadow-[0_0_8px_rgba(39,201,63,0.5)]" />
        </div>
        <div className="text-[11px] text-zinc-400 font-semibold tracking-wide">
          adarsh@dev-environment:~
        </div>
        <div className="text-[9px] text-cyan-400/70 font-mono hidden sm:block">
          bash 5.2
        </div>
      </div>

      {/* Automated Scrolling Code Feed Log Panel */}
      <div
        ref={logContainerRef}
        className="flex-1 max-h-[220px] sm:max-h-[260px] overflow-y-auto p-3.5 space-y-2 text-zinc-300 scroll-smooth"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(6,182,212,0.3) transparent',
        }}
      >
        {logs.map((entry) => {
          if (entry.type === 'banner') {
            return (
              <div
                key={entry.id}
                className="text-cyan-300/80 whitespace-pre-wrap leading-relaxed pb-1 border-b border-white/[0.05]"
              >
                {entry.text}
              </div>
            );
          }

          if (entry.type === 'input') {
            return (
              <div key={entry.id} className="flex items-center gap-2 text-white">
                <span className="text-cyan-400 font-bold">$</span>
                <span className="font-semibold text-emerald-300">{entry.text}</span>
              </div>
            );
          }

          if (entry.type === 'error') {
            return (
              <div key={entry.id} className="text-rose-400 pl-4 whitespace-pre-wrap">
                {entry.text}
              </div>
            );
          }

          return (
            <div
              key={entry.id}
              className="text-zinc-300 pl-4 whitespace-pre-wrap leading-relaxed font-mono"
            >
              {entry.text}
            </div>
          );
        })}
      </div>

      {/* Live Input Prompt Line with Blue Prompt Indicator Pointer ($) */}
      <div className="flex items-center gap-2 border-t border-white/[0.08] bg-[#090a0e] px-3.5 py-2.5">
        <span className="text-cyan-400 font-bold text-sm leading-none">$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type 'help', 'about', 'skills'..."
          className="flex-1 bg-transparent text-emerald-300 outline-none placeholder:text-zinc-600 font-mono text-xs caret-cyan-400"
          autoCapitalize="none"
          autoComplete="off"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
