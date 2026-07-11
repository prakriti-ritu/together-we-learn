import { getTranslations } from "next-intl/server";
import CoursesSection from "@/components/sections/CoursesSection";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "courses" });

  return {
    title: t("heading"),
    description: t("subheading"),
  };
}

export default function CoursesPage() {
  return (
    <section className="py-8 md:py-12">
      <CoursesSection />
    </section>
  );
}
