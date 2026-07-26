# Redesign & Features — Developer Handoff Notes

Summary of the "Aurora · Midnight" redesign + lead-conversion features added to the site. Written for future maintainers (and to preserve context).

## Design system (light/dark)
- **Tokens:** [app/globals.css](../app/globals.css) defines semantic CSS vars on `:root` — `--ground, --surface, --panel(+ --panel-2), --ink, --ink-soft, --line, --accent, --accent-2, --glow-*, --track` — overridden under `@media (prefers-color-scheme: dark)` **and** `:root[data-theme="light"|"dark"]`. Tailwind colours are mapped to these via `@theme inline` (e.g. `--color-navy → --ink`, `--color-gold → --accent`, `--color-cream → --ground`, `--color-card-white → --surface`, new `--color-panel/-2`).
- **Dual-role fix:** `navy` was used both as text and as dark surfaces. Text keeps `text-navy` (→ `--ink`, flips). Intentionally-dark surfaces (footer, CTA, featured cards, dark buttons, sticky bar, video overlays) use the **`panel`** token so they stay dark-with-light-text in both themes. When adding a dark surface, use `bg-panel`/`from-panel to-panel-2`, and for dark text on a fixed-white background use `text-panel` (NOT `text-navy`, which turns white in dark mode).
- **Theme switch:** [components/layout/ThemeToggle.tsx](../components/layout/ThemeToggle.tsx) sets `data-theme` on `<html>` + persists to `localStorage`. Shown in the header on desktop; **inside the hamburger** ([MobileMenu.tsx](../components/layout/MobileMenu.tsx)) on mobile. No-flash via [public/theme-init.js](../public/theme-init.js) loaded with `next/script strategy="beforeInteractive"`. `<html>` has `suppressHydrationWarning` (required, since the script mutates it pre-hydration).
- **Aurora utilities** in globals.css: `.text-gradient` (animated gradient text), `.glow-blob`, `.glass`, `.border-trail` (animated conic border via `@property --trail`), `.ticker-mask`/`.ticker-track`, `.reveal`. All pure CSS. `prefers-reduced-motion` disables them. **No animation libraries** (no Framer Motion) — deliberate for speed/SEO. Global `cursor: pointer` on buttons.

## New components
- Sections: `Hero` (centered, gradient brand line first then course, glass border-trail demo, ticker, waves), `HeroStats`, `HeroTransform` (auto-loop), `ClassClip` (60-sec video band), `Achievement` (gold-medal band), `ConfidenceLadder`, `DemoBooking`, plus `LevelQuiz` (games).
- UI: `Reveal`, `CountUp`, `Waves`, `ClampText` (read-more), `CalendarIcon`, `DemoPopup` (exit/scroll lead popup, mounted in layout).

## Homepage section order ([app/[locale]/page.tsx](../app/[locale]/page.tsx))
Hero → ClassClip → TrustStrip → Achievement → ConfidenceLadder → **LevelQuiz → AboutCourse → CoursesSection → PracticeSection** → WhyChooseUs → GallerySection → ClassVideos → ReviewsSection → ExpertSessionsSection → AboutTeacher → FAQSection → DemoBooking → FinalCTA. (Most wrapped in `<Reveal>`.)

## New Sanity fields — [sanity/schemas/siteSettings.ts](../sanity/schemas/siteSettings.ts)
Threaded through [queries.ts](../sanity/lib/queries.ts) + [fetch.ts](../sanity/lib/fetch.ts). All optional; sections hide if empty:
- `heroClipUrl` (YouTube URL) → ClassClip band.
- `achievementImage` + `achievementHeading` + `achievementText` + `achievementCaption` → Achievement band.
- `heroStats[]` (`value` like "500+" + localized `label`) → count-up stats under hero (CountUp parses the leading number).
- (`youtube` added earlier for social links.)
Owner-editing docs: [docs/DATA_ENTRY_GUIDE_FOR_OWNER.md](./DATA_ENTRY_GUIDE_FOR_OWNER.md).

## Lead conversion
- **Free-demo booking:** [components/sections/DemoBooking.tsx](../components/sections/DemoBooking.tsx) posts to [app/api/contact/route.ts](../app/api/contact/route.ts) with `type:"demo"` + `preferredTime`. On homepage (`#book-demo`) and contact page. Hero has a "Book a free demo" CTA (calendar icon).
- **Branded emails:** the contact route sends a styled HTML email (icons, brand header, Call button); distinct subject for demo vs enquiry.
- **Level quiz:** [components/games/LevelQuiz.tsx](../components/games/LevelQuiz.tsx) → result → booking CTA.
- **Smarter WhatsApp:** all WhatsApp CTAs pass a prefilled message (`common.waMessage`) via `waHref(whatsapp, text)`.
- **Exit/scroll popup:** [components/ui/DemoPopup.tsx](../components/ui/DemoPopup.tsx), one-time (localStorage), tasteful.

## Data / performance / SEO
- **ISR:** all pages `export const revalidate = 86400` (1 day). **On-demand revalidation** via [app/api/revalidate/route.ts](../app/api/revalidate/route.ts) — protect with `REVALIDATE_SECRET` env var; wire a Sanity webhook (`POST /api/revalidate?secret=…`) so publishing updates instantly. **No video hosting — everything via YouTube.**
- **Analytics:** `@vercel/analytics` `<Analytics/>` mounted in the layout (visitor stats in Vercel dashboard once deployed).
- Half-star ratings ([StarRating.tsx](../components/ui/StarRating.tsx)); mobile overflow fixed (`main` has `overflow-x-hidden`; ticker clipped).

## Run / deploy
- `npm install` **inside the project root** (a stray `node_modules` one level up previously broke `next dev`). Dev server: `npx next dev -p 3000` → http://localhost:3000. `npm run build` passes.
- Only **one** dev server at a time (multiple share `.next` and serve stale output). If output looks stale: kill node, `rm -rf .next`, restart.
- **Git:** remote `origin` = `github.com/vanshul22/career-to-career`; author identity **Vanshul Kesharwani** `<vkvanshulkesharwani54@gmail.com>`.
- **Env vars** (add in Vercel too): `NEXT_PUBLIC_SANITY_PROJECT_ID` (=`6jjcexcm`), `NEXT_PUBLIC_SANITY_DATASET=production`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_PHONE`, `NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_INSTAGRAM`, `NEXT_PUBLIC_YOUTUBE`, `RESEND_API_KEY`, `CONTACT_EMAIL`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, and new `REVALIDATE_SECRET`. Secrets live only in `.env.local` (gitignored).

## Footer developer credit
Tasteful "Built by Vanshul Kesharwani" badge with a hover **email tooltip** and a prefilled "Get one like this" email CTA — [components/layout/Footer.tsx](../components/layout/Footer.tsx).
