import React, { useState } from 'react';
import type { AppId } from '../../types/os';
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles } from 'lucide-react';
import { logActivity } from '../../utils/recentActivity';

interface DesktopCommandBarProps {
  onOpenApp: (appId: AppId) => void;
}

export const DesktopCommandBar: React.FC<DesktopCommandBarProps> = ({ onOpenApp }) => {
  const [command, setCommand] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const commandMap: Record<string, { appId: AppId; name: string }> = {
    'show projects': { appId: 'projects', name: 'Projects Explorer' },
    'projects': { appId: 'projects', name: 'Projects Explorer' },
    'show ai': { appId: 'ai-lab', name: 'AI Lab' },
    'ai': { appId: 'ai-lab', name: 'AI Lab' },
    'ai lab': { appId: 'ai-lab', name: 'AI Lab' },
    'show skills': { appId: 'skills', name: 'Skills Matrix' },
    'skills': { appId: 'skills', name: 'Skills Matrix' },
    'show achievements': { appId: 'achievements', name: 'Achievements' },
    'achievements': { appId: 'achievements', name: 'Achievements' },
    'awards': { appId: 'achievements', name: 'Achievements' },
    'show experience': { appId: 'experience', name: 'Experience' },
    'experience': { appId: 'experience', name: 'Experience' },
    'show resume': { appId: 'resume', name: 'Resume Viewer' },
    'open resume': { appId: 'resume', name: 'Resume Viewer' },
    'resume': { appId: 'resume', name: 'Resume Viewer' },
    'open terminal': { appId: 'terminal', name: 'Terminal' },
    'terminal': { appId: 'terminal', name: 'Terminal' },
    'contact': { appId: 'contact', name: 'Contact' },
    'show timeline': { appId: 'timeline', name: 'Career Timeline' },
    'timeline': { appId: 'timeline', name: 'Career Timeline' },
    'media': { appId: 'media', name: 'Media Center' },
    'settings': { appId: 'settings', name: 'Settings' },
  };

  const handleExecute = (cmdText?: string) => {
    const raw = (cmdText !== undefined ? cmdText : command).trim().toLowerCase();
    if (!raw) return;

    if (raw === 'clear') {
      setCommand('');
      setFeedback(null);
      return;
    }

    if (raw === 'help') {
      setFeedback('Commands: show projects, show ai, show skills, show achievements, show experience, open resume, contact');
      setTimeout(() => setFeedback(null), 5000);
      return;
    }

    const match = commandMap[raw];
    if (match) {
      setFeedback(`Launching ${match.name}...`);
      onOpenApp(match.appId);
      logActivity('open_app', `Command: ${raw}`, { appId: match.appId });
      setCommand('');
      setTimeout(() => setFeedback(null), 2500);
    } else {
      setFeedback(`Unknown command "${raw}". Try: show projects, show ai, open resume`);
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleExecute();
    }
  };

  return (
    <div className="w-full max-w-md hidden md:flex flex-col bg-[#181818]/90 backdrop-blur-xl border border-white/10 rounded-xl p-2 text-white shadow-win-flyout font-mono select-none">
      <div className="flex items-center space-x-2 px-2 py-1 bg-black/40 rounded-lg border border-white/5">
        <TerminalIcon className="w-3.5 h-3.5 text-[#0078d4] shrink-0" />
        <span className="text-[11px] text-[#60cdff] font-semibold select-none shrink-0">
          fauzaan@os:~$
        </span>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="show projects | show ai | open resume"
          aria-label="Desktop quick command line"
          className="w-full bg-transparent text-xs text-white placeholder-white/30 focus:outline-none font-mono"
        />
        <button
          onClick={() => handleExecute()}
          title="Run command"
          aria-label="Execute command"
          className="p-1 rounded hover:bg-white/10 text-white/50 hover:text-white transition-colors"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </div>

      {feedback && (
        <div className="mt-1.5 px-2 py-1 rounded bg-white/5 text-[11px] text-[#60cdff] flex items-center space-x-1.5 animate-in fade-in duration-150">
          <Sparkles className="w-3 h-3 text-[#f7b500] shrink-0" />
          <span className="truncate">{feedback}</span>
        </div>
      )}

      {/* Suggested Quick Command Chips */}
      <div className="mt-1.5 flex items-center gap-1.5 overflow-x-auto win-scrollbar py-0.5 px-0.5">
        <span className="text-[9.5px] text-white/40 uppercase tracking-wider shrink-0">Try:</span>
        {['show projects', 'show ai', 'show achievements', 'open resume', 'contact'].map((pill) => (
          <button
            key={pill}
            onClick={() => handleExecute(pill)}
            className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 border border-white/5 text-[10.5px] text-white/70 hover:text-white transition-colors shrink-0 font-sans"
          >
            {pill}
          </button>
        ))}
      </div>
    </div>
  );
};
