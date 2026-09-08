export type AppId =
  | 'projects'
  | 'ai-lab'
  | 'resume'
  | 'experience'
  | 'achievements'
  | 'skills'
  | 'about'
  | 'readme'
  | 'media'
  | 'terminal'
  | 'settings'
  | 'contact';

export interface AppMetadata {
  id: AppId;
  title: string;
  shortTitle?: string;
  icon: string; // Lucide icon name or component identifier
  category: 'core' | 'intelligence' | 'system' | 'profile';
  description: string;
  defaultWidth?: number;
  defaultHeight?: number;
  featured?: boolean;
}

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowState {
  id: string; // usually same as appId or unique instance id
  appId: AppId;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: WindowPosition;
  size: WindowSize;
}

export type SystemStatusState = 'online' | 'ready' | 'standby' | 'busy';

export interface SystemStatusIndicator {
  label: string;
  status: SystemStatusState;
  code: string;
}

export type OSMode = 'explore' | 'guided';

export interface OSSettings {
  theme: 'dark' | 'light' | 'system';
  mode: OSMode;
  audio: {
    narration: boolean;
    bgMusic: boolean;
    sfx: boolean;
  };
  accessibility: {
    reducedMotion: boolean;
    captions: boolean;
  };
}
