# Dimensional website refinement — 9 October 2026

Folder cleanup note: the current implementation lives in `public/`, with CSS/JS in `public/assets/css/` and `public/assets/js/`, and Morbit media in `public/assets/morbit/`. The partial remains in `partials/`. See `README.md` and `REPOSITORY_CLEANUP.md` for current paths. This document records the earlier design refinement.

## Direction

The owner requested slightly more interaction, motion, graphics and shapes, inspired by Apple's product presentation. This is a refinement of OpenGate's light-first system, not a framework migration or new identity. Cabinet Grotesk, the real logos, owner-supplied photography, alphabetical navigation, dark theme, routes and calls to action are preserved.

The redesign skill guided an audit-first approach: retain the working structure, then add purposeful depth and interaction. Official visual reference: https://www.apple.com/macbook-pro/ (product-scale presentation, generous hierarchy and closer-look interactions). No Apple imagery, typefaces or logos are copied.

## Implementation

- `motion.css`: translucent header, quiet reading progress, tactile buttons, rounded photography and softly shaded gate-shaped forms. The shared colour tokens support both themes.
- `motion.js`: once-only editorial entrances, low-amplitude pointer response on the homepage, and a small amount of scroll-linked perspective on the main event photograph and Morbit product stage. Native scrolling is preserved.
- `morbit.css` / `morbit.js`: an estate connection diagram, isometric meeting-space illustration, layered reporting graphic and sensor object. Controls update visible explanations and ARIA pressed states; arrow keys cycle the illustrated controls.
- `partials/morbit-main.html`: source for the new product page. `npm run sync-layout` copies this into `/technology` and maintains shared assets across all 13 routes.
- Existing `showcase.js` handles product shortcuts, image enlargement and panel transitions.

No new runtime dependency, animation video, image generation, external embeds or product-account API connections were introduced. Morbit's scroll perspective uses a native passive RAF loop, so that route no longer downloads GSAP/ScrollTrigger. Existing GSAP entrances on other pages are preserved. The main dashboard image remains the previously supplied public-site asset, `morbit-studio-dashboard-full.jpg`, displayed without cropping and expandable in a dialog. Smaller 800px/1400px JPEG copies are used through `srcset`; the original is untouched and opens on demand. It is not a new screenshot from the authenticated session.

## Product evidence and privacy

At the user's invitation, Morbit Studio was inspected read-only. Generic feature categories observed: connected device health/status, communication platforms, smart-building room calendars and door panels, wallboards/floor trackers, meeting usage and no-show reporting, environmental and occupancy sensors, and executive reporting. The standard dashboard was restored after inspection; no customer/account setting was changed.

The public Morbit site, https://www.morbit.co.uk/, corroborates unified IT/AV/IoT visibility, smart-space management, occupancy/environment context and reporting. Website copy is independently written; it avoids unverified performance percentages, deployment promises or universal compatibility claims.

No authenticated screenshots, customer identities, device names, locations, live metrics or credentials were exported into project assets or source. Graphics use generic categories and no numerical operational claims. Reporting bars are labelled illustrative; the floor plan is explicitly not a customer layout. Availability depends on deployment and connected sensors.

## Accessibility and resilience

- Light remains the default; dark-mode choice persists.
- Reduced-motion mode disables entrance animation, pointer movement and scroll transforms, including when the preference changes during a session.
- Hover enhancement is not required to access any feature. Buttons, tabs, keyboard arrows and dialogs provide the same content.
- Editorial content is visible before JavaScript enhancement. No animation should permanently hide copy.
- Controls and content are responsive, with a stacked explorer on smaller screens.
- Source notes, scripts, partials and test screenshots remain excluded from deployment.

## Validation

Run `npm run check`, `npm run sync-layout` and `npm run verify` with the local preview on port 8091. The verifier covers all 13 routes in two themes at four widths, local assets, unique titles, navigation, product tabs, room/system/sensor controls, zoom/focus restoration, reduced-motion changes and existing real-estate/map/FAQ behavior.

Local reports and visual captures are saved under excluded `test-results/`. Review `report.json` for the latest outcomes and `lighthouse-morbit-motion.json` for the local mobile lab audit. No GitHub push or production deployment is part of this refinement.

Completed checks: 104 layouts passed, 13 unique titles, 39 local URLs verified, zero page errors and zero layout/link failures. JavaScript syntax and sitemap XML validation passed. Mobile Lighthouse on the local Morbit page: performance 94, accessibility 100, best practices 100, SEO 100 (LCP 2.6s). These are lab results, not production field metrics or a search-ranking guarantee. Desktop/mobile light/dark visuals were also inspected in the browser.
