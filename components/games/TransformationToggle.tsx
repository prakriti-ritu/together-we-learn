"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

/**
 * Signature hero element: a nervous Hindi/Hinglish thought "transforms" into a
 * confident English sentence, with a confidence meter that fills as you toggle.
 * Pure CSS transitions — no animation library — so it's light on 4G.
 *
 * Content pairs are intentionally kept in-code (not Sanity) so the interaction
 * stays instant with no fetch; edit the array below to change the examples.
 */
const PAIRS = [
  {
    hindi: "मुझे ये job चाहिए… पर interview में English…",
    english: "I'm confident I'm the right fit for this role.",
  },
  {
    hindi: "मैं बोलना तो चाहता हूँ… पर डर लगता है।",
    english: "I'd love to share my thoughts on this.",
  },
  {
    hindi: "क्या मैं sabke saamne बोल पाऊँगा?",
    english: "Let me walk you through my idea.",
  },
];

export default function TransformationToggle() {
  const t = useTranslations("practice.toggle");
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const pair = PAIRS[index];

  const handleToggle = () => setRevealed((r) => !r);
  const handleNext = () => {
    setIndex((i) => (i + 1) % PAIRS.length);
    setRevealed(false);
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-border-warm bg-card-white shadow-card p-6 md:p-7">
      <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-4">
        {t("label")}
      </p>

      {/* The transforming line */}
      <div className="relative min-h-[112px] flex items-center">
        <p
          className={`absolute inset-0 flex items-center text-lg text-text-secondary transition-all duration-500 ${
            revealed ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"
          }`}
        >
          {pair.hindi}
        </p>
        <p
          className={`absolute inset-0 flex items-center font-serif text-xl md:text-2xl font-semibold text-navy transition-all duration-500 ${
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          {pair.english}
        </p>
      </div>

      {/* Confidence meter */}
      <div className="mt-4 mb-5">
        <div className="flex justify-between text-xs text-text-secondary mb-1.5">
          <span>{t("confidence")}</span>
          <span className="font-semibold text-gold">
            {revealed ? "100%" : "20%"}
          </span>
        </div>
        <div className="h-2 rounded-full bg-cream overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold to-gold-light transition-all duration-700 ease-out"
            style={{ width: revealed ? "100%" : "20%" }}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleToggle}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-navy text-white font-semibold rounded-xl py-3 min-h-[48px] transition-all duration-250 hover:bg-navy-light hover:scale-[1.02]"
        >
          {revealed ? t("showHindi") : t("transform")}
        </button>
        <button
          onClick={handleNext}
          aria-label={t("next")}
          className="inline-flex items-center justify-center w-12 min-h-[48px] rounded-xl border border-border-warm text-navy hover:bg-cream transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
