# Bellevue Residencies — Sales & Showcase Website

Static, deployment-ready website for Bellevue Residencies, 40 Negombo Road, Tudella, Ja-Ela, Sri Lanka.

## Run locally

Use any static server from this folder. For example:

```bash
npx serve .
```

The project has no build step. `vercel.json` enables clean URLs on Vercel.

## Production checklist

1. Add the approved GA4 measurement ID to `data-ga-id` on every HTML `<html>` tag. Analytics does not load while it is blank.
2. Connect the lead form by adding a HTTPS JSON endpoint to `data-endpoint` on `<form data-lead-form>`. Until then, a validated submission prepares a WhatsApp message for the buyer to review and send.
3. Replace provisional residence levels, plan diagrams, availability, handover, prices, payment terms and specifications with the approved sales release.
4. Confirm the public sales telephone/WhatsApp number (`+94 71 515 0150`) before launch.
5. Have Sri Lankan counsel review the privacy policy, foreign ownership language and investment disclaimers.
6. Confirm the production domain. Canonical, Open Graph, schema and sitemap URLs currently use `https://www.bellevueresidencies.com`.
7. Confirm the project's official survey coordinates before launch. The local OpenStreetMap orientation currently uses the public Ja-Ela location (`7.0744, 79.8919`); Google Maps links search the full street address.

## Research and factual guardrails

- LMD / Daily FT 2019 announcement: 600,000 sq ft mixed-use masterplan; two towers; 2–4 bedroom homes and penthouses; pool, gym, recreation and solar-powered common areas; later commercial phase.
- NCD Consultants current portfolio: 35-storey luxury apartment complex, piled foundations, four parking floors, transfer-floor atrium, 30 apartment floors and central lift core; in progress.
- Thilanka Group current profile: 34-storey Bellevue high-rise and 170 apartments. Because published sources conflict on total inventory and one-vs-two-tower implementation, the website avoids a unit-count claim and identifies twin-tower imagery as the published masterplan vision.
- Central Bank of Sri Lanka Q2 2025: Colombo new-condominium price index +12.8% YoY; condominium sales volume +44.2% YoY; 54% of units in surveyed ongoing projects reserved. These are market indicators, not Bellevue ROI promises.
- Rome2Rio / public mapping context: approximately 15 km from Ja-Ela to Bandaranaike International Airport. Travel times are expressly qualified.
- Sunday Times founder profile (2019): Chandima Kahandawala's French Riviera construction career and return to Sri Lanka.
- The location panel uses a locally hosted OpenStreetMap tile mosaic so the real map remains visible when privacy-focused browsers block third-party iframes. Attribution is displayed over the map; Google Maps links provide live search and directions.

## Visual sources and disclosure

- `assets/bellevue-boi-render.jpg`: published 2019 project rendering from Daily FT.
- `assets/bellevue-official-ncd.jpg`: NCD portfolio image retained for research reference, not used as a Bellevue site visual because it visibly depicts central Colombo landmarks.
- `assets/bellevue-hero.jpg`, `amenity-pool.jpg`, `residence-3br.jpg`, `residence-4br.jpg`, `residence-penthouse.jpg`: generated with OpenAI ImageGen using the published Bellevue twin-tower rendering and/or the existing Bellevue interior mood image as references. Every public use is labelled “artist impression”.
- `assets/bellevue-interior-reference.jpg`: inherited from the OpenGate Bellevue portfolio page and used as an indicative two-bedroom mood visual.
- `assets/bellevue-vision-reference.jpg`: generated aerial artist impression of the twin-tower masterplan beside the coast, used in the amenity gallery as an indicative "coastal masterplan vision" frame.

Do not present generated imagery as a construction photograph or approved architectural render.
