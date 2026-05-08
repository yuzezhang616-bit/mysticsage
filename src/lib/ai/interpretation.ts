// ============================================================
// MysticSage - AI Interpretation Service
// AI 解读服务 - 调用 GPT-4o-mini 生成个性化解讀
// ============================================================

import { BaziResult, FourPillars, Element } from '../bazi/types';
import { STEM_NAMES, BRANCH_NAMES, STEM_ELEMENT } from '../bazi/constants';
import { STEM_EN, BRANCH_EN, ELEMENT_EN, STEM_DESC_EN, TENGOD_EN, ELEMENT_ZH } from '../bazi/english';
import { getElementName } from '../bazi/elements';

export interface ReadingSections {
  personality: string;
  career: string;
  wealth: string;
  relationships: string;
  advice: string;
}

export interface AiReading {
  en: ReadingSections;
  zh: ReadingSections;
}

// ===== Build Prompt =====
function buildBaziContext(result: BaziResult, lang: 'en' | 'zh'): string {
  const { pillars } = result;
  const isEn = lang === 'en';

  if (isEn) {
    const stem = (s: any) => STEM_EN[s as keyof typeof STEM_EN] || STEM_NAMES[s as keyof typeof STEM_NAMES];
    const branch = (b: any) => BRANCH_EN[b as keyof typeof BRANCH_EN] || BRANCH_NAMES[b as keyof typeof BRANCH_NAMES];

    return `
FOUR PILLARS (四柱八字):
- Year Pillar (年柱): ${stem(pillars.year.stem)}-${branch(pillars.year.branch)} (${STEM_DESC_EN[pillars.year.stem].element})
- Month Pillar (月柱): ${stem(pillars.month.stem)}-${branch(pillars.month.branch)} (${STEM_DESC_EN[pillars.month.stem].element})
- Day Pillar (日柱): ${stem(pillars.day.stem)}-${branch(pillars.day.branch)} (${STEM_DESC_EN[pillars.day.stem].element}) ← DAY MASTER
- Hour Pillar (时柱): ${stem(pillars.hour.stem)}-${branch(pillars.hour.branch)} (${STEM_DESC_EN[pillars.hour.stem].element})

DAY MASTER (日主): ${STEM_DESC_EN[result.dayMaster].element}
 - Imagery: ${STEM_DESC_EN[result.dayMaster].imagery}

FIVE ELEMENTS SCORES (0-100):
- Wood: ${result.elementScores.wood}% | Fire: ${result.elementScores.fire}% | Earth: ${result.elementScores.earth}% | Metal: ${result.elementScores.metal}% | Water: ${result.elementScores.water}%

ELEMENTAL BALANCE: ${result.isStrong ? 'ABUNDANT (身强)' : 'DEFICIENT (身弱)'}
FAVORABLE ELEMENTS: ${result.favorableElements.map(e => e.toUpperCase()).join(', ')}
UNFAVORABLE ELEMENTS: ${result.unfavorableElements.map(e => e.toUpperCase()).join(', ')}

BIRTH INFO: ${result.birthInfo.year}-${result.birthInfo.month}-${result.birthInfo.day} at ${result.birthInfo.hour.toString().padStart(2, '0')}:${result.birthInfo.minute.toString().padStart(2, '0')}, Gender: ${result.birthInfo.gender}
`;
  } else {
    return `
四柱八字:
- 年柱: ${STEM_NAMES[pillars.year.stem]}${BRANCH_NAMES[pillars.year.branch]}
- 月柱: ${STEM_NAMES[pillars.month.stem]}${BRANCH_NAMES[pillars.month.branch]}
- 日柱: ${STEM_NAMES[pillars.day.stem]}${BRANCH_NAMES[pillars.day.branch]} ← 日主
- 时柱: ${STEM_NAMES[pillars.hour.stem]}${BRANCH_NAMES[pillars.hour.branch]}

日主五行: ${getElementName(STEM_ELEMENT[result.dayMaster], 'zh')}

五行评分 (0-100):
木: ${result.elementScores.wood} | 火: ${result.elementScores.fire} | 土: ${result.elementScores.earth} | 金: ${result.elementScores.metal} | 水: ${result.elementScores.water}

五行平衡: ${result.isStrong ? '身强' : '身弱'}
喜用神: ${result.favorableElements.map(e => getElementName(e, 'zh')).join('、')}
忌神: ${result.unfavorableElements.map(e => getElementName(e, 'zh')).join('、')}

出生信息: ${result.birthInfo.year}年${result.birthInfo.month}月${result.birthInfo.day}日 ${result.birthInfo.hour.toString().padStart(2, '0')}:${result.birthInfo.minute.toString().padStart(2, '0')}, 性别${result.birthInfo.gender === 'male' ? '男' : '女'}
`;
  }
}

