# SEO Action Items — A Carrier to Career

**The situation (why your coaching isn't in Google):**
Your website is well-built for SEO, but it is **not yet in Google's index** (a `site:together-we-learn.vercel.app` search returns nothing), and you have **no Google Business Profile**. Those two off-page gaps — not any website bug — are why nothing shows up. Fixing them is what this document is for.

**Good news:** your local competitors (e.g. CDC Spoken English Ambikapur) rank only via directories + Facebook, have **no reviews**, and no modern website. Your site is already better. A verified Google Business Profile + a few real reviews + the same directory listings they use should let you outrank them.

---

## ✅ Done in code (already handled by the developer)
- Clean `robots.txt` (nothing blocks Google) and a valid `sitemap.xml` (both languages).
- Rich structured data: LocalBusiness (address, map coordinates, hours, area served), FAQ, Course, Reviews, Breadcrumbs.
- **Added:** `logo` + `image` to the business schema (helps the Google knowledge panel).
- **Fixed:** sitemap dates (was claiming every page changed "today" on every load).
- **Added:** a Google Search Console verification hook — ready for your token (see Task 2).

---

## 🔴 TASK 1 — Google Business Profile (do this FIRST — biggest impact)
This is what creates the "coaching details" box (map pin, hours, photos, reviews, call button) in Google.

**Steps:**
1. Go to **https://business.google.com** → sign in with the Gmail you want to own this.
2. Click **Add your business** → enter the exact values below.
3. Choose verification (usually **phone/SMS** or **postcard**). Complete it — the profile only goes live after verification.
4. Fill the profile 100% (Google favours complete profiles). Add 8–10 real photos (classroom/online session screenshots, the teacher, certificates, the gold medal).

**Exact values to enter:**
| Field | Value |
|---|---|
| Business name | **A Carrier to Career – Spoken English Academy** *(keep this exact wording everywhere)* |
| Primary category | **Language school** |
| Extra categories | **Coaching center**, **English language school** |
| Service area | **Ambikapur** (+ Raipur, Bilaspur, Korba, and "Online across Chhattisgarh & India") |
| Address | Your Ambikapur address (or set as a **service-area business** if you teach online/from home and don't want a public address) |
| Phone | *(your business number — the same one on the website)* |
| Website | https://together-we-learn.vercel.app |
| Hours | Mon–Sat, 9:00 AM – 6:00 PM |
| Description | *See template below* |

**Description (paste, then tweak):**
> A Carrier to Career is a spoken English academy in Ambikapur, Chhattisgarh, offering live online English speaking courses for Hindi-medium students, working professionals, and beginners. Taught by Prakriti Keshri — M.A. English (Gold Medalist), CG SET qualified, and college faculty. 1-month and 3-month courses, small batches, certificate on completion. Book a free demo class.

---

## 🔴 TASK 2 — Google Search Console (this is the direct fix for "not in Google")
1. Go to **https://search.google.com/search-console** → **Add property** → choose **URL prefix** → enter `https://together-we-learn.vercel.app`.
2. Choose the **HTML tag** verification method. Google shows a tag like:
   `<meta name="google-site-verification" content="XXXXXXXXXXXX" />`
   **Copy only the `content` value** (`XXXXXXXXXXXX`).
3. In Vercel → your project → **Settings → Environment Variables**, add:
   `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION = XXXXXXXXXXXX` → **Redeploy**.
   *(The code already reads this env var and outputs the tag — no code change needed from you.)*
4. Back in Search Console, click **Verify**.
5. Once verified: **Sitemaps** → submit `sitemap.xml`.
6. **URL Inspection** → paste the homepage URL → **Request Indexing**. Repeat for `/en` and `/hi`.

Within a few days, `site:together-we-learn.vercel.app` should start returning your pages.

---

## 🟠 TASK 3 — Directory listings (how locals actually search)
Create a **free listing** on each, using the **exact same** Name / Address / Phone (NAP) as your Google Business Profile — consistency is what builds trust. These are the same sites your competitors rank through:

- [ ] **JustDial** — https://www.justdial.com (free listing)
- [ ] **Sulekha** — https://www.sulekha.com
- [ ] **IndiaMART** — https://www.indiamart.com
- [ ] **IndiaOnline** — https://www.indiaonline.in
- [ ] **Facebook Page** — create one, add the website + WhatsApp
- [ ] **Instagram** — business profile, link in bio to the website

After creating them, tell the developer the profile URLs — they'll add them to the site's schema (`sameAs`) to further strengthen your Google entity.

---

## 🟠 TASK 4 — Get 5–10 Google reviews (biggest ranking factor, and where rivals are weak)
Once your Google Business Profile is verified, Google gives you a short review link (Profile → **Ask for reviews**). Send it to past/current students on WhatsApp.

**Message template (English):**
> Hi! If you enjoyed the spoken English classes, it would mean a lot if you could leave a quick Google review 🙏 It helps other students find us. Here's the link: [your Google review link]

**Message template (Hindi):**
> नमस्ते! अगर आपको हमारी स्पोकन इंग्लिश क्लास अच्छी लगी हो, तो कृपया एक छोटा-सा Google रिव्यू ज़रूर दें 🙏 इससे बाकी छात्रों को हमें ढूंढने में मदद मिलती है। लिंक: [your Google review link]

Aim for a few reviews in the first couple of weeks, then a steady trickle.

---

## 🟡 TASK 5 — Recommended: a custom domain
A free `.vercel.app` subdomain works, but a branded custom domain (e.g. **acarriertocareer.com**) is far stronger for local trust, brand searches, and Google Business Profile. ~₹700–1000/year.
- Buy from any registrar (GoDaddy, Namecheap, Hostinger).
- Vercel → project → **Settings → Domains** → add it → follow the DNS steps.
- Then update `NEXT_PUBLIC_SITE_URL` and re-verify in Search Console.
- Ask the developer for help connecting it.

---

## 🟡 TASK 6 — Brand-name consistency (minor but useful)
"A **Carrier** to Career" uses "Carrier" (vs the usual spelling "Career"). Google auto-corrects it and mixes it with other "Career" businesses. No need to rename — just **always** pair it with a clear descriptor everywhere (GBP, directories, site): *"A Carrier to Career – Spoken English Academy, Ambikapur."* That makes your business unambiguous to Google.

---

## How to know it's working (watch these, no re-audit needed)
- **Google Search Console → Impressions** rising from zero = you're now appearing in search.
- **Google Business Profile → profile views / calls / direction requests** = local visibility working.
- A `site:together-we-learn.vercel.app` search returning your pages = indexed.
- Searching **"spoken English classes Ambikapur"** eventually shows your business in the map results.
