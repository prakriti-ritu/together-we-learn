# Animations & interactions

Deliberately **lightweight** — everything is CSS transitions/keyframes or small local React state. No GSAP/Framer/Lottie, to protect load time on budget phones and 4G.

## What's implemented

| Where | Effect | Technique |
| --- | --- | --- |
| Page load | Soft fade-up of `<main>` | CSS `@keyframes fadeInUp` (`app/globals.css`) |
| Buttons / cards | Scale + shadow lift on hover; press scale on mobile CTAs | Tailwind `hover:scale-[1.02]`, `active:scale-[0.97]` |
| Section headings | Gold underline accent | `.gold-underline` CSS |
| FAQ | Expand/collapse | CSS grid-rows `1fr`/`0fr` transition (`faq/FaqAccordion.tsx`) |
| Reviews | Swipe carousel with dots/arrows | `ui/ReviewCarousel.tsx` (scroll-snap) |
| Transformation Toggle | Text crossfade + confidence meter fill | CSS `opacity`/`translate`/`width` transitions |
| Word Flip | 3D card flip | CSS `rotateY` + `preserve-3d` |
| Contact success | Confirmation state | Local state swap |

## Ideas not yet built (from the design proposal)

Scroll-triggered staggered reveals (IntersectionObserver) and a "Confidence Ladder" roadmap SVG were proposed but not implemented in this pass. If added, gate them behind `prefers-reduced-motion` and keep them `transform`/`opacity`-only.
