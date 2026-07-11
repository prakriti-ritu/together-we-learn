import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import ReviewCard from "@/components/ui/ReviewCard";
import ReviewCarousel from "@/components/ui/ReviewCarousel";

const placeholderReviews = [
  {
    id: "1",
    name: "Ravi Kumar",
    city: "Ambikapur",
    rating: 5,
    text: "Prakriti Ma'am is an amazing teacher. I was very shy to speak English but after 3 months of her course, I can now speak confidently in interviews. My entire approach to communication has changed. I got a promotion at work because of my improved English skills!",
    featured: true,
  },
  {
    id: "2",
    name: "Priya Sharma",
    city: "Raipur",
    rating: 5,
    text: "The best English speaking course I have taken. Ma'am explains everything in Hindi first which makes it very easy to understand.",
  },
  {
    id: "3",
    name: "Amit Patel",
    city: "Bilaspur",
    rating: 4,
    text: "Very helpful course for Hindi medium students. The online classes are convenient and the teaching quality is excellent. I highly recommend this to anyone who wants to improve their spoken English.",
  },
  {
    id: "4",
    name: "Sneha Tiwari",
    city: "Korba",
    rating: 5,
    text: "I joined the 6-month course and it changed my life. Now I can speak English fluently in my workplace.",
  },
  {
    id: "5",
    name: "Rahul Verma",
    city: "Ambikapur",
    rating: 5,
    text: "Ma'am is very patient and supportive. She makes sure every student understands before moving forward. The practice sessions are really helpful. I was a complete beginner and now I can hold full conversations in English.",
  },
  {
    id: "6",
    name: "Anjali Singh",
    city: "Raigarh",
    rating: 4,
    text: "Great online classes with practical approach. I improved my English in just 1 month crash course.",
  },
];

export default function ReviewsSection() {
  const t = useTranslations("reviews");
  const locale = useLocale();

  return (
    <section className="py-16 md:py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeading title={t("heading")} />
        <ReviewCarousel totalCards={placeholderReviews.length}>
          {placeholderReviews.map((review) => (
            <div
              key={review.id}
              className="w-[85vw] md:w-[340px] lg:w-[380px] shrink-0 snap-start"
            >
              <ReviewCard
                name={review.name}
                city={review.city}
                rating={review.rating}
                text={review.text}
                featured={"featured" in review && review.featured}
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
