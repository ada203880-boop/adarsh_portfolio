import { useRef } from 'react';
import { AnimatedBeam } from './AnimatedBeam';
import { BlurFadeText } from './BlurFadeText';

interface BentoCell {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  size: 'sm' | 'md' | 'lg';
  description: string;
}

const CELLS: BentoCell[] = [
  {
    id: 'react',
    title: 'React 19 UI',
    subtitle: 'Frontend Layer',
    icon: '⚛',
    color: '#61dafb',
    size: 'md',
    description: 'Component-driven UIs, Server Components, concurrent features',
  },
  {
    id: 'api',
    title: 'Node.js APIs',
    subtitle: 'Backend Layer',
    icon: '⚡',
    color: '#68a063',
    size: 'lg',
    description: 'Express REST endpoints, JWT auth, rate limiting, caching',
  },
  {
    id: 'db',
    title: 'MySQL / Supabase',
    subtitle: 'Data Layer',
    icon: '🗄',
    color: '#4479a1',
    size: 'sm',
    description: 'Relational schemas, migrations, stored procedures',
  },
  {
    id: 'webhook',
    title: 'WhatsApp Webhook',
    subtitle: 'Messaging Layer',
    icon: '💬',
    color: '#25d366',
    size: 'md',
    description: 'Meta Cloud API, automated Rx notifications, delivery receipts',
  },
  {
    id: 'ai',
    title: 'AI / FORGE',
    subtitle: 'Intelligence Layer',
    icon: '🤖',
    color: '#a855f7',
    size: 'md',
    description: 'Health telemetry, smart meal plans, calorie AI predictions',
  },
  {
    id: 'deploy',
    title: 'CI/CD Deploy',
    subtitle: 'Ops Layer',
    icon: '🚀',
    color: '#f59e0b',
    size: 'sm',
    description: 'GitHub Actions, Render, Railway, Hostinger—automated pipelines',
  },
];

const BEAMS = [
  { fromId: 'react', toId: 'api', color: '#61dafb', duration: 2.5, delay: 0 },
  { fromId: 'api', toId: 'db', color: '#68a063', duration: 3, delay: 0.4 },
  { fromId: 'api', toId: 'webhook', color: '#25d366', duration: 2.8, delay: 0.8 },
  { fromId: 'api', toId: 'ai', color: '#a855f7', duration: 3.2, delay: 1.2 },
  { fromId: 'ai', toId: 'deploy', color: '#f59e0b', duration: 2.6, delay: 1.6 },
];

const sizeClass = { sm: 'col-span-1', md: 'col-span-1 md:col-span-1', lg: 'col-span-1 md:col-span-2' };

export function BentoGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="bento" className="relative w-full max-w-full py-20 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-3 font-mono text-xs tracking-[0.3em] text-cyan-400">FULL-STACK ARCHITECTURE</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            <BlurFadeText text="Data Pipeline" delay={0} />
            {' '}
            <BlurFadeText text="Visualizer" delay={200} className="text-cyan-400" />
          </h2>
          <p className="mt-3 text-sm text-white/40 max-w-lg mx-auto">
            Every layer of the stack, connected — animated beams show real data flow between services.
          </p>
        </div>

        {/* Bento Grid */}
        <div
          ref={containerRef}
          className="relative grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4"
        >
          {/* SVG beam overlay */}
          <AnimatedBeam containerRef={containerRef} paths={BEAMS} />

          {CELLS.map((cell) => (
            <div
              key={cell.id}
              data-node={cell.id}
              className={`group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3 sm:p-5 backdrop-blur-sm hover:border-white/20 transition-all duration-500 hover:bg-white/[0.06] cursor-default overflow-hidden ${sizeClass[cell.size]}`}
              style={{
                boxShadow: `0 0 0 0 ${cell.color}00`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 40px -10px ${cell.color}40`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '';
              }}
            >
              {/* Border beam sweep */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${cell.color}20 0%, transparent 60%)`,
                }}
              />

              {/* Corner glow dot */}
              <span
                className="absolute top-3 right-3 h-2 w-2 rounded-full animate-pulse"
                style={{ backgroundColor: cell.color, opacity: 0.7 }}
              />

              <div className="relative z-10">
                <div className="mb-3 text-2xl">{cell.icon}</div>
                <div
                  className="mb-1 font-mono text-[10px] tracking-[0.2em] font-medium uppercase"
                  style={{ color: cell.color }}
                >
                  {cell.subtitle}
                </div>
                <h3 className="mb-2 text-base font-semibold text-white">{cell.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{cell.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {BEAMS.map((b, i) => (
            <div key={i} className="flex items-center gap-2 text-[10px] font-mono text-white/40">
              <span className="h-0.5 w-8 rounded-full" style={{ backgroundColor: b.color }} />
              {CELLS.find(c => c.id === b.fromId)?.title} → {CELLS.find(c => c.id === b.toId)?.title}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

