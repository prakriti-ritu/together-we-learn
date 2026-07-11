# Contact page

**Route:** `/[locale]/contact` → `app/[locale]/contact/page.tsx`

- Three contact-method cards (Phone, WhatsApp, Email) built from `getContact()` — values come from Sanity Site Settings, then env vars, then defaults in `lib/site.ts`.
- Below them, `sections/ContactForm.tsx` (client) posts to `app/api/contact/route.ts`.
- The form validates with Zod, optionally rate-limits via Upstash, optionally emails via Resend, and shows a success state. See [features/contact-form.md](../features/contact-form.md).
