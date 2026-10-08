# OpenGate Advisory Website Handoff — Legacy Reference

Use this file to start a new Codex conversation about the OpenGate Advisory website.

## Project Location

Local folder:

```text
/Users/dorianlemire/Projects/OpenGate-Advisory
```

Main website files:

```text
index.html
technology.html
real-estate.html
README.md
```

The site is pure static HTML/CSS/JavaScript. No React, no build step, no package manager.

## Current Website Purpose

OpenGate Advisory is a Dubai-based advisory website focused on:

- Senior sales leadership
- Business development
- Market entry
- Fractional CRO support
- Channel and partnership development
- Revenue scaling
- Revenue-focused website design and lead generation

The current value proposition is aimed at international companies targeting:

```text
South EMEA and SEA
```

The website should feel premium, dark, modern, B2B, executive, and internationally credible. Keep the dark navy, electric blue, and gold OpenGate identity.

## Current Structure

### Landing Page

File:

```text
index.html
```

The landing page currently includes:

- Fixed top navigation
- Larger top-left OpenGate inline SVG logo
- Hero section with brighter, less AI-like business image
- Hero text:
  - `Dubai · South EMEA · SEA`
  - `Scale. Expand. Win.`
- CTA:
  - `Book a Discovery Call`
  - `Explore Services`
- Marquee with sales, market-entry, South EMEA, SEA, channel, and GTM terms
- Image strip using root-level assets:
  - `business-meeting.jpg`
  - `hand-shake.jpg`
  - `strategy-whiteboard.jpg`
- Services accordion
- Stats strip
- Team section:
  - Georges Lemire
  - Dorian Lemire
- CTA/contact section
- Footer

Important: Portfolio content is no longer visible as a landing-page section.

### Navigation

Current top menu:

```text
Services
Team
Portfolio dropdown
Contact
Book a Call
```

The Portfolio dropdown links to:

```text
Technology -> technology.html
Real Estate -> real-estate.html
```

There should not be a visible `Portfolio` or `Partners` section on the landing page.

### Technology Portfolio Page

File:

```text
technology.html
```

Purpose:

Introduce Morbit Software Ltd. as the technology portfolio/partner section.

Key content:

- Real Morbit SVG logo:
  - `morbit-logo.svg`
- Hero headline:
  - `Smart building intelligence for international growth.`
- Positioning:
  - Morbit brings IT, AV, IoT, and smart-building operations into one cloud view.
  - OpenGate helps translate the technical value into enterprise conversations across South EMEA and SEA.
- CTAs:
  - `Visit Morbit`
  - `Discuss Expansion`
- Visual asset:
  - `morbit-office.jpg`
- Cards:
  - Unified estate monitoring
  - Smarter room experiences
  - Partner-ready expansion
- Tags:
  - Landlords
  - Enterprise IT
  - Systems Integrators
  - Smart Infrastructure

Morbit source used:

```text
https://www.morbit.co.uk/
```

Morbit logo asset source used:

```text
https://morbit-temp.s3.eu-west-1.amazonaws.com/morbit-nowhitespace.svg
```

### Real Estate Portfolio Page

File:

```text
real-estate.html
```

Purpose:

Introduce Bellevue Residencies as the real estate portfolio/partner section.

Key content:

- Project:
  - Bellevue Residencies
- Region:
  - Ja-Ela / Tudella, Sri Lanka
- Planned handover:
  - Q2 2028
- Sales positioning:
  - Western Province access
  - Colombo-airport corridor
  - Appeal for diaspora buyers, investors, families, and frequent travelers
  - Greener surroundings than central Colombo
  - Access to Colombo, airport, Negombo, and everyday services
- Visual asset:
  - `bellevue-site.jpg`

Real Estate page includes a custom illustrative Sri Lanka map with:

- More realistic island shape
- Terrain shading
- Roads
- Secondary roads
- Mountains / central highlands
- Lagoon/water detail
- Location labels:
  - Bellevue · Ja-Ela
  - Colombo
  - Airport
  - Negombo
  - Kandy
  - Galle

Map note currently says it is an illustrative sales map and should be replaced with official geodata when collateral is approved.

