"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

/**
 * Word Flip: a small grid of daily-vocabulary cards. Tap a card and it flips
 * (3D CSS transform) from the Hindi word to its English word + pronunciation.
 * No JS animation library; the flip is a CSS `rotateY` transition.
 */
const WORDS = [
  { hi: "नमस्ते", en: "Hello", pron: "heh-LOH" },
  { hi: "धन्यवाद", en: "Thank you", pron: "THANGK-yoo" },
  { hi: "सुबह", en: "Morning", pron: "MOR-ning" },
  { hi: "किताब", en: "Book", pron: "book" },
  { hi: "दोस्त", en: "Friend", pron: "frend" },
  { hi: "पानी", en: "Water", pron: "WAW-ter" },
  { hi: "काम", en: "Work", pron: "wurk" },
  { hi: "खुशी", en: "Happiness", pron: "HAP-ee-nes" },
];

function FlipCard({ hi, en, pron }: { hi: string; en: string; pron: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      onClick={() => setFlipped((f) => !f)}
      className="group relative h-28 md:h-32 w-full [perspective:1000px]"
      aria-label={`${hi} — ${en}`}
    >
      <div
        className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front — Hindi */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-border-warm bg-card-white [backface-visibility:hidden]">
          <span className="text-2xl font-semibold text-navy">{hi}</span>
        </div>
        {/* Back — English */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-navy to-navy-light text-white [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <span className="text-xl font-serif font-bold">{en}</span>
          <span className="text-xs text-gold-light mt-1">/{pron}/</span>
        </div>
      </div>
    </button>
  );
}

export default function WordFlip() {
  const t = useTranslations("practice.wordFlip");
  return (
    <div>
      <p className="text-sm text-text-secondary mb-4">{t("hint")}</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {WORDS.map((w) => (
          <FlipCard key={w.hi} {...w} />
        ))}
      </div>
    </div>
  );
}
