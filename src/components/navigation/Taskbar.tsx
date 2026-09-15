import React, { useState } from 'react';
import type { WindowState, AppId } from '../../types/os';
import { AppIcon } from '../common/AppIcon';
import { StartMenu } from './StartMenu';
import { CalendarFlyout } from './CalendarFlyout';
import { QuickSettingsFlyout } from './QuickSettingsFlyout';
import { useSystemClock } from '../../hooks/useSystemClock';
import { Search, Wifi, Volume2, Battery } from 'lucide-react';

interface TaskbarProps {
  windows: Record<string, WindowState>;
  activeWindowId: AppId | null;
  onOpenApp: (appId: AppId) => void;
  onFocusWindow: (appId: AppId) => void;
  onMinimizeWindow: (appId: AppId) => void;
  onOpenSearch: () => void;
  onStartGuidedExperience: () => void;
  onRestartBoot?: () => void;
  onOpenExperienceSelector?: () => void;
  onStartPresentation?: () => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  activeWindowId,
  onOpenApp,
  onFocusWindow,
  onMinimizeWindow,
  onOpenSearch,
  onStartGuidedExperience,
  onRestartBoot = () => window.location.reload(),
  onOpenExperienceSelector,
  onStartPresentation,
}) => {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isQuickSettingsOpen, setIsQuickSettingsOpen] = useState(false);

  const { timeStr } = useSystemClock();

  // Format date like Windows (e.g. 9/9/2026)
  const now = new Date();
  const dateFormatted = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
  // 12h time format without seconds for taskbar
  const hours12 = now.getHours() % 12 || 12;
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
  const timeFormatted = `${hours12}:${minutes} ${ampm}`;

  const openWindowsList = Object.values(windows).filter((w) => w.isOpen);

  const handleTaskClick = (appId: AppId) => {
    const target = windows[appId];
    if (!target) {
      onOpenApp(appId);
      return;
    }

    if (target.isMinimized) {
      onFocusWindow(appId);
    } else if (activeWindowId === appId) {
      onMinimizeWindow(appId);
    } else {
      onFocusWindow(appId);
    }
  };

  return (
    <>
      {/* Windows Start Menu */}
      <StartMenu
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
        onOpenApp={onOpenApp}
        onOpenSearch={onOpenSearch}
        onStartGuidedExperience={onStartGuidedExperience}
        onRestartBoot={onRestartBoot}
        onOpenExperienceSelector={onOpenExperienceSelector}
        onStartPresentation={onStartPresentation}
      />

      {/* Windows Calendar Flyout */}
      {isCalendarOpen && (
        <CalendarFlyout onClose={() => setIsCalendarOpen(false)} />
      )}

      {/* Windows Quick Settings Flyout */}
      {isQuickSettingsOpen && (
        <QuickSettingsFlyout
          onClose={() => setIsQuickSettingsOpen(false)}
          onStartGuidedExperience={onStartGuidedExperience}
        />
      )}

      {/* Windows 11 Taskbar (Height: 48px / h-12) */}
      <footer className="fixed bottom-0 left-0 right-0 h-12 bg-[#202020]/95 backdrop-blur-2xl border-t border-white/10 px-2 sm:px-3 flex items-center justify-between z-50 select-none shadow-win-taskbar font-sans">
        {/* Left Spacer on desktop to allow center-aligned task icons */}
        <div className="flex items-center space-x-1 sm:w-48">
          {/* Subtle Mobile/Start branding icon if desired */}
        </div>

        {/* Center: Windows 11 Centered App Bar */}
        <div className="flex items-center space-x-1">
          {/* Windows Start Button */}
          <button
            onClick={() => {
              setIsStartMenuOpen((prev) => !prev);
              setIsCalendarOpen(false);
              setIsQuickSettingsOpen(false);
            }}
            title="Start"
            className={`p-2 rounded-lg transition-all duration-100 flex items-center justify-center ${
              isStartMenuOpen
                ? 'bg-white/15'
                : 'hover:bg-white/10 active:bg-white/15'
            }`}
          >
            {/* Windows 4-Tile Logo */}
            <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
              <div className="bg-[#0078d4] rounded-[1px]" />
              <div className="bg-[#0078d4] rounded-[1px]" />
              <div className="bg-[#0078d4] rounded-[1px]" />
              <div className="bg-[#0078d4] rounded-[1px]" />
            </div>
          </button>

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            title="Search (Ctrl+K)"
            className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 active:bg-white/15 transition-all flex items-center justify-center"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Running Applications Icons */}
          {openWindowsList.map((win) => {
            const isActive = activeWindowId === win.appId && !win.isMinimized;

            return (
              <button
                key={win.id}
                onClick={() => handleTaskClick(win.appId)}
                title={win.title}
                className={`relative px-2.5 h-9 rounded-lg flex items-center justify-center transition-all duration-100 ${
                  isActive
                    ? 'bg-white/15 shadow-sm'
                    : win.isMinimized
                    ? 'hover:bg-white/10 opacity-75'
                    : 'hover:bg-white/10'
                }`}
              >
                <AppIcon name={win.icon} className="w-5 h-5 filter drop-shadow-sm" />

                {/* Windows 11 active indicator bar underneath */}
                <span
                  className={`absolute bottom-0.5 rounded-full transition-all duration-150 ${
                    isActive
                      ? 'w-4 h-1 bg-[#0078d4]'
                      : 'w-1.5 h-1 bg-white/40'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right: System Tray */}
        <div className="flex items-center space-x-0.5 sm:w-48 justify-end text-xs text-white/80">
          {/* Quick Settings Group (Wi-Fi, Audio, Battery) */}
          <button
            onClick={() => {
              setIsQuickSettingsOpen((prev) => !prev);
              setIsCalendarOpen(false);
              setIsStartMenuOpen(false);
            }}
            title="Internet, sound and battery settings"
            className="flex items-center space-x-1.5 px-2 py-1.5 rounded-lg hover:bg-white/10 active:bg-white/15 transition-colors"
          >
            <Wifi className="w-3.5 h-3.5" />
            <Volume2 className="w-3.5 h-3.5" />
            <Battery className="w-3.5 h-3.5 hidden sm:inline" />
          </button>

          {/* Clock and Date (Stacked Windows Format) */}
          <button
            onClick={() => {
              setIsCalendarOpen((prev) => !prev);
              setIsQuickSettingsOpen(false);
              setIsStartMenuOpen(false);
            }}
            title={`Date and Time: ${dateFormatted} ${timeStr}`}
            className="flex flex-col items-end px-2 py-0.5 rounded-lg hover:bg-white/10 active:bg-white/15 transition-colors text-right leading-tight"
          >
            <span className="text-[11px] font-medium text-white">
              {timeFormatted}
            </span>
            <span className="text-[10px] text-white/60">
              {dateFormatted}
            </span>
          </button>
        </div>
      </footer>
    </>
  );
};
