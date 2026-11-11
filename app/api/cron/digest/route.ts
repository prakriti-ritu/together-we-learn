import { NextRequest, NextResponse } from "next/server";
import { dayKey, eventsKey, getRedis, type VisitEvent } from "@/lib/analytics";

/**
 * Weekly visitor digest, triggered by Vercel Cron every Sunday 9 AM IST (see vercel.json).
 * Vercel sends `Authorization: Bearer $CRON_SECRET`. Summarises the previous 7
 * days (India time) and emails it via Resend: 7 Redis reads + 1 email per week,
 * far inside both free tiers.
 */
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function top<T extends string>(items: T[], n = 6): [string, number][] {
  const m = new Map<string, number>();
  for (const i of items) m.set(i, (m.get(i) ?? 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);
}

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const redis = getRedis();
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  if (!redis || !resendKey || !to) {
    return NextResponse.json({ skipped: "Redis/Resend/CONTACT_EMAIL not configured" });
  }

  // Previous 7 full days (India time): Sunday's run reports last Sunday through Saturday.
  const days = [-7, -6, -5, -4, -3, -2, -1].map((o) => dayKey(o));
  const day = `${days[0]} to ${days[6]}`;
  const lists = await Promise.all(
    days.map((d) => redis.lrange<VisitEvent | string>(eventsKey(d), 0, -1))
  );
  // Tolerate bad records: skip anything that isn't a valid event instead of
  // letting one malformed entry crash the whole weekly report.
  let skippedBad = 0;
  const all: VisitEvent[] = [];
  for (const raw of lists.flat()) {
    try {
      const e = typeof raw === "string" ? (JSON.parse(raw) as VisitEvent) : raw;
      if (e && typeof e.v === "string" && typeof e.p === "string") all.push(e);
      else skippedBad++;
    } catch {
      skippedBad++;
    }
  }
  if (skippedBad) console.warn(`[digest] skipped ${skippedBad} malformed analytics record(s)`);

  // Anti-fake-numbers: no real person views 80+ pages in a week. Drop visitor ids
  // that exceed that so one script can't dominate the report (and say so below).
  const perVisitor = new Map<string, number>();
  for (const e of all) perVisitor.set(e.v, (perVisitor.get(e.v) ?? 0) + 1);
  const events = all.filter((e) => (perVisitor.get(e.v) ?? 0) <= 80);
  const filtered = all.length - events.length;

  if (events.length === 0) return NextResponse.json({ day, sent: false, reason: "no visits" });

  const visitors = new Set(events.map((e) => e.v));
  const newVisitors = events.filter((e) => e.n === 1).length;
  const where = events.map((e) => (e.city ? `${e.city}, ${e.c}` : e.c));
  const section = (title: string, rows: [string, number][]) =>
    `<h3 style="margin:18px 0 6px;font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:#8b91a6;">${title}</h3>
     <table style="width:100%;border-collapse:collapse;font-size:14px;">${rows
       .map(
         ([k, n]) =>
           `<tr><td style="padding:5px 0;border-bottom:1px solid #eceef4;">${esc(k || "Direct / unknown")}</td><td style="padding:5px 0;border-bottom:1px solid #eceef4;text-align:right;font-weight:600;">${n}</td></tr>`
       )
       .join("")}</table>`;

  const stat = (n: number | string, label: string) =>
    `<td style="text-align:center;padding:12px;"><div style="font-size:26px;font-weight:700;color:#5B3FE0;">${n}</div><div style="font-size:12px;color:#8b91a6;">${label}</div></td>`;

  const html = `
  <div style="background:#f6f7fb;padding:24px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e6e8f0;border-radius:16px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#6C4CF1,#5B3FE0);padding:20px 24px;color:#fff;">
        <div style="font-size:13px;letter-spacing:.1em;text-transform:uppercase;opacity:.85;">A Carrier to Career</div>
        <div style="font-size:20px;font-weight:700;margin-top:4px;">📊 Weekly visitor report</div>
        <div style="font-size:13px;opacity:.9;margin-top:2px;">${day}</div>
      </div>
      <div style="padding:12px 24px 24px;">
        <table style="width:100%;"><tr>${stat(events.length, "page views")}${stat(visitors.size, "visitors")}${stat(newVisitors, "new visitors")}</tr></table>
        ${section("Top pages", top(events.map((e) => e.p)))}
        ${section("Where from", top(where))}
        ${section("Came from", top(events.map((e) => e.r)))}
        ${section("Devices", top(events.map((e) => `${e.d} · ${e.os} · ${e.b}`)))}
        ${section("Language", top(events.map((e) => (e.l === "hi" ? "Hindi" : "English"))))}
        <p style="margin-top:20px;font-size:12px;color:#8b91a6;">Counts include only visitors who accepted analytics on the consent banner, so real traffic is higher. Visitors are anonymous - names/numbers appear only when someone submits the contact or demo form (separate email, with the pages they viewed if they had accepted analytics).${filtered ? ` ${filtered} suspicious page views (one visitor id with 80+ views) were excluded.` : ""}</p>
      </div>
    </div>
  </div>`;

  const { Resend } = await import("resend");
  // Resend returns { data, error } instead of throwing, so check it explicitly -
  // otherwise a rejected email would still be reported as "sent".
  const { error } = await new Resend(resendKey).emails.send({
    from: "A Carrier to Career <onboarding@resend.dev>",
    to,
    subject: `📊 ${visitors.size} visitors, ${events.length} page views this week (${day})`,
    html,
  });
  if (error) {
    console.error("[digest] Resend rejected the email:", error.message);
    return NextResponse.json({ day, sent: false, error: error.message }, { status: 502 });
  }

  return NextResponse.json({ day, sent: true, pageViews: events.length, visitors: visitors.size });
}
