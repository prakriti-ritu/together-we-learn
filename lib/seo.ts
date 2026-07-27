import type { Metadata } from "next";

/**
 * Shared per-page metadata builder so every route gets a self-canonical URL,
 * hreflang alternates (en / hi / x-default), a brand+location title, and
 * OpenGraph/Twitter tags — not just the homepage. Relative URLs resolve against
 * `metadataBase` set in the locale layout.
 */
const BRAND = "A Carrier to Career";
const LOCATION = "Ambikapur";

interface PageMetaArgs {
  locale: string;
  /** Route path after the locale, e.g. "/courses". Use "" for the homepage. */
  path: string;
  /** The page's own title (e.g. the section heading). */
  title: string;
  description?: string;
}

export function pageMetadata({
  locale,
  path,
  title,
  description,
}: PageMetaArgs): Metadata {
  const fullTitle = `${title} | ${BRAND} — ${LOCATION}`;
  const ogTitle = `${title} | ${BRAND}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        en: `/en${path}`,
        hi: `/hi${path}`,
        "x-default": `/en${path}`,
      },
    },
    openGraph: {
      title: ogTitle,
      description,
      type: "website",
      locale: locale === "hi" ? "hi_IN" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
  };
}
