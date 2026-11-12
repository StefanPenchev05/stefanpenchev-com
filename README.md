# Stefan Penchev Portfolio

A portfolio website for Stefan Penchev, built with Next.js and designed as a static export for easy deployment.

## Overview

This project presents:

- a portrait-led homepage
- selected work and project detail pages
- a personal about section
- experience and education highlights
- contact links and CV access
- static export support for deployment on a static host

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Vitest for content checks
- Playwright for export/browser validation

## Project structure

- `src/app/` — App Router pages and routing
- `src/components/` — reusable portfolio UI components
- `src/content/` — typed content for identity, projects, story, and skills
- `src/lib/` — asset and base-path helpers
- `public/` — static assets, portrait, and PDF CV
- `docs/` — project specification and implementation notes
- `tests/` — validation checks for content and static export

## Local development

Requirements:

- Node.js 24
- npm

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Then open the local site in your browser, usually on:

```text
http://localhost:3000
```

## Available scripts

```bash
npm run dev
npm run typecheck
npm run lint
npm test
npm run build
npm run test:export
```

### Script notes

- `npm run dev` starts the local Next.js app.
- `npm run typecheck` checks TypeScript and generated types.
- `npm run lint` runs ESLint.
- `npm test` validates content invariants.
- `npm run build` creates the production static export.
- `npm run test:export` verifies the exported site behavior using Playwright.

## Export and deployment

This project is configured for a static export and trailing-slash routing. The generated output is written to `out/` when you run the production build.

For subpath hosting, use a build prefix such as:

```bash
NEXT_PUBLIC_BASE_PATH=/portfolio-preview npm run build
```

## Documentation and source notes

Before making changes, review the project guidance in:

- `README_START_HERE.md`
- `AGENTS.md`
- `docs/portfolio-spec.md`
- `docs/content-facts.md`
- `docs/implementation-plan.md`
- `docs/source-notes.md`

## Notes

- The CV and portrait assets are intentionally kept in `public/files/` and `public/images/`.
- Public-facing content is governed by the approved project facts in the docs.
- The portfolio is intended to remain in English and keep employment wording aligned with the documented January 2027 availability.
