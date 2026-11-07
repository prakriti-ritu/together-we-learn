"use client";

import { Analytics } from "@vercel/analytics/next";
import { useConsent } from "@/lib/visitor";

/**
 * Vercel Web Analytics, loaded ONLY after the visitor accepts analytics.
 * (It is cookieless, but it still processes visit data, so it follows the same
 * opt-in as our own tracker.)
 */
export default function ConsentGatedAnalytics() {
  const consent = useConsent();
  return consent === "granted" ? <Analytics /> : null;
}
