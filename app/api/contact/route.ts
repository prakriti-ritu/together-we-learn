import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  phone: z.string().min(10).max(15),
  course: z.string().min(1).max(50),
  message: z.string().max(1000).optional(),
  preferredTime: z.string().max(100).optional(),
  type: z.enum(["contact", "demo"]).optional(),
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input" },
        { status: 400 }
      );
    }

    const { name, phone, course, message, preferredTime, type } = parsed.data;
    const isDemo = type === "demo";

    // Rate limiting via Upstash (if configured)
    const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
    const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (upstashUrl && upstashToken) {
      const { Ratelimit } = await import("@upstash/ratelimit");
      const { Redis } = await import("@upstash/redis");

      const redis = new Redis({
        url: upstashUrl,
        token: upstashToken,
      });

      const ratelimit = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(3, "1 h"),
      });

      const ip = request.headers.get("x-forwarded-for") || "anonymous";
      const { success } = await ratelimit.limit(ip);

      if (!success) {
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          { status: 429 }
        );
      }
    }

    // Send email via Resend (if configured)
    const resendKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;

    if (resendKey && contactEmail) {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);

      const row = (icon: string, label: string, value: string) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #eceef4;width:34px;font-size:18px;vertical-align:top;">${icon}</td>
          <td style="padding:10px 0;border-bottom:1px solid #eceef4;vertical-align:top;">
            <div style="font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#8b91a6;font-weight:600;">${label}</div>
            <div style="font-size:15px;color:#0b0e1a;margin-top:2px;">${value}</div>
          </td>
        </tr>`;

      const title = isDemo ? "New Free Demo Booking 🎯" : "New Contact Enquiry ✉️";

      const html = `
        <div style="background:#f6f7fb;padding:24px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
          <div style="max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #e6e8f0;border-radius:16px;overflow:hidden;">
            <div style="background:linear-gradient(135deg,#6C4CF1,#5B3FE0);padding:20px 24px;color:#ffffff;">
              <div style="font-size:13px;letter-spacing:.1em;text-transform:uppercase;opacity:.85;">A Carrier to Career</div>
              <div style="font-size:20px;font-weight:700;margin-top:4px;">${title}</div>
            </div>
            <div style="padding:12px 24px 20px;">
              <table style="width:100%;border-collapse:collapse;">
                ${row("👤", "Name", escapeHtml(name))}
                ${row("📱", "Phone / WhatsApp", escapeHtml(phone))}
                ${row("📚", "Course", escapeHtml(course))}
                ${preferredTime ? row("⏰", "Preferred time", escapeHtml(preferredTime)) : ""}
                ${message ? row("💬", "Message", escapeHtml(message)) : ""}
              </table>
              <div style="margin-top:18px;text-align:center;">
                <a href="tel:${escapeHtml(phone)}" style="display:inline-block;background:#5B3FE0;color:#fff;text-decoration:none;font-weight:600;padding:11px 22px;border-radius:10px;font-size:14px;">📞 Call ${escapeHtml(name)}</a>
              </div>
            </div>
            <div style="padding:14px 24px;background:#f6f7fb;color:#8b91a6;font-size:12px;text-align:center;">
              Sent from your website ${isDemo ? "free-demo booking" : "contact"} form.
            </div>
          </div>
        </div>`;

      await resend.emails.send({
        from: "A Carrier to Career <onboarding@resend.dev>",
        to: contactEmail,
        subject: isDemo
          ? `🎯 FREE DEMO request from ${escapeHtml(name)}`
          : `✉️ New enquiry from ${escapeHtml(name)}`,
        html,
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
