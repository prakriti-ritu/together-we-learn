import "server-only";
import { cache } from "react";
import type { SanityImageSource } from "@sanity/image-url";
import { SITE, type Contact } from "@/lib/site";
import { client } from "./client";
import {
  siteSettingsQuery,
  coursesQuery,
  reviewsQuery,
  galleryAllQuery,
  classVideosQuery,
  expertSessionsQuery,
  aboutTeacherQuery,
  faqQuery,
} from "./queries";

/**
 * Locale-aware Sanity content layer.
 *
 * Every fetcher is wrapped in `cache()` (deduped per request) and `safe()`
 * (never throws — returns the fallback if the project is missing/empty or the
 * network fails at build time). This is what lets the site render entirely from
 * the i18n JSON until the tutor adds content in Sanity Studio: no data → the
 * component's `useTranslations`/`getTranslations` fallback shows instead.
 */

export type Locale = "en" | "hi";

export interface LocalizedString {
  en?: string;
  hi?: string;
}

export type SanityImage = SanityImageSource & { asset?: { _ref?: string } };

export interface SiteSettings {
  logo?: SanityImage;
  phone?: string;
  whatsapp?: string;
  email?: string;
  instagram?: string;
  youtube?: string;
  heroHeadline?: LocalizedString;
  heroSubheadline?: LocalizedString;
  heroDescription?: LocalizedString;
  heroImage?: SanityImage;
  heroClipUrl?: string;
  achievementImage?: SanityImage;
  achievementHeading?: LocalizedString;
  achievementText?: LocalizedString;
  achievementCaption?: LocalizedString;
  heroStats?: { value?: string; label?: LocalizedString }[];
  trustStats?: { label?: LocalizedString; value?: string }[];
  aboutCourseHeading?: LocalizedString;
  aboutCourseText?: LocalizedString;
  whyChooseHeading?: LocalizedString;
  whyChoosePoints?: { title?: LocalizedString; description?: LocalizedString }[];
}

export interface Course {
  _id: string;
  title?: LocalizedString;
  duration?: LocalizedString;
  description?: LocalizedString;
  features?: LocalizedString[];
  isPopular?: boolean;
  order?: number;
}

export interface Review {
  _id: string;
  studentName?: string;
  city?: string;
  rating?: number;
  reviewText?: LocalizedString;
  photo?: SanityImage;
  date?: string;
}

export interface GalleryImage {
  _id: string;
  image?: SanityImage;
  caption?: LocalizedString;
  order?: number;
}

export interface ClassVideo {
  _id: string;
  title?: LocalizedString;
  youtubeUrl?: string;
  thumbnail?: SanityImage;
}

export interface ExpertSession {
  _id: string;
  title?: LocalizedString;
  description?: LocalizedString;
  date?: string;
  speaker?: string;
  photo?: SanityImage;
  videoUrl?: string;
}

export interface AboutTeacherDoc {
  photo?: SanityImage;
  bio?: LocalizedString;
  credentials?: LocalizedString[];
}

export interface Faq {
  _id: string;
  question?: LocalizedString;
  answer?: LocalizedString;
  order?: number;
}

/** Pick the right language off a localized object, falling back sensibly. */
export function pick(
  value: LocalizedString | undefined | null,
  locale: Locale,
  fallback = ""
): string {
  if (!value) return fallback;
  return value[locale] || value.en || value.hi || fallback;
}

/**
 * Run a Sanity query but never throw — return `fallback` on any failure.
 *
 * Results are stored in Next's data cache (revalidated once a day, tagged
 * "sanity") so repeated requests — e.g. refreshing a page — reuse the cached
 * response instead of re-hitting the Sanity API every time. Publishing content
 * purges the cache instantly via the `sanity` tag (see `/api/revalidate`).
 */
async function safe<T>(query: string, fallback: T): Promise<T> {
  try {
    return await client.fetch<T>(
      query,
      {},
      { next: { revalidate: 86400, tags: ["sanity"] } }
    );
  } catch {
    return fallback;
  }
}

export const getSiteSettings = cache(() =>
  safe<SiteSettings | null>(siteSettingsQuery, null)
);
export const getCourses = cache(() => safe<Course[]>(coursesQuery, []));
export const getReviews = cache(() => safe<Review[]>(reviewsQuery, []));
export const getGallery = cache(() => safe<GalleryImage[]>(galleryAllQuery, []));
export const getClassVideos = cache(() =>
  safe<ClassVideo[]>(classVideosQuery, [])
);
export const getExpertSessions = cache(() =>
  safe<ExpertSession[]>(expertSessionsQuery, [])
);
export const getAboutTeacher = cache(() =>
  safe<AboutTeacherDoc | null>(aboutTeacherQuery, null)
);
export const getFaqs = cache(() => safe<Faq[]>(faqQuery, []));

/** Contact details: Sanity Site Settings overriding the env/constant defaults. */
export const getContact = cache(async (): Promise<Contact> => {
  const s = await getSiteSettings();
  return {
    phone: s?.phone || SITE.phone,
    whatsapp: s?.whatsapp || SITE.whatsapp,
    email: s?.email || SITE.email,
    instagram: s?.instagram || SITE.instagram,
    youtube: s?.youtube || SITE.youtube,
  };
});
