# Website Setup Guide — Step by Step

A simple guide to get the website fully working. No coding knowledge needed.

**Good news:** the website already works and looks complete even with zero accounts — everything below just *unlocks extra features*. Do the steps in order. **Everything in this guide is free.**

---

## At a glance

| # | Service | What it gives you | Required? | Cost |
| --- | --- | --- | --- | --- |
| 1 | **Sanity** | You can edit content (reviews, photos, courses, etc.) yourself | Recommended | Free |
| 2 | **Vercel** | Puts the website live on the internet | Recommended | Free |
| 3 | **Resend** | Contact-form messages get emailed to you | Optional | Free |
| 4 | **Upstash** | Blocks spam on the contact form | Optional | Free |

You can start with just #1 and #2. Add #3 and #4 whenever you like.

---

## 1. Sanity — edit your website content

This lets you change reviews, photos, videos, courses, your bio, and phone number yourself — no developer needed.

**Sign up:**
1. Go to **https://www.sanity.io**
2. Click **Get started / Sign up**
3. Sign in with Google, GitHub, or your email — it's free either way

**Set up:**
1. Once logged in, click **Create new project**
2. Name it `A Carrier to Career`
3. When it asks about a dataset, leave the default name **`production`**
4. Open the project and copy the **Project ID** shown at the top (a short code like `abcd1234`) — save this somewhere, you'll need it
5. Go to **Datasets** and make sure `production` is set to **Public** (this lets visitors see the content; only you can log in and change it)
6. Go to **API → CORS origins → Add CORS origin** and add:
   - `http://localhost:3000`
   - your live website address once you have one (see Vercel section below) — you can come back and add this after step 2
   - tick **"Allow credentials"** for both
7. Give your Project ID to whoever is setting up the `.env.local` file (see the template near the bottom of this guide) — it goes into `NEXT_PUBLIC_SANITY_PROJECT_ID`

**Free tier:** generous free plan, more than enough for this website.

---

## 2. Vercel — put the website live on the internet

This hosts your website so anyone can visit it, and gives you a free web address.

**Sign up:**
1. Go to **https://vercel.com**
2. Click **Sign up** and choose the same account type your website's code is already stored under (GitHub/GitLab/email)

**Set up:**
1. Click **Add New → Project → Import** and select this website's project
2. Vercel automatically detects it's a Next.js website — no changes needed
3. Under **Settings → Environment Variables**, add the same values from your `.env.local` file (see template below) — at minimum the two Sanity values
4. Click **Deploy** — after a minute you'll get a live web address (like `yourname.vercel.app`)
5. Copy that address and add it to Sanity's CORS origins (step 6 above)

**Free tier:** free hosting plan is enough for this website, including analytics.

> Want your own domain name (like `acarriertocareer.com`) instead of the free `vercel.app` address? That's optional and costs about ₹800/year from any domain seller. See `DEPLOYMENT.md` for how to connect it — everything else in this guide works the same either way.

---

## 3. Resend — get contact-form messages by email (optional)

Without this, the contact form still works and shows "success" to visitors — you just won't get an email. Calls and WhatsApp still work regardless.

**Sign up:**
1. Go to **https://resend.com**
2. Create a free account

**Set up:**
1. Go to **API Keys → Create API Key** and copy the key it gives you (starts with `re_...`)
2. Give this key to whoever manages your `.env.local`/Vercel settings — it goes into `RESEND_API_KEY`
3. Also set `CONTACT_EMAIL` to the email address you want messages sent to
4. Add both values in Vercel too (**Settings → Environment Variables**) and redeploy

**Free tier:** free plan easily covers a contact form's worth of emails.

---

## 4. Upstash — stop spam on the contact form (optional)

This limits the contact form to 3 submissions per hour per visitor, so it can't be spammed. Only worth setting up if you start noticing spam.

**Sign up:**
1. Go to **https://upstash.com**
2. Create a free account

**Set up:**
1. Click **Create Database**, choose Redis, and pick a region close to you
2. On the database page, copy the **REST URL** and **REST TOKEN**
3. Give both to whoever manages your `.env.local`/Vercel settings — they go into `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
4. Add both values in Vercel too and redeploy

**Free tier:** free plan is far more than a contact form needs.

---

## The `.env.local` file (for whoever manages the settings)

Create a file named `.env.local` in the project folder and fill in whatever you have so far:

```bash
# --- Sanity (service #1) ---
NEXT_PUBLIC_SANITY_PROJECT_ID=        # from Sanity, step 4
NEXT_PUBLIC_SANITY_DATASET=production

# --- Site (service #2) ---
NEXT_PUBLIC_SITE_URL=https://your-live-domain.com   # your Vercel/custom address

# --- Resend (service #3, optional) ---
RESEND_API_KEY=
CONTACT_EMAIL=your-email@example.com

# --- Upstash (service #4, optional) ---
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

Leave anything blank if you're skipping that service for now — the site just disables that one feature and keeps working.

---

## How to add/edit content once Sanity is set up

1. Go to `your-website.com/studio` (or `localhost:3000/studio` while testing)
2. Log in with your Sanity account
3. Changes show up on the live site within about **1 minute** of clicking **Publish**

What you can add or edit from the sidebar:

| Sidebar item | What it controls |
| --- | --- |
| **Site Settings** | Phone, WhatsApp, email, Instagram, hero text/photo |
| **About Teacher** | Your photo, bio, credential badges |
| **Course** | Course cards — click **+** to add a new one |
| **Review** | Student reviews — click **+** to add a new one |
| **Gallery Image** | Class photos — click **+** to add a new one |
| **Class Video** | YouTube class videos — click **+** to add a new one |
| **Expert Session** | Guest/expert session cards — click **+** to add a new one |
| **FAQ** | Questions and answers — click **+** to add a new one |

For each item you add: fill in the fields (fill both English and Hindi text boxes where shown), then click **Publish**. Anything you leave empty just shows sensible default text — the site never looks broken.

**Note on the contact form:** messages submitted through the "Contact Us" form are **not** stored anywhere on the website — they're only emailed to you if Resend (service #3) is set up. If Resend isn't set up, calls and WhatsApp are your main way of hearing from visitors.

---

## Recommended order

1. Sanity (so you can add real content)
2. Vercel (so the site is live)
3. Resend (so you get form emails)
4. Upstash (only if spam becomes a problem)
