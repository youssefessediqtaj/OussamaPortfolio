import React, { useEffect } from 'react';
import { Project } from '../../types/project';
import { useCursor } from '../../context/CursorContext';
import { useLanguage } from '../../context/LanguageContext';
import { X, Play, ArrowRight, ArrowLeft } from 'lucide-react';
import { getProjects } from '../../data/projects';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onPlayVideo: (project: Project) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
  onSelectProject,
  onPlayVideo,
}) => {
  const { setCursor, resetCursor } = useCursor();
  const { language, t } = useLanguage();
  const allProjects = getProjects(language);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  // Resolve current project in active language
  const currentProject = allProjects.find((p) => p.id === project.id) || project;

  const currentIndex = allProjects.findIndex((p) => p.id === currentProject.id);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0A0A0A] overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      {/* Fixed Top Bar */}
      <div className="sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/10 px-6 sm:px-12 py-5 flex items-center justify-between">
        <div className="flex items-center space-x-3 font-mono text-xs text-[#8C8C8C] tracking-widest uppercase">
          <span className="text-[#B93434] font-semibold">PROJECT {currentProject.number}</span>
          <span className="text-white/20">/</span>
          <span>{currentProject.category}</span>
        </div>

        <button
          onClick={onClose}
          onMouseEnter={() => setCursor('pointer', 'CLOSE')}
          onMouseLeave={resetCursor}
          className="px-3.5 py-1.5 border border-white/20 hover:border-[#B93434] text-[#F1F1F1] hover:text-[#B93434] font-mono text-xs tracking-widest flex items-center space-x-1.5 transition-colors focus:outline-none"
        >
          <X className="w-4 h-4" />
          <span>{t.nav.close}</span>
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-12 py-12 sm:py-16 space-y-16">
        {/* Title Header */}
        <div>
          <div className="font-mono text-xs text-[#B93434] tracking-[0.3em] uppercase mb-2">
            {t.work.yearLabel} {currentProject.year} — {currentProject.role}
          </div>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black text-[#F1F1F1] tracking-tight leading-[0.9] uppercase">
            {currentProject.title}
          </h1>
          {currentProject.subtitle && (
            <p className="font-sans text-lg sm:text-xl text-[#8C8C8C] mt-3 font-light">
              {currentProject.subtitle}
            </p>
          )}
        </div>

        {/* Hero Media / Cinema Stage */}
        <div
          onClick={() => onPlayVideo(currentProject)}
          onMouseEnter={() => setCursor('play', 'PLAY')}
          onMouseLeave={resetCursor}
          className="relative aspect-video w-full bg-[#161616] border border-white/15 overflow-hidden group cursor-pointer shadow-2xl"
        >
          <img
            src={currentProject.poster}
            alt={currentProject.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
          />

          <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
            <div className="w-20 h-20 rounded-full border border-[#B93434] bg-[#B93434]/30 backdrop-blur-sm flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-[#B93434] transition-all shadow-[0_0_40px_rgba(185,52,52,0.5)]">
              <Play className="w-8 h-8 fill-current translate-x-0.5" />
            </div>
          </div>

          <div className="absolute bottom-4 left-4 font-mono text-[10px] text-[#F1F1F1] bg-black/70 px-3 py-1 border border-white/10 backdrop-blur-sm uppercase tracking-widest">
            {language === 'fr' ? 'CLIQUEZ POUR VOIR LE FILM' : 'CLICK TO PLAY FULL VIDEO'}
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-white/10 font-mono text-xs">
          <div>
            <div className="text-[#8C8C8C] text-[10px] tracking-widest uppercase mb-1">{t.work.roleLabel}</div>
            <div className="text-[#F1F1F1] font-semibold">{currentProject.role}</div>
          </div>
          <div>
            <div className="text-[#8C8C8C] text-[10px] tracking-widest uppercase mb-1">{t.work.yearLabel}</div>
            <div className="text-[#F1F1F1] font-semibold">{currentProject.year}</div>
          </div>
          <div>
            <div className="text-[#8C8C8C] text-[10px] tracking-widest uppercase mb-1">FORMAT</div>
            <div className="text-[#F1F1F1] font-semibold">{currentProject.aspectRatio || '16:9'} / 4K</div>
          </div>
          <div>
            <div className="text-[#8C8C8C] text-[10px] tracking-widest uppercase mb-1">SERVICES</div>
            <div className="text-[#F1F1F1] flex flex-col space-y-0.5">
              {currentProject.services.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Narrative & Strategic Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <span className="font-mono text-xs text-[#B93434] tracking-[0.25em] uppercase block mb-2">
              OVERVIEW
            </span>
            <h3 className="font-display text-3xl font-bold text-[#F1F1F1] uppercase">
              {t.work.briefLabel}
            </h3>
          </div>
          <div className="md:col-span-8">
            <p className="font-sans text-base sm:text-lg text-[#8C8C8C] leading-relaxed font-light">
              {currentProject.description}
            </p>
          </div>
        </div>

        {/* Approach Section */}
        {currentProject.approach && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-white/10 pt-12">
            <div className="md:col-span-4">
              <span className="font-mono text-xs text-[#B93434] tracking-[0.25em] uppercase block mb-2">
                EXECUTION
              </span>
              <h3 className="font-display text-3xl font-bold text-[#F1F1F1] uppercase">
                {t.work.approachLabel}
              </h3>
            </div>
            <div className="md:col-span-8">
              <p className="font-sans text-base sm:text-lg text-[#8C8C8C] leading-relaxed font-light">
                {currentProject.approach}
              </p>
            </div>
          </div>
        )}

        {/* Result Section */}
        {currentProject.result && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-white/10 pt-12">
            <div className="md:col-span-4">
              <span className="font-mono text-xs text-[#B93434] tracking-[0.25em] uppercase block mb-2">
                IMPACT
              </span>
              <h3 className="font-display text-3xl font-bold text-[#F1F1F1] uppercase">
                {t.work.resultLabel}
              </h3>
            </div>
            <div className="md:col-span-8">
              <p className="font-sans text-base sm:text-lg text-[#8C8C8C] leading-relaxed font-light">
                {currentProject.result}
              </p>
            </div>
          </div>
        )}

        {/* Production Stills Gallery */}
        {currentProject.stills && currentProject.stills.length > 0 && (
          <div className="space-y-6 border-t border-white/10 pt-12">
            <div className="flex items-center justify-between font-mono text-xs text-[#8C8C8C] tracking-widest uppercase">
              <span>{t.work.stillsLabel}</span>
              <span>CINEMATIC ARCHIVE</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {currentProject.stills.map((still, idx) => (
                <div key={idx} className="aspect-video bg-[#181818] border border-white/10 overflow-hidden">
                  <img
                    src={still}
                    alt={`Production still ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next / Previous Project Footer Navigation */}
        <div className="border-t border-white/10 pt-12 flex flex-col sm:flex-row items-center justify-between gap-6 font-display">
          <button
            onClick={() => onSelectProject(prevProject)}
            onMouseEnter={() => setCursor('pointer')}
            onMouseLeave={resetCursor}
            className="flex items-center space-x-3 text-[#8C8C8C] hover:text-[#F1F1F1] transition-colors uppercase tracking-widest"
          >
            <ArrowLeft className="w-5 h-5 text-[#B93434]" />
            <div className="text-left">
              <div className="font-mono text-[9px] text-[#8C8C8C]/60">{language === 'fr' ? 'PRÉCÉDENT' : 'PREVIOUS'}</div>
              <div className="text-lg font-bold">{prevProject.title}</div>
            </div>
          </button>

          <button
            onClick={() => onSelectProject(nextProject)}
            onMouseEnter={() => setCursor('pointer')}
            onMouseLeave={resetCursor}
            className="flex items-center space-x-3 text-[#8C8C8C] hover:text-[#F1F1F1] transition-colors uppercase tracking-widest"
          >
            <div className="text-right">
              <div className="font-mono text-[9px] text-[#8C8C8C]/60">{language === 'fr' ? 'PROCHAIN PROJET' : 'NEXT PROJECT'}</div>
              <div className="text-lg font-bold">{nextProject.title}</div>
            </div>
            <ArrowRight className="w-5 h-5 text-[#B93434]" />
          </button>
        </div>
      </div>
    </div>
  );
};
