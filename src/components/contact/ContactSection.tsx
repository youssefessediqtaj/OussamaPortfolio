import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { BackgroundWord } from '../common/BackgroundWord';
import { MagneticButton } from '../common/MagneticButton';
import { Copy, CheckCheck, ArrowUpRight, Mail, Linkedin, Phone, MessageCircle } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';
import { useLanguage } from '../../context/LanguageContext';

interface ContactSectionProps {
  onOpenContact: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenContact }) => {
  const [copied, setCopied] = useState(false);
  const { setCursor, resetCursor } = useCursor();
  const { t } = useLanguage();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('oussamamazroui49@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-28 sm:py-40 bg-[#0A0A0A] overflow-hidden">
      <BackgroundWord
        word="CREATE"
        speed={-35}
        className="top-1/4 text-[26vw] font-black opacity-10"
        align="center"
      />
      <BackgroundWord
        word="CINEMA"
        speed={45}
        className="bottom-8 text-[24vw] font-black opacity-15"
        align="right"
        redVariant
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <SectionHeader
          number={t.contact.sectionNum}
          category={t.contact.category}
          title={
            <>
              {t.contact.titlePre}
              <br />
              {t.contact.titleMid}
              <br />
              <span className="text-[#B93434]">{t.contact.titleRed}</span>
            </>
          }
          subtitle={t.contact.subtitle}
          annotation="FINAL SCENE / COLLABORATION"
        />

        {/* Cinematic Call to Action Box */}
        <div className="mt-16 bg-[#141414] border border-white/15 p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Red Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#B93434]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center space-x-2 font-mono text-xs text-[#B93434] tracking-[0.3em] uppercase">
                <span className="w-2 h-2 rounded-full bg-[#B93434] animate-pulse" />
                <span>ACTIVE STATUS: ACCEPTING SELECT COMMISSIONS</span>
              </div>

              <h3 className="font-display text-3xl sm:text-5xl font-black text-[#F1F1F1] tracking-tight uppercase leading-tight">
                {t.contact.ctaHeadline}
              </h3>

              <p className="font-sans text-sm sm:text-base text-[#8C8C8C] leading-relaxed font-light">
                {t.contact.ctaText}
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <MagneticButton
                  variant="primary"
                  onClick={onOpenContact}
                  cursorLabel="START"
                  className="px-8 py-4 text-base"
                >
                  <span>{t.contact.startBtn}</span>
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </MagneticButton>
              </div>
            </div>

            {/* Direct Channel Connectors */}
            <div className="lg:col-span-5 flex flex-col space-y-4 lg:border-l lg:border-white/10 lg:pl-10">
              <div className="font-mono text-xs text-[#8C8C8C] uppercase tracking-widest mb-2">
                {t.contact.directChannels}
              </div>

              {/* WhatsApp Direct Transmission Card */}
              <div className="p-4 bg-[#181818] border border-[#25D366]/30 hover:border-[#25D366] transition-all group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] shrink-0">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5 font-mono text-[9px] text-[#25D366] tracking-widest uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                        <span>{t.contact.whatsAppTitle}</span>
                      </div>
                      <span className="font-mono text-xs sm:text-sm text-[#F1F1F1] group-hover:text-[#25D366] transition-colors">
                        +212 653 636 981
                      </span>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/212653636981?text=Hi%20Oussama%2C%20I%20visited%20your%20portfolio%20and%20I%27d%20like%20to%20discuss%20a%20potential%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setCursor('pointer', 'WHATSAPP')}
                    onMouseLeave={resetCursor}
                    className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-[#0A0A0A] font-mono text-xs font-bold tracking-wider flex items-center space-x-1 transition-colors"
                  >
                    <span>{t.contact.chatBtn}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Auto Message Quick Selectors */}
                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="font-mono text-[9px] text-[#8C8C8C] tracking-widest uppercase mb-2">
                    {t.contact.orChoosePreset}
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <a
                      href={`https://wa.me/212653636981?text=${encodeURIComponent("Hi Oussama, I came across your portfolio and I'm interested in commissioning a high-end commercial / brand film production. Let's connect!")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1.5 bg-[#121212] hover:bg-[#25D366]/10 border border-white/10 hover:border-[#25D366]/40 font-mono text-[10px] text-[#8C8C8C] hover:text-[#25D366] transition-colors truncate text-center"
                    >
                      🎬 Commercial Film
                    </a>
                    <a
                      href={`https://wa.me/212653636981?text=${encodeURIComponent("Hi Oussama, I'd like to consult on creative direction, content architecture, and media buying for our brand.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1.5 bg-[#121212] hover:bg-[#25D366]/10 border border-white/10 hover:border-[#25D366]/40 font-mono text-[10px] text-[#8C8C8C] hover:text-[#25D366] transition-colors truncate text-center"
                    >
                      🎯 Digital Strategy
                    </a>
                    <a
                      href={`https://wa.me/212653636981?text=${encodeURIComponent("Hi Oussama, I have a project requiring cinematic editing, color grading, and sound mastering. What is your availability?")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1.5 bg-[#121212] hover:bg-[#25D366]/10 border border-white/10 hover:border-[#25D366]/40 font-mono text-[10px] text-[#8C8C8C] hover:text-[#25D366] transition-colors truncate text-center"
                    >
                      ✂️ Post-Production
                    </a>
                    <a
                      href={`https://wa.me/212653636981?text=${encodeURIComponent("Hi Oussama, I love your portfolio work! I'd like to schedule a quick call to explore a potential collaboration.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1.5 bg-[#121212] hover:bg-[#25D366]/10 border border-white/10 hover:border-[#25D366]/40 font-mono text-[10px] text-[#8C8C8C] hover:text-[#25D366] transition-colors truncate text-center"
                    >
                      🤝 Quick Inquiry
                    </a>
                  </div>
                </div>
              </div>

              {/* Email Button */}
              <div className="p-4 bg-[#181818] border border-white/10 flex items-center justify-between group hover:border-[#B93434]/60 transition-colors">
                <div className="flex items-center space-x-3 overflow-hidden">
                  <Mail className="w-4 h-4 text-[#B93434] shrink-0" />
                  <div className="truncate">
                    <div className="font-mono text-[9px] text-[#8C8C8C] tracking-widest uppercase">
                      DIRECT EMAIL
                    </div>
                    <a
                      href="mailto:oussamamazroui49@gmail.com"
                      className="font-mono text-xs sm:text-sm text-[#F1F1F1] hover:text-[#B93434] truncate block"
                    >
                      oussamamazroui49@gmail.com
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  onMouseEnter={() => setCursor('pointer', 'COPY')}
                  onMouseLeave={resetCursor}
                  className="p-2 text-[#8C8C8C] hover:text-[#F1F1F1] transition-colors focus:outline-none shrink-0"
                  aria-label="Copy email"
                >
                  {copied ? (
                    <CheckCheck className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* LinkedIn Button */}
              <a
                href="https://linkedin.com/in/oussama-mazroui"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursor('open', 'VISIT')}
                onMouseLeave={resetCursor}
                className="p-4 bg-[#181818] border border-white/10 flex items-center justify-between group hover:border-[#B93434]/60 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Linkedin className="w-4 h-4 text-[#B93434]" />
                  <div>
                    <div className="font-mono text-[9px] text-[#8C8C8C] tracking-widest uppercase">
                      PROFESSIONAL NETWORK
                    </div>
                    <span className="font-mono text-xs sm:text-sm text-[#F1F1F1] group-hover:text-[#B93434]">
                      linkedin.com/in/oussama-mazroui
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#8C8C8C] group-hover:text-[#B93434] transition-colors" />
              </a>

              {/* Phone Button */}
              <a
                href="tel:+212653636981"
                onMouseEnter={() => setCursor('pointer', 'CALL')}
                onMouseLeave={resetCursor}
                className="p-4 bg-[#181818] border border-white/10 flex items-center justify-between group hover:border-[#B93434]/60 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-[#B93434]" />
                  <div>
                    <div className="font-mono text-[9px] text-[#8C8C8C] tracking-widest uppercase">
                      DIRECT LINE
                    </div>
                    <span className="font-mono text-xs sm:text-sm text-[#F1F1F1] group-hover:text-[#B93434]">
                      +212 653 636 981
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#8C8C8C] group-hover:text-[#B93434] transition-colors" />
              </a>

              {/* Base Location Note */}
              <div className="pt-2 font-mono text-[10px] text-[#8C8C8C]/50 tracking-widest uppercase">
                LOCATION: CASABLANCA, MOROCCO (AVAILABLE WORLDWIDE)
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
