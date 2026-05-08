// ============================================================
// MysticSage - Bazi Constants & Lookup Tables
// 八字常量与对照表
// ============================================================

import { HeavenlyStem, EarthlyBranch, Element, YinYang } from './types';

// ===== 天干 =====
export const STEM_NAMES: Record<HeavenlyStem, string> = {
  [HeavenlyStem.甲]: '甲', [HeavenlyStem.乙]: '乙',
  [HeavenlyStem.丙]: '丙', [HeavenlyStem.丁]: '丁',
  [HeavenlyStem.戊]: '戊', [HeavenlyStem.己]: '己',
  [HeavenlyStem.庚]: '庚', [HeavenlyStem.辛]: '辛',
  [HeavenlyStem.壬]: '壬', [HeavenlyStem.癸]: '癸',
};

export const STEM_ENGLISH: Record<HeavenlyStem, { name: string; element: string }> = {
  [HeavenlyStem.甲]: { name: 'Jia (Yang Wood)', element: 'Big Tree' },
  [HeavenlyStem.乙]: { name: 'Yi (Yin Wood)', element: 'Vine/Flower' },
  [HeavenlyStem.丙]: { name: 'Bing (Yang Fire)', element: 'Sun Fire' },
  [HeavenlyStem.丁]: { name: 'Ding (Yin Fire)', element: 'Candle Fire' },
  [HeavenlyStem.戊]: { name: 'Wu (Yang Earth)', element: 'Mountain Earth' },
  [HeavenlyStem.己]: { name: 'Ji (Yin Earth)', element: 'Garden Earth' },
  [HeavenlyStem.庚]: { name: 'Geng (Yang Metal)', element: 'Sword Metal' },
  [HeavenlyStem.辛]: { name: 'Xin (Yin Metal)', element: 'Jewelry Metal' },
  [HeavenlyStem.壬]: { name: 'Ren (Yang Water)', element: 'Ocean Water' },
  [HeavenlyStem.癸]: { name: 'Gui (Yin Water)', element: 'Rain Water' },
};

// ===== 地支 =====
export const BRANCH_NAMES: Record<EarthlyBranch, string> = {
  [EarthlyBranch.子]: '子', [EarthlyBranch.丑]: '丑',
  [EarthlyBranch.寅]: '寅', [EarthlyBranch.卯]: '卯',
  [EarthlyBranch.辰]: '辰', [EarthlyBranch.巳]: '巳',
  [EarthlyBranch.午]: '午', [EarthlyBranch.未]: '未',
  [EarthlyBranch.申]: '申', [EarthlyBranch.酉]: '酉',
  [EarthlyBranch.戌]: '戌', [EarthlyBranch.亥]: '亥',
};

export const BRANCH_HOUR_RANGES: Record<EarthlyBranch, string> = {
  [EarthlyBranch.子]: '23:00-00:59',
  [EarthlyBranch.丑]: '01:00-02:59',
  [EarthlyBranch.寅]: '03:00-04:59',
  [EarthlyBranch.卯]: '05:00-06:59',
  [EarthlyBranch.辰]: '07:00-08:59',
  [EarthlyBranch.巳]: '09:00-10:59',
  [EarthlyBranch.午]: '11:00-12:59',
  [EarthlyBranch.未]: '13:00-14:59',
  [EarthlyBranch.申]: '15:00-16:59',
  [EarthlyBranch.酉]: '17:00-18:59',
  [EarthlyBranch.戌]: '19:00-20:59',
  [EarthlyBranch.亥]: '21:00-22:59',
};

// ===== 五行归属 =====
/** 天干五行 */
export const STEM_ELEMENT: Record<HeavenlyStem, Element> = {
  [HeavenlyStem.甲]: Element.木, [HeavenlyStem.乙]: Element.木,
  [HeavenlyStem.丙]: Element.火, [HeavenlyStem.丁]: Element.火,
  [HeavenlyStem.戊]: Element.土, [HeavenlyStem.己]: Element.土,
  [HeavenlyStem.庚]: Element.金, [HeavenlyStem.辛]: Element.金,
  [HeavenlyStem.壬]: Element.水, [HeavenlyStem.癸]: Element.水,
};

