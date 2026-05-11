'use client';

import NavBar from '@/components/NavBar';
import { useState } from 'react';

const CONTENT = {"slug": "iching-guide", "icon": "☯", "en": {"title": "I Ching: The Book of Changes Explained", "sections": [{"h2": "What is the I Ching?", "p": "The I Ching (易经), also known as the Book of Changes, is one of the oldest Chinese classic texts, dating back over 3,000 years. It is a divination system that uses 64 hexagrams to represent all possible situations in life. Confucius himself said he wished he had fifty years to study the I Ching."}, {"h2": "How to Consult the I Ching", "p": "Traditionally, the I Ching is consulted using 50 yarrow stalks or three coins. The querent asks a question and generates a hexagram through a random process. Each hexagram consists of six lines, either yin (broken) or yang (solid), and comes with interpretive text."}, {"h2": "The 64 Hexagrams", "p": "Each hexagram represents a specific life situation, together with advice on how to navigate it. For example, Hexagram 1 \u0027Qian (乾)\u0027 represents creative power and initiative, while Hexagram 2 \u0027Kun (坤)\u0027 represents receptivity and support."}]}, "zh": {"title": "易经入门：周易占卜的基本方法与卦象解读", "sections": [{"h2": "什么是易经？", "p": "易经，也称《周易》，是中国最古老的经典之一，距今已有三千多年历史。它是一个使用六十四卦来代表所有人生可能情况的占卜系统。孔子曾说如果上天能再给他五十年的寿命，他愿意用来研究易经。"}, {"h2": "如何用易经占卜", "p": "传统上，使用50根蓍草或三枚硬币来占卜易经。提问者提出一个问题，通过随机过程生成一个卦象。每卦由六条爻组成，阴爻（断）或阳爻（连），配有解读文字。"}, {"h2": "六十四卦", "p": "每卦代表一个特定的人生处境及应对建议。例如，乾卦代表创造力和主动力，坤卦代表包容和支持。"}]}};

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
          <span className="text-3xl mb-4 block">☯</span>
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
