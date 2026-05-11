'use client';

import { useState } from 'react';
import NavBar from '@/components/NavBar';

const ARTICLES: Array<{slug: string; icon: string; title_en: string; title_zh: string}> = [{"slug": "what-is-bazi", "icon": "📜", "title_en": "What is Bazi?", "title_zh": "什么是八字？"}, {"slug": "five-elements", "icon": "☯", "title_en": "The Five Elements", "title_zh": "五行学说"}, {"slug": "day-master", "icon": "🔮", "title_en": "Your Day Master", "title_zh": "日主解析"}, {"slug": "bazi-compatibility", "icon": "💕", "title_en": "Bazi Love Compatibility", "title_zh": "八字合婚"}, {"slug": "feng-shui-basics", "icon": "🏯", "title_en": "Feng Shui Basics", "title_zh": "风水入门"}, {"slug": "face-reading-guide", "icon": "👤", "title_en": "Chinese Face Reading", "title_zh": "面相学"}, {"slug": "dream-meanings", "icon": "🌙", "title_en": "Dream Interpretation", "title_zh": "解梦大全"}, {"slug": "iching-guide", "icon": "☯", "title_en": "I Ching Guide", "title_zh": "易经入门"}, {"slug": "jia-wood-day-master", "icon": "🌲", "title_en": "Jia Wood Day Master", "title_zh": "甲木日主"}, {"slug": "yi-wood-day-master", "icon": "🌿", "title_en": "Yi Wood Day Master", "title_zh": "乙木日主"}, {"slug": "bing-fire-day-master", "icon": "☀️", "title_en": "Bing Fire Day Master", "title_zh": "丙火日主"}, {"slug": "ding-fire-day-master", "icon": "🕯️", "title_en": "Ding Fire Day Master", "title_zh": "丁火日主"}, {"slug": "wu-earth-day-master", "icon": "⛰️", "title_en": "Wu Earth Day Master", "title_zh": "戊土日主"}, {"slug": "ji-earth-day-master", "icon": "🌷", "title_en": "Ji Earth Day Master", "title_zh": "己土日主"}, {"slug": "geng-metal-day-master", "icon": "⚔️", "title_en": "Geng Metal Day Master", "title_zh": "庚金日主"}, {"slug": "xin-metal-day-master", "icon": "💎", "title_en": "Xin Metal Day Master", "title_zh": "辛金日主"}, {"slug": "ren-water-day-master", "icon": "🌊", "title_en": "Ren Water Day Master", "title_zh": "壬水日主"}, {"slug": "gui-water-day-master", "icon": "🌧️", "title_en": "Gui Water Day Master", "title_zh": "癸水日主"}];

export default function KnowledgePage() {
  const [lang, setLang] = useState<'en'|'zh'>('en');
  const isEn = lang === 'en';

  return (
    <>
      <div className="video-bg">
        <video autoPlay muted loop playsInline className="bg-video"><source src="/bg.mp4" type="video/mp4" /></video>
        <div className="video-overlay" />
      </div>
      <main className="min-h-screen relative z-10">
        <NavBar currentLang={lang} onLangChange={setLang} />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold gold-text text-center mb-2">{isEn ? '\uD83D\uDCDA Knowledge Base' : '\uD83D\uDCDA 命理知识库'}</h1>
          <p className="text-[#9b8e7a] text-center text-sm mb-8 max-w-lg mx-auto">
            {isEn ? 'Learn about Bazi, Five Elements, Feng Shui, and more ancient Chinese wisdom' : '学习八字、五行、风水等中华传统智慧知识'}
          </p>

          <div className="grid gap-4">
            {ARTICLES.map((article, i) => (
              <a key={i} href={`/knowledge/${article.slug}`}
                className="bg-[#0f1117]/70 border border-[rgba(212,175,55,0.06)] hover:border-[rgba(212,175,55,0.2)] rounded-xl p-5 transition-all cursor-pointer group block no-underline">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">{article.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-sm font-semibold gold-text mb-1 group-hover:text-[#f0d68a] transition-colors">
                      {isEn ? article.title_en : article.title_zh}
                    </h2>
                    <div className="mt-2">
                      <span className="text-[10px] text-[#d4af37]/60 group-hover:text-[#d4af37] transition-colors">
                        {isEn ? 'Read more \u2192' : '阅读全文 \u2192'}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* SEO-friendly intro text */}
          <div className="mt-12 border-t border-[rgba(212,175,55,0.06)] pt-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-lg font-semibold gold-text mb-4">{isEn ? 'About MysticSage' : '关于MysticSage免费算命'}</h2>
              <p className="text-[#9b8e7a] text-xs leading-relaxed">
                {isEn
                  ? 'MysticSage is a free online Chinese astrology platform. Our tools include Bazi (Eight Characters) fortune telling, love compatibility analysis, Chinese name suggestion, I Ching divination, Feng Shui knowledge, face reading, and dream interpretation. All calculations are based on traditional Chinese metaphysics and run entirely in your browser — no data is uploaded to any server.'
                  : 'MysticSage 是一个免费的在线八字命理平台。我们的工具包括八字算命、八字合婚配对、起名推荐、周易占卜、风水知识、面相分析和解梦。所有计算基于中国传统命理学，完全在浏览器本地运行——不上传任何数据到服务器。'}
              </p>
            </div>
          </div>
        </div>

        <footer className="border-t border-[rgba(212,175,55,0.06)] mt-12">
          <div className="max-w-5xl mx-auto px-4 py-6 text-center">
            <p className="text-xs text-[#3a3528]">{'\u2726'} MysticSage — {isEn ? 'Ancient wisdom for the modern soul' : '为现代灵魂准备的古老智慧'}</p>
          </div>
        </footer>
      </main>
    </>
  );
}
