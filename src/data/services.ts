import { Service } from "../types/project";
import { Language } from "../locales/translations";

export const getServices = (lang: Language = "en"): Service[] => {
  const isFr = lang === "fr";
  return [
    {
      id: "video-production",
      number: "01",
      title: isFr ? "PRODUCTION VIDÉO" : "VIDEO PRODUCTION",
      tagline: isFr
        ? "Films publicitaires, vidéos de marque et récits documentaires haut de gamme."
        : "High-end commercials, brand films & documentary narratives.",
      description: isFr
        ? "Gestion intégrale du cycle de production : scénarisation, casting, direction de tournage et cinématographie de niveau cinéma."
        : "Full-cycle production management from treatment and scripting through casting, on-set direction, and cinematography. Built with cinema-grade standards tailored to make an indelible impression.",
      deliverables: isFr
        ? [
            "Films de Marque & Spots Publicitaires",
            "Direction & Tournage sur le Terrain",
            "Direction Photo & Cadrage Caméra",
            "Logistique de Production & Équipe Technique"
          ]
        : [
            "Brand Films & Commercials",
            "On-Location Directing & Shooting",
            "Lighting & Camera Direction",
            "Production Logistics & Crew Management"
          ]
    },
    {
      id: "creative-direction",
      number: "02",
      title: isFr ? "DIRECTION ARTISTIQUE" : "CREATIVE DIRECTION",
      tagline: isFr
        ? "Traduire la stratégie de marque en langage visuel iconique."
        : "Translating brand strategy into iconic visual language.",
      description: isFr
        ? "Développement de concepts visuels cohérents, moodboards et récits artistiques qui positionnent la marque au sommet."
        : "Developing cohesive visual concepts, moodboards, creative treatments, and narrative frameworks that elevate brand perception and differentiate offerings in competitive markets.",
      deliverables: isFr
        ? [
            "Traitements Visuels & Storyboards",
            "Développement de Concept & Scénarisation",
            "Ton de Marque & Systèmes Esthétiques",
            "Direction Artistique & Guides de Style"
          ]
        : [
            "Visual Treatments & Storyboards",
            "Concept Development & Scriptwriting",
            "Brand Tone & Aesthetic Systems",
            "Art Direction & Styling Guides"
          ]
    },
    {
      id: "video-editing",
      number: "03",
      title: isFr ? "MONTAGE VIDÉO" : "VIDEO EDITING",
      tagline: isFr
        ? "Rythme, cadence et résonance émotionnelle en post-production."
        : "Rhythm, pacing, and emotional resonance in post-production.",
      description: isFr
        ? "Conception de récits qui captivent le spectateur image par image, alliant fluidité narrative et clarté stratégique."
        : "Crafting narratives that hold viewer attention frame by frame. Seamlessly assembling footage, dialogue, and pacing to serve the strategic goal of the project.",
      deliverables: isFr
        ? [
            "Dérushage & Montage Éditorial",
            "Design Sonore & Mixage Audio",
            "Architecture du Rythme & Cadence",
            "Déclinaisons Multi-Formats (16:9, 9:16, 1:1)"
          ]
        : [
            "Editorial Cutting & Assembly",
            "Sound Design & Audio Mixing",
            "Pacing & Narrative Architecture",
            "Multi-Format Re-cutting (16:9, 9:16, 1:1)"
          ]
    },
    {
      id: "color-grading",
      number: "04",
      title: isFr ? "ÉTALONNAGE COULEUR" : "COLOR GRADING",
      tagline: isFr
        ? "Science de la couleur cinématographique créant une atmosphère unique."
        : "Cinematic color science that creates palpable atmosphere.",
      description: isFr
        ? "Création de LUTs sur mesure, émulation pellicule 16mm/35mm et harmonisation chromatique pour une texture cinéma inimitable."
        : "Custom LUT generation, film emulation (16mm/35mm), and precise color matching to give footage an unmistakable cinematic identity and emotional depth.",
      deliverables: isFr
        ? [
            "Science de la Couleur DaVinci Resolve",
            "Émulation Pellicule & Textures Grain",
            "Harmonisation des Plans & Teintes de Peau",
            "Masters HDR & SDR"
          ]
        : [
            "DaVinci Resolve Color Science",
            "Film Emulation & Grain Texturing",
            "Shot Matching & Skin Tone Recovery",
            "HDR & SDR Master Deliveries"
          ]
    },
    {
      id: "motion-design",
      number: "05",
      title: isFr ? "MOTION DESIGN" : "MOTION DESIGN",
      tagline: isFr
        ? "Typographie cinétique, incrustations techniques et titres dynamiques."
        : "Kinetic typography, technical overlays & dynamic titles.",
      description: isFr
        ? "Animations graphiques subtiles et percutantes au service de l'histoire : génériques, animations d'interface et habillages visuels."
        : "Subtle, purposeful motion design that enhances storytelling without feeling distracting. Title sequences, UI animations, technical HUD elements, and brand packaging.",
      deliverables: isFr
        ? [
            "Séquences de Titres Cinématographiques",
            "Typographie Cinétique Éditoriale",
            "Habillages & Éléments Techniques HUD",
            "Animation d'Identité Visuelle"
          ]
        : [
            "Cinematic Title Sequences",
            "Kinetic Editorial Typography",
            "Lower Thirds & Technical Overlays",
            "Visual Identity Animation"
          ]
    },
    {
      id: "content-strategy",
      number: "06",
      title: isFr ? "STRATÉGIE DE CONTENU" : "CONTENT STRATEGY",
      tagline: isFr
        ? "Bâtir des moteurs de contenu récurrents à haute utilité commerciale."
        : "Building recurring content engines with commercial utility.",
      description: isFr
        ? "Structuration d'architectures de contenus et de modèles d'abonnement transformant la production vidéo en levier de croissance continue."
        : "Designing structured content architectures and subscription-model pipelines that turn one-off video production into ongoing business growth engines.",
      deliverables: isFr
        ? [
            "Piliers & Architecture de Contenu",
            "Formats Vidéo Récurrents",
            "Plans de Diffusion Spécifiques aux Plateformes",
            "Frameworks de Déclinaison de Contenus"
          ]
        : [
            "Content Architecture & Pillars",
            "Recurring Content Formats",
            "Platform-Specific Distribution Plans",
            "Asset Repurposing Frameworks"
          ]
    },
    {
      id: "media-buying",
      number: "07",
      title: isFr ? "ACHAT MÉDIA & PERFORMANCE" : "MEDIA BUYING",
      tagline: isFr
        ? "Connecter la création haut de gamme avec la performance data-driven."
        : "Connecting high-value creative with data-driven performance.",
      description: isFr
        ? "Pilotage de campagnes publicitaires où l'excellence créative rencontre le ciblage quantitatif pour maximiser le retour sur investissement."
        : "Directing paid media campaigns where creative execution meets quantitative targeting. Ensuring high-production assets reach decision-makers and drive concrete actions.",
      deliverables: isFr
        ? [
            "Stratégie & Architecture de Campagnes Payantes",
            "Matrices de Tests Créatifs & Itérations",
            "Segmentation d'Audience & Ciblage",
            "Attribution des Performances & Analyse ROI"
          ]
        : [
            "Paid Campaign Strategy & Architecture",
            "Creative Testing & Iteration Matrices",
            "Audience Segmentation & Targeting",
            "Performance Attribution & ROI Analysis"
          ]
    },
    {
      id: "brand-visuals",
      number: "08",
      title: isFr ? "IMAGE & IDENTITÉ DE MARQUE" : "BRAND VISUALS",
      tagline: isFr
        ? "Identités visuelles complètes pour marques tournées vers le futur."
        : "Complete visual identities for digital-first enterprises.",
      description: isFr
        ? "Photographie éditoriale, systèmes typographiques, chartes graphiques et kits digitaux assurant une présence premium incontestable."
        : "Editorial photography, typography systems, graphic assets, and digital guidelines that give brands an uncompromisingly premium aesthetic.",
      deliverables: isFr
        ? [
            "Plans Fixes Éditoriaux & Direction Photo",
            "Kits d'Assets Digitaux & Chartes Réseaux Sociaux",
            "Visuels Clés & Affiches de Campagne",
            "Supports de Marque & Direction Visuelle"
          ]
        : [
            "Editorial Stills & Photography Direction",
            "Digital Asset Kits & Social Guidelines",
            "Key Visuals & Poster Art",
            "Brand Collateral Direction"
          ]
    }
  ];
};

export const services = getServices("en");
