// ============================================================
// MysticSage - Ten Gods (十神) Analysis Engine
// 十神分析引擎 - 纯本地算法
// ============================================================

import { HeavenlyStem, EarthlyBranch, TenGod, Pillar, FourPillars } from './types';
import { STEM_ELEMENT, BRANCH_HIDDEN_STEMS } from './constants';

/**
 * 十神规则:
 * 以日干(日主)为"我"
 * 同我者为比劫:  同性=比肩, 异性=劫财
 * 我生者为食伤:  同性=食神, 异性=伤官
 * 我克者为财:    同性=偏财, 异性=正财
 * 克我者为官杀:  同性=七杀, 异性=正官
 * 生我者为印绶:  同性=偏印, 异性=正印
 */

const ELEMENT_ORDER = ['wood', 'fire', 'earth', 'metal', 'water'];
const ELEMENT_INDEX: Record<string, number> = {
  wood: 0, fire: 1, earth: 2, metal: 3, water: 4,
};

/** 获取天干对应的五行索引 */
function getElementIndex(stem: HeavenlyStem): number {
  const map: Record<HeavenlyStem, number> = {
    [HeavenlyStem.甲]: 0, [HeavenlyStem.乙]: 0,
    [HeavenlyStem.丙]: 1, [HeavenlyStem.丁]: 1,
    [HeavenlyStem.戊]: 2, [HeavenlyStem.己]: 2,
    [HeavenlyStem.庚]: 3, [HeavenlyStem.辛]: 3,
    [HeavenlyStem.壬]: 4, [HeavenlyStem.癸]: 4,
  };
  return map[stem];
}

/** 判断天干阴阳(0=阳, 1=阴) */
function isStemYang(stem: HeavenlyStem): boolean {
  return stem % 2 === 0; // 甲丙戊庚壬为阳(0,2,4,6,8)
}

/** 计算两个天干之间的十神关系 */
export function calcTenGod(dayMaster: HeavenlyStem, targetStem: HeavenlyStem): TenGod {
  if (dayMaster === targetStem) {
    return TenGod.比肩; // 同我=比肩
  }

  const dmElem = getElementIndex(dayMaster);
  const tgElem = getElementIndex(targetStem);
  const dmYang = isStemYang(dayMaster);
  const tgYang = isStemYang(targetStem);
  const sameYang = dmYang === tgYang; // 阴阳相同?

  // 五行关系: 0=同, 1=我生, 2=我克, 3=克我, 4=生我
  const relation = ((tgElem - dmElem) % 5 + 5) % 5;

  switch (relation) {
    case 0: // 同我
      return sameYang ? TenGod.比肩 : TenGod.劫财;
    case 1: // 我生
      return sameYang ? TenGod.食神 : TenGod.伤官;
    case 2: // 我克
      return sameYang ? TenGod.偏财 : TenGod.正财;
    case 3: // 克我
      return sameYang ? TenGod.偏官 : TenGod.正官;
    case 4: // 生我
      return sameYang ? TenGod.偏印 : TenGod.正印;
    default:
      return TenGod.比肩;
  }
}

/** 计算四柱十神 */
export function calcTenGods(pillars: FourPillars, dayMaster: HeavenlyStem) {
  return {
    yearStem: calcTenGod(dayMaster, pillars.year.stem),
    monthStem: calcTenGod(dayMaster, pillars.month.stem),
    hourStem: calcTenGod(dayMaster, pillars.hour.stem),
    dayBranchHidden: BRANCH_HIDDEN_STEMS[pillars.day.branch].map(
      stem => calcTenGod(dayMaster, stem)
    ),
  };
}
