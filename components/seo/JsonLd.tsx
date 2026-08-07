import { getTranslations } from "next-intl/server";
import { SITE } from "@/lib/site";
import { getFaqs, getReviews, getCourses, pick, type Locale } from "@/sanity/lib/fetch";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  // Escape `<` so no value (e.g. Sanity-authored FAQ text) can inject a closing
  // </script> tag and break out of the JSON-LD block. This is the standard
  // XSS-safe way to embed structured data — React can't render JSON as children.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

export async function HomePageJsonLd({ locale }: { locale: string }) {
  const isHindi = locale === "hi";
  // Social profiles strengthen entity trust (schema `sameAs`). Only include set ones.
  const sameAs = [SITE.instagram, SITE.youtube].filter(Boolean);

  const address = {
    "@type": "PostalAddress",
    addressLocality: "Ambikapur",
    addressRegion: "Chhattisgarh",
    addressCountry: "IN",
  };

  const educationalOrg = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "A Carrier to Career - Spoken English Academy",
    description: isHindi
      ? "अंबिकापुर, छत्तीसगढ़ में स्पोकन इंग्लिश कोर्स"
      : "Spoken English Classes in Ambikapur, Chhattisgarh",
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    ...(sameAs.length ? { sameAs } : {}),
    address,
    founder: {
      "@type": "Person",
      name: "Prakriti Keshri",
      jobTitle: "English Teacher",
      description: "SET-qualified College Faculty",
    },
  };

  // Sanity reviews only (not the code seed fallback shown when Sanity is
  // empty) — marking up placeholder/example testimonials as AggregateRating
  // would misrepresent them as real customer ratings.
  const sanityReviews = await getReviews();
  const aggregateRating =
    sanityReviews.length > 0
      ? {
          "@type": "AggregateRating",
          ratingValue: (
            sanityReviews.reduce((sum, r) => sum + (r.rating ?? 0), 0) /
            sanityReviews.length
          ).toFixed(1),
          reviewCount: String(sanityReviews.length),
          bestRating: "5",
        }
      : undefined;

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": SITE.url ? `${SITE.url}/#localbusiness` : undefined,
    name: "A Carrier to Career - Spoken English Academy",
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    ...(sameAs.length ? { sameAs } : {}),
    address,
    geo: {
      "@type": "GeoCoordinates",
      latitude: 23.1201,
      longitude: 83.1955,
    },
    // Ambikapur is the primary location; Raipur/Bilaspur/Korba are the
    // secondary cities the FAQ already states classes are open to.
    areaServed: ["Ambikapur", "Raipur", "Bilaspur", "Korba", "Chhattisgarh", "India"],
    priceRange: "$$",
    openingHours: "Mo-Sa 09:00-18:00",
    ...(aggregateRating ? { aggregateRating } : {}),
  };

  // FAQ schema must match what's on the page (Google's parity rule). Mirror
  // FAQSection exactly: Sanity FAQs if present, otherwise the message fallback.
  const [sanityFaqs, t] = await Promise.all([
    getFaqs(),
    getTranslations({ locale, namespace: "faq" }),
  ]);
  const faqItems =
    sanityFaqs.length > 0
      ? sanityFaqs.map((f) => ({
          q: pick(f.question, locale as Locale),
          a: pick(f.answer, locale as Locale),
        }))
      : (t.raw("questions") as { q: string; a: string }[]);

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <JsonLd data={educationalOrg} />
      <JsonLd data={localBusiness} />
      <JsonLd data={faqPage} />
    </>
  );
}

/** Individual Review items for the /reviews page. Sanity reviews only — see
 * the note on HomePageJsonLd's aggregateRating for why the seed fallback is
 * excluded. */
export async function ReviewsJsonLd({ locale }: { locale: string }) {
  const sanityReviews = await getReviews();
  if (sanityReviews.length === 0) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": SITE.url ? `${SITE.url}/#localbusiness` : undefined,
    review: sanityReviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.studentName || "Student" },
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(r.rating ?? 5),
        bestRating: "5",
      },
      reviewBody: pick(r.reviewText, locale as Locale),
      ...(r.date ? { datePublished: r.date } : {}),
    })),
  };

  return <JsonLd data={data} />;
}

/** One Course entity per Sanity course, for the /courses page. Sanity
 * courses only (same reasoning as reviews — the i18n seed fallback is
 * developer-authored example copy, not a real course to mark up as one).
 * `offers` is intentionally omitted: no price is published on the page (the
 * CTA is "Enquire on WhatsApp"), and Course rich results require offers.price
 * to be accurate if present at all. */
export async function CourseJsonLd({ locale }: { locale: string }) {
  const sanityCourses = await getCourses();
  if (sanityCourses.length === 0) return null;

  return (
    <>
      {sanityCourses.map((c) => {
        const name = pick(c.title, locale as Locale);
        const description = pick(c.description, locale as Locale);
        if (!name) return null;
        const data = {
          "@context": "https://schema.org",
          "@type": "Course",
          name,
          ...(description ? { description } : {}),
          provider: {
            "@type": "EducationalOrganization",
            name: "A Carrier to Career - Spoken English Academy",
            url: SITE.url,
          },
        };
        return <JsonLd key={c._id} data={data} />;
      })}
    </>
  );
}

/** BreadcrumbList for a non-home page: Home > `name`. */
export function BreadcrumbJsonLd({
  locale,
  path,
  name,
}: {
  locale: string;
  path: string;
  name: string;
}) {
  const base = SITE.url || "";
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${base}/${locale}` },
      { "@type": "ListItem", position: 2, name, item: `${base}/${locale}${path}` },
    ],
  };
  return <JsonLd data={data} />;
}
