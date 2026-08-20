import React, { useRef, useEffect } from 'react';
import { BackgroundWord } from '../common/BackgroundWord';
import { gsap } from '../../utils/gsap';
import { useLanguage } from '../../context/LanguageContext';

export const StrategicManifesto: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const el = containerRef.current;
    const words = wordsRef.current;
    if (!el || !words) return;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words.querySelectorAll('.manifesto-line'),
        { opacity: 0.15, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.25,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            end: 'bottom 40%',
            scrub: 0.8,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-32 sm:py-44 bg-[#0A0A0A] border-y border-white/10 px-6 sm:px-8 lg:px-12 overflow-hidden"
    >
      <BackgroundWord
        word="IMPACT"
        speed={-40}
        className="top-1/4 text-[26vw] font-black opacity-10"
        align="center"
      />
      <BackgroundWord
        word="RESULTS"
        speed={50}
        className="bottom-10 text-[24vw] font-black opacity-10"
        align="center"
        redVariant
      />

      <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Top Tag */}
        <div className="font-mono text-xs text-[#B93434] tracking-[0.4em] uppercase mb-8 flex items-center space-x-2">
          <span>●</span>
          <span>THE PHILOSOPHY / THE DIFFERENCE</span>
          <span>●</span>
        </div>

        {/* Massive Kinetic Typography */}
        <div ref={wordsRef} className="space-y-6 sm:space-y-10">
          <h2 className="manifesto-line font-display text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-[#8C8C8C] tracking-tight leading-[0.88] uppercase">
            {language === 'fr' ? (
              <>
                JE NE FAIS PAS
                <br />
                <span className="text-[#F1F1F1]">JUSTE DES VIDÉOS.</span>
              </>
            ) : (
              <>
                I DON'T JUST
                <br />
                <span className="text-[#F1F1F1]">MAKE VIDEOS.</span>
              </>
            )}
          </h2>

          <div className="manifesto-line font-display text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-[#B93434] tracking-tight leading-[0.88] uppercase">
            {language === 'fr' ? (
              <>
                JE CRÉE DU CONTENU
                <br />
                <span className="text-[#F1F1F1]">AVEC UNE MISSION.</span>
              </>
            ) : (
              <>
                I BUILD CONTENT
                <br />
                <span className="text-[#F1F1F1]">THAT HAS A JOB.</span>
              </>
            )}
          </div>

          {/* Triad: Attention. Positioning. Conversion. */}
          <div className="manifesto-line pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-12 font-mono text-sm sm:text-xl text-[#F1F1F1] tracking-widest uppercase">
            <span className="px-4 py-2 border border-white/20 bg-[#161616]">
              {language === 'fr' ? '01 / ATTENTION.' : '01 / ATTENTION.'}
            </span>
            <span className="px-4 py-2 border border-[#B93434] bg-[#B93434]/15 text-[#B93434]">
              {language === 'fr' ? '02 / POSITIONNEMENT.' : '02 / POSITIONING.'}
            </span>
            <span className="px-4 py-2 border border-white/20 bg-[#161616]">
              {language === 'fr' ? '03 / CONVERSION.' : '03 / CONVERSION.'}
            </span>
          </div>
        </div>

        <p className="font-sans text-xs sm:text-sm text-[#8C8C8C]/70 max-w-xl mt-12 leading-relaxed">
          {language === 'fr'
            ? 'La différence entre un simple exécutant et un producteur créatif réside dans l’intention stratégique. Chaque cadre, chaque transition et chaque campagne sert un objectif commercial précis.'
            : 'The difference between an artist and a creative producer is purpose. Every frame, transition, and campaign is engineered to serve a commercial objective.'}
        </p>
      </div>
    </section>
  );
};
