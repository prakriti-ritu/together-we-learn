import { getTranslations } from "next-intl/server";
import { HomePageJsonLd } from "@/components/seo/JsonLd";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import AboutCourse from "@/components/sections/AboutCourse";
import PracticeSection from "@/components/games/PracticeSection";
import CoursesSection from "@/components/sections/CoursesSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import GallerySection from "@/components/sections/GallerySection";
import ClassVideos from "@/components/sections/ClassVideos";
import ReviewsSection from "@/components/sections/ReviewsSection";
import ExpertSessionsSection from "@/components/sections/ExpertSessionsSection";
import AboutTeacher from "@/components/sections/AboutTeacher";
import FAQSection from "@/components/sections/FAQSection";
import FinalCTA from "@/components/sections/FinalCTA";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        hi: "/hi",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: locale === "hi" ? "hi_IN" : "en_US",
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <HomePageJsonLd locale={locale} />
      <Hero />
      <TrustStrip />
      <AboutCourse />
      <PracticeSection />
      <CoursesSection />
      <WhyChooseUs />
      <GallerySection />
      <ClassVideos />
      <ReviewsSection />
      <ExpertSessionsSection />
      <AboutTeacher />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
