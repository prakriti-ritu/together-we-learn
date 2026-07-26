import Link from "next/link";
import { useTranslations } from "next-intl";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import PhoneIcon from "@/components/ui/PhoneIcon";
import { telHref, waHref, type Contact } from "@/lib/site";
import DevContact from "@/components/layout/DevContact";

export default function Footer({
  locale,
  contact,
}: {
  locale: string;
  contact: Contact;
}) {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  const quickLinks = [
    { href: `/${locale}`, label: nav("home") },
    { href: `/${locale}/courses`, label: nav("courses") },
    { href: `/${locale}/reviews`, label: nav("reviews") },
    { href: `/${locale}/gallery`, label: nav("gallery") },
    { href: `/${locale}/videos`, label: nav("videos") },
    { href: `/${locale}/contact`, label: nav("contact") },
  ];

  return (
    <footer className="bg-panel text-white relative pb-20 md:pb-0">
      {/* Gold top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="max-w-7xl mx-auto px-4 py-14 md:py-18">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-2">
              A Carrier to Career
            </h3>
            <p className="text-white/70 text-sm">{t("tagline")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t("quickLinks")}</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 justify-items-center md:justify-items-start">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">{t("contactInfo")}</h4>
            <ul className="space-y-3 flex flex-col items-center md:items-start">
              <li>
                <a
                  href={telHref(contact.phone)}
                  className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
                >
                  <PhoneIcon className="w-4 h-4" />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={waHref(contact.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  WhatsApp
                </a>
              </li>
              {contact.email && (
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors break-all"
                  >
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 7l-10 6L2 7" />
                    </svg>
                    {contact.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 text-center">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} {t("copyright")}
          </p>
          <p className="text-white/30 text-xs mt-1">{t("madeWith")}</p>

          {/* Developer credit + contact (mailto with clipboard fallback) */}
          <DevContact />
        </div>
      </div>
    </footer>
  );
}
