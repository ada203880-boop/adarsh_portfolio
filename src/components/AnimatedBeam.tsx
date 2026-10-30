import { useRef, useEffect } from 'react';

interface BeamPath {
  fromId: string;
  toId: string;
  color?: string;
  duration?: number;
  delay?: number;
}

interface AnimatedBeamProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  paths: BeamPath[];
}

export function AnimatedBeam({ containerRef, paths }: AnimatedBeamProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    if (!container || !svg) return;

    const updatePaths = () => {
      const containerRect = container.getBoundingClientRect();
      const svgPaths = svg.querySelectorAll<SVGPathElement>('[data-beam]');

      svgPaths.forEach((path) => {
        const fromId = path.getAttribute('data-from');
        const toId = path.getAttribute('data-to');
        if (!fromId || !toId) return;

        const fromEl = container.querySelector(`[data-node="${fromId}"]`);
        const toEl = container.querySelector(`[data-node="${toId}"]`);
        if (!fromEl || !toEl) return;

        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();

        const x1 = fromRect.left + fromRect.width / 2 - containerRect.left;
        const y1 = fromRect.top + fromRect.height / 2 - containerRect.top;
        const x2 = toRect.left + toRect.width / 2 - containerRect.left;
        const y2 = toRect.top + toRect.height / 2 - containerRect.top;

        const cx = (x1 + x2) / 2;
        const cy = Math.min(y1, y2) - 40;

        path.setAttribute('d', `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`);
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
      });
    };

    updatePaths();
    const ro = new ResizeObserver(updatePaths);
    ro.observe(container);
    return () => ro.disconnect();
  }, [containerRef, paths]);

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none absolute inset-0 w-full h-full overflow-visible z-0"
      aria-hidden="true"
    >
      <defs>
        {paths.map((p, i) => (
          <linearGradient key={i} id={`beam-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor={p.color ?? '#06b6d4'} stopOpacity="0.9" />
            <stop offset="100%" stopColor={p.color ?? '#a855f7'} />
          </linearGradient>
        ))}
      </defs>

      {paths.map((p, i) => (
        <g key={i}>
          {/* Static dim track */}
          <path
            data-beam="track"
            data-from={p.fromId}
            data-to={p.toId}
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1.5"
          />
          {/* Animated beam */}
          <path
            data-beam="laser"
            data-from={p.fromId}
            data-to={p.toId}
            fill="none"
            stroke={`url(#beam-grad-${i})`}
            strokeWidth="2"
            strokeLinecap="round"
            style={{
              animation: `beam-travel ${p.duration ?? 3}s ${p.delay ?? 0}s linear infinite`,
            }}
          />
        </g>
      ))}
    </svg>
  );
}

