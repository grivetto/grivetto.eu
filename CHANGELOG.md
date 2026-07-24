## [1.3.8] - 2026-07-25
### Added
- Added "RistoAI Studio" link pointing to `https://ristodev-xuoiaih5ta-ew.a.run.app/` to the web project examples section.

## [1.3.7] - 2026-07-13
### Added
- Added both veterinary links to the web project examples: "Veterinario AI" pointing to `https://veterinario.ai.studio/` and "Dr. Paws Clinic" pointing to `https://gestione-clinica-veterinaria-prenotazioni-244018943158.europe-west1.run.app/`.

## [1.3.6] - 2026-07-13
### Changed
- Renamed the "Dr. Paws Clinic" web project example to "Veterinario AI" to match its new custom domain `https://veterinario.ai.studio/`.

## [1.3.5] - 2026-07-13
### Changed
- Updated the "Dr. Paws Clinic" link to point to its custom domain `https://veterinario.ai.studio/` instead of the old Cloud Run URL.

## [1.3.4] - 2026-06-14
### Changed
- Relocated the "Available for collaboration" pill badge back to the Hero section above the main H1 title.
- Restructured the Services grid section on the homepage from 5 to 4 cards, ensuring a clean single-row layout without wrapping.
### Added
- Added a new web project example link "VI made :-)" pointing to the Omni landing page.

## [1.3.0] - 2026-06-13
### Added
- Added Python data exporter script `scripts/export_live_denaro.py` to aggregate local bot logs and push via FTP to the web server.
- Configured cron job to automatically run the exporter.
- Added visible "Last updated" footer element to homepage for GEO/SEO optimization.
- Added `datePublished` and `dateModified` to `websiteSchema` in JSON-LD.

## [1.1.3] - 2026-03-18
### Added
- Created professional vCard for Sergio Grivetto (`public/Sergio_Grivetto.vcf`).
- Added "Save Contact (vCard)" button to the Resume page footer.
- Added "Download vCard" link to the global Footer component.
- Implemented multi-language support (English, Italian, Spanish, Thai) for all vCard-related elements.
- Fixed translation type issue in the Aura Footer component.

## [1.1.2] - 2026-03-18
### Changed
- Updated `<title>` and all social/OG/Twitter titles to "Sergio Grivetto | Senior IT Specialist".
- Expanded JSON-LD `jobTitle` to an array: Senior IT Specialist, Full-Stack Architect, IT Consultant, Linux/Unix Expert, Infrastructure Engineer.
- Unified all description fields (meta, og:description, twitter:description) to a single clean version.
- Set primary email to `sergio@grivetto.eu` (secondary: `sergio@grivetto.it`) across all JSON-LD blocks.
- Corrected LinkedIn URL to `https://www.linkedin.com/in/sgrivett/` in JSON-LD and all Home.jsx links.
- Changed `og:locale` primary to `en_GB`; alternates remain `it_IT` and `es_ES`.
- Renamed ProfessionalService to "Grivetto ~ Digital Resilience & Advanced IT Architecture".
- Updated WebSite JSON-LD name separator to `~`: "Sergio Grivetto ~ Senior IT Specialist".
- Replaced local Spline bubble scene with the published "Distorting Typography" scene via iframe.
- Added `SplineErrorBoundary` around Spline rendering to prevent white-page crashes on load failure.

## [1.1.2] - 2026-03-18
### Changed
- Updated `<title>` and all social/OG/Twitter titles to "Sergio Grivetto | Senior IT Specialist".
- Expanded JSON-LD `jobTitle` to an array: Senior IT Specialist, Full-Stack Architect, IT Consultant, Linux/Unix Expert, Infrastructure Engineer.
- Unified all description fields (meta, og:description, twitter:description) to a single clean version.
- Set primary email to `sergio@grivetto.eu` (secondary: `sergio@grivetto.it`) across all JSON-LD blocks.
- Corrected LinkedIn URL to `https://www.linkedin.com/in/sgrivett/` in JSON-LD and all Home.jsx links.
- Changed `og:locale` primary to `en_GB`; alternates remain `it_IT` and `es_ES`.
- Renamed ProfessionalService to "Grivetto ~ Digital Resilience & Advanced IT Architecture".
- Updated WebSite JSON-LD name separator to `~`: "Sergio Grivetto ~ Senior IT Specialist".
- Replaced local Spline bubble scene with a new interactive 3D Spline background (hosted on prod.spline.design).
- Added `SplineErrorBoundary` around Spline rendering to prevent white-page crashes on load failure.

## [1.1.1] - 2026-03-16
### Changed
- Updated Spline background to requested scene version 3 (locally hosted).

## [1.1.0] - 2026-03-16
### Added
- Integrated new interactive 3D Spline background with distorting bubbles effect (locally hosted).
- Added "Michi" link to the Web Project Examples section in Home.jsx and translations.
- Added "Ristorante" link to the Web Project Examples section in Home.jsx and translations.
- Added "Estetica" link to the Web Project Examples section in Home.jsx and translations.
- Added "Dr. Paws Clinic" link to the Web Project Examples section in Home.jsx and translations.
- Added "Sevilla Luxury B&B" link to the Web Project Examples section in Home.jsx and translations.

### Changed
- Promoted project to **Stable 1.0** milestone.
- Switched Spline scene to local file `/bubbles_v2.splinecode` for performance.
- Updated the company name in the Resume section across all languages to "NPO Torino" and linked it to `nposervices.com`.
- Updated GitHub Showcase link in Home.jsx to point to soms
- Updated the background Spline 3D animation on the Home page
- Added "Autoscuola Demo" (`https://autoscuolademo.netlify.app/`) as an additional link to the web projects list
- Refactored the Web Project Examples links sequence into a structured two-column grid layout
- Added "Vivirito" (`https://vivirito.it/`) to the Live Businesses links

## [Previous] - 2026-02-28
