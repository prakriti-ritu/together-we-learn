// Submit all site URLs to IndexNow (Bing, Yandex, Seznam, Naver — NOT Google).
// Gets the site into those indexes within hours instead of weeks. Google does
// not use IndexNow; that still needs Google Search Console (see docs/SEO_ACTION_ITEMS.md).
//
// Prereq: the key file public/<KEY>.txt must already be live on the deployed
// site (IndexNow fetches it to verify ownership). So: deploy first, then run this.
//
// Usage:
//   node scripts/submit-indexnow.mjs
//   SITE_URL=https://your-custom-domain.com node scripts/submit-indexnow.mjs

const KEY = "899e6a1d024a7bac3f21a3821bbf7047";
const SITE_URL = (process.env.SITE_URL || "https://together-we-learn.vercel.app").replace(/\/$/, "");
const host = new URL(SITE_URL).host;

// Mirror app/sitemap.ts
const locales = ["en", "hi"];
const routes = ["", "/courses", "/reviews", "/gallery", "/videos", "/expert-sessions", "/contact"];
const urlList = locales.flatMap((l) => routes.map((r) => `${SITE_URL}/${l}${r}`));

const body = {
  host,
  key: KEY,
  keyLocation: `${SITE_URL}/${KEY}.txt`,
  urlList,
};

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

console.log(`IndexNow → ${res.status} ${res.statusText}`);
console.log(`Submitted ${urlList.length} URLs for ${host}`);
if (res.status === 200 || res.status === 202) {
  console.log("✓ Accepted. Bing/Yandex will crawl these shortly.");
} else {
  const text = await res.text().catch(() => "");
  console.log("Response body:", text || "(empty)");
  console.log("If 403: the key file isn't live yet — deploy first, then re-run.");
}
