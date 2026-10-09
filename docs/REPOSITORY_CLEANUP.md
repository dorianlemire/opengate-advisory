# Repository cleanup — 9 October 2026

## Changes

- Updated Dorian Lemire's role to **AI Developer** and his bio to websites, motion design, content creation and online presence for SaaS/technology businesses. Charles's role and presentation were not changed.
- Used the existing local `Dorian.jpeg` (260 × 282) and newer `Georges-new.png` (800 × 800), now named `public/assets/team/dorian-lemire.jpeg` and `public/assets/team/georges-lemire.png`. Original pixels are unchanged. LinkedIn returned a retrieval block; no claim is made that these were newly fetched or verified against current LinkedIn profile images.
- Moved all 13 live pages and only their required assets into `public/`. Organised styles, scripts, product visuals, social images and portraits into named asset folders.
- Configured Vercel's output directory as `public`, retaining the repository root, static workflow and all page URLs. Added redirects for old asset URLs so shared images and cached references keep working. Reference: [Vercel's output-directory configuration](https://vercel.com/docs/project-configuration/vercel-json#outputdirectory).
- Updated layout sync, preview server, maintenance instructions and automated verification for the new structure. Added a static reference/syntax check and checks that private project files return 404.
- Removed 42 installed dependency files from Git's index only. `node_modules/` remains on disk; package manifests and the lockfile remain version-controlled. This does not erase files from existing Git history.

## What was removed versus preserved

Eleven files in `images/` were byte-identical duplicates of root assets (verified by SHA-256), so those duplicate copies were removed. Finder `.DS_Store` metadata was removed. Their source copies were either moved into `public/` or retained with unused media; the pre-cleanup snapshot also preserves the original layout.

Unused pictures are not necessarily useless source material. Rather than permanently discard them, they were moved outside the repository, together with historical sites, older code, motion-design work and original source assets. The previously created LinkedIn banner and its editable files are preserved. Empty or generated test output remains ignored; installed tools remain available locally.

## External reference folder

`/Users/dorianlemire/Projects/OpenGate-Advisory-Reference-2026-10-09-jgHF9r/`

- `before-cleanup.tar.gz`: complete pre-cleanup working files, excluding Git internals, installed dependencies and generated tests.
- `cleanup-manifest.json`: exact move/removal record.
- `ARCHIVE/`: earlier full site and Private Discuss implementation.
- `unused-media/`: superseded or currently unreferenced images, including the older Georges portrait and Charles source photo.
- `source-assets/`: original Morbit image and LinkedIn banner deliverables/sources.
- `motion-design/`: retained motion-design workspace.
- `legacy-docs/`: historical handoff and design guidance.
- `retired-code/`: superseded CSS/JS, mobile preview wrapper and completed one-time photo migration.
- `assets/fonts/`: copied fonts to keep the banner source's relative paths valid.

To recover a file, copy just the needed item from the reference folder. For a snapshot restore, extract the tarball into a new empty folder first; do not overwrite the active repository wholesale. Git history is unchanged.

## Commit and deployment boundary

Commit the complete cleanup, including old-path deletions, new public files, root configuration, partials, scripts, docs and package manifests. Keep `.gitignore` and `.vercelignore`. Do not commit the reference folder, dependencies, tests or secrets. Only `public/` is served, both by the local preview and Vercel.

This task does not push to GitHub or deploy to Vercel. Existing hosting Root Directory should remain the repository root; the checked-in config sets Output Directory to `public`.

## Verification completed

- 52 public files; 533 local references, schema parsing and JavaScript syntax checks passed.
- 104 layouts passed across 13 routes, two themes and four widths; 40 local URLs responded, with no browser errors or layout/link failures.
- Both team portraits decoded successfully; Dorian's role/bio assertions passed. Desktop/mobile team screenshots were visually reviewed.
- All 19 old asset URLs redirect to their new files. Private documents, scripts, templates, environment paths and archived media return 404 in the preview.
- Menu, theme, Morbit/Private Discuss interactions, image zoom, comparison slider, map, FAQ and reduced-motion checks passed.
- Layout sync is idempotent; sitemap XML and whitespace checks passed. No installed dependency files remain tracked.
