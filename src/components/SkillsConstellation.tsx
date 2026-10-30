import { useState, useId } from 'react';
import { Sparkles, X, ArrowRight, Layers, Code2, Server, Database, Globe, Cpu, Wrench, ShieldCheck, GitBranch } from 'lucide-react';
import { sound } from '../lib/sound';

export interface SkillNode {
  id: string;
  name: string;
  category: string;
  catId: 'frontend' | 'backend' | 'languages' | 'databases' | 'apis' | 'cloud' | 'devops' | 'tools' | 'architecture';
  x: number; // 0 to 100 viewBox coords
  y: number; // 0 to 100 viewBox coords
  color: string;
  icon?: string;
  usage: string;
  relatedProjects: string[];
  evidence: string;
}

export interface SkillLink {
  source: string;
  target: string;
}

const CONSTELLATION_NODES: SkillNode[] = [
  // Languages
  {
    id: 'js',
    name: 'JavaScript (ES6+)',
    category: 'Programming Languages',
    catId: 'languages',
    x: 48,
    y: 20,
    color: '#facc15',
    usage: 'Core language for asynchronous DOM manipulation, REST consumption, full-stack scripting, and Node.js backend pipelines.',
    relatedProjects: ['Rabindra Medical Hall', 'FORGE Fitness', 'Cinematic Portfolio Engine'],
    evidence: '4+ years of active development; extensive async/await, closures, event-loop optimization, and Web API integration.',
  },
  {
    id: 'ts',
    name: 'TypeScript',
    category: 'Programming Languages',
    catId: 'languages',
    x: 58,
    y: 28,
    color: '#38bdf8',
    usage: 'Type-safe interface modeling, React component props contracts, API response schemas, and strict compile-time validation.',
    relatedProjects: ['Cinematic Portfolio Engine', 'FORGE Fitness'],
    evidence: 'Engineered complete type definitions, custom generics, and union types across this portfolio with zero lint warnings.',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Programming Languages',
    catId: 'languages',
    x: 68,
    y: 35,
    color: '#34d399',
    usage: 'Data pipeline automation, biometric computation routines, AI prompt orchestration, and CLI utility scripting.',
    relatedProjects: ['FORGE Fitness', 'LearnWik Data Science Training'],
    evidence: 'Built automated training log parsing, caloric progression models, and statistical data cleaning with Pandas and NumPy.',
  },
  {
    id: 'php',
    name: 'PHP',
    category: 'Programming Languages',
    catId: 'languages',
    x: 28,
    y: 32,
    color: '#a78bfa',
    usage: 'Server-side e-commerce customization, custom WordPress theme/plugin hooks, and WooCommerce checkout filter overrides.',
    relatedProjects: ['Rabindra Medical Hall'],
    evidence: 'Engineered custom functions.php hooks for mandatory prescription file upload validation and automated WhatsApp alerts.',
  },

  // Frontend
  {
    id: 'react',
    name: 'React.js 19',
    category: 'Frontend Development',
    catId: 'frontend',
    x: 42,
    y: 36,
    color: '#22d3ee',
    usage: 'Component-driven user interfaces, state machines, custom hooks, Suspense code-splitting, and virtual DOM performance tuning.',
    relatedProjects: ['Cinematic Portfolio Engine', 'Rabindra Medical Hall UI'],
    evidence: 'Architected modular reactive components with sub-200 kB initial bundle size, custom physics canvases, and lazy evaluation.',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS v4',
    category: 'Frontend Development',
    catId: 'frontend',
    x: 32,
    y: 45,
    color: '#38bdf8',
    usage: 'Utility-first layout design, responsive breakpoints (320px to 4K), design token consistency, and dark-mode glassmorphism.',
    relatedProjects: ['Cinematic Portfolio Engine', 'Rabindra Medical Hall'],
    evidence: 'Engineered multi-device layouts without layout shifts or horizontal overflows across mobile, tablet, and desktop form factors.',
  },
  {
    id: 'html-css',
    name: 'HTML5 Semantic & CSS3',
    category: 'Frontend Development',
    catId: 'frontend',
    x: 22,
    y: 42,
    color: '#f97316',
    usage: 'Accessible DOM landmark elements, keyboard navigation traps, CSS Grid/Flexbox layouts, and hardware-accelerated transforms.',
    relatedProjects: ['Rabindra Medical Hall', 'Cinematic Portfolio Engine'],
    evidence: 'W3C compliant markup, ARIA roles, WCAG contrast standards, and responsive viewport meta tags.',
  },

  // Backend
  {
    id: 'node',
    name: 'Node.js',
    category: 'Backend Development',
    catId: 'backend',
    x: 52,
    y: 52,
    color: '#4ade80',
    usage: 'High-throughput event-driven runtime, non-blocking asynchronous I/O, middleware pipelines, and microservices.',
    relatedProjects: ['FORGE Fitness API', 'Portfolio Chat API'],
    evidence: 'Built production Express microservices with rate limiting, input validation, and secure HTTP headers.',
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'Backend Development',
    catId: 'backend',
    x: 62,
    y: 48,
    color: '#cbd5e1',
    usage: 'REST endpoint routing, centralized error handlers, CORS configuration, and JWT authentication middleware.',
    relatedProjects: ['FORGE Fitness API'],
    evidence: 'Engineered modular router pipelines handling CRUD resources with comprehensive HTTP status codes and JSON envelopes.',
  },

  // Databases
  {
    id: 'mysql',
    name: 'MySQL & Relational DBMS',
    category: 'Databases',
    catId: 'databases',
    x: 65,
    y: 65,
    color: '#38bdf8',
    usage: 'Normalized schema modeling, composite foreign keys, indexing for sub-50ms reads, and transactional consistency.',
    relatedProjects: ['Rabindra Medical Hall', 'FORGE Fitness'],
    evidence: 'Designed 3NF database schemas for medicine inventory and user fitness telemetry; query optimization reduced cart latencies by 40%.',
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce & WordPress',
    category: 'Databases & CMS',
    catId: 'databases',
    x: 25,
    y: 58,
    color: '#c084fc',
    usage: 'Enterprise catalog management, checkout workflows, prescription validation safeguards, and order lifecycle management.',
    relatedProjects: ['Rabindra Medical Hall (Live Production)'],
    evidence: 'Managed 1000+ SKU medicine inventory serving live regional patients with zero false checkout dispatches.',
  },

  // APIs & Integrations
  {
    id: 'rest',
    name: 'RESTful API Architecture',
    category: 'APIs & Integrations',
    catId: 'apis',
    x: 48,
    y: 68,
    color: '#06b6d4',
    usage: 'Stateless HTTP design, request validation, structured error payloads, versioned URIs, and deterministic contract specs.',
    relatedProjects: ['FORGE Fitness', 'Rabindra Medical Hall Webhooks'],
    evidence: 'Architected robust endpoints tested via Postman test suites with token expiration handling and parameter sanitation.',
  },
  {
    id: 'gemini-ai',
    name: 'Gemini AI & LLM Inference',
    category: 'APIs & Integrations',
    catId: 'apis',
    x: 75,
    y: 52,
    color: '#a855f7',
    usage: 'Structured prompt orchestration, JSON schema output enforcement, multimodal health telemetry reasoning, and offline fallbacks.',
    relatedProjects: ['FORGE Fitness AI Coach', 'Ask Adarsh AI Recruiter Assistant'],
    evidence: 'Integrated Gemini 2.0 Flash via official SDK with zero client-side secret leaks and graceful offline failover.',
  },

  // Cloud & Deployment
  {
    id: 'gh-pages',
    name: 'GitHub Pages & Actions',
    category: 'Cloud & Deployment',
    catId: 'cloud',
    x: 38,
    y: 78,
    color: '#f43f5e',
    usage: 'Continuous Integration / Continuous Deployment (CI/CD), automated linting, test suites, and atomic edge deployments.',
    relatedProjects: ['Cinematic Portfolio Engine'],
    evidence: 'Configured GitHub Actions workflow building and deploying docs/ production bundles with automated cache validation.',
  },
  {
    id: 'serverless',
    name: 'Serverless Edge Functions',
    category: 'Cloud & Deployment',
    catId: 'cloud',
    x: 78,
    y: 72,
    color: '#ec4899',
    usage: 'Edge compute endpoints, decoupled backend microservices, and serverless LLM proxying with zero server maintenance.',
    relatedProjects: ['Portfolio API (Vercel & Netlify Ready)'],
    evidence: 'Engineered Vercel and Netlify configurations enabling instant edge runtime migration for dynamic API routes.',
  },

  // DevOps & Tools
  {
    id: 'git',
    name: 'Git & Version Control',
    category: 'DevOps & Tools',
    catId: 'devops',
    x: 28,
    y: 75,
    color: '#fb923c',
    usage: 'Atomic commit hygiene, feature branching, merge conflict resolution, and release tagging across collaborative codebases.',
    relatedProjects: ['All Repositories on GitHub (ada203880-boop)'],
    evidence: 'Maintained clean Git history with hundreds of semantic commits across personal, production, and academic projects.',
  },
  {
    id: 'vite',
    name: 'Vite & Rollup Toolchain',
    category: 'Developer Tools',
    catId: 'tools',
    x: 42,
    y: 88,
    color: '#a855f7',
    usage: 'Lightning-fast HMR dev server, manual chunk splitting, asset optimization, and production treeshaking.',
    relatedProjects: ['Cinematic Portfolio Engine'],
    evidence: 'Configured manualChunks in vite.config.ts reducing initial JS download footprint from 1.11 MB to 193.85 kB (-82.5%).',
  },
  {
    id: 'audio-api',
    name: 'Web Audio API',
    category: 'Developer Tools',
    catId: 'tools',
    x: 58,
    y: 82,
    color: '#34d399',
    usage: 'Synthesized procedural UI feedback, dynamic frequency oscillators, and sound wave generation with 0 byte audio file payload.',
    relatedProjects: ['Cinematic Portfolio Engine HUD'],
    evidence: 'Engineered a standalone sound synthesizer in lib/sound.ts supporting clicks, modal hums, and velocity whooshes.',
  },

  // Testing & Architecture
  {
    id: 'arch',
    name: 'System & Security Architecture',
    category: 'Testing & Architecture',
    catId: 'architecture',
    x: 52,
    y: 38,
    color: '#e11d48',
    usage: 'Defensive engineering, XSS/CSRF mitigation, rate limiting, zero-trust cloud fundamentals, and resilient error boundaries.',
    relatedProjects: ['Rabindra Medical Hall', 'NPTEL Cyber Security', 'Palo Alto Cloud Security'],
    evidence: 'Certified in Practical Cyber Security (IIT Kanpur) & Cloud Security Fundamentals; zero vulnerable dangerouslySetInnerHTML usages.',
  },
];

