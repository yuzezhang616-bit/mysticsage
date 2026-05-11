'use client';

import NavBar from '@/components/NavBar';
import { useState } from 'react';

const CONTENT = {"slug": "face-reading-guide", "icon": "👤", "en": {"title": "Chinese Face Reading: A Complete Guide", "sections": [{"h2": "Introduction to Mian Xiang", "p": "Mian Xiang (面相), or Chinese face reading, is an ancient practice that interprets a person\u0027s facial features to reveal their character, fortune, and life path. It has been practiced for over 3,000 years and was used historically for selecting officials and matching marriages."}, {"h2": "The Three Sections of the Face", "p": "In Mian Xiang, the face is divided into three sections: the upper section (forehead to eyebrows) represents early life and inherited luck; the middle section (eyes to nose) represents mid-life, career, and relationships; the lower section (mouth to chin) represents late life and overall fulfillment."}, {"h2": "Key Facial Features", "ul": ["Forehead — Intelligence, career prospects, early luck", "Eyebrows — Ambition, siblings, personal drive", "Eyes — Wisdom, character, willpower", "Nose — Wealth, status, self-confidence", "Mouth — Communication, social skills, happiness", "Chin — Stamina, luck in later years"]}]}, "zh": {"title": "面相学入门指南：从额头到下巴，每个部位都藏着你的命运密码", "sections": [{"h2": "面相学简介", "p": "面相学是一种通过分析面部特征来揭示性格、运势和人生轨迹的古老实践。已有三千多年历史，历史上曾被用于选拔官员和匹配婚姻。"}, {"h2": "面部的三停", "p": "面相将面部划分为三部分：上停（额头至眉毛）代表早年运势；中停（眼睛至鼻子）代表中年事业和人际关系；下停（嘴巴至下巴）代表晚年和整体成就。"}, {"h2": "关键面部特征", "ul": ["额头——智慧、事业前景、早年运势", "眉毛——志向、兄弟姐妹、个人动力", "眼睛——智慧、性格、意志力", "鼻子——财富、地位、自信", "嘴巴——沟通、社交能力、幸福", "下巴——耐力、晚年运势"]}]}};

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
          <span className="text-3xl mb-4 block">👤</span>
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
