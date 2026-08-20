import { Project } from "../types/project";
import { Language } from "../locales/translations";

export const getProjects = (lang: Language = "en"): Project[] => {
  const isFr = lang === "fr";
  return [
    {
      id: "capteur-visions",
      number: "01",
      title: "CAPTEUR VISIONS",
      subtitle: isFr
        ? "Film de Marque Cinématographique & Identité Visuelle"
        : "Cinematic Brand Film & Visual Identity",
      category: isFr ? "FILM / PUBLICITÉ" : "FILM / COMMERCIAL",
      year: "2025",
      role: isFr ? "Producteur Créatif & Réalisateur" : "Creative Producer & Director",
      description: isFr
        ? "Une production publicitaire à fort contraste alliant cinématographie soignée et positionnement de marque à fort impact."
        : "A high-contrast commercial production combining cinematic cinematography with high-impact brand positioning.",
      type: "video",
      video: "/videos/project-01.mp4",
      poster: "/images/on-set-directing.jpg",
      aspectRatio: "16/9",
      layoutType: "right",
      services: isFr
        ? [
            "Direction Artistique",
            "Production Exécutive",
            "Cinématographie",
            "Montage & Étalonnage Couleur"
          ]
        : [
            "Creative Direction",
            "Executive Production",
            "Cinematography",
            "Editing & Color Grading"
          ],
      approach: isFr
        ? "Développement d'une esthétique visuelle affirmée axée sur un éclairage percutant, un rythme maîtrisé et un design sonore immersif pour démarquer la marque sur un marché saturé."
        : "Developed an uncompromising visual aesthetic centered around bold lighting, deliberate pacing, and crisp sound design. The objective was to create an elevated brand presence that commands attention in a saturated digital landscape.",
      result: isFr
        ? "Création d'une référence de storytelling digital pour la marque et déploiement multi-canal sur formats digitaux et événementiels."
        : "Established a benchmark for the brand's premium digital storytelling and spearheaded multi-channel rollout across digital and experiential formats.",
      stills: [
        "/images/on-set-directing.jpg",
        "/images/camera-slider.jpg",
        "/images/press-conference.jpg"
      ]
    },
    {
      id: "nocturne",
      number: "02",
      title: "NOCTURNE",
      subtitle: isFr
        ? "Campagne Éditoriale de Luxe & Motion"
        : "Luxury Editorial & Motion Campaign",
      category: isFr ? "ÉDITORIAL / MODE" : "EDITORIAL / FASHION",
      year: "2024",
      role: isFr ? "Monteur Vidéo & Étalonneur" : "Video Editor & Colorist",
      description: isFr
        ? "Un récit visuel évocateur explorant des atmosphères nocturnes à travers un étalonnage riche et un découpage rythmique."
        : "An evocative visual narrative exploring nocturnal atmospheres through rich color grading and rhythmic editorial cutting.",
      type: "video",
      video: "/videos/project-02.mp4",
      poster: "/images/press-conference.jpg",
      aspectRatio: "2.39/1",
      layoutType: "left",
      services: isFr
        ? [
            "Post-Production",
            "Étalonnage Couleur",
            "Design Sonore",
            "Adaptation Multi-Formats"
          ]
        : [
            "Post-Production",
            "Color Grading",
            "Sound Design",
            "Format Adaptation"
          ],
      approach: isFr
        ? "Application de LUTs d'émulation argentique 16mm sur mesure, récupération des ombres et techniques de montage cinétique pour amplifier l'ambiance sans perdre en élégance éditoriale."
        : "Applied custom 16mm film emulation LUTs, high-contrast shadow recovery, and kinetic montage techniques to amplify the mood without sacrificing editorial elegance.",
      result: isFr
        ? "Livraison des masters cinématographiques ainsi que des déclinaisons verticales taillées pour la diffusion payante."
        : "Delivered primary theatrical cuts alongside high-engagement vertical cuts tailored for paid digital distribution.",
      stills: [
        "/images/press-conference.jpg",
        "/images/studio-portrait.jpg"
      ]
    },
    {
      id: "atelier-casablanca",
      number: "03",
      title: "ATELIER CASABLANCA",
      subtitle: isFr
        ? "Portrait d'Artisanat & Stratégie Digitale"
        : "Portrait of Craft & Digital Strategy",
      category: isFr ? "DOCUMENTAIRE / MARQUE" : "DOCUMENTARY / BRAND",
      year: "2025",
      role: isFr ? "Producteur Créatif & Stratège Média" : "Creative Producer & Media Strategist",
      description: isFr
        ? "Documentaire intimiste mettant en valeur l'artisanat d'art moderne au Maroc, couplé à une stratégie de distribution ciblée."
        : "A portrait documentary detailing modern artisanal craftsmanship in Morocco, paired with targeted digital distribution strategy.",
      type: "video",
      video: "/videos/project-03.mp4",
      poster: "/images/studio-portrait.jpg",
      aspectRatio: "9/16",
      layoutType: "portrait",
      services: isFr
        ? [
            "Réalisation Documentaire",
            "Mise en Scène d'Interview",
            "Architecture de Contenu",
            "Stratégie Média Buying"
          ]
        : [
            "Documentary Direction",
            "Interview Staging",
            "Content Architecture",
            "Media Buying Strategy"
          ],
      approach: isFr
        ? "Captation des gestes artisanaux avec un cadrage fluide à l'épaule et une lumière naturelle, connectant le patrimoine culturel avec une audience digitale contemporaine."
        : "Captured intimate behind-the-scenes artisanal workflows with organic handheld framing and natural lighting, connecting the heritage of craft with contemporary digital audiences.",
      result: isFr
        ? "Taux de rétention exceptionnel et pièce maîtresse d'une campagne publicitaire multi-niveaux ultra performante."
        : "Generated high organic watch time and served as the anchor piece for a targeted multi-tier digital advertising campaign.",
      stills: [
        "/images/studio-portrait.jpg",
        "/images/portrait.jpg"
      ]
    },
    {
      id: "horizon-protocol",
      number: "04",
      title: "HORIZON PROTOCOL",
      subtitle: isFr
        ? "Envergure, Structure & Média Stratégique"
        : "Scale, Structure & Strategic Media",
      category: isFr ? "PUBLICITÉ / CAMPAGNE" : "COMMERCIAL / CAMPAIGN",
      year: "2026",
      role: isFr ? "Producteur Créatif" : "Creative Producer",
      description: isFr
        ? "Production commerciale grand format reliant dimension architecturale et storytelling d'entreprise percutant."
        : "A wide-format commercial production linking architectural scale with high-impact corporate storytelling.",
      type: "video",
      video: "/videos/project-04.mp4",
      poster: "/images/camera-slider.jpg",
      aspectRatio: "16/9",
      layoutType: "fullwidth",
      services: isFr
        ? [
            "Production de Bout en Bout",
            "Motion Design",
            "Mastering Audio",
            "Stratégie de Diffusion"
          ]
        : [
            "End-to-End Production",
            "Motion Design",
            "Sound Mastering",
            "Distribution Strategy"
          ],
      approach: isFr
        ? "Construction d'une expérience cinématographique au format scope 2.39:1 mettant l'accent sur la géométrie spatiale et une cadence narrative affirmée."
        : "Constructed an immersive 2.39:1 scope experience focusing on spatial geometry, technical clarity, and authoritative pacing.",
      result: isFr
        ? "Présentation inaugurale lors de la convention annuelle investisseurs et déclinaisons courtes pour l'acquisition B2B."
        : "Premiered at flagship investor presentation and repurposed into targeted bite-sized assets for B2B media buying.",
      stills: [
        "/images/camera-slider.jpg",
        "/images/on-set-directing.jpg"
      ]
    },
    {
      id: "ittar",
      number: "05",
      title: "ITTAR",
      subtitle: isFr ? "Court-Métrage Cinématographique" : "Cinematic Short Film",
      category: isFr ? "CINÉMA / FICTION" : "FILM / FICTION",
      year: "2024",
      role: isFr ? "Co-Réalisateur" : "Co-Director",
      description: isFr
        ? "Un court-métrage sensoriel tissant identité, mémoire et fragrance dans une expérience visuelle contemplative. Co-réalisé avec une vision artistique affirmée sur le rythme et la mise en scène."
        : "A sensory cinematic short film weaving identity, memory, and fragrance into a contemplative visual experience. Co-directed with full creative ownership over aesthetic, blocking, and narrative rhythm.",
      type: "youtube",
      video: "https://www.youtube.com/watch?v=EQqEEuDpzfg",
      poster: "/images/ittar-thumbnail.jpeg",
      aspectRatio: "16/9",
      layoutType: "right",
      services: isFr
        ? [
            "Co-Réalisation",
            "Vision Artistique",
            "Structure Narrative",
            "Direction de Tournage"
          ]
        : [
            "Co-Direction",
            "Creative Vision",
            "Narrative Structure",
            "On-Set Leadership"
          ],
      approach: isFr
        ? "Élaboration d'un langage visuel lent et évocateur inspiré par la mémoire olfactive, créant l'émotion par le cadrage et la texture des plans."
        : "Crafted a slow, deliberate visual language inspired by olfactory memory — building tension through stillness, texture, and precise framing choices that place the audience inside the sensation.",
      result: isFr
        ? "Sélection en festivals indépendants et véritable démonstration de la vision directoriale d'Oussama."
        : "Selected for independent festival circuit and serves as a benchmark for Oussama's directorial voice and artistic range.",
      stills: [
        "/images/ittar-thumbnail.jpeg",
        "/images/on-set-directing.jpg"
      ]
    },
    {
      id: "dua",
      number: "06",
      title: "DUA",
      subtitle: isFr ? "Clip Musical — 1er Assistant Caméra" : "Music Video — 1st Assistant Camera",
      category: isFr ? "CLIP MUSICAL / PRODUCTION" : "MUSIC VIDEO / PRODUCTION",
      year: "2023",
      role: isFr ? "1er Assistant Caméra (1st AC)" : "1st Assistant Camera",
      description: isFr
        ? "Clip musical exigeant une gestion optique précise, un pointage fluide sur des mouvements dynamiques et une collaboration étroite avec le chef opérateur."
        : "High-production music video demanding precision optics management, focus pulling under dynamic movement, and seamless collaboration with the director of photography to deliver a technically immaculate image.",
      type: "youtube",
      video: "https://www.youtube.com/watch?v=EBjakBI-khQ",
      poster: "/images/Dua-thumbnail.jpeg",
      aspectRatio: "16/9",
      layoutType: "left",
      services: isFr
        ? [
            "1er Assistant Caméra",
            "Pointage Focus Pulling",
            "Gestion des Objectifs & Optiques",
            "Coordination Équipe Caméra"
          ]
        : [
            "1st Assistant Camera",
            "Focus Pulling",
            "Lens & Optics Management",
            "Camera Department Coordination"
          ],
      approach: isFr
        ? "Maintien d'un point net impeccable lors de chorégraphies et de plans rapides. Gestion en temps réel des changements d'optiques et de la configuration caméra."
        : "Maintained critical focus across complex choreography and fast-paced performance sequences. Managed all lens changes, camera prep, and real-time technical decisions on set.",
      result: isFr
        ? "Contribution à un rendu visuel haut de gamme répondant aux plus hauts standards de l'industrie musicale."
        : "Contributed to a polished, broadcast-ready final cut demonstrating deep camera craft and professional set etiquette at a high production level.",
      stills: [
        "/images/Dua-thumbnail.jpeg",
        "/images/press-conference.jpg"
      ]
    }
  ];
};

export const projects = getProjects("en");
