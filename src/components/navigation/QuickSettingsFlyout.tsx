import React, { useEffect, useRef, useState } from 'react';
import {
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Mic,
  Sparkles,
  Image,
  Shuffle,
  Eye,
} from 'lucide-react';
import { WALLPAPER_COLLECTION } from '../../data/wallpapers';
import type { WallpaperConfig } from '../../types/os';

interface QuickSettingsFlyoutProps {
  onClose: () => void;
  onStartGuidedExperience: () => void;
}

export const QuickSettingsFlyout: React.FC<QuickSettingsFlyoutProps> = ({
  onClose,
  onStartGuidedExperience,
}) => {
  const flyoutRef = useRef<HTMLDivElement>(null);

  const [volume, setVolume] = useState(80);
  const [narrationEnabled, setNarrationEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isSlideshow, setIsSlideshow] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('fauzaan_os_wallpaper_config');
      if (raw) {
        const conf: WallpaperConfig = JSON.parse(raw);
        setIsSlideshow(Boolean(conf.isSlideshow));
      }
    } catch {}
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (flyoutRef.current && !flyoutRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleNextWallpaper = () => {
    try {
      const raw = localStorage.getItem('fauzaan_os_wallpaper_config');
      const current: WallpaperConfig = raw
        ? JSON.parse(raw)
        : { currentId: 'win11-bloom-dark', isSlideshow: false, slideshowInterval: 0, shuffle: false };
      const currentIndex = WALLPAPER_COLLECTION.findIndex((w) => w.id === current.currentId);
      const nextIndex = (currentIndex + 1) % WALLPAPER_COLLECTION.length;
      const updated: WallpaperConfig = { ...current, currentId: WALLPAPER_COLLECTION[nextIndex].id };
      localStorage.setItem('fauzaan_os_wallpaper_config', JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('fauzaan_wallpaper_changed', { detail: updated }));
    } catch {}
  };

  const handleToggleSlideshow = () => {
    try {
      const raw = localStorage.getItem('fauzaan_os_wallpaper_config');
      const current: WallpaperConfig = raw
        ? JSON.parse(raw)
        : { currentId: 'win11-bloom-dark', isSlideshow: false, slideshowInterval: 0, shuffle: false };
      const nextState = !isSlideshow;
      setIsSlideshow(nextState);
      const updated: WallpaperConfig = {
        ...current,
        isSlideshow: nextState,
        slideshowInterval: nextState ? 300 : 0,
      };
      localStorage.setItem('fauzaan_os_wallpaper_config', JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('fauzaan_wallpaper_changed', { detail: updated }));
    } catch {}
  };

  return (
    <div
      ref={flyoutRef}
      className="fixed bottom-14 right-16 z-[80] w-80 rounded-2xl bg-[#242424]/95 backdrop-blur-2xl border border-white/10 shadow-win-flyout p-4 text-white select-none space-y-3.5 font-sans animate-in fade-in slide-in-from-bottom-2 duration-150"
    >
      {/* Quick Action Tiles (2x3 Grid) */}
      <div className="grid grid-cols-2 gap-2">
        {/* Dark/Light Mode */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2.5 rounded-xl flex items-center space-x-2.5 transition-colors ${
            isDarkMode ? 'bg-[#0078d4] text-white' : 'bg-white/10 text-white/60 hover:bg-white/15'
          }`}
        >
          {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          <div className="text-left min-w-0">
            <span className="text-xs font-semibold block leading-tight truncate">Theme</span>
            <span className="text-[10px] opacity-80 block truncate">{isDarkMode ? 'Dark' : 'Light'}</span>
          </div>
        </button>

        {/* Guided Tour */}
        <button
          onClick={() => {
            onStartGuidedExperience();
            onClose();
          }}
          className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white flex items-center space-x-2.5 transition-colors"
        >
          <Sparkles className="w-4 h-4 text-[#0078d4]" />
          <div className="text-left min-w-0">
            <span className="text-xs font-semibold block leading-tight truncate">Guided Tour</span>
            <span className="text-[10px] text-white/60 block truncate">26 Chapters</span>
          </div>
        </button>

        {/* Cycle Wallpaper */}
        <button
          onClick={handleNextWallpaper}
          className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white flex items-center space-x-2.5 transition-colors"
        >
          <Image className="w-4 h-4 text-[#60cdff]" />
          <div className="text-left min-w-0">
            <span className="text-xs font-semibold block leading-tight truncate">Wallpaper</span>
            <span className="text-[10px] text-white/60 block truncate">Next Theme</span>
          </div>
        </button>

        {/* Slideshow Toggle */}
        <button
          onClick={handleToggleSlideshow}
          className={`p-2.5 rounded-xl flex items-center space-x-2.5 transition-colors ${
            isSlideshow ? 'bg-[#0078d4] text-white' : 'bg-white/10 text-white/60 hover:bg-white/15'
          }`}
        >
          <Shuffle className="w-4 h-4" />
          <div className="text-left min-w-0">
            <span className="text-xs font-semibold block leading-tight truncate">Slideshow</span>
            <span className="text-[10px] opacity-80 block truncate">{isSlideshow ? 'Active' : 'Off'}</span>
          </div>
        </button>

        {/* Narration Channel */}
        <button
          onClick={() => setNarrationEnabled(!narrationEnabled)}
          className={`p-2.5 rounded-xl flex items-center space-x-2.5 transition-colors ${
            narrationEnabled ? 'bg-[#0078d4] text-white' : 'bg-white/10 text-white/60 hover:bg-white/15'
          }`}
        >
          <Mic className="w-4 h-4" />
          <div className="text-left min-w-0">
            <span className="text-xs font-semibold block leading-tight truncate">Narration</span>
            <span className="text-[10px] opacity-80 block truncate">{narrationEnabled ? 'Standby' : 'Muted'}</span>
          </div>
        </button>

        {/* Reduced Motion */}
        <button
          onClick={() => setReducedMotion(!reducedMotion)}
          className={`p-2.5 rounded-xl flex items-center space-x-2.5 transition-colors ${
            reducedMotion ? 'bg-[#0078d4] text-white' : 'bg-white/10 text-white/60 hover:bg-white/15'
          }`}
        >
          <Eye className="w-4 h-4" />
          <div className="text-left min-w-0">
            <span className="text-xs font-semibold block leading-tight truncate">Motion</span>
            <span className="text-[10px] opacity-80 block truncate">{reducedMotion ? 'Reduced' : 'Normal'}</span>
          </div>
        </button>
      </div>

      {/* Volume Slider Bar */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center space-x-3 bg-white/5 p-2 rounded-xl border border-white/5">
          <button
            onClick={() => setVolume((v) => (v > 0 ? 0 : 80))}
            className="text-white/70 hover:text-white"
          >
            {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#0078d4]"
          />
          <span className="text-[11px] font-mono text-white/60 w-7 text-right">
            {volume}%
          </span>
        </div>
      </div>
    </div>
  );
};
