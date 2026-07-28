# Content Publishing & Live Updates

How content edited in Sanity Studio reaches the live website — for the **business team** (everyday use) and the **developer** (one-time setup).

---

## How updates work (the short version)

To keep Sanity API usage low, the site **caches all Sanity content on the server for up to 1 day** (`revalidate = 86400`). So a published change appears on the live site:

- **Within ~30 seconds** — *if* the revalidation webhook is set up (recommended, one-time developer task below).
- **Within 24 hours** — if the webhook is **not** set up (automatic fallback).

The mechanism: every Sanity query is tagged `"sanity"` in Next.js's data cache (`sanity/lib/fetch.ts`). Publishing in Studio fires a webhook to `/api/revalidate`, which calls `revalidateTag("sanity", { expire: 0 })` + `revalidatePath("/", "layout")` to purge the cache instantly.

---

## For the business team — every time (no technical steps)

1. Open **https://together-we-learn.vercel.app/studio**
2. Log in (same account each time).
3. Click what you want to change — Reviews, Gallery, Courses, Site Settings, About Teacher, etc.
4. Edit the text or photo.
5. Click the blue **Publish** button.
6. Wait ~30 seconds, refresh the website → your change is live. ✅

That's the whole process. No code, no Vercel, no redeploy — just **edit → Publish**.

> If a change isn't showing after a minute, hard-refresh the page (Ctrl/Cmd + Shift + R). If it still doesn't show, the webhook may not be set up — see the developer section.

---

## For the developer — one-time webhook setup (~5 min)

This makes "Publish → live in ~30s" work. Do it **once**.

### 1. Add a secret to Vercel
Generate a random secret (don't reuse this example):
```bash
python3 -c "import secrets; print('acarrier_'+secrets.token_hex(16))"
```
Vercel → project → **Settings → Environment Variables**:
- **Key:** `REVALIDATE_SECRET`
- **Value:** *(the generated secret)*
- **Environments:** tick **Production**
- **Save.**

### 2. Redeploy
Vercel → **Deployments** → ⋯ on the latest → **Redeploy** (uncheck "use existing build cache"). Server-only env vars take effect on the next deploy.

### 3. Create the Sanity webhook
[manage.sanity.io](https://manage.sanity.io) → project `6jjcexcm` → **API → Webhooks → Create webhook**:
- **Name:** `Revalidate live site`
- **URL:** `https://together-we-learn.vercel.app/api/revalidate?secret=YOUR_SECRET`
- **Dataset:** `production`
- **Trigger on:** Create, Update, Delete
- **HTTP method:** `POST`
- **Enable webhook:** ON
- Leave Filter / Projection / the Sanity "Secret" field blank (the secret is in the URL).
- **Save.**

### 4. Verify
```bash
curl -X POST "https://together-we-learn.vercel.app/api/revalidate?secret=YOUR_SECRET"
# → {"revalidated":true,"now":...}
```
Then publish any change in Studio and confirm it appears within ~30s.

### Security
- The secret lives **only** in Vercel env + the Sanity webhook URL. Never commit it.
- If it leaks, generate a new one and update both the Vercel env var and the webhook URL.

---

## Relevant code
- `sanity/lib/fetch.ts` — `safe()` wraps every query with `{ next: { revalidate: 86400, tags: ["sanity"] } }`.
- `sanity/lib/client.ts` — `useCdn: false` (Next's data cache handles caching/revalidation).
- `app/api/revalidate/route.ts` — secret-protected endpoint: `revalidateTag("sanity", { expire: 0 })` + `revalidatePath("/", "layout")`.

## Troubleshooting
| Symptom | Cause | Fix |
|---|---|---|
| Edits take up to a day | Webhook not set up | Do the developer setup above |
| `curl` test returns 401 | Wrong/missing secret, or not redeployed after adding env | Re-check the secret matches in both places; redeploy |
| Webhook fires but no change | CDN/browser cache | Hard-refresh; confirm you clicked **Publish** (not just saved a draft) |
| Nothing updates ever | `NEXT_PUBLIC_SITE_URL` or deploy issue | See `docs/DEPLOYMENT.md` |
