import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Dream Interpretation - Chinese Dream Dictionary | MysticSage",
  description: "Free online Chinese dream interpretation. Discover the hidden meanings of your dreams through ancient Chinese wisdom. Dream dictionary with 100+ dream symbols explained.",
  openGraph: {
    title: "Dream Interpretation - Chinese Dream Dictionary | MysticSage",
    description: "Free Chinese dream interpretation guide. Discover what your dreams mean.",
    url: "https://mystic8zi.top/dream",
  },
  twitter: {
    title: "Dream Interpretation - Chinese Dream Dictionary | MysticSage",
    description: "Free Chinese dream interpretation and dream dictionary.",
  },
  alternates: { canonical: "https://mystic8zi.top/dream" },
};

export default function DreamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
