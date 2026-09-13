import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Mic, FileText, Info } from 'lucide-react';

interface NarrationPlayerProps {
  audioSrc?: string;
  projectTitle?: string;
  chapterTitle?: string;
  transcript?: string;
  className?: string;
}

export const NarrationPlayer: React.FC<NarrationPlayerProps> = ({
  audioSrc,
  projectTitle,
  chapterTitle,
  transcript,
  className = '',
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [hasError, setHasError] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current || hasError || !audioSrc) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setHasError(true));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration || 1;
    setCurrentTime(current);
    setProgress((current / total) * 100);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration || 0);
    setHasError(false);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current || !duration) return;
    const seekTo = (Number(e.target.value) / 100) * duration;
    audioRef.current.currentTime = seekTo;
    setProgress(Number(e.target.value));
  };

  const handleReplay = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().then(() => setIsPlaying(true));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const isAudioAvailable = Boolean(audioSrc && !hasError);

  return (
    <div
      className={`p-3.5 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#242424] space-y-3 text-xs select-none text-win-text-light dark:text-win-text-dark ${className}`}
    >
      {/* Audio element */}
      {audioSrc && (
        <audio
          ref={audioRef}
          src={audioSrc}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onError={() => setHasError(true)}
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-black/5 dark:border-white/5">
        <div className="flex items-center space-x-2 truncate pr-2">
          <div className="w-6 h-6 rounded bg-win-accent/10 text-win-accent flex items-center justify-center shrink-0">
            <Mic className="w-3.5 h-3.5" />
          </div>
          <div className="truncate">
            <span className="text-[10px] text-win-muted-light dark:text-win-muted-dark uppercase tracking-wider block font-medium">
              {chapterTitle || 'Voice Commentary'}
            </span>
            <span className="font-semibold text-win-text-light dark:text-win-text-dark truncate block">
              {projectTitle || 'System Walkthrough'}
            </span>
          </div>
        </div>

        {/* Captions toggle button */}
        {transcript && (
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className={`flex items-center space-x-1 px-2 py-1 rounded border text-[11px] transition-colors ${
              showTranscript
                ? 'bg-win-accent text-white border-win-accent font-medium'
                : 'border-black/10 dark:border-white/10 text-win-muted-light dark:text-win-muted-dark hover:text-win-text-light dark:hover:text-win-text-dark'
            }`}
          >
            <FileText className="w-3 h-3" />
            <span>Captions</span>
          </button>
        )}
      </div>

      {/* Controls or Notice */}
      {isAudioAvailable ? (
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="w-full h-1 bg-black/10 dark:bg-white/15 rounded-lg appearance-none cursor-pointer accent-win-accent"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={togglePlay}
                className="w-7 h-7 rounded-md bg-win-accent hover:bg-win-accent-hover text-white flex items-center justify-center transition-colors shadow-sm"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
              </button>
              <button
                onClick={handleReplay}
                className="p-1 rounded text-win-muted-light dark:text-win-muted-dark hover:text-win-text-light dark:hover:text-win-text-dark transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
              <button
                onClick={toggleMute}
                className="p-1 rounded text-win-muted-light dark:text-win-muted-dark hover:text-win-text-light dark:hover:text-win-text-dark transition-colors"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>

            <span className="text-[10px] text-win-muted-light dark:text-win-muted-dark font-mono">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        </div>
      ) : (
        <div className="p-2.5 rounded bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 flex items-center space-x-2 text-win-muted-light dark:text-win-muted-dark text-[11px]">
          <Info className="w-3.5 h-3.5 text-win-accent shrink-0" />
          <span>Voice narration coming soon.</span>
        </div>
      )}

      {/* Transcript Drawer */}
      {showTranscript && transcript && (
        <div className="p-3 rounded bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 text-xs text-win-text-light dark:text-win-text-dark leading-relaxed select-text max-h-36 overflow-y-auto win-scrollbar">
          <span className="text-[10px] uppercase font-semibold text-win-muted-light dark:text-win-muted-dark block mb-1">
            Transcript / Captions:
          </span>
          <p>{transcript}</p>
        </div>
      )}
    </div>
  );
};
