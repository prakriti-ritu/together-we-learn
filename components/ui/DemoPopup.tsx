"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { waHref } from "@/lib/site";
import CalendarIcon from "@/components/ui/CalendarIcon";

/**
 * Gentle, one-time lead popup. Appears once per visitor (localStorage flag) on
 * exit-intent (desktop) or after deep scroll, offering a free demo. Tasteful
 * corner card — not a full-screen modal — dismissible, Esc-closable, and
 * disabled for reduced-motion users' animation only (content still shows).
 * Purely client-side, fixed-position (no layout shift, SEO-safe).
 */
const SEEN_KEY = "demoPopupSeen";

export default function DemoPopup({ locale, whatsapp }: { locale: string; whatsapp: string }) {
  const t = useTranslations("demoPopup");
  const tc = useTranslations("common");
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* ignore */
    }
    if (seen) return;

    const trigger = () => {
      setOpen(true);
      try {
        localStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
      cleanup();
    };

    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const ratio = scrolled / document.documentElement.scrollHeight;
      if (ratio > 0.55) trigger();
    };
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };
    function cleanup() {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onMouseOut);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseout", onMouseOut);
    return cleanup;
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label={t("heading")}
      className="fixed z-[60] left-4 right-4 bottom-24 md:left-auto md:right-6 md:bottom-6 md:w-[360px]"
    >
      <div className="border-trail glass rounded-2xl shadow-card p-5 relative motion-safe:animate-[fadeInUp_.35s_ease-out]">
        <button
          ref={closeRef}
          onClick={() => setOpen(false)}
          aria-label={t("dismiss")}
          className="absolute top-3 right-3 w-8 h-8 grid place-items-center rounded-full text-text-secondary hover:bg-cream"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <p className="font-serif text-lg font-bold text-navy pr-6">{t("heading")}</p>
        <p className="text-text-secondary text-sm mt-1.5">{t("text")}</p>
        <div className="flex flex-col sm:flex-row gap-2.5 mt-4">
          <a
            href={`/${locale}#book-demo`}
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center gap-2 bg-gold text-white font-semibold rounded-xl px-4 py-2.5 text-sm shadow-button hover:bg-gold-light transition-colors"
          >
            <CalendarIcon className="w-4 h-4" />
            {t("book")}
          </a>
          <a
            href={waHref(whatsapp, tc("waMessage"))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-border-warm px-4 py-2.5 text-sm font-semibold text-navy hover:bg-cream transition-colors"
          >
            {t("whatsapp")}
          </a>
        </div>
      </div>
    </div>
  );
}
