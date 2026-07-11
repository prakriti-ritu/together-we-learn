import { Cormorant_Garamond, Plus_Jakarta_Sans, Mukta } from "next/font/google";

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
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
});
