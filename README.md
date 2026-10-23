# VARAKH — Indian sweets landing page

Portfolio project: an animated D2C landing page for an original sweets brand, with a one-click **English / ગુજરાતી** toggle.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lenis

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export in /out
```

## Deploy (GitHub → Vercel)
```bash
# 1. In the project folder
git init
git add .
git commit -m "VARAKH landing page"
git branch -M main

# 2. Create an empty repo named "varakh" on github.com (no README), then:
git remote add origin https://github.com/hardik-ajmeriya/varakh.git
git push -u origin main
```
3. On vercel.com → **Add New → Project** → import `varakh` → **Deploy** (Next.js is detected automatically).
4. After the first deploy: **Settings → Environment Variables** → add `NEXT_PUBLIC_SITE_URL` = your live URL (e.g. `https://varakh.vercel.app`) → **Redeploy**. This makes the social preview image and sitemap use the right address.
5. Check the preview by pasting your URL into https://www.opengraph.xyz.

## Reuse for another client
| What | Where |
|------|-------|
| Products, prices, colours, floating ingredients | `src/data/products.ts` (single source of truth) |
| UI text (EN / GU) | `src/i18n/messages/en.json`, `gu.json` (same keys; TypeScript checks them) |
| Images | `public/images/...` (transparent WebP; hero products also need a `-600.webp` copy for phones) |
| Reviews | `src/data/reviews.ts` (samples: replace with real reviews) |
| Gift box | `src/data/giftBox.ts` (price + compartment positions) |
| Fonts | `src/fonts` (self-hosted, OFL) |

## Audit (Lighthouse, mobile, slow 4G, local build)
| Performance | Accessibility | Best practices | SEO |
|---|---|---|---|
| 87 | 100 | 100 | 100 |

## Quality notes
- Animations use only `transform` and `opacity`; background colour change = cross-fading layers.
- `prefers-reduced-motion`: floating/bobbing loops, parallax and Lenis switch off.
- Keyboard: ← / → switch sweets, all controls are real buttons with labels.
- `npm run build:demo` makes a folder-portable export (used for the shareable preview).
