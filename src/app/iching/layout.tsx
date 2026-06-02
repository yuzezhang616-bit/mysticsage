import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "I Ching Divination - Free Online Yijing Reading | MysticSage",
  description: "Free online I Ching (Yijing) divination. Cast coins and receive ancient wisdom from the Book of Changes. Chinese oracle reading — no signup required.",
  openGraph: {
    title: "I Ching Divination - Free Online Yijing Reading | MysticSage",
    description: "Free online I Ching divination. Cast coins and receive wisdom from the Book of Changes.",
    url: "https://mystic8zi.top/iching",
  },
  twitter: {
    title: "I Ching Divination - Free Online Yijing Reading | MysticSage",
    description: "Free online I Ching divination and Yijing reading.",
  },
  alternates: { canonical: "https://mystic8zi.top/iching" },
};

export default function IChingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
