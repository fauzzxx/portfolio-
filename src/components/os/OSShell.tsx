import React, { useState, useEffect } from 'react';
import { useWindowManager } from '../../hooks/useWindowManager';
import { Desktop } from '../desktop/Desktop';
import { WindowManager } from './WindowManager';
import { Taskbar } from '../navigation/Taskbar';
import { GuidedExperienceOverlay } from '../guided/GuidedExperienceOverlay';
import { UniversalSearchModal } from '../navigation/UniversalSearchModal';
import { ProjectDetailModal } from '../projects/ProjectDetailModal';
import { ExperienceSelectorModal } from '../desktop/ExperienceSelectorModal';
import { FocusModeModal } from '../guided/FocusModeModal';
import { PresentationPlayer } from '../presentation/PresentationPlayer';
import { logActivity } from '../../utils/recentActivity';
import { PROJECTS_DATA } from '../../data/projects';
import type { AppId, ExperienceMode } from '../../types/os';
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

  const [isPresentationOpen, setIsPresentationOpen] = useState(false);
  const [isGuidedOpen, setIsGuidedOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isExperienceSelectorOpen, setIsExperienceSelectorOpen] = useState(false);
  const [isFocusModeOpen, setIsFocusModeOpen] = useState(false);
  const [currentExperienceMode, setCurrentExperienceMode] = useState<ExperienceMode>('explore');
  const [searchProjectDetail, setSearchProjectDetail] = useState<Project | null>(null);

  // Check URL query parameters or hash to auto-launch presentation (e.g. ?presentation=true or #presentation)
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const hasPresentationQuery =
        searchParams.get('presentation') === 'true' ||
        searchParams.get('presentation') === '1' ||
        searchParams.has('presentation');
      const hasPresentationHash = window.location.hash.toLowerCase().includes('presentation');
      const hasPresentationPath = window.location.pathname.toLowerCase().includes('presentation');

      if (hasPresentationQuery || hasPresentationHash || hasPresentationPath) {
        setIsPresentationOpen(true);
        return;
      }
    } catch {}

    try {
      const shown = localStorage.getItem('fauzaan_os_experience_selector_shown');
      if (!shown) {
        const timer = setTimeout(() => setIsExperienceSelectorOpen(true), 1200);
        return () => clearTimeout(timer);
      }
      const savedMode = localStorage.getItem('fauzaan_os_experience_mode') as ExperienceMode;
      if (savedMode) setCurrentExperienceMode(savedMode);
    } catch {}
  }, []);

  // Listen to hash changes for deep linking (e.g. #presentation)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.toLowerCase().includes('presentation')) {
        setIsPresentationOpen(true);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync URL hash when presentation is toggled
  useEffect(() => {
    try {
      if (isPresentationOpen) {
        if (window.location.hash !== '#presentation') {
          window.history.replaceState(null, '', '#presentation');
        }
      } else {
        if (window.location.hash === '#presentation') {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      }
    } catch {}
  }, [isPresentationOpen]);

  const handleOpenApp = (appId: AppId) => {
    logActivity('open_app', `Launched ${appId.toUpperCase()}`, { appId });
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
        handleOpenApp('terminal');
      }
      // Escape to close modals
      else if (e.key === 'Escape') {
        if (isPresentationOpen) {
          setIsPresentationOpen(false);
        } else if (searchProjectDetail) {
          setSearchProjectDetail(null);
        } else if (isExperienceSelectorOpen) {
          setIsExperienceSelectorOpen(false);
        } else if (isFocusModeOpen) {
          setIsFocusModeOpen(false);
        } else if (isSearchOpen) {
          setIsSearchOpen(false);
        } else if (isGuidedOpen) {
          setIsGuidedOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isPresentationOpen, searchProjectDetail, isSearchOpen, isGuidedOpen, isExperienceSelectorOpen, isFocusModeOpen]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-os-bg text-os-text flex flex-col select-none">
      {/* OS Desktop Canvas */}
      <Desktop
        windows={windows}
        onOpenApp={handleOpenApp}
        onStartGuidedExperience={() => setIsGuidedOpen(true)}
        onStartPresentation={() => setIsPresentationOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenFocusMode={() => setIsFocusModeOpen(true)}
        onOpenExperienceSelector={() => setIsExperienceSelectorOpen(true)}
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
        onStartPresentation={() => setIsPresentationOpen(true)}
        onOpenExperienceSelector={() => setIsExperienceSelectorOpen(true)}
      />

      {/* Universal Search Modal (Ctrl+K) */}
      <UniversalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onOpenApp={handleOpenApp}
        onOpenProject={(proj) => {
          logActivity('view_project', `Viewed ${proj.title}`, { projectId: proj.id });
          setSearchProjectDetail(proj);
        }}
      />

      {/* Direct Project Detail Modal from Universal Search */}
      {searchProjectDetail && (
        <ProjectDetailModal
          project={searchProjectDetail}
          onClose={() => setSearchProjectDetail(null)}
        />
      )}

      {/* Experience Mode Selector Modal ("WHAT BRINGS YOU HERE?") */}
      <ExperienceSelectorModal
        isOpen={isExperienceSelectorOpen}
        onClose={() => setIsExperienceSelectorOpen(false)}
        onSelectMode={(mode) => {
          setCurrentExperienceMode(mode);
          window.dispatchEvent(new CustomEvent('fauzaan_experience_mode_changed', { detail: mode }));
        }}
        currentMode={currentExperienceMode}
      />

      {/* Focus Mode Briefing Modal (2m, 5m, 10m) */}
      <FocusModeModal
        isOpen={isFocusModeOpen}
        onClose={() => setIsFocusModeOpen(false)}
        onOpenApp={handleOpenApp}
        onStartFullTour={() => setIsGuidedOpen(true)}
      />

      {/* Cinematic Guided Experience Overlay */}
      {isGuidedOpen && (
        <GuidedExperienceOverlay
          onExit={() => setIsGuidedOpen(false)}
          onOpenApp={handleOpenApp}
        />
      )}

      {/* FAUZAAN OS Automated Project Presentation (4-5 min) */}
      {isPresentationOpen && (
        <PresentationPlayer
          onClose={() => setIsPresentationOpen(false)}
          onOpenProject={(projId) => {
            setIsPresentationOpen(false);
            const found = PROJECTS_DATA.find((p) => p.id === projId);
            if (found) setSearchProjectDetail(found);
          }}
        />
      )}
    </div>
  );
};
