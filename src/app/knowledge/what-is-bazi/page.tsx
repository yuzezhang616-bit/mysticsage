'use client';

import NavBar from '@/components/NavBar';
import { useState } from 'react';

const CONTENT = {"slug": "what-is-bazi", "icon": "📜", "en": {"title": "What is Bazi (Eight Characters)?", "sections": [{"h2": "The Origins of Bazi", "p": "Bazi (八字), also known as the Four Pillars of Destiny (四柱命理), is a traditional Chinese astrology system that dates back over 2,000 years. Its roots can be traced to the Tang Dynasty, with significant contributions from scholars like Li Xuzhong and Xu Ziping during the Song Dynasty."}, {"h2": "How Bazi Works", "p": "Your Bazi chart is calculated from your birth year, month, day, and hour — each represented by one Heavenly Stem and one Earthly Branch. Together, they form four pillars, each containing two characters, making eight characters in total.", "ul": ["Year Pillar (年柱) — Represents your ancestors and early childhood", "Month Pillar (月柱) — Your parents, career, and social life", "Day Pillar (日柱) — The core of your chart: your own self and spouse", "Hour Pillar (时柱) — Your children, late life, and legacy"]}, {"h2": "The 10 Heavenly Stems & 12 Earthly Branches", "p": "The 10 Heavenly Stems are: Jia (甲, Yang Wood), Yi (乙, Yin Wood), Bing (丙, Yang Fire), Ding (丁, Yin Fire), Wu (戊, Yang Earth), Ji (己, Yin Earth), Geng (庚, Yang Metal), Xin (辛, Yin Metal), Ren (壬, Yang Water), Gui (癸, Yin Water). Each stem carries specific characteristics and interacts with others through the Five Elements — Wood, Fire, Earth, Metal, and Water."}, {"h2": "Why Read Your Bazi?", "p": "A Bazi reading helps you understand your innate personality, strengths, weaknesses, and life patterns. It can provide guidance on career paths, relationships, health tendencies, and optimal timing for major decisions."}]}, "zh": {"title": "什么是八字？八字算命的基本原理", "sections": [{"h2": "八字的起源", "p": "八字，又称四柱命理，是中国传统命理学体系，有两千多年的历史。其根源可追溯到唐代，宋代学者李虚中和徐子平对此体系做出了重要贡献。"}, {"h2": "八字如何运作", "p": "你的八字命盘由出生年、月、日、时推算而来——每个时辰由一个天干和一个地支表示。它们共同组成四柱，每柱两个字符，共八个字。", "ul": ["年柱（祖上柱）—— 代表祖先和早年", "月柱（父母宫）—— 父母、事业和社交", "日柱（夫妻宫）—— 命盘核心：自己和配偶", "时柱（子女宫）—— 子女、晚年和事业的终结"]}, {"h2": "十天干与十二地支", "p": "十天干：甲（阳木）、乙（阴木）、丙（阳火）、丁（阴火）、戊（阳土）、己（阴土）、庚（阳金）、辛（阴金）、壬（阳水）、癸（阴水）。每个天干都有特定属性，通过五行（木、火、土、金、水）相互作用。"}, {"h2": "为什么要看八字？", "p": "八字分析帮助你了解自己的天性、优势、劣势和人生规律。它可以为你提供职业方向、人际关系、健康状况和重大决策最佳时机方面的指导。"}]}};

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
          <span className="text-3xl mb-4 block">📜</span>
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
