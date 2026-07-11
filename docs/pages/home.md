# Home page

**Route:** `/[locale]` → `app/[locale]/page.tsx`

The homepage composes every section in this order. Each is an async Server Component that pulls from Sanity with a built-in fallback.

| # | Section | Component | Content source |
| --- | --- | --- | --- |
| 1 | Hero | `sections/Hero.tsx` | Site Settings hero fields / i18n `hero`; CTAs from `getContact()`. Right side = **Transformation Toggle** signature game |
| 2 | Trust strip | `sections/TrustStrip.tsx` | Site Settings `trustStats` / i18n `trust` (credential badges) |
| 3 | About the course | `sections/AboutCourse.tsx` | i18n `aboutCourse` (static) |
| 4 | Practice | `games/PracticeSection.tsx` | Word Flip + Sentence Builder games |
| 5 | Courses | `sections/CoursesSection.tsx` | Sanity `course` docs / i18n `courses` |
| 6 | Why choose us | `sections/WhyChooseUs.tsx` | i18n `whyUs` (static) |
| 7 | Gallery teaser | `sections/GallerySection.tsx` | Sanity `galleryImage` (first 4) / placeholders |
| 8 | Class videos | `sections/ClassVideos.tsx` | Sanity `classVideo` / placeholders |
| 9 | Reviews | `sections/ReviewsSection.tsx` | Sanity `review` / seed reviews (carousel) |
| 10 | Expert sessions | `sections/ExpertSessionsSection.tsx` | Sanity `expertSession` / seed |
| 11 | About the teacher | `sections/AboutTeacher.tsx` | Sanity `aboutTeacher` / i18n `aboutTeacher` (photo + credential chips) |
| 12 | FAQ | `sections/FAQSection.tsx` | Sanity `faq` / i18n `faq` |
| 13 | Final CTA | `sections/FinalCTA.tsx` | i18n `finalCta`; CTAs from `getContact()` |

**Signature element:** the hero's Transformation Toggle turns a nervous Hindi thought into a confident English sentence with a filling confidence meter — see [features/games-practice.md](../features/games-practice.md).

Metadata/SEO for this page is generated in `generateMetadata` + `HomePageJsonLd` — see [features/seo.md](../features/seo.md).
