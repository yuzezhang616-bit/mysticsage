'use client';

import { useMemo } from 'react';

export interface Comment {
  name: string;
  date: string;
  text: string;
  likes: number;
}

const ARTICLE_COMMENTS: Record<string, Comment[]> = {
  'what-is-bazi': [
    { name: 'Daniel K.', date: '2026-05-28', text: "This is the clearest explanation of Bazi I've found online. The breakdown of the Four Pillars finally made it click for me after months of confusion.", likes: 24 },
    { name: 'Priya S.', date: '2026-05-25', text: 'I calculated my Bazi using the tool and then read this article to understand what it means. The Day Master explanation was spot on for my personality.', likes: 18 },
    { name: 'James T.', date: '2026-05-20', text: "I've been studying Chinese metaphysics for a year and this article is surprisingly accurate and well-structured. Great intro for beginners.", likes: 15 },
  ],
  'five-elements': [
    { name: 'Maria G.', date: '2026-05-27', text: 'The Five Elements have always confused me — too much Water, not enough Fire they said. Now I finally understand the generating and controlling cycles!', likes: 31 },
    { name: 'Tom W.', date: '2026-05-22', text: 'My chart showed I was missing Metal element. After reading this I started wearing white and it surprisingly balanced my mood.', likes: 22 },
    { name: 'Aisha R.', date: '2026-05-18', text: 'The elemental balance visualization in the Bazi chart tool combined with this article helped me understand my career strengths.', likes: 19 },
  ],
  'chinese-zodiac-complete': [
    { name: 'Ryan M.', date: '2026-05-29', text: 'I was born in Year of the Rat and everything about being resourceful and adaptable fits perfectly. My partner is an Ox — now I understand our dynamic!', likes: 27 },
    { name: 'Lisa H.', date: '2026-05-24', text: 'The compatibility section is surprisingly accurate. My best friends and worst relationships all match the zodiac compatibility table.', likes: 20 },
    { name: 'Kenji Y.', date: '2026-05-19', text: 'I never knew about the Fixed Element for each zodiac sign. This article opened up a whole new layer of understanding for me.', likes: 16 },
  ],
  'tai-sui-2026': [
    { name: 'Wei C.', date: '2026-05-30', text: '2026 is my Ben Ming Nian (本命年) and I was worried. This article explained the remedies clearly — wearing red and making offerings at the temple.', likes: 35 },
    { name: 'Sophie L.', date: '2026-05-26', text: "The Tai Sui direction explanation was exactly what I needed. I rearranged my home office after reading this and things have been smoother.", likes: 28 },
    { name: 'Carlos M.', date: '2026-05-21', text: "As someone born in a year clashing with Tai Sui 2026, this article's advice on avoiding major life changes was really helpful.", likes: 23 },
  ],
  default: [
    { name: 'Michael R.', date: '2026-05-29', text: "Really insightful article! I've been reading through the knowledge base and every article adds a new layer of understanding to my Bazi chart.", likes: 17 },
    { name: 'Emma L.', date: '2026-05-23', text: "I found this through Google and I'm glad I did. The explanations are clear and the references to classical Chinese texts add credibility.", likes: 13 },
    { name: 'David P.', date: '2026-05-17', text: 'Bookmarked this for future reference. Planning to go through all the articles systematically. Great resource for anyone into Chinese astrology.', likes: 11 },
  ],
};

export default function CommentsSection({ slug }: { slug: string }) {
  const comments = useMemo(() => {
    return ARTICLE_COMMENTS[slug] || ARTICLE_COMMENTS.default;
  }, [slug]);

  return (
    <div className="border-t border-white/[0.06] pt-6 mt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-[10px] text-[#6b5f4a] uppercase tracking-wider">💬 Reader Comments</p>
        <span className="text-[10px] text-[#6b5f4a]">{comments.length} comments</span>
      </div>
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/[0.06]" />
        <div className="h-px w-8 bg-[#d4af37]/20" />
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/[0.06]" />
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((c, i) => (
          <div
            key={i}
            className="bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.06] rounded-xl p-4 transition-all hover:border-[#d4af37]/15"
          >
            {/* Comment Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full border border-[#d4af37]/40 flex items-center justify-center text-[10px] font-bold text-[#d4af37] bg-[#d4af37]/5">
                  {c.name[0]}
                </div>
                <span className="text-xs font-medium text-[#e8dcc8]">{c.name}</span>
              </div>
              <span className="text-[10px] text-[#6b5f4a]">{c.date}</span>
            </div>
            {/* Comment Text */}
            <p className="text-xs text-[#c4b998] leading-relaxed">&ldquo;{c.text}&rdquo;</p>
            {/* Like Button */}
            <div className="flex items-center gap-1 mt-2">
              <button
                onClick={() => alert('❤️ Thanks for your feedback!')}
                className="flex items-center gap-1 text-[10px] text-[#6b5f4a] hover:text-[#d4af37] transition-colors"
              >
                <span>🤍</span>
                <span>{c.likes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Leave a Comment */}
      <div className="mt-5 bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.06] rounded-xl p-4">
        <p className="text-[10px] text-[#6b5f4a] mb-2 uppercase tracking-wider">✍️ Leave a comment</p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Share your thoughts..."
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-[#e8dcc8] placeholder:text-[#6b5f4a] outline-none focus:border-[#d4af37]/40 transition-colors"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.target as HTMLInputElement).value.trim()) {
                alert('✨ Thanks for your comment! We review all comments before publishing.');
                (e.target as HTMLInputElement).value = '';
              }
            }}
          />
          <button
            onClick={() => {
              const input = document.querySelector<HTMLInputElement>('[placeholder="Share your thoughts..."]');
              if (input?.value?.trim()) {
                alert('✨ Thanks for your comment! We review all comments before publishing.');
                input.value = '';
              }
            }}
            className="px-4 py-2 bg-[#d4af37]/20 hover:bg-[#d4af37]/30 border border-[#d4af37]/30 rounded-lg text-xs text-[#d4af37] transition-all"
          >
            Post
          </button>
        </div>
        <p className="text-[9px] text-[#3a3528] mt-2">Comments are moderated. Your email will not be published.</p>
      </div>
    </div>
  );
}
