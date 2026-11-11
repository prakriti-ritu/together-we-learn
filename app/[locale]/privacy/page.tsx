import SectionHeading from "@/components/ui/SectionHeading";
import PrivacyChoices from "@/components/ui/PrivacyChoices";
import { getContact, type Locale } from "@/sanity/lib/fetch";
import { telHref } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { privacyContent, PRIVACY_UPDATED } from "@/lib/privacy-content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = privacyContent[locale === "hi" ? "hi" : "en"];
  return pageMetadata({ locale, path: "/privacy", title: c.title, description: c.subtitle });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = privacyContent[(locale as Locale) === "hi" ? "hi" : "en"];
  const contact = await getContact();

  return (
    <section className="py-16 md:py-20 bg-cream">
      <div className="max-w-3xl mx-auto px-4">
        <SectionHeading title={c.title} subtitle={c.subtitle} as="h1" />
        <p className="text-text-secondary text-sm -mt-6 mb-8 text-center">
          {c.updatedLabel}: {PRIVACY_UPDATED}
        </p>

        <div className="space-y-8">
          {c.sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-navy mb-2">{s.h}</h2>
              {s.p?.map((para) => (
                <p key={para} className="text-text-secondary leading-relaxed mb-2">
                  {para}
                </p>
              ))}
              {s.ul && (
                <ul className="list-disc pl-5 space-y-1.5 text-text-secondary leading-relaxed">
                  {s.ul.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <PrivacyChoices />

          <section className="rounded-2xl border border-border-warm bg-card-white p-5 shadow-card">
            <h2 className="font-serif text-xl font-bold text-navy mb-1">{c.contactHeading}</h2>
            <p className="text-text-secondary text-sm mb-3">{c.contactIntro}</p>
            <ul className="space-y-1.5 text-navy">
              <li>
                {c.phoneLabel}:{" "}
                <a href={telHref(contact.phone)} className="font-semibold underline underline-offset-2">
                  {contact.phone}
                </a>
              </li>
              {contact.email && (
                <li>
                  {c.emailLabel}:{" "}
                  <a href={`mailto:${contact.email}`} className="font-semibold underline underline-offset-2 break-all">
                    {contact.email}
                  </a>
                </li>
              )}
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}
