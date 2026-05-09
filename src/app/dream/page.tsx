'use client';

import { useState } from 'react';
import NavBar from '@/components/NavBar';
import { useLanguage } from '@/lib/use-language';

const DREAM_SYMBOLS = [
  { symbol_en: 'Water', symbol_zh: '水', element: 'Water',
    meaning_en: 'Water in dreams represents emotions, the subconscious, and the flow of life. Clear, calm water indicates emotional peace; turbulent water suggests inner turmoil or upcoming changes.',
    meaning_zh: '梦中的水代表情感、潜意识和生命的流动。清澈平静的水代表情绪安宁；波涛汹涌的水暗示内心动荡或即将到来的变化。' },
  { symbol_en: 'Fire', symbol_zh: '火', element: 'Fire',
    meaning_en: 'Fire symbolizes transformation, passion, and purification. A controlled fire indicates creative energy and warmth; an uncontrollable fire suggests overwhelming emotions or a need for change.',
    meaning_zh: '火象征转化、激情和净化。可控的火代表创造力和温暖；不可控的火暗示难以控制的情感或改变的需求。' },
  { symbol_en: 'Flying', symbol_zh: '飞翔', element: 'Wood',
    meaning_en: 'Flying represents freedom, ambition, and transcendence. It suggests you are rising above limitations or striving for higher goals. Difficulty flying may indicate feeling held back.',
    meaning_zh: '飞翔代表自由、雄心和超越。它暗示你正在超越限制或追求更高的目标。飞行困难可能表示感到被束缚。' },
  { symbol_en: 'Falling', symbol_zh: '坠落', element: 'Metal',
    meaning_en: 'Falling often reflects feelings of losing control or fear of failure. It may indicate anxiety about a situation in your waking life. The context — how you land — matters greatly.',
    meaning_zh: '坠落通常反映失控感或对失败的恐惧。它可能表示对现实生活某种情况的焦虑。情境——如何着地——非常重要。' },
  { symbol_en: 'Teeth Falling Out', symbol_zh: '掉牙', element: 'Earth',
    meaning_en: 'Classically associated with anxiety about appearance, aging, or loss of power. It may also indicate communication concerns — something you wish you had said or regret saying.',
    meaning_zh: '经典解读为对外表、衰老或失去力量的焦虑。也可能表示沟通方面的担忧——一些你希望说过或后悔说了的话。' },
  { symbol_en: 'Being Chased', symbol_zh: '被追赶', element: 'Water',
    meaning_en: 'A common dream reflecting avoidance. Something in your waking life is demanding your attention — a problem you have not faced, a truth you have not acknowledged.',
    meaning_zh: '常见梦境，反映逃避心理。现实生活中某事正在要求你的关注——一个你尚未面对的问题，一个你尚未承认的真相。' },
  { symbol_en: 'Snake', symbol_zh: '蛇', element: 'Water',
    meaning_en: 'A powerful symbol of transformation, healing, and hidden wisdom. In Chinese culture, snakes can also represent wealth and cunning. Context determines whether this is a warning or a blessing.',
    meaning_zh: '强大的象征，代表转化、疗愈和隐藏的智慧。在中国文化中，蛇也可代表财富和机敏。情境决定这是警告还是祝福。' },
  { symbol_en: 'Death', symbol_zh: '死亡', element: 'Metal',
    meaning_en: 'Dreams of death rarely predict actual death. Instead, they symbolize endings and new beginnings — a phase of life ending, a relationship transforming, or an old self dying to make way for the new.',
    meaning_zh: '梦见死亡很少预示真实的死亡。它象征结束和新开始——生命的一个阶段结束、一段关系的转变、或旧我死去为新我让路。' },
  { symbol_en: 'Mountain', symbol_zh: '山', element: 'Earth',
    meaning_en: 'Mountains represent obstacles, aspirations, and spiritual elevation. Climbing a mountain suggests ambition and progress; reaching the summit indicates achievement and clarity.',
    meaning_zh: '山代表障碍、志向和精神提升。登山代表雄心和进步；抵达山顶预示成就和清晰。' },
  { symbol_en: 'Rain', symbol_zh: '雨', element: 'Water',
    meaning_en: 'Rain can be cleansing or melancholic. Gentle rain suggests renewal and emotional release; storms indicate upheaval; rain stopping signifies the end of a difficult period.',
    meaning_zh: '雨可以是净化或忧郁的。细雨代表更新和情感释放；暴雨表示动荡；雨停意味困难时期的结束。' },
  { symbol_en: 'Baby', symbol_zh: '婴儿', element: 'Wood',
    meaning_en: 'Babies represent new beginnings, innocence, and potential. They may symbolize a new project, idea, or phase of life. A crying baby may indicate something needing your attention.',
    meaning_zh: '婴儿代表新开始、纯真和潜力。它可能象征一个新的项目、想法或人生阶段。哭泣的婴儿可能表示某事需要你的关注。' },
  { symbol_en: 'Door', symbol_zh: '门', element: 'Wood',
    meaning_en: 'Doors represent opportunities, choices, and transitions. An open door invites you to move forward; a closed door suggests obstacles or the need to find another path.',
    meaning_zh: '门代表机会、选择和转变。敞开的门邀请你前进；关闭的门暗示障碍或需要寻找另一条路。' },
  { symbol_en: 'Dragon', symbol_zh: '龙', element: 'Wood',
    meaning_en: 'An extremely auspicious symbol in Chinese culture. Dreaming of a dragon suggests immense potential, power, and good fortune. It may indicate a major life transformation approaching.',
    meaning_zh: '中国文化中极为吉祥的象征。梦见龙预示巨大的潜力、力量和好运。它可能表示一个重大的人生转变即将到来。' },
  { symbol_en: 'Bridge', symbol_zh: '桥', element: 'Metal',
    meaning_en: 'Bridges signify transitions, connections, and overcoming divisions. Crossing a bridge indicates progress; a broken bridge suggests obstacles in your path that require creative solutions.',
    meaning_zh: '桥象征过渡、连接和克服分歧。过桥代表进步；断桥暗示前路有障碍，需要创造性的解决方案。' },
];

