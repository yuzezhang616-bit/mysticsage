// ============================================================
// MysticSage - Database Cache Layer
// 数据库缓存层 - 按唯一八字标识缓存 AI 解读
// ============================================================

import { BaziInput, BaziResult } from '../bazi/types';
import { calculateBazi } from '../bazi';
import { generateBilingualReading, AiReading } from '../ai/interpretation';
import { generateSeedReading } from '../reading/seed-readings';

const API_KEY = process.env.OPENAI_API_KEY || '';
const USE_AI = API_KEY.length > 0;

/**
 * 生成唯一八字标识 Key
 * 相同生日+性别 → 相同 Key → 复用解读
 */
export function generateBirthKey(input: BaziInput): string {
  const { year, month, day, hour, minute, gender } = input;
  return `${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}${String(hour).padStart(2, '0')}${String(minute).padStart(2, '0')}_${gender}`;
}

/**
 * 缓存存储 (内存版 - MVP 使用)
 * 生产环境会替换为 PostgreSQL + Redis
 */
const readingCache = new Map<string, AiReading>();
const baziCache = new Map<string, BaziResult>();
const cacheHits = new Map<string, number>(); // 缓存命中计数

/**
 * 获取或生成八字结果 + AI 解读
 * 核心逻辑:
 *   1. 检查缓存 → 有则直接返回 (零 Token 成本)
 *   2. 无缓存 → 本地算 Bazi + AI 生成 → 写入缓存
 */
export async function getOrGenerateReading(
  input: BaziInput,
): Promise<{
  bazi: BaziResult;
  reading: AiReading | null;
  fromCache: boolean;
}> {
  const key = generateBirthKey(input);

  // 1. 检查本地 Bazi 缓存 (零成本)
  const cachedBazi = baziCache.get(key);
  const cachedReading = readingCache.get(key);

  if (cachedBazi && cachedReading) {
    // 命中缓存!
    cacheHits.set(key, (cacheHits.get(key) || 0) + 1);
    return {
      bazi: cachedBazi,
      reading: cachedReading,
      fromCache: true,
    };
  }

  // 2. 如果已有 Bazi 结果但无 AI 解读
  if (cachedBazi && !cachedReading) {
    const reading = await generateBilingualReading(cachedBazi, API_KEY);
    if (reading) {
      readingCache.set(key, reading);
    }
    return {
      bazi: cachedBazi,
      reading: reading || null,
      fromCache: false,
    };
  }

  // 3. 全新计算
  console.log(`[MysticSage] No cache for key: ${key}, generating...`);
  const bazi = calculateBazi(input);
  baziCache.set(key, bazi);

  // 根据是否配置 API Key 选择生成方式
  let reading: AiReading | null = null;

  if (USE_AI) {
    // 有 API Key → 尝试调用 AI 生成
    try {
      reading = await generateBilingualReading(bazi, API_KEY);
    } catch (err) {
      console.error('[MysticSage] AI generation failed, falling back to seed:', err);
    }
  }

  // 如果 AI 失败或无 API Key → 使用离线模板
  if (!reading) {
    const enReading = generateSeedReading(bazi, 'en');
    const zhReading = generateSeedReading(bazi, 'zh');
    reading = { en: enReading, zh: zhReading };
  }

  if (reading) {
    readingCache.set(key, reading);
  }

  return {
    bazi,
    reading: reading || null,
    fromCache: false,
  };
}

/** 缓存统计 */
export function getCacheStats() {
  return {
    totalBaziCached: baziCache.size,
    totalReadingsCached: readingCache.size,
    cacheHits: Array.from(cacheHits.entries()).map(([k, v]) => ({ key: k, hits: v })),
  };
}

/**
 * 模拟免费用户可看的解读 (从缓存中取别人的)
 * 免费用户不直接生成新解读，但可以看到已有解读的摘要
 */
export function getDemoReading(): AiReading | null {
  // 取第一个人已有的解读作为示例
  const first = readingCache.values().next().value;
  return first || null;
}
