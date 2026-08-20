import React, { useRef, useEffect } from 'react';
import { Project } from '../../types/project';
import { gsap, ScrollTrigger } from '../../utils/gsap';
import { useCursor } from '../../context/CursorContext';
import { useLanguage } from '../../context/LanguageContext';
import { Play, ArrowUpRight } from 'lucide-react';

interface HorizontalReelProps {
  projects: Project[];
  onOpenDetails: (project: Project) => void;
  onPlayVideo: (project: Project) => void;
}

export const HorizontalReel: React.FC<HorizontalReelProps> = ({
  projects,
  onOpenDetails,
  onPlayVideo,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor } = useCursor();
  const { language, t } = useLanguage();

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile || isReduced) return;

    const section = sectionRef.current;
    const trigger = triggerRef.current;
    if (!section || !trigger) return;

    const totalWidth = section.scrollWidth - window.innerWidth + 120;

    const pin = gsap.to(section, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: trigger,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${totalWidth * 1.2}`,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      pin.kill();
      ScrollTrigger.refresh();
    };
  }, [projects]);

  return (
    <div ref={triggerRef} className="relative overflow-hidden bg-[#0A0A0A] py-16 lg:py-0 border-y border-white/10">
      {/* Top Film Strip Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 pb-4 flex items-center justify-between font-mono text-xs text-[#8C8C8C] tracking-widest uppercase">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#B93434] animate-pulse" />
          <span className="text-[#F1F1F1]">{language === 'fr' ? 'BANDE DÉFILANTE CINÉMA' : 'CINEMA FILM REEL'}</span>
          <span className="text-white/20">/</span>
          <span className="hidden sm:inline">{language === 'fr' ? 'DÉFILEMENT HORIZONTAL' : 'HORIZONTAL SCRUB'}</span>
        </div>
        <div className="hidden lg:block text-[#8C8C8C]/60">
          {language === 'fr' ? '[ DÉFILEZ VERTICALEMENT POUR PARCOURIR ]' : '[ SCROLL VERTICALLY TO TRAVERSE REEL ]'}
        </div>
      </div>

      {/* Horizontal Strip Container (Desktop) / Grid (Mobile) */}
      <div
        ref={sectionRef}
        className="flex flex-col lg:flex-row gap-8 lg:gap-12 px-6 sm:px-8 lg:px-12 lg:h-[80vh] lg:items-center py-6"
      >
        {/* Intro Reel Banner */}
        <div className="w-full lg:w-[380px] lg:flex-shrink-0 flex flex-col justify-center pr-6">
          <span className="font-mono text-xs text-[#B93434] tracking-[0.3em] uppercase mb-2">
            {language === 'fr' ? 'SÉLECTION PRINCIPALE' : 'FEATURED SELECTION'}
          </span>
          <h3 className="font-display text-4xl sm:text-6xl font-black text-[#F1F1F1] leading-none uppercase">
            {language === 'fr' ? 'ARCHIVE' : 'FILM'}
            <br />
            {language === 'fr' ? 'CINÉMA' : 'ARCHIVE'}
            <br />
            <span className="text-stroke-red">2023—26</span>
          </h3>
          <p className="font-sans text-xs text-[#8C8C8C] mt-4 leading-relaxed font-light">
            {language === 'fr'
              ? 'Parcourez les projets cadrés aux ratios cinéma, conçus pour l’impact narratif et la performance commerciale.'
              : 'Traverse projects framed in cinematic ratios, engineered for both narrative impact and commercial performance.'}
          </p>
        </div>

        {/* Project Reel Cards */}
        {projects.map((project) => (
          <div
            key={project.id}
            className="w-full lg:w-[580px] lg:flex-shrink-0 bg-[#141414] border border-white/10 p-6 flex flex-col justify-between group hover:border-[#B93434]/80 transition-all duration-300 shadow-2xl relative"
          >
            {/* Reel Frame Marker */}
            <div className="flex items-center justify-between font-mono text-[10px] text-[#8C8C8C] pb-3 border-b border-white/10 uppercase tracking-widest">
              <span className="text-[#B93434] font-semibold">REEL {project.number}</span>
              <span>{project.category}</span>
              <span>{project.year}</span>
            </div>

            {/* Media Box */}
            <div
              onClick={() => onPlayVideo(project)}
              onMouseEnter={() => setCursor('play', 'PLAY')}
              onMouseLeave={resetCursor}
              className="relative aspect-video w-full bg-[#181818] overflow-hidden my-4 cursor-pointer"
            >
              <img
                src={project.poster}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                <div className="w-12 h-12 rounded-full bg-[#B93434] flex items-center justify-center text-white shadow-lg">
                  <Play className="w-5 h-5 fill-current translate-x-0.5" />
                </div>
              </div>
            </div>

            {/* Title and details */}
            <div>
              <div className="font-mono text-[10px] text-[#8C8C8C] uppercase tracking-widest">
                {t.work.roleLabel}: {project.role}
              </div>
              <h4
                onClick={() => onOpenDetails(project)}
                onMouseEnter={() => setCursor('pointer', 'VIEW')}
                onMouseLeave={resetCursor}
                className="font-display text-2xl sm:text-3xl font-black text-[#F1F1F1] group-hover:text-[#B93434] transition-colors mt-1 uppercase cursor-pointer"
              >
                {project.title}
              </h4>
              <p className="font-sans text-xs text-[#8C8C8C] mt-2 line-clamp-2">
                {project.description}
              </p>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10 font-mono text-[10px] tracking-widest">
              <button
                onClick={() => onOpenDetails(project)}
                className="text-[#F1F1F1] hover:text-[#B93434] uppercase flex items-center space-x-1"
              >
                <span>{t.work.viewProject}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onPlayVideo(project)}
                className="text-[#B93434] hover:text-white uppercase flex items-center space-x-1"
              >
                <Play className="w-3 h-3" />
                <span>{language === 'fr' ? 'LIRE' : 'WATCH'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
