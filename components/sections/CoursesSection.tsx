import { useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import CourseCard from "@/components/ui/CourseCard";

export default function CoursesSection() {
  const t = useTranslations("courses");

  const courses = [
    {
      key: "course1",
      title: t("course1.title"),
      duration: t("course1.duration"),
      features: t.raw("course1.features") as string[],
      isPopular: false,
    },
    {
      key: "course3",
      title: t("course3.title"),
      duration: t("course3.duration"),
      features: t.raw("course3.features") as string[],
      isPopular: true,
    },
    {
      key: "courseAdv",
      title: t("courseAdv.title"),
      duration: t("courseAdv.duration"),
      features: t.raw("courseAdv.features") as string[],
      isPopular: false,
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading title={t("heading")} subtitle={t("subheading")} />
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
              whatsappNumber="917247400000"
              courseName={course.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
