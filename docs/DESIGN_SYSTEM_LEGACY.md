# Codex Instructions: OpenGate-Style Business Websites

Use these instructions when building websites in the style of OpenGate Advisory.

## Core Goal

Build premium, high-converting business websites that feel like the OpenGate Advisory site:

- Executive B2B aesthetic
- Clean dark or light-premium palette, not generic SaaS
- Strong hero with cinematic real-world imagery
- Smooth GSAP-style motion and hover interactions
- Clear conversion path to book a call or contact
- Fully responsive, especially polished on mobile
- Static, easy to deploy to GitHub and Vercel

The reference project is:

`/Users/dorianlemire/Projects/OpenGate-Advisory`

Use it as the style benchmark for structure, animation language, typography, spacing, and interaction quality.

## Technical Stack

Default to a pure static website:

- `index.html`
- Embedded CSS in `<style>`
- Embedded JavaScript in `<script>`
- Images in `images/`
- Optional `README.md`
- No React unless the user explicitly needs CMS, auth, dashboards, complex state, or many shared pages

Preferred external libraries:

```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400&display=swap" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js"></script>
```

Use `Plus Jakarta Sans` unless the user asks for a different brand font.

## Visual Direction

Use this palette as the default OpenGate-style base:

```css
:root {
  --navy: #0D1B2A;
  --navy2: #0a1520;
  --navy3: #071018;
  --gold: #C9A84C;
  --gold2: #e8c97a;
  --electric: #E8F4FF;
  --electric2: #B8D9F5;
  --electric3: #6EB3E8;
  --grey: #8899AA;
  --ease: cubic-bezier(0.4, 0, 0.2, 1);
}
```

The site does not need to be extremely dark. A lighter version is allowed and often better:

- Keep navy as the authority color.
- Use white, pale blue, and daylight images to open up the design.
- Keep gold for premium emphasis and CTA warmth.
- Avoid purple-heavy gradients, beige-only themes, and generic blue SaaS blandness.

## Logo Treatment

Use a compact top-left logo, not the oversized source image.

Preferred approach:

- Rebuild the logo as inline SVG or a tightly cropped asset.
- Keep the OpenGate arrow-box mark.
- Make it fit cleanly in a fixed nav at desktop and mobile widths.
- Header logo target size: around `142px` on mobile and `168px` on desktop.
- Preserve original logo files as references if provided.

Do not place a huge square logo image in the nav.

## Required Page Structure

Use this section order unless the user asks otherwise:

1. Fixed navigation
   - Compact logo left
   - 4 to 6 nav links
   - Primary CTA on right
   - Mobile hides text links and keeps CTA

2. Hero
   - Full viewport or near-full viewport
   - Cinematic business image background
   - Strong overlay gradient for readable text
   - Large headline with one italic or gold-emphasized word
   - Subheadline
   - Primary CTA plus secondary link
   - Optional particle/network canvas on desktop only

3. Marquee
   - Infinite scrolling keywords
   - Subtle edge fade
   - Low-opacity text with hover color shift

4. Image grid
   - Three premium real-world images
   - Hover zoom and brightness lift
   - Bottom-left labels
   - Stack cleanly on mobile

5. Services
   - Two-column section header on desktop
   - Service rows with icon, title, description, arrow
   - Hover reveals and row highlight on desktop
   - Descriptions visible by default on mobile

6. Stats
   - Three strong metrics
   - Large numbers
   - Gold and electric blue accents

7. Team
   - Preserve provided real team photos
   - Cards with photo, name, role, bio, highlights, LinkedIn
   - One column on mobile

8. Portfolio or Work
   - If no real work exists, keep a polished empty state
   - Do not overbuild fake case studies unless asked

9. EMEA coverage / map
   - Keep D3/TopoJSON map if the original site uses it
   - Must remain responsive
   - If a map is too heavy, use a lighter stylized fallback only with user approval

10. CTA
   - Large centered headline
   - Single clear action
   - Premium gradient or image-backed section

11. Footer
   - Logo
   - Links
   - Copyright/location

## Image Generation Rules

When creating new AI images:

- Generate realistic business/editorial imagery.
- Prefer bright, credible Dubai business scenes over dark sci-fi dashboards.
- Avoid fake readable text, logos, watermarks, warped faces, and distorted hands.
- Keep image files compressed and project-local.
- Target under 200 KB per image where possible.

Recommended image set:

- `images/dubai-skyline.jpg` for hero
- `images/business-meeting.jpg` for image grid
- `images/hand-shake.jpg` or better partnership image for image grid
- `images/strategy-whiteboard.jpg` for image grid
- Existing team images preserved under predictable names