/** 地支五行 */
export const BRANCH_ELEMENT: Record<EarthlyBranch, Element> = {
  [EarthlyBranch.子]: Element.水, [EarthlyBranch.丑]: Element.土,
  [EarthlyBranch.寅]: Element.木, [EarthlyBranch.卯]: Element.木,
  [EarthlyBranch.辰]: Element.土, [EarthlyBranch.巳]: Element.火,
  [EarthlyBranch.午]: Element.火, [EarthlyBranch.未]: Element.土,
  [EarthlyBranch.申]: Element.金, [EarthlyBranch.酉]: Element.金,
  [EarthlyBranch.戌]: Element.土, [EarthlyBranch.亥]: Element.水,
};

// ===== 阴阳 =====
/** 天干阴阳 */
export const STEM_YINYANG: Record<HeavenlyStem, YinYang> = {
  [HeavenlyStem.甲]: YinYang.Yang, [HeavenlyStem.乙]: YinYang.Yin,
  [HeavenlyStem.丙]: YinYang.Yang, [HeavenlyStem.丁]: YinYang.Yin,
  [HeavenlyStem.戊]: YinYang.Yang, [HeavenlyStem.己]: YinYang.Yin,
  [HeavenlyStem.庚]: YinYang.Yang, [HeavenlyStem.辛]: YinYang.Yin,
  [HeavenlyStem.壬]: YinYang.Yang, [HeavenlyStem.癸]: YinYang.Yin,
};

/** 地支阴阳 */
export const BRANCH_YINYANG: Record<EarthlyBranch, YinYang> = {
  [EarthlyBranch.子]: YinYang.Yang, [EarthlyBranch.丑]: YinYang.Yin,
  [EarthlyBranch.寅]: YinYang.Yang, [EarthlyBranch.卯]: YinYang.Yin,
  [EarthlyBranch.辰]: YinYang.Yang, [EarthlyBranch.巳]: YinYang.Yin,
  [EarthlyBranch.午]: YinYang.Yang, [EarthlyBranch.未]: YinYang.Yin,
  [EarthlyBranch.申]: YinYang.Yang, [EarthlyBranch.酉]: YinYang.Yin,
  [EarthlyBranch.戌]: YinYang.Yang, [EarthlyBranch.亥]: YinYang.Yin,
};

// ===== 藏干（地支中暗藏的天干）=====
export const BRANCH_HIDDEN_STEMS: Record<EarthlyBranch, HeavenlyStem[]> = {
  [EarthlyBranch.子]: [HeavenlyStem.癸],
  [EarthlyBranch.丑]: [HeavenlyStem.己, HeavenlyStem.癸, HeavenlyStem.辛],
  [EarthlyBranch.寅]: [HeavenlyStem.甲, HeavenlyStem.丙, HeavenlyStem.戊],
  [EarthlyBranch.卯]: [HeavenlyStem.乙],
  [EarthlyBranch.辰]: [HeavenlyStem.戊, HeavenlyStem.乙, HeavenlyStem.癸],
  [EarthlyBranch.巳]: [HeavenlyStem.丙, HeavenlyStem.庚, HeavenlyStem.戊],
  [EarthlyBranch.午]: [HeavenlyStem.丁, HeavenlyStem.己],
  [EarthlyBranch.未]: [HeavenlyStem.己, HeavenlyStem.丁, HeavenlyStem.乙],
  [EarthlyBranch.申]: [HeavenlyStem.庚, HeavenlyStem.壬, HeavenlyStem.戊],
  [EarthlyBranch.酉]: [HeavenlyStem.辛],
  [EarthlyBranch.戌]: [HeavenlyStem.戊, HeavenlyStem.辛, HeavenlyStem.丁],
  [EarthlyBranch.亥]: [HeavenlyStem.壬, HeavenlyStem.甲],
};

