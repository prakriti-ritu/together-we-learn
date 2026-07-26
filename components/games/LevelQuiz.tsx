"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import CalendarIcon from "@/components/ui/CalendarIcon";

/**
 * "Test your English level" — a 5-question tap quiz that gives a friendly level
 * result and funnels into the free-demo booking. Pure client state + CSS, no
 * library. The answer options are English sentences (the thing being tested), so
 * they stay in-code; only the chrome is translated.
 */
const QUESTIONS: { options: { text: string; correct?: boolean }[] }[] = [
  { options: [{ text: "I have visited Delhi last year." }, { text: "I visited Delhi last year.", correct: true }, { text: "I am visit Delhi last year." }] },
  { options: [{ text: "She doesn't like tea.", correct: true }, { text: "She don't like tea." }, { text: "She not like tea." }] },
  { options: [{ text: "He is more taller than me." }, { text: "He is taller than me.", correct: true }, { text: "He is tallest than me." }] },
  { options: [{ text: "I am working here since 2020." }, { text: "I have been working here since 2020.", correct: true }, { text: "I working here since 2020." }] },
  { options: [{ text: "Can you borrow me your pen?" }, { text: "Can you lend me your pen?", correct: true }, { text: "Can you give me borrow pen?" }] },
];

export default function LevelQuiz() {
  const t = useTranslations("levelQuiz");
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const total = QUESTIONS.length;

  function choose(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (QUESTIONS[step].options[i].correct) setScore((s) => s + 1);
  }

  function next() {
    if (step + 1 < total) {
      setStep((s) => s + 1);
      setPicked(null);
    } else {
      setDone(true);
    }
  }

  function restart() {
    setStep(0);
    setScore(0);
    setPicked(null);
    setDone(false);
  }

  const band = score <= 2 ? "beginner" : score <= 4 ? "intermediate" : "advanced";

  return (
    <section className="bg-cream relative overflow-hidden py-16 md:py-24">
      <div className="max-w-xl mx-auto px-4 relative">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">{t("eyebrow")}</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy mt-3 tracking-tight text-balance">
            {t("heading")}
          </h2>
          <p className="text-text-secondary mt-3">{t("subtitle")}</p>
        </div>

        <div className="border-trail glass rounded-3xl p-6 md:p-8 shadow-card">
          {!done ? (
            <>
              {/* progress */}
              <div className="flex gap-1.5 mb-6" aria-hidden="true">
                {QUESTIONS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? "bg-gold" : "bg-border-warm"}`}
                  />
                ))}
              </div>

              <p className="text-sm font-semibold uppercase tracking-widest text-text-secondary mb-1">
                {step + 1} / {total}
              </p>
              <p className="text-lg font-semibold text-navy mb-5">{t("prompt")}</p>

              <div className="grid gap-3">
                {QUESTIONS[step].options.map((opt, i) => {
                  const isPicked = picked === i;
                  const reveal = picked !== null;
                  const state = reveal && opt.correct
                    ? "border-success-green bg-success-green/10 text-navy"
                    : reveal && isPicked
                    ? "border-red-400 bg-red-50 text-navy"
                    : "border-border-warm bg-cream text-navy hover:border-gold";
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => choose(i)}
                      disabled={reveal}
                      className={`text-left rounded-xl border px-4 py-3 transition-colors ${state} disabled:cursor-default`}
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>

              {picked !== null && (
                <button
                  type="button"
                  onClick={next}
                  className="mt-6 w-full bg-panel text-white font-semibold rounded-xl py-3.5 hover:bg-panel-2 transition-colors"
                >
                  {step + 1 < total ? t("next") : t("seeResult")}
                </button>
              )}
            </>
          ) : (
            <div className="text-center py-2">
              <p className="text-sm font-semibold uppercase tracking-widest text-gold">
                {t("score", { score, total })}
              </p>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-navy mt-2">
                {t(`${band}Title`)}
              </h3>
              <p className="text-text-secondary mt-3">{t(`${band}Text`)}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-7">
                <a
                  href="#book-demo"
                  className="inline-flex items-center justify-center gap-2 bg-gold text-white font-semibold rounded-xl px-6 py-3.5 shadow-button hover:bg-gold-light transition-colors"
                >
                  <CalendarIcon className="w-5 h-5" />
                  {t("cta")}
                </a>
                <button
                  type="button"
                  onClick={restart}
                  className="inline-flex items-center justify-center rounded-xl border border-border-warm px-6 py-3.5 font-semibold text-navy hover:bg-cream transition-colors"
                >
                  {t("restart")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
