import React, { useState } from "react";
import { MessageCircle, X, Check, Send } from "lucide-react";
import { useCursor } from "../../context/CursorContext";
import { useLanguage } from "../../context/LanguageContext";

export interface WhatsAppPreset {
  id: string;
  label: { en: string; fr: string };
  badge: { en: string; fr: string };
  message: { en: string; fr: string };
}

export const WHATSAPP_PRESETS: WhatsAppPreset[] = [
  {
    id: "commercial",
    label: {
      en: "Commercial & Brand Film",
      fr: "Film Publicitaire & Marque",
    },
    badge: { en: "COMMERCIAL", fr: "PUBLICITÉ" },
    message: {
      en: "Hi Oussama, I visited your portfolio and I am interested in discussing a high-end commercial / brand film production. Let us connect!",
      fr: "Bonjour Oussama, j'ai visité votre portfolio et je souhaite échanger sur la production d'un film publicitaire haut de gamme. Pouvons-nous échanger ?",
    },
  },
  {
    id: "strategy",
    label: {
      en: "Creative Direction & Strategy",
      fr: "Direction Créative & Stratégie",
    },
    badge: { en: "STRATEGY", fr: "STRATÉGIE" },
    message: {
      en: "Hi Oussama, I would like to consult on creative direction, content architecture, and media buying for our brand.",
      fr: "Bonjour Oussama, j'aimerais vous consulter pour la direction artistique, la stratégie de contenu et l'acquisition média de notre marque.",
    },
  },
  {
    id: "post",
    label: {
      en: "Post-Production & Color",
      fr: "Post-Production & Étalonnage",
    },
    badge: { en: "POST-PROD", fr: "POST-PROD" },
    message: {
      en: "Hi Oussama, I have a project requiring cinematic editing, color grading, and sound mastering. What is your current availability?",
      fr: "Bonjour Oussama, j'ai un projet nécessitant un montage cinématographique, un étalonnage couleur et du mixage sonore. Quelles sont vos disponibilités ?",
    },
  },
  {
    id: "general",
    label: {
      en: "General Project Inquiry",
      fr: "Demande de Collaboration",
    },
    badge: { en: "QUICK CHAT", fr: "CONTACT" },
    message: {
      en: "Hi Oussama, I love your portfolio work! I would like to schedule a quick call to explore a potential collaboration.",
      fr: "Bonjour Oussama, j'apprécie beaucoup votre portfolio ! J'aimerais planifier un court appel pour discuter d'une éventuelle collaboration.",
    },
  },
];

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string>(WHATSAPP_PRESETS[0].id);
  const { setCursor, resetCursor } = useCursor();
  const { language, t } = useLanguage();

  const activePreset = WHATSAPP_PRESETS.find((p) => p.id === selectedPreset) || WHATSAPP_PRESETS[0];
  const finalMessage = activePreset.message[language] || activePreset.message.en;

  const handleOpenWhatsApp = () => {
    const url = `https://wa.me/212653636981?text=${encodeURIComponent(finalMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Expanded Quick Message Dialog */}
      {isOpen && (
        <div className="mb-3 w-[92vw] max-w-sm bg-[#121212] border border-white/15 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-fadeIn relative">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-[#25D366]/20 border border-[#25D366]/60 flex items-center justify-center text-[#25D366]">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <div className="font-display text-sm font-black text-[#F1F1F1] tracking-wider uppercase leading-none">
                  OUSSAMA MAZROUI
                </div>
                <div className="flex items-center space-x-1 mt-1 font-mono text-[9px] text-[#25D366] tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                  <span>{t.whatsapp.onlineStatus}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-[#8C8C8C] hover:text-[#F1F1F1] transition-colors"
              aria-label="Close WhatsApp dialogue"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Prompt description */}
          <p className="font-sans text-xs text-[#8C8C8C] leading-relaxed mb-3">
            {t.whatsapp.prompt}
          </p>

          {/* Auto-Message Category Buttons */}
          <div className="space-y-1.5 mb-3">
            {WHATSAPP_PRESETS.map((preset) => {
              const isSelected = selectedPreset === preset.id;
              const label = preset.label[language] || preset.label.en;
              const badge = preset.badge[language] || preset.badge.en;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setSelectedPreset(preset.id)}
                  className={`w-full text-left px-2.5 py-2 border transition-all text-xs flex items-center justify-between font-mono ${
                    isSelected
                      ? "border-[#25D366] bg-[#25D366]/10 text-[#F1F1F1]"
                      : "border-white/10 bg-[#181818] text-[#8C8C8C] hover:border-white/25 hover:text-[#F1F1F1]"
                  }`}
                >
                  <span className="truncate pr-2">{label}</span>
                  {isSelected ? (
                    <Check className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                  ) : (
                    <span className="text-[9px] text-white/30 tracking-widest">{badge}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Live Message Preview */}
          <div className="mb-4">
            <div className="font-mono text-[9px] text-[#8C8C8C] uppercase tracking-widest mb-1.5">
              {t.whatsapp.previewLabel}
            </div>
            <div className="p-2.5 bg-[#0A0A0A] border border-white/10 text-xs text-[#E5E5E5] font-sans italic rounded-sm max-h-24 overflow-y-auto leading-relaxed">
              "{finalMessage}"
            </div>
          </div>

          {/* Direct CTA */}
          <button
            onClick={handleOpenWhatsApp}
            onMouseEnter={() => setCursor("pointer", "WHATSAPP")}
            onMouseLeave={resetCursor}
            className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-[#0A0A0A] font-display text-xs font-black tracking-[0.2em] uppercase transition-colors flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(37,211,102,0.3)]"
          >
            <span>{t.whatsapp.sendBtn}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setCursor("pointer", "WHATSAPP")}
        onMouseLeave={resetCursor}
        className={`group relative flex items-center space-x-2.5 px-4 py-3 border transition-all duration-300 shadow-2xl ${
          isOpen
            ? "bg-[#25D366] border-[#25D366] text-[#0A0A0A]"
            : "bg-[#141414]/90 backdrop-blur-md border-white/20 text-[#F1F1F1] hover:border-[#25D366] hover:text-[#25D366]"
        }`}
        aria-label="Direct WhatsApp Contact"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#25D366] ring-2 ring-[#0A0A0A] animate-pulse" />
        </div>
        <span className="font-mono text-xs tracking-widest uppercase hidden sm:inline-block">
          {isOpen ? t.whatsapp.closeChat : t.whatsapp.openDirect}
        </span>
      </button>
    </div>
  );
};
