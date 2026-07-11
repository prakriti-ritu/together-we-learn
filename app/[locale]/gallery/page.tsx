import { useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";

export default function GalleryPage() {
  const t = useTranslations("galleryPage");

  // Placeholder gallery items (will be replaced with Sanity data)
  const placeholders = Array.from({ length: 12 }, (_, i) => ({
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
    <main className="py-16 md:py-20 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading title={t("heading")} subtitle={t("subheading")} icon={cameraIcon} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {placeholders.map((item) => (
            <div
              key={item.id}
              className="aspect-[4/3] rounded-2xl bg-border-warm/50 flex items-center justify-center transition-all duration-300 hover:shadow-card hover:-translate-y-1"
            >
              <span className="text-text-secondary/50 text-sm">{item.caption}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