// ===== Build System Prompt =====
function getSystemPrompt(lang: 'en' | 'zh'): string {
  if (lang === 'en') {
    return `You are MysticSage, an ancient Chinese Bazi (Eight Characters) fortune teller who combines 5,000 years of Eastern wisdom with modern psychology.

Your task: Based on the user's Bazi (Four Pillars) chart data, generate a personalized fortune reading.

IMPORTANT RULES:
1. Be poetic, warm, and insightful - NOT robotic or dry
2. Reference the specific Heavenly Stems and Earthly Branches of the user's chart
3. Connect the Five Elements analysis to practical life advice
4. Use "you" to speak directly to the user
5. Keep each section 2-4 sentences - concise but meaningful
6. DO NOT use the word "according to your Bazi chart" - just say it naturally
7. Make it feel like wisdom from an ancient sage, not an AI

Output MUST be valid JSON with the following structure (no markdown, no code blocks, just raw JSON):
{
  "personality": "Your personality reading...",
  "career": "Your career reading...",
  "wealth": "Your wealth reading...",
  "relationships": "Your relationships reading...",
  "advice": "Your life advice..."
}`;
  } else {
    return `你是一位精通八字命理的东方智者 MysticSage，融合五千年东方智慧与现代心理学。

任务：根据用户的八字排盘数据，生成个性化命运解读。

重要规则：
1. 语言优美、温暖且有洞见 - 不要干巴巴的
2. 引用用户具体的四柱天干地支信息
3. 将五行分析与实际生活建议结合起来
4. 用"你"直接与用户对话
5. 每个板块 2-4 句话 - 简洁但有意义
6. 让它听起来像是古代智者的智慧，而不是 AI 生成的
7. 可以适当引用古籍典故，但别太生僻

输出必须是如下 JSON 格式（不要 markdown，不要 \`\`\`，直接输出 JSON）：
{
  "personality": "你的性格解读...",
  "career": "你的事业解读...",
  "wealth": "你的财运解读...",
  "relationships": "你的感情解读...",
  "advice": "你的人生建议..."
}`;
  }
}

// ===== AI Provider Configuration =====
const AI_PROVIDER = process.env.AI_PROVIDER || 'openai';

function getApiConfig(apiKey: string): { baseUrl: string; model: string } {
  switch (AI_PROVIDER) {
    case 'minimax':
      return {
        baseUrl: 'https://api.minimax.chat/v1/chat/completions',
        model: 'abab5.5s',
      };
    case 'deepseek':
      return {
        baseUrl: 'https://api.deepseek.com/v1/chat/completions',
        model: 'deepseek-chat',
      };
    case 'openai':
    default:
      return {
        baseUrl: 'https://api.openai.com/v1/chat/completions',
        model: 'gpt-4o-mini',
      };
  }
}

// ===== Call AI API =====
export async function generateAiReading(result: BaziResult, lang: 'en' | 'zh', apiKey: string): Promise<ReadingSections | null> {
  const systemPrompt = getSystemPrompt(lang);
  const userPromptEn = `Please generate a personal Bazi (八字) fortune reading based on this chart:

${buildBaziContext(result, lang)}

Output ONLY the JSON format as instructed.`;

const userPromptZh = `请根据以下八字数据生成一份命运解读：

${buildBaziContext(result, lang)}

只输出 JSON 格式，不要任何其他内容。`;

  const userPrompt = lang === 'en' ? userPromptEn : userPromptZh;
  const { baseUrl, model } = getApiConfig(apiKey);

  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.75,
        max_tokens: 1200,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('AI API error:', errorBody);
      // 如果 API 调用失败（余额不足、模型不支持等），返回 null 让调用方降级
      return null;
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) return null;

    // Try to parse JSON from the response
    try {
      // Remove markdown code blocks if present
      const cleanJson = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      return {
        personality: parsed.personality || '',
        career: parsed.career || '',
        wealth: parsed.wealth || '',
        relationships: parsed.relationships || '',
        advice: parsed.advice || '',
      };
    } catch {
      console.error('Failed to parse AI response as JSON:', content.substring(0, 200));
      return null;
    }
  } catch (err) {
    console.error('AI API call failed:', err);
    return null;
  }
}

// ===== Generate Both Languages =====
export async function generateBilingualReading(
  result: BaziResult,
  apiKey: string,
): Promise<AiReading | null> {
  const [en, zh] = await Promise.all([
    generateAiReading(result, 'en', apiKey),
    generateAiReading(result, 'zh', apiKey),
  ]);

  if (!en && !zh) return null;

  return {
    en: en || {
      personality: 'Reading temporarily unavailable.',
      career: '', wealth: '', relationships: '', advice: '',
    },
    zh: zh || {
      personality: '解读暂时不可用。',
      career: '', wealth: '', relationships: '', advice: '',
    },
  };
}
