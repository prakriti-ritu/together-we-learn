# Mobile & call-to-action

The primary audience is on mobile, often on slower networks. The site is mobile-first.

## Always-visible contact

- **`components/layout/MobileStickyBar.tsx`** — a fixed bottom bar on mobile with **Call Now** and **WhatsApp** buttons (48px tap targets). Present on every page.
- **Header** shows a round Call button on mobile; the hamburger `MobileMenu` holds nav links.
- All Call/WhatsApp targets come from `getContact()` → `lib/site.ts` helpers `telHref()` / `waHref()`, so the number is defined once.

## Layout

- Responsive grids collapse to single/스택 columns; horizontal scroll-snap for gallery/reviews on small screens.
- Footer has `pb-20` on mobile so it clears the sticky bar.

## Performance choices that help mobile

- Server-rendered content (no big client bundles for text).
- YouTube lite-embed (thumbnail until tap).
- `next/image` (AVIF/WebP, lazy) for Sanity photos.
- CSS-only animations.
- `revalidate = 60` caching.

## Editing the number

Tutor: Studio → Site Settings. Developer: `NEXT_PUBLIC_PHONE` / `NEXT_PUBLIC_WHATSAPP` env vars, or defaults in `lib/site.ts`.
