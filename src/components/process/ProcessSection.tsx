import React from 'react';
import { getProcessSteps } from '../../data/process';
import { SectionHeader } from '../common/SectionHeader';
import { BackgroundWord } from '../common/BackgroundWord';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const ProcessSection: React.FC = () => {
  const { language, t } = useLanguage();
  const processSteps = getProcessSteps(language);

  return (
    <section id="process" className="relative py-24 sm:py-32 bg-[#111111] overflow-hidden">
      <BackgroundWord
        word="METHOD"
        speed={-35}
        className="top-12 text-[20vw] font-black opacity-15"
        align="left"
      />
      <BackgroundWord
        word="PROCESS"
        speed={45}
        className="bottom-12 text-[22vw] font-black opacity-15"
        align="right"
        redVariant
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeader
          number={t.process.sectionNum}
          category={t.process.category}
          title={
            <>
              {language === 'fr' ? 'DE LA STRATÉGIE' : 'FROM STRATEGY'}
              <br />
              {language === 'fr' ? 'AU CINÉMA &' : 'TO CINEMA'}
              <br />
              <span className="text-[#B93434]">{language === 'fr' ? 'À LA DIFFUSION.' : 'DISTRIBUTION.'}</span>
            </>
          }
          subtitle={t.process.subtitle}
          annotation="4-PHASE PROTOCOL"
        />

        {/* 4-Column Editorial Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {processSteps.map((step) => (
            <div
              key={step.number}
              className="bg-[#141414] border border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-[#B93434]/80 transition-all duration-300 group relative shadow-lg"
            >
              {/* Top Step Number */}
              <div>
                <div className="flex items-center justify-between font-mono text-xs text-[#8C8C8C] pb-4 border-b border-white/10 tracking-widest uppercase">
                  <span className="text-[#B93434] font-bold text-base">PHASE {step.number}</span>
                  <span className="text-white/20">/ 04</span>
                </div>

                {/* Step Title */}
                <h3 className="font-display text-3xl sm:text-4xl font-black text-[#F1F1F1] group-hover:text-[#B93434] transition-colors mt-6 uppercase tracking-tight">
                  {step.title}
                </h3>

                <p className="font-sans text-xs text-[#F1F1F1]/80 font-medium mt-2">
                  {step.subtitle}
                </p>

                <p className="font-sans text-xs sm:text-sm text-[#8C8C8C] mt-4 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Action items / Deliverables */}
              <div className="mt-8 pt-6 border-t border-white/10 space-y-2">
                <div className="font-mono text-[9px] text-[#B93434] uppercase tracking-widest mb-2">
                  KEY ACTIONS:
                </div>
                {step.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start space-x-2 font-mono text-[10px] text-[#8C8C8C]">
                    <CheckCircle2 className="w-3 h-3 text-[#B93434] shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
