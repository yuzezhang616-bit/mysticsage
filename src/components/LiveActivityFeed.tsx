'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * 前端展示文案，非真实用户数据
 * 用于在首页右下角展示模拟的实时活动通知
 * 所有文案均为占位示例，不涉及真实用户跟踪
 *
 * 消息池共19条文案模板，每条包含 emoji + 文案
 * 按15-20秒间隔轮播，每条消息淡入停留约5秒后淡出
 */
const ACTIVITY_FEED = [
  "🪄 Someone just unlocked their Bazi chart...",
  "🔥 A Fire Day Master discovered their true nature...",
  "💕 Two souls checked their love compatibility...",
  "🌊 A Water element seeker found their balance...",
  "⭐ Someone is reading about the Five Elements...",
  "☯ A curious mind explored their Day Master...",
  "🌿 A Wood element traveler began their journey...",
  "✨ Another seeker revealed their destiny...",
  "🪷 A new visitor discovered Chinese astrology...",
  "🔮 Someone just calculated their Four Pillars...",
  "🏔️ An Earth element explorer checked their chart...",
  "⚔️ A Metal element warrior learned their strengths...",
  "📜 A knowledge seeker is reading about BaZi...",
  "🌙 A late-night explorer uncovered their fate...",
  "🎋 A philosophy lover delved into their elements...",
  "💫 Someone shared their Bazi chart with a friend...",
  "🌅 A morning seeker started their destiny journey...",
  "🦋 A transformation seeker found their element...",
  "🌟 A star-gazer explored their cosmic blueprint...",
];

export default function LiveActivityFeed() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [closing, setClosing] = useState(false);
  const mountedRef = useRef(true);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      if (mountedRef.current) setIsVisible(false);
    }, 400);
  };

  useEffect(() => {
    mountedRef.current = true;

    // 初始加载后淡入第一条消息
    const initFadeIn = setTimeout(() => {
      if (mountedRef.current) setOpacity(1);
    }, 1000);

    let cycleTimeout: ReturnType<typeof setTimeout>;
    let fadeOutTimeout: ReturnType<typeof setTimeout>;
    let fadeInTimeout: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
      // 15-20 秒随机间隔
      const delay = 15000 + Math.random() * 5000;
      cycleTimeout = setTimeout(() => {
        if (!mountedRef.current) return;

        // 淡出当前消息
        setOpacity(0);

        // 等待淡出动画完成后切换消息
        fadeOutTimeout = setTimeout(() => {
          if (!mountedRef.current) return;
          setCurrentIndex((prev) => (prev + 1) % ACTIVITY_FEED.length);

          // 短暂延迟后淡入新消息
          fadeInTimeout = setTimeout(() => {
            if (mountedRef.current) setOpacity(1);
          }, 100);
        }, 500);

        // 安排下一条消息的轮播
        scheduleNext();
      }, delay);
    };

    scheduleNext();

    return () => {
      mountedRef.current = false;
      clearTimeout(initFadeIn);
      clearTimeout(cycleTimeout);
      clearTimeout(fadeOutTimeout);
      clearTimeout(fadeInTimeout);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-40 max-w-[260px]"
      style={{ opacity: closing ? 0 : 1, transition: 'opacity 0.4s ease' }}
    >
      <div
        className="bg-gradient-to-b from-white/[0.10] to-white/[0.04] backdrop-blur-xl border border-white/[0.12] rounded-xl p-3.5 shadow-lg shadow-black/40 cursor-pointer transition-all hover:border-[#d4af37]/30 select-none"
        onClick={handleClose}
        style={{ opacity, transition: 'opacity 0.5s ease-in-out' }}
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37] font-semibold">✨ Live</span>
          <button
            onClick={(e) => { e.stopPropagation(); handleClose(); }}
            className="text-[#6b5f4a] hover:text-[#e8dcc8] transition-colors text-xs leading-none p-0.5"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <p className="text-xs text-[#c4b998] mt-2 leading-relaxed">
          {ACTIVITY_FEED[currentIndex]}
        </p>
      </div>
    </div>
  );
}
