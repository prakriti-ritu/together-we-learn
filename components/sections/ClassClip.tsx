import { getTranslations } from "next-intl/server";
import VideoItem from "@/components/sections/class-videos/VideoItem";
import { getSiteSettings } from "@/sanity/lib/fetch";

/**
 * "Watch a 60-second class clip" band, right below the hero.
 * Reuses the existing lazy tap-to-load player (thumbnail → iframe on tap) so the
 * page stays fast. Renders only when a clip URL has been set in Sanity
 * (Site Settings → 60-Second Class Clip).
 */
export default async function ClassClip() {
  const t = await getTranslations("classClip");
  const settings = await getSiteSettings();

  if (!settings?.heroClipUrl) return null;

  return (
    <section className="bg-cream relative overflow-hidden py-14 md:py-20">
      <div className="max-w-3xl mx-auto px-4 relative text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-gold">
          {t("eyebrow")}
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy mt-3 tracking-tight text-balance">
          {t("heading")}
        </h2>
        <p className="text-text-secondary mt-3 mb-8">{t("subtitle")}</p>

        <div className="max-w-2xl mx-auto border-trail glass rounded-3xl p-3 shadow-card">
          <VideoItem title={t("heading")} youtubeUrl={settings.heroClipUrl} playLabel={t("play")} />
        </div>
      </div>
    </section>
  );
}
