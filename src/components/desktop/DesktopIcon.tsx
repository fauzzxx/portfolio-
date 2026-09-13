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
      className={`group relative flex flex-col items-center justify-center p-2 w-20 sm:w-22 rounded-lg border transition-all duration-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#0078d4] text-center ${
        isOpen
          ? 'bg-white/10 border-white/20 shadow-sm'
          : 'border-transparent hover:bg-white/[0.08] hover:border-white/15 active:bg-white/[0.14]'
      }`}
    >
      {/* Icon Frame */}
      <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center">
        <AppIcon name={app.icon} className="w-8 h-8 sm:w-9 sm:h-9 filter drop-shadow-md group-hover:scale-105 transition-transform duration-100" />
      </div>

      {/* Label */}
      <span className="mt-1 text-[11px] font-sans text-white win-icon-text leading-tight tracking-tight line-clamp-2 max-w-full px-0.5 select-none">
        {app.shortTitle || app.title}
      </span>
    </button>
  );
};
