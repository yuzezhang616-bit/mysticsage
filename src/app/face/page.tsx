'use client';

import { useState, useRef } from 'react';
import NavBar from '@/components/NavBar';
import { useLanguage } from '@/lib/use-language';

// ===== 面部特征选项 =====
const ZONES = [
  {
    id: 'forehead', icon: '🔮',
    en: 'Forehead Shape', zh: '额头形状',
    options: [
      { en:'Broad & Full — Wise, fortunate, prosperous youth', zh:'宽阔饱满 — 聪明、有福气、早年运势旺' },
      { en:'Narrow — Challenges in youth, later bloomer', zh:'偏窄 — 早年需努力，大器晚成' },
      { en:'Round — Gentle nature, artistic talent', zh:'圆润 — 性情温和，有艺术天赋' },
      { en:'Square — Practical, disciplined, leader', zh:'方正 — 务实、自律、有领导力' },
    ]
  },
  {
    id: 'eyebrows', icon: '✏️',
    en: 'Eyebrows', zh: '眉毛',
    options: [
      { en:'Thick & Bushy — Strong vitality, straightforward', zh:'浓密 — 生命力旺盛、性格直率' },
      { en:'Thin & Neat — Refined, sensitive, elegant', zh:'细秀 — 精致敏感、有品位' },
      { en:'Arched — Creative, optimistic, sociable', zh:'拱形 — 有创造力、乐观、善于社交' },
      { en:'Straight — Rational, principled, determined', zh:'平直 — 理性、有原则、意志坚定' },
    ]
  },
  {
    id: 'eyes', icon: '👁️',
    en: 'Eye Shape', zh: '眼型',
    options: [
      { en:'Large & Bright — Intelligent, open-hearted, charismatic', zh:'大而明亮 — 聪明、心胸开阔、有魅力' },
      { en:'Narrow — Deep thinker, observant, calm', zh:'细长 — 深思熟虑、观察力强、冷静' },
      { en:'Round — Innocent, enthusiastic, expressive', zh:'圆眼 — 天真热情、表达力强' },
      { en:'Phoenix Eyes (upturned) — Ambitious, powerful, lucky', zh:'丹凤眼（上扬）— 有野心、有魄力、运势好' },
    ]
  },
  {
    id: 'nose', icon: '👃',
    en: 'Nose', zh: '鼻子',
    options: [
      { en:'Straight & Fleshy tip — Wealthy, stable, prosperous middle age', zh:'直挺有肉 — 财运好、中年富足、稳定' },
      { en:'High bridge — Ambitious, independent, authoritative', zh:'鼻梁高 — 有野心、独立、有权威' },
      { en:'Small & Delicate — Artistic, meticulous, intuitive', zh:'小巧精致 — 有艺术感、细心、直觉强' },
      { en:'Broad base — Generous, reliable, good fortune', zh:'鼻翼宽 — 慷慨大方、可靠、有福气' },
    ]
  },
  {
    id: 'mouth', icon: '👄',
    en: 'Mouth & Lips', zh: '口唇',
    options: [
      { en:'Full lips — Passionate, warm, expressive', zh:'嘴唇丰满 — 热情、温暖、表达力强' },
      { en:'Thin lips — Disciplined, reserved, determined', zh:'嘴唇薄 — 自律、内敛、意志坚定' },
      { en:'Upturned corners — Optimistic, lucky, popular', zh:'嘴角上扬 — 乐观、有福气、人缘好' },
      { en:'Well-defined Cupid bow — Creative, charming, eloquent', zh:'唇弓分明 — 有创造力、有魅力、口才好' },
    ]
  },
  {
    id: 'chin', icon: '⭐',
    en: 'Chin Shape', zh: '下巴形状',
    options: [
      { en:'Round & Full — Comfortable old age, kind-hearted', zh:'圆润饱满 — 晚年安逸、心地善良' },
      { en:'Pointed — Creative, sensitive, late bloomer', zh:'尖 — 有创意、敏感、后发制人' },
      { en:'Square — Strong will, stable, grounded', zh:'方 — 意志坚强、稳定、务实' },
      { en:'Double chin (subtle) — Fortune, prosperity, generosity', zh:'双下巴（微）— 有福气、富裕、大方' },
    ]
  },
  {
    id: 'ears', icon: '👂',
    en: 'Earlobes', zh: '耳垂',
    options: [
      { en:'Large & Fleshy — Lucky, wealthy, long life', zh:'大而有肉 — 有福气、富贵、长寿' },
      { en:'Small & Thin — Quick-minded, detail-oriented', zh:'小且薄 — 思维敏捷、细心周到' },
      { en:'High-set — Intelligent, ambitious, sharp', zh:'位置高 — 聪明、有抱负、敏锐' },
      { en:'Low-set — Patient, grounded, community person', zh:'位置低 — 有耐心、务实、重情义' },
    ]
  },
  {
    id: 'cheekbones', icon: '🏔️',
    en: 'Cheekbones', zh: '颧骨',
    options: [
      { en:'High & Prominent — Powerful, authoritative, leader', zh:'高突 — 有魄力、有权威、领导者' },
      { en:'Low & Rounded — Gentle, harmonious, cooperative', zh:'低圆 — 温和、和谐、善于合作' },
      { en:'Broad — Ambitious, confident, influential', zh:'宽阔 — 有抱负、自信、有影响力' },
      { en:'Flat — Peaceful, easygoing, content', zh:'平 — 平和、随和、知足常乐' },
    ]
  },
];

