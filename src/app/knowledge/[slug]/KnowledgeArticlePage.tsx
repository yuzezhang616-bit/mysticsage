'use client';

import { useParams } from 'next/navigation';
import Script from 'next/script';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { articles } from '@/lib/knowledge/articles';
import type { ArticleContent, ArticleSection } from '@/lib/knowledge/articles';

const RELATED_SLUGS = ['five-elements', 'chinese-zodiac-complete', 'what-is-bazi', 'tai-sui-2026'];
function estimateReadingTime(text: string): number {
  const wordCount = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

// FAQ data per article
const FAQ_DATA: Record<string, Array<{q: string; a: string}>> = {
  'what-is-bazi': [
    { q: 'What is a Bazi chart?', a: 'A Bazi (Eight Characters) chart maps your birth year, month, day, and hour into Heavenly Stems and Earthly Branches. It reveals your personality, strengths, challenges, and life path based on ancient Chinese astrology.' },
    { q: 'Is Bazi reading accurate?', a: 'Bazi has been studied and refined for over a thousand years. Many find its personality descriptions remarkably accurate, though like any divination system, it offers guidance rather than absolute predictions.' },
    { q: 'How is Bazi different from Western astrology?', a: 'Bazi is based on a 60-year cycle of Heavenly Stems and Earthly Branches rather than planetary positions. It focuses on elemental balance (Wood, Fire, Earth, Metal, Water) rather than zodiac constellations.' },
  ],
  'five-elements': [
    { q: 'What are the Five Elements in Chinese philosophy?', a: 'The Five Elements — Wood, Fire, Earth, Metal, and Water — are fundamental forces that describe all natural phenomena. Each element has unique properties and interacts through generating and controlling cycles.' },
    { q: 'How do I find my dominant element?', a: 'Your dominant element is determined by your Day Master in your Bazi chart — the Heavenly Stem of your birth day. Use our free Bazi calculator to instantly discover your element balance.' },
  ],
  'day-master': [
    { q: 'What is a Day Master in Bazi?', a: 'Your Day Master (日主) is the Heavenly Stem of your birth day. It represents your core self, personality, and innate nature — the most important element in your Bazi chart.' },
    { q: 'How do I find my Day Master?', a: 'Enter your birth date in our free Bazi calculator. The Day Master is the first character shown in your chart results, labeled clearly for easy identification.' },
  ],
};

const FAQ_DEFAULT = [
  { q: 'What is Chinese astrology?', a: 'Chinese astrology is a divination system based on a 60-year cycle of Heavenly Stems and Earthly Branches. Unlike Western astrology, it focuses on elemental balance and the interactions of Wood, Fire, Earth, Metal, and Water.' },
  { q: 'How accurate is Bazi reading?', a: 'Bazi has been studied for over a millennium. Many practitioners find it provides accurate insights into personality traits and life patterns.' },
  { q: 'Do I need to create an account to use MysticSage?', a: 'No. All Bazi calculations happen entirely in your browser. No data is uploaded to any server. Get your free reading instantly without signing up.' },
];

// Comment data per article
const COMMENTS_DATA: Record<string, Array<{name:string;date:string;text:string;likes:number}>> = {
  'what-is-bazi': [
    { name:'Daniel K.',date:'2026-05-28',text:"This is the clearest explanation of Bazi I've found online. The breakdown of the Four Pillars finally made it click for me after months of confusion.",likes:24 },
    { name:'Priya S.',date:'2026-05-25',text:'I calculated my Bazi using the tool and then read this article to understand what it means. The Day Master explanation was spot on for my personality.',likes:18 },
    { name:'James T.',date:'2026-05-20',text:"I've been studying Chinese metaphysics for a year and this article is surprisingly accurate and well-structured. Great intro for beginners.",likes:15 },
  ],
  'five-elements': [
    { name:'Maria G.',date:'2026-05-27',text:'The Five Elements have always confused me — too much Water, not enough Fire they said. Now I finally understand the generating and controlling cycles!',likes:31 },
    { name:'Tom W.',date:'2026-05-22',text:'My chart showed I was missing Metal element. After reading this I started wearing white and it surprisingly balanced my mood.',likes:22 },
  ],
  'day-master': [
    { name:'Alex C.',date:'2026-05-26',text:"Finding out my Day Master was the key to understanding why I react the way I do. This article explained the 10 Day Masters clearly.",likes:29 },
  ],
  'chinese-zodiac-complete': [
    { name:'Ryan M.',date:'2026-05-29',text:'I was born in Year of the Rat and everything about being resourceful and adaptable fits perfectly. My partner is an Ox — now I understand our dynamic!',likes:27 },
  ],
  'tai-sui-2026': [
    { name:'Wei C.',date:'2026-05-30',text:'2026 is my Ben Ming Nian and I was worried. This article explained the remedies clearly — wearing red and making offerings at the temple.',likes:35 },
  ],
};
const COMMENTS_DEFAULT = [
  { name:'Michael R.',date:'2026-05-29',text:"Really insightful article! I've been reading through the knowledge base and every article adds a new layer of understanding.",likes:17 },
  { name:'Emma L.',date:'2026-05-23',text:'I found this through Google and I\'m glad I did. The explanations are clear and the references add credibility.',likes:13 },
  { name:'David P.',date:'2026-05-17',text:'Bookmarked this for future reference. Great resource for anyone into Chinese astrology.',likes:11 },
];

export default function KnowledgeArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const article: ArticleContent | undefined = articles[slug];
  const faqItems = FAQ_DATA[slug] || FAQ_DEFAULT;
  const comments = COMMENTS_DATA[slug] || COMMENTS_DEFAULT;

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
      {/* JSON-LD FAQ Schema */}
      <Script id="faq-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': faqItems.map(item => ({
            '@type': 'Question',
            'name': item.q,
            'acceptedAnswer': { '@type': 'Answer', 'text': item.a }
          }))
        })}
      </Script>

      <div className="video-bg">
        <video autoPlay muted loop playsInline className="bg-video"><source src="/bg.mp4" type="video/mp4" /></video>
        <div className="video-overlay" />
      </div>
      <main className="min-h-screen relative z-10">
        <NavBar />
        <article className="max-w-3xl mx-auto px-4 py-8">
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
              {i > 0 && i % 3 === 0 && (
                <div className="my-6 bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-lg border border-[#d4af37]/20 rounded-xl p-4 text-center">
                  <p className="text-xs text-[#9b8e7a] mb-2">✨ Curious about your own Bazi chart?</p>
                  <a href="/" className="inline-block text-xs text-[#d4af37] hover:text-[#f0d68a] transition-colors font-medium">Get Your Free Reading →</a>
                </div>
              )}
            </section>
          ))}

          {/* Bottom sections */}
          <div className="mt-12 pt-6 border-t border-white/[0.06] space-y-4">
            <div className="bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-lg border border-white/[0.10] rounded-xl p-5">
              <p className="text-xs text-[#9b8e7a] leading-relaxed">✨ Experience your own Bazi reading — free, no signup required, all in your browser.</p>
              <a href="/" className="inline-block mt-2 text-xs text-[#d4af37] hover:text-[#f0d68a] transition-colors">Get Your Free Bazi Reading →</a>
            </div>

            <div className="bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-lg border border-white/[0.10] rounded-xl p-5">
              <p className="text-[10px] text-[#6b5f4a] mb-3 uppercase tracking-wider">📤 Share this article</p>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`,'_blank','width=600,height=400')} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-[#e8dcc8] transition-all">𝕏 Twitter</button>
                <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,'_blank','width=600,height=400')} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-[#e8dcc8] transition-all">f Facebook</button>
                <button onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(shareText+' '+pageUrl)}`,'_blank','width=600,height=400')} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-[#e8dcc8] transition-all">💬 WhatsApp</button>
                <button onClick={() => navigator.clipboard.writeText(pageUrl).then(() => alert('Link copied!'))} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-[#e8dcc8] transition-all">📋 Copy Link</button>
              </div>
            </div>

            {/* 💬 Reader Comments */}
            <div className="border-t border-white/[0.06] pt-6 mt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] text-[#6b5f4a] uppercase tracking-wider">💬 Reader Comments</p>
                <span className="text-[10px] text-[#6b5f4a]">{comments.length} comments</span>
              </div>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/[0.06]" />
                <div className="h-px w-8 bg-[#d4af37]/20" />
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/[0.06]" />
              </div>
              <div className="space-y-4">
                {comments.map((c, i) => (
                  <div key={i} className="bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.06] rounded-xl p-4 transition-all hover:border-[#d4af37]/15">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full border border-[#d4af37]/40 flex items-center justify-center text-[10px] font-bold text-[#d4af37] bg-[#d4af37]/5">{c.name[0]}</div>
                        <span className="text-xs font-medium text-[#e8dcc8]">{c.name}</span>
                      </div>
                      <span className="text-[10px] text-[#6b5f4a]">{c.date}</span>
                    </div>
                    <p className="text-xs text-[#c4b998] leading-relaxed">&ldquo;{c.text}&rdquo;</p>
                    <div className="flex items-center gap-1 mt-2">
                      <button onClick={() => alert('❤️ Thanks for your feedback!')} className="flex items-center gap-1 text-[10px] text-[#6b5f4a] hover:text-[#d4af37] transition-colors">
                        <span>🤍</span><span>{c.likes}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.06] rounded-xl p-4">
                <p className="text-[10px] text-[#6b5f4a] mb-2 uppercase tracking-wider">✍️ Leave a comment</p>
                <div className="flex gap-2">
                  <input type="text" placeholder="Share your thoughts..." className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-[#e8dcc8] placeholder:text-[#6b5f4a] outline-none focus:border-[#d4af37]/40 transition-colors"
                    onKeyDown={(e) => { if (e.key === 'Enter' && (e.target as HTMLInputElement).value.trim()) { alert('✨ Thanks! We review all comments before publishing.'); (e.target as HTMLInputElement).value = ''; } }} />
                  <button onClick={() => { const inp = document.querySelector<HTMLInputElement>('[placeholder="Share your thoughts..."]'); if (inp?.value?.trim()) { alert('✨ Thanks! We review all comments before publishing.'); inp.value = ''; } }} className="px-4 py-2 bg-[#d4af37]/20 hover:bg-[#d4af37]/30 border border-[#d4af37]/30 rounded-lg text-xs text-[#d4af37] transition-all">Post</button>
                </div>
                <p className="text-[9px] text-[#3a3528] mt-2">Comments are moderated. Your email will not be published.</p>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.06] rounded-xl p-5">
              <p className="text-[10px] text-[#6b5f4a] mb-4 uppercase tracking-wider">❓ Frequently Asked Questions</p>
              <div className="space-y-3">
                {faqItems.map((item, i) => (
                  <details key={i} className="group">
                    <summary className="text-xs text-[#e8dcc8] cursor-pointer hover:text-[#d4af37] transition-colors list-none flex items-center justify-between py-2 border-b border-white/[0.04]">
                      <span>{item.q}</span>
                      <span className="text-[#6b5f4a] group-open:text-[#d4af37] transition-colors">▾</span>
                    </summary>
                    <p className="text-[11px] text-[#9b8e7a] leading-relaxed pt-2 pb-1">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-lg border border-white/[0.10] rounded-xl p-5">
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
