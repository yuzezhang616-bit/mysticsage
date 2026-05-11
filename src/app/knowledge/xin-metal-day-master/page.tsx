'use client';

import NavBar from '@/components/NavBar';
import { useState } from 'react';

const CONTENT = {"slug": "xin-metal-day-master", "icon": "💎", "en": {"title": "Xin Metal Day Master: The Jewel of Chinese Astrology", "sections": [{"h2": "Xin Metal — The Jewel", "p": "Xin Metal (辛金) represents precious jewels, fine gold, and refined metal — beautiful, precious, and carefully crafted. Xin Metal people are elegant, perfectionistic, and have a keen eye for quality."}, {"h2": "Personality Traits", "ul": ["Refined and elegant — Xin Metal people have a natural sophistication", "Perfectionistic — they have high standards for themselves and their work", "Detail-oriented — they notice the finest details", "Sensitive — they are more delicate than Geng Metal counterparts", "Can be critical — their pursuit of perfection extends to others"]}, {"h2": "Career Paths", "p": "Xin Metal excels in art, design, luxury goods, curation, finance, quality control, law, and any field requiring precision and refined taste."}, {"h2": "Love & Relationships", "p": "Xin Metal people seek quality relationships. They are selective about partners and value emotional depth and sophistication."}]}, "zh": {"title": "辛金日主详解：精致优雅的珠宝之人", "sections": [{"h2": "辛金——珠宝之金", "p": "辛金代表珍贵的珠宝、精细的黄金和精炼的金属——美丽、珍贵、精心雕琢。辛金人优雅、完美主义，对品质有敏锐的眼光。"}, {"h2": "性格特征", "ul": ["精致优雅——辛金人天生有品位", "完美主义——对自己和工作有高标准", "注重细节——注意到最细微之处", "敏感——比庚金更细腻脆弱", "有时挑剔——对完美的追求也延伸到他人"]}, {"h2": "职业方向", "p": "辛金在艺术、设计、奢侈品、策展、金融、质检、法律和任何需要精准和品味领域中表现出色。"}, {"h2": "爱情与人际关系", "p": "辛金人追求高品质的关系。对伴侣精挑细选，重视情感深度和品味。"}]}};

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
          <span className="text-3xl mb-4 block">💎</span>
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
