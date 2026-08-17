import { getTranslations } from "next-intl/server";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import BatchCountdown from "./BatchCountdown";
import { pick, type Batch, type Locale } from "@/sanity/lib/fetch";
import { formatBatchDate } from "@/lib/date";
import { waHref } from "@/lib/site";

export default async function BatchCard({
  batch,
  locale,
  whatsapp,
}: {
  batch: Batch;
  locale: Locale;
  whatsapp: string;
}) {
  const t = await getTranslations("batches");

  const title = pick(batch.title, locale);
  const schedule = pick(batch.schedule, locale);
  const seatsTag = pick(batch.seatsTag, locale);
  const isRunning = batch.status === "running";
  const startText = formatBatchDate(batch.startDate, locale);

  const waMessage = t("waMessage", { batch: title || "spoken English" });

  return (
    <div className="rounded-2xl border border-border-warm bg-card-white shadow-card p-6 md:p-7 flex flex-col gap-4 relative overflow-hidden transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-card-hover">
      {/* Status badge + online pill */}
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
            isRunning
              ? "bg-success-green/15 text-success-green"
              : "bg-gold/15 text-gold"
          }`}
        >
          {isRunning && (
            <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-success-green" />
          )}
          {isRunning ? t("statusRunning") : t("statusUpcoming")}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/[0.05] text-text-secondary px-3 py-1 text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          {t("onlineBadge")}
        </span>
        {seatsTag && (
          <span className="inline-flex items-center rounded-full bg-gold/10 text-gold px-3 py-1 text-xs font-semibold">
            {seatsTag}
          </span>
        )}
      </div>

      <h3 className="font-serif text-xl md:text-2xl font-bold text-navy tracking-tight leading-tight">
        {title}
      </h3>

      {/* Start date (upcoming) or "running now" + countdown */}
      {!isRunning && startText && (
        <div className="flex items-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-2 text-navy font-semibold text-sm">
            <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            {t("starts")} {startText}
          </span>
          <BatchCountdown startDate={batch.startDate} />
        </div>
      )}

      {/* Schedule / timing */}
      {schedule && (
        <div className="flex items-center gap-2 text-text-secondary text-sm">
          <svg className="w-4 h-4 text-gold shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
          <span>
            <span className="font-medium text-navy">{t("timing")}:</span> {schedule}
          </span>
        </div>
      )}

      <a
        href={waHref(whatsapp, waMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto w-full inline-flex items-center justify-center gap-2 bg-whatsapp text-white font-semibold rounded-xl py-3 min-h-[48px] shadow-button transition-all duration-250 hover:bg-whatsapp/90 hover:shadow-button-hover hover:scale-[1.02] text-sm"
      >
        <WhatsAppIcon className="w-5 h-5" />
        {t("enquireWhatsApp")}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  );
}
