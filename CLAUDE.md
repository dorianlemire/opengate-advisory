# OpenGate Advisory — Claude Code Project Context

## Working root

Work only inside:

```text
/Users/dorianlemire/Projects/OpenGate-Advisory
```

OpenGate is a standalone project. Do not look for, edit, or recreate the OpenGate website inside `/Users/dorianlemire/Vaulted/WEBSITE`; that workspace now contains the other website projects.

## What OpenGate Advisory does

OpenGate Advisory (FZE) helps companies enter and grow in markets they do not yet know well. It bridges ambition and execution by validating opportunities, translating offers for local buyers, building the right commercial relationships, and creating a measured route to revenue before a client overcommits resources.

Technology is a core area of expertise, but the work is not limited to one vertical. OpenGate's value comes from understanding regional business culture, decision-making, partner networks, commercial processes, and market-entry risk across Southern Europe, the Middle East, Africa, and Southeast Asia.

Core services:

- Market-entry strategy and validation.
- Fractional sales and commercial leadership.
- Channel and partner development.
- Technology commercialisation and regional go-to-market execution.
- Business development, buyer engagement, and pipeline creation.
- Conversion-focused web design, content, and commercial storytelling.

The operating promise is practical: help clients enter with confidence, avoid common mistakes, build local credibility, and grow at the right pace.

## Company information

```text
OpenGate Advisory (FZE)
Sharjah Research Technology & Innovation Park (SRTIP)
Block B – B57-089
License N° 11426
United Arab Emirates
```

## Audience and geography

Primary audiences include founders, CEOs, CROs, sales leaders, CTOs, IT directors, technology vendors, channel partners, investors, and businesses planning international expansion.

Priority geography:

- Dubai and the GCC.
- Southern Europe.
- Middle East and Africa.
- Southeast Asia.

## Team represented on the website

- Georges Lemire — Founder and Principal Advisor.
- Dorian Lemire — AI Developer. Creates motion design, websites and content, helping SaaS and technology businesses strengthen their overall online presence.
- Charles Boschetti — Sales Development Representative (SDR), with content creation and photography capabilities.

## Website and portfolio

The project is a static HTML/CSS/JavaScript website deployed through GitHub and Vercel. There is no application framework and no build step.

Main routes:

- `/` — company landing page.
- `/about` — mission, market-entry philosophy, and approach.
- `/market-entry-consulting` — market-entry service.
- `/fractional-sales-leadership` — fractional leadership service.
- `/channel-partner-development` — channel-partner service.
- `/technology-commercialisation` — technology commercialisation service.
- `/technology` — Morbit product and commercial partnership page.
- `/private-discuss` — sovereign communication and collaboration partner page.
- `/real-estate` — Bellevue Residencies portfolio page.
- `/web-design` — web design and content portfolio.
- `/privacy-policy`, `/thank-you`, and the custom 404 page.

Published pages now live in `public/`, styles in `public/assets/css/`, and browser scripts in `public/assets/js/`. Shared behavior is `interface.js`, shared styling is `design.css`, and early theme selection is `theme-init.js` within those asset folders. Shared header/footer source remains in `partials/`; run `npm run sync-layout` after editing it to update every public page. Keep navigation, footer, responsive behavior, breadcrumbs, analytics and calls to action consistent. Never put source documents, credentials or archives in `public/`.

The shared dimensional layer is `motion.css` / `motion.js` in the corresponding public asset folders. Morbit-specific presentation and interactive illustrations live in `morbit.css` / `morbit.js`, with its main HTML sourced from `partials/morbit-main.html`. Edit that partial, then run `npm run sync-layout`; do not edit only the generated main section in `public/technology.html`. `showcase.js` owns product shortcuts, image enlargement and short panel transitions.

### Morbit

Morbit is the principal technology product represented by OpenGate. Position it as a connected-building intelligence and operational-management solution for enterprise IT, AV, facilities, and smart-building teams. The commercial story should support CTO and IT-director conversations, estate visibility, device and sensor health, alerts, trends, meeting-room experience, and regional channel growth.

### Bellevue Residencies

Bellevue is the real-estate portfolio project in Ja-Ela, Sri Lanka. Its presentation should feel premium and credible, use real geographic context, and clearly distinguish indicative visualisations from confirmed project facts.

### Web design and content

The portfolio demonstrates OpenGate's ability to turn offers into clear digital buyer journeys. External showcase websites should remain external links rather than being folded into the OpenGate codebase.

### Private Discuss

Private Discuss was restored at the user's request on 9 October 2026. The public page is `/private-discuss`, alongside Morbit (`/technology`) under the Technologies menu. Current product images live in `public/assets/private-discuss/`; sources and claim boundaries are recorded in `docs/PRIVATE_DISCUSS_SOURCES.md`.

