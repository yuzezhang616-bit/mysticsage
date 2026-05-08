'use client';

import { useState, useCallback } from 'react';
import BaziForm, { BaziFormData } from '@/components/BaziForm';
import BaziChart from '@/components/BaziChart';
import ReadingPanel from '@/components/ReadingPanel';
import LanguageSwitch from '@/components/LanguageSwitch';
import type { BaziResult, Gender, BaziInput } from '@/lib/bazi/types';
import type { AiReading } from '@/lib/ai/interpretation';
import { calculateBazi } from '@/lib/bazi';
import { generateSeedReading, getLuckyInfo } from '@/lib/reading/seed-readings';
import messagesEn from '../../messages/en.json';
import messagesZh from '../../messages/zh.json';

type Messages = typeof messagesEn;
type Lang = 'en' | 'zh';

function t(key: string, lang: Lang, messages: Messages): string {
  const keys = key.split('.');
  let val: any = messages;
  for (const k of keys) {
    val = val?.[k];
  }
  return val || key;
}

export default function Home() {
  const [lang, setLang] = useState<Lang>('en');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<BaziResult | null>(null);
  const [reading, setReading] = useState<AiReading | null>(null);
  const [fromCache, setFromCache] = useState(false);

  const messages = lang === 'en' ? messagesEn : messagesZh;

  const handleSubmit = useCallback(async (data: BaziFormData) => {
    setLoading(true);
    setError('');
    setResult(null);
    setReading(null);

    try {
      // 直接在浏览器端计算八字（零后端依赖）
      const input: BaziInput = {
        year: parseInt(data.year),
        month: parseInt(data.month),
        day: parseInt(data.day),
        hour: parseInt(data.hour),
        minute: parseInt(data.minute),
        gender: data.gender as Gender,
        timezoneOffset: 8,
      };

      const bazi = calculateBazi(input);

      // 离线生成双语解读
      const enReading = generateSeedReading(bazi, 'en');
      const zhReading = generateSeedReading(bazi, 'zh');
      const reading: AiReading = { en: enReading, zh: zhReading };

      setResult(bazi);
      setReading(reading);
      setFromCache(false);
    } catch (err) {
      console.error('Bazi calculation error:', err);
      setError(t('home.error_server', lang, messages));
    } finally {
      setLoading(false);
    }
  }, [lang]);

  const handleNewReading = () => {
    setResult(null);
    setReading(null);
    setError('');
    setFromCache(false);
  };

  return (
    <main className="min-h-screen bg-[#0d1117]">
      {/* Navigation */}
      <nav className="border-b border-[#30363d] bg-[#0d1117]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✦</span>
            <span className="text-xl font-bold text-white">MysticSage</span>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitch lang={lang} onChange={setLang} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {!result && (
        <section className="relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 pt-20 pb-16 relative">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {t('home.hero_title', lang, messages)}
              </h1>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                {t('home.hero_subtitle', lang, messages)}
              </p>
            </div>

            {/* Form Card */}
            <div className="max-w-xl mx-auto bg-[#161b22] border border-[#30363d] rounded-2xl p-8 shadow-2xl">
              <h2 className="text-xl font-semibold text-white mb-6 text-center">
                {t('home.birth_info', lang, messages)}
              </h2>
              <BaziForm onSubmit={handleSubmit} loading={loading} lang={lang} />
              {error && (
                <p className="mt-4 text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  {error}
                </p>
              )}
            </div>

            {/* Features */}
            <div className="mt-24 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: '🔮', title: t('home.feature_personality', lang, messages), desc: t('home.feature_personality_desc', lang, messages) },
                { icon: '⚖️', title: t('home.feature_elements', lang, messages), desc: t('home.feature_elements_desc', lang, messages) },
                { icon: '🧭', title: t('home.feature_destiny', lang, messages), desc: t('home.feature_destiny_desc', lang, messages) },
              ].map((feat, i) => (
                <div key={i} className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 text-center">
                  <div className="text-3xl mb-3">{feat.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feat.title}</h3>
                  <p className="text-gray-400 text-sm">{feat.desc}</p>
                </div>
              ))}
            </div>

            {/* Testimonials */}
            <div className="mt-16 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-white text-center mb-8">
                {t('home.testimonials_title', lang, messages)}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
                  <p className="text-gray-300 italic leading-relaxed">
                    &ldquo;{t('home.testimonial_1', lang, messages)}&rdquo;
                  </p>
                  <p className="text-gray-500 text-sm mt-3">— Sarah, NYC</p>
                </div>
                <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
                  <p className="text-gray-300 italic leading-relaxed">
                    &ldquo;{t('home.testimonial_2', lang, messages)}&rdquo;
                  </p>
                  <p className="text-gray-500 text-sm mt-3">— Mark, London</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Results Section */}
      {result && (
        <section className="max-w-4xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white">
                {t('reading.title', lang, messages)}
              </h2>
              <p className="text-gray-400 mt-1">{t('reading.subtitle', lang, messages)}</p>
            </div>
            <button
              onClick={handleNewReading}
              className="px-5 py-2.5 bg-[#161b22] border border-[#30363d] rounded-lg text-gray-300 hover:text-white hover:border-gray-500 transition-all"
            >
              ← {t('reading.new_reading', lang, messages)}
            </button>
          </div>

          {/* Bazi Chart */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 mb-8">
            <BaziChart result={result} lang={lang} />
          </div>

          {/* AI Reading (if available) */}
          {reading && (
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6">
              <ReadingPanel reading={reading} result={result} lang={lang} fromCache={fromCache} />
            </div>
          )}

          {/* If no reading yet (loading AI) */}
          {!reading && (
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-12 text-center">
              <div className="text-4xl mb-4 animate-pulse">🔮</div>
              <p className="text-gray-400 text-lg">
                {t('reading.loading_reading', lang, messages)}
              </p>
              <div className="flex justify-center gap-1 mt-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-[#30363d] mt-16">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-500">
              <span>✦</span>
              <span>MysticSage</span>
            </div>
            <p className="text-sm text-gray-500 text-center">
              {t('footer.disclaimer', lang, messages)}
            </p>
            <div className="flex gap-4 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-300 transition-colors">{t('footer.privacy', lang, messages)}</a>
              <a href="#" className="hover:text-gray-300 transition-colors">{t('footer.terms', lang, messages)}</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