const FIVE_ELEMENTS_IN_DREAMS: Record<string, { en: string; zh: string }> = {
  wood: { en: 'Wood dreams feature growth, plants, trees, forests. They indicate personal development, creativity, and the need for flexibility in your approach to life.', zh: '木性梦境以生长、植物、树木、森林为特征。它们预示个人发展、创造力以及在生活中需要灵活性。' },
  fire: { en: 'Fire dreams feature light, heat, flames, explosions. They indicate passion, transformation, anger, or spiritual illumination. Pay attention to what is being "burned away."', zh: '火性梦境以光、热、火焰、爆炸为特征。它们预示激情、转化、愤怒或精神启迪。注意什么正在被"烧掉"。' },
  earth: { en: 'Earth dreams feature soil, mountains, buildings, food. They indicate stability, nourishment, groundedness, or feeling stuck. They often relate to home, family, and physical wellbeing.', zh: '土性梦境以土壤、山、建筑、食物为特征。它们预示稳定、滋养、脚踏实地或感到困顿。通常与家庭、家人和身体健康相关。' },
  metal: { en: 'Metal dreams feature coins, knives, machines, jewelry. They indicate precision, cutting away the unnecessary, value assessment, or feeling sharp/edgy. Often relate to finance and boundaries.', zh: '金性梦境以钱币、刀、机器、珠宝为特征。它们预示精准、去除冗杂、价值评估或感到尖锐。常与财务和边界相关。' },
  water: { en: 'Water dreams feature rivers, oceans, rain, tears. They indicate emotions, intuition, the subconscious, and the flow of life. Pay attention to the quality and movement of water.', zh: '水性梦境以河流、海洋、雨、泪水为特征。它们预示情感、直觉、潜意识和生命的流动。注意水的质量和动态。' },
};

