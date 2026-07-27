import { getTranslations } from "next-intl/server";
import { SITE } from "@/lib/site";
import { getFaqs, pick, type Locale } from "@/sanity/lib/fetch";

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
      description: "SET-qualified Government College Faculty",
    },
  };

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
    areaServed: ["Ambikapur", "Chhattisgarh", "India"],
    priceRange: "$$",
    openingHours: "Mo-Sa 09:00-18:00",
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
