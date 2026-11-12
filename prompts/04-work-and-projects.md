# Part 4 — Selected work, work index, and project overviews

Continue in the existing portfolio repository after Part 3. Implement the presentation of the five known projects using approved facts and the established design system. Preserve the portrait-led opening.

This is a static layout and content task. Build useful **project overviews**, not invented in-depth case studies. Screenshots and specific engineering decisions can enrich these pages later. Do not start the story/experience phase, coordinated motion, or deployment.

## 1. Inspect and preserve the existing work

Read `AGENTS.md`, applicable scoped instructions, the latest entries in `docs/progress.md`, `docs/design-system.md`, `docs/portfolio-spec.md`, `docs/content-facts.md`, and `docs/implementation-plan.md`. Use the final approved content, not earlier CV drafts. Inspect git status, actual components, typed data, route helpers, scripts, tests, and available assets before editing. Preserve unrelated changes.

Part 3 reportedly passed type checking, linting, 14 unit tests, and Chrome static-export checks at `/` and `/portfolio-preview`. Reported checks included 200% browser zoom, 320px reflow, no-JavaScript navigation, portrait loading failures, and font fallback. These are inherited reports, not results to claim without rerunning. Firefox, WebKit, and screen-reader validation remain unverified; seven inherited moderate lint-tooling audit findings remain unresolved. Do not assume the unit-test count must stay at 14.

Preserve dependency versions and lockfile, self-hosted Manrope and its licence notices, measured tokens, header/mobile menu/footer, hero composition, approved portrait and PDF, existing URLs and slugs, and static-export/base-path configuration. No framework migration, unrelated dependency upgrade, forced audit fix, global Codex configuration changes, commit, push, or deployment. This phase should not need a new dependency.

Capture and inspect a baseline selected-work section, `/work/`, and one project page around 390px and 1440px. Use the existing browser and ignored artifacts setup. The local-path screenshots in previous handovers have not been independently reviewed in the planning chat; do not assume they constitute external design approval.

## 2. Local skill files

The earlier report established that these files were missing, not merely undiscovered:

- `.agents/skills/portfolio-ui/SKILL.md`
- `.agents/skills/portfolio-verification/SKILL.md`

The accompanying Part 4 package includes the original local skills. Check their actual presence and read the UI and verification files directly when present, even if the selector does not list them. Do not replace the repository's current `AGENTS.md` with an older packaged version. The motion skill is included for later phases only; do not invoke it now.

If the files are still absent, record the exact paths and continue using this complete prompt. Do not invent skill contents, install third-party substitutes, or change global permissions/settings. Distinguish a missing file from a discovery issue. Skill files are instructions, not extra browser/test capabilities.

## 3. Deliverables and scope

Implement:

1. Three featured projects in the existing homepage selected-work section: DTO Recruitment Platform, ArtAICare, and Skald Lab Ops, in that order.
2. All five distinct projects on `/work/`, in the order: DTO Recruitment Platform, ArtAICare, Skald Lab Ops, DTO Partners Company Website, Egil.
3. Refined overviews at all five existing `/work/[slug]/` routes, using a shared, flexible presentation.
4. Intentional no-screenshot presentation and a small optional-media contract for future approved screenshots.
5. Content, link, responsive, and static-export regression checks; documentation of what actually changed and was tested.

Keep the existing homepage work anchor, so its hero action still reaches the correct place. Finish the featured section with a working “View all projects” link. Keep About, story, experience, services, contact, and the 404 intact except for narrowly necessary shared-style fixes. Do not implement Part 5 alongside this task.

## 4. Art direction: projects as substantial work

Use the implemented Manrope, paper/stone surfaces, ink, deep-blue accent, spacing, reading widths, and focus styles. Do not introduce a second palette, decorative typeface, brand logos, or a new component library.

### Homepage selected work

Use large, full-width editorial project rows, not a three-column grid of small rounded cards. Start with an asymmetric desktop grid: a modest sequence marker, a substantial title/summary area, and a quieter contribution/status area. Fine rules and spacing should establish separation. The exact grid must follow rendered content rather than fixed coordinates.

