import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import SectionHeading from "@/components/ui/SectionHeading";
import VideoItem from "@/components/sections/class-videos/VideoItem";
import { getClassVideos, pick, type Locale } from "@/sanity/lib/fetch";

const videoIcon = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

// Seed tiles shown until the tutor adds real class videos in Sanity Studio.
const placeholderVideos = [
  { id: "1", title: "Class Demo Video 1", youtubeUrl: "" },
  { id: "2", title: "Class Demo Video 2", youtubeUrl: "" },
];

export default async function ClassVideos() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("videos");
  const sanityVideos = await getClassVideos();

  const videos =
    sanityVideos.length > 0
      ? sanityVideos.map((v) => ({
          id: v._id,
          title: pick(v.title, locale),
          youtubeUrl: v.youtubeUrl ?? "",
        }))
      : placeholderVideos;

  return (
    <section className="py-16 md:py-20 bg-card-white">
      <div className="max-w-5xl mx-auto px-4">
        <SectionHeading title={t("heading")} icon={videoIcon} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.slice(0, 4).map((video) => (
            <VideoItem
              key={video.id}
              title={video.title}
              youtubeUrl={video.youtubeUrl}
              playLabel={t("playVideo")}
            />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href={`/${locale}/videos`}
            className="inline-flex items-center gap-2 text-gold font-semibold hover:text-gold/80 transition-colors"
          >
            {t("viewAll")}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
