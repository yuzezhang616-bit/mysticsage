'use client';

import NavBar from '@/components/NavBar';
import { useState } from 'react';

const CONTENT = {"slug": "feng-shui-basics", "icon": "🏯", "en": {"title": "Feng Shui Basics for Beginners", "sections": [{"h2": "What is Feng Shui?", "p": "Feng Shui (风水, wind and water) is an ancient Chinese practice that examines how the arrangement of your environment affects your energy, health, and fortune. By harmonizing your living spaces, you can invite positive chi (energy) into your life."}, {"h2": "The Bagua Map", "p": "The Bagua (八卦) is a feng shui tool that divides your home into nine areas, each corresponding to a different aspect of life: wealth, fame, love, family, health, creativity, knowledge, career, and helpful people."}, {"h2": "5 Simple Feng Shui Tips", "ul": ["Declutter your entrance — chi enters through your front door", "Balance the five elements in each room", "Keep your bedroom calm and electronic-free for better sleep", "Use mirrors strategically to expand energy in small spaces", "Add plants to bring Wood energy and vitality"]}]}, "zh": {"title": "风水入门：简单实用的家居风水布局指南", "sections": [{"h2": "什么是风水？", "p": "风水是一种古老的中国实践，研究环境的布局如何影响你的能量、健康和运势。通过调和居住空间，你可以吸引正能量进入生活。"}, {"h2": "八卦图", "p": "八卦是风水工具，将你的家分为九个区域，每个对应生活的不同方面：财富、名声、爱情、家庭、健康、创造力、知识、事业和贵人。"}, {"h2": "5个简单的风水小技巧", "ul": ["保持入口整洁——气从正门进入", "平衡每个房间的五行元素", "卧室保持安静少电器，有助于睡眠", "巧妙使用镜子在小空间扩展能量", "摆放植物带来木能量和活力"]}]}};

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
          <span className="text-3xl mb-4 block">🏯</span>
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
