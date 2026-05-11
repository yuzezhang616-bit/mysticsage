'use client';

import NavBar from '@/components/NavBar';
import { useState } from 'react';

const CONTENT = {"slug": "geng-metal-day-master", "icon": "⚔️", "en": {"title": "Geng Metal Day Master: The Sword of Justice", "sections": [{"h2": "Geng Metal — The Sword", "p": "Geng Metal (庚金) represents the sword, axe, or blade — sharp, decisive, and unyielding. Geng Metal people are direct, courageous, and driven by a strong sense of justice. They cut through confusion with clarity and action."}, {"h2": "Personality Traits", "ul": ["Direct and honest — Geng Metal people say what they mean", "Courageous and bold — they face challenges head-on", "Decisive — they make decisions quickly and stand by them", "Persistent — once they aim at a target, they won\u0027t stop", "Can be blunt — their directness may come across as harsh"]}, {"h2": "Career Paths", "p": "Geng Metal excels in military, law, surgery, engineering, sports, management consulting, and any field requiring decisive action. Their sharp analytical mind makes them excellent problem-solvers."}, {"h2": "Love & Relationships", "p": "In love, Geng Metal is direct and passionate. They are protective partners who stand up for their loved ones. They need partners who can handle their directness and match their strength."}]}, "zh": {"title": "庚金日主详解：正义之剑般的果断之人", "sections": [{"h2": "庚金——刀剑之金", "p": "庚金代表剑、斧或刀刃——锋利、果断、不屈服。庚金人直接、勇敢，受强烈的正义感驱动。他们用清晰和行动斩断困惑。"}, {"h2": "性格特征", "ul": ["直接诚实——庚金人言为心声", "勇敢大胆——直面挑战", "果断坚决——快速做决定并坚持", "坚韧不拔——瞄准目标永不放弃", "有时过于直接——直率可能显得尖锐"]}, {"h2": "职业方向", "p": "庚金在军队、法律、外科、工程、体育、管理咨询和任何需要果断行动的领域中表现出色。敏锐的分析能力使他们成为优秀的问题解决者。"}, {"h2": "爱情与人际关系", "p": "爱情中，庚金直接而热情。他们是有保护欲的伴侣，为所爱之人挺身而出。需要能承受其直接性并匹配其力量的伴侣。"}]}};

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
          <span className="text-3xl mb-4 block">⚔️</span>
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
