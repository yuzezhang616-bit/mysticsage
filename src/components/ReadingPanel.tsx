'use client';

import type { BaziResult } from '@/lib/bazi/types';
import type { AiReading } from '@/lib/ai/interpretation';
import { getLuckyInfo, getHealthTip, getSummary } from '@/lib/reading/seed-readings';

interface ReadingPanelProps {
  reading: AiReading;
  result: BaziResult;
  lang: 'en' | 'zh';
  fromCache: boolean;
}

export default function ReadingPanel({ reading, result, lang, fromCache }: ReadingPanelProps) {
  const isEn = lang === 'en';
  const content = isEn ? reading.en : reading.zh;
  const lucky = getLuckyInfo(result, lang);
  const healthTip = getHealthTip(result, lang);
  const summary = getSummary(result, lang);

  const sections = [
    { key: 'personality' as const, icon: '🔮', en: 'Your Personality', zh: '性格分析' },
    { key: 'career' as const, icon: '💼', en: 'Career & Path', zh: '事业与发展' },
    { key: 'wealth' as const, icon: '💰', en: 'Wealth & Fortune', zh: '财运趋势' },
    { key: 'relationships' as const, icon: '💕', en: 'Relationships & Love', zh: '感情与人际' },
    { key: 'advice' as const, icon: '🌟', en: 'Life Advice', zh: '人生建议' },
  ];

  return (
    <div className="space-y-6">
      {/* Cache notice */}
      {fromCache && (
        <div className="text-center text-sm text-[#f0d68a] animate-pulse">
          {isEn ? '✨ Retrieved from the ancient wisdom archive' : '✨ 来自古老智慧宝库'}
        </div>
      )}

      {/* Reading Sections */}
      <div className="space-y-4">
        {sections.map(({ key, icon, en, zh }) => {
          const text = content[key];
          if (!text) return null;
          return (
            <div key={key} className="bg-[#0f1117] mystical-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{icon}</span>
                <h3 className="text-lg font-semibold gold-text">{isEn ? en : zh}</h3>
              </div>
              <p className="text-[#e8dcc8] leading-relaxed whitespace-pre-line opacity-85 text-sm">{text}</p>
            </div>
          );
        })}
      </div>

      {/* 健康提示 */}
      {healthTip && (
        <div className="bg-[#0f1117] border border-[rgba(212,175,55,0.08)] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🏥</span>
            <h3 className="text-lg font-semibold gold-text">{isEn ? 'Health & Wellbeing' : '健康提示'}</h3>
          </div>
          <p className="text-[#e8dcc8] leading-relaxed whitespace-pre-line opacity-85 text-sm">{healthTip}</p>
        </div>
      )}

      {/* 总结 */}
      {summary.fortune && (
        <div className="bg-gradient-to-r from-[rgba(212,175,55,0.08)] to-[rgba(168,135,46,0.05)] border border-[rgba(212,175,55,0.15)] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">📜</span>
            <h3 className="text-lg font-semibold gold-text">{isEn ? 'Your Destiny' : '命运寄语'}</h3>
          </div>
          <div className="space-y-3">
            <p className="text-[#e8dcc8] leading-relaxed opacity-85 text-sm italic">&ldquo;{summary.fortune}&rdquo;</p>
            {summary.advice && (
              <div className="bg-[#07080a]/60 rounded-lg p-3 border border-[rgba(212,175,55,0.06)]">
                <p className="text-xs text-[#9b8e7a] font-medium mb-2">{isEn ? '💡 Quick Tip' : '💡 开运建议'}</p>
                <p className="text-[#f0d68a] text-sm">{summary.advice}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Lucky Info */}
      <div className="bg-gradient-to-r from-[#d4af37]/8 to-[#a8872e]/5 border border-[#d4af37]/20 rounded-xl p-5 ancestral-glow">
        <h3 className="text-lg font-semibold gold-text mb-4 flex items-center gap-2">
          <span>🍀</span>
          {isEn ? 'Your Lucky Information' : '你的幸运信息'}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '🎨', label: isEn ? 'Colors' : '幸运色', items: lucky.colors },
            { icon: '🔢', label: isEn ? 'Numbers' : '幸运数字', items: lucky.numbers },
            { icon: '🧭', label: isEn ? 'Directions' : '吉利方位', items: lucky.directions },
            { icon: '🌸', label: isEn ? 'Season' : '旺运季节', items: lucky.seasons },
          ].map((cat, i) => (
            <div key={i} className="bg-[#07080a]/60 rounded-lg p-3 text-center border border-[#1a1d2a]">
              <div className="text-xl mb-1">{cat.icon}</div>
              <div className="text-xs text-[#6b5f4a] mb-2">{cat.label}</div>
              <div className="flex flex-wrap justify-center gap-1">
                {cat.items.map((item: string, j: number) => (
                  <span key={j} className="px-2 py-0.5 bg-[#d4af37]/10 text-[#f0d68a] rounded text-xs border border-[#d4af37]/20">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Share footer */}
      <div className="text-center pt-2">
        <p className="text-xs text-[#3a3528]">
          {isEn
            ? '✦ MysticSage — Ancient wisdom for the modern soul'
            : '✦ MysticSage — 为现代灵魂准备的古老智慧'}
        </p>
      </div>
    </div>
  );
}
