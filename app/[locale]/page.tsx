import { getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";
import { HomePageJsonLd } from "@/components/seo/JsonLd";
import Reveal from "@/components/ui/Reveal";
import Hero from "@/components/sections/Hero";
import ClassClip from "@/components/sections/ClassClip";
import TrustStrip from "@/components/sections/TrustStrip";
import Achievement from "@/components/sections/Achievement";
import ConfidenceLadder from "@/components/sections/ConfidenceLadder";
import AboutCourse from "@/components/sections/AboutCourse";
import CoursesSection from "@/components/sections/CoursesSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import GallerySection from "@/components/sections/GallerySection";
import ClassVideos from "@/components/sections/ClassVideos";
import ReviewsSection from "@/components/sections/ReviewsSection";
import ExpertSessionsSection from "@/components/sections/ExpertSessionsSection";
import AboutTeacher from "@/components/sections/AboutTeacher";
import FAQSection from "@/components/sections/FAQSection";
import DemoBooking from "@/components/sections/DemoBooking";
import FinalCTA from "@/components/sections/FinalCTA";

// Below-the-fold, self-contained interactive sections: code-split so their JS
// doesn't add to the initial page's hydration cost (Lighthouse TBT). ssr:true
// keeps the server-rendered HTML (and SEO) unchanged — only the client bundle
// is deferred. The `loading` skeleton reserves the real measured height (desktop,
// via headless-browser measurement of the live page) so swapping to the real
// component doesn't shift page content below it — the original guessed heights
// undershot by 60-90px, which was the dominant cause of a measured 0.33 CLS.
const PracticeSection = dynamic(() => import("@/components/games/PracticeSection"), {
  loading: () => <div className="py-16 md:py-20 bg-cream" aria-hidden="true"><div className="max-w-4xl mx-auto px-4 h-[510px] rounded-2xl bg-border-warm/20 animate-pulse" /></div>,
});
const LevelQuiz = dynamic(() => import("@/components/games/LevelQuiz"), {
  loading: () => <div className="py-16 md:py-24 bg-cream" aria-hidden="true"><div className="max-w-xl mx-auto px-4 h-[530px] rounded-2xl bg-border-warm/20 animate-pulse" /></div>,
});

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
