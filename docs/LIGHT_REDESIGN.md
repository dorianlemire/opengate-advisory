# OpenGate — light-first redesign

Implemented 8 October 2026 in the standalone OpenGate project.

Historical design record. The October 9 cleanup moved published files into `public/`, styles/scripts into `public/assets/css/` and `public/assets/js/`, and archives/source material to the external reference folder. See `README.md` and `REPOSITORY_CLEANUP.md` for current paths and publishing instructions. Private Discuss is now restored, and the live website has 13 routes.

## Direction

Warm off-white, ink blue, muted blue and restrained gold. Cabinet Grotesk is served locally. Compact navigation, short writing and brief motion focus attention on the business.

The gpt-taste skill informed typography, grids, button contrast and motion. The user's request for minimalism takes precedence over the skill's heavy scroll effects, randomized imagery, marquees and animated layouts.

All 12 public pages share one visual system. Initial visits use light mode. The toggle persists under opengate-theme, applies before the stylesheet paints, works across routes and reloads, and synchronizes across tabs.

## Maintenance

Shared layout is pre-rendered in every public HTML page. Edit partials/header.html or partials/footer.html, then run npm run sync-layout. Active styling and behavior are in public/assets/css/ and public/assets/js/. Superseded site.css/site.js are preserved in the external reference folder.

The existing SEO metadata, canonical URLs, sitemap and robots file are preserved. Home and Morbit FAQ schema have been updated to match the visible answers.

## Real image placement

Remaining blank areas have data-image-slot attributes, with no public placeholder instructions. Owner-supplied Georges event photographs fill the Home hero, Home story and About gallery. Georges and Dorian now use saved profile portraits in the team section; those are no longer empty slots. Morbit's former meeting/operations placeholders were replaced with interactive illustrations. Sources are documented in PRIVATE_DISCUSS_SOURCES.md and REPOSITORY_CLEANUP.md. The actual Morbit dashboard is displayed uncropped; brand marks remain.

Insert an approved image into its slot. Remove aria-hidden from the wrapper when the image is meaningful and provide descriptive alt text. Supply image dimensions, decoding=async and loading=lazy except for above-the-fold imagery. Prefer compressed responsive AVIF/WebP. Fixed aspect ratios prevent layout shifts.

| Page | Slot | Intended real image |
| --- | --- | --- |
| Home | charles-portrait | Approved Charles portrait |
| Market entry | market-entry-consulting-hero | Regional business context |
| Sales leadership | fractional-sales-leadership-hero | Real team discussion |
| Channels | channel-partner-development-hero | Partner working session |
| Technology growth | technology-commercialisation-hero | Product/enterprise context |
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

No push or deployment was performed. Vercel uses static clean URLs with no build step and `public/` as its output directory. Commit the complete repository change, including moved-file deletions and root config, not just a selection of HTML pages. See README.md.

Preserve .vercelignore. Internal documentation, tests, scripts, archives, source media and old CSS/JS are excluded.

Vercel analytics wiring is preserved. GA4 still requires a real measurement ID; none was invented. The current Private Discuss page is live in the local preview; its historical version remains safely archived.

The exact pre-redesign sources are in the external reference folder's ARCHIVE/pre-light-redesign-2026-10-08/. That backup contains original HTML, CSS/JS, package files and documentation. Unused original media is preserved alongside it.
