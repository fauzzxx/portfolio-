import React, { useState, useMemo } from 'react';
import { PROJECTS_DATA } from '../../data/projects';
import type { Project } from '../../types/project';
import { ProjectDetailModal } from '../projects/ProjectDetailModal';
import {
  FolderGit2,
  Search,
  LayoutGrid,
  List,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

export const ProjectsWindow: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories: { key: string; label: string; count: number }[] = [
    { key: 'all', label: 'All Projects', count: PROJECTS_DATA.length },
    {
      key: 'web-development',
      label: 'Web Development',
      count: PROJECTS_DATA.filter((p) => p.category === 'web-development').length,
    },
    {
      key: 'ai-automation',
      label: 'AI Automation',
      count: PROJECTS_DATA.filter((p) => p.category === 'ai-automation').length,
    },
    {
      key: 'app-development',
      label: 'App Development',
      count: PROJECTS_DATA.filter((p) => p.category === 'app-development').length,
    },
    {
      key: 'experiments',
      label: 'Experiments',
      count: PROJECTS_DATA.filter((p) => p.category === 'experiments').length,
    },
  ];

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((proj) => {
      const matchesCategory =
        selectedCategory === 'all' || proj.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        proj.title.toLowerCase().includes(q) ||
        proj.shortDescription.toLowerCase().includes(q) ||
        proj.techStack.some((t) => t.toLowerCase().includes(q)) ||
        proj.capabilities.some((c) => c.toLowerCase().includes(q));

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6 select-none">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-os-border gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-os-card border border-os-border text-os-accent">
            <FolderGit2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-mono text-os-text">
              Projects Explorer
            </h1>
            <p className="text-xs text-os-muted">
              Web platforms, AI automation systems, mobile products, and creative labs
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-os-accent/10 border border-os-accent/30 text-os-accent font-semibold">
            {filteredProjects.length} OF {PROJECTS_DATA.length} SYSTEMS
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-os-dim absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects, technologies (e.g. YOLO, Gemini, RAG)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-os-card border border-os-border focus:border-os-accent text-xs font-mono text-os-text placeholder-os-dim outline-none transition-colors"
          />
        </div>

        {/* View Mode & Controls */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center p-1 rounded-lg bg-os-card border border-os-border">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded text-xs transition-colors ${
                viewMode === 'grid'
                  ? 'bg-os-surface text-os-accent shadow-sm'
                  : 'text-os-muted hover:text-os-text'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded text-xs transition-colors ${
                viewMode === 'list'
                  ? 'bg-os-surface text-os-accent shadow-sm'
                  : 'text-os-muted hover:text-os-text'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all duration-150 shrink-0 ${
              selectedCategory === cat.key
                ? 'bg-os-accent/15 border-os-accent text-os-text font-bold shadow-sm'
                : 'bg-os-card/70 border-os-border text-os-muted hover:border-os-border-focus hover:text-os-text'
            }`}
          >
            <span>{cat.label}</span>
            <span className="ml-1.5 text-[10px] text-os-dim">({cat.count})</span>
          </button>
        ))}
      </div>

      {/* Projects Display: Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((proj) => {
            const isTier1 = proj.tier === 1;

            return (
              <div
                key={proj.id}
                onClick={() => setActiveProject(proj)}
                className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-3 border ${
                  isTier1
                    ? 'bg-os-card/90 border-os-border/90 hover:border-os-accent/60 hover:shadow-lg hover:shadow-os-accent/5'
                    : 'bg-os-card/60 border-os-border/60 hover:border-os-border-focus'
                }`}
              >
                {/* Header info */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center space-x-1.5">
                        <h3 className="font-semibold text-sm text-os-text group-hover:text-os-accent transition-colors truncate">
                          {proj.title}
                        </h3>
                        {isTier1 && (
                          <span className="text-os-accent" title="Tier 1 Major System">
                            <Sparkles className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-os-dim block uppercase tracking-wider mt-0.5">
                        {proj.categoryLabel}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-os-dim group-hover:text-os-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </div>

                  <p className="text-xs text-os-muted leading-relaxed line-clamp-2">
                    {proj.shortDescription}
                  </p>
                </div>

                {/* Tech chips footer */}
                <div className="pt-2 border-t border-os-border/40">
                  {proj.techStack && proj.techStack.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {proj.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-os-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[10px] font-mono text-os-dim italic block">
                      Technology details coming soon
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="divide-y divide-os-border/60 rounded-xl bg-os-card/70 border border-os-border overflow-hidden">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setActiveProject(proj)}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02] cursor-pointer transition-colors"
            >
              <div className="space-y-1 min-w-0 max-w-xl">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-sm text-os-text hover:text-os-accent transition-colors">
                    {proj.title}
                  </h3>
                  {proj.tier === 1 && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-os-accent/10 border border-os-accent/30 text-os-accent">
                      MAJOR
                    </span>
                  )}
                  <span className="text-[11px] font-mono text-os-dim">
                    {proj.categoryLabel}
                  </span>
                </div>
                <p className="text-xs text-os-muted line-clamp-1">{proj.shortDescription}</p>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                {proj.techStack && proj.techStack.length > 0 ? (
                  <div className="flex gap-1">
                    {proj.techStack.slice(0, 2).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-os-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : null}
                <ArrowUpRight className="w-4 h-4 text-os-dim" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* If empty */}
      {filteredProjects.length === 0 && (
        <div className="p-12 text-center space-y-2 rounded-xl bg-os-card/30 border border-os-border">
          <p className="text-sm font-mono text-os-muted">No projects found matching search query.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="text-xs font-mono text-os-accent underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Active Project Modal */}
      {activeProject && (
        <ProjectDetailModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </div>
  );
};
