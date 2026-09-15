import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  RotateCcw,
  X,
  MessageSquare,
  Sparkles,
  Layers,
  MonitorPlay,
  Film,
  Award,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';
import presentationData from '../../data/presentation.json';
import { PROJECTS_DATA } from '../../data/projects';
import type { Project } from '../../types/project';

interface PresentationPlayerProps {
  onClose: () => void;
  onOpenProject?: (projectId: string) => void;
}

interface ElevenLabsStatus {
  provider: string;
  voiceName?: string;
  voiceId: string;
  status: 'success' | 'error' | 'pending';
  errorMessage?: string;
  httpStatus?: number;
}

interface VideoCue {
  videoIndex: number;
  start: number;
  end: number;
}

// Precise script timestamp cues matching ElevenLabs audio narration
const SEGMENT_VIDEO_CUES: Record<string, VideoCue[]> = {
  'segment-3-web-development-foundation': [
    { videoIndex: 0, start: 39.0, end: 45.0 }, // Alpha Omega
    { videoIndex: 1, start: 45.0, end: 51.0 }, // SIOUGE
    { videoIndex: 2, start: 51.0, end: 57.0 }, // Crestline Capital
    { videoIndex: 3, start: 57.0, end: 65.0 }, // Ammu's Pets & Kennels
  ],
  'segment-4-ai-computer-vision': [
    { videoIndex: 0, start: 65.0, end: 82.9 },  // Post Office Analyser
    { videoIndex: 1, start: 82.9, end: 99.9 },  // Football Analyser
    { videoIndex: 2, start: 99.9, end: 109.0 }, // Classroom Analyser
  ],
  'segment-5-major-ai-products': [
    { videoIndex: 0, start: 109.0, end: 130.8 }, // AL-AQL (Part 1: Architecture)
    { videoIndex: 1, start: 130.8, end: 147.9 }, // AL-AQL (Part 2: Multimodal & Generation)
    { videoIndex: 2, start: 147.9, end: 154.8 }, // Weaver AI (Part 1: Full-stack synthesis)
    { videoIndex: 3, start: 154.8, end: 161.7 }, // Weaver AI (Part 2: Live preview)
    { videoIndex: 4, start: 161.7, end: 176.3 }, // Smart Classroom Assist
    { videoIndex: 5, start: 176.3, end: 181.1 }, // RouteX Capital
    { videoIndex: 6, start: 181.1, end: 186.0 }, // MarketNOW
  ],
  'segment-6-application-development-experiments-montage': [
    { videoIndex: 0, start: 186.0, end: 218.0 }, // Mahdaviat
  ],
};

// Automatically and reliably find the exact project for any video source
export function getProjectForVideo(videoSrc: string): Project | undefined {
  if (!videoSrc) return undefined;
  return PROJECTS_DATA.find(
    (p) =>
      p.videos?.includes(videoSrc) ||
      p.videoUrls?.includes(videoSrc) ||
      p.videoUrl === videoSrc
  );
}

