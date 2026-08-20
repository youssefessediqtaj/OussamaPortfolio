import React, { useState, useEffect } from 'react';
import { X, Check, ArrowRight, Copy, CheckCheck, MessageCircle } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';
import { useLanguage } from '../../context/LanguageContext';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const { setCursor, resetCursor } = useCursor();
  const { language, t } = useLanguage();
  const isFr = language === 'fr';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectTypes: [] as string[],
    budget: '$5,000 - $15,000',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      setIsSubmitted(false);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const projectTypeOptions = isFr
    ? [
        'PRODUCTION VIDÉO',
        'DIRECTION ARTISTIQUE',
        'MONTAGE VIDÉO',
        'IMAGE DE MARQUE',
        'STRATÉGIE DE CONTENU',
        'ACHAT MÉDIA',
        'AUTRE',
      ]
    : [
        'VIDEO PRODUCTION',
        'CREATIVE DIRECTION',
        'VIDEO EDITING',
        'BRANDING',
        'CONTENT STRATEGY',
        'MEDIA BUYING',
        'OTHER',
      ];

  const budgetOptions = [
    '< $5,000',
    '$5,000 - $15,000',
    '$15,000 - $30,000',
    '$30,000+',
  ];

  const toggleProjectType = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      projectTypes: prev.projectTypes.includes(type)
        ? prev.projectTypes.filter((t) => t !== type)
        : [...prev.projectTypes, type],
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = isFr ? 'Le nom est requis' : 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = isFr ? "L'adresse email est requise" : 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = isFr ? 'Veuillez entrer un email valide' : 'Please enter a valid email address';
    }
    if (formData.projectTypes.length === 0) {
      newErrors.projectTypes = isFr ? 'Veuillez sélectionner au moins un type de projet' : 'Please select at least one project type';
    }
    if (!formData.message.trim()) {
      newErrors.message = isFr ? 'Veuillez détailler brièvement votre projet' : 'Please provide brief details on your project';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    console.log('Project Inquiry Submission:', formData);
    setIsSubmitted(true);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('oussamamazroui49@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      {/* Top Header */}
      <div className="sticky top-0 z-30 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/10 px-6 sm:px-12 py-5 flex items-center justify-between">
        <div className="flex items-center space-x-3 font-mono text-xs text-[#8C8C8C] tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-[#B93434] animate-pulse" />
          <span className="text-[#F1F1F1]">INQUIRY TRANSMISSION</span>
          <span className="text-white/20">/</span>
          <span>CASABLANCA, MOROCCO</span>
        </div>

        <button
          onClick={onClose}
          onMouseEnter={() => setCursor('pointer', 'CLOSE')}
          onMouseLeave={resetCursor}
          className="px-3 py-1.5 border border-white/20 hover:border-[#B93434] text-[#F1F1F1] hover:text-[#B93434] font-mono text-xs tracking-widest flex items-center space-x-1.5 transition-colors focus:outline-none"
        >
          <X className="w-4 h-4" />
          <span>{t.nav.close}</span>
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 sm:px-12 py-12 sm:py-16">
        {isSubmitted ? (
          <div className="bg-[#141414] border border-[#B93434] p-8 sm:p-12 text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#B93434]/20 border border-[#B93434] flex items-center justify-center text-[#B93434] mx-auto">
              <Check className="w-8 h-8" />
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-black text-[#F1F1F1] tracking-tight uppercase">
              {t.modal.recordedTitle}
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#8C8C8C] max-w-lg mx-auto leading-relaxed">
              {isFr ? 'Merci' : 'Thank you'}, <strong className="text-white">{formData.name}</strong>. {t.modal.recordedText}
            </p>

            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={copyEmailToClipboard}
                className="px-5 py-2.5 border border-white/20 bg-[#181818] hover:border-[#B93434] font-mono text-xs tracking-widest text-[#F1F1F1] flex items-center space-x-2"
              >
                {copiedEmail ? <CheckCheck className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#B93434]" />}
                <span>{copiedEmail ? t.modal.copiedEmail : t.modal.copyEmail}</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#B93434] text-white font-display text-sm tracking-widest uppercase hover:bg-[#a12929] transition-colors"
              >
                {t.modal.returnBtn}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Header */}
            <div>
              <div className="font-mono text-xs text-[#B93434] tracking-[0.3em] uppercase mb-2">
                {t.modal.badge}
              </div>
              <h2 className="font-display text-4xl sm:text-6xl font-black text-[#F1F1F1] tracking-tight uppercase leading-[0.9]">
                {t.modal.title}
              </h2>
              <p className="font-sans text-sm text-[#8C8C8C] mt-3">
                {t.modal.subtitle}{' '}
                <button
                  type="button"
                  onClick={copyEmailToClipboard}
                  className="text-[#F1F1F1] underline hover:text-[#B93434] transition-colors"
                >
                  oussamamazroui49@gmail.com
                </button>
              </p>

              {/* Instant WhatsApp Alternative */}
              <div className="mt-4 p-3 bg-[#181818] border border-[#25D366]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
                    <MessageCircle className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-mono text-xs text-[#F1F1F1]">
                    {t.modal.instantChatPrompt}
                  </span>
                </div>
                <a
                  href={`https://wa.me/212653636981?text=${encodeURIComponent(isFr ? "Bonjour Oussama, je vous contacte depuis votre formulaire pour discuter d'un nouveau projet." : "Hi Oussama, I'm reaching out from your portfolio contact form to discuss a new project collaboration.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-[#0A0A0A] font-mono text-xs font-bold tracking-wider text-center flex items-center justify-center space-x-1 transition-colors"
                >
                  <span>{t.modal.chatOnWhatsApp}</span>
                </a>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-[10px] text-[#8C8C8C] uppercase tracking-widest mb-2">
                    {t.modal.nameLabel}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Karim Bennani"
                    className="w-full bg-[#141414] border border-white/15 px-4 py-3 text-sm text-[#F1F1F1] focus:border-[#B93434] focus:outline-none transition-colors"
                  />
                  {errors.name && <p className="font-mono text-[10px] text-[#B93434] mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-[#8C8C8C] uppercase tracking-widest mb-2">
                    {t.modal.emailLabel}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full bg-[#141414] border border-white/15 px-4 py-3 text-sm text-[#F1F1F1] focus:border-[#B93434] focus:outline-none transition-colors"
                  />
                  {errors.email && <p className="font-mono text-[10px] text-[#B93434] mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="block font-mono text-[10px] text-[#8C8C8C] uppercase tracking-widest mb-2">
                  {t.modal.companyLabel}
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Maison Casablanca"
                  className="w-full bg-[#141414] border border-white/15 px-4 py-3 text-sm text-[#F1F1F1] focus:border-[#B93434] focus:outline-none transition-colors"
                />
              </div>

              {/* Project Type Multi-select */}
              <div>
                <label className="block font-mono text-[10px] text-[#8C8C8C] uppercase tracking-widest mb-3">
                  {t.modal.typeLabel}
                </label>
                <div className="flex flex-wrap gap-2">
                  {projectTypeOptions.map((type) => {
                    const isSelected = formData.projectTypes.includes(type);
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => toggleProjectType(type)}
                        className={`font-mono text-xs px-3.5 py-2 border transition-all duration-200 uppercase tracking-widest ${
                          isSelected
                            ? 'bg-[#B93434] border-[#B93434] text-white'
                            : 'bg-[#141414] border-white/15 text-[#8C8C8C] hover:border-white/40 hover:text-[#F1F1F1]'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
                {errors.projectTypes && (
                  <p className="font-mono text-[10px] text-[#B93434] mt-1.5">{errors.projectTypes}</p>
                )}
              </div>

              {/* Budget Range */}
              <div>
                <label className="block font-mono text-[10px] text-[#8C8C8C] uppercase tracking-widest mb-3">
                  {t.modal.budgetLabel}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {budgetOptions.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setFormData({ ...formData, budget: b })}
                      className={`font-mono text-xs py-2 px-3 border text-center transition-all ${
                        formData.budget === b
                          ? 'border-[#B93434] bg-[#B93434]/15 text-[#F1F1F1]'
                          : 'border-white/10 bg-[#141414] text-[#8C8C8C] hover:border-white/30'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block font-mono text-[10px] text-[#8C8C8C] uppercase tracking-widest mb-2">
                  {t.modal.messageLabel}
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={isFr ? "Décrivez votre vision, délais, audience cible et livrables clés..." : "Describe your vision, timeline, target audience, and key deliverables..."}
                  className="w-full bg-[#141414] border border-white/15 px-4 py-3 text-sm text-[#F1F1F1] focus:border-[#B93434] focus:outline-none transition-colors"
                />
                {errors.message && <p className="font-mono text-[10px] text-[#B93434] mt-1">{errors.message}</p>}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                onMouseEnter={() => setCursor('pointer')}
                onMouseLeave={resetCursor}
                className="w-full py-4 bg-[#B93434] hover:bg-[#a12929] text-white font-display text-base tracking-[0.2em] uppercase transition-colors flex items-center justify-center space-x-2 group shadow-[0_0_30px_rgba(185,52,52,0.3)]"
              >
                <span>{t.modal.submitBtn}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
