import { useRef, type ReactNode } from 'react';

interface ScrollStackProps {
  children: ReactNode[];
  className?: string;
  stickyOffset?: number;
}

export function ScrollStack({ children, className = '', stickyOffset = 90 }: ScrollStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className={`relative flex flex-col gap-12 sm:gap-16 ${className}`}>
      {children.map((child, idx) => {
        const topPosition = stickyOffset + idx * 24;

        return (
          <div
            key={idx}
            style={{
              top: `${topPosition}px`,
              zIndex: idx + 10,
            }}
            className="relative lg:sticky transition-all duration-300"
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}

