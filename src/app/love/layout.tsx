import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Bazi Love Compatibility - Chinese Astrology Match | MysticSage",
  description: "Free online Bazi love compatibility analysis. Compare two birth charts to discover your elemental compatibility. Chinese astrology love match calculator — no signup required.",
  openGraph: {
    title: "Bazi Love Compatibility - Chinese Astrology Match | MysticSage",
    description: "Free online Bazi love compatibility analysis. Compare birth charts to discover your elemental match.",
    url: "https://mystic8zi.top/love",
  },
  twitter: {
    title: "Bazi Love Compatibility - Chinese Astrology Match | MysticSage",
    description: "Free Bazi love compatibility analysis. Compare birth charts to discover your match.",
  },
  alternates: { canonical: "https://mystic8zi.top/love" },
};

export default function LoveLayout({ children }: { children: React.ReactNode }) {
  return children;
}
