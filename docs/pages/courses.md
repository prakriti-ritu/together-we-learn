# Courses page

**Route:** `/[locale]/courses` → `app/[locale]/courses/page.tsx` (wraps `sections/CoursesSection.tsx`)

- **Content:** Sanity `course` documents (ordered by `order`), falling back to three seeded courses in i18n `courses` (`course1`, `course3`, `courseAdv`).
- The card marked **Is Most Popular?** in Sanity (or `course3` in the fallback) renders as the highlighted navy card.
- Each card's **Enquire on WhatsApp** button is a `wa.me` deep link pre-filled with the course name; the number comes from `getContact()` (Site Settings → env → default).
- Editing: [CONTENT_EDITING.md → Add / edit a course](../CONTENT_EDITING.md).
- `revalidate = 60`.
