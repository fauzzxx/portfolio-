export type WallpaperType =
  | 'svg-bloom-dark'
  | 'svg-bloom-light'
  | 'svg-flow'
  | 'svg-aurora'
  | 'svg-azure'
  | 'svg-minimal'
  | 'image';

export interface WallpaperItem {
  id: string;
  name: string;
  category: 'windows11' | 'landscapes' | 'abstract' | 'personal';
  type: WallpaperType;
  imageUrl?: string;
  previewBg: string;
  theme: 'dark' | 'light';
  description?: string;
}

export const WALLPAPER_COLLECTION: WallpaperItem[] = [
  {
    id: 'win11-bloom-dark',
    name: 'Windows 11 Bloom (Dark)',
    category: 'windows11',
    type: 'svg-bloom-dark',
    previewBg: 'bg-gradient-to-br from-[#0a1128] via-[#0078d4] to-[#080d1e]',
    theme: 'dark',
    description: 'Iconic dark abstract petals with azure center illumination',
  },
  {
    id: 'win11-bloom-light',
    name: 'Windows 11 Bloom (Light)',
    category: 'windows11',
    type: 'svg-bloom-light',
    previewBg: 'bg-gradient-to-br from-[#e0ecf8] via-[#a8cbf5] to-[#cfe2fe]',
    theme: 'light',
    description: 'Soft crisp daylight petal bloom with sky blue gradient',
  },
  {
    id: 'win11-flow',
    name: 'Windows 11 Flow (Dawn)',
    category: 'windows11',
    type: 'svg-flow',
    previewBg: 'bg-gradient-to-br from-[#1a1c2e] via-[#3a2f5b] to-[#121426]',
    theme: 'dark',
    description: 'Harmonious magenta-violet waves flowing across twilight',
  },
  {
    id: 'abstract-aurora',
    name: 'Emerald Aurora',
    category: 'abstract',
    type: 'svg-aurora',
    previewBg: 'bg-gradient-to-br from-[#071a1c] via-[#0d4738] to-[#050f14]',
    theme: 'dark',
    description: 'Soft undulating aurora ribbons inspired by northern lights',
  },
  {
    id: 'abstract-azure',
    name: 'Azure Horizon',
    category: 'abstract',
    type: 'svg-azure',
    previewBg: 'bg-gradient-to-br from-[#0b192e] via-[#104273] to-[#091122]',
    theme: 'dark',
    description: 'Deep indigo architecture with horizontal soft light beams',
  },
  {
    id: 'minimal-carbon',
    name: 'Minimal Midnight',
    category: 'abstract',
    type: 'svg-minimal',
    previewBg: 'bg-gradient-to-br from-[#121212] via-[#1e1e1e] to-[#0d0d0d]',
    theme: 'dark',
    description: 'Subtle slate radial glow for distraction-free focus',
  },
];

export const DEFAULT_WALLPAPER_ID = 'win11-bloom-dark';
