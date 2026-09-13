import React, { useState, useMemo } from 'react';
import { Layers, Search, Cpu, ArrowRight, X, Sparkles } from 'lucide-react';
import { SKILLS_DATA } from '../../data/skills';
import { PROJECTS_DATA } from '../../data/projects';
import type { Project } from '../../types/project';
import { ProjectDetailModal } from '../projects/ProjectDetailModal';

export const SkillsWindow: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const totalSkillsCount = useMemo(() => {
    return SKILLS_DATA.reduce((acc, cat) => acc + cat.skills.length, 0);
  }, []);

  // Find connected projects for the currently selected skill
  const connectedProjects = useMemo(() => {
    if (!selectedSkill) return [];
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
    <div className="p-5 max-w-5xl mx-auto space-y-5 select-none text-win-text-light dark:text-win-text-dark">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-black/10 dark:border-white/10 gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-win-accent/10 text-win-accent flex items-center justify-center shrink-0 border border-black/10 dark:border-white/10">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-win-text-light dark:text-win-text-dark">
              Technical Capabilities & Skills Inventory
            </h1>
            <p className="text-xs text-win-muted-light dark:text-win-muted-dark">
              Machine Learning, Computer Vision, Backend Architectures, and Frameworks
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-black/5 dark:bg-white/10 text-xs font-medium text-win-text-light dark:text-win-text-dark">
            {totalSkillsCount} Skills Cataloged
          </span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="relative max-w-md">
        <Search className="w-3.5 h-3.5 text-win-muted-light dark:text-win-muted-dark absolute left-2.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Filter skills (e.g. YOLO, PyTorch, React, Python)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-8 pl-8 pr-3 rounded border border-black/15 dark:border-white/15 bg-white dark:bg-[#202020] text-xs text-win-text-light dark:text-win-text-dark placeholder:text-win-muted-light dark:placeholder:text-win-muted-dark focus:outline-none focus:border-win-accent"
        />
      </div>

      {/* Technology Inspector Callout */}
      {selectedSkill && (
        <div className="p-3.5 rounded-lg border border-win-accent/40 bg-win-accent/5 dark:bg-win-accent/10 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-win-accent" />
              <span className="text-xs font-semibold text-win-text-light dark:text-win-text-dark">
                Technology Inspector:
              </span>
              <span className="px-2 py-0.5 rounded bg-win-accent text-white text-xs font-medium">
                {selectedSkill}
              </span>
            </div>
            <button
              onClick={() => setSelectedSkill(null)}
              className="text-win-muted-light dark:text-win-muted-dark hover:text-win-text-light dark:hover:text-win-text-dark p-1 rounded"
              title="Close inspector"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {connectedProjects.length > 0 ? (
            <div className="space-y-1.5 pt-1">
              <div className="text-[11px] text-win-muted-light dark:text-win-muted-dark">
                Implemented in {connectedProjects.length} project{connectedProjects.length > 1 ? 's' : ''}:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {connectedProjects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => setActiveProject(proj)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-black/10 dark:border-white/10 bg-white dark:bg-[#242424] hover:border-win-accent text-xs transition-colors"
                  >
                    <Cpu className="w-3 h-3 text-win-accent" />
                    <span className="font-medium text-win-text-light dark:text-win-text-dark">
                      {proj.title}
                    </span>
                    <ArrowRight className="w-3 h-3 text-win-muted-light dark:text-win-muted-dark" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xs text-win-muted-light dark:text-win-muted-dark pt-1">
              Core technical proficiency applied across development workflows and system designs.
            </p>
          )}
        </div>
      )}

      {/* Skills Categories Grid */}
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
              className="p-4 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#242424] space-y-3 shadow-sm"
            >
              <div className="border-b border-black/5 dark:border-white/5 pb-2">
                <h2 className="text-xs font-semibold text-win-text-light dark:text-win-text-dark">
                  {cat.title}
                </h2>
                {cat.description && (
                  <p className="text-[11px] text-win-muted-light dark:text-win-muted-dark mt-0.5">
                    {cat.description}
                  </p>
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
                      className={`px-2.5 py-1 rounded text-xs border transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-win-accent text-white border-win-accent font-medium shadow-sm'
                          : 'bg-[#fafafa] dark:bg-[#1f1f1f] border-black/10 dark:border-white/10 text-win-text-light dark:text-win-text-dark hover:border-win-accent hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      <span>{skill.name}</span>
                      {hasLinks && (
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isSelected ? 'bg-white' : 'bg-win-accent'
                          }`}
                          title="Click to view linked projects"
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
