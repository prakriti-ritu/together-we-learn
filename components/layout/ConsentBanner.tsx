"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { setConsent, useConsent } from "@/lib/visitor";

/**
 * DPDP-style notice-and-consent for analytics. Shown only until the visitor
 * chooses. "Accept" and "Decline" are equally prominent (no dark patterns), the
 * notice states purpose + links to the full policy, and nothing is tracked
 * before an explicit "Accept".
 */
export default function ConsentBanner() {
  const t = useTranslations("privacyUi");
  const locale = useLocale();
  const consent = useConsent();

  // undefined = still hydrating; null = not asked yet. Only show when not asked.
  if (consent !== null) return null;

  const btn =
    "flex-1 rounded-xl py-2.5 px-3 text-sm font-semibold border transition-colors min-h-[44px]";

  return (
    <div
      role="dialog"
      aria-labelledby="consent-title"
      aria-describedby="consent-body"
      className="fixed z-[70] left-3 right-3 bottom-[76px] md:left-4 md:right-auto md:bottom-4 md:w-[380px] rounded-2xl border border-border-warm bg-card-white p-4 shadow-card-hover"
    >
      <p id="consent-title" className="font-semibold text-navy text-sm">
        {t("bannerTitle")}
      </p>
      <p id="consent-body" className="text-text-secondary text-[13px] leading-relaxed mt-1.5">
        {t("bannerBody")}{" "}
        <Link href={`/${locale}/privacy`} className="text-gold underline underline-offset-2">
          {t("readPolicy")}
        </Link>
      </p>
      <div className="flex gap-2 mt-3">
        <button
          type="button"
          onClick={() => setConsent("denied")}
          className={`${btn} border-border-warm text-navy hover:bg-cream`}
        >
          {t("decline")}
        </button>
        <button
          type="button"
          onClick={() => setConsent("granted")}
          className={`${btn} border-gold bg-gold text-white hover:bg-gold-light`}
        >
          {t("accept")}
        </button>
      </div>
    </div>
  );
}
