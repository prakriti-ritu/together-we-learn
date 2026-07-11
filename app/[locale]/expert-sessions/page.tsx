import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "expertSessionsPage" });

  return {
    title: t("heading"),
    description: t("subheading"),
  };
}

// Placeholder sessions
const allSessions = [
  { id: "1", title: "Interview Skills Workshop", speaker: "Guest Speaker", speakerPhoto: "", date: "2024-12-15", description: "Learn how to ace job interviews with confidence and proper English communication skills." },
  { id: "2", title: "Public Speaking Masterclass", speaker: "Guest Speaker", speakerPhoto: "", date: "2024-12-22", description: "Overcome stage fear and learn to deliver powerful speeches in English." },
  { id: "3", title: "Business English Workshop", speaker: "Guest Speaker", speakerPhoto: "", date: "2025-01-05", description: "Master professional email writing, meeting etiquette, and corporate communication." },
];

export default function ExpertSessionsPage() {
  const t = useTranslations("expertSessionsPage");

  return (
    <section className="py-16 md:py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading title={t("heading")} subtitle={t("subheading")} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {allSessions.map((session) => (
            <Card key={session.id}>
              <p className="text-xs text-gold font-semibold uppercase tracking-wider mb-2">
                {session.date}
              </p>
              <h3 className="font-serif text-xl font-bold text-navy mb-2">
                {session.title}
              </h3>
              <p className="text-text-secondary text-sm mb-3">
                {session.description}
              </p>
              <div className="flex items-center gap-2.5 pt-3 border-t border-gold/15">
                {session.speakerPhoto ? (
                  <img src={session.speakerPhoto} alt={session.speaker} className="w-9 h-9 rounded-full object-cover ring-2 ring-gold/20" loading="lazy" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 text-gold font-bold flex items-center justify-center text-xs">
                    {session.speaker.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)}
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
