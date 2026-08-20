import React, { useState } from 'react';
import { Service } from '../../types/project';
import { useCursor } from '../../context/CursorContext';
import { ArrowUpRight } from 'lucide-react';

interface ServiceItemProps {
  service: Service;
}

export const ServiceItem: React.FC<ServiceItemProps> = ({ service }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  return (
    <div
      onMouseEnter={() => {
        setIsHovered(true);
        setCursor('pointer', 'EXPLORE');
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        resetCursor();
      }}
      className="border-b border-white/10 py-8 sm:py-10 transition-all duration-300 group cursor-pointer"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Number & Title */}
        <div className="flex items-baseline space-x-6 sm:space-x-8">
          <span className="font-mono text-base sm:text-lg text-[#8C8C8C] group-hover:text-[#B93434] transition-colors duration-300 font-semibold">
            {service.number}
          </span>
          <h3 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-[#F1F1F1] group-hover:text-[#B93434] group-hover:translate-x-3 transition-all duration-300 uppercase tracking-tight">
            {service.title}
          </h3>
        </div>

        {/* Short Tagline / Arrow Indicator */}
        <div className="flex items-center space-x-4 lg:text-right">
          <span className="font-sans text-xs sm:text-sm text-[#8C8C8C] max-w-sm hidden sm:block">
            {service.tagline}
          </span>
          <div className="w-10 h-10 rounded-full border border-white/20 group-hover:border-[#B93434] group-hover:bg-[#B93434] text-white flex items-center justify-center transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>

      {/* Expanded Details on Hover / Mobile */}
      <div
        className={`transition-all duration-500 overflow-hidden ${
          isHovered ? 'max-h-96 opacity-100 mt-6 pt-6 border-t border-white/10' : 'max-h-0 opacity-0 sm:hidden max-h-none opacity-100 mt-4'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-7">
            <p className="font-sans text-sm sm:text-base text-[#8C8C8C] leading-relaxed font-light">
              {service.description}
            </p>
          </div>
          <div className="md:col-span-5 flex flex-wrap gap-2">
            {service.deliverables.map((item) => (
              <span
                key={item}
                className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 bg-[#161616] border border-white/10 text-[#F1F1F1]/80"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
