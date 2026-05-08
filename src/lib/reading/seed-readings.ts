// ============================================================
// MysticSage - Seed Reading Generator (Offline)
// 离线解读生成器 - 不依赖 AI API，基于八字规则生成丰富报告
// ============================================================

import type { BaziResult, Element } from '../bazi/types';
import { STEM_NAMES, BRANCH_NAMES, STEM_ELEMENT } from '../bazi/constants';
import { getElementName } from '../bazi/elements';
import type { ReadingSections } from '../ai/interpretation';

// ===== 日主性格大全 =====
const PERSONALITY_BY_DAY_MASTER: Record<string, { en: string; zh: string }> = {
  '0': { // 甲木 (Yang Wood)
    en: 'You have the spirit of a great tree — upright, ambitious, and deeply principled. Like a towering pine, you naturally take the lead and inspire others with your vision. Your determination is your greatest strength, but remember that even the mightiest tree needs to bend in a storm. You are generous to a fault and expect the same loyalty in return.',
    zh: '你有大树的风骨——正直、有野心、有原则。你天生具有领导气质，像一棵挺拔的青松，总能在关键时刻站出来指引方向。你的坚定是你最大的优势，但要记住参天大树也需要在风暴中弯腰。你待人慷慨，也期望同样的忠诚回报。'
  },
  '1': { // 乙木 (Yin Wood)
    en: 'You flow through life like a graceful vine — adaptable, intuitive, and incredibly resilient. Where others see obstacles, you find ways to grow around them. Your emotional intelligence is your superpower; you read people and situations with uncanny accuracy. You thrive in nurturing roles and bring out the best in those around you.',
    zh: '你像一株优雅的藤蔓般在生活中婉转生长——适应力强、直觉敏锐、惊人的韧性。别人看到障碍的地方，你总能找到绕路生长的方式。你的情商是你的超能力，你能准确洞察人心与局势。你在滋养他人的角色中发光，总能激发出身边人最好的一面。'
  },
  '2': { // 丙火 (Yang Fire)
    en: 'You are the sun itself — warm, radiant, and impossible to ignore. Your presence lights up any room, and people naturally gravitate toward your energy. You have a gift for inspiring others and making them feel seen and valued. Your challenge is learning that not every day needs to be a blaze — sometimes the gentlest warmth leaves the deepest impression.',
    zh: '你就是太阳本身——温暖、耀眼、无法忽视。你的存在能照亮任何房间，人们自然而然地被你的能量吸引。你有一种让人感到被看见、被珍视的天赋。你的挑战是明白不是每一天都需要燃烧——有时最温柔的温度反而留下最深的印记。'
  },
  '3': { // 丁火 (Yin Fire)
    en: 'You are a candle flame in the darkness — delicate yet unwavering, illuminating the world with quiet grace. Your light is not the loudest, but it is the most meaningful. You have a remarkable ability to bring warmth to the coldest moments and clarity to the most confusing situations. Your intuition is finely tuned, and you see beauty where others see only shadows.',
    zh: '你是黑暗中的烛火——纤细却不灭，用安静的优雅照亮世界。你的光不是最夺目的，却是最有意义的。你有一种非凡的能力，能在最冷的时刻带来温暖，在最迷茫的时刻带来清明。你的直觉敏锐而细腻，能在别人看到阴影的地方发现美。'
  },
  '4': { // 戊土 (Yang Earth)
    en: 'You are the mountain — solid, dependable, and unshakeable. Your strength is not in flash, but in steadfastness. People rely on you because you are always there, uncomplaining and true. You build slowly but everything you construct is built to last. Your challenge is to remember that even mountains can be shaped by wind and water — allow yourself to be touched by life.',
    zh: '你是一座山——厚重、可靠、不可动摇。你的力量不在炫目，在于始终如一。人们依赖你，因为你总是在那里，不抱怨、不退缩。你建设得慢，但你建造的一切都经得起时间考验。你的挑战是要记得山也会被风和水改变形状——允许自己被生活触动。'
  },
  '5': { // 己土 (Yin Earth)
    en: 'You are fertile garden soil — patient, nurturing, and endlessly creative. You may not seek the spotlight, but without you, nothing beautiful would grow. You have a quiet strength that sustains families, teams, and communities. Your gift is in the details — you notice what others overlook and care about what others forget. The world needs more people like you.',
    zh: '你是肥沃的园土——耐心、滋养、充满创造力。你或许不追求聚光灯，但没有你，万物无法生长。你有一种安静的力量，滋养着家庭、团队和社群。你的天赋在细节中——你会留意别人忽视的，在乎别人遗忘的。这个世界需要更多像你这样的人。'
  },
  '6': { // 庚金 (Yang Metal)
    en: 'You are a finely forged blade — sharp, decisive, and made for action. When others hesitate, you cut through. Your mind is analytical, your will is unbreakable, and your sense of justice is fierce. You value truth above comfort and would rather face a hard reality than a comfortable lie. Your challenge is learning that not everything needs to be cut — some things need to be held with care.',
    zh: '你是一柄精铸的剑——锋利、果决、为行动而生。当别人犹豫时，你已经做出了决断。你的头脑是分析型的，意志不可动摇，正义感强烈。你视真相高于安逸，宁愿面对残酷的现实也不愿接受舒适的谎言。你的挑战是要明白不是所有东西都需要用剑刃去碰——有些东西需要温柔地捧在手心。'
  },
  '7': { // 辛金 (Yin Metal)
    en: 'You are a precious jewel — refined, elegant, and exceptionally rare. Your beauty is in your precision and your attention to quality. You have an eye for excellence that most people lack, and you are drawn to the finer things not out of vanity, but because you genuinely appreciate what is well-made. Your challenge is learning to find beauty in imperfection — for the most valuable pearls are born from irritation.',
    zh: '你是一颗珍宝——精致、优雅、极为稀有。你的美在于你的精准和对品质的追求。你有大多数人所不具备的卓越眼光，你被精致事物所吸引不是出于虚荣，而是因为你真正欣赏那些被用心打造的东西。你的挑战是学会在不完美中发现美——因为最珍贵的珍珠生于磨砺。'
  },
  '8': { // 壬水 (Yang Water)
    en: 'You are the ocean — vast, deep, and endlessly mysterious. Your emotions run as deep as the sea, and your wisdom is born from the tides of experience. You adapt to any container you are poured into, yet nothing can truly contain you. People are drawn to your depth, sensing that beneath your calm surface lies a universe of feeling and intuition.',
    zh: '你是浩瀚的海洋——广阔、深邃、充满神秘。你的情感如海一般深沉，你的智慧源于潮起潮落的人生经历。你可以被注入任何容器而改变形状，但没有什么能真正将你束缚。人们被你的深邃吸引，感觉到在你平静的表面下，蕴藏着情感与直觉的浩瀚宇宙。'
  },
  '9': { // 癸水 (Yin Water)
    en: 'You are gentle rain — soft, life-giving, and capable of changing the landscape without force. Your power is in your persistence; drips of water can wear down stone over time. You have a quiet, mysterious quality that intrigues others. Your intuition is almost psychic, and you often know things without being told. Trust this gift — it will never lead you astray.',
    zh: '你是温柔的雨——柔软、滋养生命，能以柔克刚改变大地。你的力量在于你的坚持：滴水穿石。你有一种安静而神秘的气质，让人忍不住想要了解。你的直觉近乎通灵，你常常在别人开口之前就已经知道了答案。相信这份天赋——它永远不会带你走错路。'
  }
};

