import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Noto_Serif_SC } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-noto-sc",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

// ⚠️ 首页专用metadata（强SEO标题）
// 子页面请通过 layout.tsx 或 generateMetadata 自行覆盖
export const metadata: Metadata = {
  title: "Free Bazi Reading Online — Chinese Astrology & Fortune Telling | MysticSage",
  description:
    "Free online Bazi (Eight Characters) reading based on 5,000-year-old Chinese metaphysics. Calculate your Four Pillars of Destiny, check Five Elements balance, and get personalized insights — no signup required, all in your browser.",
  keywords: [
    "free bazi reading", "bazi calculator", "Chinese astrology", "four pillars of destiny",
    "八字", "Chinese fortune telling", "bazi chart", "day master", "five elements",
    "Chinese zodiac", "feng shui", "I Ching", "love compatibility", "face reading",
    "chinese metaphysics", "zi wei dou shu", "birth chart chinese", "elemental chart",
    "free Chinese astrology online",
  ],
  verification: {
    google: "C1nGHsDw8FE3xoZ-lOXGZFpxodNcrMe834fPZAQnITs",
  },
  openGraph: {
    title: "Free Bazi Reading Online — Chinese Astrology & Fortune Telling | MysticSage",
    description:
      "Free online Bazi (Eight Characters) reading. Calculate your Four Pillars of Destiny and check Five Elements balance.",
    type: "website",
    locale: "en_US",
    siteName: "MysticSage",
    url: "https://mystic8zi.top",
    countryName: "United States",
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'MysticSage - Free Bazi Reading Online',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Bazi Reading Online — Chinese Astrology | MysticSage",
    description: "Free online Bazi reading. Calculate your Four Pillars and get personalized insights.",
    images: ['/og-image.svg'],
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
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${notoSerifSC.variable} h-full antialiased`}
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
