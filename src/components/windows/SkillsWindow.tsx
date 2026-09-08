import React, { useState } from 'react';
import { Layers, Cpu, ArrowUpRight, Search } from 'lucide-react';
import { SKILLS_DATA } from '../../data/skills';
import { PROJECTS_DATA } from '../../data/projects';
import type { Project } from '../../types/project';
import { ProjectDetailModal } from '../projects/ProjectDetailModal';

export const SkillsWindow: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Find connected projects for the currently selected skill
  const connectedProjects = React.useMemo(() => {
    if (!selectedSkill) return [];
    // find skill item
    for (const group of SKILLS_DATA) {
      for (const skill of group.skills) {
        if (skill.name === selectedSkill && skill.connectedProjects) {
          return PROJECTS_DATA.filter((p) => skill.connectedProjects?.includes(p.id));
        }
      }
    }
    return [];
  }, [selectedSkill]);

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-os-border gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-os-card border border-os-border text-os-accent">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-mono text-os-text">
              Skills Matrix & System Toolchain
            </h1>
            <p className="text-xs text-os-muted">
              Deep learning frameworks, foundation models, languages, and architectural proficiencies
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-os-accent/10 border border-os-accent/30 text-os-accent font-semibold">
            {SKILLS_DATA.reduce((acc, cat) => acc + cat.skills.length, 0)} SKILLS INDEXED
          </span>
        </div>
      </div>

      {/* Interactive Tooltip / Connected Projects Inspector */}
      {selectedSkill && (
        <div className="p-4 rounded-xl bg-os-card border border-os-accent/40 shadow-lg shadow-os-accent/5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-os-accent animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-wider text-os-accent">
                Technology Inspector:
              </span>
              <span className="font-bold text-sm font-mono text-os-text">{selectedSkill}</span>
            </div>
            <button
              onClick={() => setSelectedSkill(null)}
              className="text-xs font-mono text-os-dim hover:text-os-text"
            >
              Clear Inspector [×]
            </button>
          </div>

          {connectedProjects.length > 0 ? (
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-os-muted block">
                Directly deployed in these projects (click to view):
              </span>
              <div className="flex flex-wrap gap-2">
                {connectedProjects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => setActiveProject(proj)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-os-surface border border-os-border hover:border-os-accent text-xs font-mono text-os-text transition-colors"
                  >
                    <Cpu className="w-3.5 h-3.5 text-os-accent" />
                    <span>{proj.title}</span>
                    <ArrowUpRight className="w-3 h-3 text-os-dim" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xs text-os-dim font-mono">
              Core capability across backend architectures and algorithmic workflows.
            </p>
          )}
        </div>
      )}

      {/* Search skills */}
      <div className="relative max-w-sm">
        <Search className="w-3.5 h-3.5 text-os-dim absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Filter skills (e.g. YOLO, PyTorch, RAG)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-os-card border border-os-border focus:border-os-accent text-xs font-mono text-os-text placeholder-os-dim outline-none transition-colors"
        />
      </div>

      {/* Skill Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SKILLS_DATA.map((cat) => {
          const q = searchQuery.toLowerCase().trim();
          const filteredSkills = cat.skills.filter(
            (s) => !q || s.name.toLowerCase().includes(q)
          );

          if (filteredSkills.length === 0) return null;

          return (
            <div
              key={cat.id}
              className="p-4 rounded-xl bg-os-card/70 border border-os-border space-y-3"
            >
              <div>
                <h2 className="text-sm font-semibold font-mono text-os-text">{cat.title}</h2>
                {cat.description && (
                  <p className="text-[11px] text-os-muted mt-0.5">{cat.description}</p>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {filteredSkills.map((skill) => {
                  const isSelected = selectedSkill === skill.name;
                  const hasLinks = Boolean(skill.connectedProjects?.length);

                  return (
                    <button
                      key={skill.name}
                      onClick={() => setSelectedSkill(isSelected ? null : skill.name)}
                      className={`px-2.5 py-1 rounded-md text-xs font-mono border transition-all duration-150 flex items-center space-x-1.5 ${
                        isSelected
                          ? 'bg-os-accent/20 border-os-accent text-os-text font-bold shadow-sm'
                          : 'bg-os-surface border-os-border text-os-text hover:border-os-accent/40 hover:bg-white/[0.02]'
                      }`}
                    >
                      <span>{skill.name}</span>
                      {hasLinks && (
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isSelected ? 'bg-os-accent' : 'bg-os-accent/60'
                          }`}
                          title="Has linked projects"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Project detail modal if opened from skills */}
      {activeProject && (
        <ProjectDetailModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </div>
  );
};
