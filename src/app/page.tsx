'use client';

import { useState, useCallback, useEffect } from 'react';
import type { BaziResult, Gender } from '@/lib/bazi/types';
import type { AiReading } from '@/lib/ai/interpretation';
import { calculateBazi } from '@/lib/bazi';
import { generateSeedReading } from '@/lib/reading/seed-readings';
import BaziChart from '@/components/BaziChart';
import ReadingPanel from '@/components/ReadingPanel';
import NavBar from '@/components/NavBar';
import Particles from '@/components/Particles';
import { useLanguage } from '@/lib/use-language';
import messagesEn from '../../messages/en.json';
import messagesZh from '../../messages/zh.json';
import { Sun, Sparkle, ArrowRight, ArrowLeft, Spinner, Star, YinYang, Eye, BookOpen, Clock, ChartBar, Globe, CaretDown } from '@phosphor-icons/react';

type Lang = 'en' | 'zh';

const PLUM_POSITIONS = [
  { top: '8%', left: '5%', delay: '0s' },
  { top: '15%', right: '8%', delay: '1s' },
  { top: '45%', left: '3%', delay: '0.5s' },
  { top: '60%', right: '5%', delay: '1.5s' },
  { top: '85%', left: '10%', delay: '2s' },
  { top: '75%', right: '12%', delay: '0.8s' },
];

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [submitted]);

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
  }, [formData]);

  const isEn = lang === 'en';

  return (
    <>
      {/* 多层动态背景系统 - CSS动画星空背景 */}
      <div className="bg-system">
        {/* CSS动画星空背景 */}
        <div className="bg-css-animation">
          {/* 银河旋转光带 */}
          <div className="galaxy-stream" />
          {/* 星场漂移动画 */}
          <div className="star-field" />
          {/* 星云脉冲效果 */}
          <div className="nebula-pulse nebula-1" />
          <div className="nebula-pulse nebula-2" />
          <div className="nebula-pulse nebula-3" />
          <div className="nebula-pulse nebula-4" />
        </div>

        {/* 动态渐变遮罩 */}
        <div className="bg-gradient-layer" />

        {/* 动态光晕球体 */}
        <div className="bg-glow-orbs">
          <div className="glow-orb glow-orb-1" />
          <div className="glow-orb glow-orb-2" />
          <div className="glow-orb glow-orb-3" />
        </div>

        {/* 水墨晕染效果 */}
        <div className="ink-wash ink-wash-1" />
        <div className="ink-wash ink-wash-2" />

        {/* 中式纹章背景 */}
        <div className="pattern-bg" />

        {/* 角落祥云装饰 */}
        <div className="corner-decor corner-top-left" />
        <div className="corner-decor corner-top-right" />
        <div className="corner-decor corner-bottom-left" />
        <div className="corner-decor corner-bottom-right" />

        {/* 山水剪影 */}
        <div className="mountain-silhouette" />

        {/* 梅花点缀 */}
        {PLUM_POSITIONS.map((pos, i) => (
          <div
            key={i}
            className="plum-blossom"
            style={{
              top: pos.top,
              left: pos.left,
              right: pos.right || undefined,
              animationDelay: pos.delay,
            }}
          />
        ))}

        {/* 仙鹤剪影 */}
        <div className="crane-silhouette" style={{ top: '20%', animationDelay: '0s' }} />
        <div className="crane-silhouette" style={{ top: '35%', animationDelay: '7s' }} />
        <div className="crane-silhouette" style={{ top: '55%', animationDelay: '14s' }} />

        {/* 噪点纹理 */}
        <div className="bg-noise" />

        {/* 网格线 */}
        <div className="bg-grid" />
      </div>

      {/* 粒子系统 */}
      <Particles count={30} />

      <main className="min-h-screen relative z-10 page-enter">
        <NavBar currentLang={lang} onLangChange={setLang} />

        <div className="max-w-6xl mx-auto px-4 py-16">
          {!submitted && (
            <>
              {/* 英雄区域 */}
              <div className="text-center mb-20 relative hero-glow">
                <div className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-gradient-to-br from-[rgba(212,175,55,0.2)] to-transparent border border-[rgba(212,175,55,0.3)] pulse-glow">
                  <Sun size={56} weight="duotone" className="text-[#d4af37]" />
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 gold-text leading-tight tracking-tight">
                  {isEn ? 'Unlock the Secrets of Your Destiny' : '揭开命运的神秘面纱'}
                </h1>
                <p className="text-[#9b8e7a] max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
                  {isEn
                    ? 'For millennia, the ancient Chinese masters have used the Four Pillars of Destiny to illuminate the path ahead. Enter your birth time and unlock the cosmic blueprint that shapes your life.'
                    : '数千年来，中国古代命理大师运用四柱八字指引人生方向。输入您的出生时辰，解码塑造您命运的宇宙蓝图。'}
                </p>
              </div>

              {/* 装饰性分隔符 */}
              <div className="ornament-divider">
                <span>✦</span>
              </div>

              {/* 表单区域 */}
              <div className="max-w-2xl mx-auto mb-24">
                <div className="mystical-border rounded-3xl p-10 ancestral-glow">
                  <div className="text-center mb-10 decorative-border">
                    <h2 className="text-xl font-semibold gold-text mb-2">{isEn ? 'Enter Your Birth Information' : '请输入您的出生信息'}</h2>
                    <p className="text-[#6b5f4a] text-sm">{isEn ? 'Precise details yield more accurate readings' : '信息越精确，解读越准确'}</p>
                  </div>

                  <div className="space-y-8">
                    <div className="grid grid-cols-5 gap-4">
                      {(['year','month','day','hour','minute'] as const).map((field) => {
                        const labels: Record<string,string> = { year: isEn?'Year':'年', month: isEn?'Month':'月', day: isEn?'Day':'日', hour: isEn?'Hour':'时', minute: isEn?'Min':'分' };
                        const ph: Record<string,string> = { year:'1990', month:'1', day:'15', hour:'14', minute:'30' };
                        return (
                          <div key={field} className="relative group">
                            <label className="block text-xs text-[#9b8e7a] mb-2 uppercase tracking-wider">{labels[field]}</label>
                            <input type="number" placeholder={ph[field]} value={formData[field]}
                              onChange={(e) => setFormData({...formData, [field]: e.target.value })}
                              className="w-full input-mystical rounded-xl px-4 py-4 text-[#e8dcc8] placeholder-[#3a3528] focus:outline-none transition-all text-center text-lg font-medium"
                            />
                          </div>
                        );
                      })}
                    </div>

                    <div>
                      <label className="block text-xs text-[#9b8e7a] mb-3 uppercase tracking-wider">{isEn ? 'Gender' : '性别'}</label>
                      <div className="flex gap-4">
                        {(['male','female'] as const).map(g => (
                          <button key={g} type="button" onClick={() => setFormData({...formData, gender: g})}
                            className={`flex-1 py-4 rounded-xl border text-sm font-semibold transition-all duration-300 ${formData.gender === g ? 'border-[#d4af37] bg-[rgba(212,175,55,0.15)] text-[#f0d68a] shadow-lg shadow-[rgba(212,175,55,0.2)]' : 'border-[rgba(212,175,55,0.15)] text-[#6b5f4a] hover:border-[rgba(212,175,55,0.3)]'}`}>
                            {g === 'male' ? (isEn ? 'Male' : '男') : (isEn ? 'Female' : '女')}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button onClick={handleSubmit} disabled={!isValid || loading}
                      className={`w-full py-5 rounded-xl font-bold text-lg transition-all duration-500 ${isValid && !loading ? 'bg-gradient-to-r from-[#a8872e] via-[#d4af37] to-[#a8872e] text-[#07080a] hover:shadow-xl hover:shadow-[rgba(212,175,55,0.3)] hover:scale-[1.02] active:scale-[0.98]' : 'bg-[#1a1d2a] text-[#3a3528] cursor-not-allowed'}`}>
                      {loading ? (
                        <span className="inline-flex items-center gap-3">
                          <Spinner size={20} className="animate-spin" />
                          {isEn ? 'Reading the stars...' : '星象解读中...'}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2">
                          {isEn ? 'Reveal My Destiny' : '揭示我的命运'}
                          <ArrowRight size={18} weight="bold" />
                        </span>
                      )}
                    </button>
                  </div>

                  {error && (
                    <p className="mt-6 text-red-400/80 text-sm text-center bg-red-500/5 border border-red-500/10 rounded-xl p-4">{error}</p>
                  )}
                </div>
              </div>

              {/* 装饰性分隔符 */}
              <div className="ornament-divider">
                <Sparkle size={16} className="text-[#d4af37]" />
              </div>

              {/* 功能介绍区 */}
              <div className="mt-32 text-center scroll-reveal">
                <h2 className="text-3xl md:text-4xl font-bold gold-text mb-3">{isEn ? 'What You Will Discover' : '您将发现的奥秘'}</h2>
                <p className="text-[#9b8e7a] text-sm max-w-xl mx-auto mb-16">{isEn ? 'Your Bazi chart holds the keys to understanding your true self' : '您的命盘藏着了解真实自我的密钥'}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { Icon: Sparkle, label: isEn ? 'Nature' : '本性', title: isEn ? 'Your True Nature' : '先天本性', desc: isEn ? 'Discover your Day Master element and understand your core personality, strengths, and inherent tendencies.' : '发现您的日元属性，了解核心性格、天赋优势与先天倾向。', delay: '' },
                    { Icon: YinYang, label: isEn ? 'Balance' : '平衡', title: isEn ? 'Elemental Balance' : '五行平衡', desc: isEn ? 'See how Wood, Fire, Earth, Metal, and Water flow within you. Find harmony and what needs nurturing.' : '洞察木火土金水在您命局中的流转。发现和谐的五行，需补益的方向。', delay: 'delay-100' },
                    { Icon: Eye, label: isEn ? 'Guidance' : '指引', title: isEn ? 'Life Guidance' : '人生指引', desc: isEn ? 'Receive personalized insights about career paths, relationships, wealth potential, and personal growth.' : '获取关于事业方向、感情关系、财富趋势与个人成长的个性化指导。', delay: 'delay-200' },
                  ].map((item, i) => (
                    <div key={i} className={`feature-card rounded-2xl p-8 text-center border border-[rgba(212,175,55,0.08)] ${item.delay}`}>
                      <div className="mb-6 w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[rgba(212,175,55,0.15)] to-transparent flex items-center justify-center border border-[rgba(212,175,55,0.15)]">
                        <item.Icon size={36} weight="duotone" className="text-[#d4af37]" />
                      </div>
                      <span className="inline-block text-xs text-[#d4af37]/60 uppercase tracking-widest mb-3">{item.label}</span>
                      <h3 className="text-lg font-semibold gold-text mb-3">{item.title}</h3>
                      <p className="text-[#9b8e7a] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 装饰性分隔符 */}
              <div className="ornament-divider">
                <BookOpen size={16} className="text-[#d4af37]" />
              </div>

              {/* 使用步骤 */}
              <div className="mt-32 text-center scroll-reveal">
                <h2 className="text-3xl md:text-4xl font-bold gold-text mb-3">{isEn ? 'How It Works' : '使用步骤'}</h2>
                <p className="text-[#9b8e7a] text-sm max-w-xl mx-auto mb-16">{isEn ? 'Three simple steps to uncover your cosmic blueprint' : '三个简单步骤揭开您的宇宙蓝图'}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { Icon: BookOpen, num:'01', title: isEn ? 'Enter Your Details' : '输入您的信息', desc: isEn ? 'Provide your birth date and time' : '填写您的出生年月日时' },
                    { Icon: Sparkle, num:'02', title: isEn ? 'Ancient Calculation' : '古法推演', desc: isEn ? 'Our algorithm calculates your Four Pillars' : '古法推演您的四柱八字' },
                    { Icon: Star, num:'03', title: isEn ? 'Receive Insights' : '获取解读', desc: isEn ? 'Get your personalized destiny reading' : '获取您的命运解读' },
                  ].map((step, i) => (
                    <div key={i} className="relative group">
                      <div className="relative z-10">
                        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[rgba(212,175,55,0.1)] to-transparent flex items-center justify-center border border-[rgba(212,175,55,0.2)] step-number">
                          <step.Icon size={24} weight="duotone" className="text-[#d4af37]" />
                        </div>
                        <div className="text-4xl font-bold text-[#d4af37]/10 mb-4" style={{fontFamily:'serif'}}>{step.num}</div>
                        <h3 className="text-base font-semibold gold-text mb-2">{step.title}</h3>
                        <p className="text-[#6b5f4a] text-sm">{step.desc}</p>
                      </div>
                      {i < 2 && (
                        <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-[rgba(212,175,55,0.2)] to-transparent" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 统计数据 */}
              <div className="mt-32 scroll-reveal">
                <div className="divider-mystical mb-16" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { Icon: Clock, en:'Years of Wisdom', zh:'千年智慧', val:'5,000+' },
                    { Icon: ChartBar, en:'Charts Calculated', zh:'命盘计算', val:'12,847' },
                    { Icon: Sparkle, en:'Elements Mapped', zh:'五行推演', val:'64,235' },
                    { Icon: Globe, en:'Languages', zh:'语言支持', val:'2' },
                  ].map((stat, i) => (
                    <div key={i} className="stat-card rounded-2xl p-6 text-center group">
                      <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-[rgba(212,175,55,0.08)]">
                        <stat.Icon size={22} weight="duotone" className="text-[#d4af37]/70" />
                      </div>
                      <div className="text-3xl font-bold gold-text mb-2">{stat.val}</div>
                      <div className="text-xs text-[#6b5f4a] uppercase tracking-wider">{isEn ? stat.en : stat.zh}</div>
                    </div>
                  ))}
                </div>
                <div className="divider-mystical mt-16" />
              </div>

              {/* FAQ */}
              <div className="mt-32 mb-16 scroll-reveal">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold gold-text mb-3">{isEn ? 'Frequently Asked Questions' : '常见问题'}</h2>
                  <p className="text-[#9b8e7a] text-sm max-w-xl mx-auto">{isEn ? 'Everything you need to know about Bazi reading' : '关于八字测算，您想了解的一切'}</p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                  {[
                    { q_en:'What is Bazi (Eight Characters)?', q_zh:'什么是八字？', a_en:'Bazi, also known as the Four Pillars of Destiny, is a 5,000-year-old Chinese metaphysical system. It uses your birth year, month, day, and hour to construct a chart of eight characters that reveals your innate nature, strengths, challenges, and life path.', a_zh:'八字又称四柱命理，是源于中国五千年的命理学体系。通过您的出生年月日时，推演出八个字（四柱），揭示您的先天禀赋、性格特质、人生机遇与成长方向。' },
                    { q_en:'Is this fortune telling?', q_zh:'这是算命吗？', a_en:'Bazi is better understood as a tool for self-discovery rather than fortune telling. It highlights your inherent tendencies and potential life patterns, empowering you to make informed decisions.', a_zh:'八字更应被理解为自我认知的工具，而非简单的算命。它揭示您的先天倾向与潜在人生模式，帮助您在人生十字路口做出更明智的选择。' },
                    { q_en:'Do I need an exact birth time?', q_zh:'需要精确的出生时间吗？', a_en:'An exact birth time provides the most accurate reading, especially for the Hour Pillar which influences career and relationships. If unknown, we default to noon, though precision is recommended.', a_zh:'精确的出生时间能得到最准确的解读，尤其是影响事业与感情的时柱。如果不确定，系统会默认按午时推算，但建议尽量精确。' },
                    { q_en:'How is my data handled?', q_zh:'我的数据安全吗？', a_en:'Your privacy is paramount. All calculations happen entirely in your browser — no data is sent to any server. We never store or share your birth information.', a_zh:'您的隐私至关重要。所有计算完全在浏览器本地完成——没有任何数据上传到服务器。我们绝不存储或分享您的出生信息。' },
                  ].map((faq, i) => (
                    <details key={i} className="group feature-card rounded-2xl overflow-hidden">
                      <summary className="px-8 py-5 cursor-pointer text-sm font-semibold text-[#e8dcc8] flex items-center gap-4 hover:bg-[rgba(212,175,55,0.03)] transition-colors list-none">
                        <span className="text-[#d4af37] text-xs">✦</span>
                        <span className="flex-1">{isEn ? faq.q_en : faq.q_zh}</span>
                        <CaretDown size={14} className="text-[#6b5f4a] group-open:rotate-180 transition-transform faq-icon" />
                      </summary>
                      <div className="px-8 pb-6 text-sm text-[#9b8e7a] leading-relaxed border-t border-[rgba(212,175,55,0.06)] pt-4">
                        {isEn ? faq.a_en : faq.a_zh}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </>
          )}

          {submitted && (
            <div className="text-center mb-8">
              <button onClick={() => { setSubmitted(false); setResult(null); setReading(null); }}
                className="inline-flex items-center gap-2 text-[#9b8e7a] hover:text-[#f0d68a] transition-colors text-sm px-4 py-2 rounded-lg hover:bg-[rgba(212,175,55,0.05)]">
                <ArrowLeft size={14} /> {isEn ? 'New Reading' : '重新测算'}
              </button>
            </div>
          )}

          {result && reading && (
            <div className="mt-8 space-y-8 animate-in fade-in duration-500">
              <BaziChart result={result} lang={lang} />
              <ReadingPanel reading={reading} result={result} lang={lang} fromCache={false} />
              <div className="text-center pt-8 border-t border-[rgba(212,175,55,0.06)]">
                <p className="text-[#4a4538] text-xs">{isEn ? 'For entertainment purposes only' : '仅供娱乐参考'}</p>
              </div>
            </div>
          )}
        </div>

        {/* 页脚 */}
        <footer className="border-t border-[rgba(212,175,55,0.06)] mt-16 relative z-10">
          <div className="max-w-6xl mx-auto px-4 py-12 text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <Star weight="fill" size={16} className="text-[#d4af37]" />
              <span className="text-lg gold-text font-bold">MysticSage</span>
            </div>
            <p className="text-sm text-[#3a3528]">Ancient wisdom for the modern soul</p>
          </div>
        </footer>
      </main>
    </>
  );
}