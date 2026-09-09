# OpenGate Advisory Original Refresh

Static OpenGate Advisory website with a shared navigation/footer system and clean Vercel routes for About, Technology, Real Estate, and Web Design.

## Published routes

- `/` — OpenGate Advisory landing page
- `/about` — OpenGate story, mission, regional experience, and approach
- `/technology` — Morbit technology portfolio
- `/real-estate` — Bellevue Residencies portfolio
- `/web-design` — Web design, content creation, and selected live work

All pages use `site.css` and `site.js`, so the header, portfolio dropdown, mobile menu, and footer remain identical throughout the site. `vercel.json` enables clean URLs without `.html` in the published address.

Vercel Web Analytics is loaded centrally through `site.js`, with `@vercel/analytics` recorded in `package.json`. Enable Web Analytics for the deployed project in the Vercel dashboard before publishing the next deployment.

## What changed

- Kept the landing page focused on OpenGate services, team, and CTA.
- Moved portfolio content off the landing page into a dropdown menu with three dedicated pages:
  - `technology.html` for Morbit Software Ltd.
  - `real-estate.html` for Bellevue Residencies.
  - `web-design.html` for web design and content work.
- Added `about.html` with the OpenGate story, market-entry philosophy, regional reach, and mission.
- Replaced the hero with a brighter, more natural business image.
- Added the real Morbit SVG logo.
- Added a live OpenStreetMap view of Ja-Ela with a direct Google Maps link.
- Added interactive Morbit metric cards, capability tabs, and a connected-device hotspot experience using public-facing collateral.
- Added Charles Boschetti to the team with the supplied portrait.
- Added the registered OpenGate Advisory company information to the shared footer.
- Kept the provided Dorian and Georges profile pictures.
- Replaced the top-left logo image with a compact inline SVG logo based on the provided logo direction.
- Improved responsive behavior for mobile and tablet without rebuilding the site as mobile-first.
- Copied local image assets beside `index.html` and updated image paths to root-level filenames for GitHub/Vercel deployment.

## Deploy

Push this folder to GitHub, then import it into Vercel as a static site:

- Framework preset: `Other`
- Build command: empty
- Output directory: empty

The HTML files reference root-level image files for Vercel/GitHub reliability. Upload the entire folder so the HTML, `site.css`, `site.js`, `vercel.json`, profile images, Morbit collateral, and real-estate reveal images remain together.
