import React from 'react';
import { Activity } from 'lucide-react';
import type { SystemStatusIndicator } from '../../types/os';

const STATUS_INDICATORS: SystemStatusIndicator[] = [
  { label: 'SYSTEM', status: 'online', code: 'ONLINE' },
  { label: 'PROJECTS', status: 'ready', code: 'READY' },
  { label: 'AI LAB', status: 'online', code: 'ONLINE' },
  { label: 'MEDIA', status: 'ready', code: 'READY' },
  { label: 'NARRATION', status: 'standby', code: 'STANDBY' },
];

export const SystemStatus: React.FC = () => {
  return (
    <div className="hidden lg:flex flex-col space-y-2 p-3.5 rounded-xl bg-os-card/40 border border-os-border/60 backdrop-blur-sm select-none font-mono text-[11px] w-52">
      <div className="flex items-center justify-between pb-2 border-b border-os-border/40 text-os-muted">
        <span className="flex items-center space-x-1.5 uppercase tracking-wider text-[10px] font-bold">
          <Activity className="w-3.5 h-3.5 text-os-accent" />
          <span>Core Telemetry</span>
        </span>
        <span className="w-2 h-2 rounded-full bg-os-accent animate-pulse" />
      </div>

      <div className="space-y-1.5 pt-1">
        {STATUS_INDICATORS.map((ind) => (
          <div key={ind.label} className="flex items-center justify-between text-os-muted">
            <span className="text-os-dim tracking-wide">{ind.label}</span>
            <span
              className={`font-semibold text-[10px] px-1.5 py-0.2 rounded border ${
                ind.status === 'online'
                  ? 'bg-os-emerald/10 border-os-emerald/30 text-os-emerald'
                  : ind.status === 'ready'
                  ? 'bg-os-accent/10 border-os-accent/30 text-os-accent'
                  : 'bg-os-amber/10 border-os-amber/30 text-os-amber'
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
