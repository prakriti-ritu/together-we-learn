import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import SectionHeading from "@/components/ui/SectionHeading";
import SanityImage from "@/components/ui/SanityImage";
import { getGallery, pick, type Locale } from "@/sanity/lib/fetch";

const cameraIcon = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

export default async function GallerySection() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("gallery");
  const gallery = await getGallery();

  const items =
    gallery.length > 0
      ? gallery.slice(0, 4).map((g) => ({
          id: g._id,
          image: g.image,
          caption: pick(g.caption, locale, ""),
        }))
      : Array.from({ length: 4 }, (_, i) => ({
          id: String(i),
          image: undefined,
          caption: `Class Photo ${i + 1}`,
        }));

  return (
    <section className="py-16 md:py-20 bg-navy/[0.03]">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading title={t("heading")} icon={cameraIcon} />

        {/* Mobile: horizontal scroll */}
        <div className="gallery-scroll flex gap-4 overflow-x-auto pb-4 md:hidden -mx-4 px-4">
          {items.map((item) => (
            <div key={item.id} className="shrink-0 w-72">
              <SanityImage
                source={item.image}
                alt={item.caption}
                width={288}
                height={216}
                sizes="288px"
                className="w-72 aspect-[4/3] rounded-2xl object-cover"
                placeholderLabel={item.caption}
              />
            </div>
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
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
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="w-full aspect-[4/3] rounded-2xl object-cover"
                placeholderLabel={item.caption}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href={`/${locale}/gallery`}
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
