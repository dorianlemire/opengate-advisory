# OpenGate Advisory

The GitHub-ready website repository. Light-first design, optional dark mode, Cabinet Grotesk, real photography and interactive partner pages.

## Folder guide

```text
public/              The complete published website
  *.html             Pages; Vercel serves extension-free URLs
  assets/
    css/             Shared and product-specific styles
    js/              Menus, themes, animation and product controls
    fonts/           Self-hosted Cabinet Grotesk
    vendor/          Local GSAP and ScrollTrigger
    photos/          Approved event photography
    team/            Georges and Dorian portraits
    morbit/          Logo and responsive dashboard previews
    private-discuss/ Official product visuals
    social/          Social sharing images
    work/            Real website previews and the Beaver IT motion piece
partials/            Shared layout, three service pages and Morbit source
scripts/             Layout sync, local preview and verification
docs/                Design, source and maintenance notes
CLAUDE.md            Business and implementation context
vercel.json          Deployment settings and legacy asset redirects
package*.json        Reproducible local tooling
```

`node_modules/` and `test-results/` are local-only and ignored by Git. No credentials, archived designs or source media belong in `public/`.

## Work locally

Run these commands from this repository:

```sh
npm ci
npm run sync-layout
npm run check
npm run preview
```

Open http://127.0.0.1:8091/. In another terminal, run `npm run verify` (requires Google Chrome). It checks all 11 routes in both themes, four widths, interactive features, portfolio links, video playback and team portraits. Reports/screenshots are local under `test-results/`.

Most page edits happen in `public/*.html`. Header/footer edits happen in `partials/`. Edit Morbit in `partials/morbit-main.html`; edit the three service pages in their corresponding `*-main.html` partials. Run `npm run sync-layout` after source changes. CSS/JS changes go in their respective `public/assets/` folders.

`npm run check` validates JavaScript syntax, local page/asset references, JSON-LD, redirects and the public-folder boundary. It also prevents tracking `node_modules`.

## GitHub and Vercel

Keep the **repository root** as Vercel's Root Directory. Configuration is committed in `vercel.json`:

- Framework: Other (`null`).
- Build command: empty.
- Output directory: `public`.
- Clean URLs: enabled.

No framework migration or compilation step is needed. Only `public/` is published. Old CSS, JavaScript, Morbit-image and social-image URLs redirect to their organised locations.

Commit **all related changes and removals**, not just the `public/` folder. The root config, partials, scripts, docs and package manifests belong in GitHub too. Do not upload the reference backup, `node_modules`, test outputs or environment files. Verify the Vercel deployment separately after pushing to the connected GitHub branch.

Vercel Analytics is preserved. Google Analytics remains inactive until the owner's GA4 measurement ID is configured in `public/assets/js/interface.js`.

## Team and media

Dorian Lemire is an **AI Developer**, creating websites, motion design and content for SaaS/technology businesses and strengthening their online presence. His saved portrait and the newer Georges portrait are now in `public/assets/team/`. These are the existing local files; LinkedIn blocked direct retrieval, so they have not been claimed as newly downloaded or current-profile verified.

The team contains Georges and Dorian. Charles's profile has been removed. Published event photographs have the Neat wordmark removed with a localized background repair; original files are preserved outside Git. Morbit now uses the owner-supplied demonstration dashboard. No published image frames are blank.

The site has three services: Market Entry & Growth, Commercial Leadership & Partnerships, and AI Development & Integration. Real Estate is temporarily paused; its source is in `docs/paused/real-estate.html` and its URL temporarily redirects to the portfolio. The two merged service pages are preserved there too, with permanent redirects to their combined offerings.

See [October 10 update](docs/SITE_REFINEMENT_2026-10-10.md) for route mappings, media sources and restoration steps. Run `node scripts/capture-portfolio.mjs` to refresh the actual website captures and their responsive versions.

## Preserved references and recovery

Old designs, unused media, motion-design folders and original source files were moved outside the Git repository:

`/Users/dorianlemire/Projects/OpenGate-Advisory-Reference-2026-10-09-jgHF9r/`

That folder contains a pre-cleanup `before-cleanup.tar.gz`, a move/removal manifest, archived Private Discuss and earlier designs, the LinkedIn banner sources, and unused media. Eleven byte-identical duplicate images and Finder metadata were removed; duplicates remain recoverable from the snapshot. Installed dependencies were untracked, not deleted.

See [cleanup notes](docs/REPOSITORY_CLEANUP.md) for details. Never restore that reference folder into the deployment output.
