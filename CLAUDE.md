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
- Dorian Lemire — Business Development Representative (BDR).
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
- `/real-estate` — Bellevue Residencies portfolio page.
- `/web-design` — web design and content portfolio.
- `/privacy-policy`, `/thank-you`, and the custom 404 page.

Current site behavior lives in `interface.js`, styling in `design.css`, and early theme selection in `theme-init.js`. The previous `site.js` and `site.css` are unused and excluded from deployment. Shared header/footer source is in `partials/`; run `npm run sync-layout` after editing it to update all public HTML pages. Keep the header, navigation, footer, responsive behavior, breadcrumbs, analytics, and calls to action consistent across all public pages.

### Morbit

Morbit is the principal technology product represented by OpenGate. Position it as a connected-building intelligence and operational-management solution for enterprise IT, AV, facilities, and smart-building teams. The commercial story should support CTO and IT-director conversations, estate visibility, device and sensor health, alerts, trends, meeting-room experience, and regional channel growth.

### Bellevue Residencies

Bellevue is the real-estate portfolio project in Ja-Ela, Sri Lanka. Its presentation should feel premium and credible, use real geographic context, and clearly distinguish indicative visualisations from confirmed project facts.

### Web design and content

The portfolio demonstrates OpenGate's ability to turn offers into clear digital buyer journeys. External showcase websites should remain external links rather than being folded into the OpenGate codebase.

### Private Discuss archive

Private Discuss is intentionally removed from the published site. Its exact former page and media are preserved under `ARCHIVE/private-discuss/`, which is excluded by `.vercelignore`.

Do not restore Private Discuss, add it to navigation, include it in the sitemap, or publish its assets unless the user explicitly asks to bring it back.

## Brand and design direction

The site should feel premium, executive, international, technically credible, and human—not like a generic AI-generated landing page.

- Current palette: warm off-white backgrounds, ink-blue text, muted blue accents and restrained gold. Light mode is the default; dark mode preserves the same layout with deep blue-grey surfaces.
- Typography: self-hosted Cabinet Grotesk. Keep copy concise, hierarchy clear and the number of competing actions low.
- Use calm solid surfaces, considered whitespace and thin rules. Avoid heavy gradients, nested cards and decorative dashboard mockups.
- New photo areas are intentionally blank pending approved real images. Keep data-image-slot markers for replacement. The real Morbit dashboard and brand marks remain visible.
- Motion is brief and restrained: once-only GSAP reveals and clear hover feedback. Keep all copy readable and respect reduced-motion preferences.
- Maintain excellent behavior across mobile, tablet, laptop, and large desktop screens.

The historical visual guidance is in `docs/DESIGN_SYSTEM_LEGACY.md`. Treat it as reference rather than a reason to overwrite newer site decisions.

## Motion-design direction

OpenGate is now also a motion-design project. New animation work belongs in `motion-design/`:

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
- Output directory: empty.
- Clean URLs are configured in `vercel.json`.

Local preview:

```bash
cd /Users/dorianlemire/Projects/OpenGate-Advisory
npm run preview
```

Open `http://127.0.0.1:8091/` and verify all changed routes at desktop and mobile widths.

Before finishing work:

1. Check that every internal link and referenced asset resolves.
2. Run `npm run check` and validate `sitemap.xml`.
3. Test navigation, dropdowns, interactive controls, forms, and sticky mobile CTA.
4. Check for horizontal overflow and cropped content at common breakpoints.
5. Confirm non-public folders remain covered by `.vercelignore`.
6. Preserve unrelated user files and archived material.

## October 2026 redesign notes

Light is the first-visit default. The header toggle saves the choice under `opengate-theme`, applies before first paint and persists across pages. Do not use OS dark-mode preference to override the first-visit light theme.

Run `npm run verify` with the preview server running and Google Chrome installed. The script checks all 12 routes in both themes at four widths, as well as navigation, keyboard input, theme persistence, product tabs, the property slider, map loading, FAQs, the mobile CTA, internal links and HTTP 404 behavior. Reports and screenshots are in excluded `test-results/`.

The pre-redesign site is backed up in `ARCHIVE/pre-light-redesign-2026-10-08/`. Read `docs/LIGHT_REDESIGN.md` for image slots and maintenance details.

## Source of truth

- Current implementation: files at this project root.
- Current project guidance: this `CLAUDE.md`.
- Historical handoff: `docs/WEBSITE_HANDOFF_LEGACY.md`.
- Historical design reference: `docs/DESIGN_SYSTEM_LEGACY.md`.
- Original high-resolution source material: `source-assets/`.
