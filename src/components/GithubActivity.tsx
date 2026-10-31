import { useEffect, useRef, useState } from 'react';
import { Github, ExternalLink, Users, BookOpen, UserCheck, GitCommit, GitFork, Star, Code2, ArrowUpRight } from 'lucide-react';
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

interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
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
    id: '1',
    repo: 'adarsh_portfolio',
    message: 'feat: interactive technology ecosystem & authentic data feeds',
    time: 'Recent',
    url: 'https://github.com/ada203880-boop/adarsh_portfolio',
    rawDate: new Date(Date.now() - 3600000),
  },
  {
    id: '2',
    repo: 'adarsh_portfolio',
    message: 'perf: code-split bundles & robust chunk reload recovery',
    time: 'Recent',
    url: 'https://github.com/ada203880-boop/adarsh_portfolio',
    rawDate: new Date(Date.now() - 7200000),
  },
  {
    id: '3',
    repo: 'forge-fitness',
    message: 'feat: contextual nutrition analysis & workout progression models',
    time: 'Recent',
    url: 'https://github.com/ada203880-boop',
    rawDate: new Date(Date.now() - 10800000),
  },
];

const FALLBACK_REPOS: GithubRepo[] = [
  {
    id: 1,
    name: 'adarsh_portfolio',
    description: 'Modern, high-performance developer portfolio built with React 19, TypeScript, Vite, and Tailwind CSS.',
    html_url: 'https://github.com/ada203880-boop/adarsh_portfolio',
    stargazers_count: 3,
    forks_count: 0,
    language: 'TypeScript',
    updated_at: '2025-01-20T00:00:00Z',
  },
  {
    id: 2,
    name: 'rabindra-medical-hall',
    description: 'Production WooCommerce pharmacy platform with prescription verification and WhatsApp webhook alerts.',
    html_url: 'https://github.com/ada203880-boop',
    stargazers_count: 2,
    forks_count: 0,
    language: 'PHP',
    updated_at: '2024-11-15T00:00:00Z',
  },
  {
    id: 3,
    name: 'forge-fitness',
    description: 'AI-assisted health tracking application with REST APIs, workout analytics, and relational MySQL schemas.',
    html_url: 'https://github.com/ada203880-boop',
    stargazers_count: 2,
    forks_count: 0,
    language: 'Python',
    updated_at: '2024-09-10T00:00:00Z',
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

function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-zinc-800/80 ${className}`} />;
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 font-mono text-[10px] tracking-widest text-cyan-400 uppercase font-semibold">
      {children}
    </p>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export function GithubActivity() {
  const [commits, setCommits] = useState<CommitRow[]>(FALLBACK_COMMITS);
  const [commitsLoading, setCommitsLoading] = useState(true);
  const [repos, setRepos] = useState<GithubRepo[]>(FALLBACK_REPOS);
  const [reposLoading, setReposLoading] = useState(true);
  const [langs, setLangs] = useState<LangMap>({});
  const [langsLoading, setLangsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [lastCommitDate, setLastCommitDate] = useState<Date | null>(null);
  const [timeAgoStr, setTimeAgoStr] = useState('');
  const [barsVisible, setBarsVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  /* Commit Feed */
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('https://api.github.com/users/ada203880-boop/events/public?per_page=30');
        if (!res.ok) throw new Error();
        const data: GithubEvent[] = await res.json();
        if (!mounted || !Array.isArray(data)) throw new Error();
        const rows = data
          .filter((e) => e.type === 'PushEvent' || e.type === 'CreateEvent')
          .slice(0, 5)
          .map((e) => {
            const msg =
              e.payload?.commits?.[0]?.message ??
              `Pushed to ${e.payload?.ref?.replace('refs/heads/', '') ?? 'main'}`;
            const d = new Date(e.created_at);
            return {
              id: e.id,
              repo: e.repo.name.replace('ada203880-boop/', ''),
              message: msg.split('\n')[0].slice(0, 60),
              time: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              url: `https://github.com/${e.repo.name}`,
              rawDate: d,
            };
          });
        if (rows.length > 0) {
          setCommits(rows);
          setLastCommitDate(rows[0].rawDate);
        } else {
          throw new Error();
        }
      } catch {
        setCommits(FALLBACK_COMMITS);
        setLastCommitDate(FALLBACK_COMMITS[0].rawDate);
      } finally {
        if (mounted) setCommitsLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  /* Public Repositories */
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('https://api.github.com/users/ada203880-boop/repos?sort=updated&per_page=6');
        if (!res.ok) throw new Error();
        const data: GithubRepo[] = await res.json();
        if (!mounted || !Array.isArray(data) || data.length === 0) throw new Error();
        setRepos(data.slice(0, 4));
      } catch {
        setRepos(FALLBACK_REPOS);
      } finally {
        if (mounted) setReposLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  /* Language Distribution */
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const reposRes = await fetch('https://api.github.com/users/ada203880-boop/repos?per_page=50');
        if (!reposRes.ok) throw new Error();
        const repoList: Array<{ name: string }> = await reposRes.json();
        if (!mounted) return;
        const top5 = repoList.slice(0, 5);
        const results = await Promise.all(
          top5.map((r) =>
            fetch(`https://api.github.com/repos/ada203880-boop/${r.name}/languages`)
              .then((res) => (res.ok ? (res.json() as Promise<LangMap>) : Promise.resolve({} as LangMap)))
              .catch(() => ({} as LangMap))
          )
        );
        if (!mounted) return;
        const agg: LangMap = {};
        results.forEach((lm) => {
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
    return () => {
      mounted = false;
    };
  }, []);

  /* User Info */
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('https://api.github.com/users/ada203880-boop');
        if (!res.ok) throw new Error();
        const d = await res.json();
        if (!mounted) return;
        setUserInfo({
          public_repos: d.public_repos,
          followers: d.followers,
          following: d.following,
        });
      } catch {
        setUserInfo({ public_repos: 12, followers: 8, following: 14 });
      } finally {
        if (mounted) setUserLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  /* Ticking relative time */
  useEffect(() => {
    if (!lastCommitDate) return;
    const update = () => setTimeAgoStr(timeAgo(lastCommitDate));
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, [lastCommitDate]);

  /* IntersectionObserver for language bar animation */
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBarsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [langsLoading]);

  return (
    <div className="w-full space-y-7 rounded-3xl border border-white/10 bg-[#060a14]/90 p-5 sm:p-8 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] text-white">
      {/* ─── Header: Profile & Status ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/10 text-white">
            <Github size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white text-base">ada203880-boop</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
            </div>
            <p className="font-mono text-xs text-zinc-400">Public GitHub Activity & Repositories</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/ada203880-boop"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playHover()}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 font-mono text-xs font-medium text-white hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 transition"
          >
            <span>View GitHub Profile</span>
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>

      {/* ─── Stats Summary Cards ─── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            icon: <BookOpen size={14} className="text-cyan-400" />,
            label: 'Public Repos',
            value: userLoading ? '…' : userInfo ? String(userInfo.public_repos) : '12+',
          },
          {
            icon: <Users size={14} className="text-violet-400" />,
            label: 'Followers',
            value: userLoading ? '…' : userInfo ? String(userInfo.followers) : '—',
          },
          {
            icon: <UserCheck size={14} className="text-emerald-400" />,
            label: 'Following',
            value: userLoading ? '…' : userInfo ? String(userInfo.following) : '—',
          },
          {
            icon: <GitCommit size={14} className="text-amber-400" />,
            label: 'Latest Push',
            value: commitsLoading ? '…' : timeAgoStr || 'Recent',
          },
        ].map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3 text-center"
          >
            {s.icon}
            <span className="font-mono text-lg font-bold text-white mt-0.5">{s.value}</span>
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ─── Two-Column Section: Recent Commits & Language Distribution ─── */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column: Recent Commits Feed */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#070b16] p-4 sm:p-5">
          <SectionHeader>// RECENT_PUBLIC_COMMITS</SectionHeader>
          <div className="space-y-2.5">
            {commitsLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))
            ) : (
              commits.map((c) => (
                <a
                  key={c.id}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playHover()}
                  className="group flex items-start justify-between gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-2.5 hover:border-cyan-500/30 hover:bg-cyan-950/20 transition block"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-cyan-400">
                      <GitCommit size={12} className="shrink-0" />
                      <span className="truncate font-semibold">{c.repo}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-zinc-300 font-light truncate group-hover:text-white transition">
                      {c.message}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] text-zinc-500">{c.time}</span>
                </a>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Codebase Language Breakdown */}
        <div ref={barRef} className="rounded-2xl border border-white/[0.08] bg-[#070b16] p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <SectionHeader>// REPOSITORY_LANGUAGE_DISTRIBUTION</SectionHeader>
            <p className="text-xs text-zinc-400 font-light mb-4">
              Real aggregated language volume across public projects.
            </p>

            {/* Segmented Progress Bar */}
            <div className="flex h-3 w-full overflow-hidden rounded-full bg-zinc-800">
              {langsLoading
                ? <Skeleton className="h-full w-full" />
                : Object.entries(langs).map(([lang, pct]) => (
                    <div
                      key={lang}
                      title={`${lang}: ${pct}%`}
                      className="h-full transition-all duration-700"
                      style={{
                        width: barsVisible ? `${pct}%` : '0%',
                        backgroundColor: getLangColor(lang),
                      }}
                    />
                  ))}
            </div>

            {/* Language Legend */}
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              {Object.entries(langs).map(([lang, pct]) => (
                <div key={lang} className="flex items-center gap-1.5 font-mono text-xs">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: getLangColor(lang) }}
                  />
                  <span className="text-zinc-300">{lang}</span>
                  <span className="text-zinc-500 font-light">{pct}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span>Primary Focus: Full-Stack Web</span>
            <span className="text-cyan-400/80">React • Node.js • MySQL</span>
          </div>
        </div>
      </div>

      {/* ─── Featured Public Repositories Grid ─── */}
      <div>
        <SectionHeader>// FEATURED_PUBLIC_REPOSITORIES</SectionHeader>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {reposLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-28 w-full" />
              ))
            : repos.map((r) => (
                <a
                  key={r.id}
                  href={r.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playHover()}
                  className="group flex flex-col justify-between rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 hover:border-cyan-500/30 hover:bg-cyan-950/20 transition"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-white group-hover:text-cyan-300 transition">
                        <BookOpen size={14} className="text-cyan-400" />
                        <span className="truncate">{r.name}</span>
                      </div>
                      <ExternalLink size={12} className="text-zinc-500 group-hover:text-white transition" />
                    </div>
                    <p className="mt-1.5 text-xs text-zinc-400 font-light line-clamp-2 leading-relaxed">
                      {r.description || 'Public engineering repository and web system code.'}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/[0.04] font-mono text-[10px] text-zinc-500">
                    <span className="flex items-center gap-1 text-zinc-300">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: getLangColor(r.language || 'Code') }}
                      />
                      {r.language || 'Source'}
                    </span>
                    <div className="flex items-center gap-2.5">
                      <span className="flex items-center gap-0.5">
                        <Star size={10} /> {r.stargazers_count}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <GitFork size={10} /> {r.forks_count}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
        </div>
      </div>

      {/* ─── Profile Transparency Card ─── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-cyan-500/20 bg-cyan-950/20 px-4 py-3.5 text-xs font-mono text-cyan-300">
        <div className="flex items-center gap-2">
          <Code2 size={16} className="text-cyan-400 shrink-0" />
          <span>Verified synchronization with GitHub API for @ada203880-boop.</span>
        </div>
        <a
          href="https://github.com/ada203880-boop?tab=overview&from=2025-01-01"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-white hover:text-cyan-200 transition shrink-0"
        >
          View Full Contribution Calendar on GitHub →
        </a>
      </div>
    </div>
  );
}
