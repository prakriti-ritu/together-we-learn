"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getVisitorId, markSeen, useConsent } from "@/lib/visitor";

/**
 * Fires one anonymous page-view beacon per route change - but ONLY after the
 * visitor has accepted analytics in the consent banner. Renders nothing.
 */
export default function VisitTracker({ locale }: { locale: string }) {
  const pathname = usePathname();
  const consent = useConsent();

  useEffect(() => {
    if (consent !== "granted") return;
    // Skip the CMS studio and local development.
    if (pathname.startsWith("/studio") || location.hostname === "localhost") return;
    const vid = getVisitorId();
    if (!vid) return;

    const body = JSON.stringify({
      path: pathname,
      ref: document.referrer,
      vid,
      locale,
      isNew: markSeen(),
    });
    // sendBeacon survives page unloads; fall back to fetch keepalive.
    if (!navigator.sendBeacon?.("/api/track", new Blob([body], { type: "application/json" }))) {
      fetch("/api/track", { method: "POST", body, keepalive: true }).catch(() => {});
    }
  }, [pathname, locale, consent]);

  return null;
}
