import React from 'react';
import { useSystemClock } from '../../hooks/useSystemClock';
import { Terminal } from 'lucide-react';
import type { AppId } from '../../types/os';

interface SystemTrayProps {
  onOpenApp: (appId: AppId) => void;
}

export const SystemTray: React.FC<SystemTrayProps> = ({ onOpenApp }) => {
  const { timeStr, dateStr } = useSystemClock();

  return (
    <div className="flex items-center space-x-2 sm:space-x-3 text-xs font-mono select-none">
      {/* Quick Terminal Trigger */}
      <button
        onClick={() => onOpenApp('terminal')}
        title="Open Terminal"
        className="p-1.5 rounded-md text-os-muted hover:text-os-text hover:bg-white/5 active:bg-white/10 transition-colors"
      >
        <Terminal className="w-4 h-4" />
      </button>

      {/* Online indicator */}
      <div className="hidden md:flex items-center space-x-1.5 px-2 py-1 rounded bg-os-emerald/10 border border-os-emerald/20 text-os-emerald text-[10px]">
        <span className="w-1.5 h-1.5 rounded-full bg-os-emerald animate-pulse" />
        <span>SYS_OK</span>
      </div>

      {/* Live System Clock */}
      <div className="flex flex-col items-end px-2 py-1 rounded bg-os-surface border border-os-border/70 min-w-[75px] text-right">
        <span className="text-xs font-semibold text-os-text font-mono leading-none tracking-wider">
          {timeStr || '00:00:00'}
        </span>
        <span className="text-[9px] text-os-dim font-mono leading-tight mt-0.5 tracking-tight hidden sm:block">
          {dateStr || 'SYSTEM CLOCK'}
        </span>
      </div>
    </div>
  );
};
