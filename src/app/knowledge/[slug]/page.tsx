import type { Metadata } from 'next';
import KnowledgeArticlePage from './KnowledgeArticlePage';
import { articles } from '@/lib/knowledge/articles';

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug;
  const article = articles[slug];
  
  if (!article) {
    return { title: 'Article Not Found - MysticSage' };
  }

  const title = `${article.en.title} - Bazi Chinese Astrology | MysticSage`;
  const description = `Learn about ${article.en.title}. Free Bazi reading and Chinese astrology guide at MysticSage.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://mystic8zi.top/knowledge/${slug}`,
      siteName: 'MysticSage',
      type: 'article',
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: `https://mystic8zi.top/knowledge/${slug}`,
    },
  };
}

export default function Page() {
  return <KnowledgeArticlePage />;
}
