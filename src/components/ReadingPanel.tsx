'use client';

import type { BaziResult } from '@/lib/bazi/types';
import type { AiReading } from '@/lib/ai/interpretation';
import { getLuckyInfo } from '@/lib/reading/seed-readings';

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

  const sections = [
    { key: 'personality' as const, icon: '🔮', en: 'Your Personality', zh: '性格分析' },
    { key: 'career' as const, icon: '💼', en: 'Career & Path', zh: '事业与发展' },
    { key: 'wealth' as const, icon: '💰', en: 'Wealth & Fortune', zh: '财运' },
    { key: 'relationships' as const, icon: '💕', en: 'Relationships & Love', zh: '感情与人际' },
    { key: 'advice' as const, icon: '🌟', en: 'Life Advice', zh: '人生建议' },
  ];

  return (
    <div className="space-y-6">
      {/* Cache notice */}
      {fromCache && (
        <div className="text-center text-sm text-purple-400 animate-pulse">
          {isEn ? '✨ Retrieved from the ancient wisdom archive' : '✨ 来自古老智慧宝库'}
        </div>
      )}

      {/* Reading Sections */}
      <div className="space-y-4">
        {sections.map(({ key, icon, en, zh }) => {
          const text = content[key];
          if (!text) return null;
          return (
            <div key={key} className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{icon}</span>
                <h3 className="text-lg font-semibold text-white">{isEn ? en : zh}</h3>
              </div>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">{text}</p>
            </div>
          );
        })}
      </div>

      {/* Lucky Info */}
      <div className="bg-gradient-to-r from-amber-500/5 to-purple-500/5 border border-amber-500/20 rounded-xl p-5">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
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
            <div key={i} className="bg-[#0d1117]/50 rounded-lg p-3 text-center">
              <div className="text-xl mb-1">{cat.icon}</div>
              <div className="text-xs text-gray-500 mb-2">{cat.label}</div>
              <div className="flex flex-wrap justify-center gap-1">
                {cat.items.map((item: string, j: number) => (
                  <span key={j} className="px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded text-xs border border-amber-500/20">
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
        <p className="text-xs text-gray-600">
          {isEn
            ? '✨ MysticSage — Ancient wisdom for the modern soul'
            : '✨ MysticSage — 为现代灵魂准备的古老智慧'}
        </p>
      </div>
    </div>
  );
}
