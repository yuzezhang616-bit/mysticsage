'use client';

interface LanguageSwitchProps {
  lang: 'en' | 'zh';
  onChange: (lang: 'en' | 'zh') => void;
}

export default function LanguageSwitch({ lang, onChange }: LanguageSwitchProps) {
  return (
    <div className="flex items-center gap-1 bg-[#161b22] border border-[#30363d] rounded-lg p-0.5">
      <button
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          lang === 'en' ? 'bg-[#58a6ff] text-white' : 'text-gray-400 hover:text-white'
        }`}
        onClick={() => onChange('en')}
      >
        EN
      </button>
      <button
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          lang === 'zh' ? 'bg-[#58a6ff] text-white' : 'text-gray-400 hover:text-white'
        }`}
        onClick={() => onChange('zh')}
      >
        中文
      </button>
    </div>
  );
}
