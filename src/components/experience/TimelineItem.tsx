import React, { useState } from 'react';
import { ExperienceItem } from '../../types/project';
import { Plus, Minus, Building2, MapPin, Calendar } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';

interface TimelineItemProps {
  item: ExperienceItem;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { setCursor, resetCursor } = useCursor();

  return (
    <div className="relative pl-8 sm:pl-12 border-l border-white/15 pb-16 last:pb-0 group">
      {/* Red Timeline Node */}
      <div className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#111111] border-2 border-[#B93434] group-hover:bg-[#B93434] transition-colors" />

      {/* Main Card */}
      <div className="bg-[#141414] border border-white/10 p-6 sm:p-8 hover:border-[#B93434]/60 transition-all duration-300 shadow-xl">
        {/* Top Meta */}
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[#8C8C8C] mb-4 tracking-widest uppercase">
          <div className="flex items-center space-x-2 text-[#B93434] font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            <span>{item.company}</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#8C8C8C]/70" />
              <span>{item.period}</span>
            </span>
            <span className="flex items-center space-x-1.5 hidden sm:flex">
              <MapPin className="w-3.5 h-3.5 text-[#8C8C8C]/70" />
              <span>{item.location}</span>
            </span>
          </div>
        </div>

        {/* Role Title */}
        <h3 className="font-display text-3xl sm:text-4xl font-black text-[#F1F1F1] tracking-tight uppercase">
          {item.role}
        </h3>

        {/* Overview Description */}
        <p className="font-sans text-sm sm:text-base text-[#8C8C8C] mt-3 font-light leading-relaxed">
          {item.description}
        </p>

        {/* Expandable Responsibilities */}
        {isExpanded && item.responsibilities.length > 0 && (
          <div className="mt-6 pt-6 border-t border-white/10 space-y-2.5">
            <div className="font-mono text-[10px] text-[#B93434] uppercase tracking-widest mb-3">
              KEY DELIVERABLES &amp; IMPACT
            </div>
            {item.responsibilities.map((resp, i) => (
              <div key={i} className="flex items-start space-x-3 font-sans text-xs sm:text-sm text-[#8C8C8C]">
                <span className="text-[#B93434] mt-1">▸</span>
                <span>{resp}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-white/10">
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 border border-white/10 bg-black/40 text-[#8C8C8C]"
              >
                {tag}
              </span>
            ))}
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            onMouseEnter={() => setCursor('pointer')}
            onMouseLeave={resetCursor}
            className="font-mono text-[10px] tracking-widest text-[#8C8C8C] hover:text-[#F1F1F1] uppercase flex items-center space-x-1 transition-colors"
          >
            {isExpanded ? (
              <>
                <Minus className="w-3 h-3 text-[#B93434]" />
                <span>COLLAPSE</span>
              </>
            ) : (
              <>
                <Plus className="w-3 h-3 text-[#B93434]" />
                <span>EXPAND DETAILS</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
