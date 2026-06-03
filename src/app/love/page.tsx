'use client';

import { useState, useMemo } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const ELEMENTS_DISPLAY: Record<string, { emoji: string; color: string }> = {
  Wood: { emoji: '🌲', color: '#22c55e' },
  Fire: { emoji: '🔥', color: '#ef4444' },
  Earth: { emoji: '⛰️', color: '#d97706' },
  Metal: { emoji: '⚔️', color: '#a3a3a3' },
  Water: { emoji: '🌊', color: '#3b82f6' },
};

const STEM_ELEMENT = ['Wood','Wood','Fire','Fire','Earth','Earth','Metal','Metal','Water','Water']; // 甲乙丙丁戊己庚辛壬癸
const STEM_NAMES_EN = ['Jia (Wood)', 'Yi (Wood)', 'Bing (Fire)', 'Ding (Fire)', 'Wu (Earth)', 'Ji (Earth)', 'Geng (Metal)', 'Xin (Metal)', 'Ren (Water)', 'Gui (Water)'];
const BRANCH_ZODIAC = ['Rat','Ox','Tiger','Rabbit','Dragon','Snake','Horse','Goat','Monkey','Rooster','Dog','Pig'];
const BRANCH_ELEMENT = ['Water','Earth','Wood','Wood','Earth','Fire','Fire','Earth','Metal','Metal','Earth','Water'];

function getYearStemIndex(year: number) { return (year - 4) % 10; }
function getYearBranchIndex(year: number) { return (year - 4) % 12; }

const COMPAT_MATRIX: Record<string, Record<string, { score: number; note: string; }>> = {
  Wood: {
    Wood: { score: 70, note: 'Two Wood — strong creative synergy but can compete for the same resources.' },
    Fire: { score: 85, note: 'Wood feeds Fire — natural nurturing dynamic. Passion and creativity flow.' },
    Earth: { score: 50, note: 'Wood drains Earth — creative tension that can be productive with awareness.' },
    Metal: { score: 30, note: 'Metal chops Wood — fundamental friction that requires patience to navigate.' },
    Water: { score: 80, note: 'Water nourishes Wood — deep emotional understanding and growth.' },
  },
  Fire: {
    Wood: { score: 80, note: 'Wood fuels Fire — supportive and energizing. Ideas spark action.' },
    Fire: { score: 65, note: 'Two Fire — brilliant but intense. Shared passion with risk of burnout.' },
    Earth: { score: 75, note: 'Fire creates Earth — warm and grounding. Practical yet inspired.' },
    Metal: { score: 35, note: 'Fire melts Metal — transformative but challenging. Growth through friction.' },
    Water: { score: 25, note: 'Water extinguishes Fire — opposing forces need strong boundaries.' },
  },
  Earth: {
    Wood: { score: 45, note: 'Wood drains Earth — different paces that need conscious adaptation.' },
    Fire: { score: 70, note: 'Fire creates Earth — warm, stable, and mutually nurturing.' },
    Earth: { score: 60, note: 'Two Earth — solid foundation but can get stuck in routine.' },
    Metal: { score: 80, note: 'Earth produces Metal — loyal, dependable, building something lasting.' },
    Water: { score: 55, note: 'Earth dams Water — grounding influence with some tension.' },
  },
  Metal: {
    Wood: { score: 30, note: 'Metal chops Wood — direct and challenging. Needs soft skills.' },
    Fire: { score: 40, note: 'Fire melts Metal — transformative with potential for brilliance.' },
    Earth: { score: 85, note: 'Earth produces Metal — deeply supportive. Solid as a rock.' },
    Metal: { score: 65, note: 'Two Metal — strong and resilient but can be rigid.' },
    Water: { score: 70, note: 'Metal generates Water — thoughtful and deep. Intellectual bond.' },
  },
  Water: {
    Wood: { score: 75, note: 'Water nourishes Wood — intuitive and growth-oriented partnership.' },
    Fire: { score: 20, note: 'Water extinguishes Fire — fundamental polarity requiring respect.' },
    Earth: { score: 50, note: 'Earth dams Water — stabilizing yet sometimes limiting.' },
    Metal: { score: 70, note: 'Metal generates Water — deep, reflective, emotionally rich.' },
    Water: { score: 55, note: 'Two Water — deep emotional connection but risk of stagnation.' },
  },
};

