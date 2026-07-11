# Gallery page

**Route:** `/[locale]/gallery` → `app/[locale]/gallery/page.tsx`

- **Content:** all Sanity `galleryImage` documents (ordered), falling back to 12 placeholder tiles.
- Images render through `ui/SanityImage.tsx`: a real optimized `next/image` when a photo exists, otherwise an on-brand placeholder box of the same 4:3 shape — so the grid always looks complete. See [features/images.md](../features/images.md).
- The homepage shows only the first 4 of these (Gallery teaser).
- Editing: [CONTENT_EDITING.md → Add a class photo](../CONTENT_EDITING.md).
- `revalidate = 60`.
