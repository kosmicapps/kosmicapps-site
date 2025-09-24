# Kosmic Apps Website

A modern, fast, and accessible marketing website for Kosmic Apps - an indie iOS studio.

## Features

- ⚡ Next.js 14 with App Router
- 🎨 Tailwind CSS with custom brand tokens
- 📱 Fully responsive design
- ♿ WCAG AA accessible
- 🚀 Optimized for performance
- 📊 Analytics ready
- 🔍 SEO optimized with sitemap and robots.txt

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.local.example .env.local
```

3. Update environment variables in `.env.local`:
```
NEXT_PUBLIC_SITE_URL=https://kosmicapps.com
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Pages

- `/` - Home page with hero, features, and featured apps
- `/apps` - Apps index with filtering
- `/apps/[slug]` - Individual app detail pages
- `/about` - About page with company info
- `/story` - Origin story and vision
- `/press` - Press kit and contact form
- `/legal` - Privacy policy and terms

## Components

- `SiteNav` - Responsive navigation with mobile menu
- `Footer` - Site footer with links
- `Section` - Consistent section wrapper
- `PrimaryCTA` - Gradient call-to-action button
- `AppCard` - App showcase card
- `FilterChips` - Category filtering
- `AppJsonLd` - Structured data for apps

## Data

App data is stored in `src/data/apps.ts` with the following structure:
- Basic info (name, slug, hook, model)
- Category and pricing type
- Features (core, support, delight)
- Screenshots and FAQ
- App Store URL

## Analytics

Analytics events are tracked in `src/lib/analytics.ts`:
- `view_home` - Home page view
- `click_cta_home` - CTA button clicks
- `view_apps_index` - Apps page view
- `filter_category` - Category filtering
- `click_app_download` - App download clicks
- `view_app_detail` - App detail page view
- `submit_press_form` - Contact form submission

## Deployment

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

Or deploy to Vercel, Netlify, or your preferred platform.

## Performance

The site is optimized for:
- Fast loading with image optimization
- Minimal JavaScript bundle
- Efficient CSS with Tailwind
- Proper caching headers
- Compressed assets

## Accessibility

- WCAG AA compliant
- Keyboard navigation
- Screen reader friendly
- High contrast ratios
- Skip links
- Semantic HTML

## SEO

- Dynamic sitemap generation
- Robots.txt
- Open Graph and Twitter cards
- JSON-LD structured data
- Meta tags for all pages