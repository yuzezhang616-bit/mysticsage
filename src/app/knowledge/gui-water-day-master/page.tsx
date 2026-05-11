'use client';

import NavBar from '@/components/NavBar';
import { useState } from 'react';

const CONTENT = {"slug": "gui-water-day-master", "icon": "🌧️", "en": {"title": "Gui Water Day Master: The Rain of Wisdom", "sections": [{"h2": "Gui Water — The Rain", "p": "Gui Water (癸水) represents gentle rain, morning dew, and spring water — subtle, wise, and life-giving. Gui Water people are intuitive, adaptable, and possess deep inner wisdom."}, {"h2": "Personality Traits", "ul": ["Intuitive and perceptive — Gui Water people read situations and people well", "Wise beyond their years — they have a natural philosophical depth", "Adaptable — like water, they flow around obstacles", "Persuasive — their gentle approach wins people over", "Can be overly cautious — they may avoid confrontation at all costs"]}, {"h2": "Career Paths", "p": "Gui Water excels in psychology, counseling, writing, spirituality, research, data analysis, healing arts, and any role requiring deep insight."}, {"h2": "Love & Relationships", "p": "Gui Water people form deep, spiritual connections with partners. They need emotional safety and intellectual stimulation."}]}, "zh": {"title": "癸水日主详解：如雨露般智慧的洞察者", "sections": [{"h2": "癸水——雨露之水", "p": "癸水代表温柔的雨水、清晨的露珠和泉水——微妙、智慧、滋养生命。癸水人直觉敏锐、适应力强，拥有深层的内在智慧。"}, {"h2": "性格特征", "ul": ["直觉强、洞察力好——癸水人善于读懂局势和人心", "早慧——有天然的哲学深度", "适应力强——像水一样绕行障碍", "有说服力——温和的方式赢得他人", "有时过于谨慎——可能不惜一切代价避免冲突"]}, {"h2": "职业方向", "p": "癸水在心理学、咨询、写作、灵性、研究、数据分析、治疗艺术和任何需要深层洞察的角色中表现出色。"}, {"h2": "爱情与人际关系", "p": "癸水人与伴侣建立深层的灵性连接。需要情感安全和智力刺激。"}]}};

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
          <span className="text-3xl mb-4 block">🌧️</span>
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
