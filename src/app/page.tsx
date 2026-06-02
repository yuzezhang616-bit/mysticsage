'use client';

import { useState } from 'react';
import type { BaziResult, Gender } from '@/lib/bazi/types';
import type { AiReading } from '@/lib/ai/interpretation';
import { calculateBazi } from '@/lib/bazi';
import { generateSeedReading } from '@/lib/reading/seed-readings';
import BaziChart from '@/components/BaziChart';
import ReadingPanel from '@/components/ReadingPanel';
import Footer from "@/components/Footer";
import NavBar from '@/components/NavBar';

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
  const [result, setResult] = useState<BaziResult | null>(null);
  const [reading, setReading] = useState<AiReading | null>(null);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    year: '', month: '', day: '', hour: '', minute: '', gender: 'male' as 'male' | 'female',
  });
  const [submitted, setSubmitted] = useState(false);

  const isValid =
    formData.year && formData.month && formData.day &&
    parseInt(formData.year) >= 1900 && parseInt(formData.year) <= 2100 &&
    parseInt(formData.month) >= 1 && parseInt(formData.month) <= 12 &&
    parseInt(formData.day) >= 1 && parseInt(formData.day) <= 31;

  const handleSubmit = async () => {
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
      setResult(bazi);
      setReading({ en: enReading, zh: zhReading });
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please check your input and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="video-bg">
        <video autoPlay muted loop playsInline className="bg-video">
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay" />
      </div>

      <main className="min-h-screen relative z-10">
        <NavBar />
        <div className="max-w-5xl mx-auto px-4 py-12">

          {!submitted && (
            <>
              {/* Hero */}
              <div className="text-center mb-12">
                <div className="text-6xl mb-6 select-none opacity-60">☰</div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 gold-text leading-tight" style={{fontFamily:'var(--font-serif)'}}>
                  Unlock the Secrets of Your Bazi
                </h1>
                <p className="text-[#9b8e7a] max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
                  For 5,000 years, the ancient Chinese have used the Four Pillars of Destiny to illuminate the path ahead.
                </p>
                {/* Gold decorative line */}
                <div className="flex items-center justify-center gap-3 mt-6 mb-2">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4af37]/40" />
                  <div className="h-px w-8 bg-[#d4af37]/60" />
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4af37]/40" />
                </div>
              </div>

              {/* Form card */}
              <div className="max-w-xl mx-auto bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/[0.12] rounded-2xl p-8 shadow-2xl shadow-black/50">
                <h2 className="text-lg font-semibold text-center mb-6 gold-text">✦ Your Birth Information</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-5 gap-3">
                    {(['year','month','day','hour','minute'] as const).map((field) => {
                      const labels: Record<string,string> = { year:'Year', month:'Month', day:'Day', hour:'Hour', minute:'Min' };
                      const ph: Record<string,string> = { year:'1990', month:'1', day:'15', hour:'14', minute:'30' };
                      return (
                        <div key={field}>
                          <label className="block text-xs text-[#9b8e7a] mb-1.5">{labels[field]}</label>
                          <input type="number" placeholder={ph[field]} value={formData[field]}
                            onChange={(e) => setFormData({...formData, [field]: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-3 text-[#e8dcc8] placeholder-[#3a3528] focus:outline-none focus:border-[#d4af37]/40 focus:ring-1 focus:ring-[#d4af37]/20 transition-all text-sm"/>
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <label className="block text-xs text-[#9b8e7a] mb-1.5">Gender</label>
                    <div className="flex gap-3">
                      {(['male','female'] as const).map(g => (
                        <button key={g} type="button" onClick={() => setFormData({...formData, gender: g})}
                          className={`flex-1 py-3 rounded-lg border text-sm font-medium transition-all ${formData.gender === g ? 'border-[#d4af37] bg-[#d4af37]/10 text-[#f0d68a]' : 'border-white/10 text-[#6b5f4a] hover:border-white/20'}`}>
                          {g === 'male' ? '♂ Male' : '♀ Female'}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button onClick={handleSubmit} disabled={!isValid || loading}
                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${isValid && !loading
                      ? 'bg-gradient-to-r from-[#a8872e] via-[#d4af37] to-[#a8872e] text-[#07080a] cursor-pointer hover:shadow-[0_0_32px_rgba(212,175,55,0.25)] hover:brightness-110 hover:-translate-y-0.5'
                      : 'bg-white/5 text-[#3a3528] cursor-not-allowed border border-white/5'}`}>
                    {loading
                      ? <span className="inline-flex items-center gap-2"><span className="gold-spinner"></span>Reading the stars...</span>
                      : <span>✦ Reveal My Destiny</span>}
                  </button>
                </div>
                {error && <p className="mt-4 text-red-400/80 text-sm text-center bg-red-500/5 border border-red-500/10 rounded-lg p-3">{error}</p>}
              </div>

              {/* Today's Horoscope */}
              <div className="mt-24 text-center">
                <div className="max-w-xl mx-auto bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/[0.12] rounded-2xl p-8 shadow-lg shadow-black/30">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#6b5f4a] mb-4">✦ Today's Chinese Horoscope</p>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="text-4xl">{ZODIAC_EMOJIS[TODAY_ZODIAC]}</span>
                    <span className="text-2xl font-bold gold-text">{TODAY_ZODIAC}</span>
                  </div>
                  <div className="space-y-3 text-left">
                    <div className="bg-white/[0.03] rounded-lg p-3 border border-white/[0.05]">
                      <p className="text-[10px] text-[#6b5f4a] mb-1 uppercase tracking-wider">General</p>
                      <p className="text-xs text-[#c4b998] leading-relaxed">{ZODIAC_TIPS[TODAY_ZODIAC]}</p>
                    </div>
                    <div className="bg-white/[0.03] rounded-lg p-3 border border-white/[0.05]">
                      <p className="text-[10px] text-[#6b5f4a] mb-1 uppercase tracking-wider">Love</p>
                      <p className="text-xs text-[#c4b998] leading-relaxed">{ZODIAC_LOVE[TODAY_ZODIAC]}</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-[#3a3528] mt-4">Not your sign? Calculate your personalized Bazi reading above ✦</p>
                </div>
              </div>

              {/* Features */}
              <div className="mt-24 text-center">
                <h2 className="text-2xl md:text-3xl font-bold gold-text mb-4">What You Will Discover</h2>
                <p className="text-[#9b8e7a] text-sm max-w-xl mx-auto mb-12">Your Bazi chart holds the keys to understanding your true self</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {[
                    { icon:'☯', t:'Your True Nature', d:'Discover your Day Master element and understand your core personality, strengths, and inherent tendencies.' },
                    { icon:'🔥', t:'Elemental Balance', d:'See how Wood, Fire, Earth, Metal, and Water flow within you. Find which elements bring harmony and which need nurturing.' },
                    { icon:'⭐', t:'Life Guidance', d:'Receive personalized insights about career paths, relationships, wealth potential, and personal growth tailored to your chart.' },
                  ].map((item, i) => (
                    <div key={i} className="bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-lg border border-white/[0.10] rounded-2xl p-7 text-center transition-all hover:border-[#d4af37]/20 hover:-translate-y-0.5">
                      <div className="text-4xl mb-4">{item.icon}</div>
                      <h3 className="text-base font-semibold gold-text mb-2">{item.t}</h3>
                      <p className="text-[#9b8e7a] text-xs leading-relaxed">{item.d}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* YouTube Video */}
              <div className="mt-32 text-center scroll-reveal">
                <h2 className="text-2xl md:text-3xl font-bold gold-text mb-3">Learn Bazi with Video Guide</h2>
                <p className="text-[#9b8e7a] text-sm max-w-xl mx-auto mb-10">A beginner-friendly introduction to Chinese astrology</p>
                <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/[0.12] shadow-lg shadow-black/30">
                  <div className="relative" style={{ paddingBottom: '56.25%' }}>
                    <iframe src="https://www.youtube.com/embed/z_Daeo1QiII" title="Bazi Chinese Astrology Guide"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
                      className="absolute inset-0 w-full h-full" style={{ border: 'none' }}/>
                  </div>
                </div>
              </div>

              {/* Stats / Social Proof */}
              <div className="mt-24 text-center scroll-reveal">
                <div className="max-w-4xl mx-auto bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/[0.12] rounded-2xl p-8 shadow-lg shadow-black/30">
                  <h2 className="text-xl font-bold gold-text mb-2">Trusted by Seekers Worldwide</h2>
                  <p className="text-[#9b8e7a] text-xs mb-8">Join thousands exploring ancient wisdom</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { val:'5,000+', en:'Years of Wisdom' },
                      { val:'12,847', en:'Charts Calculated' },
                      { val:'64,235', en:'Elements Mapped' },
                      { val:'✨', en:'100% Free' },
                    ].map((stat, i) => (
                      <div key={i}>
                        <div className="text-2xl font-bold gold-text mb-1">{stat.val}</div>
                        <div className="text-[10px] text-[#6b5f4a] uppercase tracking-wider">{stat.en}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Popular Articles */}
              <div className="mt-24 text-center scroll-reveal">
                <h2 className="text-2xl md:text-3xl font-bold gold-text mb-3">Explore Our Knowledge Base</h2>
                <p className="text-[#9b8e7a] text-sm max-w-xl mx-auto mb-10">Deepen your understanding of Chinese astrology</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  {[
                    { href:'/knowledge/what-is-bazi', icon:'📜', t:'What is Bazi?', d:'Discover the ancient art of Four Pillars of Destiny' },
                    { href:'/knowledge/five-elements', icon:'🌊', t:'Five Elements', d:'Wood, Fire, Earth, Metal, Water — the building blocks of destiny' },
                    { href:'/knowledge/chinese-zodiac-complete', icon:'🐉', t:'Zodiac Guide', d:'Complete guide to the 12 Chinese zodiac signs' },
                  ].map((item, i) => (
                    <a key={i} href={item.href} className="bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-lg border border-white/[0.10] rounded-xl p-5 text-left transition-all hover:border-[#d4af37]/20 group">
                      <span className="text-2xl block mb-3">{item.icon}</span>
                      <h3 className="text-sm font-semibold gold-text mb-1 group-hover:text-[#f0d68a] transition-colors">{item.t}</h3>
                      <p className="text-[10px] text-[#6b5f4a]">{item.d}</p>
                    </a>
                  ))}
                </div>
                <a href="/knowledge" className="inline-block mt-6 text-xs text-[#d4af37] hover:text-[#f0d68a] transition-colors">Browse All Articles →</a>
              </div>

              {/* How It Works */}
              <div className="mt-24 text-center">
                <h2 className="text-2xl md:text-3xl font-bold gold-text mb-4">How It Works</h2>
                <p className="text-[#9b8e7a] text-sm max-w-xl mx-auto mb-12">Three simple steps to uncover your cosmic blueprint</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { num:'01', en:'Enter your birth date and time' },
                    { num:'02', en:'Our algorithm calculates your Four Pillars' },
                    { num:'03', en:'Receive your personalized reading' },
                  ].map((step, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="text-[#d4af37]/30 text-5xl font-bold mb-3" style={{fontFamily:'serif'}}>{step.num}</div>
                      <div className="w-12 h-0.5 bg-[rgba(212,175,55,0.2)] mb-3"></div>
                      <p className="text-[#e8dcc8] text-sm">{step.en}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div className="mt-24 mb-16">
                <h2 className="text-2xl md:text-3xl font-bold gold-text text-center mb-4">Frequently Asked Questions</h2>
                <p className="text-[#9b8e7a] text-sm text-center max-w-xl mx-auto mb-10">Everything you need to know about Bazi reading</p>
                <div className="max-w-2xl mx-auto space-y-3">
                  {[
                    { q:'What is Bazi (Eight Characters)?', a:'Bazi, also known as the Four Pillars of Destiny, is a 5,000-year-old Chinese metaphysical system. It uses your birth year, month, day, and hour to construct a chart of eight characters that reveals your innate nature, strengths, challenges, and life path.' },
                    { q:'Is this fortune telling?', a:'Bazi is better understood as a tool for self-discovery rather than fortune telling. It highlights your inherent tendencies and potential life patterns, empowering you to make informed decisions.' },
                    { q:'Do I need an exact birth time?', a:'An exact birth time provides the most accurate reading, especially for the Hour Pillar which influences career and relationships. If unknown, we default to noon.' },
                    { q:'How is my data handled?', a:'Your privacy is paramount. All calculations happen entirely in your browser — no data is sent to any server. We never store or share your birth information.' },
                  ].map((faq, i) => (
                    <details key={i} className="group bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-lg border border-white/[0.10] rounded-xl overflow-hidden">
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
            </>
          )}

          {submitted && (
            <div className="text-center mb-8">
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
        <Footer />
      </main>
    </>
  );
}
