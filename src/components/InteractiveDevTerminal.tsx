import React, { useState, useRef, useEffect, useCallback } from 'react';
import { sound } from '../lib/sound';

interface LogEntry {
  id: string;
  type: 'input' | 'output' | 'error' | 'banner';
  text: string;
}

const COMMAND_RESPONSES: Record<string, string> = {
  about: `[PROFILE: ADARSH PANDA]
Full-Stack Software Engineer with dedicated focus on resilient web architecture, production WooCommerce & E-Commerce pipeline builds, and production-grade REST API reliability scaling. Experienced in engineering end-to-end web applications with secure workflows, MySQL schema modeling, and zero-compromise UX performance.`,

  whoami: `adarsh-panda
=========================================
Name       : Adarsh Panda
Role       : Full-Stack Software Engineer
Degree     : B.Tech CSE - CV Raman Global University, 2025
CGPA       : 7.6 / 10
Location   : Bhubaneswar, Odisha, India
Status     : AVAILABLE FOR HIRE (Immediate)
=========================================
Email      : ada203880@gmail.com
WhatsApp   : +91 9861054025
GitHub     : github.com/ada203880-boop
LinkedIn   : linkedin.com/in/adarsh-panda-5181b9214`,

  skills: `.\n├── Frontend/
│   ├── React.js 19 (Modern Architecture & State Machines)
│   ├── TypeScript & ES6+ JavaScript
│   └── Tailwind CSS v4 & Responsive Design
├── Backend/
│   ├── Node.js & Express.js Services
│   ├── Python & Scripting Automation
│   └── Production REST APIs & Authentication
├── Database/
│   ├── MySQL & Relational Schema Modeling
│   └── WooCommerce & WordPress Architecture
├── DevOps/
│   ├── Git, GitHub Actions CI/CD
│   └── Vite & Rollup Build Systems
└── AI & Cloud/
    ├── Gemini AI API Integration
    └── Serverless Edge Functions`,

  projects: `[PRODUCTION PROJECTS]
=========================================
1. Rabindra Medical Hall (LIVE)
   URL  : https://rabindramedicalhall.in
   Desc : WooCommerce e-pharmacy, prescription upload, WhatsApp order alerts
   Stack: WordPress, PHP, WooCommerce, MySQL

2. FORGE Fitness (AI Health Platform)
   Desc : Workout tracking, nutrition analytics, AI fitness coaching
   Stack: React, Node.js, Python, REST API, MySQL

3. Cinematic Developer Portfolio Engine
   URL  : https://ada203880-boop.github.io/adarsh_portfolio/
   Desc : Sub-200kB interactive portfolio OS
   Stack: React 19, TypeScript, Vite, Tailwind CSS v4, GSAP, Gemini AI`,

  'cat resume': `[RESUME OVERVIEW - ADARSH PANDA]
=========================================
Education  : B.Tech Computer Science & Engineering (2021-2025)
             CV Raman Global University - CGPA 7.6/10

Experience : E-Commerce Architecture - Rabindra Medical Hall
             WooCommerce storefront, prescription validation,
             WhatsApp webhooks, MySQL schema design.

Certifications:
  [NPTEL]        Practical Cyber Security (IIT Kanpur)
  [LearnWik]     Industrial Training in Data Science
  [Palo Alto]    Cloud Security Fundamentals (Coursera)
  [Google]       Foundations of UX Design (Coursera)

Contact    : ada203880@gmail.com | +91 9861054025`,

  contact: `[CONTACT CHANNELS]
=========================================
Email      : ada203880@gmail.com
WhatsApp   : +91 9861054025
LinkedIn   : linkedin.com/in/adarsh-panda-5181b9214
GitHub     : github.com/ada203880-boop
Portfolio  : ada203880-boop.github.io/adarsh_portfolio/
=========================================
Availability: OPEN TO FULL-TIME, CONTRACT & REMOTE ROLES`,

  tree: `portfolio-source/
├── src/
│   ├── components/             # 50+ React components
│   │   ├── HeroSection.tsx     # Command center header
│   │   ├── HolographicGlobe.tsx
│   │   ├── InteractiveDevTerminal.tsx  # (you are here)
│   │   ├── SkillsConstellation.tsx
│   │   ├── CodePlayground.tsx
│   │   ├── AskAdarshChat.tsx   # Gemini AI integration
│   │   └── ...
│   ├── lib/
│   │   └── sound.ts            # Web Audio API engine
│   ├── App.tsx                 # Root orchestrator
│   └── index.css               # Tailwind + custom CSS
├── docs/                       # GitHub Pages output (vite build)
├── api/
│   └── chat.ts                 # Gemini serverless handler
├── vite.config.ts
└── index.html`,

  ls: `src/components/:
AboutSection.tsx    AdminView.tsx         AskAdarshChat.tsx
AudioVisualizerHUD.tsx  BentoGrid.tsx     CareerTimeline.tsx
CaseStudyModal.tsx  CertificationsSection.tsx  CinematicCanvas.tsx
CinematicLoader.tsx CodePlayground.tsx    CommandPalette.tsx
ContactSection.tsx  CRTOverlay.tsx        CustomCursor.tsx
EducationSection.tsx FloatingDock.tsx     GithubActivity.tsx
HeroSection.tsx     HolographicGlobe.tsx  InteractiveDevTerminal.tsx
InteractiveResume.tsx  KonamiCode.tsx     MultiDeviceMockup.tsx
Navigation.tsx      ProjectsSection.tsx   ResumeModal.tsx
SkillsConstellation.tsx  SkillsSection.tsx  WorkspaceGallery.tsx
(and 20+ more...)`,

  curl: `$ curl -X POST https://api.forgefitness.dev/v1/workouts \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <JWT_TOKEN>" \\
  -d '{"userId":"u_1042","type":"strength","duration_min":45}'

HTTP/1.1 201 Created
Content-Type: application/json

{
  "status": "created",
  "workoutId": "w_8831",
  "userId": "u_1042",
  "type": "strength",
  "duration_min": 45,
  "caloriesBurned": 312,
  "timestamp": "2025-01-15T09:42:11Z",
  "nextSuggestion": "Active recovery - yoga or light cardio"
}

[FORGE Fitness REST API - deterministic simulation]`,

  'sudo hire adarsh': `[sudo] password for recruiter: ...........
Authenticating... #################### 100%

ACCESS GRANTED - Authorization: HIRE_ADARSH_PANDA
=========================================
Deploying talent acquisition protocol...

  [✓] Skills verified: React 19, Node.js, Python, MySQL
  [✓] Production experience: E-pharmacy (LIVE)
  [✓] Availability: IMMEDIATE
  [✓] Communication: English (Professional)

RECOMMENDATION: HIRE WITH HIGH CONFIDENCE
=========================================
Next step: ada203880@gmail.com | +91 9861054025`,

  matrix: `Initializing neural matrix...

  +------------------------------------+
  |  01000001 01000100 01000001 01010010 |
  |  01010011 01001000 00100000 01010000 |
  |  01000001 01001110 01000100 01000001 |
  |                                    |
  |  "There is no spoon..."            |
  |  ...only clean React components    |
  |  and well-indexed MySQL schemas.   |
  +------------------------------------+

  [Matrix mode deactivated - reality restored]`,

  help: `Available operations:
  -----------------------------------------
  about         Full-stack engineering profile
  whoami        Identity card with contact links
  skills        ASCII map of core tech stacks
  projects      Production project list with URLs
  cat resume    Formatted resume overview
  contact       All verified contact channels
  ls            List portfolio source components
  tree          Full source directory structure
  curl          Simulate FORGE Fitness REST API
  clear         Wipe the terminal log feed panel
  -----------------------------------------
  Easter eggs:  sudo hire adarsh  |  matrix
  Tip: Use Up/Down arrows for history
       Press Tab to autocomplete`,
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
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const logContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll routine pinning feed window instantly to bottom baseline index
  const scrollToBottom = useCallback(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [logs, scrollToBottom]);

  // All valid top-level command names for Tab autocomplete
  const ALL_COMMANDS = Object.keys(COMMAND_RESPONSES).filter((k) => !k.includes(' ')).concat(['clear']);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Tab: autocomplete to first matching command
    if (e.key === 'Tab') {
      e.preventDefault();
      const partial = inputVal.toLowerCase().trim();
      if (!partial) return;
      const match = ALL_COMMANDS.find((cmd) => cmd.startsWith(partial));
      if (match) setInputVal(match);
      return;
    }

    // Arrow-up: navigate backward in command history
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(history[nextIndex]);
      return;
    }

    // Arrow-down: navigate forward in command history
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex]);
      }
      return;
    }

    // Enter / Return key handler
    if (e.key === 'Enter') {
      e.preventDefault();
      const rawCmd = inputVal.trim();
      if (!rawCmd) return;

      sound.playClick();
      const lowerCmd = rawCmd.toLowerCase();

      // Update command history (limit to 100 entries)
      setHistory((prev) => [...prev.slice(-99), rawCmd]);
      setHistoryIndex(-1);

      // Clear operation
      if (lowerCmd === 'clear') {
        setLogs([]);
        setInputVal('');
        return;
      }

      const inputEntry: LogEntry = {
        id: `in-${Date.now()}-${Math.random()}`,
        type: 'input',
        text: rawCmd,
      };

      let responseEntry: LogEntry;

      if (lowerCmd in COMMAND_RESPONSES) {
        responseEntry = {
          id: `out-${Date.now()}-${Math.random()}`,
          type: 'output',
          text: COMMAND_RESPONSES[lowerCmd],
        };
      } else {
        responseEntry = {
          id: `err-${Date.now()}-${Math.random()}`,
          type: 'error',
          text: `System shell error: Command '${rawCmd}' not found. Type 'help' to view options.`,
        };
      }

      // Cap logs to 100 entries max to prevent excessive DOM growth
      setLogs((prev) => [...prev.slice(-98), inputEntry, responseEntry]);
      setInputVal('');
    }
  };

  return (
    <div
      role="region"
      aria-label="Interactive developer bash shell"
      onClick={() => inputRef.current?.focus()}
      className="relative flex flex-col rounded-xl border border-cyan-500/25 shadow-[0_16px_36px_rgba(0,0,0,0.7)] overflow-hidden font-mono text-xs select-text cursor-text"
      style={{
        width: '100%',
        maxWidth: '650px',
        margin: '12px auto',
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

      {/* Automated Scrolling Code Feed Log Panel (overscroll-contain prevents outer page chaining) */}
      <div
        ref={logContainerRef}
        tabIndex={0}
        aria-label="Terminal output feed"
        className="flex-1 max-h-[220px] sm:max-h-[260px] overflow-y-auto p-3.5 space-y-2 text-zinc-300 scroll-smooth outline-none focus:ring-1 focus:ring-cyan-500/30"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(6,182,212,0.3) transparent',
          overscrollBehavior: 'contain',
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
        <span className="text-cyan-400 font-bold text-sm leading-none" aria-hidden="true">$</span>
        <label htmlFor="terminal-command-input" className="sr-only">
          Terminal command prompt
        </label>
        <input
          id="terminal-command-input"
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type 'help', 'whoami', 'projects', or 'sudo hire adarsh'..."
          className="flex-1 bg-transparent text-emerald-300 outline-none placeholder:text-zinc-600 font-mono text-xs caret-cyan-400"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
