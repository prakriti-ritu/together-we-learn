import { getTranslations, getLocale } from "next-intl/server";
import SectionHeading from "@/components/ui/SectionHeading";
import ReviewCard from "@/components/ui/ReviewCard";
import { getReviews, pick, type Locale } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import { pageMetadata } from "@/lib/seo";
import { ReviewsJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const revalidate = 86400; // 1 day; publishing triggers instant on-demand revalidation

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "reviewsPage" });
  return pageMetadata({ locale, path: "/reviews", title: t("heading"), description: t("subheading") });
}

// Seed reviews shown until the tutor adds real ones in Sanity Studio.
const allReviews = [
  { id: "1", name: "Vanshul kesharwani", city: "Ambikapur", rating: 5, text: "Prakriti Ma'am is an amazing teacher. I was very shy to speak English but after 3 months of her course, I can now speak confidently in interviews. I got a promotion at work because of my improved English skills!", featured: true },
  { id: "2", name: "Priya Sharma", city: "Raipur", rating: 5, text: "The best English speaking course I have taken. Ma'am explains everything in Hindi first which makes it very easy to understand." },
  { id: "3", name: "Amit Patel", city: "Bilaspur", rating: 4, text: "Very helpful course for Hindi medium students. The online classes are convenient and the teaching quality is excellent." },
  { id: "4", name: "Sneha Tiwari", city: "Korba", rating: 5, text: "It changed my life. Now I can speak English fluently in my workplace." },
  { id: "5", name: "Rahul Verma", city: "Ambikapur", rating: 5, text: "Ma'am is very patient and supportive. I was a complete beginner and now I can hold full conversations in English." },
  { id: "6", name: "Anjali Singh", city: "Raigarh", rating: 4, text: "Great online classes with a practical approach. I improved my English in just 1 month crash course." },
  { id: "7", name: "Deepak Sahu", city: "Jashpur", rating: 5, text: "I was scared of English my whole life. Prakriti Ma'am made learning comfortable and fun. Now I confidently speak English at my office!" },
  { id: "8", name: "Kavita Yadav", city: "Surguja", rating: 5, text: "Excellent teaching method. The course is worth every rupee." },
  { id: "9", name: "Manish Gupta", city: "Ambikapur", rating: 4, text: "Very systematic approach. The daily practice sessions built my confidence. I can now prepare presentations in English for my job." },
];

export default async function ReviewsPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("reviewsPage");
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
          date: r.date,
        }))
      : allReviews.map((r) => ({
          id: r.id,
          name: r.name,
          city: r.city,
          rating: r.rating,
          text: r.text,
          photoUrl: undefined as string | undefined,
          featured: "featured" in r && (r as { featured?: boolean }).featured,
          date: undefined as string | undefined,
        }));

  return (
    <section className="py-16 md:py-20 bg-cream min-h-screen">
      <ReviewsJsonLd locale={locale} />
      <BreadcrumbJsonLd locale={locale} path="/reviews" name={t("heading")} />
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeading title={t("heading")} subtitle={t("subheading")} as="h1" />
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-5">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              name={review.name}
              city={review.city}
              rating={review.rating}
              text={review.text}
              photoUrl={review.photoUrl}
              featured={review.featured}
              date={review.date}
              masonry
            />
          ))}
        </div>
      </div>
    </section>
  );
}
