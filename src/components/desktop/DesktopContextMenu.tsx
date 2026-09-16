import React, { useEffect, useRef } from 'react';
import {
  RotateCcw,
  Sliders,
  Info,
  Sparkles,
  Clock,
  Compass,
  Image,
  Play,
} from 'lucide-react';
import type { AppId, WallpaperConfig } from '../../types/os';
import { WALLPAPER_COLLECTION } from '../../data/wallpapers';

interface DesktopContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onOpenApp: (appId: AppId) => void;
  onStartGuidedExperience: () => void;
  onRefresh: () => void;
  onOpenFocusMode?: () => void;
  onOpenExperienceSelector?: () => void;
  onStartPresentation?: () => void;
}

export const DesktopContextMenu: React.FC<DesktopContextMenuProps> = ({
  x,
  y,
  onClose,
  onOpenApp,
  onStartGuidedExperience,
  onRefresh,
  onOpenFocusMode,
  onOpenExperienceSelector,
  onStartPresentation,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Adjust position so it doesn't overflow the viewport
  const adjustedX = Math.min(x, window.innerWidth - 240);
  const adjustedY = Math.min(y, window.innerHeight - 340);

  const handleNextWallpaper = () => {
    try {
      const raw = localStorage.getItem('fauzaan_os_wallpaper_config');
      const current: WallpaperConfig = raw ? JSON.parse(raw) : { currentId: 'win11-bloom-dark', isSlideshow: false, slideshowInterval: 0, shuffle: false };
      const currentIndex = WALLPAPER_COLLECTION.findIndex((w) => w.id === current.currentId);
      const nextIndex = (currentIndex + 1) % WALLPAPER_COLLECTION.length;
      const updated: WallpaperConfig = { ...current, currentId: WALLPAPER_COLLECTION[nextIndex].id };
      localStorage.setItem('fauzaan_os_wallpaper_config', JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('fauzaan_wallpaper_changed', { detail: updated }));
    } catch {}
    onClose();
  };

  return (
    <div
      ref={menuRef}
      style={{ left: adjustedX, top: adjustedY }}
      className="fixed z-[90] w-56 rounded-xl bg-[#2b2b2b]/95 backdrop-blur-xl border border-white/10 shadow-win-flyout p-1.5 space-y-0.5 text-xs text-white select-none animate-in fade-in zoom-in-95 duration-100 font-sans"
    >
      <button
        onClick={() => {
          onRefresh();
          onClose();
        }}
        className="w-full flex items-center space-x-2.5 px-3 py-1.5 rounded-lg hover:bg-white/10 text-left transition-colors"
      >
        <RotateCcw className="w-4 h-4 text-white/70" />
        <span>Refresh</span>
      </button>

      {onStartPresentation && (
        <button
          onClick={() => {
            onStartPresentation();
            onClose();
          }}
          className="w-full flex items-center space-x-2.5 px-3 py-1.5 rounded-lg bg-[#0078d4]/15 hover:bg-[#0078d4]/25 text-[#60cdff] text-left transition-colors font-semibold"
        >
          <Play className="w-4 h-4 fill-[#60cdff]" />
          <span>Start Presentation (4-5 min)</span>
        </button>
      )}

      {onOpenFocusMode && (
        <button
          onClick={() => {
            onOpenFocusMode();
            onClose();
          }}
          className="w-full flex items-center space-x-2.5 px-3 py-1.5 rounded-lg hover:bg-white/10 text-left transition-colors"
        >
          <Clock className="w-4 h-4 text-[#60cdff]" />
          <span>Focus Mode (2m / 5m)...</span>
        </button>
      )}

      {onOpenExperienceSelector && (
        <button
          onClick={() => {
            onOpenExperienceSelector();
            onClose();
          }}
          className="w-full flex items-center space-x-2.5 px-3 py-1.5 rounded-lg hover:bg-white/10 text-left transition-colors"
        >
          <Compass className="w-4 h-4 text-[#f7b500]" />
          <span>Experience Mode...</span>
        </button>
      )}

      <button
        onClick={() => {
          onStartGuidedExperience();
          onClose();
        }}
        className="w-full flex items-center space-x-2.5 px-3 py-1.5 rounded-lg hover:bg-white/10 text-left transition-colors"
      >
        <Sparkles className="w-4 h-4 text-[#0078d4]" />
        <span>Start Guided Tour</span>
      </button>

      <div className="my-1 border-t border-white/10" />

      <button
        onClick={handleNextWallpaper}
        className="w-full flex items-center space-x-2.5 px-3 py-1.5 rounded-lg hover:bg-white/10 text-left transition-colors"
      >
        <Image className="w-4 h-4 text-white/70" />
        <span>Next Desktop Background</span>
      </button>

      <button
        onClick={() => {
          onOpenApp('settings');
          onClose();
        }}
        className="w-full flex items-center space-x-2.5 px-3 py-1.5 rounded-lg hover:bg-white/10 text-left transition-colors"
      >
        <Sliders className="w-4 h-4 text-white/70" />
        <span>Personalize</span>
      </button>

      <div className="my-1 border-t border-white/10" />

      <button
        onClick={() => {
          onOpenApp('about');
          onClose();
        }}
        className="w-full flex items-center space-x-2.5 px-3 py-1.5 rounded-lg hover:bg-white/10 text-left transition-colors"
      >
        <Info className="w-4 h-4 text-white/70" />
        <span>About FAUZAAN OS</span>
      </button>
    </div>
  );
};
