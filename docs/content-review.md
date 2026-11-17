# Content review — 17 November 2026

Reviewed portfolio_4 against the approved final CV, portfolio_3's content facts and source notes, and the owner's confirmation in this chat. The confirmed additional projects belong to Stefan and remain in the site. Public project descriptions were checked against those sources; private systems and live third-party sites were not independently audited.

## Corrections applied

- Restored Luxembourg location, on-site Luxembourg/remote Europe preferences and fixed January 2027 employment wording. Employment and freelance enquiries have equally styled email actions. The earlier email-composer form was replaced with direct links.
- Restored the approved job titles, arrangements and dates: DTO Jan 2025–present; Skald Jul–Oct 2026; ArtAICare Jan–Sep 2025; MindHub Sep 2023–Sep 2024. ArtAICare's overview states the 20 September 2025 contribution cutoff and distinguishes the web platform from the separate VR work.
- Split DTO's recruitment platform and company website. The platform uses Angular, TypeScript, Rust, PostgreSQL, Redis, Docker and Makefile; it is in development with private source and no public demo. The company website has its own approved link, English/Polish scope and no invented framework attribution.
- Corrected Skald Lab Ops to Django backend work, added the approved workshop link and clarified that public website access does not establish access to the internal operations interface.
- Added Egil as a private local RAG assistant using Ollama. There are now ten project overviews.
- Retained The Book Next Door, DNS Server, Budget Buddy, Let's Talk and Autonomous Racing with ROS2, including their descriptions and supplied links, after explicit owner confirmation. Kept the confirmed GitHub profile and approved LinkedIn. Omitted the previous-portfolio link, which was not part of that confirmation.
- Restored education dates, completed Erasmus status, the IT Kariera qualification and spoken languages. Added omitted confirmed tools such as Rust, Angular, Django and Ollama. Skills remain an inventory rather than proof of use on every project.
- Added unchanged copies of the approved portrait and CV at their original public paths, and CV links in desktop/mobile navigation.
- Removed the premature university alumni claim from structured data, omitted relative canonical/social URL declarations while the domain is unconfirmed, and use summary cards without an invented preview image.
- Replaced unapproved interface mockups for ArtAICare, DTO and Skald with typographic covers. Overviews disclose status, visitor access and source visibility where known. Product status and source access for the newly confirmed personal projects have not been invented.

## Code and build cleanup

Removed the original builder's branding, default icon, editor metadata, build wrapper, runtime reporting hooks, package description and template instructions. Replaced the icon with SP initials and configured Vite, React, Tailwind, TanStack Start and Nitro directly. npm is the only package manager configuration; its lockfile was regenerated and tested with `npm ci`. Kept the existing independent error page and server-side CSRF protection.

The framework remains TanStack Start. The production output uses a local Node server; it is not the earlier Next.js static export. No repository was initialised and no site was deployed. The original source backup is outside the project at `/var/folders/6z/3gb71h896_37bywg9j5820mm0000gn/T/portfolio4-before-review-vcq05npe/source.tar.gz`.

Configuration references: [TanStack setup](https://tanstack.com/start/latest/docs/framework/react/build-from-scratch) and [hosting guide](https://tanstack.com/start/latest/docs/framework/react/guide/hosting).

## Verification

- Node.js 24.15.0: locked install, typecheck, five tests and production build passed.
- ESLint: zero errors, seven pre-existing Fast Refresh warnings. The imported code had 355 formatting errors; formatting was corrected without disabling rules.
- Chrome: all ten project routes returned 200; unknown project returned 404; homepage and development-server smoke checks passed without JavaScript page errors.
- Checked the home/contact content at 320, 390, 768 and 1440px, the mobile menu's CV link, distinct employment/freelance mailto subjects, equal action styling, and page-level horizontal overflow.
- Verified the portrait and CV served byte-for-byte identically to the approved assets. Favicon and sitemap returned 200.
- Verified corrected DTO/Skald attribution, ArtAICare sign-in and cutoff date, and absent demo links for DTO recruitment/Egil. Scanned application source, lockfile and generated output for removed builder references; no matches. Browser output contains no related scripts or requests.
- Fixed inherited hidden experience details in desktop reduced-motion mode. Opened desktop/mobile hero, project, contact and menu captures. Local evidence is under `.artifacts/content-review/`.

## Remaining work

- `npm audit` reports two high-severity entries: Vite 8.1.5 and Zod 3.x. The audit proposes Vite 8.3.8 and Zod 4.6.7; the latter crosses a major version. No forced or unrelated dependency upgrade was applied. See `.artifacts/content-review/audit.json`.
- Seven existing Fast Refresh warnings remain. Vite also notes that its tsconfig-paths plugin can be replaced by native path resolution.
- The portfolio domain and deployment target remain unset. Static hosting would require a separate build/export task.
- This was a content and builder-removal pass, not a full accessibility or motion audit. JavaScript-disabled presentation, full keyboard/modal behavior, Safari/Firefox, physical mobile devices and performance remain to be checked before release.
