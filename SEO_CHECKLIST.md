# SEO Checklist - A Carrier to Career

## Technical SEO
- [x] Dynamic `sitemap.xml` with all locales and routes
- [x] `robots.txt` blocking /studio and /api/
- [x] Hreflang tags for EN and HI via metadata alternates
- [x] Canonical URLs set per page
- [x] Security headers (HSTS, X-Frame-Options, etc.)
- [x] Mobile-responsive design (360px first)
- [x] Fast load times (static generation + ISR)

## On-Page SEO
- [x] Unique `<title>` and `<meta description>` per page via `generateMetadata`
- [x] Target keywords used naturally in content
- [x] Semantic HTML structure (h1, h2, h3 hierarchy)
- [x] Alt text on all images (via next/image)
- [x] Internal linking between pages

## Structured Data (JSON-LD)
- [x] EducationalOrganization schema
- [x] LocalBusiness schema with address and hours
- [x] FAQPage schema
- [x] Person schema (Prakriti Keshri)

## Performance
- [x] Next.js Image optimization (WebP/AVIF)
- [x] Font optimization via next/font with display: swap
- [x] Preconnect to cdn.sanity.io
- [x] Lazy-loaded YouTube embeds (lite pattern)
- [x] CSS scroll-snap for galleries (zero JS)
- [x] Server Components everywhere (minimal client JS)
- [x] Static generation with ISR (revalidate: 60)

## Open Graph & Social
- [x] Open Graph meta tags (title, description, type, locale)
- [x] og:type set to "website"
- [x] Locale-aware OG tags (hi_IN, en_US)

## Target Keywords
### English
- "spoken English classes Ambikapur"
- "online English coaching Chhattisgarh"
- "best English speaking course Chhattisgarh"
- "English classes for Hindi medium students"

### Hindi
- "अंबिकापुर में स्पोकन इंग्लिश"
- "छत्तीसगढ़ ऑनलाइन इंग्लिश क्लास"
- "अंग्रेज़ी सीखें ऑनलाइन"

## Post-Launch
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Add Google Search Console verification meta tag
- [ ] Monitor Core Web Vitals in Search Console
- [ ] Set up Vercel Analytics for traffic insights
