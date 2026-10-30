import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallbackName?: string;
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

  public render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto my-12 max-w-xl rounded-2xl border border-red-500/30 bg-red-950/20 p-6 font-mono text-xs text-red-200">
          <p className="font-bold text-red-400">Telemetry Alert: [{this.props.fallbackName || 'Section'}]</p>
          <p className="mt-1 text-zinc-400 text-[11px]">{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

