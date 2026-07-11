import { getTranslations, getLocale } from "next-intl/server";
import Button from "@/components/ui/Button";
import PhoneIcon from "@/components/ui/PhoneIcon";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import TransformationToggle from "@/components/games/TransformationToggle";
import { getSiteSettings, getContact, pick, type Locale } from "@/sanity/lib/fetch";
import { telHref, waHref } from "@/lib/site";

export default async function Hero() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("hero");
  const [settings, contact] = await Promise.all([getSiteSettings(), getContact()]);

  const headline = pick(settings?.heroHeadline, locale, t("headline"));
  const subheadline = pick(settings?.heroSubheadline, locale, t("subheadline"));
  const description = pick(settings?.heroDescription, locale, t("description"));

  return (
    <section className="bg-cream relative overflow-hidden">
      {/* Subtle SVG pattern background */}
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1.5" fill="#0F1B2D" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 md:py-28 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text content */}
          <div className="text-center md:text-left">
            <div className="w-10 h-[3px] bg-gradient-to-r from-gold to-gold-light rounded-full mb-6 mx-auto md:mx-0" />
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-3 leading-tight tracking-tight">
              {headline}
            </h1>
            <p className="text-gold font-serif text-xl md:text-2xl italic font-semibold mb-4">
              {subheadline}
            </p>
            <p className="text-text-secondary text-lg mb-8 max-w-lg mx-auto md:mx-0">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button variant="call" size="lg" href={telHref(contact.phone)}>
                <PhoneIcon className="w-5 h-5" />
                {t("callButton")}
              </Button>
              <Button
                variant="whatsapp"
                size="lg"
                href={waHref(contact.whatsapp)}
                external
              >
                <WhatsAppIcon className="w-5 h-5" />
                {t("whatsappButton")}
              </Button>
            </div>
          </div>

          {/* Signature interactive element */}
          <div className="flex justify-center md:justify-end">
            <TransformationToggle />
          </div>
        </div>
      </div>
    </section>
  );
}
