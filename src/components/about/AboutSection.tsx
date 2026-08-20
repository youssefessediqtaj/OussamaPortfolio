import React, { useRef, useEffect } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { BackgroundWord } from '../common/BackgroundWord';
import { gsap } from '../../utils/gsap';
import { Film, Target, TrendingUp, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const AboutSection: React.FC = () => {
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const el = imageWrapperRef.current;
    if (!el) return;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    gsap.fromTo(
      el,
      { y: 40, opacity: 0.8 },
      {
        y: -30,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      }
    );
  }, []);

  const corePillars = [
    {
      icon: Film,
      title: t.about.pillar1Title,
      desc: t.about.pillar1Desc,
    },
    {
      icon: Target,
      title: t.about.pillar2Title,
      desc: t.about.pillar2Desc,
    },
    {
      icon: TrendingUp,
      title: t.about.pillar3Title,
      desc: t.about.pillar3Desc,
    },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-[#111111] overflow-hidden">
      <BackgroundWord
        word="STRATEGY"
        speed={-35}
        className="top-1/4 text-[22vw] font-black opacity-15"
        align="right"
      />
      <BackgroundWord
        word="STORY"
        speed={40}
        className="bottom-12 text-[24vw] font-black opacity-15"
        align="left"
        redVariant
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeader
          number={t.about.sectionNum}
          category={t.about.category}
          title={
            <>
              CREATIVE
              <br />
              MEETS
              <br />
              <span className="text-[#B93434]">STRATEGY.</span>
            </>
          }
          subtitle={t.about.bio1}
          annotation="POSITIONING &amp; VISION / 2026"
        />

        {/* Editorial Layout: Visual Block + Text Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-12">
          {/* Left: Editorial Portrait / Visual Still Block */}
          <div className="lg:col-span-5 relative">
            <div
              ref={imageWrapperRef}
              className="relative aspect-[3/4] max-w-md mx-auto lg:max-w-none bg-[#161616] border border-white/15 overflow-hidden shadow-2xl"
            >
              <img
                src="/images/portrait.jpg"
                alt="Oussama Mazroui Portrait & Production Still"
                className="w-full h-full object-cover object-center filter contrast-105 brightness-95"
              />

              {/* Editorial Frame Overlays */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                <div className="flex items-center justify-between font-mono text-[9px] text-[#F1F1F1] tracking-widest uppercase">
                  <span className="bg-black/80 px-2.5 py-1 border border-white/10">
                    OUSSAMA MAZROUI
                  </span>
                  <span className="text-[#B93434]">● CASABLANCA</span>
                </div>

                <div className="bg-black/80 p-3 border border-white/10 backdrop-blur-sm">
                  <div className="font-mono text-[10px] text-[#8C8C8C] uppercase tracking-widest">
                    PRACTICE
                  </div>
                  <div className="font-display text-lg text-[#F1F1F1] uppercase tracking-wider">
                    PRODUCER &amp; STRATEGIST
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Stamp */}
            <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-[#8C8C8C]/60 tracking-widest uppercase">
              <span>CAMERA: 24 FPS / 5000K</span>
              <span>EST. 2022</span>
            </div>
          </div>

          {/* Right: Core Positioning & Philosophy */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            <div className="space-y-6 font-sans text-base sm:text-lg text-[#8C8C8C] font-light leading-relaxed">
              <p className="text-xl sm:text-2xl text-[#F1F1F1] font-normal leading-snug">
                {t.about.bio1}
              </p>

              <p>
                {t.about.bio2}
              </p>
            </div>

            {/* Core Competencies Matrix */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {corePillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="p-5 bg-[#141414] border border-white/10 hover:border-[#B93434]/60 transition-colors group"
                  >
                    <Icon className="w-5 h-5 text-[#B93434] mb-3 transition-transform group-hover:scale-110" />
                    <h4 className="font-display text-base font-bold text-[#F1F1F1] uppercase tracking-wider mb-1.5">
                      {pillar.title}
                    </h4>
                    <p className="font-sans text-xs text-[#8C8C8C] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Signature Quote Banner */}
            <div className="p-6 bg-gradient-to-r from-[#181818] to-[#121212] border-l-2 border-[#B93434] border-t border-r border-b border-white/10">
              <div className="flex items-center space-x-2 text-[#B93434] font-mono text-xs tracking-widest uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>DIRECTOR'S STATEMENT</span>
              </div>
              <p className="font-display text-xl sm:text-2xl text-[#F1F1F1] uppercase tracking-wide">
                {t.about.quote}
              </p>
            </div>
          </div>
        </div>

        {/* On-Set Production Stills Strip */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <div className="flex items-center justify-between font-mono text-xs text-[#8C8C8C] mb-6 tracking-widest uppercase">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#B93434]" />
              <span>ON-SET ARCHIVE / FIELD STILLS</span>
            </div>
            <span className="hidden sm:inline text-[10px] text-[#8C8C8C]/60">PRODUCTION &amp; DIRECTION IN ACTION</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative aspect-[3/4] bg-[#161616] border border-white/10 overflow-hidden group">
              <img
                src="/images/on-set-directing.jpg"
                alt="Oussama Mazroui Directing on Set"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter contrast-105 brightness-90 group-hover:brightness-100"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black/80 px-2 py-1 border border-white/10 font-mono text-[8px] text-[#F1F1F1] tracking-widest uppercase truncate">
                ON-SET DIRECTION
              </div>
            </div>

            <div className="relative aspect-[3/4] bg-[#161616] border border-white/10 overflow-hidden group">
              <img
                src="/images/press-conference.jpg"
                alt="Oussama Mazroui Stage & Narrative Lighting"
                className="w-full h-full object-cover object-[center_35%] group-hover:scale-105 transition-transform duration-500 filter contrast-105 brightness-90 group-hover:brightness-100"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black/80 px-2 py-1 border border-white/10 font-mono text-[8px] text-[#F1F1F1] tracking-widest uppercase truncate">
                STAGE &amp; NARRATIVE
              </div>
            </div>

            <div className="relative aspect-[3/4] bg-[#161616] border border-white/10 overflow-hidden group">
              <img
                src="/images/studio-portrait.jpg"
                alt="Oussama Mazroui Cinematic Lighting"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 filter contrast-105 brightness-90 group-hover:brightness-100"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black/80 px-2 py-1 border border-white/10 font-mono text-[8px] text-[#F1F1F1] tracking-widest uppercase truncate">
                LIGHTING DESIGN
              </div>
            </div>

            <div className="relative aspect-[3/4] bg-[#161616] border border-white/10 overflow-hidden group">
              <img
                src="/images/camera-slider.jpg"
                alt="Oussama Mazroui Camera Rig & Cinematography"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter contrast-105 brightness-90 group-hover:brightness-100"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black/80 px-2 py-1 border border-white/10 font-mono text-[8px] text-[#F1F1F1] tracking-widest uppercase truncate">
                CAMERA RIG SETUP
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
