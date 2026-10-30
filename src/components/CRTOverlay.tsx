import { useEffect, useRef } from 'react';

interface CRTOverlayProps {
  active: boolean;
}

export function CRTOverlay({ active }: CRTOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set CSS variables for CRT phosphor green theme
    if (active) {
      document.documentElement.style.setProperty('--crt-on', '1');
      document.body.classList.add('crt-mode');
    } else {
      document.documentElement.style.removeProperty('--crt-on');
      document.body.classList.remove('crt-mode');
    }
  }, [active]);

  if (!active) return null;

  return (
    <>
      {/* SVG filter for barrel distortion */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="crt-distort">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feBlend in="SourceGraphic" mode="overlay" result="blend" />
            <feComposite in="blend" in2="SourceGraphic" />
          </filter>
        </defs>
      </svg>

      {/* Scanlines overlay */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[999]"
        style={{
          background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 3px)',
          mixBlendMode: 'multiply',
        }}
      />

      {/* Corner vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[998]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* CRT flicker */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[997] animate-crt-flicker"
        style={{ background: 'rgba(0,255,65,0.015)', mixBlendMode: 'screen' }}
      />

      {/* Mode badge */}
      <div
        className="fixed bottom-24 right-6 z-[1000] rounded-md border border-[#00ff41]/30 bg-[#00ff41]/10 px-3 py-1.5 font-mono text-[9px] tracking-[0.25em] text-[#00ff41] uppercase select-none pointer-events-none"
      >
        ▶ CRT MODE ACTIVE
      </div>
    </>
  );
}

