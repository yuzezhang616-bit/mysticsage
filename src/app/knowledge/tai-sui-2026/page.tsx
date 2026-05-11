'use client';

import NavBar from '@/components/NavBar';
import { useState } from 'react';

const CONTENT = {
  "slug": "tai-sui-2026",
  "icon": "⚡",
  "en": {
    "title": "Tai Sui 2026: Who Will Be Affected and How to Resolve",
    "sections": [
      {
        "h2": "What is Tai Sui?",
        "p": "Tai Sui is the Grand Duke of the Year a powerful annual deity in Chinese astrology. Each year, one zodiac animal sits with Tai Sui, and several others conflict with it. Offending Tai Sui is believed to bring obstacles and conflicts."
      },
      {
        "h2": "2026 (Bing Wu Year) Affected Animals",
        "ul": [
          "Horse: Direct offense sitting with Tai Sui. Major life changes possible.",
          "Rat: Clash with the year. Relationship and travel challenges.",
          "Tiger: Penalty with Tai Sui. Legal and paperwork issues.",
          "Dog: Harm to Tai Sui. Interpersonal conflicts and misunderstandings."
        ]
      },
      {
        "h2": "How to Resolve Tai Sui",
        "ul": [
          "Make charitable donations and do good deeds",
          "Avoid major decisions during conflict months",
          "Wear Tai Sui amulet or your lucky element's color",
          "Perform a Tai Sui pacification ritual",
          "Stay humble and avoid conflicts"
        ]
      },
      {
        "h2": "Important Note",
        "p": "Tai Sui alone does not determine your year's fortune. A complete Bazi reading considers your Luck Cycles, annual stars, and overall chart balance."
      }
    ]
  },
  "zh": {
    "title": "2026年犯太岁：哪些生肖要注意及化解方法",
    "sections": [
      {
        "h2": "什么是太岁？",
        "p": "太岁是每年一位强大的值年神祇。每年有一个生肖坐太岁，其他几个与之相冲。冲犯太岁被认为会带来阻碍和冲突。"
      },
      {
        "h2": "2026年（丙午年）犯太岁生肖",
        "ul": [
          "马（值太岁）：正面冲犯。可能有重大人生变化。",
          "鼠（冲太岁）：与当年相冲。感情和旅行方面有挑战。",
          "虎（刑太岁）：与太岁相刑。法律和文书事务需留意。",
          "狗（害太岁）：与太岁相害。人际关系冲突和误会。"
        ]
      },
      {
        "h2": "化解方法",
        "ul": [
          "多做慈善捐赠和善事",
          "避免在冲突月份做重大决定",
          "佩戴太岁符或喜用神颜色的饰品",
          "前往道观拜太岁",
          "保持谦虚谨慎，避免冲突"
        ]
      },
      {
        "h2": "重要提示",
        "p": "太岁单独并不能决定一年的运势。完整的八字解读需要考虑大运、流年神煞和整体命盘平衡。"
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
