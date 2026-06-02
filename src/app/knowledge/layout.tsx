import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Bazi Knowledge Base - Learn Chinese Astrology | MysticSage",
  description: "Free Chinese astrology knowledge base. Learn Bazi, Five Elements, Feng Shui, and more. 30+ in-depth articles covering day masters, zodiac, I Ching, face reading, and dream interpretation.",
  openGraph: {
    title: "Bazi Knowledge Base - Learn Chinese Astrology | MysticSage",
    description: "Free Bazi knowledge base with 30+ articles on Chinese astrology, five elements, and more.",
    url: "https://mystic8zi.top/knowledge",
  },
  twitter: {
    title: "Bazi Knowledge Base - Learn Chinese Astrology | MysticSage",
    description: "Free Chinese astrology knowledge base.",
  },
  alternates: { canonical: "https://mystic8zi.top/knowledge" },
};

export default function KnowledgeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
