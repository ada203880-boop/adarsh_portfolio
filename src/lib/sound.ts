// Web Audio API Synthesizer & Generative Ambient Soundscape
// 0kb external asset dependency, 100% browser-native & instantaneous

class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = false;
  private ambientGain: GainNode | null = null;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private ambientFilter: BiquadFilterNode | null = null;
  public isAmbientPlaying: boolean = false;
  public analyser: AnalyserNode | null = null;
  private pentatonicIndex: number = 0;
  private lastScrollNote: number = 0;

  // Pentatonic scale (C4, D4, E4, G4, A4, C5, D5, E5, G5)
  private readonly PENTATONIC = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 783.99];

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 64;
        this.analyser.smoothingTimeConstant = 0.8;
        this.analyser.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getAnalyserData(): Uint8Array {
    if (!this.analyser) return new Uint8Array(16);
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }

  public toggle(): boolean {
    this.init();
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.playPowerOn();
      this.startAmbient();
      this.speakIntro();
    } else {
      this.stopAmbient();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('sound-state-change', { detail: { enabled: this.enabled } }));
    }
    return this.enabled;
  }

  public speakIntro() {
    if (!this.enabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const hour = new Date().getHours();
      const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

      const introText =
        `${greeting}! Namaste. I am Adarsh Panda, a Full-Stack Software Developer based in Bhubaneswar, India. Welcome to my creative portfolio. I specialize in building high-performance web applications, responsive frontend interfaces with React, scalable Node.js backend systems, and custom WooCommerce e-commerce platforms. Feel free to explore my verified projects, interactive device simulators, and technical architecture. Thank you for visiting!`;

      const utterance = new SpeechSynthesisUtterance(introText);

      // Select Indian English voice if available in the browser/OS, or best natural English voice
      const voices = window.speechSynthesis.getVoices();
      const inVoice =
        voices.find(
          (v) =>
            v.lang.toLowerCase() === 'en-in' ||
            v.lang.toLowerCase().includes('in') ||
            v.name.toLowerCase().includes('india') ||
            v.name.toLowerCase().includes('ravi') ||
            v.name.toLowerCase().includes('heera') ||
            v.name.toLowerCase().includes('aditi')
        ) ||
        voices.find((v) => v.lang.toLowerCase().startsWith('en')) ||
        null;

      if (inVoice) {
        utterance.voice = inVoice;
      }
      utterance.lang = inVoice ? inVoice.lang : 'en-IN';
      utterance.rate = 0.94; // natural human speaking rate
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      window.speechSynthesis.speak(utterance);
    } catch {
      // Safe fallback
    }
  }

  public speakSection(sectionName: string) {
    if (!this.enabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(sectionName);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.volume = 0.75;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Safe fallback
    }
  }

  public playScrollFlow(velocity: number) {
    if (!this.enabled || !this.ctx) return;
    if (Math.abs(velocity) < 0.6) return;
    const now = performance.now();
    if (now - this.lastScrollNote < 220) return;
    this.lastScrollNote = now;

    // Harmonic pentatonic note triggered on scroll flow
    this.playHover();
  }

  public startAmbient() {
    if (!this.enabled || !this.ctx || this.isAmbientPlaying) return;

    try {
      this.ambientGain = this.ctx.createGain();
      this.ambientFilter = this.ctx.createBiquadFilter();

      // Warm low-pass filter for cosmic atmosphere
      this.ambientFilter.type = 'lowpass';
      this.ambientFilter.frequency.setValueAtTime(320, this.ctx.currentTime);

      this.ambientGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.025, this.ctx.currentTime + 3);

      // Deep harmonic drone (D2 + A2: 73.42Hz and 110Hz)
      this.ambientOsc1 = this.ctx.createOscillator();
      this.ambientOsc1.type = 'sine';
      this.ambientOsc1.frequency.setValueAtTime(73.42, this.ctx.currentTime);

      this.ambientOsc2 = this.ctx.createOscillator();
      this.ambientOsc2.type = 'triangle';
      this.ambientOsc2.frequency.setValueAtTime(110.0, this.ctx.currentTime);

      this.ambientOsc1.connect(this.ambientFilter);
      this.ambientOsc2.connect(this.ambientFilter);
      this.ambientFilter.connect(this.ambientGain);

      if (this.analyser) {
        this.ambientGain.connect(this.analyser);
      } else {
        this.ambientGain.connect(this.ctx.destination);
      }

      this.ambientOsc1.start();
      this.ambientOsc2.start();
      this.isAmbientPlaying = true;
    } catch {
      // Safe guard
    }
  }

  public stopAmbient() {
    if (!this.isAmbientPlaying || !this.ambientGain || !this.ctx) return;
    try {
      this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1);
      setTimeout(() => {
        this.ambientOsc1?.stop();
        this.ambientOsc2?.stop();
        this.ambientOsc1?.disconnect();
        this.ambientOsc2?.disconnect();
        this.isAmbientPlaying = false;
      }, 1000);
    } catch {
      this.isAmbientPlaying = false;
    }
  }

  public playHover() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Pentatonic pitch selection
      const freq = this.PENTATONIC[this.pentatonicIndex % this.PENTATONIC.length];
      this.pentatonicIndex++;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.05, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      if (this.analyser) {
        gain.connect(this.analyser);
      } else {
        gain.connect(this.ctx.destination);
      }

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Safe guard
    }
  }

  public playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(680, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(280, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.035, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      if (this.analyser) {
        gain.connect(this.analyser);
      } else {
        gain.connect(this.ctx.destination);
      }

      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {
      // Safe guard
    }
  }

  public playSuccess() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = this.ctx.currentTime + idx * 0.05;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.025, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.12);

        osc.connect(gain);
        if (this.analyser) {
          gain.connect(this.analyser);
        } else {
          gain.connect(this.ctx.destination);
        }

        osc.start(start);
        osc.stop(start + 0.12);
      });
    } catch {
      // Safe guard
    }
  }

  private playPowerOn() {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(480, this.ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      if (this.analyser) {
        gain.connect(this.analyser);
      } else {
        gain.connect(this.ctx.destination);
      }

      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch {
      // Safe guard
    }
  }
}

export const sound = new SoundEngine();
