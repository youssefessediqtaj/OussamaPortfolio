import React, { useRef, useEffect } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { BackgroundWord } from '../common/BackgroundWord';
import { useCursor } from '../../context/CursorContext';
import { Play } from 'lucide-react';
import { gsap } from '../../utils/gsap';
import { useLanguage } from '../../context/LanguageContext';

interface ShowreelSectionProps {
  onPlayShowreel: () => void;
}

export const ShowreelSection: React.FC<ShowreelSectionProps> = ({ onPlayShowreel }) => {
  const containerRef = useRef<HTMLElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor } = useCursor();
  const { t } = useLanguage();

  useEffect(() => {
    const el = videoWrapperRef.current;
    if (!el) return;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    gsap.fromTo(
      el,
      { scale: 0.94, opacity: 0.8 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'bottom 40%',
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      id="showreel"
      className="relative py-24 sm:py-32 px-6 sm:px-8 lg:px-12 bg-[#111111] overflow-hidden"
    >
      <BackgroundWord
        word="SHOWREEL"
        speed={30}
        className="top-1/4 text-[20vw] font-black opacity-15"
        align="right"
      />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number={t.showreel.sectionNum}
          category={t.showreel.category}
          title={
            <>
              {t.showreel.title}
              <br />
              <span className="text-[#B93434]">{t.showreel.year}</span>
            </>
          }
          subtitle={t.showreel.subtitle}
          annotation="CINEMA REEL / 4K MASTER"
        />

        {/* Massive 85-90% Cinema Frame */}
        <div
          ref={videoWrapperRef}
          onClick={onPlayShowreel}
          onMouseEnter={() => setCursor('play', 'PLAY')}
          onMouseLeave={resetCursor}
          className="relative w-full aspect-video sm:aspect-[2.39/1] bg-[#0A0A0A] border border-white/15 overflow-hidden group cursor-pointer shadow-2xl transition-all duration-500 hover:border-[#B93434]/80"
        >
          {/* Poster Image / Video Background */}
          <img
            src="/images/press-conference.jpg"
            alt="Oussama Mazroui Showreel Poster"
            className="w-full h-full object-cover object-[center_35%] transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-105 brightness-95 group-hover:brightness-100"
          />

          {/* Letterbox Bars (Cinematic 2.39:1 framing guides) */}
          <div className="absolute top-0 left-0 right-0 h-4 sm:h-8 bg-black/60 border-b border-white/5 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-4 sm:h-8 bg-black/60 border-t border-white/5 pointer-events-none" />

          {/* Film Viewfinder HUD Overlays */}
          <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between pointer-events-none z-10">
            {/* Top HUD */}
            <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs text-[#8C8C8C] tracking-widest uppercase">
              <div className="flex items-center space-x-2 bg-black/60 px-3 py-1 border border-white/10 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-[#B93434] animate-pulse" />
                <span className="text-[#F1F1F1]">REC 00:02:48:16</span>
              </div>
              <div className="bg-black/60 px-3 py-1 border border-white/10 backdrop-blur-sm hidden sm:block">
                <span>{t.showreel.specs}</span>
              </div>
            </div>

            {/* Center Play Button Graphic */}
            <div className="mx-auto my-auto flex flex-col items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#B93434] bg-[#B93434]/20 backdrop-blur-sm flex items-center justify-center text-[#F1F1F1] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#B93434] shadow-[0_0_40px_rgba(185,52,52,0.4)]">
                <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current translate-x-0.5" />
              </div>
              <span className="mt-3 font-display tracking-widest text-xs text-[#F1F1F1] uppercase opacity-90 group-hover:opacity-100">
                {t.showreel.playButton}
              </span>
            </div>

            {/* Bottom HUD */}
            <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs text-[#8C8C8C] tracking-widest uppercase">
              <div className="bg-black/60 px-3 py-1 border border-white/10 backdrop-blur-sm">
                <span className="text-[#F1F1F1]">{t.showreel.runningTime}</span>
              </div>
              <div className="bg-black/60 px-3 py-1 border border-white/10 backdrop-blur-sm hidden md:block">
                <span>{t.showreel.specs}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
