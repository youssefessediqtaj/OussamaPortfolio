import React, { useEffect, useRef } from 'react';
import { useCursor } from '../../context/CursorContext';
import { gsap } from '../../utils/gsap';

export const CustomCursor: React.FC = () => {
  const { cursorType, cursorText } = useCursor();
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Only enable on desktop devices with fine pointer
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    document.body.classList.add('custom-cursor-active');

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        gsap.to([cursor, dot], { opacity: 1, duration: 0.2 });
      }

      // Fast dot follows immediately
      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.08,
        ease: 'power2.out',
      });
    };

    const onMouseLeave = () => {
      isVisible = false;
      gsap.to([cursor, dot], { opacity: 0, duration: 0.3 });
    };

    const onMouseEnter = () => {
      isVisible = true;
      gsap.to([cursor, dot], { opacity: 1, duration: 0.3 });
    };

    // Smooth inertia lerp for the outer ring / label
    const ticker = () => {
      const dt = 1.0 - Math.pow(1.0 - 0.18, gsap.ticker.deltaRatio());
      cursorX += (mouseX - cursorX) * dt;
      cursorY += (mouseY - cursorY) * dt;

      gsap.set(cursor, {
        x: cursorX,
        y: cursorY,
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    gsap.ticker.add(ticker);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      gsap.ticker.remove(ticker);
    };
  }, []);

  const isExpanded = ['view', 'play', 'open', 'drag', 'close'].includes(cursorType);
  const isPointer = cursorType === 'pointer';
  const isHidden = cursorType === 'hidden';

  return (
    <>
      {/* Small precise center dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full pointer-events-none z-[10000] transition-opacity duration-300 ${
          isExpanded || isHidden ? 'opacity-0' : 'bg-[#F1F1F1] opacity-90'
        }`}
        style={{ opacity: 0 }}
      />

      {/* Main interactive expanding cursor bubble */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-[9999] flex items-center justify-center transition-all duration-300 ${
          isHidden
            ? 'opacity-0 scale-0'
            : isExpanded
            ? 'w-24 h-24 bg-[#B93434] text-[#F1F1F1] shadow-[0_0_30px_rgba(185,52,52,0.4)] scale-100'
            : isPointer
            ? 'w-10 h-10 border border-[#B93434] bg-rgba(185,52,52,0.1) scale-100'
            : 'w-8 h-8 border border-white/20 scale-100'
        }`}
        style={{ opacity: 0 }}
      >
        {isExpanded && (
          <span
            ref={textRef}
            className="font-display font-black text-xs tracking-widest text-[#F1F1F1] select-none uppercase drop-shadow-md"
          >
            {cursorText || cursorType}
          </span>
        )}
      </div>
    </>
  );
};
