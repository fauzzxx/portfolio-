import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Film } from 'lucide-react';

interface VideoPlayerProps {
  src?: string;
  poster?: string;
  title: string;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  title,
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setHasError(false);
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [src]);

  const togglePlay = () => {
    if (!videoRef.current || hasError || !src) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setHasError(true));
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 1;
    setCurrentTime(current);
    setProgress((current / total) * 100);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || 0);
    setHasError(false);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current || !duration) return;
    const seekTo = (Number(e.target.value) / 100) * duration;
    videoRef.current.currentTime = seekTo;
    setProgress(Number(e.target.value));
  };

  const handleReplay = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().then(() => setIsPlaying(true));
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  if (!src || hasError) {
    return (
      <div
        className={`aspect-video w-full rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex flex-col items-center justify-center p-6 text-center space-y-2 ${className}`}
      >
        <div className="w-10 h-10 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center text-win-muted-light dark:text-win-muted-dark">
          <Film className="w-5 h-5" />
        </div>
        <div className="space-y-0.5">
          <p className="text-xs font-semibold text-win-text-light dark:text-win-text-dark">{title}</p>
          <p className="text-[11px] text-win-muted-light dark:text-win-muted-dark">
            {src ? 'Video is loading or not available in this preview.' : 'Project demonstration will be added.'}
          </p>
        </div>
        {src && hasError && (
          <button
            onClick={() => {
              setHasError(false);
              if (videoRef.current) {
                videoRef.current.load();
              }
            }}
            className="mt-2 px-3 py-1 rounded text-[11px] font-medium bg-black/10 dark:bg-white/10 hover:bg-black/15 dark:hover:bg-white/15 text-win-text-light dark:text-win-text-dark transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Retry</span>
          </button>
        )}
      </div>
    );
  }

  const safeSrc = src ? encodeURI(decodeURI(src)) : undefined;

  return (
    <div
      className={`relative group rounded-lg overflow-hidden bg-black border border-black/15 dark:border-white/15 select-none ${className}`}
    >
      <video
        ref={videoRef}
        poster={poster}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onError={(e) => {
          console.warn('Video failed to load:', safeSrc, e);
          setHasError(true);
        }}
        onEnded={() => setIsPlaying(false)}
        className="w-full h-full object-contain"
        preload="metadata"
        playsInline
      >
        {safeSrc && <source src={safeSrc} type="video/mp4" />}
      </video>

      {/* Control Overlay */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 pt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 space-y-2">
        {/* Progress Scrubber */}
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-win-accent"
        />

        {/* Buttons and time */}
        <div className="flex items-center justify-between text-xs text-white">
          <div className="flex items-center space-x-2">
            <button
              onClick={togglePlay}
              className="p-1 rounded hover:bg-white/10 text-white transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={handleReplay}
              className="p-1 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={toggleMute}
              className="p-1 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <span className="text-[10px] text-white/60 font-mono ml-1">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <button
            onClick={handleFullscreen}
            className="p-1 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <Maximize className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
