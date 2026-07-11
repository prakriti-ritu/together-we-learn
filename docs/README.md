# A Carrier to Career — Documentation

Documentation for the **A Carrier to Career** spoken-English website (Prakriti Keshri, Ambikapur, Chhattisgarh).

## Start here

| If you want to… | Read |
| --- | --- |
| Understand how the whole project is built | [ARCHITECTURE.md](./ARCHITECTURE.md) |
| Create every account/service from zero (start here if you have no accounts yet) | [ACCOUNTS_SETUP.md](./ACCOUNTS_SETUP.md) |
| Set up the Sanity CMS account from scratch | [SANITY_SETUP.md](./SANITY_SETUP.md) |
| Let the tutor edit website content (no developer) | [CONTENT_EDITING.md](./CONTENT_EDITING.md) |
| Deploy / host the site | [DEPLOYMENT.md](./DEPLOYMENT.md) |
| Check SEO before launch | [SEO_CHECKLIST.md](./SEO_CHECKLIST.md) |

## Page-by-page reference

Each public page is documented in [`pages/`](./pages/):

- [Home](./pages/home.md) · [Courses](./pages/courses.md) · [Reviews](./pages/reviews.md) · [Gallery](./pages/gallery.md) · [Videos](./pages/videos.md) · [Expert Sessions](./pages/expert-sessions.md) · [Contact](./pages/contact.md) · [Studio (CMS)](./pages/studio.md)

## Feature-by-feature reference

Each cross-cutting feature is documented in [`features/`](./features/):

- [Bilingual (Hindi/English)](./features/i18n-bilingual.md)
- [Content management (Sanity)](./features/content-management-sanity.md)
- [Practice games](./features/games-practice.md)
- [Images & photo placeholders](./features/images.md)
- [Contact form](./features/contact-form.md)
- [SEO & metadata](./features/seo.md)
- [Animations & interactions](./features/animations-interactions.md)
- [Mobile & call-to-action](./features/mobile-and-cta.md)

## The one rule to remember

Every section shows **real Sanity content when it exists, and falls back to built-in text/placeholders when it doesn't**. That means the site always looks complete, and the tutor "fills it in" over time from the Studio — no code changes or redeploys needed for content. See [ARCHITECTURE.md → Content fallback model](./ARCHITECTURE.md#content-fallback-model).
