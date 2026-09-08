import React, { useState } from 'react';
import { Cpu, Sparkles, Eye, ArrowUpRight } from 'lucide-react';
import { PROJECTS_DATA } from '../../data/projects';
import type { Project } from '../../types/project';
import { ProjectDetailModal } from '../projects/ProjectDetailModal';

export const AILabWindow: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const aiProjects = PROJECTS_DATA.filter((p) => p.category === 'ai-automation');
  const weaverAI = aiProjects.find((p) => p.id === 'weaver-ai');
  const marketNow = aiProjects.find((p) => p.id === 'marketnow');
  const visionProjects = aiProjects.filter(
    (p) => p.id === 'post-office-analyzer' || p.id === 'cafe-analyzer'
  );
  const ragProject = aiProjects.find((p) => p.id === 'rag-document-analyzer');

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-os-border gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-os-card border border-os-border text-os-emerald">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-mono text-os-text">
              AI Lab // Autonomous Systems
            </h1>
            <p className="text-xs text-os-muted">
              Computer vision pipelines, Generative Engine Optimization, and agentic platforms
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-os-emerald/10 border border-os-emerald/30 text-os-emerald font-semibold">
            <span className="w-2 h-2 rounded-full bg-os-emerald animate-ping" />
            <span>NEURAL PIPELINE ACTIVE</span>
          </span>
        </div>
      </div>

      {/* Flagship Tier 1 Spotlight: Weaver AI & MarketNOW */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-xs font-mono text-os-muted uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-os-accent" />
          <span>Flagship Intelligence Platforms</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {weaverAI && (
            <div
              onClick={() => setActiveProject(weaverAI)}
              className="p-5 rounded-xl bg-gradient-to-br from-os-card via-os-card to-os-card/90 border border-os-accent/40 hover:border-os-accent shadow-lg shadow-os-accent/5 cursor-pointer transition-all duration-200 space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-base text-os-text">{weaverAI.title}</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-os-accent/15 border border-os-accent/30 text-os-accent">
                      AUTONOMOUS SYNTHESIS
                    </span>
                  </div>
                  <p className="text-xs font-mono text-os-accent mt-0.5">
                    {weaverAI.tagline}
                  </p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-os-accent shrink-0" />
              </div>

              <p className="text-xs text-os-muted leading-relaxed">
                {weaverAI.shortDescription}
              </p>

              <div className="pt-2 border-t border-os-border/50 flex flex-wrap gap-1.5">
                {weaverAI.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded text-[10px] font-mono bg-os-surface border border-os-border text-os-text"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {marketNow && (
            <div
              onClick={() => setActiveProject(marketNow)}
              className="p-5 rounded-xl bg-gradient-to-br from-os-card via-os-card to-os-card/90 border border-os-emerald/40 hover:border-os-emerald shadow-lg shadow-os-emerald/5 cursor-pointer transition-all duration-200 space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-base text-os-text">{marketNow.title}</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-os-emerald/15 border border-os-emerald/30 text-os-emerald">
                      GEO INTELLIGENCE
                    </span>
                  </div>
                  <p className="text-xs font-mono text-os-emerald mt-0.5">
                    {marketNow.tagline}
                  </p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-os-emerald shrink-0" />
              </div>

              <p className="text-xs text-os-muted leading-relaxed">
                {marketNow.shortDescription}
              </p>

              <div className="pt-2 border-t border-os-border/50 flex items-center justify-between text-[11px] font-mono text-os-dim">
                <span>Google • ChatGPT • Perplexity • Claude • Gemini</span>
                <span className="text-os-emerald">Enterprise</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Vision Systems & RAG Modules */}
      <div className="space-y-3 pt-2">
        <h2 className="text-xs font-mono text-os-muted uppercase tracking-wider flex items-center space-x-2">
          <Eye className="w-3.5 h-3.5 text-os-accent" />
          <span>Computer Vision & Semantic Retrieval Modules</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {visionProjects.map((mod) => (
            <div
              key={mod.id}
              onClick={() => setActiveProject(mod)}
              className="p-4 rounded-xl bg-os-card/60 border border-os-border hover:border-os-accent/50 cursor-pointer transition-all space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm text-os-text">{mod.title}</h3>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-os-emerald/10 border border-os-emerald/20 text-os-emerald">
                    VISION
                  </span>
                </div>
                <p className="text-[11px] font-mono text-os-muted">{mod.tagline}</p>
                <p className="text-xs text-os-muted leading-relaxed line-clamp-2">
                  {mod.shortDescription}
                </p>
              </div>

              <div className="flex flex-wrap gap-1 pt-2 border-t border-os-border/40">
                {mod.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-os-dim"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {ragProject && (
            <div
              onClick={() => setActiveProject(ragProject)}
              className="p-4 rounded-xl bg-os-card/60 border border-os-border hover:border-os-neural/50 cursor-pointer transition-all space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm text-os-text">{ragProject.title}</h3>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-os-neural/10 border border-os-neural/20 text-os-neural">
                    RAG
                  </span>
                </div>
                <p className="text-[11px] font-mono text-os-muted">{ragProject.tagline}</p>
                <p className="text-xs text-os-muted leading-relaxed line-clamp-2">
                  {ragProject.shortDescription}
                </p>
              </div>

              <div className="flex flex-wrap gap-1 pt-2 border-t border-os-border/40">
                {ragProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-os-dim"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {activeProject && (
        <ProjectDetailModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </div>
  );
};
