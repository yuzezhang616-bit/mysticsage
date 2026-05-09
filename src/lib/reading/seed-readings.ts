// ============================================================
// MysticSage - Seed Reading Generator v2 (Rich Content)
// 离线解读生成器 v2 - 丰富的多维命理分析
// ============================================================

import type { BaziResult, Element } from '../bazi/types';
import { STEM_NAMES, BRANCH_NAMES, STEM_ELEMENT } from '../bazi/constants';
import { getElementName } from '../bazi/elements';
import type { ReadingSections } from '../ai/interpretation';

// ===== Helper =====
function s(k: string, el: string): string { return `${k}-${el}`; }

// ===== 日主性格大全（扩充版）=====
const PERSONALITY: Record<string, { en: string; zh: string }> = {
  '0': {
    en: 'You are born under the sign of the Great Tree — upright, ambitious, and deeply principled. Like a towering pine reaching for the sky, you naturally command respect and inspire others through your unwavering vision. Your determination is remarkable; once you set a goal, nothing can easily sway you.\n\nYour leadership comes naturally, not through force but through presence. People look to you in times of uncertainty because you project stability and clarity. However, like the mightiest tree, you must learn to bend in the storm — rigidity, even noble rigidity, can lead to breaking when the winds of change blow too hard.\n\nYou are generous to a fault, often giving more than you receive. This is your nobility, but also your vulnerability. Learn to discern who deserves your loyalty, for not every garden is worthy of your deepest roots.',
    zh: '你生于大树之命——正直、有抱负、原则分明。你如同一棵挺拔的青松直冲云霄，自然令人尊敬，用你不可动摇的远见激励着周围的人。你的决心令人叹服；一旦定下目标，几乎没有东西能轻易动摇你。\n\n你的领导力是天然的，不是通过强力而是通过存在感来展现。人们在不确定的时刻看向你，因为你散发出稳定和清晰。然而，如同最强大的树木，你必须学会在风暴中弯腰——固执，即使是高贵的固执，也可能在变革之风吹得太猛烈时导致断裂。\n\n你慷慨得近乎缺心眼，常常付出多于所得。这是你的高贵之处，也是你的软肋。学会辨别谁值得你的忠诚，因为并非每一座花园都配得上你最深扎的根。'
  },
  '1': {
    en: 'You flow through life like a graceful vine — adaptable, intuitive, and incredibly resilient. Where others see obstacles, you find creative ways to grow around them. Your emotional intelligence is your greatest gift; you read people and situations with an accuracy that sometimes surprises even yourself.\n\nYour strength lies in connection. You weave people together, building networks of relationships that sustain and nurture everyone involved. In a world that often rewards loudness, your quiet persistence is a superpower. You may not always be noticed, but you are always felt.\n\nThe vine\'s challenge is knowing what to cling to. Not every structure is strong enough to support your growth. Choose your foundations wisely — your future self will thank you for not wasting your energy on hollow supports.',
    zh: '你像一株优雅的藤蔓般在生活中婉转生长——适应力强、直觉敏锐、惊人的韧性。别人看到障碍的地方，你总能找到绕路生长的创意方式。你的情商是你最珍贵的礼物；你能以有时连自己都惊讶的准确度洞察人心与局势。\n\n你的力量在于连接。你将人们编织在一起，建立起滋养所有人的关系网络。在一个经常奖赏喧闹的世界里，你安静的坚持是一种超能力。你也许不总是被注意到，但你总是被感受到。\n\n藤蔓的挑战在于知道该攀附什么。并非每一种结构都足够坚固来支撑你的成长。明智地选择你的根基——未来的你会感谢你没有把精力浪费在空洞的支撑上。'
  },
  '2': {
    en: 'You are the Sun — warm, radiant, and impossible to ignore. Your presence lights up any room, and people naturally gravitate toward your energy like flowers turning toward the morning light. You have a rare and precious gift for making others feel seen, valued, and alive. Your enthusiasm is contagious, and your optimism can move mountains.\n\nLife has given you the gift of charisma, and with it comes the responsibility to warm rather than to burn. Your natural brightness can sometimes overwhelm those who are more sensitive — learn to modulate your fire, to let others shine alongside you rather than in your shadow.\n\nThe sun does not question its right to shine, and neither should you. But remember: even the sun rests below the horizon. Your challenge is learning that not every day needs to be a blaze. Sometimes the gentlest warmth — a quiet word, a patient ear — leaves the deepest impression on the human heart.',
    zh: '你是太阳——温暖、耀眼、无法忽视。你的存在能照亮任何房间，人们自然而然地被你的能量吸引，如同花朵朝向晨光。你有一种稀有的天赋，能让他人感到被看见、被珍视、充满活力。你的热情具有感染力，你的乐观可以移山倒海。\n\n生命赋予了你魅力的礼物，随之而来的是温暖他人而非灼伤他人的责任。你天生的光芒有时会让敏感之人感到压迫——学会调节你的火焰，让他人能在你身边同样发光，而不只是在你的阴影之下。\n\n太阳从不质疑自己照耀的权利，你也不应该。但请记住：即使太阳也会沉入地平线以下。你的挑战在于明白并非每一天都需要燃烧。有时最温柔的暖意——一句轻声的话语，一双耐心的耳朵——反而在人心深处留下最深的印记。'
  },
  '3': {
    en: 'You are a candle flame in the darkness — delicate yet unwavering, illuminating the world with quiet grace. Your light is not the loudest, but it is the most intimate and meaningful. You have a remarkable ability to bring warmth to the coldest moments and clarity to the most confusing situations.\n\nYour intuition is finely tuned to frequencies others cannot hear. You sense the undercurrents, the unspoken words, the truths that hide between sentences. This makes you a natural confidant — people trust you with their deepest selves because they sense that you hold their stories with care.\n\nThe candle burns steadily when protected, but flickers when exposed to harsh winds. Guard your inner flame fiercely. Not every opinion needs to affect you, not every storm needs to reach your heart. Trust in your quiet strength — it has carried humanity through the darkest ages, and it will carry you through yours.',
    zh: '你是黑暗中的烛火——纤细而不灭，用安静的优雅照亮世界。你的光不是最夺目的，却是最亲密、最有意义的。你有一种非凡的能力，能在最冷的时刻带来温暖，在最迷茫的时刻带来清明。\n\n你的直觉调谐到别人无法感知的频率。你能察觉到暗流、未说出口的话语、藏匿在字里行间的真相。这让你成为天生的倾诉对象——人们用最真实的自己信任你，因为他们感觉到你会用心守护他们的故事。\n\n烛火在受保护时燃烧得稳定，但暴露于狂风时会摇曳不定。守护你的内在之火，不要让每个声音都影响你，不要让每场风雨都触及你的心。相信你安静的力量——它曾陪伴人类度过最黑暗的时代，也将伴你走过你的人生。'
  },
  '4': {
    en: 'You are the mountain — solid, dependable, and unshakeable. Your strength is not in flash or speed, but in steadfastness. While others rush and burn out, you endure. People rely on you because you are always there — uncomplaining, steady, and true. You are the foundation upon which families, teams, and communities are built.\n\nYou build slowly, but everything you construct is built to last. Your patience is legendary; you understand what others often forget — that the deepest roots grow slowly, that the strongest structures take time to rise. You are not impressed by quick wins or fleeting trends.\n\nYet even mountains can be shaped by wind and water over time. Your challenge, if you will accept it, is to allow yourself to be touched by life\'s softer forces. Let yourself feel deeply, let yourself be moved. To be strong does not mean to be hard. The most majestic mountains are those that have been carved by rivers, shaped by glaciers, weathered by time — and they are even more beautiful for it.',
    zh: '你是一座山——厚重、可靠、不可动摇。你的力量不在于炫目或速度，而在于始终如一。当别人匆忙奔波然后耗尽，你坚持着。人们依赖你，因为你总是在那里——不抱怨，不退缩，始终如一。你是家庭、团队和社群得以建立的基石。\n\n你建设得慢，但你建造的一切都经得起时间的考验。你的耐心是传奇般的；你明白别人常常忘记的道理——最深的根长得最慢，最坚固的结构需要时间来筑起。你对速成的胜利或转瞬即逝的潮流不为所动。\n\n然而，山也会被风和水的力量塑造。你的挑战，如果你愿意接受的话，是允许自己被生命中柔软的力量所触动。让自己深刻地感受，让自己被打动。强大并不意味着坚硬。最巍峨的山脉恰恰是被河流雕琢、被冰川塑造、被岁月风化的那些——而它们因此而更加壮美。'
  },
  '5': {
    en: 'You are fertile garden soil — patient, nurturing, and endlessly creative. You may not seek the spotlight, but without you, nothing beautiful would grow. You have a quiet strength that sustains families, teams, communities, and dreams. You are the reason other people bloom.\n\nYour gift is in the details. You notice what others overlook — the slight change in a friend\'s tone, the small opportunity hiding in a problem, the beauty in an ordinary moment. You care about what others forget, and this makes you irreplaceable in the lives of those who know you.\n\nThe soil\'s challenge is remembering its own worth. You give so much to others that you may forget to nourish yourself. But a garden that depletes its soil will eventually bear no fruit. Tend to your own spirit with the same devotion you give to others. You cannot pour from an empty vessel — fill yourself first, so that your generosity flows from abundance, not from depletion.',
    zh: '你是肥沃的园土——耐心、滋养、充满创造力。你可能不追求聚光灯，但没有你，万物无法生长。你有一种安静的力量，滋养着家庭、团队、社群和梦想。你是别人得以绽放的原因。\n\n你的天赋在细节中。你会留意别人忽略的东西——朋友语调中的细微变化、隐藏于问题中的小机遇、平凡时刻中的美。你在乎别人遗忘的东西，这使得你在认识你的人的生活中不可替代。\n\n土壤的挑战在于记住自身的价值。你给予了别人太多，以至于可能忘记滋养自己。但耗尽土壤的花园终将无法结果。用你给予他人的同样心力去照料自己的灵魂。你无法从空杯中倒出东西——先装满自己，这样你的慷慨才能源于丰盛，而非耗竭。'
  },
  '6': {
    en: 'You are a finely forged blade — sharp, decisive, and made for action. When others hesitate, you cut through the noise with clarity and purpose. Your mind is analytical, your will is unbreakable, and your sense of justice burns like fire. You value truth above comfort and would rather face a hard reality than accept a comfortable lie.\n\nYou are built for challenges. Adversity does not discourage you — it sharpens you. Every obstacle is a whetstone for your spirit. In times of crisis, when others scatter or freeze, you step forward. Your courage is not the absence of fear; it is the mastery of it.\n\nBut a blade that is always drawn is a blade that will eventually dull. Your greatest challenge — and your greatest opportunity for growth — is learning that not everything needs to be cut. Some things require patience, not force. Some situations call for a gentle touch, not a sharp edge. The mightiest warriors know when to sheathe their swords and extend an open hand.',
    zh: '你是一柄精铸的剑——锋利、果决、为行动而生。当别人犹豫时，你以清晰和目标感劈开噪音。你的头脑是分析型的，意志不可动摇，你的正义感像火焰一样燃烧。你视真相高于安逸，宁愿面对残酷的现实也不愿接受舒适的谎言。\n\n你为挑战而生。逆境不会让你气馁——它只会让你更加锋利。每一个障碍都是磨砺你精神的磨刀石。在危机时刻，当别人四散奔逃或僵在原地时，你挺身而出。你的勇气不是没有恐惧，而是对恐惧的掌控。\n\n但一把常出鞘的剑终会变钝。你最大的挑战——也是你最大的成长机会——是学会并非所有东西都需要用刀锋去碰。有些事情需要耐心，而非力量。有些情况需要温柔的触碰，而非锐利的边缘。最强大的战士知道何时收剑入鞘，何时伸出张开的手掌。'
  },
  '7': {
    en: 'You are a precious jewel — refined, elegant, and exceptionally rare. Your beauty lies in your precision and your unwavering commitment to quality. You have an eye for excellence that most people lack; you are drawn to the finer things not out of vanity, but because you genuinely appreciate what is crafted with care and intention.\n\nYou hold yourself to high standards, and this is both your gift and your burden. Your refined nature allows you to create beauty in everything you touch, but it can also make you critical — of yourself and of others. Learn to distinguish between excellence and perfection. The former is noble; the latter is a cage.\n\nCultivate the wisdom to see beauty in imperfection. The most precious gems are not flawless — they are unique. Their value comes from their character, their history, their journey through pressure and time. Like them, your imperfections are not weaknesses. They are the markings of a life fully lived, a spirit truly refined.',
    zh: '你是一颗珍宝——精致、优雅、极为稀有。你的美在于你的精准和对品质的不懈追求。你有大多数人不具备的卓越眼光；你被精致事物吸引不是出于虚荣，而是你真正欣赏那些用心和用意打造的东西。\n\n你对自己要求很高，这既是你的天赋也是你的负担。你精致的本性让你能在你触及的一切中创造美，但它也会让你挑剔——对自己，也对他人。学会区分卓越和完美。前者是高贵的追求；后者是自我的牢笼。\n\n培养在不完美中发现美的智慧。最珍贵的宝石并非毫无瑕疵——它们是独一无二的。它们的价值来自它们的特性、它们的历史、它们在压力和岁月中的旅程。像它们一样，你的不完美不是弱点。它们是充分活过的人生的印记，是真正被精炼过的灵魂的证明。'
  },
  '8': {
    en: 'You are the ocean — vast, deep, and endlessly mysterious. Your emotions run as deep as the sea, and your wisdom is born from the tides of experience. You can adapt to any container you are poured into, yet nothing can truly contain you. Your depth draws people in, and beneath your calm surface lies a universe of feeling and intuition.\n\nYour gift is your emotional and spiritual depth. You feel what others cannot articulate. You understand what others cannot explain. Your empathy is not a surface-level kindness — it is a profound attunement to the human condition. This makes you a natural healer, counselor, and guide.\n\nThe ocean\'s challenge is its vastness — with such depth comes the risk of being overwhelmed by your own emotions. Establish boundaries as shores define the sea. Not every current needs to carry you; not every wave needs to move you. Learn to observe the storms within without being consumed by them. The ocean is both powerful and peaceful — you can be too.',
    zh: '你是浩瀚的海洋——广阔、深邃、充满神秘。你的情感如海一般深沉，你的智慧源于潮起潮落的人生经历。你可以适应任何盛放你的容器，但没有什么能真正将你束缚。你的深邃吸引着人们，而在你平静的表面下，蕴藏着情感与直觉的浩瀚宇宙。\n\n你的天赋在于你的情感和精神深度。你感受到别人无法言说的东西。你理解别人无法解释的东西。你的同理心不是表面的善意的——它是对人类处境的深刻调谐。这让你成为天生的疗愈者、咨询师和指引者。\n\n海洋的挑战在于它的广阔——如此深度的代价是被自己情绪淹没的风险。建立边界，就像海岸定义了大海。并非每一道洋流都需要承载你；并非每一波浪潮都需要触动你。学会观察内心的风暴而不被其吞噬。海洋既强大又宁静——你也可以如此。'
  },
  '9': {
    en: 'You are gentle rain — soft, life-giving, and capable of changing the landscape without force. Your power is in your persistence. Drips of water can wear down stone over time, and your steady presence transforms everything it touches. You do not demand attention, yet the world is greener because of you.\n\nYour intuition is almost psychic. You often know things without being told, sense truths before they are spoken. This gift connects you to a deeper wisdom that most people cannot access. Trust it — it will never lead you astray. Your quiet mystique intrigues others, drawing them toward you without you having to try.\n\nThe rain\'s challenge is invisibility — your contributions are so natural, so seamlessly woven into the fabric of life, that people may forget to acknowledge them. Learn to honor your own worth even when others do not see it. Your softness is not weakness; it is the most powerful force in nature. Water shapes the grandest canyons, nourishes the tallest trees, and sustains all life. So do you.',
    zh: '你是温柔的雨——柔软、滋养生命，能以柔克刚改变大地。你的力量在于你的坚持。水滴石穿，你稳定的存在改变着它所触及的一切。你不寻求关注，但世界因你而更加翠绿。\n\n你的直觉近乎通灵。你常常在被告知之前就知道了答案，在话语说出之前就感知到了真相。这份天赋将你连接到大多数人无法触及的深层智慧。相信它——它永远不会带你走错路。你安静的神秘气质引人入胜，无需刻意就吸引着人们靠近。\n\n雨的挑战在于隐形的——你的贡献如此自然、如此无缝地融入生活的肌理，以至于人们可能忘记去认可它们。学会认可自己的价值，即使他人未能看见。你的柔软不是软弱；它是自然界中最强大的力量。水塑造了最宏伟的峡谷，滋养了最高的树木，维系着所有生命。你也一样。'
  }
};