export default function DreamPage() {
  const [lang, setLang] = useLanguage();
  const isEn = lang === 'en';
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = search
    ? DREAM_SYMBOLS.filter(s =>
        (isEn ? s.symbol_en : s.symbol_zh).toLowerCase().includes(search.toLowerCase()))
    : DREAM_SYMBOLS;

  return (
    <>
      <div className="video-bg">
        <video autoPlay muted loop playsInline className="bg-video"><source src="/bg.mp4" type="video/mp4" /></video>
        <div className="video-overlay" />
      </div>
      <main className="min-h-screen relative z-10">
        <NavBar currentLang={lang} onLangChange={setLang} />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold gold-text text-center mb-2">{isEn ? '🌙 Dream Interpretation' : '🌙 解梦'}</h1>
          <p className="text-[#9b8e7a] text-center text-sm mb-8 max-w-lg mx-auto">
            {isEn ? 'Discover the hidden meanings behind your dreams' : '探索梦境背后的深层含义'}
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto mb-8">
            <input type="text"
              placeholder={isEn ? 'Search for a dream symbol... (e.g. water, snake, flying)' : '搜索梦境符号...（如：水、蛇、飞翔）'}
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#0f1117]/90 border border-[#1a1d2a] rounded-xl px-4 py-3 text-[#e8dcc8] text-sm placeholder-[#3a3528] focus:outline-none focus:border-[#d4af37]/40"/>
          </div>

          {/* Symbols grid */}
          <div className="grid md:grid-cols-2 gap-3 mb-12">
            {filtered.map((sym, i) => (
              <div key={i}
                className={`bg-[#0f1117]/70 border rounded-xl p-4 cursor-pointer transition-all ${
                  selected === (isEn ? sym.symbol_en : sym.symbol_zh)
                    ? 'border-[#d4af37]/40 shadow-[0_0_12px_rgba(212,175,55,0.08)]'
                    : 'border-[rgba(212,175,55,0.06)] hover:border-[rgba(212,175,55,0.15)]'
                }`}
                onClick={() => setSelected(selected === (isEn ? sym.symbol_en : sym.symbol_zh) ? null : (isEn ? sym.symbol_en : sym.symbol_zh))}
              >
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold gold-text">{isEn ? sym.symbol_en : sym.symbol_zh}</h3>
                  <span className="text-[10px] px-1.5 py-0.5 bg-[rgba(212,175,55,0.1)] text-[#f0d68a] rounded border border-[rgba(212,175,55,0.2)]">{sym.element}</span>
                </div>
                <p className="text-[#9b8e7a] text-xs leading-relaxed">
                  {selected === (isEn ? sym.symbol_en : sym.symbol_zh)
                    ? (isEn ? sym.meaning_en : sym.meaning_zh)
                    : (isEn ? 'Click to read interpretation' : '点击查看解读')}
                </p>
              </div>
            ))}
          </div>

          {/* Elements in dreams */}
          <div className="border-t border-[rgba(212,175,55,0.06)] pt-8">
            <h2 className="text-lg font-semibold gold-text text-center mb-6">{isEn ? 'Elements in Dreams' : '梦境五行'}</h2>
            <div className="grid md:grid-cols-5 gap-3">
              {Object.entries(FIVE_ELEMENTS_IN_DREAMS).map(([el, data], i) => (
                <div key={i} className="bg-[#0f1117]/60 border border-[rgba(212,175,55,0.06)] rounded-xl p-3 text-center">
                  <div className="text-lg mb-1">
                    {el === 'wood' ? '🌳' : el === 'fire' ? '🔥' : el === 'earth' ? '⛰️' : el === 'metal' ? '⚔️' : '💧'}
                  </div>
                  <p className="text-[#9b8e7a] text-[10px] leading-relaxed">{isEn ? data.en : data.zh}</p>
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
