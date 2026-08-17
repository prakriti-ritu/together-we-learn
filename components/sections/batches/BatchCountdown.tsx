"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { daysUntil } from "@/lib/date";

/**
 * Accurate "Starts in N days" pill. Computed on the client (after mount) so it
 * never goes stale against the day's ISR cache. Renders nothing until mounted
 * and nothing for past/invalid dates — the card's formatted "Starts <date>"
 * line is the always-present, no-JS-safe fallback, so this adds no CLS.
 */
export default function BatchCountdown({ startDate }: { startDate?: string }) {
  const t = useTranslations("batches");
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    setDays(daysUntil(startDate));
  }, [startDate]);

  if (days === null || days < 0) return null;

  const label =
    days === 0
      ? t("startsToday")
      : days === 1
        ? t("startsTomorrow")
        : t("startsInDays", { n: days });

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 text-gold px-3 py-1 text-xs font-semibold">
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
      {label}
    </span>
  );
}
