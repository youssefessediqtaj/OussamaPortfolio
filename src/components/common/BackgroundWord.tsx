import React, { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '../../utils/gsap';

interface BackgroundWordProps {
  word: string;
  className?: string;
  speed?: number; // Parallax speed factor
  redVariant?: boolean;
  align?: 'left' | 'center' | 'right';
}

export const BackgroundWord: React.FC<BackgroundWordProps> = ({
  word,
  className = '',
  speed = 40,
  redVariant = false,
  align = 'center',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.2,
      onUpdate: (self) => {
        const yOffset = (self.progress - 0.5) * speed * 2;
        gsap.set(el, { y: yOffset });
      },
    });

    return () => {
      st.kill();
    };
  }, [speed]);

  const alignmentClass =
    align === 'left'
      ? 'left-0 text-left -translate-x-12'
      : align === 'right'
      ? 'right-0 text-right translate-x-12'
      : 'left-1/2 -translate-x-1/2 text-center';

  return (
    <div
      ref={containerRef}
      className={`absolute pointer-events-none select-none z-0 overflow-hidden leading-none uppercase font-display font-black tracking-tighter opacity-70 ${alignmentClass} ${className}`}
      aria-hidden="true"
    >
      <span
        className={`inline-block ${
          redVariant ? 'text-stroke-red' : 'text-stroke-subtle'
        }`}
      >
        {word}
      </span>
    </div>
  );
};
