import { getTranslations, getLocale } from "next-intl/server";
import SectionHeading from "@/components/ui/SectionHeading";
import CourseCard from "@/components/ui/CourseCard";
import { getCourses, getContact, pick, type Locale } from "@/sanity/lib/fetch";

export default async function CoursesSection({ asH1 = false }: { asH1?: boolean } = {}) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("courses");
  const [sanityCourses, contact] = await Promise.all([getCourses(), getContact()]);

  // Sanity courses if the tutor has added any; otherwise the three seeded
  // courses from i18n.
  const courses =
    sanityCourses.length > 0
      ? sanityCourses.map((c) => ({
          key: c._id,
          title: pick(c.title, locale),
          duration: pick(c.duration, locale),
          features: (c.features ?? []).map((f) => pick(f, locale)).filter(Boolean),
          isPopular: !!c.isPopular,
        }))
      : (["course1", "course3", "courseAdv"] as const).map((key) => ({
          key,
          title: t(`${key}.title`),
          duration: t(`${key}.duration`),
          features: t.raw(`${key}.features`) as string[],
          isPopular: key === "course3",
        }));

  return (
    <section className="py-16 md:py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading title={t("heading")} subtitle={t("subheading")} as={asH1 ? "h1" : "h2"} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-5 max-w-5xl mx-auto items-center">
          {courses.map((course) => (
            <CourseCard
              key={course.key}
              title={course.title}
              duration={course.duration}
              features={course.features}
              isPopular={course.isPopular}
              popularLabel={t("mostPopular")}
              enquireLabel={t("enquireWhatsApp")}
              whatsappNumber={contact.whatsapp}
              courseName={course.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
