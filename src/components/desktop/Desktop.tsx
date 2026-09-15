import React, { useState } from 'react';
import { SYSTEM_APPS } from '../../data/apps';
import { DesktopIcon } from './DesktopIcon';
import { WindowsWallpaper } from './WindowsWallpaper';
import { DesktopWidget } from './DesktopWidget';
import { DesktopCommandBar } from './DesktopCommandBar';
import { DesktopContextMenu } from './DesktopContextMenu';
import type { WindowState, AppId } from '../../types/os';

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
      className="relative w-full h-[calc(100vh-48px)] overflow-hidden select-none p-4 sm:p-6 flex flex-col justify-between"
    >
      {/* Windows 11 Abstract Wallpaper with Slideshow and Theme Presets */}
      <WindowsWallpaper />

      {/* Main Workspace Layout */}
      <div className="relative z-10 flex items-start justify-between h-full">
        {/* Windows-style Desktop Icons (Vertical-flowing Grid on the Left) */}
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

        {/* Right-Side: System Profile Widget & Quick Command Bar */}
        <div className="self-start pt-1 pr-2 flex flex-col items-end space-y-3">
          <DesktopWidget
            onStartGuidedExperience={onStartGuidedExperience}
            onOpenApp={onOpenApp}
            onOpenFocusMode={onOpenFocusMode}
            onStartPresentation={onStartPresentation}
          />

          <DesktopCommandBar onOpenApp={onOpenApp} />
        </div>
      </div>

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
          onRefresh={() => setContextMenu(null)}
        />
      )}
    </div>
  );
};
