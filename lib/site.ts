/**
 * Single source of truth for contact details and brand constants.
 *
 * Defaults live here; they can be overridden by environment variables
 * (NEXT_PUBLIC_*) and, at runtime, by the "Site Settings" document in Sanity
 * (see `getContact()` in `sanity/lib/fetch.ts`). Safe to import from both
 * server and client components — it contains no server-only code.
 */
export const SITE = {
  brand: "A Carrier to Career",
  phone: process.env.NEXT_PUBLIC_PHONE || "",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "",
  email: process.env.CONTACT_EMAIL || "",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM || "",
  youtube: process.env.NEXT_PUBLIC_YOUTUBE || "",
  url: process.env.NEXT_PUBLIC_SITE_URL || "",
} as const;

export interface Contact {
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  youtube: string;
}

/** `tel:` href from a display phone number (keeps a leading +, drops everything else non-numeric). */
export function telHref(phone: string): string {
  const cleaned = phone.trim().replace(/[^\d+]/g, "");
  // Keep only a single leading "+" (some dialers choke on stray symbols/spaces).
  const normalized = cleaned.startsWith("+")
    ? "+" + cleaned.slice(1).replace(/\+/g, "")
    : cleaned.replace(/\+/g, "");
  return `tel:${normalized}`;
}

/** `wa.me` href with an optional prefilled message. wa.me needs digits only (no +, no spaces). */
export function waHref(whatsapp: string, text?: string): string {
  const digits = whatsapp.replace(/\D/g, "");
  const base = `https://wa.me/${digits}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
