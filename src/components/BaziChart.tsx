'use client';

import { BaziResult, Element } from '@/lib/bazi/types';

interface BaziChartProps {
  result: BaziResult;
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

export default function BaziChart({ result }: BaziChartProps) {
  const { pillars } = result;

  const elementName = (e: string) => e.charAt(0).toUpperCase() + e.slice(1);

  const pillars_data = [
    { label: 'Year', pillar: pillars.year },
    { label: 'Month', pillar: pillars.month },
    { label: 'Day', pillar: pillars.day },
    { label: 'Hour', pillar: pillars.hour },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="grid grid-cols-4 gap-3">
        {pillars_data.map((p, i) => (
          <div
            key={i}
            className="rounded-2xl p-5 text-center border border-[rgba(212,175,55,0.15)] bg-gradient-to-br from-[rgba(212,175,55,0.05)] to-transparent backdrop-blur"
          >
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#6b5f4a] mb-3">
              {p.label}
            </div>
            {p.pillar ? (
              <>
                <div className="text-lg font-bold text-[#e8dcc8] mb-1">{p.pillar.name}</div>
                <div className="text-[10px] text-[#9b8e7a] leading-tight">
                  {elementName(p.pillar.element)}
                </div>
                <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-[rgba(212,175,55,0.1)] text-[#d4af37]">
                  {ELEMENT_EMOJIS[p.pillar.element] || ''} {elementName(p.pillar.element)}
                </div>
              </>
            ) : (
              <div className="h-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
