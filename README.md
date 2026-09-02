# OpenGate Advisory Original Refresh

Static OpenGate Advisory website with a shared navigation/footer system and clean Vercel routes for Technology, Real Estate, and Web Design.

## Published routes

- `/` — OpenGate Advisory landing page
- `/technology` — Morbit technology portfolio
- `/real-estate` — Bellevue Residencies portfolio
- `/web-design` — Web design, content creation, and selected live work

All pages use `site.css` and `site.js`, so the header, portfolio dropdown, mobile menu, and footer remain identical throughout the site. `vercel.json` enables clean URLs without `.html` in the published address.

## What changed

- Kept the landing page focused on OpenGate services, team, and CTA.
- Moved portfolio content off the landing page into a dropdown menu with two dedicated pages:
  - `technology.html` for Morbit Software Ltd.
  - `real-estate.html` for Bellevue Residencies.
- Replaced the hero with a brighter, more natural business image.
- Added the real Morbit SVG logo.
- Added a more detailed Sri Lanka sales map with roads, mountains, terrain shading, and key location labels.
- Kept the provided Dorian and Georges profile pictures.
- Replaced the top-left logo image with a compact inline SVG logo based on the provided logo direction.
- Improved responsive behavior for mobile and tablet without rebuilding the site as mobile-first.
- Copied local image assets beside `index.html` and updated image paths to root-level filenames for GitHub/Vercel deployment.

## Deploy

Push this folder to GitHub, then import it into Vercel as a static site:

- Framework preset: `Other`
- Build command: empty
- Output directory: empty

The HTML files reference root-level image files for Vercel/GitHub reliability: `hero-bright.jpg`, `morbit-office.jpg`, `bellevue-site.jpg`, `business-meeting.jpg`, `hand-shake.jpg`, `strategy-whiteboard.jpg`, `Georges.jpeg`, `Dorian.jpeg`, and `morbit-logo.svg`. Backup copies of new partner visuals are also stored in `images/`.
