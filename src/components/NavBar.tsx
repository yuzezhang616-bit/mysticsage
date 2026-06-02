'use client';

import { useState } from 'react';
import Link from 'next/link';
import { House, Heart, PencilSimple, YinYang, Building, User, Moon, Books, List, X, Star } from '@phosphor-icons/react';

interface NavBarProps {
  currentLang?: 'en' | 'zh';
  onLangChange?: (lang: 'en' | 'zh') => void;
  showLang?: boolean;
}

const NAV_ITEMS = [
  { href: '/', Icon: House, en: 'Bazi', zh: '八字测算' },
  { href: '/love', Icon: Heart, en: 'Love Match', zh: '算姻缘' },
  { href: '/naming', Icon: PencilSimple, en: 'Naming', zh: '起名' },
  { href: '/iching', Icon: YinYang, en: 'I Ching', zh: '周易' },
  { href: '/fengshui', Icon: Building, en: 'Feng Shui', zh: '风水' },
  { href: '/face', Icon: User, en: 'Face Reading', zh: '看相' },
  { href: '/dream', Icon: Moon, en: 'Dream', zh: '解梦' },
  { href: '/knowledge', Icon: Books, en: 'Learn', zh: '知识' },
];

export default function NavBar({ currentLang = 'en', onLangChange, showLang = true }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isEn = currentLang === 'en';

  return (
    <nav className="border-b border-[rgba(212,175,55,0.1)] bg-[#07080a]/60 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-lg gold-text font-bold"><Star weight="fill" size={18} /></span>
          <span className="text-lg gold-text font-bold">MysticSage</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-2.5 py-1.5 rounded-lg text-xs text-[#9b8e7a] hover:text-[#e8dcc8] hover:bg-[rgba(212,175,55,0.06)] transition-all flex items-center gap-1"
            >
              <span><item.Icon size={16} weight="regular" /></span>
              <span>{isEn ? item.en : item.zh}</span>
            </Link>
          ))}
        </div>

        {/* Right: Lang + Hamburger */}
        <div className="flex items-center gap-2">
          {showLang && onLangChange && (
            <div className="flex items-center gap-1">
              <button onClick={() => onLangChange('en')}
                className={`px-2 py-1 rounded-md text-xs font-medium transition-all ${isEn ? 'bg-[#d4af37]/20 text-[#f0d68a] border border-[#d4af37]/30' : 'text-[#9b8e7a] hover:text-[#e8dcc8]'}`}>EN</button>
              <button onClick={() => onLangChange('zh')}
                className={`px-2 py-1 rounded-md text-xs font-medium transition-all ${!isEn ? 'bg-[#d4af37]/20 text-[#f0d68a] border border-[#d4af37]/30' : 'text-[#9b8e7a] hover:text-[#e8dcc8]'}`}>中文</button>
            </div>
          )}
          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-[#9b8e7a] hover:text-[#e8dcc8] p-1 text-lg">
            {menuOpen ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden border-t border-[rgba(212,175,55,0.1)] bg-[#07080a]/95 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 py-3 grid grid-cols-2 gap-1">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-xs text-[#9b8e7a] hover:text-[#e8dcc8] hover:bg-[rgba(212,175,55,0.06)] transition-all flex items-center gap-2"
              >
                <span><item.Icon size={16} weight="regular" /></span>
                <span>{isEn ? item.en : item.zh}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