// ===== 事业分析 =====
const CAREER_BY_ELEMENT: Record<string, { en: string; zh: string }> = {
  metal: {
    en: 'You are built for fields that require precision, discipline, and structure. Careers in finance, law, engineering, surgery, or technology suit your analytical mind. You excel when there are clear rules and measurable outcomes. In leadership, you are fair but firm — your team knows exactly where they stand with you.',
    zh: '你适合需要精准、纪律和结构的领域。金融、法律、工程、外科或技术行业适合你的分析型头脑。在有明确规则和可衡量结果的场景中你最为出色。在领导岗位上，你公正而坚定——你的团队清楚知道你对他们的期望。'
  },
  wood: {
    en: 'You thrive in creative and growth-oriented environments. Careers in education, design, writing, environmental work, or entrepreneurship allow you to express your natural creativity. You are a natural mentor and excel when helping others grow. Your leadership style is inspirational — you lead by example and empower others to find their own path.',
    zh: '你在创意和成长导向的环境中茁壮成长。教育、设计、写作、环保工作或创业领域能让你发挥与生俱来的创造力。你是天生的导师，在帮助他人成长时最为出色。你的领导风格是启发式的——以身作则，赋能他人找到自己的道路。'
  },
  water: {
    en: 'You flourish in roles that require emotional intelligence, communication, and adaptability. Careers in counseling, media, psychology, travel, diplomacy, or the arts allow your natural fluidity to shine. You are a bridge between worlds — able to understand perspectives that others cannot. Your leadership is intuitive and empathetic.',
    zh: '你在需要情商、沟通和适应能力的角色中如鱼得水。心理咨询、媒体、心理学、旅游、外交或艺术行业能让你天生的流动性发光。你是连接不同世界的桥梁——能够理解别人无法看到的视角。你的领导风格是直觉式和共情式的。'
  },
  fire: {
    en: 'You are destined for the spotlight. Careers in entertainment, sales, marketing, public speaking, politics, or any role that lets you inspire and energize others is where you belong. Your charisma is your currency. In leadership, you are a visionary — you paint a picture of the future so compelling that others cannot help but follow.',
    zh: '你注定属于聚光灯下。娱乐、销售、营销、演讲、政治或任何能让你激励和点燃他人的角色都是你的归宿。你的魅力就是你的货币。在领导岗位上，你是一位愿景家——你描绘的未来蓝图如此动人，让人忍不住跟随。'
  },
  earth: {
    en: 'Your strength lies in stability and nurturing. Careers in real estate, agriculture, hospitality, healthcare, education, or any role where you can build and sustain systems are ideal. You create foundations that others build their dreams upon. Your leadership is grounded and patient — you build trust slowly but unshakably.',
    zh: '你的优势在于稳定和滋养。房地产、农业、酒店、医疗、教育或任何你能建设和维持系统的角色都非常适合。你创造的基石是他人筑梦的基础。你的领导风格是务实而耐心的——你慢但不可动摇地建立信任。'
  }
};

