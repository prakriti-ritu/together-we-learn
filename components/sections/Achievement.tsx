import { getTranslations, getLocale } from "next-intl/server";
import SanityImage from "@/components/ui/SanityImage";
import { getSiteSettings, pick, type Locale } from "@/sanity/lib/fetch";

/**
 * "Gold Medal / Achievement" band below the hero — a standout recognition photo
 * (e.g. the medal ceremony with dignitaries) + text, all editable in Sanity
 * (Site Settings → Achievement…). Distinct from the About Teacher portrait.
 * Renders only when an achievement photo has been uploaded.
 */
export default async function Achievement() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("achievement");
  const settings = await getSiteSettings();

  if (!settings?.achievementImage) return null;

  const heading = pick(settings.achievementHeading, locale, t("heading"));
  const text = pick(settings.achievementText, locale, t("text"));
  const caption = pick(settings.achievementCaption, locale);

  return (
    <section className="bg-cream relative overflow-hidden py-16 md:py-24">
      <div className="glow-blob" style={{ width: 420, height: 420, background: "var(--glow-a)", top: -120, right: -100 }} aria-hidden="true" />
      <div className="max-w-5xl mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* Photo with gold frame */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-gold/50 rounded-tl-lg" />
              <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-gold/50 rounded-tr-lg" />
              <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-gold/50 rounded-bl-lg" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-gold/50 rounded-br-lg" />
              <SanityImage
                source={settings.achievementImage}
                alt={heading}
                width={520}
                height={360}
                sizes="(max-width: 768px) 90vw, 520px"
                className="w-full max-w-[520px] rounded-2xl object-cover border border-border-warm shadow-card"
                placeholderLabel={heading}
              />
              {caption && (
                <p className="text-center text-xs text-text-secondary mt-3 italic">{caption}</p>
              )}
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold mb-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
              </svg>
              {t("eyebrow")}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy tracking-tight text-balance">
              {heading}
            </h2>
            <p className="text-text-secondary text-lg mt-4 leading-relaxed">{text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
