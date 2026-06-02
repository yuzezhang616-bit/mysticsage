'use client';

export default function NavBar() {
  return (
    <nav className="border-b border-white/[0.04] bg-black/30 backdrop-blur-2xl sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center">
        <a href="/" className="shrink-0">
          <span className="text-lg gold-text font-bold tracking-wide">✦ MysticSage</span>
        </a>
        <div className="flex-1 flex items-center justify-center">
          <div className="hidden md:flex items-center gap-2">
            {[
              ['/','Bazi'],['/love','Love Match'],['/naming','Naming'],
              ['/iching','I Ching'],['/fengshui','Feng Shui'],
              ['/face','Face Reading'],['/dream','Dream'],['/knowledge','Learn'],
            ].map(([href, label]) => (
              <a key={href as string} href={href as string}
                className="nav-link px-3 py-1.5 rounded-lg text-xs text-[#9b8e7a] hover:text-[#e8dcc8] hover:bg-white/5 transition-all">{label as string}</a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
