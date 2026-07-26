# Accounts & Services Setup — from zero

You have **not created any accounts yet** — this page lists every account this website can use, whether it's required, and exactly how to create each and where to put its keys. Do them in the order below.

> **Good news:** the website already **runs and looks complete with zero accounts** — every section falls back to built-in text and placeholders (see [ARCHITECTURE.md → Content fallback model](./ARCHITECTURE.md#content-fallback-model)). Accounts unlock: the tutor editing content, going live on the internet, and receiving contact-form emails.

## At a glance

| # | Service | Required? | Gives you | Cost |
| --- | --- | --- | --- | --- |
| 1 | **Sanity** | Recommended | Tutor edits content at `/studio` | Free |
| 2 | **Vercel** | Recommended | Hosting + deploy + analytics + a free URL | Free |
| 3 | **Domain registrar** | Optional | Your own domain (e.g. acarriertocareer.com) | Paid (~₹800/yr) |
| 4 | **Resend** | Optional | Contact-form messages emailed to you | Free tier |
| 5 | **Upstash Redis** | Optional | Spam/rate-limit protection on the form | Free tier |
| — | Cloudflare Turnstile | Not used yet | (Keys exist in the example env but are **not wired in code**; skip unless a developer implements it) | — |

You can launch with just **#1 + #2**. Add #4/#5 later.

---

## 1. Sanity — the content editor (recommended)

Lets Prakriti Ma'am change reviews, photos, videos, courses, bio, phone number, etc. without a developer.

Full step-by-step is in **[SANITY_SETUP.md](./SANITY_SETUP.md)**. In short:

1. Sign up at <https://www.sanity.io> (Google/GitHub/email — free).
2. Create a project named `A Carrier to Career`, dataset `production`, visibility **Public**.
3. Copy the **Project ID**.
4. Add a CORS origin for your site (`http://localhost:3000` and your live URL), credentials allowed.
5. Put in `.env.local`: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET=production`.
6. Open `/studio`, log in, create **Site Settings** + **About Teacher**, then add content.

No API token needed for the public site.

---

## 2. Vercel — hosting & deployment (recommended)

Puts the site on the internet, rebuilds on every code push, and gives a free `*.vercel.app` URL. Also powers the built-in `@vercel/analytics`.

1. Create a free account at <https://vercel.com> (sign in with GitHub is easiest).
2. Push this project to a GitHub repository.
3. In Vercel: **Add New → Project → Import** that repository. Framework auto-detects as **Next.js**.
4. Under **Settings → Environment Variables**, add the same variables from your `.env.local` (see the template below). At minimum add the two Sanity variables and `NEXT_PUBLIC_SITE_URL`.
5. **Deploy.** You get a live URL. Add that URL to Sanity's CORS origins (step 1.4).

Detailed hosting notes: [DEPLOYMENT.md](./DEPLOYMENT.md).

---

## 3. Domain (optional)

1. Buy a domain from any registrar (GoDaddy, Namecheap, Hostinger, Google Domains, etc.).
2. In Vercel: **Project → Settings → Domains → Add**, then follow the DNS instructions the registrar/Vercel show you.
3. Update `NEXT_PUBLIC_SITE_URL` to `https://yourdomain.com` (env var) and redeploy, and add the domain to Sanity CORS.

---

## 4. Resend — contact-form emails (optional)

Without this, the contact form still works and shows "success" — it just won't email you. Add it to actually receive messages. (Call/WhatsApp remain the main contact channels regardless.)

1. Create a free account at <https://resend.com>.
2. **API Keys → Create API Key** → copy it.
3. (Recommended) **Domains → Add Domain** and add the DNS records so emails send from your own domain; otherwise use Resend's test sender.
4. Put in `.env.local`:
   - `RESEND_API_KEY=re_...`
   - `CONTACT_EMAIL=the-inbox-you-want-messages-at@example.com`
5. Add the same two variables in Vercel and redeploy.

More detail: [features/contact-form.md](./features/contact-form.md).

---

## 5. Upstash Redis — spam protection (optional)

Rate-limits the contact form to 3 submissions per hour per visitor. Only matters once you start getting spam.

1. Create a free account at <https://upstash.com>.
2. **Create Database** (Redis) → choose a nearby region.
3. From the database page, copy the **REST URL** and **REST TOKEN**.
4. Put in `.env.local`:
   - `UPSTASH_REDIS_REST_URL=https://...`
   - `UPSTASH_REDIS_REST_TOKEN=...`
5. Add the same in Vercel and redeploy.

---

## Full `.env.local` template

Create a file named `.env.local` in the project root (copy `.env.local.example`) and fill what you have. Anything left blank simply disables that optional feature.

```bash
# --- Sanity (service #1) ---
NEXT_PUBLIC_SANITY_PROJECT_ID=        # from Sanity project (required for CMS)
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=                     # leave blank (only for private/draft data)

# --- Site (service #2/#3) ---
NEXT_PUBLIC_SITE_URL=https://your-live-domain.com   # your Vercel/custom URL
NEXT_PUBLIC_PHONE=+917247400000       # fallback if not set in Sanity Site Settings
NEXT_PUBLIC_WHATSAPP=917247400000
NEXT_PUBLIC_INSTAGRAM=

# --- Resend contact emails (service #4, optional) ---
RESEND_API_KEY=
CONTACT_EMAIL=prakriti@example.com

# --- Upstash rate limiting (service #5, optional) ---
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

> Where values are used: Sanity vars → CMS; `NEXT_PUBLIC_*` phone/whatsapp → contact buttons (Sanity Site Settings overrides these); Resend/Upstash → contact form; `NEXT_PUBLIC_SITE_URL` → SEO/sitemap.

## Recommended order

1. Sanity (so the tutor can add real content) →
2. Vercel (so it's live) →
3. Custom domain (optional) →
4. Resend (so you get form emails) →
5. Upstash (only if spam appears).
