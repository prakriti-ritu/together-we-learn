import { getTranslations } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";

/**
 * "Confidence Ladder" — the emotional journey from a hesitant Hindi-medium
 * speaker to a fluent, confident one, as a connected timeline that reveals on
 * scroll. Aurora treatment; pure CSS/SVG motion.
 */
export default async function ConfidenceLadder() {
  const t = await getTranslations("ladder");

  const steps = [
    { t: t("step1t"), d: t("step1d") },
    { t: t("step2t"), d: t("step2d") },
    { t: t("step3t"), d: t("step3d") },
    { t: t("step4t"), d: t("step4d") },
  ];

  return (
    <section className="bg-cream relative overflow-hidden py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 relative">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">
            {t("eyebrow")}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy mt-3 tracking-tight text-balance">
            {t("heading")}
          </h2>
          <p className="text-text-secondary mt-3">{t("subtitle")}</p>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* connecting rail (desktop) */}
          <div
            className="hidden lg:block absolute top-6 left-[12%] right-[12%] h-px bg-border-warm"
            aria-hidden="true"
          />
          {steps.map((step, i) => (
            <Reveal key={i} delay={i * 130} className="text-center">
              <div className="relative">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full grid place-items-center text-white font-bold bg-gradient-to-br from-gold-light to-gold shadow-button relative z-10 tabular-nums">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-navy text-lg tracking-tight">
                  {step.t}
                </h3>
                <p className="text-text-secondary text-sm mt-1.5 max-w-[22ch] mx-auto">
                  {step.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
