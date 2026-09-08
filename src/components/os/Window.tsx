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
      dragElastic={0.05}
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
      }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.12 } }}
      onPointerDown={onFocus}
      style={{
        zIndex: windowState.zIndex,
        ...(isMaximized
          ? {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 56, // taskbar height
              width: '100vw',
              height: 'calc(100vh - 56px)',
              transform: 'none',
            }
          : {
              position: 'absolute',
              left: windowState.position.x,
              top: windowState.position.y,
              width: windowState.size.width,
              height: windowState.size.height,
              maxWidth: 'calc(100vw - 20px)',
              maxHeight: 'calc(100vh - 80px)',
            }),
      }}
      className={`flex flex-col bg-os-surface/95 backdrop-blur-md rounded-lg overflow-hidden transition-shadow duration-200 border ${
        isActive
          ? 'border-os-accent/40 shadow-window-active'
          : 'border-os-border shadow-window'
      } ${isMaximized ? 'rounded-none border-t-0 border-x-0' : ''}`}
    >
      {/* OS Window Titlebar Header */}
      <div
        onPointerDown={(e) => {
          onFocus();
          if (!isMaximized) {
            dragControls.start(e);
          }
        }}
        onDoubleClick={onToggleMaximize}
        className={`h-10 px-3.5 flex items-center justify-between select-none border-b cursor-grab active:cursor-grabbing transition-colors duration-150 ${
          isActive
            ? 'bg-os-card/90 border-os-border text-os-text'
            : 'bg-os-surface/80 border-os-border/60 text-os-muted'
        }`}
      >
        {/* Left: App Identity */}
        <div className="flex items-center space-x-2.5 min-w-0">
          <div
            className={`w-5 h-5 flex items-center justify-center rounded transition-colors ${
              isActive ? 'text-os-accent' : 'text-os-muted'
            }`}
          >
            <AppIcon name={windowState.icon} className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold tracking-wide truncate font-mono">
            {windowState.title}
          </span>
          {isActive && (
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-os-accent animate-pulse" />
          )}
        </div>

        {/* Right: Window Controls */}
        <div
          className="flex items-center space-x-1"
          onPointerDown={(e) => e.stopPropagation()}
        >
          {/* Minimize Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            title="Minimize"
            className="w-7 h-7 flex items-center justify-center rounded text-os-muted hover:text-os-text hover:bg-white/5 active:bg-white/10 transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          {/* Maximize / Restore Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleMaximize();
            }}
            title={isMaximized ? 'Restore' : 'Maximize'}
            className="w-7 h-7 flex items-center justify-center rounded text-os-muted hover:text-os-text hover:bg-white/5 active:bg-white/10 transition-colors hidden sm:flex"
          >
            {isMaximized ? (
              <Copy className="w-3 h-3 rotate-180" />
            ) : (
              <Square className="w-3 h-3" />
            )}
          </button>

          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            title="Close"
            className="w-7 h-7 flex items-center justify-center rounded text-os-muted hover:text-os-rose hover:bg-os-rose/10 active:bg-os-rose/20 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* OS Window Body */}
      <div className="flex-1 overflow-auto bg-os-bg/95 relative text-os-text">
        {children}
      </div>
    </motion.div>
  );
};
