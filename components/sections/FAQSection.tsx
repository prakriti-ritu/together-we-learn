import { getTranslations, getLocale } from "next-intl/server";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import FaqAccordion from "@/components/sections/faq/FaqAccordion";
import { getFaqs, getContact, pick, type Locale } from "@/sanity/lib/fetch";
import { waHref } from "@/lib/site";

export default async function FAQSection() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("faq");
  const [sanityFaqs, contact] = await Promise.all([getFaqs(), getContact()]);

  const questions =
    sanityFaqs.length > 0
      ? sanityFaqs.map((f) => ({ q: pick(f.question, locale), a: pick(f.answer, locale) }))
      : (t.raw("questions") as { q: string; a: string }[]);

  return (
    <section className="py-16 md:py-24 bg-navy/[0.02]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left — heading + CTA */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold mb-6">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-4 tracking-tight">
              {t("heading")}
            </h2>
            <div className="w-10 h-[3px] bg-gradient-to-r from-gold to-gold-light rounded-full mb-4" />
            <p className="text-text-secondary leading-relaxed mb-8">{t("subtitle")}</p>
            <div className="rounded-2xl bg-cream border border-border-warm p-6">
              <p className="font-semibold text-navy mb-3">{t("stillHaveQuestions")}</p>
              <a
                href={waHref(contact.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-whatsapp text-white font-semibold rounded-xl px-5 py-3 min-h-[48px] shadow-button transition-all duration-250 hover:bg-whatsapp/90 hover:shadow-button-hover hover:scale-[1.02]"
              >
                <WhatsAppIcon className="w-5 h-5" />
                {t("chatWithUs")}
              </a>
            </div>
          </div>

          {/* Right — accordion */}
          <FaqAccordion questions={questions} />
        </div>
      </div>
    </section>
  );
}