// ===== 事业分析（扩充版）=====
const CAREER: Record<string, { en: string; zh: string }> = {
  metal: {
    en: 'Your sharp, analytical mind is suited for fields where precision and structure are paramount. You excel in finance, law, engineering, surgery, and technology — careers that reward discipline and clear thinking. You have a natural talent for systems and processes; you see the architecture beneath the surface of any organization.\n\nIn the workplace, you are known for your integrity and high standards. You do not cut corners, and you expect the same from others. This earns you respect, though sometimes at the cost of being seen as rigid. Learn to balance your precision with flexibility — the best systems are those that can adapt.\n\nYour leadership style is firm but fair. Your team always knows where they stand with you, and this clarity is a gift. You lead by example, never asking others to do what you would not do yourself. When you learn to temper your directness with empathy, you become not just a competent leader, but an unforgettable one.',
    zh: '你敏锐的分析头脑适合那些精准和结构至上的领域。你在金融、法律、工程、外科和技术行业中表现出色——这些职业奖赏纪律和清晰的思维。你天生擅长系统和流程；你能看到任何组织表面之下的架构。\n\n在职场中，你以正直和高标准著称。你不走捷径，也期望别人如此。这为你赢得尊重，尽管有时也会被视为刻板。学会在精准和灵活性之间取得平衡——最好的系统是那些能够适应的系统。\n\n你的领导风格坚定而公正。你的团队始终知道你在他们面前的立场，这种清晰本身就是一种礼物。你以身作则，从不要求别人做你自己不会做的事情。当你学会用同理心调和你的直接时，你不仅是一个称职的领导者，更是一个令人难忘的领导者。'
  },
  wood: {
    en: 'You thrive in creative and growth-oriented environments where innovation is valued. Careers in education, design, writing, environmental work, entrepreneurship, and the arts allow your natural creativity to flourish. You are not suited for rigid, bureaucratic structures — your spirit needs room to grow.\n\nYour gift is seeing potential where others see limitations. You can take a small seed of an idea and nurture it into something substantial. This makes you a natural entrepreneur and innovator. You are a mentor at heart — you find deep fulfillment in helping others grow and realize their own potential.\n\nAs a leader, you lead by inspiration rather than command. You create vision and empower others to find their own path toward it. Your team does not follow you because they have to — they follow because you make them believe in the journey. Your idealism is contagious; protect it from the cynicism of the world.',
    zh: '你在重视创新的创意和成长型环境中蓬勃发展。教育、设计、写作、环保工作、创业和艺术领域让你与生俱来的创造力得以绽放。你不适合僵化、官僚的结构——你的灵魂需要成长的空间。\n\n你的天賦在于在别人看到限制的地方看到潜力。你可以把一个想法的微小种子培育成实实在在的东西。这使你成为天生的创业者和创新者。你骨子里是一位导师——在帮助他人成长和实现自身潜力的过程中找到深深的满足感。\n\n作为领导者，你通过启发而非命令来引领。你创造愿景，并赋能他人找到自己的道路去实现它。你的团队跟随你不是因为他们必须——他们跟随你是因为你让他们相信这段旅程。你的理想主义具有感染力；保护好它，不要让世界的犬儒主义侵蚀它。'
  },
  water: {
    en: 'You flourish in roles that require emotional intelligence, communication, and adaptability. Careers in counseling, media, psychology, travel, diplomacy, the arts, or any role that connects people and ideas are where you shine. You are a bridge between worlds — able to understand perspectives that others cannot.\n\nYour fluid nature allows you to navigate complex social and professional landscapes with grace. You are a natural negotiator and diplomat; you find common ground where others see only division. Your intuition guides you to the right opportunity at the right time.\n\nIn leadership, you lead through empathy and understanding. You sense the mood of your team before they articulate it, and you address issues before they become crises. Your challenge is making decisions when your empathetic nature wants to please everyone. Remember that clear direction is also a form of kindness — sometimes the leader must choose the path, not just feel the uncertainty.',
    zh: '你在需要情商、沟通能力和适应力的角色中如鱼得水。心理咨询、媒体、心理学、旅游、外交、艺术或任何连接人与思想的领域都是你发光的舞台。你是连接不同世界的桥梁——能理解别人无法企及的视角。\n\n你流动的本性让你能优雅地驾驭复杂的社会和职业环境。你是天生的谈判者和外交家；你能在别人只看到分歧的地方找到共同点。你的直觉指引你在对的时间遇到对的机会。\n\n在领导岗位上，你通过共情和理解来引领。你在团队表达之前就感受到他们的情绪，在问题变成危机之前就着手处理。你的挑战是在你的同理心想取悦所有人时做出决策。记住，明确的方向也是一种善意——有时领导者必须选出一条路，而不是仅仅感受不确定性。'
  },
  fire: {
    en: 'You are destined for the spotlight. Careers in entertainment, sales, marketing, public speaking, politics, event planning, or any role that lets you inspire, energize, and move people is where you belong. Your charisma is your currency; your ability to captivate an audience is a rare and valuable gift.\n\nYou have a natural talent for turning vision into action. You inspire momentum — when you commit to a project, things happen quickly. Your enthusiasm lifts entire teams, and your energy is often the difference between a good idea and a successful one.\n\nAs a leader, you are a visionary. You paint a picture of the future so compelling that others cannot help but follow. Your challenge is sustainability — the fire that burns brightest must also be tended most carefully. Build structures that support your vision so that your legacy outlasts your presence. Not every day needs to be a performance; sometimes the greatest leaders are those who listen, observe, and cultivate from the quiet background.',
    zh: '你注定属于聚光灯下。娱乐、销售、营销、公共演讲、政治、活动策划或任何能让你激励、点燃和打动他人的角色都是你的归宿。你的魅力就是你的货币；你吸引观众的能力是稀有而珍贵的礼物。\n\n你有天生的将愿景转化为行动的能力。你激发势头——当你投入一个项目时，事情迅速推进。你的热情能带动整个团队，你的能量往往是好想法和成功想法之间的区别。\n\n作为领导者，你是一个愿景家。你描绘的未来蓝图如此动人，让人无法不跟随。你的挑战在于可持续性——燃烧最旺的火也需要最细心的照料。建立支持你愿景的结构，这样你的遗产将超越你的在场。并非每一天都需要是一场表演；有时最伟大的领导者是那些倾听、观察、在安静的背景中耕耘的人。'
  },
  earth: {
    en: 'Your strength lies in stability, nurturing, and building lasting value. Careers in real estate, agriculture, hospitality, healthcare, education, construction, or any role where you can build and sustain systems are ideal. You create the foundations that others build their dreams upon.\n\nYour professional reputation is built on reliability. You deliver what you promise, on time and with quality. In a world of shortcuts and quick fixes, your commitment to thoroughness sets you apart. Clients and colleagues trust you implicitly because you have earned that trust through consistent action.\n\nAs a leader, you lead through grounded wisdom and patience. You do not make rash decisions or chase trends. Your team feels safe under your guidance because they know you have considered every angle. Your challenge is to avoid becoming too comfortable with the status quo. The most stable foundations are those that can also evolve. Allow yourself to innovate within your stability — it will make you unstoppable.',
    zh: '你的优势在于稳定、滋养和建立持久的价值。房地产、农业、酒店、医疗、教育、建筑或任何你能建设和维持系统的角色都非常适合。你创造的基石是他人筑梦的基础。\n\n你的职业声誉建立在可靠之上。你按时、保质交付你所承诺的。在一个充满捷径和速成方案的世界里，你对彻底的坚持让你与众不同。客户和同事毫无保留地信任你，因为你通过始终如一的行动赢得了那份信任。\n\n作为领导者，你通过脚踏实地和耐心来引领。你不做仓促的决定，也不追逐潮流。你的团队在你的指导下感到安全，因为他们知道你已经考虑了每一个角度。你的挑战是避免对现状过于安逸。最稳定的地基也是那些可以进化的地基。允许自己在稳定中创新——那将让你势不可挡。'
  }
};

