"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

function FAQItem({ item, index }: { item: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
        open
          ? "bg-card-white border-gold/30 shadow-card-hover"
          : "bg-cream border-border-warm shadow-card hover:border-gold/20"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left min-h-[48px] group"
        aria-expanded={open}
      >
        <span className="flex items-start gap-3 pr-4">
          <span
            className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-colors duration-300 ${
              open ? "bg-gold text-white" : "bg-gold/10 text-gold"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={`font-semibold text-sm md:text-base transition-colors duration-200 ${
              open ? "text-navy" : "text-navy/80 group-hover:text-navy"
            }`}
          >
            {item.q}
          </span>
        </span>
        <span
          className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
            open ? "bg-gold/10 rotate-180" : "bg-border-warm group-hover:bg-gold/10"
          }`}
        >
          <svg
            className="w-4 h-4 text-gold"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 md:px-6 md:pb-6 ml-10">
            <div className="border-l-[3px] border-gold/25 pl-4 text-text-secondary leading-relaxed text-sm md:text-base">
              {item.a}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const t = useTranslations("faq");
  const questions = t.raw("questions") as { q: string; a: string }[];

  return (
    <section className="py-16 md:py-24 bg-navy/[0.02]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left side — heading + CTA */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {/* FAQ icon */}
            <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold mb-6">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>

            <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-4 tracking-tight">
              {t("heading")}
            </h2>
            <div className="w-10 h-[3px] bg-gradient-to-r from-gold to-gold-light rounded-full mb-4" />
            <p className="text-text-secondary leading-relaxed mb-8">
              {t("subtitle")}
            </p>

            {/* Still have questions CTA */}
            <div className="rounded-2xl bg-cream border border-border-warm p-6">
              <p className="font-semibold text-navy mb-3">{t("stillHaveQuestions")}</p>
              <a
                href="https://wa.me/917247400000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-whatsapp text-white font-semibold rounded-xl px-5 py-3 min-h-[48px] shadow-button transition-all duration-250 hover:bg-whatsapp/90 hover:shadow-button-hover hover:scale-[1.02]"
              >
                <WhatsAppIcon className="w-5 h-5" />
                {t("chatWithUs")}
              </a>
            </div>
          </div>

          {/* Right side — accordion */}
          <div className="space-y-3">
            {questions.map((item, i) => (
              <FAQItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