Bellevue/NCD source used:

```text
https://ncd.lk/portfolio/bellevue-residencies/
```

## Current Asset Policy

The user had Vercel/GitHub image-path issues in the past. Keep important referenced assets at the project root, beside the HTML files.

Do not rely only on `images/asset-name.jpg` paths for the live HTML.

Root-level assets currently used:

```text
hero-bright.jpg
business-meeting.jpg
hand-shake.jpg
strategy-whiteboard.jpg
Georges.jpeg
Dorian.jpeg
morbit-logo.svg
morbit-office.jpg
bellevue-site.jpg
favicon.png
favicon-32.png
apple-touch-icon.png
original-dark-logo.png
```

The `images/` folder contains backup copies for some assets. The live pages use root-level paths.

## GitHub Repo Cleanup Guidance

GitHub repo:

```text
dorianlemire/opengate-advisory
```

Online Vercel site referenced by user:

```text
opengate-advisory.vercel.app
```

Final useful root files for the GitHub repo should be:

```text
images/
Dorian.jpeg
Georges.jpeg
README.md
apple-touch-icon.png
bellevue-site.jpg
business-meeting.jpg
favicon-32.png
favicon.png
hand-shake.jpg
hero-bright.jpg
index.html
morbit-logo.svg
morbit-office.jpg
original-dark-logo.png
real-estate.html
strategy-whiteboard.jpg
technology.html
```

Old files that can be deleted from GitHub if present:

```text
bellevue-residencies.png
dubai-skyline.jpg
logo-light.png
logo.png
mobile-preview.html
morbit-tech.png
```

Note: `dubai-skyline.jpg` and `mobile-preview.html` may still exist locally, but they are not needed for the current live site.

## Deployment Notes

This is a static site. For Vercel:

```text
Framework preset: Other
Build command: empty
Output directory: empty
```

If pushing from a local Git repo, only commit the modified/needed files:

```bash
git add index.html technology.html real-estate.html README.md hero-bright.jpg morbit-office.jpg morbit-logo.svg bellevue-site.jpg
git commit -m "Update OpenGate portfolio pages"
git push
```

If the repo exists only online:

1. Open GitHub repo.
2. Delete obsolete files listed above.
3. Upload/replace the useful root files.
4. Commit changes.
5. Vercel should redeploy automatically.

## Local Preview

From the project folder:

```bash
cd /Users/dorianlemire/Projects/OpenGate-Advisory
python3 -m http.server 8091
```

Open:

```text
http://127.0.0.1:8091/index.html
http://127.0.0.1:8091/technology.html
http://127.0.0.1:8091/real-estate.html
```

## Last Verification Performed

A local browser verification pass was performed on:

```text
index.html
technology.html
real-estate.html
```

Checks passed:

- No JavaScript console errors
- All referenced images loaded
- No desktop horizontal overflow
- No mobile horizontal overflow at 390px width
- Nav CTA button background displayed correctly
- Real Estate map labels remained inside the mobile viewport

## User Preferences Learned

- Keep websites static and simple to deploy.
- For Vercel/GitHub reliability, use root-level image paths.
- Avoid leaving unnecessary old assets in the repo.
- For OpenGate, keep the look premium, executive, and not too generic.
- Do not put portfolio partner content visibly on the landing page.
- Portfolio should be accessed through a dropdown menu.
- Technology and Real Estate should feel distinct from each other.
- Images should look realistic and less obviously AI-generated.
- Use real logos where possible.
- Sri Lanka map should be more realistic, with roads, terrain, and mountains.

## Future Improvement Ideas To Validate

- Add a “Partner Opportunities” page with two CTAs:
  - `Sell Morbit in my region`
  - `Request Bellevue investor pack`
- Add a Bellevue downloadable PDF once official renders, unit plans, prices, and legal details are ready.
- Add a Morbit mini case study when a measurable result is available.
- Replace the illustrative Sri Lanka map with official geodata or a designed map image once approved.
- Replace Bellevue placeholder/project imagery with final real renders when available.
- Consider adding a small `case-studies.html` page later instead of expanding the home page.
