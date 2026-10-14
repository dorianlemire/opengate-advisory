# AI offering hierarchy and OpenGate film

Motion design and CRM & automation are the two primary AI offerings. Websites and supporting content remain available, but are secondary. Updated the AI page, home service card, Dorian biography, About service description, navigation description and AI metadata. Existing URLs, website portfolio projects and privacy controls are preserved.

The About page features the exact owner-supplied `opengate-advisory-film-1920x1080.mp4` from the SSD motion workspace. It is 58.816 seconds (displayed as 59 sec), not the separate V2 export. No edits or re-encoding were made to the film. The matching exported poster preserves the brand and headline. English captions derive from the corresponding original `src/data/timeline.json`, not the V2 timeline.

Sources:
- `/Volumes/Dorian SSD/Motion Design Factory/films/opengate-advisory-film/exports/opengate-advisory-film-1920x1080.mp4`
- Same folder: `opengate-advisory-film-poster.jpg`
- `/Volumes/Dorian SSD/Motion Design Factory/films/opengate-advisory-film/src/data/timeline.json`
- AI service imagery: `/Volumes/Dorian SSD/Motion Design Factory/films/morbit-film/exports/morbit-studio-film-thumbnail-dashboard.jpg`

Edit `partials/about-film.html` and run `npm run sync-layout` to update the About film. Players use native controls, English captions, no autoplay and no video preload. No external player or tracking is introduced.

The portfolio section immediately after Morbit now has a theme-aware top border and the base page background, rather than the same soft gradient as the film section. The existing vertical spacing is retained.

Design direction: focused preservation, variance 5 / motion 3 / density 3. Keep Cabinet typography, current warm-light / blue-dark tokens, rounded media and existing interactions. Reuse approved media rather than generating replacement artwork. No global redesign or additional animation is needed for this change.
