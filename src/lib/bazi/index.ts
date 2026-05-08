// ============================================================
// MysticSage - Bazi Engine Main Entry
// 八字引擎主入口 - 纯本地算法
// ============================================================

import {
  BaziInput, BaziResult, HeavenlyStem, Element,
} from './types';
import { STEM_ELEMENT, STEM_YINYANG } from './constants';
import { calcFourPillars } from './pillars';
import { calcElementScores, checkStrength, getElementName } from './elements';
import { calcTenGods } from './tenshen';

/**
 * 完整的八字排盘计算
 * 纯本地运算，零 API 调用，零 Token 成本
 */
export function calculateBazi(input: BaziInput): BaziResult {
  // 1. 计算四柱
  const pillars = calcFourPillars(input);

  // 2. 日主 = 日柱天干
  const dayMaster = pillars.day.stem;
  const dayMasterElement = STEM_ELEMENT[dayMaster];
  const dayMasterYinYang = STEM_YINYANG[dayMaster];

  // 3. 五行评分
  const elementScores = calcElementScores(pillars);

  // 4. 身强身弱 & 喜用神
  const strength = checkStrength(dayMasterElement, elementScores);

  // 5. 十神
  const tenGods = calcTenGods(pillars, dayMaster);

  // 6. 空亡 (简化版: 以日柱所在旬计算)
  const voidStem = ((dayMaster + 10 - (dayMaster % 10)) % 10) as HeavenlyStem;
  const voidBranch = (dayMaster + 1) % 12 as any;

  return {
    pillars,
    elementScores: {
      metal: elementScores.metal || 0,
      wood: elementScores.wood || 0,
      water: elementScores.water || 0,
      fire: elementScores.fire || 0,
      earth: elementScores.earth || 0,
    },
    dayMaster,
    dayMasterElement,
    dayMasterYinYang,
    tenGods,
    isStrong: strength.isStrong,
    favorableElements: strength.favorable,
    unfavorableElements: strength.unfavorable,
    void: [{ stem: voidStem, branch: voidBranch }],
    birthInfo: {
      year: input.year,
      month: input.month,
      day: input.day,
      hour: input.hour,
      minute: input.minute,
      gender: input.gender,
    },
  };
}

/**
 * 验证生日输入是否合法
 */
export function validateBaziInput(input: Partial<BaziInput>): string | null {
  if (!input.year || input.year < 1900 || input.year > 2100) {
    return 'Year must be between 1900 and 2100';
  }
  if (!input.month || input.month < 1 || input.month > 12) {
    return 'Month must be between 1 and 12';
  }
  if (!input.day || input.day < 1 || input.day > 31) {
    return 'Day must be between 1 and 31';
  }
  if (input.hour === undefined || input.hour < 0 || input.hour > 23) {
    return 'Hour must be between 0 and 23';
  }
  if (input.minute === undefined || input.minute < 0 || input.minute > 59) {
    return 'Minute must be between 0 and 59';
  }
  if (!input.gender) {
    return 'Please select your gender';
  }

  // 检查日期是否合法
  const date = new Date(input.year, input.month - 1, input.day);
  if (date.getFullYear() !== input.year ||
      date.getMonth() !== input.month - 1 ||
      date.getDate() !== input.day) {
    return 'Invalid date';
  }

  return null;
}
