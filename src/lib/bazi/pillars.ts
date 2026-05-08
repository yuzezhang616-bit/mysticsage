// ============================================================
// MysticSage - Bazi Pillar Calculation Engine
// 四柱计算引擎 - 纯本地算法，零 Token 成本
// ============================================================

import {
  HeavenlyStem, EarthlyBranch, Element, YinYang,
  Pillar, FourPillars, BaziInput, Gender,
} from './types';
import {
  STEM_NAMES, BRANCH_NAMES, STEM_ELEMENT, BRANCH_ELEMENT,
  STEM_YINYANG, BRANCH_YINYANG, BRANCH_HIDDEN_STEMS, NAYIN,
  MONTH_STEM_OFFSET, HOUR_STEM_OFFSET,
  getHourBranchIndex, isBeforeSpringFestival,
} from './constants';

// ===== 工具函数 =====

/** 获取干支组合名称 (stem + branch) */
function getStemBranchName(stem: HeavenlyStem, branch: EarthlyBranch): string {
  return STEM_NAMES[stem] + BRANCH_NAMES[branch];
}

/** 获取纳音 */
function getNayin(stem: HeavenlyStem, branch: EarthlyBranch): string {
  const name = getStemBranchName(stem, branch);
  // 纳音以连续两个干支为一组,取前两个字
  const key = name;
  for (const [k, v] of Object.entries(NAYIN)) {
    if (k.startsWith(name[0]) || k.includes(name)) {
      return v;
    }
  }
  return '';
}

// ===== 年柱计算 =====
export function calcYearPillar(year: number, month: number, day: number): Pillar {
  // 立春前属于上一年
  const actualYear = isBeforeSpringFestival(month, day) ? year - 1 : year;

  // 天干: (year - 4) % 10
  const stemIndex = ((actualYear - 4) % 10 + 10) % 10;
  // 地支: (year - 4) % 12
  const branchIndex = ((actualYear - 4) % 12 + 12) % 12;

  const stem = stemIndex as HeavenlyStem;
  const branch = branchIndex as EarthlyBranch;

  return {
    stem,
    branch,
    name: getStemBranchName(stem, branch),
    element: STEM_ELEMENT[stem],
    yinYang: STEM_YINYANG[stem],
    hiddenStems: BRANCH_HIDDEN_STEMS[branch],
    nayin: getNayin(stem, branch),
  };
}

// ===== 月柱计算 =====
export function calcMonthPillar(yearPillarStem: HeavenlyStem, solarMonth: number): Pillar {
  // 地支: 寅月(节气月第1个月)对应地支寅
  // 用太阳月近似: 2月为寅月,3月为卯月...
  const monthBranchIndex = (solarMonth + 1) % 12;
  const branch = monthBranchIndex as EarthlyBranch;

  // 天干: 根据年干用五虎遁
  const baseStem = MONTH_STEM_OFFSET[yearPillarStem];
  // 从寅月(month 0)开始,逐月递增
  const monthOffset = ((solarMonth - 2) % 12 + 12) % 12; // 2月(寅月)为0
  const stemIndex = (baseStem + monthOffset) % 10;
  const stem = stemIndex as HeavenlyStem;

  return {
    stem,
    branch,
    name: getStemBranchName(stem, branch),
    element: STEM_ELEMENT[stem],
    yinYang: STEM_YINYANG[stem],
    hiddenStems: BRANCH_HIDDEN_STEMS[branch],
    nayin: getNayin(stem, branch),
  };
}

// ===== 日柱计算 =====
export function calcDayPillar(year: number, month: number, day: number): Pillar {
  // 使用蔡勒公式的变体计算日柱
  // 参考: 1900年1月1日 = 甲戌日 (stem 0, branch 10)
  // 甲 = stem 0, 戌 = branch 10

  const refDate = new Date(1900, 0, 1); // Jan 1, 1900
  const targetDate = new Date(year, month - 1, day);
  const diffMs = targetDate.getTime() - refDate.getTime();
  const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));

  // 1900-01-01 is 甲戌: stem=0(甲), branch=10(戌)
  const stemIndex = (((diffDays + 0) % 10) + 10) % 10;
  const branchIndex = (((diffDays + 10) % 12) + 12) % 12;

  const stem = stemIndex as HeavenlyStem;
  const branch = branchIndex as EarthlyBranch;

  return {
    stem,
    branch,
    name: getStemBranchName(stem, branch),
    element: STEM_ELEMENT[stem],
    yinYang: STEM_YINYANG[stem],
    hiddenStems: BRANCH_HIDDEN_STEMS[branch],
    nayin: getNayin(stem, branch),
  };
}

// ===== 时柱计算 =====
export function calcHourPillar(dayPillarStem: HeavenlyStem, hour: number): Pillar {
  const branchIndex = getHourBranchIndex(hour);
  const branch = branchIndex as EarthlyBranch;

  // 根据日干用五鼠遁确定子时天干
  const baseStem = HOUR_STEM_OFFSET[dayPillarStem];
  // 从子时(0)开始,逐时递增
  const stemIndex = (baseStem + branchIndex) % 10;
  const stem = stemIndex as HeavenlyStem;

  return {
    stem,
    branch,
    name: getStemBranchName(stem, branch),
    element: STEM_ELEMENT[stem],
    yinYang: STEM_YINYANG[stem],
    hiddenStems: BRANCH_HIDDEN_STEMS[branch],
    nayin: getNayin(stem, branch),
  };
}

// ===== 计算四柱 =====
export function calcFourPillars(input: BaziInput): FourPillars {
  const { year, month, day, hour } = input;

  // 年柱
  const yearPillar = calcYearPillar(year, month, day);

  // 月柱
  const monthPillar = calcMonthPillar(yearPillar.stem, month);

  // 日柱
  const dayPillar = calcDayPillar(year, month, day);

  // 时柱
  const hourPillar = calcHourPillar(dayPillar.stem, hour);

  return {
    year: yearPillar,
    month: monthPillar,
    day: dayPillar,
    hour: hourPillar,
  };
}
