'use client';

import { useState, useCallback } from 'react';
import type { BaziResult, Gender, BaziInput } from '@/lib/bazi/types';
import type { AiReading } from '@/lib/ai/interpretation';
import { calculateBazi } from '@/lib/bazi';
import { generateSeedReading } from '@/lib/reading/seed-readings';
import BaziChart from '@/components/BaziChart';
import ReadingPanel from '@/components/ReadingPanel';
import messagesEn from '../../messages/en.json';
import messagesZh from '../../messages/zh.json';

type Messages = typeof messagesEn;
type Lang = 'en' | 'zh';

function t(key: string, lang: Lang, messages: Messages): string {
  const keys = key.split('.');
  let val: any = messages;
  for (const k of keys) { val = val?.[k]; }
  return val || key;
}

const STARS = 120;
const starPositions: { x: number; y: number; size: number; duration: number; delay: number; opacity: number }[] = [];
for (let i = 0; i < STARS; i++) {
  starPositions.push({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.6 + 0.2,
  });
}

declare module 'react' {
  interface CSSProperties {
    '--duration'?: string;
    '--max-opacity'?: number;
  }
}

export default function Home() {
  const [lang, setLang] = useState<Lang>('en');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BaziResult | null>(null);
  const [reading, setReading] = useState<AiReading | null>(null);
  const [error, setError] = useState('');
  const [messages] = useState({ en: messagesEn, zh: messagesZh });

  const [formData, setFormData] = useState({
    year: '', month: '', day: '', hour: '', minute: '', gender: 'male' as 'male' | 'female',
  });
  const [submitted, setSubmitted] = useState(false);

  const isValid =
    formData.year && formData.month && formData.day &&
    parseInt(formData.year) >= 1900 && parseInt(formData.year) <= 2100 &&
    parseInt(formData.month) >= 1 && parseInt(formData.month) <= 12 &&
    parseInt(formData.day) >= 1 && parseInt(formData.day) <= 31;

  const handleSubmit = useCallback(async () => {
    setSubmitted(true);
    setLoading(true);
    setError('');
    setResult(null);
    setReading(null);

    try {
      const bazi = calculateBazi({
        year: parseInt(formData.year),
        month: parseInt(formData.month),
        day: parseInt(formData.day),
        hour: parseInt(formData.hour),
        minute: parseInt(formData.minute) || 0,
        gender: formData.gender as Gender,
        timezoneOffset: 8,
      });

      const m = lang === 'en' ? messagesEn : messagesZh;
      const enReading = generateSeedReading(bazi, 'en');
      const zhReading = generateSeedReading(bazi, 'zh');
      const reading: AiReading = { en: enReading, zh: zhReading };

      setResult(bazi);
      setReading(reading);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please check your input and try again.');
    } finally {
      setLoading(false);
    }
  }, [formData, lang]);

  return (
    <>
      {/* 星空背景 */}
      <div className="starry-bg">
        <div className="aurora" />
        {starPositions.map((s, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              '--duration': `${s.duration}s`,
              '--max-opacity': s.opacity,
              animationDelay: `${s.delay}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <main className="min-h-screen relative z-10">
        {/* ========== 顶栏 ========== */}
        <nav className="border-b border-[rgba(212,175,55,0.1)] bg-[#07080a]/60 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl gold-text font-bold">✦ MysticSage</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  lang === 'en'
                    ? 'bg-[#d4af37]/20 text-[#f0d68a] border border-[#d4af37]/30'
                    : 'text-[#9b8e7a] hover:text-[#e8dcc8]'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('zh')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  lang === 'zh'
                    ? 'bg-[#d4af37]/20 text-[#f0d68a] border border-[#d4af37]/30'
                    : 'text-[#9b8e7a] hover:text-[#e8dcc8]'
                }`}
              >
                中文
              </button>
            </div>
          </div>
        </nav>

        {/* ========== 主内容 ========== */}
        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* 标题区 */}
          {!submitted && (
            <div className="text-center mb-12">
              <div className="text-6xl mb-6 select-none">☰</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 gold-text leading-tight">
                {lang === 'en' ? 'Unlock the Secrets of Your Bazi' : '揭开八字的神秘面纱'}
              </h1>
              <p className="text-[#9b8e7a] max-w-2xl mx-auto leading-relaxed">
                {lang === 'en'
                  ? 'For 5,000 years, the ancient Chinese have used the Four Pillars of Destiny to illuminate the path ahead. Enter your birth time and discover the cosmic blueprint that shapes your life.'
                  : '五千年来，古人以四柱八字测命理、明前路。输入你的出生时辰，探寻塑造你命运的宇宙蓝图。'}
              </p>
            </div>
          )}

          {/* 提示：重填 */}
          {submitted && (
            <div className="text-center mb-8">
              <button
                onClick={() => { setSubmitted(false); setResult(null); setReading(null); }}
                className="inline-flex items-center gap-2 text-[#9b8e7a] hover:text-[#f0d68a] transition-colors text-sm"
              >
                ← {lang === 'en' ? 'New Reading' : '重新测算'}
              </button>
            </div>
          )}

          {/* ========== 表单卡片 ========== */}
          <div className="max-w-xl mx-auto bg-[#0f1117] mystical-border rounded-2xl p-8 ancestral-glow">
            <h2 className="text-lg font-semibold text-center mb-6 gold-text">
              {lang === 'en' ? '✦ Your Birth Information' : '✦ 你的出生信息'}
            </h2>

            <div className="space-y-6">
              {/* 年月日时分 */}
              <div className="grid grid-cols-5 gap-3">
                {(['year', 'month', 'day', 'hour', 'minute'] as const).map((field) => {
                  const labels: Record<string, string> = {
                    year: lang === 'en' ? 'Year' : '年',
                    month: lang === 'en' ? 'Month' : '月',
                    day: lang === 'en' ? 'Day' : '日',
                    hour: lang === 'en' ? 'Hour' : '时',
                    minute: lang === 'en' ? 'Min' : '分',
                  };
                  const placeholders: Record<string, string> = {
                    year: '1990', month: '1', day: '15', hour: '14', minute: '30',
                  };
                  return (
                    <div key={field}>
                      <label className="block text-xs text-[#9b8e7a] mb-1.5">{labels[field]}</label>
                      <input
                        type="number"
                        placeholder={placeholders[field]}
                        value={formData[field]}
                        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                        className="w-full bg-[#0f1117] border border-[#1a1d2a] rounded-lg px-3 py-3 text-[#e8dcc8] placeholder-[#3a3528] focus:outline-none focus:border-[#d4af37]/40 focus:ring-1 focus:ring-[#d4af37]/20 transition-all text-sm"
                        required
                      />
                    </div>
                  );
                })}
              </div>

              {/* 性别 */}
              <div>
                <label className="block text-xs text-[#9b8e7a] mb-1.5">
                  {lang === 'en' ? 'Gender' : '性别'}
                </label>
                <div className="flex gap-3">
                  {(['male', 'female'] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setFormData({ ...formData, gender: g })}
                      className={`flex-1 py-3 rounded-lg border text-sm font-medium transition-all ${
                        formData.gender === g
                          ? 'border-[#d4af37] bg-[#d4af37]/10 text-[#f0d68a]'
                          : 'border-[#1a1d2a] text-[#6b5f4a] hover:border-[#3a3528]'
                      }`}
                    >
                      {g === 'male' ? (lang === 'en' ? '♂ Male' : '♂ 男') : (lang === 'en' ? '♀ Female' : '♀ 女')}
                    </button>
                  ))}
                </div>
              </div>

              {/* 提交按钮 */}
              <button
                onClick={handleSubmit}
                disabled={!isValid || loading}
                className={`gold-glow w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                  isValid && !loading
                    ? 'bg-gradient-to-r from-[#a8872e] via-[#d4af37] to-[#a8872e] text-[#07080a] cursor-pointer'
                    : 'bg-[#1a1d2a] text-[#3a3528] cursor-not-allowed'
                }`}
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="animate-spin">☰</span>
                    {lang === 'en' ? 'Reading the stars...' : '观星测算中...'}
                  </span>
                ) : (
                  <span>{lang === 'en' ? '✦ Reveal My Destiny' : '✦ 揭示我的命运'}</span>
                )}
              </button>

              {loading && !result && (
                <div className="text-center text-[#9b8e7a] text-sm">
                  <div className="inline-flex items-center gap-2">
                    <span className="animate-pulse">✦</span>
                    {lang === 'en' ? 'Consulting the ancient texts...' : '查阅古籍中...'}
                    <span className="animate-pulse">✦</span>
                  </div>
                </div>
              )}
            </div>

            {error && (
              <p className="mt-4 text-red-400/80 text-sm text-center bg-red-500/5 border border-red-500/10 rounded-lg p-3">
                {error}
              </p>
            )}
          </div>

          {/* ========== 结果显示 ========== */}
          {result && reading && (
            <div className="mt-10 space-y-8 animate-in fade-in duration-500">
              <BaziChart result={result} lang={lang} />
              <ReadingPanel reading={reading} result={result} lang={lang} fromCache={false} />

              {/* 细分 */}
              <div className="text-center pt-4 border-t border-[#1a1d2a]">
                <p className="text-[#6b5f4a] text-xs">
                  {lang === 'en' ? 'For entertainment purposes only' : '仅供娱乐参考'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 页脚 */}
        <footer className="border-t border-[rgba(212,175,55,0.06)] mt-16">
          <div className="max-w-5xl mx-auto px-4 py-8 text-center">
            <p className="text-sm text-[#3a3528]">✦ MysticSage — Ancient wisdom for the modern soul ✦</p>
          </div>
        </footer>
      </main>
    </>
  );
}
