import React, { useRef, useEffect } from 'react';
import { gsap } from '../../utils/gsap';

interface SectionHeaderProps {
  number: string;
  category: string;
  title: string | React.ReactNode;
  subtitle?: string;
  annotation?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  category,
  title,
  subtitle,
  annotation,
  align = 'left',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.animate-header-item'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.9,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  const alignClass =
    align === 'center'
      ? 'text-center items-center'
      : align === 'right'
      ? 'text-right items-end'
      : 'text-left items-start';

  return (
    <div ref={containerRef} className={`flex flex-col ${alignClass} mb-12 sm:mb-16 relative z-10 ${className}`}>
      {/* Top Number & Category Marker */}
      <div className="flex items-center space-x-3 mb-3 animate-header-item">
        <span className="font-mono text-xs sm:text-sm font-semibold text-[#B93434] tracking-widest">
          {number}
        </span>
        <span className="w-6 h-[1px] bg-white/20" />
        <span className="font-mono text-[11px] sm:text-xs text-[#8C8C8C] tracking-[0.25em] uppercase">
          {category}
        </span>
      </div>

      {/* Main Massive Editorial Title */}
      <h2 className="animate-header-item font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#F1F1F1] tracking-tight leading-[0.9] uppercase">
        {title}
      </h2>

      {/* Editorial Subtitle / Annotation */}
      {subtitle && (
        <p className="animate-header-item font-sans text-[#8C8C8C] text-sm sm:text-base md:text-lg max-w-2xl mt-4 font-light leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Subtle Film Annotation */}
      {annotation && (
        <div className="animate-header-item mt-3 font-mono text-[10px] tracking-widest text-[#8C8C8C]/50 uppercase">
          [ {annotation} ]
        </div>
      )}

      {/* Dividing Accent Line */}
      <div
        ref={lineRef}
        className="w-20 h-[2px] bg-[#B93434] mt-6 origin-left"
      />
    </div>
  );
};
