import { getTranslations, getLocale } from "next-intl/server";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { getExpertSessions, pick, type Locale } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 86400; // 1 day; publishing triggers instant on-demand revalidation

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "expertSessionsPage" });
  return { title: t("heading"), description: t("subheading") };
}

const placeholderSessions = [
  { id: "1", title: "Interview Skills Workshop", speaker: "Guest Speaker", date: "2024-12-15", description: "Learn how to ace job interviews with confidence and proper English communication skills." },
  { id: "2", title: "Public Speaking Masterclass", speaker: "Guest Speaker", date: "2024-12-22", description: "Overcome stage fear and learn to deliver powerful speeches in English." },
  { id: "3", title: "Business English Workshop", speaker: "Guest Speaker", date: "2025-01-05", description: "Master professional email writing, meeting etiquette, and corporate communication." },
];

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export default async function ExpertSessionsPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("expertSessionsPage");
  const sanitySessions = await getExpertSessions();

  const sessions =
    sanitySessions.length > 0
      ? sanitySessions.map((s) => ({
          id: s._id,
          title: pick(s.title, locale),
          description: pick(s.description, locale),
          date: s.date ?? "",
          speaker: s.speaker ?? "Guest Speaker",
          photoUrl: s.photo ? urlFor(s.photo).width(72).height(72).url() : undefined,
        }))
      : placeholderSessions.map((s) => ({ ...s, photoUrl: undefined as string | undefined }));

  return (
    <section className="py-16 md:py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading title={t("heading")} subtitle={t("subheading")} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {sessions.map((session) => (
            <Card key={session.id}>
              <p className="text-xs text-gold font-semibold uppercase tracking-wider mb-2">
                {session.date}
              </p>
              <h3 className="font-serif text-xl font-bold text-navy mb-2">{session.title}</h3>
              <p className="text-text-secondary text-sm mb-3">{session.description}</p>
              <div className="flex items-center gap-2.5 pt-3 border-t border-gold/15">
                {session.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={session.photoUrl} alt={session.speaker} className="w-9 h-9 rounded-full object-cover ring-2 ring-gold/20" loading="lazy" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 text-gold font-bold flex items-center justify-center text-xs">
                    {initials(session.speaker)}
                  </div>
                )}
                <span className="text-sm font-medium text-navy">{session.speaker}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
