import { ProcessStep } from "../types/project";
import { Language } from "../locales/translations";

export const getProcessSteps = (lang: Language = "en"): ProcessStep[] => {
  const isFr = lang === "fr";
  return [
    {
      number: "01",
      title: isFr ? "DÉCOUVERTE" : "DISCOVER",
      subtitle: isFr
        ? "Comprendre la marque, l'audience et l'objectif commercial."
        : "Understanding the brand, audience and objective.",
      description: isFr
        ? "Tout projet cinématographique débute par un alignement stratégique profond. Nous analysons le marché, définissons les cibles prioritaires et identifions l'angle narratif unique."
        : "Every cinematic project begins with deep strategic alignment. We analyze the market landscape, unpack core business objectives, define the target persona, and pinpoint what makes the story uniquely compelling.",
      details: isFr
        ? [
            "Audit d'Archétype & Positionnement de Marque",
            "Psychologie d'Audience & Facteurs de Rétention",
            "Définition des Objectifs Commerciaux (Notoriété vs. Conversion)",
            "Cahier des Charges Technique & Plateformes"
          ]
        : [
            "Brand Archetype & Positioning Audit",
            "Audience Psychology & Retention Drivers",
            "Commercial Objective Setting (Attention vs. Conversion)",
            "Technical Format & Platform Requirements"
          ]
    },
    {
      number: "02",
      title: isFr ? "CONCEPTION" : "CONCEPT",
      subtitle: isFr
        ? "Transformer la stratégie en une vision visuelle forte."
        : "Turning strategy into a visual direction.",
      description: isFr
        ? "Traduction de la stratégie en intentions artistiques concrètes : moodboards visuels, scénarisation, intentions de rythme et découpage technique avant d'allumer la caméra."
        : "Transforming abstract strategy into concrete creative treatments. We craft visual moodboards, script outlines, pacing guides, and camera blocking notes to establish the aesthetic tone before touching a camera.",
      details: isFr
        ? [
            "Note d'Intention Créative & Vision Réalisateur",
            "Scénario, Voix-Off & Structure Narrative",
            "Moodboards Visuels & Palettes de Couleur",
            "Storyboards & Formulation du Découpage Technique"
          ]
        : [
            "Creative Treatments & Director's Vision",
            "Scripting, Voiceover & Narrative Architecture",
            "Visual References, Color Palettes & Moodboards",
            "Storyboard & Shot List Formulation"
          ]
    },
    {
      number: "03",
      title: isFr ? "PRODUCTION" : "PRODUCE",
      subtitle: isFr
        ? "Tournage, réalisation, montage et étalonnage de précision."
        : "Shooting, directing, editing and designing.",
      description: isFr
        ? "Exécution avec une exigence artisanale totale. Du plateau de tournage et de la direction d'acteurs jusqu'au montage, à l'étalonnage et au design sonore sur mesure."
        : "Execution with meticulous attention to craft. From on-set cinematography and lighting direction through editorial assembly, color grading, and custom sound design, every frame is engineered for maximum visual impact.",
      details: isFr
        ? [
            "Direction de Tournage & Cinématographie",
            "Création Lumière & Esthétique Anamorphique",
            "Montage Vidéo Précis & Architecture du Rythme",
            "Étalonnage DaVinci Resolve & Mastering Audio"
          ]
        : [
            "On-Location Direction & Cinematography",
            "Lighting Design & Anamorphic Aesthetics",
            "Precision Video Editing & Pacing Assembly",
            "DaVinci Resolve Color Grading & Sound Mastering"
          ]
    },
    {
      number: "04",
      title: isFr ? "AMPLIFICATION" : "AMPLIFY",
      subtitle: isFr
        ? "Diffuser le contenu auprès de l'audience idéale avec impact."
        : "Using content, media and distribution to reach the right audience.",
      description: isFr
        ? "Un contenu visuel d'exception nécessite une diffusion millimétrée. Nous livrons des déclinaisons multi-formats et structurons des campagnes d'acquisition payante pour maximiser le ROI."
        : "Great visual content is ineffective without strategic distribution. We prepare multi-format variations, implement paid media campaign architectures, and monitor viewer engagement to maximize ROI.",
      details: isFr
        ? [
            "Exports Déclinés Spécifiques aux Réseaux (16:9, 9:16, 1:1)",
            "Architecture & Ciblage de Campagnes Média Payantes",
            "Optimisation des Accroches & Miniatures",
            "Mesure des Performances & Itérations Stratégiques"
          ]
        : [
            "Platform-Specific Aspect Exports (16:9, 9:16, 1:1)",
            "Paid Media Campaign Targeting Architecture",
            "Hooks & Thumbnail Optimization Matrices",
            "Performance Attribution & Strategic Iterations"
          ]
    }
  ];
};

export const processSteps = getProcessSteps("en");
