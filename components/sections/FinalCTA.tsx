import { getTranslations } from "next-intl/server";
import Button from "@/components/ui/Button";
import PhoneIcon from "@/components/ui/PhoneIcon";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { getContact } from "@/sanity/lib/fetch";
import { telHref, waHref } from "@/lib/site";

export default async function FinalCTA() {
  const t = await getTranslations("finalCta");
  const tc = await getTranslations("common");
  const contact = await getContact();

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-panel to-panel-2 relative overflow-hidden">
      <div className="glow-blob" style={{ width: 420, height: 420, background: "var(--glow-a)", top: -120, left: "10%" }} aria-hidden="true" />
      <div className="glow-blob" style={{ width: 360, height: 360, background: "var(--glow-b)", bottom: -140, right: "10%" }} aria-hidden="true" />
      <div className="max-w-3xl mx-auto px-4 text-center relative">
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight text-balance">
          {t("heading")}
        </h2>
        <p className="text-white/80 text-lg md:text-xl mb-8">{t("subheading")}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="secondary" size="lg" href={telHref(contact.phone)}>
            <PhoneIcon className="w-5 h-5" />
            {t("callButton")}
          </Button>
          <Button variant="whatsapp" size="lg" href={waHref(contact.whatsapp, tc("waMessage"))} external>
            <WhatsAppIcon className="w-5 h-5" />
            {t("whatsappButton")}
          </Button>
        </div>
      </div>
    </section>
  );
}
