import React, { useState, useEffect } from 'react';
import {
  Monitor,
  Palette,
  Volume2,
  Eye,
  Info,
  Compass,
  Sparkles,
  Check,
  User,
  Trash2,
  Briefcase,
  Cpu,
  Globe,
} from 'lucide-react';
import type { OSSettings, ExperienceMode, WallpaperConfig, SlideshowInterval } from '../../types/os';
import {
  WALLPAPER_COLLECTION,
  DEFAULT_WALLPAPER_ID,
} from '../../data/wallpapers';
import type { WallpaperItem } from '../../data/wallpapers';
import {
  getRecentActivities,
  clearRecentActivities,
} from '../../utils/recentActivity';
import type { RecentActivityItem } from '../../utils/recentActivity';

const DEFAULT_WALLPAPER_CONFIG: WallpaperConfig = {
  currentId: DEFAULT_WALLPAPER_ID,
  isSlideshow: false,
  slideshowInterval: 0,
  shuffle: false,
};

const DEFAULT_SETTINGS: OSSettings = {
  theme: 'dark',
  mode: 'explore',
  experienceMode: 'explore',
  wallpaper: DEFAULT_WALLPAPER_CONFIG,
  audio: {
    narration: true,
    bgMusic: false,
    sfx: true,
  },
  accessibility: {
    reducedMotion: false,
    captions: true,
  },
};

interface SettingsWindowProps {
  onStartGuidedExperience?: () => void;
}

type SettingsSection = 'system' | 'personalization' | 'audio' | 'accessibility' | 'about';