// ===== 财运分析（扩充版）=====
const WEALTH: Record<string, { strong: { en: string; zh: string }; weak: { en: string; zh: string } }> = {
  metal: {
    strong: {
      en: 'Your wealth potential is substantial. Your sharp instincts allow you to identify financial opportunities that others miss — you see patterns in markets, understand timing, and know when to act. Your disciplined nature is your greatest financial asset.\n\nThe key to your financial success is patience. Your best returns will come from long-term investments and strategic plays rather than quick gains. Real estate, precious metals, and established companies align with your nature. You are a builder of wealth, not a gambler.\n\nGuard against excessive rigidity in your financial planning. The most successful investors know when to adapt their strategy. Trust your analysis but remain open to new information. Your wealth grows when your discipline is tempered with calculated flexibility.',
      zh: '你的财富潜力巨大。你敏锐的直觉让你能发现别人错过的财务机会——你能看到市场中的模式，理解时机，知道何时行动。你自律的本性是你最大的财务资产。\n\n你财务成功的关键是耐心。你的最佳回报来自长线投资和战略布局，而非短期快钱。房地产、贵金属和成熟企业与你的本性相合。你是财富的建造者，而非赌徒。\n\n提防财务规划中过于僵化的倾向。最成功的投资者知道何时调整策略。相信你的分析，但对新信息保持开放。当你的自律与灵活布局相结合时，你的财富将稳健增长。'
    },
    weak: {
      en: 'Your financial path is one of steady accumulation — the tortoise, not the hare. Focus on building multiple streams of income and collaborative ventures. Your wealth grows most reliably through partnerships and teamwork, where your analytical skills complement others\' strengths.\n\nSurround yourself with trustworthy financial advisors. Your greatest asset is your reputation for integrity — protect it fiercely. Opportunities will come to you through your network and through your consistent demonstration of reliability.\n\nAvoid high-risk speculative investments. Your financial security comes from slow, deliberate building. Every small step compounds over time. Be patient with yourself — wealth built slowly is wealth that lasts.',
      zh: '你的财富之路是稳步积累型——龟兔赛跑中的乌龟，而非兔子。专注于建立多元收入来源和合作项目。你的财富通过合伙经营和团队协作最可靠地增长，你的分析能力与他人的长处形成互补。\n\n让自己身边有值得信赖的财务顾问。你最大的资产是你正直的声誉——坚定地保护它。机会将通过你的人脉网络和你一贯可靠的表现为你而来。\n\n远离高风险投机。你的财务安全感来自缓慢、审慎的建设。每一小步都会随着时间复利增长。对自己有耐心——缓慢积累的财富才是持久的财富。'
    }
  },
  wood: {
    strong: {
      en: 'Your creativity is your greatest wealth engine. You have the rare ability to turn ideas into income, visions into value. Your financial growth comes from expansion — intellectual property, branding, publishing, and creative ventures align with your nature.\n\nFocus on building systems that generate passive income. Your ideas are abundant; your challenge is execution and scaling. Partner with those who have complementary strengths — let others handle the details while you focus on vision.\n\nThe more you give, the more returns you receive. This is not just a spiritual truth — it is your financial reality. Generosity, in your case, is a strategy. Build abundance by sharing abundance. Your wealth ecosystem thrives on circulation, not hoarding.',
      zh: '你的创造力是你最大的财富引擎。你有将想法转化为收入、将愿景转化为价值的罕见能力。你的财务增长来自扩张——知识产权、品牌建设、出版和创意事业与你的本性相合。\n\n专注于建立能产生被动收入的系统。你的想法丰富；你的挑战在于执行和规模化。与有互补优势的人合作——让别人处理细节，你专注于愿景。\n\n你给予得越多，回报也越多。这不仅是一个精神真理——这是你的财务现实。慷慨，对你而言，是一种策略。通过分享丰盛来建立丰盛。你的财富生态系统在流通中繁荣，而非在囤积中。'
    },
    weak: {
      en: 'Your financial journey is one of planting seeds and nurturing them with patience. Avoid get-rich-quick schemes — they are not aligned with your nature. Focus on what you know and love; your expertise will gradually become your most valuable financial asset.\n\nCollaboration is essential for your financial growth. Partner with earth-element individuals who can provide the stability and structure your creative energy needs. Together, you form a complete financial picture.\n\nTrust in organic growth. Your finances may start small, but they will grow steadily if you remain consistent. Nurture your talents, invest in your education, and build your reputation. These intangible assets will eventually translate into tangible wealth.',
      zh: '你的财富之路是播种与耐心培育。远离快速致富的陷阱——它们与你的本性不合。专注于你知道和热爱的事情；你的专长将逐渐成为你最宝贵的财务资产。\n\n合作对你的财务增长至关重要。与土属性的伙伴合作，他们能提供你的创意能量所需的稳定性和结构。你们一起构成完整的财务图景。\n\n相信有机生长。你的财富可能从小处开始，但只要你保持持续，它会稳步增长。培养你的才能，投资于教育，建立你的声誉。这些无形资产最终将化为有形财富。'
    }
  },
  water: {
    strong: {
      en: 'Your financial intuition is remarkable. You have a natural sense of timing — knowing when to move and when to wait, when to invest and when to withdraw. This instinct, honed by your deep emotional intelligence, is your greatest financial advantage.\n\nYour wealth often arrives through unexpected channels — opportunities that seem unusual or unconventional often turn out to be your golden tickets. Stay open, stay curious. Invest in industries related to communication, travel, technology, and the arts.\n\nManage your natural tendency toward fluctuation. Create financial anchors — stable investments that ground your portfolio — while allowing a portion of your wealth to flow freely with opportunities. Balance between security and exploration is your key to lasting prosperity.',
      zh: '你的财务直觉非常出色。你有一种天生的时机感——知道何时行动、何时等待，何时投资、何时退出。这种由你深刻情商磨练的本能是你最大的财务优势。\n\n你的财富往往通过意想不到的渠道到来——那些看似不寻常或非常规的机会往往是你的金钥匙。保持开放，保持好奇。投资于与通信、旅行、技术和艺术相关的行业。\n\n管理你自然波动倾向。创造财务锚点——稳定的投资来锚定你的投资组合——同时允许一部分财富随着机会自由流动。安全与探索之间的平衡是你持久繁荣的关键。'
    },
    weak: {
      en: 'Financial stability comes to you through flow rather than force. Work in environments that align with your values, and financial reward will follow naturally. Your best decisions are made when you trust your intuition rather than over-analyzing.\n\nAvoid high-risk investments and focus on liquid assets. Your financial comfort comes from knowing you have flexibility and options. Build an emergency fund that gives you the freedom to follow opportunities without desperation.\n\nYour network is your net worth. Invest in relationships genuinely, and financial opportunities will emerge organically from those connections. People want to do business with those they trust — and your authentic nature makes you deeply trustworthy.',
      zh: '财务稳定是通过顺势而非强求来到你身边的。在符合你价值观的环境中工作，财富会自然而然地跟随。你最好的决策是在相信直觉而非过度分析时做出的。\n\n避免高风险投资，专注于流动资产。你的财务舒适来自于知道自己有灵活性和选择权。建立一个应急基金，让你在不用绝望的情况下跟随机会。\n\n你的人脉就是你的净值。真诚地投资于人际关系，财务机会将自然地从中涌现。人们愿意与他们信任的人做生意——而你真诚的本性让你值得深度信任。'
    }
  },
  fire: {
    strong: {
      en: 'You have a golden touch when it comes to wealth creation. Your charisma, vision, and energy attract financial opportunities as naturally as a flame draws the eye. Careers in sales, leadership, entrepreneurship, and entertainment can bring substantial rewards.\n\nThe key to your financial success is leverage. Build systems that generate income while you focus on what you do best — inspiring, leading, and creating. Your time and energy are your most valuable assets; do not trade them for small returns.\n\nGuard against the impulse to spend as brightly as you earn. Your wealth grows when you create financial discipline to match your earning power. Invest in assets that appreciate, experiences that enrich, and people who are worthy of your trust. Your financial flame can light the way for many if you tend it wisely.',
      zh: '你在财富创造方面有点石成金的天赋。你的魅力、远见和能量吸引财务机会就像火焰吸引目光一样自然。销售、领导、创业和娱乐领域能带来丰厚的回报。\n\n你财务成功的关键是杠杆。建立能产生收入的系统，同时专注于你最擅长的事——激励、领导和创造。你的时间和精力是你最宝贵的资产；不要为小回报而出售它们。\n\n警惕像赚钱一样花钱的冲动。当你建立与赚钱能力相匹配的财务纪律时，你的财富才会增长。投资于能增值的资产、能丰富生命的体验、以及值得你信任的人。如果你明智地照管，你的财务之火可以为许多人照亮道路。'
    },
    weak: {
      en: 'Your financial growth is closely tied to your personal relationships and network. Nurture your connections — they will open doors that logic alone cannot unlock. Your warmth and charisma draw people to you, and where there are people, there are opportunities.\n\nAvoid overextending yourself financially. Your generous spirit may tempt you to spend more than you should. Create a budget that honors your need for enjoyment while protecting your long-term security.\n\nYour wealth grows brightest when you are doing what you love with people you trust. Follow your passion, but channel it wisely. The combination of what you love and what the world needs is your financial sweet spot.',
      zh: '你的财务增长与你的人际关系和人脉网络密切相关。用心维护你的人脉——它们会打开逻辑本身无法打开的大门。你的温暖和魅力吸引着人们，而有人聚集的地方就有机会。\n\n避免在财务上过度扩张。你慷慨的天性可能诱惑你花得比应该的多。制定一个既能满足你对享受的需求又保护你长期安全的预算。\n\n当你和你信任的人一起做你热爱的事时，你的财富最为闪亮。追随你的激情，但明智地引导它。你所爱的和世界所需要的交集就是你财务的最佳位置。'
    }
  },
  earth: {
    strong: {
      en: 'Your financial foundation is as solid as the earth itself. You build wealth slowly, methodically, and permanently. Real estate, land, agriculture, and tangible assets are your natural domain. You are not drawn to flashy investments — you buy what lasts.\n\nYour patience is your superpower. While others chase quick profits and volatile markets, you steadily accumulate assets that appreciate over time. Your wealth may grow more slowly, but it will not disappear overnight. You build an empire that can weather any storm.\n\nYour challenge is to avoid becoming too conservative. In a world of inflation and changing economies, some risk is necessary for growth. Allow yourself strategic, calculated risks — they will multiply the fruits of your patience without betraying your nature.',
      zh: '你的财务基础像大地一样坚实。你缓慢、有条理、持久地积累财富。房地产、土地、农业和有形资产是你的天然领域。你不被花哨的投资吸引——你购买经得起时间考验的东西。\n\n你的耐心是你的超能力。当别人追逐快钱和波动的市场时，你稳步积累随时间增值的资产。你的财富增长也许更慢，但不会一夜消失。你建造的是能经受任何风暴的基业。\n\n你的挑战是避免过于保守。在一个通胀和经济变化的世界里，一定的风险对增长是必要的。允许自己有策略性的、经过计算的风险——它们将倍增你耐心的果实，而不背叛你的本性。'
    },
    weak: {
      en: 'Financial security comes to you through service and reliability. Your reputation for being dependable is your most valuable financial asset. Steady, loyal clients and opportunities will come to you because people know you deliver on your promises.\n\nFocus on building a strong professional reputation. Word of mouth is your most powerful marketing tool. Provide exceptional value, and the financial rewards will follow naturally.\n\nAvoid comparing your financial journey to others. Your path is one of steady accumulation, not dramatic leaps. Celebrate every milestone, no matter how small. Your reliability is rare and precious in a world of shortcuts — the market will eventually reward it at its true value.',
      zh: '财务安全感来自于服务和可靠。你值得信赖的声誉是你最宝贵的财务资产。稳定、忠诚的客户和机会会来找你，因为人们知道你言出必行。\n\n专注于建立强大的职业声誉。口碑是你最有力的营销工具。提供卓越的价值，财务回报自然随之而来。\n\n避免将你的财务之旅与他人比较。你的路是稳步积累，而非戏剧性的跳跃。庆祝每一个里程碑，无论多小。在一个充满捷径的世界里，你的可靠性是稀有而宝贵的——市场最终会以其真正的价值来回报它。'
    }
  }
};

