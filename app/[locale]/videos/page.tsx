import { getTranslations, getLocale } from "next-intl/server";
import SectionHeading from "@/components/ui/SectionHeading";
import VideoItem from "@/components/sections/class-videos/VideoItem";
import { getClassVideos, pick, type Locale } from "@/sanity/lib/fetch";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "videosPage" });
  return { title: t("heading"), description: t("subheading") };
}

const videoIcon = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

const placeholderVideos = [
  { id: "1", title: "Class Demo Video 1", youtubeUrl: "" },
  { id: "2", title: "Class Demo Video 2", youtubeUrl: "" },
  { id: "3", title: "Class Demo Video 3", youtubeUrl: "" },
  { id: "4", title: "Class Demo Video 4", youtubeUrl: "" },
  { id: "5", title: "Student Practice Session", youtubeUrl: "" },
  { id: "6", title: "Grammar Workshop", youtubeUrl: "" },
];

export default async function VideosPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("videosPage");
  const playLabel = (await getTranslations("videos"))("playVideo");
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
    <main className="py-16 md:py-20 bg-cream min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        <SectionHeading title={t("heading")} subtitle={t("subheading")} icon={videoIcon} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video) => (
            <VideoItem
              key={video.id}
              title={video.title}
              youtubeUrl={video.youtubeUrl}
              playLabel={playLabel}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
