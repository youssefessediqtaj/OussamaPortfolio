import React from 'react';
import { getExperiences } from '../../data/experience';
import { SectionHeader } from '../common/SectionHeader';
import { BackgroundWord } from '../common/BackgroundWord';
import { TimelineItem } from './TimelineItem';
import { useLanguage } from '../../context/LanguageContext';

export const ExperienceSection: React.FC = () => {
  const { language, t } = useLanguage();
  const experiences = getExperiences(language);

  return (
    <section id="experience" className="relative py-24 sm:py-32 bg-[#111111] overflow-hidden">
      <BackgroundWord
        word="EXPERIENCE"
        speed={-30}
        className="top-12 text-[18vw] font-black opacity-15"
        align="left"
      />
      <BackgroundWord
        word="LEADERSHIP"
        speed={45}
        className="bottom-12 text-[20vw] font-black opacity-15"
        align="right"
        redVariant
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeader
          number={t.experience.sectionNum}
          category={t.experience.category}
          title={
            <>
              {t.experience.title}
              <br />
              <span className="text-[#B93434]">&amp; {language === 'fr' ? 'RÉALISATIONS' : 'TRACK RECORD'}.</span>
            </>
          }
          subtitle={t.experience.subtitle}
          annotation="CAREER CHRONOLOGY / 2022—2026"
        />

        <div className="max-w-4xl mx-auto mt-16">
          {experiences.map((item) => (
            <TimelineItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
