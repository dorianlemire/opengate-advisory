# Privacy and measurement, 12 October 2026

## Published website changes

- Public enquiry/privacy email confirmed by the owner: hello@opengate-advisory.com. Linked from the shared footer, homepage contact area and privacy notice. No test email has been sent and mailbox delivery has not been independently verified.
- Privacy notice source: `partials/privacy-main.html`. Covers current hosting, enquiries, Microsoft Bookings, optional Vercel analytics, lawful-basis categories, retention criteria, international processing, rights and browser preferences. Does not fabricate specific enquiry retention periods, processor locations or contractual safeguards.
- Consent UI source: `partials/privacy-controls.html`; logic in `public/assets/js/privacy.js`; styling in `public/assets/css/privacy.css`. Run `npm run sync-layout` to refresh all public pages.
- All optional analytics is off until explicit consent, including Vercel. Allow and Reject have equal visual emphasis. A permanent footer control lets users reopen settings. A native dialog provides keyboard focus containment and Escape dismissal. The mobile CTA is hidden while the initial banner is displayed.
- Consent choice and timestamp/version are saved locally for 180 days. Expired, malformed and outdated choices fail closed. A change in another tab is respected. Withdrawing consent removes vendor software through a reload when the choice was saved; if storage is unavailable, the in-memory consent gate continues blocking events without reloading into stale consent.
- Theme choice is saved until changed or site data is cleared. No JavaScript means no optional analytics.
- GA4 remains unconfigured and inactive. A future owner-supplied property uses basic consent with advertising permissions denied, advertising signals disabled and no pre-consent Google requests. Before activation, update the privacy notice, UI description and consent version so the existing Vercel-only permission is not reused for a new provider.
- Only fixed event names and a source category are collected for booking/email clicks. Query strings/fragments are removed from page-view URLs in the analytics hooks. Never send emails, enquiry contents or booking details in analytics properties.

## Measurement boundaries

`booking_link_click` means the visitor followed a booking link. `email_link_click` means they opened their email client. Neither proves a completed appointment or delivered enquiry. Removed the former `generate_lead` event on booking clicks.

The existing `/thank-you` page is not a booking-confirmation integration. Do not count visits to it as confirmed bookings or invent a client-side confirmation token.

Completed appointments must be measured from Microsoft Bookings' actual records, or an owner-approved server-side integration with appropriate access and deduplication. Verify available features in the existing Microsoft tenant before choosing a connector or adding a paid service. No booking has been created, cancelled or changed by this task.

Custom-event availability and retention depend on the Vercel plan. The frontend event is implemented; dashboard receipt and plan eligibility need account verification. Do not upgrade the plan without approval.

## Account-dependent checks still open

The owner says Search Console and Microsoft Bookings are already set up and can sign in. Public code cannot establish private account ownership or index coverage. Browser access became available, but repeated native-browser operations were interrupted by active user use. No account configuration changes were made.

Search Console follow-through:

1. Inspect the existing `opengate-advisory.com` domain property or `https://www.opengate-advisory.com/` URL-prefix property. Do not create a duplicate if an existing property is available.
2. Check Settings / Ownership verification. Do not remove existing owners or verification records.
3. Confirm `https://www.opengate-advisory.com/sitemap.xml` appears in Sitemaps and has been read successfully. Submit it if missing.
4. Inspect the homepage and key service/product URLs for indexing. A request to index is not a guarantee of indexing or ranking.
5. Review Pages and Core Web Vitals for actionable issues; avoid drawing conclusions from an empty report immediately after setup.

Microsoft Bookings follow-through:

1. Inspect the calendar behind the existing DiscoveryCall30minutes@morbit.co.uk booking URL without changing appointments.
2. Verify that the booking page identifies OpenGate and links to the website privacy notice where supported.
3. Confirm reports/access to completed appointments and choose an appropriate reporting or confirmed-event integration. Do not expose attendee records on the public website.

## Verification

`npm run verify:privacy` uses the actual site code at a simulated production origin with vendor scripts stubbed and all external traffic blocked. It tests default/reject blocking, opt-in, future GA consent command ordering, URL redaction, click names, withdrawal, GA-cookie removal, cross-tab updates, expiry/version handling, unavailable storage, keyboard dismissal and six theme/viewport combinations. It does not submit real analytics or bookings.

`npm run verify` exercises the rest of the site after rejecting optional analytics. `npm run check` checks public references, code syntax and deployment boundaries.

Sources consulted: [Google consent mode](https://developers.google.com/tag-platform/security/guides/consent), [Vercel analytics privacy](https://vercel.com/docs/analytics/privacy-policy), [CNIL transparency guidance](https://www.cnil.fr/en/sheet-ndeg12-inform-users), [Google ownership verification](https://support.google.com/webmasters/answer/9008080), [Microsoft booking-page settings](https://learn.microsoft.com/en-us/microsoft-365/bookings/customize-booking-page?view=o365-worldwide).
