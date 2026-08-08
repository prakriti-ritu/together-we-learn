import { getTranslations } from "next-intl/server";
import { HomePageJsonLd } from "@/components/seo/JsonLd";
import Reveal from "@/components/ui/Reveal";
import Hero from "@/components/sections/Hero";
import ClassClip from "@/components/sections/ClassClip";
import TrustStrip from "@/components/sections/TrustStrip";
import Achievement from "@/components/sections/Achievement";
import ConfidenceLadder from "@/components/sections/ConfidenceLadder";
import AboutCourse from "@/components/sections/AboutCourse";
import CoursesSection from "@/components/sections/CoursesSection";
import PracticeSection from "@/components/games/PracticeSection";
import LevelQuiz from "@/components/games/LevelQuiz";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import GallerySection from "@/components/sections/GallerySection";
import ClassVideos from "@/components/sections/ClassVideos";
import ReviewsSection from "@/components/sections/ReviewsSection";
import ExpertSessionsSection from "@/components/sections/ExpertSessionsSection";
import AboutTeacher from "@/components/sections/AboutTeacher";
import FAQSection from "@/components/sections/FAQSection";
import DemoBooking from "@/components/sections/DemoBooking";
import FinalCTA from "@/components/sections/FinalCTA";

// PracticeSection and LevelQuiz were previously next/dynamic-code-split to
// shave a small amount of TBT. Reverted to static imports: next/dynamic's
// ssr:true mode wraps the component in a React Suspense boundary, and that
// boundary resolving after hydration was confirmed (via live layout-shift
// + DOM-mutation + JS-disabled testing) to trigger a large, deterministic
// CLS (0.33) misattributed to the footer -- happening regardless of how
// closely the loading skeleton's height matched the real content. TBT has
// enough headroom (measured 120-170ms desktop) that trading back the small
// code-splitting saving is worth eliminating a CLS defect an order of
// magnitude larger than the "Poor" threshold.

export const revalidate = 86400; // 1 day; publishing triggers instant on-demand revalidation

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
        "x-default": "/en",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: locale === "hi" ? "hi_IN" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
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
      <Reveal><ClassClip /></Reveal>
      <TrustStrip />
      <Reveal><Achievement /></Reveal>
      <ConfidenceLadder />
      <LevelQuiz />
      <Reveal><AboutCourse /></Reveal>
      <Reveal><CoursesSection /></Reveal>
      <Reveal><PracticeSection /></Reveal>
      <Reveal><WhyChooseUs /></Reveal>
      <Reveal><GallerySection /></Reveal>
      <Reveal><ClassVideos /></Reveal>
      <Reveal><ReviewsSection /></Reveal>
      <Reveal><ExpertSessionsSection /></Reveal>
      <Reveal><AboutTeacher /></Reveal>
      <Reveal><FAQSection /></Reveal>
      <DemoBooking />
      <FinalCTA />
    </>
  );
}
