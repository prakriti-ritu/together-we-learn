"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

/**
 * Clamps long text to a fixed number of lines with a "Read more / Show less"
 * toggle, so cards stay aligned. Reuses the bilingual reviews.readMore/showLess
 * strings. Only shows the toggle when the text is actually long.
 */
export default function ClampText({
  text,
  className = "",
  pClassName = "",
  clampClass = "line-clamp-3",
  words = 24,
}: {
  text: string;
  className?: string;
  pClassName?: string;
  clampClass?: string;
  words?: number;
}) {
  const t = useTranslations("reviews");
  const [open, setOpen] = useState(false);
  const isLong = text.trim().split(/\s+/).length > words;

  return (
    <div className={className}>
      <p className={`${pClassName} ${isLong && !open ? clampClass : ""}`}>{text}</p>
      {isLong && (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="mt-1.5 text-sm font-semibold text-gold hover:text-gold/80 transition-colors"
          aria-expanded={open}
        >
          {open ? t("showLess") : t("readMore")}
        </button>
      )}
    </div>
  );
}
