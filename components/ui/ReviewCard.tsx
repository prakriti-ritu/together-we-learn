"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import StarRating from "./StarRating";

interface ReviewCardProps {
  name: string;
  city?: string;
  rating: number;
  text: string;
  photoUrl?: string;
  featured?: boolean;
  /** When true, uses masonry-friendly classes (break-inside-avoid + margin). When false, uses carousel-friendly classes (h-full, no margin). */
  masonry?: boolean;
  /** ISO date (YYYY-MM-DD) from Sanity; shown small in the footer if valid. */
  date?: string;
}

function formatDate(date?: string): string {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

/** Reviews longer than this (word count) get clamped with a "Read more" toggle so cards stay aligned. */
const CLAMP_WORDS = 34;

export default function ReviewCard({
  name,
  city,
  rating,
  text,
  photoUrl,
  featured,
  masonry,
  date,
}: ReviewCardProps) {
  const t = useTranslations("reviews");
  const [expanded, setExpanded] = useState(false);
  const formattedDate = formatDate(date);

  const isLong = text.trim().split(/\s+/).length > CLAMP_WORDS;

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const masonryClasses = masonry ? "break-inside-avoid mb-4 md:mb-5" : "h-full";

  return (
    <div
      className={`rounded-2xl transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-card-hover flex flex-col ${masonryClasses} ${
        featured
          ? "bg-gradient-to-br from-panel to-panel-2 text-white p-7 md:p-9 shadow-card ring-1 ring-gold/20"
          : "bg-card-white border border-border-warm p-6 md:p-8 shadow-card"
      }`}
    >
      <div
        className={`text-6xl font-serif leading-none mb-2 select-none ${
          featured ? "text-gold/40" : "text-gold/20"
        }`}
      >
        &ldquo;
      </div>
      <p
        className={`mb-3 leading-relaxed flex-1 ${
          featured ? "text-white/90 text-base md:text-lg" : "text-text-secondary"
        } ${isLong && !expanded ? "line-clamp-5" : ""}`}
      >
        {text}
      </p>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className={`self-start mb-4 text-sm font-semibold transition-colors ${
            featured ? "text-gold-light hover:text-white" : "text-gold hover:text-gold/80"
          }`}
          aria-expanded={expanded}
        >
          {expanded ? t("showLess") : t("readMore")}
        </button>
      )}
      <StarRating rating={rating} className="mb-5" />
      <div
        className={`flex items-center gap-3 pt-4 border-t ${
          featured ? "border-white/15" : "border-gold/15"
        }`}
      >
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photoUrl}
            alt={name}
            className={`w-11 h-11 rounded-full object-cover ring-2 ${
              featured ? "ring-gold/30" : "ring-gold/20"
            }`}
            loading="lazy"
          />
        ) : (
          <div
            className={`w-11 h-11 rounded-full font-bold flex items-center justify-center text-sm ${
              featured
                ? "bg-gold/20 text-gold"
                : "bg-gradient-to-br from-gold/20 to-gold/5 text-gold"
            }`}
          >
            {initials}
          </div>
        )}
        <div>
          <p
            className={`font-semibold text-sm ${
              featured ? "text-white" : "text-navy"
            }`}
          >
            {name}
          </p>
          {city && (
            <p
              className={`text-xs ${
                featured ? "text-white/60" : "text-text-secondary"
              }`}
            >
              {city}
            </p>
          )}
        </div>
        {formattedDate && (
          <span
            className={`ml-auto self-start text-xs whitespace-nowrap ${
              featured ? "text-white/50" : "text-text-secondary/70"
            }`}
          >
            {formattedDate}
          </span>
        )}
      </div>
    </div>
  );
}
