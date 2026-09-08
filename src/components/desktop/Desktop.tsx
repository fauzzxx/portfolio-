import React from 'react';
import { SYSTEM_APPS } from '../../data/apps';
import { DesktopIcon } from './DesktopIcon';
import { SystemStatus } from './SystemStatus';
import type { WindowState, AppId } from '../../types/os';
import { Sparkles, Terminal, Search } from 'lucide-react';

interface DesktopProps {
  windows: Record<string, WindowState>;
  onOpenApp: (appId: AppId) => void;
  onStartGuidedExperience: () => void;
  onOpenSearch: () => void;
}

export const Desktop: React.FC<DesktopProps> = ({
  windows,
  onOpenApp,
  onStartGuidedExperience,
  onOpenSearch,
}) => {
  return (
    <div className="relative w-full h-[calc(100vh-56px)] overflow-y-auto overflow-x-hidden os-grid-bg p-4 sm:p-8 flex flex-col justify-between select-none">
      {/* Ambient background glow accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-os-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[28rem] h-[28rem] bg-os-neural/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar / Branding & Telemetry Header */}
      <div className="relative z-0 flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center space-x-2.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-os-accent rotate-45 inline-block" />
            <span className="text-sm font-bold font-mono tracking-widest text-os-text">
              FAUZAAN OS
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-os-muted">
              v1.0.0
            </span>
          </div>
          <p className="text-xs text-os-muted font-light max-w-sm hidden sm:block">
            Computer Vision • AI Automation • Full-Stack Systems Engineering
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Quick Universal Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-os-card/70 border border-os-border hover:border-os-accent/40 text-xs font-mono text-os-muted hover:text-os-text transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-os-accent" />
            <span>Search Systems</span>
            <span className="text-[10px] text-os-dim px-1 rounded bg-white/5 border border-white/10">
              Ctrl+K
            </span>
          </button>

          {/* System Telemetry HUD */}
          <SystemStatus />
        </div>
      </div>

      {/* Main Desktop Workspace Area: App Launcher Grid */}
      <div className="relative z-0 my-auto py-6">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 gap-y-4 sm:gap-y-6 gap-x-2 max-w-5xl mx-auto items-center justify-items-center">
          {SYSTEM_APPS.map((app) => (
            <DesktopIcon
              key={app.id}
              app={app}
              isOpen={Boolean(windows[app.id]?.isOpen && !windows[app.id]?.isMinimized)}
              onOpen={() => onOpenApp(app.id)}
            />
          ))}
        </div>
      </div>

      {/* Desktop Footer Actions: Guided Experience Invitation */}
      <div className="relative z-0 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-os-border/40">
        <div className="flex items-center space-x-2 text-xs font-mono text-os-dim">
          <Terminal className="w-3.5 h-3.5 text-os-accent" />
          <span>Select any module to open • Guided tour available</span>
        </div>

        {/* Start Guided Experience Button */}
        <button
          onClick={onStartGuidedExperience}
          className="group flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-os-card to-os-card border border-os-accent/40 hover:border-os-accent text-os-text text-xs font-mono shadow-lg shadow-os-accent/5 transition-all"
        >
          <Sparkles className="w-4 h-4 text-os-accent group-hover:rotate-12 transition-transform" />
          <span className="font-bold tracking-wide">START GUIDED EXPERIENCE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-os-accent animate-pulse" />
        </button>
      </div>
    </div>
  );
};
