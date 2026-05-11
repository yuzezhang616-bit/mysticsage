'use client';

import NavBar from '@/components/NavBar';
import { useState } from 'react';

const CONTENT = {
  "slug": "bazi-career-guidance",
  "icon": "💼",
  "en": {
    "title": "Bazi for Career Guidance: Finding Your Ideal Profession",
    "sections": [
      {
        "h2": "Your Bazi Chart as a Career Compass",
        "p": "Your Bazi chart reveals natural talents, ideal work environments, and career paths. The combination of your Day Master, Five Elements balance, and 10 Gods together paint a clear picture of your professional strengths."
      },
      {
        "h2": "Career by Day Master",
        "ul": [
          "Wood: Education, writing, design, environmental work, counseling",
          "Fire: Leadership, entertainment, sales, teaching, public speaking",
          "Earth: Real estate, agriculture, banking, management, HR",
          "Metal: Law, finance, engineering, surgery, quality control",
          "Water: Technology, research, consulting, trading, psychology"
        ]
      },
      {
        "h2": "The 10 Gods and Career",
        "p": "Strong Officer + Resource suggests traditional career (government, education). Strong Wealth + Eating God suggests entrepreneurship. Strong Hurting Officer + Resource suggests creative or technology fields."
      },
      {
        "h2": "Timing Your Career Moves",
        "p": "Use your Luck Cycles to time career changes. Starting a business during a favorable Luck Cycle aligned with your Wealth element dramatically increases success."
      }
    ]
  },
  "zh": {
    "title": "八字看事业：你天生适合什么职业",
    "sections": [
      {
        "h2": "八字是你的职业指南针",
        "p": "你的八字揭示了天赋、理想工作环境和职业方向。日主、五行平衡和十神共同描绘出你的职业优势蓝图。"
      },
      {
        "h2": "按日主选职业",
        "ul": [
          "木：教育、写作、设计、环保、咨询",
          "火：领导、娱乐、销售、教学、演讲",
          "土：房地产、农业、银行、管理、人力资源",
          "金：法律、金融、工程、外科、质检",
          "水：技术、研究、咨询、贸易、心理学"
        ]
      },
      {
        "h2": "十神与事业",
        "p": "官印旺：适合传统职业。财+食神旺：适合创业。伤官+印旺：适合创意或技术领域。"
      },
      {
        "h2": "把握职业时机",
        "p": "利用大运来规划职业变动。在有利的大运期间创业，成功率大大提升。"
      }
    ]
  }
};

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
