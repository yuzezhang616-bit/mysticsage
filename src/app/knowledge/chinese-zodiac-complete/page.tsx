'use client';

import NavBar from '@/components/NavBar';
import { useState } from 'react';

const CONTENT = {
  "slug": "chinese-zodiac-complete",
  "icon": "🐉",
  "en": {
    "title": "Your Chinese Zodiac Animal: Complete Guide to the 12 Signs",
    "sections": [
      {
        "h2": "The 12 Animals",
        "p": "The Chinese Zodiac consists of 12 animals: Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, and Pig. Each animal governs a year in the 12-year cycle."
      },
      {
        "h2": "Five Elements and Your Zodiac",
        "p": "Each zodiac animal has a fixed element associated with it. However, the element of your birth year adds another layer a Wood Tiger is different from a Fire Tiger."
      },
      {
        "h2": "Compatibility Overview",
        "ul": [
          "Best Matches: Rat+Ox, Tiger+Pig, Rabbit+Dog, Dragon+Rooster, Snake+Monkey, Horse+Goat",
          "Clash Pairs: Rat-Horse, Ox-Goat, Tiger-Monkey, Rabbit-Rooster, Dragon-Dog, Snake-Pig"
        ]
      },
      {
        "h2": "Your Zodiac in Bazi",
        "p": "Your animal sign is just one component of your Bazi chart the Earthly Branch of your Year Pillar. A full Bazi reading gives much deeper insight."
      }
    ]
  },
  "zh": {
    "title": "十二生肖性格大全：你的属相决定了什么",
    "sections": [
      {
        "h2": "十二生肖",
        "p": "十二生肖：鼠、牛、虎、兔、龙、蛇、马、羊、猴、鸡、狗、猪。每种动物掌管一个年份，赋予该年生人独特的性格特征。"
      },
      {
        "h2": "五行与生肖",
        "p": "每个生肖也有固定的五行属性。但出生年份的具体干支赋予了另一层含义，木虎和火虎的表现大不相同。"
      },
      {
        "h2": "生肖配对概览",
        "ul": [
          "最佳配对：鼠牛、虎猪、兔狗、龙鸡、蛇猴、马羊",
          "相冲组合：鼠马、牛羊、虎猴、兔鸡、龙狗、蛇猪"
        ]
      },
      {
        "h2": "八字中的生肖",
        "p": "你的生肖只是八字中的一个组成部分，具体来说是年柱的地支。全面的八字解读远比生肖更深入。"
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
