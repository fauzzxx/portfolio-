import React, { useState } from 'react';
import type { ExperienceMode } from '../../types/os';
import { Briefcase, Cpu, Globe, Compass, Check, X, Sparkles } from 'lucide-react';

interface ExperienceSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMode: (mode: ExperienceMode) => void;
  currentMode?: ExperienceMode;
}

interface ModeOption {
  id: ExperienceMode;
  title: string;
  badge: string;
  icon: React.ReactNode;
  description: string;
  highlights: string[];
}

export const ExperienceSelectorModal: React.FC<ExperienceSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectMode,
  currentMode = 'explore',
}) => {
  const [selected, setSelected] = useState<ExperienceMode>(currentMode);
  const [rememberChoice, setRememberChoice] = useState<boolean>(true);

  if (!isOpen) return null;

  const options: ModeOption[] = [
    {
      id: 'recruiter',
      title: 'Recruiter',
      badge: 'Talent & Hiring',
      icon: <Briefcase className="w-5 h-5 text-[#107c41]" />,
      description: 'Prioritizes verified engineering roles, SIH 2024 national prize, resume, and direct contact.',
      highlights: ['Resume Viewer', 'SIH 2024 Award', 'Market Now & Rubat AI', 'Contact Dialog'],
    },
    {
      id: 'technical',
      title: 'Technical Interviewer',
      badge: 'Systems & Architecture',
      icon: <Cpu className="w-5 h-5 text-[#00a4ef]" />,
      description: 'Focuses on deep learning architectures, offline AI (AL-AQL), computer vision tracking, and build traces.',
      highlights: ['AI Lab & RAG', 'Quantization (4-bit NF4)', 'Computer Vision & YOLO', 'Skills Matrix'],
    },
    {
      id: 'client',
      title: 'Client / Collaborator',
      badge: 'Products & Delivery',
      icon: <Globe className="w-5 h-5 text-[#0078d4]" />,
      description: 'Highlights full-stack product deliveries, live demos, automated pipelines, and client solutions.',
      highlights: ['Live Demos (3)', 'Full-Stack Web Systems', 'Weaver AI & MarketNOW', 'Collaboration Inquiry'],
    },
    {
      id: 'explore',
      title: 'Explore FAUZAAN OS',
      badge: 'Standard Explorer',
      icon: <Compass className="w-5 h-5 text-[#f7b500]" />,
      description: 'The complete desktop workstation experience. Freely navigate all 21 systems, timeline, and terminal.',
      highlights: ['Full OS Freedom', '21 Projects Explorer', 'Career Timeline', 'Guided Tour'],
    },
  ];

  const handleApply = () => {
    if (rememberChoice) {
      try {
        localStorage.setItem('fauzaan_os_experience_mode', selected);
        localStorage.setItem('fauzaan_os_experience_selector_shown', 'true');
      } catch (e) {
        console.warn('Unable to persist experience mode', e);
      }
    }
    onSelectMode(selected);
    onClose();
  };

  const handleSkip = () => {
    try {
      localStorage.setItem('fauzaan_os_experience_selector_shown', 'true');
    } catch {}
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[210] flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md select-none font-sans">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#202020] border border-white/10 shadow-win-flyout flex flex-col overflow-hidden text-white animate-in fade-in zoom-in-95 duration-150">
        {/* Title Bar */}
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-[#282828]">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-[#0078d4]/20 text-[#60cdff]">
              <Sparkles className="w-4 h-4 text-[#0078d4]" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight text-white">WHAT BRINGS YOU HERE?</h2>
              <p className="text-[11px] text-white/60">
                Personalize your FAUZAAN OS recommendations and focus
              </p>
            </div>
          </div>

          <button
            onClick={handleSkip}
            aria-label="Close"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto win-scrollbar">
          {options.map((opt) => {
            const isSelected = selected === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => setSelected(opt.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? 'border-[#0078d4] bg-[#0078d4]/10 shadow-sm ring-1 ring-[#0078d4]/40'
                    : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 rounded-lg bg-black/30 border border-white/5">
                      {opt.icon}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-white tracking-tight">{opt.title}</h3>
                      <span className="text-[10px] text-white/50">{opt.badge}</span>
                    </div>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? 'border-[#0078d4] bg-[#0078d4] text-white'
                        : 'border-white/30'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                  </div>
                </div>

                <p className="text-[11px] text-white/70 leading-relaxed">
                  {opt.description}
                </p>

                <div className="flex flex-wrap gap-1 pt-1 border-t border-white/5">
                  {opt.highlights.map((h) => (
                    <span
                      key={h}
                      className="px-1.5 py-0.5 rounded bg-white/5 text-[9.5px] text-white/80 font-medium"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3 border-t border-white/10 bg-[#252525] flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <label className="flex items-center space-x-2 text-xs text-white/70 cursor-pointer self-start sm:self-center">
            <input
              type="checkbox"
              checked={rememberChoice}
              onChange={(e) => setRememberChoice(e.target.checked)}
              className="rounded bg-black/40 border-white/20 text-[#0078d4] focus:ring-0 w-3.5 h-3.5"
            />
            <span>Remember my choice</span>
          </label>

          <div className="flex items-center space-x-2 self-end sm:self-center">
            <button
              onClick={handleSkip}
              className="px-3.5 py-1.5 rounded-lg text-xs text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              Skip
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-1.5 rounded-lg bg-[#0078d4] hover:bg-[#1084d9] text-white text-xs font-semibold transition-colors shadow-sm"
            >
              Apply Experience
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
