// ─── Workspace Gallery — "Behind the Build" ─────────────────────────────────
// Showcases the developer's coding process via styled code "screenshots"

interface GalleryItem {
  id: number;
  title: string;
  subtitle: string;
  filename: string;
  language: string;
  lines: CodeLine[];
  accentColor: string;
}

type CodeLine = {
  tokens: Token[];
};

type Token = {
  text: string;
  type: 'keyword' | 'string' | 'comment' | 'number' | 'tag' | 'plain' | 'fn' | 'punct';
};

function kw(text: string): Token { return { text, type: 'keyword' }; }
function str(text: string): Token { return { text, type: 'string' }; }
function cmt(text: string): Token { return { text, type: 'comment' }; }
function num(text: string): Token { return { text, type: 'number' }; }
function tag(text: string): Token { return { text, type: 'tag' }; }
function pl(text: string): Token { return { text, type: 'plain' }; }
function fn(text: string): Token { return { text, type: 'fn' }; }
function pt(text: string): Token { return { text, type: 'punct' }; }

const TOKEN_CLASS: Record<Token['type'], string> = {
  keyword: 'text-violet-400',
  string:  'text-emerald-400',
  comment: 'text-zinc-500 italic',
  number:  'text-amber-400',
  tag:     'text-cyan-400',
  plain:   'text-zinc-200',
  fn:      'text-sky-300',
  punct:   'text-zinc-400',
};

