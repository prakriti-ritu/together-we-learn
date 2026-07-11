import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import ReviewCard from "@/components/ui/ReviewCard";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "reviewsPage" });

  return {
    title: t("heading"),
    description: t("subheading"),
  };
}

// Placeholder reviews (will be replaced with Sanity data)
const allReviews = [
  { id: "1", name: "Ravi Kumar", city: "Ambikapur", rating: 5, text: "Prakriti Ma'am is an amazing teacher. I was very shy to speak English but after 3 months of her course, I can now speak confidently in interviews. My entire approach to communication has changed. I got a promotion at work because of my improved English skills!", featured: true },
  { id: "2", name: "Priya Sharma", city: "Raipur", rating: 5, text: "The best English speaking course I have taken. Ma'am explains everything in Hindi first which makes it very easy to understand." },
  { id: "3", name: "Amit Patel", city: "Bilaspur", rating: 4, text: "Very helpful course for Hindi medium students. The online classes are convenient and the teaching quality is excellent. I highly recommend this to anyone who wants to improve their spoken English." },
  { id: "4", name: "Sneha Tiwari", city: "Korba", rating: 5, text: "I joined the 6-month course and it changed my life. Now I can speak English fluently in my workplace." },
  { id: "5", name: "Rahul Verma", city: "Ambikapur", rating: 5, text: "Ma'am is very patient and supportive. She makes sure every student understands before moving forward. The practice sessions are really helpful. I was a complete beginner and now I can hold full conversations in English." },
  { id: "6", name: "Anjali Singh", city: "Raigarh", rating: 4, text: "Great online classes with practical approach. I improved my English in just 1 month crash course." },
  { id: "7", name: "Deepak Sahu", city: "Jashpur", rating: 5, text: "I was scared of English my whole life. Prakriti Ma'am made learning so comfortable and fun. Now I confidently speak English at my office. Thank you Ma'am!" },
  { id: "8", name: "Kavita Yadav", city: "Surguja", rating: 5, text: "Excellent teaching method. The course is worth every rupee." },
  { id: "9", name: "Manish Gupta", city: "Ambikapur", rating: 4, text: "Very systematic approach to teaching English. The daily practice sessions really helped build my confidence. I can now prepare presentations in English for my job." },
];

export default function ReviewsPage() {
  const t = useTranslations("reviewsPage");

  return (
    <section className="py-16 md:py-20 bg-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeading title={t("heading")} subtitle={t("subheading")} />
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-5">
          {allReviews.map((review) => (
            <ReviewCard
              key={review.id}
              name={review.name}
              city={review.city}
              rating={review.rating}
              text={review.text}
              featured={"featured" in review && review.featured}
              masonry
            />
          ))}
        </div>
      </div>
    </section>
  );
}
