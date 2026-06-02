export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] mt-16 bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div>
            <h4 className="text-xs font-semibold gold-text mb-3">Tools</h4>
            <ul className="space-y-1.5">
              <li><a href="/" className="text-[10px] text-[#6b5f4a] hover:text-[#d4af37] transition-colors">Bazi Reading</a></li>
              <li><a href="/love" className="text-[10px] text-[#6b5f4a] hover:text-[#d4af37] transition-colors">Love Match</a></li>
              <li><a href="/naming" className="text-[10px] text-[#6b5f4a] hover:text-[#d4af37] transition-colors">Name Generator</a></li>
              <li><a href="/iching" className="text-[10px] text-[#6b5f4a] hover:text-[#d4af37] transition-colors">I Ching</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold gold-text mb-3">Learn</h4>
            <ul className="space-y-1.5">
              <li><a href="/knowledge" className="text-[10px] text-[#6b5f4a] hover:text-[#d4af37] transition-colors">Knowledge Base</a></li>
              <li><a href="/knowledge/what-is-bazi" className="text-[10px] text-[#6b5f4a] hover:text-[#d4af37] transition-colors">What is Bazi</a></li>
              <li><a href="/knowledge/five-elements" className="text-[10px] text-[#6b5f4a] hover:text-[#d4af37] transition-colors">Five Elements</a></li>
              <li><a href="/knowledge/chinese-zodiac-complete" className="text-[10px] text-[#6b5f4a] hover:text-[#d4af37] transition-colors">Zodiac Guide</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold gold-text mb-3">More</h4>
            <ul className="space-y-1.5">
              <li><a href="/fengshui" className="text-[10px] text-[#6b5f4a] hover:text-[#d4af37] transition-colors">Feng Shui</a></li>
              <li><a href="/face" className="text-[10px] text-[#6b5f4a] hover:text-[#d4af37] transition-colors">Face Reading</a></li>
              <li><a href="/dream" className="text-[10px] text-[#6b5f4a] hover:text-[#d4af37] transition-colors">Dream Dictionary</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold gold-text mb-3">About</h4>
            <p className="text-[10px] text-[#4a4030] leading-relaxed">Free online Chinese astrology platform. All calculations run in your browser — nothing is uploaded to any server.</p>
          </div>
        </div>
        <div className="border-t border-white/[0.04] pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <p className="text-xs text-[#3a3528]">✦ MysticSage — Ancient wisdom for the modern soul</p>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-[#3a3528]">© {new Date().getFullYear()} MysticSage</span>
              <a href="/sitemap.xml" className="text-[10px] text-[#3a3528] hover:text-[#6b5f4a] transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
