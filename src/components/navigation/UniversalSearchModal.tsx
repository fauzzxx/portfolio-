import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, FolderGit2, Cpu, Layers, Trophy, CornerDownLeft } from 'lucide-react';
import { SYSTEM_APPS } from '../../data/apps';
import { PROJECTS_DATA } from '../../data/projects';
import { SKILLS_DATA } from '../../data/skills';
import { ACHIEVEMENTS_DATA } from '../../data/achievements';
import type { AppId } from '../../types/os';
import type { Project } from '../../types/project';

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
    if (!q) {
      // Default top suggestions
      return [
        { id: 'app-projects', title: 'Projects Explorer', subtitle: 'Browse all software systems', category: 'app', appId: 'projects' },
        { id: 'app-ai', title: 'AI Lab', subtitle: 'Autonomous models & computer vision', category: 'app', appId: 'ai-lab' },
        { id: 'app-terminal', title: 'Terminal Shell', subtitle: 'Simulated command interface', category: 'app', appId: 'terminal' },
        { id: 'proj-weaver', title: 'Weaver AI', subtitle: 'Autonomous website generation platform', category: 'project', project: PROJECTS_DATA.find((p) => p.id === 'weaver-ai') },
        { id: 'proj-sih', title: 'Smart India Hackathon 2024 Winner', subtitle: 'National First Prize ₹1,00,000', category: 'achievement', appId: 'achievements' },
      ];
    }

    const matched: SearchResultItem[] = [];

    // Search Apps
    SYSTEM_APPS.forEach((app) => {
      if (app.title.toLowerCase().includes(q) || app.description.toLowerCase().includes(q)) {
        matched.push({
          id: `app-${app.id}`,
          title: app.title,
          subtitle: app.description,
          category: 'app',
          appId: app.id,
        });
      }
    });

    // Search Projects
    PROJECTS_DATA.forEach((proj) => {
      if (
        proj.title.toLowerCase().includes(q) ||
        proj.shortDescription.toLowerCase().includes(q) ||
        proj.techStack.some((t) => t.toLowerCase().includes(q)) ||
        proj.capabilities.some((c) => c.toLowerCase().includes(q))
      ) {
        matched.push({
          id: `proj-${proj.id}`,
          title: proj.title,
          subtitle: `${proj.categoryLabel} • ${proj.techStack.join(', ') || 'System'}`,
          category: 'project',
          project: proj,
        });
      }
    });

    // Search Skills
    SKILLS_DATA.forEach((group) => {
      group.skills.forEach((skill) => {
        if (skill.name.toLowerCase().includes(q)) {
          matched.push({
            id: `skill-${skill.name}`,
            title: skill.name,
            subtitle: `Skill Category: ${group.title}`,
            category: 'skill',
            appId: 'skills',
          });
        }
      });
    });

    // Search Achievements
    ACHIEVEMENTS_DATA.forEach((a) => {
      if (a.title.toLowerCase().includes(q) || a.event.toLowerCase().includes(q)) {
        matched.push({
          id: `achieve-${a.id}`,
          title: `${a.title} — ${a.event}`,
          subtitle: a.prize ? `Prize: ${a.prize}` : 'Milestone',
          category: 'achievement',
          appId: 'achievements',
        });
      }
    });

    return matched.slice(0, 8);
  }, [query]);

  const handleSelect = (item: SearchResultItem) => {
    if (item.project && onOpenProject) {
      onOpenProject(item.project);
    } else if (item.appId) {
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
    <div className="fixed inset-0 z-[120] flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/75 backdrop-blur-md">
      <div className="relative w-full max-w-xl rounded-2xl bg-os-surface border border-os-border shadow-2xl overflow-hidden font-mono text-xs select-none">
        {/* Search Input Bar */}
        <div className="p-4 flex items-center space-x-3 border-b border-os-border bg-os-card/80">
          <Search className="w-5 h-5 text-os-accent shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search apps, projects, skills (e.g. YOLO, Weaver, SIH)..."
            className="flex-1 bg-transparent text-os-text text-sm outline-none placeholder-os-dim"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-os-muted hover:text-os-text"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto divide-y divide-os-border/40 p-2 space-y-1">
          {results.map((item, idx) => {
            const isSelected = idx === selectedIndex;

            return (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`p-3 rounded-xl cursor-pointer flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-os-accent/15 border border-os-accent/40 text-os-text'
                    : 'text-os-muted hover:bg-white/5'
                }`}
              >
                <div className="flex items-center space-x-3 min-w-0 pr-2">
                  <div className="p-2 rounded-lg bg-os-card border border-os-border text-os-accent shrink-0">
                    {item.category === 'app' && <FolderGit2 className="w-4 h-4" />}
                    {item.category === 'project' && <Cpu className="w-4 h-4" />}
                    {item.category === 'skill' && <Layers className="w-4 h-4" />}
                    {item.category === 'achievement' && <Trophy className="w-4 h-4 text-os-amber" />}
                  </div>
                  <div className="min-w-0">
                    <span className="font-semibold text-os-text truncate block">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-os-dim truncate block">
                      {item.subtitle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 uppercase text-os-dim">
                    {item.category}
                  </span>
                  {isSelected && <CornerDownLeft className="w-3.5 h-3.5 text-os-accent" />}
                </div>
              </div>
            );
          })}

          {results.length === 0 && (
            <div className="p-8 text-center text-os-dim">
              No matching applications, projects, or skills found.
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-os-bg/90 border-t border-os-border/60 flex items-center justify-between text-[10px] text-os-dim">
          <span>Navigate with ↑ ↓ and press Enter</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
