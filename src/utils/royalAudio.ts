/**
 * Web Audio API based ambient royal Rajasthani soundscape for VIRĀSĀ PALACE & RETREAT
 * Synthesizes peaceful palace tanpura harmonic drone, gentle bansuri bamboo flute melodies in Raga Bhupali,
 * sitar sympathetic resonance, and delicate temple brass chimes at a soothing, soft, low volume.
 * Operates without external MP3 dependencies.
 */

type SoundStateListener = (isPlaying: boolean) => void;

class RoyalSoundscape {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private droneOscillators: OscillatorNode[] = [];
  private chimeTimer: number | null = null;
  private fluteTimer: number | null = null;
  private listeners: Set<SoundStateListener> = new Set();

  public subscribe(listener: SoundStateListener): () => void {
    this.listeners.add(listener);
    listener(this.isPlaying);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isPlaying));
  }

  public init() {
    if (this.ctx) return;
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    this.ctx = new AudioContextClass();
    this.masterGain = this.ctx.createGain();
    // Soft, low-volume default setting per prompt request
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  public play() {
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.stop(false);

      const now = this.ctx.currentTime;
      // Gentle 3-second soft fade-in to low ambient volume (0.045)
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(0, now);
      this.masterGain.gain.linearRampToValueAtTime(0.045, now + 3);

      // 1. Tanpura Drone in Key of D (D2 = 73.42, A2 = 110, D3 = 146.83, F#3 = 185.00)
      const baseFreqs = [73.42, 110.0, 146.83, 185.0];

      baseFreqs.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // Low-pass filter for warm wooden tanpura acoustic resonance
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(260 + idx * 60, now);

        // Very soft gain per drone string
        gain.gain.setValueAtTime(0.02 / (idx + 1), now);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        this.droneOscillators.push(osc);
      });

      // 2. Rajasthani Bansuri (Bamboo Flute) Melodic Phrases in Raga Bhupali (D, E, F#, A, B, D)
      this.scheduleFluteMelody();

      // 3. Delicate Temple Brass Wind Chimes
      this.scheduleChimes();

      this.isPlaying = true;
      this.notify();
    } catch {
      this.isPlaying = false;
      this.notify();
    }
  }

  /**
   * Synthesizes gentle bamboo flute (Bansuri) phrases in Rajasthani Raga Bhupali
   * Uses sine waves with vibrato LFO and breath noise modulation for realistic woodwind timbre.
   */
  private scheduleFluteMelody() {
    if (!this.ctx || !this.masterGain) return;

    // Raga Bhupali scale notes: D4, E4, F#4, A4, B4, D5
    const ragaNotes = [293.66, 329.63, 369.99, 440.0, 493.88, 587.33];
    // Gentle melodic contours
    const phrases = [
      [293.66, 329.63, 369.99, 440.0, 369.99],
      [440.0, 493.88, 587.33, 493.88, 440.0, 369.99],
      [369.99, 440.0, 329.63, 293.66],
      [293.66, 440.0, 369.99, 329.63, 293.66],
    ];

    let phraseIdx = 0;

    const playNextPhrase = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      const phrase = phrases[phraseIdx % phrases.length];
      phraseIdx++;

      let startTime = this.ctx.currentTime + 0.5;

      phrase.forEach((targetFreq) => {
        if (!this.ctx || !this.masterGain) return;
        const noteDuration = 1.6 + Math.random() * 0.8;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        // Subtle vibrato LFO (5 Hz)
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.setValueAtTime(5.2, startTime);
        lfoGain.gain.setValueAtTime(3.5, startTime); // 3.5Hz pitch bend
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start(startTime);
        lfo.stop(startTime + noteDuration);

        osc.type = 'sine';
        // Gentle meend (pitch glide)
        osc.frequency.setValueAtTime(targetFreq * 0.98, startTime);
        osc.frequency.exponentialRampToValueAtTime(targetFreq, startTime + 0.15);

        // Warm woodwind filter
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(950, startTime);

        // Flute note envelope: gentle attack, sustained breath, soft decay
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.022, startTime + 0.3);
        gain.gain.setValueAtTime(0.018, startTime + noteDuration - 0.4);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + noteDuration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(startTime);
        osc.stop(startTime + noteDuration);

        startTime += noteDuration * 0.85; // smooth legato overlap
      });

      // Pause between phrases (6 - 10 seconds of calm tanpura)
      const nextDelay = 8000 + Math.random() * 6000;
      this.fluteTimer = window.setTimeout(playNextPhrase, nextDelay);
    };

    this.fluteTimer = window.setTimeout(playNextPhrase, 2500);
  }

  private scheduleChimes() {
    if (!this.ctx || !this.masterGain) return;
    const playSingleChime = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      try {
        const chimeFreqs = [587.33, 880.0, 1174.66, 1760.0]; // D5, A5, D6, A6
        const freq = chimeFreqs[Math.floor(Math.random() * chimeFreqs.length)];
        const chimeOsc = this.ctx.createOscillator();
        const chimeGain = this.ctx.createGain();
        const now = this.ctx.currentTime;

        chimeOsc.type = 'sine';
        chimeOsc.frequency.setValueAtTime(freq, now);

        chimeGain.gain.setValueAtTime(0, now);
        chimeGain.gain.linearRampToValueAtTime(0.012, now + 0.1);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

        chimeOsc.connect(chimeGain);
        chimeGain.connect(this.masterGain);

        chimeOsc.start(now);
        chimeOsc.stop(now + 4.0);
      } catch {
        // ignore chime error
      }

      const nextInterval = 7000 + Math.random() * 8000;
      this.chimeTimer = window.setTimeout(playSingleChime, nextInterval);
    };

    this.chimeTimer = window.setTimeout(playSingleChime, 4000);
  }

  /**
   * Crisp dual-tone temple bell chime for transitions and button interactions
   */
  public playTransitionChime() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      const freqs = [1174.66, 1760.0];

      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.03 / (idx + 1), now + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 2.0);
      });
    } catch {
      // Audio not permitted
    }
  }

  public stop(notify = true) {
    if (this.chimeTimer) {
      window.clearTimeout(this.chimeTimer);
      this.chimeTimer = null;
    }
    if (this.fluteTimer) {
      window.clearTimeout(this.fluteTimer);
      this.fluteTimer = null;
    }

    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(0, now + 1.0);
    }

    setTimeout(() => {
      this.droneOscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // already stopped
        }
      });
      this.droneOscillators = [];
    }, 1100);

    this.isPlaying = false;
    if (notify) {
      this.notify();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const royalSoundscape = new RoyalSoundscape();
