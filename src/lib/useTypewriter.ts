import { useEffect, useState } from 'react';

export function useTypewriter(
  words: string[],
  speed = 75,
  pause = 2200,
): string {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');

  useEffect(() => {
    if (!words || words.length === 0) return;
    const word = words[wordIdx % words.length];

    if (phase === 'typing') {
      if (display.length < word.length) {
        const t = setTimeout(
          () => setDisplay(word.slice(0, display.length + 1)),
          speed,
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase('deleting'), pause);
      return () => clearTimeout(t);
    }

    if (phase === 'deleting') {
      if (display.length > 0) {
        const t = setTimeout(
          () => setDisplay(display.slice(0, -1)),
          speed / 2,
        );
        return () => clearTimeout(t);
      }
      setWordIdx((i) => (i + 1) % words.length);
      setPhase('typing');
    }
  }, [display, phase, wordIdx, words, speed, pause]);

  return display;
}