// ===== 财富分析 =====
const WEALTH_BY_STRENGTH: Record<string, { strong: { en: string; zh: string }; weak: { en: string; zh: string } }> = {
  metal: {
    strong: {
      en: 'You have the potential for significant wealth accumulation through disciplined investment and strategic planning. Your sharp instincts help you identify opportunities others miss. The key for you is patience — your best financial returns will come from long-term plays, not quick wins.',
      zh: '你通过自律的投资和战略规划有积累可观财富的潜力。你敏锐的直觉帮助你发现别人错过的机会。对你来说关键是耐心——你最好的财务回报来自于长线布局，而非短线快钱。'
    },
    weak: {
      en: 'Your financial path is one of steady accumulation rather than sudden windfalls. Focus on building multiple streams of income and surrounding yourself with trustworthy financial advisors. Your wealth will grow most reliably through partnerships and collaborative ventures.',
      zh: '你的财运是稳步积累型的，而非暴富型。专注于建立多元收入来源，并让自己身边有值得信赖的财务顾问。你的财富通过合作和合伙经营会最为可靠地增长。'
    }
  },
  wood: {
    strong: {
      en: 'Your creativity is your greatest wealth engine. You have the rare ability to turn ideas into income. Focus on intellectual property, branding, and creating systems that generate passive income. Your financial growth comes from expansion — the more you give, the more returns.',
      zh: '你的创造力是你最大的财富引擎。你有将想法转化为收入的罕见能力。专注于知识产权、品牌建设和能产生被动收入的系统。你的财务增长来自于扩张——你给予得越多，回报也越多。'
    },
    weak: {
      en: 'Your financial journey is about planting seeds and nurturing them patiently. Avoid get-rich-quick schemes. Focus on what you know and love — your expertise will gradually become your most valuable asset. Collaboration with earth-element people can stabilize your finances.',
      zh: '你的财运之路是播种与耐心培育。远离快速致富的陷阱。专注于你知道和热爱的事情——你的专长将逐渐成为你最宝贵的资产。与土属性的人合作可以稳定你的财务状况。'
    }
  },
  water: {
    strong: {
      en: 'Your financial intuition is remarkable. You have a natural sense of timing — knowing when to move and when to wait. Invest in industries related to communication, travel, or technology. Your wealth will often come through unexpected channels — stay open to opportunities that seem unusual.',
      zh: '你的财务直觉非常出色。你有一种天生的时机感——知道何时行动、何时等待。投资于与沟通、旅行或技术相关的行业。你的财富往往通过意想不到的渠道到来——对看似不寻常的机会保持开放。'
    },
    weak: {
      en: 'Financial stability comes to you through flow rather than force. Work in environments that match your values, and money will follow naturally. Your best financial decisions are made when you trust your gut. Avoid high-risk investments and focus on liquid assets.',
      zh: '财务稳定是通过顺势而非强求来到你身边的。在符合你价值观的环境中工作，财富会自然而然地跟随你。你最好的财务决策是当你相信直觉时做出的。避免高风险投资，专注于流动资产。'
    }
  },
  fire: {
    strong: {
      en: 'You have a Midas touch when it comes to wealth creation. Your charisma and vision attract financial opportunities. Careers in sales, leadership, or entrepreneurship can bring substantial rewards. The key is to build systems that generate income while you focus on what you do best — inspiring and leading.',
      zh: '你在财富创造方面有点石成金的天赋。你的魅力和远见吸引着财务机会。销售、领导或创业领域能带来丰厚的回报。关键是要建立能自动产生收入的系统，这样你就可以专注于你最擅长的事情——激励和领导。'
    },
    weak: {
      en: 'Your financial growth is closely tied to your personal relationships and network. Nurture your connections — they will open doors that logic cannot. Avoid overextending yourself financially. Your wealth grows brightest when you are doing what you love with people you trust.',
      zh: '你的财务增长与你的人际关系和人脉网络密切相关。用心维护你的人际连接——它们会打开逻辑无法打开的门。避免过度扩张你的财务。当你和你信任的人一起做你热爱的事情时，你的财富会最为闪亮。'
    }
  },
  earth: {
    strong: {
      en: 'Your financial foundation is as solid as the earth itself. You build wealth slowly, methodically, and permanently. Real estate, land, and tangible assets are your natural domain. Your patience is your superpower — while others chase quick profits, you build an empire that lasts generations.',
      zh: '你的财务基础像大地一样坚实。你缓慢、有条理、持久地积累财富。房地产、土地和有形资产是你的天然领域。你的耐心是你的超能力——当别人追逐快钱时，你在建造可以传承几代人的基业。'
    },
    weak: {
      en: 'Financial security comes to you through service and reliability. Your reputation for being dependable will attract steady, loyal clients and opportunities. Focus on building a strong professional reputation — it is your most valuable financial asset.',
      zh: '财务安全感来自于服务与可靠。你值得信赖的声誉会吸引稳定、忠诚的客户和机会。专注于建立强大的职业声誉——这是你最宝贵的财务资产。'
    }
  }
};

