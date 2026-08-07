import { getTranslations } from "next-intl/server";
import CoursesSection from "@/components/sections/CoursesSection";
import { pageMetadata } from "@/lib/seo";
import { CourseJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const revalidate = 86400; // 1 day; publishing triggers instant on-demand revalidation

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "courses" });

  return pageMetadata({
    locale,
    path: "/courses",
    title: t("heading"),
    description: t("subheading"),
  });
}

export default async function CoursesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "courses" });

  return (
    <section className="py-8 md:py-12">
      <CourseJsonLd locale={locale} />
      <BreadcrumbJsonLd locale={locale} path="/courses" name={t("heading")} />
      <CoursesSection asH1 />
    </section>
  );
}
