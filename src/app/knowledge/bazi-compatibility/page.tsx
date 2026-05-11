'use client';

import NavBar from '@/components/NavBar';
import { useState } from 'react';

const CONTENT = {"slug": "bazi-compatibility", "icon": "💕", "en": {"title": "Bazi Compatibility & Love Match", "sections": [{"h2": "Finding Love Through Bazi", "p": "In traditional Chinese culture, Bazi compatibility analysis (八字合婚) has been used for centuries to evaluate romantic relationships. The method examines the interaction between two people\u0027s Bazi charts to predict harmony, challenges, and long-term potential."}, {"h2": "Key Factors in Bazi Compatibility", "p": "Several elements are examined when comparing two Bazi charts:", "ul": ["Elemental Balance — Do your Five Elements complement each other?", "Day Master Dynamics — Are your core personalities compatible?", "Animal Sign Conflicts — Do your Earthly Branches clash?", "Luck Cycle Alignment — Are your life cycles in sync?", "Spouse Star — The condition of each person\u0027s spouse indicator"]}, {"h2": "The Six Clashes", "p": "Some Earthly Branch combinations are naturally conflicting. For example, Rat and Horse, Ox and Goat, Tiger and Monkey, Rabbit and Rooster, Dragon and Dog, Snake and Pig. If partners have clashing birth year animals, the relationship may require extra effort."}, {"h2": "Using MysticSage for Compatibility", "p": "Try our Bazi compatibility tool to compare charts. Understanding the dynamics between two people can help navigate relationships with more awareness and compassion."}]}, "zh": {"title": "八字合婚配对：如何看两人八字是否相合", "sections": [{"h2": "八字合婚的原理", "p": "在中国传统文化中，八字合婚被广泛用于评估姻缘匹配程度。该方法通过分析两个人的八字命盘如何互动，来预测和谐程度、潜在挑战和长期发展的可能性。"}, {"h2": "八字合婚的关键因素", "p": "比较两个八字时，会考察多个方面：", "ul": ["五行互补——你们的五行是否相互补充？", "日主互动——核心性格是否相容？", "属相相冲——地支是否有冲突？", "大运同步——人生周期是否协调？", "配偶星——每个人配偶宫的状况"]}, {"h2": "六冲", "p": "有些地支组合天生冲突。例如鼠马冲、牛羊冲、虎猴冲、兔鸡冲、龙狗冲、蛇猪冲。如果伴侣出生年份生肖相冲，关系可能需要更多努力。"}, {"h2": "使用 MysticSage 进行合婚分析", "p": "试试我们的八字合婚工具来比较命盘。了解两个人之间的互动规律，可以帮助你在关系中更加明智和包容。"}]}};

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
          <span className="text-3xl mb-4 block">💕</span>
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
