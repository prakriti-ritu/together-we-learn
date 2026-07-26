import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { cormorant, jakartaSans, mukta } from "@/lib/fonts";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileStickyBar from "@/components/layout/MobileStickyBar";
import DemoPopup from "@/components/ui/DemoPopup";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { getContact } from "@/sanity/lib/fetch";
import "@/app/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "hi")) {
    notFound();
  }

  const messages = await getMessages();
  const contact = await getContact();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${cormorant.variable} ${jakartaSans.variable} ${mukta.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        {/* If JS is unavailable, ensure scroll-reveal content is always visible (SEO/a11y safety) */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
      </head>
      <body className={`min-h-full flex flex-col ${locale === "hi" ? "font-hindi" : ""}`}>
        {/* Apply saved theme before first paint (external static file, via next/script) */}
        <Script src="/theme-init.js" strategy="beforeInteractive" />
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} contact={contact} />
          <main className="flex-1 overflow-x-hidden">{children}</main>
          <Footer locale={locale} contact={contact} />
          <MobileStickyBar contact={contact} />
          <DemoPopup locale={locale} whatsapp={contact.whatsapp} />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
