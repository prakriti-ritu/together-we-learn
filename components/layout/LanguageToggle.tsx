"use client";

import { usePathname, useRouter } from "next/navigation";

export default function LanguageToggle({ locale }: { locale: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = () => {
    const newLocale = locale === "en" ? "hi" : "en";
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  return (
    <button
      onClick={switchLocale}
      className="inline-flex items-center justify-center min-h-[48px] min-w-[48px] px-3 py-2 rounded-lg border border-border-warm text-sm font-medium text-navy hover:bg-cream transition-colors"
      aria-label={locale === "en" ? "Switch to Hindi" : "Switch to English"}
    >
      {locale === "en" ? "हिं" : "EN"}
    </button>
  );
}