// ===== 纳音 =====
export const NAYIN: Record<string, string> = {
  '甲子乙丑': '海中金', '丙寅丁卯': '炉中火',
  '戊辰己巳': '大林木', '庚午辛未': '路旁土',
  '壬申癸酉': '剑锋金', '甲戌乙亥': '山头火',
  '丙子丁丑': '涧下水', '戊寅己卯': '城头土',
  '庚辰辛巳': '白蜡金', '壬午癸未': '杨柳木',
  '甲申乙酉': '泉中水', '丙戌丁亥': '屋上土',
  '戊子己丑': '霹雳火', '庚寅辛卯': '松柏木',
  '壬辰癸巳': '长流水', '甲午乙未': '沙中金',
  '丙申丁酉': '山下火', '戊戌己亥': '平地木',
  '庚子辛丑': '壁上土', '壬寅癸卯': '金箔金',
  '甲辰乙巳': '覆灯火', '丙午丁未': '天河水',
  '戊申己酉': '大驿土', '庚戌辛亥': '钗钏金',
  '壬子癸丑': '桑柘木', '甲寅乙卯': '大溪水',
  '丙辰丁巳': '沙中土', '戊午己未': '天上火',
  '庚申辛酉': '石榴木', '壬戌癸亥': '大海水',
};

// ===== 五虎遁（年上起月）=====
// 根据年干确定正月(寅月)的天干
// 甲己之年丙作首, 乙庚之岁戊为头
// 丙辛之年寻庚上, 丁壬壬寅顺水流
// 若问戊癸何处起, 甲寅之上好追求
export const MONTH_STEM_OFFSET: Record<HeavenlyStem, number> = {
  [HeavenlyStem.甲]: 2,  // 丙 = index 2
  [HeavenlyStem.己]: 2,  // 丙
  [HeavenlyStem.乙]: 4,  // 戊 = index 4
  [HeavenlyStem.庚]: 4,  // 戊
  [HeavenlyStem.丙]: 6,  // 庚 = index 6
  [HeavenlyStem.辛]: 6,  // 庚
  [HeavenlyStem.丁]: 8,  // 壬 = index 8
  [HeavenlyStem.壬]: 8,  // 壬
  [HeavenlyStem.戊]: 0,  // 甲 = index 0
  [HeavenlyStem.癸]: 0,  // 甲
};

// ===== 五鼠遁（日上起时）=====
// 根据日干确定子时的天干
// 甲己还加甲, 乙庚丙作初
// 丙辛从戊起, 丁壬庚子居
// 戊癸何方发, 壬子是真途
export const HOUR_STEM_OFFSET: Record<HeavenlyStem, number> = {
  [HeavenlyStem.甲]: 0,  // 甲
  [HeavenlyStem.己]: 0,  // 甲
  [HeavenlyStem.乙]: 2,  // 丙
  [HeavenlyStem.庚]: 2,  // 丙
  [HeavenlyStem.丙]: 4,  // 戊
  [HeavenlyStem.辛]: 4,  // 戊
  [HeavenlyStem.丁]: 6,  // 庚
  [HeavenlyStem.壬]: 6,  // 庚
  [HeavenlyStem.戊]: 8,  // 壬
  [HeavenlyStem.癸]: 8,  // 壬
};

// ===== 地支对应农历月份（寅为正月）=====
export const BRANCH_TO_MONTH = {
  [EarthlyBranch.寅]: 1, [EarthlyBranch.卯]: 2, [EarthlyBranch.辰]: 3,
  [EarthlyBranch.巳]: 4, [EarthlyBranch.午]: 5, [EarthlyBranch.未]: 6,
  [EarthlyBranch.申]: 7, [EarthlyBranch.酉]: 8, [EarthlyBranch.戌]: 9,
  [EarthlyBranch.亥]: 10, [EarthlyBranch.子]: 11, [EarthlyBranch.丑]: 12,
};

/** 时辰转地支索引 (0=子时23:00-00:59, 1=丑时01:00-02:59, ...) */
export function getHourBranchIndex(hour: number): number {
  // 子时跨两天: 23:00-00:59
  if (hour === 23 || hour === 0) return 0;
  // 其他时辰: 每两小时一个
  return Math.floor((hour + 1) / 2);
}

/** 获取常规节气月份(简化: 以立春2月4日为界确定年柱) */
export function isBeforeSpringFestival(month: number, day: number): boolean {
  // 立春通常在 2月4日左右
  if (month < 2) return true;
  if (month === 2 && day < 4) return true;
  return false;
}
