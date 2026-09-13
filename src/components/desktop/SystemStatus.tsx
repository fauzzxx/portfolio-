import React from 'react';
import { Activity } from 'lucide-react';
import type { SystemStatusIndicator } from '../../types/os';

const STATUS_INDICATORS: SystemStatusIndicator[] = [
  { label: 'OS KERNEL', status: 'online', code: 'ONLINE' },
  { label: 'FILE SYSTEM', status: 'ready', code: 'READY' },
  { label: 'AI LAB', status: 'online', code: 'ONLINE' },
  { label: 'MEDIA PLAYER', status: 'ready', code: 'READY' },
  { label: 'AUDIO NARRATION', status: 'standby', code: 'STANDBY' },
];

export const SystemStatus: React.FC = () => {
  return (
    <div className="hidden lg:flex flex-col space-y-2 p-3 rounded-lg bg-white/10 dark:bg-black/30 backdrop-blur-md border border-black/10 dark:border-white/10 select-none text-xs w-52 shadow-md">
      <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/10 text-win-muted-light dark:text-win-muted-dark">
        <span className="flex items-center space-x-1.5 uppercase tracking-wider text-[10px] font-semibold text-win-text-light dark:text-win-text-dark">
          <Activity className="w-3.5 h-3.5 text-win-accent" />
          <span>System Diagnostics</span>
        </span>
        <span className="w-2 h-2 rounded-full bg-emerald-500" />
      </div>

      <div className="space-y-1 pt-1">
        {STATUS_INDICATORS.map((ind) => (
          <div key={ind.label} className="flex items-center justify-between text-win-muted-light dark:text-win-muted-dark text-[11px]">
            <span>{ind.label}</span>
            <span
              className={`font-semibold text-[10px] px-1.5 py-0.5 rounded ${
                ind.status === 'online'
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : ind.status === 'ready'
                  ? 'bg-win-accent/10 text-win-accent'
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
              }`}
            >
              {ind.code}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
