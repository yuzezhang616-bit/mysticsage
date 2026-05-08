// ============================================================
// MysticSage - English names for Bazi terms
// 八字术语英文翻译
// ============================================================

import { HeavenlyStem, EarthlyBranch, Element, YinYang, TenGod } from './types';
import { STEM_NAMES, BRANCH_NAMES } from './constants';

/** 天干英文名 */
export const STEM_EN: Record<HeavenlyStem, string> = {
  [HeavenlyStem.甲]: 'Jia',
  [HeavenlyStem.乙]: 'Yi',
  [HeavenlyStem.丙]: 'Bing',
  [HeavenlyStem.丁]: 'Ding',
  [HeavenlyStem.戊]: 'Wu',
  [HeavenlyStem.己]: 'Ji',
  [HeavenlyStem.庚]: 'Geng',
  [HeavenlyStem.辛]: 'Xin',
  [HeavenlyStem.壬]: 'Ren',
  [HeavenlyStem.癸]: 'Gui',
};

/** 地支英文名 */
export const BRANCH_EN: Record<EarthlyBranch, string> = {
  [EarthlyBranch.子]: 'Zi', [EarthlyBranch.丑]: 'Chou',
  [EarthlyBranch.寅]: 'Yin', [EarthlyBranch.卯]: 'Mao',
  [EarthlyBranch.辰]: 'Chen', [EarthlyBranch.巳]: 'Si',
  [EarthlyBranch.午]: 'Wu', [EarthlyBranch.未]: 'Wei',
  [EarthlyBranch.申]: 'Shen', [EarthlyBranch.酉]: 'You',
  [EarthlyBranch.戌]: 'Xu', [EarthlyBranch.亥]: 'Hai',
};

/** 天干英文描述 */
export const STEM_DESC_EN: Record<HeavenlyStem, { element: string; imagery: string }> = {
  [HeavenlyStem.甲]: { element: 'Yang Wood', imagery: 'A mighty tree reaching for the sky' },
  [HeavenlyStem.乙]: { element: 'Yin Wood', imagery: 'A delicate vine winding through a garden' },
  [HeavenlyStem.丙]: { element: 'Yang Fire', imagery: 'The blazing sun at noon' },
  [HeavenlyStem.丁]: { element: 'Yin Fire', imagery: 'A candle flame dancing in the dark' },
  [HeavenlyStem.戊]: { element: 'Yang Earth', imagery: 'A vast mountain range' },
  [HeavenlyStem.己]: { element: 'Yin Earth', imagery: 'A fertile garden soil' },
  [HeavenlyStem.庚]: { element: 'Yang Metal', imagery: 'A finely crafted sword' },
  [HeavenlyStem.辛]: { element: 'Yin Metal', imagery: 'A precious jewel or ornament' },
  [HeavenlyStem.壬]: { element: 'Yang Water', imagery: 'The vast ocean' },
  [HeavenlyStem.癸]: { element: 'Yin Water', imagery: 'Gentle rain nourishing the earth' },
};

/** 十神英文名 */
export const TENGOD_EN: Record<TenGod, { name: string; meaning: string }> = {
  [TenGod.正官]: { name: 'Direct Officer', meaning: 'Authority, discipline, reputation' },
  [TenGod.偏官]: { name: 'Seven Kill', meaning: 'Power, charisma, challenges' },
  [TenGod.正印]: { name: 'Direct Seal', meaning: 'Wisdom, education, support' },
  [TenGod.偏印]: { name: 'Indirect Seal', meaning: 'Intuition, creativity, spirituality' },
  [TenGod.比肩]: { name: 'Friend', meaning: 'Peer, sibling, equality' },
  [TenGod.劫财]: { name: 'Rob Wealth', meaning: 'Competition, spending, risk-taking' },
  [TenGod.食神]: { name: 'Eating God', meaning: 'Talent, happiness, generosity' },
  [TenGod.伤官]: { name: 'Hurt Officer', meaning: 'Intelligence, rebellion, eloquence' },
  [TenGod.正财]: { name: 'Direct Wealth', meaning: 'Stable income, savings, spouse' },
  [TenGod.偏财]: { name: 'Indirect Wealth', meaning: 'Windfall, business, investment' },
};

/** 五行英文名 */
export const ELEMENT_EN: Record<Element, string> = {
  [Element.金]: 'Metal',
  [Element.木]: 'Wood',
  [Element.水]: 'Water',
  [Element.火]: 'Fire',
  [Element.土]: 'Earth',
};

/** 五行中文名（用于 AI Prompt） */
export const ELEMENT_ZH: Record<Element, string> = {
  [Element.金]: '金',
  [Element.木]: '木',
  [Element.水]: '水',
  [Element.火]: '火',
  [Element.土]: '土',
};
