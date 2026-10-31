import React, { useState, useId, useMemo } from 'react';
import { Sparkles, X, ArrowRight, LayoutGrid, Network, CheckCircle2 } from 'lucide-react';
import { sound } from '../lib/sound';

interface TechNode {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Architecture' | 'DevOps & Tools' | 'AI Integration';
  catId: 'frontend' | 'backend' | 'database' | 'architecture' | 'tools' | 'ai';
  x: number; // 0 to 100 percentage
  y: number; // 0 to 100 percentage
  brandColor: string;
  gradient: string;
  textColor: string;
  usage: string;
  relatedProjects: string[];
  verifiedEvidence: string;
  connectedTo: string[];
  svgIcon: React.ReactNode;
}

const TECH_ECOSYSTEM: TechNode[] = [
  // ─── Layer 1: Frontend Ecosystem ─────────────────────────────────────────
  {
    id: 'html5',
    name: 'HTML5',
    category: 'Frontend',
    catId: 'frontend',
    x: 12,
    y: 18,
    brandColor: '#e34f26',
    gradient: 'from-[#e34f26] to-[#f06529]',
    textColor: '#ffffff',
    usage: 'Semantic document tree architecture, WCAG 2.1 AA accessibility attributes, canvas elements, and SEO metadata.',
    relatedProjects: ['Rabindra Medical Hall', 'Interactive Developer Portfolio'],
    verifiedEvidence: 'Structured semantic markup with 100% accessible navigation landmarks, aria roles, and native dialog controls.',
    connectedTo: ['react'],
    svgIcon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.234-2.625h11.438l.234-2.625H5.438l.703 7.875h10.453l-.375 4.172-4.242 1.149-4.242-1.149-.281-3.094H4.828l.469 5.391 6.68 1.852 6.68-1.852.938-10.797H8.531z" />
      </svg>
    ),
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'Frontend',
    catId: 'frontend',
    x: 28,
    y: 14,
    brandColor: '#06b6d4',
    gradient: 'from-[#0284c7] via-[#06b6d4] to-[#38bdf8]',
    textColor: '#ffffff',
    usage: 'Utility-first responsive layouts, dark-mode glassmorphic styling, fluid typography, and custom design tokens.',
    relatedProjects: ['Interactive Developer Portfolio', 'Rabindra Medical Hall'],
    verifiedEvidence: 'Constructed responsive breakpoints (320px to 4K) with zero horizontal overflow and sub-25kB compressed CSS footprint.',
    connectedTo: ['react'],
    svgIcon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    ),
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Frontend',
    catId: 'frontend',
    x: 46,
    y: 12,
    brandColor: '#f7df1e',
    gradient: 'from-[#eab308] via-[#facc15] to-[#fde047]',
    textColor: '#000000',
    usage: 'Modern ES6+ syntax, asynchronous event-driven flows, closures, Web Audio synthesis, and canvas animations.',
    relatedProjects: ['Rabindra Medical Hall', 'FORGE Fitness', 'Interactive Developer Portfolio'],
    verifiedEvidence: 'Engineered high-performance state handling, audio nodes, and 60fps canvas particle rendering loops.',
    connectedTo: ['react', 'nodejs'],
    svgIcon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3h18v18H3V3zm15.65 14.73c.69-.41 1.15-1.07 1.15-2.09 0-1.63-1.09-2.34-2.58-2.34-.84 0-1.47.24-1.95.49l.39 1.51c.36-.18.82-.36 1.34-.36.72 0 1.14.33 1.14.86 0 .54-.41.79-1.03.79-.47 0-.96-.11-1.39-.28l-.48 1.48c.55.3 1.41.52 2.26.52 1.01 0 1.8-.23 2.3-.58zm-5.71-.05c.48-.36.85-.94.85-1.92V11.5h-1.8v4.2c0 .64-.28.93-.73.93-.32 0-.61-.1-.82-.24l-.45 1.44c.43.27 1.07.45 1.76.45.6 0 1.04-.15 1.39-.41z" />
      </svg>
    ),
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Frontend',
    catId: 'frontend',
    x: 64,
    y: 14,
    brandColor: '#3178c6',
    gradient: 'from-[#1e40af] via-[#2563eb] to-[#38bdf8]',
    textColor: '#ffffff',
    usage: 'Strict compile-time type safety, interface contracts, generics, API response schemas, and unified union models.',
    relatedProjects: ['Interactive Developer Portfolio', 'FORGE Fitness'],
    verifiedEvidence: '100% type-safe codebase with strict null checks, zero any assertions, and clean Vite Rollup compilation.',
    connectedTo: ['react'],
    svgIcon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 0h21A1.5 1.5 0 0 1 24 1.5v21a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 0 22.5v-21A1.5 1.5 0 0 1 1.5 0zm10.74 13.85h-2.9v7.42H6.91v-7.42H4.03V11.5h8.21v2.35zm9.36 4.1c-.24 1.83-1.74 3.4-4.22 3.4-2.88 0-4.66-1.7-4.66-4.57 0-3.08 1.96-4.63 4.83-4.63 2.5 0 3.86 1.34 4.19 2.9h-2.33c-.22-.72-.78-1.19-1.84-1.19-1.25 0-2.2.82-2.2 2.76 0 1.94.94 2.83 2.19 2.83 1.05 0 1.63-.48 1.88-1.5h2.33z" />
      </svg>
    ),
  },
  {
    id: 'vite',
    name: 'Vite',
    category: 'Frontend',
    catId: 'frontend',
    x: 82,
    y: 18,
    brandColor: '#646cff',
    gradient: 'from-[#4c1d95] via-[#6366f1] to-[#bd34fe]',
    textColor: '#ffffff',
    usage: 'Next-generation ESM frontend tooling, lightning-fast HMR, Rollup manual chunking, and production asset compression.',
    relatedProjects: ['Interactive Developer Portfolio'],
    verifiedEvidence: 'Engineered granular vendor chunking (React, Icons, Motion, AI) reducing initial entry payload to ~64 kB gzipped.',
    connectedTo: ['react'],
    svgIcon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.996 4.417a.75.75 0 0 0-.965-.418l-9.108 3.518a.75.75 0 0 1-.54 0L2.275 3.999a.75.75 0 0 0-.965.418L.027 18.257a.75.75 0 0 0 .584.823l10.875 2.83a.75.75 0 0 0 .376 0l10.875-2.83a.75.75 0 0 0 .584-.823L21.996 4.417zm-10.038 8.12a.75.75 0 0 1-1.416 0L8.27 6.643l3.688 1.425v4.469zm1.5 0V8.068l3.688-1.425-2.272 5.894a.75.75 0 0 1-1.416 0z" />
      </svg>
    ),
  },
  {
    id: 'react',
    name: 'React.js 19',
    category: 'Frontend',
    catId: 'frontend',
    x: 48,
    y: 30,
    brandColor: '#61dafb',
    gradient: 'from-[#082f49] via-[#0284c7] to-[#0ea5e9]',
    textColor: '#61dafb',
    usage: 'Component lifecycle orchestration, concurrent rendering, custom hooks, Suspense boundaries, and state machines.',
    relatedProjects: ['Interactive Developer Portfolio', 'Rabindra Medical Hall UI'],
    verifiedEvidence: 'Built complete interactive ecosystem with zero unnecessary re-renders, decoupled scroll velocity listeners, and modal management.',
    connectedTo: ['rest', 'gemini'],
    svgIcon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 stroke-cyan-300 fill-none stroke-[1.6]" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.8" className="fill-cyan-300" />
      </svg>
    ),
  },

  // ─── Layer 2: Architecture & API Gateway ─────────────────────────────────
  {
    id: 'rest',
    name: 'REST APIs',
    category: 'Architecture',
    catId: 'architecture',
    x: 48,
    y: 48,
    brandColor: '#8b5cf6',
    gradient: 'from-[#5b21b6] via-[#7c3aed] to-[#a855f7]',
    textColor: '#ffffff',
    usage: 'Standardized HTTP endpoints, structured JSON envelopes, status code conventions, CORS controls, and parameter validation.',
    relatedProjects: ['FORGE Fitness REST Service', 'Rabindra Medical Hall Webhooks'],
    verifiedEvidence: 'Designed deterministic REST endpoints with standardized { status, data, latencyMs } envelopes and auth middleware.',
    connectedTo: ['nodejs', 'express', 'python'],
    svgIcon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 stroke-white fill-none stroke-[2]" xmlns="http://www.w3.org/2000/svg">
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="18" cy="18" r="3" />
        <path d="M9 12h3m0 0l3-5m-3 5l3 5" />
      </svg>
    ),
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    category: 'Architecture',
    catId: 'architecture',
    x: 20,
    y: 44,
    brandColor: '#96588a',
    gradient: 'from-[#581c87] via-[#9333ea] to-[#c084fc]',
    textColor: '#ffffff',
    usage: 'E-commerce product catalogs, checkout hook customizations, dynamic cart calculation, and payment workflows.',
    relatedProjects: ['Rabindra Medical Hall (Live Production)'],
    verifiedEvidence: 'Architected live online pharmacy at rabindramedicalhall.in with prescription upload safeguards and payment settlement.',
    connectedTo: ['php'],
    svgIcon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-4.5 14.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-4c-.83 0-1.5-.67-1.5-1.5S6.67 9.5 7.5 9.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm9 4c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-4c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
      </svg>
    ),
  },
  {
    id: 'serverless',
    name: 'Serverless / Cloud',
    category: 'Architecture',
    catId: 'architecture',
    x: 76,
    y: 44,
    brandColor: '#10b981',
    gradient: 'from-[#064e3b] via-[#059669] to-[#34d399]',
    textColor: '#ffffff',
    usage: 'Edge function proxies, API key encapsulation, stateless microservice execution, and CDN static caching.',
    relatedProjects: ['Interactive Developer Portfolio (Edge Chat API)'],
    verifiedEvidence: 'Configured edge serverless endpoints with origin guards, timeout protection, and environment variable security.',
    connectedTo: ['gemini', 'github'],
    svgIcon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 stroke-white fill-none stroke-[2]" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
    ),
  },

  // ─── Layer 3: Backend Services & Languages ────────────────────────────────
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Backend',
    catId: 'backend',
    x: 36,
    y: 65,
    brandColor: '#339933',
    gradient: 'from-[#14532d] via-[#16a34a] to-[#4ade80]',
    textColor: '#ffffff',
    usage: 'Non-blocking I/O event loops, stream processing, microservice backends, and npm package management.',
    relatedProjects: ['FORGE Fitness Backend', 'Build Automation Scripts'],
    verifiedEvidence: 'Constructed asynchronous services processing multi-client telemetry requests with robust error boundaries.',
    connectedTo: ['mysql', 'express'],
    svgIcon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2l10 5.8v11.6L12 22 2 17.4V7.8L12 2zm0 2.2L4 8.7v8.9l8 4.6 8-4.6V8.7l-8-4.5zM12 7l6 3.5v7l-6 3.5-6-3.5v-7L12 7z" />
      </svg>
    ),
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'Backend',
    catId: 'backend',
    x: 52,
    y: 64,
    brandColor: '#475569',
    gradient: 'from-[#0f172a] via-[#334155] to-[#64748b]',
    textColor: '#ffffff',
    usage: 'Middleware chains, routing controllers, JWT authorization headers, request sanitization, and rate limiting.',
    relatedProjects: ['FORGE Fitness API Gateway'],
    verifiedEvidence: 'Engineered IP-based request throttling and Bearer token verification with zero security audit warnings.',
    connectedTo: ['nodejs', 'mysql'],
    svgIcon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm-3.6-7.8h7.2v-1.8H8.4v1.8zm0-3.6h7.2v-1.8H8.4v1.8zm0-3.6h7.2V7.2H8.4V9z" />
      </svg>
    ),
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Backend',
    catId: 'backend',
    x: 68,
    y: 65,
    brandColor: '#3776ab',
    gradient: 'from-[#1e3a8a] via-[#2563eb] to-[#eab308]',
    textColor: '#ffffff',
    usage: 'Data processing routines, algorithm implementation, AI prompt orchestrations, and CSV/JSON transformation utilities.',
    relatedProjects: ['FORGE Fitness Data Engine', 'LearnWik Data Science Training'],
    verifiedEvidence: 'Completed accredited industrial data science training with automated data cleaning and statistical modeling.',
    connectedTo: ['mysql'],
    svgIcon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.006 2.75h5.8v.825H3.9s-3.9-.444-3.9 5.563c0 6.006 3.4 5.8 3.4 5.8h2.03v-2.862s-.11-3.419 3.35-3.419h5.756s3.238.056 3.238-3.131V2.656S18.23 0 11.914 0zm-3.32 1.637a1.056 1.056 0 1 1 0 2.112 1.056 1.056 0 0 1 0-2.112zm3.492 22.363c6.094 0 5.714-2.656 5.714-2.656l-.006-2.75h-5.8v-.825h8.106s3.9.444 3.9-5.563c0-6.006-3.4-5.8-3.4-5.8h-2.03v2.862s.11 3.419-3.35 3.419H8.484s-3.238-.056-3.238 3.131v5.531s-.456 2.656 5.86 2.656zm3.32-1.637a1.056 1.056 0 1 1 0-2.112 1.056 1.056 0 0 1 0 2.112z" />
      </svg>
    ),
  },
  {
    id: 'php',
    name: 'PHP',
    category: 'Backend',
    catId: 'backend',
    x: 18,
    y: 65,
    brandColor: '#777bb4',
    gradient: 'from-[#312e81] via-[#4f46e5] to-[#818cf8]',
    textColor: '#ffffff',
    usage: 'WordPress custom actions, WooCommerce filter overrides, file upload sanitation, and WhatsApp webhook dispatch triggers.',
    relatedProjects: ['Rabindra Medical Hall (Live Production)'],
    verifiedEvidence: 'Developed production functions.php extensions verifying customer prescription MIME types prior to database order creation.',
    connectedTo: ['mysql'],
    svgIcon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-5h2v5zm0-6.5h-2V8h2v2z" />
      </svg>
    ),
  },

  // ─── Layer 4: Relational Databases ───────────────────────────────────────
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'Database',
    catId: 'database',
    x: 48,
    y: 82,
    brandColor: '#00758f',
    gradient: 'from-[#083344] via-[#0891b2] to-[#f59e0b]',
    textColor: '#ffffff',
    usage: 'Third Normal Form (3NF) relational modeling, composite indexing, foreign key constraints, and transactional ACID integrity.',
    relatedProjects: ['Rabindra Medical Hall (Live)', 'FORGE Fitness Schema'],
    verifiedEvidence: 'Designed optimized inventory, customer, and order-item schemas with indexed queries minimizing checkout latency.',
    connectedTo: [],
    svgIcon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 stroke-white fill-none stroke-[2]" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
      </svg>
    ),
  },

  // ─── Layer 5: Version Control & AI Tools ──────────────────────────────────
  {
    id: 'git',
    name: 'Git',
    category: 'DevOps & Tools',
    catId: 'tools',
    x: 82,
    y: 68,
    brandColor: '#f05032',
    gradient: 'from-[#991b1b] via-[#dc2626] to-[#f87171]',
    textColor: '#ffffff',
    usage: 'Distributed branch management, atomic commits, interactive rebase, and staging workflows.',
    relatedProjects: ['All Repositories on GitHub'],
    verifiedEvidence: 'Clean commit history with semantic conventional commits and safety checkpoint branches across all builds.',
    connectedTo: ['github'],
    svgIcon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.6 11.2 12.8.4a1.7 1.7 0 0 0-2.4 0L8.1 2.7l3 3a2 2 0 0 1 2.5 2.5l2.9 2.9a2 2 0 1 1-1.2 1.2l-2.7-2.7v5.2a2 2 0 1 1-1.7 0V9.4a2 2 0 0 1-1.1-2.6L6.8 3.8.4 10.2a1.7 1.7 0 0 0 0 2.4l10.8 10.8a1.7 1.7 0 0 0 2.4 0l10-10a1.7 1.7 0 0 0 0-2.2z" />
      </svg>
    ),
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'DevOps & Tools',
    catId: 'tools',
    x: 84,
    y: 84,
    brandColor: '#24292e',
    gradient: 'from-[#090d16] via-[#1e293b] to-[#334155]',
    textColor: '#ffffff',
    usage: 'Remote repository hosting, GitHub Actions CI/CD workflows, automated Pages static deployment, and open-source releases.',
    relatedProjects: ['ada203880-boop/adarsh_portfolio'],
    verifiedEvidence: 'Configured automated static asset build & deployment pipelines with zero broken links or missing chunks.',
    connectedTo: [],
    svgIcon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    id: 'gemini',
    name: 'Gemini AI',
    category: 'AI Integration',
    catId: 'ai',
    x: 64,
    y: 34,
    brandColor: '#1a73e8',
    gradient: 'from-[#1e3a8a] via-[#3b82f6] to-[#a855f7]',
    textColor: '#ffffff',
    usage: 'Prompt engineering, structured JSON schema response formatting, contextual portfolio assistance, and graceful offline fallback.',
    relatedProjects: ['Ask Adarsh AI Assistant', 'FORGE Fitness AI Coach'],
    verifiedEvidence: 'Integrated Gemini 2.0 Flash with dual-mode (General/Recruiter) system prompts and client-side knowledge base fallback.',
    connectedTo: ['rest'],
    svgIcon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0c-.5 6-6 11.5-12 12 6 .5 11.5 6 12 12 .5-6 6-11.5 12-12-6-.5-11.5-6-12-12z" />
      </svg>
    ),
  },
];

