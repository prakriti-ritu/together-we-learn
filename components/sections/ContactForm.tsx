"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      course: formData.get("course") as string,
      message: formData.get("message") as string,
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

  if (status === "success") {
    return (
      <div className="bg-card-white rounded-2xl border border-border-warm p-8 flex items-center justify-center min-h-[300px] shadow-card">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-success-green/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-success-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="text-navy font-semibold">{t("success")}</p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card-white rounded-2xl border border-border-warm p-6 md:p-8 shadow-card space-y-5"
    >
      {/* Name + Phone side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-navy mb-1.5">
            {t("nameLabel")}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder={t("namePlaceholder")}
            className="w-full rounded-xl border border-border-warm bg-cream px-4 py-3 text-navy placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-navy mb-1.5">
            {t("phoneLabel")}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder={t("phonePlaceholder")}
            className="w-full rounded-xl border border-border-warm bg-cream px-4 py-3 text-navy placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="course" className="block text-sm font-medium text-navy mb-1.5">
          {t("courseLabel")}
        </label>
        <select
          id="course"
          name="course"
          required
          className="w-full rounded-xl border border-border-warm bg-cream px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
        >
          <option value="">{t("coursePlaceholder")}</option>
          <option value="1month">{t("courseOptions.1month")}</option>
          <option value="3months">{t("courseOptions.3months")}</option>
          <option value="1monthAdv">{t("courseOptions.1monthAdv")}</option>
          <option value="other">{t("courseOptions.other")}</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-navy mb-1.5">
          {t("messageLabel")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder={t("messagePlaceholder")}
          className="w-full rounded-xl border border-border-warm bg-cream px-4 py-3 text-navy placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-red-600 text-sm">{t("error")}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-navy text-white font-semibold rounded-xl py-3.5 hover:bg-navy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? t("sending") : t("submitButton")}
      </button>
    </form>
  );
}
