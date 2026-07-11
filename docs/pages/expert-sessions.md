# Expert Sessions page

**Route:** `/[locale]/expert-sessions` → `app/[locale]/expert-sessions/page.tsx`

- **Content:** Sanity `expertSession` documents (newest first), falling back to 3 seed sessions.
- Each card shows date, localized title/description, and a speaker (photo or initials avatar).
- The homepage shows the first 3 as a teaser (`sections/ExpertSessionsSection.tsx`).
- Editing: [CONTENT_EDITING.md → Add an expert session](../CONTENT_EDITING.md).
- `revalidate = 60`.
