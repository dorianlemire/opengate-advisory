# Website portfolio previews

The four selected projects at `/web-design#work` have real homepage captures instead of blank image slots. Captured and checked on 10 October 2026:

| Project | Live website | Local image |
| --- | --- | --- |
| Nocturne Restaurant | https://restaurant-nocturne-mock.vercel.app/ | `public/assets/work/nocturne-restaurant.jpg` |
| Nail Saloon (Blush Atelier) | https://nail-saloon-ten.vercel.app/ | `public/assets/work/nail-saloon.jpg` |
| District Barbers | https://district-barbers.vercel.app/ | `public/assets/work/district-barbers.jpg` |
| Trim Street Dubai | https://barber-v2-kappa.vercel.app/ | `public/assets/work/trim-street-dubai.jpg` |

These are live concept websites, not claims of paid client engagements. Each full card links to the corresponding public site in a new tab. Responsive WebP derivatives at 400, 800 and 1200 pixels reduce download size; JPEG originals remain the capture sources. No third-party site is embedded, and no visitor data or authenticated session is included in the captures.

## Design preservation

Reading this as a targeted portfolio update for prospective clients within the existing restrained editorial design. Preserve Cabinet typography, warm off-white/ink-blue tokens, muted accents, rounded image frames, two-column desktop layout and one-column mobile layout. No page hierarchy, navigation or SEO changes.

Design dials for this scoped update: `DESIGN_VARIANCE: 5`, `MOTION_INTENSITY: 3`, `VISUAL_DENSITY: 3`. Existing entrances remain; arrow movement and an underlined link provide hover/focus feedback. Do not scale screenshots on hover, so their edges and headers stay visible. Images reserve a 1200-by-750 ratio; the first portfolio preview loads eagerly and other previews load lazily. Existing site-wide reduced-motion handling remains in place.

## Refresh

Run `node scripts/capture-portfolio.mjs` from the repository root. It uses a fresh, unauthenticated browser context for each public URL, writes JPEG screenshots under `public/assets/work/`, and generates responsive WebP versions with `scripts/optimize-portfolio.mjs`. Visually review all four images before committing; never substitute an error page, login page or cookie dialog for a project preview.

Run `npm run check` and, with the preview server running, `npm run verify`. The latter checks all four image decodes, project destinations, new-tab behavior and keyboard access, plus portfolio captures on mobile and desktop in both themes.
