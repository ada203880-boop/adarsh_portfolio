import { useEffect } from 'react';
import { X, CheckCircle2, ArrowUpRight, ShieldAlert, Code2, Layers, BookOpen, AlertCircle } from 'lucide-react';
import { sound } from '../lib/sound';
import { CaseStudySlider } from './CaseStudySlider';

export interface DetailedCaseStudy {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  stack: string[];
  liveUrl?: string | null;
  repoUrl?: string | null;
  statusBadge: string;
  overview: string;
  problemAndObjectives: string;
  roleAndResponsibilities: string;
  constraintsAndRequirements: string[];
  architectureAndTechChoices: string[];
  implementationDecisions: string[];
  challengesAndSolutions: Array<{ challenge: string; solution: string }>;
  verificationAndTesting: string[];
  outcomeAndStatus: string;
  lessonsLearned: string;
}

interface CaseStudyModalProps {
  study: DetailedCaseStudy | null;
  onClose: () => void;
}

export function CaseStudyModal({ study, onClose }: CaseStudyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (study) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      sound.playSuccess();
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [study, onClose]);

  if (!study) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 p-2.5 sm:p-6 backdrop-blur-xl"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-violet-500/25 bg-[#0a081a] p-4 sm:p-10 shadow-[0_0_80px_rgba(139,92,246,0.18)] text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
          <div className="flex items-center gap-2">
            <span className="rounded-md border border-violet-500/30 bg-violet-950/40 px-2.5 py-0.5 font-mono text-xs text-violet-300">
              PROJECT {study.number} · CASE STUDY
            </span>
            <span className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[11px] text-zinc-400">
              {study.statusBadge}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-400 hover:border-white/30 hover:text-white transition-colors"
            aria-label="Close Case Study"
          >
            <X size={16} />
          </button>
        </div>

        {/* Title */}
        <div className="mt-6">
          <h2 id="case-study-title" className="text-2xl sm:text-4xl font-light tracking-tight text-white">
            {study.name}
          </h2>
          <p className="mt-1.5 font-mono text-xs text-violet-400 uppercase tracking-wider">
            {study.subtitle}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {study.stack.map((t) => (
              <span
                key={t}
                className="rounded border border-white/10 bg-white/[0.02] px-2.5 py-0.5 font-mono text-[11px] text-zinc-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Before/After Slider — Design vs Deployed */}
        <div className="mt-6">
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5 mb-3">
            <Code2 size={13} /> Before / After — Design vs. Deployed
          </h3>
          <CaseStudySlider projectId={study.id} className="h-64" />
        </div>

        {/* 1. Overview */}
        <div className="mt-8 space-y-2">
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-violet-300 flex items-center gap-1.5">
            <BookOpen size={13} /> 1. Overview
          </h3>
          <p className="text-sm leading-relaxed text-zinc-300 font-light">
            {study.overview}
          </p>
        </div>

        {/* 2. Problem and Objectives & 3. My Role */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              2. Problem &amp; Objectives
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
              {study.problemAndObjectives}
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              3. My Role &amp; Responsibilities
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
              {study.roleAndResponsibilities}
            </p>
          </div>
        </div>

        {/* 4. Constraints and Requirements */}
        <div className="mt-6 space-y-2">
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400">
            4. Constraints &amp; Requirements
          </h3>
          <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-300 font-light list-disc list-inside">
            {study.constraintsAndRequirements.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>

        {/* 5. Architecture and Tech Choices */}
        <div className="mt-6 space-y-2">
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-violet-300 flex items-center gap-1.5">
            <Layers size={13} /> 5. Architecture &amp; Technology Choices
          </h3>
          <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-300 font-light">
            {study.architectureAndTechChoices.map((a, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-violet-400 mt-0.5">•</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 6. Important Implementation Decisions */}
        <div className="mt-6 space-y-2">
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
            <Code2 size={13} /> 6. Key Implementation Decisions
          </h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {study.implementationDecisions.map((dec, i) => (
              <div key={i} className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-3 text-xs text-zinc-300 font-light">
                {dec}
              </div>
            ))}
          </div>
        </div>

        {/* 7. Challenges and Solutions */}
        <div className="mt-6 space-y-3">
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
            <ShieldAlert size={13} /> 7. Challenges &amp; Solutions
          </h3>
          <div className="space-y-2.5">
            {study.challengesAndSolutions.map((cs, i) => (
              <div key={i} className="rounded-xl border border-white/[0.08] bg-black/40 p-4 space-y-1.5 text-xs">
                <div className="font-semibold text-rose-300">Challenge: {cs.challenge}</div>
                <div className="text-zinc-300 font-light">Solution: {cs.solution}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 8. Verification and Testing */}
        <div className="mt-6 space-y-2">
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
            <CheckCircle2 size={13} /> 8. Verification &amp; Testing
          </h3>
          <ul className="space-y-1 text-xs sm:text-sm text-zinc-300 font-light">
            {study.verificationAndTesting.map((v, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-400">✓</span>
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 9. Outcome & Current Status (Technical Honesty) */}
        <div className="mt-6 rounded-xl border border-violet-500/30 bg-violet-950/20 p-5 space-y-1.5">
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-violet-300 flex items-center gap-1.5">
            <AlertCircle size={13} /> 9. Outcome &amp; Current Status
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
            {study.outcomeAndStatus}
          </p>
        </div>

        {/* 10. Lessons Learned */}
        <div className="mt-6 space-y-2">
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400">
            10. Lessons Learned
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
            {study.lessonsLearned}
          </p>
        </div>

        {/* 11. Links & Footer Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-6">
          <div className="flex flex-wrap items-center gap-3">
            {study.liveUrl && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-4 py-2 text-xs font-medium text-white hover:bg-violet-500 transition-colors"
              >
                Visit Live Site <ArrowUpRight size={13} />
              </a>
            )}
            {study.repoUrl && (
              <a
                href={study.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-medium text-zinc-200 hover:text-white transition-colors"
              >
                Inspect Source Repository <ArrowUpRight size={13} />
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            Close Case Study (Esc)
          </button>
        </div>
      </div>
    </div>
  );
}
