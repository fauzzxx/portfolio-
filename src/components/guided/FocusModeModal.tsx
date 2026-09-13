import React, { useState, useEffect } from 'react';
import type { AppId } from '../../types/os';
import { FOCUS_MODES } from '../../data/focusModes';
import type { FocusStep } from '../../data/focusModes';
import {
  Clock,
  X,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { logActivity } from '../../utils/recentActivity';

interface FocusModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (appId: AppId) => void;
  onStartFullTour: () => void;
}

export const FocusModeModal: React.FC<FocusModeModalProps> = ({
  isOpen,
  onClose,
  onOpenApp,
  onStartFullTour,
}) => {
  const [selectedDuration, setSelectedDuration] = useState<'2min' | '5min' | '10min'>('2min');
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentStepIdx(0);
      logActivity('open_app', 'Opened Focus Mode');
    }
  }, [isOpen, selectedDuration]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  if (!isOpen) return null;

  const currentModeConfig = selectedDuration !== '10min' ? FOCUS_MODES[selectedDuration] : null;
  const currentStep: FocusStep | undefined = currentModeConfig?.steps[currentStepIdx];
  const totalSteps = currentModeConfig?.steps.length || 0;

  const handleNext = () => {
    if (currentStepIdx < totalSteps - 1) {
      setCurrentStepIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx((prev) => prev - 1);
    }
  };

  const handleActionClick = (step: FocusStep) => {
    if (step.targetAppId) {
      onOpenApp(step.targetAppId);
      logActivity('open_app', `Focus Step: ${step.title}`, { appId: step.targetAppId });
    }
  };

  const handleStart10Min = () => {
    onClose();
    onStartFullTour();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xl select-none font-sans text-white">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#1f1f1f] border border-white/10 shadow-win-flyout flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Top Header */}
        <div className="px-5 py-3.5 border-b border-white/10 bg-[#252525] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-[#0078d4]/20 text-[#60cdff]">
              <Clock className="w-4 h-4 text-[#0078d4]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-sm font-bold tracking-tight text-white">FOCUS MODE</h2>
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-white/70 font-mono">
                  {selectedDuration === '10min' ? 'Full Tour' : currentModeConfig?.estimatedTime}
                </span>
              </div>
              <p className="text-[11px] text-white/50">
                Curated high-value portfolio briefings
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Duration Switcher Tabs */}
        <div className="px-5 pt-3 pb-2 border-b border-white/5 flex items-center justify-between bg-[#222222]">
          <div className="flex items-center space-x-1.5 bg-black/40 p-1 rounded-lg border border-white/5 text-xs">
            <button
              onClick={() => setSelectedDuration('2min')}
              className={`px-3 py-1 rounded font-semibold transition-all ${
                selectedDuration === '2min'
                  ? 'bg-[#0078d4] text-white shadow-sm'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              2 Minutes
            </button>
            <button
              onClick={() => setSelectedDuration('5min')}
              className={`px-3 py-1 rounded font-semibold transition-all ${
                selectedDuration === '5min'
                  ? 'bg-[#0078d4] text-white shadow-sm'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              5 Minutes
            </button>
            <button
              onClick={() => setSelectedDuration('10min')}
              className={`px-3 py-1 rounded font-semibold transition-all ${
                selectedDuration === '10min'
                  ? 'bg-[#0078d4] text-white shadow-sm'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              10 Minutes (Full Tour)
            </button>
          </div>

          {selectedDuration !== '10min' && (
            <span className="text-xs text-white/50 font-mono">
              Step {currentStepIdx + 1} of {totalSteps}
            </span>
          )}
        </div>

        {/* Body Content */}
        <div className="p-6 flex-1 min-h-[320px] flex flex-col justify-between overflow-y-auto win-scrollbar">
          {selectedDuration === '10min' ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#0078d4]/20 border border-[#0078d4]/30 flex items-center justify-center mx-auto text-[#0078d4]">
                <Sparkles className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">Full Guided OS Tour (26 Chapters)</h3>
                <p className="text-xs text-white/70 max-w-md mx-auto leading-relaxed">
                  Immerse yourself in the comprehensive walk-through exploring every project, vision pipeline, architecture, and career milestone.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleStart10Min}
                  className="px-5 py-2 rounded-xl bg-[#0078d4] hover:bg-[#1084d9] text-white text-xs font-semibold transition-colors shadow-sm inline-flex items-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Launch 26-Chapter Tour</span>
                </button>
              </div>
            </div>
          ) : currentStep ? (
            <div className="space-y-4">
              {/* Step Title Header */}
              <div>
                <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#60cdff] block font-semibold">
                  {currentModeConfig?.tagline} • Section {currentStep.stepNumber}
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
                  {currentStep.title}
                </h3>
                <p className="text-xs text-white/60 font-medium">{currentStep.subtitle}</p>
              </div>

              {/* Highlight Callout Box */}
              <div className="p-3.5 rounded-xl bg-[#0078d4]/10 border border-[#0078d4]/20 text-xs text-white/90 leading-relaxed font-normal">
                {currentStep.highlightText}
              </div>

              {/* Bullets */}
              <div className="space-y-2 pt-1">
                {currentStep.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 text-xs text-white/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0078d4] mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              {currentStep.actionLabel && (
                <div className="pt-2">
                  <button
                    onClick={() => handleActionClick(currentStep)}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors border border-white/10"
                  >
                    <span>{currentStep.actionLabel}</span>
                    <ExternalLink className="w-3 h-3 text-white/60" />
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Footer Navigation (for 2m and 5m) */}
        {selectedDuration !== '10min' && (
          <div className="px-6 py-3 border-t border-white/10 bg-[#252525] flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentStepIdx === 0}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center space-x-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {/* Progress Dots */}
            <div className="flex items-center space-x-1.5">
              {currentModeConfig?.steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStepIdx(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentStepIdx
                      ? 'w-6 bg-[#0078d4]'
                      : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Jump to step ${idx + 1}`}
                />
              ))}
            </div>

            {currentStepIdx < totalSteps - 1 ? (
              <button
                onClick={handleNext}
                className="px-3.5 py-1.5 rounded-lg bg-[#0078d4] hover:bg-[#1084d9] text-white text-xs font-semibold transition-colors flex items-center space-x-1"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-lg bg-[#107c41] hover:bg-[#128b4a] text-white text-xs font-semibold transition-colors"
              >
                Done
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
