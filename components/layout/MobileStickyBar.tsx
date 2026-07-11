import { useTranslations } from "next-intl";
import PhoneIcon from "@/components/ui/PhoneIcon";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export default function MobileStickyBar() {
  const t = useTranslations("nav");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="flex gap-2 px-3 py-2.5 bg-navy/95 backdrop-blur-md border-t border-white/10">
        <a
          href="tel:+917247400000"
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 bg-white text-navy font-semibold text-sm rounded-xl min-h-[48px] shadow-button active:scale-[0.97] transition-transform"
        >
          <PhoneIcon className="w-4.5 h-4.5" />
          {t("callNow")}
        </a>
        <a
          href="https://wa.me/917247400000"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 bg-whatsapp text-white font-semibold text-sm rounded-xl min-h-[48px] shadow-button active:scale-[0.97] transition-transform"
        >
          <WhatsAppIcon className="w-4.5 h-4.5" />
          {t("whatsapp")}
        </a>
      </div>
    </div>
  );
}
