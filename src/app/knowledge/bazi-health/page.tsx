'use client';

import NavBar from '@/components/NavBar';
import { useState } from 'react';

const CONTENT = {
  "slug": "bazi-health",
  "icon": "💊",
  "en": {
    "title": "Bazi for Health: What Your Chart Reveals About Your Body",
    "sections": [
      {
        "h2": "The Five Elements and Your Body",
        "p": "In Traditional Chinese Medicine, each of the Five Elements governs specific organs and body systems. Your Bazi chart reveals which elements are strong or weak, indicating areas of strength or vulnerability."
      },
      {
        "h2": "Element-Organ Mapping",
        "ul": [
          "Wood: Liver, gallbladder, eyes, tendons, immune system",
          "Fire: Heart, blood vessels, tongue, complexion, sleep",
          "Earth: Spleen, stomach, muscles, mouth, digestion",
          "Metal: Lungs, large intestine, skin, nose, respiratory system",
          "Water: Kidneys, bladder, bones, ears, reproductive system"
        ]
      },
      {
        "h2": "Reading Health from Your Chart",
        "p": "If Wood is excessively strong, you may be prone to liver issues or anger. If Water is deficient, kidney weakness may arise. The element that controls your weak element is also important."
      },
      {
        "h2": "Preventive Health Tips",
        "p": "If Earth is weak: eat more grains and root vegetables. If Metal is weak: practice deep breathing and skincare. If Water is weak: stay hydrated. Your Bazi chart offers valuable preventive health insights."
      }
    ]
  },
  "zh": {
    "title": "八字看健康：你的体质弱点和养生方向",
    "sections": [
      {
        "h2": "五行与身体",
        "p": "在中医理论中，每个五行元素主宰特定器官和身体系统。你的八字揭示哪些元素旺盛或虚弱，指示天生的优势和脆弱区域。"
      },
      {
        "h2": "五行对应器官",
        "ul": [
          "木：肝、胆、眼睛、筋腱、免疫系统",
          "火：心、血管、舌头、面色、睡眠",
          "土：脾、胃、肌肉、口唇、消化",
          "金：肺、大肠、皮肤、鼻子、呼吸系统",
          "水：肾、膀胱、骨骼、耳朵、生殖系统"
        ]
      },
      {
        "h2": "从八字看健康",
        "p": "木过旺：易有肝胆问题或脾气大。水弱：可能肾虚或生殖系统问题。"
      },
      {
        "h2": "养生建议",
        "p": "土弱：多吃谷物和根茎类蔬菜。金弱：练习深呼吸和皮肤护理。水弱：多喝水、注意肾脏保养。"
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
