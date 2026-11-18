# Portfolio — Stefan Penchev

Use Node.js 24 and npm with package-lock.json. Run npm run typecheck, npm run lint, npm test and npm run build.

If `node_modules` is a symlink to local dependency storage, follow the linked-install instructions in README.md when reinstalling. Running `npm ci` in this synced project directory replaces that symlink and can reintroduce cloud-placeholder startup hangs.

Public claims must follow docs/content-facts.md and the approved CV at public/files/stefan-penchev-cv.pdf. Keep unconfirmed projects and links outside the public app until approved. Do not initialise Git or deploy without an explicit request.

- Scroll storytelling uses GSAP ScrollTrigger synced to Lenis (src/components/layout/SmoothScroll.tsx); each scene creates its animations inside `gsap.matchMedia(scope)` and reverts it on unmount, so pins/triggers never leak between routes and reduced-motion/mobile get static fallbacks.
- Chapter background colour is driven by `html[data-scene]` (set via `setScene` / `[data-scene]` blocks) and a fixed `.scene-backdrop`; add new scene colours in src/styles.css rather than per-section backgrounds.
- All portfolio content lives in src/data/* (profile, projects, skills, experience, education); components only render it, so facts are edited in one place.
