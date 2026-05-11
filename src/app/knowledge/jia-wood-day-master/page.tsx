'use client';

import NavBar from '@/components/NavBar';
import { useState } from 'react';

const CONTENT = {"slug": "jia-wood-day-master", "icon": "🌲", "en": {"title": "Jia Wood Day Master: Personality, Career & Love Guide", "sections": [{"h2": "Jia Wood — The Big Tree", "p": "Jia Wood (甲木) is the first Heavenly Stem, representing the strong, majestic Big Tree. People born with Jia Wood as their Day Master have a natural uprightness and a strong sense of justice, like the towering tree that stands firm against the wind."}, {"h2": "Personality Traits", "ul": ["Strong-willed and independent — like a tree that grows on its own", "Generous and magnanimous — they shelter others like a canopy", "Principled and ethical — Jia Wood people have an innate moral compass", "Goal-oriented — once they set a direction, they grow steadily toward it", "May be stubborn — the same strength that keeps them upright can make them inflexible"]}, {"h2": "Career Paths", "p": "Jia Wood people excel in leadership positions, education, law, environmental work, and any field that requires long-term vision. Their natural authority makes them good managers, while their nurturing side suits them for teaching and mentorship."}, {"h2": "Love & Relationships", "p": "In relationships, Jia Wood is loyal and protective. They seek partners who share their values and respect their independence. The ideal match often involves Fire or Water Day Masters."}]}, "zh": {"title": "甲木日主详解：性格、事业与爱情指南", "sections": [{"h2": "甲木——参天大树", "p": "甲木是十天干之首，代表参天大树。甲木日主的人正直刚强，有天然的正义感，如同大树屹立不倒。"}, {"h2": "性格特征", "ul": ["意志坚强、独立自主——像树一样自我生长", "慷慨大度——树荫庇护他人", "有原则、有道德——甲木人天生有道德指南针", "目标明确——一旦确定方向就稳步前进", "有时固执——正直的优势也可能变成不灵活的劣势"]}, {"h2": "职业方向", "p": "甲木人在领导岗位、教育、法律、环保和需要长远眼光的领域表现出色。天生权威感使他们成为好管理者，而滋养的一面适合教学和导师角色。"}, {"h2": "爱情与人际关系", "p": "在关系中，甲木忠诚且有保护欲。他们寻找价值观一致且尊重其独立性的伴侣。最佳搭配通常是火或水日主。"}]}};

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
          <span className="text-3xl mb-4 block">🌲</span>
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
