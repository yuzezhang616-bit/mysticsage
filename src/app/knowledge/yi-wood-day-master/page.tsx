'use client';

import NavBar from '@/components/NavBar';
import { useState } from 'react';

const CONTENT = {"slug": "yi-wood-day-master", "icon": "🌿", "en": {"title": "Yi Wood Day Master: The Gentle Soul of Chinese Astrology", "sections": [{"h2": "Yi Wood — The Vine", "p": "Yi Wood (乙木) represents the flexible vine, the flowering plant that bends with the wind. Yi Wood people are creative, adaptable, and graceful. Unlike Jia Wood\u0027s strength, Yi Wood finds power through flexibility and connection."}, {"h2": "Personality Traits", "ul": ["Artistic and creative — Yi Wood people have a natural aesthetic sense", "Diplomatic and socially graceful — they know how to navigate social situations", "Empathetic and nurturing — they care deeply about others\u0027 feelings", "Adaptable — like a vine, they find a way through obstacles", "May be overly sensitive — they absorb the emotions of those around them"]}, {"h2": "Career Paths", "p": "Yi Wood thrives in creative fields: design, art, music, writing, and fashion. Their diplomatic nature makes them excellent in public relations, counseling, human resources, and any role requiring empathy and interpersonal skill."}, {"h2": "Love & Relationships", "p": "Yi Wood needs emotional connection and appreciation. They flourish in relationships where their creativity is valued and their sensitivity is understood."}]}, "zh": {"title": "乙木日主详解：灵活多才的艺术灵魂", "sections": [{"h2": "乙木——藤蔓花草", "p": "乙木代表柔韧的藤蔓和花草。乙木人富有创造力、适应力强、优雅大方。与甲木的力量不同，乙木通过灵活性和连接性找到力量。"}, {"h2": "性格特征", "ul": ["艺术天赋、富有创意——乙木人有天然审美感", "外交手腕、社交优雅——善于处理社交场合", "同理心强、细心体贴——在乎他人感受", "适应力强——像藤蔓一样，总能找到穿越障碍的方法", "有时过于敏感——容易吸收周围人的情绪"]}, {"h2": "职业方向", "p": "乙木在设计、艺术、音乐、写作和时尚等创意领域表现出色。外交家天性使他们适合公关、咨询、人力资源等需要同理心和人际技巧的角色。"}, {"h2": "爱情与人际关系", "p": "乙木需要情感连接和欣赏。在创意被重视、敏感被理解的关系中蓬勃发展。"}]}};

export default function ArticlePage() {
  const [lang, setLang] = useState<'en'|'zh'>('en');
  const isEn = lang === 'en';
  const article = isEn ? CONTENT.en : CONTENT.zh;

  return (
    <>
      <div className="video-bg">
        <video autoPlay muted loop playsInline className="bg-video"><source src="/bg.mp4" type="video/mp4" /></video>
        <div className="video-overlay" />
      </div>
      <main className="min-h-screen relative z-10">
        <NavBar currentLang={lang} onLangChange={setLang} />
        <article className="max-w-3xl mx-auto px-4 py-8">
          <nav className="text-xs text-[#9b8e7a] mb-6">
            <a href="/knowledge" className="hover:text-[#d4af37] transition-colors">
              {'<'} {isEn ? 'Back to Knowledge Base' : '返回知识库'}
            </a>
          </nav>
          <span className="text-3xl mb-4 block">🌿</span>
          <h1 className="text-2xl font-bold gold-text mb-1">{article.title}</h1>
          <p className="text-[#9b8e7a]/60 text-xs mb-8">{isEn ? 'MysticSage · Chinese Astrology Guide' : 'MysticSage · 中华命理指南'}</p>

          {article.sections.map((section: any, i: number) => (
            <section key={i} className="mb-10">
              {section.h2 && <h2 className="text-lg font-semibold gold-text mb-3">{section.h2}</h2>}
              {section.h3 && <h3 className="text-base font-medium text-[#d4af37]/80 mb-2">{section.h3}</h3>}
              {section.p && Array.isArray(section.p)
                ? section.p.map((para: string, j: number) => <p key={j} className="text-sm text-[#c4b998] leading-relaxed mb-3">{para}</p>)
                : <p className="text-sm text-[#c4b998] leading-relaxed mb-3">{section.p}</p>}
              {section.ul && (
                <ul className="space-y-1">
                  {section.ul.map((item: string, j: number) => (
                    <li key={j} className="text-sm text-[#c4b998] flex items-start gap-2">
                      <span className="text-[#d4af37] mt-1">{'\u2726'}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <div className="mt-12 pt-6 border-t border-[rgba(212,175,55,0.06)]">
            <div className="bg-[#0f1117]/50 border border-[rgba(212,175,55,0.08)] rounded-xl p-5">
              <p className="text-xs text-[#9b8e7a] leading-relaxed">
                {isEn
                  ? '✨ Experience your own Bazi reading — free, no signup required, all in your browser.'
                  : '✨ 体验你自己的八字算命——免费，无需注册，全程在浏览器中完成。'}
              </p>
              <a href="/" className="inline-block mt-2 text-xs text-[#d4af37] hover:text-[#f0d68a] transition-colors">
                {isEn ? 'Get Your Free Bazi Reading \u2192' : '免费获取你的八字分析 \u2192'}
              </a>
            </div>
          </div>
        </article>

        <footer className="border-t border-[rgba(212,175,55,0.06)] mt-12">
          <div className="max-w-5xl mx-auto px-4 py-6 text-center">
            <p className="text-xs text-[#3a3528]">{'\u2726'} MysticSage — {isEn ? 'Ancient wisdom for the modern soul' : '为现代灵魂准备的古老智慧'}</p>
          </div>
        </footer>
      </main>
    </>
  );
}
