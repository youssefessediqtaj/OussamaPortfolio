export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  category: string;
  year: string;
  role: string;
  description: string;
  type: 'video' | 'editorial' | 'commercial' | 'documentary' | 'youtube' | 'vimeo';
  video?: string;
  externalVideoUrl?: string; // YouTube or Vimeo URL
  poster: string;
  aspectRatio?: '16/9' | '9/16' | '2.39/1' | '4/3' | '1/1';
  layoutType?: 'right' | 'left' | 'portrait' | 'fullwidth' | 'asymmetric';
  services: string[];
  approach?: string;
  result?: string;
  stills?: string[];
  metrics?: { label: string; value: string }[];
}

export interface Service {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  responsibilities: string[];
  tags: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
}
