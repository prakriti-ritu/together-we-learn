# Videos page

**Route:** `/[locale]/videos` → `app/[locale]/videos/page.tsx`

- **Content:** Sanity `classVideo` documents, falling back to 6 placeholder tiles.
- Each tile uses `sections/class-videos/VideoItem.tsx` (a client component): it shows the YouTube thumbnail and only loads the actual `youtube-nocookie` iframe **after tap** — a "lite embed" that keeps the page fast on 4G.
- The YouTube ID is parsed from the pasted link; empty links show a neutral placeholder.
- Editing: [CONTENT_EDITING.md → Add a class video](../CONTENT_EDITING.md).
- `revalidate = 60`.
