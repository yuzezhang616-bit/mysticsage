'use client';

import { useState, useMemo } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

type Category = 'All' | 'Fundamentals' | 'Day Masters' | 'Five Elements' | 'Tools & Topics';

interface ArticleMeta {
  slug: string; icon: string; title_en: string; title_zh: string; category: Category;
}

const ARTICLES: ArticleMeta[] = [
  { slug: "what-is-bazi", icon: "📜", title_en: "What is Bazi?", title_zh: "什么是八字？", category: "Fundamentals" },
  { slug: "how-to-read-bazi", icon: "📖", title_en: "How to Read a Bazi Chart", title_zh: "八字排盘教程", category: "Fundamentals" },
  { slug: "day-master", icon: "🔮", title_en: "Your Day Master", title_zh: "日主解析", category: "Fundamentals" },
  { slug: "lucky-elements", icon: "🌟", title_en: "Your Lucky Element (Yong Shen)", title_zh: "喜用神解析", category: "Fundamentals" },
  { slug: "shi-shen-ten-gods", icon: "👥", title_en: "The 10 Gods (Shi Shen)", title_zh: "十神解析", category: "Fundamentals" },
  { slug: "luck-cycles-da-yun", icon: "⏳", title_en: "Luck Cycles (Da Yun)", title_zh: "大运详解", category: "Fundamentals" },
  { slug: "five-elements", icon: "☯", title_en: "The Five Elements", title_zh: "五行学说", category: "Five Elements" },
  { slug: "five-elements-generating", icon: "🔥➡️🌍", title_en: "Generating Cycle (相生)", title_zh: "五行相生详解", category: "Five Elements" },
  { slug: "five-elements-controlling", icon: "⚔️☯", title_en: "Controlling Cycle (相克)", title_zh: "五行相克详解", category: "Five Elements" },
  { slug: "jia-wood-day-master", icon: "🌲", title_en: "Jia Wood Day Master", title_zh: "甲木日主", category: "Day Masters" },
  { slug: "yi-wood-day-master", icon: "🌿", title_en: "Yi Wood Day Master", title_zh: "乙木日主", category: "Day Masters" },
  { slug: "bing-fire-day-master", icon: "☀️", title_en: "Bing Fire Day Master", title_zh: "丙火日主", category: "Day Masters" },
  { slug: "ding-fire-day-master", icon: "🕯️", title_en: "Ding Fire Day Master", title_zh: "丁火日主", category: "Day Masters" },
  { slug: "wu-earth-day-master", icon: "⛰️", title_en: "Wu Earth Day Master", title_zh: "戊土日主", category: "Day Masters" },
  { slug: "ji-earth-day-master", icon: "🌷", title_en: "Ji Earth Day Master", title_zh: "己土日主", category: "Day Masters" },
  { slug: "geng-metal-day-master", icon: "⚔️", title_en: "Geng Metal Day Master", title_zh: "庚金日主", category: "Day Masters" },
  { slug: "xin-metal-day-master", icon: "💎", title_en: "Xin Metal Day Master", title_zh: "辛金日主", category: "Day Masters" },
  { slug: "ren-water-day-master", icon: "🌊", title_en: "Ren Water Day Master", title_zh: "壬水日主", category: "Day Masters" },
  { slug: "gui-water-day-master", icon: "🌧️", title_en: "Gui Water Day Master", title_zh: "癸水日主", category: "Day Masters" },
  { slug: "bazi-compatibility", icon: "💕", title_en: "Bazi Love Compatibility", title_zh: "八字合婚", category: "Tools & Topics" },
  { slug: "chinese-zodiac-complete", icon: "🐉", title_en: "Chinese Zodiac Guide", title_zh: "十二生肖大全", category: "Tools & Topics" },
  { slug: "tai-sui-2026", icon: "⚡", title_en: "Tai Sui 2026", title_zh: "2026年太岁", category: "Tools & Topics" },
  { slug: "bazi-career-guidance", icon: "💼", title_en: "Bazi Career Guidance", title_zh: "八字看事业", category: "Tools & Topics" },
  { slug: "bazi-health", icon: "💊", title_en: "Bazi Health Insights", title_zh: "八字看健康", category: "Tools & Topics" },
  { slug: "feng-shui-basics", icon: "🏯", title_en: "Feng Shui Basics", title_zh: "风水入门", category: "Tools & Topics" },
  { slug: "face-reading-guide", icon: "👤", title_en: "Chinese Face Reading", title_zh: "面相学", category: "Tools & Topics" },
  { slug: "dream-meanings", icon: "🌙", title_en: "Dream Interpretation", title_zh: "解梦大全", category: "Tools & Topics" },
  { slug: "iching-guide", icon: "☯", title_en: "I Ching Guide", title_zh: "易经入门", category: "Tools & Topics" },
];

