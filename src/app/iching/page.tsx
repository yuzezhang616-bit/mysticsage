'use client';

import { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const HEXAGRAMS = [
  { num:1, name_en:'Qian — The Creative', name_zh:'乾为天', desc_en:'Heaven above, heaven below — pure creative power at its strongest. This is a time for bold action and leadership. The dragon is in the sky — nothing can stop you but yourself. Act with integrity and vision.', desc_zh:'天在上，天在下——纯阳至刚，创造力最强大的时刻。这是大胆行动和领导的时机。飞龙在天——除了你自己，没有什么能阻挡你。以正直和远见行事。', img:'☰☰' },
  { num:2, name_en:'Kun — The Receptive', name_zh:'坤为地', desc_en:'Earth above, earth below — pure receptivity and devotion. This is a time for nurturing, supporting, and following rather than leading. Like the mare, find your strength in service and loyalty. Great things grow from patient devotion.', desc_zh:'地在上，地在下——纯阴至顺，包容和奉献。这是滋养、支持和跟随而非领导的时刻。如母马一般，在服务和忠诚中找到你的力量。伟大的事物从耐心的奉献中生长。', img:'☷☷' },
  { num:3, name_en:'Zhun — Initial Difficulty', name_zh:'水雷屯', desc_en:'Birth is always difficult. Like a sprout pushing through hard soil, you face obstacles at the very beginning. Do not be discouraged — these difficulties are signs that something new and vital is emerging. Proceed with caution but without fear.', desc_zh:'诞生总是困难的。如同一株幼苗冲破坚硬的土壤，你在起点就面临障碍。不要气馁——这些困难预示着某种崭新而有生命力的事物正在萌发。谨慎前行，但不要恐惧。', img:'☵☳' },
  { num:4, name_en:'Meng — Youthful Folly', name_zh:'山水蒙', desc_en:'Inexperience is not a flaw — it is the beginning of all wisdom. Approach your current situation with the open, questioning mind of a student. Seek guidance from those who have walked the path before you. The fountain of youth flows from a humble heart.', desc_zh:'缺乏经验不是缺陷——它是一切智慧的开端。以学生般开放好奇的心态对待你当前的处境。向那些在你之前走过这条路的人寻求指导。青春之泉从谦卑的心中流出。', img:'☶☵' },
  { num:5, name_en:'Xu — Waiting', name_zh:'水天需', desc_en:'Not yet — this is a time for patient waiting, not forceful action. The clouds gather but the rain has not yet fallen. Trust in timing. Use this period to prepare, to nourish yourself, and to build your strength. When the rain comes, you will be ready.', desc_zh:'时候未到——这是耐心等待而非强行行动的时刻。云已聚而雨未落。相信时机。利用这段时间准备、滋养自己、积蓄力量。当雨水来临之时，你将已准备就绪。', img:'☵☰' },
  { num:6, name_en:'Song — Conflict', name_zh:'天水讼', desc_en:'Conflict has arisen, but tread carefully. Lawsuits and arguments may seem necessary, but they drain your energy. The wise person seeks mediation and compromise. There is no glory in winning a battle that costs you your peace.', desc_zh:'冲突已起，但需谨慎行事。诉讼和争论可能看似必要，但它们消耗你的能量。智者寻求调解和妥协。赢得一场牺牲你内心平静的战争毫无荣耀可言。', img:'☰☵' },
  { num:7, name_en:'Shi — The Army', name_zh:'地水师', desc_en:'Collective action is needed now. Whether it is a team project or a community effort, you must mobilize people toward a common goal. Leadership requires discipline and clear structure. The general who wins is the one who prepares the most thoroughly.', desc_zh:'现在需要集体行动。无论是团队项目还是社区努力，你必须动员人们朝着共同的目标前进。领导需要纪律和清晰的结构。赢的将军是准备最充分的那个。', img:'☷☵' },
  { num:8, name_en:'Bi — Holding Together', name_zh:'水地比', desc_en:'Union and harmony are the themes now. Like fish gathering in a clear stream, people naturally come together in mutual support. Check your alliances — do they align with your values? Unity based on shared principles brings lasting peace.', desc_zh:'团结与和谐是当下的主题。如同鱼群汇聚在清澈的溪流中，人们自然而然地聚集在一起互相支持。审视你的人际联盟——它们与你的价值观一致吗？基于共同原则的团结带来持久的和平。', img:'☵☷' },
  { num:9, name_en:'Xiao Chu — Small Accumulation', name_zh:'风天小畜', desc_en:'Small, steady progress. The clouds are dense but it has not yet rained — your efforts are accumulating but the breakthrough has not come. Do not force it. Small acts of discipline and patience will build the momentum for a major breakthrough.', desc_zh:'小步稳步前进。云层厚密但尚未下雨——你的努力在积累，但突破尚未到来。不要强行推进。纪律和耐心的小动作将积累起重大突破的动能。', img:'☴☰' },
  { num:10, name_en:'Lu — Treading', name_zh:'天泽履', desc_en:'You are walking a delicate path. Like treading on a tiger\'s tail, the situation requires utmost care and respect. But the tiger does not bite if you proceed with proper conduct. Act with propriety, humility, and awareness of your surroundings.', desc_zh:'你正走在一条微妙的道路上。如同踩在老虎尾巴上，局势需要最大的谨慎和尊重。但如果你以恰当的方式行事，老虎不会咬人。以礼、谦和觉察之心行事。', img:'☰☱' },
  { num:11, name_en:'Tai — Peace', name_zh:'地天泰', desc_en:'Heaven and earth are in perfect communication. A time of harmony, prosperity, and smooth progress. Everything flows with ease. The small departs and the great arrives. Enjoy this season of abundance, but do not become complacent — all things move in cycles.', desc_zh:'天地交融。和谐、繁荣和顺畅的时期。一切顺利。小往大来。享受这段丰盛的季节，但不要自满——万物皆在循环之中。', img:'☷☰' },
  { num:12, name_en:'Pi — Standstill', name_zh:'天地否', desc_en:'Heaven and earth are not communicating. A time of stagnation and obstacles. The wise person withdraws and focuses on inner cultivation rather than external achievement. This too shall pass. Use this period to reflect, recharge, and realign with your values.', desc_zh:'天地不交。停滞和障碍的时期。智者退隐，专注于内在修养而非外在成就。这一切也终将过去。利用这段时间反思、充电、重新校准你的价值观。', img:'☰☷' },
  { num:13, name_en:'Tong Ren — Fellowship', name_zh:'天火同人', desc_en:'Like-minded people come together. This is a time for collaboration, shared vision, and collective action. When people unite with a common purpose, they can overcome any obstacle. Extend your hand in friendship — the right allies are appearing in your life.', desc_zh:'志同道合的人走到一起。这是合作、共享愿景和集体行动的时期。当人们为了共同的目标团结起来，他们可以克服任何障碍。伸出友谊之手——对的人正在出现在你的生命中。', img:'☰☲' },
  { num:14, name_en:'Da You — Great Possession', name_zh:'火天大有', desc_en:'Great abundance is yours. Success, recognition, and material wealth flow toward you. But great possession brings great responsibility. Use your abundance to benefit others, and your blessings will multiply. The wise person owns much yet clings to nothing.', desc_zh:'巨大的丰盛属于你。成功、认可和物质财富流向你。但巨大的拥有带来巨大的责任。用你的丰盛来利益他人，你的福报将倍增。智者拥有很多却不执着于任何。', img:'☲☰' },
  { num:15, name_en:'Qian — Modesty', name_zh:'地山谦', desc_en:'True greatness is humble. The mountain lowering itself beneath the earth — this is the image of modesty. Those who are truly accomplished do not need to broadcast their achievements. Humility opens doors that pride keeps closed. Remain grounded, and your influence will spread naturally.', desc_zh:'真正的伟大是谦卑的。山把自己置于地之下——这是谦的意象。真正有成就的人不需要宣扬自己的成就。谦卑打开骄傲关上的门。保持脚踏实地，你的影响力会自然地扩展。', img:'☷☶' },
  { num:16, name_en:'Yu — Enthusiasm', name_zh:'雷地豫', desc_en:'Thunder bursts forth from the earth — a time of joyful energy and inspired action. The moment is ripe for launching new initiatives. Your enthusiasm is contagious — share it freely. When you act with joy and conviction, success naturally follows.', desc_zh:'雷出地奋——充满欢欣能量和灵感行动的时期。时机成熟，可以启动新的计划。你的热情具有感染力——尽情分享。当你以喜悦和信念行动时，成功自然跟随。', img:'☳☷' },
];

function castTrigram(): number[] {
  const lines: number[] = [];
  for (let i = 0; i < 3; i++) {
    const coins = Array.from({length:3}, () => Math.floor(Math.random()*2) + 2);
    const total = coins.reduce((a,b) => a+b, 0);
    lines.push(total % 2 === 0 ? 6 : 7); // 6=yin, 7=yang
  }
  return lines;
}

function trigramToNumber(lines: number[]): number {
  let num = 0;
  for (let i = 0; i < 3; i++) {
    if (lines[i] === 7) num |= (1 << (2 - i));
  }
  return num; // 0-7
}

export default function IChingPage() {
  const [question, setQuestion] = useState('');
  const [hexagram, setHexagram] = useState<typeof HEXAGRAMS[0] | null>(null);
  const [cast, setCast] = useState(false);

  const handleCast = () => {
    const upper = trigramToNumber(castTrigram());
    const lower = trigramToNumber(castTrigram());
    const idx = (upper * 8 + lower) % 64;
    setHexagram(HEXAGRAMS[idx]);
    setCast(true);
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
          <h1 className="text-3xl font-bold gold-text text-center mb-2">☯ I Ching Oracle</h1>
          <p className="text-[#9b8e7a] text-center text-sm mb-8 max-w-lg mx-auto">
            Cast the coins and receive ancient wisdom from the Book of Changes
          </p>

          <div className="max-w-md mx-auto bg-black/20 backdrop-blur-xl border border-white/[0.07] rounded-xl shadow-lg shadow-black/30 p-6 mb-8">
            <div className="space-y-4">
              <div>
                <label className="text-xs text-[#9b8e7a] mb-1 block">Your Question (optional)</label>
                <input type="text" placeholder="e.g. Should I take this job?" value={question} onChange={e=>setQuestion(e.target.value)}
                  className="w-full bg-[#0f1117] border border-[#1a1d2a] rounded-lg px-3 py-2.5 text-[#e8dcc8] text-sm focus:border-[#d4af37]/40"/>
              </div>
              <button onClick={handleCast}
                className="gold-glow w-full bg-gradient-to-r from-[#a8872e] via-[#d4af37] to-[#a8872e] text-[#07080a] py-3 rounded-xl font-semibold cursor-pointer flex items-center justify-center gap-2">
                <span>🎲 Cast the Coins</span>
              </button>
            </div>
          </div>

          {hexagram && (
            <div className="space-y-4 animate-in fade-in duration-500">
              <div className="bg-black/20 backdrop-blur-xl border border-white/[0.07] rounded-xl shadow-lg shadow-black/30 p-6 text-center">
                <div className="text-5xl mb-3">{hexagram.img}</div>
                <h2 className="text-xl font-bold gold-text mb-1">#{hexagram.num} hexagram.name_en</h2>
                <p className="text-[#e8dcc8] text-sm leading-relaxed opacity-85 mt-4">hexagram.desc_en</p>
              </div>

              <div className="bg-gradient-to-r from-[rgba(212,175,55,0.08)] to-[rgba(168,135,46,0.05)] border border-[rgba(212,175,55,0.15)] rounded-xl p-4 text-center">
                <p className="text-xs text-[#9b8e7a]">💡 The I Ching offers guidance, not predictions. Reflect on how this wisdom applies to your situation.</p>
              </div>
            </div>
          )}

          <div className="mt-12 border-t border-[rgba(212,175,55,0.06)] pt-8">
            <h2 className="text-lg font-semibold gold-text text-center mb-6">About I Ching</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { en:{t:'The Book of Changes',d:'The I Ching is one of the oldest Chinese classics, dating back over 3,000 years. It is a divination system and philosophical text that reveals patterns of change in the universe.'}, zh:{t:'群经之首',d:'《易经》是中国最古老的经典之一，距今已有三千多年历史。它既是占卜系统，也是揭示宇宙变化规律的哲学著作。'} },
                { en:{t:'The 64 Hexagrams',d:'Each hexagram consists of six lines, either solid (yang) or broken (yin). The 64 combinations represent all possible situations in human life, offering guidance for each circumstance.'}, zh:{t:'六十四卦',d:'每一卦由六条阳爻或阴爻组成。六十四种组合代表了人生中所有可能的情境，为每一种处境提供指引。'} },
                { en:{t:'How to Consult',d:'Traditionally, three coins are tossed six times. Each toss generates a yin or yang line. The resulting hexagram is then interpreted as guidance for your question.'}, zh:{t:'如何占卜',d:'传统方法是用三枚铜钱投掷六次。每一次投掷产生一条阴爻或阳爻，由此得到的卦象即为问题的指引。'} },
                { en:{t:'Philosophical Wisdom',d:'Beyond divination, the I Ching offers profound insights about change, balance, and the nature of reality. Its wisdom is as relevant today as it was three millennia ago.'}, zh:{t:'哲学智慧',d:'超越占卜层面，易经提供了关于变化、平衡和现实本质的深刻洞见。它的智慧在今天与三千年前一样具有启发性。'} },
              ].map((item,i) => (
                <div key={i} className="bg-black/20 backdrop-blur-lg border border-white/[0.06] rounded-xl p-4">
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
