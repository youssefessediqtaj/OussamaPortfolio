import React, { useEffect, useState } from 'react';

export const FilmRuler: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / totalScroll));
        setScrollProgress(progress);
        setCurrentFrame(Math.floor(progress * 1440) + 1);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <aside
      className="hidden lg:flex fixed top-0 left-0 bottom-0 w-[14vw] max-w-[170px] min-w-[130px] z-30 pointer-events-none select-none flex-col justify-between py-8 px-5 border-r border-white/[0.07] bg-[#111111]/40 backdrop-blur-[2px]"
      aria-hidden="true"
    >
      {/* Top Metadata Block */}
      <div className="flex flex-col space-y-3 font-mono text-[10px] tracking-widest text-[#8C8C8C]/70">
        <div className="flex items-center space-x-1.5 text-[#B93434]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B93434] animate-pulse" />
          <span className="font-semibold text-[9px]">LIVE REEL</span>
        </div>
        <div className="text-[10px] text-[#F1F1F1]/80 font-medium">
          FRAME {String(currentFrame).padStart(4, '0')}
        </div>
        <div className="text-[9px] text-[#8C8C8C]/50">
          SEQ / 2026.OM
        </div>
      </div>

      {/* Center Film Ruler Tick Marks */}
      <div className="my-auto flex flex-col items-start space-y-2 py-4">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-2">
            <div
              className={`h-[1px] transition-all duration-300 ${
                i % 4 === 0 
                  ? 'w-4 bg-[#B93434]/80' 
                  : i % 2 === 0 
                  ? 'w-2.5 bg-white/20' 
                  : 'w-1.5 bg-white/10'
              }`}
            />
            {i % 6 === 0 && (
              <span className="font-mono text-[8px] text-[#8C8C8C]/40">
                0{i / 3 + 1}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Technical Section & Scroll Percentage */}
      <div className="flex flex-col space-y-2 font-mono text-[9px] tracking-widest text-[#8C8C8C]/60">
        <div className="flex items-center justify-between">
          <span>SCRL</span>
          <span className="text-[#F1F1F1] font-medium">{Math.floor(scrollProgress * 100)}%</span>
        </div>
        <div className="w-full h-[2px] bg-white/10 overflow-hidden">
          <div
            className="h-full bg-[#B93434] transition-all duration-75"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
        <div className="text-[8px] text-[#8C8C8C]/40 uppercase pt-1">
          MOROCCO / 24FPS
        </div>
      </div>
    </aside>
  );
};
