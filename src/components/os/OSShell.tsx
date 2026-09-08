import React, { useState, useEffect } from 'react';
import { useWindowManager } from '../../hooks/useWindowManager';
import { Desktop } from '../desktop/Desktop';
import { WindowManager } from './WindowManager';
import { Taskbar } from '../navigation/Taskbar';
import { GuidedExperienceOverlay } from '../guided/GuidedExperienceOverlay';
import { UniversalSearchModal } from '../navigation/UniversalSearchModal';
import { ProjectDetailModal } from '../projects/ProjectDetailModal';
import type { AppId } from '../../types/os';
import type { Project } from '../../types/project';

export const OSShell: React.FC = () => {
  const {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    focusWindow,
  } = useWindowManager();

  const [isGuidedOpen, setIsGuidedOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchProjectDetail, setSearchProjectDetail] = useState<Project | null>(null);

  const handleOpenApp = (appId: AppId) => {
    openWindow(appId);
  };

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to open search
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      // Ctrl+` to toggle terminal
      else if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        openWindow('terminal');
      }
      // Escape to close modals
      else if (e.key === 'Escape') {
        if (searchProjectDetail) {
          setSearchProjectDetail(null);
        } else if (isSearchOpen) {
          setIsSearchOpen(false);
        } else if (isGuidedOpen) {
          setIsGuidedOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [searchProjectDetail, isSearchOpen, isGuidedOpen, openWindow]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-os-bg text-os-text flex flex-col select-none">
      {/* OS Desktop Canvas */}
      <Desktop
        windows={windows}
        onOpenApp={handleOpenApp}
        onStartGuidedExperience={() => setIsGuidedOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Layered Window Manager for active windows */}
      <WindowManager
        windows={windows}
        activeWindowId={activeWindowId}
        onFocus={focusWindow}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onToggleMaximize={toggleMaximize}
        onStartGuidedExperience={() => setIsGuidedOpen(true)}
      />

      {/* OS Taskbar and Dock */}
      <Taskbar
        windows={windows}
        activeWindowId={activeWindowId}
        onOpenApp={handleOpenApp}
        onFocusWindow={focusWindow}
        onMinimizeWindow={minimizeWindow}
        onOpenSearch={() => setIsSearchOpen(true)}
        onStartGuidedExperience={() => setIsGuidedOpen(true)}
      />

      {/* Universal Search Modal (Ctrl+K) */}
      <UniversalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onOpenApp={handleOpenApp}
        onOpenProject={(proj) => setSearchProjectDetail(proj)}
      />

      {/* Direct Project Detail Modal from Universal Search */}
      {searchProjectDetail && (
        <ProjectDetailModal
          project={searchProjectDetail}
          onClose={() => setSearchProjectDetail(null)}
        />
      )}

      {/* Cinematic Guided Experience Overlay */}
      {isGuidedOpen && (
        <GuidedExperienceOverlay
          onExit={() => setIsGuidedOpen(false)}
          onOpenApp={(appId) => {
            setIsGuidedOpen(false);
            handleOpenApp(appId);
          }}
        />
      )}
    </div>
  );
};
