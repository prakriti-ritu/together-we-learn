# Sanity Setup — from zero

Sanity is the free content system that lets the tutor edit the website (reviews, photos, videos, courses, teacher bio, etc.) **without a developer**. The editing screen ("Studio") is built into this site at `/studio`.

You only do this setup **once**. After that, see [CONTENT_EDITING.md](./CONTENT_EDITING.md) for day-to-day editing.

---

## Step 1 — Create a Sanity account (free)

1. Go to <https://www.sanity.io> and click **Get started / Sign up**.
2. Sign in with Google or GitHub (easiest) or email.
3. This is free — the free plan is more than enough for this website.

## Step 2 — Create a project

1. In the Sanity dashboard (<https://www.sanity.io/manage>) click **Create new project**.
2. Name it `A Carrier to Career`.
3. When asked about a dataset, keep the default named **`production`**.
4. After it's created, open the project and copy the **Project ID** (a short code like `abcd1234`). You'll need it in Step 4.

## Step 3 — Make the dataset readable by the website

The website reads content publicly (fast, no login needed for visitors).

1. In the project, go to **Datasets**.
2. Make sure the `production` dataset's visibility is **Public**.
   - Public = anyone can *read* published content (this is what the website needs). Only logged-in editors can *change* it.

## Step 4 — Connect the website to your project

The site reads its Sanity settings from environment variables. Create a file named `.env.local` in the project root (copy from `.env.local.example`) and fill in:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-from-step-2
NEXT_PUBLIC_SANITY_DATASET=production
```

> There is a temporary fallback project id in `sanity/env.ts`. **Replace it** by setting `NEXT_PUBLIC_SANITY_PROJECT_ID` to your own id (env var wins over the fallback). On Vercel, add the same variables under **Project → Settings → Environment Variables**, then redeploy.

## Step 5 — Allow the Studio to talk to your project (CORS)

The Studio runs at your website address (e.g. `https://yoursite.com/studio` and `http://localhost:3000/studio` during development).

1. In the Sanity dashboard: **API → CORS origins → Add CORS origin**.
2. Add each address you'll use, **with credentials allowed**:
   - `http://localhost:3000`
   - `https://your-live-domain.com`
3. Save.

## Step 6 — Open the Studio and log in

1. Run the site (`npm run dev`) or open the live site.
2. Visit `/studio` (e.g. `http://localhost:3000/studio`).
3. Log in with the **same Sanity account** from Step 1. You're in — this is where content is edited.

## Step 7 — Create the two "single" documents

Two things are one-of-a-kind and should be created once:

1. In the Studio sidebar, click **Site Settings** → fill in phone, WhatsApp number, email, Instagram, and (optionally) the hero text and hero image → **Publish**.
2. Click **About Teacher** → add Prakriti Ma'am's photo, bio (English + Hindi), and credentials → **Publish**.

Everything else (Courses, Reviews, Gallery, Videos, Expert Sessions, FAQ) is a list you add items to whenever you like.

---

## Do I need an API token?

**No — not for the public website.** Reading published content from a public dataset needs no token.

You would only add a `SANITY_API_TOKEN` if you later want to read *drafts* or *private* data on the server. If so: **API → Tokens → Add token → Viewer**, then set `SANITY_API_TOKEN=...` in `.env.local`.

## What if I skip all of this?

The website still works and looks complete — every section falls back to built-in text and placeholder tiles (see [ARCHITECTURE.md → Content fallback model](./ARCHITECTURE.md#content-fallback-model)). Sanity just lets the tutor replace that placeholder content with the real thing. Set it up whenever you're ready.

## Environment variables reference

| Variable | Needed? | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes (for CMS) | Your Sanity project id |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes (for CMS) | Usually `production` |
| `SANITY_API_TOKEN` | Optional | Only for reading drafts/private data |
| `RESEND_API_KEY` | Optional | Enables contact-form emails ([contact-form.md](./features/contact-form.md)) |
| `CONTACT_EMAIL` | Optional | Where contact-form messages are sent |
| `NEXT_PUBLIC_PHONE` / `NEXT_PUBLIC_WHATSAPP` | Optional | Contact defaults if not set in Studio |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical site URL (SEO, sitemap) |
| `UPSTASH_REDIS_REST_URL` / `_TOKEN` | Optional | Rate-limits the contact form |
