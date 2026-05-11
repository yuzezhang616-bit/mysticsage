'use client';

import NavBar from '@/components/NavBar';
import { useState } from 'react';

const CONTENT = {
  "slug": "five-elements-generating",
  "icon": "🔥➡️🌍",
  "en": {
    "title": "Five Elements Generating Cycle Explained",
    "sections": [
      {
        "h2": "The Generating Cycle (相生)",
        "p": "The Generating Cycle is the creative, nurturing relationship between the Five Elements. In this cycle, each element produces or supports the next, creating a continuous loop of creation and growth."
      },
      {
        "h2": "Wood Feeds Fire",
        "p": "Wood is fuel for Fire. Wood grows upward and provides material that generates heat and flame. In a Bazi chart, if you have strong Wood element, it naturally supports and strengthens your Fire element."
      },
      {
        "h2": "Fire Creates Earth",
        "p": "When Fire burns, it leaves behind ash which becomes part of the Earth. Fire transforms energy into stable, tangible matter."
      },
      {
        "h2": "Earth Bears Metal",
        "p": "Metal is formed within the Earth, compressed over millions of years. Earth provides the structure and container for Metal's formation."
      },
      {
        "h2": "Metal Carries Water",
        "p": "Metal surfaces collect condensation and channel water. In Chinese metaphysics, Metal creates Water by providing a conduit."
      },
      {
        "h2": "Water Nourishes Wood",
        "p": "Water is essential for Wood's growth. Without water, Wood withers. This completes the cycle and the loop continues."
      }
    ]
  },
  "zh": {
    "title": "五行相生详解：木火土金水的生生不息",
    "sections": [
      {
        "h2": "什么是相生？",
        "p": "相生是五行之间创造、滋养的关系。在这个循环中，每个元素产生或支持下一个元素，形成一个连续的创造和生长循环。"
      },
      {
        "h2": "木生火",
        "p": "木是火的燃料。木向上生长，为火提供热量和火焰。在八字中，如果你木旺，自然会支持和增强你的火元素。"
      },
      {
        "h2": "火生土",
        "p": "火燃烧后留下灰烬，成为土的一部分。火将能量转化为稳定、有形的事物。"
      },
      {
        "h2": "土生金",
        "p": "金形成于土中，经过千万年的压缩。土为金的形成提供结构和容器。"
      },
      {
        "h2": "金生水",
        "p": "金属表面会凝结水珠，引导水流。在中国玄学中，金通过提供管道来生水。"
      },
      {
        "h2": "水生木",
        "p": "水对木的生长至关重要。没有水，木就会枯萎。这完成了整个循环并继续。"
      }
    ]
  }
};

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
          <span className="text-3xl mb-4 block">📜</span>
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
