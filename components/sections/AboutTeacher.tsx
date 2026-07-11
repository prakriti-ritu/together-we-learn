import { useTranslations } from "next-intl";

export default function AboutTeacher() {
  const t = useTranslations("aboutTeacher");

  return (
    <section className="py-16 md:py-20 bg-cream">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Photo placeholder */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Decorative corner accents */}
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-gold/40 rounded-tl-lg" />
              <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-gold/40 rounded-tr-lg" />
              <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-gold/40 rounded-bl-lg" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-gold/40 rounded-br-lg" />
              <div className="w-64 h-72 md:w-72 md:h-80 rounded-2xl bg-gradient-to-br from-gold/20 to-navy/10 flex items-center justify-center border border-border-warm">
                <div className="text-center text-text-secondary">
                  <svg className="w-16 h-16 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  <p className="text-sm opacity-50">Teacher Photo</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            {/* Gold accent line */}
            <div className="w-10 h-[3px] bg-gradient-to-r from-gold to-gold-light rounded-full mb-4" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-2 tracking-tight">
              {t("heading")}
            </h2>
            <p className="text-2xl font-serif text-navy mb-1">{t("name")}</p>
            <p className="text-gold font-semibold text-sm mb-6">
              {t("credentials")}
            </p>
            <p className="text-text-secondary leading-relaxed">{t("bio")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