// ===== 感情分析 =====
const RELATIONSHIP_BY_ELEMENT: Record<string, { en: string; zh: string }> = {
  metal: {
    en: 'In relationships, you value truth and loyalty above all else. You love deeply but carefully — your heart is a fortress that must be earned entry to. When you commit, you are unshakably loyal. Your challenge is to soften your edges in moments of conflict — love is not a battlefield to be won, but a garden to be tended together.',
    zh: '在感情中，你视真诚和忠诚高于一切。你爱得深沉但谨慎——你的心是一座必须赢得入场券才能进入的堡垒。一旦承诺，你便不可动摇地忠诚。你的挑战是在冲突时刻软化的你的棱角——爱不是需要赢得的战场，而是需要共同打理的园地。'
  },
  wood: {
    en: 'You are a romantic at heart, always seeking growth and connection. You give freely and expect your partner to grow alongside you. Your love language is acts of service and quality time. Your challenge is to accept people as they are, not as who you believe they could become.',
    zh: '你骨子里是一个浪漫主义者，始终在寻求成长和连接。你毫无保留地付出，期待你的伴侣能与你一同成长。你的爱的语言是实际的行动和高质量的陪伴。你的挑战是接纳人们本来的样子，而不是你相信他们可以成为的样子。'
  },
  water: {
    en: 'Your emotional depth in relationships is both your gift and your challenge. You feel everything profoundly — joy, sorrow, love, loss. You need a partner who can match your emotional intelligence and give you the space to process your feelings. Your challenge is learning to communicate your needs rather than expecting your partner to intuitively understand them.',
    zh: '你在感情中的情感深度既是你的天赋也是你的挑战。你深刻地感受一切——喜悦、悲伤、爱与失去。你需要一个能匹配你情商、给你空间处理情感的伴侣。你的挑战是学会表达你的需求，而不是期望伴侣凭直觉理解你。'
  },
  fire: {
    en: 'You bring passion and excitement to your relationships. When you love, you love with your whole being — intensely, generously, and without reservation. Your challenge is sustainability — the flame that burns brightest can also burn out fastest. Learn the art of steady warmth — it will bring you the lasting love you truly desire.',
    zh: '你为感情带来激情与活力。当你爱的时候，你用全部身心去爱——浓烈、慷慨、毫无保留。你的挑战是可持续性——烧得最旺的火也熄得最快。学会恒温的艺术——它将带给你真正渴望的持久之爱。'
  },
  earth: {
    en: 'You are the rock in your relationships — steady, dependable, and deeply caring. You show love through actions rather than words, building a life of stability and comfort for those you love. Your challenge is to express your feelings openly. Your partner needs to hear the words as much as they feel the actions.',
    zh: '你是感情中的磐石——稳定、可靠、发自内心地关怀。你用行动而非言语表达爱，为你所爱的人建立一个稳定、舒适的生活。你的挑战是开放地表达你的感受。你的伴侣需要听到那些话语，就像他们感受到那些行动一样。'
  }
};

