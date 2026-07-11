import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import SectionHeading from "@/components/ui/SectionHeading";
import ReviewCard from "@/components/ui/ReviewCard";
import ReviewCarousel from "@/components/ui/ReviewCarousel";
import { getReviews, pick, type Locale } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";

// Seed reviews shown until the tutor adds real ones in Sanity Studio.
const placeholderReviews = [
  { id: "1", name: "Ravi Kumar", city: "Ambikapur", rating: 5, text: "Prakriti Ma'am is an amazing teacher. I was very shy to speak English but after 3 months of her course, I can now speak confidently in interviews. I got a promotion at work because of my improved English!", featured: true },
  { id: "2", name: "Priya Sharma", city: "Raipur", rating: 5, text: "The best English speaking course I have taken. Ma'am explains everything in Hindi first which makes it very easy to understand." },
  { id: "3", name: "Amit Patel", city: "Bilaspur", rating: 4, text: "Very helpful course for Hindi medium students. The online classes are convenient and the teaching quality is excellent." },
  { id: "4", name: "Sneha Tiwari", city: "Korba", rating: 5, text: "It changed my life. Now I can speak English fluently in my workplace." },
  { id: "5", name: "Rahul Verma", city: "Ambikapur", rating: 5, text: "Ma'am is very patient and supportive. I was a complete beginner and now I can hold full conversations in English." },
  { id: "6", name: "Anjali Singh", city: "Raigarh", rating: 4, text: "Great online classes with a practical approach. I improved my English in just 1 month." },
];

export default async function ReviewsSection() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("reviews");
  const sanityReviews = await getReviews();

  const reviews =
    sanityReviews.length > 0
      ? sanityReviews.map((r, i) => ({
          id: r._id,
          name: r.studentName ?? "",
          city: r.city ?? "",
          rating: r.rating ?? 5,
          text: pick(r.reviewText, locale),
          photoUrl: r.photo ? urlFor(r.photo).width(96).height(96).url() : undefined,
          featured: i === 0,
        }))
      : placeholderReviews.map((r) => ({
          id: r.id,
          name: r.name,
          city: r.city,
          rating: r.rating,
          text: r.text,
          photoUrl: undefined as string | undefined,
          featured: "featured" in r && (r as { featured?: boolean }).featured,
        }));

  return (
    <section className="py-16 md:py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeading title={t("heading")} />
        <ReviewCarousel totalCards={reviews.length}>
          {reviews.map((review) => (
            <div key={review.id} className="w-[85vw] md:w-[340px] lg:w-[380px] shrink-0 snap-start">
              <ReviewCard
                name={review.name}
                city={review.city}
                rating={review.rating}
                text={review.text}
                photoUrl={review.photoUrl}
                featured={review.featured}
              />
            </div>
          ))}
        </ReviewCarousel>
        <div className="text-center mt-10">
          <Link
            href={`/${locale}/reviews`}
            className="inline-flex items-center gap-2 text-gold font-semibold hover:text-gold/80 transition-colors"
          >
            {t("readAll")}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
