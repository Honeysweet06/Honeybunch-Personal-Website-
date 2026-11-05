# Honeybunch — Personal Portfolio

A responsive portfolio for Honeylyn A. Moreno, built with plain HTML, CSS, and JavaScript. The visual direction pairs soft pink, cream, white, and muted green with editorial typography and custom CSS illustration panels. The separate `tutorials.html` page adds searchable, filterable learning topics and original free written lessons.

## Run locally

Open `index.html` in a browser, or use the VS Code Live Server extension if it is already installed. No build step or package installation is required.

## Before publishing

- Confirm the email and social profile links in the contact section are correct.
- Replace the concept-illustration panels with real project screenshots when available, and update project roles, technologies, and status only with verified details.
- Confirm the listed skills reflect current experience.

Project cards intentionally describe concepts and developing work without implying unverified completion. The sample visual panels are CSS illustrations, not project screenshots.

## Learning page status

The public tutorial library currently contains original written lessons, working search/category/sort controls, and accessible lesson-preview dialogs. Topic illustrations are CSS artwork, not video thumbnails. No tutorial video URLs or uploaded videos have been supplied, so video playback and downloads are not enabled. Premium cards disclose planned topics only; their protected course materials are not included in the page.

The selected future deployment/backend are Vercel and Supabase, but no Supabase project or runtime configuration has been connected. This repository currently has no authentication, database, server functions, administrator roles, or payment provider. Premium checkout and access, subscriber dashboards, cross-device progress, restricted downloads, and certificate issuance/verification are therefore unavailable. The public learning page acts as a preview and displays setup messaging instead of simulating purchases, subscriber status, or certificates.

Before enabling paid access, connect a Supabase project and implement server-side authorization and database policies. The future Supabase integration will need `SUPABASE_URL` and `SUPABASE_ANON_KEY` for the browser client, plus `SUPABASE_SERVICE_ROLE_KEY` only in Vercel server-side environment variables. The service-role key must never be exposed to the browser. These variables are not read by the current static site. Select a payment provider and verify payments through its trusted webhooks; provider-specific secrets must also remain server-side. Host premium files behind authenticated access. Add authorized video URLs, course content, actual pricing, and published certificate eligibility rules before advertising those features. Do not add premium lesson assets to public HTML or client-side JavaScript.
