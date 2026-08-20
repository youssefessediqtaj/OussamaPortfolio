import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';
import { useLanguage } from '../../context/LanguageContext';

interface FooterProps {
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop }) => {
  const { setCursor, resetCursor } = useCursor();
  const { t } = useLanguage();
  const [moroccoTime, setMoroccoTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Africa/Casablanca',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date());
        setMoroccoTime(timeStr);
      } catch {
        setMoroccoTime('17:36:00 GMT+1');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative bg-[#0A0A0A] border-t border-white/10 py-16 px-6 sm:px-8 lg:px-12 z-10 text-[#8C8C8C]">
      <div className="max-w-7xl mx-auto flex flex-col space-y-12">
        {/* Main 3-Column Credits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start pb-12 border-b border-white/10">
          {/* Left Column: Brand & Title */}
          <div className="space-y-1">
            <h3 className="font-display text-2xl font-black text-[#F1F1F1] tracking-wider uppercase">
              OUSSAMA MAZROUI
            </h3>
            <p className="font-mono text-xs text-[#B93434] tracking-widest uppercase">
              {t.footer.role}
            </p>
            <p className="font-sans text-xs text-[#8C8C8C]/70 pt-2 max-w-xs">
              {t.footer.subline}
            </p>
          </div>

          {/* Center Column: Location & Live Clock */}
          <div className="space-y-1 md:text-center">
            <div className="font-mono text-[10px] text-[#8C8C8C] tracking-[0.25em] uppercase">
              {t.footer.locationTitle}
            </div>
            <div className="font-display text-xl text-[#F1F1F1] uppercase tracking-wide">
              {t.footer.location}
            </div>
            <div className="font-mono text-xs text-[#B93434] tracking-widest pt-1 flex items-center md:justify-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B93434] animate-ping" />
              <span>{moroccoTime ? `${moroccoTime} WEST` : 'MOROCCO / GMT+1'}</span>
            </div>
          </div>

          {/* Right Column: Direct Links */}
          <div className="space-y-2 md:text-right">
            <div className="font-mono text-[10px] text-[#8C8C8C] tracking-[0.25em] uppercase mb-1">
              {t.footer.connectivity}
            </div>
            <div className="flex flex-col md:items-end space-y-1.5 font-mono text-xs">
              <a
                href="mailto:oussamamazroui49@gmail.com"
                onMouseEnter={() => setCursor('pointer', 'EMAIL')}
                onMouseLeave={resetCursor}
                className="text-[#F1F1F1] hover:text-[#B93434] transition-colors"
              >
                oussamamazroui49@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/oussama-mazroui"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursor('open', 'LINKEDIN')}
                onMouseLeave={resetCursor}
                className="text-[#8C8C8C] hover:text-[#F1F1F1] transition-colors"
              >
                linkedin.com/in/oussama-mazroui ↗
              </a>
              <a
                href="https://wa.me/212653636981?text=Hi%20Oussama%2C%20I%20visited%20your%20portfolio%20and%20I%27d%20like%20to%20discuss%20a%20potential%20project."
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursor('pointer', 'WHATSAPP')}
                onMouseLeave={resetCursor}
                className="text-[#25D366] hover:text-[#25D366]/80 transition-colors"
              >
                WhatsApp Direct ↗
              </a>
              <a
                href="tel:+212653636981"
                onMouseEnter={() => setCursor('pointer', 'CALL')}
                onMouseLeave={resetCursor}
                className="text-[#8C8C8C] hover:text-[#F1F1F1] transition-colors"
              >
                +212 653 636 981
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Colophon & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#8C8C8C]/60 tracking-widest">
          <div>
            © {new Date().getFullYear()} OUSSAMA MAZROUI. {t.footer.rights}
          </div>

          <button
            onClick={onScrollToTop}
            onMouseEnter={() => setCursor('pointer', 'TOP')}
            onMouseLeave={resetCursor}
            className="flex items-center space-x-2 text-[#8C8C8C] hover:text-[#F1F1F1] uppercase transition-colors group"
          >
            <span>{t.footer.backToTop}</span>
            <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#B93434] group-hover:text-[#B93434] transition-colors">
              <ArrowUp className="w-3 h-3" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
