"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import WordFlip from "./WordFlip";
import SentenceBuilder from "./SentenceBuilder";

type Tab = "flip" | "build";

/**
 * Homepage "Practice English" section — a light, playful interaction band that
 * lets visitors try the method before enrolling. Two tabs switch between the
 * Word Flip and Sentence Builder games. Client component (local tab state).
 */
export default function PracticeSection() {
  const t = useTranslations("practice");
  const [tab, setTab] = useState<Tab>("build");

  const tabs: { key: Tab; label: string }[] = [
    { key: "build", label: t("sentence.tab") },
    { key: "flip", label: t("wordFlip.tab") },
  ];

  return (
    <section className="py-16 md:py-20 bg-cream">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="w-10 h-[3px] bg-gradient-to-r from-gold to-gold-light rounded-full mb-4 mx-auto" />
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy tracking-tight">
            {t("heading")}
          </h2>
          <p className="text-text-secondary mt-2">{t("subheading")}</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {tabs.map((tb) => (
            <button
              key={tb.key}
              onClick={() => setTab(tb.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold min-h-[44px] transition-all ${
                tab === tb.key
                  ? "bg-panel text-white shadow-button"
                  : "bg-card-white text-text-secondary border border-border-warm hover:text-navy"
              }`}
            >
              {tb.label}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-border-warm bg-card-white shadow-card p-6 md:p-8">
          {tab === "flip" ? <WordFlip /> : <SentenceBuilder />}
        </div>
      </div>
    </section>
  );
}
