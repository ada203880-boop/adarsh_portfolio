import { useState, useEffect, useRef } from 'react';
import { sound } from '../lib/sound';

interface MusicPlayerProps {
  className?: string;
}

const TRACK_DURATION = 210; // 3min 30s in seconds

export default function MusicPlayer({ className = '' }: MusicPlayerProps) {
  const [expanded, setExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(sound.enabled);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressStartTimeRef = useRef<number>(0);
  const progressOffsetRef = useRef<number>(0);

  // Sync sound enabled state
  useEffect(() => {
    const handleSoundChange = (e: Event) => {
      const detail = (e as CustomEvent<{ enabled: boolean }>).detail;
      setSoundEnabled(detail.enabled);
    };
    window.addEventListener('sound-state-change', handleSoundChange);
    return () => window.removeEventListener('sound-state-change', handleSoundChange);
  }, []);

  // Progress bar ticker
  useEffect(() => {
    if (isPlaying) {
      progressStartTimeRef.current = Date.now();
      progressIntervalRef.current = setInterval(() => {
        const elapsed = (Date.now() - progressStartTimeRef.current) / 1000 + progressOffsetRef.current;
        const looped = elapsed % TRACK_DURATION;
        setProgress((looped / TRACK_DURATION) * 100);
      }, 500);
    } else {
      if (progressIntervalRef.current) {
        // Save offset
        const elapsed = (Date.now() - progressStartTimeRef.current) / 1000 + progressOffsetRef.current;
        progressOffsetRef.current = elapsed % TRACK_DURATION;
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    }
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (!soundEnabled) {
      sound.toggle();
      setSoundEnabled(true);
      setIsPlaying(true);
      sound.startAmbient();
      return;
    }
    if (isPlaying) {
      sound.stopAmbient();
      setIsPlaying(false);
    } else {
      sound.startAmbient();
      setIsPlaying(true);
    }
  };

  const handleSkip = (dir: 'prev' | 'next') => {
    // Reset progress on skip
    progressOffsetRef.current = 0;
    progressStartTimeRef.current = Date.now();
    setProgress(0);
    if (dir === 'next') {
      // Simulate next track — restart ambient
      if (isPlaying) {
        sound.stopAmbient();
        setTimeout(() => sound.startAmbient(), 1100);
      }
    }
  };

  const formatTime = (pct: number) => {
    const secs = Math.round((pct / 100) * TRACK_DURATION);
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <style>{`
        @keyframes bar-bounce-1 { 0%,100%{height:6px} 50%{height:18px} }
        @keyframes bar-bounce-2 { 0%,100%{height:12px} 50%{height:8px} }
        @keyframes bar-bounce-3 { 0%,100%{height:16px} 50%{height:22px} }
        @keyframes bar-bounce-4 { 0%,100%{height:8px} 50%{height:16px} }
        @keyframes bar-bounce-5 { 0%,100%{height:14px} 50%{height:6px} }
        @keyframes slide-up-in { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scroll-track { 0%{transform:translateX(0)} 100%{transform:translateX(-60%)} }
        .music-bar-1 { animation: bar-bounce-1 0.7s ease-in-out infinite; }
        .music-bar-2 { animation: bar-bounce-2 0.9s ease-in-out infinite; }
        .music-bar-3 { animation: bar-bounce-3 0.6s ease-in-out infinite; }
        .music-bar-4 { animation: bar-bounce-4 0.8s ease-in-out infinite; }
        .music-bar-5 { animation: bar-bounce-5 0.75s ease-in-out infinite; }
        .music-player-card { animation: slide-up-in 0.25s ease-out both; }
        .track-scroll { animation: scroll-track 8s linear infinite; white-space:nowrap; }
      `}</style>

      <div
        className={`fixed bottom-12 left-4 z-[195] flex flex-col items-start gap-2 ${className}`}
      >
        {/* Expanded card */}
        {expanded && (
          <div className="music-player-card w-[260px] rounded-2xl border border-violet-500/30 bg-[#0a0a1a]/90 backdrop-blur-xl p-4 shadow-[0_0_24px_rgba(139,92,246,0.18)]">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono text-violet-400/70 uppercase tracking-widest">Now Playing</span>
              <button
                onClick={() => setExpanded(false)}
                className="text-zinc-500 hover:text-zinc-300 text-xs transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Equalizer + track info */}
            <div className="flex items-end gap-3 mb-3">
              {/* Equalizer bars */}
              <div className="flex items-end gap-[3px] h-6 flex-shrink-0">
                {isPlaying ? (
                  <>
                    <div className="w-[3px] bg-violet-400 rounded-full music-bar-1" style={{ height: 6 }} />
                    <div className="w-[3px] bg-violet-500 rounded-full music-bar-2" style={{ height: 12 }} />
                    <div className="w-[3px] bg-violet-400 rounded-full music-bar-3" style={{ height: 16 }} />
                    <div className="w-[3px] bg-violet-500 rounded-full music-bar-4" style={{ height: 8 }} />
                    <div className="w-[3px] bg-violet-400 rounded-full music-bar-5" style={{ height: 14 }} />
                  </>
                ) : (
                  <>
                    {[6, 12, 16, 8, 14].map((h, i) => (
                      <div key={i} className="w-[3px] bg-zinc-600 rounded-full" style={{ height: h }} />
                    ))}
                  </>
                )}
              </div>

              {/* Track title + artist */}
              <div className="flex-1 overflow-hidden">
                <div className="overflow-hidden">
                  <p className={`text-xs font-semibold text-white ${isPlaying ? 'track-scroll' : ''}`}>
                    Deep Focus — Lo-Fi Beats&nbsp;&nbsp;&nbsp;Deep Focus — Lo-Fi Beats
                  </p>
                </div>
                <p className="text-[10px] text-violet-300/70 truncate mt-0.5">Coding Vibes Radio</p>
              </div>
            </div>

            {/* No audio warning */}
            {!soundEnabled && (
              <div className="mb-3 rounded-lg bg-amber-500/10 border border-amber-500/30 px-2 py-1.5 flex items-center gap-2">
                <span className="text-amber-400 text-xs">🔇</span>
                <div className="flex-1">
                  <p className="text-[10px] text-amber-300">Audio not enabled</p>
                  <button
                    onClick={() => { sound.toggle(); setSoundEnabled(true); }}
                    className="text-[10px] text-amber-400 hover:text-amber-200 underline"
                  >
                    Enable Audio First
                  </button>
                </div>
              </div>
            )}

            {/* Progress bar */}
            <div className="mb-3">
              <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-violet-300 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[9px] text-zinc-500">{formatTime(progress)}</span>
                <span className="text-[9px] text-zinc-500">3:30</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mb-3">
              <button
                onClick={() => handleSkip('prev')}
                className="text-zinc-400 hover:text-violet-300 text-base transition-colors"
                title="Previous"
              >
                ⏮
              </button>
              <button
                onClick={handlePlayPause}
                className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-violet-300 hover:bg-violet-500/40 transition-all text-sm"
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
              <button
                onClick={() => handleSkip('next')}
                className="text-zinc-400 hover:text-violet-300 text-base transition-colors"
                title="Next"
              >
                ⏭
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-zinc-500">🔈</span>
              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="flex-1 h-1 accent-violet-500 cursor-pointer"
              />
              <span className="text-[10px] text-zinc-500">🔊</span>
            </div>
          </div>
        )}

        {/* Collapsed pill */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-2 px-3 py-2 rounded-full border border-violet-500/30 bg-[#0a0a1a]/90 backdrop-blur-xl shadow-[0_0_12px_rgba(139,92,246,0.15)] hover:border-violet-400/60 transition-all group"
          style={{ width: 120 }}
          aria-label="Lo-Fi Music Player"
        >
          <span className="text-sm">🎵</span>
          <span className="text-[11px] font-mono text-violet-300 flex-1 text-left">Lo-Fi</span>
          <span className="text-xs text-zinc-400 group-hover:text-violet-300 transition-colors">
            {isPlaying ? '⏸' : '▶'}
          </span>
        </button>
      </div>
    </>
  );
}