// ===== 感情分析（扩充版）=====
const RELATIONSHIPS: Record<string, { en: string; zh: string }> = {
  metal: {
    en: 'In love, you value truth and loyalty above all. You love deeply but carefully — your heart is a fortress that must be earned entry to. You do not give your trust easily, but once given, it is unshakable. You are the kind of partner who will stand by someone through their darkest hour without hesitation.\n\nYour challenge is to soften your edges in moments of conflict. Your directness, which serves you so well in the professional world, can wound in intimate relationships. Love is not a battlefield to be won — it is a garden to be tended together. Learn the art of gentle honesty: truth spoken with kindness, not carried like a blade.\n\nYou need a partner who respects your strength but is not intimidated by it. Someone who sees through your armor to the loyal, caring heart beneath. When you find this person, do not hold back — your capacity for devotion is one of your greatest gifts. Let yourself be loved as deeply as you love.',
    zh: '在爱情中，你视真诚和忠诚高于一切。你爱得深沉但谨慎——你的心是一座必须赢得入场券才能进入的堡垒。你不轻易给予信任，但一旦给予，便不可动摇。你是那种会在对方最黑暗的时刻毫不犹豫地站在他们身边的伴侣。\n\n你的挑战是在冲突时刻软化你的棱角。你的直接——在职场中让你如此出色——在亲密关系中可能会造成伤害。爱不是需要赢得的战场，而是需要共同打理的园地。学会温和的诚实这门艺术：用善意表达的真相，而不是像剑刃一样携带的真相。\n\n你需要一个尊重你的坚强但不被它吓倒的伴侣。一个能看穿你的铠甲、看到背后忠诚而关怀的心灵的人。当你找到这个人时，不要犹豫——你奉献的能力是你最伟大的天赋之一。让自己被爱，像你爱得那样深。'
  },
  wood: {
    en: 'You are a romantic at heart, always seeking growth and deep connection. You give freely and expect your partner to grow alongside you. Your love language is acts of service and quality time — you show love by being present and helpful, by building a life together.\n\nYour challenge is learning to accept people as they are, not as who you believe they could become. Your nurturing nature may tempt you to see partners as projects. But real love is not about sculpting someone into an ideal — it is about cherishing their essence while growing together.\n\nYou need a partner who shares your values of growth and authenticity, someone who can match your emotional depth without being overwhelmed by it. When you find this balance, your relationship becomes a powerful force for mutual evolution — two trees growing side by side, their roots intertwined, each stronger because of the other.',
    zh: '你骨子里是一个浪漫主义者，始终在寻求成长和深度连接。你毫无保留地付出，期待你的伴侣能与你一同成长。你的爱语是实际的行动和高质量的陪伴——你通过在场和帮助、通过共同建设生活来表达爱。\n\n你的挑战是学会接纳人们本来的样子，而不是你相信他们可以成为的样子。你滋养的天性可能诱惑你将伴侣视为项目。但真正的爱不是将某个人塑造成理想中的模样——而是在共同成长中珍惜他们的本质。\n\n你需要一个与你共享成长和真实价值观的伴侣，一个能匹配你情感深度而不被其淹没的人。当你找到这个平衡时，你的关系将成为共同进化的强大力量——两棵树并肩生长，根系交织，每一棵都因对方而更加强大。'
  },
  water: {
    en: 'Your emotional depth in relationships is both your gift and your challenge. You feel everything profoundly — joy, sorrow, love, and loss hit you with the force of waves. This capacity for deep feeling makes you an extraordinarily loving and empathetic partner.\n\nYou need a partner who can match your emotional intelligence and give you the space to process your feelings. Someone who does not fear your depth but dives into it with you. Your challenge is learning to communicate your needs directly rather than expecting your partner to intuitively understand the vast ocean of your inner world.\n\nWhen you find the right partner, your relationship is a deep and transformative connection. You have the capacity to create a bond that transcends the ordinary — a meeting of souls, not just hearts. Guard this sacred space. Not everyone deserves access to your depths. Be selective, and when you choose, choose with both your heart and your wisdom.',
    zh: '你在感情中的情感深度既是你的天赋也是你的挑战。你深刻地感受一切——喜悦、悲伤、爱与失去像浪潮一样冲击着你。这种深刻感受的能力让你成为极其有爱和富有同理心的伴侣。\n\n你需要一个能匹配你情商、给你空间处理情感的伴侣。一个不畏惧你的深度、而是与你一同潜入其中的人。你的挑战是学会直接沟通你的需求，而不是期望伴侣凭直觉理解你内心世界的浩瀚海洋。\n\n当你找到对的伴侣时，你的关系是一种深刻而具有变革意义的连接。你有能力创造一种超越平凡的纽带——灵魂的交汇，而不仅仅是心的交汇。守护这片神圣的空间。不是每个人都值得进入你的深处。有选择性地挑选，当你选择时，用你的心和智慧共同选择。'
  },
  fire: {
    en: 'You bring passion, excitement, and vitality to your relationships. When you love, you love with your whole being — intensely, generously, and without reservation. Your partner will never wonder if you care; your love is a flame that burns bright and undeniable.\n\nYour challenge is sustainability. The flame that burns brightest can also burn out fastest. Passion, without steady warmth, becomes exhaustion. Learn the art of sustainable love — the quiet mornings matter as much as the dramatic nights. The deepest love is not a constant fireworks display; it is the steady glow of two souls committed to each other\'s well-being.\n\nYou need a partner who can match your energy but also ground you. Someone who is not threatened by your intensity but can gently remind you to rest. Someone who loves your fire and knows how to tend it so it never burns out. Together, you can create a love that is both exciting and enduring — the rarest and most precious combination.',
    zh: '你为感情带来激情、活力和生命力。当你爱的时候，你用全部身心去爱——浓烈、慷慨、毫无保留。你的伴侣永远不会怀疑你是否在乎；你的爱是一团燃烧明亮、不可否认的火焰。\n\n你的挑战是可持续性。烧得最旺的火也熄得最快。激情若没有恒温相伴，终将变成耗竭。学会可持续之爱的艺术——安静的早晨与热烈夜晚同样重要。最深的爱不是持续的烟花表演；它是两颗灵魂共同守护彼此幸福的稳定光芒。\n\n你需要一个既能匹配你的能量又能为你锚定的人。一个不被你的激烈威胁、却能温柔提醒你休息的人。一个爱你的火焰、知道如何照看它使其永不熄灭的人。你们在一起可以创造既激动人心又持久永恒的爱——最稀有也最珍贵的组合。'
  },
  earth: {
    en: 'You are the foundation in your relationships — steady, dependable, and deeply caring. You show love through actions more than words, building a life of stability and comfort for those you love. Your partner knows they can rely on you, and this reliability is a profound form of love.\n\nYour challenge is to express your feelings openly. Your partner needs to hear the words as much as they feel the actions. Love that is only shown but never spoken can leave your partner wondering, even when they have no reason to doubt. Practice verbal affirmation — it does not come naturally to you, but it is a gift your loved ones deeply need.\n\nYou need a partner who appreciates the depth of your commitment and does not mistake your quiet steadiness for lack of passion. Someone who draws out your emotional expression, who creates a safe space for you to be vulnerable. Your love is the kind that weathers every storm and grows stronger with time — it deserves to be celebrated, not taken for granted.',
    zh: '你是感情中的基石——稳定、可靠、发自内心地关怀。你用行动而非言语表达爱，为你所爱的人建立一个稳定、舒适的生活。你的伴侣知道他们可以依赖你，这种可靠本身就是一种深沉的爱的形式。\n\n你的挑战是开放地表达你的感受。你的伴侣需要听到那些言语，就像他们感受到那些行动一样。只展示但从不言说的爱会让你的伴侣心存疑虑，即使他们没有理由怀疑。练习语言上的肯定——这对你来说不是天生的，但它是你爱的人深切需要的礼物。\n\n你需要一个欣赏你承诺深度的伴侣，一个不会将你安静的稳定误认为缺乏激情的人。一个能引出你情感表达、为你创造安全空间让妳能脆弱的人。你的爱是那种能经受一切风暴、随时间变得愈发强大的爱——它值得被珍惜，而不是被视为理所当然。'
  }
};

