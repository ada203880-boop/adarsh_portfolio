import { Component, type ErrorInfo, type ReactNode } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackName?: string;
  isRoot?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReload = () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.clear();
      window.location.reload();
    }
  };

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.isRoot) {
        return (
          <div className="min-h-screen w-full flex items-center justify-center bg-[#03060c] px-6 text-white font-sans">
            <div className="max-w-md w-full rounded-2xl border border-white/10 bg-[#070b16] p-8 text-center shadow-2xl backdrop-blur-xl">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-5 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                <AlertTriangle size={24} />
              </div>
              <h2 className="text-xl font-light text-white tracking-tight">Portfolio Experience Updating</h2>
              <p className="mt-2.5 text-xs text-zinc-400 leading-relaxed font-light">
                A new version of the developer portfolio has been published. Please reload to view the latest interactive architecture and components.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={this.handleReload}
                  className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-5 py-2.5 text-xs font-semibold text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all hover:scale-105 active:scale-95"
                >
                  <RefreshCw size={13} />
                  <span>Reload Application</span>
                </button>
              </div>
            </div>
          </div>
        );
      }

      // Localized Section Error Fallback (does not break the page layout)
      return (
        <div className="mx-auto my-8 max-w-lg rounded-2xl border border-white/10 bg-[#070b16]/80 p-6 text-center text-zinc-300 backdrop-blur-md">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 mb-3">
            <RefreshCw size={16} />
          </div>
          <p className="text-xs font-medium text-white">{this.props.fallbackName || 'Interactive Section'} temporarily unavailable</p>
          <p className="mt-1 text-[11px] text-zinc-400">Content will reload on next user interaction.</p>
          <button
            type="button"
            onClick={this.handleReset}
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-mono text-cyan-300 hover:bg-white/[0.08] transition"
          >
            <RefreshCw size={11} /> Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
