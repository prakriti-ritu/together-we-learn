"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

/**
 * Aurora hero centerpiece: a nervous Hindi thought auto-transforms into a
 * confident English sentence on a loop, with a confidence meter.
 * Wide horizontal layout (think → becomes → say) matching the chosen design.
 * Pure CSS transitions + one interval — no animation library.
 * Respects prefers-reduced-motion (holds on the first, fully-confident pair).
 */
const PAIRS = [
  { hi: "मुझे अंग्रेज़ी बोलने में झिझक होती है।", en: "I speak up in every meeting now.", c: 92 },
  { hi: "मैं कोशिश करूँगा…", en: "I'll make it happen.", c: 88 },
  { hi: "यह मेरे लिए मुश्किल है।", en: "Honestly, I've got this.", c: 95 },
  { hi: "मैं ठीक हूँ।", en: "I'm doing really well, thank you!", c: 90 },
];

export default function HeroTransform() {
  const t = useTranslations("heroDemo");
  const [index, setIndex] = useState(0);
  const [swapping, setSwapping] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setSwapping(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % PAIRS.length);
        setSwapping(false);
      }, 480);
    }, 3900);
    return () => clearInterval(id);
  }, []);

  const pair = PAIRS[index];
  const fade = swapping ? "opacity-0 translate-y-1.5" : "opacity-100 translate-y-0";

  return (
    <div className="border-trail glass rounded-3xl shadow-card p-6 md:p-8 w-full max-w-2xl mx-auto text-left">
      <div className="flex items-center justify-between mb-6">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-text-secondary">
          <span className="w-2 h-2 rounded-full bg-gold" style={{ animation: "pulse-dot 2s infinite" }} />
          {t("live")}
        </span>
        <span aria-hidden="true" className="text-text-secondary">🎙</span>
      </div>

      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-5 items-center">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-text-secondary">
            {t("think")}
          </span>
          <div
            className={`font-hindi mt-2 rounded-xl border border-border-warm bg-cream px-4 py-3.5 text-base md:text-lg text-text-secondary transition-all duration-500 flex items-center min-h-[68px] md:min-h-[76px] ${fade}`}
          >
            {pair.hi}
          </div>
        </div>

        <div
          className="flex md:flex-col items-center justify-center gap-1 text-[10px] uppercase tracking-widest text-gold font-bold"
          aria-hidden="true"
        >
          <span className="hidden md:block">↓</span>
          <span className="md:hidden">↓</span>
          {t("becomes")}
        </div>

        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-text-secondary">
            {t("say")}
          </span>
          <div
            className={`mt-2 rounded-xl px-4 py-4 text-base md:text-xl font-semibold text-white bg-gradient-to-br from-gold-light to-gold shadow-button transition-all duration-500 flex items-center min-h-[68px] md:min-h-[76px] ${fade}`}
          >
            {pair.en}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-text-secondary">{t("confidence")}</span>
          <span className="font-bold text-success-green tabular-nums">{pair.c}%</span>
        </div>
        <div className="h-2 rounded-full bg-cream overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold to-success-green transition-all duration-700 ease-out"
            style={{ width: swapping ? "32%" : `${pair.c}%` }}
          />
        </div>
      </div>
    </div>
  );
}
