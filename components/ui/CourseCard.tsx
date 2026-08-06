import WhatsAppIcon from "./WhatsAppIcon";
import CourseInfo from "./CourseInfo";

interface CourseCardProps {
  title: string;
  duration: string;
  features: string[];
  isPopular?: boolean;
  popularLabel?: string;
  enquireLabel: string;
  whatsappNumber: string;
  courseName: string;
  description?: string;
}

export default function CourseCard({
  title,
  duration,
  features,
  isPopular,
  popularLabel = "MOST POPULAR",
  enquireLabel,
  whatsappNumber,
  courseName,
  description = "",
}: CourseCardProps) {
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi Ma'am, I'm interested in the ${courseName} course. Please share details.`
  )}`;

  if (isPopular) {
    return (
      <div className="rounded-2xl p-6 md:p-7 bg-gradient-to-br from-gold/10 to-gold/5 text-navy shadow-card ring-1 ring-gold/30 transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-card-hover flex flex-col h-full relative overflow-hidden order-first lg:order-none lg:scale-105 lg:z-10">
        {/* Popular badge */}
        <span className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold to-gold-light text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-b-lg">
          {popularLabel}
        </span>

        {/* Title + Duration row */}
        <div className="flex items-start justify-between gap-3 mt-3 mb-4">
          <h3 className="font-serif text-xl md:text-2xl font-bold text-navy">{title}</h3>
          <CourseInfo description={description}>
            <span
              className={`shrink-0 inline-flex items-center gap-1.5 bg-card-white rounded-full px-2.5 py-1 ${description ? "ring-1 ring-gold/30" : ""}`}
            >
              <svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span className="text-xs font-semibold text-navy">{duration}</span>
            </span>
          </CourseInfo>
        </div>

        {/* Features — compact 2-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-2 mb-5 flex-1">
          {features.map((feature, i) => (
            <div key={i} className="flex items-start gap-2 text-text-secondary text-sm">
              <span className="shrink-0 mt-0.5 w-4 h-4 rounded-full bg-gold/15 flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-gold" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 bg-gold text-white font-semibold rounded-xl py-3 min-h-[44px] shadow-button transition-all duration-250 hover:bg-gold/90 hover:shadow-button-hover hover:scale-[1.02] text-sm"
        >
          <WhatsAppIcon className="w-4 h-4" />
          {enquireLabel}
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-2xl p-5 md:p-6 bg-card-white border border-border-warm border-t-[3px] border-t-gold/30 shadow-card transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-card-hover flex flex-col h-full relative overflow-hidden">
      {/* Title + Duration row */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <h3 className="font-serif text-xl font-bold text-navy">{title}</h3>
        <CourseInfo description={description}>
          <span
            className={`shrink-0 inline-flex items-center gap-1.5 bg-cream rounded-full px-2.5 py-1 ${description ? "ring-1 ring-gold/30" : ""}`}
          >
            <svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span className="text-xs font-semibold text-navy">{duration}</span>
          </span>
        </CourseInfo>
      </div>

      {/* Features — compact 2-col grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-2 mb-5 flex-1">
        {features.map((feature, i) => (
          <div key={i} className="flex items-start gap-2 text-text-secondary text-sm">
            <span className="shrink-0 mt-0.5 w-4 h-4 rounded-full bg-gold/10 flex items-center justify-center">
              <svg className="w-2.5 h-2.5 text-gold" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center gap-2 bg-whatsapp text-white font-semibold rounded-xl py-3 min-h-[44px] shadow-button transition-all duration-250 hover:bg-whatsapp/90 hover:shadow-button-hover hover:scale-[1.02] text-sm"
      >
        <WhatsAppIcon className="w-4 h-4" />
        {enquireLabel}
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  );
}
