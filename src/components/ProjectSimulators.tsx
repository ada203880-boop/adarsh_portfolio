import { useState, useRef, useEffect } from 'react';

// ─── Pharmacy Simulator ──────────────────────────────────────────────────────
export function PharmacySimulator() {
  const [stage, setStage] = useState<'idle' | 'uploading' | 'verifying' | 'dispatched'>('idle');
  const [drag, setDrag] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startFlow = () => {
    if (stage !== 'idle') return;
    setStage('uploading');
    setProgress(0);
    let p = 0;
    timerRef.current = setInterval(() => {
      p += Math.random() * 12 + 5;
      setProgress(Math.min(p, 100));
      if (p >= 100) {
        clearInterval(timerRef.current!);
        setStage('verifying');
        setTimeout(() => setStage('dispatched'), 1800);
      }
    }, 120);
  };

  const reset = () => {
    clearInterval(timerRef.current!);
    setStage('idle');
    setProgress(0);
  };

  useEffect(() => () => clearInterval(timerRef.current!), []);

  const stageColors: Record<string, string> = {
    idle: 'text-white/40',
    uploading: 'text-cyan-400',
    verifying: 'text-yellow-400',
    dispatched: 'text-emerald-400',
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4 select-none">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">Rx Uploader</span>
        <span className={`font-mono text-[10px] tracking-[0.15em] uppercase ${stageColors[stage]}`}>{stage}</span>
      </div>

      {/* Drop Zone */}
      <div
        className={`relative flex h-28 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all duration-300 ${drag || stage !== 'idle'
          ? 'border-cyan-400/60 bg-cyan-500/10'
          : 'border-white/10 hover:border-white/30 hover:bg-white/[0.02]'
          }`}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); startFlow(); }}
        onClick={startFlow}
      >
        {stage === 'idle' ? (
          <>
            <div className="mb-2 text-2xl">💊</div>
            <p className="text-xs text-white/40">Drop prescription or click to upload</p>
          </>
        ) : stage === 'uploading' ? (
          <div className="w-full px-4 space-y-2">
            <div className="flex justify-between text-xs font-mono text-cyan-400">
              <span>Rx_2024_PANDA.pdf</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-cyan-400 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : stage === 'verifying' ? (
          <div className="space-y-1 text-center">
            <div className="text-xl animate-spin inline-block">⚙️</div>
            <p className="text-xs text-yellow-400 font-mono">AI VERIFYING Rx…</p>
          </div>
        ) : (
          <div className="space-y-1 text-center">
            <div className="text-2xl">✅</div>
            <p className="text-xs text-emerald-400 font-mono">ORDER DISPATCHED</p>
          </div>
        )}
      </div>

      {/* WhatsApp Notification */}
      {stage === 'dispatched' && (
        <div className="flex items-start gap-3 rounded-lg border border-emerald-400/30 bg-emerald-500/10 p-3 animate-fade-in">
          <span className="text-lg">📱</span>
          <div>
            <div className="font-mono text-[9px] text-emerald-400 tracking-wider">WHATSAPP NOTIFICATION</div>
            <p className="mt-0.5 text-xs text-white/70">Your prescription has been verified & dispatched. Track: #RX2024-AP9823</p>
          </div>
        </div>
      )}

      {stage !== 'idle' && (
        <button onClick={reset} className="w-full text-[10px] font-mono text-white/30 hover:text-white transition py-1">
          RESET
        </button>
      )}
    </div>
  );
}

