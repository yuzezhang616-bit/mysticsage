'use client';

import NavBar from '@/components/NavBar';
import { useState } from 'react';

const CONTENT = {
  "slug": "lucky-elements",
  "icon": "🌟",
  "en": {
    "title": "Understanding Your Lucky Elements: The Useful God in Bazi",
    "sections": [
      {
        "h2": "What is the Useful God?",
        "p": "Your Useful God is the element that your Bazi chart needs most to achieve balance. Think of it as a prescription for harmony the specific element that can compensate for your chart's weaknesses."
      },
      {
        "h2": "How to Find Your Lucky Element",
        "p": "The process involves analyzing your Day Master and the balance of Five Elements in your chart. If your Wood is too weak, it needs Water to nourish it. If your Fire is too strong, it needs Water to cool it."
      },
      {
        "h2": "Excess vs Deficiency",
        "p": "When an element is excessive: suppress it using the Controlling Cycle. When an element is deficient: nourish it using the Generating Cycle."
      },
      {
        "h2": "Practical Enhancement Methods",
        "ul": [
          "Colors: wear your lucky element's color (blue/black for Water)",
          "Directions: face or sleep toward your element's favorable direction",
          "Foods: eat foods associated with your lucky element",
          "Activities: engage in activities that embody your element",
          "Relationships: surround yourself with people whose element supports yours"
        ]
      }
    ]
  },
  "zh": {
    "title": "如何补五行：你的喜用神是什么",
    "sections": [
      {
        "h2": "什么是喜用神？",
        "p": "喜用神是你的八字命盘中最需要以实现平衡的五行元素。把它想象为一张和谐处方，能够弥补命盘弱点并增强优势的特定元素。"
      },
      {
        "h2": "如何找到你的喜用神？",
        "p": "这个过程中需要分析你的日主和八字中五行的平衡状况。如果木弱，需要水来滋养；如果火过旺，需要水来冷却。"
      },
      {
        "h2": "五行旺衰的判断",
        "p": "一个元素过旺时：用相克循环来抑制。一个元素过弱时：用相生循环来滋养。"
      },
      {
        "h2": "实用的补五行方法",
        "ul": [
          "颜色：穿戴喜用神对应的颜色（蓝色/黑色补水）",
          "方位：朝向或睡向喜用神的有利方位",
          "食物：食用与喜用神相关的食物",
          "活动：从事体现该元素的活动",
          "人际：多与五行属性支持你的人相处"
        ]
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