const CATEGORIES: Category[] = ['All', 'Fundamentals', 'Day Masters', 'Five Elements', 'Tools & Topics'];
const CATEGORY_COUNTS: Record<Category, number> = {
  All: ARTICLES.length,
  Fundamentals: ARTICLES.filter(a => a.category === 'Fundamentals').length,
  'Day Masters': ARTICLES.filter(a => a.category === 'Day Masters').length,
  'Five Elements': ARTICLES.filter(a => a.category === 'Five Elements').length,
  'Tools & Topics': ARTICLES.filter(a => a.category === 'Tools & Topics').length,
};

export default function KnowledgePage() {
  const [category, setCategory] = useState<Category>('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return ARTICLES.filter(a => {
      const matchCategory = category === 'All' || a.category === category;
      const matchSearch = !search || a.title_en.toLowerCase().includes(search.toLowerCase()) || a.title_zh.includes(search);
      return matchCategory && matchSearch;
    });
  }, [category, search]);

  return (
    <>
      <div className="video-bg">
        <video autoPlay muted loop playsInline className="bg-video"><source src="/bg.mp4" type="video/mp4" /></video>
        <div className="video-overlay" />
      </div>
      <main className="min-h-screen relative z-10">
        <NavBar />
        <div className="max-w-4xl mx-auto px-4 py-8">

          {/* Header */}
          <h1 className="text-3xl font-bold gold-text text-center mb-2">📚 Knowledge Base</h1>
          <p className="text-[#9b8e7a] text-center text-sm mb-6 max-w-lg mx-auto">
            Learn about Bazi, Five Elements, Feng Shui, and more ancient Chinese wisdom
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto mb-5">
            <input
              type="text"
              placeholder="🔍 Search articles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[#e8dcc8] placeholder:text-[#6b5f4a] outline-none focus:border-[#d4af37]/40 transition-all text-center"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs border transition-all ${
                  category === cat
                    ? 'bg-[#d4af37]/20 border-[#d4af37]/40 text-[#d4af37]'
                    : 'bg-white/[0.03] border-white/[0.08] text-[#9b8e7a] hover:border-[#d4af37]/20'
                }`}
              >
                {cat} <span className="opacity-50 ml-1">({CATEGORY_COUNTS[cat]})</span>
              </button>
            ))}
          </div>

          {/* Article Grid */}
          <div className="grid gap-3 md:grid-cols-2">
            {filtered.map((article) => (
              <a key={article.slug} href={`/knowledge/${article.slug}`}
                className="bg-[#0f1117]/70 border border-[rgba(212,175,55,0.06)] hover:border-[rgba(212,175,55,0.2)] rounded-xl p-4 transition-all cursor-pointer group block no-underline"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl shrink-0 mt-0.5">{article.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-sm font-semibold gold-text mb-0.5 group-hover:text-[#f0d68a] transition-colors">
                      {article.title_en}
                    </h2>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-[#6b5f4a]">{article.category}</span>
                      <span className="text-[9px] text-[#6b5f4a]">·</span>
                      <span className="text-[10px] text-[#6b5f4a]">{article.title_zh}</span>
                    </div>
                  </div>
                  <span className="text-[#d4af37]/40 group-hover:text-[#d4af37] text-xs transition-colors self-center">→</span>
                </div>
              </a>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-[#6b5f4a] text-sm py-8">No articles match your search.</p>
          )}

          {/* SEO intro */}
          <div className="mt-12 border-t border-[rgba(212,175,55,0.06)] pt-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-lg font-semibold gold-text mb-4">About MysticSage</h2>
              <p className="text-[#9b8e7a] text-xs leading-relaxed">
                MysticSage is a free online Chinese astrology platform. Our tools include Bazi (Eight Characters) fortune telling, love compatibility analysis, Chinese name suggestion, I Ching divination, Feng Shui knowledge, face reading, and dream interpretation. All calculations are based on traditional Chinese metaphysics and run entirely in your browser — no data is uploaded to any server.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
