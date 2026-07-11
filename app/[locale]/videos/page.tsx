"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

function VideoItem({ title, youtubeUrl }: { title: string; youtubeUrl: string }) {
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
      aria-label={`Play: ${title}`}
    >
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
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

// Placeholder videos
const placeholderVideos = [
  { id: "1", title: "Class Demo Video 1", youtubeUrl: "" },
  { id: "2", title: "Class Demo Video 2", youtubeUrl: "" },
  { id: "3", title: "Class Demo Video 3", youtubeUrl: "" },
  { id: "4", title: "Class Demo Video 4", youtubeUrl: "" },
  { id: "5", title: "Student Practice Session", youtubeUrl: "" },
  { id: "6", title: "Grammar Workshop", youtubeUrl: "" },
];

export default function VideosPage() {
  const t = useTranslations("videosPage");

  const videoIcon = (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  );

  return (
    <main className="py-16 md:py-20 bg-cream min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        <SectionHeading title={t("heading")} subtitle={t("subheading")} icon={videoIcon} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {placeholderVideos.map((video) => (
            <VideoItem
              key={video.id}
              title={video.title}
              youtubeUrl={video.youtubeUrl}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
