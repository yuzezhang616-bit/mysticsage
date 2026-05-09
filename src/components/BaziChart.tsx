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
        <h3 className="text-lg font-semibold gold-text mb-4">{isEn ? 'Your Four Pillars' : '四柱八字'}</h3>
        <div className="grid grid-cols-4 gap-3">
          {pillars_data.map(({ label, pillar }) => {
            const el = STEM_ELEMENT[pillar.stem] as string;
            return (
              <div key={label} className="bg-[#0f1117] border border-[rgba(212,175,55,0.12)] rounded-xl p-4 text-center mystical-border">
                <div className="text-xs text-[#6b5f4a] mb-2">{label}</div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-2xl font-bold text-[#f0d68a]">{stemName(pillar.stem)}</span>
                  <span className="text-2xl text-[#e8dcc8]">{branchName(pillar.branch)}</span>
                  <div className="flex items-center gap-1 mt-2">
                    <span style={{ color: ELEMENT_COLORS[el] || '#d4af37' }} className="text-sm">
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
      <div className="bg-gradient-to-r from-[#d4af37]/8 via-[#d4af37]/5 to-transparent border border-[#d4af37]/20 rounded-xl p-5 text-center ancestral-glow">
        <div className="text-sm text-[#9b8e7a] mb-1">{isEn ? 'Your Day Master' : '你的日主'}</div>
        <div className="text-3xl font-bold gold-text mb-1">
          {stemName(pillars.day.stem)}{branchName(pillars.day.branch)}
        </div>
        <div className="text-[#f0d68a] font-medium text-sm">
          {stemName(pillars.day.stem)} — {isEn ? 'The core of your being' : '你的核心本质'}
        </div>
      </div>

      {/* Elemental Balance Chart */}
      <div>
        <h3 className="text-lg font-semibold gold-text mb-4">{isEn ? 'Elemental Balance' : '五行平衡'}</h3>
        <div className="space-y-3">
          {Object.entries(result.elementScores).map(([key, score]) => (
            <div key={key} className="flex items-center gap-3">
              <div className="w-16 text-sm text-[#9b8e7a] flex items-center gap-1">
                <span>{ELEMENT_EMOJIS[key]}</span>
                <span>{elementName(key)}</span>
              </div>
              <div className="flex-1 bg-[#0f1117] rounded-full h-3 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${score}%`,
                    backgroundColor: ELEMENT_COLORS[key] || '#d4af37',
                    opacity: 0.7,
                  }}
                />
              </div>
              <div className="w-10 text-right text-sm text-[#6b5f4a]">{score}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Favorable/Unfavorable Elements */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-xl p-4">
          <div className="text-[#f0d68a] font-medium text-sm mb-2">
            {isEn ? '🌈 Favorable (Xi Yong)' : '🌈 喜用神'}
          </div>
          <div className="flex flex-wrap gap-2">
            {result.favorableElements.map(e => (
              <span key={e} className="px-3 py-1 bg-[#d4af37]/10 text-[#f0d68a] rounded-full text-sm border border-[#d4af37]/20">
                {ELEMENT_EMOJIS[e]} {elementName(e)}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-[#6b3a3a]/20 border border-[#6b3a3a]/30 rounded-xl p-4">
          <div className="text-[#c94a4a] font-medium text-sm mb-2">
            {isEn ? '⚠️ Unfavorable (Ji Shen)' : '⚠️ 忌神'}
          </div>
          <div className="flex flex-wrap gap-2">
            {result.unfavorableElements.map(e => (
              <span key={e} className="px-3 py-1 bg-[#6b3a3a]/10 text-[#c94a4a] rounded-full text-sm border border-[#6b3a3a]/30">
                {ELEMENT_EMOJIS[e]} {elementName(e)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Strength indicator */}
      <div className={`rounded-xl p-4 text-center ${result.isStrong ? 'bg-[#d4af37]/10 border border-[#d4af37]/20' : 'bg-[#5a6b9a]/20 border border-[#5a6b9a]/30'}`}>
        <div className={`text-sm font-medium ${result.isStrong ? 'text-[#f0d68a]' : 'text-[#8a9bd4]'}`}>
          {result.isStrong
            ? (isEn ? '💪 Strong Day Master — You have abundant energy to overcome challenges' : '💪 身强 — 能量充沛，敢于面对挑战')
            : (isEn ? '🌱 Nurturing Day Master — You thrive with support and balance' : '🌱 身弱 — 需要滋养和平衡，懂得借力而行')
          }
        </div>
      </div>
    </div>
  );
}
