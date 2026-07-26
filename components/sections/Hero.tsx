import { getTranslations, getLocale } from "next-intl/server";
import Button from "@/components/ui/Button";
import PhoneIcon from "@/components/ui/PhoneIcon";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import CalendarIcon from "@/components/ui/CalendarIcon";
import HeroTransform from "@/components/games/HeroTransform";
import HeroStats from "@/components/sections/HeroStats";
import Waves from "@/components/ui/Waves";
import { getSiteSettings, getContact, pick, type Locale } from "@/sanity/lib/fetch";
import { telHref, waHref } from "@/lib/site";

const TICKER_PHRASES = [
  "I'd love to help.",
  "Let me explain that.",
  "That's a great question.",
  "I'm confident about this.",
  "Let's get started.",
];

export default async function Hero() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("hero");
  const td = await getTranslations("demoBooking");
  const tc = await getTranslations("common");
  const [settings, contact] = await Promise.all([getSiteSettings(), getContact()]);

  const headline = pick(settings?.heroHeadline, locale, t("headline"));
  const subheadline = pick(settings?.heroSubheadline, locale, t("subheadline"));
  const description = pick(settings?.heroDescription, locale, t("description"));

  return (
    <section className="bg-cream relative overflow-hidden">
      {/* Aurora glow mesh */}
      <div className="glow-blob" style={{ width: 560, height: 560, background: "var(--glow-a)", top: -200, right: -120 }} aria-hidden="true" />
      <div className="glow-blob" style={{ width: 460, height: 460, background: "var(--glow-b)", bottom: -220, left: -160 }} aria-hidden="true" />

      <div className="max-w-4xl mx-auto px-4 pt-14 md:pt-24 pb-10 relative text-center">
        <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-text-secondary mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          {t("eyebrow")}
        </span>

        <h1 className="font-serif text-4xl md:text-6xl font-bold text-navy leading-[1.02] tracking-tight text-balance">
          {headline}
        </h1>
        <p className="text-gradient font-serif italic text-2xl md:text-3xl font-semibold mt-3">
          {subheadline}
        </p>
        <p className="text-text-secondary text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button variant="secondary" size="lg" href="#book-demo">
            <CalendarIcon className="w-5 h-5" />
            {td("cta")}
          </Button>
          <Button variant="call" size="lg" href={telHref(contact.phone)}>
            <PhoneIcon className="w-5 h-5" />
            {t("callButton")}
          </Button>
          <Button variant="whatsapp" size="lg" href={waHref(contact.whatsapp, tc("waMessage"))} external>
            <WhatsAppIcon className="w-5 h-5" />
            {t("whatsappButton")}
          </Button>
        </div>

        <div className="mt-12 md:mt-14">
          <HeroTransform />
        </div>

        <HeroStats stats={settings?.heroStats} locale={locale} />
      </div>

      {/* Confident-phrases ticker — each half repeats the list enough to exceed the
          viewport, and the track is two identical halves animated -50% for a seamless loop */}
      <div className="ticker-mask border-y border-border-warm py-4 relative bg-card-white/40">
        <div className="ticker-track">
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0" aria-hidden={half === 1}>
              {Array.from({ length: 3 }).flatMap((_, rep) =>
                TICKER_PHRASES.map((phrase, i) => (
                  <span
                    key={`${half}-${rep}-${i}`}
                    className="inline-flex items-center gap-3 px-6 text-sm md:text-base font-medium text-text-secondary whitespace-nowrap"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold" />
                    {phrase}
                  </span>
                ))
              )}
            </div>
          ))}
        </div>
      </div>

      <Waves />
    </section>
  );
}
