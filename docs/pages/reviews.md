# Reviews page

**Route:** `/[locale]/reviews` → `app/[locale]/reviews/page.tsx`

- **Content:** Sanity `review` documents (newest first), falling back to 9 seed reviews.
- Layout: CSS masonry columns (`columns-1 / md:columns-2 / lg:columns-3`). The first card renders as `featured` (navy).
- Review text is localized (`reviewText.en` / `.hi`); student photo optional (initials avatar if absent).
- Rendered by `ui/ReviewCard.tsx` + `ui/StarRating.tsx`.
- Editing: [CONTENT_EDITING.md → Add a student review](../CONTENT_EDITING.md).
- `revalidate = 60`.