// ===== 五行平衡深层分析 =====
const BALANCE_ANALYSIS: Record<string, {
  excess: { en: string; zh: string };
  deficiency: { en: string; zh: string };
}> = {
  metal: {
    excess: {
      en: 'An abundance of Metal gives you sharp intellect and strong will, but can manifest as rigidity and emotional distance. To harmonize, cultivate Fire energy — passion, warmth, and spontaneity will soften your edges without weakening your resolve. Spend time in warm environments, engage in creative pursuits, and practice vulnerability with those you trust.',
      zh: '金旺赋予你敏锐的智力和坚定的意志，但可能表现为固执和情感疏离。为求调和，多亲近火能量——热情、温暖和自发性会软化你的棱角而不削弱你的决心。花时间在温暖的环境中，参与创意活动，并在你信任的人面前练习展示脆弱。'
    },
    deficiency: {
      en: 'A deficiency of Metal suggests you may struggle with boundaries and decision-making. Cultivate structure in your daily life — routines, clear goals, and organized spaces will strengthen your Metal energy. Surround yourself with white and gold, and engage in activities that require precision and discipline.',
      zh: '金弱说明你可能在设立边界和决策方面有所挑战。在日常生活中培养结构——规律的作息、清晰的目标和有序的空间将增强你的金能量。多用白色和金色，参与需要精准和自律的活动。'
    }
  },
  wood: {
    excess: {
      en: 'Abundant Wood energy makes you creative and growth-oriented, but can lead to restlessness and overextension. To harmonize, cultivate Metal energy — structure, discipline, and discernment will give your creativity productive channels. Practice completing what you start before moving to the next project.',
      zh: '木旺让你富有创造力和成长导向，但可能导致不安和过度扩张。为求调和，亲近金能量——结构、自律和辨别力将为你的创造力提供有效的输出渠道。练习在开始下一个项目之前完成已开始的事情。'
    },
    deficiency: {
      en: 'A deficiency of Wood suggests you may lack flexibility or find it hard to initiate new projects. Cultivate growth energy by spending time in nature, especially forests and gardens. Green is your color of nourishment. Try morning stretching or yoga to invite Wood\'s flowing energy into your life.',
      zh: '木弱说明你可能缺乏灵活性或难以开启新项目。通过花时间在大自然中来培养生长能量，尤其是森林和花园。绿色是你的滋养色。尝试早晨拉伸或瑜伽，邀请木的流动能量进入你的生活。'
    }
  },
  water: {
    excess: {
      en: 'Abundant Water gives you deep intuition and emotional richness, but can lead to moodiness and overwhelm. To harmonize, cultivate Earth energy — grounding, stability, and routine will anchor your emotional tides. Spend time in nature, practice mindfulness, and establish consistent daily habits.',
      zh: '水旺赋予你深邃的直觉和丰富的情感，但可能导致情绪化和不堪重负。为求调和，亲近土能量——接地、稳定和规律将为你的情绪潮汐提供锚点。花时间在大自然中，练习正念，建立一致的日常习惯。'
    },
    deficiency: {
      en: 'A deficiency of Water suggests you may struggle with emotional expression or adaptability. Cultivate Water energy by spending time near actual water — rivers, lakes, or the sea. Blue and black are your colors. Practice free-form journaling to connect with your emotional depths.',
      zh: '水弱说明你可能在情感表达或适应力方面有所挑战。通过花时间靠近实际的水域——河流、湖泊或大海来培育水能量。蓝色和黑色是你的颜色。练习自由书写来连接你的情感深度。'
    }
  },
  fire: {
    excess: {
      en: 'Abundant Fire makes you charismatic and dynamic, but can lead to burnout and intensity that overwhelms others. To harmonize, cultivate Water energy — calm, reflection, and emotional depth will temper your fire without extinguishing its light. Practice meditation, take cool baths, and learn the power of quiet presence.',
      zh: '火旺让你富有魅力和活力，但可能导致倦怠和令他人感到压迫的强烈感。为求调和，亲近水能量——平静、反思和情感深度将调和你的火焰而不熄灭其光芒。练习冥想，洗个凉水澡，学习安静存在的力量。'
    },
    deficiency: {
      en: 'A deficiency of Fire suggests you may lack passion or visibility in your life. Cultivate Fire energy by seeking activities that excite you. Red and purple are your colors of empowerment. Spend time in sunlight, connect with warm-hearted people, and allow yourself to be seen and celebrated.',
      zh: '火弱说明你可能在生活中缺乏激情或存在感。通过寻找能激发你热情的活动来培养火能量。红色和紫色是你的赋能色。花时间在阳光下，与温暖的人交往，允许自己被看见和被赞美。'
    }
  },
  earth: {
    excess: {
      en: 'Abundant Earth makes you stable and nurturing, but can lead to stagnation and resistance to change. To harmonize, cultivate Wood energy — growth, flexibility, and forward movement will prevent you from getting stuck. Try new experiences, travel to unfamiliar places, and embrace change as a catalyst for growth.',
      zh: '土旺让你稳定而滋养，但可能导致停滞和对变化的抗拒。为求调和，亲近木能量——成长、灵活性和前进的动力将防止你陷入僵局。尝试新的体验，去陌生的地方旅行，拥抱变化作为成长的催化剂。'
    },
    deficiency: {
      en: 'A deficiency of Earth suggests you may lack grounding or struggle to create stability. Cultivate Earth energy by establishing routines and creating a comfortable home environment. Yellow and brown are your colors. Gardening, cooking, and acts of service will help you feel more rooted.',
      zh: '土弱说明你可能缺乏扎根感或难以创造稳定。通过建立规律作息和创造舒适的家居环境来培养土能量。黄色和棕色是你的颜色。园艺、烹饪和服务性的行动将帮助你感觉更扎根。'
    }
  }
};

