'use client';

import NavBar from '@/components/NavBar';
import { useState } from 'react';

const CONTENT = {"slug": "day-master", "icon": "🔮", "en": {"title": "Your Day Master: The Key to Your Bazi Chart", "sections": [{"h2": "What is a Day Master?", "p": "The Day Master (日主 or 日元) is the Heavenly Stem of your Day Pillar — the single most important element in your Bazi chart. It represents your core self, your innate personality, and your life energy."}, {"h2": "The 10 Day Masters", "p": "Each of the 10 Heavenly Stems can be your Day Master. Your Day Master is determined by the Heavenly Stem of the day you were born, as recorded in the Chinese Sexagenary Cycle calendar.", "ul": ["Jia Wood (甲木) — The Big Tree: strong, upright, generous", "Yi Wood (乙木) — The Vine: flexible, artistic, sociable", "Bing Fire (丙火) — The Sun: warm, charismatic, leadership", "Ding Fire (丁火) — The Candle: gentle, focused, meticulous", "Wu Earth (戊土) — The Mountain: stable, reliable, protective", "Ji Earth (己土) — The Garden: nurturing, versatile, supportive", "Geng Metal (庚金) — The Sword: direct, decisive, persistent", "Xin Metal (辛金) — The Jewel: refined, elegant, perfectionist", "Ren Water (壬水) — The Ocean: bold, strategic, ambitious", "Gui Water (癸水) — The Rain: intuitive, wise, adaptable"]}, {"h2": "Finding Your Day Master", "p": "Use our free Bazi calculator on the MysticSage homepage to instantly discover your Day Master. Simply enter your birth date and time, and we\u0027ll generate your complete Four Pillars chart with your Day Master highlighted."}, {"h2": "Why Day Master Matters", "p": "Understanding your Day Master is like discovering your spiritual DNA. It reveals your natural tendencies, your ideal career paths, your relationship patterns, and areas for personal growth."}]}, "zh": {"title": "日主是什么？你的日元五行决定了你的性格本质", "sections": [{"h2": "什么是日主？", "p": "日主（也称日元）是你日柱的天干——八字命盘中最核心的元素。它代表你真正的自我、天生的性格特征和生命能量。"}, {"h2": "十大日主详解", "p": "十天干的每一个都可能成为你的日主。你的日主根据出生日的天干确定，需查阅中国干支历。", "ul": ["甲木（参天大树）—— 坚强、正直、慷慨", "乙木（藤蔓花草）—— 灵活、艺术、善于社交", "丙火（太阳之火）—— 温暖、魅力、领导力", "丁火（灯烛之火）—— 温和、专注、细腻", "戊土（巍峨高山）—— 稳定、可靠、有保护欲", "己土（田园之土）—— 滋养、包容、多变", "庚金（刀剑之金）—— 直接、果断、坚韧", "辛金（珠宝之金）—— 精致、优雅、完美主义", "壬水（江河之水）—— 大胆、战略、志向远大", "癸水（雨露之水）—— 直觉、智慧、适应力强"]}, {"h2": "如何找到你的日主？", "p": "使用 MysticSage 首页的免费八字计算器，输入出生日期和时间，即可立即生成完整的四柱命盘并标出你的日主。"}, {"h2": "为什么日主如此重要？", "p": "了解你的日主就像是发现你的精神DNA。它揭示了你的天性倾向、理想职业方向、关系模式和成长空间。"}]}};

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
          <span className="text-3xl mb-4 block">🔮</span>
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
