"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const DEV_EMAIL = "vkvanshulkesharwani54@gmail.com";

const MAILTO = `mailto:${DEV_EMAIL}?subject=${encodeURIComponent(
  "I want a website like A Carrier to Career"
)}&body=${encodeURIComponent(
  "Hi Vanshul, I saw the website you built for A Carrier to Career and I'd love one like it. Please get in touch."
)}`;

/**
 * Developer credit + contact. Tapping either the name or the CTA opens the
 * device mail app AND copies the address to the clipboard as a fallback — on
 * mobile, `mailto:` silently does nothing when no mail app is configured, so
 * the copy guarantees the visitor always gets the address.
 */
export default function DevContact() {
  const t = useTranslations("footer");
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    try {
      navigator.clipboard?.writeText(DEV_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — mailto still fires */
    }
  };

  return (
    <div className="mt-6 flex justify-center">
      <div className="group inline-flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 backdrop-blur-sm transition-colors hover:border-gold/40">
        <div className="text-center sm:text-left">
          <p className="text-gold text-[11px] font-semibold uppercase tracking-widest">
            {copied ? t("devCopied") : t("devHook")}
          </p>
          <p className="text-white/80 text-sm mt-0.5">
            {t("devBy")}{" "}
            <span className="relative inline-block group/dev">
              <a
                href={MAILTO}
                onClick={copyEmail}
                title={DEV_EMAIL}
                className="font-serif font-semibold text-white underline decoration-dotted decoration-gold/60 underline-offset-4 hover:text-gold transition-colors"
              >
                Vanshul Kesharwani
              </a>
              <span
                role="tooltip"
                className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 whitespace-nowrap rounded-lg border border-white/10 bg-panel-2 text-white text-xs px-3 py-1.5 opacity-0 translate-y-1 shadow-card transition-all duration-200 group-hover/dev:opacity-100 group-hover/dev:translate-y-0"
              >
                📧 {DEV_EMAIL}
              </span>
            </span>
          </p>
        </div>
        <a
          href={MAILTO}
          onClick={copyEmail}
          className="inline-flex items-center justify-center gap-1.5 bg-gold text-white text-sm font-semibold rounded-xl px-4 py-2.5 shadow-button hover:bg-gold-light transition-colors whitespace-nowrap"
        >
          {copied ? t("devCopied") : t("devCta")}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </a>
      </div>
    </div>
  );
}
