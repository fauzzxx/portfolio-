import React, { useState, useRef, useEffect } from 'react';
import type { WindowState, AppId } from '../../types/os';
import { SYSTEM_APPS } from '../../data/apps';
import { AppIcon } from '../common/AppIcon';
import { SystemTray } from './SystemTray';
import { LayoutGrid, Search, Sparkles } from 'lucide-react';

interface TaskbarProps {
  windows: Record<string, WindowState>;
  activeWindowId: AppId | null;
  onOpenApp: (appId: AppId) => void;
  onFocusWindow: (appId: AppId) => void;
  onMinimizeWindow: (appId: AppId) => void;
  onOpenSearch?: () => void;
  onStartGuidedExperience?: () => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  activeWindowId,
  onOpenApp,
  onFocusWindow,
  onMinimizeWindow,
  onOpenSearch,
  onStartGuidedExperience,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close start menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

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
    <div className="relative z-50">
      {/* OS Start / Launcher Menu Popover */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute bottom-16 left-3 w-80 rounded-2xl bg-os-surface/95 backdrop-blur-xl border border-os-border shadow-2xl p-4 space-y-3 font-mono text-xs select-none"
        >
          <div className="flex items-center justify-between pb-2 border-b border-os-border text-os-muted">
            <span className="font-bold text-os-text tracking-wider">FAUZAAN OS // APPS</span>
            <span className="text-[10px] text-os-accent font-semibold">v1.0.0</span>
          </div>

          {/* Quick Guided Experience Button in Start Menu */}
          {onStartGuidedExperience && (
            <button
              onClick={() => {
                onStartGuidedExperience();
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-os-accent/15 border border-os-accent/40 text-os-text hover:bg-os-accent/25 transition-colors font-bold"
            >
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-os-accent" />
                <span>Start Guided Experience</span>
              </div>
              <span className="text-[10px] text-os-accent">26 Ch</span>
            </button>
          )}

          <div className="grid grid-cols-2 gap-1.5 max-h-72 overflow-y-auto pr-1">
            {SYSTEM_APPS.map((app) => (
              <button
                key={app.id}
                onClick={() => {
                  onOpenApp(app.id);
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/5 text-left text-os-text transition-colors"
              >
                <div className="w-6 h-6 rounded bg-os-card border border-os-border flex items-center justify-center text-os-accent shrink-0">
                  <AppIcon name={app.icon} className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">{app.shortTitle || app.title}</span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-os-border/60 flex items-center justify-between text-[11px] text-os-dim">
            <span>Operating System</span>
            <span className="text-os-emerald font-semibold">SYSTEM READY</span>
          </div>
        </div>
      )}

      {/* Fixed Bottom Taskbar */}
      <header className="fixed bottom-0 left-0 right-0 h-14 bg-os-surface/90 backdrop-blur-md border-t border-os-border px-3 sm:px-4 flex items-center justify-between shadow-dock">
        {/* Left: OS Launcher Trigger & Search */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border transition-all select-none ${
              isMenuOpen
                ? 'bg-os-accent/20 border-os-accent text-os-text font-bold'
                : 'bg-os-card border-os-border text-os-text hover:border-os-accent/50 active:bg-os-card/80'
            }`}
          >
            <span className="w-2 h-2 rounded-sm bg-os-accent rotate-45" />
            <span className="text-xs font-mono font-bold tracking-wider hidden sm:inline">
              FAUZAAN OS
            </span>
            <LayoutGrid className="w-3.5 h-3.5 text-os-accent sm:hidden" />
          </button>

          {/* Quick Search Button */}
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              title="Search (Ctrl+K)"
              className="p-2 rounded-lg bg-os-card border border-os-border text-os-muted hover:text-os-text hover:border-os-accent/40 transition-colors hidden sm:flex items-center justify-center"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Center: Running / Open App Task Pills */}
        <div className="flex-1 flex items-center space-x-1.5 mx-3 overflow-x-auto no-scrollbar py-1">
          {openWindowsList.map((win) => {
            const isActive = activeWindowId === win.appId && !win.isMinimized;
            return (
              <button
                key={win.id}
                onClick={() => handleTaskClick(win.appId)}
                className={`group flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all duration-150 shrink-0 select-none ${
                  isActive
                    ? 'bg-os-card border-os-accent text-os-text shadow-sm'
                    : win.isMinimized
                    ? 'bg-os-surface/60 border-os-border/50 text-os-dim hover:text-os-muted'
                    : 'bg-os-surface border-os-border text-os-muted hover:text-os-text'
                }`}
              >
                <div
                  className={`w-4 h-4 flex items-center justify-center rounded ${
                    isActive ? 'text-os-accent' : 'text-os-muted'
                  }`}
                >
                  <AppIcon name={win.icon} className="w-3.5 h-3.5" />
                </div>
                <span className="truncate max-w-[120px]">{win.title}</span>
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    isActive
                      ? 'bg-os-accent shadow-[0_0_6px_#00e5ff]'
                      : 'bg-os-dim group-hover:bg-os-muted'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right: System Tray */}
        <SystemTray onOpenApp={onOpenApp} />
      </header>
    </div>
  );
};
