# October 10 site update

## Services and routes

| Offering | Current route | Merged route |
| --- | --- | --- |
| Market Entry & Growth | `/market-entry-consulting` | `/technology-commercialisation` permanently redirects here |
| Commercial Leadership & Partnerships | `/fractional-sales-leadership` | `/channel-partner-development` permanently redirects here |
| AI Development & Integration | `/ai-development` | New service |

Three menu items and three homepage offerings. Service page text and metadata are synchronized from the service partials by `scripts/sync-layout.mjs`. The header stays alphabetical: About, Portfolio, Services, Team, Technologies. Portfolio is a direct link now that Real Estate is paused. The team contains Georges and Dorian; Charles's profile is removed.

## Temporary Real Estate pause

The original page is retained in `docs/paused/real-estate.html`, outside the deployment output. Its menu/footer/sitemap entries are removed. `/real-estate` has a temporary redirect to `/web-design`, not a permanent SEO move.

To restore: move the preserved HTML back to `public/real-estate.html`, remove that temporary redirect from `vercel.json`, restore the desired navigation/sitemap entries, fill the property images with approved assets, then run the layout sync and verification. The other two old service pages remain in `docs/paused/` as reference.

## Portfolio and media

- Four live concept websites have actual 1200-by-750 homepage captures, responsive WebP derivatives and clear external links. See `PORTFOLIO_PREVIEWS.md`.
- The homepage previews Nocturne and Trim Street; the full portfolio has all four.
- The Beaver IT motion concept comes from the owner's SSD export at `Motion Design Factory/films/beaver-it-30s/exports/beaver-it-30s-fr-1920x1080.mp4`. It is the existing 30-second French product explainer, not a claim of a paid commission. Published at `public/assets/work/beaver-it-motion.mp4`, with its supplied poster and captions derived from the existing authored voice-over script.
- Morbit uses the supplied `films/morbit-film/exports/website-mock/morbit-studio-dashboard-2800.jpg`. It contains a demonstration identity and sample figures. It replaces the older account-labelled dashboard at the existing public asset URLs, with responsive 800/1400/2800 versions. A report detail is derived from that same approved mock.
- The feature explorer highlights the supplied product screen and changes its explanation and feature list as the visitor selects Devices, Communications, Spaces or Sensors. The existing room/sensor controls remain available. No live account connection or customer data is published.
- No `data-image-slot` placeholders remain in published pages.

## Photo cleanup

Built-in image generation was used for the two precise logo-removal edits. Only repaired background regions were composited into the original photographs; the original pixels outside those regions were verified unchanged before web JPEG compression. Originals and previous dashboard files remain outside Git in `OpenGate-Advisory-Reference-2026-10-09-jgHF9r/logo-removal-2026-10-10/`.

Published assets:

- `public/assets/photos/georges-keynote-clean.jpg` (Home/About event photography).
- `public/assets/photos/georges-perspective-clean.jpg` (new Home photo from the supplied Georges 1 image).

Prompt for the keynote edit: Remove only the pale Neat wordmark projected behind and above Georges; reconstruct matching dark blue-grey screen texture and lighting. Preserve the presenter, face, hands, suit, microphones, lectern, shadows, framing and all other signage.

Prompt for the Georges 1 edit: Remove only the pale Neat wordmark immediately to the right of and above the presenter's head. Continue the existing blue-grey screen grain and lighting. Preserve Georges, glasses, beard, hands, suit, microphone, lectern, stage, framing and all other text. No crop, restyle or relighting.

The original uncleaned keynote asset is removed from `public/`; its old URL redirects to the cleaned image. No extra AI portrait or scene was needed because approved real photographs and project work filled the remaining visible frames.

## Design and verification

Preserve the light default, dark toggle, Cabinet typography, warm off-white/ink-blue palette and short motion. New material consists of real screenshots, the product view, compact native tabs and controls. Desktop has two team profiles; mobile collapses to one column.

Verification covers 11 routes in two themes at four widths (88 layouts), service/team counts, responsive portfolio image loading and new-tab destinations, video playback/captions, Morbit and AI selectors, navigation, reduced motion, redirects, private-file exclusions, structured data and local assets. Browser screenshots and Lighthouse reports are kept under ignored `test-results/`.
