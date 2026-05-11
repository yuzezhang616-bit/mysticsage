'use client';

import NavBar from '@/components/NavBar';
import { useState } from 'react';

const CONTENT = {"slug": "bing-fire-day-master", "icon": "☀️", "en": {"title": "Bing Fire Day Master: Charismatic Leader\u0027s Destiny", "sections": [{"h2": "Bing Fire — The Sun", "p": "Bing Fire (丙火) represents the blazing sun in the sky, a source of warmth, light, and life. Bing Fire people have natural charisma and a radiant presence that draws others to them. They are born leaders who illuminate any room they enter."}, {"h2": "Personality Traits", "ul": ["Charismatic and magnetic — people naturally gravitate toward them", "Generous and warm-hearted — they give freely and expect little in return", "Optimistic and enthusiastic — their energy is infectious", "Decisive and bold — Bing Fire people act where others hesitate", "Can be impatient — their fire burns fast and they want results now"]}, {"h2": "Career Paths", "p": "Bing Fire excels in leadership, politics, entertainment, sales, entrepreneurship, and motivational roles. Their natural warmth makes them excellent public speakers and team motivators."}, {"h2": "Love & Relationships", "p": "In love, Bing Fire is passionate and generous. They love grand gestures and enjoy taking the lead. They need a partner who can appreciate their drive without being overshadowed by it."}]}, "zh": {"title": "丙火日主详解：太阳般耀眼的天生领导者", "sections": [{"h2": "丙火——太阳之火", "p": "丙火代表天空中的太阳，温暖、光明和生命的源泉。丙火人天生具有魅力和光彩照人的存在感，吸引他人靠近。他们是天生的领导者，照亮进入的每一个空间。"}, {"h2": "性格特征", "ul": ["魅力四射、磁场强大——人们自然被吸引", "慷慨大方、心地温暖——乐于给予，不求回报", "乐观积极、充满热情——他们的能量有感染力", "果断勇敢——别人犹豫时他们已行动", "有时急躁——火烧得快，想要立竿见影"]}, {"h2": "职业方向", "p": "丙火在领导、政治、娱乐、销售、创业和激励角色中表现出色。天生的温暖使他们成为优秀的演讲者和团队激励者。"}, {"h2": "爱情与人际关系", "p": "爱情中，丙火热情慷慨。他们喜欢大方的表达，享受主导地位。需要能欣赏他们的魄力又不被其光芒掩盖的伴侣。"}]}};

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
          <span className="text-3xl mb-4 block">☀️</span>
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
