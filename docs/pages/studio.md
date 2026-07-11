# Studio (CMS) page

**Route:** `/studio/[[...tool]]` → `app/studio/[[...tool]]/page.tsx`

- The embedded **Sanity Studio** — the content editing screen for the tutor. It is NOT localized and is excluded from the i18n middleware, `robots.txt`, and the sitemap.
- Configured by `sanity.config.ts` (schemas from `sanity/schemas/`, plus `structureTool` and `visionTool`).
- Access requires logging in with a Sanity account that has access to the project.
- Setup: [SANITY_SETUP.md](../SANITY_SETUP.md). Daily use: [CONTENT_EDITING.md](../CONTENT_EDITING.md).
