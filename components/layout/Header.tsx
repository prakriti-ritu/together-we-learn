import Link from "next/link";
import { useTranslations } from "next-intl";
import PhoneIcon from "@/components/ui/PhoneIcon";
import MobileMenu from "./MobileMenu";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import { telHref, type Contact } from "@/lib/site";

export default function Header({
  locale,
  contact,
}: {
  locale: string;
  contact: Contact;
}) {
  const t = useTranslations("nav");

  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/courses`, label: t("courses") },
    { href: `/${locale}/reviews`, label: t("reviews") },
    { href: `/${locale}/gallery`, label: t("gallery") },
    { href: `/${locale}/videos`, label: t("videos") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card-white/95 backdrop-blur-sm border-b border-border-warm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="font-serif text-lg md:text-xl font-bold text-navy truncate">
          A Carrier to Career
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-secondary hover:text-navy transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side: theme (desktop) + language toggle + phone (mobile) + hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme toggle lives in the bar on desktop, and inside the hamburger on mobile */}
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <LanguageToggle locale={locale} />
          <a
            href={telHref(contact.phone)}
            className="md:hidden inline-flex items-center justify-center min-h-[48px] min-w-[48px] rounded-full bg-panel text-white shrink-0"
            aria-label={t("callNow")}
          >
            <PhoneIcon className="w-4 h-4" />
          </a>
          <MobileMenu locale={locale} links={navLinks} />
        </div>
      </div>
    </header>
  );
}