// Flat list of authentic links
const TECH_LINKS: { source: string; target: string; label: string }[] = [
  { source: 'html5', target: 'react', label: 'Markup & DOM' },
  { source: 'tailwind', target: 'react', label: 'Utility Styling' },
  { source: 'javascript', target: 'react', label: 'Runtime Engine' },
  { source: 'javascript', target: 'nodejs', label: 'Full-Stack Runtime' },
  { source: 'typescript', target: 'react', label: 'Strict Typing' },
  { source: 'vite', target: 'react', label: 'Fast ESM Bundler' },
  { source: 'react', target: 'rest', label: 'HTTP Fetch & REST' },
  { source: 'react', target: 'gemini', label: 'Client AI Assistant' },
  { source: 'rest', target: 'express', label: 'Route Handlers' },
  { source: 'express', target: 'nodejs', label: 'Server Framework' },
  { source: 'nodejs', target: 'mysql', label: 'Database Queries' },
  { source: 'python', target: 'rest', label: 'API Services' },
  { source: 'python', target: 'mysql', label: 'Data Analytics DB' },
  { source: 'woocommerce', target: 'php', label: 'Hooks & Filters' },
  { source: 'php', target: 'mysql', label: 'E-Commerce Schema' },
  { source: 'serverless', target: 'rest', label: 'Edge Proxy' },
  { source: 'serverless', target: 'gemini', label: 'Model Proxy API' },
  { source: 'git', target: 'github', label: 'Remote Push / Sync' },
];

