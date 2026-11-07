"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

/**
 * Required, unticked-by-default consent checkbox for the lead forms (DPDP:
 * free, specific, informed, unambiguous, affirmative action). The server also
 * refuses a submission without `consent: true`.
 */
export default function ConsentCheckbox({ id }: { id: string }) {
  const t = useTranslations("privacyUi");
  const locale = useLocale();

  return (
    <div className="flex items-start gap-3">
      <input
        id={id}
        name="consent"
        type="checkbox"
        required
        className="mt-1 h-4 w-4 shrink-0 accent-[var(--accent)]"
      />
      <label htmlFor={id} className="text-[13px] leading-relaxed text-text-secondary">
        {t.rich("formConsent", {
          link: (chunks) => (
            <Link
              href={`/${locale}/privacy`}
              target="_blank"
              className="text-gold underline underline-offset-2"
            >
              {chunks}
            </Link>
          ),
        })}
      </label>
    </div>
  );
}
