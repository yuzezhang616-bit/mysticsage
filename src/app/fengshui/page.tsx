'use client';

import { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const TIPS = [
  {
    icon: '🏠', en:{t:'Home Layout', d:'Keep your entryway clutter-free — Qi (energy) enters through the front door. A clean, welcoming entrance invites positive energy and opportunities into your life.'}, zh:{t:'家居布局', d:'保持门口整洁——气从大门进入。干净、温馨的入口能邀请正能量和好运进入你的生活。'}
  },
  {
    icon: '🪟', en:{t:'Window & Light', d:'Natural light is essential for good Feng Shui. Keep windows clean and unobstructed. Sunlight carries Yang energy that energizes and revitalizes your living space.'}, zh:{t:'窗与光', d:'自然光对好的风水至关重要。保持窗户干净无遮挡。阳光携带阳气，能够激活和更新你的居住空间。'}
  },
  {
    icon: '🛏️', en:{t:'Bedroom Harmony', d:'Position your bed so you can see the door without being directly in line with it (the "command position"). Avoid mirrors facing the bed — they can disrupt restful sleep.'}, zh:{t:'卧室和谐', d:'将床摆放在能看到门但不正对门的位置（"命令位"）。避免镜子正对床——它们可能干扰安稳的睡眠。'}
  },
  {
    icon: '💧', en:{t:'Water Features', d:'Water represents wealth and abundance in Feng Shui. A small fountain or aquarium in the wealth area (southeast corner) can activate prosperity energy — but keep the water clean and flowing.'}, zh:{t:'水元素', d:'水在风水中代表财富和丰盛。在财位（东南角）放置小喷泉或鱼缸可以激活财运——但保持水清洁流动。'}
  },
  {
    icon: '🌿', en:{t:'Plants & Life', d:'Live plants bring Wood energy — growth, vitality, and flexibility. Place them in the east (health) or southeast (wealth) areas. Avoid thorny plants in the bedroom.'}, zh:{t:'植物与生机', d:'活体植物带来木能量——生长、活力和柔韧性。将它们放在东方（健康）或东南方（财富）。避免有刺植物放在卧室。'}
  },
  {
    icon: '🔮', en:{t:'Crystals & Elements', d:'Use crystals to balance the Five Elements in your space. Amethyst for spiritual growth, citrine for wealth, rose quartz for love, and clear quartz for overall harmony.'}, zh:{t:'水晶与五行', d:'用水晶来平衡空间的五行。紫水晶促精神成长，黄水晶聚财，粉晶招桃花，白水晶保整体和谐。'}
  },
  {
    icon: '🎨', en:{t:'Color Energy', d:'Colors correspond to the Five Elements: Green=Wood (growth), Red=Fire (passion), Yellow=Earth (stability), White=Metal (clarity), Blue/Black=Water (wisdom). Use accordingly.'}, zh:{t:'色彩能量', d:'颜色对应五行：绿=木（生长）、红=火（热情）、黄=土（稳定）、白=金（清晰）、蓝/黑=水（智慧）。按需使用。'}
  },
  {
    icon: '🚪', en:{t:'Door Alignment', d:'Avoid having three doors in a straight line — this creates "poison arrow" energy that rushes through unchecked. Use screens or furniture to redirect the flow.'}, zh:{t:'门位', d:'避免三扇门在一条直线上——这会产生"箭煞"，能量直冲而过。用屏风或家具阻挡和气流的转向。'}
  },
];

export default function FengShuiPage() {

  return (
    <>
      <div className="video-bg">
        <video autoPlay muted loop playsInline className="bg-video"><source src="/bg.mp4" type="video/mp4" /></video>
        <div className="video-overlay" />
      </div>
      <main className="min-h-screen relative z-10">
        <NavBar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold gold-text text-center mb-2">🏯 Feng Shui Wisdom</h1>
          <p className="text-[#9b8e7a] text-center text-sm mb-8 max-w-lg mx-auto">
            Harmonize your environment and invite positive energy into your life
          </p>

          {/* Intro */}
          <div className="bg-gradient-to-r from-[rgba(212,175,55,0.08)] to-[rgba(168,135,46,0.05)] border border-[rgba(212,175,55,0.15)] rounded-xl p-6 mb-8">
            <p className="text-[#e8dcc8] text-sm leading-relaxed opacity-85">
              Feng Shui, meaning "wind and water," is the ancient Chinese art of harmonizing your environment to promote health, happiness, and prosperity. By understanding how energy (Qi) flows through your space, you can create an environment that supports your goals and nurtures your well-being.
            </p>
          </div>

          {/* Tips grid */}
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {TIPS.map((tip, i) => (
              <div key={i} className="bg-[#0f1117]/70 border border-[rgba(212,175,55,0.06)] rounded-xl p-4 hover:border-[rgba(212,175,55,0.15)] transition-all">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{tip.icon}</span>
                  <div>
                    <h3 className="text-sm font-semibold gold-text mb-1">tip.en.t</h3>
                    <p className="text-[#9b8e7a] text-xs leading-relaxed">tip.en.d</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Five Elements */}
          <div className="border-t border-[rgba(212,175,55,0.06)] pt-8">
            <h2 className="text-lg font-semibold gold-text text-center mb-6">The Five Elements in Feng Shui</h2>
            <div className="grid grid-cols-5 gap-3">
              {[
                { icon:'🌳', en:'Wood - Growth, New Beginnings, East', zh:'木 — 生长、新开始、东方' },
                { icon:'🔥', en:'Fire - Passion, Recognition, South', zh:'火 — 热情、认可、南方' },
                { icon:'⛰️', en:'Earth - Stability, Health, Center', zh:'土 — 稳定、健康、中央' },
                { icon:'⚔️', en:'Metal - Clarity, Completion, West', zh:'金 — 清晰、完成、西方' },
                { icon:'💧', en:'Water - Wisdom, Career, North', zh:'水 — 智慧、事业、北方' },
              ].map((el, i) => (
                <div key={i} className="bg-black/20 backdrop-blur-lg border border-white/[0.06] rounded-xl p-3 text-center">
                  <div className="text-2xl mb-2">{el.icon}</div>
                  <p className="text-[#9b8e7a] text-[10px] leading-relaxed">el.en</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