Prompt style:

```text
Create a realistic, premium, lighter-themed business image for a Dubai-based EMEA sales leadership consultancy. Bright modern office, natural daylight, skyline through glass, senior executives in a calm strategic discussion. Editorial photography, credible, polished, not generic stock. No readable text, logos, watermarks, distorted faces, or distorted hands.
```

## Animation And Interaction

Keep the OpenGate animation language:

- Custom cursor on desktop only
- Cursor ring expands over links, buttons, cards, map regions
- GSAP hero headline reveal by line
- GSAP or IntersectionObserver fade-up reveals
- Parallax image motion on desktop
- Service row hover expansion
- Image grid hover zoom
- Stats underline hover
- Map hover tooltip and highlighted regions
- CTA hover fill animation

Disable or reduce expensive effects on mobile:

```css
@media (max-width: 768px) {
  html { cursor: auto; }
  .cur, .cur-ring { display: none; }
}
```

Use `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Mobile Responsiveness Rules

The site may be laptop-first, but mobile must still feel intentional.

Required mobile behavior:

- No horizontal overflow at 320px, 390px, or 430px.
- Header logo and CTA must fit on one row.
- Hide non-CTA nav links or use a clean mobile menu.
- Hero text must not be cropped.
- Hero CTAs stack vertically.
- Image grid becomes one column or a controlled two-column layout.
- Services descriptions are visible by default, not hover-only.
- Stats stack vertically.
- Team cards stack vertically.
- Map does not overflow the viewport.
- Footer links wrap cleanly.
- Touch targets are at least 44px high.

Baseline responsive CSS:

```css
@media (max-width: 768px) {
  nav { padding: 1.2rem 1.5rem; }
  .og-logo svg { width: 142px; }
  .nav-links a:not(.nav-cta) { display: none; }

  .hero {
    height: auto;
    min-height: 100svh;
    align-items: flex-end;
  }

  .hero-content {
    padding: 6.5rem 1.5rem 4.5rem;
    max-width: 100%;
  }

  h1 {
    font-size: clamp(3rem, 15vw, 4.8rem);
  }

  .hero-acts {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .img-grid {
    grid-template-columns: 1fr;
    height: auto;
  }

  .ig-cell { height: 230px; }
  .sec-head { grid-template-columns: 1fr; }
  .svc-desc-text { max-height: 110px; opacity: 1; margin-top: .55rem; }
  .stats { grid-template-columns: 1fr; }
  .team-grid { grid-template-columns: 1fr; }
  .map-grid { grid-template-columns: 1fr; }
}
```

Tablet behavior:

```css
@media (min-width: 769px) and (max-width: 1100px) {
  nav { padding: 1.4rem 2rem; }
  .nav-links { gap: 1.4rem; }
  .hero-content { padding-left: 2rem; }
  .services, .team, .portfolio, .map-section, .cta {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  .map-grid { grid-template-columns: 1fr; }
}
```

## Copywriting Tone

Use clear executive language:

- Senior expertise, real outcomes
- Direct sales execution
- Business development
- Market entry
- Fractional CRO
- Channel partnerships
- Revenue scaling
- Conversion-focused websites

Avoid:

- Empty agency fluff
- Generic "unlock your potential"
- Over-explaining the website features in visible page copy
- Fake claims unless the user provides proof

## Build Workflow

1. Inspect the existing project first.
2. Preserve user-provided team photos, logos, and important copy.
3. Make a clean project folder if the user wants a new version.
4. Keep changes scoped.
5. Generate or replace imagery.
6. Patch HTML/CSS/JS.
7. Run a local server.
8. Verify desktop and mobile.
9. Stop the local server.
10. Summarize exact files changed.

## Verification Checklist

Before final delivery:

- [ ] `index.html` opens locally.
- [ ] No missing image references.
- [ ] Browser console has no errors.
- [ ] Header logo fits on desktop and mobile.
- [ ] No horizontal overflow.
- [ ] Hero CTA visible on normal laptop viewport.
- [ ] Mobile hero text is not cropped.
- [ ] Service descriptions are accessible on mobile.
- [ ] Team photos render correctly.
- [ ] Map section does not break mobile layout.
- [ ] Local preview server is stopped.

## Deployment Notes

For GitHub and Vercel:

- Push the full folder with `index.html`, `images/`, and `README.md`.
- Vercel framework preset: `Other`.
- Build command: empty.
- Output directory: empty.

Keep it simple. The OpenGate style works because it feels premium, focused, and alive without needing a heavy framework.
