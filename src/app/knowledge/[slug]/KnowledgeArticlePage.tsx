'use client';

import { useParams } from 'next/navigation';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { articles } from '@/lib/knowledge/articles';
import type { ArticleContent, ArticleSection } from '@/lib/knowledge/articles';

const RELATED_SLUGS = ['five-elements', 'chinese-zodiac-complete', 'what-is-bazi', 'tai-sui-2026'];
// Rough reading time: average 200 words/min
function estimateReadingTime(text: string): number {
  const wordCount = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export default function KnowledgeArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const article: ArticleContent | undefined = articles[slug];

  if (!article) {
    return (
      <main className="min-h-screen relative z-10 bg-[#07080a]">
        <NavBar />
        <div className="max-w-3xl mx-auto px-4 py-24 text-center">
          <div className="text-5xl mb-6">🔮</div>
          <h1 className="text-2xl font-bold gold-text mb-4">Article Not Found</h1>
          <p className="text-[#9b8e7a] text-sm mb-6">This knowledge article does not exist.</p>
          <a href="/knowledge" className="text-[#d4af37] hover:text-[#f0d68a] text-sm transition-colors">← Back to Knowledge Base</a>
        </div>
      </main>
    );
  }

  const content = article.en;
  const pageUrl = `https://mystic8zi.top/knowledge/${slug}`;
  const shareText = `${content.title} — Chinese Astrology Guide`;
  const readTime = estimateReadingTime(content.sections.map((s: ArticleSection) => {
    if (typeof s.p === 'string') return s.p;
    if (Array.isArray(s.p)) return s.p.join(' ');
    return '';
  }).join(' '));

  return (
    <>
      <div className="video-bg">
        <video autoPlay muted loop playsInline className="bg-video"><source src="/bg.mp4" type="video/mp4" /></video>
        <div className="video-overlay" />
      </div>
      <main className="min-h-screen relative z-10">
        <NavBar />
        <article className="max-w-3xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="text-xs text-[#6b5f4a] mb-6 flex items-center gap-2">
            <a href="/" className="hover:text-[#d4af37] transition-colors">Home</a>
            <span className="opacity-40">/</span>
            <a href="/knowledge" className="hover:text-[#d4af37] transition-colors">Knowledge</a>
            <span className="opacity-40">/</span>
            <span className="text-[#9b8e7a]">{content.title}</span>
          </nav>

          <span className="text-3xl mb-4 block">{article.icon}</span>
          <h1 className="text-2xl font-bold gold-text mb-1">{content.title}</h1>
          <p className="text-[#9b8e7a]/60 text-xs mb-6 flex items-center gap-3">
            <span>MysticSage · Chinese Astrology Guide</span>
            <span className="w-1 h-1 rounded-full bg-[#6b5f4a]" />
            <span>{readTime} min read</span>
          </p>

          {content.sections.map((section: ArticleSection, i: number) => (
            <section key={i} className="mb-10">
              {section.h2 && <h2 className="text-lg font-semibold gold-text mb-3">{section.h2}</h2>}
              {section.h3 && <h3 className="text-base font-medium text-[#d4af37]/80 mb-2">{section.h3}</h3>}
              {section.p && (
                Array.isArray(section.p)
                  ? section.p.map((para: string, j: number) => (
                      <p key={j} className="text-sm text-[#c4b998] leading-relaxed mb-3">{para}</p>
                    ))
                  : <p className="text-sm text-[#c4b998] leading-relaxed mb-3">{section.p}</p>
              )}
              {section.ul && (
                <ul className="space-y-1 mb-4">
                  {section.ul.map((item: string, j: number) => (
                    <li key={j} className="text-sm text-[#c4b998] flex items-start gap-2">
                      <span className="text-[#d4af37] mt-1">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {/* Inline CTA after every 3rd section */}
              {i > 0 && i % 3 === 0 && (
                <div className="my-6 bg-black/20 backdrop-blur-lg border border-[#d4af37]/20 rounded-xl p-4 text-center">
                  <p className="text-xs text-[#9b8e7a] mb-2">✨ Curious about your own Bazi chart?</p>
                  <a href="/" className="inline-block text-xs text-[#d4af37] hover:text-[#f0d68a] transition-colors font-medium">
                    Get Your Free Reading →
                  </a>
                </div>
              )}
            </section>
          ))}

          {/* Bottom CTA + Share + Related */}
          <div className="mt-12 pt-6 border-t border-white/[0.06] space-y-4">
            <div className="bg-black/20 backdrop-blur-lg border border-white/[0.07] rounded-xl p-5">
              <p className="text-xs text-[#9b8e7a] leading-relaxed">✨ Experience your own Bazi reading — free, no signup required, all in your browser.</p>
              <a href="/" className="inline-block mt-2 text-xs text-[#d4af37] hover:text-[#f0d68a] transition-colors">Get Your Free Bazi Reading →</a>
            </div>

            <div className="bg-black/20 backdrop-blur-lg border border-white/[0.07] rounded-xl p-5">
              <p className="text-[10px] text-[#6b5f4a] mb-3 uppercase tracking-wider">📤 Share this article</p>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`, '_blank','width=600,height=400')}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-[#e8dcc8] transition-all">𝕏 Twitter</button>
                <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`, '_blank','width=600,height=400')}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-[#e8dcc8] transition-all">f Facebook</button>
                <button onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + pageUrl)}`, '_blank','width=600,height=400')}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-[#e8dcc8] transition-all">💬 WhatsApp</button>
                <button onClick={() => navigator.clipboard.writeText(pageUrl).then(() => alert('Link copied!'))}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-[#e8dcc8] transition-all">📋 Copy Link</button>
              </div>
            </div>

            <div className="bg-black/20 backdrop-blur-lg border border-white/[0.07] rounded-xl p-5">
              <p className="text-[10px] text-[#6b5f4a] mb-3 uppercase tracking-wider">📖 Related articles</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {RELATED_SLUGS.filter(s => s !== slug).slice(0, 3).map(s => {
                  const a = articles[s];
                  if (!a) return null;
                  return (
                    <a key={s} href={`/knowledge/${s}`} className="bg-white/[0.03] rounded-lg p-3 border border-white/[0.06] hover:border-[#d4af37]/20 transition-all">
                      <span className="text-sm mr-1">{a.icon}</span>
                      <span className="text-xs text-[#9b8e7a]">{a.en.title}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </article>
        <Footer />
      </main>
    </>
  );
}
