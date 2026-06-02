'use client';

import { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const ELEMENT_CHARS: Record<string, { en: string; zh: string; chars: { char: string; meaning: string; element: string }[] }> = {
  wood: {
    en: 'Wood Element Names', zh: '木属性字',
    chars: [
      { char:'森', meaning:'Forest — abundance and vitality', element:'Wood' },
      { char:'林', meaning:'Grove — growth and harmony', element:'Wood' },
      { char:'桐', meaning:'Phoenix tree — elegance and nobility', element:'Wood' },
      { char:'柏', meaning:'Cypress — resilience and longevity', element:'Wood' },
      { char:'松', meaning:'Pine — strength and steadfastness', element:'Wood' },
      { char:'杉', meaning:'Cedar — uprightness and purity', element:'Wood' },
      { char:'楠', meaning:'Nan wood — precious and enduring', element:'Wood' },
      { char:'桂', meaning:'Osmanthus — fragrance and grace', element:'Wood' },
      { char:'栩', meaning:'Vivid — lively and spirited', element:'Wood' },
      { char:'楹', meaning:'Pillar — support and strength', element:'Wood' },
    ]
  },
  fire: {
    en: 'Fire Element Names', zh: '火属性字',
    chars: [
      { char:'烨', meaning:'Bright flame — radiance and brilliance', element:'Fire' },
      { char:'熠', meaning:'Sparkling — luminous and dazzling', element:'Fire' },
      { char:'煊', meaning:'Warm glow — gentle warmth', element:'Fire' },
      { char:'煜', meaning:'Shining — illuminating the path', element:'Fire' },
      { char:'旭', meaning:'Rising sun — new beginnings', element:'Fire' },
      { char:'朗', meaning:'Bright and clear — open-minded', element:'Fire' },
      { char:'晗', meaning:'Pre-dawn light — hope and promise', element:'Fire' },
      { char:'晟', meaning:'Full brightness — prosperity', element:'Fire' },
      { char:'昱', meaning:'Sunlight — warmth and vitality', element:'Fire' },
      { char:'曜', meaning:'Radiance — shining brightly', element:'Fire' },
    ]
  },
  earth: {
    en: 'Earth Element Names', zh: '土属性字',
    chars: [
      { char:'坤', meaning:'Earth — nurturing and receptive', element:'Earth' },
      { char:'垚', meaning:'Mound — solid and reliable', element:'Earth' },
      { char:'垣', meaning:'Wall — protective and strong', element:'Earth' },
      { char:'峥', meaning:'Towering — lofty aspirations', element:'Earth' },
      { char:'岚', meaning:'Mountain mist — serene beauty', element:'Earth' },
      { char:'峄', meaning:'Peak — reaching great heights', element:'Earth' },
      { char:'城', meaning:'City — grounded and solid', element:'Earth' },
      { char:'培', meaning:'Nurture — cultivation and growth', element:'Earth' },
      { char:'懿', meaning:'Virtue — moral excellence', element:'Earth' },
      { char:'安', meaning:'Peace — tranquility and stability', element:'Earth' },
    ]
  },
  metal: {
    en: 'Metal Element Names', zh: '金属性字',
    chars: [
      { char:'锦', meaning:'Brocade — splendor and refinement', element:'Metal' },
      { char:'钧', meaning:'Unit of measure — fairness and justice', element:'Metal' },
      { char:'铭', meaning:'Inscription — lasting legacy', element:'Metal' },
      { char:'锋', meaning:'Sharp edge — keen and decisive', element:'Metal' },
      { char:'锐', meaning:'Sharp — perceptive and bright', element:'Metal' },
      { char:'铮', meaning:'Clang of metal — integrity and resolve', element:'Metal' },
      { char:'锡', meaning:'Tin — precious and enduring', element:'Metal' },
      { char:'银', meaning:'Silver — value and purity', element:'Metal' },
      { char:'铠', meaning:'Armor — protection and strength', element:'Metal' },
      { char:'钊', meaning:'Encourage — inspiring others forward', element:'Metal' },
    ]
  },
  water: {
    en: 'Water Element Names', zh: '水属性字',
    chars: [
      { char:'浩', meaning:'Vast — expansive and generous', element:'Water' },
      { char:'涵', meaning:'Contain — depth and cultivation', element:'Water' },
      { char:'澜', meaning:'Great wave — dynamic energy', element:'Water' },
      { char:'泽', meaning:'Marsh — grace and beneficence', element:'Water' },
      { char:'润', meaning:'Moisten — nourishing and gentle', element:'Water' },
      { char:'源', meaning:'Source — origin and foundation', element:'Water' },
      { char:'澄', meaning:'Clear water — purity and clarity', element:'Water' },
      { char:'瀚', meaning:'Vast ocean — broad-minded', element:'Water' },
      { char:'沛', meaning:'Abundant — plentiful and thriving', element:'Water' },
      { char:'涵', meaning:'Cultivate — depth of character', element:'Water' },
    ]
  }
};

export default function NamingPage() {
  const [surname, setSurname] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [gender, setGender] = useState<'male'|'female'>('male');
  const [results, setResults] = useState<any[] | null>(null);

  const handleSubmit = () => {
    const y = parseInt(birthYear);
    if (!y || y < 1900 || y > 2100) return;

    const stemIdx = (y - 4) % 10;
    const stemMap = [4,5,0,1,2,3,4,5,6,7];
    const elIdx = stemMap[stemIdx];
    const els = ['wood','wood','fire','fire','earth','earth','metal','metal','water','water'];
    const el = els[elIdx];

    const producing: Record<string, string> = {
      wood:'water', fire:'wood', earth:'fire', metal:'earth', water:'metal'
    };
    const produced = producing[el];

    const names = ELEMENT_CHARS[produced]?.chars || [];
    const mainNames = ELEMENT_CHARS[el]?.chars || [];

    const suggestions = [
      ...names.slice(0, 5).map(c => ({
        name: surname + c.char,
        meaning: c.meaning,
        element: c.element,
        reason: `Nourishes your ${el} element`,
      })),
      ...mainNames.slice(0, 3).map(c => ({
        name: surname + c.char,
        meaning: c.meaning,
        element: c.element,
        reason: `Strengthens your ${el} element`,
      })),
    ];

    setResults(suggestions);
  };

  return (
    <>
      <div className="video-bg">
        <video autoPlay muted loop playsInline className="bg-video"><source src="/bg.mp4" type="video/mp4" /></video>
        <div className="video-overlay" />
      </div>
      <main className="min-h-screen relative z-10">
        <NavBar />
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold gold-text text-center mb-2">📛 Chinese Name Suggestion</h1>
          <p className="text-[#9b8e7a] text-center text-sm mb-8 max-w-lg mx-auto">
            Find a name that harmonizes with your destiny
          </p>

          <div className="max-w-md mx-auto bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-xl border border-white/[0.10] rounded-xl shadow-lg shadow-black/30 p-6 mb-8">
            <div className="space-y-4">
              <div>
                <label className="text-xs text-[#9b8e7a] mb-1 block">Surname (optional)</label>
                <input type="text" placeholder="e.g. Li, Wang, Zhang" value={surname} onChange={e=>setSurname(e.target.value)}
                  className="w-full bg-[#0f1117] border border-[#1a1d2a] rounded-lg px-3 py-2.5 text-[#e8dcc8] text-sm focus:border-[#d4af37]/40"/>
              </div>
              <div>
                <label className="text-xs text-[#9b8e7a] mb-1 block">Birth Year</label>
                <input type="number" placeholder="1990" value={birthYear} onChange={e=>setBirthYear(e.target.value)}
                  className="w-full bg-[#0f1117] border border-[#1a1d2a] rounded-lg px-3 py-2.5 text-[#e8dcc8] text-sm focus:border-[#d4af37]/40"/>
              </div>
              <div>
                <label className="text-xs text-[#9b8e7a] mb-1 block">Gender</label>
                <div className="flex gap-2">
                  {(['male','female'] as const).map(g => (
                    <button key={g} onClick={()=>setGender(g)}
                      className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-all ${gender===g?'border-[#d4af37] bg-[#d4af37]/10 text-[#f0d68a]':'border-[#1a1d2a] text-[#6b5f4a]'}`}>
                      {g==='male'?'♂ Male':'♀ Female'}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={handleSubmit}
                className="gold-glow w-full bg-gradient-to-r from-[#a8872e] via-[#d4af37] to-[#a8872e] text-[#07080a] py-3 rounded-xl font-semibold cursor-pointer">
                📛 Generate Names
              </button>
            </div>
          </div>

          {results && (
            <div className="space-y-3 animate-in fade-in duration-500">
              <h3 className="text-sm font-semibold gold-text text-center mb-4">Recommended Names</h3>
              {results.map((r,i) => (
                <div key={i} className="bg-[#0f1117]/90 border border-[rgba(212,175,55,0.08)] rounded-xl p-4 flex items-center gap-4">
                  <div className="text-2xl gold-text font-bold w-14 text-center">{r.name.slice(-1)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#e8dcc8]">{r.name}</p>
                    <p className="text-xs text-[#9b8e7a]">{r.meaning}</p>
                    <p className="text-xs text-[#6b5f4a] mt-1">{r.reason}</p>
                  </div>
                  <div className="text-[10px] px-2 py-1 bg-[rgba(212,175,55,0.1)] text-[#f0d68a] rounded border border-[rgba(212,175,55,0.2)]">{r.element}</div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 border-t border-[rgba(212,175,55,0.06)] pt-8">
            <h2 className="text-lg font-semibold gold-text text-center mb-6">The Art of Chinese Naming</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { en:{t:'Five Elements Balance',d:'A well-chosen name considers the Five Elements of one\'s birth chart, selecting characters that supplement any elemental deficiencies.'}, zh:{t:'五行补益',d:'好的名字要考虑八字五行的旺衰，选择补益所缺五行的汉字。'} },
                { en:{t:'Meaning and Symbolism',d:'Every Chinese character carries deep meaning. A name should reflect positive virtues, natural beauty, or noble aspirations.'}, zh:{t:'寓意深远',d:'每个汉字都承载着深刻的文化内涵。名字应体现美好的品德、自然之美或高远的志向。'} },
                { en:{t:'Sound and Harmony',d:'The pronunciation of a name matters — it should flow beautifully and harmonize with the surname for a pleasing rhythm.'}, zh:{t:'音韵和谐',d:'名字的读音非常重要——应与姓氏搭配流畅悦耳，形成优美的韵律。'} },
                { en:{t:'Generational Tradition',d:'Some families follow generational naming patterns, where siblings share a common character in their names.'}, zh:{t:'辈分传统',d:'一些家族遵循辈分起名的传统，兄弟姐妹的名字中共享同一个字。'} },
              ].map((item,i) => (
                <div key={i} className="bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-lg border border-white/[0.10] rounded-xl p-4">
                  <h4 className="text-xs font-semibold gold-text mb-2">item.en.t</h4>
                  <p className="text-[#9b8e7a] text-xs leading-relaxed">item.en.d</p>
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