const CONSTELLATION_LINKS: SkillLink[] = [
  { source: 'js', target: 'ts' },
  { source: 'js', target: 'react' },
  { source: 'js', target: 'node' },
  { source: 'ts', target: 'react' },
  { source: 'react', target: 'tailwind' },
  { source: 'react', target: 'html-css' },
  { source: 'react', target: 'vite' },
  { source: 'node', target: 'express' },
  { source: 'node', target: 'rest' },
  { source: 'express', target: 'mysql' },
  { source: 'express', target: 'rest' },
  { source: 'python', target: 'mysql' },
  { source: 'python', target: 'gemini-ai' },
  { source: 'php', target: 'woocommerce' },
  { source: 'woocommerce', target: 'mysql' },
  { source: 'rest', target: 'mysql' },
  { source: 'rest', target: 'gemini-ai' },
  { source: 'vite', target: 'gh-pages' },
  { source: 'git', target: 'gh-pages' },
  { source: 'serverless', target: 'rest' },
  { source: 'audio-api', target: 'react' },
  { source: 'arch', target: 'react' },
  { source: 'arch', target: 'express' },
  { source: 'arch', target: 'mysql' },
];

const CATEGORIES = [
  { id: 'all', label: 'All Technologies', icon: Layers },
  { id: 'frontend', label: 'Frontend', icon: Code2 },
  { id: 'backend', label: 'Backend', icon: Server },
  { id: 'languages', label: 'Languages', icon: Cpu },
  { id: 'databases', label: 'Databases', icon: Database },
  { id: 'apis', label: 'APIs & AI', icon: Globe },
  { id: 'cloud', label: 'Cloud & Deploy', icon: GitBranch },
  { id: 'architecture', label: 'Architecture', icon: ShieldCheck },
  { id: 'tools', label: 'Tools', icon: Wrench },
];

