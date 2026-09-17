import React, { useState, useEffect, useRef } from 'react';
import { SYSTEM_APPS } from '../../data/apps';
import { AppIcon } from '../common/AppIcon';
import type { AppId, ExperienceMode } from '../../types/os';
import {
  Search,
  Power,
  Settings,
  Sparkles,
  Trophy,
  FileText,
  Cpu,
  ChevronRight,
  Briefcase,
  Globe,
  FolderGit2,
  History,
  Layers,
  Mail,
  Clock,
  Trash2,
  Play,
} from 'lucide-react';
import { getRecentActivities, clearRecentActivities, logActivity } from '../../utils/recentActivity';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (appId: AppId) => void;
  onOpenSearch: () => void;
  onStartGuidedExperience: () => void;
  onRestartBoot: () => void;
  onOpenExperienceSelector?: () => void;
  onStartPresentation?: () => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({
  isOpen,
  onClose,
  onOpenApp,
  onOpenSearch,
  onStartGuidedExperience,
  onRestartBoot,
  onOpenExperienceSelector,
  onStartPresentation,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [experienceMode, setExperienceMode] = useState<ExperienceMode>('explore');
  const [recentList, setRecentList] = useState(getRecentActivities());

  useEffect(() => {
    try {
      const saved = localStorage.getItem('fauzaan_os_experience_mode') as ExperienceMode;
      if (saved) setExperienceMode(saved);
    } catch {}

    const handleModeChange = (e: any) => {
      if (e.detail) setExperienceMode(e.detail);
    };

    const handleActivityChange = () => {
      setRecentList(getRecentActivities());
    };

    window.addEventListener('fauzaan_experience_mode_changed', handleModeChange);
    window.addEventListener('fauzaan_activity_logged', handleActivityChange);
    window.addEventListener('fauzaan_activity_cleared', handleActivityChange);

    return () => {
      window.removeEventListener('fauzaan_experience_mode_changed', handleModeChange);
      window.removeEventListener('fauzaan_activity_logged', handleActivityChange);
      window.removeEventListener('fauzaan_activity_cleared', handleActivityChange);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setRecentList(getRecentActivities());
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAppLaunch = (appId: AppId, label?: string) => {
    logActivity('open_app', label || `Opened ${appId}`, { appId });
    onOpenApp(appId);
    onClose();
  };

  const renderRecommendedItems = () => {
    switch (experienceMode) {
      case 'recruiter':
        return (
          <>
            {/* Resume CV */}
            <div
              onClick={() => handleAppLaunch('resume', 'Curriculum Vitae')}
              className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-white/10 cursor-pointer transition-colors"
            >
              <div className="p-2 rounded-lg bg-[#2b579a]/15 text-[#60cdff]">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold text-white block truncate">
                  Curriculum Vitae
                </span>
                <span className="text-[11px] text-white/50 block truncate">
                  Osmania University • B.E. Computer Science and Engineering (CSE)
                </span>
              </div>
            </div>

            {/* Experience */}
            <div
              onClick={() => handleAppLaunch('experience', 'Professional Experience')}
              className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-white/10 cursor-pointer transition-colors"
            >
              <div className="p-2 rounded-lg bg-[#107c41]/15 text-[#107c41]">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold text-white block truncate">
                  Professional Experience
                </span>
                <span className="text-[11px] text-white/50 block truncate">
                  Market Now & Rubat AI
                </span>
              </div>
            </div>

            {/* SIH 2024 */}
            <div
              onClick={() => handleAppLaunch('achievements', 'SIH 2024 Winner')}
              className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-white/10 cursor-pointer transition-colors"
            >
              <div className="p-2 rounded-lg bg-[#f7b500]/15 text-[#f7b500]">
                <Trophy className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold text-white block truncate">
                  Smart India Hackathon 2024
                </span>
                <span className="text-[11px] text-[#f7b500] block truncate">
                  WINNER • One Hundred Thousand Indian Rupees (₹100,000)
                </span>
              </div>
            </div>

            {/* Contact */}
            <div
              onClick={() => handleAppLaunch('contact', 'Contact Fauzaan')}
              className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-white/10 cursor-pointer transition-colors"
            >
              <div className="p-2 rounded-lg bg-[#0078d4]/15 text-[#0078d4]">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold text-white block truncate">
                  Contact Fauzaan
                </span>
                <span className="text-[11px] text-white/50 block truncate">
                  Direct inquiry & hiring channels
                </span>
              </div>
            </div>
          </>
        );

      case 'technical':
        return (
          <>
            {/* AI Lab */}
            <div
              onClick={() => handleAppLaunch('ai-lab', 'AI Lab')}
              className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-white/10 cursor-pointer transition-colors"
            >
              <div className="p-2 rounded-lg bg-[#00a4ef]/15 text-[#00a4ef]">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold text-white block truncate">
                  AI Lab
                </span>
                <span className="text-[11px] text-white/50 block truncate">
                  Agents, pipelines & models
                </span>
              </div>
            </div>

            {/* AL-AQL */}
            <div
              onClick={() => handleAppLaunch('projects', 'AL-AQL Project')}
              className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-white/10 cursor-pointer transition-colors"
            >
              <div className="p-2 rounded-lg bg-[#0078d4]/15 text-[#0078d4]">
                <FolderGit2 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold text-white block truncate">
                  AL-AQL (Offline AI)
                </span>
                <span className="text-[11px] text-white/50 block truncate">
                  TinyLLaMA 1.1B • 4-bit NF4 • LoRA • MCP
                </span>
              </div>
            </div>

            {/* Skills Matrix */}
            <div
              onClick={() => handleAppLaunch('skills', 'Skills Matrix')}
              className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-white/10 cursor-pointer transition-colors"
            >
              <div className="p-2 rounded-lg bg-[#60cdff]/15 text-[#60cdff]">
                <Layers className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold text-white block truncate">
                  Skills Matrix
                </span>
                <span className="text-[11px] text-white/50 block truncate">
                  PyTorch, YOLO, OpenCV, Flutter, RAG
                </span>
              </div>
            </div>

            {/* Football Analyser */}
            <div
              onClick={() => handleAppLaunch('projects', 'Football Analyser')}
              className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-white/10 cursor-pointer transition-colors"
            >
              <div className="p-2 rounded-lg bg-[#107c41]/15 text-[#107c41]">
                <FolderGit2 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold text-white block truncate">
                  Football Analyser
                </span>
                <span className="text-[11px] text-white/50 block truncate">
                  ByteTrack • K-Means • Perspective Transform
                </span>
              </div>
            </div>
          </>
        );

      case 'client':
        return (
          <>
            {/* Projects Explorer */}
            <div
              onClick={() => handleAppLaunch('projects', 'Projects Explorer')}
              className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-white/10 cursor-pointer transition-colors"
            >
              <div className="p-2 rounded-lg bg-[#ffb900]/15 text-[#ffb900]">
                <FolderGit2 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold text-white block truncate">
                  Projects Explorer
                </span>
                <span className="text-[11px] text-white/50 block truncate">
                  21 Production systems & builds
                </span>
              </div>
            </div>

            {/* Weaver AI */}
            <div
              onClick={() => handleAppLaunch('ai-lab', 'Weaver AI')}
              className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-white/10 cursor-pointer transition-colors"
            >
              <div className="p-2 rounded-lg bg-[#00a4ef]/15 text-[#00a4ef]">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold text-white block truncate">
                  Weaver AI
                </span>
                <span className="text-[11px] text-white/50 block truncate">
                  AI Website Generation & Vercel Deploy
                </span>
              </div>
            </div>

            {/* Market Now */}
            <div
              onClick={() => handleAppLaunch('projects', 'MarketNOW')}
              className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-white/10 cursor-pointer transition-colors"
            >
              <div className="p-2 rounded-lg bg-[#0078d4]/15 text-[#0078d4]">
                <Globe className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold text-white block truncate">
                  MarketNOW
                </span>
                <span className="text-[11px] text-white/50 block truncate">
                  Generative Engine Optimization platform
                </span>
              </div>
            </div>

            {/* Contact */}
            <div
              onClick={() => handleAppLaunch('contact', 'Contact Collaboration')}
              className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-white/10 cursor-pointer transition-colors"
            >
              <div className="p-2 rounded-lg bg-[#107c41]/15 text-[#107c41]">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold text-white block truncate">
                  Collaborate & Hire
                </span>
                <span className="text-[11px] text-white/50 block truncate">
                  Direct project inquiries
                </span>
              </div>
            </div>
          </>
        );

      case 'explore':
      default:
        return (
          <>
            {/* Weaver AI */}
            <div
              onClick={() => handleAppLaunch('ai-lab', 'Weaver AI')}
              className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-white/10 cursor-pointer transition-colors"
            >
              <div className="p-2 rounded-lg bg-[#00a4ef]/15 text-[#00a4ef]">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold text-white block truncate">
                  Weaver AI
                </span>
                <span className="text-[11px] text-white/50 block truncate">
                  AI Website Generation & Vercel Deploy
                </span>
              </div>
            </div>

            {/* Smart India Hackathon Winner */}
            <div
              onClick={() => handleAppLaunch('achievements', 'SIH 2024 Winner')}
              className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-white/10 cursor-pointer transition-colors"
            >
              <div className="p-2 rounded-lg bg-[#f7b500]/15 text-[#f7b500]">
                <Trophy className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold text-white block truncate">
                  Smart India Hackathon 2024
                </span>
                <span className="text-[11px] text-[#f7b500] block truncate">
                  WINNER • One Hundred Thousand Indian Rupees (₹100,000)
                </span>
              </div>
            </div>

            {/* Career Timeline */}
            <div
              onClick={() => handleAppLaunch('timeline', 'Career Timeline')}
              className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-white/10 cursor-pointer transition-colors"
            >
              <div className="p-2 rounded-lg bg-[#0078d4]/15 text-[#0078d4]">
                <History className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold text-white block truncate">
                  Career Timeline
                </span>
                <span className="text-[11px] text-white/50 block truncate">
                  Verified Academic & Career Progression
                </span>
              </div>
            </div>

            {/* Guided Tour */}
            <div
              onClick={() => {
                onStartGuidedExperience();
                onClose();
              }}
              className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-white/10 cursor-pointer transition-colors"
            >
              <div className="p-2 rounded-lg bg-[#0078d4]/15 text-[#0078d4]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold text-white block truncate">
                  Start Guided Tour
                </span>
                <span className="text-[11px] text-white/50 block truncate">
                  26-Chapter Walkthrough Experience
                </span>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div
      ref={menuRef}
      className="fixed bottom-14 left-1/2 -translate-x-1/2 z-[85] w-[95vw] sm:w-[580px] max-h-[85vh] rounded-2xl bg-[#242424]/95 backdrop-blur-2xl border border-white/10 shadow-win-flyout flex flex-col justify-between overflow-hidden text-white font-sans select-none animate-in fade-in slide-in-from-bottom-3 duration-150"
    >
      {/* Search Input Bar (Top) */}
      <div className="p-5 pb-3">
        <div
          onClick={() => {
            onClose();
            onOpenSearch();
          }}
          className="flex items-center space-x-3 px-4 py-2.5 rounded-full bg-[#1e1e1e] border border-white/10 hover:border-[#0078d4] text-xs text-white/50 cursor-text transition-colors shadow-inner"
        >
          <Search className="w-4 h-4 text-white/40" />
          <span>Search apps, projects, capabilities... (Ctrl+K)</span>
        </div>
      </div>

      {/* Main Body: Pinned & Recommended & Recent */}
      <div className="flex-1 overflow-y-auto px-6 py-2 space-y-5 win-scrollbar">
        {/* START PRESENTATION FEATURED HERO CARD */}
        <div
          onClick={() => {
            onClose();
            if (onStartPresentation) onStartPresentation();
          }}
          className="p-3 rounded-xl bg-gradient-to-r from-[#0078d4]/30 via-[#1084d9]/20 to-black/30 border border-[#0078d4]/50 hover:border-[#60cdff] cursor-pointer transition-all flex items-center justify-between group shadow-sm hover:shadow-md"
        >
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-[#0078d4] flex items-center justify-center text-white shadow group-hover:scale-105 transition-transform shrink-0">
              <Play className="w-4 h-4 fill-white ml-0.5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-white tracking-wide">
                  START PRESENTATION
                </span>
                <span className="px-1.5 py-0.5 rounded bg-[#0078d4]/40 text-[9px] text-[#60cdff] font-mono font-semibold">
                  4–5 MIN
                </span>
              </div>
              <span className="text-[11px] text-white/70 block truncate">
                Automated multimodal tour of Fauzaan's AI, Vision & Systems
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors shrink-0 ml-2" />
        </div>

        {/* Pinned Applications Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-tight text-white">
              Pinned
            </span>
            <button
              onClick={() => {
                onClose();
                onOpenApp('projects');
              }}
              className="flex items-center space-x-1 text-[11px] text-white/60 hover:text-white px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 transition-colors"
            >
              <span>All apps</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
            {SYSTEM_APPS.map((app) => (
              <button
                key={app.id}
                onClick={() => handleAppLaunch(app.id, app.title)}
                className="group flex flex-col items-center justify-center p-2.5 rounded-lg hover:bg-white/10 active:bg-white/15 transition-all text-center"
              >
                <div className="w-10 h-10 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                  <AppIcon name={app.icon} className="w-7 h-7 filter drop-shadow" />
                </div>
                <span className="text-[11px] text-white/90 truncate max-w-full font-normal">
                  {app.shortTitle || app.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Recommended / Highlights Section (Personalized by Experience Mode) */}
        <div className="space-y-3 pt-2 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold tracking-tight text-white">
                Recommended
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-[#60cdff] uppercase font-mono font-semibold">
                {experienceMode} Mode
              </span>
            </div>

            {onOpenExperienceSelector && (
              <button
                onClick={() => {
                  onClose();
                  onOpenExperienceSelector();
                }}
                className="text-[11px] text-white/60 hover:text-white flex items-center space-x-1 px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 transition-colors"
              >
                <span>Change mode</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {renderRecommendedItems()}
          </div>
        </div>

        {/* Recent Activity Section */}
        {recentList.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-tight text-white/80 flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-white/50" />
                <span>Recent Activity</span>
              </span>
              <button
                onClick={() => {
                  clearRecentActivities();
                  setRecentList([]);
                }}
                className="text-[10.5px] text-white/50 hover:text-white transition-colors flex items-center space-x-1"
                title="Clear activity log"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {recentList.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    if (item.appId) handleAppLaunch(item.appId, item.label);
                  }}
                  className={`px-2.5 py-1 rounded-lg bg-white/5 text-[11px] text-white/80 flex items-center space-x-1.5 ${
                    item.appId ? 'hover:bg-white/15 cursor-pointer text-white' : ''
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0078d4]" />
                  <span className="truncate max-w-[200px]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User Profile & Power Bottom Bar */}
      <div className="p-4 px-6 bg-[#1f1f1f]/90 border-t border-white/10 flex items-center justify-between">
        {/* User Badge */}
        <div
          onClick={() => handleAppLaunch('about', 'About Fauzaan')}
          className="flex items-center space-x-3 p-1.5 pr-3 rounded-full hover:bg-white/10 cursor-pointer transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-[#0078d4] flex items-center justify-center font-bold text-sm text-white shadow-sm">
            F
          </div>
          <div className="text-left">
            <span className="text-xs font-bold text-white block leading-tight">
              Fauzaan
            </span>
            <span className="text-[10px] text-white/50 block">
              Developer Workstation
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-1 text-white/70">
          <button
            onClick={() => handleAppLaunch('settings', 'Settings')}
            title="Settings"
            className="p-2 rounded-lg hover:text-white hover:bg-white/10 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              onClose();
              onRestartBoot();
            }}
            title="Restart Personal Environment"
            className="p-2 rounded-lg hover:text-white hover:bg-white/10 transition-colors"
          >
            <Power className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
