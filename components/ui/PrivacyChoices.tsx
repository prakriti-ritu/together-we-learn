"use client";

import { useTranslations } from "next-intl";
import { setConsent, useConsent } from "@/lib/visitor";

/** Lets a visitor grant or withdraw analytics consent at any time (as easy as giving it). */
export default function PrivacyChoices() {
  const t = useTranslations("privacyUi");
  const consent = useConsent();

  const status =
    consent === "granted" ? t("choiceGranted") : consent === "denied" ? t("choiceDenied") : t("choiceUnset");

  return (
    <div id="choices" className="rounded-2xl border border-border-warm bg-card-white p-5 shadow-card scroll-mt-24">
      <h2 className="font-semibold text-navy">{t("choicesHeading")}</h2>
      <p className="text-text-secondary text-sm mt-1" aria-live="polite">
        {consent === undefined ? " " : status}
      </p>
      <div className="flex flex-wrap gap-2 mt-3">
        {consent !== "granted" && (
          <button
            type="button"
            onClick={() => setConsent("granted")}
            className="rounded-xl bg-gold text-white font-semibold text-sm px-4 py-2.5 hover:bg-gold-light transition-colors"
          >
            {t("turnOn")}
          </button>
        )}
        {consent !== "denied" && (
          <button
            type="button"
            onClick={() => setConsent("denied")}
            className="rounded-xl border border-border-warm text-navy font-semibold text-sm px-4 py-2.5 hover:bg-cream transition-colors"
          >
            {t("turnOff")}
          </button>
        )}
      </div>
    </div>
  );
}
