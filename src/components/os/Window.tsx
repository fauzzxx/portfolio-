import React, { useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { Minus, Square, Copy, X } from 'lucide-react';
import type { WindowState } from '../../types/os';
import { AppIcon } from '../common/AppIcon';

interface WindowProps {
  windowState: WindowState;
  isActive: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({
  windowState,
  isActive,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  children,
}) => {
  const dragControls = useDragControls();
  const windowRef = useRef<HTMLDivElement>(null);

  if (!windowState.isOpen || windowState.isMinimized) {
    return null;
  }

  const isMaximized = windowState.isMaximized;

  return (
    <motion.div
      ref={windowRef}
      drag={!isMaximized}
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0.03}
      initial={{ opacity: 0, scale: 0.96, y: 10 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.16, ease: [0.16, 1, 0.3, 1] },
      }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.1 } }}
      onPointerDown={onFocus}
      style={{
        zIndex: windowState.zIndex,
        ...(isMaximized
          ? {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 48, // taskbar height
              width: '100vw',
              height: 'calc(100vh - 48px)',
              transform: 'none',
            }
          : {
              position: 'absolute',
              left: windowState.position.x,
              top: windowState.position.y,
              width: windowState.size.width,
              height: windowState.size.height,
              maxWidth: 'calc(100vw - 16px)',
              maxHeight: 'calc(100vh - 64px)',
            }),
      }}
      className={`flex flex-col overflow-hidden transition-shadow duration-150 border ${
        isActive
          ? 'border-[#0078d4]/40 dark:border-[#0078d4]/40 shadow-2xl ring-1 ring-black/5 dark:ring-white/5'
          : 'border-black/15 dark:border-white/10 shadow-xl'
      } ${
        isMaximized
          ? 'rounded-none border-t-0 border-x-0'
          : 'rounded-lg'
      }`}
    >
      {/* Windows 11 Titlebar */}
      <div
        onPointerDown={(e) => {
          onFocus();
          if (!isMaximized) {
            dragControls.start(e);
          }
        }}
        onDoubleClick={onToggleMaximize}
        className={`h-[34px] pl-3 flex items-center justify-between select-none border-b cursor-default transition-colors duration-100 ${
          isActive
            ? 'bg-[#f0f0f0]/95 dark:bg-[#242424]/95 border-black/10 dark:border-white/10 text-win-text-light dark:text-win-text-dark'
            : 'bg-[#f7f7f7]/90 dark:bg-[#1c1c1c]/90 border-black/5 dark:border-white/5 text-win-muted-light dark:text-win-muted-dark'
        }`}
      >
        {/* Left: Window App Identity */}
        <div className="flex items-center space-x-2.5 min-w-0 pr-2 pointer-events-none">
          <div className="w-4 h-4 flex items-center justify-center shrink-0">
            <AppIcon name={windowState.icon} className="w-3.5 h-3.5" />
          </div>
          <span className="text-[11.5px] font-medium tracking-normal truncate text-win-text-light dark:text-win-text-dark">
            {windowState.title}
          </span>
        </div>

        {/* Right: Windows Controls (Minimize, Maximize, Close) */}
        <div
          className="flex items-center h-full shrink-0"
          onPointerDown={(e) => e.stopPropagation()}
        >
          {/* Minimize */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            title="Minimize"
            aria-label="Minimize window"
            className="w-11 h-full flex items-center justify-center text-win-muted-light dark:text-win-muted-dark hover:bg-black/5 dark:hover:bg-white/10 hover:text-win-text-light dark:hover:text-win-text-dark transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          {/* Maximize / Restore */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleMaximize();
            }}
            title={isMaximized ? 'Restore Down' : 'Maximize'}
            aria-label={isMaximized ? 'Restore Down' : 'Maximize'}
            className="w-11 h-full flex items-center justify-center text-win-muted-light dark:text-win-muted-dark hover:bg-black/5 dark:hover:bg-white/10 hover:text-win-text-light dark:hover:text-win-text-dark transition-colors hidden sm:flex"
          >
            {isMaximized ? (
              <Copy className="w-3 h-3 rotate-180" />
            ) : (
              <Square className="w-3 h-3" />
            )}
          </button>

          {/* Close */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            title="Close"
            aria-label="Close window"
            className={`w-11 h-full flex items-center justify-center text-win-muted-light dark:text-win-muted-dark hover:bg-[#e81123] hover:text-white active:bg-[#c4101f] transition-colors ${
              !isMaximized ? 'rounded-tr-lg' : ''
            }`}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* OS Window Content */}
      <div className="flex-1 overflow-auto bg-[#fafafa] dark:bg-[#1a1a1a] relative text-win-text-light dark:text-win-text-dark win-scrollbar">
        {children}
      </div>
    </motion.div>
  );
};
