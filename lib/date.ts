/** Pure date helpers shared by batch UI (server + client safe). */

/** "5 August 2026" (en) / "5 अगस्त 2026" (hi). Empty string on an invalid date. */
export function formatBatchDate(date: string | undefined, locale: string): string {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(locale === "hi" ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Whole days from *today* (local midnight) until the date. Negative if past. null if invalid. */
export function daysUntil(date: string | undefined): number | null {
  if (!date) return null;
  const target = new Date(date);
  if (Number.isNaN(target.getTime())) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / 86_400_000);
}
