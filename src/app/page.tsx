'use client';

import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import type { BaziResult, Gender } from '@/lib/bazi/types';
import type { AiReading } from '@/lib/ai/interpretation';
import { calculateBazi } from '@/lib/bazi';
import { generateSeedReading } from '@/lib/reading/seed-readings';
import BaziChart from '@/components/BaziChart';
import ReadingPanel from '@/components/ReadingPanel';
import Footer from "@/components/Footer";
import NavBar from '@/components/NavBar';
import Testimonials from '@/components/Testimonials';
import LiveActivityFeed from '@/components/LiveActivityFeed';
import DailyHint from '@/components/DailyHint';
import VariableProximity from '@/components/VariableProximity';

const ZODIAC_SIGNS = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
const TODAY_ZODIAC = ZODIAC_SIGNS[new Date().getDay() % 12];
const ZODIAC_EMOJIS: Record<string, string> = { Rat: '🐀', Ox: '🐂', Tiger: '🐅', Rabbit: '🐇', Dragon: '🐉', Snake: '🐍', Horse: '🐎', Goat: '🐐', Monkey: '🐒', Rooster: '🐓', Dog: '🐕', Pig: '🐖' };
const ZODIAC_TIPS: Record<string, string> = {
  Rat: 'A favorable day for financial decisions. Trust your instincts but verify the details. Your quick thinking will help you spot opportunities others miss.',
  Ox: 'Take things slow today. Steady progress beats rushed moves. Focus on what matters most and let go of perfectionism.',
  Tiger: 'Your charisma is high. Great for networking and new connections. Speak your mind — your honesty will inspire those around you.',
  Rabbit: 'A day for reflection and planning. Avoid confrontations. Seek harmony in your relationships and create a peaceful environment.',
  Dragon: 'Bold moves are rewarded. Your natural leadership shines. Take the initiative on that project you have been considering.',
  Snake: 'Intuition is your guide. Pay attention to subtle signs around you. A secret may be revealed that changes your perspective.',
  Horse: 'Energy and optimism flow. Travel or explore something new. Adventure awaits those who step outside their comfort zone today.',
  Goat: 'Creative pursuits bring joy. Take time for art, music, or nature. Nurture yourself before tending to others\' needs.',
  Monkey: 'Problem-solving skills peak. Tackle that challenging task you have been avoiding. Your wit is sharp and solutions come easily.',
  Rooster: 'Attention to detail pays off. Organize, plan, and execute with precision. Your confidence grows as you check items off your list.',
  Dog: 'Loyalty and honesty serve you well. A friend may need your support today. Be present and listen — your presence is a gift.',
  Pig: 'Generosity brings unexpected rewards. Share your abundance with others. Good fortune flows to those who give freely.'
};
const ZODIAC_LOVE: Record<string, string> = {
  Rat: 'Romantic conversations flow naturally. A meaningful connection deepens.',
  Ox: 'Patience in love brings rewards. Show your care through actions, not words.',
  Tiger: 'Passion ignites. Express your feelings boldly — they will be well received.',
  Rabbit: 'Gentle romance prevails. A quiet evening together speaks louder than grand gestures.',
  Dragon: 'Your confidence attracts admirers. Someone is noticing your strength.',
  Snake: 'Mystery intrigues. Playfulness in love keeps the spark alive today.',
  Horse: 'Adventurous spirits connect. Plan something exciting with your partner.',
  Goat: 'Tenderness and vulnerability draw people closer. Let your guard down.',
  Monkey: 'Wit and charm are your love language. A playful exchange could lead somewhere.',
  Rooster: 'Loyalty shines. Your devotion does not go unnoticed by those who matter.',
  Dog: 'Trust deepens today. An honest conversation strengthens your bond.',
  Pig: 'Your generous heart attracts love. Kindness is your most attractive quality.'
};

