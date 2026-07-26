"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

/**
 * Sentence Builder: a Hindi sentence is shown; the English words are scrambled
 * into tappable chips. Tap chips to build the sentence in order, then Check.
 * Tap-based (not drag) so it works cleanly on touch devices with no library.
 */
const SENTENCES = [
  { hi: "मुझे अंग्रेज़ी सीखनी है।", words: ["I", "want", "to", "learn", "English"] },
  { hi: "मेरा नाम प्रकृति है।", words: ["My", "name", "is", "Prakriti"] },
  { hi: "आप कैसे हैं?", words: ["How", "are", "you"] },
  { hi: "मुझे यह काम पसंद है।", words: ["I", "like", "this", "work"] },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function SentenceBuilder() {
  const t = useTranslations("practice.sentence");
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number[]>([]);
  const [result, setResult] = useState<"idle" | "correct" | "wrong">("idle");

  const sentence = SENTENCES[index];
  // Stable shuffled order of pool indices for the current sentence.
  const order = useMemo(
    () => shuffle(sentence.words.map((_, i) => i)),
    [sentence]
  );

  const pick = (i: number) => {
    if (picked.includes(i)) return;
    setPicked((p) => [...p, i]);
    setResult("idle");
  };
  const unpick = (i: number) => {
    setPicked((p) => p.filter((x) => x !== i));
    setResult("idle");
  };
  const check = () => {
    const answer = picked.map((i) => sentence.words[i]).join(" ");
    setResult(answer === sentence.words.join(" ") ? "correct" : "wrong");
  };
  const next = () => {
    setIndex((i) => (i + 1) % SENTENCES.length);
    setPicked([]);
    setResult("idle");
  };

  return (
    <div>
      <p className="text-sm text-text-secondary mb-2">{t("hint")}</p>
      <p className="text-lg font-semibold text-navy mb-4">{sentence.hi}</p>

      {/* Answer row */}
      <div className="min-h-[52px] flex flex-wrap gap-2 rounded-xl border border-dashed border-border-warm bg-cream p-2 mb-4">
        {picked.length === 0 && (
          <span className="text-sm text-text-secondary/60 self-center px-2">
            {t("placeholder")}
          </span>
        )}
        {picked.map((i) => (
          <button
            key={i}
            onClick={() => unpick(i)}
            className="rounded-lg bg-panel text-white px-3 py-1.5 text-sm font-medium hover:bg-panel-2 transition-colors"
          >
            {sentence.words[i]}
          </button>
        ))}
      </div>

      {/* Word pool */}
      <div className="flex flex-wrap gap-2 mb-5">
        {order.map((i) => (
          <button
            key={i}
            onClick={() => pick(i)}
            disabled={picked.includes(i)}
            className="rounded-lg border border-border-warm bg-card-white px-3 py-1.5 text-sm font-medium text-navy transition-all hover:border-gold disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {sentence.words[i]}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={check}
          disabled={picked.length !== sentence.words.length}
          className="inline-flex items-center justify-center gap-2 bg-gold text-white font-semibold rounded-xl px-5 py-2.5 min-h-[44px] transition-all hover:bg-gold/90 hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {t("check")}
        </button>
        {result === "correct" && (
          <span className="inline-flex items-center gap-1.5 text-success-green font-semibold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {t("correct")}
          </span>
        )}
        {result === "wrong" && (
          <span className="text-sm text-text-secondary">{t("tryAgain")}</span>
        )}
        {result === "correct" && (
          <button
            onClick={next}
            className="ml-auto text-gold font-semibold text-sm hover:text-gold/80 transition-colors"
          >
            {t("next")} →
          </button>
        )}
      </div>
    </div>
  );
}
