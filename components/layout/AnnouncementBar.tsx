"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

/**
 * Thin, dismissible top bar promoting the newest batch. Server-rendered when a
 * featured batch exists (so it's in the initial HTML — Lighthouse runs with an
 * empty localStorage and always sees it, keeping CLS at zero in the lab). The
 * dismiss flag is keyed by batch id, so a *new* batch re-appears even after a
 * previous one was dismissed. Mirrors the localStorage pattern in DemoPopup.
 */
const KEY = "annBarDismissed";

export default function AnnouncementBar({
  id,
  locale,
  title,
  dateText,
  isRunning,
}: {
  id: string;
  locale: string;
  title: string;
  dateText: string;
  isRunning: boolean;
}) {
  const t = useTranslations("batches");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) === id) setHidden(true);
    } catch {
      /* ignore */
    }
  }, [id]);

  if (hidden) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(KEY, id);
    } catch {
      /* ignore */
    }
    setHidden(true);
  };

  const detail = isRunning ? t("statusRunning") : `${t("starts")} ${dateText}`;

  return (
    <div className="relative bg-gradient-to-r from-gold to-gold-light text-white">
      <Link
        href={`/${locale}/batches`}
        className="flex items-center justify-center gap-2 flex-wrap text-center px-10 py-2 text-xs sm:text-sm font-medium hover:opacity-95 transition-opacity"
      >
        <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          {t("bannerNew")}
        </span>
        <span className="font-semibold">{title}</span>
        <span className="opacity-90">— {detail}</span>
        <span className="font-bold underline underline-offset-2">{t("bannerBook")} →</span>
      </Link>
      <button
        onClick={dismiss}
        aria-label={t("bannerDismiss")}
        className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 grid place-items-center rounded-full text-white/90 hover:bg-white/15 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
