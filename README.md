# OpenGate Advisory Original Refresh

This is a quick rebuild based on the original `indexOpenGateE.html`.

## What changed

- Kept the original structure, font, GSAP animations, hover effects, marquee, services, team, portfolio, CTA, and EMEA map.
- Replaced the stock/fallback image set with new lighter, realistic AI-generated business imagery.
- Kept the provided Dorian and Georges profile pictures.
- Replaced the top-left logo image with a compact inline SVG logo based on the provided logo direction.
- Improved responsive behavior for mobile and tablet without rebuilding the site as mobile-first.
- Copied local image assets beside `index.html` and updated image paths to root-level filenames for GitHub/Vercel deployment.

## Deploy

Push this folder to GitHub, then import it into Vercel as a static site:

- Framework preset: `Other`
- Build command: empty
- Output directory: empty

`index.html` references root-level image files such as `dubai-skyline.jpg`, `business-meeting.jpg`, `Georges.jpeg`, and `Dorian.jpeg`. The old `images/` folder can be ignored.
