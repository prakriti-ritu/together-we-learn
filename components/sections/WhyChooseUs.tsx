import { useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";

const pointIcons: React.ReactNode[] = [
  // Graduation cap - Qualified Teacher
  <svg key="grad" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 14l9-5-9-5-9 5 9 5z" />
    <path d="M12 14l6.16-3.422A12.083 12.083 0 0119.5 15c0 3-3.5 5.5-7.5 5.5S4.5 18 4.5 15c0-1.626.58-3.103 1.34-4.422L12 14z" />
    <path d="M21 9v6" />
  </svg>,
  // Chat bubble - Hindi-Medium Friendly
  <svg key="chat" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
  </svg>,
  // Monitor - Live Online Classes
  <svg key="monitor" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>,
  // Tag - Affordable Fees
  <svg key="tag" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>,
  // Trending up - Proven Results
  <svg key="trend" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>,
];

export default function WhyChooseUs() {
  const t = useTranslations("whyUs");
  const points = t.raw("points") as { title: string; description: string }[];

  return (
    <section className="py-16 md:py-20 bg-card-white">
      <div className="max-w-5xl mx-auto px-4">
        <SectionHeading title={t("heading")} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {points.map((point, i) => (
            <div key={i} className="flex gap-4">
              <div className="shrink-0 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                {pointIcons[i] || pointIcons[0]}
              </div>
              <div>
                <h3 className="font-semibold text-navy text-lg mb-1">
                  {point.title}
                </h3>
                <p className="text-text-secondary">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
