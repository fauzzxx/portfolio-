import React, { useState, useEffect } from 'react';
import {
  WALLPAPER_COLLECTION,
  DEFAULT_WALLPAPER_ID,
} from '../../data/wallpapers';
import type { WallpaperItem } from '../../data/wallpapers';
import type { WallpaperConfig } from '../../types/os';

interface WindowsWallpaperProps {
  theme?: 'dark' | 'light' | 'system';
}

const DEFAULT_WALLPAPER_CONFIG: WallpaperConfig = {
  currentId: DEFAULT_WALLPAPER_ID,
  isSlideshow: false,
  slideshowInterval: 0,
  shuffle: false,
};

export const WindowsWallpaper: React.FC<WindowsWallpaperProps> = () => {
  const [wallpaperConfig, setWallpaperConfig] = useState<WallpaperConfig>(() => {
    try {
      const raw = localStorage.getItem('fauzaan_os_wallpaper_config');
      if (raw) return JSON.parse(raw);
    } catch {}
    return DEFAULT_WALLPAPER_CONFIG;
  });

  // Listen for external updates from Settings or Context Menu
  useEffect(() => {
    const handleConfigChange = (e: any) => {
      if (e.detail) {
        setWallpaperConfig(e.detail);
      } else {
        try {
          const raw = localStorage.getItem('fauzaan_os_wallpaper_config');
          if (raw) setWallpaperConfig(JSON.parse(raw));
        } catch {}
      }
    };

    window.addEventListener('fauzaan_wallpaper_changed', handleConfigChange);
    return () => window.removeEventListener('fauzaan_wallpaper_changed', handleConfigChange);
  }, []);

  // Slideshow interval timer
  useEffect(() => {
    if (!wallpaperConfig.isSlideshow || wallpaperConfig.slideshowInterval <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setWallpaperConfig((prev) => {
        const list = WALLPAPER_COLLECTION;
        let nextIndex = 0;
        const currentIndex = list.findIndex((w) => w.id === prev.currentId);

        if (prev.shuffle) {
          nextIndex = Math.floor(Math.random() * list.length);
          if (nextIndex === currentIndex && list.length > 1) {
            nextIndex = (nextIndex + 1) % list.length;
          }
        } else {
          nextIndex = (currentIndex + 1) % list.length;
        }

        const nextId = list[nextIndex].id;
        const updated: WallpaperConfig = { ...prev, currentId: nextId };
        try {
          localStorage.setItem('fauzaan_os_wallpaper_config', JSON.stringify(updated));
        } catch {}
        return updated;
      });
    }, wallpaperConfig.slideshowInterval * 1000);

    return () => clearInterval(timer);
  }, [wallpaperConfig.isSlideshow, wallpaperConfig.slideshowInterval, wallpaperConfig.shuffle]);

  const activeWallpaper: WallpaperItem =
    WALLPAPER_COLLECTION.find((w) => w.id === wallpaperConfig.currentId) ||
    WALLPAPER_COLLECTION[0];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 transition-opacity duration-700">
      {/* 1. Custom Image Wallpaper */}
      {activeWallpaper.type === 'image' && activeWallpaper.imageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${activeWallpaper.imageUrl}")` }}
        />
      )}

      {/* 2. Windows 11 Bloom Dark (Default) */}
      {activeWallpaper.type === 'svg-bloom-dark' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1128] via-[#0d1b3e] to-[#080d1e]" />
          <svg
            className="absolute inset-0 w-full h-full object-cover opacity-85"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1920 1080"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="win-bloom-1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e3c72" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#2a5298" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0a192f" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="win-bloom-2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0078d4" stopOpacity="0.75" />
                <stop offset="45%" stopColor="#3a6073" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#16222f" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="win-bloom-3" x1="20%" y1="80%" x2="80%" y2="20%">
                <stop offset="0%" stopColor="#005a9e" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#0078d4" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#60cdff" stopOpacity="0.15" />
              </linearGradient>
              <radialGradient id="win-center-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0078d4" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#1e3c72" stopOpacity="0.1" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="960" cy="540" r="600" fill="url(#win-center-glow)" />
            <path
              d="M 600,1080 C 700,700 800,450 960,400 C 1120,350 1350,550 1450,1080 Z"
              fill="url(#win-bloom-1)"
            />
            <path
              d="M 450,1080 C 650,600 780,320 980,300 C 1180,280 1300,500 1550,1080 Z"
              fill="url(#win-bloom-2)"
            />
            <path
              d="M 750,1080 C 850,750 900,520 1020,480 C 1140,440 1250,650 1350,1080 Z"
              fill="url(#win-bloom-3)"
            />
            <path
              d="M 820,1080 C 900,820 950,620 1010,580 C 1070,540 1150,700 1220,1080 Z"
              fill="url(#win-bloom-2)"
              opacity="0.9"
            />
            <path
              d="M 650,1080 Q 920,400 1200,1080"
              stroke="rgba(96, 205, 255, 0.25)"
              strokeWidth="2.5"
              fill="none"
            />
          </svg>
        </>
      )}

      {/* 3. Windows 11 Bloom Light */}
      {activeWallpaper.type === 'svg-bloom-light' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-[#dbe9f6] via-[#c2daf2] to-[#e4f0fc]" />
          <svg
            className="absolute inset-0 w-full h-full object-cover opacity-80"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1920 1080"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="win-bloom-light-1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9fc4ec" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#6ba3df" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#bcd8f5" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="win-bloom-light-2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0078d4" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#82b8ee" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#a3ccf5" stopOpacity="0.7" />
              </linearGradient>
            </defs>
            <circle cx="960" cy="540" r="500" fill="rgba(0, 120, 212, 0.15)" />
            <path
              d="M 500,1080 C 650,600 800,350 960,320 C 1120,290 1300,500 1500,1080 Z"
              fill="url(#win-bloom-light-1)"
            />
            <path
              d="M 700,1080 C 800,700 880,480 1000,450 C 1120,420 1200,600 1320,1080 Z"
              fill="url(#win-bloom-light-2)"
            />
          </svg>
        </>
      )}

      {/* 4. Windows 11 Flow (Dawn) */}
      {activeWallpaper.type === 'svg-flow' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-[#121324] via-[#241d3b] to-[#0d0f1a]" />
          <svg
            className="absolute inset-0 w-full h-full object-cover opacity-80"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1920 1080"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="win-flow-1" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#5d2689" stopOpacity="0.75" />
                <stop offset="50%" stopColor="#b145a3" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#0078d4" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <path
              d="M 300,1080 C 500,500 700,300 1000,400 C 1300,500 1400,300 1650,1080 Z"
              fill="url(#win-flow-1)"
            />
          </svg>
        </>
      )}

      {/* 5. Emerald Aurora */}
      {activeWallpaper.type === 'svg-aurora' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-[#061517] via-[#0b332b] to-[#030d0f]" />
          <svg
            className="absolute inset-0 w-full h-full object-cover opacity-75"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1920 1080"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="win-aurora" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0d5240" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#107c41" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#00a4ef" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <path
              d="M 400,1080 C 600,600 750,350 980,320 C 1200,290 1350,550 1600,1080 Z"
              fill="url(#win-aurora)"
            />
          </svg>
        </>
      )}

      {/* 6. Azure Horizon */}
      {activeWallpaper.type === 'svg-azure' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-[#071326] via-[#0d2a4d] to-[#050b17]" />
          <svg
            className="absolute inset-0 w-full h-full object-cover opacity-80"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1920 1080"
            preserveAspectRatio="xMidYMid slice"
          >
            <circle cx="960" cy="540" r="700" fill="rgba(0, 120, 212, 0.2)" />
            <path
              d="M 200,1080 C 600,650 900,450 1200,500 C 1500,550 1650,450 1800,1080 Z"
              fill="rgba(0, 164, 239, 0.35)"
            />
          </svg>
        </>
      )}

      {/* 7. Minimal Midnight */}
      {activeWallpaper.type === 'svg-minimal' && (
        <>
          <div className="absolute inset-0 bg-[#121212]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#242424] via-[#141414] to-[#0a0a0a] opacity-90" />
        </>
      )}
    </div>
  );
};
