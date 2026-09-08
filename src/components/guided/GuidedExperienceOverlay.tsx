import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  X,
  FileText,
  Sparkles,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import { GUIDED_CHAPTERS } from '../../data/guidedExperience';
import { PROJECTS_DATA } from '../../data/projects';
import { VideoPlayer } from '../common/VideoPlayer';
import { NarrationPlayer } from '../common/NarrationPlayer';
import type { AppId } from '../../types/os';

interface GuidedExperienceOverlayProps {
  onExit: () => void;
  onOpenApp: (appId: AppId) => void;
}

export const GuidedExperienceOverlay: React.FC<GuidedExperienceOverlayProps> = ({
  onExit,
  onOpenApp,
}) => {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);

  const chapter = GUIDED_CHAPTERS[currentChapterIndex];
  const totalChapters = GUIDED_CHAPTERS.length;
  const isFinalChapter = currentChapterIndex === totalChapters - 1;

  // Find associated project if any
  const project = chapter.projectId
    ? PROJECTS_DATA.find((p) => p.id === chapter.projectId)
    : null;

  // Auto-advance timer when playing (unless on final chapter)
  useEffect(() => {
    if (!isPlaying || isFinalChapter) return;

    const timer = setTimeout(() => {
      handleNext();
    }, chapter.durationSeconds * 1000);

    return () => clearTimeout(timer);
  }, [currentChapterIndex, isPlaying, isFinalChapter, chapter.durationSeconds]);

  // Keyboard controls: ESC to exit, Space to toggle play/pause, Arrow keys for prev/next
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onExit();
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
  }, [currentChapterIndex]);

  const handleNext = () => {
    if (currentChapterIndex < totalChapters - 1) {
      setCurrentChapterIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex((prev) => prev - 1);
    }
  };

  const progressPercentage = Math.round(
    ((currentChapterIndex + 1) / totalChapters) * 100
  );

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col justify-between select-none text-os-text overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[32rem] h-[32rem] bg-os-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[32rem] h-[32rem] bg-os-neural/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Cinematic HUD */}
      <header className="relative z-10 px-4 sm:px-8 py-4 flex items-center justify-between border-b border-os-border/50 bg-os-bg/70 backdrop-blur-md">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="w-2.5 h-2.5 rounded-sm bg-os-accent rotate-45 shrink-0" />
          <div className="min-w-0">
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-os-accent block">
              FAUZAAN OS // GUIDED TOUR
            </span>
            <span className="text-xs sm:text-sm font-mono text-os-text truncate block">
              CHAPTER {String(chapter.chapterNumber).padStart(2, '0')} OF {totalChapters} —{' '}
              <span className="text-os-muted">{chapter.title}</span>
            </span>
          </div>
        </div>

        {/* Global Progress Bar in Header */}
        <div className="hidden md:flex items-center space-x-4 max-w-xs w-full mx-6">
          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-os-accent to-os-emerald transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="text-xs font-mono text-os-dim shrink-0">
            {progressPercentage}%
          </span>
        </div>

        {/* Exit button */}
        <button
          onClick={onExit}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-os-rose/40 hover:text-os-rose text-xs font-mono text-os-muted transition-colors"
        >
          <span>Exit Tour</span>
          <span className="text-[10px] text-os-dim hidden sm:inline">[ESC]</span>
          <X className="w-3.5 h-3.5 ml-0.5" />
        </button>
      </header>

      {/* Center Stage: Dynamic Chapter Presentation */}
      <main className="relative z-10 flex-1 overflow-y-auto px-4 sm:px-8 py-6 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isFinalChapter ? (
            /* Final Thank-You Screen (Chapter 26) */
            <motion.div
              key="final-screen"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="max-w-2xl w-full text-center space-y-6 p-8 sm:p-12 rounded-3xl bg-os-card/90 border border-os-border shadow-2xl"
            >
              <div className="w-16 h-16 rounded-2xl bg-os-surface border border-os-accent/40 flex items-center justify-center mx-auto text-os-accent shadow-lg shadow-os-accent/10">
                <Sparkles className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-os-accent font-bold">
                  FAUZAAN OS // SESSION COMPLETE
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold font-mono text-os-text">
                  Thank you for exploring.
                </h1>
                <p className="text-sm sm:text-base text-os-muted leading-relaxed font-light max-w-lg mx-auto">
                  I hope you enjoyed seeing how I think, build, experiment, and learn.
                  Whether building real-time vision pipelines or autonomous platforms, my aim is to make technology intelligent and practical.
                </p>
                <p className="text-sm font-mono text-os-text pt-2">— Fauzaan</p>
              </div>

              <div className="pt-6 border-t border-os-border/60 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => setCurrentChapterIndex(0)}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-os-surface border border-os-border hover:border-os-accent text-xs font-mono text-os-text transition-colors"
                >
                  <RotateCcw className="w-4 h-4 text-os-accent" />
                  <span>EXPLORE AGAIN</span>
                </button>

                <button
                  onClick={() => {
                    onExit();
                    onOpenApp('resume');
                  }}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-os-card border border-os-accent/50 text-xs font-mono text-os-text hover:bg-os-accent/20 transition-colors"
                >
                  <FileText className="w-4 h-4 text-os-accent" />
                  <span>VIEW RESUME</span>
                </button>

                <button
                  onClick={() => {
                    onExit();
                    onOpenApp('contact');
                  }}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-os-accent text-black font-bold text-xs font-mono hover:bg-os-accent/90 transition-colors"
                >
                  <span>CONTACT ME</span>
                </button>
              </div>
            </motion.div>
          ) : (
            /* Standard Story Chapters (01 - 25) */
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="max-w-4xl w-full space-y-6"
            >
              {/* Chapter Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-os-card/85 border border-os-border shadow-2xl space-y-6 backdrop-blur-md">
                {/* Title & Phase */}
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs font-mono text-os-accent uppercase tracking-wider">
                    <span>{chapter.subtitle}</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold font-mono text-os-text">
                    {chapter.title}
                  </h1>
                </div>

                {/* Media Demonstration if project is bound */}
                {project && (
                  <div className="space-y-4">
                    <VideoPlayer
                      src={project.videos[0] || chapter.videoUrl}
                      title={`${project.title} Demonstration`}
                    />
                  </div>
                )}

                {/* Narration Player Infrastructure */}
                <NarrationPlayer
                  audioSrc={chapter.audioUrl || project?.audio}
                  projectTitle={project?.title || chapter.title}
                  chapterTitle={`Chapter ${chapter.chapterNumber}: ${chapter.title}`}
                  transcript={chapter.narrationText}
                />

                {/* Key Takeaways & Story Points */}
                {chapter.keyPoints && chapter.keyPoints.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                    {chapter.keyPoints.map((point, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-os-surface/70 border border-os-border/70 flex items-start space-x-2 text-xs font-mono text-os-text"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-os-emerald shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{point}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Live Subtitle / Captions Drawer */}
              {showCaptions && (
                <div className="p-4 rounded-2xl bg-black/80 border border-os-border/60 text-center font-mono text-xs sm:text-sm text-os-text/90 leading-relaxed max-w-3xl mx-auto shadow-xl">
                  <span className="text-[10px] uppercase text-os-accent font-bold block mb-1">
                    Guided Narration Transcript:
                  </span>
                  "{chapter.narrationText}"
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Cinematic Control Deck */}
      <footer className="relative z-10 px-4 sm:px-8 py-3.5 border-t border-os-border/50 bg-os-bg/85 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
        {/* Left: Prev / Next buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrev}
            disabled={currentChapterIndex === 0}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-os-card border border-os-border text-os-text hover:border-os-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <SkipBack className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center space-x-1.5 px-4 py-1.5 rounded-lg bg-os-accent/20 border border-os-accent text-os-text font-bold hover:bg-os-accent/30 transition-colors"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Play</span>
              </>
            )}
          </button>

          <button
            onClick={handleNext}
            disabled={isFinalChapter}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-os-card border border-os-border text-os-text hover:border-os-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <span>Next</span>
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center: Chapter Scrubber timeline */}
        <div className="flex items-center space-x-1 overflow-x-auto max-w-md no-scrollbar py-1">
          {GUIDED_CHAPTERS.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => setCurrentChapterIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentChapterIndex
                  ? 'w-6 bg-os-accent shadow-[0_0_8px_#00e5ff]'
                  : idx < currentChapterIndex
                  ? 'w-2 bg-os-emerald'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              title={`Jump to Chapter ${ch.chapterNumber}: ${ch.title}`}
            />
          ))}
        </div>

        {/* Right: Sound & Captions Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowCaptions(!showCaptions)}
            className={`p-1.5 rounded-lg border text-xs transition-colors ${
              showCaptions
                ? 'bg-os-accent/20 border-os-accent text-os-text'
                : 'bg-os-card border-os-border text-os-muted hover:text-os-text'
            }`}
            title="Toggle Captions"
          >
            <FileText className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 rounded-lg bg-os-card border border-os-border text-os-muted hover:text-os-text transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </footer>
    </div>
  );
};
