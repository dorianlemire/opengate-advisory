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
partials/            Shared header/footer and Morbit main-content source
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

Open http://127.0.0.1:8091/. In another terminal, run `npm run verify` (requires Google Chrome). It checks all 13 routes in both themes, four widths, interactive features and team portraits. Reports/screenshots are local under `test-results/`.

Most page edits happen in `public/*.html`. Header/footer edits happen in `partials/`. Edit the Morbit main content in `partials/morbit-main.html`, then run `npm run sync-layout`. CSS/JS changes go in their respective `public/assets/` folders.

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

Event photographs remain on Home/About. Charles's role, profile link and current image slot are unchanged. The Bellevue comparison retains its current blank image layers; this cleanup does not alter that design.

## Preserved references and recovery

Old designs, unused media, motion-design folders and original source files were moved outside the Git repository:

`/Users/dorianlemire/Projects/OpenGate-Advisory-Reference-2026-10-09-jgHF9r/`

That folder contains a pre-cleanup `before-cleanup.tar.gz`, a move/removal manifest, archived Private Discuss and earlier designs, the LinkedIn banner sources, and unused media. Eleven byte-identical duplicate images and Finder metadata were removed; duplicates remain recoverable from the snapshot. Installed dependencies were untracked, not deleted.

See [cleanup notes](docs/REPOSITORY_CLEANUP.md) for details. Never restore that reference folder into the deployment output.
