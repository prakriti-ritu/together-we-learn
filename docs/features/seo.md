# SEO & metadata

## Per-page metadata

Each route exports `generateMetadata` (title/description from the `meta` and page namespaces in `messages/*.json`), with locale `alternates` (`hi` / `en`) and Open Graph tags on the homepage.

## Structured data (JSON-LD)

`components/seo/JsonLd.tsx` → `HomePageJsonLd` injects `EducationalOrganization`, `LocalBusiness`, and `FAQPage` schema on the homepage (locale-aware description).

## Robots & sitemap

- `app/robots.ts` — allows `/`, disallows `/studio` and `/api/`, points to the sitemap.
- `app/sitemap.ts` — lists locale × route combinations.
  - **Note:** `/gallery` and `/videos` are currently not in the sitemap array; add them there if you want them indexed.

## Config

- Set `NEXT_PUBLIC_SITE_URL` to the real domain (used as `metadataBase` and in robots/sitemap). It currently defaults to a placeholder Vercel URL in `app/[locale]/layout.tsx` / `.env.local.example`.

See also the launch list in [../SEO_CHECKLIST.md](../SEO_CHECKLIST.md).
