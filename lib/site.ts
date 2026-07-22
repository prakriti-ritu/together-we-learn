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

/** `tel:` href from a display phone number (strips spaces). */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

/** `wa.me` href with an optional prefilled message. */
export function waHref(whatsapp: string, text?: string): string {
  const base = `https://wa.me/${whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
