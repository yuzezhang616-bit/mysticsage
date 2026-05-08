# MysticSage ✦

Discover your destiny through ancient Chinese Bazi (八字) wisdom.

A **fully static** fortune telling web app that calculates your Four Pillars of Destiny
entirely in the browser — **zero backend, zero API calls, zero cost**.

## Features

- 🔮 **Bazi Calculator** — Compute four pillars (year/month/day/hour) from birth date
- ⚖️ **Elemental Analysis** — Wood, Fire, Earth, Metal, Water balance visualization
- 📖 **Fortune Reading** — Detailed personality, career, wealth & relationship insights
- 🌐 **Bilingual** — English & Chinese, one-click switch
- 🍀 **Lucky Info** — Lucky colors, numbers, directions & seasons
- 🚫 **No Backend** — Everything runs in your browser

## Deploy

### GitHub Pages (Recommended)

1. Fork this repo
2. Go to **Settings → Pages → Source → GitHub Actions**
3. Push to `main` branch, auto-deploys

### Or anywhere static

```bash
npm run build
# Deploy the `out/` folder to any static host
```

## Tech Stack

- Next.js 16 (Static Export)
- TypeScript
- Tailwind CSS
- Bazi calculation engine (pure TS, no deps)
