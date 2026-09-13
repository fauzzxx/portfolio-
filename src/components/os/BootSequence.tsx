import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_MESSAGES = [
  'Starting FAUZAAN OS...',
  'Preparing personal workstation...',
  'Loading projects and intelligence models...',
  'Applying user preferences...',
  'Welcome to FAUZAAN OS',
];

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => {
        if (prev < BOOT_MESSAGES.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 380);

    const finishTimer = setTimeout(() => {
      onComplete();
    }, 1900);

    return () => {
      clearInterval(interval);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-between p-8 select-none font-sans text-white"
    >
      <div />

      {/* Center Windows 11 Logo & Spinner */}
      <div className="flex flex-col items-center space-y-10">
        {/* Windows 4-square Logo */}
        <div className="grid grid-cols-2 gap-1.5 w-16 h-16">
          <div className="bg-[#0078d4] rounded-sm transition-transform duration-300" />
          <div className="bg-[#0078d4] rounded-sm transition-transform duration-300" />
          <div className="bg-[#0078d4] rounded-sm transition-transform duration-300" />
          <div className="bg-[#0078d4] rounded-sm transition-transform duration-300" />
        </div>

        {/* Windows Circling Dots Spinner */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
          <div className="text-xs text-white/80 font-normal tracking-wide">
            {BOOT_MESSAGES[messageIndex]}
          </div>
        </div>
      </div>

      {/* Bottom Skip Prompt */}
      <div className="text-[11px] text-white/40">
        Press <span className="text-white/60">ESC</span> to skip startup
      </div>
    </motion.div>
  );
};