A visitor should understand the product, Stefan's contribution, and availability before clicking. Each row contains the project name, a concise summary, contribution scope, a short confirmed stack where appropriate, and a truthful status/access label. Metadata remains readable; do not make it tiny, ultra-light, or hover-only. Sequence numbers are decorative ordering, not performance figures.

Use a clear project link with a visible action cue. Make its purpose project-specific through visible text or a concise accessible suffix. Do not make a clickable `div`, nest links/buttons, or turn the row into a navigation trap. Prefer one primary navigation link per row rather than duplicate title/image/button tab stops with identical destinations. External product links belong on the overview pages, not nested inside a linked row.

Project headings should be expressive but smaller than the main portrait hero. Begin around 2.75–4.5rem on wide screens and roughly 1.8–2.5rem on phones, then tune using actual wrapping and zoom. Treat these as design starting points, not hard minimums that force overflow. Long titles must wrap naturally without line clamping or hiding meaningful words.

On mobile, keep the same logical DOM sequence in a single column: name, summary, contribution/status, then a clear link cue as the chosen markup permits. No horizontal carousel, mandatory hover, clipped metadata, or huge blank preview panels. Keep the text-led section reasonably compact so three entries do not become three empty full-screen slides.

### Work index

Use the same visual language, with an `h1` of “Selected work” and a short factual introduction. A suitable draft is: “Web applications, backend systems, and internal tools I have worked on.” The heading describes curation, not anonymous access to all five products.

Display all five entries on initial render. Do not add search, filters, pagination, sorting controls, or a CMS for five projects. The index should feel like a considered list of work rather than a dashboard of technology badges. Keep product status separate from the contribution role.

### Overview pages

Use broad, flat sections and an editorial reading layout. Start with a “Back to work” link, one project-name `h1`, a short purpose statement, and compact labelled metadata. Place explanatory text in a comfortable reading column with metadata beside it on larger screens and above it on small screens. A definition list is appropriate for label/value facts when it fits the existing conventions.

A page may contain:

- Context: what the product does and who it is for.
- My contribution: concrete responsibilities and capabilities Stefan implemented.
- Technologies: only the confirmed project-specific stack, optionally separating core application, integrations, and delivery.
- Access/current status: what visitors can actually open, with an approved external link when one exists.

Use sections only when they add distinct supported information. Do not force all five pages to have identical text lengths or pad the company-website overview to match ArtAICare. Keep paragraphs concise; use a few useful contribution bullets rather than repeating the entire CV.

Do not invent “The challenge / My solution / Measurable results,” benchmarks, architectural trade-offs, testimonials, or lessons learned to fill a template. Do not publish blank headings or notes such as “Details coming soon,” “TBD,” or “Stack unconfirmed.” Keep pending questions in internal documentation.

End with “Back to all projects” or a simple, correctly named next-project link based on the stable index order. Do not add a duplicated mini-contact section to every page when the shared footer already provides equal employment and freelance actions.

## 5. Project content and access rules

Use the existing typed facts as the main source, with the following project-level requirements. Employment dates describe engagements unless an individual project period has been explicitly confirmed. Do not turn the DTO engagement start into an invented recruitment-product launch date.

### DTO Recruitment Platform — `dto-recruitment-platform`

Suggested summary: “A recruitment platform with candidate, company, and administrator workspaces.”

Contribution: full-stack engineering, architecture, code organisation, and implementation. The confirmed functionality includes candidate onboarding/discovery, saved profiles, recruiter expressions of interest, authentication, role-based access and privacy controls, and dashboards for recruitment activity and user engagement. Do not imply people management or change the job title to Lead Engineer.

Confirmed project stack: Angular, TypeScript, Rust, PostgreSQL, Redis, Docker, Makefile. Do not copy React onto this product from the aggregate employer stack. Automated testing and CI/CD are confirmed across the DTO engagement, but exact providers, stages, test types, and product-specific pipeline ownership are not supplied; do not invent them.

