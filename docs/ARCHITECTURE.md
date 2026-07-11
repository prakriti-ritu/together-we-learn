# Architecture

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) + React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (config-less — theme in `app/globals.css` via `@theme inline`) |
| CMS | Sanity v5 (Studio embedded at `/studio`) |
| i18n | next-intl (English + Hindi, **default = Hindi**) |
| Email | Resend (contact form) |
| Rate limiting | Upstash Redis (optional) |
| Fonts | Cormorant Garamond (display), Plus Jakarta Sans (body), Mukta (Devanagari/Hinglish) |
| Hosting | Vercel (recommended) |

## Folder map

```
app/
  layout.tsx                 Root passthrough layout
  [locale]/
    layout.tsx               Fonts, Header, Footer, MobileStickyBar; fetches contact once
    page.tsx                 Homepage — composes all sections
    courses|reviews|gallery|videos|expert-sessions|contact/page.tsx
    loading.tsx              Route loading spinner
  api/contact/route.ts       Contact form handler (Zod + Resend + rate limit)
  robots.ts, sitemap.ts      SEO routes
  studio/[[...tool]]/page.tsx  Embedded Sanity Studio
components/
  layout/                    Header, Footer, MobileMenu, MobileStickyBar, LanguageToggle
  sections/                  Homepage sections (Hero, TrustStrip, AboutTeacher, …)
    class-videos/VideoItem.tsx   (client child split out of ClassVideos)
    faq/FaqAccordion.tsx         (client child split out of FAQSection)
  games/                     TransformationToggle, WordFlip, SentenceBuilder, PracticeSection
  ui/                        Button, Card, SanityImage, ReviewCard, SectionHeading, icons…
  seo/JsonLd.tsx             Structured data
lib/
  site.ts                    Contact/brand constants (env-driven) + telHref/waHref
  fonts.ts                   Font loaders
sanity/
  env.ts, lib/client.ts      Sanity connection
  lib/queries.ts             GROQ queries
  lib/fetch.ts               Locale-aware, cached, fail-safe data layer  ← key file
  lib/image.ts               urlFor() image URL builder
  schemas/                   Content models (course, review, faq, …)
messages/
  en.json, hi.json           All UI + fallback content, per language
i18n/                        next-intl routing + request config
docs/                        This documentation
```

## Rendering & data flow

- Pages and sections are **async Server Components**. They fetch from Sanity on the server, so no CMS credentials or query code ships to the browser.
- The site chrome (Header/Footer/MobileStickyBar) is rendered once in `app/[locale]/layout.tsx`, which fetches contact details a single time and passes them down as props.
- Time-based caching: pages set `export const revalidate = 60`, so published Sanity changes appear within ~60 seconds without a redeploy.
- Client Components are used only where interactivity is required: the games, the language toggle, the mobile menu, the FAQ accordion, the review carousel, and the YouTube video tiles. Everything else is server-rendered for speed on slow connections.

## Content fallback model

This is the core idea that makes the site tutor-editable **and** always complete.

`sanity/lib/fetch.ts` exposes one fetcher per content type (`getCourses`, `getReviews`, `getAboutTeacher`, …). Each is:

1. **Cached** with React `cache()` — deduped per request (fetching the same thing in two sections costs one query).
2. **Fail-safe** via an internal `safe()` wrapper — if the Sanity project is missing/empty, or the network fails during build, it returns an empty list / `null` instead of throwing.

Every section then does:

```
const items = sanityData.length > 0 ? mapFromSanity(sanityData) : builtInFallback;
```

- **No Sanity content yet** → the section renders the built-in text (from `messages/*.json`) or seed placeholders. The site looks finished on day one.
- **Tutor adds content in Studio** → the section swaps to the real content automatically.

`pick(localizedValue, locale, fallback)` chooses the right language off a `{ en, hi }` object and falls back gracefully.

## Bilingual model

- UI labels and all fallback copy live in `messages/en.json` and `messages/hi.json`.
- Sanity content uses `localizedString` / `localizedText` objects with `en` and `hi` fields; `pick()` selects the active language.
- Default locale is Hindi (`i18n/routing.ts`); the Hindi copy is intentionally **Hinglish** (Devanagari + common English words) because that reads as natural to the Ambikapur audience.

## Contact details — single source of truth

Order of precedence (highest wins): **Sanity Site Settings → environment variables → defaults in `lib/site.ts`.**
`getContact()` in `sanity/lib/fetch.ts` merges these, so the phone/WhatsApp/email can be changed either in Studio (tutor) or in env vars (developer).
