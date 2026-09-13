import React, { useState } from 'react';
import type { AppId } from '../../types/os';
import {
  Sparkles,
  FolderGit2,
  Cpu,
  Trophy,
  Layers,
  FileText,
  Briefcase,
  ChevronRight,
  Activity,
  CheckCircle2,
} from 'lucide-react';

interface DesktopWidgetProps {
  onStartGuidedExperience: () => void;
  onOpenApp: (appId: AppId) => void;
  onOpenFocusMode?: () => void;
}

type WidgetTab = 'build' | 'think' | 'proof' | 'now';

export const DesktopWidget: React.FC<DesktopWidgetProps> = ({
  onStartGuidedExperience,
  onOpenApp,
  onOpenFocusMode,
}) => {
  const [activeTab, setActiveTab] = useState<WidgetTab>('build');

  return (
    <div className="hidden lg:flex flex-col p-4 rounded-2xl bg-[#1e1e1e]/90 backdrop-blur-2xl border border-white/10 text-white w-80 space-y-3.5 select-none shadow-win-flyout font-sans">
      {/* Header: FAUZAAN SYSTEM PROFILE */}
      <div className="border-b border-white/10 pb-3">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#107c41] animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-[#60cdff] uppercase font-bold">
              FAUZAAN OS
            </span>
          </div>
          <span className="text-[10px] text-white/50 font-mono">SYSTEM PROFILE</span>
        </div>

        <div className="mt-1">
          <h1 className="text-base font-bold text-white tracking-tight">Fauzaan</h1>
          <p className="text-xs text-white/70 font-medium">Computer Science Engineer</p>
          <div className="mt-1.5 inline-block px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-white/80 font-medium">
            AI • Computer Vision • Machine Learning • Software
          </div>
        </div>
      </div>

      {/* 4 Interactive Segment Controls */}
      <div className="grid grid-cols-4 p-1 rounded-lg bg-black/40 border border-white/5 gap-1">
        {(['build', 'think', 'proof', 'now'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-1 rounded text-[11px] font-bold uppercase transition-all tracking-wider ${
              activeTab === tab
                ? 'bg-[#0078d4] text-white shadow-sm'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Interactive Body Based on Active Tab */}
      <div className="min-h-[160px] flex flex-col justify-between">
        {/* BUILD TAB */}
        {activeTab === 'build' && (
          <div className="space-y-2.5 animate-in fade-in duration-150">
            <div className="text-[11px] text-white/50 uppercase tracking-wider font-semibold">
              Engineered Systems
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Projects',
                'Web Development',
                'AI Systems',
                'App Development',
                'Experiments',
              ].map((item) => (
                <span
                  key={item}
                  className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[11px] text-white/90 font-medium"
                >
                  {item}
                </span>
              ))}
            </div>

            <p className="text-[11px] text-white/60 leading-relaxed pt-1">
              Autonomous agents, sports tracking pipelines, offline multimodal LLMs, and responsive web platforms.
            </p>

            <button
              onClick={() => onOpenApp('projects')}
              className="w-full mt-2 flex items-center justify-between px-3 py-2 rounded-lg bg-[#0078d4] hover:bg-[#1084d9] text-white text-xs font-semibold transition-colors shadow-sm"
            >
              <div className="flex items-center space-x-2">
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>Open Projects Explorer</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* THINK TAB */}
        {activeTab === 'think' && (
          <div className="space-y-2.5 animate-in fade-in duration-150">
            <div className="text-[11px] text-white/50 uppercase tracking-wider font-semibold">
              Intelligence & Tooling
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                'AI',
                'Computer Vision',
                'Machine Learning',
                'RAG',
                'MCP',
                'Agentic AI',
                'Intelligent Systems',
              ].map((item) => (
                <span
                  key={item}
                  className="px-2 py-1 rounded bg-[#00a4ef]/10 border border-[#00a4ef]/30 text-[11px] text-[#60cdff] font-medium"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => onOpenApp('ai-lab')}
                className="flex items-center justify-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors"
              >
                <Cpu className="w-3.5 h-3.5 text-[#00a4ef]" />
                <span>AI Lab</span>
              </button>
              <button
                onClick={() => onOpenApp('skills')}
                className="flex items-center justify-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors"
              >
                <Layers className="w-3.5 h-3.5 text-[#60cdff]" />
                <span>Skills Matrix</span>
              </button>
            </div>
          </div>
        )}

        {/* PROOF TAB */}
        {activeTab === 'proof' && (
          <div className="space-y-2.5 animate-in fade-in duration-150">
            <div className="text-[11px] text-white/50 uppercase tracking-wider font-semibold">
              Verified Records & Accolades
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between p-1.5 rounded bg-white/5 border border-white/5">
                <div className="flex items-center space-x-1.5 text-white/90">
                  <Trophy className="w-3.5 h-3.5 text-[#f7b500]" />
                  <span>SIH 2024 Winner</span>
                </div>
                <span className="text-[10.5px] text-[#f7b500] font-semibold">₹1,00,000</span>
              </div>

              <div className="flex items-center justify-between p-1.5 rounded bg-white/5 border border-white/5">
                <div className="flex items-center space-x-1.5 text-white/90">
                  <Briefcase className="w-3.5 h-3.5 text-[#107c41]" />
                  <span>Market Now</span>
                </div>
                <span className="text-[10px] text-white/50">Senior Backend Dev</span>
              </div>

              <div className="flex items-center justify-between p-1.5 rounded bg-white/5 border border-white/5">
                <div className="flex items-center space-x-1.5 text-white/90">
                  <FileText className="w-3.5 h-3.5 text-[#2b579a]" />
                  <span>Osmania University</span>
                </div>
                <span className="text-[10px] text-white/50">B.Tech (GPA 8.32)</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => onOpenApp('achievements')}
                className="flex items-center justify-center space-x-1 px-2 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-[11px] font-medium transition-colors"
              >
                <span>Awards</span>
                <ChevronRight className="w-3 h-3 text-white/50" />
              </button>
              <button
                onClick={() => onOpenApp('resume')}
                className="flex items-center justify-center space-x-1 px-2 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-[11px] font-medium transition-colors"
              >
                <span>View Resume</span>
                <ChevronRight className="w-3 h-3 text-white/50" />
              </button>
            </div>
          </div>
        )}

        {/* NOW TAB */}
        {activeTab === 'now' && (
          <div className="space-y-2.5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-white/50 uppercase tracking-wider font-semibold">
                Current Focus
              </span>
              <span className="flex items-center space-x-1 text-[10px] text-emerald-400 font-medium">
                <Activity className="w-3 h-3" />
                <span>Active Research</span>
              </span>
            </div>

            <div className="space-y-1 text-[11px] text-white/85">
              {[
                'Computer Vision',
                'Artificial Intelligence',
                'Machine Learning',
                'Intelligent Systems',
                'Agentic AI',
                'Emerging AI Technologies',
              ].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-white/10">
              <button
                onClick={onStartGuidedExperience}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#0078d4] hover:bg-[#1084d9] text-white text-xs font-medium transition-colors shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Guided Tour</span>
              </button>

              {onOpenFocusMode && (
                <button
                  onClick={onOpenFocusMode}
                  className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white/90 text-xs transition-colors font-medium"
                >
                  Focus Briefing
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
