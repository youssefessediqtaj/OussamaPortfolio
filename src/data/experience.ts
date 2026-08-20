import { ExperienceItem } from "../types/project";
import { Language } from "../locales/translations";

export const getExperiences = (lang: Language = "en"): ExperienceItem[] => {
  const isFr = lang === "fr";
  return [
    {
      id: "capteur-production",
      role: isFr ? "EX COFONDATEUR & CMO" : "EX CO-FOUNDER & CMO",
      company: "CAPTEUR PRODUCTION",
      period: isFr ? "NOV 2023 — MAI 2026" : "NOV 2023 — MAY 2026",
      location: isFr ? "CASABLANCA, MAROC" : "CASABLANCA, MOROCCO",
      description: isFr
        ? "Créer le pont entre art cinématographique et résultats business."
        : "Building the bridge between cinematic art and business results.",
      responsibilities: isFr
        ? [
            "Cofondation et développement de l'agence créative, pilotage des ventes et de la relation client premium.",
            "Conception de modèles d'abonnements vidéo récurrents générant un revenu prévisible et une forte valeur de marque.",
            "Production de contenus vidéo de niveau cinéma, direction de tournages, gestion lumière et post-production.",
            "Direction artistique globale et intégration complète entre exécution créative et acquisition média axée sur la donnée."
          ]
        : [
            "Co-founded and scaled the creative production agency, managing sales pipelines and high-tier client relationships.",
            "Developed recurring content subscription models that generated predictable revenue and long-term brand equity.",
            "Produced cinema-grade video content, directing on-set shoots, lighting setups, and post-production workflows.",
            "Oversaw visual branding systems and established end-to-end integration between creative execution and data-driven media buying."
          ],
      tags: isFr
        ? [
            "Production Exécutive",
            "Croissance d'Agence & CMO",
            "Direction de Tournage",
            "Intégration Média Buying",
            "Abonnements Contenu"
          ]
        : [
            "Executive Production",
            "Agency Growth & CMO",
            "Directing Shoots",
            "Media Buying Integration",
            "Content Subscriptions"
          ]
    },
    {
      id: "freelance-creative",
      role: isFr ? "MONTEUR VIDÉO & GRAPHISTE" : "VIDEO EDITOR & GRAPHIC DESIGNER",
      company: "FREELANCE",
      period: isFr ? "SEP 2022 — OCT 2023" : "SEP 2022 — OCT 2023",
      location: isFr ? "À DISTANCE / INTERNATIONAL" : "REMOTE / INTERNATIONAL",
      description: isFr
        ? "Réalisation de montages vidéo, étalonnages couleur, motion design, identités visuelles et assets digitaux pour des clients internationaux."
        : "Delivered video editing, color grading, motion graphics, graphic design, visual identity, and digital assets for international clients while managing remote collaboration and project delivery.",
      responsibilities: isFr
        ? [
            "Montage vidéo rythmique, découpage et design sonore pour campagnes publicitaires et digitales internationales.",
            "Étalonnages chromatiques sur mesure dans DaVinci Resolve adaptés aux normes de diffusion web et broadcast.",
            "Création de chartes graphiques, animations motion design et identités visuelles de marque.",
            "Gestion directe de la communication client, respect des délais stricts et exports de masters multi-formats."
          ]
        : [
            "Provided post-production editing, rhythm pacing, and sound design for global commercial and digital campaigns.",
            "Engineered bespoke color grading passes in DaVinci Resolve tailored for diverse digital and broadcast specifications.",
            "Designed visual identity packages, motion assets, and digital guidelines for forward-thinking brand partners.",
            "Managed direct client communication, tight delivery turnaround schedules, and multi-format master exports."
          ],
      tags: isFr
        ? [
            "Montage Vidéo",
            "Étalonnage Couleur",
            "Motion Design",
            "Identité Visuelle",
            "Collaboration Internationale"
          ]
        : [
            "Video Editing",
            "Color Grading",
            "Motion Graphics",
            "Visual Identity",
            "Remote Collaboration"
          ]
    }
  ];
};

export const experiences = getExperiences("en");
