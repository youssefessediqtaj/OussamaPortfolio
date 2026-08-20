import React, { useRef } from 'react';
import { Project } from '../../types/project';
import { useCursor } from '../../context/CursorContext';
import { useLanguage } from '../../context/LanguageContext';
import { Play, ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
  onPlayVideo: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenDetails,
  onPlayVideo,
}) => {
  const { setCursor, resetCursor } = useCursor();
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setCursor('play', 'PLAY');
    if (videoRef.current && project.video) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    resetCursor();
    if (videoRef.current && project.video) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // Layout variations as requested in prompt
  const isLeft = project.layoutType === 'left';
  const isPortrait = project.layoutType === 'portrait';
  const isFullWidth = project.layoutType === 'fullwidth';

  return (
    <article className="group relative w-full border-b border-white/10 pb-16 sm:pb-24 mb-16 sm:mb-24 last:border-b-0 last:pb-0 last:mb-0">
      {/* Top Project Label */}
      <div className="flex items-center justify-between font-mono text-xs text-[#8C8C8C] mb-6 tracking-widest uppercase">
        <div className="flex items-center space-x-3">
          <span className="text-[#B93434] font-semibold">{project.number}</span>
          <span className="text-white/20">/</span>
          <span>{project.category}</span>
        </div>
        <span>YEAR {project.year}</span>
      </div>

      {/* Grid Composition according to project layout type */}
      <div
        className={`grid gap-8 items-center ${
          isFullWidth
            ? 'grid-cols-1'
            : isPortrait
            ? 'grid-cols-1 lg:grid-cols-12 justify-center'
            : isLeft
            ? 'grid-cols-1 lg:grid-cols-12'
            : 'grid-cols-1 lg:grid-cols-12'
        }`}
      >
        {/* MEDIA BLOCK */}
        <div
          onClick={() => onPlayVideo(project)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`relative overflow-hidden bg-[#161616] border border-white/10 group-hover:border-[#B93434]/80 transition-all duration-500 cursor-pointer shadow-xl ${
            isFullWidth
              ? 'w-full aspect-[21/9] sm:aspect-[2.39/1]'
              : isPortrait
              ? 'lg:col-span-6 lg:col-start-4 aspect-[9/16] max-h-[700px] mx-auto'
              : isLeft
              ? 'lg:col-span-7 order-1 lg:order-1 aspect-video'
              : 'lg:col-span-7 order-1 lg:order-2 aspect-video'
          }`}
        >
          {/* Poster or preview video */}
          <img
            src={project.poster}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
          />

          {project.video && (
            <video
              ref={videoRef}
              src={project.video}
              muted
              loop
              playsInline
              preload="none"
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          )}

          {/* Film Viewfinder Tag */}
          <div className="absolute top-4 left-4 font-mono text-[9px] text-[#F1F1F1] bg-black/70 px-2.5 py-1 border border-white/10 backdrop-blur-sm uppercase tracking-widest flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B93434]" />
            <span>FRAME {project.number}</span>
          </div>

          {/* Center Play Icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-14 h-14 rounded-full bg-[#B93434] text-white flex items-center justify-center shadow-[0_0_30px_rgba(185,52,52,0.6)]">
              <Play className="w-5 h-5 fill-current translate-x-0.5" />
            </div>
          </div>
        </div>

        {/* TEXT CONTENT BLOCK */}
        <div
          className={`flex flex-col justify-between ${
            isFullWidth
              ? 'mt-4 max-w-3xl'
              : isPortrait
              ? 'lg:col-span-8 lg:col-start-3 text-center items-center mt-6'
              : isLeft
              ? 'lg:col-span-5 order-2 lg:order-2'
              : 'lg:col-span-5 order-2 lg:order-1'
          }`}
        >
          <div>
            <div className="font-mono text-[11px] text-[#B93434] tracking-[0.25em] uppercase mb-2">
              ROLE: {project.role}
            </div>

            <h3
              onClick={() => onOpenDetails(project)}
              onMouseEnter={() => setCursor('pointer', 'VIEW')}
              onMouseLeave={resetCursor}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-[#F1F1F1] group-hover:text-[#B93434] transition-colors tracking-tight leading-none uppercase cursor-pointer"
            >
              {project.title}
            </h3>

            {project.subtitle && (
              <p className="font-sans text-sm text-[#8C8C8C] mt-2 font-medium">
                {project.subtitle}
              </p>
            )}

            <p className="font-sans text-sm sm:text-base text-[#8C8C8C] mt-4 font-light leading-relaxed">
              {project.description}
            </p>

            {/* Services pills */}
            <div className="flex flex-wrap gap-2 mt-6">
              {project.services.map((srv) => (
                <span
                  key={srv}
                  className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 border border-white/10 bg-[#161616] text-[#8C8C8C]"
                >
                  {srv}
                </span>
              ))}
            </div>
          </div>

          {/* Deep Dive Button */}
          <div className="pt-8 flex items-center space-x-4">
            <button
              onClick={() => onOpenDetails(project)}
              onMouseEnter={() => setCursor('open', 'VIEW')}
              onMouseLeave={resetCursor}
              className="flex items-center space-x-2 text-xs font-mono tracking-widest text-[#F1F1F1] hover:text-[#B93434] uppercase transition-colors group/btn"
            >
              <span>{t.work.viewSpecs}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
            </button>

            <button
              onClick={() => onPlayVideo(project)}
              onMouseEnter={() => setCursor('play', 'PLAY')}
              onMouseLeave={resetCursor}
              className="flex items-center space-x-1.5 text-xs font-mono tracking-widest text-[#8C8C8C] hover:text-[#F1F1F1] uppercase transition-colors"
            >
              <Play className="w-3.5 h-3.5 text-[#B93434]" />
              <span>{t.work.watchFilm}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
