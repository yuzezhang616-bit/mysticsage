'use client';

import { useState, useEffect } from 'react';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-[#07080a]/80 backdrop-blur-2xl border-b border-white/[0.04] shadow-lg shadow-black/20'
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center">
        <a href="/" className="shrink-0">
          <span className="text-lg gold-text font-bold tracking-wide">✦ MysticSage</span>
        </a>
        <div className="flex-1 flex items-center justify-center">
          <div className="hidden md:flex items-center gap-1">
            {[
              ['/', 'Bazi'],
              ['/love', 'Love Match'],
              ['/naming', 'Naming'],
              ['/iching', 'I Ching'],
              ['/fengshui', 'Feng Shui'],
              ['/face', 'Face Reading'],
              ['/dream', 'Dream'],
              ['/knowledge', 'Learn'],
            ].map(([href, label]) => (
              <a key={href} href={href}
                className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                  scrolled
                    ? 'text-[#9b8e7a] hover:text-[#e8dcc8] hover:bg-white/5'
                    : 'text-[#9b8e7a]/70 hover:text-[#e8dcc8] hover:bg-white/5'
                }`}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
