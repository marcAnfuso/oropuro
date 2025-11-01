# Zeus Casino Landing Page

Modern, high-performance landing page for Zeus Casino with a unique design combining sidebar features and hero section.

## Design Overview

### Layout
- **Mobile**: Stacked layout - sidebar on top, hero below
- **Desktop**: Split layout - sidebar (35% left) + hero (65% right)

### Color Scheme
- **Primary**: Red (#dc2626)
- **Secondary**: Black (#000000)
- **Accent**: White (#ffffff)
- Red and black dominate, white as accent for text and highlights

### Features
- 4 feature boxes in left sidebar:
  - ⏰ Retiros las 24hs
  - ⚡ Pagos al Instante
  - 🎮 +5000 Juegos
  - 🎧 Soporte 365 días 24hs
- Hero section with Zeus character placeholder
- Animated red gradient backgrounds
- Glassmorphism effects with red theme
- Meta Pixel tracking ready
- Fully responsive

## Tech Stack

- **Next.js 15.5.6** with App Router and Turbopack
- **React 19.1.0**
- **Tailwind CSS 4**
- **Framer Motion 12** for animations
- **TypeScript**
- **Lucide React** for icons

## Getting Started

### Prerequisites
- Node.js 20+
- npm

### Installation

```bash
# Install dependencies (already done if copied from bet30)
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

### Build for Production

```bash
npm run build
```

Outputs to `/out` directory (static export for Cloudflare Pages).

## Adding the Zeus Character

The landing page has a placeholder for the Zeus character image. To add it:

1. **Generate the image**: See [ZEUS_CHARACTER_PROMPT.md](ZEUS_CHARACTER_PROMPT.md) for detailed AI prompts
2. **Optimize the image**: Compress to reasonable file size (< 500KB)
3. **Save as**: `/public/zeus-character.png` (or `.webp`)
4. **Update code**: Edit [app/page.tsx](app/page.tsx) line ~167 to use the image

See [ZEUS_CHARACTER_PROMPT.md](ZEUS_CHARACTER_PROMPT.md) for detailed instructions and code examples.

## Project Structure

```
zeus-landing/
├── app/
│   ├── components/
│   │   └── MetaPixel.tsx          # Meta Pixel tracking
│   ├── hooks/
│   │   └── useMetaTracking.ts     # Meta tracking hook
│   ├── api/
│   │   └── meta-conversion/       # Conversions API endpoint
│   ├── globals.css                # Global styles + Zeus theme
│   ├── layout.tsx                 # Root layout with metadata
│   └── page.tsx                   # Main landing page
├── public/                        # Static assets
├── ZEUS_CHARACTER_PROMPT.md       # AI prompts for Zeus character
├── next.config.ts                 # Next.js config (static export)
└── package.json
```

## Customization

### Colors
Edit [app/globals.css](app/globals.css):
```css
:root {
  --zeus-red: #dc2626;
  --zeus-red-dark: #991b1b;
}
```

### WhatsApp Number
Edit [app/page.tsx](app/page.tsx) - update phone number in:
- Line ~202: Main CTA button
- Line ~221: Secondary WhatsApp button

### Meta Pixel Configuration
1. Copy `.env.local.example` to `.env.local`
2. Add your Meta Pixel ID:
   ```
   NEXT_PUBLIC_META_PIXEL_ID=your_pixel_id_here
   META_CONVERSION_API_TOKEN=your_token_here
   ```
3. Restart dev server

## Deployment

### Cloudflare Pages (Recommended)

1. Push to GitHub
2. Connect repository to Cloudflare Pages
3. Build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Framework preset**: Next.js (Static HTML Export)
4. Add environment variables in Cloudflare dashboard

## Design Inspiration

Based on a combination of two Ganamos landing page designs:
- Sidebar with feature boxes (left side)
- Hero section with character (right side)
- Red/black color scheme (Zeus theme instead of original colors)
- Modern glassmorphism effects
- Premium casino aesthetic

## Key Differences from Bet30

- **Layout**: Sidebar + hero split (desktop) vs single-column
- **Colors**: Red/black/white vs pink/blue/purple gradients
- **Branding**: Zeus (Greek god) vs Bet30
- **Character**: Zeus god in gangster style vs video showcase
- **Feature Display**: 4 stacked feature boxes vs 2x2 grid cards

## Performance

- Optimized animations for mobile
- Framer Motion for smooth transitions
- Static site generation (no server required)
- Lazy loading ready
- Mobile-first responsive design

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Proprietary - All rights reserved

---

**Created**: October 2025
**Framework**: Next.js 15 + Tailwind CSS 4 + Framer Motion
