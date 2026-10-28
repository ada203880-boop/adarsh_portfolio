import { useState, useCallback, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+<>~{}[]=';

export function useScrambleText(finalText: string) {
  const [displayText, setDisplayText] = useState(finalText);
  const isScrambling = useRef(false);

  const trigger = useCallback(() => {
    if (isScrambling.current) return;
    isScrambling.current = true;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        finalText
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '\n') return char;
            if (index < iteration) return finalText[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      if (iteration >= finalText.length) {
        clearInterval(interval);
        setDisplayText(finalText);
        isScrambling.current = false;
      }

      iteration += 1 / 2;
    }, 28);
  }, [finalText]);

  return { displayText, trigger };
}
