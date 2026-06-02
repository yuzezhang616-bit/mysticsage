import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Feng Shui Guide - Chinese Geomancy Basics | MysticSage",
  description: "Free Feng Shui guide. Learn Bagua, Five Elements, and how to harmonize your living space with ancient Chinese geomancy. Beginner-friendly Feng Shui tips.",
  openGraph: {
    title: "Feng Shui Guide - Chinese Geomancy Basics | MysticSage",
    description: "Free Feng Shui guide. Learn Bagua, Five Elements, and space harmonization.",
    url: "https://mystic8zi.top/fengshui",
  },
  twitter: {
    title: "Feng Shui Guide - Chinese Geomancy Basics | MysticSage",
    description: "Free Feng Shui guide for beginners.",
  },
  alternates: { canonical: "https://mystic8zi.top/fengshui" },
};

export default function FengshuiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
