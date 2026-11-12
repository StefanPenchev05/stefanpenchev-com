# Portfolio

Read [README_START_HERE.md](README_START_HERE.md), the shared [portfolio specification](docs/portfolio-spec.md), [content facts](docs/content-facts.md), [implementation sequence](docs/implementation-plan.md), [source notes](docs/source-notes.md) and [progress](docs/progress.md) before making changes. Follow the requested stage. Treat the content facts and approved final CV as authoritative for public claims.

## Local commands

Use Node.js 24 and npm with the checked-in lockfile. The tested Node version is in `.nvmrc`.

- `npm ci` installs the locked dependencies.
- `npm run dev` starts local development.
- `npm run typecheck`, `npm run lint` and `npm test` check types, lint and content invariants.
- `npm run build` exports the site to `out/`.
- `NEXT_PUBLIC_BASE_PATH=/portfolio-preview npm run build` builds for a subpath. Mount the contents of `out/` at that prefix.
- `npx playwright install chromium` installs the browser for `npm run test:export`. With Chrome already installed, use `PLAYWRIGHT_CHANNEL=chrome npm run test:export`. This suite builds and serves both variants locally, leaving a root export in `out/`.

## Constraints

Use the App Router with static export and trailing slashes. Keep essential content and navigation usable without JavaScript. Pass unprefixed internal routes to Next Link and construct public file URLs with `publicAssetUrl`. Serve directory index files and the exported `404.html` with HTTP 404 for missing paths. Keep the approved CV and portrait at their current paths.

Maintain English copy, fixed January 2027 employment wording and equally prominent employment and freelance contact. Use the supplied email and LinkedIn for contact. Keep the portfolio domain and GitHub profile unset until confirmed. Distinguish project status, visitor access and source visibility. Publish only approved links, media and facts. Keep planning documents outside `public/`.

Keep server runtime features, contact processing, analytics, a CMS and a blog out of the foundation. Preserve repository metadata and remotes. Deployment belongs to a later, explicitly authorised stage.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
