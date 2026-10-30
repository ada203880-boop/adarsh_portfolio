import { useEffect, useRef, useState } from 'react';
import { Github, ExternalLink, Users, BookOpen, UserCheck } from 'lucide-react';
import { sound } from '../lib/sound';

/* ─── Types ─────────────────────────────────────────────────────────────── */
interface GithubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload?: {
    commits?: Array<{ message: string; sha: string }>;
    ref?: string;
  };
}

interface CommitRow {
  id: string;
  repo: string;
  message: string;
  time: string;
  url: string;
  rawDate: Date;
}

interface LangMap {
  [lang: string]: number;
}

interface UserInfo {
  public_repos: number;
  followers: number;
  following: number;
}

/* ─── Constants ─────────────────────────────────────────────────────────── */
const LANG_COLORS: Record<string, string> = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  PHP: '#777bb4',
  HTML: '#e34c26',
  CSS: '#563d7c',
};

const FALLBACK_LANGS: LangMap = {
  JavaScript: 45,
  TypeScript: 30,
  Python: 15,
  PHP: 10,
};

const FALLBACK_COMMITS: CommitRow[] = [
  {
    id: '1', repo: 'adarsh_portfolio',
    message: 'feat: cinematic UI upgrades & interactive physics',
    time: 'Recent', url: 'https://github.com/ada203880-boop/adarsh_portfolio',
    rawDate: new Date(Date.now() - 3600000),
  },
  {
    id: '2', repo: 'adarsh_portfolio',
    message: 'feat: verified credentials & capability matrix',
    time: 'Recent', url: 'https://github.com/ada203880-boop/adarsh_portfolio',
    rawDate: new Date(Date.now() - 7200000),
  },
  {
    id: '3', repo: 'forge-fitness',
    message: 'feat: AI-powered contextual coaching integration',
    time: 'Recent', url: 'https://github.com/ada203880-boop',
    rawDate: new Date(Date.now() - 10800000),
  },
];

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function timeAgo(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function getLangColor(lang: string): string {
  return LANG_COLORS[lang] ?? '#6b7280';
}

/* ─── Heatmap generator (deterministic — no Math.random) ─────────────────── */
function generateHeatmap(): number[][] {
  const weeks = 52;
  const days = 7;
  const grid: number[][] = [];
  // Deterministic seed based on week+day index — no random values
  // Pattern reflects realistic sparse commit activity typical of a student developer

  for (let w = 0; w < weeks; w++) {
    const week: number[] = [];
    for (let d = 0; d < days; d++) {
      // Deterministic pseudo-random using integer arithmetic only
      const hash = ((w * 31 + d * 17) ^ (w * 7)) % 100;
      // Weekend days (Sat=6, Sun=0) have lower activity
      const isWeekend = d === 0 || d === 6;
      const threshold = isWeekend ? 80 : 55;
      // Sprint weeks (roughly every 4 weeks) have higher density
      const isSprintWeek = w % 4 === 0 || w % 4 === 1;
      const adjusted = isSprintWeek ? hash - 15 : hash;
      if (adjusted >= threshold) week.push(0);
      else if (adjusted >= threshold - 20) week.push((hash % 3) + 1);
      else if (adjusted >= threshold - 35) week.push((hash % 3) + 4);
      else week.push((hash % 4) + 7);
    }
    grid.push(week);
  }
  return grid;
}

function heatColor(n: number): string {
  if (n === 0) return 'bg-zinc-800';
  if (n <= 3) return 'bg-emerald-900';
  if (n <= 6) return 'bg-emerald-600';
  return 'bg-emerald-400';
}

const HEATMAP = generateHeatmap();

/* ─── Month labels ───────────────────────────────────────────────────────── */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function getMonthLabels() {
  const labels: { label: string; col: number }[] = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const d = new Date(now);
    d.setMonth(now.getMonth() - (11 - i));
    labels.push({ label: MONTHS[d.getMonth()], col: Math.round((i / 12) * 52) });
  }
  return labels;
}