// ─── FORGE Telemetry Simulator ───────────────────────────────────────────────
export function ForgeSimulator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frame = useRef(0);
  const calories = useRef(0);
  const steps = useRef(0);
  const [displayCal, setDisplayCal] = useState(0);
  const [displaySteps, setDisplaySteps] = useState(0);
  const [aiResponse, setAiResponse] = useState('');
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    canvas.width = canvas.parentElement?.clientWidth ?? 300;
    canvas.height = 80;

    let raf: number;
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Heartbeat waveform
      ctx.beginPath();
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#a855f7';
      ctx.shadowBlur = 6;

      const freq = 0.08;
      for (let i = 0; i < w; i++) {
        const t = (i + frame.current * 2) * freq;
        const beat = Math.sin(t) * 15 + Math.sin(t * 3) * 5 + Math.sin(t * 7) * 2;
        const y = h / 2 - beat;
        if (i === 0) ctx.moveTo(i, y);
        else ctx.lineTo(i, y);
      }
      ctx.stroke();

      // Update counters
      calories.current += Math.random() * 0.3;
      steps.current += Math.random() * 0.8;
      setDisplayCal(Math.round(calories.current));
      setDisplaySteps(Math.round(steps.current));

      frame.current++;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  const triggerAI = () => {
    if (typing) return;
    setTyping(true);
    setAiResponse('');
    const response = 'Based on your activity: 1,847 steps today. Recommend 20 min brisk walk. Calorie deficit: 340 kcal. Stay hydrated! 💪';
    let i = 0;
    const typeInterval = setInterval(() => {
      setAiResponse(response.slice(0, i));
      i++;
      if (i > response.length) { clearInterval(typeInterval); setTyping(false); }
    }, 25);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">FORGE Telemetry</span>
        <span className="font-mono text-[10px] text-violet-400 animate-pulse">● LIVE</span>
      </div>

      {/* Waveform */}
      <canvas ref={canvasRef} className="w-full rounded-lg bg-black/40" aria-label="Live health waveform" />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'CALORIES', value: displayCal, unit: 'kcal', color: '#f59e0b' },
          { label: 'STEPS', value: displaySteps, unit: 'steps', color: '#a855f7' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 text-center">
            <div className="font-mono text-[9px] tracking-widest mb-1" style={{ color: stat.color }}>{stat.label}</div>
            <div className="text-xl font-bold text-white tabular-nums">{stat.value.toLocaleString()}</div>
            <div className="font-mono text-[9px] text-white/30">{stat.unit}</div>
          </div>
        ))}
      </div>

      {/* AI Response */}
      <button
        onClick={triggerAI}
        className="w-full rounded-lg border border-violet-500/30 bg-violet-500/10 py-2 text-[10px] font-mono text-violet-300 hover:bg-violet-500/20 transition"
      >
        {typing ? '⌨️ AI Analyzing…' : '🤖 GET AI INSIGHTS'}
      </button>

      {aiResponse && (
        <p className="text-xs text-white/60 font-mono leading-relaxed border border-white/[0.06] rounded-lg p-3 bg-white/[0.02]">
          {aiResponse}{typing && <span className="animate-pulse">▊</span>}
        </p>
      )}
    </div>
  );
}

// ─── Audio Oscilloscope ──────────────────────────────────────────────────────
export function AudioOscilloscope() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number>(0);
  const [active, setActive] = useState(false);

  const initAudio = async () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      analyserRef.current = audioCtxRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      analyserRef.current.connect(audioCtxRef.current.destination);
    }
    return { ctx: audioCtxRef.current, analyser: analyserRef.current! };
  };

  const playNote = async (freq: number) => {
    const { ctx, analyser } = await initAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(analyser);
    osc.frequency.value = freq;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    osc.start();
    osc.stop(ctx.currentTime + 0.8);
    setActive(true);
    startDraw();
  };

  const startDraw = () => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;
    const ctx = canvas.getContext('2d')!;
    canvas.width = canvas.parentElement?.clientWidth ?? 300;
    canvas.height = 80;

    const draw = () => {
      const data = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteTimeDomainData(data);
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 2;

      const gradient = ctx.createLinearGradient(0, 0, w, 0);
      gradient.addColorStop(0, '#06b6d4');
      gradient.addColorStop(0.5, '#a855f7');
      gradient.addColorStop(1, '#06b6d4');
      ctx.strokeStyle = gradient;
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 8;

      ctx.beginPath();
      const sliceWidth = w / data.length;
      let x = 0;
      for (let i = 0; i < data.length; i++) {
        const v = data[i] / 128.0;
        const y = (v * h) / 2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }
      ctx.stroke();
      rafRef.current = requestAnimationFrame(draw);
    };
    cancelAnimationFrame(rafRef.current);
    draw();
  };

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const NOTES = [
    { label: 'C4', freq: 261.63, color: '#06b6d4' },
    { label: 'E4', freq: 329.63, color: '#a855f7' },
    { label: 'G4', freq: 392.0, color: '#34d399' },
    { label: 'A4', freq: 440.0, color: '#f59e0b' },
    { label: 'C5', freq: 523.25, color: '#ec4899' },
  ];

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">Audio Oscilloscope</span>
        {active && <span className="font-mono text-[10px] text-cyan-400 animate-pulse">● ACTIVE</span>}
      </div>

      <canvas
        ref={canvasRef}
        className="w-full rounded-lg bg-black/40"
        aria-label="Audio waveform visualizer"
      />

      <div className="flex gap-2 flex-wrap">
        {NOTES.map((n) => (
          <button
            key={n.label}
            onClick={() => playNote(n.freq)}
            className="flex-1 rounded-lg border py-2 text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              borderColor: `${n.color}50`,
              backgroundColor: `${n.color}10`,
              color: n.color,
            }}
          >
            {n.label}
          </button>
        ))}
      </div>
      <p className="text-[9px] font-mono text-white/30 text-center">TAP NOTES TO PLAY & SEE WAVEFORM</p>
    </div>
  );
}