Public labels: “In development” and, where useful, “Private source.” There is no approved public product/demo/repository link. Do not substitute the company website as its demo. Do not use a release countdown, fixed launch date, or automatic status change based on “in two months.” Omit nonexistent external actions rather than render disabled buttons.

### ArtAICare — `artaicare`

Suggested summary: “An art-therapy web platform with Python integrations, a web–VR connection, and university-study support.”

Contribution: sole programmer for the web platform within a wider product team. Include MERN architecture, backend services/APIs, Python recommendation functionality and Sentence-BERT integration, collaboration with the separate VR developer, a study-specific application involving EEG data and Python scripts, and Ubuntu VPS deployment with Nginx and SSH. Group these into readable contributions rather than a long list of unexplained acronyms.

Core stack: MongoDB, Express.js, React, Node.js. Integrations: Python, Sentence-BERT. Delivery: Nginx, Ubuntu, SSH.

Contribution period: January–September 2025; the user gave the precise end date of 20 September 2025. A brief note may explain that the overview describes Stefan's contribution through that date and that the live platform may have changed afterward.

External action: “Platform sign-in” to `https://therapy.artaicare.com/auth/signin`. Describe it as a sign-in entry point, not an anonymous demo. No source link was supplied. Do not claim that Stefan built the VR app, trained/fine-tuned models, developed EEG hardware, led the research study, demonstrated clinical effectiveness, or used Go/DDD here. Do not assume specific recommendation inputs or EEG processing methods.

### Skald Lab Ops — `skald-lab-ops`

Suggested summary: “Backend software for workshop members, bookings, attendance, and project progress.”

Contribution: backend development for an internal operations system serving a youth workshop for ages 8–18. Confirmed capabilities are member records, session bookings, attendance, and project-progress management. The broader paid internship was July–October 2026; do not invent individual project start/end dates.

Confirmed technology: Django. Do not infer a frontend, database, deployment platform, Go/Rust use, DDD, or ownership of the public marketing website.

External action: “Visit Skald Lab” to `https://skaldlab.com/`. Explain briefly that this leads to the workshop's public website; it is not an anonymous demonstration of its internal operations screens. The owner reports the system is online. Do not substitute public-site availability for confirmed access to internal tools. Source visibility is not established, so omit a source link.

Keep the 90-project educational catalogue with the broader Skald experience in a later phase, not as a claimed feature or engineering result of Skald Lab Ops.

### DTO Partners Company Website — `dto-company-website`

Suggested summary: “A responsive company website presenting DTO Partners in English and Polish.”

Contribution: design and development of the informational website, responsive presentation, and English/Polish localisation. The initial delivery had no backend. This is a separate product from the recruitment platform, not an additional screenshot of the same application.

External action: “Visit website” to `https://dtopartners.com/`. Public website status is supplied by the owner; do not imply an uptime check or assign a launch date. No public repository was supplied.

The exact product-specific framework has not been confirmed. Do not infer React simply because Angular belongs to the recruitment platform. Omit an unsupported technology section rather than publish a gap disclaimer or assign the entire DTO stack to this website. Language support is a capability, not a fabricated technical stack.

### Egil — `egil`

Suggested summary: “A local assistant for querying a curated business-audit knowledge base.”

Contribution: built a local retrieval-augmented generation assistant with Ollama for model execution. It supports questions about audit methodology and business failure modes. Explain RAG once in plain English if needed. Do not expose proprietary methodology details or corpus examples beyond the high-level description already supplied.

Confirmed tooling/approach: Ollama and retrieval-augmented generation. Do not automatically assign Django from the aggregate Skald stack. No confirmed vector database, embedding model, model-training work, air-gapping guarantee, measured accuracy, or performance result exists in the supplied facts.

Public label: “Private internal tool.” The repository is private and there is no public demo. Render a useful portfolio overview without “Request access,” demo credentials, disabled GitHub buttons, or an invented NDA claim.

### Architecture statements