// ===== 人生建议 =====
const ADVICE: { strong: { en: string; zh: string }; weak: { en: string; zh: string } } = {
  strong: {
    en: 'Your energy is abundant — a powerful gift that, when channeled wisely, can move mountains. But the world may feel like it moves at your pace, and this can lead to overconfidence. True power lies not in constant action, but in knowing when to act and when to be still.\n\nPractice restraint where you would normally push forward. Give others space to contribute. Your strength is most effective when it is focused and deliberate, not scattered in every direction. Seek balance by embracing the elements that complement your nature — they will refine your power into wisdom.\n\nYour greatest growth will come from learning to listen as much as you lead. The strongest leaders are not those who dominate conversations, but those who create spaces where every voice matters. Your abundance, when shared generously, becomes a gift to the world. When hoarded or imposed, it becomes a burden.',
    zh: '你的能量充沛——这是一份强大的礼物，如果明智地引导，可以移山倒海。但世界可能感觉以你的节奏在运转，这可能导致过度自信。真正的力量不在于持续的行动，而在于知道何时行动、何时静止。\n\n在你通常会推进的地方练习克制。给别人贡献的空间。你的力量在专注和审慎时最有效，而不是分散在各个方向。通过拥抱补益你本命的五行来寻求平衡——它们会将你的力量精炼为智慧。\n\n你最大的成长来自于学会像你领导一样去倾听。最强大的领导者不是那些主导对话的人，而是那些创造空间让每个声音都有价值的人。你的丰盛，当慷慨分享时，成为给世界的礼物。当被囤积或强加时，它成为一种负担。'
  },
  weak: {
    en: 'Your path is one of gathering, not forcing. You are not here to dominate — you are here to harmonize. Seek environments and people that nourish your spirit. Your quiet wisdom will speak volumes when it finds the right audience.\n\nDo not compare your journey to those who seem louder or faster. The oak and the bamboo grow at different rates, yet both are essential to the forest. Nurture yourself first — your energy will naturally flow outward when your own cup is full.\n\nThe elements that support your nature are your allies. Surround yourself with their colors, their seasons, their wisdom. Seek mentors and communities that uplift you. Your power is not in standing alone, but in knowing when to lean on the strength of others — and eventually, becoming strong enough for others to lean on you.',
    zh: '你的路是聚集而非强求的路。你不是要来主导的——你是来调和的。寻找那些滋养你心灵的环境和人。当你找到对的听众时，你安静的智慧将胜过千言万语。\n\n不要将你的旅程与那些看起来更喧嚣或更快的人比较。橡树和竹子以不同的速度生长，但两者对森林都不可或缺。先滋养自己——当你自己的杯子满了，你的能量自然会向外流淌。\n\n那些生助你的五行元素是你的盟友。用它们的颜色、它们的季节、它们的智慧围绕自己。寻找能提升你的导师和社群。你的力量不在于独自站立，而在于知道何时依靠他人的力量——并最终变得足够强大，让他人可以依靠你。'
  }
};

