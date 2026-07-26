# A Carrier to Career

Website for **A Carrier to Career** — a spoken-English coaching academy (Ambikapur, Chhattisgarh). Bilingual (English / Hindi), content-managed, and built to run and look complete even before any accounts are set up.

**Tech stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · next-intl (EN/HI) · Sanity CMS (embedded Studio) · optional Resend (emails) + Upstash Redis (rate-limiting).

---

## Getting started

### 1. Prerequisites
- Node.js 18.18+ (Node 20+ recommended)
- npm

### 2. Install dependencies
Run this **inside the project folder** (`career-to-career/`) so `node_modules` lands here, not in a parent directory:

```bash
npm install
```

> If `npm run dev` ever fails with *"couldn't find the Next.js package"*, it means dependencies were installed in the wrong folder. Delete the stray `node_modules` and re-run `npm install` from the project root.

### 3. Set up environment variables
Create a `.env.local` file in the project root. All values are optional — anything left blank simply disables that one feature and the site falls back to built-in content.

```bash
# --- Sanity (content editor) ---
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=                 # only needed for drafts/private data

# --- Site ---
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_PHONE=
NEXT_PUBLIC_WHATSAPP=
NEXT_PUBLIC_INSTAGRAM=
NEXT_PUBLIC_YOUTUBE=

# --- Resend (contact-form emails, optional) ---
RESEND_API_KEY=
CONTACT_EMAIL=

# --- Upstash Redis (contact-form spam limit, optional) ---
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

For step-by-step signup + setup of each service (all free), see **[docs/SETUP_GUIDE_FOR_OWNER.md](docs/SETUP_GUIDE_FOR_OWNER.md)**.

### 4. Run the dev server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000). The site auto-updates as you edit files.

### Scripts
| Command | What it does |
| --- | --- |
| `npm run dev` | Start the local dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

---

## Editing website content (no code)

All visible content — reviews, courses, gallery photos, class videos, teacher bio, FAQ, phone/WhatsApp, hero text — is edited through the **Sanity Studio** built into the site:

1. Connect a Sanity project (see the setup guide above).
2. Go to **`/studio`** (e.g. `http://localhost:3000/studio`) and log in.
3. Edit content in the sidebar and click **Publish** — changes appear on the site within ~1 minute.

Field-by-field instructions for every content type are in **[docs/DATA_ENTRY_GUIDE_FOR_OWNER.md](docs/DATA_ENTRY_GUIDE_FOR_OWNER.md)**. Day-to-day editing tips (bilingual) are in [docs/CONTENT_EDITING.md](docs/CONTENT_EDITING.md).

> Content flows **one way**: Studio → website. The site only *reads* from Sanity; nothing is written back to it programmatically. Anything you leave empty shows sensible default text, so the site never looks broken.

---

## How the data layer works (for developers)

- **Schemas** define what can be edited — [sanity/schemas/](sanity/schemas/) (e.g. `course.ts`, `review.ts`, `siteSettings.ts`). These generate the Studio forms.
- **Queries** (GROQ) select the data — [sanity/lib/queries.ts](sanity/lib/queries.ts).
- **Fetchers** run the queries safely — [sanity/lib/fetch.ts](sanity/lib/fetch.ts). Every fetcher is wrapped so it returns a fallback (never throws) if Sanity is unconfigured or empty.
- **Components** call the fetchers, e.g. [components/sections/CoursesSection.tsx](components/sections/CoursesSection.tsx).

To add a **new kind** of content: add a schema in `sanity/schemas/`, register it, add a query + fetcher, then render it in a component. To add new *entries* of an existing kind, just use `/studio` — no code needed.

---

## Contact form

The only backend route is [app/api/contact/route.ts](app/api/contact/route.ts). On submit it:
1. Validates input with `zod`,
2. Optionally rate-limits by IP (3/hour) via Upstash if configured,
3. Optionally emails the submission to `CONTACT_EMAIL` via Resend if configured.

It does **not** store submissions in a database — messages are only emailed. See [docs/features/contact-form.md](docs/features/contact-form.md).

---

## Project structure

```
app/[locale]/       Localized pages (en / hi) — home, courses, reviews, etc.
app/api/contact/    Contact-form API route
app/studio/         Embedded Sanity Studio (/studio)
components/         UI primitives, sections, games, layout, SEO
sanity/            Schemas + client/query/fetch helpers
messages/          en.json / hi.json translation strings
lib/               Site constants (lib/site.ts), fonts
docs/              Owner guides + feature/architecture docs
```

---

## Deployment (Vercel)

1. Push the repo to GitHub.
2. Import it in Vercel (framework auto-detected as Next.js).
3. Add **all** the `.env.local` variables under **Settings → Environment Variables** — local values do **not** carry over automatically. Set `NEXT_PUBLIC_SITE_URL` to your live URL.
4. Deploy, then add your live URL to Sanity's **CORS origins** (API settings).

Details in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

---

## Documentation index

| Doc | For |
| --- | --- |
| [docs/SETUP_GUIDE_FOR_OWNER.md](docs/SETUP_GUIDE_FOR_OWNER.md) | Non-technical: create & connect all accounts (Sanity, Vercel, Resend, Upstash) |
| [docs/DATA_ENTRY_GUIDE_FOR_OWNER.md](docs/DATA_ENTRY_GUIDE_FOR_OWNER.md) | Non-technical: add/edit every type of content |
| [docs/CONTENT_EDITING.md](docs/CONTENT_EDITING.md) | Bilingual day-to-day editing tips |
| [docs/ACCOUNTS_SETUP.md](docs/ACCOUNTS_SETUP.md) | Full account reference + env var table |
| [docs/SANITY_SETUP.md](docs/SANITY_SETUP.md) | Sanity project setup from zero |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Hosting & deploy notes |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | How the codebase fits together |
| [docs/SEO_CHECKLIST.md](docs/SEO_CHECKLIST.md) | SEO status & post-launch tasks |
| [docs/features/](docs/features/) | Per-feature deep dives (i18n, images, games, animations, etc.) |

> **Note:** This project pins a specific Next.js version with its own conventions. Before changing framework-level code, check the bundled docs in `node_modules/next/dist/docs/` (see [AGENTS.md](AGENTS.md)).
