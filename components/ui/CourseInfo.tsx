"use client";

import { useState } from "react";

/**
 * Wraps the course duration badge and reveals the course description in a
 * popover on hover (desktop) or tap (mobile). If there's no description, it just
 * renders the badge unchanged. Keeps the description off the card body.
 */
export default function CourseInfo({
  description,
  children,
  label = "Course details",
}: {
  description: string;
  children: React.ReactNode;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  if (!description) return <>{children}</>;

  return (
    <span className="relative inline-flex group/info">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={label}
        aria-expanded={open}
        className="inline-flex cursor-pointer"
      >
        {children}
      </button>
      <span
        role="tooltip"
        className={`absolute right-0 top-full mt-2 z-30 w-56 rounded-xl bg-panel text-white text-xs leading-relaxed px-3.5 py-3 shadow-card border border-white/10 whitespace-pre-line text-left font-normal normal-case tracking-normal transition-all duration-200 ${
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
