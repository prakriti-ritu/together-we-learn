import StarRating from "./StarRating";

interface ReviewCardProps {
  name: string;
  city?: string;
  rating: number;
  text: string;
  photoUrl?: string;
  featured?: boolean;
  /** When true, uses masonry-friendly classes (break-inside-avoid + margin). When false, uses carousel-friendly classes (h-full, no margin). */
  masonry?: boolean;
}

export default function ReviewCard({
  name,
  city,
  rating,
  text,
  photoUrl,
  featured,
  masonry,
}: ReviewCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const masonryClasses = masonry ? "break-inside-avoid mb-4 md:mb-5" : "h-full";

  return (
    <div
      className={`rounded-2xl transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-card-hover flex flex-col ${masonryClasses} ${
        featured
          ? "bg-gradient-to-br from-navy to-navy-light text-white p-7 md:p-9 shadow-card ring-1 ring-gold/20"
          : "bg-card-white border border-border-warm p-6 md:p-8 shadow-card"
      }`}
    >
      <div
        className={`text-6xl font-serif leading-none mb-2 select-none ${
          featured ? "text-gold/40" : "text-gold/20"
        }`}
      >
        &ldquo;
      </div>
      <p
        className={`mb-5 leading-relaxed flex-1 ${
          featured ? "text-white/90 text-base md:text-lg" : "text-text-secondary"
        }`}
      >
        {text}
      </p>
      <StarRating rating={rating} className="mb-5" />
      <div
        className={`flex items-center gap-3 pt-4 border-t ${
          featured ? "border-white/15" : "border-gold/15"
        }`}
      >
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={name}
            className={`w-11 h-11 rounded-full object-cover ring-2 ${
              featured ? "ring-gold/30" : "ring-gold/20"
            }`}
            loading="lazy"
          />
        ) : (
          <div
            className={`w-11 h-11 rounded-full font-bold flex items-center justify-center text-sm ${
              featured
                ? "bg-gold/20 text-gold"
                : "bg-gradient-to-br from-gold/20 to-gold/5 text-gold"
            }`}
          >
            {initials}
          </div>
        )}
        <div>
          <p
            className={`font-semibold text-sm ${
              featured ? "text-white" : "text-navy"
            }`}
          >
            {name}
          </p>
          {city && (
            <p
              className={`text-xs ${
                featured ? "text-white/60" : "text-text-secondary"
              }`}
            >
              {city}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
