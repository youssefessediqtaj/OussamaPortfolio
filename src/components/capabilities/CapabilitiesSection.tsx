import React from 'react';
import { getServices } from '../../data/services';
import { SectionHeader } from '../common/SectionHeader';
import { BackgroundWord } from '../common/BackgroundWord';
import { ServiceItem } from './ServiceItem';
import { useLanguage } from '../../context/LanguageContext';

export const CapabilitiesSection: React.FC = () => {
  const { language, t } = useLanguage();
  const services = getServices(language);

  return (
    <section id="capabilities" className="relative py-24 sm:py-32 bg-[#111111] overflow-hidden">
      <BackgroundWord
        word="SERVICES"
        speed={-35}
        className="top-12 text-[20vw] font-black opacity-15"
        align="left"
      />
      <BackgroundWord
        word="SKILLS"
        speed={40}
        className="bottom-12 text-[22vw] font-black opacity-15"
        align="right"
        redVariant
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeader
          number={t.capabilities.sectionNum}
          category={t.capabilities.category}
          title={
            <>
              {language === 'fr' ? 'CE QUE' : 'WHAT'}
              <br />
              <span className="text-[#B93434]">{language === 'fr' ? 'JE RÉALISE.' : 'I DO.'}</span>
            </>
          }
          subtitle={t.capabilities.subtitle}
          annotation="8 DISCIPLINES / FULL PIPELINE"
        />

        <div className="mt-16 border-t border-white/10">
          {services.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};
