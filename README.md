# Stefan Penchev — Portfolio

Personal portfolio built with React, TanStack Start, Vite, Tailwind CSS, GSAP and Lenis.

## Local development

Use Node.js 24 (the pinned version is in `.nvmrc`) and npm with the checked-in lockfile.

```sh
npm ci
npm run dev
```

Open `http://localhost:5173/stefanpenchev-com/`. The same base path is used in development and production.

On this Mac, the active project is at `~/Projects/portfolio_4`, outside cloud-synced Documents. Both source files and `node_modules` stay local. The original `~/Documents/Projects/portfolio_4` path is a compatibility symlink to this directory.

```sh
cd ~/Projects/portfolio_4
nvm use
npm run dev
```

If a terminal was already inside the project before the move, run the `cd` command again. Standard `npm ci` now works directly in this project. The previous cloud copy is retained at `~/Documents/Projects/portfolio_4.icloud-backup-20261118`; it is a backup, not the active working directory.

## Checks and build

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run test:static
npm run preview
```

`npm run build` uses TanStack Start to prerender the homepage and every project in `src/data/projects.ts`. The complete static site is in `dist/client/`, with a directory `index.html` for each page. `dist/server/` supports prerendering during the build and is not needed to host the exported site.

`npm run preview` (also `npm start`) serves only those exported files at `http://127.0.0.1:4173/stefanpenchev-com/`, including directory indexes and real 404s. It does not render pages on demand. Use `PORT=4189 npm run preview` to select another port.

The base path `/stefanpenchev-com/` and sitemap URL `https://stefanpenchev05.github.io/stefanpenchev-com/` live in `src/lib/site.ts`. Vite assets, TanStack navigation, plain links, images and the CV all use this prefix. Pass unprefixed destinations to the router; use `sitePath` for plain internal links and public files. Project URLs end in `/` to match their exported directories.

`npm run test:static` checks all exported pages, internal file links, sitemap URLs and the unchanged portrait/CV. Run it after building. Hosting and publication remain a separate task; no deployment workflow is configured.

With the preview server running, `python tests/static_pages.py` checks direct loads and reloads of every page, HTML content with JavaScript disabled, desktop animations, mobile navigation and downloads. It requires Python Playwright and installed Chrome. Set `PORTFOLIO_URL` if using a different preview port. The development scroll regression commands are in `docs/scroll-animation-fixes.md`.

## Content

Edit `src/data/` for profile, project, experience, education and skill information. Public claims follow `docs/content-facts.md` and the unchanged approved CV. Keep status, visitor access and source visibility separate. The portfolio domain remains unset.

- Portrait: `public/images/stefan-penchev.png`
- CV: `public/files/stefan-penchev-cv.pdf`
- Review: `docs/content-review.md`

Contact uses direct email links for employment and freelance enquiries, plus the approved LinkedIn and GitHub profiles. There is no contact processing service.
