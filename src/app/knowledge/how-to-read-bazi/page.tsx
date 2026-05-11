'use client';

import NavBar from '@/components/NavBar';
import { useState } from 'react';

const CONTENT = {
  "slug": "how-to-read-bazi",
  "icon": "📖",
  "en": {
    "title": "How to Read a Bazi Chart: A Step-by-Step Tutorial",
    "sections": [
      {
        "h2": "Step 1: Get Your Bazi Chart",
        "p": "Visit MysticSage and enter your birth date, time, and location. Our free calculator will generate your complete Four Pillars chart instantly."
      },
      {
        "h2": "Step 2: Find Your Day Master",
        "p": "The Heavenly Stem of your Day Pillar is your Day Master. This is YOU. Everything else in the chart is interpreted relative to this element."
      },
      {
        "h2": "Step 3: Check Elemental Balance",
        "p": "Count how many times each element appears across all eight characters. Which elements are strong? Which are missing?"
      },
      {
        "h2": "Step 4: Identify Your Useful God",
        "p": "Determine which element your chart needs to achieve balance. This is your Useful God."
      },
      {
        "h2": "Step 5: Examine the 10 Gods",
        "p": "Classify each character into a 10 God relationship with your Day Master. This reveals your relationship with wealth, authority, resources, and peers."
      },
      {
        "h2": "Step 6: Read Your Luck Cycles",
        "p": "Check your Luck Cycle chart. A favorable cycle supports your Useful God. An unfavorable cycle suggests caution and consolidation."
      }
    ]
  },
  "zh": {
    "title": "八字排盘教程：一步一步看懂你的命盘",
    "sections": [
      {
        "h2": "第一步：获取八字命盘",
        "p": "访问 MysticSage，输入出生日期、时间和地点。免费计算器会立即生成完整的四柱命盘。"
      },
      {
        "h2": "第二步：找到你的日主",
        "p": "日柱的天干就是你的日主。这就是你。命盘中其他所有内容都相对于这个元素来解读。"
      },
      {
        "h2": "第三步：检查五行平衡",
        "p": "数一数八个字中每个五行出现的次数。哪些旺？哪些缺？"
      },
      {
        "h2": "第四步：确定喜用神",
        "p": "判断你的命盘需要哪个元素来实现平衡。这就是你的喜用神。"
      },
      {
        "h2": "第五步：看十神",
        "p": "将每个字归入与日主的十神关系。这揭示了你对财富、权威、资源的关系模式。"
      },
      {
        "h2": "第六步：解读大运",
        "p": "查看大运表。有利的大运支持喜用神。不利的大运提示需要保守和谨慎。"
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
