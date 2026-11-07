import { Redis } from "@upstash/redis";

/**
 * Tiny self-hosted analytics on Upstash Redis (free tier: 10k commands/day).
 *
 * Budget: each tracked page view costs ~6 commands, so ~1,600 page views/day fit
 * in the free tier. Events past that are dropped silently (never break the site).
 */
export type VisitEvent = {
  t: number; // epoch ms
  p: string; // path
  c: string; // country code
  city: string;
  d: "mobile" | "tablet" | "desktop";
  b: string; // browser
  os: string;
  r: string; // referrer host ("" = direct)
  l: string; // locale
  v: string; // visitor id
  n: 0 | 1; // 1 = first time this visitor id was seen
};

/**
 * Analytics database. Prefers a SEPARATE Upstash database
 * (UPSTASH_ANALYTICS_REDIS_REST_URL/TOKEN) so that a flood of fake page views can
 * never use up the quota the contact-form rate limiter depends on. Falls back to
 * the main database when the dedicated one isn't configured.
 */
export function getRedis(): Redis | null {
  const url = process.env.UPSTASH_ANALYTICS_REDIS_REST_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_ANALYTICS_REDIS_REST_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? new Redis({ url, token }) : null;
}

/** Only real site pages are accepted - junk/fabricated paths can't pollute stats. */
const PATH_RE =
  /^\/(en|hi)(\/(courses|batches|reviews|gallery|videos|expert-sessions|contact|privacy))?$/;
export const isKnownPath = (p: string) => PATH_RE.test(p.replace(/\/$/, "") || "/");

/**
 * Same-origin guard: a real browser always sends Origin (and Sec-Fetch-Site) on
 * same-origin POST/DELETE. Rules out other websites and casual scripts. A
 * determined attacker can still forge headers - see the rate limits below.
 */
export function isSameOrigin(req: {
  headers: { get(name: string): string | null };
}): boolean {
  const site = req.headers.get("sec-fetch-site");
  if (site && site !== "same-origin") return false;
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

// --- In-memory, per-server-instance throttles. They cost ZERO Redis commands and
// are best-effort (serverless instances don't share memory), which is enough to
// stop casual flooding and refresh-spam from inflating numbers or burning quota.
const ipHits = new Map<string, { n: number; reset: number }>();
const recent = new Map<string, number>();

/** At most `max` events per IP per minute. */
export function ipAllowed(ip: string, max = 30, now = Date.now()): boolean {
  if (ipHits.size > 5000) ipHits.clear();
  const h = ipHits.get(ip);
  if (!h || now > h.reset) {
    ipHits.set(ip, { n: 1, reset: now + 60_000 });
    return true;
  }
  return ++h.n <= max;
}

/** Same visitor + same page within `windowMs` counts once (refresh spam / double fire). */
export function isRepeat(vid: string, path: string, windowMs = 30_000, now = Date.now()): boolean {
  if (recent.size > 5000) recent.clear();
  const k = `${vid}|${path}`;
  const last = recent.get(k);
  recent.set(k, now);
  return last !== undefined && now - last < windowMs;
}

/** YYYY-MM-DD in India time (the owner's day, not UTC's). */
export function dayKey(offsetDays = 0, now = Date.now()): string {
  const d = new Date(now + 5.5 * 3600_000 + offsetDays * 86400_000);
  return d.toISOString().slice(0, 10);
}

export const eventsKey = (day: string) => `ctc:ev:${day}`;
export const trailKey = (vid: string) => `ctc:trail:${vid}`;

/** Vercel URL-encodes the city header; a malformed value must never throw. */
export function safeDecode(s: string | null): string {
  if (!s) return "";
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

const BOT_RE = /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|facebookexternalhit|curl|wget/i;
export const isBot = (ua: string) => !ua || BOT_RE.test(ua);

export function parseUA(ua: string): Pick<VisitEvent, "d" | "b" | "os"> {
  const d = /ipad|tablet/i.test(ua) ? "tablet" : /mobi|android|iphone/i.test(ua) ? "mobile" : "desktop";
  const b = /edg\//i.test(ua)
    ? "Edge"
    : /opr\/|opera/i.test(ua)
      ? "Opera"
      : /samsungbrowser/i.test(ua)
        ? "Samsung"
        : /chrome|crios/i.test(ua)
          ? "Chrome"
          : /firefox|fxios/i.test(ua)
            ? "Firefox"
            : /safari/i.test(ua)
              ? "Safari"
              : "Other";
  const os = /android/i.test(ua)
    ? "Android"
    : /iphone|ipad|ios/i.test(ua)
      ? "iOS"
      : /windows/i.test(ua)
        ? "Windows"
        : /mac os/i.test(ua)
          ? "macOS"
          : /linux/i.test(ua)
            ? "Linux"
            : "Other";
  return { d, b, os };
}
