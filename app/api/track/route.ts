import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import {
  dayKey,
  eventsKey,
  getRedis,
  ipAllowed,
  isBot,
  isKnownPath,
  isRepeat,
  isSameOrigin,
  parseUA,
  safeDecode,
  trailKey,
  type VisitEvent,
} from "@/lib/analytics";

const vidSchema = z.string().regex(/^[a-z0-9-]{8,40}$/i);

const schema = z.object({
  path: z.string().max(100).refine(isKnownPath),
  ref: z.string().max(300).optional(),
  vid: vidSchema,
  locale: z.enum(["en", "hi"]),
  isNew: z.boolean().optional(),
});

const ok = () => new NextResponse(null, { status: 204 });
const clientIp = (r: NextRequest) =>
  r.headers.get("x-real-ip") ?? r.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

/**
 * Records one anonymous page view (only ever called after the visitor consented).
 * We store NO IP address - only coarse location (country/city from Vercel's edge
 * headers), device, browser and the page. Always answers 204 so tracking can
 * never affect the visitor's experience.
 *
 * Abuse controls (all free, none cost Redis commands): same-origin check, known
 * page paths only, bot filter, per-IP rate limit, and same-page-repeat dedupe.
 */
export async function POST(request: NextRequest) {
  try {
    const redis = getRedis();
    const ua = request.headers.get("user-agent") ?? "";
    if (!redis || isBot(ua) || !isSameOrigin(request) || !ipAllowed(clientIp(request))) return ok();

    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return ok();
    const { path, ref, vid, locale, isNew } = parsed.data;
    if (isRepeat(vid, path)) return ok();

    let refHost = "";
    try {
      if (ref) refHost = new URL(ref).hostname.replace(/^www\./, "");
    } catch {}
    // Ignore our own pages as "referrer" (internal navigation).
    if (refHost && refHost === request.nextUrl.hostname.replace(/^www\./, "")) refHost = "";

    const event: VisitEvent = {
      t: Date.now(),
      p: path,
      c: request.headers.get("x-vercel-ip-country") ?? "??",
      city: safeDecode(request.headers.get("x-vercel-ip-city")),
      ...parseUA(ua),
      r: refHost,
      l: locale,
      v: vid,
      n: isNew ? 1 : 0,
    };

    const day = eventsKey(dayKey());
    const trail = trailKey(vid);
    const pipe = redis.pipeline();
    pipe.lpush(day, JSON.stringify(event));
    pipe.ltrim(day, 0, 1999); // hard cap per day
    pipe.expire(day, 8 * 86400); // keep a week for the digest
    pipe.lpush(trail, `${event.t}|${path}`);
    pipe.ltrim(trail, 0, 14);
    pipe.expire(trail, 30 * 86400);
    await pipe.exec();
  } catch {
    // swallow - analytics must never surface errors
  }
  return ok();
}

/**
 * Consent withdrawal (DPDP right to erasure): deletes the browsing trail kept
 * against this visitor id. Per-day event lists self-expire within 8 days.
 */
export async function DELETE(request: NextRequest) {
  try {
    const redis = getRedis();
    if (!redis || !isSameOrigin(request) || !ipAllowed(clientIp(request), 10)) return ok();
    const parsed = z.object({ vid: vidSchema }).safeParse(await request.json());
    if (parsed.success) await redis.del(trailKey(parsed.data.vid));
  } catch {}
  return ok();
}
