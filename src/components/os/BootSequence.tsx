import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, FastForward } from 'lucide-react';

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  { text: 'FAUZAAN OS [v1.0.0-release] booting kernel...', delay: 150 },
  { text: 'Initializing personal operating environment...', delay: 350 },
  { text: 'Mounting virtual file systems: /projects, /ai-lab, /skills...', delay: 550 },
  { text: 'Loading intelligence modules (YOLO, OpenCV, RAG engines)...', delay: 750 },
  { text: 'Connecting Model Context Protocol (MCP) agent channels...', delay: 950 },
  { text: 'Indexing hackathon records (SIH 2024 WINNER ₹1,00,000)...', delay: 1150 },
  { text: 'Calibrating user interface and window manager...', delay: 1350 },
  { text: 'System diagnostics clean. Personal workspace ready.', delay: 1550 },
];

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Keyboard shortcut to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onComplete]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LOGS.forEach((log, index) => {
      const t = setTimeout(() => {
        setCurrentStep(index + 1);
        setProgress(Math.round(((index + 1) / BOOT_LOGS.length) * 100));
      }, log.delay);
      timers.push(t);
    });

    const completionTimer = setTimeout(() => {
      onComplete();
    }, 1900);
    timers.push(completionTimer);

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="fixed inset-0 z-[999] bg-os-bg flex flex-col items-center justify-center p-4 select-none font-mono"
    >
      {/* Background grid scanlines */}
      <div className="absolute inset-0 os-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute inset-0 os-scanlines opacity-40 pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg p-6 rounded-2xl bg-os-surface/90 border border-os-border shadow-2xl space-y-6">
        {/* Brand header */}
        <div className="flex items-center justify-between pb-4 border-b border-os-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-os-card border border-os-accent/40 flex items-center justify-center text-os-accent">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-os-text tracking-widest">
                FAUZAAN OS
              </h1>
              <p className="text-[10px] text-os-muted">INITIALIZING SYSTEM WORKSPACE</p>
            </div>
          </div>

          <button
            onClick={onComplete}
            className="flex items-center space-x-1 px-2.5 py-1 rounded bg-white/5 border border-white/10 hover:border-os-accent/40 text-[10px] text-os-muted hover:text-os-text transition-colors"
          >
            <span>SKIP [ESC]</span>
            <FastForward className="w-3 h-3" />
          </button>
        </div>

        {/* Console Logs */}
        <div className="h-44 overflow-y-auto space-y-2 text-[11px] leading-relaxed select-none">
          {BOOT_LOGS.slice(0, currentStep).map((log, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start space-x-2 text-os-muted"
            >
              <span className="text-os-accent font-bold">›</span>
              <span
                className={
                  idx === currentStep - 1 ? 'text-os-text font-medium' : 'text-os-muted'
                }
              >
                {log.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 pt-2 border-t border-os-border/50">
          <div className="flex items-center justify-between text-[10px] text-os-dim">
            <span>KERNEL SEQUENCE</span>
            <span className="text-os-accent font-semibold">{progress}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-os-card border border-os-border/60 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-os-accent to-os-emerald"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.2 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