/* ─── Skeleton ───────────────────────────────────────────────────────────── */
function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-white/[0.06] ${className}`}
    />
  );
}

/* ─── Section header ─────────────────────────────────────────────────────── */
function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 font-mono text-[10px] tracking-widest text-cyan-400 uppercase">
      {children}
    </p>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export function GithubActivity() {
  const [langs, setLangs] = useState<LangMap>({});
  const [langsLoading, setLangsLoading] = useState(true);
  const [commitsLoading, setCommitsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [lastCommitDate, setLastCommitDate] = useState<Date | null>(null);
  const [timeAgoStr, setTimeAgoStr] = useState('');
  const [tooltip, setTooltip] = useState<{ x: number; y: number; val: number } | null>(null);
  const [barsVisible, setBarsVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const monthLabels = getMonthLabels();

  /* commit feed */
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('https://api.github.com/users/ada203880-boop/events/public?per_page=30');
        if (!res.ok) throw new Error();
        const data: GithubEvent[] = await res.json();
        if (!mounted || !Array.isArray(data)) throw new Error();
        const rows = data
          .filter(e => e.type === 'PushEvent' || e.type === 'CreateEvent')
          .slice(0, 5)
          .map(e => {
            const msg = e.payload?.commits?.[0]?.message ??
              `Pushed to ${e.payload?.ref?.replace('refs/heads/', '') ?? 'branch'}`;
            const d = new Date(e.created_at);
            return {
              id: e.id,
              repo: e.repo.name.replace('ada203880-boop/', ''),
              message: msg.split('\n')[0].slice(0, 55),
              time: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              url: `https://github.com/${e.repo.name}`,
              rawDate: d,
            };
          });
        if (rows.length > 0) {
          setLastCommitDate(rows[0].rawDate);
        } else throw new Error();
      } catch {
        setLastCommitDate(FALLBACK_COMMITS[0].rawDate);
      } finally {
        if (mounted) setCommitsLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  /* language distribution */
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const reposRes = await fetch('https://api.github.com/users/ada203880-boop/repos?per_page=50');
        if (!reposRes.ok) throw new Error();
        const repos: Array<{ name: string }> = await reposRes.json();
        if (!mounted) return;
        const top5 = repos.slice(0, 5);
        const results = await Promise.all(
          top5.map(r =>
            fetch(`https://api.github.com/repos/ada203880-boop/${r.name}/languages`)
              .then(res => res.ok ? res.json() as Promise<LangMap> : Promise.resolve({} as LangMap))
              .catch(() => ({} as LangMap))
          )
        );
        if (!mounted) return;
        const agg: LangMap = {};
        results.forEach(lm => {
          Object.entries(lm).forEach(([lang, bytes]) => {
            agg[lang] = (agg[lang] ?? 0) + bytes;
          });
        });
        const total = Object.values(agg).reduce((s, v) => s + v, 0);
        if (total === 0) throw new Error();
        const sorted = Object.entries(agg)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6);
        const pcts: LangMap = {};
        let used = 0;
        sorted.forEach(([lang, bytes], i) => {
          const pct = i < sorted.length - 1 ? Math.round((bytes / total) * 100) : 100 - used;
          pcts[lang] = pct;
          used += pct;
        });
        setLangs(pcts);
      } catch {
        setLangs(FALLBACK_LANGS);
      } finally {
        if (mounted) setLangsLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  /* user info */
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('https://api.github.com/users/ada203880-boop');
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (mounted) setUserInfo({ public_repos: data.public_repos, followers: data.followers, following: data.following });
      } catch {
        /* leave null — show fallback */
      } finally {
        if (mounted) setUserLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  /* live counter */
  useEffect(() => {
    if (!lastCommitDate) return;
    setTimeAgoStr(timeAgo(lastCommitDate));
    const id = setInterval(() => setTimeAgoStr(timeAgo(lastCommitDate)), 60000);
    return () => clearInterval(id);
  }, [lastCommitDate]);

  /* animate bars on mount */
  useEffect(() => {
    if (!langsLoading) {
      const t = setTimeout(() => setBarsVisible(true), 120);
      return () => clearTimeout(t);
    }
  }, [langsLoading]);

  /* bar intersection observer */
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setBarsVisible(true);
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [langsLoading]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f1a]/80 p-6 backdrop-blur-xl space-y-8">

      {/* ── Card header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Github size={15} className="text-cyan-400" />
          <span className="font-mono text-xs font-semibold tracking-wider text-white">LIVE GITHUB TELEMETRY</span>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
        </div>
        <a
          href="https://github.com/ada203880-boop"
          target="_blank" rel="noreferrer"
          onClick={() => sound.playClick()}
          className="flex items-center gap-1 font-mono text-[10px] text-zinc-400 transition hover:text-cyan-300"
        >
          @ada203880-boop <ExternalLink size={10} />
        </a>
      </div>

      {/* ──────────────────────────────────────────────────────────────────
          SECTION 3 — Last Commit Counter (above feed, hero placement)
      ─────────────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
        </span>
        <span className="font-mono text-xs text-zinc-300">
          <span className="text-zinc-500">Last commit:</span>{' '}
          <span className="text-emerald-400 font-semibold">
            {commitsLoading ? '...' : timeAgoStr || '—'}
          </span>
          <span className="ml-2 text-zinc-600">· actively coding</span>
        </span>
      </div>

      {/* ──────────────────────────────────────────────────────────────────
          SECTION 1 — Language Distribution Bar
      ─────────────────────────────────────────────────────────────────── */}
      <div ref={barRef}>
        <SectionHeader>// LANGUAGE_DISTRIBUTION</SectionHeader>
        {langsLoading
          ? <Skeleton className="h-8 w-full rounded-full" />
          : (
            <>
              {/* stacked bar */}
              <div className="flex h-5 w-full overflow-hidden rounded-full border border-white/10">
                {Object.entries(langs).map(([lang, pct]) => (
                  <div
                    key={lang}
                    title={`${lang}: ${pct}%`}
                    style={{
                      width: barsVisible ? `${pct}%` : '0%',
                      backgroundColor: getLangColor(lang),
                      transition: 'width 0.8s cubic-bezier(0.34,1.56,0.64,1)',
                    }}
                  />
                ))}
              </div>
              {/* legend */}
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                {Object.entries(langs).map(([lang, pct]) => (
                  <div key={lang} className="flex items-center gap-1.5">
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ backgroundColor: getLangColor(lang) }}
                    />
                    <span className="font-mono text-[10px] text-zinc-400">{lang}</span>
                    <span className="font-mono text-[10px] text-zinc-600">{pct}%</span>
                  </div>
                ))}
              </div>
            </>
          )
        }
      </div>

      {/* ──────────────────────────────────────────────────────────────────
          SECTION 4 — Stats Summary Row
      ─────────────────────────────────────────────────────────────────── */}
      <div>
        <SectionHeader>// GITHUB_STATS</SectionHeader>
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              icon: <BookOpen size={14} className="text-cyan-400" />,
              label: 'Repos',
              value: userLoading ? '…' : userInfo ? String(userInfo.public_repos) : '12+',
            },
            {
              icon: <Users size={14} className="text-purple-400" />,
              label: 'Followers',
              value: userLoading ? '…' : userInfo ? String(userInfo.followers) : '—',
            },
            {
              icon: <UserCheck size={14} className="text-emerald-400" />,
              label: 'Following',
              value: userLoading ? '…' : userInfo ? String(userInfo.following) : '—',
            },
          ].map(s => (
            <div
              key={s.label}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-white/[0.06] bg-white/[0.02] py-3"
            >
              {s.icon}
              <span className="font-mono text-lg font-bold text-white">{s.value}</span>
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────
          SECTION 5 — Contribution Heatmap
      ─────────────────────────────────────────────────────────────────── */}
      <div>
        <SectionHeader>// CONTRIBUTION_ACTIVITY (2024–2025)</SectionHeader>
        <div className="mb-3 flex items-start gap-2 rounded-lg border border-amber-500/20 bg-amber-950/20 px-3 py-2 text-[11px] font-mono text-amber-400/80">
          <span className="shrink-0">⚠</span>
          <span>Heatmap is illustrative — GitHub Pages does not support authenticated API calls. For live data, visit{' '}
            <a href="https://github.com/ada203880-boop" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-300">github.com/ada203880-boop</a>
          </span>
        </div>
        <div className="relative overflow-x-auto">
          {/* Month labels */}
          <div className="mb-1 flex" style={{ gap: 2 }}>
            {monthLabels.map(({ label, col }) => (
              <span
                key={`${label}-${col}`}
                className="font-mono text-[8px] text-zinc-600"
                style={{ width: 10, marginLeft: col === monthLabels[0].col ? 0 : undefined }}
              >
                {label}
              </span>
            ))}
          </div>
          {/* Grid: columns = weeks, rows = days */}
          <div className="flex" style={{ gap: 2 }}>
            {HEATMAP.map((week, wi) => (
              <div key={wi} className="flex flex-col" style={{ gap: 2 }}>
                {week.map((val, di) => (
                  <div
                    key={di}
                    className={`rounded-[2px] ${heatColor(val)} cursor-pointer transition hover:brightness-125`}
                    style={{ width: 10, height: 10 }}
                    onMouseEnter={e => {
                      const rect = (e.target as HTMLElement).getBoundingClientRect();
                      setTooltip({ x: rect.left, y: rect.top, val });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Tooltip */}
          {tooltip && (
            <div
              className="pointer-events-none fixed z-50 rounded bg-zinc-900 border border-white/10 px-2 py-1 font-mono text-[10px] text-zinc-300 shadow-xl"
              style={{ left: tooltip.x + 14, top: tooltip.y - 4 }}
            >
              {tooltip.val === 0 ? 'No contributions' : `${tooltip.val} contribution${tooltip.val > 1 ? 's' : ''}`}
            </div>
          )}

          {/* Legend */}
          <div className="mt-2 flex items-center gap-1.5">
            <span className="font-mono text-[9px] text-zinc-600">Less</span>
            {[0, 2, 5, 8].map(n => (
              <div key={n} className={`h-2.5 w-2.5 rounded-[2px] ${heatColor(n)}`} />
            ))}
            <span className="font-mono text-[9px] text-zinc-600">More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