const GALLERY: GalleryItem[] = [
  {
    id: 1,
    title: 'The Setup',
    subtitle: 'React · Frontend',
    filename: 'ProductCard.jsx',
    language: 'JavaScript',
    accentColor: '#06b6d4',
    lines: [
      { tokens: [cmt('// React + Tailwind — Rabindra Medical Hall')] },
      { tokens: [kw('const '), pl('ProductCard '), pt('= '), pt('('), pt('{'), pl(' medicine, price '), pt('}'), pt(') '), pt('=>'), pl(' '), pt('{')] },
      { tokens: [pl('  '), kw('return '), pt('(')] },
      { tokens: [pl('    '), tag('<div'), pl(' '), pl('className'), pt('='), str('"card glass"'), tag('>')] },
      { tokens: [pl('      '), tag('<img'), pl(' src'), pt('='), pt('{'), pl('medicine.image'), pt('}'), pl(' alt'), pt('='), pt('{'), pl('medicine.name'), pt('}'), pl(' /'), tag('>')] },
      { tokens: [pl('      '), tag('<h3'), tag('>'), pt('{'), pl('medicine.name'), pt('}'), tag('</h3>')] },
      { tokens: [pl('      '), tag('<span'), pl(' className'), pt('='), str('"price"'), tag('>'), pl('₹'), pt('{'), pl('price'), pt('}'), tag('</span>')] },
      { tokens: [pl('      '), tag('<button'), pl(' onClick'), pt('='), pt('{'), fn('addToCart'), pt('}'), tag('>'), pl('Add to Cart'), tag('</button>')] },
      { tokens: [pl('    '), tag('</div>')] },
      { tokens: [pl('  '), pt(')')] },
      { tokens: [pt('};')] },
    ],
  },
  {
    id: 2,
    title: 'API Architecture',
    subtitle: 'Node.js · Backend',
    filename: 'workout.routes.js',
    language: 'JavaScript',
    accentColor: '#10b981',
    lines: [
      { tokens: [cmt('// REST API — FORGE Fitness Backend')] },
      { tokens: [pl('router.'), fn('post'), pt('('), str("'/api/workout'"), pt(', '), pl('verifyJWT'), pt(', '), kw('async'), pl(' '), pt('('), pl('req, res'), pt(') '), pt('=>'), pl(' '), pt('{')] },
      { tokens: [pl('  '), kw('const '), pt('{'), pl(' userId, exercises, duration '), pt('}'), pl(' = req.body'), pt(';')] },
      { tokens: [pl('  '), kw('const '), pl('session '), pt('= '), kw('await '), pl('db.'), fn('query'), pt('(')] },
      { tokens: [pl('    '), str('`INSERT INTO workout_sessions VALUES (?, ?, ?, NOW())`'), pt(',')] },
      { tokens: [pl('    '), pt('['), pl('userId'), pt(', '), pl('JSON.'), fn('stringify'), pt('('), pl('exercises'), pt('), '), pl('duration'), pt(']')] },
      { tokens: [pl('  '), pt(');')] },
      { tokens: [pl('  '), pl('res.'), fn('json'), pt('({'), pl(' success'), pt(': '), kw('true'), pt(', '), pl('sessionId'), pt(': '), pl('session.insertId '), pt('})')] },
      { tokens: [pt('});')] },
    ],
  },
  {
    id: 3,
    title: 'Database Schema',
    subtitle: 'MySQL · Architecture',
    filename: 'schema.sql',
    language: 'SQL',
    accentColor: '#f59e0b',
    lines: [
      { tokens: [cmt('-- Rabindra Medical Hall — Product Schema')] },
      { tokens: [kw('CREATE TABLE '), fn('products'), pl(' '), pt('(')] },
      { tokens: [pl('  '), pl('id          '), kw('INT '), fn('AUTO_INCREMENT'), pl(' '), kw('PRIMARY KEY'), pt(',')] },
      { tokens: [pl('  '), pl('name        '), kw('VARCHAR'), pt('('), num('255'), pt(')'), pl(' '), kw('NOT NULL'), pt(',')] },
      { tokens: [pl('  '), pl('category    '), kw('VARCHAR'), pt('('), num('100'), pt(')'), pt(',')] },
      { tokens: [pl('  '), pl('price       '), kw('DECIMAL'), pt('('), num('10'), pt(','), num('2'), pt(')'), pl(' '), kw('NOT NULL'), pt(',')] },
      { tokens: [pl('  '), pl('stock       '), kw('INT '), kw('DEFAULT '), num('0'), pt(',')] },
      { tokens: [pl('  '), pl('created_at  '), kw('TIMESTAMP '), kw('DEFAULT '), fn('NOW'), pt('()')] },
      { tokens: [pt(');')] },
      { tokens: [] },
      { tokens: [kw('CREATE INDEX '), pl('idx_category'), kw(' ON '), fn('products'), pt('('), pl('category'), pt(');')] },
    ],
  },
  {
    id: 4,
    title: 'Terminal Session',
    subtitle: 'CLI · Git Workflow',
    filename: 'bash — ~/projects/forge',
    language: 'Bash',
    accentColor: '#a78bfa',
    lines: [
      { tokens: [pl('$ '), fn('git'), pl(' checkout -b '), str('feat/workout-tracker')] },
      { tokens: [cmt('Switched to a new branch \'feat/workout-tracker\'')] },
      { tokens: [pl('$ '), fn('npm'), pl(' install express jsonwebtoken bcrypt')] },
      { tokens: [cmt('added 42 packages in 3.2s')] },
      { tokens: [pl('$ '), fn('node'), pl(' index.js')] },
      { tokens: [pt('['), num('2024-01'), pt('] '), pl('🚀 Server running on port '), num('5000')] },
      { tokens: [pl('$ '), fn('git'), pl(' add . && '), fn('git'), pl(' commit -m '), str('"feat: JWT auth + session tracking"')] },
      { tokens: [pt('['), pl('feat/workout-tracker'), pl(' '), num('a3f1b2c'), pt('] '), pl('feat: JWT auth')] },
      { tokens: [pl('$ '), fn('git'), pl(' push origin '), str('feat/workout-tracker')] },
    ],
  },
  {
    id: 5,
    title: 'Config Files',
    subtitle: 'Vite · Build Setup',
    filename: 'vite.config.ts',
    language: 'TypeScript',
    accentColor: '#ec4899',
    lines: [
      { tokens: [kw('import '), pl('{ defineConfig } '), kw('from '), str("'vite'")] },
      { tokens: [kw('import '), pl('react '), kw('from '), str("'@vitejs/plugin-react'")] },
      { tokens: [] },
      { tokens: [kw('export default '), fn('defineConfig'), pt('({')] },
      { tokens: [pl('  plugins'), pt(': '), pt('['), fn('react'), pt('()'), pt('],')] },
      { tokens: [pl('  resolve'), pt(': '), pt('{')] },
      { tokens: [pl('    alias'), pt(': '), pt('{'), str("'@'"), pt(': '), str("'./src'"), pt('}')] },
      { tokens: [pl('  '), pt('},')] },
      { tokens: [pl('  server'), pt(': '), pt('{')] },
      { tokens: [pl('    port'), pt(': '), num('3000'), pt(',')] },
      { tokens: [pl('    open'), pt(': '), kw('true')] },
      { tokens: [pl('  '), pt('}')] },
      { tokens: [pt('})')] },
    ],
  },
];

