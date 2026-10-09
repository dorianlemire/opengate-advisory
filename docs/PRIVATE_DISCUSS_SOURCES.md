# Private Discuss restoration, 9 October 2026

Folder cleanup note: current public assets now live under `public/assets/`. Archived material is in the external reference folder documented in `REPOSITORY_CLEANUP.md`. URLs under `/assets/` are unchanged. This document records the original restoration and media provenance.

## Scope

Restored at the owner's explicit request. Public route: `/private-discuss`. Morbit retains `/technology`. Both appear in the alphabetical Technologies dropdown. Historic Private Discuss material remains safely excluded under `ARCHIVE/`.

The new route uses OpenGate's Cabinet typography, light-first palette, dark-mode tokens, original navigation and footer. The frontend design skill informed a restrained product-specific sage accent, varied section layouts and purposeful interactions: feature exploration, hosting comparison, image enlargement and subtle pointer perspective. No generated people, fabricated dashboard data, third-party embeds, or customer account content.

## Official product sources

Reviewed the current English pages, not the archived copy:

- https://private-discuss.com/en: sovereign communication positioning, desktop/mobile platforms, AI Companion, messaging, voice and video.
- https://private-discuss.com/en/features: screen sharing, annotation, breakout rooms, webinars, PiTransfer, collaboration and Private Translate.
- https://private-discuss.com/en/hosting: on-premise and managed SaaS hosting models.
- https://private-discuss.com/en/security: encryption and administration/security controls. Avoid absolute guarantees and unverified compliance or certification claims.
- https://private-discuss.com/en/use-case: leadership, sensitive projects and crisis coordination.
- https://private-discuss.com/en/administration: users, groups, platform usage and reporting.
- https://private-discuss.com/en/api: API/SDK integration possibilities. Compatibility requires validation, not a blanket promise.

## Media provenance

Public product illustrations were downloaded from the provider site into `assets/private-discuss/` and displayed without warping or removing branding:

| Local file | Official source path |
| --- | --- |
| logo.png | /logo.png |
| platform.webp | /assets/page%201/header-graph.webp |
| meetings.webp | /images/1/hd-audio.webp |
| messaging.webp | /images/1/secure-messaging.webp |
| translation.webp | /images/3/Private-Translate.webp |
| administration.webp | /images/2/admin.webp |
| screen-sharing.webp | /images/3/screen-screen-sharing.webp |
| deepfake.webp | /images/3/DeepFakes-Detection.webp |

Only the first six are used in the public page. These are promotional illustrations, not a functioning product or live customer data. The logo preserves its 247:80 intrinsic ratio, with a monochrome filter in light mode for contrast. Product documentation links are available next to relevant features. Licensing/partner permissions remain the site owner's responsibility; this task does not establish new usage rights.

## Owner-supplied event photography

Images are publication-authorised by the user's instruction in this task. Optimised JPEG copies, with no identity or background modification:

- `Georges 2.jpg` → `assets/photos/georges-keynote.jpg`: homepage and About gallery.
- `Georges 8.jpg` → `assets/photos/georges-on-stage.jpg`: About gallery.
- `Georges 10.jpg` → `assets/photos/georges-forum.jpg`: homepage story and About gallery.
- `Georges 4.jpg` → `assets/photos/georges-speaking.jpg`: initial event portrait. Later replaced in the team section by the newer saved profile portrait; this event crop is retained in the external reference folder's unused media.

Captions describe participation and speaking. They do not claim that OpenGate won an award, that attendees are customers, or that visible brands endorse OpenGate. Original files in Downloads are untouched. Other people’s existing image slots are unchanged.

## Morbit boundary

The user subsequently authorised inspection of their signed-in Morbit Studio tab on October 9. Inspection was read-only and used to understand feature categories. No account screenshots, records or live figures were exported. The Morbit page now has a separate illustrated feature explorer; see `docs/MOTION_REFINEMENT.md`. Do not publish real customer identities, operational data, credentials or private screenshots. Prefer an approved demo environment for future product media.

## Verification

- `npm run check`: passed.
- `npm run verify`: 104 layouts, 13 unique page titles, 35 local URLs, no browser errors or failed assertions.
- Tested product and gallery tabs with keyboard navigation, deployment switching, native dialog dismissal/focus return, feature shortcuts, accordion behavior, mobile navigation, theme persistence and existing site interactions.
- Additional viewport checks: 320, 375, 680, 681, 900, 1020, 1021, 1100 and 1280 px. No horizontal page overflow. Logo aspect ratio remains approximately 3.0875:1.
- Pointer depth resets when reduced motion is enabled. Transitions on this page use native browser animation; it does not download GSAP/ScrollTrigger.
- Local mobile Lighthouse: performance 96, accessibility 100, best practices 100, SEO 100. These are lab results, not a guarantee of production rankings or field performance.
- Preview: http://127.0.0.1:8091/private-discuss. Changes are local; no GitHub push or production deployment was made in this task.