// ===== 幸运信息 =====
const LUCKY_INFO_DATA: Record<string, { en: Record<string, string[]>; zh: Record<string, string[]> }> = {
  metal: {
    en: { colors: ['White', 'Gold', 'Silver', 'Cream'], numbers: ['4', '9', '14', '19'], directions: ['West', 'Northwest'], seasons: ['Autumn (especially mid-autumn)'] },
    zh: { colors: ['白色', '金色', '银色', '米色'], numbers: ['4', '9', '14', '19'], directions: ['西方', '西北'], seasons: ['秋季（仲秋尤佳）'] },
  },
  wood: {
    en: { colors: ['Green', 'Teal', 'Turquoise', 'Forest green'], numbers: ['3', '8', '13', '18'], directions: ['East', 'Southeast'], seasons: ['Spring (especially early spring)'] },
    zh: { colors: ['绿色', '青色', '碧色', '森林绿'], numbers: ['3', '8', '13', '18'], directions: ['东方', '东南'], seasons: ['春季（初春尤佳）'] },
  },
  water: {
    en: { colors: ['Blue', 'Black', 'Navy', 'Deep Purple'], numbers: ['1', '6', '11', '16'], directions: ['North'], seasons: ['Winter (especially deep winter)'] },
    zh: { colors: ['蓝色', '黑色', '深蓝', '深紫'], numbers: ['1', '6', '11', '16'], directions: ['北方'], seasons: ['冬季（深冬尤佳）'] },
  },
  fire: {
    en: { colors: ['Red', 'Purple', 'Pink', 'Orange', 'Crimson'], numbers: ['2', '7', '12', '17'], directions: ['South'], seasons: ['Summer (especially midsummer)'] },
    zh: { colors: ['红色', '紫色', '粉色', '橙色', '深红'], numbers: ['2', '7', '12', '17'], directions: ['南方'], seasons: ['夏季（仲夏尤佳）'] },
  },
  earth: {
    en: { colors: ['Yellow', 'Brown', 'Beige', 'Terracotta', 'Ochre'], numbers: ['5', '10', '15', '20'], directions: ['Center', 'Northeast', 'Southwest'], seasons: ['Late Summer (Indian Summer)'] },
    zh: { colors: ['黄色', '棕色', '米黄', '陶土色', '赭色'], numbers: ['5', '10', '15', '20'], directions: ['中央', '东北', '西南'], seasons: ['季夏（长夏）'] },
  }
};

// ===== 健康提示 =====
const HEALTH: Record<string, { en: string; zh: string }> = {
  metal: {
    en: 'Your health is generally robust, but you should pay attention to your respiratory system and skin. Metal governs the lungs and the skin in traditional Chinese medicine. Practice deep breathing exercises, protect your skin from harsh elements, and incorporate moistening foods like pears and white fungus into your diet. Autumn is a season of renewal for you — use it to establish healthy routines.',
    zh: '你的健康状况总体不错，但需注意呼吸系统和皮肤。中医认为金主肺与皮毛。练习深呼吸，保护皮肤免受恶劣环境影响，在饮食中加入梨、银耳等润肺食物。秋季是你的新生季节——利用它建立健康的日常习惯。'
  },
  wood: {
    en: 'Your health is connected to your liver and eyes. Wood governs these areas in traditional Chinese medicine. When stressed, you may experience eye strain or headaches. Protect your vision with regular breaks from screens, and support your liver with bitter greens and regular exercise. Spring is your season of vitality — use the renewed energy to start health routines.',
    zh: '你的健康与肝脏和眼睛相关。中医认为木主肝与目。压力大时，你可能出现眼疲劳或头痛。定期远离屏幕保护视力，用苦味蔬菜和规律运动来养护肝脏。春季是你的活力季节——利用新生的能量开启健康习惯。'
  },
  water: {
    en: 'Your health is tied to your kidneys and bones. Water governs these areas in traditional Chinese medicine. Stay well hydrated, protect your lower back, and avoid excessive fatigue. Salt in moderation supports your system, and warm foods are better than cold for your constitution. Winter is your season of restoration — honor your body\'s need for rest and introspection.',
    zh: '你的健康与肾脏和骨骼相关。中医认为水主肾与骨。保持充分水分，保护腰部，避免过度疲劳。适量的盐支持你的系统，温热食物比冷食更适合你的体质。冬季是你的休养季节——尊重身体对休息和内省的需求。'
  },
  fire: {
    en: 'Your health is linked to your heart and circulatory system. Fire governs these areas in traditional Chinese medicine. You are prone to stress-related heart issues if you do not manage your intensity. Practice cooling activities — swimming, evening walks, meditation. Bitter and cold foods in summer help balance your fire. Protect your heart not just physically, but emotionally.',
    zh: '你的健康与心脏和循环系统相关。中医认为火主心与血脉。如果你不管理自己的强度，容易因压力出现心脏问题。练习降温的活动——游泳、傍晚散步、冥想。夏季的苦味和凉性食物有助于平衡你的火。保护你的心脏，不仅在生理上，也在情感上。'
  },
  earth: {
    en: 'Your health is connected to your digestive system and spleen. Earth governs these areas in traditional Chinese medicine. You tend to hold tension in your stomach, especially when worrying about others. Eat regular, warm meals and avoid raw or cold foods. Sweet, mild foods in moderation support your system. Late summer is your season of harvest — enjoy the abundance of seasonal produce.',
    zh: '你的健康与消化系统和脾胃相关。中医认为土主脾胃。你倾向于在胃部囤积紧张，特别是在为他人担忧时。按时吃温热饭菜，避免生冷食物。适量甜味温和的食物支持你的系统。季夏是你的收获季节——享受当季食材的丰盛。'
  }
};