export default function Home() {
  const [loading, setLoading] = useState(false);

  // Scroll reveal effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  const [result, setResult] = useState<BaziResult | null>(null);
  const [reading, setReading] = useState<AiReading | null>(null);
  const [error, setError] = useState('');
  const [highlightedFields, setHighlightedFields] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    year: '', month: '', day: '', hour: '12', minute: '00', gender: 'male' as 'male' | 'female',
  });
  const [submitted, setSubmitted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [showBackTop, setShowBackTop] = useState(false);
  const [particles, setParticles] = useState<{ id: number; left: string; delay: string; duration: string; size: string }[]>([]);

  // 滚动监听 + 生成粒子
  useEffect(() => {
    setParticles(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 15}s`,
        duration: `${12 + Math.random() * 18}s`,
        size: `${2 + Math.random() * 4}px`,
      }))
    );
    const handleScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPercent(h > 0 ? Math.min((window.scrollY / h) * 100, 100) : 0);
      setShowBackTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isValid =
    formData.year && formData.month && formData.day &&
    parseInt(formData.year) >= 1900 && parseInt(formData.year) <= 2100 &&
    parseInt(formData.month) >= 1 && parseInt(formData.month) <= 12 &&
    parseInt(formData.day) >= 1 && parseInt(formData.day) <= 31;

  const handleSubmit = async () => {
    setError(''); setResult(null); setReading(null); setHighlightedFields([]);
    const emptyFields = (['year', 'month', 'day'] as const).filter(f => !formData[f]);
    if (!formData.year || !formData.month || !formData.day ||
      parseInt(formData.year) < 1900 || parseInt(formData.year) > 2100 ||
      parseInt(formData.month) < 1 || parseInt(formData.month) > 12 ||
      parseInt(formData.day) < 1 || parseInt(formData.day) > 31) {
      setError('Please fill in all fields');
      const fieldsToHighlight = emptyFields.length > 0 ? emptyFields : ['year', 'month', 'day'];
      setHighlightedFields(fieldsToHighlight);
      setTimeout(() => setHighlightedFields([]), 1500);
      const firstField = fieldsToHighlight[0];
      const el = document.querySelector(`[data-field="${firstField}"]`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setSubmitted(true); setLoading(true);
    try {
      const bazi = calculateBazi({
        year: parseInt(formData.year), month: parseInt(formData.month), day: parseInt(formData.day),
        hour: parseInt(formData.hour), minute: parseInt(formData.minute) || 0,
        gender: formData.gender as Gender, timezoneOffset: 8,
      });
      const enReading = generateSeedReading(bazi, 'en');
      const zhReading = generateSeedReading(bazi, 'zh');
      setResult(bazi);
      setReading({ en: enReading, zh: zhReading });
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please check your input and try again.');
    } finally { setLoading(false); }
  };

  return (
    <>
      <Script id="home-faq-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          '@context': 'https://schema.org', '@type': 'FAQPage', 'mainEntity': [
            { '@type': 'Question', 'name': 'What is Bazi reading?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Bazi (Eight Characters) is an ancient Chinese astrology system that maps your birth year, month, day, and hour into Heavenly Stems and Earthly Branches. It reveals your personality, strengths, challenges, and life path.' } },
            { '@type': 'Question', 'name': 'Is MysticSage free?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, MysticSage is completely free. No signup or account required. All calculations run in your browser — no data is uploaded to any server.' } },
          ]
        })}
      </Script>

      {/* ===== 视频背景 ===== */}
      <div className="video-bg">
        <video autoPlay muted loop playsInline className="bg-video">
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay" />
      </div>

      <main className="relative z-10">
        {/* ===== 滚动进度条 ===== */}
        <div className="scroll-progress" style={{ width: `${scrollPercent}%` }} />

        {/* ===== 返回顶部 ===== */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`back-to-top ${showBackTop ? 'visible' : ''}`}
          aria-label="Back to top"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>

        {/* ===== 导航 ===== */}
        <NavBar />

        {/* ===== 全屏 HERO ===== */}
        <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center text-center px-4 -mt-16">
          {/* 粒子背景 */}
          <div className="particle-container">
            {particles.map((p) => (
              <div
                key={p.id}
                className="particle"
                style={{
                  left: p.left,
                  animationDelay: p.delay,
                  animationDuration: p.duration,
                  width: p.size,
                  height: p.size,
                }}
              />
            ))}
          </div>
          <div className="max-w-4xl mx-auto stagger-1" style={{ zIndex: 2, position: 'relative' }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5 text-[#d4af37] text-xs tracking-widest mb-8">
              ✦ Chinese Astrology &middot; Free Online
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold gold-text leading-[1.1] mb-6 tracking-tight inline-block" style={{ fontFamily: 'var(--font-serif)', margin: '0 auto' }}>
              <VariableProximity
                label="Unlock Your Destiny"
                fromFontVariationSettings="'wght' 400"
                toFontVariationSettings="'wght' 900"
                containerRef={heroRef}
                radius={150}
                falloff="gaussian"
              />
            </h1>
            <p className="text-lg md:text-xl text-[#c4b998] max-w-2xl mx-auto leading-relaxed mb-10">
              For 5,000 years, the Four Pillars of Destiny have illuminated the path ahead.
              <br className="hidden md:block"/> Discover yours — instantly, free, in your browser.
            </p>
            <a href="#calculator" className="gold-glow inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-semibold text-[#f0d68a] transition-all cursor-pointer">
              ✦ Begin Your Reading
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
            </a>
          </div>
          {/* 向下滚动指示器 */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#6b5f4a] text-[10px] tracking-widest uppercase animate-bounce">
            <span>Scroll</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7"/></svg>
          </div>
        </section>

        {/* ===== 内容区：大卡片布局 ===== */}
        <div className="max-w-6xl mx-auto px-4 pb-24 space-y-20">

          {/* 卡片1：八字计算表单 */}
          <section id="calculator" className="scroll-reveal">
            <div className="glass-card rounded-3xl p-8 md:p-12 cinematic-glow">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold gold-text mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                  Calculate Your Bazi
                </h2>
                <p className="text-[#9b8e7a] text-sm max-w-lg mx-auto">
                  Enter your birth information below to generate your personalized Four Pillars chart
                </p>
              </div>
              <div className="max-w-2xl mx-auto">
                {!submitted && (
                  <>
                    {/* 出生信息输入 */}
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {(['year', 'month', 'day', 'hour', 'minute'] as const).map((field) => {
                          const labels: Record<string, string> = { year: 'Year', month: 'Month', day: 'Day', hour: 'Hour', minute: 'Min' };
                          const isHL = highlightedFields.includes(field);
                          const borderCls = isHL ? 'border-red-400/60 ring-1 ring-red-400/30' : 'border-white/10 focus:border-[#d4af37]/40';
                          const base = `w-full bg-white/5 border rounded-xl px-3 py-3.5 text-[#e8dcc8] placeholder-[#3a3528] focus:outline-none focus:ring-1 focus:ring-[#d4af37]/20 transition-all text-sm ${borderCls}`;
                          if (field === 'hour') return (
                            <div key={field} data-field={field}>
                              <label className="block text-xs text-[#9b8e7a] mb-1.5">{labels[field]}</label>
                              <select value={formData.hour} onChange={e => setFormData({ ...formData, hour: e.target.value })}
                                className={`${base} appearance-none cursor-pointer`}>
                                {Array.from({ length: 24 }, (_, i) => (<option key={i} value={String(i)} className="bg-[#15181d] text-[#e8dcc8]">{i}</option>))}
                              </select>
                            </div>
                          );
                          if (field === 'minute') return (
                            <div key={field} data-field={field}>
                              <label className="block text-xs text-[#9b8e7a] mb-1.5">{labels[field]}</label>
                              <select value={formData.minute} onChange={e => setFormData({ ...formData, minute: e.target.value })}
                                className={`${base} appearance-none cursor-pointer`}>
                                {['00', '15', '30', '45'].map(m => (<option key={m} value={m} className="bg-[#15181d] text-[#e8dcc8]">{m}</option>))}
                              </select>
                            </div>
                          );
                          const opts: Record<string, { min: number; max: number }> = {
                            year: { min: 1900, max: 2025 },
                            month: { min: 1, max: 12 },
                            day: { min: 1, max: 31 },
                          };
                          return (
                            <div key={field} data-field={field}>
                              <label className="block text-xs text-[#9b8e7a] mb-1.5">{labels[field]}</label>
                              <select value={formData[field]} onChange={e => setFormData({ ...formData, [field]: e.target.value })}
                                className={`${base} appearance-none cursor-pointer`}>
                                <option value="" className="bg-[#15181d] text-[#3a3528]">-</option>
                                {Array.from({ length: opts[field].max - opts[field].min + 1 }, (_, i) => opts[field].min + i).map(v => (
                                  <option key={v} value={String(v)} className="bg-[#15181d] text-[#e8dcc8]">{v}</option>
                                ))}
                              </select>
                            </div>
                          );
                        })}
                      </div>
                      <div>
                        <label className="block text-xs text-[#9b8e7a] mb-1.5">Gender</label>
                        <div className="flex gap-3">
                          {(['male', 'female'] as const).map(g => (
                            <button key={g} type="button" onClick={() => setFormData({ ...formData, gender: g })}
                              className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all ${formData.gender === g ? 'border-[#d4af37] bg-[#d4af37]/10 text-[#f0d68a]' : 'border-white/[0.08] text-[#6b5f4a] hover:border-white/20'}`}>
                              {g === 'male' ? '♂ Male' : '♀ Female'}
                            </button>
                          ))}
                        </div>
                      </div>
                      <button onClick={handleSubmit} disabled={!isValid}
                        className="w-full py-4 rounded-xl font-semibold text-lg transition-all bg-gradient-to-r from-[#a8872e] via-[#d4af37] to-[#a8872e] text-[#07080a] cursor-pointer hover:shadow-[0_0_32px_rgba(212,175,55,0.25)] hover:brightness-110 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed">
                        {loading
                          ? <span className="inline-flex items-center gap-2"><span className="gold-spinner"></span>Reading the stars...</span>
                          : <span>✦ Reveal My Destiny</span>}
                      </button>
                    </div>
                    {error && <p className="mt-4 text-red-400/80 text-sm text-center bg-red-500/5 border border-red-500/10 rounded-lg p-3">{error}</p>}
                  </>
                )}
                {submitted && (
                  <div className="text-center">
                    <button onClick={() => { setSubmitted(false); setResult(null); setReading(null); }}
                      className="inline-flex items-center gap-2 text-[#9b8e7a] hover:text-[#f0d68a] transition-colors text-sm">← New Reading</button>
                  </div>
                )}
                {result && reading && (
                  <div className="mt-4 space-y-8 animate-in fade-in duration-500">
                    <BaziChart result={result} />
                    <ReadingPanel reading={reading} result={result} fromCache={false} />
                    <div className="text-center pt-4 border-t border-white/5">
                      <p className="text-[#3a3528] text-xs">For entertainment purposes only</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* 卡片2：How It Works */}
          <section className="scroll-reveal">
            <div className="glass-card rounded-3xl p-8 md:p-12 cinematic-glow">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold gold-text mb-3" style={{ fontFamily: 'var(--font-serif)' }}>How It Works</h2>
                <p className="text-[#9b8e7a] text-sm max-w-lg mx-auto">Three simple steps to uncover your cosmic blueprint</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {[
                  { num: '01', title: 'Enter Your Birth Info', desc: 'Your year, month, day, and hour of birth — all calculated instantly in your browser.' },
                  { num: '02', title: 'Chart Calculation', desc: 'Our algorithm computes your Four Pillars: Year, Month, Day, and Hour — 8 characters that define your destiny.' },
                  { num: '03', title: 'Receive Your Reading', desc: 'Get detailed insights into your personality, strengths, relationships, and life path — tailored just for you.' },
                ].map((step, i) => (
                  <div key={i} className="text-center">
                    <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center">
                      <span className="text-2xl font-bold gold-text" style={{ fontFamily: 'var(--font-serif)' }}>{step.num}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-[#e8dcc8] mb-2">{step.title}</h3>
                    <p className="text-sm text-[#9b8e7a] leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 卡片3：Features / What You'll Discover */}
          <section className="scroll-reveal">
            <div className="glass-card rounded-3xl p-8 md:p-12 cinematic-glow">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold gold-text mb-3" style={{ fontFamily: 'var(--font-serif)' }}>What You Will Discover</h2>
                <p className="text-[#9b8e7a] text-sm max-w-lg mx-auto">Your Bazi chart holds the keys to understanding your true self</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { icon: '☯', title: 'Your True Nature', desc: 'Discover your Day Master element and understand your core personality, strengths, and inherent tendencies.' },
                  { icon: '🔥', title: 'Elemental Balance', desc: 'See how Wood, Fire, Earth, Metal, and Water flow within you. Find which elements bring harmony and which need nurturing.' },
                  { icon: '⭐', title: 'Life Guidance', desc: 'Receive personalized insights about career paths, relationships, wealth potential, and personal growth tailored to your chart.' },
                ].map((item, i) => (
                  <div key={i} className="feature-card rounded-2xl p-7 text-center border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-base font-semibold gold-text mb-2">{item.title}</h3>
                    <p className="text-[#9b8e7a] text-xs leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 卡片4：Today's Horoscope */}
          <section className="scroll-reveal">
            <div className="glass-card rounded-3xl p-8 md:p-12 cinematic-glow">
              <div className="max-w-xl mx-auto text-center">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#6b5f4a] mb-4">✦ Today's Chinese Horoscope</p>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="text-4xl">{ZODIAC_EMOJIS[TODAY_ZODIAC]}</span>
                  <span className="text-2xl font-bold gold-text">{TODAY_ZODIAC}</span>
                </div>
                <div className="space-y-3 text-left max-w-md mx-auto">
                  <div className="bg-white/[0.03] rounded-lg p-4 border border-white/[0.05]">
                    <p className="text-[10px] text-[#6b5f4a] mb-1 uppercase tracking-wider">General</p>
                    <p className="text-xs text-[#c4b998] leading-relaxed">{ZODIAC_TIPS[TODAY_ZODIAC]}</p>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg p-4 border border-white/[0.05]">
                    <p className="text-[10px] text-[#6b5f4a] mb-1 uppercase tracking-wider">Love</p>
                    <p className="text-xs text-[#c4b998] leading-relaxed">{ZODIAC_LOVE[TODAY_ZODIAC]}</p>
                  </div>
                </div>
                <p className="text-[10px] text-[#3a3528] mt-4">Not your sign? Calculate your personalized Bazi reading above ✦</p>
              </div>
            </div>
          </section>

          {/* 卡片5：Testimonials */}
          <section className="scroll-reveal">
            <div className="glass-card rounded-3xl p-8 md:p-12 cinematic-glow">
              <Testimonials />
            </div>
          </section>

          {/* 卡片6：Stats / Social Proof */}
          <section className="scroll-reveal">
            <div className="glass-card rounded-3xl p-8 md:p-12 cinematic-glow text-center">
              <h2 className="text-2xl md:text-3xl font-bold gold-text mb-2">Trusted by Seekers Worldwide</h2>
              <p className="text-[#9b8e7a] text-sm mb-10">Join thousands exploring ancient wisdom</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                {[
                  { val: '5,000+', label: 'Years of Wisdom' },
                  { val: '12,847', label: 'Charts Calculated' },
                  { val: '64,235', label: 'Elements Mapped' },
                  { val: '✦', label: '100% Free' },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-3xl font-bold gold-text mb-1">{stat.val}</div>
                    <div className="text-[10px] text-[#6b5f4a] uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 卡片7：YouTube Video */}
          <section className="scroll-reveal">
            <div className="glass-card rounded-3xl p-8 md:p-12 cinematic-glow text-center">
              <h2 className="text-2xl md:text-3xl font-bold gold-text mb-3">Learn Bazi with Video Guide</h2>
              <p className="text-[#9b8e7a] text-sm max-w-lg mx-auto mb-8">A beginner-friendly introduction to Chinese astrology</p>
              <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden">
                <div className="relative" style={{ paddingBottom: '56.25%' }}>
                  <iframe src="https://www.youtube.com/embed/z_Daeo1QiII" title="Bazi Guide"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
                    className="absolute inset-0 w-full h-full" style={{ border: 'none' }} />
                </div>
              </div>
            </div>
          </section>

          {/* 卡片8：Knowledge Articles */}
          <section className="scroll-reveal">
            <div className="glass-card rounded-3xl p-8 md:p-12 cinematic-glow text-center">
              <h2 className="text-2xl md:text-3xl font-bold gold-text mb-3">Explore Our Knowledge Base</h2>
              <p className="text-[#9b8e7a] text-sm max-w-lg mx-auto mb-10">Deepen your understanding of Chinese astrology</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {[
                  { href: '/knowledge/what-is-bazi', icon: '📜', t: 'What is Bazi?', d: 'Discover the ancient art of Four Pillars of Destiny' },
                  { href: '/knowledge/five-elements', icon: '🌊', t: 'Five Elements', d: 'Wood, Fire, Earth, Metal, Water — the building blocks of destiny' },
                  { href: '/knowledge/chinese-zodiac-complete', icon: '🐉', t: 'Zodiac Guide', d: 'Complete guide to the 12 Chinese zodiac signs' },
                ].map((item, i) => (
                  <a key={i} href={item.href} className="feature-card rounded-xl p-6 text-left border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] group">
                    <span className="text-3xl block mb-3">{item.icon}</span>
                    <h3 className="text-sm font-semibold gold-text mb-1 group-hover:text-[#f0d68a] transition-colors">{item.t}</h3>
                    <p className="text-[10px] text-[#6b5f4a]">{item.d}</p>
                  </a>
                ))}
              </div>
              <a href="/knowledge" className="inline-block mt-6 text-xs text-[#d4af37] hover:text-[#f0d68a] transition-colors">Browse All Articles →</a>
            </div>
          </section>

          {/* 卡片9：FAQ */}
          <section className="scroll-reveal">
            <div className="glass-card rounded-3xl p-8 md:p-12 cinematic-glow">
              <h2 className="text-2xl md:text-3xl font-bold gold-text text-center mb-3">Frequently Asked Questions</h2>
              <p className="text-[#9b8e7a] text-sm text-center max-w-lg mx-auto mb-10">Everything you need to know about Bazi reading</p>
              <div className="max-w-2xl mx-auto space-y-3">
                {[
                  { q: 'What is Bazi (Eight Characters)?', a: 'Bazi, also known as the Four Pillars of Destiny, is a 5,000-year-old Chinese metaphysical system. It uses your birth year, month, day, and hour to construct a chart of eight characters that reveals your innate nature, strengths, challenges, and life path.' },
                  { q: 'Is this fortune telling?', a: 'Bazi is better understood as a tool for self-discovery rather than fortune telling. It highlights your inherent tendencies and potential life patterns, empowering you to make informed decisions.' },
                  { q: 'Do I need an exact birth time?', a: 'An exact birth time provides the most accurate reading. If unknown, we default to noon (12:00 PM) for the Hour Pillar calculation.' },
                  { q: 'How is my data handled?', a: 'Your privacy is paramount. All calculations happen entirely in your browser — no data is sent to any server. We never store or share your birth information.' },
                  { q: 'Can I check compatibility with my partner?', a: 'Yes! Visit our Love Compatibility page for a detailed analysis of how your elements interact with a partner\'s chart.' },
                  { q: 'What is a Day Master in Bazi?', a: 'Your Day Master is the Heavenly Stem of your birth day pillar. It represents your core personality, strengths, and challenges.' },
                  { q: 'How often should I get a reading?', a: 'Your Bazi chart is based on your birth date and remains the same throughout your life. We recommend checking your chart annually or during major life transitions.' },
                ].map((faq, i) => (
                  <details key={i} className="group bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden">
                    <summary className="px-5 py-4 cursor-pointer text-sm font-medium text-[#e8dcc8] flex items-center gap-2 hover:bg-white/[0.02] transition-colors list-none [&::-webkit-details-marker]:hidden">
                      <span className="text-[#d4af37] text-xs mr-1">✦</span>
                      {faq.q}
                      <span className="ml-auto text-[#6b5f4a] text-xs group-open:rotate-180 transition-transform">▾</span>
                    </summary>
                    <div className="px-5 pb-4 text-xs text-[#9b8e7a] leading-relaxed border-t border-white/[0.04] pt-3">{faq.a}</div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* 卡片10：Share */}
          <section className="scroll-reveal">
            <div className="glass-card rounded-3xl p-8 md:p-12 cinematic-glow text-center">
              <h2 className="text-xl font-bold gold-text mb-3">Share & Stay Connected</h2>
              <p className="text-[#9b8e7a] text-xs max-w-md mx-auto mb-6">Help others discover ancient wisdom — share MysticSage with friends</p>
              <div className="flex flex-wrap justify-center gap-3">
                <button onClick={() => window.open('https://twitter.com/intent/tweet?text=Discover your Bazi destiny with this free Chinese astrology reading!&url=https://mystic8zi.top', '_blank', 'width=600,height=400')}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-[#e8dcc8] transition-all">𝕏 Twitter</button>
                <button onClick={() => window.open('https://www.facebook.com/sharer/sharer.php?u=https://mystic8zi.top', '_blank', 'width=600,height=400')}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-[#e8dcc8] transition-all">f Facebook</button>
                <button onClick={() => window.open('https://wa.me/?text=Check out this free Bazi reading site https://mystic8zi.top', '_blank', 'width=600,height=400')}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-[#e8dcc8] transition-all">💬 WhatsApp</button>
                <button onClick={() => navigator.clipboard.writeText('https://mystic8zi.top').then(() => alert('Link copied!'))}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-[#e8dcc8] transition-all">📋 Copy Link</button>
              </div>
            </div>
          </section>

        </div>

        {/* ===== Live Activity Feed ===== */}
        <LiveActivityFeed />

        {/* ===== Footer ===== */}
        <Footer />
      </main>
    </>
  );
}
