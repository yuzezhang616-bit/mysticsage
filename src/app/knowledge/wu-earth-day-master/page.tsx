'use client';

import NavBar from '@/components/NavBar';
import { useState } from 'react';

const CONTENT = {"slug": "wu-earth-day-master", "icon": "⛰️", "en": {"title": "Wu Earth Day Master: The Mountain of Stability", "sections": [{"h2": "Wu Earth — The Mountain", "p": "Wu Earth (戊土) represents the mighty mountain — stable, reliable, and commanding. Wu Earth people are the pillars of their communities, trusted friends, and dependable colleagues. Like a mountain, they provide a foundation for others."}, {"h2": "Personality Traits", "ul": ["Stable and trustworthy — Wu Earth people keep their word", "Patient and enduring — they handle pressure without breaking", "Practical and grounded — they deal with reality, not fantasy", "Generous — like fertile soil, they support growth in others", "Can be stubborn — as unmovable as a mountain"]}, {"h2": "Career Paths", "p": "Wu Earth excels in management, banking, finance, construction, real estate, agriculture, and government. Their stability and reliability make them indispensable in organizational leadership."}, {"h2": "Love & Relationships", "p": "Wu Earth people are steady and committed partners. They express love through action and provision rather than words. They seek relationships built on mutual trust and shared practical goals."}]}, "zh": {"title": "戊土日主详解：如山般稳重的可靠之人", "sections": [{"h2": "戊土——巍峨高山", "p": "戊土代表雄伟的山峰——稳定、可靠、威严。戊土人是社区的支柱、可信赖的朋友和靠得住的同事。像山一样，他们为他人提供基础。"}, {"h2": "性格特征", "ul": ["稳重可靠、言出必行——戊土人信守承诺", "有耐心、能忍耐——承受压力而不崩溃", "务实踏实——面对现实，不好高骛远", "慷慨大方——如肥沃土壤般助人成长", "有时固执——稳如泰山的另一面"]}, {"h2": "职业方向", "p": "戊土在管理、银行、金融、建筑、房地产、农业和政府工作中表现出色。稳定可靠使他们成为组织管理不可或缺的支柱。"}, {"h2": "爱情与人际关系", "p": "戊土人是稳定专一的伴侣。他们通过行动和物质支持表达爱，而非语言。寻求基于相互信任和共同务实目标的关系。"}]}};

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
          <span className="text-3xl mb-4 block">⛰️</span>
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
