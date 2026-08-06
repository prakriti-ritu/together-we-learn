import { getTranslations, getLocale } from "next-intl/server";
import { getSiteSettings, pick, type Locale } from "@/sanity/lib/fetch";

const icons: Record<string, React.ReactNode> = {
  // Gold medal — M.A. Gold Medalist
  gold: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
  // Certificate/badge — CG SET Qualified
  set: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M12 15a4 4 0 100-8 4 4 0 000 8z" />
      <path d="M8.5 13.5L7 22l5-2.5L17 22l-1.5-8.5" />
      <path d="M12 2v1M4.2 6l.8.6M19.8 6l-.8.6" />
    </svg>
  ),
  // College building — Assistant Professor
  professor: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9h.01M9 13h.01M9 17h.01" />
    </svg>
  ),
  // Microphone — Spoken English Trainer
  trainer: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0014 0M12 17v4M8 21h8" />
    </svg>
  ),
};

export default async function TrustStrip() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("trust");
  const settings = await getSiteSettings();

  // Prefer Sanity trust stats when the tutor has added them; else the curated
  // credential chips from i18n (the trainer's real qualifications).
  const stats =
    settings?.trustStats && settings.trustStats.length > 0
      ? settings.trustStats.map((s, i) => ({
          key: ["gold", "set", "professor", "trainer"][i] || "gold",
          label: [pick(s.label, locale), s.value].filter(Boolean).join(" "),
        }))
      : [
          { key: "gold", label: t("gold") },
          { key: "set", label: t("set") },
          { key: "professor", label: t("professor") },
          { key: "trainer", label: t("trainer") },
        ];

  return (
    <section className="bg-gold/10 py-10 relative">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.key + i}
              className={`flex flex-col items-center text-center gap-3 ${
                i < stats.length - 1 ? "md:border-r md:border-gold/20" : ""
              }`}
            >
              <div className="w-12 h-12 rounded-full border-2 border-gold/30 flex items-center justify-center text-gold">
                {icons[stat.key] ?? icons.gold}
              </div>
              <span className="text-navy font-semibold text-sm md:text-base">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
