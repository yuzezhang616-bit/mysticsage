// ============================================================
// MysticSage - Bazi Engine Types
// 八字排盘核心类型定义
// ============================================================

/** 天干 */
export enum HeavenlyStem {
  甲, 乙, 丙, 丁, 戊, 己, 庚, 辛, 壬, 癸
}

/** 地支 */
export enum EarthlyBranch {
  子, 丑, 寅, 卯, 辰, 巳, 午, 未, 申, 酉, 戌, 亥
}

/** 五行 */
export enum Element {
  金 = 'metal',
  木 = 'wood',
  水 = 'water',
  火 = 'fire',
  土 = 'earth'
}

/** 阴阳 */
export enum YinYang {
  Yang = 'yang',
  Yin = 'yin'
}

/** 性别 */
export enum Gender {
  Male = 'male',
  Female = 'female'
}

/** 单个柱 (如年柱、月柱) */
export interface Pillar {
  stem: HeavenlyStem;
  branch: EarthlyBranch;
  /** 干支组合名称，如 "甲子" */
  name: string;
  /** 五行 */
  element: Element;
  /** 阴阳 */
  yinYang: YinYang;
  /** 藏干 (地支中藏的天干) */
  hiddenStems: HeavenlyStem[];
  /** 纳音 */
  nayin: string;
}

/** 四柱 */
export interface FourPillars {
  year: Pillar;
  month: Pillar;
  day: Pillar;
  hour: Pillar;
}

/** 五行强度评分 (0-100) */
export interface ElementScore {
  metal: number;
  wood: number;
  water: number;
  fire: number;
  earth: number;
}

/** 十神 */
export enum TenGod {
  正官 = 'positive_official',
  偏官 = 'seven_kill',
  正印 = 'positive_seal',
  偏印 = 'negative_seal',
  比肩 = 'peer',
  劫财 = 'rob_finance',
  食神 = 'food_god',
  伤官 = 'hurt_official',
  正财 = 'positive_wealth',
  偏财 = 'partial_wealth'
}

/** 十神分析 */
export interface TenGodAnalysis {
  /** 年柱天干 */
  yearStem: TenGod;
  /** 月柱天干 */
  monthStem: TenGod;
  /** 时柱天干 */
  hourStem: TenGod;
  /** 日支藏干 */
  dayBranchHidden: TenGod[];
}

/** 八字完整结果 */
export interface BaziResult {
  /** 四柱 */
  pillars: FourPillars;
  /** 五行评分 */
  elementScores: ElementScore;
  /** 日主 (日柱天干) */
  dayMaster: HeavenlyStem;
  /** 日主五行 */
  dayMasterElement: Element;
  /** 日主阴阳 */
  dayMasterYinYang: YinYang;
  /** 十神分析 */
  tenGods: TenGodAnalysis;
  /** 身强/身弱 */
  isStrong: boolean;
  /** 喜用神 */
  favorableElements: Element[];
  /** 忌神 */
  unfavorableElements: Element[];
  /** 空亡 */
  void: { stem: HeavenlyStem; branch: EarthlyBranch }[];
  /** 出生时间信息 */
  birthInfo: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    gender: Gender;
  };
}

/** 用户输入 */
export interface BaziInput {
  year: number;
  month: number;   // 1-12
  day: number;     // 1-31
  hour: number;    // 0-23
  minute: number;  // 0-59
  gender: Gender;
  /** 出生地时区偏移（小时），如中国为 8 */
  timezoneOffset: number;
}
