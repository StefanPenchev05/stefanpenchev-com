# Codex — Part 1: Portfolio foundation and verified content

Work in the existing repository. Implement Part 1 only: a reliable static-export foundation with real content and assets. Do not attempt the finished design, full animation system or deployment in this task.

## Read first

Read `README_START_HERE.md`, `docs/portfolio-spec.md`, `docs/content-facts.md`, `docs/implementation-plan.md` and `docs/source-notes.md`.

Inspect the repository, existing instructions, git status, package manager and installed runtime before changing anything. Preserve `.git`, remotes, supplied assets and unrelated work. Do not assume this folder is empty merely because that was the original plan. Do not push, deploy or alter remote settings.

Treat the content-facts file as the factual source of truth. The final CV supersedes older CV drafts. Create or merge a root `AGENTS.md` that directs subsequent tasks to the shared specification and records the commands and constraints; preserve any existing instructions.

## Technical foundation

Use the proposed Next.js App Router, React, TypeScript and Tailwind CSS stack with compatible stable versions. Check current official documentation before choosing versions or CLI commands. Prefer the repository's existing package manager; otherwise use npm and commit a lockfile in the working changes. Record the supported runtime version.

Configure a true static export with `output: 'export'` and `trailingSlash: true`. Avoid runtime server features, a database, Server Actions, contact-form processing and the default server-side image optimizer. Do not client-render the entire website just because it will be statically hosted.

Support an explicit build-time base path for both domain-root hosting and repository-subpath hosting. Centralise public asset URL handling. Do not double-prefix Next links. Leave the final domain and GitHub profile unset rather than deriving public identity from an old link or git remote.

Use the supplied unchanged assets:
- `public/images/stefan-penchev.png` — transparent 800×800 portrait.
- `public/files/stefan-penchev-cv.pdf` — approved final two-page CV.

Do not fetch a substitute portrait or rewrite the PDF. Keep its existing filename path in configuration. The main contact section uses email and LinkedIn, not the CV's phone number.

## Content model

Create typed local content for identity/contact, availability, experience, education, skills, story and the five distinct projects. Separate product status, source visibility, visitor access, optional links and optional media.

Known projects:
1. DTO recruitment platform: in development, private source; Angular, Rust, PostgreSQL, Redis, Docker, Makefile, with TypeScript supported by the CV. No public product URL or fixed release date.
2. DTO company website: public website, English/Polish localisation. Use its provided URL. Do not assign an unconfirmed framework by deduction.
3. ArtAICare: MERN web platform, with confirmed Python/SBERT integrations and deployment tools. External link is a sign-in page, not an anonymous demo. Contribution ended 20 September 2025; Stefan did not build the VR app.
4. Skald Lab Ops: backend work using Django. Link to the public Skald Lab website without claiming that its internal operations screens are openly accessible or that Stefan built the public marketing UI.
5. Egil: private internal RAG assistant using Ollama; no public source or demo link.

Import the actual summaries, contributions, experience dates and education from the supplied facts. Do not invent architecture, project screenshots, DDD boundaries, Go projects, results, awards, testimonials, users or metrics. Do not add a source-code link when one is unavailable. Unknown optional data should be absent, not a visible “TBD.”

English only. Two services: complete applications and backend/API development. Contact paths for employment and freelance projects have equal importance. Use “Roles starting January 2027” as the documented interpretation of “after this December”; never auto-change it to “available now.” No blog, CMS, analytics or contact form.

## Route skeletons and shared shell

Create working routes for `/`, `/work/`, all five `/work/[slug]/` pages, `/about/` and a static 404 page. Enumerate project slugs at build time.

Use semantic HTML, a skip link, visible focus states, ordinary navigation and a usable small-screen layout. Include functional homepage section anchors and contact links from internal pages. CV and project links must use real destinations.

This task's UI should be a clean, readable foundation using the proposed colors and a system font. Use the real portrait at a sensible size with explicit dimensions. Use typographic project covers until approved images arrive; never mock up fake application interfaces.

Do not implement the final oversized hero composition, elaborate menu overlay, hover-preview system, route transitions or GSAP motion yet. Do not add infinite marquees, scroll hijacking, autoplay video or loading gates. Keep essential text and links usable without JavaScript.

## Checks and handover

Provide reproducible scripts for development, type checking, linting and production build. Add focused tests for content invariants and asset/path handling, especially absent URLs and prefix correctness.

Run the checks that are available. Inspect the exported output and serve it with a plain static server: verify direct entry to a project route, assets and the PDF without relying on a development server or SPA fallback. Test a nonempty deployment prefix as well as root hosting; a smaller repeatable script is acceptable where full browser tooling is unavailable.

Check that no unknown link renders, private projects have no fake demo/source buttons, no unsupported canonical domain is emitted, and no internal planning documents appear in the public export.

If a dependency download, browser installation or command is blocked, report exactly what was not run. Do not fabricate test results or claim a deploy happened.

Finish with a brief report of changed files, installed versions, actual commands/results, unresolved nonblocking inputs, and what is ready for Part 2. Add `docs/progress.md` so subsequent tasks can continue without rebuilding the foundation.

Stop after Part 1. Do not start the later phases automatically.
