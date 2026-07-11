"use client";

import { useState } from "react";
import Link from "next/link";

interface MobileMenuProps {
  locale: string;
  links: { href: string; label: string }[];
}

export default function MobileMenu({ links }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-navy"
        aria-label="Menu"
        aria-expanded={open}
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
      {open && (
        <div className="absolute top-16 left-0 right-0 bg-card-white border-b border-border-warm shadow-card z-40">
          <nav className="flex flex-col p-4 gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 px-4 rounded-lg text-navy font-medium hover:bg-cream transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
