import React, { useState } from 'react';
import type { Project } from '../../types/project';
import { VideoPlayer } from '../common/VideoPlayer';
import { NarrationPlayer } from '../common/NarrationPlayer';
import {
  X,
  ExternalLink,
  Code2,
  CheckCircle2,
  FileCode,
  Globe,
  Bot,
  Smartphone,
  Sparkles,
  Lightbulb,
  Workflow,
  GitBranch,
} from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
  onOpenSkill?: (skillName: string) => void;
}

type TabId = 'general' | 'dna' | 'trace' | 'demonstrates' | 'capabilities' | 'tech' | 'media';

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<TabId>('general');
  const [selectedVideoIdx, setSelectedVideoIdx] = useState<number>(0);

  const tabs: { id: TabId; label: string }[] = [
    { id: 'general', label: 'General' },
    { id: 'dna', label: 'Project DNA' },
    { id: 'trace', label: 'Build Trace' },
    { id: 'demonstrates', label: 'Demonstrates' },
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'tech', label: 'Tech Stack' },
    { id: 'media', label: 'Media & Voice' },
  ];

  const effectiveLiveUrl = project.liveDemoUrl || project.liveUrl;
  const effectiveAudioUrl = project.audioUrl || project.audio;
  const videoList: string[] =
    project.videoUrls && project.videoUrls.length > 0
      ? project.videoUrls
      : project.videos && project.videos.length > 0
      ? project.videos
      : project.videoUrl
      ? [project.videoUrl]
      : [];
  const currentVideoSrc = videoList[selectedVideoIdx] || videoList[0] || undefined;

  const getCategoryIcon = () => {
    switch (project.category) {
      case 'ai-automation':
        return <Bot className="w-4 h-4 text-win-accent" />;
      case 'web-development':
        return <Globe className="w-4 h-4 text-blue-500" />;
      case 'app-development':
        return <Smartphone className="w-4 h-4 text-emerald-500" />;
      default:
        return <FileCode className="w-4 h-4 text-amber-500" />;
    }
  };

  const demonstratedSkills =
    project.demonstrates && project.demonstrates.length > 0
      ? project.demonstrates
      : project.techStack.length > 0
      ? project.techStack
      : project.capabilities;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm select-none font-sans">
      <div className="relative w-full max-w-2xl flex flex-col rounded-xl bg-[#fafafa] dark:bg-[#1f1f1f] border border-black/20 dark:border-white/20 shadow-2xl overflow-hidden text-win-text-light dark:text-win-text-dark animate-in fade-in zoom-in-95 duration-100">
        {/* Windows Dialog Titlebar */}
        <div className="h-9 px-3 flex items-center justify-between border-b border-black/10 dark:border-white/10 bg-[#f0f0f0] dark:bg-[#252525]">
          <div className="flex items-center space-x-2 min-w-0 pr-2">
            {getCategoryIcon()}
            <span className="text-xs font-medium text-win-text-light dark:text-win-text-dark truncate">
              {project.title} Properties
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="w-10 h-full -mr-3 flex items-center justify-center text-win-muted-light dark:text-win-muted-dark hover:bg-[#e81123] hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Windows Tab Strip */}
        <div className="flex items-center border-b border-black/10 dark:border-white/10 px-3 bg-[#f5f5f5] dark:bg-[#222222] gap-1 pt-1 overflow-x-auto win-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 text-xs font-medium transition-colors border-b-2 -mb-px shrink-0 ${
                activeTab === tab.id
                  ? 'border-win-accent text-win-accent bg-[#fafafa] dark:bg-[#1f1f1f] rounded-t font-semibold'
                  : 'border-transparent text-win-muted-light dark:text-win-muted-dark hover:text-win-text-light dark:hover:text-win-text-dark'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-4 overflow-y-auto max-h-[62vh] win-scrollbar space-y-4">
          {/* GENERAL TAB */}
          {activeTab === 'general' && (
            <div className="space-y-4 text-xs">
              {/* Header Box */}
              <div className="flex items-start gap-3 p-3 rounded border border-black/10 dark:border-white/10 bg-white dark:bg-[#262626]">
                <div className="w-10 h-10 rounded bg-win-accent/10 flex items-center justify-center shrink-0">
                  {getCategoryIcon()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-semibold text-win-text-light dark:text-win-text-dark">
                      {project.title}
                    </h2>
                    {project.tier === 1 && (
                      <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-amber-500/15 text-amber-700 dark:text-amber-400 font-medium">
                        <Sparkles className="w-2.5 h-2.5" />
                        Major System
                      </span>
                    )}
                  </div>
                  <p className="text-win-muted-light dark:text-win-muted-dark text-xs mt-0.5">
                    {project.categoryLabel}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="p-3 rounded border border-black/10 dark:border-white/10 bg-white dark:bg-[#262626] space-y-1.5">
                <div className="font-semibold text-win-text-light dark:text-win-text-dark">
                  Overview
                </div>
                <p className="text-win-text-light dark:text-win-text-dark leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* WHY I BUILT THIS */}
              <div className="p-3 rounded border border-black/10 dark:border-white/10 bg-white dark:bg-[#262626] space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-win-text-light dark:text-win-text-dark">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  <span>Why I Built This</span>
                </div>
                <p className="text-win-text-light dark:text-win-text-dark leading-relaxed">
                  {project.motivation || 'Project motivation will be added.'}
                </p>
              </div>

              {/* System Details Metadata Table */}
              <div className="border border-black/10 dark:border-white/10 rounded overflow-hidden bg-white dark:bg-[#262626]">
                <div className="grid grid-cols-3 p-2.5 border-b border-black/5 dark:border-white/5">
                  <span className="text-win-muted-light dark:text-win-muted-dark">Category:</span>
                  <span className="col-span-2 font-medium">{project.categoryLabel}</span>
                </div>
                <div className="grid grid-cols-3 p-2.5 border-b border-black/5 dark:border-white/5">
                  <span className="text-win-muted-light dark:text-win-muted-dark">Role / Tier:</span>
                  <span className="col-span-2 font-medium">
                    {project.tier === 1 ? 'Primary Architectural Build' : 'Engineering Component'}
                  </span>
                </div>
                <div className="grid grid-cols-3 p-2.5 border-b border-black/5 dark:border-white/5">
                  <span className="text-win-muted-light dark:text-win-muted-dark">Live Deployment:</span>
                  <span className="col-span-2">
                    {effectiveLiveUrl ? (
                      <a
                        href={effectiveLiveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-win-accent hover:underline inline-flex items-center gap-1 font-medium"
                      >
                        {effectiveLiveUrl} <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-win-muted-light dark:text-win-muted-dark italic">
                        Internal / Local Host
                      </span>
                    )}
                  </span>
                </div>
                <div className="grid grid-cols-3 p-2.5">
                  <span className="text-win-muted-light dark:text-win-muted-dark">Repository:</span>
                  <span className="col-span-2">
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-win-accent hover:underline inline-flex items-center gap-1 font-medium"
                      >
                        {project.githubUrl} <Code2 className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-win-muted-light dark:text-win-muted-dark italic">
                        Private / Proprietary
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* PROJECT DNA TAB */}
          {activeTab === 'dna' && (
            <div className="space-y-3 text-xs">
              <div className="text-win-muted-light dark:text-win-muted-dark">
                Architectural DNA: Problem statement, model pipeline, and engineering flow.
              </div>

              {project.dnaNodes && project.dnaNodes.length > 0 ? (
                <div className="space-y-2 relative">
                  {project.dnaNodes.map((node, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#262626] flex items-start gap-3 transition-colors hover:border-win-accent"
                    >
                      <div className="w-6 h-6 rounded-full bg-win-accent/15 text-win-accent flex items-center justify-center shrink-0 font-mono text-[11px] font-bold">
                        {idx + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-win-accent font-semibold block">
                          {node.label}
                        </span>
                        <p className="text-win-text-light dark:text-win-text-dark font-medium mt-0.5 leading-relaxed">
                          {node.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded border border-black/10 dark:border-white/10 bg-white dark:bg-[#262626] text-center space-y-2">
                  <Workflow className="w-8 h-8 text-win-muted-light dark:text-win-muted-dark mx-auto opacity-50" />
                  <div className="font-medium text-win-text-light dark:text-win-text-dark">
                    Standard Architecture Flow
                  </div>
                  <p className="text-win-muted-light dark:text-win-muted-dark text-[11px]">
                    Detailed Project DNA node graph will be expanded for this build.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* BUILD TRACE TAB */}
          {activeTab === 'trace' && (
            <div className="space-y-3 text-xs">
              <div className="text-win-muted-light dark:text-win-muted-dark">
                How I Built It: Execution pipeline from input signal to verified output.
              </div>

              {project.buildTrace && project.buildTrace.length > 0 ? (
                <div className="space-y-2.5">
                  {project.buildTrace.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#262626] space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded bg-win-accent/15 text-win-accent font-mono text-[10px] font-bold tracking-wider">
                          STAGE {idx + 1} • {step.stage}
                        </span>
                      </div>
                      <p className="text-win-text-light dark:text-win-text-dark leading-relaxed pl-1">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded border border-black/10 dark:border-white/10 bg-white dark:bg-[#262626] text-center space-y-2">
                  <GitBranch className="w-8 h-8 text-win-muted-light dark:text-win-muted-dark mx-auto opacity-50" />
                  <div className="font-medium text-win-text-light dark:text-win-text-dark">
                    Build Pipeline
                  </div>
                  <p className="text-win-muted-light dark:text-win-muted-dark text-[11px]">
                    Pipeline trace details coming soon.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* DEMONSTRATES TAB */}
          {activeTab === 'demonstrates' && (
            <div className="space-y-3 text-xs">
              <div className="text-win-muted-light dark:text-win-muted-dark">
                Specific technical concepts and capabilities demonstrated by this project:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {demonstratedSkills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded border border-black/10 dark:border-white/10 bg-white dark:bg-[#262626] flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="font-medium text-win-text-light dark:text-win-text-dark">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CAPABILITIES TAB */}
          {activeTab === 'capabilities' && (
            <div className="space-y-3 text-xs">
              <div className="text-win-muted-light dark:text-win-muted-dark">
                Key architectural capabilities and features implemented in this system:
              </div>
              <div className="space-y-2">
                {project.capabilities.map((cap, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded border border-black/10 dark:border-white/10 bg-white dark:bg-[#262626] flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-win-text-light dark:text-win-text-dark leading-relaxed">
                      {cap}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TECH STACK TAB */}
          {activeTab === 'tech' && (
            <div className="space-y-3 text-xs">
              <div className="text-win-muted-light dark:text-win-muted-dark">
                Libraries, runtimes, and frameworks utilized:
              </div>
              {project.techStack && project.techStack.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {project.techStack.map((tech) => (
                    <div
                      key={tech}
                      className="p-2.5 rounded border border-black/10 dark:border-white/10 bg-white dark:bg-[#262626] flex items-center gap-2"
                    >
                      <div className="w-2 h-2 rounded-full bg-win-accent" />
                      <span className="font-medium text-win-text-light dark:text-win-text-dark truncate">
                        {tech}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded border border-black/10 dark:border-white/10 bg-white dark:bg-[#262626] text-win-muted-light dark:text-win-muted-dark italic text-center">
                  Technology details coming soon.
                </div>
              )}
            </div>
          )}

          {/* MEDIA & VOICE TAB */}
          {activeTab === 'media' && (
            <div className="space-y-4 text-xs">
              {/* Video Demonstration (Primary) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-win-text-light dark:text-win-text-dark">
                    Project Demonstration
                  </div>
                  {videoList.length > 1 && (
                    <div className="flex items-center gap-1.5 bg-black/5 dark:bg-white/5 p-0.5 rounded border border-black/10 dark:border-white/10">
                      {videoList.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedVideoIdx(idx)}
                          className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                            selectedVideoIdx === idx
                              ? 'bg-win-accent text-white shadow-sm'
                              : 'text-win-muted-light dark:text-win-muted-dark hover:text-win-text-light dark:hover:text-win-text-dark'
                          }`}
                        >
                          Demo {idx + 1}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <VideoPlayer
                  src={currentVideoSrc}
                  title={`${project.title}${videoList.length > 1 ? ` (Demo ${selectedVideoIdx + 1})` : ''}`}
                />
              </div>

              {/* Voice Narration (Future) */}
              <div>
                <div className="font-semibold text-win-text-light dark:text-win-text-dark mb-1.5">
                  Voice Narration
                </div>
                <NarrationPlayer
                  audioSrc={effectiveAudioUrl}
                  projectTitle={project.title}
                  chapterTitle="Project Walkthrough"
                  transcript={project.description}
                />
              </div>
            </div>
          )}
        </div>

        {/* Windows Dialog Footer / Buttons */}
        <div className="h-12 px-4 border-t border-black/10 dark:border-white/10 bg-[#f0f0f0] dark:bg-[#252525] flex items-center justify-between">
          <div className="flex items-center gap-2">
            {effectiveLiveUrl && (
              <a
                href={effectiveLiveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded bg-win-accent hover:bg-win-accent-hover text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>LIVE DEMO</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded border border-black/15 dark:border-white/15 bg-white dark:bg-[#303030] hover:bg-black/5 dark:hover:bg-white/5 text-win-text-light dark:text-win-text-dark text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded border border-black/15 dark:border-white/15 bg-white dark:bg-[#303030] hover:bg-black/5 dark:hover:bg-white/5 text-win-text-light dark:text-win-text-dark text-xs font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
