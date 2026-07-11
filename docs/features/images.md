# Images & photo placeholders

## Drop-in component: `components/ui/SanityImage.tsx`

Give it a Sanity image `source` plus `width`/`height`/`alt`:

- **Image set in Sanity** → renders an optimized `next/image` (AVIF/WebP, lazy, correct size) via `urlFor()`.
- **No image yet** → renders an on-brand gradient placeholder box of the same aspect ratio, with an optional label.

This means you can build and launch **before you have photos** — the layout is already correct, and each real photo appears automatically when the tutor uploads it in Studio. No code change, no redeploy.

Used by: `AboutTeacher`, `GallerySection`, the gallery page.

## Config

`next.config.ts` already allows `cdn.sanity.io` and prefers AVIF/WebP:

```ts
images: { formats: ["image/avif", "image/webp"], remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }] }
```

## YouTube thumbnails

Video tiles use plain `<img>` for the YouTube thumbnail (from `img.youtube.com`) and only load the iframe on tap — see [pages/videos.md](../pages/videos.md). These are deliberately not `next/image` (they're tiny and external).

## Tips

- Keep uploads under ~2 MB.
- Sanity's `hotspot` is enabled on image fields, so the tutor can pick the focal point for crops.
