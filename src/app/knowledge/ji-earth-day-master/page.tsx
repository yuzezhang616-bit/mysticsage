'use client';

import NavBar from '@/components/NavBar';
import { useState } from 'react';

const CONTENT = {"slug": "ji-earth-day-master", "icon": "🌷", "en": {"title": "Ji Earth Day Master: The Nurturing Garden", "sections": [{"h2": "Ji Earth — The Garden", "p": "Ji Earth (己土) represents fertile garden soil — adaptable, nurturing, and receptive. Unlike Wu Earth\u0027s mountain, Ji Earth is soft, yielding, and highly fertile. Ji Earth people are adaptable, supportive, and quietly effective."}, {"h2": "Personality Traits", "ul": ["Nurturing and caring — Ji Earth supports everyone around them", "Adaptable and versatile — they adjust to change smoothly", "Humble and unassuming — they don\u0027t need the spotlight", "Diplomatic — they know how to harmonize different people", "Can be indecisive — their flexibility can become over-accommodation"]}, {"h2": "Career Paths", "p": "Ji Earth excels in counseling, healthcare, education, social work, hospitality, and creative arts. Their supportive nature makes them exceptional therapists, nurses, teachers, and team players."}, {"h2": "Love & Relationships", "p": "Ji Earth people give love through nurturing and care. They make devoted partners who create a warm, comfortable home."}]}, "zh": {"title": "己土日主详解：滋养包容的田园之人", "sections": [{"h2": "己土——田园之土", "p": "己土代表肥沃的田园土壤——适应力强、滋养包容。与戊土的高山不同，己土柔软、顺从且极其肥沃。己土人适应力强、支持他人、低调高效。"}, {"h2": "性格特征", "ul": ["滋养关怀——己土支持身边的每个人", "适应力强、多才多艺——顺畅应对变化", "谦虚低调——不需要成为焦点", "有外交手腕——善于调和不同人群", "有时优柔寡断——灵活性可能变成过度妥协"]}, {"h2": "职业方向", "p": "己土在咨询、医疗、教育、社工、酒店管理和创意艺术中表现出色。支持型天性使其成为优秀的治疗师、护士、教师和团队成员。"}, {"h2": "爱情与人际关系", "p": "己土人通过滋养和关怀表达爱。他们是忠诚的伴侣，营造温暖舒适的家庭环境。"}]}};

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
          <span className="text-3xl mb-4 block">🌷</span>
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
