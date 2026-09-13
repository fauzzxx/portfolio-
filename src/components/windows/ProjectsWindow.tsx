import React, { useState, useMemo } from 'react';
import { PROJECTS_DATA } from '../../data/projects';
import type { Project } from '../../types/project';
import { ProjectDetailModal } from '../projects/ProjectDetailModal';
import {
  Search,
  LayoutGrid,
  List,
  Folder,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  HardDrive,
  Star,
  Sparkles,
  Globe,
  Bot,
  Smartphone,
  FlaskConical,
  ExternalLink,
  Code2,
  FileCode,
} from 'lucide-react';

export const ProjectsWindow: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = [
    { key: 'all', label: 'All Projects', icon: Star, count: PROJECTS_DATA.length },
    {
      key: 'web-development',
      label: 'Web Development',
      icon: Globe,
      count: PROJECTS_DATA.filter((p) => p.category === 'web-development').length,
    },
    {
      key: 'ai-automation',
      label: 'AI Automation',
      icon: Bot,
      count: PROJECTS_DATA.filter((p) => p.category === 'ai-automation').length,
    },
    {
      key: 'app-development',
      label: 'App Development',
      icon: Smartphone,
      count: PROJECTS_DATA.filter((p) => p.category === 'app-development').length,
    },
    {
      key: 'experiments',
      label: 'Experiments',
      icon: FlaskConical,
      count: PROJECTS_DATA.filter((p) => p.category === 'experiments').length,
    },
  ];

  const currentCategoryObj = categories.find((c) => c.key === selectedCategory) || categories[0];

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
    <div className="flex flex-col h-full bg-[#f9f9f9] dark:bg-[#191919] select-none text-win-text-light dark:text-win-text-dark">
      {/* File Explorer Command Bar & Address Bar */}
      <div className="p-2 border-b border-black/10 dark:border-white/10 bg-[#f3f3f3] dark:bg-[#202020] space-y-2">
        {/* Navigation & Address & Search */}
        <div className="flex items-center gap-2">
          {/* Back, Forward, Refresh */}
          <div className="flex items-center gap-0.5 text-win-muted-light dark:text-win-muted-dark">
            <button
              onClick={() => setSelectedCategory('all')}
              title="Back to All Projects"
              className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-40 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              disabled
              title="Forward"
              className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 opacity-40 transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setSearchQuery('');
              }}
              title="Refresh"
              className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Windows Address Bar */}
          <div className="flex-1 flex items-center h-7 px-2.5 rounded border border-black/15 dark:border-white/15 bg-white dark:bg-[#1a1a1a] text-xs">
            <HardDrive className="w-3.5 h-3.5 text-win-accent mr-1.5 shrink-0" />
            <span className="text-win-muted-light dark:text-win-muted-dark hover:underline cursor-pointer" onClick={() => setSelectedCategory('all')}>
              This PC
            </span>
            <ChevronRight className="w-3 h-3 text-win-muted-light dark:text-win-muted-dark mx-1 shrink-0" />
            <span className="text-win-muted-light dark:text-win-muted-dark hover:underline cursor-pointer" onClick={() => setSelectedCategory('all')}>
              Projects
            </span>
            <ChevronRight className="w-3 h-3 text-win-muted-light dark:text-win-muted-dark mx-1 shrink-0" />
            <span className="font-medium text-win-text-light dark:text-win-text-dark truncate">
              {currentCategoryObj.label}
            </span>
          </div>

          {/* Search Box */}
          <div className="relative w-48 sm:w-64">
            <Search className="w-3.5 h-3.5 text-win-muted-light dark:text-win-muted-dark absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search ${currentCategoryObj.label}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-7 pl-8 pr-2.5 rounded border border-black/15 dark:border-white/15 bg-white dark:bg-[#1a1a1a] text-xs text-win-text-light dark:text-win-text-dark placeholder:text-win-muted-light dark:placeholder:text-win-muted-dark focus:outline-none focus:border-win-accent"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center rounded border border-black/15 dark:border-white/15 bg-white dark:bg-[#1a1a1a] p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              title="Tiles View"
              className={`p-1 rounded ${
                viewMode === 'grid'
                  ? 'bg-black/10 dark:bg-white/15 text-win-accent'
                  : 'text-win-muted-light dark:text-win-muted-dark hover:text-win-text-light dark:hover:text-win-text-dark'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              title="Details List View"
              className={`p-1 rounded ${
                viewMode === 'list'
                  ? 'bg-black/10 dark:bg-white/15 text-win-accent'
                  : 'text-win-muted-light dark:text-win-muted-dark hover:text-win-text-light dark:hover:text-win-text-dark'
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main File Explorer Body: Left Sidebar + Right File Grid */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Tree Navigation Sidebar */}
        <div className="w-48 sm:w-56 shrink-0 border-r border-black/10 dark:border-white/10 bg-[#f3f3f3]/70 dark:bg-[#202020]/70 p-2 overflow-y-auto hidden sm:block win-scrollbar">
          <div className="space-y-4">
            {/* Quick Access */}
            <div>
              <div className="px-2 py-1 text-[10.5px] font-semibold uppercase tracking-wider text-win-muted-light dark:text-win-muted-dark">
                Quick Access
              </div>
              <div className="space-y-0.5 mt-1">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.key;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setSelectedCategory(cat.key)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-xs text-left transition-colors ${
                        isSelected
                          ? 'bg-black/10 dark:bg-white/15 text-win-text-light dark:text-win-text-dark font-medium shadow-sm'
                          : 'text-win-muted-light dark:text-win-muted-dark hover:bg-black/5 dark:hover:bg-white/5 hover:text-win-text-light dark:hover:text-win-text-dark'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-win-accent' : ''}`} />
                        <span className="truncate">{cat.label}</span>
                      </div>
                      <span className="text-[10px] text-win-muted-light dark:text-win-muted-dark shrink-0 ml-1">
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* This PC */}
            <div>
              <div className="px-2 py-1 text-[10.5px] font-semibold uppercase tracking-wider text-win-muted-light dark:text-win-muted-dark">
                This PC
              </div>
              <div className="space-y-0.5 mt-1">
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded text-xs text-win-muted-light dark:text-win-muted-dark">
                  <HardDrive className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span className="truncate">Local Disk (C:)</span>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded text-xs text-win-text-light dark:text-win-text-dark font-medium bg-black/5 dark:bg-white/10">
                  <Folder className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="truncate">Projects Library</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-[#1a1a1a]">
          {/* Sub-header status bar: Category Title & Item count */}
          <div className="px-4 py-2 border-b border-black/5 dark:border-white/5 flex items-center justify-between text-xs text-win-muted-light dark:text-win-muted-dark bg-[#fafafa] dark:bg-[#1c1c1c]">
            <div className="flex items-center gap-2">
              <span className="font-medium text-win-text-light dark:text-win-text-dark">
                {currentCategoryObj.label}
              </span>
              <span>•</span>
              <span>{filteredProjects.length} items</span>
            </div>

            {/* Mobile Category Dropdown */}
            <div className="sm:hidden">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                aria-label="Filter projects by category"
                className="text-xs bg-white dark:bg-[#242424] border border-black/10 dark:border-white/10 rounded px-2 py-1"
              >
                {categories.map((c) => (
                  <option key={c.key} value={c.key}>
                    {c.label} ({c.count})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Files / Projects Display */}
          <div className="flex-1 overflow-y-auto p-4 win-scrollbar">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredProjects.map((proj) => {
                  const isTier1 = proj.tier === 1;
                  return (
                    <div
                      key={proj.id}
                      onClick={() => setActiveProject(proj)}
                      className={`group p-3 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                        isTier1
                          ? 'border-black/15 dark:border-white/15 bg-black/[0.02] dark:bg-white/[0.02] hover:border-win-accent hover:bg-black/[0.04] dark:hover:bg-white/[0.05] shadow-sm'
                          : 'border-black/10 dark:border-white/10 bg-white dark:bg-[#202020] hover:border-win-accent/70 hover:bg-black/[0.02] dark:hover:bg-white/[0.03]'
                      }`}
                    >
                      <div>
                        {/* Top: File Icon + Title + Tier */}
                        <div className="flex items-start gap-2.5 mb-2">
                          <div className="w-8 h-8 rounded bg-win-accent/10 text-win-accent flex items-center justify-center shrink-0 mt-0.5">
                            {proj.category === 'ai-automation' ? (
                              <Bot className="w-4 h-4" />
                            ) : proj.category === 'web-development' ? (
                              <Globe className="w-4 h-4" />
                            ) : proj.category === 'app-development' ? (
                              <Smartphone className="w-4 h-4" />
                            ) : (
                              <FileCode className="w-4 h-4" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <h3 className="font-semibold text-xs text-win-text-light dark:text-win-text-dark group-hover:text-win-accent transition-colors truncate">
                                {proj.title}
                              </h3>
                              {isTier1 && (
                                <span title="Major Project">
                                  <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-win-muted-light dark:text-win-muted-dark truncate">
                              {proj.categoryLabel}
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-win-muted-light dark:text-win-muted-dark line-clamp-2 mb-3 leading-relaxed">
                          {proj.shortDescription}
                        </p>
                      </div>

                      {/* Tech Chips */}
                      <div className="pt-2 border-t border-black/5 dark:border-white/5 flex flex-wrap gap-1">
                        {proj.techStack && proj.techStack.length > 0 ? (
                          proj.techStack.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="px-1.5 py-0.5 rounded text-[10.5px] bg-black/5 dark:bg-white/10 text-win-text-light dark:text-win-text-dark font-normal"
                            >
                              {t}
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] text-win-muted-light dark:text-win-muted-dark italic">
                            Technology details coming soon
                          </span>
                        )}
                        {proj.techStack && proj.techStack.length > 3 && (
                          <span className="text-[10px] text-win-muted-light dark:text-win-muted-dark self-center">
                            +{proj.techStack.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Details List View */
              <div className="border border-black/10 dark:border-white/10 rounded-lg overflow-hidden bg-white dark:bg-[#202020]">
                {/* Table Header */}
                <div className="grid grid-cols-12 px-3 py-2 bg-[#f3f3f3] dark:bg-[#242424] border-b border-black/10 dark:border-white/10 text-[11px] font-medium text-win-muted-light dark:text-win-muted-dark">
                  <div className="col-span-5 sm:col-span-4">Name</div>
                  <div className="col-span-4 sm:col-span-3">Category</div>
                  <div className="hidden sm:block sm:col-span-4">Technologies</div>
                  <div className="col-span-3 sm:col-span-1 text-right">Action</div>
                </div>

                {/* Table Rows */}
                <div className="divide-y divide-black/5 dark:divide-white/5">
                  {filteredProjects.map((proj) => (
                    <div
                      key={proj.id}
                      onClick={() => setActiveProject(proj)}
                      className="grid grid-cols-12 px-3 py-2 text-xs items-center hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      <div className="col-span-5 sm:col-span-4 flex items-center gap-2 truncate pr-2">
                        <Folder className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="font-medium text-win-text-light dark:text-win-text-dark truncate">
                          {proj.title}
                        </span>
                        {proj.tier === 1 && (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/15 text-amber-700 dark:text-amber-400 shrink-0">
                            Major
                          </span>
                        )}
                      </div>

                      <div className="col-span-4 sm:col-span-3 text-win-muted-light dark:text-win-muted-dark text-[11px] truncate">
                        {proj.categoryLabel}
                      </div>

                      <div className="hidden sm:block sm:col-span-4 text-win-muted-light dark:text-win-muted-dark text-[11px] truncate pr-2">
                        {proj.techStack && proj.techStack.length > 0
                          ? proj.techStack.join(', ')
                          : '—'}
                      </div>

                      <div className="col-span-3 sm:col-span-1 flex justify-end gap-1.5 text-win-muted-light dark:text-win-muted-dark">
                        {(proj.liveDemoUrl || proj.liveUrl) && <ExternalLink className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
                        {proj.githubUrl && <Code2 className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {filteredProjects.length === 0 && (
              <div className="p-8 text-center space-y-2">
                <Folder className="w-10 h-10 text-win-muted-light dark:text-win-muted-dark mx-auto opacity-40" />
                <p className="text-xs text-win-muted-light dark:text-win-muted-dark">
                  No items match your search.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="text-xs text-win-accent hover:underline"
                >
                  Clear search filters
                </button>
              </div>
            )}
          </div>

          {/* Bottom Status Bar */}
          <div className="h-6 px-3 border-t border-black/10 dark:border-white/10 bg-[#f3f3f3] dark:bg-[#202020] flex items-center justify-between text-[10.5px] text-win-muted-light dark:text-win-muted-dark">
            <span>{filteredProjects.length} items</span>
            <span>FAUZAAN OS File System</span>
          </div>
        </div>
      </div>

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
