import { getTranslations, getLocale } from "next-intl/server";
import SectionHeading from "@/components/ui/SectionHeading";
import SanityImage from "@/components/ui/SanityImage";
import { getGallery, pick, type Locale } from "@/sanity/lib/fetch";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 86400; // 1 day; publishing triggers instant on-demand revalidation

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "galleryPage" });
  return pageMetadata({ locale, path: "/gallery", title: t("heading"), description: t("subheading") });
}

const cameraIcon = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

export default async function GalleryPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("galleryPage");
  const gallery = await getGallery();

  const items =
    gallery.length > 0
      ? gallery.map((g) => ({ id: g._id, image: g.image, caption: pick(g.caption, locale, "") }))
      : Array.from({ length: 12 }, (_, i) => ({
          id: String(i),
          image: undefined,
          caption: `Class Photo ${i + 1}`,
        }));

  return (
    <main className="py-16 md:py-20 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading title={t("heading")} subtitle={t("subheading")} icon={cameraIcon} as="h1" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-card hover:-translate-y-1"
            >
              <SanityImage
                source={item.image}
                alt={item.caption}
                width={400}
                height={300}
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="w-full aspect-[4/3] rounded-2xl object-cover"
                placeholderLabel={item.caption}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