// ===== 解读生成 =====
function generateReading(selections: Record<string, number>, lang: 'en' | 'zh') {
  const isEn = lang === 'en';

  const sections = ZONES.map(zone => {
    const idx = selections[zone.id];
    if (idx === undefined) return null;
    return {
      icon: zone.icon,
      title: isEn ? zone.en : zone.zh,
      text: zone.options[idx][isEn ? 'en' : 'zh'],
    };
  }).filter(Boolean);

  // 综合分析
  const scores = {
    fortune: 0,
    wisdom: 0,
    personality: 0,
    wealth: 0,
  };
  const mapped: Record<string, { fortune: number; wisdom: number; personality: number; wealth: number }> = {
    forehead: { fortune: 7, wisdom: 9, personality: 6, wealth: 5 },
    eyebrows: { fortune: 5, wisdom: 6, personality: 8, wealth: 4 },
    eyes: { fortune: 6, wisdom: 9, personality: 7, wealth: 5 },
    nose: { fortune: 8, wisdom: 5, personality: 6, wealth: 9 },
    mouth: { fortune: 7, wisdom: 5, personality: 8, wealth: 6 },
    chin: { fortune: 8, wisdom: 4, personality: 5, wealth: 6 },
    ears: { fortune: 9, wisdom: 5, personality: 4, wealth: 6 },
    cheekbones: { fortune: 5, wisdom: 5, personality: 7, wealth: 7 },
  };

  Object.entries(selections).forEach(([zoneId, optIdx]) => {
    const m = mapped[zoneId];
    if (!m) return;
    // Higher option index = slightly different adjustment
    const adj = optIdx === 0 ? 1 : optIdx === 1 ? 0.8 : optIdx === 2 ? 0.9 : 0.7;
    scores.fortune += Math.round(m.fortune * adj);
    scores.wisdom += Math.round(m.wisdom * adj);
    scores.personality += Math.round(m.personality * adj);
    scores.wealth += Math.round(m.wealth * adj);
  });

  const maxScore = 72;
  const normalized = {
    fortune: Math.min(100, Math.round((scores.fortune / maxScore) * 100)),
    wisdom: Math.min(100, Math.round((scores.wisdom / maxScore) * 100)),
    personality: Math.min(100, Math.round((scores.personality / maxScore) * 100)),
    wealth: Math.min(100, Math.round((scores.wealth / maxScore) * 100)),
  };

  const summary_en = [
    'Your facial features reflect a balanced and harmonious nature. The universe has blessed you with unique gifts — embrace them fully.',
    'The lines of your face tell a story of resilience and grace. Your destiny is shaped by both your features and your choices.',
    'Your countenance reveals wisdom beyond your years. Trust in the path that is unfolding before you.',
  ][Math.floor(Math.random() * 3)];

  const summary_zh = [
    '你的面相透露出一种平衡和谐的气质。上天赋予你独特的礼物——请全然拥抱它们。',
    '你面部的轮廓讲述着坚韧与优雅的故事。你的命运既由相貌塑造，也由选择决定。',
    '你的面容展现出超越年龄的智慧。相信正在你面前展开的人生道路。',
  ][Math.floor(Math.random() * 3)];

  return { sections, scores: normalized, summary: isEn ? summary_en : summary_zh };
}