// ===== 总结与开运建议 =====
const SUMMARY_TEMPLATES: Record<string, { en: { fortune: string[]; advice: string[] }; zh: { fortune: string[]; advice: string[] } }> = {
  metal: {
    en: {
      fortune: [
        'Your destiny is one of refinement and precision. Like metal purified in fire, each challenge you face makes you stronger and more valuable.',
        'The universe has shaped you to be a person of substance. Your path is not the easiest, but it is the most rewarding for those who walk it with integrity.',
        'Your nature is that of a craftsman — constantly honing, improving, perfecting. Remember that the greatest masterpieces are not those without flaws, but those whose flaws tell a story.'
      ],
      advice: [
        'Wear white or gold to enhance your natural energy',
        'Surround yourself with warm-hearted people who soften your edges',
        'Take up a craft that requires precision — calligraphy, woodworking, or music',
        'Practice saying "I don\'t know" — it will set you free'
      ]
    },
    zh: {
      fortune: [
        '你的命运是精炼与精准之路。像在烈火中提纯的金属，你面临的每一次挑战都让你更加坚强、更有价值。',
        '宇宙将你塑造成一个有分量的人。你的路不是最轻松的，但对于以正直行走的人而言，它是最有回报的。',
        '你的本性如同工匠——不断打磨、改进、完善。记住，最伟大的杰作不是没有瑕疵的那些，而是那些瑕疵能讲述故事的作品。'
      ],
      advice: [
        '穿戴白色或金色以增强你的自然能量',
        '身边多与温暖的人相处，他们会软化你的棱角',
        '培养一项需要精准的手艺——书法、木工或音乐',
        '练习说"我不知道"——它会让你的心灵轻盈'
      ]
    }
  },
  wood: {
    en: {
      fortune: [
        'Your destiny is one of growth and expansion. Like a tree reaching toward the light, you are meant to rise, to branch out, and to bear fruit for others to enjoy.',
        'The universe has blessed you with the heart of a nurturer. Your purpose is tied to helping others grow — and in doing so, you will find your own fullest expression.',
        'Your path is one of connection. You weave the fabric of community, bringing people and ideas together in ways that create lasting value.'
      ],
      advice: [
        'Spend time in nature, especially forests and gardens',
        'Plant something and watch it grow — it mirrors your own journey',
        'Write down your ideas; they are seeds that need to be planted',
        'Practice finishing what you start before starting something new'
      ]
    },
    zh: {
      fortune: [
        '你的命运是生长与扩张之路。如同一棵向着阳光生长的树，你注定要崛起、延伸枝干、结出果实供他人享用。',
        '宇宙赐予你一颗滋养者的心。你的使命与帮助他人成长紧密相连——而在此过程中，你将找到自己最完整的表达。',
        '你的路是连接之路。你编织着社群的纽带，将人和思想以创造持久价值的方式汇聚在一起。'
      ],
      advice: [
        '多花时间在大自然中，尤其是森林和花园',
        '种一株植物，看它成长——它映照着你的旅程',
        '写下你的想法；它们是等待播下的种子',
        '在开启新事物之前先练习完成已开始的事情'
      ]
    }
  },
  water: {
    en: {
      fortune: [
        'Your destiny is one of depth and flow. Like water carving canyons over millennia, your quiet persistence shapes the world in ways you may never fully see.',
        'The universe speaks to you through intuition. Your path is not one of force but of attunement — listen carefully, and the way will open before you.',
        'Your nature is that of a bridge between worlds. You understand what others cannot articulate, feel what others cannot name. This is your gift and your sacred responsibility.'
      ],
      advice: [
        'Spend time near water — rivers, lakes, or the sea',
        'Keep a dream journal; your subconscious speaks in symbols',
        'Trust your first instinct — it is usually correct',
        'Set emotional boundaries to protect your sensitive nature'
      ]
    },
    zh: {
      fortune: [
        '你的命运是深邃与流动之路。如同水在千年间雕刻峡谷，你安静的坚持以你可能永远无法完全看见的方式塑造着世界。',
        '宇宙通过直觉与你对话。你的路不是力量之路，而是调谐之路——仔细倾听，道路会在你面前展开。',
        '你的本性是连接不同世界的桥梁。你理解别人无法言说的，感受别人无法命名的。这是你的天赋，也是你的神圣责任。'
      ],
      advice: [
        '花时间靠近水域——河流、湖泊或大海',
        '记录梦境日记；你的潜意识用符号说话',
        '相信你的第一直觉——它通常是正确的',
        '设立情感边界以保护你的敏感本性'
      ]
    }
  },
  fire: {
    en: {
      fortune: [
        'Your destiny is one of radiance and transformation. Like fire that both destroys and renews, your presence has the power to clear away the old and make space for the new.',
        'The universe has placed a light within you that cannot be extinguished. Your purpose is to shine — not to outshine others, but to illuminate the path for all who walk it.',
        'Your path is one of passion and purpose. You are not meant for a small life — embrace your bigness, your brightness, your beautiful intensity.'
      ],
      advice: [
        'Create a morning ritual that starts your day with intention',
        'Practice active listening — let others shine in your presence',
        'Take cool baths or swims to balance your fire energy',
        'Build sustainable rhythms; rest is not weakness'
      ]
    },
    zh: {
      fortune: [
        '你的命运是光芒与蜕变之路。如同既毁灭又新生的火焰，你的存在有力量清除旧的，为新的腾出空间。',
        '宇宙在你体内放置了一束无法熄灭的光。你的使命是照耀——不是要盖过他人，而是为所有行路者照亮前路。',
        '你的路是激情与使命之路。你注定不该过一个渺小的人生——拥抱你的宏大、你的明亮、你美丽的强烈。'
      ],
      advice: [
        '创建一个能让你的一天以意图开始的晨间仪式',
        '练习主动倾听——让别人在你的存在中发光',
        '洗凉水澡或游泳以平衡你的火能量',
        '建立可持续的节奏；休息不是软弱'
      ]
    }
  },
  earth: {
    en: {
      fortune: [
        'Your destiny is one of foundation and harvest. Like the earth that quietly supports all life, your steady presence makes everything around you possible.',
        'The universe has made you a source of stability in a chaotic world. Your purpose is to create safe ground where others can stand, grow, and thrive.',
        'Your nature is one of quiet abundance. You do not need to seek recognition — the fruits of your labor will speak for themselves, nourishing generations to come.'
      ],
      advice: [
        'Create a comfortable home that reflects your inner peace',
        'Cook and share meals with loved ones — it nourishes more than the body',
        'Take walks barefoot on grass or earth to reconnect with your element',
        'Embrace change as a natural part of growth, not a threat to stability'
      ]
    },
    zh: {
      fortune: [
        '你的命运是奠基与收获之路。如同默默支持所有生命的大地，你稳定的存在让周围的一切成为可能。',
        '宇宙将你塑造成混乱世界中的稳定之源。你的使命是创造安全的土壤，让他人能够站立、成长和繁荣。',
        '你的本性是安静的丰盛。你不需要寻求认可——你的劳动果实自会为你说话，滋养未来的世代。'
      ],
      advice: [
        '打造一个反映你内心宁静的舒适家居',
        '为爱的人烹饪并分享餐食——它滋养的不仅是身体',
        '赤脚在草地或泥土上散步，重新连接你的元素',
        '欣然接受变化为成长的自然部分，而非对稳定的威胁'
      ]
    }
  }
};

// ===== 五行平衡提升建议 =====
function getBalanceAdvice(result: BaziResult, lang: 'en' | 'zh'): string {
  const isEn = lang === 'en';
  const entries = Object.entries(result.elementScores)
    .sort(([, a], [, b]) => b - a);
  const topElement = entries[0];
  const lowElement = entries[entries.length - 1];
  const el = topElement[0];
  const elName = isEn ? getElementName(el as Element, 'en') : getElementName(el as Element, 'zh');

  const balanceData = BALANCE_ANALYSIS[el];
  if (!balanceData) return '';

  const section = result.isStrong ? balanceData.excess : balanceData.deficiency;
  const percentage = Math.round(topElement[1]);

  const intro = isEn
    ? `\n\n🔸 Element Balance Analysis (${elName}: ${percentage}%):\n${section[lang]}`
    : `\n\n🔸 五行平衡分析（${elName}：${percentage}%）：\n${section[lang]}`;

  return intro;
}

// ===== 生成完整解读 =====
export function generateSeedReading(result: BaziResult, lang: 'en' | 'zh'): ReadingSections {
  const isEn = lang === 'en';
  const dayMasterKey = String(result.dayMaster);
  const dayMasterEl = result.dayMasterElement as unknown as string;
  const strengthKey = result.isStrong ? 'strong' : 'weak';

  // 1. 性格
  const personality = PERSONALITY[dayMasterKey]?.[lang] ||
    (isEn
      ? 'Your personality is as unique as your birth chart. Each of the Five Elements flows through you in its own measure, creating a character that is one of a kind. Embrace your complexity — it is your greatest asset.'
      : '你的性格和你的命盘一样独一无二。五行以各自的比例在你体内流动，构成了独一无二的性格。拥抱你的复杂性——它是你最大的资产。');

  // 2. 事业
  const career = CAREER[dayMasterEl]?.[lang] ||
    (isEn
      ? 'Your career path is shaped by your Day Master element. Embrace roles that align with your natural energy, and you will find not just success, but fulfillment.'
      : '你的事业之路由你的日主五行塑造。拥抱与你的自然能量一致的角色，你不仅会找到成功，还会找到满足感。');

  // 3. 财运
  const wealthData = WEALTH[dayMasterEl];
  const wealth = wealthData?.[strengthKey]?.[lang] ||
    (isEn
      ? 'Your financial journey is uniquely yours. Build patiently, trust your instincts, and remember that true wealth includes health, relationships, and peace of mind.'
      : '你的财务之路是独一无二的。耐心建设，相信直觉，记住真正的财富包括健康、关系和内心的平静。');

  // 4. 感情
  const relationships = RELATIONSHIPS[dayMasterEl]?.[lang] ||
    (isEn
      ? 'Your approach to relationships is shaped by your elemental nature. Be authentic, be vulnerable, and remember that the deepest connections are built on mutual respect and understanding.'
      : '你的感情方式由你的五行本质塑造。保持真实，保持脆弱，记住最深的连接建立在相互尊重和理解之上。');

  // 5. 人生建议
  const adviceData = ADVICE[strengthKey];
  const baseAdvice = adviceData?.[lang] || '';
  const balanceTip = getBalanceAdvice(result, lang);
  const advice = `${baseAdvice}${balanceTip}`;

  return { personality, career, wealth, relationships, advice };
}

// ===== 生成幸运信息 =====
export function getLuckyInfo(result: BaziResult, lang: 'en' | 'zh'): Record<string, string[]> {
  const el = result.dayMasterElement as unknown as string;
  const info = LUCKY_INFO_DATA[el]?.[lang] || { colors: [], numbers: [], directions: [], seasons: [] };
  return info;
}

// ===== 生成健康提示 =====
export function getHealthTip(result: BaziResult, lang: 'en' | 'zh'): string {
  const el = result.dayMasterElement as unknown as string;
  return HEALTH[el]?.[lang] || (lang === 'en'
    ? 'Maintain balance in all things — your body, mind, and spirit are interconnected.'
    : '凡事有度，保持平衡——你的身、心、灵是相互连接的。');
}

// ===== 生成总结 =====
export function getSummary(result: BaziResult, lang: 'en' | 'zh'): { fortune: string; advice: string } {
  const el = result.dayMasterElement as unknown as string;
  const templates = SUMMARY_TEMPLATES[el];
  if (!templates) {
    return {
      fortune: lang === 'en' ? 'Your destiny is written in the stars and shaped by your choices.' : '你的命运写在天上，由你的选择塑造。',
      advice: lang === 'en' ? 'Trust yourself. You know more than you think.' : '相信自己。你知道的比你以为的多。'
    };
  }
  const data = templates[lang];
  const fortune = data.fortune[Math.floor(Math.random() * data.fortune.length)];
  const advice = data.advice[Math.floor(Math.random() * data.advice.length)];
  return { fortune, advice };
}
