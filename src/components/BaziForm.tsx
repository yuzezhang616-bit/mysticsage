'use client';

import { useState } from 'react';

interface BaziFormProps {
  onSubmit: (data: BaziFormData) => void;
  loading: boolean;
  lang: 'en' | 'zh';
}

export interface BaziFormData {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  gender: 'male' | 'female';
}

export default function BaziForm({ onSubmit, loading, lang }: BaziFormProps) {
  const [form, setForm] = useState<BaziFormData>({
    year: '', month: '', day: '',
    hour: '', minute: '', gender: 'male',
  });

  const isEn = lang === 'en';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.year || !form.month || !form.day || form.hour === '' || form.minute === '') return;
    onSubmit(form);
  };

  const inputClass = "w-full bg-[#161b22] border border-[#30363d] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] transition-colors";
  const labelClass = "block text-sm text-gray-400 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Date & Time Row */}
      <div className="grid grid-cols-5 gap-3">
        <div>
          <label className={labelClass}>{isEn ? 'Year' : '年'}</label>
          <input
            type="number" min={1900} max={2100} placeholder="1990"
            className={inputClass}
            value={form.year} onChange={e => setForm({...form, year: e.target.value})}
            required
          />
        </div>
        <div>
          <label className={labelClass}>{isEn ? 'Month' : '月'}</label>
          <input
            type="number" min={1} max={12} placeholder="1"
            className={inputClass}
            value={form.month} onChange={e => setForm({...form, month: e.target.value})}
            required
          />
        </div>
        <div>
          <label className={labelClass}>{isEn ? 'Day' : '日'}</label>
          <input
            type="number" min={1} max={31} placeholder="15"
            className={inputClass}
            value={form.day} onChange={e => setForm({...form, day: e.target.value})}
            required
          />
        </div>
        <div>
          <label className={labelClass}>{isEn ? 'Hour' : '时'}</label>
          <input
            type="number" min={0} max={23} placeholder="14"
            className={inputClass}
            value={form.hour} onChange={e => setForm({...form, hour: e.target.value})}
            required
          />
        </div>
        <div>
          <label className={labelClass}>{isEn ? 'Min' : '分'}</label>
          <input
            type="number" min={0} max={59} placeholder="30"
            className={inputClass}
            value={form.minute} onChange={e => setForm({...form, minute: e.target.value})}
            required
          />
        </div>
      </div>

      {/* Gender */}
      <div>
        <label className={labelClass}>{isEn ? 'Gender' : '性别'}</label>
        <div className="flex gap-3">
          {[
            { value: 'male' as const, label: isEn ? '♂ Male' : '♂ 男' },
            { value: 'female' as const, label: isEn ? '♀ Female' : '♀ 女' },
          ].map(opt => (
            <button
              key={opt.value}
              type="button"
              className={`flex-1 py-3 rounded-lg border text-sm font-medium transition-all ${
                form.gender === opt.value
                  ? 'border-[#58a6ff] bg-[#58a6ff]/10 text-[#58a6ff]'
                  : 'border-[#30363d] text-gray-400 hover:border-gray-500'
              }`}
              onClick={() => setForm({...form, gender: opt.value})}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white font-semibold text-lg
                   hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            {isEn ? 'Reading the stars...' : '正在推算命盘...'}
          </span>
        ) : (
          <span>{isEn ? '✦ Reveal My Destiny' : '✦ 开启我的命运解读'}</span>
        )}
      </button>
    </form>
  );
}
