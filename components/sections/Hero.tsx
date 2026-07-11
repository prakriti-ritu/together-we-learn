import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import PhoneIcon from "@/components/ui/PhoneIcon";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export default function Hero() {
  const t = useTranslations("hero");

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
            {/* Decorative gold line */}
            <div className="w-10 h-[3px] bg-gradient-to-r from-gold to-gold-light rounded-full mb-6 mx-auto md:mx-0" />
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-3 leading-tight tracking-tight">
              {t("headline")}
            </h1>
            <p className="text-gold font-serif text-xl md:text-2xl italic font-semibold mb-4">
              {t("subheadline")}
            </p>
            <p className="text-text-secondary text-lg mb-8 max-w-lg mx-auto md:mx-0">
              {t("description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button variant="call" size="lg" href="tel:+917247400000">
                <PhoneIcon className="w-5 h-5" />
                {t("callButton")}
              </Button>
              <Button
                variant="whatsapp"
                size="lg"
                href="https://wa.me/917247400000"
                external
              >
                <WhatsAppIcon className="w-5 h-5" />
                {t("whatsappButton")}
              </Button>
            </div>
          </div>

          {/* Teacher photo placeholder */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              {/* Decorative corner accents */}
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-gold/40 rounded-tl-lg" />
              <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-gold/40 rounded-tr-lg" />
              <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-gold/40 rounded-bl-lg" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-gold/40 rounded-br-lg" />
              <div className="w-72 h-80 md:w-80 md:h-96 rounded-2xl bg-gradient-to-br from-gold/20 to-navy/10 flex items-center justify-center border border-border-warm">
                <div className="text-center text-text-secondary">
                  <svg className="w-16 h-16 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  <p className="text-sm opacity-50">Teacher Photo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
