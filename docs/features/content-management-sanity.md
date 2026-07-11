# Content management (Sanity)

The tutor edits content in the embedded Studio at `/studio`; the website reads it on the server.

## Key files

| File | Role |
| --- | --- |
| `sanity/schemas/*` | Content models (course, review, faq, galleryImage, classVideo, expertSession, aboutTeacher, siteSettings, localizedString) |
| `sanity/lib/queries.ts` | GROQ queries |
| `sanity/lib/client.ts` + `env.ts` | Connection (project id, dataset, CDN) |
| `sanity/lib/fetch.ts` | **Locale-aware, cached, fail-safe fetchers** (`getCourses`, `getReviews`, …, `getContact`) + `pick()` |
| `sanity/lib/image.ts` | `urlFor()` image URL builder |
| `components/ui/SanityImage.tsx` | Renders a Sanity image or a placeholder |

## The fetch layer

Each fetcher is wrapped in React `cache()` (deduped per request) and an internal `safe()` (returns `[]`/`null` instead of throwing if the project is missing/empty or the network fails). This is what powers the **fallback model** — see [ARCHITECTURE.md](../ARCHITECTURE.md#content-fallback-model). No component ever crashes because Sanity is empty.

## Adding a new editable field

1. Add the field to the relevant schema in `sanity/schemas/`.
2. Add it to the GROQ query in `sanity/lib/queries.ts`.
3. Add it to the TypeScript interface in `sanity/lib/fetch.ts`.
4. Read it in the component (use `pick()` for localized fields), keeping an i18n/const fallback.

## Setup & editing

- One-time setup: [SANITY_SETUP.md](../SANITY_SETUP.md).
- Daily editing: [CONTENT_EDITING.md](../CONTENT_EDITING.md).