// ===== 人生建议 =====
const ADVICE_BY_STRENGTH: { strong: { en: string; zh: string }; weak: { en: string; zh: string } } = {
  strong: {
    en: 'Your energy is abundant — use it wisely. The world may feel like it moves at your pace, but remember that true power lies in knowing when to act and when to be still. Practice restraint where you would normally push forward. Seek balance by embracing the elements that complement your nature. Your greatest growth will come from learning to listen as much as you lead.',
    zh: '你的能量充沛——请明智地使用它。世界可能感觉以你的节奏在运转，但记住真正的力量在于知道何时行动、何时静止。在你通常会推进的地方练习克制。通过拥抱补益你本命的五行来寻求平衡。你最大的成长将来自于学会像你领导一样去倾听。'
  },
  weak: {
    en: 'Your path is one of gathering, not forcing. Seek environments and people that nourish your spirit. You do not need to be the strongest voice in the room — your quiet wisdom will speak volumes when it finds the right audience. Nurture yourself first, then your energy will naturally flow outward. The elements that support your nature are your allies — surround yourself with them.',
    zh: '你的路是聚集而非强求的路。寻找那些滋养你心灵的环境和人。你不需要成为房间里最有分量的声音——当你找到对的听众时，你安静的智慧会胜过千言万语。先滋养自己，你的能量自然会向外流动。那些生助你的五行是你的盟友——让自己被它们围绕。'
  }
};

// ===== 幸运信息 =====
const LUCKY_INFO: Record<string, { en: { colors: string[]; numbers: string[]; directions: string[]; seasons: string[] }; zh: { colors: string[]; numbers: string[]; directions: string[]; seasons: string[] } }> = {
  metal: {
    en: { colors: ['White', 'Gold', 'Silver', 'Cream'], numbers: ['4', '9'], directions: ['West', 'Northwest'], seasons: ['Autumn'] },
    zh: { colors: ['白色', '金色', '银色', '米色'], numbers: ['4', '9'], directions: ['西方', '西北'], seasons: ['秋季'] },
  },
  wood: {
    en: { colors: ['Green', 'Teal', 'Turquoise'], numbers: ['3', '8'], directions: ['East', 'Southeast'], seasons: ['Spring'] },
    zh: { colors: ['绿色', '青色', '碧色'], numbers: ['3', '8'], directions: ['东方', '东南'], seasons: ['春季'] },
  },
  water: {
    en: { colors: ['Blue', 'Black', 'Navy', 'Dark Purple'], numbers: ['1', '6'], directions: ['North'], seasons: ['Winter'] },
    zh: { colors: ['蓝色', '黑色', '深蓝', '深紫'], numbers: ['1', '6'], directions: ['北方'], seasons: ['冬季'] },
  },
  fire: {
    en: { colors: ['Red', 'Purple', 'Pink', 'Orange'], numbers: ['2', '7'], directions: ['South'], seasons: ['Summer'] },
    zh: { colors: ['红色', '紫色', '粉色', '橙色'], numbers: ['2', '7'], directions: ['南方'], seasons: ['夏季'] },
  },
  earth: {
    en: { colors: ['Yellow', 'Brown', 'Beige', 'Terracotta'], numbers: ['5', '10'], directions: ['Center', 'Northeast', 'Southwest'], seasons: ['Late Summer'] },
    zh: { colors: ['黄色', '棕色', '米黄', '陶土色'], numbers: ['5', '10'], directions: ['中央', '东北', '西南'], seasons: ['季夏'] },
  }
};

