# OpenGate — light-first redesign

Implemented 8 October 2026 in the standalone OpenGate project.

## Direction

Warm off-white, ink blue, muted blue and restrained gold. Cabinet Grotesk is served locally. Compact navigation, short writing and brief motion focus attention on the business.

The gpt-taste skill informed typography, grids, button contrast and motion. The user's request for minimalism takes precedence over the skill's heavy scroll effects, randomized imagery, marquees and animated layouts.

All 12 public pages share one visual system. Initial visits use light mode. The toggle persists under opengate-theme, applies before the stylesheet paints, works across routes and reloads, and synchronizes across tabs.

## Maintenance

Shared layout is pre-rendered in every HTML page. Edit partials/header.html or partials/footer.html, then run npm run sync-layout. Active styling and behavior are design.css, interface.js and theme-init.js. Superseded site.css/site.js remain locally and are excluded from deployment.

The existing SEO metadata, canonical URLs, sitemap and robots file are preserved. Home and Morbit FAQ schema have been updated to match the visible answers.

## Real image placement

Blank areas have data-image-slot attributes, with no public placeholder instructions. Source images are preserved locally. The actual Morbit dashboard is displayed uncropped; brand marks remain.

Insert an approved image into its slot. Remove aria-hidden from the wrapper when the image is meaningful and provide descriptive alt text. Supply image dimensions, decoding=async and loading=lazy except for above-the-fold imagery. Prefer compressed responsive AVIF/WebP. Fixed aspect ratios prevent layout shifts.

| Page | Slot | Intended real image |
| --- | --- | --- |
| Home | home-hero | Wide understated business/environment photograph |
| Home | home-working-together | Candid working session |
| Home | georges-portrait | Approved Georges portrait |
| Home | dorian-portrait | Approved Dorian portrait |
| Home | charles-portrait | Approved Charles portrait |
| About | about-people | Wide authentic team/working photograph |
| Market entry | market-entry-consulting-hero | Regional business context |
| Sales leadership | fractional-sales-leadership-hero | Real team discussion |
| Channels | channel-partner-development-hero | Partner working session |
| Technology growth | technology-commercialisation-hero | Product/enterprise context |
| Morbit | morbit-meeting-room | Approved meeting-room image |
| Morbit | morbit-operations | Operations/support team |
| Bellevue | bellevue-hero | Approved property/location image |
| Bellevue | bellevue-land | Verified site photograph |
| Bellevue | bellevue-vision | Approved render aligned with the site image |
| Web design | work-nocturne | Nocturne site screenshot |
| Web design | work-nail-saloon | Nail Saloon site screenshot |
| Web design | work-district | District Barbers site screenshot |
| Web design | work-trim-street | Trim Street Dubai site screenshot |

The Bellevue slider remains functional with blank surfaces. Insert the matched images before treating it as a visual demonstration of the development. Identify renders as architectural visualisations in captions and alt text.

## Validation

Run npm run preview, then visit http://127.0.0.1:8091.
Run npm run check and npm run verify in another terminal.

Browser checks cover both themes, all 12 routes at 360/768/1440/1920 widths, additional homepage widths, theme persistence, menus, keyboard input, tabs, comparison controls, map loading, FAQ, mobile CTA, schema parsing, internal resources and HTTP 404 behavior.

## Publishing and recovery

No push or deployment was performed. Vercel still uses static clean URLs with no build step. Include all public HTML, design.css, interface.js, theme-init.js, assets/, the existing public product/logo/social-share files, robots.txt, sitemap.xml and vercel.json.

Preserve .vercelignore. Internal documentation, tests, scripts, archives, source media and old CSS/JS are excluded.

Vercel analytics wiring is preserved. GA4 still requires a real measurement ID; none was invented. Private Discuss remains archived.

The exact pre-redesign sources are in ARCHIVE/pre-light-redesign-2026-10-08/. That backup contains the original public HTML, CSS/JS, package files and documentation. All former image assets are still present.
