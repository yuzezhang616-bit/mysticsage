'use client';

import type { BaziResult } from '@/lib/bazi/types';
import type { AiReading } from '@/lib/ai/interpretation';
import { getLuckyInfo, getHealthTip, getSummary } from '@/lib/reading/seed-readings';

interface ReadingPanelProps {
  reading: AiReading;
  result: BaziResult;
  fromCache: boolean;
}

export default function ReadingPanel({ reading, result, fromCache }: ReadingPanelProps) {
  const content = reading.en;
  const lucky = getLuckyInfo(result, 'en');
  const healthTip = getHealthTip(result, 'en');
  const summary = getSummary(result, 'en');

  const sections = [
    { key: 'personality' as const, icon: '🔮', title: 'Your Personality' },
    { key: 'career' as const, icon: '💼', title: 'Career & Path' },
    { key: 'wealth' as const, icon: '💰', title: 'Wealth & Fortune' },
    { key: 'relationships' as const, icon: '💕', title: 'Relationships & Love' },
    { key: 'advice' as const, icon: '🌟', title: 'Life Advice' },
  ];

  return (
    <div className="space-y-6">
      {fromCache && (
        <div className="text-center text-sm text-[#f0d68a] animate-pulse">
          ✨ Retrieved from the ancient wisdom archive
        </div>
      )}

      <div className="space-y-4">
        {sections.map(({ key, icon, title }) => {
          const text = content[key];
          if (!text) return null;
          return (
            <div key={key} className="glass-card rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{icon}</span>
                <h3 className="text-lg font-semibold gold-text">{title}</h3>
              </div>
              <p className="text-[#e8dcc8] leading-relaxed whitespace-pre-line opacity-85 text-sm">{text}</p>
            </div>
          );
        })}
      </div>

      {healthTip && (
        <div className="stagger-6 bg-[#0f1117] border border-[rgba(212,175,55,0.08)] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🏥</span>
            <h3 className="text-lg font-semibold gold-text">Health & Wellbeing</h3>
          </div>
          <p className="text-[#e8dcc8] leading-relaxed whitespace-pre-line opacity-85 text-sm">{healthTip}</p>
        </div>
      )}

      {summary.fortune && (
        <div className="stagger-7 bg-gradient-to-r from-[rgba(212,175,55,0.08)] to-[rgba(168,135,46,0.05)] border border-[rgba(212,175,55,0.15)] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">📜</span>
            <h3 className="text-lg font-semibold gold-text">Your Destiny</h3>
          </div>
          <div className="space-y-3">
            <p className="text-[#e8dcc8] leading-relaxed opacity-85 text-sm italic">&ldquo;{summary.fortune}&rdquo;</p>
            {summary.advice && (
              <div className="bg-[#07080a]/60 rounded-lg p-3 border border-[rgba(212,175,55,0.06)]">
                <p className="text-xs text-[#9b8e7a] font-medium mb-2">💡 Quick Tip</p>
                <p className="text-[#f0d68a] text-sm">{summary.advice}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="stagger-8 bg-gradient-to-r from-[#d4af37]/8 to-[#a8872e]/5 border border-[#d4af37]/20 rounded-xl p-5 ancestral-glow">
        <h3 className="text-lg font-semibold gold-text mb-4 flex items-center gap-2">
          <span>🍀</span>
          Your Lucky Information
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '🎨', label: 'Colors', items: lucky.colors },
            { icon: '🔢', label: 'Numbers', items: lucky.numbers },
            { icon: '🧭', label: 'Directions', items: lucky.directions },
            { icon: '🌸', label: 'Season', items: lucky.seasons },
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

      <div className="glass-card rounded-xl p-5">
        <h3 className="text-sm font-semibold gold-text mb-4 text-center">📤 Share & Export Your Reading</h3>
        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={() => {
            const url = window.location.href;
            if (navigator.share) {
              navigator.share({ title: 'MysticSage', text: 'Check out my Bazi reading!', url }).catch(() => {});
            }
          }} className="px-4 py-2 bg-[#d4af37]/10 hover:bg-[#d4af37]/20 border border-[#d4af37]/30 rounded-lg text-xs text-[#d4af37] transition-all">
            📱 Share
          </button>
          <button onClick={() => {
            const text = 'I just got my free Bazi reading on MysticSage! Discover yours too:';
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`, '_blank', 'width=600,height=400');
          }} className="px-4 py-2 bg-[#1a1d2a] hover:bg-[#2a2d3a] border border-[#333] rounded-lg text-xs text-[#e8dcc8] transition-all">
            𝕏 Twitter
          </button>
          <button onClick={() => {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank', 'width=600,height=400');
          }} className="px-4 py-2 bg-[#1a1d2a] hover:bg-[#2a2d3a] border border-[#333] rounded-lg text-xs text-[#e8dcc8] transition-all">
            f Facebook
          </button>
          <button onClick={() => {
            const text = `Check out my Bazi reading on MysticSage! ${window.location.href}`;
            window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'width=600,height=400');
          }} className="px-4 py-2 bg-[#1a1d2a] hover:bg-[#2a2d3a] border border-[#333] rounded-lg text-xs text-[#e8dcc8] transition-all">
            💬 WhatsApp
          </button>
          <button onClick={() => {
            navigator.clipboard.writeText(window.location.href).then(() => {
              const btn = document.activeElement as HTMLElement;
              if (btn) {
                const orig = btn.textContent;
                btn.textContent = '✅ Copied!';
                setTimeout(() => { btn.textContent = orig; }, 2000);
              }
            });
          }} className="px-4 py-2 bg-[#1a1d2a] hover:bg-[#2a2d3a] border border-[#333] rounded-lg text-xs text-[#e8dcc8] transition-all">
            📋 Copy Link
          </button>
          <button onClick={() => window.print()} className="px-4 py-2 bg-[#d4af37]/10 hover:bg-[#d4af37]/20 border border-[#d4af37]/30 rounded-lg text-xs text-[#d4af37] transition-all">
            📄 Save as PDF
          </button>
        </div>
        <p className="text-[10px] text-[#3a3528] text-center mt-3">Share your destiny with friends ✨</p>
      </div>

      <div className="text-center pt-2">
        <p className="text-xs text-[#3a3528]">
          ✦ MysticSage — Ancient wisdom for the modern soul
        </p>
      </div>
    </div>
  );
}
