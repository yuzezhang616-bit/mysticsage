'use client';

import { BaziResult, FourPillars, Element } from '@/lib/bazi/types';
import { STEM_NAMES, BRANCH_NAMES, STEM_ELEMENT } from '@/lib/bazi/constants';
import { STEM_EN, BRANCH_EN } from '@/lib/bazi/english';

interface BaziChartProps {
  result: BaziResult;
  lang: 'en' | 'zh';
}

const ELEMENT_COLORS: Record<string, string> = {
  metal: '#10B981',
  wood: '#22C55E',
  water: '#3B82F6',
  fire: '#EF4444',
  earth: '#F59E0B',
};

const ELEMENT_EMOJIS: Record<string, string> = {
  metal: '🪙', wood: '🌳', water: '💧', fire: '🔥', earth: '⛰️',
};

export default function BaziChart({ result, lang }: BaziChartProps) {
  const isEn = lang === 'en';
  const { pillars } = result;

  const stemName = (s: any) => isEn ? STEM_EN[s as keyof typeof STEM_EN] || STEM_NAMES[s as keyof typeof STEM_NAMES] : STEM_NAMES[s as keyof typeof STEM_NAMES];
  const branchName = (b: any) => isEn ? BRANCH_EN[b as keyof typeof BRANCH_EN] || BRANCH_NAMES[b as keyof typeof BRANCH_NAMES] : BRANCH_NAMES[b as keyof typeof BRANCH_NAMES];
  const elementName = (e: string) => isEn ? e.charAt(0).toUpperCase() + e.slice(1) : ({ metal: '金', wood: '木', water: '水', fire: '火', earth: '土' })[e] || e;

  const pillars_data = [
    { label: isEn ? 'Year' : '年', pillar: pillars.year },
    { label: isEn ? 'Month' : '月', pillar: pillars.month },
    { label: isEn ? 'Day' : '日', pillar: pillars.day },
    { label: isEn ? 'Hour' : '时', pillar: pillars.hour },
  ];

  return (
    <div className="space-y-8">
      {/* Four Pillars Display */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">{isEn ? 'Your Four Pillars' : '四柱八字'}</h3>
        <div className="grid grid-cols-4 gap-3">
          {pillars_data.map(({ label, pillar }) => {
            const el = STEM_ELEMENT[pillar.stem] as string;
            return (
              <div key={label} className="bg-[#161b22] border border-[#30363d] rounded-xl p-4 text-center">
                <div className="text-xs text-gray-500 mb-2">{label}</div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-2xl font-bold text-white">{stemName(pillar.stem)}</span>
                  <span className="text-2xl text-gray-300">{branchName(pillar.branch)}</span>
                  <div className="flex items-center gap-1 mt-2">
                    <span style={{ color: ELEMENT_COLORS[el] || '#fff' }} className="text-sm">
                      {ELEMENT_EMOJIS[el]} {elementName(el)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Day Master */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-5 text-center">
        <div className="text-sm text-gray-400 mb-1">{isEn ? 'Your Day Master' : '你的日主'}</div>
        <div className="text-3xl font-bold text-white mb-1">
          {stemName(pillars.day.stem)}{branchName(pillars.day.branch)}
        </div>
        <div className="text-purple-400 font-medium">
          {stemName(pillars.day.stem)} — {isEn ? 'The core of your being' : '你的核心本质'}
        </div>
      </div>

      {/* Elemental Balance Chart */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">{isEn ? 'Elemental Balance' : '五行平衡'}</h3>
        <div className="space-y-3">
          {Object.entries(result.elementScores).map(([key, score]) => (
            <div key={key} className="flex items-center gap-3">
              <div className="w-16 text-sm text-gray-400 flex items-center gap-1">
                <span>{ELEMENT_EMOJIS[key]}</span>
                <span>{elementName(key)}</span>
              </div>
              <div className="flex-1 bg-[#161b22] rounded-full h-3 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${score}%`,
                    backgroundColor: ELEMENT_COLORS[key] || '#58a6ff',
                    opacity: 0.8,
                  }}
                />
              </div>
              <div className="w-10 text-right text-sm text-gray-400">{score}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Favorable/Unfavorable Elements */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4">
          <div className="text-green-400 font-medium text-sm mb-2">
            {isEn ? '🌈 Favorable (Xi Yong)' : '🌈 喜用神'}
          </div>
          <div className="flex flex-wrap gap-2">
            {result.favorableElements.map(e => (
              <span key={e} className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm border border-green-500/20">
                {ELEMENT_EMOJIS[e]} {elementName(e)}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
          <div className="text-red-400 font-medium text-sm mb-2">
            {isEn ? '⚠️ Unfavorable (Ji Shen)' : '⚠️ 忌神'}
          </div>
          <div className="flex flex-wrap gap-2">
            {result.unfavorableElements.map(e => (
              <span key={e} className="px-3 py-1 bg-red-500/10 text-red-400 rounded-full text-sm border border-red-500/20">
                {ELEMENT_EMOJIS[e]} {elementName(e)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Strength indicator */}
      <div className={`rounded-xl p-4 text-center ${result.isStrong ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-blue-500/10 border border-blue-500/20'}`}>
        <div className={`text-sm font-medium ${result.isStrong ? 'text-amber-400' : 'text-blue-400'}`}>
          {result.isStrong
            ? (isEn ? '💪 Strong Day Master — You have abundant energy to overcome challenges' : '💪 身强 — 能量充沛，敢于面对挑战')
            : (isEn ? '🌱 Nurturing Day Master — You thrive with support and balance' : '🌱 身弱 — 需要滋养和平衡，懂得借力而行')
          }
        </div>
      </div>
    </div>
  );
}