The former page and media remain preserved in the external reference folder listed below. Keep them outside the Git repository and deployment. Do not publish customer data from Morbit Studio; use an approved demo or anonymised assets only.

## Brand and design direction

The site should feel premium, executive, international, technically credible, and human—not like a generic AI-generated landing page.

- Current palette: warm off-white backgrounds, ink-blue text, muted blue accents and restrained gold. Light mode is the default; dark mode preserves the same layout with deep blue-grey surfaces.
- Typography: self-hosted Cabinet Grotesk. Keep copy concise, hierarchy clear and the number of competing actions low.
- The October 9 refinement is Apple-inspired, not a copy: translucent navigation, tactile pill controls, soft rounded imagery, subtle material shading and sculptural gate shapes. Preserve restrained colour and clear hierarchy. Avoid saturated gradients and card nesting.
- Owner-approved Georges event photography is used on Home and About. Georges's newer saved portrait and Dorian's saved portrait are in `public/assets/team/` and shown in the team section. Keep any remaining data-image-slot markers for later replacement. The existing Morbit dashboard preview and brand marks remain visible.
- Motion includes brief entrances, low-amplitude pointer depth and limited scroll-linked perspective. No scroll hijacking, pinned narrative or looping decoration. Reduced motion must disable movement without hiding content.
- Morbit's explorable graphics are explicitly illustrative, never live customer data. Do not introduce fabricated operational numbers or copy private account screens. See `docs/MOTION_REFINEMENT.md`.
- Maintain excellent behavior across mobile, tablet, laptop, and large desktop screens.

Historical visual guidance is in the external reference folder's `legacy-docs/`. Treat it as reference rather than a reason to overwrite newer site decisions.

## Motion-design direction

OpenGate's existing motion-design sources have been preserved under `motion-design/` in the external reference folder. Standalone video work belongs in that separate workspace, not in the website's Git repository:

- `briefs/` — objectives, audience, format, duration, and copy.
- `storyboards/` — shot plans, frames, and timing notes.
- `source/` — editable project files and source media.
- `references/` — approved visual references.
- `exports/` — rendered deliverables.

For web motion:

- Prefer transform and opacity animation for performance.
- Respect `prefers-reduced-motion`.
- Avoid autoplay audio.
- Keep text readable and controls keyboard-accessible.
- Compress final media and provide mobile-appropriate formats and fallbacks.
- Do not expose source files or internal briefs on the public website.

## Deployment and verification

Vercel configuration:

- Framework preset: `Other`.
- Build command: empty.
- Output directory: `public` (committed in `vercel.json`).
- Root directory: repository root, not `public`.
- Clean URLs are configured in `vercel.json`.

Local preview:

```bash
cd /Users/dorianlemire/Projects/OpenGate-Advisory
npm run preview
```

Open `http://127.0.0.1:8091/` and verify all changed routes at desktop and mobile widths.

Before finishing work:

1. Check that every internal link and referenced asset resolves.
2. Run `npm run check` and validate `public/sitemap.xml`.
3. Test navigation, dropdowns, interactive controls, forms, and sticky mobile CTA.
4. Check for horizontal overflow and cropped content at common breakpoints.
5. Confirm only `public/` is published; source folders, secrets and archives must stay outside it. Do not track dependencies or test outputs.
6. Preserve unrelated user files and archived material.

## October 2026 redesign notes

Light is the first-visit default. The header toggle saves the choice under `opengate-theme`, applies before first paint and persists across pages. Do not use OS dark-mode preference to override the first-visit light theme.

Run `npm run verify` with the preview server running and Google Chrome installed. The script checks all 13 routes in both themes at four widths, as well as navigation, keyboard input, theme persistence, product/gallery tabs, hosting comparison, image enlargement, the property slider, map loading, FAQs, the mobile CTA, internal links and HTTP 404 behavior. Reports and screenshots are in excluded `test-results/`.

The pre-redesign site is backed up under `ARCHIVE/pre-light-redesign-2026-10-08/` in the external reference folder. Read `docs/LIGHT_REDESIGN.md` for image slots and `docs/REPOSITORY_CLEANUP.md` for the current folder mapping.

## Source of truth

- Current published implementation: `public/`.
- Current project guidance: this `CLAUDE.md`.
- Current folder and deployment guide: `README.md`.
- Historical handoff/design notes: `legacy-docs/` in the reference folder.
- Original media, LinkedIn banner and motion-design sources: the reference folder.

External reference folder: `/Users/dorianlemire/Projects/OpenGate-Advisory-Reference-2026-10-09-jgHF9r/`. It includes `before-cleanup.tar.gz` and `cleanup-manifest.json` for recovery. Do not add this folder back to GitHub or publish it. The installed local `node_modules/` remains usable but is no longer tracked.