function CodeLine({ tokens }: { tokens: Token[] }) {
  if (tokens.length === 0) return <div className="h-4" />;
  return (
    <div className="leading-6 text-[12px] font-mono whitespace-pre">
      {tokens.map((tok, i) => (
        <span key={i} className={TOKEN_CLASS[tok.type]}>
          {tok.text}
        </span>
      ))}
    </div>
  );
}

function TrafficLights() {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
      <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
      <div className="w-3 h-3 rounded-full bg-[#28c840]" />
    </div>
  );
}

function GalleryCard({ item }: { item: GalleryItem }) {
  return (
    <div
      className="group rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d1a] hover:border-violet-500/40
                 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
    >
      {/* Window chrome */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#1a1a2e] border-b border-zinc-800">
        <TrafficLights />
        <span className="text-[10px] font-mono text-zinc-500 truncate mx-2 flex-1 text-center">
          {item.filename}
        </span>
        <span
          className="text-[9px] font-mono px-1.5 py-0.5 rounded"
          style={{ color: item.accentColor, border: `1px solid ${item.accentColor}40`, background: `${item.accentColor}10` }}
        >
          VSCode Dark+
        </span>
      </div>

      {/* Line numbers + code */}
      <div className="flex overflow-auto p-0">
        {/* Line numbers */}
        <div className="px-2 pt-3 pb-3 bg-[#0a0a18] border-r border-zinc-800/50 select-none min-w-[32px]">
          {item.lines.map((_, i) => (
            <div key={i} className="leading-6 text-[11px] font-mono text-zinc-600 text-right">
              {i + 1}
            </div>
          ))}
        </div>
        {/* Code */}
        <div className="p-3 flex-1 overflow-x-auto">
          {item.lines.map((line, i) => (
            <CodeLine key={i} tokens={line.tokens} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-3 py-1.5 bg-[#1a1a2e] border-t border-zinc-800 flex items-center gap-2">
        <span className="text-[9px]" style={{ color: item.accentColor }}>●</span>
        <span className="text-[10px] text-zinc-500">{item.language}</span>
        <span className="ml-auto text-[10px] font-semibold text-zinc-400">{item.title}</span>
      </div>
    </div>
  );
}

export default function WorkspaceGallery() {
  return (
    <section id="workspace" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <div className="mb-12">
          <p className="text-[11px] font-mono text-violet-400/70 uppercase tracking-[0.3em] mb-3">
            Dev Process
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-3">
            BEHIND THE BUILD.
          </h2>
          <p className="text-zinc-400 text-base max-w-xl">
            A glimpse into the engineering process — the actual code, architecture decisions, and tooling
            that powers Adarsh&apos;s projects.
          </p>
        </div>

        {/* Masonry-like grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {GALLERY.map((item) => (
            <div key={item.id} className="break-inside-avoid">
              <GalleryCard item={item} />
            </div>
          ))}
        </div>

        {/* Footer badge */}
        <div className="mt-10 flex items-center gap-2">
          <div className="flex-1 h-px bg-gradient-to-r from-violet-500/20 to-transparent" />
          <span className="text-[10px] font-mono text-zinc-600">
            All code from real projects by Adarsh Panda
          </span>
          <div className="flex-1 h-px bg-gradient-to-l from-violet-500/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}