// ===== 五行平衡建议 =====
function getBalanceAdvice(result: BaziResult, lang: 'en' | 'zh'): string {
  const isEn = lang === 'en';
  const topElement = Object.entries(result.elementScores)
    .sort(([, a], [, b]) => b - a)[0];
  const lowElement = Object.entries(result.elementScores)
    .sort(([, a], [, b]) => a - b)[0];

  const balanceTips: Record<string, { en: string; zh: string }> = {
    excess: {
      en: `Your strongest element is ${getElementName(topElement[0] as Element, 'en')} (${topElement[1]}%). This gives you great natural strength, but too much of one element creates imbalance. To harmonize, embrace ${getElementName(result.favorableElements[0], 'en')} energy — it will balance and refine your natural tendencies.`,
      zh: `你的${getElementName(topElement[0] as Element, 'zh')}最强（${topElement[1]}%）。这给了你强大的自然力量，但单一元素过旺会造成失衡。为了调和，请拥抱${getElementName(result.favorableElements[0], 'zh')}的能量——它将平衡和精炼你的天然倾向。`
    },
    deficiency: {
      en: `Your weakest element is ${getElementName(lowElement[0] as Element, 'en')} (${lowElement[1]}%). This is an area where you may face challenges or feel drained. Actively cultivate this element through its associated colors, seasons, and activities — it will bring greater balance and wholeness to your life.`,
      zh: `你的${getElementName(lowElement[0] as Element, 'zh')}最弱（${lowElement[1]}%）。这是一个你可能感到挑战或能量不足的领域。主动通过对应的颜色、季节和活动来培养这个元素——它将为你的生活带来更大的平衡和完整。`
    }
  };

  return balanceTips[result.isStrong ? 'excess' : 'deficiency'][lang];
}

// ===== 主函数：生成完整解读 =====
export function generateSeedReading(result: BaziResult, lang: 'en' | 'zh'): ReadingSections {
  const isEn = lang === 'en';
  const dayMasterKey = String(result.dayMaster);
  const dayMasterEl = result.dayMasterElement as string;
  const strengthKey = result.isStrong ? 'strong' : 'weak';

  // 1. 性格
  const personality = PERSONALITY_BY_DAY_MASTER[dayMasterKey]?.[lang] || 
    (isEn ? 'Your personality is as unique as your birth chart. Each of the Five Elements flows through you in its own measure, creating a character that is one of a kind.' :
    '你的性格和你的命盘一样独一无二。五行以各自的比例在你体内流动，构成了独一无二的性格。');

  // 2. 事业
  const career = CAREER_BY_ELEMENT[dayMasterEl]?.[lang] ||
    (isEn ? 'Your career path is shaped by your Day Master element. Embrace roles that align with your natural energy.' :
    '你的事业之路由你的日主五行塑造。拥抱与你的自然能量一致的角色。');

  // 3. 财富
  const wealthData = WEALTH_BY_STRENGTH[dayMasterEl];
  const wealth = wealthData?.[strengthKey]?.[lang] ||
    (isEn ? 'Your financial journey is uniquely yours. Build patiently and trust your instincts.' :
    '你的财务之路是独一无二的。耐心建设，相信你的直觉。');

  // 4. 感情
  const relationships = RELATIONSHIP_BY_ELEMENT[dayMasterEl]?.[lang] ||
    (isEn ? 'Your approach to relationships is shaped by your elemental nature. Be authentic and open.' :
    '你的感情方式由你的五行本质塑造。保持真实和开放。');

  // 5. 人生建议
  const adviceData = ADVICE_BY_STRENGTH[strengthKey];
  const baseAdvice = adviceData?.[lang] || '';
  const balanceTip = getBalanceAdvice(result, lang);
  const advice = `${baseAdvice}\n\n${balanceTip}`;

  return { personality, career, wealth, relationships, advice };
}

// ===== 生成幸运信息 =====
export function getLuckyInfo(result: BaziResult, lang: 'en' | 'zh') {
  const el = result.dayMasterElement as string;
  const info = LUCKY_INFO[el]?.[lang] || { colors: [], numbers: [], directions: [], seasons: [] };
  return info;
}
