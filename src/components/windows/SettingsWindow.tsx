import React, { useState, useEffect } from 'react';
import { Sliders, Moon, Volume2, Eye, Compass, Sparkles, CheckCircle2 } from 'lucide-react';
import type { OSSettings } from '../../types/os';

const DEFAULT_SETTINGS: OSSettings = {
  theme: 'dark',
  mode: 'explore',
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

export const SettingsWindow: React.FC<SettingsWindowProps> = ({
  onStartGuidedExperience,
}) => {
  const [settings, setSettings] = useState<OSSettings>(() => {
    try {
      const saved = localStorage.getItem('fauzaan_os_settings');
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [savedBadge, setSavedBadge] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('fauzaan_os_settings', JSON.stringify(settings));
      setSavedBadge(true);
      const t = setTimeout(() => setSavedBadge(false), 1500);
      return () => clearTimeout(t);
    } catch (e) {
      console.warn('Unable to persist settings to localStorage', e);
    }
  }, [settings]);

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-os-border gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-os-card border border-os-border text-os-accent">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-mono text-os-text">
              System Preferences
            </h1>
            <p className="text-xs text-os-muted">
              Configure appearance themes, audio channels, and accessibility
            </p>
          </div>
        </div>

        {savedBadge && (
          <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-os-emerald/10 border border-os-emerald/30 text-os-emerald text-xs font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>SAVED TO LOCALSTORAGE</span>
          </span>
        )}
      </div>

      {/* Experience Mode Selector */}
      <div className="p-5 rounded-2xl bg-os-card/80 border border-os-border space-y-3">
        <div className="flex items-center space-x-2 text-xs font-mono text-os-accent uppercase tracking-wider">
          <Compass className="w-4 h-4" />
          <span>System Operation Mode</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            onClick={() => setSettings({ ...settings, mode: 'explore' })}
            className={`p-4 rounded-xl border cursor-pointer transition-all space-y-1 ${
              settings.mode === 'explore'
                ? 'bg-os-accent/15 border-os-accent text-os-text'
                : 'bg-os-surface border-os-border text-os-muted hover:border-os-border-focus'
            }`}
          >
            <span className="text-xs font-bold font-mono block">Explore Mode</span>
            <p className="text-xs text-os-muted leading-relaxed font-light">
              Free-form desktop workspace. Open, minimize, drag, and multitask across applications.
            </p>
          </div>

          <div
            onClick={() => {
              setSettings({ ...settings, mode: 'guided' });
              if (onStartGuidedExperience) onStartGuidedExperience();
            }}
            className={`p-4 rounded-xl border cursor-pointer transition-all space-y-1 ${
              settings.mode === 'guided'
                ? 'bg-os-accent/15 border-os-accent text-os-text'
                : 'bg-os-surface border-os-border text-os-muted hover:border-os-border-focus'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono block">Guided Experience</span>
              <Sparkles className="w-3.5 h-3.5 text-os-accent" />
            </div>
            <p className="text-xs text-os-muted leading-relaxed font-light">
              Cinematic 26-chapter walkthrough of journey, systems, and achievements with timeline controls.
            </p>
          </div>
        </div>
      </div>

      {/* Appearance Section */}
      <div className="p-5 rounded-2xl bg-os-card/60 border border-os-border space-y-3">
        <div className="flex items-center space-x-2 text-xs font-mono text-os-muted uppercase tracking-wider">
          <Moon className="w-4 h-4 text-os-accent" />
          <span>Appearance Theme</span>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {(['dark', 'light', 'system'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setSettings({ ...settings, theme: t })}
              className={`py-2 px-3 rounded-lg text-xs font-mono border transition-all capitalize ${
                settings.theme === t
                  ? 'bg-os-accent/20 border-os-accent text-os-text font-bold shadow-sm'
                  : 'bg-os-surface border-os-border text-os-muted hover:border-os-border-focus'
              }`}
            >
              {t} {t === 'dark' ? '(Default)' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Audio Section */}
      <div className="p-5 rounded-2xl bg-os-card/60 border border-os-border space-y-3">
        <div className="flex items-center space-x-2 text-xs font-mono text-os-muted uppercase tracking-wider">
          <Volume2 className="w-4 h-4 text-os-emerald" />
          <span>Audio Subsystem Channels</span>
        </div>
        <div className="space-y-2">
          <label className="flex items-center justify-between p-3 rounded-xl bg-os-surface border border-os-border/70 text-xs font-mono">
            <span className="text-os-text">Voice Narration Channels</span>
            <input
              type="checkbox"
              checked={settings.audio.narration}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  audio: { ...settings.audio, narration: e.target.checked },
                })
              }
              className="accent-os-accent w-4 h-4 rounded cursor-pointer"
            />
          </label>
          <label className="flex items-center justify-between p-3 rounded-xl bg-os-surface border border-os-border/70 text-xs font-mono">
            <span className="text-os-text">System Interface Sounds (SFX)</span>
            <input
              type="checkbox"
              checked={settings.audio.sfx}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  audio: { ...settings.audio, sfx: e.target.checked },
                })
              }
              className="accent-os-accent w-4 h-4 rounded cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Accessibility Section */}
      <div className="p-5 rounded-2xl bg-os-card/60 border border-os-border space-y-3">
        <div className="flex items-center space-x-2 text-xs font-mono text-os-muted uppercase tracking-wider">
          <Eye className="w-4 h-4 text-os-neural" />
          <span>Accessibility Preferences</span>
        </div>
        <div className="space-y-2">
          <label className="flex items-center justify-between p-3 rounded-xl bg-os-surface border border-os-border/70 text-xs font-mono">
            <span className="text-os-text">Reduced Motion</span>
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
              className="accent-os-accent w-4 h-4 rounded cursor-pointer"
            />
          </label>
          <label className="flex items-center justify-between p-3 rounded-xl bg-os-surface border border-os-border/70 text-xs font-mono">
            <span className="text-os-text">Auto-Display Captions & Transcripts</span>
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
              className="accent-os-accent w-4 h-4 rounded cursor-pointer"
            />
          </label>
        </div>
      </div>
    </div>
  );
};
