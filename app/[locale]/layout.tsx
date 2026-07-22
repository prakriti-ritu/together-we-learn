import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { cormorant, jakartaSans, mukta } from "@/lib/fonts";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileStickyBar from "@/components/layout/MobileStickyBar";
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
      className={`${cormorant.variable} ${jakartaSans.variable} ${mukta.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body className={`min-h-full flex flex-col ${locale === "hi" ? "font-hindi" : ""}`}>
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} contact={contact} />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} contact={contact} />
          <MobileStickyBar contact={contact} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
