import { FileText, Download, X, ExternalLink, Sparkles } from 'lucide-react';
import { sound } from '../lib/sound';
import { toast } from '../lib/toast';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInteractive?: () => void;
}

export function ResumeModal({ isOpen, onClose, onOpenInteractive }: ResumeModalProps) {
  if (!isOpen) return null;

  const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`;

  const handleDownload = () => {
    sound.playSuccess();
    toast('Downloading resume...', 'info', '📄');
  };

  return (
    <div
      className="fixed inset-0 z-[10005] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative flex h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-cyan-500/30 bg-[#090d16] shadow-[0_0_80px_rgba(6,182,212,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-950/40 text-cyan-300">
              <FileText size={16} />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wide">
                Adarsh_Panda_Resume.pdf
              </h3>
              <p className="font-mono text-[10px] text-zinc-400">
                Full-Stack Developer · B.Tech CSE 2025
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenInteractive && (
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onOpenInteractive();
                }}
                className="hidden sm:flex items-center gap-1.5 rounded-lg border border-violet-500/40 bg-violet-950/40 px-3 py-1.5 font-mono text-[11px] font-medium text-violet-300 transition hover:bg-violet-900/50"
              >
                <Sparkles size={13} />
                <span>Web Resume</span>
              </button>
            )}

            <a
              href={resumeUrl}
              download="Adarsh_Panda_Resume.pdf"
              onClick={handleDownload}
              className="flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-950/40 px-3 py-1.5 font-mono text-[11px] font-medium text-cyan-300 transition hover:bg-cyan-900/50"
            >
              <Download size={13} />
              <span className="hidden sm:inline">Download</span>
            </a>

            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                sound.playClick();
                toast('Opened resume in new tab', 'info', '↗️');
              }}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/70 transition hover:border-cyan-400 hover:text-cyan-300"
              title="Open full PDF"
            >
              <ExternalLink size={14} />
            </a>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 transition hover:text-white"
              title="Close modal"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* PDF Viewer Embed with Mobile Native Helper */}
        <div className="flex-1 bg-[#1a1e28] flex flex-col items-center justify-center relative overflow-hidden">
          <iframe
            src={`${resumeUrl}#toolbar=0&navpanes=0`}
            title="Adarsh Panda Resume"
            className="hidden sm:block h-full w-full border-0"
          />
          {/* Mobile Direct Action View (iOS/Android Native) */}
          <div className="flex sm:hidden flex-col items-center justify-center text-center p-6 space-y-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/40 bg-violet-950/60 text-violet-300 shadow-[0_0_25px_rgba(139,92,246,0.3)]">
              <FileText size={28} />
            </span>
            <div>
              <h4 className="text-base font-semibold text-white">Adarsh Panda · Resume</h4>
              <p className="mt-1 font-mono text-xs text-zinc-400">Full-Stack Developer · B.Tech CSE '25</p>
            </div>
            <div className="flex flex-col w-full gap-2.5 pt-2">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-xs font-semibold text-white shadow-lg transition active:scale-95"
              >
                <ExternalLink size={15} /> Open PDF Full Screen
              </a>
              <a
                href={resumeUrl}
                download="Adarsh_Panda_Resume.pdf"
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.05] px-5 py-3 text-xs font-mono text-zinc-300 transition active:scale-95"
              >
                <Download size={14} /> Download PDF File
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
