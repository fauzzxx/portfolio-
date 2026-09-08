import React from 'react';
import type { AppMetadata } from '../../types/os';
import { AppIcon } from '../common/AppIcon';

interface DesktopIconProps {
  app: AppMetadata;
  isOpen: boolean;
  onOpen: () => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ app, isOpen, onOpen }) => {
  return (
    <button
      onClick={onOpen}
      className="group relative flex flex-col items-center justify-center p-3 w-24 sm:w-28 rounded-xl hover:bg-white/[0.04] active:bg-white/[0.08] focus:outline-none focus-visible:ring-1 focus-visible:ring-os-accent/50 transition-all duration-150 text-center"
    >
      {/* Icon frame */}
      <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-os-card/80 border border-os-border group-hover:border-os-accent/50 group-hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] flex items-center justify-center text-os-text group-hover:text-os-accent transition-all duration-200">
        <AppIcon name={app.icon} className="w-6 h-6 sm:w-7 sm:h-7" />
        {isOpen && (
          <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-os-accent shadow-[0_0_8px_#00e5ff]" />
        )}
      </div>

      {/* Label */}
      <span className="mt-2 text-[11px] sm:text-xs font-mono font-medium text-os-muted group-hover:text-os-text tracking-wide truncate max-w-full drop-shadow">
        {app.title}
      </span>
    </button>
  );
};
