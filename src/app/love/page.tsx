'use client';

import { useState } from 'react';
import NavBar from '@/components/NavBar';
import { useLanguage } from '@/lib/use-language';

export default function LoveMatchPage() {
  const [lang, setLang] = useLanguage();
  const isEn = lang === 'en';
  const [p1, setP1] = useState({ year:'', month:'', day:'', hour:'', gender:'male' as 'male'|'female' });
  const [p2, setP2] = useState({ year:'', month:'', day:'', hour:'', gender:'female' as 'male'|'female' });
  const [result, setResult] = useState<{ score: number; analysis: string; tips: string } | null>(null);

  const handleSubmit = () => {
    const y1 = parseInt(p1.year), y2 = parseInt(p2.year);
    const m1 = parseInt(p1.month), m2 = parseInt(p2.month);
    if (!y1 || !y2 || !m1 || !m2) return;

    // Simple element compatibility (based on birth year Heavenly Stem)
    const stemMap = [4,5,0,1,2,3,4,5,6,7]; // 甲-癸 -> element index
    const s1 = stemMap[(y1 - 4) % 10];
    const s2 = stemMap[(y2 - 4) % 10];
    const elements = ['Wood','Wood','Fire','Fire','Earth','Earth','Metal','Metal','Water','Water'];
    const el1 = elements[s1], el2 = elements[s2];

    const compatibility: Record<string, Record<string, { score: number }>> = {
      Wood: { Wood:{score:70}, Fire:{score:85}, Earth:{score:45}, Metal:{score:25}, Water:{score:80} },
      Fire: { Wood:{score:80}, Fire:{score:65}, Earth:{score:75}, Metal:{score:30}, Water:{score:20} },
      Earth: { Wood:{score:30}, Fire:{score:70}, Earth:{score:60}, Metal:{score:75}, Water:{score:55} },
      Metal: { Wood:{score:20}, Fire:{score:35}, Earth:{score:80}, Metal:{score:65}, Water:{score:70} },
      Water: { Wood:{score:75}, Fire:{score:25}, Earth:{score:50}, Metal:{score:70}, Water:{score:55} },
    };
    const score = compatibility[el1]?.[el2]?.score || 50;

    const analyses: Record<string, { en: string; zh: string }> = {
      high: {
        en: 'Excellent compatibility! Your elements naturally support each other. This relationship has strong foundations for growth, mutual understanding, and lasting harmony. The cosmic energies favor your union.',
        zh: '非常合拍！你们的五行天然相生。这段关系有坚实的基础来支持成长、相互理解和持久的和谐。宇宙能量眷顾着你们的结合。'
      },
      medium: {
        en: 'Moderate compatibility with good potential. Your elements have both harmony and tension — the key is communication and mutual respect. Where one is strong, the other complements. With effort, this can be a balanced and fulfilling relationship.',
        zh: '中等契合度，有不错的潜力。你们的五行既有和谐也有张力——关键在于沟通和相互尊重。一方强处，另一方互补。用心经营，这可以是一段平衡而充实的关系。'
      },
      low: {
        en: 'This pairing faces some elemental challenges. Differences in temperament may require extra patience and understanding. However, challenges can strengthen a relationship — the key is recognizing and respecting each other\'s fundamental nature.',
        zh: '这对组合面临一些五行上的挑战。性格差异可能需要额外的耐心和理解。然而，挑战也可以巩固关系——关键在于认识和尊重彼此的本性。'
      }
    };

    const tips: Record<string, { en: string; zh: string }> = {
      high: {
        en: 'Nurture your natural harmony through shared activities that balance both your elements. Travel together, create together, grow together.',
        zh: '通过平衡你二人五行的共同活动来滋养你们天然的和谐。一起旅行、一起创造、一起成长。'
      },
      medium: {
        en: 'Focus on open communication. Your differences are not obstacles — they are opportunities to learn and expand. Celebrate what makes each of you unique.',
        zh: '注重开放的沟通。你们的不同不是障碍——它们是学习和扩展的机会。珍视彼此的独特之处。'
      },
      low: {
        en: 'Patience is your greatest ally. Find common ground in shared values and interests. Complementary strengths can create a whole greater than the sum of its parts.',
        zh: '耐心是你们最好的盟友。在共同价值观和兴趣中找到共同点。互补的优势可以创造大于部分之和的整体。'
      }
    };

    const level = score >= 70 ? 'high' : score >= 45 ? 'medium' : 'low';
    setResult({
      score,
      analysis: analyses[level][lang],
      tips: tips[level][lang],
    });
  };

  return (
    <>
      <div className="video-bg">
        <video autoPlay muted loop playsInline className="bg-video"><source src="/bg.mp4" type="video/mp4" /></video>
        <div className="video-overlay" />
      </div>
      <main className="min-h-screen relative z-10">
        <NavBar currentLang={lang} onLangChange={setLang} />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold gold-text text-center mb-2">{isEn ? '💕 Love Match Analysis' : '💕 八字合婚'}</h1>
          <p className="text-[#9b8e7a] text-center text-sm mb-8 max-w-lg mx-auto">
            {isEn ? 'Compare two birth charts to discover your elemental compatibility' : '比较两个人的八字，探索你们的五行契合度'}
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Person 1 */}
            <div className="bg-[#0f1117]/90 mystical-border rounded-xl p-5">
              <h3 className="text-sm font-semibold gold-text mb-4 text-center">{isEn ? '👤 First Person' : '👤 第一人'}</h3>
              <div className="grid grid-cols-4 gap-2 mb-3">
                <div><label className="text-xs text-[#9b8e7a]">{isEn?'Year':'年'}</label><input type="number" placeholder="1990" value={p1.year} onChange={e=>setP1({...p1,year:e.target.value})} className="w-full bg-[#0f1117] border border-[#1a1d2a] rounded-lg px-2 py-2 text-[#e8dcc8] text-xs focus:border-[#d4af37]/40"/></div>
                <div><label className="text-xs text-[#9b8e7a]">{isEn?'Month':'月'}</label><input type="number" placeholder="6" value={p1.month} onChange={e=>setP1({...p1,month:e.target.value})} className="w-full bg-[#0f1117] border border-[#1a1d2a] rounded-lg px-2 py-2 text-[#e8dcc8] text-xs focus:border-[#d4af37]/40"/></div>
                <div><label className="text-xs text-[#9b8e7a]">{isEn?'Day':'日'}</label><input type="number" placeholder="15" value={p1.day} onChange={e=>setP1({...p1,day:e.target.value})} className="w-full bg-[#0f1117] border border-[#1a1d2a] rounded-lg px-2 py-2 text-[#e8dcc8] text-xs focus:border-[#d4af37]/40"/></div>
                <div><label className="text-xs text-[#9b8e7a]">{isEn?'Hour':'时'}</label><input type="number" placeholder="12" value={p1.hour} onChange={e=>setP1({...p1,hour:e.target.value})} className="w-full bg-[#0f1117] border border-[#1a1d2a] rounded-lg px-2 py-2 text-[#e8dcc8] text-xs focus:border-[#d4af37]/40"/></div>
              </div>
              <div className="flex gap-2">
                {(['male','female'] as const).map(g => (
                  <button key={g} onClick={()=>setP1({...p1,gender:g})}
                    className={`flex-1 py-2 rounded-lg border text-xs font-medium transition-all ${p1.gender===g?'border-[#d4af37] bg-[#d4af37]/10 text-[#f0d68a]':'border-[#1a1d2a] text-[#6b5f4a]'}`}>
                    {g==='male'?(isEn?'♂ Male':'♂ 男'):(isEn?'♀ Female':'♀ 女')}
                  </button>
                ))}
              </div>
            </div>

            {/* Person 2 */}
            <div className="bg-[#0f1117]/90 mystical-border rounded-xl p-5">
              <h3 className="text-sm font-semibold gold-text mb-4 text-center">{isEn ? '👤 Second Person' : '👤 第二人'}</h3>
              <div className="grid grid-cols-4 gap-2 mb-3">
                <div><label className="text-xs text-[#9b8e7a]">{isEn?'Year':'年'}</label><input type="number" placeholder="1992" value={p2.year} onChange={e=>setP2({...p2,year:e.target.value})} className="w-full bg-[#0f1117] border border-[#1a1d2a] rounded-lg px-2 py-2 text-[#e8dcc8] text-xs focus:border-[#d4af37]/40"/></div>
                <div><label className="text-xs text-[#9b8e7a]">{isEn?'Month':'月'}</label><input type="number" placeholder="8" value={p2.month} onChange={e=>setP2({...p2,month:e.target.value})} className="w-full bg-[#0f1117] border border-[#1a1d2a] rounded-lg px-2 py-2 text-[#e8dcc8] text-xs focus:border-[#d4af37]/40"/></div>
                <div><label className="text-xs text-[#9b8e7a]">{isEn?'Day':'日'}</label><input type="number" placeholder="20" value={p2.day} onChange={e=>setP2({...p2,day:e.target.value})} className="w-full bg-[#0f1117] border border-[#1a1d2a] rounded-lg px-2 py-2 text-[#e8dcc8] text-xs focus:border-[#d4af37]/40"/></div>
                <div><label className="text-xs text-[#9b8e7a]">{isEn?'Hour':'时'}</label><input type="number" placeholder="14" value={p2.hour} onChange={e=>setP2({...p2,hour:e.target.value})} className="w-full bg-[#0f1117] border border-[#1a1d2a] rounded-lg px-2 py-2 text-[#e8dcc8] text-xs focus:border-[#d4af37]/40"/></div>
              </div>
              <div className="flex gap-2">
                {(['male','female'] as const).map(g => (
                  <button key={g} onClick={()=>setP2({...p2,gender:g})}
                    className={`flex-1 py-2 rounded-lg border text-xs font-medium transition-all ${p2.gender===g?'border-[#d4af37] bg-[#d4af37]/10 text-[#f0d68a]':'border-[#1a1d2a] text-[#6b5f4a]'}`}>
                    {g==='male'?(isEn?'♂ Male':'♂ 男'):(isEn?'♀ Female':'♀ 女')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <button onClick={handleSubmit} className="gold-glow bg-gradient-to-r from-[#a8872e] via-[#d4af37] to-[#a8872e] text-[#07080a] px-8 py-3 rounded-xl font-semibold cursor-pointer">
              {isEn ? '💞 Check Compatibility' : '💞 查看合婚'}  
            </button>
          </div>

          {result && (
            <div className="space-y-4 animate-in fade-in duration-500">
              {/* Score */}
              <div className="bg-[#0f1117]/90 mystical-border rounded-xl p-6 text-center">
                <p className="text-xs text-[#9b8e7a] mb-2">{isEn ? 'Compatibility Score' : '契合度评分'}</p>
                <div className="text-5xl font-bold gold-text mb-2">{result.score}<span className="text-xl">%</span></div>
                <div className="w-full bg-[#1a1d2a] rounded-full h-2 overflow-hidden max-w-xs mx-auto">
                  <div className={`h-full rounded-full transition-all duration-1000 ${
                    result.score >= 70 ? 'bg-green-500' : result.score >= 45 ? 'bg-yellow-500' : 'bg-red-500'
                  }`} style={{width:`${result.score}%`}}></div>
                </div>
              </div>
              {/* Analysis */}
              <div className="bg-[#0f1117]/90 mystical-border rounded-xl p-5">
                <h3 className="text-sm font-semibold gold-text mb-3">{isEn ? '📊 Analysis' : '📊 分析'}</h3>
                <p className="text-[#e8dcc8] text-sm leading-relaxed opacity-85">{result.analysis}</p>
              </div>
              {/* Tips */}
              <div className="bg-gradient-to-r from-[rgba(212,175,55,0.08)] to-[rgba(168,135,46,0.05)] border border-[rgba(212,175,55,0.15)] rounded-xl p-5">
                <h3 className="text-sm font-semibold gold-text mb-3">{isEn ? '💡 Advice' : '💡 建议'}</h3>
                <p className="text-[#f0d68a] text-sm leading-relaxed">{result.tips}</p>
              </div>
            </div>
          )}

          {/* Knowledge section */}
          <div className="mt-12 border-t border-[rgba(212,175,55,0.06)] pt-8">
            <h2 className="text-lg font-semibold gold-text text-center mb-6">{isEn ? 'About Bazi Compatibility' : '关于八字合婚'}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { en:{t:'The Five Elements',d:'In Chinese metaphysics, everything is composed of five elements: Wood, Fire, Earth, Metal, and Water. Elemental compatibility is the foundation of any relationship analysis.'}, zh:{t:'五行相生相克',d:'在中华命理中，万物由五种元素构成：木、火、土、金、水。五行契合度是所有关系分析的基础。'} },
                { en:{t:'Yin & Yang Balance',d:'Male and female energies within each person create a unique dynamic. The ideal partnership balances these energies between the two individuals.'}, zh:{t:'阴阳调和',d:'每个人体内的阴阳能量形成独特的动态。理想的关系是两人之间阴阳能量的平衡协调。'} },
                { en:{t:'Heavenly Stems',d:'Each birth year is assigned a Heavenly Stem that reveals one\'s elemental nature. Compatibility is calculated by how these elements interact.'}, zh:{t:'天干五行',d:'每个出生年份对应一个天干，揭示其五行属性。契合度由这些五行如何相互作用来计算。'} },
                { en:{t:'Beyond Compatibility',d:'While elemental compatibility is important, true harmony depends on mutual respect, communication, and shared values. Use this as a guide, not a verdict.'}, zh:{t:'超越契合度',d:'五行契合度固然重要，但真正的和谐取决于相互尊重、沟通和共同的价值观。将此作为参考，而非定论。'} },
              ].map((item,i) => (
                <div key={i} className="bg-[#0f1117]/60 border border-[rgba(212,175,55,0.06)] rounded-xl p-4">
                  <h4 className="text-xs font-semibold gold-text mb-2">{isEn ? item.en.t : item.zh.t}</h4>
                  <p className="text-[#9b8e7a] text-xs leading-relaxed">{isEn ? item.en.d : item.zh.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer className="border-t border-[rgba(212,175,55,0.06)] mt-12">
          <div className="max-w-5xl mx-auto px-4 py-6 text-center">
            <p className="text-xs text-[#3a3528]">✦ MysticSage — {isEn ? 'Ancient wisdom for the modern soul' : '为现代灵魂准备的古老智慧'}</p>
          </div>
        </footer>
      </main>
    </>
  );
}
