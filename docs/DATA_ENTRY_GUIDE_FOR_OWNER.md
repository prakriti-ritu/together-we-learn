# Entering Website Data — Full Guide

A field-by-field guide to everything you can add or edit on the website through Sanity Studio. Use this once [SETUP_GUIDE_FOR_OWNER.md](./SETUP_GUIDE_FOR_OWNER.md) has been completed (Sanity account created and connected).

---

## Before you start

1. Go to `your-website.com/studio` (or `localhost:3000/studio` if testing on a computer before the site is live).
2. Log in with your Sanity account.
3. On the left is a sidebar with 8 items — each one is covered below.
4. After filling in a form, always click **Publish** (top right) — changes appear on the live website within about **1 minute**.
5. **Fill both the English and Hindi boxes** wherever you see them — the website shows English or Hindi depending on the visitor's language choice. If you leave one blank, that language will show blank text in that spot.
6. Anything you don't fill in shows sensible default text automatically — the site never looks broken or empty.
7. Keep photos under about **2 MB** each so pages load quickly.

There are two kinds of sidebar items:
- **Single items** (Site Settings, About Teacher) — there is only ever *one* of these. You open it and edit it directly.
- **List items** (Course, Review, Gallery Image, Class Video, Expert Session, FAQ) — you can add as many as you like. Click the **+** button to create a new one.

---

## 1. Site Settings *(single item)*

Controls the header, hero section, and contact buttons across the whole site.

| Field | What to enter |
| --- | --- |
| **Logo** | Upload your logo image (optional). |
| **Phone Number** | The number that opens when someone taps "Call" — digits only, e.g. `917247400000`. |
| **WhatsApp Number** | The number that opens WhatsApp chat — digits only, e.g. `917247400000`. |
| **Email** | Your contact email address. |
| **Instagram URL** | Full link to your Instagram profile, e.g. `https://instagram.com/yourhandle`. |
| **Hero Headline** | The big heading at the top of the homepage (English + Hindi). |
| **Hero Subheadline** | The smaller line under the headline (English + Hindi). |
| **Hero Description** | A short paragraph under that (English + Hindi). |
| **Hero Image (Teacher Photo)** | The photo shown in the homepage banner. |
| **Trust Strip Stats** | The row of small stats (e.g. "500+ Students Taught"). Click **+** to add each one: a **Label** (English + Hindi) and a **Value** (e.g. `500+`). Add as many stat boxes as you want. |

---

## 2. About Teacher *(single item)*

Controls the "About" section that introduces you.

| Field | What to enter |
| --- | --- |
| **Teacher Photo** | Your profile photo. |
| **Bio** | Your introduction paragraph, written once in English and once in Hindi. |
| **Credentials** | The small qualification badges (e.g. `M.A. English (Gold Medalist)`, `CG SET Qualified`). Click **+** to add each badge as its own English + Hindi entry; add or remove as many as you like. |

---

## 3. Course *(list — click + to add one)*

Each entry is one course card shown on the site.

| Field | What to enter |
| --- | --- |
| **Title** | Course name (English + Hindi). *Required.* |
| **Duration** | e.g. "3 Months" (English + Hindi). |
| **Description** | A short paragraph about the course (English + Hindi). |
| **Features** | The bullet-point list shown on the card. Click **+** to add each point as its own English + Hindi entry. |
| **Is Most Popular?** | Turn this on for the one course card you want visually highlighted. |
| **Display Order** | A number — lower numbers show first (e.g. `1`, `2`, `3`). |

---

## 4. Review *(list — click + to add one)*

Each entry is one student testimonial.

| Field | What to enter |
| --- | --- |
| **Student Name** | *Required.* |
| **City** | Where the student is from. |
| **Rating (1–5)** | A number from 1 to 5 stars. *Required.* |
| **Review Text** | The testimonial itself (English + Hindi). |
| **Student Photo** | Optional photo of the student. |
| **Date** | The date of the review. |

Newest reviews show first automatically.

---

## 5. Gallery Image *(list — click + to add one)*

Each entry is one photo in the class-photos gallery.

| Field | What to enter |
| --- | --- |
| **Image** | Upload the photo. *Required.* |
| **Caption** | Short caption under the photo (English + Hindi). |
| **Display Order** | A number — lower numbers show first. |

---

## 6. Class Video *(list — click + to add one)*

Each entry is one YouTube video embedded on the site.

| Field | What to enter |
| --- | --- |
| **Title** | Video title (English + Hindi). *Required.* |
| **YouTube URL** | Paste the full YouTube link. *Required.* |
| **Custom Thumbnail** | Optional — upload your own thumbnail image instead of YouTube's default. |

---

## 7. Expert Session *(list — click + to add one)*

Each entry is one guest-speaker/expert session card.

| Field | What to enter |
| --- | --- |
| **Title** | Session title (English + Hindi). *Required.* |
| **Description** | What the session is about (English + Hindi). |
| **Date** | Date of the session. |
| **Speaker Name** | Plain text, one language only. |
| **Speaker Photo** | Photo of the speaker. |
| **Video URL (YouTube)** | Optional recording link. |

---

## 8. FAQ *(list — click + to add one)*

Each entry is one question-and-answer pair.

| Field | What to enter |
| --- | --- |
| **Question** | (English + Hindi). *Required.* |
| **Answer** | (English + Hindi). *Required.* |
| **Display Order** | A number — lower numbers show first. |

---

## Quick reference: what's on the site vs. what you're editing

| You edit in Studio | Shows up on the website as |
| --- | --- |
| Site Settings | Header, hero banner, trust stats, call/WhatsApp buttons |
| About Teacher | "About" section |
| Course | Course cards section |
| Review | Student testimonials section |
| Gallery Image | Photo gallery |
| Class Video | Class videos section |
| Expert Session | Expert sessions section |
| FAQ | Frequently asked questions section |

## Not editable through Studio

- The Contact form itself and its fields (name/phone/course/message) — that's part of the website's code, not content.
- The practice-game words/sentences (if the site has games) — those are fixed in code.
- Anything not listed above — ask your developer.
