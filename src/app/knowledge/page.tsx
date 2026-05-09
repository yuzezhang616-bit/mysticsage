'use client';

import { useState } from 'react';
import NavBar from '@/components/NavBar';
import Link from 'next/link';

const ARTICLES = [
  {
    slug: 'what-is-bazi',
    icon: '📜',
    en: { title: 'What is Bazi (Eight Characters)?', excerpt: 'Discover the ancient Chinese art of Bazi reading — how your birth date and time reveal your destiny through the Four Pillars of Destiny.' },
    zh: { title: '什么是八字？八字算命的基本原理', excerpt: '探索古老的中国八字命理学——你的出生年月日时如何通过四柱八字揭示你的命运密码。' },
  },
  {
    slug: 'five-elements',
    icon: '☯',
    en: { title: 'The Five Elements in Chinese Astrology', excerpt: 'Understanding Wood, Fire, Earth, Metal, and Water — how these five elements shape your personality, health, relationships, and destiny.' },
    zh: { title: '五行学说详解：木火土金水如何影响你的命运', excerpt: '理解木、火、土、金、水——这五种元素如何塑造你的性格、健康、人际关系和命运走向。' },
  },
  {
    slug: 'day-master',
    icon: '🔮',
    en: { title: 'Your Day Master: The Key to Your Bazi Chart', excerpt: 'Learn about the 10 Heavenly Stems and how your Day Master element defines your core personality and life path.' },
    zh: { title: '日主是什么？你的日元五行决定了你的性格本质', excerpt: '了解十天干，你的日主五行如何定义你的核心性格和人生轨迹。' },
  },
  {
    slug: 'bazi-compatibility',
    icon: '💕',
    en: { title: 'Bazi Compatibility & Love Match', excerpt: 'How to use Bazi to find your perfect match — the ancient Chinese method of relationship compatibility analysis.' },
    zh: { title: '八字合婚配对：如何看两人八字是否相合', excerpt: '如何用八字找到你的最佳伴侣——古老的中国婚配分析方法。' },
  },
  {
    slug: 'feng-shui-basics',
    icon: '🏯',
    en: { title: 'Feng Shui Basics for Beginners', excerpt: 'Simple Feng Shui tips to harmonize your home, improve your luck, and invite positive energy into your life.' },
    zh: { title: '风水入门：简单实用的家居风水布局指南', excerpt: '简单的风水技巧来调和你的家居环境，改善运势，邀请正能量进入你的生活。' },
  },
  {
    slug: 'face-reading-guide',
    icon: '👤',
    en: { title: 'Chinese Face Reading: A Complete Guide', excerpt: 'Learn the ancient art of Mian Xiang — how your facial features reveal your character, fortune, and life path.' },
    zh: { title: '面相学入门指南：从额头到下巴，每个部位都藏着你的命运密码', excerpt: '学习古老的相学——你的面部特征如何揭示你的性格、运势和人生轨迹。' },
  },
  {
    slug: 'dream-meanings',
    icon: '🌙',
    en: { title: 'Chinese Dream Interpretation: What Your Dreams Mean', excerpt: 'Explore the hidden meanings behind common dreams through the lens of Chinese wisdom and the Five Elements.' },
    zh: { title: '解梦大全：常见梦境的含义与五行解读', excerpt: '以中华智慧和五行学说，探索常见梦境背后的深层含义。' },
  },
  {
    slug: 'iching-guide',
    icon: '☯',
    en: { title: 'I Ching: The Book of Changes Explained', excerpt: 'A beginner\'s guide to the I Ching oracle — how to consult this ancient text for wisdom and guidance.' },
    zh: { title: '易经入门：周易占卜的基本方法与卦象解读', excerpt: '周易占卜初学者指南——如何向这部古老的经典寻求智慧与指引。' },
  },
];

export default function KnowledgePage() {
  const [lang, setLang] = useState<'en'|'zh'>('zh');
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
          <h1 className="text-3xl font-bold gold-text text-center mb-2">{isEn ? '📚 Knowledge Base' : '📚 命理知识库'}</h1>
          <p className="text-[#9b8e7a] text-center text-sm mb-8 max-w-lg mx-auto">
            {isEn ? 'Learn about Bazi, Five Elements, Feng Shui, and more ancient Chinese wisdom' : '学习八字、五行、风水等中华传统智慧知识'}
          </p>

          <div className="grid gap-4">
            {ARTICLES.map((article, i) => (
              <div key={i} className="bg-[#0f1117]/70 border border-[rgba(212,175,55,0.06)] hover:border-[rgba(212,175,55,0.2)] rounded-xl p-5 transition-all cursor-pointer group"
                onClick={() => window.location.href = `https://mystic8zi.top`}>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">{article.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-sm font-semibold gold-text mb-1 group-hover:text-[#f0d68a] transition-colors">
                      {isEn ? article.en.title : article.zh.title}
                    </h2>
                    <p className="text-xs text-[#9b8e7a] leading-relaxed">
                      {isEn ? article.en.excerpt : article.zh.excerpt}
                    </p>
                    <div className="mt-2">
                      <span className="text-[10px] text-[#d4af37]/60 group-hover:text-[#d4af37] transition-colors">
                        {isEn ? 'Read more →' : '马上去体验 →'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
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
            <p className="text-xs text-[#3a3528]">✦ MysticSage — {isEn ? 'Ancient wisdom for the modern soul' : '为现代灵魂准备的古老智慧'}</p>
          </div>
        </footer>
      </main>
    </>
  );
}