export function SkillsConstellation() {
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const glowFilterId = useId();

  const filteredNodes = CONSTELLATION_NODES.filter(
    (n) => activeCategory === 'all' || n.catId === activeCategory
  );

  const filteredNodeIds = new Set(filteredNodes.map((n) => n.id));

  return (
    <div className="relative w-full rounded-3xl border border-cyan-500/25 bg-[#060a14]/90 p-4 sm:p-8 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,0.85)]">
      {/* Constellation Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
        <div>
          <span className="font-mono text-xs text-cyan-400 flex items-center gap-2">
            <Sparkles size={14} className="text-cyan-400" />
            FULL-STACK CONSTELLATION MAP // CONNECTED NODES · CLICK FOR DETAILS
          </span>
          <p className="mt-1 text-xs text-zinc-400 font-light">
            Interactive topology showing real engineering relationships across Adarsh's full-stack ecosystem.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORIES.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setActiveCategory(id);
                sound.playClick();
              }}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[10px] transition-all ${
                activeCategory === id
                  ? 'bg-cyan-500 text-black font-semibold shadow-[0_0_12px_rgba(6,182,212,0.5)]'
                  : 'border border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white'
              }`}
            >
              <Icon size={11} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* SVG Interactive Constellation Stage */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[380px] max-h-[560px] overflow-hidden rounded-2xl border border-white/10 bg-[#04060d]">
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <svg viewBox="0 0 100 100" className="w-full h-full select-none" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id={glowFilterId} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Links */}
          {CONSTELLATION_LINKS.map((link, idx) => {
            const src = CONSTELLATION_NODES.find((n) => n.id === link.source);
            const tgt = CONSTELLATION_NODES.find((n) => n.id === link.target);
            if (!src || !tgt) return null;

            const isHighlighted =
              (hoveredNode === src.id || hoveredNode === tgt.id) ||
              (selectedNode?.id === src.id || selectedNode?.id === tgt.id);

            const isDimmed =
              (activeCategory !== 'all' && (!filteredNodeIds.has(src.id) || !filteredNodeIds.has(tgt.id))) ||
              (hoveredNode && hoveredNode !== src.id && hoveredNode !== tgt.id);

            return (
              <line
                key={`link-${idx}`}
                x1={src.x}
                y1={src.y}
                x2={tgt.x}
                y2={tgt.y}
                stroke={isHighlighted ? '#00e5ff' : '#334155'}
                strokeWidth={isHighlighted ? 0.7 : 0.25}
                strokeDasharray={isHighlighted ? '1,1' : 'none'}
                opacity={isDimmed ? 0.15 : isHighlighted ? 0.9 : 0.45}
                className="transition-all duration-300"
              />
            );
          })}

          {/* Nodes */}
          {CONSTELLATION_NODES.map((node) => {
            const isMatch = filteredNodeIds.has(node.id);
            const isSelected = selectedNode?.id === node.id;
            const isHovered = hoveredNode === node.id;

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => {
                  setSelectedNode(node);
                  sound.playClick();
                }}
                onMouseEnter={() => {
                  setHoveredNode(node.id);
                  sound.playHover();
                }}
                onMouseLeave={() => setHoveredNode(null)}
                className="cursor-pointer"
                opacity={isMatch ? 1 : 0.2}
              >
                {/* Outer Glow Halo when selected or hovered */}
                {(isSelected || isHovered) && (
                  <circle
                    r={3.8}
                    fill={node.color}
                    opacity={0.35}
                    filter={`url(#${glowFilterId})`}
                    className="animate-pulse"
                  />
                )}

                {/* Node Body */}
                <circle
                  r={isSelected ? 2.2 : isHovered ? 2.0 : 1.6}
                  fill={node.color}
                  stroke="#ffffff"
                  strokeWidth={isSelected ? 0.6 : 0.3}
                  className="transition-all duration-200"
                />

                {/* Node Label */}
                <text
                  x={0}
                  y={isSelected || isHovered ? 3.6 : 3.2}
                  textAnchor="middle"
                  fontSize={isSelected || isHovered ? 2.2 : 1.8}
                  fontWeight={isSelected || isHovered ? 'bold' : 'normal'}
                  fill={isSelected ? '#00e5ff' : isHovered ? '#ffffff' : '#94a3b8'}
                  className="pointer-events-none select-none font-mono tracking-tight"
                >
                  {node.name.split(' ')[0]}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Instruction Overlay */}
        <div className="pointer-events-none absolute bottom-3 left-4 flex items-center gap-2 font-mono text-[10px] text-zinc-500">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="hidden sm:inline">Click any technology node to open verifiable engineering evidence</span>
          <span className="sm:hidden">Tap a node to explore</span>
        </div>
      </div>

      {/* Selected Node Detail Drawer */}
      {selectedNode && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="node-title"
          className="mt-6 rounded-2xl border border-cyan-500/40 bg-[#0d1322] p-5 sm:p-6 shadow-[0_10px_40px_rgba(0,0,0,0.8)] transition-all animate-in fade-in slide-in-from-bottom-3 duration-300"
        >
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: selectedNode.color, boxShadow: `0 0 10px ${selectedNode.color}` }}
                />
                <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-400">
                  {selectedNode.category}
                </span>
              </div>
              <h4 id="node-title" className="text-xl sm:text-2xl font-light text-white mt-1">
                {selectedNode.name}
              </h4>
            </div>

            <button
              type="button"
              onClick={() => setSelectedNode(null)}
              className="rounded-lg border border-white/10 bg-white/[0.04] p-1.5 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close detail panel"
            >
              <X size={16} />
            </button>
          </div>

          <div className="grid gap-6 sm:grid-cols-3 mt-4 text-xs">
            {/* Column 1: What I Use It For */}
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block">
                WHAT I USE IT FOR
              </span>
              <p className="text-zinc-300 font-light leading-relaxed">
                {selectedNode.usage}
              </p>
            </div>

            {/* Column 2: Related Projects */}
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block">
                RELATED PROJECTS
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedNode.relatedProjects.map((proj) => (
                  <span
                    key={proj}
                    className="inline-flex items-center gap-1 rounded-md border border-cyan-500/20 bg-cyan-950/30 px-2 py-1 font-mono text-[10px] text-cyan-300"
                  >
                    <ArrowRight size={10} className="text-cyan-400" />
                    {proj}
                  </span>
                ))}
              </div>
            </div>

            {/* Column 3: Verified Evidence & Experience */}
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block">
                VERIFIED EXPERIENCE
              </span>
              <p className="text-zinc-300 font-light leading-relaxed">
                {selectedNode.evidence}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
