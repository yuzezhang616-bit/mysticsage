'use client';

import { useState, useEffect } from 'react';

/*
 * 每日运势回访钩子（DailyHint）
 * 非真实用户数据/占位文案：生肖运势内容为通用占位文案，非基于实际星盘计算
 *
 * 通过 localStorage 实现每日首次访问展示一条随机生肖运势提示
 * - 存储 lastVisitDate (YYYY-MM-DD) 控制每日展示一次
 * - 存储 zodiacSign 持久化分配的生肖
 * - 如果没有存储过生肖，则随机分配一个
 * - 带关闭按钮的半透明金色渐变横幅
 */

const ZODIACS = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];

const DAILY_HINTS: Record<string, { emoji: string; color: string; text: string }> = {
  Rat:     { emoji: '🐀', color: '#a8872e', text: 'Today favors strategic thinking. Trust your instincts — they\'re sharper than usual.' },
  Ox:      { emoji: '🐂', color: '#6b7280', text: 'Steady progress wins the race. Focus on one task and complete it with excellence.' },
  Tiger:   { emoji: '🐅', color: '#f59e0b', text: 'Bold moves are rewarded today. Your confidence will open doors.' },
  Rabbit:  { emoji: '🐇', color: '#ec4899', text: 'Harmony is your superpower today. A gentle approach yields the best results.' },
  Dragon:  { emoji: '🐉', color: '#ef4444', text: 'Your natural charisma is amplified. Lead with vision and others will follow.' },
  Snake:   { emoji: '🐍', color: '#8b5cf6', text: 'Look beneath the surface. A hidden opportunity reveals itself today.' },
  Horse:   { emoji: '🐎', color: '#f97316', text: 'Adventurous energy flows through you. Channel it toward a goal you\'ve been postponing.' },
  Goat:    { emoji: '🐐', color: '#10b981', text: 'Creativity blooms today. Express yourself through art, writing, or music.' },
  Monkey:  { emoji: '🐒', color: '#14b8a6', text: 'Your wit and adaptability are at their peak. Solve problems with unconventional thinking.' },
  Rooster: { emoji: '🐔', color: '#eab308', text: 'Precision pays off. Review your plans carefully before taking action.' },
  Dog:     { emoji: '🐶', color: '#6366f1', text: 'Loyalty and honesty attract positive energy. Reach out to an old friend today.' },
  Pig:     { emoji: '🐷', color: '#d97706', text: 'Generosity brings unexpected rewards. Share your abundance with others.' },
};

export default function DailyHint() {
  const [visible, setVisible] = useState(false);
  const [zodiac, setZodiac] = useState<string>('');

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const lastVisit = localStorage.getItem('lastVisitDate');
    let sign = localStorage.getItem('zodiacSign');

    if (!sign) {
      // 首次访问，随机分配一个生肖
      sign = ZODIACS[Math.floor(Math.random() * ZODIACS.length)];
      localStorage.setItem('zodiacSign', sign);
    }

    setZodiac(sign);

    if (lastVisit !== today) {
      setVisible(true);
      localStorage.setItem('lastVisitDate', today);
    }
  }, []);

  const handleClose = () => setVisible(false);

  if (!visible || !zodiac) return null;

  const hint = DAILY_HINTS[zodiac];

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))',
        borderBottom: '1px solid rgba(212,175,55,0.2)',
      }}
      className="relative z-20"
    >
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-2xl flex-shrink-0">{hint.emoji}</span>
          <div className="min-w-0">
            <p className="text-xs text-[#d4af37] font-semibold tracking-wide">
              Today&apos;s Insight for the <span style={{ color: hint.color }}>{zodiac}</span>
            </p>
            <p className="text-xs text-[#c4b998] leading-relaxed mt-0.5">
              {hint.text}
            </p>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="flex-shrink-0 text-[#6b5f4a] hover:text-[#e8dcc8] transition-colors text-sm cursor-pointer"
          aria-label="Close daily hint"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
