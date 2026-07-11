# Bilingual (Hindi / English)

Powered by **next-intl**. Default locale is **Hindi** (`i18n/routing.ts`).

## How it works

- Routes are prefixed: `/hi/...` and `/en/...`. `middleware.ts` handles locale routing (excludes `/api`, `/studio`, `/_next`).
- UI strings + all fallback copy live in `messages/hi.json` and `messages/en.json`.
- The `LanguageToggle` (`components/layout/LanguageToggle.tsx`) swaps the locale segment in the URL.
- In the Hindi locale, `<body>` gets `font-hindi`, switching all fonts to **Mukta** so the Hinglish mix (Devanagari + English words) looks uniform (`app/globals.css`).

## Hinglish, on purpose

The Hindi copy is intentionally **Hinglish** (e.g. "अभी Call करें", "Hindi Medium Students के लिए"), because that reads as natural to the Ambikapur / Tier-3 audience while staying credible pan-India.

## Sanity content is bilingual too

CMS fields use `localizedString` / `localizedText` objects with `en` and `hi`. Components call `pick(value, locale, fallback)` (`sanity/lib/fetch.ts`) to select the active language, falling back to the other language, then to the i18n default.

## Server vs client

- Async Server Components use `getTranslations()` / `getLocale()` from `next-intl/server`.
- Client Components use the `useTranslations()` hook.
