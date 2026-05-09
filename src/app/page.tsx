'use client';

import { useState, useCallback } from 'react';
import type { BaziResult, Gender, BaziInput } from '@/lib/bazi/types';
import type { AiReading } from '@/lib/ai/interpretation';
import { calculateBazi } from '@/lib/bazi';
import { generateSeedReading } from '@/lib/reading/seed-readings';
import BaziChart from '@/components/BaziChart';
import ReadingPanel from '@/components/ReadingPanel';
import NavBar from '@/components/NavBar';
import { useLanguage } from '@/lib/use-language';
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

export default function Home() {
  const [lang, setLang] = useLanguage();
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

  const isEn = lang === 'en';

  return (
    <>
      {/* 视频背景 */}
      <div className="video-bg">
        <video autoPlay muted loop playsInline className="bg-video">
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay" />
      </div>

      <main className="min-h-screen relative z-10">
        <NavBar currentLang={lang} onLangChange={setLang} />

        {/* ========== 主内容 ========== */}
        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* ===== 首页（未提交）===== */}
          {!submitted && (
            <>
              {/* 标题区 */}
              <div className="text-center mb-12">
                <div className="text-6xl mb-6 select-none">☰</div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 gold-text leading-tight">
                  {isEn ? 'Unlock the Secrets of Your Bazi' : '揭开八字的神秘面纱'}
                </h1>
                <p className="text-[#9b8e7a] max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
                  {isEn
                    ? 'For 5,000 years, the ancient Chinese have used the Four Pillars of Destiny to illuminate the path ahead. Enter your birth time and discover the cosmic blueprint that shapes your life.'
                    : '五千年来，古人以四柱八字测命理、明前路。输入你的出生时辰，探寻塑造你命运的宇宙蓝图。'}
                </p>
              </div>

              {/* 表单 */}
              <div className="max-w-xl mx-auto bg-[#0f1117]/90 mystical-border rounded-2xl p-8 ancestral-glow">
                <h2 className="text-lg font-semibold text-center mb-6 gold-text">{isEn ? '✦ Your Birth Information' : '✦ 你的出生信息'}</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-5 gap-3">
                    {(['year','month','day','hour','minute'] as const).map((field) => {
                      const labels: Record<string,string> = { year:isEn?'Year':'年', month:isEn?'Month':'月', day:isEn?'Day':'日', hour:isEn?'Hour':'时', minute:isEn?'Min':'分' };
                      const ph: Record<string,string> = { year:'1990', month:'1', day:'15', hour:'14', minute:'30' };
                      return (
                        <div key={field}>
                          <label className="block text-xs text-[#9b8e7a] mb-1.5">{labels[field]}</label>
                          <input type="number" placeholder={ph[field]} value={formData[field]}
                            onChange={(e) => setFormData({...formData, [field]: e.target.value })}
                            className="w-full bg-[#0f1117] border border-[#1a1d2a] rounded-lg px-3 py-3 text-[#e8dcc8] placeholder-[#3a3528] focus:outline-none focus:border-[#d4af37]/40 focus:ring-1 focus:ring-[#d4af37]/20 transition-all text-sm"/>
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <label className="block text-xs text-[#9b8e7a] mb-1.5">{isEn ? 'Gender' : '性别'}</label>
                    <div className="flex gap-3">
                      {(['male','female'] as const).map(g => (
                        <button key={g} type="button" onClick={() => setFormData({...formData, gender: g})}
                          className={`flex-1 py-3 rounded-lg border text-sm font-medium transition-all ${formData.gender === g ? 'border-[#d4af37] bg-[#d4af37]/10 text-[#f0d68a]' : 'border-[#1a1d2a] text-[#6b5f4a] hover:border-[#3a3528]'}`}>
                          {g === 'male' ? (isEn ? '♂ Male' : '♂ 男') : (isEn ? '♀ Female' : '♀ 女')}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button onClick={handleSubmit} disabled={!isValid || loading}
                    className={`gold-glow w-full py-4 rounded-xl font-semibold text-lg transition-all ${isValid && !loading ? 'bg-gradient-to-r from-[#a8872e] via-[#d4af37] to-[#a8872e] text-[#07080a] cursor-pointer' : 'bg-[#1a1d2a] text-[#3a3528] cursor-not-allowed'}`}>
                    {loading ? <span className="inline-flex items-center gap-2"><span className="animate-spin">☰</span>{isEn ? 'Reading the stars...' : '观星测算中...'}</span>
                      : <span>{isEn ? '✦ Reveal My Destiny' : '✦ 揭示我的命运'}</span>}
                  </button>
                </div>
                {error && <p className="mt-4 text-red-400/80 text-sm text-center bg-red-500/5 border border-red-500/10 rounded-lg p-3">{error}</p>}
              </div>

              {/* ========== 功能介绍区 ========== */}
              <div className="mt-24 text-center">
                <h2 className="text-2xl md:text-3xl font-bold gold-text mb-4">{isEn ? 'What You Will Discover' : '你将发现的奥秘'}</h2>
                <p className="text-[#9b8e7a] text-sm max-w-xl mx-auto mb-12">{isEn ? 'Your Bazi chart holds the keys to understanding your true self' : '你的八字命盘，藏着了解真实自我的钥匙'}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {[
                    { icon:'☯', en:{t:'Your True Nature',d:'Discover your Day Master element and understand your core personality, strengths, and inherent tendencies.'}, zh:{t:'你的真实本性',d:'发现你的日元属性，了解核心性格、天赋优势与天性倾向。'} },
                    { icon:'🔥', en:{t:'Elemental Balance',d:'See how Wood, Fire, Earth, Metal, and Water flow within you. Find which elements bring harmony and which need nurturing.'}, zh:{t:'五行平衡',d:'洞察木火土金水在你命局中的流转。发现哪些五行带来和谐，哪些需要补益。'} },
                    { icon:'⭐', en:{t:'Life Guidance',d:'Receive personalized insights about career paths, relationships, wealth potential, and personal growth tailored to your chart.'}, zh:{t:'人生指引',d:'获取针对你命盘的个性化建议——事业方向、感情关系、财运趋势与成长路径。'} },
                  ].map((item, i) => (
                    <div key={i} className="feature-card bg-[#0f1117]/80 border border-[rgba(212,175,55,0.08)] rounded-2xl p-7 text-center">
                      <div className="text-4xl mb-4">{item.icon}</div>
                      <h3 className="text-base font-semibold gold-text mb-2">{isEn ? item.en.t : item.zh.t}</h3>
                      <p className="text-[#9b8e7a] text-xs leading-relaxed">{isEn ? item.en.d : item.zh.d}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ========== 使用步骤 ========== */}
              <div className="mt-24 text-center">
                <h2 className="text-2xl md:text-3xl font-bold gold-text mb-4">{isEn ? 'How It Works' : '如何使用'}</h2>
                <p className="text-[#9b8e7a] text-sm max-w-xl mx-auto mb-12">{isEn ? 'Three simple steps to uncover your cosmic blueprint' : '三步即可揭开你的宇宙蓝图'}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { num:'01', en:'Enter your birth date and time', zh:'输入你的出生年月日时' },
                    { num:'02', en:'Our ancient algorithm calculates your Four Pillars', zh:'古法推演你的四柱八字' },
                    { num:'03', en:'Receive your personalized destiny reading', zh:'获取属于你的命运解读' },
                  ].map((step, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="text-[#d4af37]/30 text-5xl font-bold mb-3" style={{fontFamily:'serif'}}>{step.num}</div>
                      <div className="w-12 h-0.5 bg-[rgba(212,175,55,0.2)] mb-3"></div>
                      <p className="text-[#e8dcc8] text-sm">{isEn ? step.en : step.zh}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ========== 数据/信任区 ========== */}
              <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { en:'Years of Wisdom', zh:'千年智慧', val:'5,000+' },
                  { en:'Charts Calculated', zh:'命盘计算', val:'12,847' },
                  { en:'Elements Mapped', zh:'五行推演', val:'64,235' },
                  { en:'Languages', zh:'语言支持', val:'🌐 2' },
                ].map((stat, i) => (
                  <div key={i} className="bg-[#0f1117]/60 border border-[rgba(212,175,55,0.06)] rounded-xl p-5 text-center">
                    <div className="text-2xl font-bold gold-text mb-1">{stat.val}</div>
                    <div className="text-xs text-[#6b5f4a]">{isEn ? stat.en : stat.zh}</div>
                  </div>
                ))}
              </div>

              {/* ========== FAQ ========== */}
              <div className="mt-24 mb-16">
                <h2 className="text-2xl md:text-3xl font-bold gold-text text-center mb-4">{isEn ? 'Frequently Asked Questions' : '常见问题'}</h2>
                <p className="text-[#9b8e7a] text-sm text-center max-w-xl mx-auto mb-10">{isEn ? 'Everything you need to know about Bazi reading' : '关于八字测算，你想了解的一切'}</p>

                <div className="max-w-2xl mx-auto space-y-3">
                  {[
                    { q_en:'What is Bazi (Eight Characters)?', q_zh:'什么是八字？', a_en:'Bazi, also known as the Four Pillars of Destiny, is a 5,000-year-old Chinese metaphysical system. It uses your birth year, month, day, and hour to construct a chart of eight characters that reveals your innate nature, strengths, challenges, and life path.', a_zh:'八字又称四柱命理，是源于中国五千年的命理学体系。通过你的出生年月日时，推演出八个字（四柱），揭示你的先天禀赋、性格特质、人生机遇与成长方向。' },
                    { q_en:'Is this fortune telling?', q_zh:'这是算命吗？', a_en:'Bazi is better understood as a tool for self-discovery rather than fortune telling. It highlights your inherent tendencies and potential life patterns, empowering you to make informed decisions.', a_zh:'八字更应被理解为自我认知的工具，而非简单的算命。它揭示你的先天倾向与潜在人生模式，帮助你在人生十字路口做出更明智的选择。' },
                    { q_en:'Do I need an exact birth time?', q_zh:'需要精确的出生时间吗？', a_en:'An exact birth time provides the most accurate reading, especially for the Hour Pillar which influences career and relationships. If unknown, we default to noon, though precision is recommended.', a_zh:'精确的出生时间能得到最准确的解读，尤其是影响事业与感情的时柱。如果不确定，系统会默认按午时推算，但建议尽量精确。' },
                    { q_en:'How is my data handled?', q_zh:'我的数据安全吗？', a_en:'Your privacy is paramount. All calculations happen entirely in your browser — no data is sent to any server. We never store or share your birth information.', a_zh:'你的隐私至关重要。所有计算完全在浏览器本地完成——没有任何数据上传到服务器。我们绝不存储或分享你的出生信息。' },
                  ].map((faq, i) => (
                    <details key={i} className="group bg-[#0f1117]/60 border border-[rgba(212,175,55,0.06)] rounded-xl overflow-hidden">
                      <summary className="px-5 py-4 cursor-pointer text-sm font-medium text-[#e8dcc8] flex items-center gap-2 hover:bg-[rgba(212,175,55,0.03)] transition-colors list-none [&::-webkit-details-marker]:hidden">
                        <span className="text-[#d4af37] text-xs mr-1">✦</span>
                        {isEn ? faq.q_en : faq.q_zh}
                        <span className="ml-auto text-[#6b5f4a] text-xs group-open:rotate-180 transition-transform">▾</span>
                      </summary>
                      <div className="px-5 pb-4 text-xs text-[#9b8e7a] leading-relaxed border-t border-[rgba(212,175,55,0.04)] pt-3">
                        {isEn ? faq.a_en : faq.a_zh}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ===== 结果页 ===== */}
          {submitted && (
            <div className="text-center mb-8">
              <button onClick={() => { setSubmitted(false); setResult(null); setReading(null); }}
                className="inline-flex items-center gap-2 text-[#9b8e7a] hover:text-[#f0d68a] transition-colors text-sm">
                ← {isEn ? 'New Reading' : '重新测算'}
              </button>
            </div>
          )}

          {result && reading && (
            <div className="mt-4 space-y-8 animate-in fade-in duration-500">
              <BaziChart result={result} lang={lang} />
              <ReadingPanel reading={reading} result={result} lang={lang} fromCache={false} />
              <div className="text-center pt-4 border-t border-[#1a1d2a]">
                <p className="text-[#6b5f4a] text-xs">{isEn ? 'For entertainment purposes only' : '仅供娱乐参考'}</p>
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