export function SkillsConstellation() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'topology' | 'directory'>('topology');

  const gradientId = useId();

  // Find currently active node
  const activeNode = useMemo(() => {
    return TECH_ECOSYSTEM.find((n) => n.id === (selectedId || hoveredId)) || null;
  }, [selectedId, hoveredId]);

  // Compute set of directly connected node IDs
  const connectedNodeIds = useMemo(() => {
    if (!activeNode) return new Set<string>();
    const ids = new Set<string>();
    ids.add(activeNode.id);

    TECH_LINKS.forEach((link) => {
      if (link.source === activeNode.id) ids.add(link.target);
      if (link.target === activeNode.id) ids.add(link.source);
    });

    return ids;
  }, [activeNode]);

  // Compute set of active links
  const activeLinkIndices = useMemo(() => {
    if (!activeNode) return new Set<number>();
    const indices = new Set<number>();

    TECH_LINKS.forEach((link, idx) => {
      if (link.source === activeNode.id || link.target === activeNode.id) {
        indices.add(idx);
      }
    });

    return indices;
  }, [activeNode]);

  // Category filter
  const filteredNodes = useMemo(() => {
    if (activeCategory === 'all') return TECH_ECOSYSTEM;
    return TECH_ECOSYSTEM.filter((n) => n.catId === activeCategory);
  }, [activeCategory]);

  const handleSelectNode = (node: TechNode) => {
    sound.playClick();
    setSelectedId((prev) => (prev === node.id ? null : node.id));
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    // Only deselect if clicking direct background
    if ((e.target as HTMLElement).tagName === 'svg' || (e.target as HTMLElement).id === 'topology-stage') {
      setSelectedId(null);
      setHoveredId(null);
    }
  };

  const categories = [
    { id: 'all', label: 'All Technologies' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'database', label: 'Databases' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'tools', label: 'DevOps & Tools' },
    { id: 'ai', label: 'AI Integration' },
  ];

  return (
    <div className="relative w-full rounded-3xl border border-white/10 bg-[#060a14]/90 p-4 sm:p-7 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,0.85)]">
      {/* Topology Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5 mb-5">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-cyan-400 uppercase">
            <Sparkles size={13} />
            <span>3D TECHNOLOGY UNIVERSE</span>
          </div>
          <h3 className="mt-1 text-xl sm:text-2xl font-light text-white tracking-tight">
            Interactive Engineering{' '}
            <span className="font-semibold bg-gradient-to-r from-cyan-300 via-white to-violet-300 bg-clip-text text-transparent">
              Ecosystem.
            </span>
          </h3>
          <p className="text-xs text-zinc-400 font-light mt-0.5">
            Dimensional 3D brand icons interconnected by authentic production data flow.
          </p>
        </div>

        {/* View Switcher: Interactive Map vs Accessible Grid */}
        <div className="flex items-center gap-1 self-start sm:self-auto rounded-full border border-white/10 bg-white/[0.03] p-1 font-mono text-[11px]">
          <button
            type="button"
            onClick={() => {
              setViewMode('topology');
              sound.playClick();
            }}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 transition-all ${
              viewMode === 'topology'
                ? 'bg-cyan-500 text-black font-semibold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Network size={12} />
            <span>3D Topology</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setViewMode('directory');
              sound.playClick();
            }}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 transition-all ${
              viewMode === 'directory'
                ? 'bg-violet-600 text-white font-semibold shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <LayoutGrid size={12} />
            <span>List Directory</span>
          </button>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex flex-wrap items-center gap-1.5 pb-4">
        {categories.map((c) => {
          const isActive = activeCategory === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setActiveCategory(c.id);
                sound.playHover();
              }}
              className={`rounded-full px-3 py-1 font-mono text-[10px] transition-all ${
                isActive
                  ? 'border border-cyan-400/50 bg-cyan-950/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                  : 'border border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-zinc-200'
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {/* VIEW 1: INTERACTIVE 3D CLAYMORPHIC TOPOLOGY MAP */}
      {viewMode === 'topology' ? (
        <div
          id="topology-stage"
          onClick={handleBackgroundClick}
          className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] min-h-[440px] max-h-[640px] overflow-hidden rounded-2xl border border-white/10 bg-[#04060d] select-none"
        >
          {/* Subtle architectural grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          {/* SVG Connection Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`${gradientId}-ray`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Architecture Connections */}
            {TECH_LINKS.map((link, idx) => {
              const src = TECH_ECOSYSTEM.find((n) => n.id === link.source);
              const tgt = TECH_ECOSYSTEM.find((n) => n.id === link.target);
              if (!src || !tgt) return null;

              const isLinkActive = activeLinkIndices.has(idx);
              const isDimmed = activeNode !== null && !isLinkActive;

              return (
                <g key={`edge-${idx}`}>
                  {/* Background Base Trace */}
                  <line
                    x1={`${src.x}%`}
                    y1={`${src.y}%`}
                    x2={`${tgt.x}%`}
                    y2={`${tgt.y}%`}
                    stroke={isLinkActive ? `url(#${gradientId}-ray)` : '#26334d'}
                    strokeWidth={isLinkActive ? '0.7' : '0.35'}
                    opacity={isDimmed ? 0.12 : isLinkActive ? 1 : 0.45}
                    className="transition-all duration-300"
                  />

                  {/* Travelling Light Ray Animation when Connected Node Selected */}
                  {isLinkActive && (
                    <line
                      x1={`${src.x}%`}
                      y1={`${src.y}%`}
                      x2={`${tgt.x}%`}
                      y2={`${tgt.y}%`}
                      stroke="#00e5ff"
                      strokeWidth="0.9"
                      strokeDasharray="2, 6"
                      strokeDashoffset="100"
                      className="animate-[pulse_1.5s_cubic-bezier(0.4,0,0.6,1)_infinite]"
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* 3D Claymorphic Node Icons Layer */}
          {TECH_ECOSYSTEM.map((node, index) => {
            const isSelected = selectedId === node.id;
            const isHovered = hoveredId === node.id;
            const isConnected = connectedNodeIds.has(node.id);
            const isCategoryMatch = activeCategory === 'all' || node.catId === activeCategory;

            // Opacity logic: Dim unrelated if any node is active
            const isDimmed =
              !isCategoryMatch ||
              (activeNode !== null && !isConnected);

            return (
              <div
                key={node.id}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)',
                  animation: `clayBob 4s ease-in-out infinite`,
                  animationDelay: `${(index % 6) * 0.35}s`,
                }}
                className={`absolute z-10 transition-all duration-300 ${
                  isDimmed ? 'opacity-20 scale-90 pointer-events-none' : 'opacity-100 scale-100'
                }`}
              >
                {/* 3D Squircle Clay Badge */}
                <button
                  type="button"
                  onClick={() => handleSelectNode(node)}
                  onMouseEnter={() => {
                    setHoveredId(node.id);
                    sound.playHover();
                  }}
                  onMouseLeave={() => setHoveredId(null)}
                  aria-label={`${node.name} (${node.category})`}
                  className={`group relative flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-[22.5%] transition-all duration-300 cursor-pointer select-none focus:outline-none ${
                    isSelected
                      ? 'scale-110 ring-4 ring-cyan-400 shadow-[0_0_35px_rgba(6,182,212,0.6)]'
                      : isConnected && activeNode !== null
                      ? 'scale-105 ring-2 ring-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.45)]'
                      : isHovered
                      ? 'scale-105 ring-2 ring-white/40'
                      : 'hover:scale-105'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${node.brandColor}ee, ${node.brandColor}99)`,
                    boxShadow: isSelected
                      ? `inset 3px 3px 6px rgba(255,255,255,0.45), inset -3px -3px 8px rgba(0,0,0,0.5), 0 12px 25px rgba(0,0,0,0.6)`
                      : `inset 2px 2px 5px rgba(255,255,255,0.35), inset -3px -3px 8px rgba(0,0,0,0.5), 0 8px 18px rgba(0,0,0,0.45)`,
                  }}
                >
                  {/* Extruded Brand SVG Icon */}
                  <div
                    className="pointer-events-none flex items-center justify-center transition-transform duration-200"
                    style={{
                      transform: 'translateZ(12px)',
                      filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.45))',
                    }}
                  >
                    {node.svgIcon}
                  </div>

                  {/* Connected Indicator Ring */}
                  {isConnected && activeNode !== null && !isSelected && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500" />
                    </span>
                  )}
                </button>

                {/* Micro Label beneath squircle */}
                <span
                  className={`mt-1.5 block text-center font-mono text-[9px] sm:text-[10px] tracking-tight whitespace-nowrap transition-colors pointer-events-none ${
                    isSelected
                      ? 'font-bold text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                      : isConnected && activeNode !== null
                      ? 'text-white font-medium'
                      : 'text-zinc-400'
                  }`}
                >
                  {node.name}
                </span>
              </div>
            );
          })}

          {/* Ambient Floating Guidance Overlay */}
          <div className="pointer-events-none absolute bottom-3 left-4 flex items-center gap-2 font-mono text-[10px] text-zinc-400 bg-black/60 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="hidden sm:inline">Tap any 3D technology to illuminate connected architecture</span>
            <span className="sm:hidden">Tap an icon to inspect</span>
          </div>

          {/* Tap outside reset button */}
          {activeNode && (
            <button
              type="button"
              onClick={() => {
                setSelectedId(null);
                setHoveredId(null);
                sound.playClick();
              }}
              className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/70 px-3 py-1 font-mono text-[10px] text-zinc-300 hover:text-white transition"
            >
              <X size={11} /> Reset Focus
            </button>
          )}
        </div>
      ) : (
        /* VIEW 2: ACCESSIBLE DIRECTORY LIST VIEW (Mobile Friendly) */
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 max-h-[520px] overflow-y-auto p-1 pr-2 no-scrollbar">
          {filteredNodes.map((node) => {
            const isSelected = selectedId === node.id;
            return (
              <div
                key={node.id}
                onClick={() => handleSelectNode(node)}
                className={`group flex items-start gap-3.5 rounded-2xl border p-3.5 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                    : 'border-white/10 bg-[#0a0f1d] hover:border-white/20 hover:bg-[#0e1526]'
                }`}
              >
                <div
                  className="w-12 h-12 rounded-[22.5%] flex items-center justify-center shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${node.brandColor}ee, ${node.brandColor}88)`,
                    boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.3), inset -2px -2px 6px rgba(0,0,0,0.5)',
                  }}
                >
                  {node.svgIcon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-white truncate">{node.name}</h4>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-500/20">
                      {node.category}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-400 line-clamp-2 font-light leading-relaxed">
                    {node.usage}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Selected Node Detailed Architecture Information Panel */}
      {activeNode && (
        <div
          role="region"
          aria-label={`${activeNode.name} architecture details`}
          className="mt-5 rounded-2xl border border-cyan-500/40 bg-[#0a1020] p-5 sm:p-6 shadow-[0_15px_40px_rgba(0,0,0,0.7)] animate-in fade-in slide-in-from-bottom-3 duration-300"
        >
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3.5">
              <div
                className="w-12 h-12 rounded-[22.5%] flex items-center justify-center shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${activeNode.brandColor}, ${activeNode.brandColor}99)`,
                  boxShadow: 'inset 2px 2px 5px rgba(255,255,255,0.4), inset -2px -2px 6px rgba(0,0,0,0.5)',
                }}
              >
                {activeNode.svgIcon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-400">
                    {activeNode.category}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-zinc-500" />
                  <span className="font-mono text-[10px] text-zinc-400">Production Verified</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-light text-white mt-0.5">
                  {activeNode.name}
                </h4>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="rounded-lg border border-white/10 bg-white/[0.04] p-1.5 text-zinc-400 hover:text-white transition"
              aria-label="Close detail panel"
            >
              <X size={16} />
            </button>
          </div>

          {/* Deep-Dive Grid */}
          <div className="mt-4 grid gap-5 sm:grid-cols-3 text-xs">
            {/* Column 1: How It Is Used */}
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block font-semibold">
                HOW IT IS USED
              </span>
              <p className="text-zinc-300 font-light leading-relaxed">
                {activeNode.usage}
              </p>
            </div>

            {/* Column 2: Connected Technologies & Relationships */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block font-semibold">
                CONNECTED ARCHITECTURE
              </span>
              <div className="flex flex-wrap gap-1.5">
                {Array.from(connectedNodeIds)
                  .filter((id) => id !== activeNode.id)
                  .map((connId) => {
                    const connNode = TECH_ECOSYSTEM.find((n) => n.id === connId);
                    if (!connNode) return null;
                    return (
                      <button
                        key={connId}
                        type="button"
                        onClick={() => setSelectedId(connId)}
                        className="inline-flex items-center gap-1 rounded-md border border-cyan-500/25 bg-cyan-950/40 px-2 py-1 font-mono text-[10px] text-cyan-300 hover:border-cyan-400 hover:bg-cyan-900/40 transition"
                      >
                        <span>{connNode.name}</span>
                        <ArrowRight size={10} />
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Column 3: Verified Project & Evidence */}
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block font-semibold">
                VERIFIED PROJECT IMPLEMENTATION
              </span>
              <div className="flex flex-wrap gap-1.5 mb-1.5">
                {activeNode.relatedProjects.map((p) => (
                  <span
                    key={p}
                    className="inline-flex items-center gap-1 rounded-md border border-emerald-500/20 bg-emerald-950/30 px-2 py-0.5 font-mono text-[10px] text-emerald-300"
                  >
                    <CheckCircle2 size={10} /> {p}
                  </span>
                ))}
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                {activeNode.verifiedEvidence}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
