# Portfolio — Stefan Penchev

Use Node.js 24 and npm with package-lock.json. Run npm run typecheck, npm run lint, npm test, npm run build and npm run test:static.

TanStack Start prerenders the homepage and all projects into `dist/client/`. Serve those files under `/stefanpenchev-com/`; `npm run preview` provides a static preview on port 4173. Keep the shared base path in `src/lib/site.ts`. Router destinations stay unprefixed; plain internal links and public asset URLs use `sitePath`. Preserve trailing slashes on project URLs.

Pushing to `main` triggers `.github/workflows/deploy-pages.yml`, which validates and publishes `dist/client/` to GitHub Pages. Treat pushes to `main` as production deployments and keep generated output out of Git.

The active project is `~/Projects/portfolio_4`; its former Documents path is a compatibility symlink. Use the local project directory for development and standard `npm ci`. Keep source files and dependencies outside cloud-synced storage, which previously offloaded them and caused filesystem timeouts during startup.

Public claims must follow docs/content-facts.md and the approved CV at public/files/stefan-penchev-cv.pdf. Keep unconfirmed projects and links outside the public app until approved. Do not initialise Git or deploy without an explicit request.

- Scroll storytelling uses GSAP ScrollTrigger synced to Lenis (src/components/layout/SmoothScroll.tsx); each scene creates its animations inside `gsap.matchMedia(scope)` and reverts it on unmount, so pins/triggers never leak between routes and reduced-motion/mobile get static fallbacks.
- Chapter background colour is driven by `html[data-scene]` (set via `setScene` / `[data-scene]` blocks) and a fixed `.scene-backdrop`; add new scene colours in src/styles.css rather than per-section backgrounds.
- All portfolio content lives in src/data/* (profile, projects, skills, experience, education); components only render it, so facts are edited in one place.
