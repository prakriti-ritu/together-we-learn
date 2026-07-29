import { Cormorant_Garamond, Plus_Jakarta_Sans, Mukta } from "next/font/google";

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant",
  // Only 400 (unweighted usages), 600 (font-semibold), and 700 (font-bold) are
  // ever paired with font-serif in the codebase (verified via grep) — 500 was
  // dead weight on the LCP font's preload payload.
  weight: ["400", "600", "700"],
});

export const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export const mukta = Mukta({
  subsets: ["devanagari", "latin"],
  display: "swap",
  variable: "--font-mukta",
  weight: ["300", "400", "500", "600", "700"],
  // next/font decides preload per route segment at build time, not per runtime
  // locale — so English pages were downloading Mukta's Devanagari weights even
  // though only body.font-hindi (locale === "hi") ever renders text in it.
  // display:"swap" already means hi pages simply swap the font in when it loads.
  preload: false,
});
