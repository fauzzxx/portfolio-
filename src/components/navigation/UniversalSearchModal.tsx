import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, Folder, Cpu, Layers, Trophy, CornerDownLeft } from 'lucide-react';
import { SYSTEM_APPS } from '../../data/apps';
import { PROJECTS_DATA } from '../../data/projects';
import { SKILLS_DATA } from '../../data/skills';
import { ACHIEVEMENTS_DATA } from '../../data/achievements';
import type { AppId } from '../../types/os';
import type { Project } from '../../types/project';
import { logActivity } from '../../utils/recentActivity';

interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'app' | 'project' | 'skill' | 'achievement';
  appId?: AppId;
  project?: Project;
}

interface UniversalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (appId: AppId) => void;
  onOpenProject?: (project: Project) => void;
}

export const UniversalSearchModal: React.FC<UniversalSearchModalProps> = ({
  isOpen,
  onClose,
  onOpenApp,
  onOpenProject,
}) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'apps' | 'projects' | 'skills' | 'achievements'>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const results: SearchResultItem[] = useMemo(() => {
    const q = query.toLowerCase().trim();
    const list: SearchResultItem[] = [];

    // Search Apps
    if (activeTab === 'all' || activeTab === 'apps') {
      SYSTEM_APPS.forEach((app) => {
        if (!q || app.title.toLowerCase().includes(q) || app.description.toLowerCase().includes(q)) {
          list.push({
            id: `app-${app.id}`,
            title: app.title,
            subtitle: app.description,
            category: 'app',
            appId: app.id,
          });
        }
      });
    }

    // Search Projects & Capabilities
    if (activeTab === 'all' || activeTab === 'projects') {
      PROJECTS_DATA.forEach((proj) => {
        if (!q) {
          list.push({
            id: `proj-${proj.id}`,
            title: proj.title,
            subtitle: `${proj.categoryLabel} • ${proj.techStack.join(', ') || 'System Platform'}`,
            category: 'project',
            project: proj,
          });
          return;
        }

        const titleMatch = proj.title.toLowerCase().includes(q);
        const descMatch =
          proj.shortDescription.toLowerCase().includes(q) ||
          proj.description.toLowerCase().includes(q);
        const techMatch = proj.techStack.some((t) => t.toLowerCase().includes(q));
        const capMatch = proj.capabilities.some((c) => c.toLowerCase().includes(q));
        const demoMatch = proj.demonstrates?.some((d) => d.toLowerCase().includes(q));
        const dnaMatch = proj.dnaNodes?.some(
          (node) =>
            node.label.toLowerCase().includes(q) || node.value.toLowerCase().includes(q)
        );

        // Capability synonym matching:
        // 'computer vision' or 'vision' -> projects with vision/YOLO/OpenCV/tracking
        const isVisionQuery = q.includes('computer vision') || q === 'vision';
        const visionMatch =
          isVisionQuery &&
          [
            'post-office-analyzer',
            'cafe-analyzer',
            'smart-classroom-assist',
            'classroom-analyser',
            'football-analyser',
            'patrolpro',
          ].includes(proj.id);

        // 'offline ai' -> AL-AQL and Offline AI Chatbot
        const isOfflineQuery = q.includes('offline ai') || q === 'offline';
        const offlineMatch =
          isOfflineQuery && ['al-aql', 'offline-ai-chatbot'].includes(proj.id);

        // 'rag' -> RAG Document Analyzer, AL-AQL, Offline AI Chatbot
        const isRagQuery = q === 'rag' || q.includes('rag');
        const ragMatch =
          isRagQuery &&
          ['rag-document-analyzer', 'al-aql', 'offline-ai-chatbot'].includes(proj.id);

        // 'mcp' -> AL-AQL, Blender Automation using MCP
        const isMcpQuery = q === 'mcp';
        const mcpMatch =
          isMcpQuery && ['al-aql', 'blender-automation-mcp'].includes(proj.id);

        if (
          titleMatch ||
          descMatch ||
          techMatch ||
          capMatch ||
          demoMatch ||
          dnaMatch ||
          visionMatch ||
          offlineMatch ||
          ragMatch ||
          mcpMatch
        ) {
          list.push({
            id: `proj-${proj.id}`,
            title: proj.title,
            subtitle: `${proj.categoryLabel} • ${proj.techStack.join(', ') || 'System Platform'}`,
            category: 'project',
            project: proj,
          });
        }
      });
    }

    // Search Skills
    if (activeTab === 'all' || activeTab === 'skills') {
      SKILLS_DATA.forEach((group) => {
        group.skills.forEach((skill) => {
          if (!q || skill.name.toLowerCase().includes(q)) {
            list.push({
              id: `skill-${skill.name}`,
              title: skill.name,
              subtitle: `Skill Category: ${group.title}`,
              category: 'skill',
              appId: 'skills',
            });
          }
        });
      });
    }

    // Search Achievements
    if (activeTab === 'all' || activeTab === 'achievements') {
      ACHIEVEMENTS_DATA.forEach((a) => {
        if (!q || a.title.toLowerCase().includes(q) || a.event.toLowerCase().includes(q)) {
          list.push({
            id: `achieve-${a.id}`,
            title: `${a.title} — ${a.event}`,
            subtitle: a.prize ? `Prize: ${a.prize}` : 'Award Recognition',
            category: 'achievement',
            appId: 'achievements',
          });
        }
      });
    }

    return list.slice(0, 10);
  }, [query, activeTab]);

  const handleSelect = (item: SearchResultItem) => {
    if (item.project && onOpenProject) {
      logActivity('view_project', `Opened ${item.project.title}`, { projectId: item.project.id });
      onOpenProject(item.project);
    } else if (item.appId) {
      logActivity('open_app', `Launched ${item.title}`, { appId: item.appId });
      onOpenApp(item.appId);
    }
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev: number) => (prev + 1) % (results.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev: number) => (prev - 1 + results.length) % (results.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#242424]/98 backdrop-blur-2xl border border-white/10 shadow-win-flyout overflow-hidden font-sans select-none animate-in fade-in zoom-in-95 duration-100">
        {/* Windows Search Bar */}
        <div className="p-4 border-b border-white/10 flex items-center space-x-3 bg-[#1e1e1e]">
          <Search className="w-5 h-5 text-[#0078d4] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type here to search..."
            className="flex-1 bg-transparent text-white text-sm outline-none placeholder-white/40"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="px-4 py-2 flex items-center space-x-2 border-b border-white/5 bg-[#202020] text-xs">
          {[
            { id: 'all', label: 'All' },
            { id: 'apps', label: 'Apps' },
            { id: 'projects', label: 'Projects' },
            { id: 'skills', label: 'Skills' },
            { id: 'achievements', label: 'Awards' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1 rounded-full transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#0078d4] text-white font-medium'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-0.5">
          {results.map((item, idx) => {
            const isSelected = idx === selectedIndex;

            return (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`p-2.5 px-3 rounded-xl cursor-pointer flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-white/15 text-white'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-3 min-w-0 pr-2">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                    {item.category === 'app' && <Folder className="w-4 h-4 text-[#ffb900]" />}
                    {item.category === 'project' && <Cpu className="w-4 h-4 text-[#00a4ef]" />}
                    {item.category === 'skill' && <Layers className="w-4 h-4 text-[#0078d4]" />}
                    {item.category === 'achievement' && <Trophy className="w-4 h-4 text-[#f7b500]" />}
                  </div>
                  <div className="min-w-0">
                    <span className="font-semibold text-xs text-white truncate block">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-white/50 truncate block">
                      {item.subtitle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 uppercase text-white/50">
                    {item.category}
                  </span>
                  {isSelected && <CornerDownLeft className="w-3.5 h-3.5 text-[#0078d4]" />}
                </div>
              </div>
            );
          })}

          {results.length === 0 && (
            <div className="p-8 text-center text-xs text-white/40">
              No results found for "{query}".
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-[#1c1c1c] border-t border-white/5 flex items-center justify-between text-[10px] text-white/40">
          <span>Navigate with ↑ ↓ and press Enter to open</span>
          <span>ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