export const SettingsWindow: React.FC<SettingsWindowProps> = ({
  onStartGuidedExperience,
}) => {
  const [activeSection, setActiveSection] = useState<SettingsSection>('personalization');
  const [settings, setSettings] = useState<OSSettings>(() => {
    try {
      const saved = localStorage.getItem('fauzaan_os_settings');
      const parsed = saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
      // also read experience mode and wallpaper config if saved individually
      const expMode = localStorage.getItem('fauzaan_os_experience_mode') as ExperienceMode;
      const wallConf = localStorage.getItem('fauzaan_os_wallpaper_config');
      if (expMode) parsed.experienceMode = expMode;
      if (wallConf) parsed.wallpaper = JSON.parse(wallConf);
      return parsed;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [recentActivities, setRecentActivities] = useState<RecentActivityItem[]>(getRecentActivities());
  const [saveIndicator, setSaveIndicator] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('fauzaan_os_settings', JSON.stringify(settings));
      if (settings.experienceMode) {
        localStorage.setItem('fauzaan_os_experience_mode', settings.experienceMode);
        window.dispatchEvent(new CustomEvent('fauzaan_experience_mode_changed', { detail: settings.experienceMode }));
      }
      if (settings.wallpaper) {
        localStorage.setItem('fauzaan_os_wallpaper_config', JSON.stringify(settings.wallpaper));
        window.dispatchEvent(new CustomEvent('fauzaan_wallpaper_changed', { detail: settings.wallpaper }));
      }
      setSaveIndicator(true);
      const timer = setTimeout(() => setSaveIndicator(false), 1200);
      return () => clearTimeout(timer);
    } catch (e) {
      console.warn('Unable to persist settings', e);
    }
  }, [settings]);

  const handleSelectWallpaper = (wp: WallpaperItem) => {
    const updatedWallpaper: WallpaperConfig = {
      ...(settings.wallpaper || DEFAULT_WALLPAPER_CONFIG),
      currentId: wp.id,
    };
    setSettings({ ...settings, wallpaper: updatedWallpaper });
  };

  const handleToggleSlideshow = (enabled: boolean) => {
    const updatedWallpaper: WallpaperConfig = {
      ...(settings.wallpaper || DEFAULT_WALLPAPER_CONFIG),
      isSlideshow: enabled,
      slideshowInterval: enabled && !settings.wallpaper?.slideshowInterval
        ? 300 // default to 5 minutes
        : (settings.wallpaper?.slideshowInterval || 0),
    };
    setSettings({ ...settings, wallpaper: updatedWallpaper });
  };

  const handleSetInterval = (interval: SlideshowInterval) => {
    const updatedWallpaper: WallpaperConfig = {
      ...(settings.wallpaper || DEFAULT_WALLPAPER_CONFIG),
      slideshowInterval: interval,
      isSlideshow: interval > 0,
    };
    setSettings({ ...settings, wallpaper: updatedWallpaper });
  };

  const handleToggleShuffle = (shuffle: boolean) => {
    const updatedWallpaper: WallpaperConfig = {
      ...(settings.wallpaper || DEFAULT_WALLPAPER_CONFIG),
      shuffle,
    };
    setSettings({ ...settings, wallpaper: updatedWallpaper });
  };

  const handleExperienceMode = (mode: ExperienceMode) => {
    setSettings({ ...settings, experienceMode: mode });
  };

  const handleClearActivities = () => {
    clearRecentActivities();
    setRecentActivities([]);
  };

  return (
    <div className="flex h-full bg-[#f9f9f9] dark:bg-[#191919] select-none text-win-text-light dark:text-win-text-dark font-sans overflow-hidden">
      {/* Left Settings Sidebar */}
      <div className="w-56 shrink-0 border-r border-black/10 dark:border-white/10 bg-[#f3f3f3] dark:bg-[#202020] p-3 flex flex-col justify-between win-scrollbar overflow-y-auto">
        <div className="space-y-4">
          {/* User Account Tile */}
          <div className="flex items-center gap-2.5 p-2 rounded bg-white dark:bg-[#252525] border border-black/10 dark:border-white/10 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-win-accent text-white flex items-center justify-center font-bold text-xs">
              <User className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold truncate text-win-text-light dark:text-win-text-dark">
                Fauzaan
              </div>
              <div className="text-[10.5px] text-win-muted-light dark:text-win-muted-dark truncate">
                Administrator
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-0.5">
            <button
              onClick={() => setActiveSection('personalization')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded text-xs transition-colors ${
                activeSection === 'personalization'
                  ? 'bg-black/10 dark:bg-white/15 text-win-text-light dark:text-win-text-dark font-semibold'
                  : 'text-win-muted-light dark:text-win-muted-dark hover:bg-black/5 dark:hover:bg-white/5 hover:text-win-text-light dark:hover:text-win-text-dark'
              }`}
            >
              <Palette className={`w-4 h-4 ${activeSection === 'personalization' ? 'text-win-accent' : ''}`} />
              <span>Personalization</span>
            </button>

            <button
              onClick={() => setActiveSection('system')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded text-xs transition-colors ${
                activeSection === 'system'
                  ? 'bg-black/10 dark:bg-white/15 text-win-text-light dark:text-win-text-dark font-semibold'
                  : 'text-win-muted-light dark:text-win-muted-dark hover:bg-black/5 dark:hover:bg-white/5 hover:text-win-text-light dark:hover:text-win-text-dark'
              }`}
            >
              <Monitor className={`w-4 h-4 ${activeSection === 'system' ? 'text-win-accent' : ''}`} />
              <span>System</span>
            </button>

            <button
              onClick={() => setActiveSection('audio')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded text-xs transition-colors ${
                activeSection === 'audio'
                  ? 'bg-black/10 dark:bg-white/15 text-win-text-light dark:text-win-text-dark font-semibold'
                  : 'text-win-muted-light dark:text-win-muted-dark hover:bg-black/5 dark:hover:bg-white/5 hover:text-win-text-light dark:hover:text-win-text-dark'
              }`}
            >
              <Volume2 className={`w-4 h-4 ${activeSection === 'audio' ? 'text-win-accent' : ''}`} />
              <span>Sound & Audio</span>
            </button>

            <button
              onClick={() => setActiveSection('accessibility')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded text-xs transition-colors ${
                activeSection === 'accessibility'
                  ? 'bg-black/10 dark:bg-white/15 text-win-text-light dark:text-win-text-dark font-semibold'
                  : 'text-win-muted-light dark:text-win-muted-dark hover:bg-black/5 dark:hover:bg-white/5 hover:text-win-text-light dark:hover:text-win-text-dark'
              }`}
            >
              <Eye className={`w-4 h-4 ${activeSection === 'accessibility' ? 'text-win-accent' : ''}`} />
              <span>Accessibility</span>
            </button>

            <button
              onClick={() => setActiveSection('about')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded text-xs transition-colors ${
                activeSection === 'about'
                  ? 'bg-black/10 dark:bg-white/15 text-win-text-light dark:text-win-text-dark font-semibold'
                  : 'text-win-muted-light dark:text-win-muted-dark hover:bg-black/5 dark:hover:bg-white/5 hover:text-win-text-light dark:hover:text-win-text-dark'
              }`}
            >
              <Info className={`w-4 h-4 ${activeSection === 'about' ? 'text-win-accent' : ''}`} />
              <span>About Windows</span>
            </button>
          </div>
        </div>

        {saveIndicator && (
          <div className="flex items-center gap-1.5 p-2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-medium">
            <Check className="w-3 h-3" />
            <span>Settings saved</span>
          </div>
        )}
      </div>

      {/* Right Content Pane */}
      <div className="flex-1 p-6 overflow-y-auto win-scrollbar space-y-6">
        {/* PERSONALIZATION SECTION */}
        {activeSection === 'personalization' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h1 className="text-xl font-semibold text-win-text-light dark:text-win-text-dark">
                Personalization
              </h1>
              <p className="text-xs text-win-muted-light dark:text-win-muted-dark">
                Desktop wallpaper gallery, theme modes, and experience focus
              </p>
            </div>

            {/* 1. Theme Mode */}
            <div className="p-4 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#202020] space-y-3">
              <div className="text-xs font-semibold text-win-text-light dark:text-win-text-dark">
                Color theme
              </div>
              <div className="grid grid-cols-3 gap-3">
                {(['dark', 'light', 'system'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setSettings({ ...settings, theme: t })}
                    className={`py-2 px-3 rounded text-xs border capitalize transition-all ${
                      settings.theme === t
                        ? 'border-win-accent bg-win-accent text-white font-medium shadow-sm'
                        : 'border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-win-text-light dark:text-win-text-dark hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Wallpaper Gallery & Background */}
            <div className="p-4 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#202020] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-win-text-light dark:text-win-text-dark">
                    Background Picture
                  </div>
                  <div className="text-[11px] text-win-muted-light dark:text-win-muted-dark">
                    Select a Windows-inspired theme or automated slideshow
                  </div>
                </div>

                {/* Picture vs Slideshow Switch */}
                <div className="flex items-center space-x-1 p-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-xs">
                  <button
                    onClick={() => handleToggleSlideshow(false)}
                    className={`px-2.5 py-1 rounded font-medium transition-all ${
                      !settings.wallpaper?.isSlideshow
                        ? 'bg-white dark:bg-[#2b2b2b] text-win-text-light dark:text-win-text-dark shadow-sm'
                        : 'text-win-muted-light dark:text-win-muted-dark hover:text-win-text-light dark:hover:text-win-text-dark'
                    }`}
                  >
                    Picture
                  </button>
                  <button
                    onClick={() => handleToggleSlideshow(true)}
                    className={`px-2.5 py-1 rounded font-medium transition-all ${
                      settings.wallpaper?.isSlideshow
                        ? 'bg-white dark:bg-[#2b2b2b] text-win-text-light dark:text-win-text-dark shadow-sm'
                        : 'text-win-muted-light dark:text-win-muted-dark hover:text-win-text-light dark:hover:text-win-text-dark'
                    }`}
                  >
                    Slideshow
                  </button>
                </div>
              </div>

              {/* Wallpaper Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {WALLPAPER_COLLECTION.map((wp) => {
                  const isSelected = settings.wallpaper?.currentId === wp.id;
                  return (
                    <div
                      key={wp.id}
                      onClick={() => handleSelectWallpaper(wp)}
                      className={`group p-2 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-win-accent bg-win-accent/10 ring-2 ring-win-accent/40 shadow-sm'
                          : 'border-black/10 dark:border-white/10 hover:border-win-accent/50 bg-black/[0.02] dark:bg-white/[0.02]'
                      }`}
                    >
                      <div className={`h-16 rounded-lg ${wp.previewBg} relative overflow-hidden border border-black/10 dark:border-white/10`}>
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-win-accent text-white flex items-center justify-center">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </div>
                      <div className="mt-1.5">
                        <div className="text-[11px] font-semibold truncate text-win-text-light dark:text-win-text-dark">
                          {wp.name}
                        </div>
                        <div className="text-[9.5px] text-win-muted-light dark:text-win-muted-dark truncate">
                          {wp.category}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Slideshow Controls (When Slideshow is active) */}
              {settings.wallpaper?.isSlideshow && (
                <div className="pt-3 border-t border-black/5 dark:border-white/5 space-y-3 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-win-text-light dark:text-win-text-dark">
                        Change picture every
                      </div>
                      <div className="text-[10.5px] text-win-muted-light dark:text-win-muted-dark">
                        Automated background rotation interval
                      </div>
                    </div>

                    <select
                      value={settings.wallpaper.slideshowInterval}
                      onChange={(e) => handleSetInterval(Number(e.target.value) as SlideshowInterval)}
                      aria-label="Slideshow interval duration"
                      className="px-2.5 py-1 text-xs rounded border border-black/15 dark:border-white/15 bg-white dark:bg-[#2b2b2b] text-win-text-light dark:text-win-text-dark focus:outline-none"
                    >
                      <option value={60}>1 minute</option>
                      <option value={300}>5 minutes</option>
                      <option value={900}>15 minutes</option>
                      <option value={1800}>30 minutes</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-win-text-light dark:text-win-text-dark">
                        Shuffle order
                      </div>
                      <div className="text-[10.5px] text-win-muted-light dark:text-win-muted-dark">
                        Randomize next wallpaper transition
                      </div>
                    </div>

                    <input
                      type="checkbox"
                      checked={Boolean(settings.wallpaper.shuffle)}
                      onChange={(e) => handleToggleShuffle(e.target.checked)}
                      className="w-4 h-4 accent-win-accent cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 3. Experience Mode Selection */}
            <div className="p-4 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#202020] space-y-3">
              <div>
                <div className="text-xs font-semibold text-win-text-light dark:text-win-text-dark">
                  Experience Mode (What Brings You Here?)
                </div>
                <div className="text-[11px] text-win-muted-light dark:text-win-muted-dark">
                  Tailors Start Menu recommendations, briefings, and highlights
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'recruiter', label: 'Recruiter', icon: <Briefcase className="w-3.5 h-3.5 text-[#107c41]" /> },
                  { id: 'technical', label: 'Technical Interviewer', icon: <Cpu className="w-3.5 h-3.5 text-[#00a4ef]" /> },
                  { id: 'client', label: 'Client / Collaborator', icon: <Globe className="w-3.5 h-3.5 text-[#0078d4]" /> },
                  { id: 'explore', label: 'Explore FAUZAAN OS', icon: <Compass className="w-3.5 h-3.5 text-[#f7b500]" /> },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => handleExperienceMode(mode.id as ExperienceMode)}
                    className={`p-2.5 rounded-lg border flex items-center space-x-2 text-left transition-all ${
                      settings.experienceMode === mode.id
                        ? 'border-win-accent bg-win-accent/10 font-semibold'
                        : 'border-black/10 dark:border-white/10 hover:border-win-accent/40 bg-black/[0.02] dark:bg-white/[0.02]'
                    }`}
                  >
                    {mode.icon}
                    <span className="truncate">{mode.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Recent Activity Manager */}
            <div className="p-4 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#202020] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-win-text-light dark:text-win-text-dark">
                    Local Activity History
                  </div>
                  <div className="text-[11px] text-win-muted-light dark:text-win-muted-dark">
                    Stored strictly on this device ({recentActivities.length} items logged)
                  </div>
                </div>

                <button
                  onClick={handleClearActivities}
                  disabled={recentActivities.length === 0}
                  className="px-3 py-1.5 rounded text-xs border border-black/10 dark:border-white/10 hover:bg-[#e81123]/10 hover:text-[#e81123] hover:border-[#e81123]/30 disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center space-x-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear History</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SYSTEM SECTION */}
        {activeSection === 'system' && (
          <div className="space-y-4 max-w-2xl">
            <div>
              <h1 className="text-xl font-semibold text-win-text-light dark:text-win-text-dark">
                System
              </h1>
              <p className="text-xs text-win-muted-light dark:text-win-muted-dark">
                Operating mode, desktop multitasking, and guided presentation tour
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-semibold text-win-muted-light dark:text-win-muted-dark uppercase tracking-wider">
                Operating Experience
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setSettings({ ...settings, mode: 'explore' })}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    settings.mode === 'explore'
                      ? 'border-win-accent bg-win-accent/5 dark:bg-win-accent/10 shadow-sm'
                      : 'border-black/10 dark:border-white/10 bg-white dark:bg-[#202020] hover:border-win-accent/50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Compass className="w-4 h-4 text-win-accent" />
                    <span className="text-xs font-semibold text-win-text-light dark:text-win-text-dark">
                      Explore Mode (Default)
                    </span>
                  </div>
                  <p className="text-xs text-win-muted-light dark:text-win-muted-dark leading-relaxed">
                    Interactive Windows desktop. Freely open, cascade, minimize, and explore all 13 installed programs.
                  </p>
                </div>

                <div
                  onClick={() => {
                    setSettings({ ...settings, mode: 'guided' });
                    if (onStartGuidedExperience) onStartGuidedExperience();
                  }}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    settings.mode === 'guided'
                      ? 'border-win-accent bg-win-accent/5 dark:bg-win-accent/10 shadow-sm'
                      : 'border-black/10 dark:border-white/10 bg-white dark:bg-[#202020] hover:border-win-accent/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-win-accent" />
                      <span className="text-xs font-semibold text-win-text-light dark:text-win-text-dark">
                        Guided Experience
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-win-muted-light dark:text-win-muted-dark leading-relaxed">
                    Cinematic 26-chapter walkthrough of journey, systems, and achievements with timeline controls.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AUDIO SECTION */}
        {activeSection === 'audio' && (
          <div className="space-y-4 max-w-2xl">
            <div>
              <h1 className="text-xl font-semibold text-win-text-light dark:text-win-text-dark">
                Sound & Audio
              </h1>
              <p className="text-xs text-win-muted-light dark:text-win-muted-dark">
                Voice narration commentary and system auditory feedback
              </p>
            </div>

            <div className="divide-y divide-black/5 dark:divide-white/5 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#202020] overflow-hidden">
              <div className="p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-win-text-light dark:text-win-text-dark">
                    Voice Narration Channels
                  </div>
                  <div className="text-[11px] text-win-muted-light dark:text-win-muted-dark mt-0.5">
                    Enable audio commentary and project walkthrough voice tracks (fallback message if unavailable)
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.audio.narration}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      audio: { ...settings.audio, narration: e.target.checked },
                    })
                  }
                  className="w-4 h-4 accent-win-accent cursor-pointer"
                />
              </div>

              <div className="p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-win-text-light dark:text-win-text-dark">
                    Interface Feedback (SFX)
                  </div>
                  <div className="text-[11px] text-win-muted-light dark:text-win-muted-dark mt-0.5">
                    Play subtle sound effects on window actions and selections
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.audio.sfx}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      audio: { ...settings.audio, sfx: e.target.checked },
                    })
                  }
                  className="w-4 h-4 accent-win-accent cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* ACCESSIBILITY SECTION */}
        {activeSection === 'accessibility' && (
          <div className="space-y-4 max-w-2xl">
            <div>
              <h1 className="text-xl font-semibold text-win-text-light dark:text-win-text-dark">
                Accessibility
              </h1>
              <p className="text-xs text-win-muted-light dark:text-win-muted-dark">
                Visual comfort, closed captions, and motion settings
              </p>
            </div>

            <div className="divide-y divide-black/5 dark:divide-white/5 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#202020] overflow-hidden">
              <div className="p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-win-text-light dark:text-win-text-dark">
                    Reduced Motion
                  </div>
                  <div className="text-[11px] text-win-muted-light dark:text-win-muted-dark mt-0.5">
                    Minimize UI animations and window transitions
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.accessibility.reducedMotion}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      accessibility: {
                        ...settings.accessibility,
                        reducedMotion: e.target.checked,
                      },
                    })
                  }
                  className="w-4 h-4 accent-win-accent cursor-pointer"
                />
              </div>

              <div className="p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-win-text-light dark:text-win-text-dark">
                    Closed Captions & Transcripts
                  </div>
                  <div className="text-[11px] text-win-muted-light dark:text-win-muted-dark mt-0.5">
                    Display text transcripts alongside media and video demonstrations
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.accessibility.captions}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      accessibility: {
                        ...settings.accessibility,
                        captions: e.target.checked,
                      },
                    })
                  }
                  className="w-4 h-4 accent-win-accent cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* ABOUT SECTION */}
        {activeSection === 'about' && (
          <div className="space-y-4 max-w-2xl text-xs">
            <div>
              <h1 className="text-xl font-semibold text-win-text-light dark:text-win-text-dark">
                About Windows & FAUZAAN OS
              </h1>
              <p className="text-xs text-win-muted-light dark:text-win-muted-dark">
                System specification and environment details
              </p>
            </div>

            <div className="border border-black/10 dark:border-white/10 rounded-lg overflow-hidden bg-white dark:bg-[#202020]">
              <div className="grid grid-cols-3 p-3 border-b border-black/5 dark:border-white/5">
                <span className="text-win-muted-light dark:text-win-muted-dark">Edition:</span>
                <span className="col-span-2 font-medium">Windows 11 Pro (FAUZAAN OS Edition)</span>
              </div>
              <div className="grid grid-cols-3 p-3 border-b border-black/5 dark:border-white/5">
                <span className="text-win-muted-light dark:text-win-muted-dark">Version:</span>
                <span className="col-span-2 font-medium">24H2 (Build 26100.1000)</span>
              </div>
              <div className="grid grid-cols-3 p-3 border-b border-black/5 dark:border-white/5">
                <span className="text-win-muted-light dark:text-win-muted-dark">Developer:</span>
                <span className="col-span-2 font-medium">SK Fauzaan</span>
              </div>
              <div className="grid grid-cols-3 p-3 border-b border-black/5 dark:border-white/5">
                <span className="text-win-muted-light dark:text-win-muted-dark">Architecture:</span>
                <span className="col-span-2 font-medium">React 19 • TypeScript • Vite • Tailwind CSS</span>
              </div>
              <div className="grid grid-cols-3 p-3">
                <span className="text-win-muted-light dark:text-win-muted-dark">Experience:</span>
                <span className="col-span-2 font-medium">Windows Feature Experience Pack</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
