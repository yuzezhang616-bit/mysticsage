'use client';

import NavBar from '@/components/NavBar';
import { useState } from 'react';

const CONTENT = {"slug": "dream-meanings", "icon": "🌙", "en": {"title": "Chinese Dream Interpretation: What Your Dreams Mean", "sections": [{"h2": "Dreams in Chinese Culture", "p": "In Chinese tradition, dreams are seen as messages from the subconscious that can reveal hidden truths, predict future events, and provide spiritual guidance. The ancient text \u0027Zhou Gong\u0027s Dream Dictionary\u0027 has been the standard reference for dream interpretation for centuries."}, {"h2": "Elements in Dreams", "p": "In Chinese dream interpretation, the Five Elements play a significant role. Water dreams often relate to emotions and intuition; Fire dreams to passion and transformation; Earth dreams to stability and abundance; Metal dreams to structure and discipline; Wood dreams to growth and creativity."}, {"h2": "Common Dream Symbols", "ul": ["Flying — Freedom, ambition, escape from pressure", "Falling — Anxiety, loss of control, insecurity", "Water — Emotions (clear water = clarity, muddy = confusion)", "Teeth — Vitality, appearance concerns, communication", "Snakes — Wisdom, transformation, hidden fears", "Death — Transformation, new beginnings, life changes"]}]}, "zh": {"title": "解梦大全：常见梦境的含义与五行解读", "sections": [{"h2": "中国文化中的梦", "p": "在中国传统中，梦被视为潜意识的讯息，可以揭示隐藏的真相、预测未来事件并提供精神指引。古书《周公解梦》数百年来一直是解梦的标准参考。"}, {"h2": "梦中的五行元素", "p": "在中国解梦中，五行元素扮演重要角色。水相关的梦常涉及情感和直觉；火梦涉及激情和转变；土梦涉及稳定和富足；金梦涉及结构和纪律；木梦涉及成长和创造力。"}, {"h2": "常见梦境象征", "ul": ["飞翔——自由、雄心、逃避压力", "坠落——焦虑、失控、不安全", "水——情绪（清水=清晰，浑浊=困惑）", "牙齿——活力、容貌担忧、沟通", "蛇——智慧、转变、隐藏的恐惧", "死亡——转变、新的开始、人生变化"]}]}};

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
          <span className="text-3xl mb-4 block">🌙</span>
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
