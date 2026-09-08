import React, { useState } from 'react';
import type { Project } from '../../types/project';
import { VideoPlayer } from '../common/VideoPlayer';
import { NarrationPlayer } from '../common/NarrationPlayer';
import {
  X,
  Sparkles,
  ExternalLink,
  Code2,
  CheckCircle2,
  Mic,
  Cpu,
} from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
  onOpenSkill?: (skillName: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  const [showNarration, setShowNarration] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-os-surface/95 border border-os-border shadow-2xl overflow-hidden text-os-text">
        {/* Header Bar */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-os-border bg-os-card/70 select-none">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="p-2 rounded-lg bg-os-surface border border-os-border text-os-accent">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <h2 className="text-base sm:text-lg font-bold font-mono truncate text-os-text">
                  {project.title}
                </h2>
                {project.featured && (
                  <span className="flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-mono bg-os-accent/10 border border-os-accent/30 text-os-accent shrink-0">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>FEATURED</span>
                  </span>
                )}
              </div>
              <span className="text-xs font-mono text-os-muted block truncate">
                {project.categoryLabel}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowNarration(!showNarration)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors ${
                showNarration
                  ? 'bg-os-accent/20 border-os-accent text-os-text'
                  : 'bg-os-surface border-os-border text-os-muted hover:text-os-text'
              }`}
            >
              <Mic className="w-3.5 h-3.5 text-os-accent" />
              <span className="hidden sm:inline">Listen to Explanation</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/10 text-os-muted hover:text-os-text transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Narration Drawer if open */}
          {showNarration && (
            <NarrationPlayer
              audioSrc={project.audio}
              projectTitle={project.title}
              chapterTitle="Project Walkthrough Audio"
              transcript={project.description}
            />
          )}

          {/* Overview Banner */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-os-accent block">
              Overview
            </span>
            <p className="text-sm sm:text-base text-os-text leading-relaxed font-light">
              {project.description}
            </p>
          </div>

          {/* Media / Video Demonstration Section */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-os-muted block">
              Project Demonstration
            </span>
            <VideoPlayer
              src={project.videos[0]}
              title={`${project.title} Demonstration`}
            />
          </div>

          {/* What I Built / Capabilities */}
          <div className="space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-os-muted block">
              What I Built & System Capabilities
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {project.capabilities.map((cap, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-os-card/50 border border-os-border/70 flex items-start space-x-2.5 text-xs text-os-muted"
                >
                  <CheckCircle2 className="w-4 h-4 text-os-emerald shrink-0 mt-0.5" />
                  <span className="text-os-text/90 leading-relaxed">{cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Chips */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-os-muted block">
              Technology Stack
            </span>
            {project.techStack && project.techStack.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-os-card border border-os-border text-os-text hover:border-os-accent/40 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs font-mono text-os-dim italic">
                Technology details coming soon.
              </p>
            )}
          </div>

          {/* Links Section */}
          <div className="pt-2 border-t border-os-border/60 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-os-card border border-os-border hover:border-os-accent/50 text-xs font-mono text-os-text transition-colors"
                >
                  <Code2 className="w-4 h-4" />
                  <span>View GitHub Repository</span>
                </a>
              ) : (
                <button
                  disabled
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-os-card/50 border border-os-border text-xs font-mono text-os-dim opacity-50 cursor-not-allowed"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>GitHub Repository: Private / Pending</span>
                </button>
              )}

              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-os-accent/20 border border-os-accent text-xs font-mono text-os-text hover:bg-os-accent/30 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Live Platform</span>
                </a>
              ) : null}
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-os-surface border border-os-border hover:bg-white/5 text-xs font-mono text-os-muted hover:text-os-text transition-colors"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
