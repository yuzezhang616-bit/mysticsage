import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Chinese Baby Name Generator - Bazi Naming | MysticSage",
  description: "Free Chinese name generator based on Bazi (Eight Characters). Find an auspicious Chinese name with the right Five Elements balance. Name suggestions with meaning analysis.",
  openGraph: {
    title: "Chinese Baby Name Generator - Bazi Naming | MysticSage",
    description: "Free Chinese name generator based on Bazi. Find the perfect auspicious name.",
    url: "https://mystic8zi.top/naming",
  },
  twitter: {
    title: "Chinese Baby Name Generator - Bazi Naming | MysticSage",
    description: "Free Chinese name generator based on Five Elements balance.",
  },
  alternates: { canonical: "https://mystic8zi.top/naming" },
};

export default function NamingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
