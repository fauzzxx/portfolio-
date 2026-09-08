import React, { useState } from 'react';
import { PlaySquare, Video, Mic } from 'lucide-react';
import { PROJECTS_DATA } from '../../data/projects';
import type { Project } from '../../types/project';
import { VideoPlayer } from '../common/VideoPlayer';
import { NarrationPlayer } from '../common/NarrationPlayer';

export const MediaWindow: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project>(PROJECTS_DATA[0]);
  const [activeTab, setActiveTab] = useState<'video' | 'audio'>('video');

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-os-border gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-os-card border border-os-border text-os-accent">
            <PlaySquare className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-mono text-os-text">
              Media Center & Walkthroughs
            </h1>
            <p className="text-xs text-os-muted">
              Project video demonstrations, technical walkthroughs, and audio narration
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-os-card border border-os-border text-os-dim">
            ASSET SUBSYSTEM READY
          </span>
        </div>
      </div>

      {/* Primary Media Theater */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Player Screen */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-os-dim uppercase tracking-wider block">
                Active Demonstration Theater
              </span>
              <h2 className="text-base font-bold font-mono text-os-text">
                {selectedProject.title}
              </h2>
            </div>

            {/* Media Mode Tabs */}
            <div className="flex items-center p-1 rounded-lg bg-os-card border border-os-border text-xs font-mono">
              <button
                onClick={() => setActiveTab('video')}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded transition-colors ${
                  activeTab === 'video'
                    ? 'bg-os-surface text-os-accent font-bold'
                    : 'text-os-muted hover:text-os-text'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Video</span>
              </button>
              <button
                onClick={() => setActiveTab('audio')}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded transition-colors ${
                  activeTab === 'audio'
                    ? 'bg-os-surface text-os-accent font-bold'
                    : 'text-os-muted hover:text-os-text'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Narration</span>
              </button>
            </div>
          </div>

          {activeTab === 'video' ? (
            <VideoPlayer
              src={selectedProject.videos[0]}
              title={`${selectedProject.title} Demo`}
            />
          ) : (
            <NarrationPlayer
              audioSrc={selectedProject.audio}
              projectTitle={selectedProject.title}
              chapterTitle="Project Narration Commentary"
              transcript={selectedProject.description}
            />
          )}

          <div className="p-3.5 rounded-xl bg-os-card/50 border border-os-border space-y-1">
            <span className="text-xs font-mono text-os-accent block">
              {selectedProject.categoryLabel}
            </span>
            <p className="text-xs text-os-muted leading-relaxed font-light">
              {selectedProject.shortDescription}
            </p>
          </div>
        </div>

        {/* Media Channels Directory */}
        <div className="space-y-3">
          <span className="text-xs font-mono text-os-muted uppercase tracking-wider block">
            Media Catalog ({PROJECTS_DATA.length})
          </span>

          <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
            {PROJECTS_DATA.map((proj) => {
              const isSelected = selectedProject.id === proj.id;
              const hasVideo = proj.videos.length > 0;

              return (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-os-card border-os-accent shadow-md shadow-os-accent/5'
                      : 'bg-os-card/40 border-os-border hover:border-os-border-focus'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold font-mono text-os-text truncate pr-2">
                      {proj.title}
                    </h3>
                    {hasVideo ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-os-emerald" title="Video channel ready" />
                    ) : (
                      <span className="text-[10px] font-mono text-os-dim">Standby</span>
                    )}
                  </div>
                  <p className="text-[11px] text-os-dim line-clamp-1 mt-0.5">
                    {proj.tagline || proj.shortDescription}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