interface Person {
  year: string; month: string; day: string; hour: string; gender: 'male' | 'female';
}

export default function LoveMatchPage() {
  const [p1, setP1] = useState<Person>({ year:'', month:'', day:'', hour:'', gender:'male' });
  const [p2, setP2] = useState<Person>({ year:'', month:'', day:'', hour:'', gender:'female' });
  const [submitted, setSubmitted] = useState(false);

  const result = useMemo(() => {
    if (!submitted) return null;
    const y1 = parseInt(p1.year), y2 = parseInt(p2.year);
    const m1 = parseInt(p1.month), m2 = parseInt(p2.month);
    if (!y1 || !y2 || !m1 || !m2) return null;

    const s1 = getYearStemIndex(y1);
    const s2 = getYearStemIndex(y2);
    const b1 = getYearBranchIndex(y1);
    const b2 = getYearBranchIndex(y2);

    const el1 = STEM_ELEMENT[s1];
    const el2 = STEM_ELEMENT[s2];

    const match = COMPAT_MATRIX[el1]?.[el2] || { score: 50, note: 'Neutral compatibility with room to grow.' };

    // Element info
    const e1 = ELEMENTS_DISPLAY[el1];
    const e2 = ELEMENTS_DISPLAY[el2];

    const z1 = BRANCH_ZODIAC[b1];
    const z2 = BRANCH_ZODIAC[b2];

    // Communication score based on element relationship
    const generateNotes = (s: number): { comm: string; values: string; growth: string } => {
      if (s >= 70) return {
        comm: 'Communication flows naturally. You intuitively understand each other\'s perspectives and can resolve disagreements with ease.',
        values: 'You share core values and life priorities. Your approaches to money, family, and goals align harmoniously.',
        growth: 'This relationship naturally encourages personal growth. You inspire each other to become the best versions of yourselves.',
      };
      if (s >= 45) return {
        comm: 'Communication requires conscious effort. Your different styles can complement each other when you listen actively and speak with patience.',
        values: 'Your values overlap but differ in important ways. These differences can create balance if respected rather than resisted.',
        growth: 'Growth comes from navigating your differences. Each challenge is an opportunity to expand your understanding.',
      };
      return {
        comm: 'Communication takes work. Your natural styles differ significantly — establish clear communication practices early.',
        values: 'Your core values may diverge on key issues. Open, non-judgmental discussion about priorities is essential.',
        growth: 'Growth requires conscious effort. The rewards of bridging your differences can be profound and lasting.',
      };
    };

    const notes = generateNotes(match.score);

    return {
      score: match.score,
      el1, el2,
      e1, e2,
      s1: STEM_NAMES_EN[s1], s2: STEM_NAMES_EN[s2],
      z1, z2,
      note: match.note,
      ...notes,
    };
  }, [submitted, p1, p2]);

  return (
    <>
      <div className="video-bg">
        <video autoPlay muted loop playsInline className="bg-video"><source src="/bg.mp4" type="video/mp4" /></video>
        <div className="video-overlay" />
      </div>
      <main className="min-h-screen relative z-10">
        <NavBar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold gold-text text-center mb-2">💕 Love Match Analysis</h1>
          <p className="text-[#9b8e7a] text-center text-sm mb-8 max-w-lg mx-auto">
            Compare two birth charts to discover your elemental compatibility and relationship dynamics
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              { label: '👤 First Person', data: p1, set: setP1 },
              { label: '👤 Second Person', data: p2, set: setP2 },
            ].map((person, idx) => (
              <div key={idx} className="bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-xl border border-white/[0.10] rounded-xl shadow-lg shadow-black/30 p-5">
                <h3 className="text-sm font-semibold gold-text mb-4 text-center">{person.label}</h3>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {(['year','month','day','hour'] as const).map(f => (
                    <div key={f}>
                      <label className="text-xs text-[#9b8e7a]">{f.charAt(0).toUpperCase()+f.slice(1)}</label>
                      <input type="number" placeholder={f==='year'?'1990':f==='hour'?'12':'6'}
                        value={person.data[f]}
                        onChange={e => person.set({...person.data, [f]: e.target.value})}
                        className="w-full bg-[#0f1117] border border-[#1a1d2a] rounded-lg px-2 py-2 text-[#e8dcc8] text-xs focus:border-[#d4af37]/40 outline-none"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  {(['male','female'] as const).map(g => (
                    <button key={g} onClick={() => person.set({...person.data, gender: g})}
                      className={`flex-1 py-2 rounded-lg border text-xs font-medium transition-all ${
                        person.data.gender === g
                          ? 'border-[#d4af37] bg-[#d4af37]/10 text-[#f0d68a]'
                          : 'border-[#1a1d2a] text-[#6b5f4a]'
                      }`}>
                      {g === 'male' ? '♂ Male' : '♀ Female'}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mb-8">
            <button onClick={() => setSubmitted(true)}
              className="gold-glow bg-gradient-to-r from-[#a8872e] via-[#d4af37] to-[#a8872e] text-[#07080a] px-8 py-3 rounded-xl font-semibold cursor-pointer hover:brightness-110 transition-all">
              💞 Check Compatibility
            </button>
          </div>

          {result && (
            <div className="space-y-4 animate-in fade-in duration-500">
              {/* Elemental Display */}
              <div className="flex items-center justify-center gap-6 mb-4">
                <div className="text-center">
                  <div className="text-3xl mb-1">{result.e1.emoji}</div>
                  <div className="text-[10px] text-[#9b8e7a]">{result.s1}</div>
                  <div className="text-xs text-[#e8dcc8]" style={{color: result.e1.color}}>{result.el1}</div>
                  <div className="text-[10px] text-[#6b5f4a]">{result.z1} 🐭</div>
                </div>
                <div className="text-2xl gold-text">❤️</div>
                <div className="text-center">
                  <div className="text-3xl mb-1">{result.e2.emoji}</div>
                  <div className="text-[10px] text-[#9b8e7a]">{result.s2}</div>
                  <div className="text-xs text-[#e8dcc8]" style={{color: result.e2.color}}>{result.el2}</div>
                  <div className="text-[10px] text-[#6b5f4a]">{result.z2}</div>
                </div>
              </div>

              {/* Score */}
              <div className="bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-xl border border-white/[0.10] rounded-xl shadow-lg shadow-black/30 p-6 text-center">
                <p className="text-xs text-[#9b8e7a] mb-2">Compatibility Score</p>
                <div className="text-5xl font-bold gold-text mb-2">
                  {result.score}<span className="text-xl">%</span>
                </div>
                <div className="w-full bg-[#1a1d2a] rounded-full h-2 overflow-hidden max-w-xs mx-auto mb-2">
                  <div className={`h-full rounded-full transition-all duration-1000 ${
                    result.score >= 70 ? 'bg-green-500' : result.score >= 45 ? 'bg-yellow-500' : 'bg-red-500'
                  }`} style={{width:`${result.score}%`}}></div>
                </div>
                <p className="text-[10px] text-[#6b5f4a]">{result.note}</p>
              </div>

              {/* 3-dimension analysis */}
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  {title:'💬 Communication', text: result.comm},
                  {title:'💎 Values', text: result.values},
                  {title:'🌱 Growth', text: result.growth},
                ].map((item, i) => (
                  <div key={i}
                    className="bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-xl border border-white/[0.10] rounded-xl shadow-lg shadow-black/30 p-4">
                    <h4 className="text-xs font-semibold gold-text mb-2">{item.title}</h4>
                    <p className="text-[#c4b998] text-xs leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Knowledge section */}
          <div className="mt-12 border-t border-[rgba(212,175,55,0.06)] pt-8">
            <h2 className="text-lg font-semibold gold-text text-center mb-6">About Bazi Compatibility</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {t:'The Five Elements',d:'In Chinese metaphysics, everything is composed of five elements: Wood, Fire, Earth, Metal, and Water. Elemental compatibility is the foundation of any relationship analysis.'},
                {t:'Yin & Yang Balance',d:'Male and female energies within each person create a unique dynamic. The ideal partnership balances these energies between the two individuals.'},
                {t:'Heavenly Stems',d:'Each birth year is assigned a Heavenly Stem that reveals one\'s elemental nature. Compatibility is calculated by how these elements interact.'},
                {t:'Beyond Compatibility',d:'While elemental compatibility is important, true harmony depends on mutual respect, communication, and shared values. Use this as a guide, not a verdict.'},
              ].map((item,i) => (
                <div key={i} className="bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-lg border border-white/[0.10] rounded-xl p-4">
                  <h4 className="text-xs font-semibold gold-text mb-2">{item.t}</h4>
                  <p className="text-[#9b8e7a] text-xs leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
