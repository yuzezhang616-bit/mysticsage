// ============================================================
// MysticSage - Five Elements Analysis Engine
// 五行分析引擎 - 纯本地算法
// ============================================================

import {
  Element, HeavenlyStem, EarthlyBranch, BaziResult, Pillar,
  FourPillars, BaziInput, Gender,
} from './types';
import {
  STEM_ELEMENT, BRANCH_ELEMENT, BRANCH_HIDDEN_STEMS,
} from './constants';
import { calcFourPillars } from './pillars';

/** 五行生克顺序 (相生) */
const GENERATING: Record<Element, Element> = {
  [Element.木]: Element.火,
  [Element.火]: Element.土,
  [Element.土]: Element.金,
  [Element.金]: Element.水,
  [Element.水]: Element.木,
};

/** 五行相克 */
const CONTROLLING: Record<Element, Element> = {
  [Element.木]: Element.土,
  [Element.土]: Element.水,
  [Element.水]: Element.火,
  [Element.火]: Element.金,
  [Element.金]: Element.木,
};

/** 五行的相生关系 */
export function getGenerating(e: Element): Element {
  return GENERATING[e];
}

/** 五行的相克关系 */
export function getControlling(e: Element): Element {
  return CONTROLLING[e];
}

/** 获取五行中文名 */
export function getElementName(e: Element, lang: 'en' | 'zh' = 'zh'): string {
  const names = {
    [Element.金]: { zh: '金', en: 'Metal' },
    [Element.木]: { zh: '木', en: 'Wood' },
    [Element.水]: { zh: '水', en: 'Water' },
    [Element.火]: { zh: '火', en: 'Fire' },
    [Element.土]: { zh: '土', en: 'Earth' },
  };
  return names[e][lang];
}

// ===== 五行评分 =====
export function calcElementScores(pillars: FourPillars): Record<string, number> {
  const scores: Record<string, number> = {
    metal: 0, wood: 0, water: 0, fire: 0, earth: 0,
  };

  const addScore = (element: Element, weight: number) => {
    const key = element as string;
    scores[key] = (scores[key] || 0) + weight;
  };

  // 四柱天干: 每个权重 3
  for (const p of [pillars.year, pillars.month, pillars.day, pillars.hour] as Pillar[]) {
    addScore(STEM_ELEMENT[p.stem], 3);
  }

  // 四柱地支: 每个权重 2
  for (const p of [pillars.year, pillars.month, pillars.day, pillars.hour] as Pillar[]) {
    addScore(BRANCH_ELEMENT[p.branch], 2);
  }

  // 地支藏干: 主气权重 1.5, 中气 0.8, 余气 0.5
  const branchWeights = [1.5, 0.8, 0.5];
  for (const p of [pillars.year, pillars.month, pillars.day, pillars.hour] as Pillar[]) {
    const hidden = BRANCH_HIDDEN_STEMS[p.branch];
    hidden.forEach((stem, i) => {
      addScore(STEM_ELEMENT[stem], branchWeights[i] || 0.5);
    });
  }

  // 归一化到 0-100
  const maxScore = Math.max(...Object.values(scores), 1);
  const normalized: Record<string, number> = {};
  for (const [key, val] of Object.entries(scores)) {
    normalized[key] = Math.round((val / maxScore) * 100);
  }

  return normalized;
}

// ===== 日主强弱判断 =====
export function checkStrength(
  dayMasterElement: Element,
  elementScores: Record<string, number>,
): { isStrong: boolean; favorable: Element[]; unfavorable: Element[] } {
  const masterKey = dayMasterElement as string;
  const masterScore = elementScores[masterKey] || 0;

  // 生助日主的五行: 同我(比肩) + 生我(印星)
  const supportingElements: Record<string, Element[]> = {
    [Element.木]: [Element.木, Element.水],
    [Element.火]: [Element.火, Element.木],
    [Element.土]: [Element.土, Element.火],
    [Element.金]: [Element.金, Element.土],
    [Element.水]: [Element.水, Element.金],
  };

  const supportScore = (supportingElements[dayMasterElement] || []).reduce(
    (sum, e) => sum + (elementScores[e as string] || 0), 0
  );

  const isStrong = supportScore >= 50;

  // 喜用神 = 能克制过旺的五行 + 能补足过弱的五行
  // 简化: 身强喜克泄(官杀+食伤+财), 身弱喜生扶(印+比劫)
  if (isStrong) {
    // 身强: 喜克泄 (官杀、食伤、财)
    const draining: Record<Element, Element[]> = {
      [Element.木]: [Element.金, Element.火, Element.土],
      [Element.火]: [Element.水, Element.土, Element.金],
      [Element.土]: [Element.木, Element.金, Element.水],
      [Element.金]: [Element.火, Element.水, Element.木],
      [Element.水]: [Element.土, Element.木, Element.火],
    };
    return {
      isStrong: true,
      favorable: draining[dayMasterElement] || [],
      unfavorable: supportingElements[dayMasterElement] || [],
    };
  } else {
    // 身弱: 喜生扶 (印、比劫)
    return {
      isStrong: false,
      favorable: supportingElements[dayMasterElement] || [],
      unfavorable: Object.values(Element).filter(
        e => !supportingElements[dayMasterElement]?.includes(e) && e !== dayMasterElement
      ),
    };
  }
}
