import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/sections/ContactForm";
import PhoneIcon from "@/components/ui/PhoneIcon";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return {
    title: t("heading"),
    description: t("subheading"),
  };
}

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <section className="py-16 md:py-20 bg-cream">
      <div className="max-w-4xl mx-auto px-4">
        <SectionHeading title={t("heading")} subtitle={t("subheading")} />

        {/* Contact Method Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {/* Phone */}
          <a
            href="tel:+917247400000"
            className="rounded-2xl bg-card-white border border-border-warm border-t-[3px] border-t-gold p-5 shadow-card transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-card-hover text-center"
          >
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
              <PhoneIcon className="w-5 h-5 text-gold" />
            </div>
            <p className="text-sm text-text-secondary mb-1">{t("phone")}</p>
            <p className="font-semibold text-navy">+91 7247400000</p>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/917247400000"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-card-white border border-border-warm border-t-[3px] border-t-whatsapp p-5 shadow-card transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-card-hover text-center"
          >
            <div className="w-12 h-12 rounded-full bg-whatsapp/10 flex items-center justify-center mx-auto mb-3">
              <WhatsAppIcon className="w-5 h-5 text-whatsapp" />
            </div>
            <p className="text-sm text-text-secondary mb-1">{t("whatsapp")}</p>
            <p className="font-semibold text-navy">Chat on WhatsApp</p>
          </a>

          {/* Email */}
          <a
            href="mailto:prakriti@gmail.com"
            className="rounded-2xl bg-card-white border border-border-warm border-t-[3px] border-t-navy p-5 shadow-card transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-card-hover text-center"
          >
            <div className="w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm text-text-secondary mb-1">{t("email")}</p>
            <p className="font-semibold text-navy">prakriti@gmail.com</p>
          </a>
        </div>

        {/* Contact Form */}
        <ContactForm />
      </div>
    </section>
  );
}
