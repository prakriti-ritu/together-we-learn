interface StarRatingProps {
  rating: number;
  className?: string;
}

const STAR_PATH =
  "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

/**
 * Renders 1–5 stars supporting fractional values (e.g. 4.5 → four full + one half).
 * Each slot layers a filled star clipped to its fractional width over an empty star.
 */
export default function StarRating({ rating, className = "" }: StarRatingProps) {
  return (
    <div
      className={`flex gap-0.5 ${className}`}
      aria-label={`${rating} out of 5 stars`}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i)); // 0, 0.5, 1 …
        return (
          <span key={i} className="relative inline-block w-5 h-5">
            <svg
              className="absolute inset-0 w-5 h-5 text-border-warm"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d={STAR_PATH} />
            </svg>
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <svg
                className="w-5 h-5 text-gold"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d={STAR_PATH} />
              </svg>
            </span>
          </span>
        );
      })}
    </div>
  );
}
