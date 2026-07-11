"use client";

import { useState } from "react";

interface QA {
  q: string;
  a: string;
}

function FAQItem({ item, index }: { item: QA; index: number }) {
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
          <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
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

export default function FaqAccordion({ questions }: { questions: QA[] }) {
  return (
    <div className="space-y-3">
      {questions.map((item, i) => (
        <FAQItem key={i} item={item} index={i} />
      ))}
    </div>
  );
}