Stefan described responsibility for architecture and code organisation across projects, and DDD in most projects except ArtAICare and Skald Lab Ops. This does not establish every project's bounded contexts, deployment topology, aggregates, event flows, or a universal DDD classification. Do not add architecture diagrams or per-project DDD badges from that statement alone. Specific decision narratives remain future case-study content.

## 6. Screenshots are pending: make that look intentional

No approved product screenshots have been supplied for this phase. Keep the source portrait and CV byte-identical; do not reuse the portrait as generic project art.

Use HTML/CSS typographic covers where a visual surface adds value, especially on overview pages: a project name or short descriptor, one of the existing neutral/accent surfaces, and restrained rules or abstract layout. These are portfolio title treatments, not application screenshots or newly invented company logos. They should not resemble a dashboard, chart, browser mockup, code editor, or architecture diagram. Never generate fabricated product interfaces, stock coding photography, fake analytics, or a proprietary client's visual identity.

Do not add redundant giant title panels merely to occupy a screenshot-sized gap. The homepage/index may remain text-led until genuine media arrives. Avoid repeating the same large project name in both heading and cover directly adjacent to each other. Decorative repetitions should not create duplicate accessible headings or announcements.

Reuse or minimally extend the existing optional-media model: a local approved source, intrinsic dimensions, meaningful alt text, and an optional caption are enough. Separate media availability from product status and repository visibility. Undefined media renders an intentional no-media state, not an empty `img`, broken URL, skeleton, or “Coming soon” box. Do not create fake production fixtures to test this contract.

Document how an approved screenshot can be added later without rewriting the layout. Use the existing base-path/static asset helper; no new server image optimizer or remote hotlink dependency. Reserve space from real image dimensions when media exists. Never fetch or screenshot client products automatically, sign in, scrape private data, or publish patient/children/candidate records. Pending media and permissions belong in internal notes, not the export.

## 7. Data, links, and interaction architecture

Extend the existing typed content and components rather than building a second project registry. Keep slugs/URLs stable. Separate role, engagement metadata, product status, source visibility, visitor access, external actions, and optional media. Unknown is different from private: do not label all missing repositories private.

Only public, approved facts should reach exported HTML, serialized route data, or client bundles. Internal notes are not made private by hiding them in the UI. Do not bundle interview questions, private URLs, review notes, pending evidence, or secrets into project objects consumed by public components. Keep internal editorial notes in `docs/` outside public imports/output.

Use normal links for navigation. Give similarly styled links with different destinations distinct purposes. Prefer the existing external-link policy; if opening a new tab, communicate it and preserve the project's safe `rel` handling. No live HTTP status check should gate the portfolio build or replace an owner's approved URL after a transient failure.

Use semantic headings: homepage section `h2` and project titles `h3`; index `h1` and entries `h2`; each overview one `h1` and section `h2`s. Titles, roles, statuses, and access notes must be accessible without hover or JavaScript. Keep focus visible and touch targets usable, including with long wrapped labels.

Keep content server-rendered into the static export. Preserve the existing build-time enumeration of all five slugs and real unknown-route handling. Do not add runtime route generation, an API, CMS, client-only data fetching, a lightbox, modal, animation library, custom cursor, hover-follow preview, or new full-page transitions. Ordinary existing color/underline/focus transitions may remain. Essential content must never start hidden awaiting Part 6.

## 8. Verification and visual evidence

Run actual existing scripts for type checking, linting, unit tests, and static export. Reuse the documented Chrome export command if it is still valid; do not invent commands. Extend tests for changed behavior without weakening previous assertions.

Required checks on a plain file-only static server, at BOTH `/` and `/portfolio-preview`:

- Homepage has exactly the three intended featured entries, each with correct internal destination; the hero work anchor still resolves. `/work/` has all five distinct products in the intended order.
- Direct entry and refresh work for all five overview URLs. Next/back navigation, CV, shared menu/contact links, and true unknown-route/404 behavior remain intact. Prefix assets and internal links exactly once; do not prefix external URLs.
- DTO recruitment and Egil expose no fake public demo/source action. DTO website uses its own approved URL. ArtAICare's action is a sign-in link. Skald's action points to the workshop website without claiming internal demo access.
- Product attribution is preserved: Angular/Rust for the DTO platform, no unconfirmed React assignment to the company website, no Django inference for Egil, no full-stack/marketing-site ownership claim for Skald Lab Ops, and no VR-application ownership/Go claim for ArtAICare.
- Optional media/stack/link sections are omitted cleanly when absent. No empty `src`, broken placeholders, fake screenshots, placeholder project route, or visible internal notes. If testing the future media branch, keep any fixture synthetic and test-only, never presented as real work.
- Project headings, link names, keyboard order, status text, and no-JavaScript navigation work. Font fallback, reduced-motion preference, menu Escape/resize handling, and portrait/PDF byte checks remain intact.
- Planning files, skills, tests, artifacts, and private notes are not included in the public export or public data payloads.

Inspect affected layouts at 390px and 1440px first, then check 320px reflow, an intermediate/tablet width, and a wide desktop. Test actual 200% browser zoom separately; viewport resizing is not the same test. Check long project names, wrapped technology lines, short landscape, touch, and keyboard use. Do not hide horizontal overflow or truncate information to conceal layout bugs. Measure contrast for any newly introduced surface/text/focus combination.

Capture and OPEN actual screenshots in the existing ignored artifact area, preferably `.artifacts/part-4/`. A proportionate minimum set:

- Homepage selected-work section at 390px and 1440px, plus a desktop hero-to-work transition capture.
- Full `/work/` page at 390px and 1440px.
- Full ArtAICare overview at 390px and 1440px (the richest content and access note).
- Egil overview at 390px (private/no-external-action state).
- DTO company-website overview at 1440px (no confirmed framework/media state).
- One representative keyboard-focus or native-zoom case.

Record viewport height, device-pixel ratio, route, and special conditions. Visually inspect alignment, wrapping, density, hierarchy, whitespace, cover treatment, and contrast. Fix actual defects; merely generating screenshots is not review. Smoke-check the other overview pages and shared shell without making an exhaustive screenshot matrix.

Use available browsers; do not install or claim unavailable tooling. If Firefox/WebKit are usable, run targeted checks and report exactly which. Otherwise preserve NOT RUN. Keyboard/DOM tests are not screen-reader testing. Do not invent performance scores, production accessibility certification, measured business results, or fresh dependency-audit results from inherited reports.

## 9. Documentation and completion

Update `docs/design-system.md` with project-row, overview, cover, responsive, and future-media conventions. Add or update a concise internal `docs/project-content.md` describing each project's approved scope, link/access rules, and remaining evidence/media gaps; do not create a competing source of facts.

Update `docs/progress.md` with changed files and rationale, actual skill-file findings, commands and PASS/FAIL/NOT RUN results, inspected screenshots with conditions, narrowly justified deviations, and inherited limitations. Identify what later images/decisions could improve without treating those gaps as coding blockers or public content.

Completion means useful, visually coherent work browsing and five honest overviews, with the Part 3 hero and existing checks preserved. If a required check could not run, describe the implementation as ready for that outstanding verification rather than declaring unconditional completion.

Finish with a concise handover: changes, actual results, screenshot paths, missing inputs that remain nonblocking, and readiness for Part 5 (story, experience, services, and contact). Stop after Part 4. Do not start narrative rewriting, coordinated motion, audit remediation, or deployment.

## Official references

Checked 12 November 2026. Use the installed-version-compatible guidance; these references are not instructions to upgrade dependencies.

- Codex repository-local skills: https://learn.chatgpt.com/docs/build-skills
- Next.js static exports: https://nextjs.org/docs/app/guides/static-exports
- W3C link purpose: https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html
- W3C reflow: https://www.w3.org/WAI/WCAG22/Understanding/reflow.html

Project facts above come from the owner's supplied descriptions and final CV, reflected in `docs/content-facts.md`. Visual arrangements are proposed design requirements, not claims that the current screenshots have been independently reviewed. The external references support implementation mechanics, not career or project claims.
