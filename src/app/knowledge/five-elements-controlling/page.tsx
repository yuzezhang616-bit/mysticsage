'use client';

import NavBar from '@/components/NavBar';
import { useState } from 'react';

const CONTENT = {
  "slug": "five-elements-controlling",
  "icon": "⚔️☯",
  "en": {
    "title": "Five Elements Controlling Cycle Explained",
    "sections": [
      {
        "h2": "The Controlling Cycle (相克)",
        "p": "While the Generating Cycle creates harmony, the Controlling Cycle provides balance and restraint. Each element controls another, preventing any single element from becoming too dominant."
      },
      {
        "h2": "Wood Controls Earth",
        "p": "Tree roots break through soil, and plants extract nutrients from the earth. Wood's growth can break apart Earth's stability."
      },
      {
        "h2": "Earth Controls Water",
        "p": "Earth builds dams and absorbs water. Riverbanks and soil hold back and direct water flow. Earth tempers Water's free-flowing nature."
      },
      {
        "h2": "Water Controls Fire",
        "p": "Water extinguishes Fire. This is perhaps the most direct control relationship. Water's cool nature balances Fire's passionate energy."
      },
      {
        "h2": "Fire Controls Metal",
        "p": "Fire melts Metal, refining it into a softer, more useful form. Fire's heat transforms Metal's hardness into flexibility."
      },
      {
        "h2": "Metal Controls Wood",
        "p": "An axe cuts wood; a saw shapes timber. Metal's sharp energy controls Wood's expansive growth."
      },
      {
        "h2": "Balance is Key",
        "p": "Both the Generating and Controlling Cycles work together to maintain harmony. A healthy Bazi chart has all five elements represented and balanced."
      }
    ]
  },
  "zh": {
    "title": "五行相克详解：木火土金水的制衡之道",
    "sections": [
      {
        "h2": "什么是相克？",
        "p": "如果说相生创造和谐，那么相克则提供平衡和制约。每个元素与另一元素有制约关系，防止任何单一元素过于旺盛。"
      },
      {
        "h2": "木克土",
        "p": "树根穿透土壤，植物从大地吸收养分。木的生长可以打破土的稳定。八字中土过旺需要木来克制。"
      },
      {
        "h2": "土克水",
        "p": "土筑堤坝，吸收水分。河岸和土壤阻挡和引导水流。土制衡水的自由流动特性。"
      },
      {
        "h2": "水克火",
        "p": "水能灭火。这是最直接的克制关系。水的冷静战略性特质平衡了火的热烈消耗性能量。"
      },
      {
        "h2": "火克金",
        "p": "火熔化金，将其精炼为更柔软、更有用的形态。火的热度改变了金的硬度。"
      },
      {
        "h2": "金克木",
        "p": "斧砍木，锯成形。金的锋利精准能量控制木的扩张性向上生长。"
      },
      {
        "h2": "平衡是关键",
        "p": "相生和相克两个循环共同维持和谐。一个健康的八字应有五行俱全，并通过两个循环保持平衡。"
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
