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
  Presentation,
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
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex flex-col justify-between select-none text-white overflow-hidden font-sans">
      {/* Top Presentation Bar */}
      <header className="relative z-10 px-4 sm:px-8 py-3 flex items-center justify-between border-b border-white/10 bg-[#1f1f1f]/90 backdrop-blur-md">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="w-8 h-8 rounded bg-win-accent flex items-center justify-center shrink-0">
            <Presentation className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] text-white/70 font-medium tracking-wide">
              FAUZAAN OS — GUIDED PRESENTATION
            </div>
            <div className="text-xs sm:text-sm font-semibold truncate text-white">
              Chapter {String(chapter.chapterNumber).padStart(2, '0')} of {totalChapters} : {chapter.title}
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="hidden md:flex items-center space-x-3 max-w-xs w-full mx-6">
          <div className="h-1.5 w-full rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full bg-win-accent transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="text-xs font-mono text-white/70 shrink-0">
            {progressPercentage}%
          </span>
        </div>

        {/* Exit Presentation button */}
        <button
          onClick={onExit}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded border border-white/20 hover:bg-white/10 text-xs font-medium text-white transition-colors"
        >
          <span>Exit</span>
          <span className="text-[10px] text-white/50 hidden sm:inline">[ESC]</span>
          <X className="w-3.5 h-3.5 ml-0.5" />
        </button>
      </header>

      {/* Center Stage */}
      <main className="relative z-10 flex-1 overflow-y-auto px-4 sm:px-8 py-6 flex items-center justify-center win-scrollbar">
        <AnimatePresence mode="wait">
          {isFinalChapter ? (
            /* Final Thank-You Screen (Chapter 26) */
            <motion.div
              key="final-screen"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="max-w-2xl w-full text-center space-y-6 p-8 sm:p-12 rounded-2xl bg-[#222222]/95 border border-white/15 shadow-2xl"
            >
              <div className="w-16 h-16 rounded-2xl bg-win-accent/20 border border-win-accent/40 flex items-center justify-center mx-auto text-win-accent shadow-lg">
                <Sparkles className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-win-accent">
                  PRESENTATION COMPLETE
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Thank you for exploring.
                </h1>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal max-w-lg mx-auto">
                  I hope you enjoyed seeing how I think, build, experiment, and learn.
                  Whether building real-time vision pipelines or autonomous platforms, my aim is to make technology intelligent, reliable, and practical.
                </p>
                <p className="text-sm font-semibold text-white pt-2">— Syed Kareem Fauzaan</p>
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => setCurrentChapterIndex(0)}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-2.5 rounded-lg border border-white/20 hover:bg-white/10 text-xs font-medium text-white transition-colors"
                >
                  <RotateCcw className="w-4 h-4 text-win-accent" />
                  <span>Restart Tour</span>
                </button>

                <button
                  onClick={() => {
                    onExit();
                    onOpenApp('resume');
                  }}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-2.5 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors"
                >
                  <FileText className="w-4 h-4 text-win-accent" />
                  <span>View Resume</span>
                </button>

                <button
                  onClick={() => {
                    onExit();
                    onOpenApp('contact');
                  }}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-2.5 rounded-lg bg-win-accent hover:bg-win-accent-hover text-white font-semibold text-xs transition-colors shadow-sm"
                >
                  <span>Get in Touch</span>
                </button>
              </div>
            </motion.div>
          ) : (
            /* Chapters 01 - 25 */
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="max-w-3xl w-full space-y-4"
            >
              <div className="p-6 rounded-2xl bg-[#222222]/95 border border-white/15 shadow-2xl space-y-5 backdrop-blur-md">
                {/* Title */}
                <div>
                  <div className="text-xs font-medium text-win-accent uppercase tracking-wider mb-1">
                    {chapter.subtitle}
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white">
                    {chapter.title}
                  </h1>
                </div>

                {/* Media Demonstration if project is bound */}
                {project && (
                  <div className="rounded-lg overflow-hidden border border-white/10">
                    <VideoPlayer
                      src={project.videoUrl || project.videos?.[0] || chapter.videoUrl}
                      title={`${project.title} Demonstration`}
                    />
                  </div>
                )}

                {/* Narration Player */}
                <div className="p-3.5 rounded-lg bg-black/40 border border-white/10">
                  <NarrationPlayer
                    audioSrc={chapter.audioUrl || project?.audio}
                    projectTitle={project?.title || chapter.title}
                    chapterTitle={`Chapter ${chapter.chapterNumber}: ${chapter.title}`}
                    transcript={chapter.narrationText}
                  />
                </div>

                {/* Key Takeaways */}
                {chapter.keyPoints && chapter.keyPoints.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                    {chapter.keyPoints.map((point, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-start space-x-2 text-xs text-white/90"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{point}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Subtitle / Captions Drawer */}
              {showCaptions && (
                <div className="p-3.5 rounded-xl bg-black/70 border border-white/10 text-center text-xs text-white/90 leading-relaxed max-w-2xl mx-auto shadow-lg">
                  <span className="text-[10.5px] uppercase text-win-accent font-semibold block mb-0.5">
                    Narration Transcript:
                  </span>
                  "{chapter.narrationText}"
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Control Deck */}
      <footer className="relative z-10 px-4 sm:px-8 py-3 border-t border-white/10 bg-[#1f1f1f]/90 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        {/* Left: Prev / Next / Pause */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrev}
            disabled={currentChapterIndex === 0}
            className="flex items-center space-x-1 px-3 py-1.5 rounded border border-white/15 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <SkipBack className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded bg-win-accent hover:bg-win-accent-hover font-semibold transition-colors shadow-sm"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play</span>
              </>
            )}
          </button>

          <button
            onClick={handleNext}
            disabled={isFinalChapter}
            className="flex items-center space-x-1 px-3 py-1.5 rounded border border-white/15 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <span>Next</span>
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center: Chapter scrubber dots */}
        <div className="flex items-center space-x-1 overflow-x-auto max-w-md no-scrollbar py-1">
          {GUIDED_CHAPTERS.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => setCurrentChapterIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentChapterIndex
                  ? 'w-5 bg-win-accent'
                  : idx < currentChapterIndex
                  ? 'w-2 bg-emerald-400'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              title={`Chapter ${ch.chapterNumber}: ${ch.title}`}
            />
          ))}
        </div>

        {/* Right: Sound & Captions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowCaptions(!showCaptions)}
            className={`p-1.5 rounded border text-xs transition-colors ${
              showCaptions
                ? 'border-win-accent bg-win-accent/20 text-white'
                : 'border-white/15 bg-white/5 text-white/60 hover:text-white'
            }`}
            title="Toggle Captions"
          >
            <FileText className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 rounded border border-white/15 bg-white/5 text-white/60 hover:text-white transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </footer>
    </div>
  );
};
