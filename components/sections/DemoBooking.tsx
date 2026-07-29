"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import CalendarIcon from "@/components/ui/CalendarIcon";

/**
 * Free-demo booking form — the primary lead-conversion element.
 * Posts to the existing /api/contact route with type:"demo" so demo requests
 * are clearly marked in the owner's email (and still rate-limited + validated).
 */
export default function DemoBooking() {
  const t = useTranslations("demoBooking");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const fd = new FormData(e.currentTarget);
    const data = {
      name: fd.get("name") as string,
      phone: fd.get("phone") as string,
      course: "Free Demo Class",
      preferredTime: (fd.get("preferredTime") as string) || undefined,
      type: "demo" as const,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="book-demo" className="bg-cream relative overflow-hidden py-16 md:py-24 scroll-mt-20">
      <div className="glow-blob" style={{ width: 460, height: 460, background: "var(--glow-a)", top: -160, left: "8%" }} aria-hidden="true" />
      <div className="glow-blob" style={{ width: 360, height: 360, background: "var(--glow-b)", bottom: -180, right: "8%" }} aria-hidden="true" />
      <div className="max-w-xl mx-auto px-4 relative">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">{t("eyebrow")}</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy mt-3 tracking-tight text-balance">
            {t("heading")}
          </h2>
          <p className="text-text-secondary mt-3">{t("subtitle")}</p>
        </div>

        {status === "success" ? (
          <div className="border-trail glass rounded-3xl p-8 flex items-center justify-center min-h-[220px] shadow-card">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-success-green/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-success-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="text-navy font-semibold">{t("success")}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="border-trail glass rounded-3xl p-6 md:p-8 shadow-card space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="demo-name" className="block text-sm font-medium text-navy mb-1.5">{t("nameLabel")}</label>
                <input id="demo-name" name="name" type="text" required placeholder={t("namePlaceholder")}
                  className="w-full rounded-xl border border-border-warm bg-cream px-4 py-3 text-navy placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent" />
              </div>
              <div>
                <label htmlFor="demo-phone" className="block text-sm font-medium text-navy mb-1.5">{t("phoneLabel")}</label>
                <input id="demo-phone" name="phone" type="tel" required placeholder={t("phonePlaceholder")}
                  className="w-full rounded-xl border border-border-warm bg-cream px-4 py-3 text-navy placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent" />
              </div>
            </div>
            <div>
              <label htmlFor="demo-time" className="block text-sm font-medium text-navy mb-1.5">{t("timeLabel")}</label>
              <select id="demo-time" name="preferredTime"
                className="w-full rounded-xl border border-border-warm bg-cream px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent">
                <option value="">{t("timePlaceholder")}</option>
                <option value={t("timeMorning")}>{t("timeMorning")}</option>
                <option value={t("timeAfternoon")}>{t("timeAfternoon")}</option>
                <option value={t("timeEvening")}>{t("timeEvening")}</option>
                <option value={t("timeWeekend")}>{t("timeWeekend")}</option>
              </select>
            </div>

            {status === "error" && <p className="text-red-600 text-sm">{t("error")}</p>}

            <button type="submit" disabled={status === "sending"}
              className="w-full bg-gold text-white font-semibold rounded-xl py-3.5 shadow-button hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {status === "sending" ? t("sending") : t("submit")}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
