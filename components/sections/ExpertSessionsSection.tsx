import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import SectionHeading from "@/components/ui/SectionHeading";
import ClampText from "@/components/ui/ClampText";
import { getExpertSessions, pick, type Locale } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";

// Seed sessions shown until the tutor adds real ones in Sanity Studio.
const placeholderSessions = [
  { id: "1", title: "Interview Skills Workshop", speaker: "Guest Speaker", date: "2024-12-15", description: "Learn how to ace job interviews with confidence and proper English communication skills." },
  { id: "2", title: "Public Speaking Masterclass", speaker: "Guest Speaker", date: "2024-12-22", description: "Overcome stage fear and learn to deliver powerful speeches in English." },
  { id: "3", title: "Business English Workshop", speaker: "Guest Speaker", date: "2025-01-05", description: "Master professional email writing, meeting etiquette, and corporate communication." },
];

function SpeakerAvatar({ name, photoUrl }: { name: string; photoUrl?: string }) {
  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  if (photoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={photoUrl} alt={name} className="w-9 h-9 rounded-full object-cover ring-2 ring-gold/20" loading="lazy" />
    );
  }
  return (
    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 text-gold font-bold flex items-center justify-center text-xs">
      {initials}
    </div>
  );
}

export default async function ExpertSessionsSection() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("expertSessions");
  const sanitySessions = await getExpertSessions();

  const sessions =
    sanitySessions.length > 0
      ? sanitySessions.slice(0, 3).map((s) => ({
          id: s._id,
          title: pick(s.title, locale),
          description: pick(s.description, locale),
          date: s.date ?? "",
          speaker: s.speaker ?? "Guest Speaker",
          photoUrl: s.photo ? urlFor(s.photo).width(72).height(72).url() : undefined,
          videoUrl: s.videoUrl ?? "",
        }))
      : placeholderSessions.map((s) => ({
          ...s,
          photoUrl: undefined as string | undefined,
          videoUrl: "",
        }));

  return (
    <section className="py-16 md:py-20 bg-card-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading title={t("heading")} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="rounded-2xl p-6 md:p-8 bg-card-white border border-border-warm border-t-[3px] border-t-gold shadow-card transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-card-hover flex flex-col h-full"
            >
              <div className="flex items-center gap-2 text-xs text-gold font-semibold uppercase tracking-wider mb-3">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {session.date}
              </div>
              <h3 className="font-serif text-xl font-bold text-navy mb-2">{session.title}</h3>
              <ClampText
                text={session.description}
                className="mb-4 flex-1"
                pClassName="text-text-secondary text-sm"
                clampClass="line-clamp-3"
                words={22}
              />
              <div className="flex items-center gap-2.5 pt-3 border-t border-gold/15">
                <SpeakerAvatar name={session.speaker} photoUrl={session.photoUrl} />
                <span className="text-sm font-medium text-navy">{session.speaker}</span>
              </div>
              {session.videoUrl && (
                <a
                  href={session.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center gap-2 w-full rounded-xl bg-gold text-white text-sm font-semibold py-2.5 shadow-button hover:bg-gold-light transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  {t("watchNow")}
                </a>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href={`/${locale}/expert-sessions`}
            className="inline-flex items-center gap-2 text-gold font-semibold hover:text-gold/80 transition-colors"
          >
            {t("seeAll")}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