export default function FaceReadingPage() {
  const [lang, setLang] = useLanguage();
  const isEn = lang === 'en';
  const [photo, setPhoto] = useState<string | null>(null);
  const [selections, setSelections] = useState<Record<string, number>>({});
  const [reading, setReading] = useState<ReturnType<typeof generateReading> | null>(null);
  const [currentZone, setCurrentZone] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const select = (zoneId: string, idx: number) => {
    const next = { ...selections, [zoneId]: idx };
    setSelections(next);

    // Auto advance to next zone after selection
    const zoneIndex = ZONES.findIndex(z => z.id === zoneId);
    if (zoneIndex < ZONES.length - 1) {
      setTimeout(() => setCurrentZone(zoneIndex + 1), 300);
    }

    // Check if all selected
    if (Object.keys(next).length === ZONES.length) {
      setReading(generateReading(next, lang));
    }
  };

  const startOver = () => {
    setSelections({});
    setReading(null);
    setCurrentZone(0);
  };

  const selectedCount = Object.keys(selections).length;
  const allSelected = selectedCount === ZONES.length;

  return (
    <>
      <div className="video-bg">
        <video autoPlay muted loop playsInline className="bg-video"><source src="/bg.mp4" type="video/mp4" /></video>
        <div className="video-overlay" />
      </div>
      <main className="min-h-screen relative z-10">
        <NavBar currentLang={lang} onLangChange={setLang} />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold gold-text text-center mb-2">{isEn ? '👤 Face Reading Analysis' : '👤 面相分析'}</h1>
          <p className="text-[#9b8e7a] text-center text-sm mb-6 max-w-lg mx-auto">
            {isEn ? 'Upload a photo and select your facial features for a personalized reading' : '上传照片，选择你的面部特征，获取专属面相分析'}
          </p>

          {/* Upload */}
          <div className="max-w-md mx-auto mb-8">
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
            {!photo ? (
              <button onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-[rgba(212,175,55,0.2)] rounded-xl p-8 text-center hover:border-[rgba(212,175,55,0.4)] transition-all cursor-pointer bg-[#0f1117]/50">
                <div className="text-4xl mb-3">📸</div>
                <p className="text-[#9b8e7a] text-sm">{isEn ? 'Click to upload a photo' : '点击上传照片'}</p>
                <p className="text-[#6b5f4a] text-xs mt-1">{isEn ? 'No data is uploaded — everything stays on your device' : '不上传任何数据到服务器，全程在本地处理'}</p>
              </button>
            ) : (
              <div className="relative">
                <img src={photo} alt="Uploaded face" className="w-full max-h-64 object-contain rounded-xl" />
                <button onClick={() => { setPhoto(null); startOver(); }}
                  className="absolute top-2 right-2 bg-[#07080a]/80 text-[#9b8e7a] rounded-full w-7 h-7 flex items-center justify-center text-sm hover:text-white">✕</button>
              </div>
            )}
          </div>

          {/* Feature selection */}
          {photo && !allSelected && (
            <div className="max-w-2xl mx-auto">
              {/* Progress */}
              <div className="flex items-center gap-2 mb-6 justify-center">
                {ZONES.map((z, i) => (
                  <div key={z.id} className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] transition-all ${
                    selections[z.id] !== undefined ? 'bg-[#d4af37] text-[#07080a]' :
                    i === currentZone ? 'border border-[#d4af37]/40 text-[#f0d68a]' :
                    'border border-[#1a1d2a] text-[#3a3528]'
                  }`}>{z.icon}</div>
                ))}
              </div>

              {/* Current zone card */}
              <div className="bg-[#0f1117]/90 mystical-border rounded-xl p-6 animate-in fade-in">
                <div className="text-center mb-4">
                  <span className="text-2xl">{ZONES[currentZone].icon}</span>
                  <h3 className="text-base font-semibold gold-text mt-2">{isEn ? ZONES[currentZone].en : ZONES[currentZone].zh}</h3>
                  <p className="text-[#9b8e7a] text-xs mt-1">{isEn ? `Step ${currentZone + 1} of ${ZONES.length} — choose the option that best matches your photo` : `第${currentZone + 1}步，共${ZONES.length}步——选择最符合你照片的选项`}</p>
                </div>
                <div className="space-y-2">
                  {ZONES[currentZone].options.map((opt, i) => (
                    <button key={i} onClick={() => select(ZONES[currentZone].id, i)}
                      className="w-full text-left p-3 rounded-lg border border-[#1a1d2a] hover:border-[rgba(212,175,55,0.3)] hover:bg-[rgba(212,175,55,0.03)] transition-all text-sm">
                      <span className="text-[#e8dcc8]">{isEn ? opt.en : opt.zh}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Reading result */}
          {reading && (
            <div className="space-y-4 animate-in fade-in duration-500">
              {/* Summary */}
              <div className="bg-gradient-to-r from-[rgba(212,175,55,0.08)] to-[rgba(168,135,46,0.05)] border border-[rgba(212,175,55,0.15)] rounded-xl p-5 text-center">
                <p className="text-[#e8dcc8] text-sm italic opacity-85">&ldquo;{reading.summary}&rdquo;</p>
              </div>

              {/* Scores */}
              <div className="grid grid-cols-4 gap-3">
                {Object.entries(reading.scores).map(([key, val]) => {
                  const labels: Record<string, { en: string; zh: string }> = {
                    fortune: { en: 'Fortune', zh: '福气' },
                    wisdom: { en: 'Wisdom', zh: '智慧' },
                    personality: { en: 'Character', zh: '品性' },
                    wealth: { en: 'Wealth', zh: '财运' },
                  };
                  return (
                    <div key={key} className="bg-[#0f1117]/70 border border-[rgba(212,175,55,0.06)] rounded-xl p-3 text-center">
                      <p className="text-[9px] text-[#6b5f4a] mb-1">{isEn ? labels[key].en : labels[key].zh}</p>
                      <p className="text-lg font-bold gold-text">{val}<span className="text-[9px]">%</span></p>
                      <div className="w-full bg-[#1a1d2a] rounded-full h-1 mt-1 overflow-hidden">
                        <div className="h-full bg-[#d4af37] rounded-full" style={{width:`${val}%`}}></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Detailed sections */}
              {reading.sections.map((s: any, i: number) => (
                <div key={i} className="bg-[#0f1117]/70 border border-[rgba(212,175,55,0.06)] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span>{s.icon}</span>
                    <h4 className="text-xs font-semibold gold-text">{s.title}</h4>
                  </div>
                  <p className="text-[#9b8e7a] text-xs">{s.text}</p>
                </div>
              ))}

              <div className="text-center pt-2">
                <button onClick={startOver}
                  className="gold-glow bg-gradient-to-r from-[#a8872e] via-[#d4af37] to-[#a8872e] text-[#07080a] px-6 py-2.5 rounded-xl text-sm font-semibold cursor-pointer">
                  {isEn ? '🔄 Start Over' : '🔄 重新分析'}
                </button>
              </div>
            </div>
          )}

          {/* Knowledge section (shown before photo) */}
          {!photo && (
            <div className="border-t border-[rgba(212,175,55,0.06)] pt-8">
              <h2 className="text-lg font-semibold gold-text text-center mb-6">{isEn ? 'The Three Sections' : '三停学说'}</h2>
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[
                  { en:{t:'Upper Section (Heaven)',a:'Ages 1-30',d:'The forehead represents intelligence, ancestors, and early life opportunities.'}, zh:{t:'上停（天）',a:'1-30岁',d:'额头代表智慧、祖荫和早年机遇。'} },
                  { en:{t:'Middle Section (Humanity)',a:'Ages 31-50',d:'The nose, eyes, and cheek area represent career, wealth, and social status.'}, zh:{t:'中停（人）',a:'31-50岁',d:'鼻子、眼睛和颧部代表事业、财富和社会地位。'} },
                  { en:{t:'Lower Section (Earth)',a:'Ages 51+',d:'The mouth, chin, and jaw represent later years, legacy, and final fulfillment.'}, zh:{t:'下停（地）',a:'51岁以上',d:'口、下巴和下颌代表晚年、遗产和最终的圆满。'} },
                ].map((s,i) => (
                  <div key={i} className="bg-[#0f1117]/60 border border-[rgba(212,175,55,0.06)] rounded-xl p-4 text-center">
                    <h4 className="text-xs font-semibold gold-text mb-1">{isEn ? s.en.t : s.zh.t}</h4>
                    <p className="text-[#d4af37] text-xs mb-2">{isEn ? s.en.a : s.zh.a}</p>
                    <p className="text-[#9b8e7a] text-xs">{isEn ? s.en.d : s.zh.d}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
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
