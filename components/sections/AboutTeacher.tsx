import { getTranslations, getLocale } from "next-intl/server";
import SanityImage from "@/components/ui/SanityImage";
import { getAboutTeacher, pick, type Locale } from "@/sanity/lib/fetch";

export default async function AboutTeacher() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("aboutTeacher");
  const teacher = await getAboutTeacher();

  const bio = pick(teacher?.bio, locale, t("bio"));
  const credentials =
    teacher?.credentials && teacher.credentials.length > 0
      ? teacher.credentials.map((c) => pick(c, locale)).filter(Boolean)
      : (t.raw("credentials") as string[]);

  return (
    <section className="py-16 md:py-20 bg-cream">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Photo */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-gold/40 rounded-tl-lg" />
              <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-gold/40 rounded-tr-lg" />
              <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-gold/40 rounded-bl-lg" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-gold/40 rounded-br-lg" />
              <SanityImage
                source={teacher?.photo}
                alt={t("name")}
                width={288}
                height={352}
                sizes="(max-width: 768px) 256px, 288px"
                className="w-64 h-80 md:w-72 md:h-88 rounded-2xl object-cover border border-border-warm"
                placeholderLabel={t("name")}
              />
            </div>
          </div>

          {/* Bio + credentials */}
          <div>
            <div className="w-10 h-[3px] bg-gradient-to-r from-gold to-gold-light rounded-full mb-4" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-1 tracking-tight">
              {t("heading")}
            </h2>
            <p className="text-2xl font-serif text-navy">{t("name")}</p>
            <p className="text-gold font-semibold text-sm mb-5">{t("location")}</p>

            {/* Credential chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              {credentials.map((c, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-full bg-card-white border border-border-warm px-3 py-1.5 text-xs font-semibold text-navy shadow-sm"
                >
                  <svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {c}
                </span>
              ))}
            </div>

            <p className="text-text-secondary leading-relaxed">{bio}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
