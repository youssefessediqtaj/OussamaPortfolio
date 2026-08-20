import React from 'react';
import { Project } from '../../types/project';
import { SectionHeader } from '../common/SectionHeader';
import { BackgroundWord } from '../common/BackgroundWord';
import { ProjectCard } from './ProjectCard';
import { HorizontalReel } from './HorizontalReel';
import { useLanguage } from '../../context/LanguageContext';
import { getProjects } from '../../data/projects';

interface SelectedWorkProps {
  projects?: Project[];
  onOpenDetails: (project: Project) => void;
  onPlayVideo: (project: Project) => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({
  projects: propProjects,
  onOpenDetails,
  onPlayVideo,
}) => {
  const { language, t } = useLanguage();
  const projects = propProjects || getProjects(language);

  return (
    <section id="work" className="relative py-24 sm:py-32 bg-[#111111] overflow-hidden">
      <BackgroundWord
        word="FILM"
        speed={-40}
        className="top-12 text-[26vw] font-black opacity-15"
        align="left"
      />
      <BackgroundWord
        word="WORK"
        speed={50}
        className="top-1/2 text-[24vw] font-black opacity-20"
        align="right"
        redVariant
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeader
          number={t.work.sectionNum}
          category={t.work.category}
          title={
            <>
              {t.work.title}
              <br />
              <span className="text-[#B93434]">&amp; {language === 'fr' ? 'RÉALISATIONS' : 'MEDIA ASSETS'}.</span>
            </>
          }
          subtitle={t.work.subtitle}
          annotation="EDITORIAL SELECTION / 2023—2026"
        />

        {/* Alternating Asymmetrical Project Layouts */}
        <div className="mt-12 sm:mt-20">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={onOpenDetails}
              onPlayVideo={onPlayVideo}
            />
          ))}
        </div>
      </div>

      {/* Interactive Horizontal Film Reel Scrub Strip */}
      <div className="mt-20 sm:mt-32">
        <HorizontalReel
          projects={projects}
          onOpenDetails={onOpenDetails}
          onPlayVideo={onPlayVideo}
        />
      </div>
    </section>
  );
};
