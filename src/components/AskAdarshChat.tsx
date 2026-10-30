import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, User, RefreshCw, Key, ChevronDown, MessageSquare } from 'lucide-react';
import { sound } from '../lib/sound';
import { GoogleGenAI } from '@google/genai';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const SYSTEM_PROMPT = `You are Adarsh Panda's official AI Portfolio Assistant. Answer in first-person as Adarsh Panda or as Adarsh's trusted representative. Be concise, polite, professional, and enthusiastic.

About Adarsh Panda:
- Degree: B.Tech in Computer Science and Engineering (2021–2025) from CV Raman Global University, Bhubaneswar, Odisha (CGPA: 7.6 / 10).
- Specialization: Full-Stack Web Development, React.js, Node.js, Express.js, Python, MySQL, REST APIs.
- E-Commerce: WordPress & WooCommerce backend architecture, custom checkout workflows, PHP.
- Production Projects:
  1. Rabindra Medical Hall (Live E-Pharmacy at https://rabindramedicalhall.in) — Responsive pharmacy storefront on WooCommerce, prescription upload verification, WhatsApp order notifications, MySQL.
  2. FORGE Fitness (AI-Powered Health Platform) — Workout tracking, nutrition analytics, contextual AI fitness coaching, persistent data models with REST APIs.
- Certifications:
  • Practical Cyber Security for Cyber Security Practitioners — NPTEL, IIT Kanpur
  • Industrial Training in Data Science — LearnWik Solutions Pvt. Ltd.
  • Cloud Security Fundamentals — Palo Alto Networks via Coursera
  • Foundations of User Experience (UX) Design — Google via Coursera
- Location: Bhubaneswar, Odisha, India.
- Availability: Immediately available for Full-Stack, Frontend (React), Backend (Node.js/Python), or Software Engineer roles.
- Contact: Email: ada203880@gmail.com | Phone/WhatsApp: +91 9861054025 | LinkedIn: linkedin.com/in/adarsh-panda-5181b9214 | GitHub: github.com/ada203880-boop

Keep replies direct, informative, and under 3-4 sentences whenever possible.`;

const DEFAULT_QUESTIONS = [
  "What is your tech stack?",
  "Are you available for hire?",
  "Tell me about your live project",
  "What are your key certifications?",
];

const PRE_CACHED_ANSWERS: Record<string, string> = {
  "what is your tech stack?":
    "My core stack revolves around React.js, TypeScript, and Tailwind CSS on the frontend, with Node.js, Express.js, and Python on the backend. For databases and persistence, I specialize in MySQL and relational schema design, along with production WordPress/WooCommerce architecture.",
  "are you available for hire?":
    "Yes, absolutely! I am a B.Tech CSE '25 graduate actively looking for Junior Full-Stack, Frontend (React), or Backend (Node.js) roles. I am available immediately and open to both on-site and remote opportunities. Feel free to email me at ada203880@gmail.com or WhatsApp me at +91 9861054025!",
  "tell me about your live project":
    "I engineered the live e-pharmacy platform Rabindra Medical Hall (https://rabindramedicalhall.in). It runs on a custom WooCommerce & PHP stack with full catalog navigation, prescription upload safeguards, secure checkout, and instant WhatsApp order notifications.",
  "what are your key certifications?":
    "I hold accredited credentials in Practical Cyber Security from IIT Kanpur (NPTEL), Industrial Data Science from LearnWik Solutions, Cloud Security Fundamentals from Palo Alto Networks, and UX Design Foundations from Google.",
};

