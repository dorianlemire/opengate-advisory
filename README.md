# OpenGate Advisory

A static website for international market-entry and commercial growth advisory.

The current design uses a light theme by default, an optional persistent dark theme, Cabinet Grotesk typography, concise content and blank spaces reserved for approved real photography.

## Workspace

/Users/dorianlemire/Projects/OpenGate-Advisory

Read CLAUDE.md for business and project context. Website work belongs here.

## Preview and verify

- npm run preview — starts http://127.0.0.1:8091 with clean URLs.
- npm run check — checks JavaScript syntax.
- npm run verify — browser checks; run while the preview server is active. Requires Google Chrome.
- npm run sync-layout — copies the shared header/footer from partials/ into every public page.

## Website files

- design.css — typography, layout, responsive rules and both themes.
- theme-init.js — applies the saved theme before first paint.
- interface.js — menus, theme switch, product tabs, property comparison, FAQ support, map loading, mobile CTA and analytics.
- assets/fonts/ — self-hosted Cabinet Grotesk.
- assets/vendor/ — local GSAP and ScrollTrigger.
- partials/ — shared header and footer source.
- Public HTML files retain their metadata and canonical clean routes.
- docs/LIGHT_REDESIGN.md — full design and image-placement notes.

The previous site.css and site.js are retained for reference but no longer loaded or deployed. The complete previous website sources are backed up in ARCHIVE/pre-light-redesign-2026-10-08/.

## Routes

/, /about, /market-entry-consulting, /fractional-sales-leadership, /channel-partner-development, /technology-commercialisation, /technology, /real-estate, /web-design, /privacy-policy, /thank-you, and the custom 404 page.

All public pages have identical pre-rendered navigation and footers; core content does not depend on JavaScript rendering. Private Discuss remains archived and excluded.

## Images

New photography placements are blank and identified in the HTML by data-image-slot. Insert approved real photographs when ready. Morbit's actual dashboard and brand logo remain visible. All prior media is preserved.

The Bellevue comparison control currently has blank image layers and remains ready for matched site photography and an approved architectural visualisation. Website projects still link to all four live concepts, including Nocturne Restaurant and Trim Street Dubai.

## Deployment

Vercel framework preset: Other. No build command. No output directory. Clean URLs are configured in vercel.json.

Upload the public HTML and assets together, including design.css, interface.js, theme-init.js and the assets/ directory. Preserve .vercelignore, which excludes archives, source material, documentation, scripts, tests and the superseded styling/behavior files.

Vercel Analytics wiring is preserved. GA4 still requires the owner's measurement ID in interface.js. This redesign has not been deployed.
