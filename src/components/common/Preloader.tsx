import React, { useEffect, useState, useRef } from 'react';
import { gsap } from '../../utils/gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [titleText, setTitleText] = useState('OM');
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) {
      onComplete();
      return;
    }

    const duration = 1.6; // Under 2 seconds
    const counterObj = { val: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          duration: 0.65,
          ease: 'power3.inOut',
          onComplete: () => {
            onComplete();
          }
        });
      }
    });

    // Animate progress number
    tl.to(counterObj, {
      val: 100,
      duration: duration,
      ease: 'power2.inOut',
      onUpdate: () => {
        const current = Math.floor(counterObj.val);
        setProgress(current);

        // Morph title
        if (current > 70) {
          setTitleText('OUSSAMA MAZROUI');
        } else if (current > 35) {
          setTitleText('OM / 26');
        } else {
          setTitleText('OM');
        }
      }
    }, 0);

    // Animate subtle red indicator line
    tl.to(lineRef.current, {
      width: '100%',
      duration: duration,
      ease: 'power2.inOut'
    }, 0);

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-[#0A0A0A] flex flex-col items-center justify-center p-6 select-none"
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
    >
      {/* Top film roll annotation */}
      <div className="absolute top-8 left-8 right-8 flex justify-between items-center text-[11px] font-mono tracking-widest text-[#8C8C8C]/60">
        <span>INITIALIZING SEQUENCE</span>
        <span className="text-[#B93434]">● 24 FPS / CINEMA REEL</span>
        <span>CASABLANCA / 2026</span>
      </div>

      <div className="flex flex-col items-center justify-center space-y-6">
        {/* Monogram / Name Morph */}
        <h1
          ref={textRef}
          className="font-display text-5xl md:text-7xl font-black text-[#F1F1F1] tracking-widest text-center transition-all duration-200"
        >
          {titleText}
        </h1>

        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#8C8C8C]">
          CREATIVE PRODUCER &amp; DIGITAL STRATEGIST
        </p>

        {/* Progress bar line */}
        <div className="w-48 sm:w-64 h-[2px] bg-white/10 relative overflow-hidden mt-4">
          <div
            ref={lineRef}
            className="h-full bg-[#B93434] transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Counter Number */}
        <div className="font-mono text-sm tracking-widest text-[#F1F1F1]/80">
          LOADING <span className="text-[#B93434]">{String(progress).padStart(3, '0')}%</span>
        </div>
      </div>

      {/* Bottom skip prompt */}
      <button
        onClick={onComplete}
        className="absolute bottom-8 right-8 font-mono text-[10px] tracking-widest text-[#8C8C8C] hover:text-[#F1F1F1] uppercase transition-colors"
      >
        [ SKIP INTRO → ]
      </button>
    </div>
  );
};
