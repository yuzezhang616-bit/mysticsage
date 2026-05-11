'use client';

import NavBar from '@/components/NavBar';
import { useState } from 'react';

const CONTENT = {
  "slug": "luck-cycles-da-yun",
  "icon": "⏳",
  "en": {
    "title": "Luck Cycles: Your 10-Year Pillars Explained",
    "sections": [
      {
        "h2": "What are Luck Cycles?",
        "p": "Luck Cycles (Da Yun) are 10-year periods that overlay your Bazi chart, showing how your fortune shifts throughout your life. Each 10-year cycle is governed by a pair of Heavenly Stem and Earthly Branch."
      },
      {
        "h2": "How Luck Cycles Are Calculated",
        "p": "Your first Luck Cycle begins after birth, with the start time determined by your birth hour and gender. A Yang Male or Yin Female advances forward, while Yin Male or Yang Female retreats backward through the cycle."
      },
      {
        "h2": "Reading Your Luck Cycle",
        "p": "When a Luck Cycle supports your Useful God, that decade is favorable. When it clashes with your Useful God, that decade brings challenges."
      },
      {
        "h2": "Annual Forecasts",
        "p": "Each year within a 10-year Luck Cycle also has its own influence, determined by the year's Heavenly Stem and Earthly Branch."
      }
    ]
  },
  "zh": {
    "title": "大运：你每十年的运势周期",
    "sections": [
      {
        "h2": "什么是大运？",
        "p": "大运是叠加在你的八字命盘上的十年周期，显示你一生运势如何变化。每个十年周期由一对天干地支主导。"
      },
      {
        "h2": "大运如何排算",
        "p": "第一个大运从出生后开始，启动时间由出生时辰和性别决定。阳男阴女顺排，阴男阳女逆排。"
      },
      {
        "h2": "解读大运",
        "p": "当一个大运的元素支持你的喜用神时，这十年就是好运。当它们冲克喜用神时，这十年会带来挑战。"
      },
      {
        "h2": "流年影响",
        "p": "十年大运中的每一年也有自己的影响力，由当年的天干地支决定。"
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
