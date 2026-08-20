export type VideoSourceType = 'mp4' | 'youtube' | 'vimeo' | 'unknown';

export interface ParsedVideo {
  type: VideoSourceType;
  src: string;
  embedUrl?: string;
}

export function parseVideoSource(url?: string): ParsedVideo {
  if (!url) {
    return { type: 'unknown', src: '' };
  }

  const trimmed = url.trim();

  // YouTube match
  const ytMatch = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  if (ytMatch) {
    return {
      type: 'youtube',
      src: trimmed,
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0&modestbranding=1`
    };
  }

  // Vimeo match
  const vimeoMatch = trimmed.match(
    /(?:vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|))(\d+)/
  );
  if (vimeoMatch) {
    return {
      type: 'vimeo',
      src: trimmed,
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&dnt=1`
    };
  }

  // Default to MP4 / direct video file
  return {
    type: 'mp4',
    src: trimmed
  };
}
