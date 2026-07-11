# Contact form

**UI:** `components/sections/ContactForm.tsx` (client). **API:** `app/api/contact/route.ts` (POST).

## Flow

1. Visitor fills name, phone, course, message on `/contact`.
2. Form POSTs JSON to `/api/contact`.
3. The route:
   - Validates with **Zod**.
   - **Optionally** rate-limits by IP (5/hour) if Upstash env vars are set.
   - HTML-escapes inputs and **optionally** emails `CONTACT_EMAIL` via **Resend** if `RESEND_API_KEY` is set.
   - Returns `{ success: true }` or an error.
4. On success the form shows a confirmation state.

## Graceful by default

Email and rate-limiting are **optional** — without the env vars the endpoint still validates and returns success (so the form never errors in development). Add the keys to actually receive emails.

## Env vars

| Variable | Effect |
| --- | --- |
| `RESEND_API_KEY` | Enables sending emails |
| `CONTACT_EMAIL` | Destination inbox |
| `UPSTASH_REDIS_REST_URL` / `_TOKEN` | Enables rate limiting |

WhatsApp/Call are the primary, lowest-friction contact paths; the form is a secondary channel.
