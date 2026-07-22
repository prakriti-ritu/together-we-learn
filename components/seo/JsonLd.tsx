import { SITE } from "@/lib/site";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function HomePageJsonLd({ locale }: { locale: string }) {
  const isHindi = locale === "hi";

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
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ambikapur",
      addressRegion: "Chhattisgarh",
      addressCountry: "IN",
    },
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
    name: "A Carrier to Career - Spoken English Academy",
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ambikapur",
      addressRegion: "Chhattisgarh",
      addressCountry: "IN",
    },
    priceRange: "$$",
    openingHours: "Mo-Sa 09:00-18:00",
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is this course for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "This course is designed for Hindi-medium students, working professionals, and anyone who wants to learn spoken English.",
        },
      },
      {
        "@type": "Question",
        name: "How are classes conducted?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All classes are conducted live online via video call. You just need a smartphone and internet connection.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={educationalOrg} />
      <JsonLd data={localBusiness} />
      <JsonLd data={faqPage} />
    </>
  );
}
