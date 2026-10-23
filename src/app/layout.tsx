import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Providers } from "@/components/Providers";
import "./globals.css";

// Self-hosted fonts (SIL Open Font License) — no Google Fonts request at runtime.
const anton = localFont({
  src: "../fonts/anton-latin-400-normal.woff2",
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});
const manrope = localFont({
  src: "../fonts/manrope-latin-wght-normal.woff2",
  weight: "200 800",
  variable: "--font-body",
  display: "swap",
});
const balooBhai = localFont({
  src: [
    { path: "../fonts/baloo-bhai-2-gujarati-600-normal.woff2", weight: "600" },
    { path: "../fonts/baloo-bhai-2-gujarati-800-normal.woff2", weight: "800" },
  ],
  variable: "--font-gu-display",
  display: "swap",
  preload: false,
});
const notoGu = localFont({
  src: [
    { path: "../fonts/noto-sans-gujarati-gujarati-400-normal.woff2", weight: "400" },
    { path: "../fonts/noto-sans-gujarati-gujarati-600-normal.woff2", weight: "600" },
  ],
  variable: "--font-gu-body",
  display: "swap",
  preload: false,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://varakh.vercel.app";
const title = "VARAKH — Handcrafted Indian Sweets & Snacks";
const description =
  "Kaju katli, pista roll, kesar peda and masala khakhra, made by hand in small batches. Shop online in English or Gujarati.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: ["kaju katli", "pista roll", "kesar peda", "khakhra", "Indian sweets online", "Gujarati sweets"],
  openGraph: {
    type: "website",
    url: "/",
    siteName: "VARAKH",
    title,
    description,
    locale: "en_IN",
    alternateLocale: ["gu_IN"],
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "VARAKH kaju katli on a caramel background" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#8A5A2B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${anton.variable} ${manrope.variable} ${balooBhai.variable} ${notoGu.variable}`}>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
