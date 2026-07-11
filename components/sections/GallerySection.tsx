import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";

export default function GallerySection() {
  const t = useTranslations("gallery");
  const locale = useLocale();

  // Show only 4 photos on homepage (will be replaced with Sanity data)
  const placeholders = Array.from({ length: 4 }, (_, i) => ({
    id: i,
    caption: `Class Photo ${i + 1}`,
  }));

  const cameraIcon = (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );

  return (
    <section className="py-16 md:py-20 bg-navy/[0.03]">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading title={t("heading")} icon={cameraIcon} />

        {/* Mobile: horizontal scroll */}
        <div className="gallery-scroll flex gap-4 overflow-x-auto pb-4 md:hidden -mx-4 px-4">
          {placeholders.map((item) => (
            <div
              key={item.id}
              className="shrink-0 w-72 aspect-[4/3] rounded-2xl bg-border-warm/50 flex items-center justify-center"
            >
              <span className="text-text-secondary/50 text-sm">{item.caption}</span>
            </div>
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {placeholders.map((item) => (
            <div
              key={item.id}
              className="aspect-[4/3] rounded-2xl bg-border-warm/50 flex items-center justify-center transition-all duration-300 hover:shadow-card hover:-translate-y-1"
            >
              <span className="text-text-secondary/50 text-sm">{item.caption}</span>
            </div>
          ))}
        </div>

        {/* View All link */}
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
