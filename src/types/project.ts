export type ProjectCategory =
  | 'web-development'
  | 'ai-automation'
  | 'app-development'
  | 'experiments';

export type ProjectTier = 1 | 2 | 3;

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  tagline?: string;
  description: string;
  shortDescription: string;
  capabilities: string[];
  techStack: string[];
  screenshots: string[];
  videos: string[];
  videoUrls?: string[];
  videoUrl?: string;
  audio?: string;
  audioUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  liveDemoUrl?: string;
  challenges: string[];
  outcomes: string[];
  lessons: string[];
  featured: boolean;
  tier: ProjectTier;
  dnaNodes?: { label: string; value: string }[];
  buildTrace?: { stage: string; description: string }[];
  demonstrates?: string[];
  motivation?: string;
}

