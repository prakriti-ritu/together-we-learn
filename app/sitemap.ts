import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// Stable "last significant update" date rather than `new Date()`. Emitting
// today's date for every URL on every build/request is both untrue (nothing
// changed) and a weak/ignored signal to Google. Bump this only when page
// content meaningfully changes. (Sanity content edits are separate — those
// trigger on-demand revalidation, not a sitemap rebuild.)
const LAST_MODIFIED = new Date("2026-08-16");

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["en", "hi"];
  const routes = [
    "",
    "/courses",
    "/reviews",
    "/gallery",
    "/videos",
    "/expert-sessions",
    "/contact",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.8,
      });
    }
  }

  return entries;
}
