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
      className={`p-4 rounded-xl bg-os-card/90 border border-os-border space-y-3 font-mono text-xs select-none ${className}`}
    >
      {/* Hidden audio element */}
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

      {/* Header Info */}
      <div className="flex items-center justify-between pb-2 border-b border-os-border/50">
        <div className="flex items-center space-x-2 truncate pr-2">
          <div className="p-1.5 rounded-md bg-os-surface border border-os-border text-os-accent">
            <Mic className="w-3.5 h-3.5" />
          </div>
          <div className="truncate">
            <span className="text-[10px] text-os-dim uppercase tracking-wider block">
              {chapterTitle || 'Project Narration Channel'}
            </span>
            <span className="font-semibold text-os-text truncate block">
              {projectTitle || 'System Walkthrough'}
            </span>
          </div>
        </div>

        {/* Transcript toggle button */}
        {transcript && (
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className={`flex items-center space-x-1 px-2 py-1 rounded border transition-colors ${
              showTranscript
                ? 'bg-os-accent/20 border-os-accent text-os-text font-bold'
                : 'bg-os-surface border-os-border text-os-muted hover:text-os-text'
            }`}
          >
            <FileText className="w-3 h-3" />
            <span className="text-[10px]">Captions</span>
          </button>
        )}
      </div>

      {/* Audio Status or Controls */}
      {isAudioAvailable ? (
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-os-accent"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={togglePlay}
                className="w-7 h-7 rounded-lg bg-os-surface border border-os-border hover:border-os-accent flex items-center justify-center text-os-text transition-colors"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
              </button>
              <button
                onClick={handleReplay}
                className="p-1 rounded text-os-muted hover:text-os-text transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
              <button
                onClick={toggleMute}
                className="p-1 rounded text-os-muted hover:text-os-text transition-colors"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>

            <span className="text-[10px] text-os-dim font-mono">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        </div>
      ) : (
        <div className="p-2.5 rounded-lg bg-os-surface/60 border border-os-border/50 flex items-center space-x-2 text-os-dim text-[11px]">
          <Info className="w-3.5 h-3.5 text-os-muted shrink-0" />
          <span>Voice narration coming soon. (Audio track will be integrated).</span>
        </div>
      )}

      {/* Captions / Transcript drawer */}
      {showTranscript && transcript && (
        <div className="p-3 rounded-lg bg-os-surface/80 border border-os-border/70 text-xs text-os-muted leading-relaxed select-text max-h-36 overflow-y-auto">
          <span className="text-[10px] uppercase font-mono text-os-dim block mb-1">
            Transcript / Captions:
          </span>
          <p>{transcript}</p>
        </div>
      )}
    </div>
  );
};
