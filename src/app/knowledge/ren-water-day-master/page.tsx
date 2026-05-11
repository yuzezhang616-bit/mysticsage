'use client';

import NavBar from '@/components/NavBar';
import { useState } from 'react';

const CONTENT = {"slug": "ren-water-day-master", "icon": "🌊", "en": {"title": "Ren Water Day Master: The Ocean of Ambition", "sections": [{"h2": "Ren Water — The Ocean", "p": "Ren Water (壬水) represents the mighty ocean, great rivers, and vast bodies of water — powerful, strategic, and all-encompassing. Ren Water people are ambitious, intelligent, and possess great strategic vision."}, {"h2": "Personality Traits", "ul": ["Strategic and visionary — Ren Water sees the big picture", "Ambitious and driven — they aim for grand achievements", "Intelligent and resourceful — they find creative solutions", "Charismatic — their presence is as vast and influential as the ocean", "Can be restless — like water, they need constant movement and change"]}, {"h2": "Career Paths", "p": "Ren Water excels in leadership, entrepreneurship, politics, consulting, trading, technology, and exploration. Their strategic minds make them outstanding CEOs, strategists, investors, and innovators."}, {"h2": "Love & Relationships", "p": "Ren Water people need partners who understand their need for freedom and growth. They are passionate and devoted but require space to pursue their ambitions."}]}, "zh": {"title": "壬水日主详解：如海洋般辽阔的战略家", "sections": [{"h2": "壬水——江河之水", "p": "壬水代表广阔的海洋、大河和浩瀚的水域——强大、战略、包容万象。壬水人雄心勃勃、智慧过人，具有强大的战略眼光。"}, {"h2": "性格特征", "ul": ["战略眼光、远见卓识——壬水人看大局", "雄心勃勃、进取心强——志在远大成就", "聪明机智、资源丰富——找到创造性解决方案", "魅力不凡——存在感如海洋般广阔有影响力", "有时不安于室——像水一样需要流动和变化"]}, {"h2": "职业方向", "p": "壬水在领导、创业、政治、咨询、贸易、技术和探险领域表现出色。战略思维使其成为优秀的CEO、策略师、投资人和创新者。"}, {"h2": "爱情与人际关系", "p": "壬水人需要理解他们对自由和成长需求的伴侣。他们热情投入，但需要空间追求抱负。"}]}};

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
          <span className="text-3xl mb-4 block">🌊</span>
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
