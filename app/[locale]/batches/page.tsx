import { getTranslations } from "next-intl/server";
import BatchCard from "@/components/sections/batches/BatchCard";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { pageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getBatches, getContact, type Locale } from "@/sanity/lib/fetch";
import { waHref } from "@/lib/site";

export const revalidate = 86400; // 1 day; publishing a batch triggers instant on-demand revalidation

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "batches" });

  return pageMetadata({
    locale,
    path: "/batches",
    title: t("heading"),
    description: t("metaDescription"),
  });
}

export default async function BatchesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "batches" });
  const [batches, contact] = await Promise.all([getBatches(), getContact()]);

  return (
    <section className="bg-cream relative overflow-hidden">
      {/* subtle brand glow, consistent with the hero */}
      <div className="glow-blob" style={{ width: 480, height: 480, background: "var(--glow-a)", top: -200, right: -120 }} aria-hidden="true" />

      <div className="max-w-5xl mx-auto px-4 pt-14 md:pt-20 pb-16 md:pb-24 relative">
        <BreadcrumbJsonLd locale={locale} path="/batches" name={t("heading")} />

        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-navy tracking-tight text-balance gold-underline">
            {t("heading")}
          </h1>
          <p className="text-text-secondary text-lg mt-6 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {batches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {batches.map((b) => (
              <BatchCard
                key={b._id}
                batch={b}
                locale={locale as Locale}
                whatsapp={contact.whatsapp}
              />
            ))}
          </div>
        ) : (
          // Empty state — this is a shared link, so it must never look broken.
          <div className="max-w-md mx-auto text-center rounded-2xl border border-border-warm bg-card-white shadow-card p-8 md:p-10">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gold/10 flex items-center justify-center text-gold mb-5">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </div>
            <h2 className="font-serif text-2xl font-bold text-navy mb-2">{t("emptyHeading")}</h2>
            <p className="text-text-secondary mb-6">{t("emptyText")}</p>
            <a
              href={waHref(contact.whatsapp, t("emptyWaMessage"))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-whatsapp text-white font-semibold rounded-xl px-6 py-3 min-h-[48px] shadow-button transition-all duration-250 hover:bg-whatsapp/90 hover:shadow-button-hover hover:scale-[1.02]"
            >
              <WhatsAppIcon className="w-5 h-5" />
              {t("emptyCta")}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