export function AskAdarshChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: "Namaste! 🙏 I'm Adarsh's AI assistant. Ask me anything about my engineering background, projects, tech stack, or hiring availability!",
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [customKey, setCustomKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isGenerating]);

  // Handle escape to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isGenerating) return;

    sound.playClick();
    const userMsg: Message = {
      id: String(Date.now()),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsGenerating(true);

    // Client-side length truncation & sanitization (max 400 chars)
    const sanitizedQuery = query.slice(0, 400);
    const normalizedQuery = sanitizedQuery.toLowerCase();
    const matchedKey = Object.keys(PRE_CACHED_ANSWERS).find((k) => normalizedQuery.includes(k.replace('?', '')));

    // 1. Check pre-cached responses for instant zero-latency answers
    if (matchedKey) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: String(Date.now() + 1),
            sender: 'assistant',
            text: PRE_CACHED_ANSWERS[matchedKey],
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        sound.playHover();
        setIsGenerating(false);
      }, 450);
      return;
    }

    // 2. If user configured custom personal session key (BYOK in settings modal), execute client-side safely
    if (customKey.trim()) {
      try {
        const ai = new GoogleGenAI({ apiKey: customKey.trim() });
        const response = await ai.models.generateContent({
          model: 'gemini-2.0-flash',
          contents: [
            { role: 'user', parts: [{ text: `${SYSTEM_PROMPT}\n\nUser Question: ${sanitizedQuery}` }] },
          ],
        });

        const reply = response.text || "I'm ready to answer any questions about my portfolio and engineering experience!";
        setMessages((prev) => [
          ...prev,
          {
            id: String(Date.now() + 1),
            sender: 'assistant',
            text: reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        sound.playHover();
        setIsGenerating(false);
        return;
      } catch {
        // Fall through to serverless proxy or graceful fallback
      }
    }

    // 3. Call secure serverless proxy endpoint (/api/chat) with timeout protection
    const aiEndpoint = (import.meta.env.VITE_AI_ENDPOINT as string) || '/api/chat';
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    try {
      const res = await fetch(aiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: sanitizedQuery }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          setMessages((prev) => [
            ...prev,
            {
              id: String(Date.now() + 1),
              sender: 'assistant',
              text: data.reply,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ]);
          sound.playHover();
          setIsGenerating(false);
          return;
        }
      }
    } catch {
      clearTimeout(timeoutId);
    }

    // 4. Safe fallback for static environments without serverless backends
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'assistant',
          text: `I'd love to help with "${sanitizedQuery}"! I specialize in React, Node.js, Python, and MySQL. For live deployment questions or immediate hiring, reach out directly to Adarsh at ada203880@gmail.com or via WhatsApp at +91 9861054025.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      sound.playHover();
      setIsGenerating(false);
    }, 500);
  };

  return (
    <>
      {/* Floating Trigger Bubble */}
      <div className="fixed bottom-14 left-4 z-[180]">
        {!isOpen ? (
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setIsOpen(true);
            }}
            className="group relative flex items-center gap-2.5 rounded-full border border-cyan-400/40 bg-gradient-to-r from-[#0c1024]/90 to-[#120d2c]/90 px-4 py-2.5 shadow-[0_8px_32px_rgba(6,182,212,0.35)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-cyan-300 hover:shadow-[0_0_35px_rgba(34,211,238,0.5)] focus:outline-none"
            aria-label="Open AI Assistant"
          >
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan-400" />
            </span>
            <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-white">
              <Sparkles size={14} className="text-cyan-400 animate-pulse" />
              <span>Ask Adarsh AI</span>
            </div>
            <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 font-mono text-[9px] text-cyan-300 border border-cyan-500/30">
              Gemini
            </span>
          </button>
        ) : null}
      </div>

      {/* Chat Dialog Drawer */}
      {isOpen && (
        <div className="fixed bottom-12 left-4 z-[190] w-[calc(100vw-32px)] sm:w-[420px] max-w-[420px] h-[540px] flex flex-col rounded-3xl border border-cyan-500/30 bg-[#090b16]/95 backdrop-blur-2xl shadow-[0_25px_65px_rgba(0,0,0,0.8),0_0_40px_rgba(6,182,212,0.2)] overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-6">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <Bot size={17} className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-white">
                  <span>Adarsh AI</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="font-mono text-[10px] text-cyan-400/80">
                  Powered by Gemini 2.0 Flash
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setShowKeyInput((p) => !p)}
                title="Configure Gemini API Key"
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <Key size={14} />
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setMessages([
                    {
                      id: String(Date.now()),
                      sender: 'assistant',
                      text: "Chat refreshed. How can I help you today?",
                      timestamp: 'Just now',
                    },
                  ]);
                }}
                title="Reset Conversation"
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <RefreshCw size={14} />
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setIsOpen(false);
                }}
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Optional API Key banner */}
          {showKeyInput && (
            <div className="border-b border-cyan-500/20 bg-cyan-950/40 p-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-cyan-300 mb-1.5">
                <span>Personal Gemini API Key (optional):</span>
                <button type="button" onClick={() => setShowKeyInput(false)} className="text-zinc-400 hover:text-white">
                  <ChevronDown size={14} />
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  type="password"
                  placeholder="Paste AI Studio Key..."
                  value={customKey}
                  onChange={(e) => setCustomKey(e.target.value)}
                  className="flex-1 rounded-lg border border-white/10 bg-black/50 px-2.5 py-1 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowKeyInput(false)}
                  className="rounded-lg bg-cyan-600 px-3 py-1 font-mono text-xs font-semibold text-white hover:bg-cyan-500"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {/* Message List */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3.5 scroll-smooth">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'assistant' && (
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                    <Bot size={13} />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_4px_15px_rgba(139,92,246,0.3)]'
                      : 'border border-cyan-500/20 bg-[#101428] text-zinc-200 shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                  <span className="mt-1 block text-right font-mono text-[9px] text-white/40">
                    {m.timestamp}
                  </span>
                </div>
                {m.sender === 'user' && (
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-violet-950 border border-violet-500/40 text-violet-300">
                    <User size={13} />
                  </div>
                )}
              </div>
            ))}

            {isGenerating && (
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
                <Bot size={13} className="animate-spin" />
                <span>Thinking with Gemini...</span>
              </div>
            )}
          </div>

          {/* Quick Questions Row */}
          <div className="border-t border-white/[0.06] bg-black/30 px-3 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="shrink-0 text-cyan-400/80 font-mono text-[10px] flex items-center gap-1">
              <MessageSquare size={11} /> Prompt:
            </span>
            {DEFAULT_QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => handleSend(q)}
                disabled={isGenerating}
                className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] text-zinc-300 hover:border-cyan-400/50 hover:bg-cyan-950/40 hover:text-cyan-200 transition-colors disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="border-t border-white/10 bg-[#070914] p-3 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Adarsh about skills, projects..."
              className="flex-1 rounded-xl border border-white/15 bg-white/[0.03] px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 font-sans"
            />
            <button
              type="submit"
              disabled={!input.trim() || isGenerating}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white disabled:opacity-40 transition-all hover:scale-105"
            >
              <Send size={13} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

