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
  title: "Free Bazi Reading Online — Chinese Astrology & Fortune Telling | MysticSage",
  description:
    "Free online Bazi (Eight Characters) reading based on 5,000-year-old Chinese metaphysics. Discover your destiny, personality, and life path. Calculate your Four Pillars, check elemental balance, and get personalized insights — no signup required, all in your browser.",
  keywords: [
    "free bazi reading", "bazi calculator", "Chinese astrology", "four pillars of destiny",
    "八字", "Chinese fortune telling", "bazi chart", "day master", "five elements",
    "Chinese zodiac", "feng shui", "I Ching", "love compatibility", "face reading",
    "chinese metaphysics", "zi wei dou shu", "birth chart chinese", "elemental chart",
    "free Chinese astrology online",
  ],
  verification: {
    google: "google-site-verification" content="C1nGHsDw8FE3xoZ-lOXGZFpxodNcrMe834fPZAQnITs",
  },
  openGraph: {
    title: "Free Bazi Reading — Discover Your Chinese Astrology Chart Online",
    description:
      "Get your free Bazi (Four Pillars) reading. Chinese astrology calculator reveals your destiny, personality, and fortune based on your birth date.",
    type: "website",
    locale: "en_US",
    siteName: "MysticSage",
    url: "https://mystic8zi.top",
    countryName: "United States",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Bazi Reading Online — MysticSage",
    description: "Discover your destiny with free Chinese astrology. Calculate your Bazi chart, check elemental balance, and get personalized insights.",
  },
  robots: {
    index: true,
    follow: true,
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
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-04B8Z44JPM"></script>
      <script dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-04B8Z44JPM');`
      }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "MysticSage",
          "url": "https://mystic8zi.top",
          "description": "Free online Bazi (Chinese astrology) reading platform. Calculate your Four Pillars of Destiny, check Five Elements balance, and discover your true nature.",
          "inLanguage": ["en", "zh-CN"],
          "about": {
            "@type": "Thing",
            "name": "Bazi Chinese Astrology"
          },
          "audience": {
            "@type": "Audience",
            "audienceType": ["People interested in Chinese culture", "Spirituality seekers", "Astrology enthusiasts"]
          }
        })
      }} />
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
