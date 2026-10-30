import { useEffect } from 'react';
import { X, Download, Printer, Mail, Phone, MapPin, Award, GraduationCap, Briefcase, Code, Sparkles } from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { sound } from '../lib/sound';

interface InteractiveResumeProps {
  isOpen: boolean;
  onClose: () => void;
}

const SKILL_METRICS = [
  { name: 'React.js & Frontend Architecture', level: 90, color: '#00e5ff' },
  { name: 'JavaScript (ES6+) & TypeScript', level: 88, color: '#38bdf8' },
  { name: 'Node.js, Express & REST APIs', level: 85, color: '#10b981' },
  { name: 'Python & Data Workflows', level: 80, color: '#a855f7' },
  { name: 'MySQL & Relational Database Design', level: 82, color: '#f59e0b' },
  { name: 'WordPress & WooCommerce Systems', level: 92, color: '#06b6d4' },
];

export function InteractiveResume({ isOpen, onClose }: InteractiveResumeProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9995] flex items-center justify-center bg-black/85 backdrop-blur-xl p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border border-cyan-500/30 bg-[#070a16] shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(6,182,212,0.25)] overflow-hidden">
        
        {/* Modal Toolbar (hidden in print) */}
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-6 py-4 print:hidden">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
            <Sparkles size={14} />
            <span className="font-bold tracking-wider">INTERACTIVE WEB RESUME // ADARSH PANDA</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-xs text-zinc-300 hover:border-cyan-400 hover:text-white transition-all"
            >
              <Printer size={13} />
              <span>Print</span>
            </button>
            <a
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              download="Adarsh_Panda_Resume.pdf"
              onClick={() => sound.playSuccess()}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-3.5 py-1.5 font-mono text-xs font-semibold text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-105 transition-all"
            >
              <Download size={13} />
              <span>PDF Version</span>
            </a>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="rounded-xl p-2 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume Sheet */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-[#090d1f] text-zinc-200 font-sans print:p-0 print:bg-white print:text-black">
          
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-white/10 pb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white print:text-black">
                {portfolio.name}
              </h1>
              <p className="mt-1 font-mono text-sm text-cyan-400 font-semibold print:text-blue-700">
                {portfolio.title} · {portfolio.specialization}
              </p>
            </div>

            <div className="flex flex-col sm:items-end gap-1 font-mono text-xs text-zinc-400 print:text-gray-600">
              <span className="flex items-center gap-1.5">
                <MapPin size={12} className="text-cyan-400" /> {portfolio.location}
              </span>
              <a href={`mailto:${portfolio.email}`} className="flex items-center gap-1.5 hover:text-cyan-300">
                <Mail size={12} className="text-cyan-400" /> {portfolio.email}
              </a>
              <a href={`tel:${portfolio.phone}`} className="flex items-center gap-1.5 hover:text-cyan-300">
                <Phone size={12} className="text-cyan-400" /> {portfolio.phone}
              </a>
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <h2 className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-cyan-400 uppercase font-bold print:text-blue-700">
              <Code size={14} /> // PROFESSIONAL_SUMMARY
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed font-light print:text-gray-800">
              {portfolio.summary}
            </p>
          </div>

          {/* Interactive Skill Proficiency Meter */}
          <div>
            <h2 className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-cyan-400 uppercase font-bold mb-3 print:text-blue-700">
              <Sparkles size={14} /> // CORE_TECHNICAL_PROFICIENCY
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {SKILL_METRICS.map((s) => (
                <div key={s.name} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3">
                  <div className="flex justify-between font-mono text-xs mb-1.5">
                    <span className="text-white font-medium">{s.name}</span>
                    <span className="font-bold" style={{ color: s.color }}>{s.level}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${s.level}%`, backgroundColor: s.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects */}
          <div>
            <h2 className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-cyan-400 uppercase font-bold mb-4 print:text-blue-700">
              <Briefcase size={14} /> // FEATURED_PROJECTS
            </h2>
            <div className="space-y-4">
              {portfolio.projects.map((proj) => (
                <div key={proj.id} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-base font-bold text-white print:text-black">
                      {proj.name} — <span className="text-cyan-300 print:text-blue-600">{proj.subtitle}</span>
                    </h3>
                    <span className="font-mono text-xs text-zinc-400">{proj.stack}</span>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-xs text-zinc-300 list-disc list-inside print:text-gray-800">
                    {proj.points.map((pt, i) => (
                      <li key={i} className="leading-relaxed font-light">{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Foundation & Certifications */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-cyan-400 uppercase font-bold mb-3 print:text-blue-700">
                <GraduationCap size={14} /> // EDUCATION
              </h2>
              <div className="space-y-3">
                {portfolio.education.map((edu, i) => (
                  <div key={i} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5">
                    <div className="font-semibold text-xs sm:text-sm text-white">{edu.title}</div>
                    <div className="font-mono text-[11px] text-zinc-400 mt-0.5">{edu.institution} ({edu.period})</div>
                    {'detail' in edu && <div className="mt-1 font-mono text-[11px] text-emerald-400 font-semibold">{edu.detail}</div>}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-cyan-400 uppercase font-bold mb-3 print:text-blue-700">
                <Award size={14} /> // VERIFIED_CREDENTIALS
              </h2>
              <div className="space-y-2">
                {portfolio.certifications.map((cert, i) => (
                  <div key={i} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-2.5 text-xs text-zinc-300 flex items-start gap-2">
                    <Award size={13} className="text-amber-400 shrink-0 mt-0.5" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
