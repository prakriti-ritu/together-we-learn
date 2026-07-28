"use client";

import { useState } from "react";

/**
 * Small "ⓘ" affordance on a course card. Reveals the course description in a
 * popover on hover (desktop) or tap (mobile) — so the description is available
 * without permanently taking space on the card. Renders nothing if empty.
 */
export default function CourseInfo({
  description,
  dark = false,
  label = "Course details",
}: {
  description: string;
  dark?: boolean;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  if (!description) return null;

  return (
    <span className="relative inline-flex group/info shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={label}
        aria-expanded={open}
        className={`grid place-items-center w-5 h-5 rounded-full text-[11px] font-bold transition-colors ${
          dark
            ? "bg-white/15 text-white hover:bg-white/25"
            : "bg-gold/15 text-gold hover:bg-gold/25"
        }`}
      >
        i
      </button>
      <span
        role="tooltip"
        className={`absolute left-0 top-full mt-2 z-30 w-56 rounded-xl bg-panel text-white text-xs leading-relaxed px-3.5 py-3 shadow-card border border-white/10 whitespace-pre-line transition-all duration-200 ${
          open
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible translate-y-1"
        } group-hover/info:opacity-100 group-hover/info:visible group-hover/info:translate-y-0`}
      >
        {description}
      </span>
    </span>
  );
}
