'use client';

import NavBar from '@/components/NavBar';
import { useState } from 'react';

const CONTENT = {
  "slug": "shi-shen-ten-gods",
  "icon": "👥",
  "en": {
    "title": "The 10 Gods (Shi Shen) in Bazi: Your Relationships & Career Decoded",
    "sections": [
      {
        "h2": "What are the 10 Gods?",
        "p": "The 10 Gods are a system within Bazi that maps your relationships to others and the world. Based on how the other elements interact with your Day Master, each is classified into one of ten archetypes."
      },
      {
        "h2": "The 10 Gods List",
        "ul": [
          "Direct Resource: Element that generates yours (mother, mentor)",
          "Indirect Resource: Non-traditional support (unconventional mentor)",
          "Direct Wealth: Element you control (stable income, spouse)",
          "Indirect Wealth: Element you also control (windfall, romance)",
          "Direct Officer: Element that controls yours (authority, reputation)",
          "Seven Killings: Element that also controls yours (challenges)",
          "Friend/Peer: Same element as you (siblings, competitors)",
          "Rob Wealth: Similar element (friends sharing resources)",
          "Eating God: Element you generate (talent, creativity)",
          "Hurting Officer: Another element you generate (art, rebellion)"
        ]
      },
      {
        "h2": "Career Indications",
        "p": "Strong Officer + Resource suggests government or management. Strong Wealth + Eating God suggests business or creative entrepreneurship. Hurting Officer indicates talent in arts, writing, or technology."
      },
      {
        "h2": "Relationship Indications",
        "p": "Your Wealth elements indicate romantic partners. The Officer elements indicate the spouse in a woman's chart, while Wealth elements indicate the spouse in a man's chart."
      }
    ]
  },
  "zh": {
    "title": "十神解析：看透你的人际与事业",
    "sections": [
      {
        "h2": "什么是十神？",
        "p": "十神是八字中的一套系统，将你与他人的关系和社会角色进行分类。基于命盘中其他元素与你的日主如何互动，每个被归类为十种原型之一。"
      },
      {
        "h2": "十神详解",
        "ul": [
          "正印：生你的五行（母亲、导师）",
          "偏印：非传统的支持（另类导师）",
          "正财：你克的五行（稳定收入、正妻）",
          "偏财：你克的另一五行（意外之财、情人）",
          "正官：克你的五行（权威、纪律、名誉）",
          "七杀：克你的另一五行（挑战、权力斗争）",
          "比肩：与你相同的五行（兄弟姐妹、对手）",
          "劫财：与你相似的五行（共享资源的伙伴）",
          "食神：你生的五行（才华、创造力）",
          "伤官：你生的另一五行（艺术表达、叛逆）"
        ]
      },
      {
        "h2": "事业指示",
        "p": "正官+正印旺：适合政府或管理工作。正财+食神旺：适合商业或创意创业。伤官旺：往往表明艺术、写作或技术创新的天赋。"
      },
      {
        "h2": "感情指示",
        "p": "你的财星指示异性缘。在女性八字中，官星代表丈夫；在男性八字中，财星代表妻子。"
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
