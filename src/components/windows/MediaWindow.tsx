import React, { useState } from 'react';
import { PlaySquare, Video, Mic, Search, Play } from 'lucide-react';
import { PROJECTS_DATA } from '../../data/projects';
import type { Project } from '../../types/project';
import { VideoPlayer } from '../common/VideoPlayer';
import { NarrationPlayer } from '../common/NarrationPlayer';

export const MediaWindow: React.FC = () => {
  const mediaProjects = PROJECTS_DATA.filter((p) => p.videos && p.videos.length > 0);
  const [selectedProject, setSelectedProject] = useState<Project>(mediaProjects[0] || PROJECTS_DATA[0]);
  const [selectedVideoIdx, setSelectedVideoIdx] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'video' | 'audio'>('video');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredMedia = mediaProjects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const projectVideos = selectedProject.videos && selectedProject.videos.length > 0
    ? selectedProject.videos
    : (selectedProject.videoUrl ? [selectedProject.videoUrl] : []);
  const currentVideoSrc = projectVideos[selectedVideoIdx] || projectVideos[0];
  const totalVideos = mediaProjects.reduce((acc, p) => acc + (p.videos?.length || 0), 0);

  return (
    <div className="flex flex-col h-full bg-[#fafafa] dark:bg-[#1c1c1c] select-none text-win-text-light dark:text-win-text-dark">
      {/* Media Player Header */}
      <div className="h-11 px-4 border-b border-black/10 dark:border-white/10 bg-[#f3f3f3] dark:bg-[#222222] flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2.5">
          <div className="w-6 h-6 rounded bg-win-accent/15 text-win-accent flex items-center justify-center">
            <PlaySquare className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold text-win-text-light dark:text-win-text-dark">
            Media Player
          </span>
          <span className="text-xs text-win-muted-light dark:text-win-muted-dark hidden sm:inline">
            • Project Demonstrations & Architecture Showcases
          </span>
        </div>

        {/* Media Switcher: Video vs Narration */}
        <div className="flex items-center p-0.5 rounded border border-black/10 dark:border-white/10 bg-white dark:bg-[#1a1a1a] text-xs">
          <button
            onClick={() => setActiveTab('video')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors ${
              activeTab === 'video'
                ? 'bg-win-accent text-white font-medium shadow-sm'
                : 'text-win-muted-light dark:text-win-muted-dark hover:text-win-text-light dark:hover:text-win-text-dark'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Video</span>
          </button>
          <button
            onClick={() => setActiveTab('audio')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors ${
              activeTab === 'audio'
                ? 'bg-win-accent text-white font-medium shadow-sm'
                : 'text-win-muted-light dark:text-win-muted-dark hover:text-win-text-light dark:hover:text-win-text-dark'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Narration</span>
          </button>
        </div>
      </div>

      {/* Main Player Body: Left Screen + Right Playlist */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Theater View */}
        <div className="flex-1 p-4 overflow-y-auto win-scrollbar space-y-3 bg-[#fdfdfd] dark:bg-[#181818]">
          {/* Multiple Demo Switcher */}
          {activeTab === 'video' && projectVideos.length > 1 && (
            <div className="flex items-center justify-between p-2.5 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#222222]">
              <span className="text-xs font-semibold text-win-text-light dark:text-win-text-dark">
                {selectedProject.title} Demonstrations ({projectVideos.length} Recordings)
              </span>
              <div className="flex items-center gap-1.5">
                {projectVideos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedVideoIdx(idx)}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                      selectedVideoIdx === idx
                        ? 'bg-win-accent text-white shadow-sm'
                        : 'bg-black/5 dark:bg-white/5 text-win-muted-light dark:text-win-muted-dark hover:text-win-text-light dark:hover:text-win-text-dark'
                    }`}
                  >
                    Demo {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-lg overflow-hidden border border-black/10 dark:border-white/10 bg-black shadow-lg">
            {activeTab === 'video' ? (
              <VideoPlayer
                src={currentVideoSrc}
                title={`${selectedProject.title}${projectVideos.length > 1 ? ` (Demo ${selectedVideoIdx + 1})` : ''}`}
              />
            ) : (
              <div className="p-4 bg-white dark:bg-[#202020]">
                <NarrationPlayer
                  audioSrc={selectedProject.audioUrl || selectedProject.audio}
                  projectTitle={selectedProject.title}
                  chapterTitle="Technical Walkthrough Narration"
                  transcript={selectedProject.description}
                />
              </div>
            )}
          </div>

          {/* Video Metadata Card */}
          <div className="p-3.5 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#222222] space-y-1">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-win-text-light dark:text-win-text-dark">
                {selectedProject.title}
              </h2>
              <span className="text-xs px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-win-muted-light dark:text-win-muted-dark font-medium">
                {selectedProject.categoryLabel}
              </span>
            </div>
            <p className="text-xs text-win-muted-light dark:text-win-muted-dark leading-relaxed">
              {selectedProject.shortDescription}
            </p>
          </div>
        </div>

        {/* Playlist Right Sidebar */}
        <div className="w-full lg:w-72 border-t lg:border-t-0 lg:border-l border-black/10 dark:border-white/10 bg-[#f5f5f5] dark:bg-[#1f1f1f] flex flex-col shrink-0">
          <div className="p-2.5 border-b border-black/10 dark:border-white/10 space-y-2">
            <div className="text-xs font-semibold text-win-text-light dark:text-win-text-dark flex items-center justify-between">
              <span>Project Demonstrations</span>
              <span className="text-[11px] text-win-muted-light dark:text-win-muted-dark font-normal">
                {mediaProjects.length} Projects ({totalVideos} Videos)
              </span>
            </div>

            <div className="relative">
              <Search className="w-3 h-3 text-win-muted-light dark:text-win-muted-dark absolute left-2 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search recordings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-7 pl-6 pr-2 rounded border border-black/15 dark:border-white/15 bg-white dark:bg-[#1a1a1a] text-xs text-win-text-light dark:text-win-text-dark placeholder:text-win-muted-light dark:placeholder:text-win-muted-dark focus:outline-none focus:border-win-accent"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1 win-scrollbar">
            {filteredMedia.map((proj) => {
              const isSelected = selectedProject.id === proj.id;
              const videoCount = proj.videos ? proj.videos.length : 0;
              return (
                <button
                  key={proj.id}
                  onClick={() => {
                    setSelectedProject(proj);
                    setSelectedVideoIdx(0);
                  }}
                  className={`w-full text-left p-2 rounded text-xs transition-colors flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-win-accent text-white font-medium shadow-sm'
                      : 'hover:bg-black/5 dark:hover:bg-white/5 text-win-text-light dark:text-win-text-dark'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-black/5 dark:bg-white/10 text-win-muted-light dark:text-win-muted-dark'
                    }`}
                  >
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">{proj.title}</div>
                    <div
                      className={`text-[10.5px] flex items-center justify-between ${
                        isSelected ? 'text-white/80' : 'text-win-muted-light dark:text-win-muted-dark'
                      }`}
                    >
                      <span className="truncate pr-1">{proj.categoryLabel}</span>
                      <span className="shrink-0 font-medium">
                        {videoCount} {videoCount === 1 ? 'video' : 'videos'}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
