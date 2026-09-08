import React from 'react';
import { AnimatePresence } from 'framer-motion';
import type { WindowState, AppId } from '../../types/os';
import { Window } from './Window';

import { ProjectsWindow } from '../windows/ProjectsWindow';
import { AILabWindow } from '../windows/AILabWindow';
import { SkillsWindow } from '../windows/SkillsWindow';
import { AchievementsWindow } from '../windows/AchievementsWindow';
import { ExperienceWindow } from '../windows/ExperienceWindow';
import { ResumeWindow } from '../windows/ResumeWindow';
import { AboutWindow } from '../windows/AboutWindow';
import { ReadmeWindow } from '../windows/ReadmeWindow';
import { MediaWindow } from '../windows/MediaWindow';
import { TerminalWindow } from '../windows/TerminalWindow';
import { SettingsWindow } from '../windows/SettingsWindow';
import { ContactWindow } from '../windows/ContactWindow';

interface WindowManagerProps {
  windows: Record<string, WindowState>;
  activeWindowId: AppId | null;
  onFocus: (appId: AppId) => void;
  onClose: (appId: AppId) => void;
  onMinimize: (appId: AppId) => void;
  onToggleMaximize: (appId: AppId) => void;
  onStartGuidedExperience?: () => void;
}

export const WindowManager: React.FC<WindowManagerProps> = ({
  windows,
  activeWindowId,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onStartGuidedExperience,
}) => {
  const renderAppContent = (appId: AppId) => {
    switch (appId) {
      case 'projects':
        return <ProjectsWindow />;
      case 'ai-lab':
        return <AILabWindow />;
      case 'skills':
        return <SkillsWindow />;
      case 'achievements':
        return <AchievementsWindow />;
      case 'experience':
        return <ExperienceWindow />;
      case 'resume':
        return <ResumeWindow />;
      case 'about':
        return <AboutWindow />;
      case 'readme':
        return <ReadmeWindow />;
      case 'media':
        return <MediaWindow />;
      case 'terminal':
        return <TerminalWindow />;
      case 'settings':
        return <SettingsWindow onStartGuidedExperience={onStartGuidedExperience} />;
      case 'contact':
        return <ContactWindow />;
      default:
        return <div className="p-6">Application loaded.</div>;
    }
  };

  const openWindows = Object.values(windows).filter((w) => w.isOpen);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      <AnimatePresence>
        {openWindows.map((win) => (
          <div key={win.id} className="pointer-events-auto">
            <Window
              windowState={win}
              isActive={activeWindowId === win.appId}
              onFocus={() => onFocus(win.appId)}
              onClose={() => onClose(win.appId)}
              onMinimize={() => onMinimize(win.appId)}
              onToggleMaximize={() => onToggleMaximize(win.appId)}
            >
              {renderAppContent(win.appId)}
            </Window>
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};
