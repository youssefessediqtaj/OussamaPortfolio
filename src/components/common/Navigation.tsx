import React, { useState, useEffect, useRef } from 'react';
import { useCursor } from '../../context/CursorContext';
import { useLanguage } from '../../context/LanguageContext';
import { gsap } from '../../utils/gsap';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavigationProps {
  onOpenContact: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setCursor, resetCursor } = useCursor();
  const { language, setLanguage, toggleLanguage, t } = useLanguage();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(mobileMenuRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 0.5,
        ease: 'power3.out',
      });

      if (linksRef.current) {
        gsap.fromTo(
          linksRef.current.children,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, delay: 0.2, ease: 'power3.out' }
        );
      }
    } else {
      document.body.style.overflow = '';
      gsap.to(mobileMenuRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 0.4,
        ease: 'power3.in',
      });
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: t.nav.work, href: '#work', number: '01' },
    { label: t.nav.about, href: '#about', number: '02' },
    { label: t.nav.experience, href: '#experience', number: '03' },
    { label: t.nav.capabilities, href: '#capabilities', number: '04' },
    { label: t.nav.process, href: '#process', number: '05' },
    { label: t.nav.contact, href: '#contact', number: '06' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0A0A]/90 backdrop-blur-md py-4 border-b border-white/[0.08]'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Monogram / Name */}
          <a
            href="#"
            onMouseEnter={() => setCursor('pointer')}
            onMouseLeave={resetCursor}
            className="flex items-center space-x-3 group focus:outline-none"
          >
            <span className="w-8 h-8 flex items-center justify-center border border-white/20 bg-[#161616] text-[#F1F1F1] font-display text-lg font-black group-hover:border-[#B93434] group-hover:text-[#B93434] transition-colors">
              OM
            </span>
            <div className="flex flex-col">
              <span className="font-display text-lg tracking-widest text-[#F1F1F1] leading-none group-hover:text-[#B93434] transition-colors">
                OUSSAMA MAZROUI
              </span>
              <span className="font-mono text-[9px] tracking-widest text-[#8C8C8C] leading-none mt-1">
                CREATIVE PRODUCER
              </span>
            </div>
          </a>

          {/* Desktop Center Availability Badge */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 border border-white/10 bg-black/40 backdrop-blur-sm rounded-full font-mono text-[10px] tracking-widest text-[#8C8C8C]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B93434] animate-pulse" />
            <span className="text-[#F1F1F1]/90">AVAILABLE FOR SELECT PROJECTS</span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 font-display text-sm tracking-widest text-[#8C8C8C]">
            {navLinks.slice(0, 5).map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                onMouseEnter={() => setCursor('pointer')}
                onMouseLeave={resetCursor}
                className="relative py-1 text-[#8C8C8C] hover:text-[#F1F1F1] transition-colors group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#B93434] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            {/* Language Switcher (FR / EN) */}
            <div className="flex items-center border border-white/20 bg-[#141414] p-0.5 font-mono text-[11px] tracking-wider">
              <button
                onClick={() => setLanguage('en')}
                onMouseEnter={() => setCursor('pointer', 'EN')}
                onMouseLeave={resetCursor}
                className={`px-2 py-1 transition-all ${
                  language === 'en'
                    ? 'bg-[#B93434] text-white font-bold shadow-sm'
                    : 'text-[#8C8C8C] hover:text-[#F1F1F1]'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <span className="text-white/20 px-0.5">/</span>
              <button
                onClick={() => setLanguage('fr')}
                onMouseEnter={() => setCursor('pointer', 'FR')}
                onMouseLeave={resetCursor}
                className={`px-2 py-1 transition-all ${
                  language === 'fr'
                    ? 'bg-[#B93434] text-white font-bold shadow-sm'
                    : 'text-[#8C8C8C] hover:text-[#F1F1F1]'
                }`}
                title="Passer en Français"
              >
                FR
              </button>
            </div>

            <button
              onClick={onOpenContact}
              onMouseEnter={() => setCursor('open')}
              onMouseLeave={resetCursor}
              className="px-4 py-1.5 border border-[#B93434] bg-[#B93434]/10 hover:bg-[#B93434] text-[#F1F1F1] font-display text-sm tracking-widest transition-all duration-300 flex items-center space-x-1.5 group"
            >
              <span>{t.nav.inquire}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#B93434] group-hover:text-white transition-colors" />
            </button>
          </nav>

          {/* Mobile Right Actions: Lang Switcher + Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 border border-white/20 bg-[#161616] text-[#F1F1F1] font-mono text-xs tracking-widest flex items-center space-x-1"
              aria-label="Toggle language"
            >
              <span className={language === 'en' ? 'text-[#B93434] font-bold' : 'text-[#8C8C8C]'}>EN</span>
              <span className="text-white/30">/</span>
              <span className={language === 'fr' ? 'text-[#B93434] font-bold' : 'text-[#8C8C8C]'}>FR</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              onMouseEnter={() => setCursor('pointer')}
              onMouseLeave={resetCursor}
              className="flex items-center space-x-2 px-3 py-1.5 border border-white/20 bg-[#161616] text-[#F1F1F1] font-mono text-xs tracking-widest focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <>
                  <X className="w-4 h-4 text-[#B93434]" />
                  <span>{t.nav.close}</span>
                </>
              ) : (
                <>
                  <Menu className="w-4 h-4 text-[#B93434]" />
                  <span>{t.nav.menu}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      <div
        ref={mobileMenuRef}
        className="lg:hidden fixed inset-0 z-50 bg-[#0A0A0A] flex flex-col justify-between p-8"
        style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }}
      >
        <div className="flex justify-between items-center border-b border-white/10 pb-6">
          <div className="flex items-center space-x-2 font-mono text-xs text-[#8C8C8C] tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#B93434]" />
            <span>{t.nav.index}</span>
          </div>
          <div className="flex items-center space-x-3">
            {/* Language Switcher in Drawer */}
            <div className="flex items-center border border-white/20 bg-[#141414] p-0.5 font-mono text-[10px] tracking-wider">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 transition-all ${
                  language === 'en'
                    ? 'bg-[#B93434] text-white font-bold'
                    : 'text-[#8C8C8C]'
                }`}
              >
                EN
              </button>
              <span className="text-white/20 px-0.5">/</span>
              <button
                onClick={() => setLanguage('fr')}
                className={`px-2 py-0.5 transition-all ${
                  language === 'fr'
                    ? 'bg-[#B93434] text-white font-bold'
                    : 'text-[#8C8C8C]'
                }`}
              >
                FR
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-1 border border-white/20 text-[#F1F1F1] font-mono text-xs tracking-widest flex items-center space-x-1.5"
            >
              <X className="w-4 h-4 text-[#B93434]" />
              <span>{t.nav.close}</span>
            </button>
          </div>
        </div>

        <div ref={linksRef} className="flex flex-col space-y-4 my-auto">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              className="flex items-baseline space-x-4 group py-2"
            >
              <span className="font-mono text-sm text-[#B93434] tracking-widest">{link.number}</span>
              <span className="font-display text-4xl sm:text-5xl font-black text-[#8C8C8C] group-hover:text-[#F1F1F1] transition-colors tracking-wider">
                {link.label}
              </span>
            </a>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="font-mono text-xs text-[#8C8C8C]">
            <div>OUSSAMA MAZROUI</div>
            <div className="text-[10px] text-[#8C8C8C]/60">CASABLANCA, MOROCCO / 2026</div>
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact();
            }}
            className="w-full sm:w-auto px-6 py-3 bg-[#B93434] text-white font-display text-base tracking-widest text-center"
          >
            {t.nav.startProject}
          </button>
        </div>
      </div>
    </>
  );
};
