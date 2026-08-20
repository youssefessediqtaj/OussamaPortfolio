import React, { useRef, useEffect } from 'react';

interface HeroVideoProps {
  src?: string;
  poster?: string;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({
  src = '/videos/showreel.mp4',
  poster = '/images/showreel-poster.jpg',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Use IntersectionObserver to pause when hero is offscreen for performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover opacity-25 scale-105 filter contrast-125 brightness-90"
      />
      {/* Fallback image if video fails to load */}
      <img
        src={poster}
        alt="Hero cinematic background"
        className="absolute inset-0 w-full h-full object-cover opacity-20 filter contrast-125 -z-10"
      />
      {/* Cinematic gradient overlays to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/70 to-[#111111]/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#111111]/60 to-[#111111]" />
    </div>
  );
};
