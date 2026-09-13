import React, { useState } from 'react';
import {
  Bot,
  Eye,
  Sparkles,
  ExternalLink,
  ArrowRight,
  Brain,
  FileSearch,
  Cpu,
} from 'lucide-react';
import { PROJECTS_DATA } from '../../data/projects';
import type { Project } from '../../types/project';
import { ProjectDetailModal } from '../projects/ProjectDetailModal';

export const AILabWindow: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<'all' | 'genai' | 'vision' | 'retrieval'>('all');

  // GenAI systems (Section 30)
  const genAiIds = ['al-aql', 'weaver-ai', 'marketnow'];
  const genAiProjects = genAiIds
    .map((id) => PROJECTS_DATA.find((p) => p.id === id))
    .filter((p): p is Project => Boolean(p));

  // Computer Vision systems (Section 30)
  const visionIds = [
    'post-office-analyzer',
    'cafe-analyzer',
    'smart-classroom-assist',
    'classroom-analyser',
    'football-analyser',
    'patrolpro',
  ];
  const visionProjects = visionIds
    .map((id) => PROJECTS_DATA.find((p) => p.id === id))
    .filter((p): p is Project => Boolean(p));

  // Retrieval / RAG systems (Section 30)
  const retrievalIds = ['rag-document-analyzer', 'al-aql', 'offline-ai-chatbot'];
  const retrievalProjects = retrievalIds
    .map((id) => PROJECTS_DATA.find((p) => p.id === id))
    .filter((p): p is Project => Boolean(p));

  // Total unique AI systems
  const allAiIds = Array.from(new Set([...genAiIds, ...visionIds, ...retrievalIds]));
  const totalAiCount = allAiIds.length;

  const renderCard = (project: Project, icon: React.ReactNode, iconBg: string) => {
    const hasLive = Boolean(project.liveDemoUrl || project.liveUrl);

    return (
      <div
        key={project.id}
        onClick={() => setActiveProject(project)}
        className="p-4 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#242424] hover:border-win-accent transition-all cursor-pointer shadow-sm flex flex-col justify-between space-y-3 group"
      >
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`p-2 rounded-md ${iconBg} shrink-0`}>
                {icon}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="font-semibold text-sm text-win-text-light dark:text-win-text-dark truncate group-hover:text-win-accent transition-colors">
                    {project.title}
                  </h3>
                  {hasLive && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9.5px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <ExternalLink className="w-2.5 h-2.5" />
                      LIVE DEMO
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-win-muted-light dark:text-win-muted-dark font-medium block truncate">
                  {project.tagline}
                </span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-win-muted-light dark:text-win-muted-dark group-hover:text-win-accent group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
          </div>

          <p className="text-xs text-win-muted-light dark:text-win-muted-dark leading-relaxed line-clamp-3">
            {project.shortDescription}
          </p>
        </div>

        <div className="pt-2.5 border-t border-black/5 dark:border-white/5 flex flex-wrap gap-1">
          {project.techStack && project.techStack.length > 0 ? (
            project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-1.5 py-0.5 rounded text-[10.5px] bg-black/5 dark:bg-white/5 text-win-text-light dark:text-win-text-dark font-mono"
              >
                {tech}
              </span>
            ))
          ) : (
            <span className="text-[10.5px] text-win-muted-light dark:text-win-muted-dark italic">
              Technology details coming soon
            </span>
          )}
          {project.techStack && project.techStack.length > 4 && (
            <span className="px-1.5 py-0.5 rounded text-[10px] text-win-muted-light dark:text-win-muted-dark font-medium">
              +{project.techStack.length - 4} more
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-5 max-w-5xl mx-auto space-y-6 select-none text-win-text-light dark:text-win-text-dark">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-black/10 dark:border-white/10 gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-win-accent/10 text-win-accent flex items-center justify-center shrink-0 border border-black/10 dark:border-white/10">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-win-text-light dark:text-win-text-dark">
              AI Lab & Machine Learning Systems
            </h1>
            <p className="text-xs text-win-muted-light dark:text-win-muted-dark">
              Production autonomous systems, Computer Vision pipelines, and Generative Engine Optimization
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedDomain('all')}
            className={`px-2.5 py-1 rounded border transition-colors ${
              selectedDomain === 'all'
                ? 'bg-win-accent text-white border-win-accent font-medium'
                : 'bg-white dark:bg-[#252525] border-black/10 dark:border-white/10 text-win-muted-light dark:text-win-muted-dark hover:text-win-text-light dark:hover:text-win-text-dark'
            }`}
          >
            All Systems ({totalAiCount})
          </button>
          <button
            onClick={() => setSelectedDomain('genai')}
            className={`px-2.5 py-1 rounded border transition-colors ${
              selectedDomain === 'genai'
                ? 'bg-win-accent text-white border-win-accent font-medium'
                : 'bg-white dark:bg-[#252525] border-black/10 dark:border-white/10 text-win-muted-light dark:text-win-muted-dark hover:text-win-text-light dark:hover:text-win-text-dark'
            }`}
          >
            Generative AI ({genAiProjects.length})
          </button>
          <button
            onClick={() => setSelectedDomain('vision')}
            className={`px-2.5 py-1 rounded border transition-colors ${
              selectedDomain === 'vision'
                ? 'bg-win-accent text-white border-win-accent font-medium'
                : 'bg-white dark:bg-[#252525] border-black/10 dark:border-white/10 text-win-muted-light dark:text-win-muted-dark hover:text-win-text-light dark:hover:text-win-text-dark'
            }`}
          >
            Computer Vision ({visionProjects.length})
          </button>
          <button
            onClick={() => setSelectedDomain('retrieval')}
            className={`px-2.5 py-1 rounded border transition-colors ${
              selectedDomain === 'retrieval'
                ? 'bg-win-accent text-white border-win-accent font-medium'
                : 'bg-white dark:bg-[#252525] border-black/10 dark:border-white/10 text-win-muted-light dark:text-win-muted-dark hover:text-win-text-light dark:hover:text-win-text-dark'
            }`}
          >
            RAG / Retrieval ({retrievalProjects.length})
          </button>
        </div>
      </div>

      {/* Flagship Architectures (GenAI) */}
      {(selectedDomain === 'all' || selectedDomain === 'genai') && (
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-win-muted-light dark:text-win-muted-dark uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-win-accent" />
            <span>Generative AI & Autonomous Agents</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {genAiProjects.map((p) =>
              renderCard(
                p,
                <Brain className="w-4 h-4 text-win-accent" />,
                'bg-win-accent/10 text-win-accent'
              )
            )}
          </div>
        </div>
      )}

      {/* Computer Vision & Edge Systems */}
      {(selectedDomain === 'all' || selectedDomain === 'vision') && (
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-win-muted-light dark:text-win-muted-dark uppercase tracking-wider">
            <Eye className="w-3.5 h-3.5 text-blue-500" />
            <span>Computer Vision & Spatial Analytics</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visionProjects.map((p) =>
              renderCard(
                p,
                <Eye className="w-4 h-4 text-blue-500" />,
                'bg-blue-500/10 text-blue-500'
              )
            )}
          </div>
        </div>
      )}

      {/* Semantic Retrieval & RAG */}
      {(selectedDomain === 'all' || selectedDomain === 'retrieval') && (
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-win-muted-light dark:text-win-muted-dark uppercase tracking-wider">
            <FileSearch className="w-3.5 h-3.5 text-purple-500" />
            <span>Information Retrieval & RAG Architecture</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {retrievalProjects.map((p) =>
              renderCard(
                p,
                <Cpu className="w-4 h-4 text-purple-500" />,
                'bg-purple-500/10 text-purple-500'
              )
            )}
          </div>
        </div>
      )}

      {/* Project Detail Dialog */}
      {activeProject && (
        <ProjectDetailModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </div>
  );
};
