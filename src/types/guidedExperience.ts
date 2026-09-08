import type { AppId } from './os';

export interface GuidedChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  storyPhase: 'origin' | 'intelligence' | 'products' | 'experiments' | 'experience' | 'closing';
  narrationText: string;
  associatedAppId?: AppId;
  projectId?: string;
  durationSeconds: number; // default autoplay duration
  videoUrl?: string;
  audioUrl?: string;
  keyPoints?: string[];
}
