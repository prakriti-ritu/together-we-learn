# Deployment Guide - A Carrier to Career

## Prerequisites
- GitHub account (free)
- Vercel account (free hobby tier) — sign up at vercel.com
- Sanity account (free) — sign up at sanity.io

## Step 1: Push to GitHub

1. Create a new repository on GitHub (e.g., `together-we-learn`)
2. Push the code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/together-we-learn.git
git branch -M main
git push -u origin main
```

## Step 2: Set Up Sanity

1. Go to https://sanity.io/manage
2. Your project ID is: `lc6us2t9`
3. Add `togetherwelearn.vercel.app` to CORS origins:
   - Go to Project Settings > API > CORS Origins
   - Add `https://togetherwelearn.vercel.app` with credentials enabled
   - Also add `http://localhost:3000` for local development

## Step 3: Get API Keys

### Resend (Email)
1. Sign up at https://resend.com
2. Go to API Keys > Create API Key
3. Copy the key (starts with `re_`)

### Cloudflare Turnstile (Anti-spam)
1. Go to https://dash.cloudflare.com > Turnstile
2. Add a new site
3. Set domain to `togetherwelearn.vercel.app`
4. Choose "Managed" widget type
5. Copy Site Key and Secret Key

### Upstash Redis (Rate Limiting)
1. Sign up at https://upstash.com
2. Create a new Redis database (free tier)
3. Copy REST URL and REST Token

## Step 4: Deploy to Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Framework: Next.js (auto-detected)
4. Add Environment Variables:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=lc6us2t9
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=(from Sanity if needed)
   RESEND_API_KEY=(from Resend)
   CONTACT_EMAIL=prakriti@gmail.com
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=(from Cloudflare)
   TURNSTILE_SECRET_KEY=(from Cloudflare)
   UPSTASH_REDIS_REST_URL=(from Upstash)
   UPSTASH_REDIS_REST_TOKEN=(from Upstash)
   NEXT_PUBLIC_SITE_URL=https://togetherwelearn.vercel.app
   NEXT_PUBLIC_PHONE=+917247400000
   NEXT_PUBLIC_WHATSAPP=917247400000
   ```
5. Click Deploy

## Step 5: Verify

1. Visit `https://togetherwelearn.vercel.app`
2. Check Sanity Studio at `https://togetherwelearn.vercel.app/studio`
3. Test contact form
4. Test WhatsApp and Call buttons
5. Test language toggle (EN/HI)

## Step 6: Google Search Console

1. Go to https://search.google.com/search-console
2. Add property: `https://togetherwelearn.vercel.app`
3. Verify via HTML tag or DNS
4. Submit sitemap: `https://togetherwelearn.vercel.app/sitemap.xml`
