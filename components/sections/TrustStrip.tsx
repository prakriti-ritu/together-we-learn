import { useTranslations } from "next-intl";

export default function TrustStrip() {
  const t = useTranslations("trust");

  const stats = [
    { icon: "award", label: t("setQualified") },
    { icon: "building", label: t("govtFaculty") },
    { icon: "users", label: t("students") },
    { icon: "clock", label: t("experience") },
  ];

  const icons: Record<string, React.ReactNode> = {
    award: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
    building: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9h.01M9 13h.01M9 17h.01" />
      </svg>
    ),
    users: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    clock: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  };

  return (
    <section className="bg-navy py-10 relative">
      {/* Gold top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.icon}
              className={`flex flex-col items-center text-center gap-3 ${
                i < stats.length - 1 ? "md:border-r md:border-white/10" : ""
              }`}
            >
              <div className="w-12 h-12 rounded-full border-2 border-gold/30 flex items-center justify-center text-gold">
                {icons[stat.icon]}
              </div>
              <span className="text-white font-semibold text-sm md:text-base">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
