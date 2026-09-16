import React, { useState } from 'react';
import { SYSTEM_APPS } from '../../data/apps';
import { DesktopIcon } from './DesktopIcon';
import { WindowsWallpaper } from './WindowsWallpaper';
import { DesktopWidget } from './DesktopWidget';
import { DesktopCommandBar } from './DesktopCommandBar';
import { DesktopContextMenu } from './DesktopContextMenu';
import type { WindowState, AppId } from '../../types/os';
import { Play, FolderGit2, Cpu } from 'lucide-react';

interface DesktopProps {
  windows: Record<string, WindowState>;
  onOpenApp: (appId: AppId) => void;
  onStartGuidedExperience: () => void;
  onOpenSearch: () => void;
  onOpenFocusMode?: () => void;
  onOpenExperienceSelector?: () => void;
  onStartPresentation?: () => void;
}

export const Desktop: React.FC<DesktopProps> = ({
  windows,
  onOpenApp,
  onStartGuidedExperience,
  onOpenFocusMode,
  onOpenExperienceSelector,
  onStartPresentation,
}) => {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleDesktopClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName !== 'BUTTON') {
      setContextMenu(null);
    }
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      onClick={handleDesktopClick}
      className="relative w-full h-[calc(100vh-48px)] overflow-y-auto lg:overflow-hidden select-none p-3 sm:p-6 flex flex-col justify-between win-scrollbar"
    >
      {/* Windows 11 Abstract Wallpaper with Slideshow and Theme Presets */}
      <WindowsWallpaper />

      {/* Main Workspace Layout */}
      <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between h-full gap-3">
        {/* Mobile Presentation & Profile Hero Card (< lg screens) */}
        <div className="lg:hidden w-full flex flex-col p-3.5 rounded-2xl bg-[#1e1e1e]/90 backdrop-blur-2xl border border-white/15 text-white shadow-2xl space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#107c41] animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-[#60cdff] uppercase font-bold">
                FAUZAAN OS
              </span>
            </div>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-white/70 font-mono">
              PORTABLE EDITION
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-sm font-bold text-white tracking-tight">Fauzaan</h1>
              <p className="text-[11px] text-white/70 font-medium">Computer Science Engineer</p>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-amber-400 font-semibold">SIH '24 Winner</div>
              <span className="text-[10px] text-white/50 font-mono">Osmania Univ (8.32)</span>
            </div>
          </div>

          {/* Primary Mobile START PRESENTATION Button */}
          {onStartPresentation && (
            <button
              onClick={onStartPresentation}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#0078d4] via-[#1084d9] to-[#0078d4] text-white text-xs font-bold transition-all shadow-lg shadow-blue-500/30 border border-white/25 active:scale-[0.98] group"
            >
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shadow-inner">
                  <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                </div>
                <span className="tracking-wide">START PRESENTATION</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-black/40 text-white font-mono font-semibold">
                4–5 MIN
              </span>
            </button>
          )}

          {/* Quick Action Shortcuts on Mobile */}
          <div className="grid grid-cols-2 gap-1.5 pt-0.5">
            <button
              onClick={() => onOpenApp('projects')}
              className="flex items-center justify-center space-x-1.5 py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-medium text-white/90 transition-colors"
            >
              <FolderGit2 className="w-3.5 h-3.5 text-[#f7b500]" />
              <span>Projects Explorer</span>
            </button>
            <button
              onClick={() => onOpenApp('ai-lab')}
              className="flex items-center justify-center space-x-1.5 py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-medium text-white/90 transition-colors"
            >
              <Cpu className="w-3.5 h-3.5 text-[#0078d4]" />
              <span>AI Lab</span>
            </button>
          </div>
        </div>

        {/* Windows-style Desktop Icons (Vertical-flowing Grid) */}
        <div className="grid grid-flow-col grid-rows-6 gap-y-2 gap-x-2 sm:gap-y-3 sm:gap-x-4 max-h-[calc(100vh-80px)]">
          {SYSTEM_APPS.map((app) => (
            <DesktopIcon
              key={app.id}
              app={app}
              isOpen={Boolean(windows[app.id]?.isOpen && !windows[app.id]?.isMinimized)}
              onOpen={() => onOpenApp(app.id)}
            />
          ))}
        </div>

        {/* Right-Side: System Profile Widget & Quick Command Bar (Visible on lg and larger) */}
        <div className="hidden lg:flex self-start pt-1 pr-2 flex-col items-end space-y-3">
          <DesktopWidget
            onStartGuidedExperience={onStartGuidedExperience}
            onOpenApp={onOpenApp}
            onOpenFocusMode={onOpenFocusMode}
            onStartPresentation={onStartPresentation}
          />

          <DesktopCommandBar onOpenApp={onOpenApp} />
        </div>
      </div>

      {/* Mobile Floating Quick Presentation Pill (fixed above taskbar) */}
      {onStartPresentation && (
        <div className="lg:hidden fixed bottom-14 right-3 z-30">
          <button
            onClick={onStartPresentation}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-[#0078d4] to-[#1084d9] text-white font-bold text-xs shadow-xl shadow-blue-500/35 border border-white/25 active:scale-95 transition-transform"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Presentation</span>
            <span className="text-[9px] px-1 rounded bg-black/30 text-white/90 font-mono">4-5m</span>
          </button>
        </div>
      )}

      {/* Right-click Context Menu */}
      {contextMenu && (
        <DesktopContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onOpenApp={onOpenApp}
          onStartGuidedExperience={onStartGuidedExperience}
          onOpenFocusMode={onOpenFocusMode}
          onOpenExperienceSelector={onOpenExperienceSelector}
          onStartPresentation={onStartPresentation}
          onRefresh={() => setContextMenu(null)}
        />
      )}
    </div>
  );
};
