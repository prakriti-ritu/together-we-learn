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
  /** Custom thumbnail (from Sanity). Falls back to the YouTube auto-thumbnail. */
  thumbnail?: string;
}

/** A single lazy YouTube tile: shows the thumbnail, swaps to an iframe on tap. */
export default function VideoItem({ title, youtubeUrl, playLabel, thumbnail }: VideoItemProps) {
  const [playing, setPlaying] = useState(false);
  const videoId = getYouTubeId(youtubeUrl);
  const thumbnailUrl =
    thumbnail ||
    // i.ytimg.com (not img.youtube.com) — same image, but doesn't attach
    // YouTube's session/login cookies to the thumbnail request. Video
    // playback below already uses the cookie-safe youtube-nocookie.com.
    (videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null);

  if (playing && videoId) {
    return (
      <div className="aspect-video rounded-2xl overflow-hidden bg-panel">
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
        // Explicit dimensions match the YouTube hqdefault.jpg natural size; the
        // fixed aspect-video parent + object-cover already control the visual
        // box (also applies safely to a custom Sanity thumbnail, if set).
        <img
          src={thumbnailUrl}
          alt={title}
          width={480}
          height={360}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-text-secondary/50">
          Video Thumbnail
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-card">
          {/* text-gold (not text-accent, which isn't a defined token and silently
              inherited the near-white dark-theme ink, making the triangle invisible) */}
          <svg className="w-7 h-7 text-gold ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <p className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white text-sm font-medium text-left">
        {title}
      </p>
    </button>
  );
}
