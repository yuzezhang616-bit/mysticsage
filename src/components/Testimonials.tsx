'use client';

import { useMemo } from 'react';

/**
 * 前端展示文案，非真实用户数据
 * 用于在首页展示匿名用户评价，增强社交信任
 */
const TESTIMONIALS = [
  {
    quote: "I've always been curious about Chinese astrology, and this reading felt incredibly accurate. The Five Elements analysis explained patterns in my life I never understood.",
    name: "Alex", age: 32, role: "Software Engineer", country: "🇺🇸",
  },
  {
    quote: "No signup, no BS, just real insight. I compared my chart with my partner's and it explained so much about our dynamic. Highly recommended.",
    name: "Sarah", age: 28, role: "Designer", country: "🇬🇧",
  },
  {
    quote: "The elemental balance analysis helped me understand why I'm drawn to certain career paths. It's like having a roadmap for your natural strengths.",
    name: "Mark", age: 35, role: "Entrepreneur", country: "🇨🇦",
  },
  {
    quote: "I was skeptical at first, but the Day Master description was scarily accurate. My friends all tried it too — now we compare our elements over coffee.",
    name: "Emma", age: 26, role: "Teacher", country: "🇦🇺",
  },
];

export default function Testimonials() {
  // 每次随机选择3条展示，用 useMemo 保证只在客户端渲染时 shuffle 一次
  const displayed = useMemo(() => {
    const shuffled = [...TESTIMONIALS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, []);

  return (
    <div className="mt-24 text-center">
      <h2 className="text-2xl md:text-3xl font-bold gold-text mb-3">What People Are Discovering</h2>
      {/* 金色装饰线 */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4af37]/40" />
        <div className="h-px w-8 bg-[#d4af37]/60" />
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4af37]/40" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {displayed.map((t, i) => (
          <div
            key={i}
            className="bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-lg border border-white/[0.10] rounded-2xl p-7 text-left transition-all hover:border-[#d4af37]/20 hover:-translate-y-0.5"
          >
            {/* 首字母圆形头像 */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full border-2 border-[#d4af37]/60 flex items-center justify-center text-sm font-bold gold-text bg-[#d4af37]/5 shrink-0">
                {t.name[0]}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-[#e8dcc8]">{t.name}</p>
                <p className="text-[10px] text-[#6b5f4a]">{t.age} · {t.role} {t.country}</p>
              </div>
            </div>
            {/* 引号评价文案 */}
            <p className="text-xs text-[#c4b998] leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
          </div>
        ))}
      </div>
      {/* 底部免责说明 */}
      <p className="text-[10px] text-[#3a3528] mt-4">*Testimonials reflect individual experiences.</p>
    </div>
  );
}
