import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import PhoneIcon from "@/components/ui/PhoneIcon";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export default function FinalCTA() {
  const t = useTranslations("finalCta");

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-navy to-navy-light relative overflow-hidden">
      {/* Subtle radial gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/[0.05] rounded-full blur-3xl" aria-hidden="true" />
      <div className="max-w-3xl mx-auto px-4 text-center relative">
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          {t("heading")}
        </h2>
        <p className="text-white/80 text-lg md:text-xl mb-8">{t("subheading")}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="secondary"
            size="lg"
            href="tel:+917247400000"
          >
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
    </section>
  );
}
