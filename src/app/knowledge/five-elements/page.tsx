'use client';

import NavBar from '@/components/NavBar';
import { useState } from 'react';

const CONTENT = {"slug": "five-elements", "icon": "☯", "en": {"title": "The Five Elements in Chinese Astrology", "sections": [{"h2": "The Five Elements (Wu Xing)", "p": "The Five Elements — Wood, Fire, Earth, Metal, and Water — form the foundation of Chinese metaphysics. They interact through a cycle of generation and control that governs all natural phenomena."}, {"h2": "The Generating Cycle (相生)", "p": "In this cycle, each element creates or nourishes the next: Wood feeds Fire, Fire creates Earth (ash), Earth bears Metal, Metal carries Water, Water nourishes Wood. This is the cycle of mutual support and growth."}, {"h2": "The Controlling Cycle (相克)", "p": "Each element also controls another: Wood breaks up Earth, Earth absorbs Water, Water extinguishes Fire, Fire melts Metal, Metal cuts Wood. This is the cycle of balance and restraint."}, {"h2": "Elements in Your Bazi Chart", "p": "The balance of the Five Elements in your Bazi chart determines your strengths, weaknesses, and life tendencies. A missing or excessive element can indicate areas of challenge or opportunity in your life."}]}, "zh": {"title": "五行学说详解：木火土金水如何影响你的命运", "sections": [{"h2": "五行是什么？", "p": "五行——木、火、土、金、水——是中国玄学的基础。它们通过相生相克的循环相互作用，支配一切自然现象。"}, {"h2": "相生（相互促进）", "p": "在这个循环中，每个元素滋养下一个：木生火，火生土（灰烬），土生金，金生水，水生木。这是相互支持和生长的循环。"}, {"h2": "相克（相互制约）", "p": "每个元素也制约另一个：木克土，土克水，水克火，火克金，金克木。这是平衡和约束的循环。"}, {"h2": "八字中的五行平衡", "p": "你八字中五行的平衡决定你的优势、劣势和人生倾向。缺少或过旺的五行可能预示着生活中的挑战或机遇领域。"}]}};

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
          <span className="text-3xl mb-4 block">☯</span>
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
