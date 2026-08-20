import React, { useRef, useEffect } from 'react';
import { HeroVideo } from './HeroVideo';
import { BackgroundWord } from '../common/BackgroundWord';
import { MagneticButton } from '../common/MagneticButton';
import { gsap } from '../../utils/gsap';
import { ArrowDownRight, Film } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';
import { useLanguage } from '../../context/LanguageContext';

interface HeroProps {
  onOpenContact: () => void;
  onExploreWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact, onExploreWork }) => {
  const containerRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor } = useCursor();
  const { t } = useLanguage();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        el.querySelectorAll('.hero-fade-in'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 1, ease: 'power3.out' }
      );

      tl.fromTo(
        el.querySelectorAll('.hero-char-title'),
        { opacity: 0, y: 80, skewY: 4 },
        { opacity: 1, y: 0, skewY: 0, duration: 1.2, ease: 'power4.out' },
        '-=0.8'
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-28 sm:pt-32 pb-12 sm:pb-16 px-6 sm:px-8 lg:px-12 overflow-hidden bg-[#111111]"
    >
      {/* Ambient Video Background */}
      <HeroVideo src="/videos/showreel.mp4" poster="/images/showreel-poster.svg" />

      {/* Outlined Background Typography Layers */}
      <BackgroundWord
        word="CREATIVE"
        speed={-35}
        className="top-16 text-[18vw] font-black opacity-20"
        align="left"
      />
      <BackgroundWord
        word="PRODUCER"
        speed={45}
        className="top-1/3 text-[22vw] font-black opacity-25"
        align="right"
        redVariant
      />
      <BackgroundWord
        word="STORYTELLER"
        speed={-25}
        className="bottom-10 text-[19vw] font-black opacity-20"
        align="center"
      />

      {/* Top Editorial Film Production Note */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] sm:text-xs text-[#8C8C8C] tracking-widest uppercase border-b border-white/[0.08] pb-4 hero-fade-in">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1.5 text-[#B93434]">
            <span className="w-2 h-2 rounded-full bg-[#B93434] animate-pulse" />
            <span className="font-semibold">REC [24 FPS]</span>
          </span>
          <span className="text-white/20">/</span>
          <span>SEQUENCE 01</span>
          <span className="text-white/20">/</span>
          <span className="hidden sm:inline">FRAME 001</span>
        </div>

        <div className="flex items-center space-x-3 text-[#8C8C8C]/80">
          <span>CASABLANCA, MOROCCO</span>
          <span className="text-white/20">/</span>
          <span className="text-[#F1F1F1]">PORTFOLIO 2026</span>
        </div>
      </div>

      {/* Main Editorial Hero Grid */}
      <div ref={textContainerRef} className="relative z-10 my-auto py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        {/* Left Column: Huge Condensed Name */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="hero-fade-in font-mono text-xs sm:text-sm text-[#B93434] tracking-[0.3em] uppercase mb-2 flex items-center space-x-2">
            <span>●</span>
            <span>{t.hero.role}</span>
          </div>

          <h1 className="hero-char-title font-display text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] font-black text-[#F1F1F1] tracking-tight leading-[0.88] uppercase">
            {t.hero.titleMain}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F1F1F1] via-[#F1F1F1] to-[#8C8C8C]">
              {t.hero.titleSub}.
            </span>
          </h1>

          <div className="hero-fade-in mt-6 flex flex-wrap gap-2 font-mono text-[10px] sm:text-xs text-[#8C8C8C]/70">
            <span className="px-2.5 py-1 border border-white/10 bg-white/[0.02]">{t.hero.tagline1}</span>
            <span className="px-2.5 py-1 border border-white/10 bg-white/[0.02]">{t.hero.tagline2}</span>
            <span className="px-2.5 py-1 border border-white/10 bg-white/[0.02]">{t.hero.tagline3}</span>
          </div>
        </div>

        {/* Right Column: Statement, Manifesto & CTAs */}
        <div className="lg:col-span-4 flex flex-col justify-end space-y-6 hero-fade-in">
          <p className="font-sans text-sm sm:text-base text-[#8C8C8C] leading-relaxed font-light border-l-2 border-[#B93434] pl-4">
            {t.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <MagneticButton
              variant="primary"
              onClick={onExploreWork}
              cursorLabel="EXPLORE"
              className="w-full sm:w-auto"
            >
              <span>{t.hero.exploreCta}</span>
              <ArrowDownRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
            </MagneticButton>

            <MagneticButton
              variant="outline"
              onClick={onOpenContact}
              cursorLabel="CONTACT"
              className="w-full sm:w-auto"
            >
              <span>{t.hero.contactCta}</span>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Bottom Hero Ribbon */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/[0.08] font-mono text-[10px] sm:text-xs text-[#8C8C8C] hero-fade-in">
        <div className="flex items-center space-x-3">
          <Film className="w-3.5 h-3.5 text-[#B93434]" />
          <span className="tracking-widest uppercase">
            {t.hero.role} / 2023—2026
          </span>
        </div>

        <button
          onClick={onExploreWork}
          onMouseEnter={() => setCursor('pointer', 'SCROLL')}
          onMouseLeave={resetCursor}
          className="flex items-center space-x-2 text-[#8C8C8C] hover:text-[#F1F1F1] transition-colors group text-left"
        >
          <span className="tracking-widest uppercase">{t.hero.scrollPrompt}</span>
          <span className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center text-[9px] group-hover:border-[#B93434] group-hover:text-[#B93434] transition-colors">
            ↓
          </span>
        </button>
      </div>
    </section>
  );
};
