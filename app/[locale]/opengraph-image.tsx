import { ImageResponse } from "next/og";

// Branded social-share image (WhatsApp/Facebook/LinkedIn/X previews).
// Generated at build time as a static PNG — no external asset or font needed.
export const alt = "A Carrier to Career — Spoken English Classes, Ambikapur";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0A0D18 0%, #12162A 55%, #1E2440 100%)",
          color: "#EEF0F8",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#9B86FF",
            marginBottom: 24,
          }}
        >
          Live Online Spoken English
        </div>
        <div style={{ fontSize: 78, fontWeight: 700, lineHeight: 1.05 }}>
          A Carrier to Career
        </div>
        <div style={{ fontSize: 40, color: "#A2A8C0", marginTop: 20 }}>
          Speak English with confidence — from anywhere in Chhattisgarh
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 48,
            fontSize: 28,
            color: "#EEF0F8",
          }}
        >
          <span style={{ color: "#2FE3B7", fontSize: 34 }}>★</span>
          Prakriti Keshri · M.A. English (Gold Medalist) · CG SET Qualified
        </div>
      </div>
    ),
    { ...size }
  );
}
