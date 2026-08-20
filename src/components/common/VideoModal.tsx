import React, { useEffect, useRef, useState } from 'react';
import { parseVideoSource } from '../../utils/video';
import { X, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
  title: string;
  category?: string;
  poster?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoSrc,
  title,
  category = 'CINEMATIC PRODUCTION',
  poster,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const { setCursor, resetCursor } = useCursor();

  const parsed = parseVideoSource(videoSrc);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * videoRef.current.duration;
  };

  const toggleFullScreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      {/* Top Bar / Cinema HUD */}
      <div className="flex items-center justify-between z-20 pb-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <span className="w-2 h-2 rounded-full bg-[#B93434] animate-pulse" />
          <div className="flex flex-col">
            <span className="font-display text-lg tracking-widest text-[#F1F1F1]">{title}</span>
            <span className="font-mono text-[10px] tracking-widest text-[#8C8C8C]">{category}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          onMouseEnter={() => setCursor('pointer', 'CLOSE')}
          onMouseLeave={resetCursor}
          className="p-2 border border-white/20 hover:border-[#B93434] text-[#F1F1F1] hover:text-[#B93434] transition-colors focus:outline-none"
          aria-label="Close video player"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Center Cinema Stage */}
      <div className="relative my-auto w-full max-w-6xl mx-auto aspect-video bg-[#0A0A0A] overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center">
        {parsed.type === 'youtube' || parsed.type === 'vimeo' ? (
          <iframe
            src={parsed.embedUrl}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
          />
        ) : (
          <>
            <video
              ref={videoRef}
              src={parsed.src || undefined}
              poster={poster}
              autoPlay
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onClick={togglePlay}
              className="w-full h-full object-cover cursor-pointer"
            />

            {/* Poster / Fallback overlay if no video playback */}
            {(!parsed.src || parsed.type === 'unknown') && poster && (
              <img
                src={poster}
                alt={title}
                className="w-full h-full object-cover"
              />
            )}
          </>
        )}
      </div>

      {/* Bottom Controls Bar for Direct Videos */}
      {parsed.type === 'mp4' && (
        <div className="w-full max-w-6xl mx-auto flex flex-col space-y-3 z-20 pt-4 border-t border-white/10">
          {/* Scrubber */}
          <div
            onClick={handleSeek}
            className="w-full h-1.5 bg-white/15 hover:h-2 transition-all cursor-pointer relative"
          >
            <div
              className="h-full bg-[#B93434]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between font-mono text-xs text-[#8C8C8C]">
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePlay}
                className="text-[#F1F1F1] hover:text-[#B93434] transition-colors"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={toggleMute}
                className="text-[#F1F1F1] hover:text-[#B93434] transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <span>
                {formatTime(currentTime)} / {formatTime(duration || 0)}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <span className="hidden sm:inline text-[10px] text-[#8C8C8C]/60 tracking-widest uppercase">
                4K MASTER / 24FPS
              </span>
              <button
                onClick={toggleFullScreen}
                className="text-[#F1F1F1] hover:text-[#B93434] transition-colors"
                aria-label="Toggle Fullscreen"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