export const PresentationPlayer: React.FC<PresentationPlayerProps> = ({
  onClose,
  onOpenProject,
}) => {
  const segments = presentationData.segments || [];
  const totalDuration = presentationData.totalEstimatedDuration || 270;

  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [userSelectedVideo, setUserSelectedVideo] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState<ElevenLabsStatus | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const currentSegment = segments[currentSegmentIndex] || segments[0];

  // Active videos in this segment
  const currentVideos = currentSegment.videoRefs || [];
  const activeVideoSrc = currentVideos[selectedVideoIndex] || currentVideos[0] || '';

  // Automatically and accurately resolve project from active video first
  const currentProject: Project | undefined =
    getProjectForVideo(activeVideoSrc) ||
    (currentSegment.projectIds?.[selectedVideoIndex]
      ? PROJECTS_DATA.find((p) => p.id === currentSegment.projectIds[selectedVideoIndex])
      : undefined) ||
    (currentSegment.projectIds?.[0]
      ? PROJECTS_DATA.find((p) => p.id === currentSegment.projectIds[0])
      : undefined);

  // Cancel any browser speech synthesis — strictly prohibit browser TTS
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Fetch ElevenLabs generation status
  useEffect(() => {
    fetch('/media/audio/fauzaan-presentation.json')
      .then((res) => res.json())
      .then((data) => {
        setVoiceStatus({
          provider: data.provider || 'ElevenLabs',
          voiceName: data.voiceName || 'Will – Relaxed Optimist',
          voiceId: data.voiceId || 'bIHbv24MWmeRgasZH58o',
          status: data.status === 'success' ? 'success' : 'error',
          errorMessage: data.errorMessage,
          httpStatus: data.httpStatus,
        });
      })
      .catch(() => {
        setVoiceStatus({
          provider: 'ElevenLabs',
          voiceName: 'Will – Relaxed Optimist',
          voiceId: 'bIHbv24MWmeRgasZH58o',
          status: 'error',
          errorMessage: 'ElevenLabs status metadata could not be loaded.',
        });
      });
  }, []);

  // Reset selected video index when segment changes
  useEffect(() => {
    setSelectedVideoIndex(0);
    setUserSelectedVideo(false);
  }, [currentSegmentIndex]);

  // Auto-switch videos based on precise narration cues and progression
  useEffect(() => {
    if (userSelectedVideo) return;
    if (currentVideos.length <= 1) return;

    // First check exact narration timestamp cues for this segment
    const cues = SEGMENT_VIDEO_CUES[currentSegment.id];
    if (cues && cues.length > 0) {
      const activeCue = cues.find((c) => currentTime >= c.start && currentTime < c.end);
      if (activeCue && activeCue.videoIndex < currentVideos.length) {
        if (activeCue.videoIndex !== selectedVideoIndex) {
          setSelectedVideoIndex(activeCue.videoIndex);
        }
        return;
      }
    }

    // Fallback proportional division if no exact cue match
    const segStart = currentSegment.startTime;
    const segEnd = currentSegment.endTime;
    const segDur = segEnd - segStart;
    if (segDur <= 0) return;

    const elapsed = Math.max(0, currentTime - segStart);
    const sliceDur = segDur / currentVideos.length;
    const calculatedIndex = Math.min(
      currentVideos.length - 1,
      Math.floor(elapsed / sliceDur)
    );

    if (calculatedIndex !== selectedVideoIndex) {
      setSelectedVideoIndex(calculatedIndex);
    }
  }, [currentTime, currentSegment, currentVideos.length, selectedVideoIndex, userSelectedVideo]);

  const handleSelectVideo = (vIdx: number) => {
    setSelectedVideoIndex(vIdx);
    setUserSelectedVideo(true);
  };

  // Audio element time update handler (only active when ElevenLabs audio is playing)
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const time = audioRef.current.currentTime;
    setCurrentTime(time);

    // Sync active segment with current audio milestone
    const matchedIndex = segments.findIndex(
      (s) => time >= s.startTime && time < s.endTime
    );
    if (matchedIndex !== -1 && matchedIndex !== currentSegmentIndex) {
      setCurrentSegmentIndex(matchedIndex);
    }
  };

  // Silent timer progression when ElevenLabs audio is unavailable (strictly NO fallback voice)
  useEffect(() => {
    if (voiceStatus?.status === 'success') return;
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentTime((prev) => {
        const nextTime = prev + 0.25;
        if (nextTime >= totalDuration) {
          setIsPlaying(false);
          return totalDuration;
        }
        const matchedIndex = segments.findIndex(
          (s) => nextTime >= s.startTime && nextTime < s.endTime
        );
        if (matchedIndex !== -1 && matchedIndex !== currentSegmentIndex) {
          setCurrentSegmentIndex(matchedIndex);
        }
        return nextTime;
      });
    }, 250);

    return () => clearInterval(timer);
  }, [isPlaying, voiceStatus?.status, currentSegmentIndex, totalDuration, segments]);

  // Sync Audio play/pause state when ElevenLabs audio is available
  useEffect(() => {
    if (!audioRef.current || voiceStatus?.status !== 'success') return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, voiceStatus?.status]);

  // Sync Mute state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.volume = 0;
    }
  }, [isMuted]);

  // Global Keyboard Shortcuts (ESC to exit, Space to toggle play, Arrows for nav)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ' && e.target === document.body) {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSegmentIndex]);

  const handleNext = () => {
    if (currentSegmentIndex < segments.length - 1) {
      jumpToSegment(currentSegmentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentSegmentIndex > 0) {
      jumpToSegment(currentSegmentIndex - 1);
    }
  };

  const jumpToSegment = (index: number) => {
    const targetSeg = segments[index];
    if (!targetSeg) return;
    setCurrentSegmentIndex(index);
    setCurrentTime(targetSeg.startTime);

    if (voiceStatus?.status === 'success' && audioRef.current) {
      audioRef.current.currentTime = targetSeg.startTime;
      if (!isPlaying) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  const handleRestart = () => {
    jumpToSegment(0);
    setIsPlaying(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Find active caption sentence based on approximate timestamp
  const activeCaption =
    currentSegment.captionSentences?.find(
      (cs) => currentTime >= cs.approxStart && currentTime <= cs.approxEnd
    )?.text || currentSegment.script;

  return (
    <div className="fixed inset-0 z-[100] bg-[#121212]/95 backdrop-blur-2xl flex flex-col justify-between select-none text-white overflow-hidden font-sans border border-white/10 shadow-2xl">
      {/* Dedicated Single Studio Audio Element — Mounted ONLY when generated by ElevenLabs */}
      {voiceStatus?.status === 'success' && (
        <audio
          ref={audioRef}
          src="/media/audio/fauzaan-presentation.mp3"
          preload="auto"
          autoPlay
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {/* 1. Windows-Inspired Top Title Bar */}
      <header className="relative z-20 px-4 sm:px-6 py-2.5 flex items-center justify-between border-b border-white/10 bg-[#1e1e1e]/90 backdrop-blur-md">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-[#0078d4] flex items-center justify-center shadow-md shrink-0">
            <MonitorPlay className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono tracking-wider uppercase text-[#60cdff] font-bold">
                FAUZAAN OS
              </span>
              <span className="text-[10px] text-white/40">•</span>
              <span className="text-[10px] text-white/60 font-medium uppercase tracking-wider">
                PROJECT PRESENTATION
              </span>
              {voiceStatus?.status === 'success' && (
                <>
                  <span className="text-[10px] text-white/40 hidden lg:inline">•</span>
                  <span className="text-[10px] font-mono text-emerald-400/90 hidden lg:inline">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block mr-1 align-middle animate-pulse" />
                    ElevenLabs: {voiceStatus.voiceName}
                  </span>
                </>
              )}
            </div>
            <div className="text-xs sm:text-sm font-semibold truncate text-white">
              Section {currentSegment.sectionNumber} of {segments.length}: {currentSegment.title}
            </div>
          </div>
        </div>

        {/* Center: Global Progress indicator */}
        <div className="hidden md:flex items-center space-x-3 w-72">
          <div className="h-1.5 w-full rounded-full bg-white/15 overflow-hidden">
            <div
              className="h-full bg-[#0078d4] transition-all duration-300 rounded-full"
              style={{ width: `${Math.min(100, (currentTime / totalDuration) * 100)}%` }}
            />
          </div>
          <span className="text-[11px] font-mono text-white/70 shrink-0">
            {formatTime(currentTime)} / {formatTime(totalDuration)}
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowCaptions(!showCaptions)}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded text-xs transition-colors border ${
              showCaptions
                ? 'bg-[#0078d4]/20 border-[#0078d4]/40 text-[#60cdff]'
                : 'bg-white/5 border-white/10 text-white/50 hover:text-white'
            }`}
            title="Toggle Captions"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium">CC</span>
          </button>

          <button
            onClick={onClose}
            className="flex items-center space-x-1 px-3 py-1 rounded bg-white/10 hover:bg-red-600/80 hover:text-white text-xs font-medium text-white transition-colors border border-white/10"
            title="Close Presentation (ESC)"
          >
            <span>Exit</span>
            <span className="text-[10px] text-white/40 hidden sm:inline">[ESC]</span>
            <X className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>
      </header>

      {/* ElevenLabs Generation Status Card */}
      {voiceStatus?.status === 'error' && (
        <div className="relative z-20 mx-4 sm:mx-6 mt-3 px-4 py-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xl backdrop-blur-md">
          <div className="flex items-start sm:items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-amber-300">
                <span className="font-bold">Provider: {voiceStatus.provider}</span>
                <span>•</span>
                <span>
                  Voice: <strong className="text-white">{voiceStatus.voiceName || 'Will – Relaxed Optimist'}</strong>
                </span>
                <span>•</span>
                <span>
                  Voice ID:{' '}
                  <code className="bg-black/50 px-1.5 py-0.5 rounded text-amber-100 font-semibold">
                    {voiceStatus.voiceId}
                  </code>
                </span>
                <span>•</span>
                <span className="text-red-400 font-semibold">
                  Generation Stopped {voiceStatus.httpStatus ? `(HTTP ${voiceStatus.httpStatus})` : ''}
                </span>
              </div>
              <p className="mt-1 text-amber-200/90 text-xs font-sans leading-relaxed">
                {voiceStatus.errorMessage || 'ElevenLabs rejected API call. Generation stopped with no fallback.'}
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center space-x-2">
            <span className="inline-block px-2.5 py-1 rounded bg-black/50 border border-white/10 text-[10px] font-mono text-white/70">
              STRICT POLICY: NO FALLBACK VOICE
            </span>
          </div>
        </div>
      )}

      {/* 2. Main Presentation Stage */}
      <main className="relative z-10 flex-1 overflow-hidden p-4 sm:p-6 flex flex-col lg:flex-row gap-4 items-stretch">
        {/* Left: Video / Media Screen */}
        <div className="flex-1 flex flex-col justify-center items-center rounded-2xl bg-black/60 border border-white/10 overflow-hidden relative shadow-2xl min-h-[300px]">
          {activeVideoSrc ? (
            <div className="w-full h-full relative flex items-center justify-center bg-black">
              <video
                ref={videoRef}
                src={activeVideoSrc}
                autoPlay
                loop
                muted
                playsInline
                onVolumeChange={(e) => {
                  e.currentTarget.muted = true;
                  e.currentTarget.volume = 0;
                }}
                onLoadedMetadata={(e) => {
                  e.currentTarget.muted = true;
                  e.currentTarget.volume = 0;
                }}
                className="w-full h-full object-contain"
              />

              {/* Multi-video selector pills with accurate project names */}
              {currentVideos.length > 1 && (
                <div className="absolute top-3 left-3 z-20 flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/15 max-w-[90%] shadow-lg">
                  <Film className="w-3.5 h-3.5 text-[#60cdff] ml-1 mr-0.5 shrink-0" />
                  {currentVideos.map((vSrc, vIdx) => {
                    const matchedProj = getProjectForVideo(vSrc);
                    let label = `Demo ${vIdx + 1}`;
                    if (matchedProj) {
                      const projVideos = currentVideos.filter(
                        (v) =>
                          matchedProj.videos?.includes(v) ||
                          matchedProj.videoUrls?.includes(v) ||
                          matchedProj.videoUrl === v
                      );
                      if (projVideos.length > 1) {
                        const partNum = projVideos.indexOf(vSrc) + 1;
                        label = `${matchedProj.title} (Part ${partNum})`;
                      } else {
                        label = matchedProj.title;
                      }
                    }

                    return (
                      <button
                        key={vIdx}
                        onClick={() => handleSelectVideo(vIdx)}
                        className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all truncate max-w-[170px] flex items-center space-x-1 ${
                          selectedVideoIndex === vIdx
                            ? 'bg-[#0078d4] text-white shadow-sm ring-1 ring-white/30'
                            : 'text-white/70 hover:text-white hover:bg-white/15'
                        }`}
                        title={label}
                      >
                        <span>{label}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Active project badge */}
              {currentProject && (
                <div
                  onClick={() => onOpenProject?.(currentProject.id)}
                  className={`absolute bottom-3 left-3 z-20 flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-black/75 backdrop-blur-md border border-white/15 ${
                    onOpenProject ? 'hover:border-[#60cdff] cursor-pointer' : ''
                  } transition-colors`}
                  title={onOpenProject ? `View details for ${currentProject.title}` : undefined}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-white tracking-wide">
                    {currentProject.title}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/70 font-medium">
                    {currentProject.categoryLabel}
                  </span>
                </div>
              )}
            </div>
          ) : (
            /* Visual Backdrop for Opening / Closing / Non-video sections */
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center space-y-4 bg-gradient-to-b from-[#1a1a2e]/60 to-[#16213e]/60">
              <div className="w-16 h-16 rounded-2xl bg-[#0078d4]/20 border border-[#0078d4]/40 flex items-center justify-center shadow-lg">
                <Sparkles className="w-8 h-8 text-[#60cdff]" />
              </div>
              <div className="space-y-1 max-w-md">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {currentSegment.title}
                </h2>
                <p className="text-xs sm:text-sm text-white/70 font-normal">
                  FAUZAAN OS • Engineering Systems, AI, & Vision
                </p>
              </div>

              {/* Verified Accolade / Highlight badges */}
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-[11px] text-white/90 font-medium flex items-center space-x-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>SIH 2024 Winner (₹1,00,000)</span>
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-[11px] text-white/90 font-medium">
                  Osmania University (GPA 8.32)
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right: Narrative Context & Details Panel */}
        <div className="w-full lg:w-96 flex flex-col justify-between space-y-3 bg-[#1e1e1e]/80 border border-white/10 rounded-2xl p-4 backdrop-blur-xl shrink-0">
          {/* Project Details / Highlights */}
          <div className="space-y-3 overflow-y-auto win-scrollbar max-h-[360px]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#60cdff] font-bold">
                STAGE {currentSegment.sectionNumber}
              </span>
              <h3 className="text-base font-bold text-white tracking-tight">
                {currentSegment.title}
              </h3>
              <p className="text-[11px] text-white/60 font-mono">
                Duration: ~{currentSegment.estimatedDuration}s ({formatTime(currentSegment.startTime)} - {formatTime(currentSegment.endTime)})
              </p>
            </div>

            {/* Confirmed Technologies Badge Area */}
            {currentProject && currentProject.techStack && currentProject.techStack.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <div className="text-[10px] uppercase font-semibold text-white/50 tracking-wider flex items-center space-x-1">
                  <Layers className="w-3 h-3 text-[#60cdff]" />
                  <span>Confirmed Technologies</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {currentProject.techStack.slice(0, 8).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-medium text-white/90"
                    >
                      {tech}
                    </span>
                  ))}
                  {currentProject.techStack.length > 8 && (
                    <span className="px-1.5 py-0.5 text-[9px] text-white/50">
                      +{currentProject.techStack.length - 8} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Featured Projects In This Stage */}
            {currentSegment.projectIds && currentSegment.projectIds.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-white/10">
                <div className="text-[10px] uppercase font-semibold text-white/50 tracking-wider flex items-center justify-between">
                  <span>Projects In This Stage ({currentSegment.projectIds.length})</span>
                </div>
                <div className="space-y-1">
                  {currentSegment.projectIds.map((pid) => {
                    const p = PROJECTS_DATA.find((item) => item.id === pid);
                    if (!p) return null;
                    const isCurrent = currentProject?.id === p.id;
                    const hasLive = Boolean(p.liveUrl || p.liveDemoUrl);
                    const hasVideo = Boolean(p.videos && p.videos.length > 0);

                    return (
                      <div
                        key={pid}
                        className={`flex items-center justify-between p-1.5 rounded transition-all border ${
                          isCurrent
                            ? 'bg-[#0078d4]/20 border-[#0078d4]/40 text-white'
                            : 'bg-white/5 border-white/5 text-white/80 hover:bg-white/10'
                        }`}
                      >
                        <div
                          className="flex items-center space-x-2 min-w-0 cursor-pointer"
                          onClick={() => onOpenProject?.(p.id)}
                          title={`Click to open ${p.title} in FAUZAAN OS`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isCurrent ? 'bg-emerald-400 animate-pulse' : 'bg-white/30'
                            }`}
                          />
                          <span className="text-[11px] font-medium truncate">{p.title}</span>
                          <span className="text-[9px] px-1 rounded bg-white/10 text-white/50 shrink-0">
                            {p.categoryLabel}
                          </span>
                        </div>

                        <div className="flex items-center space-x-1 shrink-0">
                          {hasVideo && (
                            <span className="text-[9px] text-[#60cdff] px-1 py-0.5 rounded bg-[#0078d4]/15 font-mono">
                              Video
                            </span>
                          )}
                          {hasLive && (
                            <a
                              href={p.liveUrl || p.liveDemoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[9px] text-emerald-400 hover:text-emerald-300 px-1 py-0.5 rounded bg-emerald-500/10 flex items-center space-x-0.5"
                              title="Launch Live Application"
                            >
                              <span>Live</span>
                              <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Key Takeaways */}
            {currentSegment.keyTakeaways && currentSegment.keyTakeaways.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-white/10">
                <div className="text-[10px] uppercase font-semibold text-white/50 tracking-wider">
                  Key Takeaways
                </div>
                <div className="space-y-1">
                  {currentSegment.keyTakeaways.map((pt, idx) => (
                    <div
                      key={idx}
                      className="flex items-start space-x-2 text-xs text-white/80 p-1.5 rounded bg-white/5 border border-white/5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0078d4] mt-1.5 shrink-0" />
                      <span className="leading-snug text-[11px]">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Chapters Quick Jumper */}
          <div className="pt-2 border-t border-white/10">
            <div className="text-[10px] uppercase font-semibold text-white/50 tracking-wider mb-1.5">
              Presentation Chapters
            </div>
            <div className="grid grid-cols-4 gap-1">
              {segments.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => jumpToSegment(idx)}
                  className={`py-1 rounded text-[10px] font-semibold transition-all truncate px-1 border ${
                    currentSegmentIndex === idx
                      ? 'bg-[#0078d4] text-white border-[#0078d4] shadow-sm'
                      : 'bg-white/5 border-white/5 text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                  title={s.title}
                >
                  {s.sectionNumber}. {s.title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* 3. Captions Container */}
      {showCaptions && (
        <div className="relative z-20 px-6 py-2 bg-black/80 backdrop-blur-md border-t border-b border-white/10 text-center min-h-[44px] flex items-center justify-center">
          <p className="text-xs sm:text-sm font-medium text-white/95 max-w-4xl leading-relaxed tracking-wide">
            "{activeCaption}"
          </p>
        </div>
      )}

      {/* 4. Windows-Inspired Playback Control Bar */}
      <footer className="relative z-20 px-4 sm:px-8 py-3 bg-[#1e1e1e]/95 backdrop-blur-xl border-t border-white/10 flex items-center justify-between">
        {/* Left: Previous / Next Chapter Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrev}
            disabled={currentSegmentIndex === 0}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent text-white transition-colors border border-white/10"
            title="Previous Section (Left Arrow)"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setIsPlaying(!isPlaying);
            }}
            className="px-4 py-2 rounded-lg bg-[#0078d4] hover:bg-[#1084d9] text-white font-semibold text-xs transition-colors flex items-center space-x-1.5 shadow-md"
            title="Play / Pause (Space)"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          <button
            onClick={handleNext}
            disabled={currentSegmentIndex === segments.length - 1}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent text-white transition-colors border border-white/10"
            title="Next Section (Right Arrow)"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={handleRestart}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors border border-white/10 hidden sm:flex items-center"
            title="Restart Presentation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Center: Timeline Scrubber */}
        <div className="flex-1 max-w-md mx-6 hidden md:flex items-center space-x-3">
          <span className="text-[11px] font-mono text-white/60">
            {formatTime(currentTime)}
          </span>
          <div className="relative w-full h-2 rounded-full bg-white/15 overflow-hidden cursor-pointer">
            <div
              className="h-full bg-[#0078d4] transition-all rounded-full"
              style={{ width: `${Math.min(100, (currentTime / totalDuration) * 100)}%` }}
            />
          </div>
          <span className="text-[11px] font-mono text-white/60">
            {formatTime(totalDuration)}
          </span>
        </div>

        {/* Right: Audio Volume & Mode Indicators */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </footer>
    </div>
  );
};
