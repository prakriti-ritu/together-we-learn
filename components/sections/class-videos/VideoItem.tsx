"use client";

import { useState } from "react";

export function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

interface VideoItemProps {
  title: string;
  youtubeUrl: string;
  playLabel: string;
}

/** A single lazy YouTube tile: shows the thumbnail, swaps to an iframe on tap. */
export default function VideoItem({ title, youtubeUrl, playLabel }: VideoItemProps) {
  const [playing, setPlaying] = useState(false);
  const videoId = getYouTubeId(youtubeUrl);
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null;

  if (playing && videoId) {
    return (
      <div className="aspect-video rounded-2xl overflow-hidden bg-navy">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      className="relative aspect-video rounded-2xl overflow-hidden bg-border-warm/50 group w-full"
      aria-label={`${playLabel}: ${title}`}
    >
      {thumbnailUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover" loading="lazy" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-text-secondary/50">
          Video Thumbnail
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center bg-navy/30 group-hover:bg-navy/40 transition-colors">
        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-card">
          <svg className="w-7 h-7 text-navy ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <p className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-navy/80 to-transparent text-white text-sm font-medium text-left">
        {title}
      </p>
    </button>
  );
}
