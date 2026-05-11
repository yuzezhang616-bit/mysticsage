'use client';

import NavBar from '@/components/NavBar';
import { useState } from 'react';

const CONTENT = {"slug": "ding-fire-day-master", "icon": "🕯️", "en": {"title": "Ding Fire Day Master: The Steady Light in Bazi", "sections": [{"h2": "Ding Fire — The Candle", "p": "Ding Fire (丁火) represents the candle flame or lantern light — soft, steady, and penetrating. While Bing Fire is the blazing sun, Ding Fire is the gentle glow that provides light in darkness. Ding Fire people are focused, refined, and deeply perceptive."}, {"h2": "Personality Traits", "ul": ["Meticulous and detail-oriented — Ding Fire people notice what others miss", "Cultured and refined — they appreciate beauty and quality", "Emotionally deep — their feelings run deep and steady like candlelight", "Loyal and committed — once they commit, they stay", "Can be overly critical — their high standards apply to others too"]}, {"h2": "Career Paths", "p": "Ding Fire excels in analytical fields: science, research, technology, medicine, education, and craftsmanship. Their attention to detail makes them excellent surgeons, engineers, analysts, and artists."}, {"h2": "Love & Relationships", "p": "Ding Fire people love deeply but cautiously. They take time to open up but once they do, they are profoundly loyal. They appreciate partners who are intellectually stimulating and emotionally steady."}]}, "zh": {"title": "丁火日主详解：温柔坚定的烛光之人", "sections": [{"h2": "丁火——灯烛之火", "p": "丁火代表蜡烛火焰或灯光——柔和、稳定而穿透力强。如果说丙火是烈日，丁火则是黑暗中提供光明的温柔光芒。丁火人专注、精致、洞察力强。"}, {"h2": "性格特征", "ul": ["细致入微、注重细节——丁火人能发现他人遗漏之处", "有文化修养、精致——欣赏美和品质", "情感深沉——情感如烛光般深沉稳定", "忠诚专一——一旦承诺就会坚持", "有时过于挑剔——高标准也加在他人身上"]}, {"h2": "职业方向", "p": "丁火在分析性领域表现出色：科学、研究、技术、医学、教育和工艺。注重细节的天性使他们成为优秀的外科医生、工程师、分析师和艺术家。"}, {"h2": "爱情与人际关系", "p": "丁火人爱得深沉但谨慎。他们需要时间打开心扉，但一旦打开就极为忠诚。欣赏能激发智力且情感稳定的伴侣。"}]}};

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
          <span className="text-3xl mb-4 block">🕯️</span>
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
