import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MysticSage — Discover Your Destiny Through Ancient Chinese Wisdom",
  description:
    "Unlock the secrets of your Bazi (Eight Characters) chart. Based on your birth date and time, MysticSage reveals your unique cosmic blueprint using 5,000-year-old Chinese wisdom.",
  keywords: [
    "Bazi", "Chinese astrology", "Four Pillars", "八字", "fortune telling",
    "birth chart", "Chinese zodiac", "elemental balance", "feng shui",
  ],
  openGraph: {
    title: "MysticSage — Ancient Chinese Bazi Reading",
    description:
      "Discover your destiny through the ancient wisdom of Bazi. Your birth chart reveals your true nature.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
