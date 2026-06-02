import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Chinese Face Reading - Mian Xiang Fortune Telling | MysticSage",
  description: "Free online Chinese face reading (Mian Xiang). Learn how facial features reveal personality, fortune, and destiny. Traditional Chinese physiognomy guide — no signup required.",
  openGraph: {
    title: "Chinese Face Reading - Mian Xiang | MysticSage",
    description: "Free online face reading guide. Learn how facial features reveal fortune and destiny.",
    url: "https://mystic8zi.top/face",
  },
  twitter: {
    title: "Chinese Face Reading - Mian Xiang | MysticSage",
    description: "Free online Chinese face reading guide.",
  },
  alternates: { canonical: "https://mystic8zi.top/face" },
};

export default function FaceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
